import GlobalStyles from '../styles/GlobalStyles'
import Background from './Background'

/** Shared paper shell for both pages: global styles + the fixed lamp-lit
 *  paper background, then the page's own content. */
const Layout = ({ children }) => (
  <>
    <GlobalStyles />
    <Background />
    {children}
  </>
)

export default Layout
