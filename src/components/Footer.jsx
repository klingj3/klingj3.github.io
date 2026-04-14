import styled from 'styled-components'
import { INK, INK_LIGHT, RULE, FONT_SERIF_ALT, CONTENT_WIDTH } from '../styles/theme'

const Foot = styled.footer`
  max-width: ${CONTENT_WIDTH};
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${RULE};
`

const Btn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.85rem;
  font-style: italic;
  color: ${INK_LIGHT};
  letter-spacing: 0.03em;
  padding: 0.5rem 1rem;
  transition: color 0.2s;

  &:hover { color: ${INK}; }

  &::before { content: '↑  '; }
`

const Footer = () => (
  <Foot>
    <Btn onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Back to top
    </Btn>
  </Foot>
)

export default Footer
