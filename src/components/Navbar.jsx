import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.div`
  // Styles are inherited from existing CSS
`

const Navbar = () => {
  const floatingRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!floatingRef.current) return
      
      const getTransformValue = (v1, v2, value) => {
        const val = ((v1 / v2 * value - value / 2) * 1)
        return val.toFixed(1)
      }

      const card_x = getTransformValue(event.clientX, window.innerWidth, 56)
      const card_y = -getTransformValue(event.clientY, window.innerHeight, 56)
      
      floatingRef.current.style.transform = `rotateX(${card_y / 1}deg) rotateY(${card_x}deg)`
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Handle smooth scrolling for navbar links
    if (window.$) {
      $(".navbar a").off('click').on('click', function (event) {
        if (this.hash !== "") {
          event.preventDefault()
          const hash = this.hash
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 50
          }, 1000, function () {
            window.location.hash = hash
          })
        }
      })
    }
  }, [])

  return (
    <NavbarContainer className="navbar navbar-default navbar-fixed-top">
      <div className="container-nav">
        <div className="collapse navbar-collapse" id="myNavbar">
          <div className="floating" ref={floatingRef}>
            <div className="title" id="card-title">JK</div>
            <div className="title" id="card-title-underpinning-1">JK</div>
            <div className="title" id="card-title-underpinning-2">JK</div>
            <div className="title" id="card-title-underpinning-3">JK</div>
            <div className="title" id="card-title-underpinning-4">JK</div>
            <div className="title" id="card-title-underpinning-5">JK</div>
          </div>
          <ul className="nav navbar-nav navbar-center">
            <li>
              <a href="#myPage">
                <span className="text"> Overview </span>
                <span className="glyphicon glyphicon-menu-up white"></span>
              </a>
            </li>
            <li>
              <a href="#education">
                <span className="text"> Education </span>
                <span className="glyphicon glyphicon-education white"></span>
              </a>
            </li>
            <li>
              <a href="#experience">
                <span className="text"> Experience </span>
                <span className="glyphicon glyphicon-briefcase white"></span>
              </a>
            </li>
            <li>
              <a href="#contact">
                <span className="text"> Contact </span>
                <span className="glyphicon glyphicon-envelope white"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </NavbarContainer>
  )
}

export default Navbar
