import { createGlobalStyle } from 'styled-components'

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
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.6;
    color: #eef1f5;
    background-color: #0c0f16;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    background-color: #0c0f16;
    min-height: 100vh;
    position: relative;
  }

  a {
    color: #2CA58D;
    text-decoration: none;
    transition: color 0.25s ease;
  }

  a:hover {
    color: #3dd4b0;
  }

  ::selection {
    background: #2CA58D;
    color: #fff;
  }
`

export default GlobalStyles
