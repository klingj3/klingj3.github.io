I went to re-read one of Orwell's gentler essays and a cookie banner got in the way first. Rather than click
through it on reflex, I stopped to read what I was being asked to agree to — and then, because the essay in
question is the one it is, I went and looked at what the page actually does. This is a short account of what I
found, which is both less and more interesting than I expected.

The essay was *Some Thoughts on the Common Toad*, in which Orwell defends the ordinary pleasures of spring
against the kind of person who finds such pleasures politically suspect. It ends like this:

> The atom bombs are piling up in the factories, the police are prowling through the cities, the lies are
> streaming from the loudspeakers, but the earth is still going round the sun, and neither the dictators nor the
> bureaucrats, deeply as they disapprove of the process, are able to prevent it.

It's a small, stubborn claim that there's a private joy the authorities can't reach. I came for that sentence.
The cookie banner is what I got first.

## A bias I should declare

I've always quietly resented the runaway success of Orwell's fiction. *1984* and *Animal Farm* are good books,
but they've so thoroughly eclipsed the rest of him that the man now survives in public mostly as an adjective —
and a lossy one. "Orwellian" has flattened into *surveillance dystopia, boot on face*, an eponym standing in for
a writer who was far stranger and warmer than the word lets on: the reporter in the Paris kitchens and the Wigan
mines, the essayist turning the same patient attention on a bad cup of tea, a boys' comic, or a mating toad as he
did on totalitarianism. That whole body of work is mostly absent from the word we made of his name, and I think
that's a minor injustice.

So I'm wary of reaching for "Orwellian" to describe anything, least of all a charity's website. But it does mean
that when I opened his essay about the inviolable private joys of spring, I was paying closer attention than
usual to the part of the page that watches you back.

## What you're actually accepting

You can skip the suspense: there's nothing malicious here. I half-expected the irony gods to hand me something
lurid — a fingerprinting script, a data broker, a dark pattern in the banner. There's none of that. What's on the
page is the completely standard kit:

- **Google Analytics**, twice — two separate measurement streams logging what you read and roughly where you are.
- **A Google Ads tag** (`AW-316245675`), which on accept fires conversion tracking, a remarketing pixel, and a
  Customer Match call — the machinery that lets the Foundation's ads find you again elsewhere, and adds you to a
  reusable audience list.
- **Datadog and Sentry**, which collect performance and error telemetry — operational, low-impact, the sort of
  thing that helps the site's developers and basically no one else.
- **Cloudflare**, for bot protection and a light analytics beacon, which is about as benign as a third party gets.

The cookie that records your *consent* is, ironically, the most honest thing in the jar. The one genuine wrinkle:
the Google ad cookie (`IDE`, on `doubleclick.net`) was already set when the page loaded, before I'd clicked
anything — which, under the rules the site itself believes it's bound by, it shouldn't be. But that reads as a
misconfigured tag, not a scheme. There's no villain. There's a WordPress install and some defaults.

## The interesting part is that this is ordinary

Here's where I'd push back on my own anticlimax. The story isn't that the Orwell Foundation is doing something
unusual — it's that what it's doing is completely usual, and worth looking at precisely because nobody ever does.
This is roughly the median configuration of the modern web, and "median" is doing a lot of quiet work.

Take just the Google tags, and ignore this one page entirely. On their own, the data they send is unremarkable:
which URL you hit, your approximate location from your IP, your device and browser, where you came from, tied to
a pseudonymous ID. Mildly invasive, easily shrugged off. The point is that *the same two or three tags are on a
huge fraction of every site you visit.* The value was never in any single page's data; it's in the aggregation.
The Foundation isn't handing Google a meaningful profile of you. It's contributing one more vertex to a graph
Google already holds — joining "read a George Orwell essay this afternoon" to the search you ran this morning and
the shop you browsed last night, all under the same advertising identity, because the same handful of tags
witnessed all three. No individual site sees much. The aggregator sees nearly everything, and it sees it for free,
as a side effect of everyone independently reaching for the same default analytics snippet.

That's the part I'd actually call worth mentioning, and it has nothing to do with the Orwell Foundation in
particular. We've built a web where the unremarkable, well-meant, check-the-box choice — *just add Google
Analytics, everyone does* — quietly routes a slice of nearly every visit, to nearly every site, through one
company's measurement apparatus. It's not surveillance in the trench-coat sense. It's surveillance as ambient
infrastructure, the default setting of a medium, assembled not by conspiracy but by a million separate people all
picking the path of least resistance. And given that the company on the receiving end has spent recent years
steadily walking back its own privacy promises and losing antitrust cases about this exact ad-tech plumbing,
"everyone does it" is a reason to look harder, not a reason to relax.

So: not malicious, and I'd resist any breathless framing that pretended otherwise. But the banality is the
finding. A charity's quiet literary page is wired, by default and without much thought, into the largest
ad-measurement network ever built — not because anyone set out to watch you, but because that's simply what a
web page is now, the way a house comes with plumbing. Whether that ambient, frictionless, everywhere-at-once
arrangement deserves the adjective I spent the start of this trying not to use, I'll leave to you. I notice only
that it's a more interesting question than the cookie banner makes it look.

The toads, for their part, are unaffected. The earth is still going round the sun, and you can still read the
essay and enjoy the spring; the remarketing pixel can no more stop you than a bureaucrat could. It would just be
a little more in keeping with the text if the page weren't taking notes while you did.
