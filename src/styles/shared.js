import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  INK, INK_LIGHT, RULE,
  FONT_SERIF, FONT_SERIF_ALT,
  CONTENT_WIDTH, CONTENT_PADDING
} from './theme'

// ── Layout ──

export const ContentWrap = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || CONTENT_WIDTH};
  margin: 0 auto;
  padding: ${CONTENT_PADDING};
  ${({ $extraCss }) => $extraCss || ''}
`

// ── Section Header Bar (guide-word bar) ──

export const SectionBar = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1.5px solid ${INK};
  padding-bottom: 0.3rem;
  margin-bottom: 0.6rem;
`

export const SectionGuide = styled.span`
  font-family: ${FONT_SERIF};
  font-weight: 700;
  font-size: clamp(0.75rem, 1.5vw, 0.9rem);
  color: ${INK};
  text-transform: lowercase;
  letter-spacing: 0.02em;
`

export const SectionPage = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  color: ${INK_LIGHT};
  font-style: italic;
`

// ── Ornamental Divider ──

export const Ornament = styled.div`
  text-align: center;
  margin: 1.5rem 0 2rem;
  color: ${INK_LIGHT};
  font-size: 0.85rem;
  letter-spacing: 0.5em;
  user-select: none;
  &::before { content: '—  ❦  —'; }
`

// ── Section Divider (dictionary-style break between major sections) ──

export const SectionDivider = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.65rem;
  user-select: none;
  color: ${INK_LIGHT};
  font-size: 0.9rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${INK_LIGHT} 30%,
      ${INK_LIGHT} 70%,
      transparent
    );
    opacity: 0.4;
  }
`

// ── Section Heading ──

export const SectionHeading = styled(motion.h2)`
  font-family: ${FONT_SERIF};
  font-weight: 700;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  color: ${INK};
  text-align: center;
  margin-bottom: clamp(1.1rem, 2.5vw, 1.85rem);
  letter-spacing: -0.01em;
`

// ── Entry Rule (thin separator line) ──

export const EntryRule = styled.hr`
  border: none;
  height: 1px;
  background: ${RULE};
`

// ── Definition Number ──

export const DefNumber = styled.span`
  font-weight: 700;
  margin-right: 0.3rem;
`

// ── Animation Variants ──

export const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const sectionViewport = { once: true, margin: '-40px' }
