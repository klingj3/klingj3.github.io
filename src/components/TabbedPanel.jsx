import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { INK_MID, INK_LIGHT, INK_RED, PAPER, SHADE, FONT_SERIF_ALT } from '../styles/theme'

const TabWrap = styled.div`
  display: flex;
  align-items: flex-end;
  border-bottom: 1.5px solid ${INK_MID};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`

const Tab = styled.button`
  font-family: ${FONT_SERIF_ALT};
  font-size: clamp(0.76rem, 1.3vw, 0.88rem);
  font-style: italic;
  padding: 0.5rem 1.1rem 0.45rem;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  z-index: ${({ $active }) => $active ? 1 : 0};
  color: ${({ $active }) => $active ? INK_RED : INK_LIGHT};
  background: ${({ $active }) => $active ? PAPER : 'transparent'};
  border-top: ${({ $active }) => $active ? `1.5px solid ${INK_MID}` : '1.5px solid transparent'};
  border-left: ${({ $active }) => $active ? `1.5px solid ${INK_MID}` : '1.5px solid transparent'};
  border-right: ${({ $active }) => $active ? `1.5px solid ${INK_MID}` : '1.5px solid transparent'};
  border-bottom: ${({ $active }) => $active ? `1.5px solid ${PAPER}` : 'none'};
  margin-bottom: ${({ $active }) => $active ? '-1.5px' : '0'};
  &:hover { color: ${({ $active }) => $active ? INK_RED : INK_MID}; }
`

const Panel = styled.div`
  border: 1.5px solid ${INK_MID};
  border-top: none;
  background: ${SHADE};
  padding: clamp(1.25rem, 3vw, 1.85rem) clamp(1.25rem, 3vw, 2rem);
  overflow: hidden;
`

const contentVariants = {
  enter: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.16 } },
}

/**
 * Dictionary-style tabbed panel shared across sections.
 * - items: array of tab data
 * - renderLabel(item, index): tab button contents
 * - renderContent(item, index): active panel contents
 */
const TabbedPanel = ({ items, renderLabel, renderContent }) => {
  const [active, setActive] = useState(0)
  const safeActive = Math.min(active, items.length - 1)
  const current = items[safeActive]

  return (
    <div>
      <TabWrap>
        {items.map((item, i) => (
          <Tab key={i} $active={safeActive === i} onClick={() => setActive(i)}>
            {renderLabel(item, i)}
          </Tab>
        ))}
        <div style={{ flex: 1 }} />
      </TabWrap>

      <Panel>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={safeActive} variants={contentVariants} initial="enter" animate="visible" exit="exit">
            {renderContent(current, safeActive)}
          </motion.div>
        </AnimatePresence>
      </Panel>
    </div>
  )
}

export default TabbedPanel
