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
  '5+ years in **frontend engineering** underpin how I operate today as a **Technical Project Manager**—owning timelines, clarity, and delivery without drifting from reality on the roadmap. I lead cross-functional execution across the **SDLC**, align executives and builders, and weave in **AI-driven** practices where they improve rigor—not replace judgment. As **Founder & Lead Developer** of **Techahartak.com**, I built an accessibility-minded platform for disability inclusion (**social impact**), scaling product, multilingual content, and community reach from zero to traction.'

const workRoles = [
  {
    key: 'founder',
    title: 'Founder & Delivery Lead',
    meta: 'Techahartak.com · Social impact · Remote',
    bullets: [
      'Owned **strategy → SDLC → launch** for an inclusion-focused platform (**10K+ MAU** at peak).',
      'Full‑stack accountability: Next.js/React, backend integrations, multilingual UX (**ARM**, **EN**, **RU**).',
      'Bridged NGOs, advisors, and users—prioritizing **accessibility**, trust, and sustainable delivery.',
      'Ran lean budgeting, tooling, and growth without losing engineering quality.',
    ],
  },
  {
    key: 'fe',
    title: 'Frontend Engineer',
    meta: 'Enterprise SaaS — engineering foundation',
    bullets: [
      'Shipped high‑traffic SaaS features in **Angular** / **Next.js** / **TypeScript**—**WCAG‑minded**, measurable UX lift (**~15%** engagement uplift on key journeys).',
      'Collaborated tightly with PM, design, backend—requirements, slicing, demos, retros.',
      'Performance work—lazy loading & split bundles cut critical path latency (**~200ms** on representative routes).',
      'Mentored peers; raised review bar and reusable UI patterns (**~20%** efficiency gain cited on team tooling).',
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
                Technical Project Manager &amp; Delivery Architect with a Frontend Engineering Soul.
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
