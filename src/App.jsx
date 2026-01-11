import { useEffect } from 'react'
import styled from 'styled-components'
import { 
  Navbar, 
  TitleSection, 
  Experience, 
  Education, 
  Contact, 
  Footer 
} from './components'

const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: -1;
  background: linear-gradient(145deg, #858ea9, var(--primary-background), #101621);
  background-size: 200% 200%;
  -webkit-animation: Animation 5s ease infinite;
  -moz-animation: Animation 5s ease infinite;
  animation: Animation 5s ease infinite;
`

const CorePage = styled.div`
  margin-left: 75px;
`

const ContentSection = styled.section`
  position: relative;
  z-index: 2;
  background-color: transparent;
  width: 100%;
`

const App = () => {
  useEffect(() => {
    // Wait for jQuery, D3, and styling.js to be available
    const initScripts = () => {
      if (!window.$ || !window.d3) {
        setTimeout(initScripts, 100)
        return
      }

      // Call styling.js functions if available
      if (typeof window.initialAnimation === 'function') {
        window.initialAnimation()
      }

      // Setup jQuery cycle animation (if content divs exist)
      const divs = $('div[id^="content-"]').hide()
      let i = 0

      if (divs.length > 0) {
        (function cycle() {
          divs.eq(i).fadeIn(400)
              .delay(1000)
              .fadeOut(400, cycle)
          i = ++i % divs.length
        })()
      }

      // Setup nav tabs (if they exist)
      $(".nav-tabs a").click(function () {
        $(this).tab('show')
      })
    }

    initScripts()
  }, [])

  return (
    <div id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">
      <Background className="background" />
      <Navbar />
      <CorePage className="core-page">
        <TitleSection />
        <ContentSection className="content">
          <Experience />
          <Education />
        </ContentSection>
      </CorePage>
      <Contact />
      <Footer />
    </div>
  )
}

export default App
