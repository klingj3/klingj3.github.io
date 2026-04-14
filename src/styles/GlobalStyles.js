import { createGlobalStyle } from 'styled-components'
import { INK, INK_MID, PAPER, SELECTION, FONT_SERIF } from './theme'

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${FONT_SERIF};
    font-weight: 400;
    font-size: 18px;
    line-height: 1.6;
    color: ${INK};
    background-color: ${PAPER};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    background-color: ${PAPER};
    min-height: 100vh;
    position: relative;
  }

  a {
    color: ${INK_MID};
    text-decoration: none;
    transition: color 0.25s ease;
  }

  a:hover {
    color: ${INK};
  }

  ::selection {
    background: ${SELECTION};
    color: ${INK};
  }
`

export default GlobalStyles
