import styled from 'styled-components'

const SectionContainer = styled.div`
  background-color: var(--secondary-background);
  width: 100%;
  
  &.transparent {
    background: transparent;
  }
`

const Section = ({ id, className, style, children, transparent = false }) => {
  return (
    <SectionContainer 
      id={id} 
      className={`container ${transparent ? 'transparent container-transparent-b' : 'secondary'} ${className || ''}`}
      style={style}
    >
      {children}
    </SectionContainer>
  )
}

export default Section
