import styled, { keyframes } from 'styled-components'

const grain = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  30% { transform: translate(5%, -10%); }
  50% { transform: translate(-10%, 5%); }
  70% { transform: translate(10%, 5%); }
  90% { transform: translate(-5%, 10%); }
`

const lampDrift = keyframes`
  0%   { background-position: 50% 36%, 46% 56%, 0 0; }
  25%  { background-position: 51.5% 35%, 47% 55%, 0 0; }
  50%  { background-position: 49% 37.5%, 45.5% 57%, 0 0; }
  75%  { background-position: 51% 36.5%, 46.5% 55.5%, 0 0; }
  100% { background-position: 50% 36%, 46% 56%, 0 0; }
`

const BackgroundBase = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background-color: #e8e0d2;
  background-image:
    radial-gradient(
      ellipse 115% 92% at 50% 36%,
      rgba(255, 254, 250, 0.88) 0%,
      rgba(255, 251, 242, 0.52) 30%,
      rgba(255, 248, 235, 0.22) 52%,
      transparent 78%
    ),
    radial-gradient(
      circle 68vmax at 46% 56%,
      rgba(255, 252, 246, 0.42) 0%,
      transparent 62%
    ),
    linear-gradient(
      168deg,
      #ddd2bf 0%,
      #e6dcc8 32%,
      #ebe3d4 58%,
      #e4dac6 100%
    );
  background-repeat: no-repeat;
  background-size: cover;
  animation: ${lampDrift} 40s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const GrainOverlay = styled.div`
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  animation: ${grain} 8s steps(10) infinite;
  mix-blend-mode: soft-light;
  opacity: 0.5;
  pointer-events: none;
`

const Background = () => (
  <BackgroundBase>
    <GrainOverlay />
  </BackgroundBase>
)

export default Background
