import type { ReactNode } from 'react'
import { Col, Row, Typography } from 'antd'
import { CheckCircleOutlined, ExportOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import avatarSrc from '../../assets/avatar.jpg'
import techahartakFaviconSrc from '../../assets/favicon-16x16.png'
import styles from './styles.module.css'

const { Title, Paragraph, Text } = Typography

type GlassCardNavigation =
  | { kind: 'internal'; to: string; ariaLabel: string }
  | { kind: 'external'; href: string; ariaLabel: string }

type GlassCardConfig = {
  key: string
  title: string
  description: string
  badge?: string
  icon: ReactNode
  iconClass: string
  nav: GlassCardNavigation
  cta: {
    label: string
    linkClass: string
    /** Shown beside label when navigating away from origin (SPA or new tab asset) */
    showOutboundGlyph?: boolean
  }
}

const glassCards: GlassCardConfig[] = [
  {
    key: 'engineering',
    title: 'Frontend Engineering',
    description:
      'Harnessing 5+ years of elite frontend mastery in Angular & React, integrated with next-gen Cursor AI workflows for accelerated, high-fidelity delivery.',
    icon: <span className={styles.codeIconGlyph}>{'</>'}</span>,
    iconClass: styles.cardIconEngineering,
    nav: {
      kind: 'internal',
      to: '/tech-mastery',
      ariaLabel: 'Explore Technical Mastery — engineering depth and stack',
    },
    cta: {
      label: 'EXPLORE TECHNICAL MASTERY →',
      linkClass: styles.cardLinkEngineering,
    },
  },
  {
    key: 'venture',
    badge: 'FOUNDING VENTURE',
    title: 'Founder of Techahartak',
    description:
      'Visionary behind Techahartak.com—a social impact engine dedicated to empowering people with disabilities through accessible tech solutions.',
    icon: (
      <img
        src={techahartakFaviconSrc}
        alt=""
        className={styles.cardIconImg}
        width={24}
        height={24}
        decoding="async"
      />
    ),
    iconClass: styles.cardIconVenture,
    nav: {
      kind: 'external',
      href: 'https://techahartak.com',
      ariaLabel: 'Techahartak — mission and impact (opens in new tab)',
    },
    cta: {
      label: 'MISSION & IMPACT',
      linkClass: styles.cardLinkVenture,
      showOutboundGlyph: true,
    },
  },
  {
    key: 'management',
    title: 'Certified Project Manager',
    description:
      'Merging enterprise PM certifications with deep Agile/Scrum expertise to drive complex digital transformations with absolute accountability.',
    icon: <CheckCircleOutlined aria-hidden />,
    iconClass: styles.cardIconLead,
    nav: {
      kind: 'internal',
      to: '/pm-strategy',
      ariaLabel: 'Project Strategy and Leadership',
    },
    cta: {
      label: 'STRATEGY & PM →',
      linkClass: styles.cardLinkLead,
    },
  },
]

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.heroGlow} aria-hidden />
      <div className={styles.inner}>
        <Row gutter={[32, 40]} align="middle">
          <Col xs={24} lg={14}>
            <Title level={1} className={styles.heroTitle} id="hero-title">
              <span className={styles.heroTitleWhite}>TARGET CODE.</span>
              <span className={styles.heroTitleSub}>
                <span className={styles.heroTitleGray}>MANAGED BY </span>
                <span className={styles.heroTitleGold}>PRECISION.</span>
              </span>
            </Title>
            <Paragraph className={styles.lead}>
              Technical visionary and certified PM. Five years of frontend mastery and rigorous
              delivery—scaling Techahartak.com, a self-founded platform for social accessibility
              and human impact.
            </Paragraph>
            <Title 
  level={5} 
  id="hero-title"
  style={{ 
    margin: 0, 
    lineHeight: '1.2' 
  }}
>
  <span 
    style={{ 
      color: '#D4AF37',          
      textTransform: 'uppercase', 
      fontWeight: '600',         
      letterSpacing: '0.1em',    
      fontSize: '1.25rem'       
    }}
  >
    Elza Hovhannisyan
  </span>
</Title>
          </Col>
          <Col xs={24} lg={10} className={styles.colImage}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatarRing}>
                <img
                  src={avatarSrc}
                  alt="Portrait"
                  className={styles.avatar}
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[20, 20]} align="stretch" className={styles.cardsRow}>
          {glassCards.map((card) => {
            const cardBody = (
              <>
                {card.badge ? (
                  <span className={styles.cardBadge}>{card.badge}</span>
                ) : null}
                <span className={`${styles.cardIcon} ${card.iconClass}`}>{card.icon}</span>
                <Title level={4} className={styles.cardTitle}>
                  {card.title}
                </Title>
                <Text className={styles.cardDesc}>{card.description}</Text>
                <span className={`${styles.cardLink} ${card.cta.linkClass}`}>
                  {card.cta.label}
                  {card.cta.showOutboundGlyph ? (
                    <ExportOutlined className={styles.cardLinkExternalIcon} aria-hidden />
                  ) : null}
                </span>
              </>
            )

            return (
              <Col xs={24} md={8} key={card.key} className={styles.cardCol}>
                {card.nav.kind === 'internal' ? (
                  <Link
                    to={card.nav.to}
                    className={styles.glassCardAnchor}
                    aria-label={card.nav.ariaLabel}
                  >
                    <article className={`${styles.glassCard} ${styles.glassCardInteractive}`}>
                      {cardBody}
                    </article>
                  </Link>
                ) : (
                  <a
                    href={card.nav.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.glassCardAnchor}
                    aria-label={card.nav.ariaLabel}
                  >
                    <article className={`${styles.glassCard} ${styles.glassCardInteractive}`}>
                      {cardBody}
                    </article>
                  </a>
                )}
              </Col>
            )
          })}
        </Row>
      </div>
    </section>
  )
}
