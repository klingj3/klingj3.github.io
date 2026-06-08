import { motion } from 'framer-motion'
import styled from 'styled-components'
import Layout from './Layout'
import BlogFooter from './BlogFooter'
import { posts } from '../blog/posts.js'
import {
  ContentWrap, PageSection, SectionDivider,
  RubricSectionHeading, SectionPreface,
  typeKicker, typeItalicMeta, typeLede, typeCopy,
  fadeUp,
} from '../styles/shared'
import { INK, INK_RED, INK_LIGHT, RULE, FONT_SERIF_ALT, inkAlpha } from '../styles/theme'

const PageWrap = styled.div`
  position: relative;
  z-index: 1;
`

const PostList = styled.div`
  max-width: 680px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

const PostCard = styled(motion.article)`
  border: 1px solid ${RULE};
  border-radius: 3px;
  overflow: hidden;
  background: ${inkAlpha(0.02)};
`

const CardInner = styled.div`
  display: flex;
  align-items: stretch;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`

const CardMedia = styled.a`
  flex-shrink: 0;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${inkAlpha(0.04)};
  border-right: 1px solid ${RULE};
  overflow: hidden;
  text-decoration: none;

  @media (max-width: 520px) {
    width: 100%;
    height: 180px;
    border-right: none;
    border-bottom: 1px solid ${RULE};
  }
`

const CardGif = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const CardBody = styled.div`
  flex: 1;
  min-width: 0;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const MetaRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
`

const PostKicker = styled.span`
  ${typeKicker}
`

const PostDate = styled.span`
  ${typeItalicMeta}
  font-size: 0.78rem;
  white-space: nowrap;
`

const PostTitle = styled.h2`
  font-family: ${FONT_SERIF_ALT};
  font-weight: 700;
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  letter-spacing: -0.01em;
  line-height: 1.28;
  margin: 0;

  a {
    color: ${INK};
    text-decoration: none;
    transition: color 0.2s;
    &:hover { color: ${INK_RED}; }
  }
`

const PostDesc = styled.p`
  ${typeCopy}
  font-size: clamp(0.85rem, 1.4vw, 0.92rem);
  color: ${inkAlpha(0.65)};
  margin: 0;
  line-height: 1.6;
  flex: 1;
`

const ReadLink = styled.a`
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.85rem;
  font-style: italic;
  color: ${INK_LIGHT};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.05em;
  align-self: flex-start;
  transition: color 0.2s;
  &:hover { color: ${INK_RED}; }
`

const formatDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const BlogIndex = () => (
  <Layout>
    <PageWrap>
      <PageSection>
        <ContentWrap>
          <SectionDivider initial="hidden" animate="visible" variants={fadeUp}>
            ❦
          </SectionDivider>
          <RubricSectionHeading initial="hidden" animate="visible" variants={fadeUp}>
            Blog
          </RubricSectionHeading>
          <SectionPreface initial="hidden" animate="visible" variants={fadeUp}>
            Occasional deep-dives on things I&rsquo;ve built, learned, or found interesting enough to write up.
          </SectionPreface>

          <PostList>
            {posts.map((post, i) => (
              <PostCard
                key={post.slug}
                initial="hidden" animate="visible"
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: i * 0.08 } } }}
              >
                <CardInner>
                  {post.showcaseGif && (
                    <CardMedia href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden>
                      <CardGif src={post.showcaseGif} alt="" loading="lazy" />
                    </CardMedia>
                  )}
                  <CardBody>
                    <MetaRow>
                      <PostKicker>Blog</PostKicker>
                      <PostDate>{formatDate(post.date)}</PostDate>
                    </MetaRow>
                    <PostTitle>
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </PostTitle>
                    {post.description && <PostDesc>{post.description}</PostDesc>}
                    <ReadLink href={`/blog/${post.slug}`}>Read</ReadLink>
                  </CardBody>
                </CardInner>
              </PostCard>
            ))}

            <BlogFooter />
          </PostList>
        </ContentWrap>
      </PageSection>
    </PageWrap>
  </Layout>
)

export default BlogIndex
