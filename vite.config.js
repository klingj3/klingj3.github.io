import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// GitHub Pages serves /resume from /resume/index.html by 301-redirecting
// /resume -> /resume/. In MPA mode the dev/preview servers don't do that, so
// /resume would 404. This mirrors Pages so the /resume link works locally too.
const pagesTrailingSlash = () => {
  const redirect = (req, res, next) => {
    if (req.url === '/resume') {
      res.writeHead(301, { Location: '/resume/' })
      res.end()
      return
    }
    next()
  }
  return {
    name: 'pages-trailing-slash',
    configureServer(server) { server.middlewares.use(redirect) },
    configurePreviewServer(server) { server.middlewares.use(redirect) }
  }
}

export default defineConfig({
  plugins: [react(), pagesTrailingSlash()],
  base: '/',
  // Multi-page app: no SPA fallback, so /resume serves resume/index.html
  // instead of falling back to the landing's index.html.
  appType: 'mpa',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        // Landing page (/) and the full résumé (/resume).
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        resume: fileURLToPath(new URL('./resume/index.html', import.meta.url))
      }
    }
  },
  publicDir: 'public'
})
