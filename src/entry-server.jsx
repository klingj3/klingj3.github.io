import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import App from './App'
import Landing from './Landing'

const PAGES = { resume: App, landing: Landing }

export function render(page = 'resume') {
  const Page = PAGES[page]
  const sheet = new ServerStyleSheet()
  try {
    const html = renderToString(sheet.collectStyles(
      <React.StrictMode>
        <Page />
      </React.StrictMode>
    ))
    const styles = sheet.getStyleTags()
    return { html, styles }
  } finally {
    sheet.seal()
  }
}
