import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import {
  INK, INK_LIGHT, INK_MID, INK_RED, RULE,
  FONT_SERIF_ALT, inkAlpha,
  CONTENT_WIDTH, CONTENT_PADDING
} from './theme'

export const typeCopy = css`
  font-size: clamp(0.82rem, 1.3vw, 0.92rem);
  line-height: 1.8;
  text-align: justify;
  hyphens: auto;
`

export const typeKicker = css`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.78rem;
  font-style: italic;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${INK_LIGHT};
`

export const typeItalicMeta = css`
  font-family: ${FONT_SERIF_ALT};
  font-style: italic;
  color: ${INK_LIGHT};
`

export const PageSection = styled.section`
  padding: clamp(2.5rem, 6vh, 4rem) 0;
`

// ── Layout ──

export const ContentWrap = styled.div`
  max-width: ${CONTENT_WIDTH};
  margin: 0 auto;
  padding: ${CONTENT_PADDING};
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
  font-weight: 700;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  color: ${INK};
  text-align: center;
  margin-bottom: clamp(1.1rem, 2.5vw, 1.85rem);
  letter-spacing: -0.01em;
`

/** Main section titles (rubric red). */
export const RubricSectionHeading = styled(SectionHeading)`
  color: ${INK_RED};
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

export const SectionPronunciation = styled(motion.p)`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.82rem, 1.4vw, 0.94rem);
  font-style: italic;
  color: ${INK_MID};
  text-align: center;
  margin: -0.6rem 0 1.4rem;
`

export const SectionPreface = styled(motion.p)`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.88rem, 1.5vw, 1rem);
  color: ${INK_MID};
  line-height: 1.82;
  max-width: 680px;
  margin: 0 auto clamp(1.75rem, 4vw, 2.5rem);
`

export const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const ExternalLink = styled.a`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.85rem;
  color: ${INK_MID};
  padding: 0.3rem 0.65rem;
  border: 1px solid ${RULE};
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.2s, border-color 0.2s;
  &:hover { color: ${INK}; border-color: ${inkAlpha(0.32)}; }
  svg { width: 11px; height: 11px; fill: currentColor; flex-shrink: 0; }
`

export const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const sectionViewport = { once: true, margin: '-40px' }
