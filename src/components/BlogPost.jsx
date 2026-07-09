import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styled from 'styled-components'
import Layout from './Layout'
import BlogFooter from './BlogFooter'
import { ContentWrap } from '../styles/shared'
import {
  typeProseH2, typeProseH3, typeLede, typeItalicMeta,
} from '../styles/shared'
import {
  INK, INK_MID, INK_LIGHT, INK_RED, RULE,
  FONT_SERIF_ALT, inkAlpha,
} from '../styles/theme'

const Wrap = styled.div`
  // Lift above the fixed, opaque Background (z-index: 0), or the paper layer
  // paints over the post. Mirrors the résumé's PageWrap / landing's Stage.
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  padding: clamp(2.5rem, 7vh, 4.5rem) 0 clamp(2rem, 5vh, 3rem);
`

const BackLink = styled.a`
  display: inline-block;
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.88rem;
  font-style: italic;
  color: ${INK_LIGHT};
  margin-bottom: 2.25rem;
  transition: color 0.2s;
  &:hover { color: ${INK_RED}; }
`

const Header = styled.header`
  padding-bottom: 1.4rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${RULE};
`

const Kicker = styled.p`
  ${typeItalicMeta}
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
`

const Title = styled.h1`
  font-size: clamp(1.85rem, 4.5vw, 2.6rem);
  font-weight: 700;
  color: ${INK};
  line-height: 1.18;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
`

const Description = styled.p`
  ${typeLede}
  line-height: 1.6;
  margin: 0;
`

const HeroGifWrap = styled.div`
  margin: 1.75rem 0 2.25rem;
  border: 1px solid ${RULE};
  border-radius: 2px;
  overflow: hidden;
  background: ${inkAlpha(0.025)};
  display: flex;
  justify-content: center;
`

const HeroGifImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 340px;
  object-fit: contain;
  display: block;
`

// All prose styles live here — this is the only place markdown-generated HTML is styled.
const Prose = styled.div`
  h1 { display: none; }

  h2 {
    ${typeProseH2}
    border-bottom: 1px solid ${RULE};
  }

  h3 {
    ${typeProseH3}
  }

  /* The 720px measure runs ~75 chars at 18px — wide enough to want more leading
     than the site-wide 1.6. */
  p { margin: 0 0 1.25rem; line-height: 1.7; }

  ul, ol {
    margin: 0 0 1.25rem;
    padding-left: 1.6rem;
    line-height: 1.7;
    li { margin-bottom: 0.4rem; }
  }

  code {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 0.8em;
    background: ${inkAlpha(0.06)};
    border: 1px solid ${RULE};
    border-radius: 2px;
    padding: 0.1em 0.38em;
  }

  pre {
    background: ${inkAlpha(0.05)};
    border: 1px solid ${RULE};
    border-radius: 2px;
    padding: 1rem 1.25rem;
    overflow-x: auto;
    margin: 0 0 1.5rem;

    code {
      background: none;
      border: none;
      padding: 0;
      font-size: 0.8rem;
      line-height: 1.65;
    }
  }

  blockquote {
    border-left: 3px solid ${INK_RED};
    margin: 0 0 1.25rem;
    padding: 0.25rem 0 0.25rem 1.25rem;
    color: ${INK_MID};
    font-style: italic;
    p { margin: 0; }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.75rem auto;
    border: 1px solid ${RULE};
    border-radius: 2px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.5rem;
    font-family: ${FONT_SERIF_ALT};
    font-size: 0.88rem;

    th, td {
      padding: 0.5rem 0.75rem;
      border: 1px solid ${RULE};
      text-align: left;
    }

    th {
      font-weight: 700;
      background: ${inkAlpha(0.04)};
    }

    tr:nth-child(even) td { background: ${inkAlpha(0.02)}; }
  }

  hr {
    border: none;
    height: 1px;
    background: ${RULE};
    margin: 2rem 0;
  }

  strong { font-weight: 700; color: ${INK}; }

  figcaption {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 0.72rem;
    color: ${INK_LIGHT};
    background: ${inkAlpha(0.04)};
    border: 1px solid ${RULE};
    border-bottom: none;
    border-radius: 2px 2px 0 0;
    padding: 0.4rem 1rem;
    margin-top: 1.5rem;
  }

  /* A captioned block: square off the top corners so it reads as one unit. */
  figcaption + pre {
    margin-top: 0;
    border-radius: 0 0 2px 2px;
  }
`

// Fences are written as ```start:end:path (a file/line citation). Parse that so the
// snippet's origin renders as a caption instead of being silently dropped as a fake
// language token. Plain ```lang fences fall through to a normal code block.
const Pre = ({ node, children, ...props }) => {
  const codeEl = Array.isArray(children) ? children[0] : children
  const className = codeEl?.props?.className || ''
  const meta = /language-(.+)/.exec(className)?.[1]
  const cite = meta && /^(\d+):(\d+):(.+)$/.exec(meta)

  if (!cite) return <pre {...props}>{children}</pre>

  const [, start, end, file] = cite
  const lines = start === end ? `line ${start}` : `lines ${start}–${end}`
  return (
    <>
      <figcaption>{file} · {lines}</figcaption>
      <pre {...props}>{children}</pre>
    </>
  )
}

const formatDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const BlogPost = ({ post, markdown }) => {
  const imageBase = `/blog/${post.slug}/`

  return (
    <Layout>
      <ContentWrap>
        <Wrap>
          <BackLink href="/blog">&larr; All posts</BackLink>
          <Header>
            <Kicker>Blog &middot; {formatDate(post.date)}</Kicker>
            <Title>{post.title}</Title>
            {post.description && <Description>{post.description}</Description>}
          </Header>
          {post.heroGif && (
            <HeroGifWrap>
              <HeroGifImg src={post.heroGif} alt={`${post.title} featured image`} />
            </HeroGifWrap>
          )}
          <Prose>
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{ pre: Pre }}
              urlTransform={(url) =>
                !url.startsWith('http') && !url.startsWith('/') && !url.startsWith('#')
                  ? imageBase + url
                  : url
              }
            >
              {markdown}
            </Markdown>
          </Prose>
          <BlogFooter />
        </Wrap>
      </ContentWrap>
    </Layout>
  )
}

export default BlogPost
