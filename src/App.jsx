import { useMemo, useEffect } from 'react'
import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import { RULE_LIGHT, FADED, FONT_SERIF_ALT, LAYOUT_WIDTH } from './styles/theme'
import {
  Experience,
  Education,
  Contact,
  Footer,
  IntroScreen,
  Background
} from './components'

const clampUnit = (v) => Math.max(-1, Math.min(1, v))

const PageWrap = styled.div`
  position: relative;
  z-index: 1;
`

const MarginCol = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc((100% - ${LAYOUT_WIDTH}) / 2 - 1rem);
  min-width: 0;
  font-family: ${FONT_SERIF_ALT};
  font-size: 0.76rem;
  color: ${FADED};
  line-height: 1.7;
  overflow: hidden;
  pointer-events: none;
  padding: 2.5rem 1.2rem;
  user-select: none;
  ${({ $side }) => $side === 'left' ? `
    left: 0;
    border-right: 1px solid ${RULE_LIGHT};
    text-align: right;
  ` : `
    right: 0;
    border-left: 1px solid ${RULE_LIGHT};
  `}

  @media (max-width: 1200px) {
    display: none;
  }
`

const MEntry = styled.div`
  margin-bottom: 0.7rem;
`

const MHw = styled.span`
  font-weight: 700;
  font-size: 0.82em;
`

const MIt = styled.span`
  font-style: italic;
`

const entryPool = [
  { hw: 'ab·strac·tion', t: '/æbˈstræk.ʃən/ n. the process of removing physical, spatial, or temporal details to focus attention on details of greater importance.' },
  { hw: 'al·go·rithm', t: '/ˈæl.ɡə.rɪðm/ n. a process or set of rules to be followed in calculations; a step-by-step procedure for solving a problem.' },
  { hw: 'ar·chi·tec·ture', t: '/ˈɑːr.kɪ.tek.tʃər/ n. the complex structure of something; in comp. sci., the conceptual model defining the structure and behavior of a system.' },
  { hw: 'bi·na·ry', t: '/ˈbaɪ.nə.ri/ adj. relating to a system of numerical notation with two as its base; composed of two things.' },
  { hw: 'buff·er', t: '/ˈbʌf.ər/ n. a temporary holding area for data; one who or that which buffers.' },
  { hw: 'cache', t: '/kæʃ/ n. a collection of items stored in a hidden place; in comp. sci., a hardware or software component that stores data for faster future access.' },
  { hw: 'com·pile', t: '/kəmˈpaɪl/ v. to produce by assembling information collected from various sources; to convert a program into machine code.' },
  { hw: 'cur·so·ry', t: '/ˈkɜːr.sər.i/ adj. hasty and therefore not thorough or detailed; going rapidly over something.' },
  { hw: 'da·ta', t: '/ˈdeɪ.tə/ n. facts and statistics collected together for reference or analysis; the quantities or symbols operated on by a computer.' },
  { hw: 'de·bug', t: '/diːˈbʌɡ/ v. to identify and remove errors from computer hardware or software.' },
  { hw: 'en·cap·su·late', t: '/ɪnˈkæp.sjʊ.leɪt/ v. to enclose in or as if in a capsule; to express the essential features of succinctly.' },
  { hw: 'ep·i·graph', t: '/ˈep.ɪ.ɡrɑːf/ n. an inscription on a building, statue, or coin; a short quotation at the beginning of a book or chapter.' },
  { hw: 'float', t: '/floʊt/ v. to rest on the surface of a liquid; n. in comp. sci., a data type representing a number with a fractional component.' },
  { hw: 'func·tion', t: '/ˈfʌŋk.ʃən/ n. a relation between sets that associates every element of a first set to exactly one element of a second set.' },
  { hw: 'gar·bage', t: '/ˈɡɑːr.bɪdʒ/ n. worthless matter; refuse. In comp. sci., data which is no longer accessible but occupies memory.' },
  { hw: 'hash', t: '/hæʃ/ n. a dish of cooked meat cut into small pieces. In comp. sci., a fixed-size numerical result of applying a mathematical function to data of arbitrary size.' },
  { hw: 'heap', t: '/hiːp/ n. an untidy collection of things piled up haphazardly; in comp. sci., a specialized tree-based data structure.' },
  { hw: 'id·i·om', t: '/ˈɪd.i.əm/ n. a group of words established by usage having a meaning not deducible from those of the individual words.' },
  { hw: 'in·dex', t: '/ˈɪn.deks/ n. an alphabetical list of names, subjects, etc. with references to the places where they occur.' },
  { hw: 'jit·ter', t: '/ˈdʒɪt.ər/ v. to make continuous slight, rapid movements. In comp. sci., random variation in execution timing.' },
  { hw: 'john', t: '/dʒɒn/ n. — see Klingelhofer, John.', special: true },
  { hw: 'join', t: '/dʒɔɪn/ v. to connect or combine; in databases, an operation that combines rows from two or more tables.' },
  { hw: 'ker·nel', t: '/ˈkɜːr.nəl/ n. the softer part of a nut; the central or most important part. In comp. sci., the core of an operating system.' },
  { hw: 'kling', t: '/klɪŋ/ v. archaic. to ring or chime, esp. of small bells; to produce a clear metallic sound.' },
  { hw: 'kludge', t: '/kluːdʒ/ n. an ill-assorted collection of parts assembled to fulfill a particular purpose. Informal: a clumsy but effective solution.' },
  { hw: 'la·ten·cy', t: '/ˈleɪ.tən.si/ n. the state of existing but not yet being developed or manifest; a delay before a transfer of data begins.' },
  { hw: 'lex·i·con', t: '/ˈlek.sɪ.kɒn/ n. the vocabulary of a person, language, or branch of knowledge; a dictionary.' },
  { hw: 'mu·tex', t: '/ˈmjuː.teks/ n. a mutual exclusion object that allows multiple program threads to share the same resource, but not simultaneously.' },
  { hw: 'node', t: '/noʊd/ n. a point in a network at which lines intersect or branch; a basic unit of a data structure.' },
  { hw: 'oc·tet', t: '/ɒkˈtet/ n. a group of eight; in comp. sci., a unit of digital information consisting of eight bits.' },
  { hw: 'par·a·digm', t: '/ˈpær.ə.daɪm/ n. a typical example or pattern of something; a worldview underlying the theories of a particular subject.' },
  { hw: 'parse', t: '/pɑːrz/ v. to resolve into its component parts and describe their syntactic roles; to analyze a string or text.' },
  { hw: 'queue', t: '/kjuː/ n. a line of people or vehicles awaiting their turn; in comp. sci., a FIFO data structure.' },
  { hw: 'rec·ur·sion', t: '/rɪˈkɜːr.ʒən/ n. the repeated application of a procedure to itself. See: recursion.' },
  { hw: 'schema', t: '/ˈskiː.mə/ n. a representation of a plan or theory in the form of an outline or model; in databases, the organization of data.' },
  { hw: 'stack', t: '/stæk/ n. a pile of objects; in comp. sci., a LIFO abstract data type serving as a collection of elements.' },
  { hw: 'thread', t: '/θred/ n. a long thin strand; the smallest sequence of programmed instructions managed independently by a scheduler.' },
  { hw: 'to·ken', t: '/ˈtoʊ.kən/ n. a thing serving as a visible representation of a fact or quality; in comp. sci., a categorized block of text.' },
  { hw: 'u·ni·code', t: '/ˈjuː.nɪ.koʊd/ n. an international encoding standard for use with different languages and scripts, assigning a unique number to every character.' },
  { hw: 'vec·tor', t: '/ˈvek.tər/ n. a quantity having direction as well as magnitude; a dynamically resizable array.' },
]

const MarginEntries = ({ entries }) => (
  <>
    {entries.map((e, i) => (
      <MEntry key={i}>
        <MHw>{e.hw}</MHw>{' '}
        {e.special ? <MIt>{e.t}</MIt> : e.t}
      </MEntry>
    ))}
  </>
)

const repeatPool = (pool, count) => {
  const out = []
  for (let i = 0; out.length < count; i++) out.push(pool[i % pool.length])
  return out
}

const App = () => {
  useEffect(() => {
    const root = document.documentElement
    let moveRaf = 0

    const applyMouse = (clientX, clientY) => {
      const nx = clampUnit((clientX / window.innerWidth) * 2 - 1)
      const ny = clampUnit((clientY / window.innerHeight) * 2 - 1)
      root.style.setProperty('--book-x', nx.toFixed(3))
      root.style.setProperty('--book-y', ny.toFixed(3))
    }

    const onMove = (e) => {
      if (moveRaf) return
      moveRaf = requestAnimationFrame(() => {
        moveRaf = 0
        applyMouse(e.clientX, e.clientY)
      })
    }

    const onLeave = () => {
      root.style.setProperty('--book-x', '0')
      root.style.setProperty('--book-y', '0')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (moveRaf) cancelAnimationFrame(moveRaf)
    }
  }, [])

  const leftEntries = useMemo(() => repeatPool(entryPool.slice(0, 22), 80), [])
  const rightEntries = useMemo(() => repeatPool(entryPool.slice(22), 80), [])

  return (
    <>
      <GlobalStyles />
      <Background />
      <PageWrap>
        <MarginCol $side="left">
          <MarginEntries entries={leftEntries} />
        </MarginCol>
        <MarginCol $side="right">
          <MarginEntries entries={rightEntries} />
        </MarginCol>
        <IntroScreen />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </PageWrap>
    </>
  )
}

export default App
