import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  font-size: 12px;
  line-height: 1.5;
  font-family: 'Montserrat', sans-serif;
  background-color: rgba(0, 0, 0, 0.4);
  width: 75px;
  height: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.53);
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`

const FloatingContainer = styled.div`
  height: 60px;
  transform-style: preserve-3d;
  transform: rotateX(17deg) rotateY(18deg);
  position: relative;
  left: 18px;
  margin-bottom: 20px;
`

const FloatingTitle = styled.div`
  font-family: 'Righteous', cursive;
  font-size: 35px;
  font-weight: bold;
  letter-spacing: 2px;
  position: absolute;
  
  &.main {
    transform: translateZ(16px);
    color: #2CA58D;
  }
  
  &.layer-1 {
    transform: translateZ(12px);
    color: rgba(65, 65, 65, 0.95);
  }
  
  &.layer-2 {
    transform: translateZ(8px);
    color: rgba(65, 65, 65, 0.95);
  }
  
  &.layer-3 {
    transform: translateZ(4px);
    color: rgba(65, 65, 65, 0.95);
  }
  
  &.layer-4 {
    transform: translateZ(2px);
    color: rgba(65, 65, 65, 0.95);
  }
  
  &.layer-5 {
    transform: translateZ(0px);
    color: rgba(65, 65, 65, 0.95);
  }
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`

const NavItem = styled.li`
  width: 100%;
  text-align: center;
  background-color: transparent;
  transition: background-color 0.4s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

const NavLink = styled.a`
  display: block;
  width: 75px;
  padding: 5px 5px 15px;
  color: #fff !important;
  text-decoration: none;
  position: relative;
  
  &:hover {
    text-shadow: none;
  }
`

const NavText = styled.span`
  position: relative;
  top: 10px;
  opacity: 0;
  width: 100%;
  display: block;
  transition: opacity 0.4s;
  font-size: 11px;
  
  ${NavItem}:hover & {
    opacity: 1;
  }
`

const NavIcon = styled.span`
  position: absolute;
  top: 18px;
  right: 33px;
  opacity: 1;
  transition: opacity 0.4s;
  color: white;
  
  ${NavItem}:hover & {
    opacity: 0;
  }
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

  const handleNavClick = (e, hash) => {
    if (hash) {
      e.preventDefault()
      const element = document.querySelector(hash)
      if (element) {
        const top = hash === '#myPage' ? 0 : element.offsetTop - 50
        window.scrollTo({
          top,
          behavior: 'smooth'
        })
        setTimeout(() => {
          window.location.hash = hash
        }, 1000)
      }
    }
  }

  const navItems = [
    { href: '#myPage', text: 'Overview', icon: 'glyphicon glyphicon-menu-up' },
    { href: '#education', text: 'Education', icon: 'glyphicon glyphicon-education' },
    { href: '#experience', text: 'Experience', icon: 'glyphicon glyphicon-briefcase' },
    { href: '#contact', text: 'Contact', icon: 'glyphicon glyphicon-envelope' }
  ]

  return (
    <NavbarContainer>
      <FloatingContainer ref={floatingRef}>
        <FloatingTitle className="main">JK</FloatingTitle>
        <FloatingTitle className="layer-1">JK</FloatingTitle>
        <FloatingTitle className="layer-2">JK</FloatingTitle>
        <FloatingTitle className="layer-3">JK</FloatingTitle>
        <FloatingTitle className="layer-4">JK</FloatingTitle>
        <FloatingTitle className="layer-5">JK</FloatingTitle>
      </FloatingContainer>
      
      <NavList>
        {navItems.map((item, index) => (
          <NavItem key={index}>
            <NavLink 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              <NavText>{item.text}</NavText>
              <NavIcon className={item.icon} />
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </NavbarContainer>
  )
}

export default Navbar
