import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const app = <React.StrictMode><App /></React.StrictMode>

// In dev, the container is empty (no pre-rendered HTML), so fall back to createRoot.
// In production, prerender.mjs has populated the container and hydrateRoot attaches
// React to the existing DOM without re-rendering.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
