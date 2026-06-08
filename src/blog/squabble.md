Every family has one board game that is played more than all the others, and in my house it was Scrabble. In the rare 
occasions where it doesn't devolve into squabbling over "I don't care what the Scrabble Dictionary says that's not a word!"
or "Man I just have the worst tiles -- did we shake the bag up enough? Do we all want to start over?", it is a lot of 
fun time combining strategic planning with knowledge of esoteric vocabulary.

Scrabble-playing algorithms are nothing new and there are myriad imitators online. However, these are all mouse-driven (slow) or
have variants in dictionary or layout which differentiate them from the actual Scrabble game.

***Squabble*** is a terminal based version which I wanted to explore for three reasons:
* I wanted a keyboard-driven approach to spin up in my terminal for a quick brain-exercise when I'm waiting for
a long-running process to execute or just killing a minute's time.
* Creating the AI agents seemed like a fun algorithmic challenge (The space of candidate moves in Scrabble is genuinely enormous, and on an open board with both blank tiles in play the number of possible placements, legal and illegal alike, climbs into the tens of millions)
* I can use this agent to simulate thousands of games, and expand my vocabulary with particularly powerful words I may 
use to... *enhance* my game playing at future family holidays and secure my first place ranking.

The inaugural blog post comes in two parts. 
* **The methodology** - a walk through how the computer opponent navigates that move-space on every turn. (Post implementation when I'd finished my intellectual exercise I looked up the standard approach that's used by all the other agents out there, and it is essentially the same) 
* **The payoff** - having built an opponent that searches well, I set two of them against each other for ten thousand complete games, recorded every word they played, and went looking for whatever patterns fell out.

## Part 1: How the bot picks a move

### The size of the problem

On any given turn the bot holds up to seven tiles and faces a fifteen-by-fifteen board that is already partly filled, and it has to find the highest-scoring move that is also fully legal, where legality is a more demanding requirement than it first appears: the word has to exist in the dictionary, it has to connect to tiles already on the board, and every incidental cross-word it forms along the way has to be valid in its own right.

The dictionary holds **178,692 words**, and the obvious approach of asking, for every one of them, whether it happens to fit at a given square would be far too slow to run every turn. The bot therefore never iterates over the dictionary at all; instead it iterates over the *board*, and leans on the structure of the dictionary itself to do the pruning.

### A dictionary shaped like a tree

The word list is easily compiled once into a trie, a tree where each letter in each word points to all letters used in subsequently valid words.

```130:143:game/rulebook.py
        dictionary_tree: dict[str, Any] = {"VALID": False, "WORD": ""}
        for word in dictionary_lines:
            active_branch = dictionary_tree
            for i, character in enumerate(word):
                if character not in active_branch:
                    active_branch[character] = {
                        "VALID": False,
                        "WORD": active_branch["WORD"] + character,
                    }
                active_branch = cast(dict[str, Any], active_branch[character])
                if i == len(word) - 1:
                    active_branch["VALID"] = True
```

The result is a structure of **395,184 nodes** whose great virtue is that shared prefixes are shared in memory: `QI`, `QIS`, `QINTAR`, and `QINTARS` all travel the same `Q` then `I` path before they diverge. Because the bot assembles words one letter at a time, a question like "is there any word at all that begins `ZX`?" resolves in a single lookup that fails immediately, and that one failure prunes the entire subtree of dead ends hanging beneath it.

### Step one: find the anchors

Before generating a single word, the bot works out every place a word could legally begin, scanning all 225 squares of the board in both directions, Down and Right, for a total of **450 candidate anchors**:

```218:226:game/players/computer.py
    def get_valid_locations(self, board_state: BoardState) -> list[_MoveParam]:
        """List every anchor square and direction where a word may legally start."""
        valid_move_params: list[_MoveParam] = []

        for y in range(15):
            for x in range(15):
                for direction in ["D", "R"]:
                    min_len, fixed_tiles = self.get_move_params(
                        (y, x), direction, board_state
                    )
```

Roughly half of these are eliminated at once, since a square cannot begin a word if a tile already sits immediately before it in the chosen direction; that square is the middle of a word, not its start. For each anchor that survives, a single forward walk establishes three constraints that will shape the search to follow:

1. **The minimum length**, meaning the shortest word that will actually touch the existing board. A word left floating in empty space, an "island", is illegal, so the bot computes how many tiles it must lay down before the play connects to something already there.
2. **The maximum length**, meaning simply how far the word can extend before it runs off the edge of the board.
3. **The fixed letters**, meaning the tiles already present on the board within that span, together with their positions; any word the bot generates here must accommodate them exactly.

In a live game, this first pass typically narrows the original 450 anchors down to somewhere around **220** that are genuinely worth exploring.

### Step two: walk the tree under a rack constraint

For each of those viable anchors, the bot generates every word that can be spelled from the rack, respects the fixed board letters, and falls within the permitted length window. This is a depth-first walk of the trie in which the rack, rather than the alphabet, supplies the constraint at each step. Figure 1 shows the idea in miniature, including the case that gives Scrabble search its real character: a tile that is already sitting on the board.

![Walking the dictionary trie from a board anchor, with a board tile forcing one branch](trie-search.svg)

**Figure 1.** Starting from the highlighted anchor and playing to the right, the bot holds the rack `Q A I D` and tries each tile in turn as the opening letter. A `T` already sits on the square at position 2, which fixes that position for every branch that reaches it: of the twenty-six possible children there, the search follows only `T`. Some paths die before they ever arrive, like `QD`, which begins no word in the dictionary; others reach the `T` only to find no word waiting, as with `QIT` and `ADT`; and two of them resolve into complete, valid plays, `QAT` and `AIT`. Note as well that `QI` and `AI` are themselves real words, yet neither is emitted here, because a board tile immediately follows and the play is obliged to continue through it.

The rack itself is represented as a twenty-seven-slot count vector, one slot for each letter and one more for blanks. Descending into a child decrements the count for that letter, the recursion runs, and the count is restored on the way back out; it is ordinary backtracking, with no copying of state from branch to branch:

```57:72:game/players/computer.py
    for idx, child in node[_TRIE_CHILDREN_KEY]:
        if counts[idx] > 0:
            counts[idx] -= 1
            _find_words_dfs(
                child,
                counts,
                fixed_at,
                pos + 1,
                rack_used + 1,
                blank_mask,
                min_length,
                max_length,
                out,
            )
            counts[idx] += 1
```

Fixed board letters collapse the branching completely. Where position two already holds a `T`, the search does not bother trying twenty-six children; it follows the single `T` child if one exists, and abandons the branch otherwise:

```41:56:game/players/computer.py
    forced = fixed_at[pos]
    if forced is not None:
        child = node.get(forced)
        if child is not None:
            _find_words_dfs(
                child,
                ...
            )
        return
```

Blanks are handled with a branch of their own. Whenever a blank is available, the search additionally tries spending it as the current letter, noting the position in a bitmask so that the finished word can later be lower-cased to mark where the blank fell. This is precisely the point at which the move-space explodes, because a single blank multiplies the set of reachable words at every position it could conceivably occupy:

```73:86:game/players/computer.py
        if counts[_BLANK_IDX] > 0:
            counts[_BLANK_IDX] -= 1
            _find_words_dfs(
                child,
                counts,
                fixed_at,
                pos + 1,
                rack_used + 1,
                blank_mask | (1 << pos),
                min_length,
                max_length,
                out,
            )
            counts[_BLANK_IDX] += 1
```

### Step three: score everything, keep the best

Every (anchor, word) pair that survives becomes a candidate move and is run through the full rulebook scorer, which applies the letter and word multipliers, awards the fifty-point bonus for laying all seven tiles at once, and adds in the score of every cross-word the move creates, returning a sentinel value if any of those cross-words turns out not to be real. The bot then sorts the candidates by score and plays the best of them, or passes when nothing manages a positive score at all:

```260:267:game/players/computer.py
        move_scores = sorted(move_scores, key=lambda x: x[1], reverse=True)

        if move_scores and move_scores[0][1] > 0:
            best = move_scores[0][0]
            self.word_hist.append(best.word)
            self.score_hist.append(move_scores[0][1])
            return best
        return SKIP_MOVE
```

### Caveats to Scrabble Agent Performance
While incredibly powerful, this greedy agent is deliberately **not optimal**. It takes the "greedy" move with the best possible move at each turn
to score the most points, but will easily set up a player for triple word scores with abandon. While it would be quite easy to add a Chess-AI like move tree, in which it anticipates a variety of likely opponent racks (looking at available tiles) and choosing the move which balances self-score optimization with opponent score minimization, for my present purposes this isn't worth it because:
* This kind of move optimization would significantly increase the time for the agent to play, I prefer it to play instantly
* Make the agent much less fun to play *against*, since it'd just bully you with killer 2 / 3 letter words and create incredibly dense and tangled  board that are no fun to play on.

If this was some DeepBlue scenario where I'm trying to defeat Nigel Richards and didn't mind several seconds a move -- sure. But for an enjoyable opponent, it doesn't make sense.

### So how fast is it?

There is a fair amount of work happening on every turn:

| Per turn (typical, over a real game) | Value |
| --- | --- |
| Anchors scanned | 450 |
| Viable anchors after pruning | ~220 |
| Candidate moves generated and scored | ~3,500 |
| Candidate moves on a busy mid-game turn | up to ~29,000 |

And all of it happens quickly. With the interface stripped away, a complete two-player game, every turn fully searched and scored, finishes in well under a second, and run headless the bots play multiple complete games per second on a single core. The trie pruning is what keeps that average of roughly 3,500 candidates per turn tractable, and it is also what made the experiment in the next section cheap enough to be worth running at scale.

## Part 2: 10,000 games of self-play

With an opponent fast enough to play in bulk, the obvious next step was to let it. I ran a script that pits two computer players against each other, headless and in parallel across the available CPU cores, with the deliberate animation delays patched out; ten thousand complete games finished in a few minutes and produced something on the order of **250,000 individual word plays**. For every word played I recorded both how often it appeared and the average score it earned, and kept the thousand most frequent. What follows is what I found most interesting.

### No surprise, two-letter words are king

Anyone who's reasonably good at Scrabble has probably had the following conversation:

> _Yes XI is a word! Its the 14th letter of the Greek 
alphabet! No, I know foreign words aren't allowed but... I don't
> know why its allowed but it absolutely is! You want to check? Okay formally challenge me. Okay it's on scrabbledictionary.com. What do you mean that doesn't count? Look okay I'll let you keep your turn but... Oh come on come back! I'll do something else we can keep playing!_


And so it's no surprise that the bot uses them too.

The most frequently played words are, predictably: `QI`, `XI`, `EX`, `ZA`, `JO`, `OX`, etc.  Average scores these words command is high, and surprisingly more commonly high are the more common letters:

| Word | Times played | Avg score |
| --- | --- | --- |
| `EX` | 645 | 38.5 |
| `AX` | 327 | 37.5 |
| `OX` | 437 | 37.3 |

### Q is predictably powerful

![](playing-the-trumpet-q-star-trek.gif)

The single most-played word across all ten thousand games is `QI`, with 2,525 appearances, very nearly triple its closest rival, and this is anything but an accident. 

The `Q` is the most dangerous tile in the bag, worth ten points but quite capable of stranding the player who cannot find a use for it, so a greedy scorer naturally gravitates toward the handful of words that let it shed the `Q` cheaply and without the help of a `U`. The complete no-U family (within my list of the top 10k played words), ranked by number of times played, is:

| Word | Plays | Meaning                                                                                                                                                                             |
| --- | --- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `QI` | 2,525 | The circulating life force in Chinese philosophy.                                                                                                                                   |
| `QAT` | 855 | Leaves of an Arabian shrub.                                                                                                                                                         |
| `QIS` | 646 | Plural of qi. (Don't ask me how you pluralize a life force.) |
| `QAID` | 273 | A Muslim tribal chief or judge.                                                                                                                                                     |
| `SUQ` | 210 | An open-air marketplace in an Arab city.                                                                                                                                            |
| `QADI` | 173 | A judge in a Muslim community.                                                                                                                                                      |
| `QATS` | 161 | Plural of qat.                                                                                                                                                                      |
| `TRANQ` | 134 | A tranquilizing drug.                                                                                                                                                               |
| `QANAT` | 99 | A gently sloping underground channel dug for irrigation.                                                                                                                            |
| `FAQIR` | 79 | A Muslim or Hindu religious ascetic.                                                                                                                                                |
| `QINTAR` | 49 | A monetary unit of Albania.                                                                                                                                                         |
| `UMIAQ` | 39 | An open Inuit boat made of skins.                                                                                                                                                   |

(Shoutout to Arabic loanwords for all the U-less Q words.)

### Three letters, high returns

The two-letter family is the cornerstone of any competitive player's vocabulary, but there is a quieter tier of three-letter words that the bots exploit almost as systematically. These words appear less often than `QI` or `XI` because they require a slightly more open board, but when the conditions are right they earn roughly the same points per play. Several are worth learning on their own terms:

| Word | Plays | Avg score | Meaning |
| --- | --- | --- | --- |
| `ZED` | 176 | 34.77 | The letter Z, in British and Commonwealth English. |
| `ZOA` | 175 | 34.58 | Free-swimming larval organisms; plural in zoological usage. |
| `AZO` | 171 | 35.06 | Relating to the azo group (−N=N−); the root of azo dyes. |
| `ADZ` | 155 | 32.92 | Variant spelling of adze, the curved woodworking blade. |
| `FEH` | 154 | 31.24 | An interjection expressing disgust or contempt. |
| `ZIT` | 151 | 31.68 | A pimple. Unglamorous, but reliably useful. |
| `XIS` | 102 | 36.36 | Plural of xi, the Greek letter the bot already plays solo. |
| `KEX` | 76 | 39.79 | The dry hollow stalks of dead herbaceous plants. |
| `OXY` | 51 | 39.78 | Relating to oxygen, or sharp and pointed. |

`KEX` is the quiet outlier here: seventy-six appearances and nearly forty points each, all from a word almost no one has seen on a Scrabble board. It edges out `OXY` by a whisker in average score and is the strongest three-letter play in the dataset that doesn't already appear in the two-letter or Q-word sections.

### The obscure workhorses worth learning

Beyond the familiar staples, the bots leaned heavily on a set of genuinely obscure words that recur again and again precisely because they let the expensive tiles, the `J`, `X`, `Z`, `V`, and `K`, be offloaded into small and flexible shapes. These are the words I would actually add to a study list, the ones with high frequency and low recognition:

| Word | Plays | Avg score | Meaning |
| --- | --- | --- | --- |
| `AJEE` | 145 | 29.5 | To one side; awry. |
| `ZEP` | 129 | 37.2 | A long submarine sandwich. |
| `ZAX` | 109 | 42.0 | A tool for cutting and trimming roofing slate. |
| `FOH` | 108 | 32.0 | An exclamation of disgust. |
| `ZEK` | 73 | 38.5 | An inmate of a Soviet labor camp. |
| `ILEX` | 57 | 38.79 | Holly; any plant in the genus Ilex. |
| `ROQUE` | 67 | 32.3 | An American variant of croquet played on a hard court. |
| `NERTZ` | 55 | 35.9 | Nonsense, or an exclamation of defiance. |
| `FRIZ` | 42 | 41.21 | To form into small tight curls; a frizzy mass. |
| `JAPE` | 39 | 36.69 | To joke or mock; a jest. |
| `AXON` | 44 | 37.93 | The long projection of a nerve cell that carries signals. |
| `JINGO` | 42 | 37.67 | An aggressive nationalist. From the mild oath "by jingo." |
| `YUTZ` | 36 | 41.94 | A foolish or incompetent person (Yiddish). |
| `JEHU` | 41 | 37.6 | A fast or reckless driver. |

`ZAX` is the quiet standout among them, played 109 times at an average of forty-two points: a four-letter name for a slate-cutting tool that almost nobody knows, and one that steadily out-earns a great many of the showier words that people do. `FRIZ` and `YUTZ` are the strongest additions — both crack forty points on average, and neither is a word you'd expect to see on a Scrabble board.

### The single highest-scoring word

The highest average score anywhere in the top thousand belongs to:

> **`ZOEA`**, noun: a larval stage of certain crustaceans, such as crabs.
> Played 59 times, averaging **45.4 points**.

It satisfies every criterion at once: a `Z`, four short tiles that drop neatly into tight board positions, three vowels that let it be assembled from almost any unpromising rack, and just enough length to stretch onto a premium square. The runners-up are cut from the same cloth, `XENIA` (43.2, the influence of pollen on the form of a seed) and `QUIZ` (43.1), each one pairing a high-value consonant with a short, flexible frame and a multiplier somewhere beneath it.

## Wrapping up

Squabble ended up scratching exactly the itch I built it for: a version of Scrabble I can sit down and play 
on a whim from my terminal. 
The opponent is not strategically sophisticated, being a one-ply greedy scorer and nothing more, but it's fun, educational,
and deeply challenging to play against, and running it ten
thousand times reveals a few more tricks for me to have up my sleeves.

Ready to try a game? Just `pip3 install squabble-game` and then run the `squabble` command anywhere and you're off to the races!