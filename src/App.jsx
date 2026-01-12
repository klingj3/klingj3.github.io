import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import GlobalStyles from './styles/GlobalStyles'
import { 
  Experience, 
  Education, 
  Contact, 
  Footer,
  IntroScreen,
  Background
} from './components'

const ContentSection = styled(motion.section)`
  position: relative;
  z-index: 2;
  background-color: transparent;
  width: 100%;
`

const App = () => {
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [introComplete])

  const handleIntroComplete = () => {
    setIntroComplete(true)
  }

  return (
    <>
      <GlobalStyles />
      <div id="myPage">
        <Background />

        <IntroScreen onComplete={handleIntroComplete} />
        
        <AnimatePresence>
          {introComplete && (
            <ContentSection
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Experience />
              <Education />
            </ContentSection>
          )}
        </AnimatePresence>

        {introComplete && (
          <>
            <Contact />
            <Footer />
          </>
        )}
      </div>
    </>
  )
}

export default App
