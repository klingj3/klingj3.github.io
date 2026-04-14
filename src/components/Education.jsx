import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  padding: clamp(3rem, 8vh, 5rem) 0;
  background: #111520;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled(motion.div)`
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: #141821;
  transition: border-color 0.25s;

  &:hover {
    border-color: rgba(44, 165, 141, 0.3);
  }
`

const Logo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(44, 165, 141, 0.3);
  margin-bottom: 1rem;
`

const School = styled.h3`
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: #eef1f5;
  margin: 0 0 0.5rem;
  line-height: 1.25;
`

const Degree = styled.div`
  font-size: 0.9rem;
  color: #2CA58D;
  font-weight: 600;
  margin-bottom: 0.4rem;
`

const Details = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 0.88rem;
  color: rgba(238, 241, 245, 0.6);
  line-height: 1.6;
  margin: 0 0 0.75rem;
`

const Meta = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(238, 241, 245, 0.35);
`

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const vp = { once: true, margin: '-40px' }

const schools = [
  {
    logo: '/images/rpi_logo.jpg',
    name: 'Rensselaer Polytechnic Institute',
    degree: 'BS Computer Science, Cum Laude',
    details: 'AI and Data Concentration',
    meta: 'Graduated 2018 · Troy, NY'
  },
  {
    logo: '/images/clark_logo.jpg',
    name: 'Clark University',
    degree: null,
    details: 'Two years in Liberal Arts before transferring to RPI',
    meta: '2012–2014 · Worcester, MA'
  }
]

const Education = () => (
  <Section id="education">
    <Wrap>
      <Header initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
        <Tag>02 — Education</Tag>
        <Title>Background</Title>
        <Dot />
      </Header>
      <Grid>
        {schools.map((s, i) => (
          <Card key={i} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
            <Logo src={s.logo} alt={s.name} />
            <School>{s.name}</School>
            {s.degree && <Degree>{s.degree}</Degree>}
            <Details>{s.details}</Details>
            <Meta>{s.meta}</Meta>
          </Card>
        ))}
      </Grid>
    </Wrap>
  </Section>
)

export default Education
