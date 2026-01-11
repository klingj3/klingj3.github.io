import Section from './Section'

const ExperienceItem = ({ company, title, period, details, description }) => (
  <div className="row-lg-8">
    <h4 className="black">
      <strong>{company}</strong> {title} | {period}
    </h4>
    {description && <span className="employer-detail">{description}</span>}
    <ul>
      {details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  </div>
)

const Experience = () => {
  const experiences = [
    {
      company: 'Formation Bio',
      title: 'Senior Software Enginer | 08/2023 - Now / Software Engineer II | 10/2021 - 08/2023',
      period: '',
      details: [
        "As a full-stack engineer, I applied React, NestJS and Python in creating various GraphQL-driven applications supporting patient recruitment for clinical trials, aiding TrialSpark's missing to bring new treatments to patients faster and more efficiently.",
        "Lead development of multiple explorative projects leveraging LLMs and other AI technologies to create tools aiming to speed up and simplify pharmaceutical reseach by internal teams, ranging from new ways of interacting with data from public clinical trials databases, to extracting and understanding complex information from the raw PDFs of research papers."
      ]
    },
    {
      company: 'Memorial Sloan Kettering Cancer Center',
      title: '- Software Developer',
      period: '01/2021-10/2021',
      details: [
        "Using Python, SQL, and Airflow, lead development of a robust system that automated, optimized, and expanded the scope of a process for transforming extensive hospital data from diverse sources into the OMOP Common Data Model. This work greatly enhanced the reliability and uptime of what was previously a generally manual process, with extensions for automatic inferred parallelization greatly reducing the running time of what was an exceptionally long-running process.",
        "Wrote RESTful APIs to facilitate interaction between terminology-focused graph databases with other internal applications."
      ]
    },
    {
      company: 'Annalect',
      title: 'Software Engineer | 11/2020-01/2021  - Junior Developer | 01/2019-11/2020',
      period: '',
      description: 'Annalect is the Marketing Science and Data arm of Omnicom Media Group.',
      details: [
        "Contributed on the front and back end to the development of two key applications within Omni, the Marketing Science and Data software suite used across agencies within Analects's parent company Omnicom Media Group. Both applications used Python 3 with Flask for an API driven by an AngularJS front-end.",
        "Developer on two applications within this suite, working on diverse tasks from the back end, to UI overhauls and front end feature enhancement with AngularJS and D3.",
        "Applied Python 3 (as well as common DS/ML packages such as scikit-learn, numpy, Pandas) SQL (PSQL, Redshift), JavaScript (D3, AngularJS), HTML, CSS, Docker, and AWS (Batch, Lambda, Redshift, S3).",
        "Used Scrum methodology in daily work as a part of an Agile team."
      ]
    },
    {
      company: 'Annalect',
      title: '- Labs Intern',
      period: '09/2018-12/2018',
      details: [
        "Worked on a variety of small and experimental projects within the Annalect R&D (\"Labs\") team.",
        "Created an extension to an existing web application made by the R&D team to produce automated natural language summaries of customer behavior in the consumer decision journey from large sets of demographic and clickstream data.",
        "Developed a recommendation engine which could quickly derive strongly correlated websites from clickstream data and find differences in browsing behavior between different brands, used internally for the development of taxonomies used in other Omni applications.(Python, Keras)"
      ]
    }
  ]

  return (
    <Section id="experience">
      <div className="container-fluid">
        <h2>Experience</h2>
        <div id="services" className="container-fluid text-center">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} />
          ))}
        </div>
      </div>
    </Section>
  )
}

export default Experience
