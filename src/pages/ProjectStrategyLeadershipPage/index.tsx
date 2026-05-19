import { useEffect } from 'react'
import { Card, Col, Layout, Row, Tag, Typography } from 'antd'
import { type LucideIcon, Award, Layers, RefreshCw, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import certificateSrc from '../../assets/Certificate.png'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import tmStyles from '../TechnicalMasteryPage/styles.module.css'
import styles from './styles.module.css'

const { Content } = Layout
const { Title, Paragraph } = Typography

type StandardPillar = {
  key: string
  variant: 'standard'
  title: string
  description: string
  Icon: LucideIcon
  badgeClass: string
  tags: [string, string, string?]
}

type CertPillar = {
  key: string
  variant: 'certificate'
  title: string
  description: string
  Icon: LucideIcon
  badgeClass: string
  tags: [string, string]
}

type Pillar = StandardPillar | CertPillar

const pillars: Pillar[] = [
  {
    key: 'delivery',
    variant: 'standard',
    title: 'Delivery Architecture',
    description:
      'Translating complex visions into scalable technical roadmaps and managing full-cycle SDLC.',
    Icon: Layers,
    badgeClass: styles.pillarBadgeDelivery,
    tags: ['SDLC', 'STRATEGY'],
  },
  {
    key: 'agile',
    variant: 'standard',
    title: 'Agile Frameworks',
    description: 'Orchestrating delivery cycles using the right mix of Scrum, Kanban, and Lean principles. I focus on optimizing workflow efficiency, eliminating waste, and maintaining a high-velocity output through continuous improvement.',
    Icon: RefreshCw,
    badgeClass: styles.pillarBadgeAgile,
    tags: ['SCRUM', 'KANBAN']
  },
  {
    key: 'vision',
    variant: 'standard',
    title: 'Product Vision & Social Impact',
    description:
      'Leading techahartak.com with a focus on human-centric design, accessibility, and high-impact feature prioritization.',
    Icon: Sparkles,
    badgeClass: styles.pillarBadgeVision,
    tags: ['IMPACT', 'VISION'],
  },
  {
    key: 'risk',
    variant: 'standard',
    title: 'Risk & Quality Management',
    description:
      'Proactive risk mitigation and balancing rapid deployment with enterprise-grade stability.',
    Icon: ShieldCheck,
    badgeClass: styles.pillarBadgeRisk,
    tags: ['QA', 'RISK'],
  },
  {
    key: 'stakeholder',
    variant: 'standard',
    title: 'Stakeholder Orchestration',
    description:
      'Bridging the gap between executive business goals and high-level engineering execution.',
    Icon: UsersRound,
    badgeClass: styles.pillarBadgeStakeholder,
    tags: ['LEADERSHIP', 'STAKEHOLDER'],
  },
  {
    key: 'certification',
    variant: 'certificate',
    title: 'Professional PM Certification',
    description:
      'Professional PM Certification: Click to view the official certification in Project Management and Strategic Delivery.',
    Icon: Award,
    badgeClass: styles.pillarBadgeCert,
    tags: ['CREDENTIAL', 'PM'],
  },
]

function PillarBadge({
  Icon,
  className,
  label,
}: {
  Icon: LucideIcon
  className: string
  /** Visually hidden label for icon-only badges */
  label: string
}) {
  return (
    <span className={`${styles.pillarBadge} ${className}`}>
      <Icon size={14} strokeWidth={2} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default function ProjectStrategyLeadershipPage() {
  useEffect(() => {
    document.title = 'Project Strategy & Leadership — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  return (
    <>
      <Content className={homeStyles.main}>
        <div className={`${homeStyles.contentInner} ${tmStyles.pageInner}`}>
          <header className={tmStyles.masthead}>
            <Title level={1} className={tmStyles.pageTitle}>
              Project Strategy & Leadership
            </Title>
            <Paragraph className={tmStyles.pageLead}>
              Architecting delivery through certified Agile methodologies, strategic risk mitigation,
              and human-centric product vision.
            </Paragraph>
            <Link to="/" className={tmStyles.backLink}>
              ← Back to Home
            </Link>
          </header>

          <section className={homeStyles.section} aria-labelledby="pillars-heading">
            <div className={homeStyles.sectionHeadingRow}>
              <Title level={2} className={homeStyles.sectionTitle} id="pillars-heading">
                Strategic Pillars
              </Title>
              <Tag color="default" className={homeStyles.metaTag}>
                LAST UPDATED: 05 2026
              </Tag>
            </div>
            <Row gutter={[24, 24]}>
              {pillars.map((pillar) => {
                if (pillar.variant === 'certificate') {
                  return (
                    <Col xs={24} sm={12} lg={8} key={pillar.key}>
                      <a
                        href={certificateSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.certCardAnchor}
                        aria-label="Open Professional PM certification image in a new tab"
                      >
                        <Card className={`${homeStyles.techCard} ${styles.certCard}`}>
                          <PillarBadge
                            Icon={pillar.Icon}
                            className={pillar.badgeClass}
                            label={pillar.title}
                          />
                          <Title level={4} className={homeStyles.sectionTitle}>
                            {pillar.title}
                          </Title>
                          <Paragraph className={homeStyles.techDesc}>{pillar.description}</Paragraph>
                          <div className={homeStyles.tagRow}>
                            <Tag>{pillar.tags[0]}</Tag>
                            <Tag>{pillar.tags[1]}</Tag>
                          </div>
                        </Card>
                      </a>
                    </Col>
                  )
                }

                return (
                  <Col xs={24} sm={12} lg={8} key={pillar.key}>
                    <Card className={homeStyles.techCard}>
                      <PillarBadge
                        Icon={pillar.Icon}
                        className={pillar.badgeClass}
                        label={pillar.title}
                      />
                      <Title level={4} className={homeStyles.sectionTitle}>
                        {pillar.title}
                      </Title>
                      <Paragraph className={homeStyles.techDesc}>{pillar.description}</Paragraph>
                      <div className={homeStyles.tagRow}>
                        <Tag>{pillar.tags[0]}</Tag>
                        <Tag>{pillar.tags[1]}</Tag>
                      </div>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </section>
        </div>
      </Content>

      <SiteFooter />
    </>
  )
}
