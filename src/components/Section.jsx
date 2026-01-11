import styled from 'styled-components'

const SectionContainer = styled.section`
  width: 100%;
  padding: 2rem 0;
  background-color: ${props => props.$transparent ? 'transparent' : 'var(--secondary-background)'};
`

const Section = ({ id, className, style, children, transparent = false }) => {
  return (
    <SectionContainer 
      id={id} 
      $transparent={transparent}
      className={className}
      style={style}
    >
      {children}
    </SectionContainer>
  )
}

export default Section
