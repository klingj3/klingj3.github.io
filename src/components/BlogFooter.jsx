import styled from 'styled-components'
import { INK_MID, INK_LIGHT, INK, INK_RED, RULE, FONT_SERIF_ALT } from '../styles/theme'

const Foot = styled.footer`
  margin-top: clamp(3rem, 6vh, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid ${RULE};
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.9rem;
  color: ${INK_LIGHT};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
`

const Name = styled.span`
  font-style: italic;
  color: ${INK_MID};
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1rem;

  a {
    color: ${INK_LIGHT};
    transition: color 0.2s;
    &:hover { color: ${INK_RED}; }
  }
`

const BlogFooter = () => (
  <Foot>
    <Name>John Klingelhofer</Name>
    <Links>
      <a href="/">Home</a>
      <a href="/resume">Résumé</a>
      <a href="mailto:jkklingelhofer@gmail.com">jkklingelhofer@gmail.com</a>
      <a href="https://github.com/klingj3" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/john-k-349892a5/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </Links>
  </Foot>
)

export default BlogFooter
