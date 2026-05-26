import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import App from './App'

export function render() {
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToString(sheet.collectStyles(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ))
    const styles = sheet.getStyleTags()
    return { html, styles }
  } finally {
    sheet.seal()
  }
}
