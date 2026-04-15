import styled from 'styled-components'
import { motion } from 'framer-motion'
import { INK, INK_MID, INK_LIGHT, RULE, FONT_SERIF_ALT } from '../styles/theme'
import {
  ContentWrap, SectionDivider, RubricSectionHeading,
  fadeUp, sectionViewport
} from '../styles/shared'

const Section = styled.section`
  padding: clamp(2.5rem, 6vh, 4rem) 0;
`

const EduGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  max-width: 26rem;
  margin: 0 auto;
`

const EduEntry = styled(motion.div)`
  width: 100%;
  text-align: center;
`

const EntryHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-bottom: 0.15rem;
`

const Logo = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  filter: grayscale(1);
  opacity: 0.75;
`

const SchoolName = styled.h3`
  font-weight: 700;
  font-size: clamp(0.9rem, 1.9vw, 1.05rem);
  color: ${INK};
  line-height: 1.3;
`

const Degree = styled.div`
  font-size: clamp(0.82rem, 1.45vw, 0.9rem);
  color: ${INK};
  line-height: 1.55;
`

const Detail = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-style: italic;
  color: ${INK_MID};
`

const Meta = styled.div`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.78rem;
  font-style: italic;
  color: ${INK_LIGHT};
  margin-top: 0.25rem;
`

const schools = [
  {
    logo: '/images/rpi_logo.jpg',
    name: 'Rensselaer Polytechnic Institute',
    lines: ['BS Computer Science, Cum Laude', 'Concentration in AI and Data'],
    meta: 'Class of 2018 · Troy, NY'
  },
  {
    logo: '/images/clark_logo.jpg',
    name: 'Clark University',
    lines: ['Liberal Arts, two years before transferring to RPI'],
    meta: '2012–2014 · Worcester, MA'
  }
]

const Education = () => (
  <Section id="education">
    <ContentWrap>
      <SectionDivider initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>❦</SectionDivider>
      <RubricSectionHeading initial="hidden" whileInView="visible" viewport={sectionViewport} variants={fadeUp}>Education</RubricSectionHeading>

      <EduGrid>
        {schools.map((s) => (
          <EduEntry
            key={s.name}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={fadeUp}
          >
            <EntryHead>
              <Logo src={s.logo} alt="" loading="lazy" decoding="async" />
              <SchoolName>{s.name}</SchoolName>
            </EntryHead>
            {s.lines.map((line, i) => (
              <Degree key={i}>
                {i === 0 ? line : <Detail>{line}</Detail>}
              </Degree>
            ))}
            <Meta>{s.meta}</Meta>
          </EduEntry>
        ))}
      </EduGrid>
    </ContentWrap>
  </Section>
)

export default Education
