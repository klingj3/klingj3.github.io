import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'

/**
 * Mount a top-level page component into #root.
 *
 * In dev the container is empty (no pre-rendered HTML), so we createRoot.
 * In production prerender.mjs has populated the container, so hydrateRoot
 * attaches React to the existing DOM without re-rendering.
 */
export function mount(Page) {
  const container = document.getElementById('root')
  const app = <React.StrictMode><Page /></React.StrictMode>

  if (container.hasChildNodes()) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}
