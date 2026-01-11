import React from 'react'
import styled from 'styled-components'
import Section from './Section'

const SectionTitle = styled.h2`
  color: white;
  font-size: clamp(2.25rem, 5vw, 2.75rem);
  font-family: 'Comfortaa', sans-serif;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
`

const ExperienceContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`

const Timeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(
      to bottom,
      #2CA58D,
      rgba(44, 165, 141, 0.3)
    );
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`

const CompanyBlock = styled.div`
  position: relative;
  padding-left: 3rem;
  margin-bottom: 3.5rem;
  
  &::before {
    content: '';
    position: absolute;
    left: -7px;
    top: 12px;
    width: 17px;
    height: 17px;
    background: #262a38;
    border: 3px solid #2CA58D;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(44, 165, 141, 0.6);
  }
  
  @media (max-width: 768px) {
    padding-left: 0;
    
    &::before {
      display: none;
    }
  }
`

const CompanyCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(44, 165, 141, 0.4);
  }
`

const CompanyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const CompanyName = styled.h3`
  color: #fff;
  font-family: 'Comfortaa', sans-serif;
  font-weight: 700;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  margin: 0;
  letter-spacing: 0.5px;
`

const CompanyLocation = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 400;
`

const RolesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const RoleBlock = styled.div`
  position: relative;
  padding-left: 1.25rem;
  border-left: 3px solid rgba(44, 165, 141, 0.3);
  transition: border-color 0.3s ease;
  
  &:hover {
    border-left-color: #2CA58D;
  }
  
  @media (max-width: 768px) {
    padding-left: 1rem;
  }
`

const RoleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const RoleTitle = styled.h4`
  font-weight: 600;
  margin: 0;
  color: #2CA58D;
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  font-family: 'Lato', sans-serif;
`

const RolePeriod = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  letter-spacing: 0.3px;
`

const DetailsList = styled.ul`
  margin: 0;
  padding-left: 1.5rem;
  list-style: none;
  
  li {
    position: relative;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.85);
    font-size: clamp(1.25rem, 2.5vw, 1.5rem);
    line-height: 1.7;
    
    &::before {
      content: '›';
      position: absolute;
      left: -1.25rem;
      color: #2CA58D;
      font-weight: bold;
      font-size: 1.2em;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const QuoteBlock = styled.div`
  background: rgba(44, 165, 141, 0.1);
  border-radius: 12px;
  padding: clamp(1rem, 3vw, 1.5rem);
  padding-left: clamp(1.5rem, 4vw, 2.5rem);
  margin: 0.75rem 0 1rem 0;
  border-left: 4px solid #2CA58D;
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const QuoteItem = styled.div`
  flex: 1;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -0.75rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(44, 165, 141, 0.3);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`

const QuoteText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  font-size: clamp(1.15rem, 2.5vw, 1.375rem);
  line-height: 1.5;
  margin: 0 0 0.4rem 0;
  
  &::before {
    content: '"';
    color: #2CA58D;
    font-size: 1.5em;
    font-family: Georgia, serif;
    margin-right: 0.25rem;
    vertical-align: baseline;
    line-height: 0;
  }
  
  &::after {
    content: '"';
    color: #2CA58D;
    font-size: 1.5em;
    font-family: Georgia, serif;
    margin-left: 0.1rem;
    vertical-align: baseline;
    line-height: 0;
  }
`

const QuoteAttribution = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  font-weight: 500;
  display: block;
`

const Experience = () => {
  const companies = [
    {
      name: 'Formation Bio',
      location: 'New York, NY',
      roles: [
        {
          title: 'Senior Software Engineer',
          period: '08/2023 – Present',
          details: [
            {
              text: "Led backend architecture and implementation for Muse, an LLM-driven suite of tools that generates human-level, regulation-compliant recruitment materials for clinical trials — the result of a partnership with Sanofi and OpenAI. Despite the sophistication and complexity of the multi-agent system that produced these materials, no-code interfaces were developed to allow non-tech domain experts to experiment and tune system output. Project was a major company success and will soon be used in the real-world by Sanofi.",
              quotes: [
                { text: "The development of Muse ... represents another proof point in Sanofi's journey to becoming the first pharma company powered by AI at scale.", author: "Emmanuel Frenehard, Sanofi CDO" },
                { text: "We believe AI can accelerate drug development, bringing new treatments to patients more quickly... we can't wait to see the impact [Muse] will have.", author: "Brad Lightcap, OpenAI COO" }
              ]
            },
            "Developed multiple MVPs/POCs using LLMs and computer vision to streamline internal research for drug acquisition and development. These ranged from new ways of interacting with clinical trial data to extracting structured data from literature."
          ]
        },
        {
          title: 'Software Engineer II',
          period: '10/2021 – 07/2023',
          details: [
            "Fullstack contributions to multiple applications supporting form-building and deployment/management for nurse/patient use in clinical trial operations. (NestJS, Python, React)"
          ]
        }
      ]
    },
    {
      name: 'Memorial Sloan Kettering Cancer Center',
      location: 'New York, NY',
      roles: [
        {
          title: 'Software Engineer',
          period: '01/2021 – 10/2021',
          details: [
            "Automated, optimized, and expanded upon system for transforming vast amounts of hospital data from disparate sources into the OMOP Common Data Model in order to facilitate research within MSK and possible future data sharing. (Python, SQL, Airflow)"
          ]
        }
      ]
    },
    {
      name: 'Annalect',
      location: 'New York, NY',
      roles: [
        {
          title: 'Software Engineer',
          period: '11/2020 – 01/2021',
          details: [
            "Full stack developer (Python, AngularJS, Redshift) on multiple core applications within Omni, the Marketing Science and Data software suite used across advertising agencies within Annalect's parent company Omnicom Media Group in planning campaigns for Omnicom's Fortune 100 clients.",
            "Contributed to disparate components of these applications across the tech stack, from UI overhauls, to creating a pipeline for ingesting client's first-party data into our application, and implementing machine-learning-driven features on the back end of our audience modeling application including lookalike modeling to expand advertised audiences."
          ]
        },
        {
          title: 'Junior Developer',
          period: '01/2019 – 10/2020',
          details: [
            "Full stack developer on multiple core Omni applications, contributing across the entire tech stack from frontend UI overhauls to backend ML feature implementation.",
            "Built data ingestion pipelines for client first-party data and implemented lookalike modeling for audience expansion."
          ]
        },
        {
          title: 'R&D Intern',
          period: '09/2018 – 12/2018',
          details: [
            "Worked on a variety of small and experimental projects within the Annalect R&D (\"Labs\") team, quickly prototyping applications independently working across the whole tech stack.",
            "Developed a recommendation engine system with Keras which could quickly derive strongly correlated websites from clickstream data and find differences in browsing behavior between consumers of different brands."
          ]
        }
      ]
    }
  ]

  return (
    <Section id="experience" transparent style={{ background: 'linear-gradient(135deg, rgba(38, 42, 56, 0.95) 0%, rgba(44, 165, 141, 0.15) 100%)', padding: '3rem 0' }}>
      <div className="container-fluid">
        <SectionTitle>Experience</SectionTitle>
        <ExperienceContainer>
          <Timeline>
            {companies.map((company, companyIndex) => (
              <CompanyBlock key={companyIndex}>
                <CompanyCard>
                  <CompanyHeader>
                    <CompanyName>{company.name}</CompanyName>
                    <CompanyLocation>{company.location}</CompanyLocation>
                  </CompanyHeader>
                  
                  <RolesContainer>
                    {company.roles.map((role, roleIndex) => (
                      <RoleBlock key={roleIndex}>
                        <RoleHeader>
                          <RoleTitle>{role.title}</RoleTitle>
                          <RolePeriod>{role.period}</RolePeriod>
                        </RoleHeader>
                        <DetailsList>
                          {role.details.map((detail, detailIndex) => (
                            <React.Fragment key={detailIndex}>
                              <li>{typeof detail === 'string' ? detail : detail.text}</li>
                              {typeof detail === 'object' && detail.quotes && (
                                <QuoteBlock>
                                  {detail.quotes.map((quote, quoteIndex) => (
                                    <QuoteItem key={quoteIndex}>
                                      <QuoteText>{quote.text}</QuoteText>
                                      <QuoteAttribution>— {quote.author}</QuoteAttribution>
                                    </QuoteItem>
                                  ))}
                                </QuoteBlock>
                              )}
                            </React.Fragment>
                          ))}
                        </DetailsList>
                      </RoleBlock>
                    ))}
                  </RolesContainer>
                </CompanyCard>
              </CompanyBlock>
            ))}
          </Timeline>
        </ExperienceContainer>
      </div>
    </Section>
  )
}

export default Experience
