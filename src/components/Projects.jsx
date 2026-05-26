import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { INK, INK_MID, INK_LIGHT, INK_RED, RULE, SHADE, PAPER, FONT_SERIF_ALT, inkAlpha } from '../styles/theme'
import {
  ContentWrap, SectionDivider, RubricSectionHeading, SectionPronunciation, SectionPreface, PageSection,
  LinkRow, ExternalLink, typeCopy, typeKicker, typeItalicMeta, fadeUp, sectionViewport
} from '../styles/shared'

export const SHOW_PROJECTS = true

const PROJECTS = [
  {
    hw: 'Squabble - Stylish Terminal-Driven Scrabble Engine',
    meta: 'Python · 2026',
    kicker: 'Game-playing AI',
    desc: 'I love playing scrabble, but hate the dragging-and-dropping or clicking and typing out of all the web-based' +
        'scrabble games! This fun little side-project is a terminal Scrabble engine built as an exploration of ' +
        'game-playing AI and move-space search. The candidate move space in Scrabble is enormous: with two blank tiles ' +
        'in play, the number of possible placements (including illegal ones) reaches into the tens of millions, making optimal ' +
        'move selection a fun algorithmic challenge. The AI opponent navigates this space efficiently enough to simulate ' +
        'multiple complete headless games per second and provides a fun ' +
        'way to both explore the game in AI matchups and learn new useful words (though at ego-deflating God-Tier performance).',
    tryIt: 'pip3 install squabble-game && squabble',
    gif: '/images/squabble.gif',
    links: [
      { label: 'GitHub', url: 'https://github.com/klingj3/squabble-word-game' },
      { label: 'PyPI', url: 'https://pypi.org/project/squabble-game/' },
    ],
  },
  {
    hw: 'subreddit suggester',
    meta: 'Python · Keras · 2018',
    kicker: 'Pre-LLM recommendation ML',
    desc: 'A Keras recommendation engine trained on the posting histories of 200,000 Reddit users (300 comments and 100 posts each), learning community co-engagement patterns from vectorized subreddit groupings to surface relevant new communities. Deployed as a Flask API accepting a username and returning personalized recommendations. Reddit\'s free public API made it uniquely well-suited for this kind of experiment in the pre-LLM era, providing rich behavioral data across thousands of communities at scale without restriction. An early application of learned embeddings to community discovery, predating the transformer-based approaches that now dominate this space.',
    gif: '/images/subreddit-suggester.gif',
    links: [
      { label: 'GitHub', url: 'https://github.com/klingj3/subreddit_suggester' },
    ],
  },
  {
    hw: 'NLP political sentiment',
    meta: 'Python · NLP · 2018',
    kicker: 'Academic extension',
    desc: 'A Flask application that runs named entity recognition over Reddit comment threads surfaced around a given news article, then issues SPARQL queries against Wikipedia to resolve the political affiliations of identified entities, and scores the resulting threads by ideological valence. Given a URL, the system identifies the top relevant discussions, extracts comments, and surfaces a window into online discourse that was genuinely novel at the time. Worth noting the vintage: in 2026, LLMs can categorize political sentiment with far more nuance and far less scaffolding; in 2018, within a comparatively nascent NLP field, building this kind of pipeline from scratch was legitimately interesting and hard-won work.',
    gif: '/images/nlp-sentiment.gif',
    links: [
      { label: 'GitHub', url: 'https://github.com/klingj3/NLPPoliticalSentiment' },
    ],
  },
]

const ROMAN = ['i', 'ii', 'iii']

const TabWrap = styled.div`
  display: flex;
  align-items: flex-end;
  border-bottom: 1.5px solid ${INK_MID};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const Tab = styled.button`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.76rem, 1.3vw, 0.88rem);
  font-style: italic;
  padding: 0.5rem 1.1rem 0.45rem;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  z-index: ${({ $active }) => $active ? 1 : 0};
  color: ${({ $active }) => $active ? INK_RED : INK_LIGHT};
  background: ${({ $active }) => $active ? PAPER : 'transparent'};
  border-top: ${({ $active }) => $active ? `1.5px solid ${INK_MID}` : '1.5px solid transparent'};
  border-left: ${({ $active }) => $active ? `1.5px solid ${INK_MID}` : '1.5px solid transparent'};
  border-right: ${({ $active }) => $active ? `1.5px solid ${INK_MID}` : '1.5px solid transparent'};
  border-bottom: ${({ $active }) => $active ? `1.5px solid ${PAPER}` : 'none'};
  margin-bottom: ${({ $active }) => $active ? '-1.5px' : '0'};
  &:hover { color: ${({ $active }) => $active ? INK_RED : INK_MID}; }
`

const Panel = styled.div`
  border: 1.5px solid ${INK_MID};
  border-top: none;
  background: ${SHADE};
  padding: clamp(1.25rem, 3vw, 1.85rem) clamp(1.25rem, 3vw, 2rem);
  overflow: hidden;
`

const Kicker = styled.div`
  ${typeKicker}
  margin-bottom: 0.4rem;
`

const HeadRow = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${RULE};
  padding-bottom: 0.75rem;
`

const Headword = styled.span`
  font-weight: 700;
  font-size: clamp(1.3rem, 3vw, 1.75rem);
  color: ${INK};
  letter-spacing: -0.01em;
`

const Meta = styled.span`
  ${typeItalicMeta}
  font-size: clamp(0.76rem, 1.2vw, 0.86rem);
  margin-left: auto;
  @media (max-width: 520px) { margin-left: 0; }
`

const Body = styled.div`
  &::after {
    content: '';
    display: table;
    clear: both;
  }
`

const DescCol = styled.div``

const GifCol = styled.div`
  float: right;
  width: min(300px, 42%);
  margin: 0.15rem 0 1rem 1.75rem;

  @media (max-width: 600px) {
    float: none;
    width: 100%;
    margin: 0 0 1.25rem 0;
  }
`

const Desc = styled.p`
  ${typeCopy}
  color: ${inkAlpha(0.7)};
  margin: 0 0 1.1rem;
`

const GifFrame = styled.div`
  border: 1px solid ${RULE};
  border-radius: 2px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: ${inkAlpha(0.025)};
`

const GifImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 380px;
  object-fit: contain;
  display: block;
`

const TryIt = styled.div`
  ${typeItalicMeta}
  font-size: clamp(0.78rem, 1.2vw, 0.86rem);
  color: ${INK_MID};
  margin-bottom: 1rem;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const TryItCmd = styled.code`
  font-family: 'Courier New', Courier, monospace;
  font-style: normal;
  font-size: 0.85em;
  background: ${inkAlpha(0.06)};
  border: 1px solid ${RULE};
  border-radius: 2px;
  padding: 0.15em 0.45em;
  color: ${INK};
  letter-spacing: 0;
  user-select: all;
`

const ExtIcon = () => (
  <svg viewBox="0 0 16 16">
    <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
    <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
  </svg>
)

const contentVariants = {
  enter: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16 } },
}

const Projects = () => {
  const [active, setActive] = useState(0)
  const proj = PROJECTS[active]

  return (
    <PageSection id="projects">
      <ContentWrap>
        <SectionDivider initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          ❦
        </SectionDivider>
        <RubricSectionHeading initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          Selected Projects
        </RubricSectionHeading>
        <SectionPreface initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          Side projects have never been my primary outlet: when gainfully employed in a role with room to experiment on
          meaningful
          problems using cutting edge technology, which I've been fortunate to have the last 5 years in particular, I believe my company is
          entitled to my programming energy and creative ideas.
          <br /><br />
          What follows is a mix. The older projects predate the LLM era; despite their age, they provide useful signal.
          In a landscape where AI tooling makes it trivially easy to ship polished hobby-grade software, pre-LLM work
          demonstrates the ability to produce interesting, novel things without modern shortcuts. The newer items are
          small curiosities I've been picking at during the hour or two I carve out each day on paternity leave.
        </SectionPreface>

        <motion.div initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          <TabWrap>
            {PROJECTS.map((p, i) => (
              <Tab key={i} $active={active === i} onClick={() => setActive(i)}>
                {ROMAN[i]}.&ensp;{p.hw}
              </Tab>
            ))}
            <div style={{ flex: 1 }} />
          </TabWrap>

          <Panel>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} variants={contentVariants} initial="enter" animate="visible" exit="exit">
                <Kicker>{proj.kicker}</Kicker>
                <HeadRow>
                  <Headword>{proj.hw}</Headword>
                  <Meta>{proj.meta}</Meta>
                </HeadRow>
                <Body>
                  <GifCol>
                    <GifFrame>
                      <GifImg src={proj.gif} alt={`${proj.hw} demo`} loading="lazy" />
                    </GifFrame>
                  </GifCol>
                  <DescCol>
                    <Desc>{proj.desc}</Desc>
                    {proj.tryIt && (
                      <TryIt>
                        <span style={{ fontStyle: 'italic', color: INK_LIGHT, whiteSpace: 'nowrap' }}>Try it out:</span>
                        <TryItCmd>{proj.tryIt}</TryItCmd>
                      </TryIt>
                    )}
                    <LinkRow>
                      {proj.links.map((l, li) => (
                        <ExternalLink key={li} href={l.url} target="_blank" rel="noopener noreferrer">
                          <ExtIcon />
                          {l.label}
                        </ExternalLink>
                      ))}
                    </LinkRow>
                  </DescCol>
                </Body>
              </motion.div>
            </AnimatePresence>
          </Panel>
        </motion.div>
      </ContentWrap>
    </PageSection>
  )
}

export default Projects
