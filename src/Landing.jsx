import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion } from 'framer-motion'
import { Layout } from './components'
import {
  INK, INK_MID, INK_LIGHT, INK_RED, RULE,
  FONT_SERIF_ALT, CONTENT_PADDING
} from './styles/theme'

const EMAIL = 'john@klingelhofer.me'

const Stage = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${CONTENT_PADDING};
`

const Card = styled(motion.div)`
  width: 100%;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

// Name with a red rule beneath it, broken at center by the ❦ fleuron used as
// section dividers on the résumé. The rule stretches to the name's width.
const NameBlock = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  font-size: clamp(2.5rem, 7vw, 3.9rem);
`

const Name = styled.h1`
  margin: 0;
  font-weight: 700;
  font-size: 1em;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${INK};
`

const lineDraw = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
`

const FleuronRule = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  margin-top: 0.35rem;
  color: ${INK_RED};
  user-select: none;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    animation: ${lineDraw} 0.9s cubic-bezier(0.65, 0, 0.35, 1) 0.5s forwards;
  }
  &::before { transform-origin: right center; }
  &::after  { transform-origin: left center; }

  @media (prefers-reduced-motion: reduce) {
    &::before, &::after { animation: none; transform: scaleX(1); }
  }
`

const Fleuron = styled.span`
  font-size: 1.05rem;
  line-height: 1;
  transform: translateY(-0.04em);
`

const Title = styled(motion.p)`
  margin-top: 1.3rem;
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(1.2rem, 2.6vw, 1.45rem);
  font-style: italic;
  letter-spacing: 0.01em;
  color: ${INK_MID};
`

const StatusNote = styled(motion.p)`
  max-width: 30rem;
  margin-top: 1.3rem;
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(1rem, 1.8vw, 1.12rem);
  line-height: 1.7;
  color: ${INK_MID};
`

// The label fades up a beat after the page settles. No underline.
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`

const ResumeLink = styled.a`
  margin-top: 2.4rem;
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(1.15rem, 2.2vw, 1.32rem);
  letter-spacing: 0.02em;
  text-decoration: none;
  color: ${INK};
  transition: color 0.2s ease;

  &:hover { color: ${INK_RED}; }
`

const Label = styled.span`
  opacity: 0;
  animation: ${fadeUp} 0.7s ease 1.6s forwards;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const Contact = styled(motion.div)`
  width: 100%;
  max-width: 32rem;
  margin-top: 2.8rem;
  padding-top: 1.6rem;
  border-top: 1px solid ${RULE};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
`

const contactItem = `
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${FONT_SERIF_ALT};
  font-size: 1rem;
  color: ${INK_MID};
  transition: color 0.2s;

  svg { width: 16px; height: 16px; fill: currentColor; }
  &:hover { color: ${INK}; }
`

const ContactLink = styled.a`${contactItem}`

const ContactButton = styled.button`
  ${contactItem}
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  letter-spacing: inherit;
`

const Copied = styled.span`
  font-style: italic;
  color: ${INK_RED};
`

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } }
}

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const Landing = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fall back to mailto.
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <Layout>
      <Stage>
        <Card variants={container} initial="hidden" animate="show">
          <motion.div variants={rise}>
            <NameBlock>
              <Name>John Klingelhofer</Name>
              <FleuronRule><Fleuron>❦</Fleuron></FleuronRule>
            </NameBlock>
          </motion.div>

          <Title variants={rise}>Senior Software Engineer</Title>

          <StatusNote variants={rise}>
            AI-driven systems and fullstack development for healthcare and medicine.
            Open to remote senior IC and tech lead roles.
          </StatusNote>

          <ResumeLink href="/resume">
            <Label>R&eacute;sum&eacute; &rarr;</Label>
          </ResumeLink>

          <Contact variants={rise}>
            <ContactButton
              type="button"
              onClick={copyEmail}
              aria-label={copied ? 'Email address copied' : `Copy email address ${EMAIL}`}
              title="Click to copy"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
              {copied ? <Copied>Copied!</Copied> : EMAIL}
            </ContactButton>
            <ContactLink href="https://github.com/klingj3" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </ContactLink>
            <ContactLink href="https://www.linkedin.com/in/john-k-349892a5/" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </ContactLink>
          </Contact>
        </Card>
      </Stage>
    </Layout>
  )
}

export default Landing
