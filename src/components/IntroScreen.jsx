import { useState, useEffect, useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { motion } from 'framer-motion'

const glitchEffect = keyframes`
  0% {
    transform: translate(0);
    text-shadow: 
      -2px 0 rgba(255, 0, 0, 0.7),
      2px 0 rgba(0, 255, 255, 0.7);
    opacity: 0;
  }
  10% {
    transform: translate(-2px, 1px);
    text-shadow: 
      -4px 0 rgba(255, 0, 0, 0.8),
      4px 0 rgba(0, 255, 255, 0.8);
    opacity: 1;
  }
  20% {
    transform: translate(2px, -1px);
    text-shadow: 
      -3px 0 rgba(255, 0, 0, 0.7),
      3px 0 rgba(0, 255, 255, 0.7);
  }
  30% {
    transform: translate(-1px, 0);
    text-shadow: 
      -2px 0 rgba(255, 0, 0, 0.5),
      2px 0 rgba(0, 255, 255, 0.5);
  }
  40%, 100% {
    transform: translate(0);
    text-shadow: none;
    opacity: 1;
  }
`

const linkHighlight = keyframes`
  0% { color: #90b4cb; text-shadow: none; }
  30% { color: #fff; text-shadow: 0 0 20px rgba(144, 180, 203, 0.8); }
  100% { color: #90b4cb; text-shadow: none; }
`

const gentleRock = keyframes`
  0%, 100% { transform: rotateX(-5deg) rotateY(-8deg); }
  25% { transform: rotateX(3deg) rotateY(12deg); }
  50% { transform: rotateX(5deg) rotateY(-6deg); }
  75% { transform: rotateX(-3deg) rotateY(10deg); }
`

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  overflow: visible;
`

const LogoWrapper = styled.div`
  transform-style: preserve-3d;
  perspective: 1000px;
  margin-top: -10vh;
`

const Logo3DInner = styled(motion.div)`
  transform-style: preserve-3d;
  position: relative;
  display: flex;
  flex-direction: ${props => props.$expanded ? 'column' : 'row'};
  align-items: center;
  gap: ${props => props.$expanded ? '0' : '0.3em'};
  animation: ${props => props.$expanded ? 'none' : css`${gentleRock} 8s ease-in-out infinite`};
  font-size: ${props => props.$fontSize};
`

const NameRow = styled(motion.div)`
  display: flex;
  align-items: baseline;
  justify-content: center;
  overflow: visible;
`

const Letter = styled(motion.span)`
  font-family: 'Righteous', cursive;
  font-weight: bold;
  position: relative;
  transform-style: preserve-3d;
  display: inline-block;
  line-height: 1.1;
  background: linear-gradient(135deg, #2CA58D 0%, #5dd4b9 50%, #2CA58D 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  overflow: visible;
  
  ${props => props.$flash && css`
    animation: ${glitchEffect} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  `}
`

const LogoLetterLayer = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateZ(${props => props.$depth}px);
  color: rgba(65, 65, 65, 0.95);
  -webkit-text-fill-color: rgba(65, 65, 65, 0.95);
  z-index: -1;
  pointer-events: none;
`

const LogoLetter = styled(motion.span)`
  font-family: 'Righteous', cursive;
  font-weight: bold;
  position: relative;
  transform-style: preserve-3d;
  display: inline-block;
  line-height: 1.1;
  color: #2CA58D;
  -webkit-text-fill-color: #2CA58D;
  overflow: visible;
`

const ClickHint = styled(motion.div)`
  position: absolute;
  bottom: 12%;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  pointer-events: none;
`

const Divider = styled(motion.div)`
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
`

const StatementContainer = styled(motion.div)`
  position: absolute;
  top: calc(50% + clamp(110px, 24vw, 250px));
  left: 50%;
  transform: translateX(-50%);
  max-width: 700px;
  text-align: center;
  padding: 0 1.5rem;
  width: 100%;
`

const StatementItem = styled(motion.div)`
  font-size: clamp(20px, 4vw, 28px);
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
`

const StatementLink = styled.a`
  text-decoration: none;
  font-weight: 500;
  color: #90b4cb;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  ${props => props.$highlight && css`
    animation: ${linkHighlight} 0.8s ease-out forwards;
    animation-delay: ${props.$delay || 0}ms;
  `}
  
  &:hover {
    color: #fff;
  }
`

const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('logo') // logo, expanding, john-boom, klingel-boom, complete
  const [showJohnFlash, setShowJohnFlash] = useState(false)
  const [showKlingelFlash, setShowKlingelFlash] = useState(false)
  const [showLingSyllable, setShowLingSyllable] = useState(false)
  const [showElSyllable, setShowElSyllable] = useState(false)
  const [showHoSyllable, setShowHoSyllable] = useState(false)
  const [showFerSyllable, setShowFerSyllable] = useState(false)
  const [highlightLinks, setHighlightLinks] = useState(false)
  const logoRef = useRef(null)

  const isExpanded = phase !== 'logo'
  const showJohn = ['john-boom', 'klingel-boom', 'complete'].includes(phase)
  const showKlingel = ['klingel-boom', 'complete'].includes(phase)
  const showStats = phase === 'complete'

  // Mouse tracking for 3D effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!logoRef.current) return
      
      const x = ((event.clientX / window.innerWidth) - 0.5) * 40
      const y = ((event.clientY / window.innerHeight) - 0.5) * -40
      
      if (phase === 'logo') {
        logoRef.current.style.animation = 'none'
        logoRef.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`
      } else {
        logoRef.current.style.transform = `rotateX(${y * 0.2}deg) rotateY(${x * 0.2}deg)`
      }
    }
    
    const handleMouseLeave = () => {
      if (logoRef.current && phase === 'logo') {
        logoRef.current.style.animation = ''
        logoRef.current.style.transform = ''
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [phase])

  const handleClick = () => {
    if (phase === 'logo') {
      setPhase('expanding')
      
      setTimeout(() => {
        setPhase('john-boom')
        setShowJohnFlash(true)
      }, 800)
      
      setTimeout(() => {
        setPhase('klingel-boom')
        setShowKlingelFlash(true)
      }, 1100)
      
      // Stagger the syllables with beats between
      setTimeout(() => setShowLingSyllable(true), 1300)
      setTimeout(() => setShowElSyllable(true), 1550)
      setTimeout(() => setShowHoSyllable(true), 1800)
      setTimeout(() => setShowFerSyllable(true), 2050)
      
      setTimeout(() => {
        setPhase('complete')
        onComplete?.()
      }, 2500)
      
      setTimeout(() => {
        setHighlightLinks(true)
      }, 4200)
    }
  }

  const depthLayers = [32, 24, 16, 8, 4, 2]
  
  // Font sizes - use consistent size and scale transform for logo mode
  const nameSize = 'clamp(60px, 14vw, 140px)'
  const logoScale = 1.8 // Scale factor to make logo larger

  return (
    <HeroContainer onClick={handleClick} $clickable={phase === 'logo'}>
      <LogoWrapper>
        <Logo3DInner ref={logoRef} $expanded={isExpanded} $fontSize={nameSize}>
          {/* First row: J + ohn */}
          <NameRow
            initial={false}
            animate={{
              y: isExpanded ? 0 : 0,
            }}
          >
            {/* J letter - always visible, moves into position */}
            {!isExpanded ? (
              <LogoLetter
                initial={false}
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  scale: logoScale,
                  x: 0,
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {depthLayers.map((depth, i) => (
                  <LogoLetterLayer key={`j-logo-${i}`} $depth={-depth}>J</LogoLetterLayer>
                ))}
                <span style={{ position: 'relative', zIndex: 1 }}>J</span>
              </LogoLetter>
            ) : (
              <Letter
                initial={false}
                style={{ transformStyle: 'preserve-3d' }}
                animate={{
                  scale: 1,
                  x: 0,
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {depthLayers.map((depth, i) => (
                  <LogoLetterLayer key={`j-expanded-${i}`} $depth={-depth}>J</LogoLetterLayer>
                ))}
                <span style={{ position: 'relative', zIndex: 1 }}>J</span>
              </Letter>
            )}
            
            {/* "ohn" - appears after J settles */}
            <Letter
              $flash={showJohnFlash}
              initial={{ opacity: 0, x: -30, width: 0 }}
              animate={{
                opacity: showJohn ? 1 : 0,
                x: showJohn ? 0 : -30,
                width: showJohn ? 'auto' : 0,
              }}
              transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
            >
              ohn
            </Letter>
          </NameRow>

          {/* Second row: K + lingelhofer (only when expanded) */}
          {isExpanded && (
            <NameRow>
              {/* K letter */}
              <Letter
                initial={{ 
                  scale: logoScale,
                  y: '-1.1em',
                  x: '0.5em',
                }}
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ 
                  scale: 1,
                  y: 0,
                  x: 0,
                }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                {depthLayers.map((depth, i) => (
                  <LogoLetterLayer key={`k-expanded-${i}`} $depth={-depth}>K</LogoLetterLayer>
                ))}
                <span style={{ position: 'relative', zIndex: 1 }}>K</span>
              </Letter>
              
              {/* "lingelhofer" - broken into syllables */}
              <Letter
                $flash={showLingSyllable}
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{
                  opacity: showLingSyllable ? 1 : 0,
                  x: showLingSyllable ? 0 : -20,
                  width: showLingSyllable ? 'auto' : 0,
                }}
                transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
              >
                ling
              </Letter>
              <Letter
                $flash={showElSyllable}
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{
                  opacity: showElSyllable ? 1 : 0,
                  x: showElSyllable ? 0 : -20,
                  width: showElSyllable ? 'auto' : 0,
                }}
                transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
              >
                el
              </Letter>
              <Letter
                $flash={showHoSyllable}
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{
                  opacity: showHoSyllable ? 1 : 0,
                  x: showHoSyllable ? 0 : -20,
                  width: showHoSyllable ? 'auto' : 0,
                }}
                transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
              >
                ho
              </Letter>
              <Letter
                $flash={showFerSyllable}
                initial={{ opacity: 0, x: -20, width: 0 }}
                animate={{
                  opacity: showFerSyllable ? 1 : 0,
                  x: showFerSyllable ? 0 : -20,
                  width: showFerSyllable ? 'auto' : 0,
                }}
                transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
              >
                fer
              </Letter>
            </NameRow>
          )}
          
          {/* K in logo mode (next to J) */}
          {!isExpanded && (
            <LogoLetter 
              initial={false}
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ scale: logoScale }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {depthLayers.map((depth, i) => (
                <LogoLetterLayer key={`k-logo-${i}`} $depth={-depth}>K</LogoLetterLayer>
              ))}
              <span style={{ position: 'relative', zIndex: 1 }}>K</span>
            </LogoLetter>
          )}
        </Logo3DInner>
      </LogoWrapper>

      {phase === 'logo' && (
        <ClickHint
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          click/tap to continue
        </ClickHint>
      )}

      {showStats && (
        <StatementContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <StatementItem
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginTop: '1.5rem' }}
          >
            I'm a software developer in New York, New York.
          </StatementItem>
          <StatementItem
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            style={{ marginTop: '1.2rem' }}
          >
            Check out my{' '}
            <StatementLink href="#experience" $highlight={highlightLinks} $delay={0}>
              experience
            </StatementLink>
            ,{' '}
            <StatementLink href="#education" $highlight={highlightLinks} $delay={500}>
              education
            </StatementLink>
            , or{' '}
            <StatementLink href="#contact" $highlight={highlightLinks} $delay={1000}>
              get in touch
            </StatementLink>
            .
          </StatementItem>
        </StatementContainer>
      )}
    </HeroContainer>
  )
}

export default IntroScreen
