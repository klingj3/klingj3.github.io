import { mount } from './mount'
import BlogPost from './components/BlogPost'
import { posts, markdowns } from './blog/posts.js'

// Prod: prerender injects window.__POST_SLUG__. Dev: no per-slug file exists, so the
// vite middleware serves the shared template and we resolve the slug from the URL.
const slugFromPath =
  typeof window !== 'undefined' &&
  window.location.pathname.match(/\/blog\/([^/]+)\/?$/)?.[1]

const slug =
  (typeof window !== 'undefined' && window.__POST_SLUG__) || slugFromPath || posts[0]?.slug

const post = posts.find((p) => p.slug === slug)
const markdown = markdowns[slug]

const PostPage = () => <BlogPost post={post} markdown={markdown} />

mount(PostPage)
