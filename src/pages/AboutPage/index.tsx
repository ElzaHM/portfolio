import { useEffect } from 'react'
import { Layout, Typography } from 'antd'
import { Download } from 'lucide-react'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import tmStyles from '../TechnicalMasteryPage/styles.module.css'
import styles from './styles.module.css'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

/** Vite-resolved URL for `src/assets/CV-TPM-Elza.pdf` */
const CV_PDF_URL = Object.values(
  import.meta.glob<string>('../../assets/CV-TPM-Elza.pdf', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)[0]

const CV_DOWNLOAD_FILENAME = 'Elza_Hovhannisyan_CV.pdf'

function CvDownloadLink() {
  if (CV_PDF_URL) {
    return (
      <a
        href={CV_PDF_URL}
        download={CV_DOWNLOAD_FILENAME}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cvDownloadLink}
        aria-label={`Download full CV as ${CV_DOWNLOAD_FILENAME} (opens in a new tab)`}
      >
        <span className={styles.cvDownloadIcon} aria-hidden>
          <Download width={14} height={14} strokeWidth={2} />
        </span>
        Download Full CV (PDF)
      </a>
    )
  }

  return (
    <span
      className={`${styles.cvDownloadLink} ${styles.cvDownloadDisabled}`}
      aria-disabled="true"
      aria-label="CV file unavailable"
    >
      <span className={styles.cvDownloadIcon} aria-hidden>
        <Download width={14} height={14} strokeWidth={2} />
      </span>
      Download Full CV (PDF)
    </span>
  )
}

const BIO =
  '**Frontend Engineer** and **Technical Project Manager** with **5+ years** of frontend experience building **scalable web applications** and leading cross-functional delivery. Hands-on in **Angular**, **TypeScript**, and **React**, with a focus on **UI architecture**, reusable component systems, and performance-minded interfaces. I combine deep frontend engineering with **Agile delivery**, **SDLC management**, and **technical project management**—mentoring engineers, coordinating sprints, and aligning technical execution with business goals across **SaaS**, **ERP/CRM**, and platform environments.'

const workRoles = [
  {
    key: 'mobius',
    title: 'Frontend Engineer & Technical Project Manager',
    meta: 'Mobius Charitable Foundation · Dec 2024 – Mar 2026',
    bullets: [
      'Delivered **mobius.am** from planning to release, owning frontend delivery and project coordination across the **SDLC**.',
      'Developed **Angular/TypeScript** frontend solutions with responsive UI, scalable component structure, and maintainable architecture.',
      'Managed **SDLC**, sprint planning, and delivery coordination from development through deployment.',
      'Worked with **QA**, designers, and stakeholders to translate requirements into actionable plans and progress updates.',
    ],
  },
  {
    key: 'ovak',
    title: 'Frontend Team Lead & Technical Project Coordinator',
    meta: 'Ovak Technologies LLC · Apr 2021 – Jan 2026',
    bullets: [
      'Led **Angular/TypeScript** frontend development for enterprise **ERP/CRM** and **SaaS** solutions.',
      'Mentored **3–5 engineers**, conducting code reviews and establishing reusable patterns that improved team consistency.',
      'Built **reusable UI components** and shared frontend standards to support scalable product development.',
      'Partnered with product, design, and backend teams to refine requirements and ship production-ready features.',
      'Coordinated **Agile workflows**—sprint planning, task prioritization, and release coordination.',
    ],
  },
  {
    key: 'founder',
    title: 'Founder & Lead Developer',
    meta: 'Techahartak.com · Social Impact Platform · Remote',
    bullets: [
      'Founded and developed a social impact platform focused on creating **accessible digital experiences** and meaningful community solutions.',
      'Owned the **product vision**, **technical direction**, and full-cycle development process from idea validation to implementation.',
      'Designed and built **multilingual** user experiences (**ARM**, **EN**, **RU**), developed scalable frontend solutions, and transformed product ideas into functional digital solutions.',
      'Focused on **inclusive design**, user-centered thinking, and building a strong technical foundation for future growth.',
    ],
  },
] as const

function RichParagraph({ text, className }: { text: string; className?: string }) {
  return (
    <Paragraph className={className}>
      {text.split('**').map((chunk, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={styles.richStrong}>
            {chunk}
          </strong>
        ) : (
          <span key={i}>{chunk}</span>
        ),
      )}
    </Paragraph>
  )
}

function RichBullet({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className={styles.richEmphasis}>
              {part.slice(2, -2)}
            </strong>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  return (
    <>
      <Content className={homeStyles.main}>
        <div className={`${homeStyles.contentInner} ${tmStyles.pageInner} ${styles.aboutPageInner}`}>
          <main className={styles.aboutMain}>
            <header className={styles.aboutMasthead}>
              <Title level={1} className={styles.heroHeadline}>
                Frontend Engineer &amp; Technical Project Manager.
              </Title>
              <div className={`${styles.glassPanel} ${styles.introPanel}`}>
                <RichParagraph text={BIO} className={styles.sectionIntro} />
                <nav className={styles.downloadToolbar} aria-label="Resume">
                  <CvDownloadLink />
                </nav>
              </div>
            </header>

            <section className={styles.compactSection} aria-labelledby="work-heading">
              <Title level={2} className={styles.sectionHeading} id="work-heading">
                Work Experience
              </Title>
              <div className={styles.timeline}>
                {workRoles.map((role) => (
                  <article key={role.key} className={styles.timelineItem}>
                    <div className={styles.roleCard}>
                      <Title level={4} className={styles.roleTitle}>
                        {role.title}
                      </Title>
                      <Text className={styles.roleMeta}>{role.meta}</Text>
                      <ul className={styles.bulletList}>
                        {role.bullets.map((b) => (
                          <li key={b.slice(0, 40)}>
                            <RichBullet text={b} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.compactSection} aria-labelledby="education-heading">
              <Title level={2} className={styles.sectionHeading} id="education-heading">
                Education
              </Title>
              <div className={styles.educationList}>
                <article className={styles.educationCard}>
                  <Title level={5} className={styles.educationTitle}>
                    Master&apos;s degree · Finance and Financial Management Services
                  </Title>
                  <Paragraph className={styles.educationSchool}>
                    Armenian State University of Economics
                  </Paragraph>
                </article>
                <article className={styles.educationCard}>
                  <Title level={5} className={styles.educationTitle}>
                    Certificate · PPM
                  </Title>
                  <Paragraph className={styles.educationSchool}>ACA</Paragraph>
                </article>
                <article className={styles.educationCard}>
                  <Title level={5} className={styles.educationTitle}>
                    Certificate · AI in Frontend
                  </Title>
                  <Paragraph className={styles.educationSchool}>AGBU</Paragraph>
                </article>
              </div>
            </section>
          </main>
        </div>
      </Content>

      <SiteFooter />
    </>
  )
}
