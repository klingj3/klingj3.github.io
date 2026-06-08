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

const { render, posts, markdowns } = await import(pathToFileURL(path.join(ssrOut, 'entry-server.js')).href)

const escHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Static pages
const pages = [
  { page: 'landing', file: 'index.html' },
  { page: 'resume', file: path.join('resume', 'index.html') },
  { page: 'blog-index', file: path.join('blog', 'index.html') },
]

for (const { page, file } of pages) {
  const indexPath = path.join(root, 'dist', file)
  const { html, styles } = render(page)
  let template = fs.readFileSync(indexPath, 'utf-8')
  template = template.replace('</head>', `${styles}\n</head>`)
  template = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  fs.writeFileSync(indexPath, template)
}

// Blog posts — one output file per post, generated from the shared post template
const postTemplatePath = path.join(root, 'dist', 'blog', 'post', 'index.html')
const postTemplate = fs.readFileSync(postTemplatePath, 'utf-8')

for (const post of posts) {
  const markdown = markdowns[post.slug]
  const { html, styles } = render('blog-post', { post, markdown })

  const title = `${post.title} — John Klingelhofer`
  const imageUrl = post.image
    ? `https://www.klingelhofer.me/blog/${post.slug}/${post.image}`
    : null
  const meta = [
    `    <title>${escHtml(title)}</title>`,
    `    <meta name="description" content="${escHtml(post.description)}">`,
    `    <meta property="og:type" content="article">`,
    `    <meta property="og:url" content="https://www.klingelhofer.me/blog/${post.slug}">`,
    `    <meta property="og:title" content="${escHtml(title)}">`,
    `    <meta property="og:description" content="${escHtml(post.description)}">`,
    ...(imageUrl ? [`    <meta property="og:image" content="${escHtml(imageUrl)}">`] : []),
    `    <meta name="twitter:card" content="${imageUrl ? 'summary_large_image' : 'summary'}">`,
    `    <meta name="twitter:title" content="${escHtml(title)}">`,
    `    <meta name="twitter:description" content="${escHtml(post.description)}">`,
    ...(imageUrl ? [`    <meta name="twitter:image" content="${escHtml(imageUrl)}">`] : []),
  ].join('\n')

  let out = postTemplate
    .replace('<!-- BLOG_META_PLACEHOLDER -->', meta)
    .replace('</head>', `${styles}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</body>', `<script>window.__POST_SLUG__=${JSON.stringify(post.slug)}</script>\n</body>`)

  const outDir = path.join(root, 'dist', 'blog', post.slug)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), out)
}

// Remove the generic post template — real pages live at /blog/<slug>/
fs.rmSync(path.join(root, 'dist', 'blog', 'post'), { recursive: true })

fs.rmSync(ssrOut, { recursive: true })
