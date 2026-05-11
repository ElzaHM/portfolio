import { useEffect } from 'react'
import {
  Avatar,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd'
import { ThunderboltOutlined } from '@ant-design/icons'
import { type LucideIcon, Award, Layers, RefreshCw, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import certificateSrc from '../../assets/Certificate.png'
import homeStyles from '../HomePage/styles.module.css'
import pillarStyles from '../ProjectStrategyLeadershipPage/styles.module.css'
import styles from './styles.module.css'

const { Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

const GITHUB_PORTFOLIO = 'https://github.com/ElzaHM/portfolio'

function LastUpdatedBadge() {
  return (
    <Tag color="default" className={homeStyles.metaTag}>
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
    avatarClass: homeStyles.techAvatarNg,
    tags: ['NX', 'RXJS', 'A11Y'],
  },
  {
    key: 'webflow',
    variant: 'avatar',
    title: 'Webflow Decoding',
    description:
      'Merging low-code speed with custom code logic and high-end accessibility.',
    avatar: 'WF',
    avatarClass: homeStyles.techAvatarWebflow,
    tags: ['CMS', 'CUSTOM', 'A11Y'],
  },
  {
    key: 'typescript',
    variant: 'avatar',
    title: 'TypeScript',
    description: 'Strict typing and shared contracts.',
    avatar: 'TS',
    avatarClass: homeStyles.techAvatarTs,
    tags: ['ESLINT', 'CONTRACTS'],
  },
  {
    key: 'model-apis',
    variant: 'avatar',
    title: 'Model APIs',
    description: 'LLM features, structured outputs.',
    avatar: 'LLM',
    avatarClass: homeStyles.techAvatarAi,
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
    avatarClass: homeStyles.techAvatarVite,
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
    badgeClass: pillarStyles.pillarBadgeDelivery,
    tags: ['SDLC', 'STRATEGY'],
  },
  {
    key: 'agile',
    variant: 'standard',
    title: 'Agile Frameworks',
    description:
      'Orchestrating cycles using Scrum, Kanban, and Lean principles.',
    Icon: RefreshCw,
    badgeClass: pillarStyles.pillarBadgeAgile,
    tags: ['SCRUM', 'KANBAN'],
  },
  {
    key: 'vision',
    variant: 'standard',
    title: 'Product Vision & Social Impact',
    description:
      'Human-centric design and accessibility focus (techahartak.com).',
    Icon: Sparkles,
    badgeClass: pillarStyles.pillarBadgeVision,
    tags: ['IMPACT', 'VISION'],
  },
  {
    key: 'risk',
    variant: 'standard',
    title: 'Risk & Quality Management',
    description:
      'Proactive mitigation and enterprise stability.',
    Icon: ShieldCheck,
    badgeClass: pillarStyles.pillarBadgeRisk,
    tags: ['QA', 'RISK'],
  },
  {
    key: 'stakeholder',
    variant: 'standard',
    title: 'Stakeholder Orchestration',
    description:
      'Bridging business goals and engineering execution.',
    Icon: UsersRound,
    badgeClass: pillarStyles.pillarBadgeStakeholder,
    tags: ['LEADERSHIP', 'STAKEHOLDER'],
  },
  {
    key: 'certification',
    variant: 'certificate',
    title: 'Professional PM Certification',
    description:
      'Professional PM Certification: Click to view the official certification in Project Management and Strategic Delivery.',
    Icon: Award,
    badgeClass: pillarStyles.pillarBadgeCert,
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
    <span className={`${pillarStyles.pillarBadge} ${className}`}>
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
              <Title level={2} className={homeStyles.sectionTitle} id="engineering-arsenal-title">
                Engineering Arsenal
              </Title>
              <LastUpdatedBadge />
            </div>
            <Row gutter={[24, 24]}>
              {techArsenal.map((item) => (
                <Col xs={24} sm={12} lg={8} key={item.key}>
                  <Card className={homeStyles.techCard}>
                    {item.variant === 'performance' ? (
                      <span className={homeStyles.perfIconWrap}>
                        <ThunderboltOutlined />
                      </span>
                    ) : (
                      <Avatar
                        size={40}
                        className={`${homeStyles.techAvatar} ${item.avatarClass}`}
                      >
                        {item.avatar}
                      </Avatar>
                    )}
                    <Title level={4} className={homeStyles.sectionTitle}>
                      {item.title}
                    </Title>
                    <Paragraph className={homeStyles.techDesc}>{item.description}</Paragraph>
                    <div className={homeStyles.tagRow}>
                      {item.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section
            className={homeStyles.section}
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
                        className={pillarStyles.certCardAnchor}
                        aria-label="Open Professional PM certification image in a new tab"
                      >
                        <Card className={`${homeStyles.techCard} ${pillarStyles.certCard}`}>
                          <StrategicPillarBadge
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
                      <StrategicPillarBadge
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

      <Footer className={homeStyles.footer} id="contact">
        <div className={homeStyles.footerInner}>
          <Row gutter={[16, 16]} className={homeStyles.footerRow}>
            <Col xs={24} md={8}>
              <Text className={homeStyles.footerCopy}>
                © {new Date().getFullYear()} EH. All rights reserved.
              </Text>
            </Col>
            <Col xs={24} md={8} className={homeStyles.footerLinks}>
              <Space size="large" wrap>
                <Typography.Link
                  href={GITHUB_PORTFOLIO}
                  target="_blank"
                  rel="noreferrer"
                  className={homeStyles.footerLink}
                >
                  GITHUB
                </Typography.Link>
                <Typography.Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className={homeStyles.footerLink}
                >
                  LINKEDIN
                </Typography.Link>
                <Typography.Link
                  href="https://techahartak.com"
                  target="_blank"
                  rel="noreferrer"
                  className={homeStyles.footerLink}
                >
                  TECHAHARTAK
                </Typography.Link>
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>
    </>
  )
}
