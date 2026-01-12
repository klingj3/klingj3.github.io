import styled from 'styled-components'
import Section from './Section'

const ContactWrapper = styled.div`
  text-align: center;
  padding: 0 1.5rem;
`

const Title = styled.h2`
  color: white;
  font-size: clamp(2.25rem, 5vw, 2.75rem);
  font-family: 'Comfortaa', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 30px;
  margin-top: 30px;
`

const ContactText = styled.p`
  color: white;
  text-align: center;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  line-height: 1.8;
`

const EmailLink = styled.a`
  color: #2CA58D;
  font-weight: 600;
  font-size: clamp(1.5rem, 2.5vw, 1.75rem);
  
  &:hover {
    color: #fff;
    text-shadow: 0 0 20px rgba(44, 165, 141, 0.5);
  }
`

const SocialLinks = styled.div`
  font-size: 55px;
  text-align: center;
  margin-top: 1rem;
  
  a {
    margin: 0 15px;
    color: white;
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline-block;
    
    &:hover {
      color: #2CA58D;
      transform: scale(1.1);
      text-shadow: 0 0 20px rgba(44, 165, 141, 0.5);
    }
  }
`

const Contact = () => {
  return (
    <Section id="contact" frostLevel={3} style={{ padding: '3rem 0' }}>
      <ContactWrapper>
        <Title>Contact</Title>
        <div>
          <ContactText>
            Any questions? Get in touch.
            <br />
            <EmailLink href="mailto:jkklingelhofer@gmail.com">
              jkklingelhofer@gmail.com
            </EmailLink>
            <br />
            <br />
            also see
          </ContactText>
          <SocialLinks>
            <a href="https://github.com/klingj3" aria-label="GitHub">
              <span className="fa fa-github"></span>
            </a>
            <a href="https://linkedin.com/in/john-klingelhofer-349892a5" aria-label="LinkedIn">
              <span className="fa fa-linkedin"></span>
            </a>
          </SocialLinks>
        </div>
      </ContactWrapper>
    </Section>
  )
}

export default Contact
