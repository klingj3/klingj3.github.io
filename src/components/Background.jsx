import styled, { keyframes } from 'styled-components'

const drift = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, -80px) scale(1.1); }
  50% { transform: translate(-40px, 60px) scale(0.95); }
  75% { transform: translate(-80px, -30px) scale(1.05); }
`

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(-50px, 70px) scale(1.05); }
  50% { transform: translate(60px, -50px) scale(1.1); }
  75% { transform: translate(30px, 80px) scale(0.95); }
`

const BackgroundBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #0c0f16;
  overflow: hidden;
  pointer-events: none;
`

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  will-change: transform;
`

const OrbPrimary = styled(Orb)`
  width: 800px;
  height: 800px;
  top: -200px;
  right: -200px;
  background: radial-gradient(circle, rgba(44, 165, 141, 0.15) 0%, rgba(44, 165, 141, 0.05) 40%, transparent 70%);
  filter: blur(80px);
  animation: ${drift} 30s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 500px;
    height: 500px;
  }
`

const OrbSecondary = styled(Orb)`
  width: 700px;
  height: 700px;
  bottom: -200px;
  left: -200px;
  background: radial-gradient(circle, rgba(30, 60, 100, 0.2) 0%, rgba(30, 60, 100, 0.05) 40%, transparent 70%);
  filter: blur(80px);
  animation: ${drift2} 35s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 450px;
    height: 450px;
  }
`

const Background = () => (
  <BackgroundBase>
    <OrbPrimary />
    <OrbSecondary />
  </BackgroundBase>
)

export default Background
