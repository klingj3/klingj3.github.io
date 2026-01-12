import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-background: #262a38;
    --secondary-background: #e8efef;
    --tertiary-background: #8E9AAF;
    --focus-1: #2CA58D;
    --focus-2: #262a38;
    --text-color: #ffffff;
  }

  html {
    scroll-behavior: smooth;
  }

  * {
    box-sizing: border-box;
  }

  body {
    font: 400 18px 'Open Sans', sans-serif;
    width: 100%;
    line-height: 25px;
    margin: 0;
    padding: 0;
  }

  a {
    color: var(--focus-1);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #fff;
      text-shadow: 1px 0px 20px white;
    }
  }

  h2 {
    font-size: 35px;
    font-family: 'Comfortaa', sans-serif;
    text-transform: uppercase;
    color: #303030;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 30px;
    
    &.white {
      color: white;
    }
  }

  .white {
    color: white;
  }

  .center {
    text-align: center;
  }
`

export default GlobalStyles
