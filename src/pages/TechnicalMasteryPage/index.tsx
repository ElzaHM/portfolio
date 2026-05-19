import { useEffect } from 'react'
import {
  Avatar,
  Card,
  Col,
  Layout,
  Row,
  Tag,
  Typography,
} from 'antd'
import { ThunderboltOutlined } from '@ant-design/icons'
import { type LucideIcon, Award, Layers, RefreshCw, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import certificateSrc from '../../assets/Certificate.png'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import styles from './styles.module.css'

const { Content } = Layout
const { Title, Paragraph } = Typography

function LastUpdatedBadge() {
  return (
    <Tag color="default" className={styles.metaTag}>
      LAST UPDATED: 05 2026
    </Tag>
  )
}

type TechAvatarCard = {
  key: string
  variant: 'avatar'
  title: string
  description: string
  avatar: string
  avatarClass: string
  tags: string[]
}

type TechPerfCard = {
  key: string
  variant: 'performance'
  title: string
  description: string
  tags: string[]
}

type TechCardConfig = TechAvatarCard | TechPerfCard

const techArsenal: TechCardConfig[] = [
  {
    key: 'angular',
    variant: 'avatar',
    title: 'Angular',
    description:
      'Enterprise modules, RxJS flows, and a11y-minded templates.',
    avatar: 'NG',
    avatarClass: styles.techBadgeNg,
    tags: ['NX', 'RXJS', 'A11Y'],
  },
  {
    key: 'webflow',
    variant: 'avatar',
    title: 'Webflow Decoding',
    description:
      'Merging low-code speed with custom code logic and high-end accessibility.',
    avatar: 'WF',
    avatarClass: styles.techBadgeWebflow,
    tags: ['CMS', 'CUSTOM', 'A11Y'],
  },
  {
    key: 'typescript',
    variant: 'avatar',
    title: 'TypeScript',
    description: 'Strict typing and shared contracts.',
    avatar: 'TS',
    avatarClass: styles.techBadgeTs,
    tags: ['ESLINT', 'CONTRACTS'],
  },
  {
    key: 'model-apis',
    variant: 'avatar',
    title: 'Model APIs',
    description: 'LLM features, structured outputs.',
    avatar: 'LLM',
    avatarClass: styles.techBadgeAi,
    tags: ['TOOLS', 'STREAMING'],
  },
  {
    key: 'performance',
    variant: 'performance',
    title: 'Performance',
    description: 'Budgets, profiling, and resilient loading.',
    tags: ['RUM', 'CWV'],
  },
  {
    key: 'vite',
    variant: 'avatar',
    title: 'Vite & Tooling',
    description: 'Fast dev loops and CI-friendly pipelines.',
    avatar: 'VT',
    avatarClass: styles.techBadgeVite,
    tags: ['VITE', 'CI', 'ESBUILD'],
  },
]

type StandardStrategic = {
  key: string
  variant: 'standard'
  title: string
  description: string
  Icon: LucideIcon
  badgeClass: string
  tags: [string, string]
}

type CertStrategic = {
  key: string
  variant: 'certificate'
  title: string
  description: string
  Icon: LucideIcon
  badgeClass: string
  tags: [string, string]
}

type StrategicCard = StandardStrategic | CertStrategic

const strategicLeadershipStack: StrategicCard[] = [
  {
    key: 'delivery',
    variant: 'standard',
    title: 'Delivery Architecture',
    description: 'Translating complex visions into scalable roadmaps.',
    Icon: Layers,
    badgeClass: styles.strategicBadgeDelivery,
    tags: ['SDLC', 'STRATEGY'],
  },
  {
    key: 'agile',
    variant: 'standard',
    title: 'Agile Frameworks',
    description:
      'Orchestrating cycles using Scrum, Kanban, and Lean principles.',
    Icon: RefreshCw,
    badgeClass: styles.strategicBadgeAgile,
    tags: ['SCRUM', 'KANBAN'],
  },
  {
    key: 'vision',
    variant: 'standard',
    title: 'Product Vision & Social Impact',
    description:
      'Human-centric design and accessibility focus (techahartak.com).',
    Icon: Sparkles,
    badgeClass: styles.strategicBadgeVision,
    tags: ['IMPACT', 'VISION'],
  },
  {
    key: 'risk',
    variant: 'standard',
    title: 'Risk & Quality Management',
    description:
      'Proactive mitigation and enterprise stability.',
    Icon: ShieldCheck,
    badgeClass: styles.strategicBadgeRisk,
    tags: ['QA', 'RISK'],
  },
  {
    key: 'stakeholder',
    variant: 'standard',
    title: 'Stakeholder Orchestration',
    description:
      'Bridging business goals and engineering execution.',
    Icon: UsersRound,
    badgeClass: styles.strategicBadgeStakeholder,
    tags: ['LEADERSHIP', 'STAKEHOLDER'],
  },
  {
    key: 'certification',
    variant: 'certificate',
    title: 'Professional PM Certification',
    description:
      'Professional PM Certification: Click to view the official certification in Project Management and Strategic Delivery.',
    Icon: Award,
    badgeClass: styles.strategicBadgeCert,
    tags: ['CREDENTIAL', 'PM'],
  },
]

function StrategicPillarBadge({
  Icon,
  className,
  label,
}: {
  Icon: LucideIcon
  className: string
  label: string
}) {
  return (
    <span className={`${styles.strategicBadge} ${className}`}>
      <Icon size={14} strokeWidth={2} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  )
}

export default function TechnicalMasteryPage() {
  useEffect(() => {
    document.title = 'Full Spectrum Mastery — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  return (
    <>
      <Content className={homeStyles.main}>
        <div className={`${homeStyles.contentInner} ${styles.pageInner}`}>
          <header className={styles.masthead}>
            <Title level={1} className={styles.pageTitle}>
              Full Spectrum Mastery
            </Title>
            <Paragraph className={styles.pageLead}>
              Engineering depth and delivery leadership—stack fluency paired with Agile execution,
              risk-aware quality, stakeholder alignment, and certified project strategy.
            </Paragraph>
            <Link to="/" className={styles.backLink}>
              {/* ← Back to Home */}
            </Link>
          </header>

          <section className={homeStyles.section} aria-labelledby="engineering-arsenal-title">
            <div className={`${homeStyles.sectionHeadingRow} ${styles.strategicPrimaryHeadRow}`}>
              <Title level={2} className={styles.sectionHeading} id="engineering-arsenal-title">
                Engineering Arsenal
              </Title>
              <LastUpdatedBadge />
            </div>
            <Row gutter={[24, 24]}>
              {techArsenal.map((item) => (
                <Col xs={24} sm={12} lg={8} key={item.key}>
                  <Card className={styles.categoryCard}>
                    {item.variant === 'performance' ? (
                      <span className={styles.perfBadge}>
                        <ThunderboltOutlined />
                      </span>
                    ) : (
                      <Avatar
                        size={40}
                        className={`${styles.techBadge} ${item.avatarClass}`}
                      >
                        {item.avatar}
                      </Avatar>
                    )}
                    <Title level={4} className={styles.cardHeading}>
                      {item.title}
                    </Title>
                    <Paragraph className={styles.cardDesc}>{item.description}</Paragraph>
                    <div className={styles.tagRow}>
                      {item.tags.map((tag) => (
                        <Tag key={tag} className={styles.skillTag}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section
            className={`${homeStyles.section} ${styles.leadershipSection}`}
            aria-labelledby="strategic-leadership-stack-heading"
          >
            <div
              className={`${homeStyles.sectionHeadingRow} ${styles.managementPillarRow}`}
            >
              <Title level={3} className={styles.managementPillarTitle} id="management-pillars-title">
                Management Pillars
              </Title>
              <LastUpdatedBadge />
            </div>
            <Row gutter={[24, 24]}>
              {strategicLeadershipStack.map((pillar) => {
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
                        <Card className={`${styles.categoryCard} ${styles.certCard}`}>
                          <StrategicPillarBadge
                            Icon={pillar.Icon}
                            className={pillar.badgeClass}
                            label={pillar.title}
                          />
                          <Title level={4} className={styles.cardHeading}>
                            {pillar.title}
                          </Title>
                          <Paragraph className={styles.cardDesc}>{pillar.description}</Paragraph>
                          <div className={styles.tagRow}>
                            <Tag className={styles.skillTag}>{pillar.tags[0]}</Tag>
                            <Tag className={styles.skillTag}>{pillar.tags[1]}</Tag>
                          </div>
                        </Card>
                      </a>
                    </Col>
                  )
                }

                return (
                  <Col xs={24} sm={12} lg={8} key={pillar.key}>
                    <Card className={styles.categoryCard}>
                      <StrategicPillarBadge
                        Icon={pillar.Icon}
                        className={pillar.badgeClass}
                        label={pillar.title}
                      />
                      <Title level={4} className={styles.cardHeading}>
                        {pillar.title}
                      </Title>
                      <Paragraph className={styles.cardDesc}>{pillar.description}</Paragraph>
                      <div className={styles.tagRow}>
                        <Tag className={styles.skillTag}>{pillar.tags[0]}</Tag>
                        <Tag className={styles.skillTag}>{pillar.tags[1]}</Tag>
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
