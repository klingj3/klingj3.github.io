import styled from 'styled-components'

const Foot = styled.footer`
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`

const Btn = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: rgba(238, 241, 245, 0.35);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  transition: all 0.2s;

  &:hover {
    color: #2CA58D;
    border-color: rgba(44, 165, 141, 0.3);
  }
`

const Footer = () => (
  <Foot>
    <Btn onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Back to top
    </Btn>
  </Foot>
)

export default Footer
