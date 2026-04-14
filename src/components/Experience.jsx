import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

const Section = styled.section`
  padding: clamp(3rem, 8vh, 5rem) 0;
`

const Wrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
`

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: clamp(3rem, 5vw, 4rem);
`

const Tag = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #2CA58D;
  margin-bottom: 0.75rem;
`

const Title = styled.h2`
  font-family: 'Righteous', cursive;
  font-size: clamp(2rem, 5vw, 3rem);
  color: #eef1f5;
`

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2CA58D;
  margin: 1rem auto 0;
`

/* Tag filter bar */

const FilterBar = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: clamp(2.5rem, 5vw, 3.5rem);
`

const FilterPill = styled.button`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  border: 1px solid rgba(44, 165, 141, 0.25);
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ $active }) => $active ? 'rgba(44, 165, 141, 0.2)' : 'transparent'};
  color: ${({ $active }) => $active ? '#3dd4b0' : 'rgba(238, 241, 245, 0.5)'};
  border-color: ${({ $active }) => $active ? '#2CA58D' : 'rgba(44, 165, 141, 0.25)'};

  &:hover {
    border-color: #2CA58D;
    color: #3dd4b0;
    background: rgba(44, 165, 141, 0.1);
  }
`

const ClearBtn = styled.button`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  border: 1px solid rgba(238, 241, 245, 0.15);
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  color: rgba(238, 241, 245, 0.4);

  &:hover {
    border-color: rgba(238, 241, 245, 0.3);
    color: rgba(238, 241, 245, 0.7);
  }
`

const CompanyBlock = styled(motion.div)`
  transition: opacity 0.4s ease;
  opacity: ${({ $dimmed }) => $dimmed ? 0.2 : 1};

  & + & {
    margin-top: clamp(3rem, 6vw, 5rem);
    padding-top: clamp(3rem, 6vw, 5rem);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
`

const CompanyHead = styled(motion.div)`
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(44, 165, 141, 0.3);
`

const CompanyName = styled.h3`
  font-family: 'Righteous', cursive;
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  color: #eef1f5;
  margin: 0;
`

const CompanyLoc = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: rgba(238, 241, 245, 0.4);
`

/* Featured project (Muse) — collapsible */

const MuseToggle = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding: clamp(1rem, 2vw, 1.25rem) clamp(1.25rem, 2.5vw, 1.75rem);
  background: #141821;
  border: 1px solid rgba(44, 165, 141, 0.3);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;
  text-align: left;

  &:hover {
    border-color: #2CA58D;
    background: #181d28;
  }
`

const ToggleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`

const ToggleBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #3dd4b0;
  background: rgba(44, 165, 141, 0.1);
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #3dd4b0;
  }
`

const ToggleTitle = styled.span`
  font-family: 'Righteous', cursive;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: #eef1f5;
`

const Chevron = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: #2CA58D;
  transition: transform 0.3s ease;
  ${({ $open }) => $open && css`transform: rotate(180deg);`}

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`

const FeaturedCard = styled.div`
  background: #141821;
  border: 1px solid rgba(44, 165, 141, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  position: relative;
`

const FeaturedSub = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.9rem;
  color: #2CA58D;
  font-weight: 500;
  margin-bottom: 1.25rem;
`

const FeaturedDesc = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: clamp(0.88rem, 1.3vw, 1rem);
  color: rgba(238, 241, 245, 0.65);
  line-height: 1.8;
  margin: 0 0 1.5rem;
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 2rem;
`

const LinkPill = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #2CA58D;
  padding: 0.45rem 0.9rem;
  border: 1px solid rgba(44, 165, 141, 0.3);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: rgba(44, 165, 141, 0.1);
    border-color: #2CA58D;
    color: #3dd4b0;
  }

  svg { width: 12px; height: 12px; fill: currentColor; flex-shrink: 0; }
`

const Quotes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const QuoteBox = styled.div`
  padding-left: 1rem;
  border-left: 2px solid #2CA58D;
`

const QText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-style: italic;
  font-size: 0.88rem;
  color: rgba(238, 241, 245, 0.8);
  line-height: 1.65;
  margin: 0 0 0.5rem;
`

const QAuthor = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #2CA58D;
`

/* Standard roles */

const RoleWrap = styled(motion.div)`
  transition: opacity 0.4s ease;
  opacity: ${({ $dimmed }) => $dimmed ? 0.2 : 1};

  & + & {
    margin-top: 1rem;
  }
`

const RoleItem = styled(motion.div)`
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition: border-color 0.25s;

  &:hover {
    border-color: rgba(44, 165, 141, 0.25);
  }
`

const RoleTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`

const RoleName = styled.h4`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  color: #2CA58D;
  margin: 0;
`

const RolePeriod = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: rgba(238, 241, 245, 0.35);
`

const RoleDesc = styled.li`
  font-family: 'Open Sans', sans-serif;
  font-size: clamp(0.88rem, 1.3vw, 1rem);
  color: rgba(238, 241, 245, 0.6);
  line-height: 1.75;
  margin: 0;
  padding-left: 0.25rem;

  & + & { margin-top: 0.6rem; }
`

const BulletList = styled.ul`
  list-style: disc;
  padding-left: 1.25rem;
  margin: 0;

  li::marker {
    color: rgba(44, 165, 141, 0.5);
  }
`

const RoleTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
`

const RoleTag = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.02em;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: ${({ $active }) => $active ? 'rgba(44, 165, 141, 0.22)' : 'rgba(44, 165, 141, 0.08)'};
  color: ${({ $active }) => $active ? '#3dd4b0' : 'rgba(44, 165, 141, 0.6)'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(44, 165, 141, 0.5)' : 'rgba(44, 165, 141, 0.12)'};
  ${({ $active }) => $active && css`box-shadow: 0 0 8px rgba(44, 165, 141, 0.2);`}
`

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const vp = { once: true, margin: '-40px' }


const ChevronDown = () => <svg viewBox="0 0 16 16"><path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>
const ExtIcon = () => <svg viewBox="0 0 16 16"><path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
const VidIcon = () => <svg viewBox="0 0 16 16"><path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z"/></svg>

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
        { label: 'Watch: CEO highlights Muse on CNBC (first appearance)', url: 'https://youtu.be/S52cNcbp0e4?t=133', icon: 'vid' },
        { label: 'Blog — Pt. 1', url: 'https://www.formation.bio/blog/behind-the-scenes-of-muse-part1', icon: 'ext' },
        { label: 'Blog — Pt. 2', url: 'https://www.formation.bio/blog/behind-the-scenes-of-muse-part2', icon: 'ext' },
      ],
      quotes: [
        { text: "The development of Muse represents another proof point in Sanofi's journey to becoming the first pharma company powered by AI at scale.", author: "Emmanuel Frenehard, Sanofi CDO" },
        { text: "We believe AI can accelerate drug development, bringing new treatments to patients more quickly... we can't wait to see the impact Muse will have.", author: "Brad Lightcap, OpenAI COO" },
      ]
    },
    roles: [
      { title: 'Senior Software Engineer', period: '08/2023 – Present',
        tags: ['Python', 'Non-LLM AI', 'LLMs', 'Computer Vision', 'Data Engineering', 'React', 'SQL', 'Fullstack'],
        details: [
          "Senior IC driving AI/ML initiatives across the organization. Most projects are proprietary and can't be discussed publicly, but the work spans NLP, computer vision, predictive modeling, and data infrastructure, with involvement across the full lifecycle from research and prototyping through production.",
          "Muse (see featured project above) is a rare exception and one of the few projects I can discuss in full public detail, serving as a good window into the kind of work I do more broadly.",
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
  opacity: ${({ $dimmed }) => $dimmed ? 0.2 : 1};
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const MuseSection = ({ featured, dimmed, layoutId }) => {
  const [open, setOpen] = useState(false)

  return (
    <FeaturedWrap $dimmed={dimmed} layout layoutId={layoutId}>
      <MuseToggle
        onClick={() => setOpen(o => !o)}
        style={open ? { borderRadius: '12px 12px 0 0' } : undefined}
      >
        <ToggleLeft>
          <ToggleBadge>Featured Project</ToggleBadge>
          <ToggleTitle>{featured.title}</ToggleTitle>
        </ToggleLeft>
        <Chevron $open={open}><ChevronDown /></Chevron>
      </MuseToggle>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="muse-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <FeaturedCard>
              <FeaturedSub>{featured.subtitle}</FeaturedSub>
              <FeaturedDesc>{featured.description}</FeaturedDesc>
              <Links>
                {featured.links.map((l, i) => (
                  <LinkPill key={i} href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.icon === 'vid' ? <VidIcon /> : <ExtIcon />}
                    {l.label}
                  </LinkPill>
                ))}
              </Links>
             
              <Quotes>
                {featured.quotes.map((q, i) => (
                  <QuoteBox key={i}>
                    <QText>{q.text}</QText>
                    <QAuthor>— {q.author}</QAuthor>
                  </QuoteBox>
                ))}
              </Quotes>
            </FeaturedCard>
          </motion.div>
        )}
      </AnimatePresence>
    </FeaturedWrap>
  )
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

  const stableSort = (arr, compareFn) => {
    const indexed = arr.map((item, i) => ({ item, i }))
    indexed.sort((a, b) => compareFn(a.item, b.item) || a.i - b.i)
    return indexed.map(({ item }) => item)
  }

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
      <Wrap>
        <Header initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          <Tag>01 — Experience</Tag>
          <Title>Where I've Worked</Title>
          <Dot />
        </Header>

        <FilterBar initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
          {allTags.map(t => (
            <FilterPill key={t} $active={activeTags.has(t)} onClick={() => toggleTag(t)}>
              {t}
            </FilterPill>
          ))}
          {isFiltering && <ClearBtn onClick={() => setActiveTags(new Set())}>Clear</ClearBtn>}
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
              <CompanyBlock
                key={co.name}
                layout
                layoutId={`company-${co.name}`}
                transition={layoutTransition}
                $dimmed={companyDimmed}
              >
                <CompanyHead initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
                  <CompanyName>{co.name}</CompanyName>
                  <CompanyLoc>{co.location}</CompanyLoc>
                </CompanyHead>

                {co.featured && (
                  <MuseSection
                    featured={co.featured}
                    dimmed={companyDimmed ? false : (isFiltering && !featuredMatch)}
                    layoutId={`featured-${co.name}`}
                  />
                )}

                {sortedRoles.map((r) => {
                  const roleKey = `${co.name}-${r.title}-${r.period}`
                  const roleMatches = matches(r.tags)
                  const roleDimmed = isFiltering && !roleMatches

                  return (
                    <RoleWrap
                      key={roleKey}
                      layout
                      layoutId={roleKey}
                      transition={layoutTransition}
                      $dimmed={companyDimmed ? false : roleDimmed}
                    >
                      <RoleItem initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
                        <RoleTop>
                          <RoleName>{r.title}</RoleName>
                          <RolePeriod>{r.period}</RolePeriod>
                        </RoleTop>
                        {r.tags && (
                          <RoleTags>
                            {r.tags.map(t => (
                              <RoleTag key={t} $active={activeTags.has(t)}>{t}</RoleTag>
                            ))}
                          </RoleTags>
                        )}
                        <BulletList>
                          {r.details.map((d, di) => <RoleDesc key={di}>{d}</RoleDesc>)}
                        </BulletList>
                      </RoleItem>
                    </RoleWrap>
                  )
                })}
              </CompanyBlock>
            )
          })}
        </LayoutGroup>
      </Wrap>
    </Section>
  )
}

export default Experience
