import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// GitHub Pages serves directory entries by 301-redirecting /path -> /path/.
// Mirror that in dev/preview so these links work locally too.
const pagesTrailingSlash = () => {
  const DIRS = ['/resume', '/blog']
  // Match /blog/<slug> (no trailing path segments or file extension); skip the
  // /blog/post template entry itself.
  const POST = /^\/blog\/([^/.?]+)\/?$/
  const sectionRedirect = (req, res) => {
    if (DIRS.includes(req.url)) {
      res.writeHead(301, { Location: req.url + '/' })
      res.end()
      return true
    }
    return false
  }
  return {
    name: 'pages-trailing-slash',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (sectionRedirect(req, res)) return
        // Dev has no prerendered per-slug files; serve the shared post template
        // and let main-blog-post.jsx resolve the slug from window.location.
        const m = req.url.match(POST)
        if (m && m[1] !== 'post') req.url = '/blog/post/index.html'
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (sectionRedirect(req, res)) return
        // dist has real per-slug dirs; just normalize to a trailing slash.
        const m = req.url.match(/^\/blog\/([^/.?]+)$/)
        if (m && m[1] !== 'post') {
          res.writeHead(301, { Location: req.url + '/' })
          res.end()
          return
        }
        next()
      })
    }
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
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        resume: fileURLToPath(new URL('./resume/index.html', import.meta.url)),
        'blog-index': fileURLToPath(new URL('./blog/index.html', import.meta.url)),
        'blog-post': fileURLToPath(new URL('./blog/post/index.html', import.meta.url)),
      }
    }
  },
  publicDir: 'public'
})
