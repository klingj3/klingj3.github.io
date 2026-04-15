import { useState } from 'react'
import styled from 'styled-components'
import { motion, LayoutGroup } from 'framer-motion'
import {
  INK, INK_MID, INK_LIGHT, INK_RED, RULE, SHADE,
  FONT_SERIF_ALT, inkAlpha
} from '../styles/theme'
import {
  ContentWrap, SectionDivider, RubricSectionHeading,
  fadeUp, sectionViewport
} from '../styles/shared'

const Section = styled.section`
  padding: clamp(2.5rem, 6vh, 4rem) 0;
`

/* --- filter bar as subject labels --- */

const FilterBar = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: clamp(1.35rem, 3vw, 2rem);
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.78rem;
`

const TagChipBase = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-style: normal;
  font-weight: 500;
  border: 1px solid ${({ $active }) => $active ? INK_RED : RULE};
  border-radius: 2px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  background: ${({ $active }) => $active ? 'rgba(139, 58, 58, 0.12)' : SHADE};
  color: ${({ $active }) => $active ? INK_RED : INK_MID};
`

const FilterLabel = styled(TagChipBase).attrs({ as: 'button' })`
  font-size: 0.76rem;
  padding: 0.38rem 0.55rem;
  cursor: pointer;

  &:hover {
    color: ${INK};
    border-color: ${inkAlpha(0.32)};
    background: rgba(42, 36, 32, 0.04);
  }
`

const ClearBtn = styled.button`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.75rem;
  font-style: italic;
  padding: 0.2rem 0.4rem;
  border: none;
  cursor: pointer;
  background: none;
  color: ${INK_LIGHT};
  transition: color 0.2s;
  &:hover { color: ${INK}; }
`

/* --- company = dictionary entry --- */

const EntryBlock = styled(motion.div)`
  transition: opacity 0.4s ease;
  opacity: ${({ $dimmed }) => $dimmed ? 0.15 : 1};

  & + & {
    margin-top: clamp(1.75rem, 4vw, 2.75rem);
  }
`

const EntryHead = styled(motion.div)`
  margin-bottom: 0.55rem;
`

const EntryHeadword = styled.span`
  font-weight: 700;
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  color: ${INK};
  letter-spacing: -0.01em;
`

const EntryMeta = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.85rem, 1.8vw, 1rem);
  font-style: italic;
  color: ${INK_LIGHT};
  margin-left: 0.5rem;
`

/* --- Muse featured project (expanded, below Senior SWE) --- */

const MuseBlock = styled(motion.div)`
  margin: 1rem 0 0.5rem;
  padding: 1.25rem 1.1rem 1.35rem;
  background: ${SHADE};
  border: 1px solid ${RULE};
  border-radius: 2px;
`

const MuseKicker = styled.div`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.78rem;
  font-style: italic;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${INK_LIGHT};
  margin-bottom: 0.35rem;
`

const MuseTitleRow = styled.div`
  font-weight: 700;
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  color: ${INK};
  margin-bottom: 0.35rem;
`

const MuseSubtitle = styled.div`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.9rem, 1.6vw, 1rem);
  color: ${INK_MID};
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.45;
`

const MuseDesc = styled.p`
  font-size: clamp(0.82rem, 1.3vw, 0.92rem);
  color: ${inkAlpha(0.7)};
  line-height: 1.8;
  margin: 0 0 1.15rem;
  text-align: justify;
  hyphens: auto;
`

const RefLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`

const RefLink = styled.a`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.85rem;
  color: ${INK_MID};
  padding: 0.3rem 0.6rem;
  border: 1px solid ${RULE};
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: ${INK};
    border-color: ${inkAlpha(0.35)};
  }

  svg { width: 11px; height: 11px; fill: currentColor; vertical-align: -1px; margin-right: 0.3rem; }
`

const QuotesBlock = styled.div`
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid ${RULE};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PullQuote = styled.blockquote`
  padding: 0.85rem 0 0.85rem 1rem;
  border-left: 3px solid ${INK_MID};
  font-size: clamp(0.9rem, 1.45vw, 1.02rem);
  color: ${inkAlpha(0.78)};
  line-height: 1.65;
  font-style: italic;
`

const PullQuoteAttribution = styled.footer`
  margin-top: 0.65rem;
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 600;
  color: ${INK};
`

/* --- roles as sub-definitions --- */

const SubEntry = styled(motion.div)`
  transition: opacity 0.4s ease;
  opacity: ${({ $dimmed }) => $dimmed ? 0.15 : 1};
  margin-bottom: 0.6rem;
`

const SubEntryInner = styled(motion.div)`
  padding-left: 1.3rem;
`

const SubHead = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.3rem;
`

const SubTitle = styled.span`
  font-weight: 700;
  font-size: clamp(0.9rem, 1.5vw, 1.02rem);
  color: ${INK};
`

const SubPeriod = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.85rem;
  font-style: italic;
  color: ${INK_LIGHT};
`

const RoleTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.35rem 0 0.2rem;
  align-items: center;
`

const RoleTagChip = styled(TagChipBase)`
  font-size: 0.72rem;
  padding: 0.24rem 0.45rem;
  color: ${({ $active }) => $active ? INK_RED : INK_LIGHT};
`

const DetailList = styled.ul`
  padding-left: 1.35rem;
  list-style-type: disc;
  list-style-position: outside;
`

const DetailItem = styled.li`
  font-size: clamp(0.82rem, 1.3vw, 0.92rem);
  color: ${inkAlpha(0.65)};
  line-height: 1.8;
  margin-bottom: 0.4rem;
  text-align: justify;
  hyphens: auto;

  &::marker {
    color: ${INK_LIGHT};
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const ExtIcon = () => <svg viewBox="0 0 16 16"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
const VidIcon = () => <svg viewBox="0 0 16 16"><path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z"/></svg>

/** Short labels on square filter / role chips. */
const TAG_DISPLAY = {
  'Python': 'Python',
  'Non-LLM AI': 'A.I.',
  'LLMs': 'LLM',
  'Computer Vision': 'Comp. vis.',
  'Data Engineering': 'Data eng.',
  'React': 'React',
  'Java': 'Java',
  'SQL': 'SQL',
  'Fullstack': 'Fullstack',
  'Keras': 'Keras'
}

const TAG_ORDER = ['Python', 'Non-LLM AI', 'LLMs', 'Computer Vision', 'Data Engineering', 'React', 'Java', 'SQL', 'Fullstack', 'Keras']

const companies = [
  {
    name: 'Formation Bio',
    location: 'New York, NY',
    featured: {
      title: 'Muse',
      tags: ['Python', 'Non-LLM AI', 'LLMs'],
      subtitle: 'Built in 2024 — among the first production agentic AI systems in pharma',
      description: "Led backend architecture and implementation for Muse, an LLM-driven suite of tools that generates human-level, regulation-compliant recruitment materials for clinical trials — the result of a partnership with Sanofi and OpenAI. Built before agentic AI frameworks were widely available, Muse was a novel multi-agent system that brought AI-generated, regulation-compliant recruitment materials into production in the highly regulated pharmaceutical industry. No-code interfaces were developed to allow non-tech domain experts to experiment and tune system output. The project was a major company success and is now used in the real-world by Sanofi.",
      links: [
        { label: 'CNBC — CEO highlights Muse', url: 'https://youtu.be/S52cNcbp0e4?t=133', icon: 'vid' },
        { label: 'Blog — Pt. 1', url: 'https://www.formation.bio/blog/behind-the-scenes-of-muse-part1', icon: 'ext' },
        { label: 'Blog — Pt. 2', url: 'https://www.formation.bio/blog/behind-the-scenes-of-muse-part2', icon: 'ext' },
      ],
      quotes: [
        { text: "We believe AI can accelerate drug development, bringing new treatments to patients more quickly... we can't wait to see the impact Muse will have.", author: "Brad Lightcap, OpenAI COO" },
        { text: "The development of Muse represents another proof point in Sanofi's journey to becoming the first pharma company powered by AI at scale.", author: "Emmanuel Frenehard, Sanofi CDO" },
      ]
    },
    roles: [
      { title: 'Senior Software Engineer', period: '08/2023 – Present',
        tags: ['Python', 'Non-LLM AI', 'LLMs', 'Computer Vision', 'Data Engineering', 'React', 'SQL', 'Fullstack'],
        details: [
          "Senior IC driving AI/ML initiatives across the organization. Most projects are proprietary and can't be discussed publicly, but the work spans NLP, computer vision, predictive modeling, and data infrastructure, with involvement across the full lifecycle from research and prototyping through production.",
          "Muse (write-up below) is a rare exception and one of the few projects I can discuss in full public detail, serving as a good window into the kind of work I do more broadly.",
          "Across other initiatives: built custom scrapers and specialized extraction pipelines for pulling structured data from tables in medical literature (a notoriously hard problem where general LLMs fail, with what I believe is best-in-class accuracy for the domain); built Dagster-based ingestion and transformation pipelines for drug and indication datasets from disparate sources; developed predictive models for drug outcome forecasting and automated indication expansion."
        ]},
      { title: 'Software Engineer II', period: '10/2021 – 07/2023',
        tags: ['Python', 'React', 'Fullstack'],
        details: [
          "Fullstack contributions to multiple applications supporting form-building and deployment/management for nurse/patient use in clinical trial operations. (NestJS, Python, React)"
        ]}
    ]
  },
  {
    name: 'Memorial Sloan Kettering Cancer Center',
    location: 'New York, NY',
    roles: [
      { title: 'Software Engineer', period: '01/2021 – 10/2021',
        tags: ['Python', 'Java', 'SQL', 'Data Engineering'],
        details: [
          "Automated, optimized, and expanded upon system for transforming vast amounts of hospital data from disparate sources into the OMOP Common Data Model in order to facilitate research within MSK and possible future data sharing. (Python, SQL, Airflow)"
        ]}
    ]
  },
  {
    name: 'Annalect',
    location: 'New York, NY',
    roles: [
      { title: 'Software Engineer', period: '11/2020 – 01/2021',
        tags: ['Python', 'SQL', 'Non-LLM AI', 'Fullstack'],
        details: [
          "Full stack developer (Python, AngularJS, Redshift) on multiple core applications within Omni, the Marketing Science and Data software suite used across advertising agencies within Annalect's parent company Omnicom Media Group in planning campaigns for Omnicom's Fortune 100 clients.",
          "Contributed to disparate components of these applications across the tech stack, from UI overhauls, to creating a pipeline for ingesting client's first-party data into our application, and implementing machine-learning-driven features on the back end of our audience modeling application including lookalike modeling to expand advertised audiences."
        ]},
      { title: 'Junior Developer', period: '01/2019 – 10/2020',
        tags: ['Python', 'Non-LLM AI', 'Fullstack'],
        details: [
          "Full stack developer on multiple core Omni applications, contributing across the entire tech stack from frontend UI overhauls to backend ML feature implementation.",
          "Built data ingestion pipelines for client first-party data and implemented lookalike modeling for audience expansion."
        ]},
      { title: 'R&D Intern', period: '09/2018 – 12/2018',
        tags: ['Python', 'Keras', 'Non-LLM AI'],
        details: [
          "Worked on a variety of small and experimental projects within the Annalect R&D (\"Labs\") team, quickly prototyping applications independently working across the whole tech stack.",
          "Developed a recommendation engine system with Keras which could quickly derive strongly correlated websites from clickstream data and find differences in browsing behavior between consumers of different brands."
        ]}
    ]
  }
]

const allTags = (() => {
  const seen = new Set()
  companies.forEach(co => {
    if (co.featured) co.featured.tags?.forEach(t => seen.add(t))
    co.roles.forEach(r => r.tags?.forEach(t => seen.add(t)))
  })
  return TAG_ORDER.filter(t => seen.has(t))
})()

const FeaturedWrap = styled(motion.div)`
  transition: opacity 0.4s ease;
  opacity: ${({ $dimmed }) => $dimmed ? 0.15 : 1};
  margin-bottom: 1.25rem;
`

const MuseSection = ({ featured, dimmed, layoutId }) => (
  <FeaturedWrap $dimmed={dimmed} layout layoutId={layoutId}>
    <MuseBlock layout="position">
      <MuseKicker>Featured project</MuseKicker>
      <MuseTitleRow>{featured.title}</MuseTitleRow>
      <MuseSubtitle>{featured.subtitle}</MuseSubtitle>
      <MuseDesc>{featured.description}</MuseDesc>
      <RefLinks>
        {featured.links.map((l, i) => (
          <RefLink key={i} href={l.url} target="_blank" rel="noopener noreferrer">
            {l.icon === 'vid' ? <VidIcon /> : <ExtIcon />}
            {l.label}
          </RefLink>
        ))}
      </RefLinks>
      <QuotesBlock>
        {featured.quotes.map((q, i) => (
          <PullQuote key={i}>
            &ldquo;{q.text}&rdquo;
            <PullQuoteAttribution>{q.author}</PullQuoteAttribution>
          </PullQuote>
        ))}
      </QuotesBlock>
    </MuseBlock>
  </FeaturedWrap>
)

const stableSort = (arr, compareFn) => {
  const indexed = arr.map((item, i) => ({ item, i }))
  indexed.sort((a, b) => compareFn(a.item, b.item) || a.i - b.i)
  return indexed.map(({ item }) => item)
}

const Experience = () => {
  const [activeTags, setActiveTags] = useState(new Set())
  const isFiltering = activeTags.size > 0

  const toggleTag = (tag) =>
    setActiveTags(prev => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })

  const matches = (tags) => !isFiltering || tags?.some(t => activeTags.has(t))

  const sortedCompanies = isFiltering
    ? stableSort(companies, (a, b) => {
        const aMatch = a.roles.some(r => matches(r.tags)) || (a.featured && matches(a.featured.tags))
        const bMatch = b.roles.some(r => matches(r.tags)) || (b.featured && matches(b.featured.tags))
        return aMatch === bMatch ? 0 : aMatch ? -1 : 1
      })
    : companies

  const layoutTransition = { type: 'spring', stiffness: 500, damping: 40 }

  return (
    <Section id="experience">
      <ContentWrap>
        <SectionDivider initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>❦</SectionDivider>
        <RubricSectionHeading initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>Experience</RubricSectionHeading>

        <FilterBar initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
          {allTags.map(t => (
            <FilterLabel key={t} $active={activeTags.has(t)} onClick={() => toggleTag(t)}>
              {TAG_DISPLAY[t] || t}
            </FilterLabel>
          ))}
          {isFiltering && <ClearBtn onClick={() => setActiveTags(new Set())}>clear</ClearBtn>}
        </FilterBar>

        <LayoutGroup>
          {sortedCompanies.map((co) => {
            const featuredMatch = co.featured && matches(co.featured.tags)
            const anyRoleMatch = co.roles.some(r => matches(r.tags))
            const companyDimmed = isFiltering && !anyRoleMatch && !featuredMatch

            const sortedRoles = isFiltering
              ? stableSort(co.roles, (a, b) => {
                  const aMatch = matches(a.tags)
                  const bMatch = matches(b.tags)
                  return aMatch === bMatch ? 0 : aMatch ? -1 : 1
                })
              : co.roles

            return (
              <EntryBlock
                key={co.name}
                layout
                layoutId={`company-${co.name}`}
                transition={layoutTransition}
                $dimmed={companyDimmed}
              >
                <EntryHead initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
                  <EntryHeadword>{co.name}</EntryHeadword>
                  <EntryMeta>{co.location}</EntryMeta>
                </EntryHead>

                {sortedRoles.flatMap((r) => {
                  const roleKey = `${co.name}-${r.title}-${r.period}`
                  const roleMatches = matches(r.tags)
                  const roleDimmed = isFiltering && !roleMatches

                  const subEntry = (
                    <SubEntry
                      key={roleKey}
                      layout
                      layoutId={roleKey}
                      transition={layoutTransition}
                      $dimmed={companyDimmed ? false : roleDimmed}
                    >
                      <SubEntryInner initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>
                        <SubHead>
                          <SubTitle>{r.title}</SubTitle>
                          <SubPeriod>{r.period}</SubPeriod>
                        </SubHead>
                        {r.tags && (
                          <RoleTagRow>
                            {r.tags.map((t) => (
                              <RoleTagChip key={t} $active={activeTags.has(t)}>
                                {TAG_DISPLAY[t] || t}
                              </RoleTagChip>
                            ))}
                          </RoleTagRow>
                        )}
                        <DetailList>
                          {r.details.map((d, di) => (
                            <DetailItem key={di}>{d}</DetailItem>
                          ))}
                        </DetailList>
                      </SubEntryInner>
                    </SubEntry>
                  )

                  if (co.featured && r.title === 'Senior Software Engineer') {
                    return [
                      subEntry,
                      <MuseSection
                        key={`muse-${co.name}`}
                        featured={co.featured}
                        dimmed={companyDimmed ? false : (isFiltering && !featuredMatch)}
                        layoutId={`featured-${co.name}`}
                      />
                    ]
                  }

                  return [subEntry]
                })}
              </EntryBlock>
            )
          })}
        </LayoutGroup>
      </ContentWrap>
    </Section>
  )
}

export default Experience
