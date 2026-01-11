import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translate(0px, -30px);
  }
  to {
    opacity: 1;
    transform: translate(0px, 0px);
  }
`

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const TitleContainer = styled.div`
  height: 100vh;
  position: relative;
  text-align: center;
  transform: translateY(37%);
  transition: opacity 0.1s ease;
`

const Name = styled.h1`
  text-align: center;
  font-size: clamp(60px, 15vw, 130px);
  font-family: 'Righteous', sans-serif;
  color: #2CA58D;
  margin: 0;
  animation: ${slideDown} 1s ease 0.5s forwards;
  opacity: 0;
  
  @media (max-width: 768px) {
    font-size: clamp(40px, 12vw, 80px);
  }
`

const StatementContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
`

const StatementRow = styled.div`
  min-height: 100px;
`

const SelfStatement = styled.h4`
  text-align: center;
  font-size: 21px;
  line-height: 1.375em;
  color: whitesmoke;
  font-weight: 400;
  margin-bottom: 5px;
`

const StatementItem = styled.div`
  font-size: clamp(18px, 4vw, 25px);
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease forwards;
  animation-delay: ${props => props.$delay}ms;
  
  a {
    text-decoration: none;
    font-weight: 700;
    color: #90b4cb;
    transition: color 0.3s ease;
    
    &:hover {
      color: #fff;
    }
  }
`

const Container = styled.div`
  width: 100%;
`

const TitleSection = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const opacity = 1 - window.scrollY / 800
      setScrollOpacity(Math.max(0, opacity))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const statements = [
    { text: "I'm a software developer in New York, New York.", delay: 1700 },
    { text: "Look below for my", delay: 2900 },
    { text: <><a href="#experience">professional history</a>,</>, delay: 3400 },
    { text: <><a href="#education">education history</a>,</>, delay: 3900 },
    { text: <>and <a href="#contact">ways to get in touch</a>.</>, delay: 4400 }
  ]

  return (
    <Container>
      <TitleContainer style={{ opacity: scrollOpacity }}>
        <Name>John Klingelhofer</Name>
        <StatementContainer>
          <StatementRow>
            <SelfStatement>
              {statements.map((item, index) => (
                <StatementItem key={index} $delay={item.delay}>
                  {item.text}
                </StatementItem>
              ))}
            </SelfStatement>
          </StatementRow>
        </StatementContainer>
      </TitleContainer>
    </Container>
  )
}

export default TitleSection
