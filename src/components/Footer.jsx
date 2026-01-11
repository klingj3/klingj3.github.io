import styled from 'styled-components'

const FooterContainer = styled.footer`
  width: 100%;
  text-align: center;
  padding: 2rem 0 3rem;
  background: transparent;
`

const ScrollTopButton = styled.a`
  display: inline-block;
  color: white;
  font-size: 24px;
  padding: 10px 20px;
  transition: transform 0.3s ease, color 0.3s ease;
  
  &:hover {
    color: var(--focus-1);
    transform: translateY(-5px);
    text-shadow: none;
  }
`

const Footer = () => {
  const handleScrollTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    setTimeout(() => {
      window.location.hash = '#myPage'
    }, 1000)
  }

  return (
    <FooterContainer>
      <ScrollTopButton 
        href="#myPage" 
        onClick={handleScrollTop}
        aria-label="Scroll to top"
      >
        <span className="glyphicon glyphicon-chevron-up" />
      </ScrollTopButton>
    </FooterContainer>
  )
}

export default Footer
