import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'
import App from './App'
import Landing from './Landing'
import BlogPost from './components/BlogPost'
import BlogIndex from './components/BlogIndex'
import { posts, markdowns } from './blog/posts.js'

export { posts, markdowns }

const PAGES = { resume: App, landing: Landing, 'blog-index': BlogIndex }

export function render(page, opts = {}) {
  let element
  if (page === 'blog-post') {
    element = <BlogPost post={opts.post} markdown={opts.markdown} />
  } else {
    const Page = PAGES[page]
    element = <Page />
  }

  const sheet = new ServerStyleSheet()
  try {
    const html = renderToString(sheet.collectStyles(
      <React.StrictMode>{element}</React.StrictMode>
    ))
    const styles = sheet.getStyleTags()
    return { html, styles }
  } finally {
    sheet.seal()
  }
}
