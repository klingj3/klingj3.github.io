import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import {
  INK, INK_MID, INK_LIGHT, PAPER, RULE, SHADE,
  FONT_SERIF, FONT_SERIF_ALT, CONTENT_PADDING
} from '../styles/theme'
import {
  SectionBar, SectionGuide, SectionPage,
  EntryRule, DefNumber
} from '../styles/shared'

/* See also links: one left-to-right draw each, then line stays (forwards). */
const SEE_ALSO_UNDERLINE_DRAW_S = 1.75
const SEE_ALSO_UNDERLINE_GAP_S = 0.4
const SEE_ALSO_UNDERLINE_FIRST_DELAY_S = 2.35
const seeAlsoUnderlineDelay = (index) =>
  SEE_ALSO_UNDERLINE_FIRST_DELAY_S +
  index * (SEE_ALSO_UNDERLINE_DRAW_S + SEE_ALSO_UNDERLINE_GAP_S)

/* ── page-turn overlay ── */

const pageTurn = keyframes`
  0% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
  70% {
    clip-path: inset(0 100% 0 0);
    opacity: 1;
  }
  100% {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
`

const PageTurnOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: linear-gradient(
    90deg,
    ${PAPER} 0%,
    #ede7db 40%,
    #e8e0d0 60%,
    #ddd5c4 80%,
    #d0c8b6 100%
  );
  pointer-events: none;
  animation: ${pageTurn} 1.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06));
    pointer-events: none;
  }
`

/* ── layout ── */

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 3rem 0 5rem;

  @media (max-width: 768px) {
    padding: 2rem 0 4rem;
  }
`

const Wrap = styled.div`
  max-width: min(760px, 100%);
  margin: 0 auto;
  padding: ${CONTENT_PADDING};
  width: 100%;
  position: relative;
`

/* Senses 1–2 in one column; halftone plate in a ruled column to the right. */

const DefsWithPlate = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 0;
  margin-bottom: 0.5rem;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

const DefSensesColumn = styled.div`
  min-width: 0;
  padding-right: clamp(0.65rem, 1.8vw, 0.95rem);

  @media (max-width: 560px) {
    padding-right: 0;
  }
`

const PlateColumn = styled.div`
  border-left: 1px solid ${RULE};
  padding-left: clamp(0.75rem, 2vw, 1.05rem);
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 560px) {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid ${RULE};
    padding-top: 0.85rem;
    margin-top: 0.35rem;
    align-self: center;
    width: 100%;
    max-width: 11rem;
  }
`

const FigurePlate = styled.figure`
  margin: 0;
  padding: 0.42rem 0.42rem 0.38rem;
  background: ${SHADE};
  border: 1px solid ${RULE};
  border-radius: 1px;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.35),
    0 1px 0 rgba(42, 36, 32, 0.04);
  width: 7rem;

  @media (max-width: 560px) {
    width: min(9rem, 72vw);
  }
`

const HalftoneImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  filter: contrast(1.02);
`

const PlateCredit = styled.figcaption`
  display: block;
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.62rem;
  font-style: italic;
  color: ${INK_MID};
  text-align: center;
  margin-top: 0.28rem;
  line-height: 1.35;
  letter-spacing: 0.01em;
`

/* ── volume line ── */

const VolumeLine = styled(motion.div)`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.7rem, 1.3vw, 0.8rem);
  color: ${INK_LIGHT};
  text-align: center;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${RULE};
  }
`

/* ── guide word bar (extends shared SectionBar) ── */

const GuideWordBar = styled(SectionBar)`
  margin-bottom: 2rem;
`

/* ── headword ── */

const HeadwordRow = styled(motion.div)`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem 0.6rem;
  margin-bottom: 0.2rem;
`

const Headword = styled.span`
  font-family: ${FONT_SERIF};
  font-weight: 700;
  font-size: clamp(2.2rem, 5.5vw, 3rem);
  color: ${INK};
  letter-spacing: -0.01em;
  line-height: 1.15;
`

const Pronunciation = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(1rem, 2.2vw, 1.15rem);
  color: ${INK_MID};
  font-style: italic;
`

const PartOfSpeech = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-style: italic;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  color: ${INK_LIGHT};
`

/* ── definitions ── */

const RuleLine = styled(EntryRule)`
  margin: 0.7rem 0 0.9rem;
`

const Definition = styled(motion.div)`
  font-family: ${FONT_SERIF};
  font-size: clamp(0.88rem, 1.8vw, 0.97rem);
  color: ${INK};
  line-height: 1.7;
  margin-bottom: 0.5rem;
  padding-left: 1.3rem;
  text-indent: -1.3rem;
`

const DefLabel = styled.span`
  font-family: ${FONT_SERIF_ALT};
  font-style: italic;
  color: ${INK_MID};
`

const UsageExample = styled(motion.div)`
  font-family: ${FONT_SERIF_ALT};
  font-style: italic;
  font-size: clamp(0.92rem, 1.8vw, 1.02rem);
  color: ${INK_MID};
  line-height: 1.6;
  margin: 0.7rem 0 0.9rem 1.3rem;
`

/* ── etymology ── */

const EtymologyPanel = styled(motion.div)`
  background: ${SHADE};
  border-top: 1px solid ${RULE};
  border-bottom: 1px solid ${RULE};
  padding: 0.75rem 1rem;
  margin: 0.5rem 0 0.9rem;
  font-family: ${FONT_SERIF};
  font-size: clamp(0.78rem, 1.5vw, 0.86rem);
  color: ${INK_MID};
  line-height: 1.75;
`

const EtyLabel = styled.span`
  font-weight: 700;
  color: ${INK};
`

const EtyItalic = styled.span`
  font-style: italic;
`

const EtyBold = styled.span`
  font-weight: 700;
`

/* ── cross-references ("see also") ── */

const SeeAlsoBlock = styled(motion.div)`
  padding-top: 0.8rem;
  border-top: 1px solid ${RULE};
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`

const SeeAlsoLabel = styled.span`
  font-family: ${FONT_SERIF};
  font-weight: 700;
  font-style: italic;
  font-size: clamp(0.78rem, 1.5vw, 0.86rem);
  color: ${INK};
`

const SeeAlsoEntry = styled(motion.div)`
  font-family: ${FONT_SERIF};
  font-size: clamp(0.76rem, 1.4vw, 0.84rem);
  color: ${INK_MID};
  line-height: 1.7;
  padding-left: 1rem;
  display: inline;
`

const seeAlsoUnderlineDraw = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 0.35;
  }
  100% {
    transform: scaleX(1);
    opacity: 0.88;
  }
`

const SeeAlsoHw = styled.a`
  font-family: ${FONT_SERIF};
  font-weight: 700;
  font-variant: small-caps;
  letter-spacing: 0.03em;
  color: ${INK};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding-bottom: 0.12em;
  transition: color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.5px;
    border-radius: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    opacity: 0.35;
    animation-name: ${seeAlsoUnderlineDraw};
    animation-duration: ${SEE_ALSO_UNDERLINE_DRAW_S}s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-delay: ${p => p.$delay ?? 0}s;
  }

  &:hover,
  &:focus-visible {
    color: ${INK_MID};
    outline: none;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      transform: scaleX(1);
      opacity: 0.88;
    }
  }
`

const SeeAlsoIt = styled.span`
  font-style: italic;
`

/* ── pronunciation key ── */

const PronKey = styled(motion.div)`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.65rem, 1.2vw, 0.74rem);
  color: ${INK_LIGHT};
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 0.8rem;
  border-top: 1px solid ${RULE};
  letter-spacing: 0.02em;
  line-height: 1.8;
`

const PronSep = styled.span`
  margin: 0 0.35em;
  opacity: 0.5;
`


/* ── animation variants ── */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.95 } }
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] }
  }
}

const seeAlsoStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.15 } }
}

const seeAlsoSlide = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] }
  }
}

const smoothScroll = (e) => {
  e.preventDefault()
  const id = e.currentTarget.getAttribute('href')?.slice(1)
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const IntroScreen = () => {
  const [pageTurnDone, setPageTurnDone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setPageTurnDone(true), 1500)
    return () => { clearTimeout(t1) }
  }, [])

  return (
    <>
      <AnimatePresence>
        {!pageTurnDone && <PageTurnOverlay key="page-turn" />}
      </AnimatePresence>

      <HeroSection>
        <Wrap>
          <VolumeLine
            initial={{ opacity: 0, scaleX: 0.3 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Vol. XII &middot; Kl&thinsp;&mdash;&thinsp;Ku</span>
          </VolumeLine>

          <GuideWordBar
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <SectionGuide>john</SectionGuide>
            <SectionPage>427</SectionPage>
          </GuideWordBar>

          <motion.div variants={stagger} initial="hidden" animate="show">
              <HeadwordRow variants={fadeIn}>
                <Headword>Kling·el·ho·fer</Headword>
                <Pronunciation>/ˈklɪŋ.əl.hoʊ.fɚ/</Pronunciation>
                <PartOfSpeech>n.</PartOfSpeech>
              </HeadwordRow>

              <RuleLine as={motion.hr} variants={fadeIn} />

              <DefsWithPlate variants={fadeIn}>
                <DefSensesColumn>
                  <Definition>
                    <DefNumber>1.</DefNumber>
                    <DefLabel>(biog.) </DefLabel>
                    Software engineer with eight years of experience, living in Brooklyn,
                    New York. Work has spanned the stack—frontend, backend, data engineering,
                    and infrastructure and operations—in different roles and team contexts,
                    which has given unusual flexibility in what I can take on and how
                    quickly I can ramp in a new area.
                  </Definition>
                  <Definition>
                    <DefNumber>2.</DefNumber>
                    <DefLabel>(colloq.) </DefLabel>
                    The colleague who actually reads your lengthy PR description before
                    reviewing.
                  </Definition>
                </DefSensesColumn>
                <PlateColumn>
                  <FigurePlate>
                    <HalftoneImg
                      src="/images/about-halftone.png"
                      alt="Halftone portrait of John Klingelhofer"
                      width={556}
                      height={717}
                      loading="eager"
                      decoding="async"
                    />
                    <PlateCredit>fig. 1 - A Klingelhofer</PlateCredit>
                  </FigurePlate>
                </PlateColumn>
              </DefsWithPlate>

              <UsageExample variants={fadeIn}>
                &ldquo;That John Klingelhofer has an impressive resume and a pretty
                snappy website. What is this, a dictionary theme? Cute. Can we just
                call him &lsquo;John K&rsquo;?&rdquo;
              </UsageExample>

              <EtymologyPanel variants={fadeIn}>
                <EtyLabel>Etymology: </EtyLabel>
                <EtyItalic>MHG. </EtyItalic>
                Compound of <EtyBold>klingel-</EtyBold> (bell, small bell;
                cf.&nbsp;mod.&nbsp;Ger.&nbsp;<EtyItalic>Klingel</EtyItalic>,
                doorbell) + <EtyBold>-hofer</EtyBold> (one associated with
                a&nbsp;<EtyItalic>Hof</EtyItalic>, courtyard).
                Lit.&nbsp;&ldquo;courtyard bell-ringer.&rdquo; Attested in
                Rhineland&#8209;Palatinate records, 14th&nbsp;cent.
              </EtymologyPanel>

              <SeeAlsoBlock variants={fadeIn}>
                <div><SeeAlsoLabel>See also </SeeAlsoLabel></div>
                <motion.div variants={seeAlsoStagger} initial="hidden" animate="show">
                  <SeeAlsoEntry variants={seeAlsoSlide}>
                    <SeeAlsoHw href="#experience" onClick={smoothScroll} $delay={seeAlsoUnderlineDelay(0)}>experience</SeeAlsoHw>{' '}
                    <SeeAlsoIt>/ɪkˈspɪə.ri.əns/ n.</SeeAlsoIt>{' '}
                    knowledge or practical wisdom gained from observation
                    or participation. p.&thinsp;428.
                  </SeeAlsoEntry>
                  <br />
                  <SeeAlsoEntry variants={seeAlsoSlide}>
                    <SeeAlsoHw href="#education" onClick={smoothScroll} $delay={seeAlsoUnderlineDelay(1)}>education</SeeAlsoHw>{' '}
                    <SeeAlsoIt>/ˌed.jʊˈkeɪ.ʃən/ n.</SeeAlsoIt>{' '}
                    the systematic instruction and development
                    of character and mental powers. p.&thinsp;431.
                  </SeeAlsoEntry>
                  <br />
                  <SeeAlsoEntry variants={seeAlsoSlide}>
                    <SeeAlsoHw href="#contact" onClick={smoothScroll} $delay={seeAlsoUnderlineDelay(2)}>correspondence</SeeAlsoHw>{' '}
                    <SeeAlsoIt>/ˌkɒr.ɪˈspɒn.dəns/ n.</SeeAlsoIt>{' '}
                    communication by exchange of letters
                    or electronic messages. p.&thinsp;433.
                  </SeeAlsoEntry>
                </motion.div>
              </SeeAlsoBlock>
            </motion.div>

          <PronKey
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            <span style={{ fontWeight: 700 }}>Pronunciation Key: </span>
            æ <em>bat</em>
            <PronSep>|</PronSep>
            eɪ <em>fate</em>
            <PronSep>|</PronSep>
            ɪ <em>bit</em>
            <PronSep>|</PronSep>
            iː <em>be</em>
            <PronSep>|</PronSep>
            ɒ <em>pot</em>
            <PronSep>|</PronSep>
            ʌ <em>but</em>
            <PronSep>|</PronSep>
            ə <em>about</em>
            <PronSep>|</PronSep>
            ʃ <em>ship</em>
            <PronSep>|</PronSep>
            ŋ <em>ring</em>
          </PronKey>
        </Wrap>

      </HeroSection>
    </>
  )
}

export default IntroScreen
