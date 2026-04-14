import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import { 
  Experience, 
  Education, 
  Contact, 
  Footer,
  IntroScreen,
  Background
} from './components'

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const App = () => (
  <>
    <GlobalStyles />
    <Background />
    <Content>
      <IntroScreen />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </Content>
  </>
)

export default App
