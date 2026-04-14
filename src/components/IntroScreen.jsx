import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const pulse = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem;
  position: relative;
`

const NameLine = styled(motion.div)`
  font-family: 'Righteous', cursive;
  font-size: clamp(4rem, 13vw, 8rem);
  line-height: 1;
  color: #2CA58D;
  text-shadow: 0 0 40px rgba(44, 165, 141, 0.15);
`

const LastNameStyled = styled(NameLine)`
  margin-top: -0.05em;
`

const Divider = styled(motion.div)`
  height: 3px;
  background: #2CA58D;
  border-radius: 2px;
  margin: 1.5rem 0;
  overflow: hidden;
`

const Tagline = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.85rem, 1.4vw, 1rem);
  color: rgba(238, 241, 245, 0.6);
  letter-spacing: 0.06em;
`

const TaglineAccent = styled.span`
  color: #2CA58D;
`

const NavRow = styled(motion.nav)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`

const NavPill = styled.a`
  font-family: 'Comfortaa', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(238, 241, 245, 0.5);
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: all 0.25s ease;

  &:hover {
    color: #2CA58D;
    border-color: rgba(44, 165, 141, 0.4);
    background: rgba(44, 165, 141, 0.08);
  }
`

const ScrollHint = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
`

const ScrollDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2CA58D;
  animation: ${pulse} 2s ease-in-out infinite;
`

const ScrollText = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(238, 241, 245, 0.3);
`

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const IntroScreen = () => (
  <HeroSection>
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <NameLine variants={fadeUp}>John</NameLine>
      <LastNameStyled variants={fadeUp}>Klingelhofer</LastNameStyled>
      <Divider
        variants={{
          hidden: { opacity: 0, width: 0 },
          show: {
            opacity: 1,
            width: 50,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
          }
        }}
      />
      <Tagline variants={fadeUp}>
        Software Engineer <TaglineAccent>/</TaglineAccent> New York, NY
      </Tagline>
      <NavRow variants={fadeUp}>
        <NavPill href="#experience">Experience</NavPill>
        <NavPill href="#education">Education</NavPill>
        <NavPill href="#contact">Contact</NavPill>
      </NavRow>
    </motion.div>
    <ScrollHint
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <ScrollDot />
      <ScrollText>scroll</ScrollText>
    </ScrollHint>
  </HeroSection>
)

export default IntroScreen
