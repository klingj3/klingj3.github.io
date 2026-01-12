import styled, { keyframes } from 'styled-components'

const gradientShift = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`

const BackgroundBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: linear-gradient(
    135deg,
    #1a2332 0%,
    #1d2840 25%,
    #1a2d3d 50%,
    #1c2638 75%,
    #1a2332 100%
  );
  background-size: 200% 200%;
  animation: ${gradientShift} 20s ease infinite;
`

const Background = () => {
  return <BackgroundBase />
}

export default Background
