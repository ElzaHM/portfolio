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
    key: 'armenia-events',
    title: 'Armenia Events',
    description:
      'A full-stack event discovery platform built with React, TypeScript, Supabase and modern web technologies. Full stack / Team Lead — React, TypeScript, Ant Design, Supabase, React Query.',
    icon: <span className={styles.codeIconGlyph} aria-hidden>{'</>'}</span>,
    iconClass: styles.cardIconEngineering,
    nav: {
      kind: 'external',
      href: 'https://armenia-events.vercel.app/',
      ariaLabel: 'Armenia Events — live project (opens in new tab)',
    },
    cta: {
      label: 'VIEW LIVE SITE →',
      linkClass: styles.cardLinkEngineering,
      showOutboundGlyph: true,
    },
  },
  {
    key: 'venture',
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
      ariaLabel: 'Techahartak — live project (opens in new tab)',
    },
    cta: {
      label: 'VIEW LIVE SITE →',
      linkClass: styles.cardLinkVenture,
      showOutboundGlyph: true,
    },
  },
  {
    key: 'mobius',
    title: 'Mobius',
    description:
      'A modern web platform built with Angular, focusing on frontend engineering, responsive UI development and project management workflows using Kanban methodology. Frontend Developer + Project Manager — Angular, TypeScript, Kanban, Agile, UI Architecture.',
    icon: <CheckCircleOutlined aria-hidden />,
    iconClass: styles.cardIconLead,
    nav: {
      kind: 'external',
      href: 'https://mobius.am/',
      ariaLabel: 'Mobius — live project (opens in new tab)',
    },
    cta: {
      label: 'VIEW LIVE SITE →',
      linkClass: styles.cardLinkEngineering,
      showOutboundGlyph: true,
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
