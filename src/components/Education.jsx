import Section from './Section'

const EducationItem = ({ logo, institution, degree, details, period, gpa }) => (
  <div className={degree ? 'edu-holder' : ''}>
    <img src={logo} className="icon" alt={`${institution} Logo`} />
    <strong>{institution}</strong>
    {degree && (
      <>
        <br />
        {degree}
      </>
    )}
    <br />
    {details}
    <br />
    {period} | {gpa}
  </div>
)

const Education = () => {
  const educationHistory = [
    {
      logo: '/images/rpi_logo.jpg',
      institution: 'Rensselaer Polytechnic Institute',
      degree: 'BS in Computer Science - Cum Laude',
      details: 'Concentration in Artificial Intelligence and Data',
      period: 'Fall 2015 - Spring 2018 | Troy, NY',
      gpa: 'Cum. GPA 3.51'
    },
    {
      logo: '/images/clark_logo.jpg',
      institution: 'Clark University',
      degree: null,
      details: 'Spent two years in Liberal Arts program before transferring to RPI',
      period: 'Fall 2012 - Spring 2014 | Worcester, MA',
      gpa: 'GPA 3.63'
    }
  ]

  return (
    <Section id="education" style={{minHeight: '200px'}}>
      <h2>Education</h2>
      <div className="container-fluid">
        {educationHistory.map((edu, index) => (
          <EducationItem key={index} {...edu} />
        ))}
      </div>
      <br />
    </Section>
  )
}

export default Education
