import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Col, Layout, Row, Tag, Typography } from 'antd'
import {
  ArrowRightOutlined,
  BookOutlined,
  CheckOutlined,
  CodeOutlined,
  DatabaseOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { type LucideIcon, Award, Layers, RefreshCw, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import certificateSrc from '../../assets/Certificate.png'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import styles from './styles.module.css'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography

function LastUpdatedBadge({ className }: { className?: string }) {
  return (
    <Tag color="default" className={`${styles.metaTag} ${className ?? ''}`.trim()}>
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
    description: 'Enterprise modules, RxJS flows, and a11y-minded templates.',
    avatar: 'NG',
    avatarClass: styles.techBadgeNg,
    tags: ['NX', 'RXJS', 'A11Y'],
  },
  {
    key: 'webflow',
    variant: 'avatar',
    title: 'Webflow Decoding',
    description: 'Merging low-code speed with custom code logic and high-end accessibility.',
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
    description: 'Orchestrating cycles using Scrum, Kanban, and Lean principles.',
    Icon: RefreshCw,
    badgeClass: styles.strategicBadgeAgile,
    tags: ['SCRUM', 'KANBAN'],
  },
  {
    key: 'vision',
    variant: 'standard',
    title: 'Product Vision & Social Impact',
    description: 'Human-centric design and accessibility focus (techahartak.com).',
    Icon: Sparkles,
    badgeClass: styles.strategicBadgeVision,
    tags: ['IMPACT', 'VISION'],
  },
  {
    key: 'risk',
    variant: 'standard',
    title: 'Risk & Quality Management',
    description: 'Proactive mitigation and enterprise stability.',
    Icon: ShieldCheck,
    badgeClass: styles.strategicBadgeRisk,
    tags: ['QA', 'RISK'],
  },
  {
    key: 'stakeholder',
    variant: 'standard',
    title: 'Stakeholder Orchestration',
    description: 'Bridging business goals and engineering execution.',
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

const frontendEngineeringItems = techArsenal.filter((item) => item.key !== 'model-apis')

const engineeringShowcaseCards = [
  {
    key: 'frontend-engineering',
    variant: 'frontend' as const,
    title: 'Frontend Engineering',
    description:
      'Modern, responsive and accessible interfaces with clean architecture and great UX.',
    skills: [
      'Component Architecture',
      'State Management',
      'Responsive Design',
      'Performance Optimization',
    ],
    tags: ['React', 'Angular', 'TypeScript', 'RxJS'],
    icon: <span className={styles.codeIconGlyph} aria-hidden>{'</>'}</span>,
  },
  {
    key: 'backend-data',
    variant: 'backend' as const,
    title: 'Backend & Data',
    description:
      'Robust APIs, secure integrations and data modeling for reliable digital products.',
    skills: [
      'API Design & Integration',
      'Database Modeling',
      'Authentication & Security',
      'Supabase & Edge Functions',
    ],
    tags: ['Supabase', 'PostgreSQL', 'REST', 'JWT'],
    icon: <DatabaseOutlined aria-hidden />,
  },
]

const projectManagementItems = strategicLeadershipStack.filter((item) =>
  ['delivery', 'agile', 'risk'].includes(item.key),
)
const teamLeadershipItems = strategicLeadershipStack.filter((item) =>
  ['vision', 'stakeholder'].includes(item.key),
)

const certificationCard = strategicLeadershipStack.find(
  (item): item is CertStrategic => item.key === 'certification',
)

const agileCard = strategicLeadershipStack.find((item) => item.key === 'agile')

type Accent = 'engineering' | 'management' | 'certification'

type MasteryCardProps = {
  accent: Accent
  icon: ReactNode
  iconClassName?: string
  title: string
  bullets: { title: string; description: string }[]
  tags: string[]
}

function collectTags(items: Array<TechCardConfig | StrategicCard>): string[] {
  const tags = items.flatMap((item) => item.tags)
  return [...new Set(tags)]
}

function MasteryGlassCard({ accent, icon, iconClassName, title, bullets, tags }: MasteryCardProps) {
  const accentClass =
    accent === 'engineering'
      ? styles.cardAccentEngineering
      : accent === 'management'
        ? styles.cardAccentManagement
        : styles.cardAccentCertification

  return (
    <article className={`${styles.glassCard} ${accentClass}`}>
      <span className={styles.cardCornerAction} aria-hidden>
        <ArrowRightOutlined />
      </span>
      <span className={`${styles.cardIconWrap} ${iconClassName ?? ''}`.trim()}>{icon}</span>
      <Title level={3} className={styles.cardTitle}>
        {title}
      </Title>
      <ul className={styles.skillList}>
        {bullets.map((bullet) => (
          <li key={bullet.title} className={styles.skillListItem}>
            <CheckOutlined className={styles.skillCheck} aria-hidden />
            <span>
              <Text className={styles.skillItemTitle}>{bullet.title}</Text>
              <Text className={styles.skillItemDesc}>{bullet.description}</Text>
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.tagRow}>
        {tags.map((tag) => (
          <Tag key={tag} className={styles.skillTag}>
            {tag}
          </Tag>
        ))}
      </div>
    </article>
  )
}

type EngineeringShowcaseCardProps = {
  variant: 'frontend' | 'backend'
  title: string
  description: string
  skills: string[]
  tags: string[]
  icon: ReactNode
}

function EngineeringShowcaseCard({
  variant,
  title,
  description,
  skills,
  tags,
  icon,
}: EngineeringShowcaseCardProps) {
  const variantClass =
    variant === 'frontend' ? styles.engineeringCardFrontend : styles.engineeringCardBackend

  return (
    <div className={styles.engineeringCardWrap}>
      <span
        className={`${styles.engineeringCardGlow} ${
          variant === 'frontend'
            ? styles.engineeringCardGlowFrontend
            : styles.engineeringCardGlowBackend
        }`}
        aria-hidden
      />
      <article className={`${styles.glassCard} ${styles.engineeringCard} ${variantClass}`}>
        <div className={styles.engineeringCardTop}>
          <span className={styles.engineeringCardIcon}>{icon}</span>
          <span className={styles.engineeringCardAction} aria-hidden>
            <ArrowRightOutlined />
          </span>
        </div>
        <Title level={3} className={styles.engineeringCardTitle}>
          {title}
        </Title>
        <Paragraph className={styles.engineeringCardDesc}>{description}</Paragraph>
        <span className={styles.engineeringCardDivider} aria-hidden />
        <ul className={styles.engineeringSkillList}>
          {skills.map((skill) => (
            <li key={skill} className={styles.engineeringSkillItem}>
              <span className={styles.engineeringSkillCheck} aria-hidden>
                <CheckOutlined />
              </span>
              <Text className={styles.engineeringSkillText}>{skill}</Text>
            </li>
          ))}
        </ul>
        <div className={styles.engineeringTagRow}>
          {tags.map((tag) => (
            <Tag key={tag} className={styles.engineeringTag}>
              {tag}
            </Tag>
          ))}
        </div>
      </article>
    </div>
  )
}

type CertificationTile = {
  key: string
  title: string
  description: string
  icon: ReactNode
  href?: string
  ariaLabel?: string
}

const viteItem = techArsenal.find((item) => item.key === 'vite')

function CertificationsFeaturedCard() {
  const certTiles: CertificationTile[] = [
    {
      key: 'pm-cert',
      title: 'Certified Project Manager',
      description: certificationCard?.description ?? '',
      icon: <ShieldCheck size={18} strokeWidth={2} aria-hidden />,
      href: certificateSrc,
      ariaLabel: 'Open Professional PM certification image in a new tab',
    },
    {
      key: 'agile-scrum',
      title: 'Agile / Scrum',
      description: agileCard?.description ?? '',
      icon: <RefreshCw size={18} strokeWidth={2} aria-hidden />,
    },
    {
      key: 'frontend-engineering',
      title: 'Frontend Engineering',
      description: frontendEngineeringItems
        .map((item) => `${item.title}: ${item.description}`)
        .join(' '),
      icon: <CodeOutlined aria-hidden />,
    },
    {
      key: 'continuous-learning',
      title: 'Continuous Learning',
      description: viteItem?.description ?? '',
      icon: <BookOutlined aria-hidden />,
    },
  ]

  const certTags = collectTags([
    ...(certificationCard ? [certificationCard] : []),
    ...(agileCard ? [agileCard] : []),
    ...frontendEngineeringItems,
  ])

  return (
    <article className={`${styles.glassCard} ${styles.glassCardWide} ${styles.cardAccentCertification}`}>
      <div className={styles.certFeaturedLayout}>
        <div className={styles.certFeaturedVisual} aria-hidden>
          <span className={styles.certFeaturedOrb}>
            <SafetyCertificateOutlined className={styles.certFeaturedOrbIcon} />
          </span>
        </div>
        <div className={styles.certFeaturedContent}>
          <Title level={3} className={styles.cardTitle}>
            Certifications
          </Title>
          <Paragraph className={styles.cardSummary}>
            {certificationCard?.description}
          </Paragraph>
          <div className={styles.certGrid}>
            {certTiles.map((tile) => {
              const tileBody = (
                <>
                  <span className={styles.certTileIcon}>{tile.icon}</span>
                  <Text className={styles.certTileTitle}>{tile.title}</Text>
                  <Text className={styles.certTileDesc}>{tile.description}</Text>
                </>
              )

              if (tile.href) {
                return (
                  <a
                    key={tile.key}
                    href={tile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certTileLink}
                    aria-label={tile.ariaLabel}
                  >
                    {tileBody}
                  </a>
                )
              }

              return (
                <div key={tile.key} className={styles.certTile}>
                  {tileBody}
                </div>
              )
            })}
          </div>
          <div className={styles.tagRow}>
            {certTags.slice(0, 8).map((tag) => (
              <Tag key={tag} className={styles.skillTag}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function SectionHeader({
  id,
  title,
  icon,
  accent,
  showUpdated,
}: {
  id: string
  title: string
  icon: ReactNode
  accent: Accent
  showUpdated?: boolean
}) {
  const accentClass =
    accent === 'engineering'
      ? styles.sectionHeaderEngineering
      : accent === 'management'
        ? styles.sectionHeaderManagement
        : styles.sectionHeaderCertification

  return (
    <div className={`${styles.sectionHeader} ${accentClass}`}>
      <div className={styles.sectionHeaderMain}>
        <span className={styles.sectionHeaderIcon}>{icon}</span>
        <Title level={2} className={styles.sectionHeading} id={id}>
          {title}
        </Title>
        <span className={styles.sectionHeaderLine} aria-hidden />
      </div>
      {showUpdated ? <LastUpdatedBadge className={styles.sectionUpdatedTag} /> : null}
    </div>
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
      <Content className={`${homeStyles.main} ${styles.page}`}>
        <div className={styles.pageGlow} aria-hidden />
        <div className={`${homeStyles.contentInner} ${styles.pageInner} ${styles.stackPageInner}`}>
          <header className={styles.hero}>
            <div className={styles.heroCopy}>
              <Text className={styles.heroEyebrow}>Expertise Overview</Text>
              <Title level={1} className={styles.heroTitle}>
                <span className={styles.heroTitlePrimary}>Full Spectrum </span>
                <span className={styles.heroTitleAccent}>Mastery</span>
              </Title>
              <Paragraph className={styles.heroLead}>
                Engineering depth and delivery leadership—stack fluency paired with Agile execution,
                risk-aware quality, stakeholder alignment, and certified project strategy.
              </Paragraph>
            </div>
            <div className={styles.heroOrbital} aria-hidden>
              <span className={styles.orbitalRing} />
              <span className={`${styles.orbitalRing} ${styles.orbitalRingMid}`} />
              <span className={`${styles.orbitalRing} ${styles.orbitalRingInner}`} />
              <span className={`${styles.orbitalStar} ${styles.orbitalStarOne}`} />
              <span className={`${styles.orbitalStar} ${styles.orbitalStarTwo}`} />
              <span className={`${styles.orbitalStar} ${styles.orbitalStarThree}`} />
            </div>
          </header>

          <section className={styles.section} aria-labelledby="engineering-title">
            <SectionHeader
              id="engineering-title"
              title="Engineering"
              icon={<ThunderboltOutlined aria-hidden />}
              accent="engineering"
              showUpdated
            />
            <Row gutter={[24, 24]} align="stretch">
              {engineeringShowcaseCards.map((card) => (
                <Col xs={24} lg={12} key={card.key}>
                  <EngineeringShowcaseCard
                    variant={card.variant}
                    title={card.title}
                    description={card.description}
                    skills={card.skills}
                    tags={card.tags}
                    icon={card.icon}
                  />
                </Col>
              ))}
            </Row>
          </section>

          <section className={styles.section} aria-labelledby="management-title">
            <SectionHeader
              id="management-title"
              title="Management"
              icon={<TeamOutlined aria-hidden />}
              accent="management"
            />
            <Row gutter={[24, 24]} align="stretch">
              <Col xs={24} lg={12}>
                <MasteryGlassCard
                  accent="management"
                  icon={<ProjectOutlined aria-hidden />}
                  title="Project Management"
                  bullets={projectManagementItems.map((item) => ({
                    title: item.title,
                    description: item.description,
                  }))}
                  tags={collectTags(projectManagementItems)}
                />
              </Col>
              <Col xs={24} lg={12}>
                <MasteryGlassCard
                  accent="management"
                  icon={<UsergroupAddOutlined aria-hidden />}
                  title="Team Leadership"
                  bullets={teamLeadershipItems.map((item) => ({
                    title: item.title,
                    description: item.description,
                  }))}
                  tags={collectTags(teamLeadershipItems)}
                />
              </Col>
            </Row>
          </section>

          <section className={styles.section} aria-labelledby="certifications-title">
            <SectionHeader
              id="certifications-title"
              title="Certifications"
              icon={<SafetyCertificateOutlined aria-hidden />}
              accent="certification"
            />
            <CertificationsFeaturedCard />
          </section>
        </div>
      </Content>

      <SiteFooter />
    </>
  )
}
