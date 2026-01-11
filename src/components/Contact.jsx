import styled from 'styled-components'

const ContactSection = styled.div`
  // Uses existing CSS classes
`

const SocialLinks = styled.div`
  font-size: 55px;
  text-align: center;
  
  a {
    margin: 0 10px;
  }
`

const Contact = () => {
  return (
    <ContactSection id="contact" className="container-fluid container-transparent-b">
      <h2 className="white">CONTACT</h2>
      <div>
        <p className="white center">
          Any questions? Get in touch.
          <br />
          <a href="mailto:jkklingehofer@gmail.com">jkklingelhofer@gmail.com</a>
          <br />
          <br />
          also see
          <br />
          <SocialLinks>
            <a href="https://github.com/klingj3" aria-label="GitHub">
              <span className="fa fa-github"></span>
            </a>
            <a href="https://linkedin.com/in/john-klingelhofer-349892a5" aria-label="LinkedIn">
              <span className="fa fa-linkedin"></span>
            </a>
          </SocialLinks>
        </p>
      </div>
    </ContactSection>
  )
}

export default Contact
