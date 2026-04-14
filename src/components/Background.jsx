import styled, { keyframes } from 'styled-components'

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  30% { transform: translate(5%, -10%); }
  50% { transform: translate(-10%, 5%); }
  70% { transform: translate(10%, 5%); }
  90% { transform: translate(-5%, 10%); }
`

const BackgroundBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: #f5f0e8;
  overflow: hidden;
  pointer-events: none;
`

const GrainOverlay = styled.div`
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  animation: ${grain} 8s steps(10) infinite;
  mix-blend-mode: multiply;
  pointer-events: none;
`

const Background = () => (
  <BackgroundBase>
    <GrainOverlay />
  </BackgroundBase>
)

export default Background
