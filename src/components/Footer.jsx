import { useEffect } from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
  // Styles inherited from existing CSS
`

const Footer = () => {
  useEffect(() => {
    // Setup smooth scroll for footer link
    if (window.$) {
      $("footer a[href='#myPage']").off('click').on('click', function (event) {
        event.preventDefault()
        $('html, body').animate({
          scrollTop: 0
        }, 1000, function () {
          window.location.hash = '#myPage'
        })
      })
    }
  }, [])

  return (
    <FooterContainer>
      <br />
      <footer className="container-fluid text-center">
        <a href="#myPage">
          <span className="glyphicon glyphicon-chevron-up white"></span>
        </a>
      </footer>
    </FooterContainer>
  )
}

export default Footer
