import { useEffect } from 'react'
import styled from 'styled-components'

const TitleContainer = styled.div`
  height: 100vh;
  position: relative;
  text-align: center;
  -ms-transform: translateY(37%);
  transform: translateY(37%);
`

const Name = styled.h1`
  text-align: center;
  font-size: 130px;
  color: var(--focus-1);
  opacity: 0;
  transform: translate(0px, -30px);
`

const TitleSection = () => {
  useEffect(() => {
    // Trigger animations after component mounts
    if (window.d3 && typeof window.loadAnimation === 'function') {
      window.loadAnimation()
    }

    // Setup scroll opacity effect
    if (window.$) {
      $(window).off('scroll').scroll(function () {
        $(".title-section").css("opacity", 1 - $(window).scrollTop() / 800)
      })
    }
  }, [])

  return (
    <div className="container">
      <TitleContainer className="title-section">
        <Name className="name">John Klingelhofer</Name>
        <div className="container-fluid">
          <div className="row" style={{height: '100px'}}>
            <h4 id="self-statement">
              <div className="self-statement-item">
                I'm a software developer in New York, New York.
              </div>
              <div className="self-statement-item fade-in">
                Look below for my
              </div>
              <div className="self-statement-item fade-in">
                <a href="#experience">professional history</a>,
              </div>
              <div className="self-statement-item fade-in">
                <a href="#education">education history</a>,
              </div>
              <div className="self-statement-item fade-in">
                and <a href="#contact">ways to get in touch</a>.
              </div>
            </h4>
          </div>
        </div>
      </TitleContainer>
    </div>
  )
}

export default TitleSection
