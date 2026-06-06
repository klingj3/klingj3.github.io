import { build } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const root = path.dirname(fileURLToPath(import.meta.url))
const ssrOut = path.join(root, '.ssr-temp')

await build({
  root,
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: ssrOut,
    rollupOptions: {
      output: { format: 'esm', entryFileNames: '[name].js' }
    }
  },
  ssr: {
    noExternal: ['styled-components', 'framer-motion']
  }
})

const { render } = await import(pathToFileURL(path.join(ssrOut, 'entry-server.js')).href)

// Each client HTML entry → the page component it hydrates.
const pages = [
  { page: 'landing', file: 'index.html' },
  { page: 'resume', file: path.join('resume', 'index.html') }
]

for (const { page, file } of pages) {
  const indexPath = path.join(root, 'dist', file)
  const { html, styles } = render(page)
  let template = fs.readFileSync(indexPath, 'utf-8')
  template = template.replace('</head>', `${styles}\n</head>`)
  template = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  fs.writeFileSync(indexPath, template)
}

fs.rmSync(ssrOut, { recursive: true })
