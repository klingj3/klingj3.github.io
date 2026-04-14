import styled from 'styled-components'

const SectionContainer = styled.section`
  width: 100%;
  position: relative;
`

const Section = ({ id, className, style, children }) => {
  return (
    <SectionContainer id={id} className={className} style={style}>
      {children}
    </SectionContainer>
  )
}

export default Section
