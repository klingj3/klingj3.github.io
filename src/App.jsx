import styled, { keyframes } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import { 
  Navbar, 
  TitleSection, 
  Experience, 
  Education, 
  Contact, 
  Footer 
} from './components'

const backgroundAnimation = keyframes`
  0% { background-position: 80% 0% }
  50% { background-position: 20% 100% }
  100% { background-position: 80% 0% }
`

const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(145deg, #858ea9, #262a38, #101621);
  background-size: 200% 200%;
  animation: ${backgroundAnimation} 5s ease infinite;
`

const CorePage = styled.div`
  margin-left: 75px;
  
  @media (max-width: 768px) {
    margin-left: 60px;
  }
`

const ContentSection = styled.section`
  position: relative;
  z-index: 2;
  background-color: transparent;
  width: 100%;
`

const App = () => {
  return (
    <>
      <GlobalStyles />
      <div id="myPage">
        <Background />
        <Navbar />
        <CorePage>
          <TitleSection />
          <ContentSection>
            <Experience />
            <Education />
          </ContentSection>
        </CorePage>
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
