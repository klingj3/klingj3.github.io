import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  padding: clamp(4rem, 10vh, 7rem) 0;
`

const Wrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
`

const Tag = styled(motion.div)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #2CA58D;
  margin-bottom: 0.75rem;
`

const Headline = styled(motion.h2)`
  font-family: 'Righteous', cursive;
  font-size: clamp(3rem, 9vw, 6rem);
  color: #eef1f5;
  line-height: 1;
  margin-bottom: 1.5rem;
`

const Email = styled(motion.a)`
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  color: #2CA58D;
  padding: 0.7rem 1.8rem;
  border: 2px solid rgba(44, 165, 141, 0.35);
  border-radius: 10px;
  background: rgba(44, 165, 141, 0.06);
  text-decoration: none;
  transition: all 0.25s;

  &:hover {
    border-color: #2CA58D;
    background: rgba(44, 165, 141, 0.12);
    color: #3dd4b0;
    box-shadow: 0 4px 25px rgba(44, 165, 141, 0.2);
    transform: translateY(-2px);
  }
`

const Socials = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(238, 241, 245, 0.4);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  text-decoration: none;
  transition: color 0.2s;

  svg { width: 20px; height: 20px; fill: currentColor; }

  &:hover { color: #2CA58D; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const vp = { once: true, margin: '-40px' }

const Contact = () => (
  <Section id="contact">
    <Wrap>
      <Tag initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>03 — Contact</Tag>
      <Headline initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
        Let's talk.
      </Headline>
      <Email href="mailto:jkklingelhofer@gmail.com" initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
        jkklingelhofer@gmail.com
      </Email>
      <Socials initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}>
        <SocialLink href="https://github.com/klingj3" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </SocialLink>
        <SocialLink href="https://linkedin.com/in/john-klingelhofer-349892a5" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </SocialLink>
      </Socials>
    </Wrap>
  </Section>
)

export default Contact
