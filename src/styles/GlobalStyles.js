import { createGlobalStyle } from 'styled-components'
import { INK, INK_MID, PAPER, SELECTION, FONT_SERIF } from './theme'

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    /* Lamp position (pointer, set from App). */
    --book-x: 0;
    --book-y: 0;
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
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    /* Fallback only — full paper + lamp live on fixed Background (avoids fixed-on-body + transform bugs). */
    background-color: ${PAPER};
  }

  #root {
    background: transparent;
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
