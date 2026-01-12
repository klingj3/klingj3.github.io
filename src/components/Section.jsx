import styled from 'styled-components'

// Frost levels create different transparency depths
// level 1 = lightest frost, level 3 = heaviest frost
const getFrostStyles = (level) => {
  const levels = {
    1: {
      background: 'rgba(255, 255, 255, 0.03)',
      blur: '8px',
      border: 'rgba(255, 255, 255, 0.05)',
    },
    2: {
      background: 'rgba(255, 255, 255, 0.05)',
      blur: '12px',
      border: 'rgba(255, 255, 255, 0.08)',
    },
    3: {
      background: 'rgba(255, 255, 255, 0.07)',
      blur: '16px',
      border: 'rgba(255, 255, 255, 0.1)',
    },
  }
  return levels[level] || levels[2]
}

const SectionContainer = styled.section`
  width: 100%;
  padding: 2rem 0;
  position: relative;
  
  ${props => {
    if (props.$frostLevel) {
      const frost = getFrostStyles(props.$frostLevel)
      return `
        background: ${frost.background};
        backdrop-filter: blur(${frost.blur});
        -webkit-backdrop-filter: blur(${frost.blur});
        border-top: 1px solid ${frost.border};
        border-bottom: 1px solid ${frost.border};
      `
    }
    return props.$transparent ? 'background-color: transparent;' : 'background-color: var(--secondary-background);'
  }}
`

const Section = ({ id, className, style, children, transparent = false, frostLevel = null }) => {
  return (
    <SectionContainer 
      id={id} 
      $transparent={transparent}
      $frostLevel={frostLevel}
      className={className}
      style={style}
    >
      {children}
    </SectionContainer>
  )
}

export default Section
