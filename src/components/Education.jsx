import styled from 'styled-components'
import Section from './Section'

const SectionTitle = styled.h2`
  color: white;
  font-size: clamp(2.25rem, 5vw, 2.75rem);
  font-family: 'Comfortaa', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
`

const EducationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const EducationCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: clamp(1.25rem, 4vw, 2rem);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: clamp(1.5rem, 4vw, 2rem);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(44, 165, 141, 0.4);
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`

const LogoWrapper = styled.div`
  flex-shrink: 0;
  
  img {
    width: clamp(60px, 12vw, 85px);
    height: clamp(60px, 12vw, 85px);
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`

const EducationInfo = styled.div`
  flex: 1;
`

const InstitutionName = styled.h3`
  color: #fff;
  font-family: 'Comfortaa', sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  margin: 0 0 0.5rem 0;
`

const Degree = styled.div`
  color: #2CA58D;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 600;
  margin-bottom: 0.4rem;
`

const Details = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(1.15rem, 2.5vw, 1.375rem);
  margin-bottom: 0.75rem;
  line-height: 1.6;
`

const Meta = styled.div`
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
`

const Education = () => {
  const educationHistory = [
    {
      logo: '/images/rpi_logo.jpg',
      institution: 'Rensselaer Polytechnic Institute',
      degree: 'BS in Computer Science, Cum Laude',
      details: 'Artificial Intelligence and Data Concentration',
      period: 'Graduated Spring 2018',
      location: 'Troy, NY'
    },
    {
      logo: '/images/clark_logo.jpg',
      institution: 'Clark University',
      degree: null,
      details: 'Spent two years in Liberal Arts program before transferring to RPI',
      period: 'Fall 2012 - Spring 2014',
      location: 'Worcester, MA'
    }
  ]

  return (
    <Section id="education" frostLevel={2} style={{minHeight: '200px', paddingBottom: '4rem', padding: '3rem 0'}}>
      <SectionTitle>Education</SectionTitle>
      <EducationContainer>
        {educationHistory.map((edu, index) => (
          <EducationCard key={index}>
            <LogoWrapper>
              <img src={edu.logo} alt={`${edu.institution} Logo`} />
            </LogoWrapper>
            <EducationInfo>
              <InstitutionName>{edu.institution}</InstitutionName>
              {edu.degree && <Degree>{edu.degree}</Degree>}
              <Details>{edu.details}</Details>
              <Meta>{edu.period} · {edu.location}</Meta>
            </EducationInfo>
          </EducationCard>
        ))}
      </EducationContainer>
    </Section>
  )
}

export default Education
