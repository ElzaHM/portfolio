import { useState } from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Drawer,
  Grid,
  Layout,
  Menu,
  Row,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd'
import {
  ApiOutlined,
  CaretRightOutlined,
  GlobalOutlined,
  MenuOutlined,
  ThunderboltOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import HeroSection from '../../components/HeroSection'
import MainLayout from '../../layouts/MainLayout'
import Chat from '../../components/Chat/Chat'
import { CVViewer } from '../../components/CVViewer/CVViewer'
import styles from './styles.module.css'
import virtualAvatar from '../../assets/virtual-avatar.png'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

const navItems = [
  {
    key: 'tech',
    label: (
      <a href="#tech-stack" className={styles.navAnchor}>
        Tech Stack
      </a>
    ),
  },
  {
    key: 'twin',
    label: (
      <a href="#digital-twin" className={styles.navAnchor}>
        Digital Twin
      </a>
    ),
  },
  {
    key: 'projects',
    label: (
      <a href="#projects" className={styles.navAnchor}>
        Projects
      </a>
    ),
  },
  {
    key: 'contact',
    label: (
      <a href="#contact" className={styles.navAnchor}>
        Contact
      </a>
    ),
  },
]

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [twinView, setTwinView] = useState<'chat' | 'cv'>('chat')
  const screens = Grid.useBreakpoint()
  const showDesktopNav = screens.md

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgBase: '#080c14',
          colorBgContainer: '#12151f',
          colorPrimary: '#4c8cfc',
          colorText: '#e2e8f0',
          colorTextSecondary: '#94a3b8',
          borderRadius: 8,
          fontFamily:
            'system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Menu: {
            itemColor: '#94a3b8',
            horizontalItemSelectedColor: '#f8fafc',
            itemHoverColor: '#f8fafc',
          },
          Button: {
            primaryShadow: 'none',
          },
        },
      }}
    >
      <MainLayout>
        <Header className={styles.header}>
          <div className={styles.headerInner}>
            <Title level={5} className={styles.logo}>
              AI FRONTEND
            </Title>
            {showDesktopNav ? (
              <div className={styles.navDesktop}>
                <Menu
                  mode="horizontal"
                  theme="dark"
                  items={navItems}
                  selectable={false}
                  className={styles.headerMenu}
                  disabledOverflow
                />
              </div>
            ) : (
              <div className={styles.navDesktop} aria-hidden />
            )}
            <Space size="middle">
              <Button type="primary" href="#contact">
                Hire Me
              </Button>
              {!showDesktopNav && (
                <Button
                  type="text"
                  icon={<MenuOutlined className={styles.menuIcon} />}
                  aria-label="Open menu"
                  onClick={() => setDrawerOpen(true)}
                />
              )}
            </Space>
          </div>
        </Header>

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          classNames={{ body: styles.drawerBody }}
        >
          <Menu
            mode="vertical"
            theme="dark"
            items={navItems}
            selectable={false}
            onClick={() => setDrawerOpen(false)}
          />
        </Drawer>

        <Content className={styles.main}>
          <div className={styles.contentInner}>
            <HeroSection />

            <section className={styles.section} id="digital-twin">
              <div className={styles.twinHeading}>
                <Title level={2} className={styles.twinTitle}>
                  AI Digital Twin
                </Title>
                <Paragraph className={styles.twinIntro}>
                  Interview my virtual consciousness to learn more about my
                  technical methodology and architectural vision.
                </Paragraph>
              </div>
              <Card className={styles.twinCard} variant="borderless">
                <div className={styles.twinInner}>
                  <Space orientation="vertical" size="large" className={styles.twinStack}>
                    <div className={styles.twinCardToolbar}>
                      <Row align="middle" justify="space-between" gutter={[16, 16]}>
                        <Col flex="auto">
                          <Space align="start" size={16}>
                            <Avatar
                              className={styles.twinHeaderAvatar}
                              icon={<ApiOutlined />}
                              size={48}
                            />
                            <div className={styles.twinHeaderMeta}>
                              <Title level={5} className={styles.twinHeaderName}>
                                AI-Frontend_v1.0
                              </Title>
                              <Text className={styles.twinHeaderModel}>
                                MODEL: FRONTEND_EXPERT_OPT
                              </Text>
                            </div>
                          </Space>
                        </Col>
                        <Col flex="none">
                          <Space size={6}>
                            <span className={styles.twinStatusDot} aria-hidden />
                            <span className={styles.twinStatusDot} aria-hidden />
                          </Space>
                        </Col>
                      </Row>
                    </div>

                    <div className={styles.toggleBar}>
                      <Space size={10}>
                        <Button
                          type={twinView === 'chat' ? 'primary' : 'default'}
                          className={styles.toggleButton}
                          onClick={() => setTwinView('chat')}
                        >
                          Chat
                        </Button>
                        <Button
                          type={twinView === 'cv' ? 'primary' : 'default'}
                          className={styles.toggleButton}
                          onClick={() => setTwinView('cv')}
                        >
                          CV
                        </Button>
                      </Space>
                    </div>

                    <div
                      className={`${styles.contentArea} ${twinView === 'cv' ? styles.scrollArea : ''}`}
                    >
                      {twinView === 'chat' ? <Chat /> : <CVViewer />}
                    </div>
                  </Space>
                  </div>
              </Card>
            </section>

            <section className={styles.virtualSection}>
              <Row gutter={[20, 28]} align="middle" className={styles.virtualRow}>
                <Col xs={24} lg={12}>
                  <div className={styles.virtualMediaWrap}>
                    <img
                      src={virtualAvatar}
                      alt="Digital avatar preview"
                      className={styles.virtualImage}
                    />
                    <div
                      className={styles.virtualImageOverlay}
                      aria-hidden
                    />
                    <button
                      type="button"
                      className={styles.virtualPlay}
                      aria-label="Play video"
                    >
                      <CaretRightOutlined className={styles.virtualPlayGlyph} />
                    </button>
                    <div className={styles.virtualLabels}>
                      <div className={styles.virtualLiveRow}>
                        <span className={styles.virtualLiveDot} aria-hidden />
                        <Text className={styles.virtualLiveFeed}>LIVE FEED</Text>
                      </div>
                      <Text className={styles.virtualAvatarId}>
                        DIGITAL_AVATAR_01
                      </Text>
                    </div>
                    <div className={styles.virtualAudioBars} aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div className={styles.virtualRightCol}>
                    <Title level={2} className={styles.virtualMainTitle}>
                      <span className={styles.virtualTitlePart}>Meet My </span>
                      <span className={styles.virtualTitleAccent}>
                        Virtual Self
                      </span>
                    </Title>
                    <Paragraph className={styles.virtualLead}>
                      AI-driven briefings that explain my workflow, tooling, and
                      how I approach complex interface problems—before we ever
                      meet on a call.
                    </Paragraph>
                    <div className={styles.featureStack}>
                      <Card size="small" className={styles.featureCard}>
                        <div className={styles.featureInner}>
                          <span className={styles.featureIconCircle}>
                            <VideoCameraOutlined className={styles.featureIcon} />
                          </span>
                          <div className={styles.featureTextCol}>
                            <Title level={5} className={styles.featureCardTitle}>
                              AI Video Synthesis
                            </Title>
                            <Paragraph className={styles.featureCardDesc}>
                              Short-form walkthroughs generated from structured
                              prompts—great for async stakeholder updates.
                            </Paragraph>
                          </div>
                        </div>
                      </Card>
                      <Card size="small" className={styles.featureCard}>
                        <div className={styles.featureInner}>
                          <span className={styles.featureIconCircle}>
                            <GlobalOutlined className={styles.featureIcon} />
                          </span>
                          <div className={styles.featureTextCol}>
                            <Title level={5} className={styles.featureCardTitle}>
                              Multilingual Support
                            </Title>
                            <Paragraph className={styles.featureCardDesc}>
                              Briefings and documentation localized for distributed
                              teams across regions.
                            </Paragraph>
                          </div>
                        </div>
                      </Card>
                    </div>
                    <Button type="primary" href="#digital-twin" className={styles.virtualCta}>
                      Try AI Chat
                    </Button>
                  </div>
                </Col>
              </Row>
            </section>

            {/* <section className={styles.section} id="projects">
              <Title level={2} className={styles.sectionTitle}>
                Selected Projects
              </Title>
              <Paragraph className={styles.sectionIntro}>
                Recent work focused on scalable UI systems, performance, and
                measurable UX outcomes.
              </Paragraph>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Card className={styles.projectCard} title="Design System Hub">
                    <Paragraph className={styles.sectionIntro}>
                      Component library, tokens, and documentation for a
                      multi-brand product suite.
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className={styles.projectCard} title="Realtime Dashboard">
                    <Paragraph className={styles.sectionIntro}>
                      Low-latency charts and role-based views for operations
                      teams.
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className={styles.projectCard} title="Marketing Site">
                    <Paragraph className={styles.sectionIntro}>
                      Static-first build with interactive demos and optimized
                      Core Web Vitals.
                    </Paragraph>
                  </Card>
                </Col>
              </Row>
            </section> */}

            <section className={styles.section} id="tech-stack">
              <div className={styles.sectionHeadingRow}>
                <Title level={2} className={styles.sectionTitle}>
                  Tech Arsenal
                </Title>
                <Tag color="default" className={styles.metaTag}>
                  LAST UPDATED: 04 2024
                </Tag>
              </div>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={8}>
                  <Card className={styles.techCard}>
                    <img
                      className={styles.techIcon}
                      src={reactLogo}
                      alt=""
                      width={40}
                      height={40}
                    />
                    <Title level={4} className={styles.sectionTitle}>
                      React & Next.js
                    </Title>
                    <Paragraph className={styles.techDesc}>
                      App router, streaming, and client islands for fast product
                      surfaces.
                    </Paragraph>
                    <div className={styles.tagRow}>
                      <Tag>VITE</Tag>
                      <Tag>SSR</Tag>
                      <Tag>ZUSTAND</Tag>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className={styles.techCard}>
                    <Avatar
                      size={40}
                      className={`${styles.techAvatar} ${styles.techAvatarTs}`}
                    >
                      TS
                    </Avatar>
                    <Title level={4} className={styles.sectionTitle}>
                      TypeScript
                    </Title>
                    <Paragraph className={styles.techDesc}>
                      Strict typing end-to-end with shared contracts across apps
                      and APIs.
                    </Paragraph>
                    <div className={styles.tagRow}>
                      <Tag>ESLINT</Tag>
                      <Tag>ZOD</Tag>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className={styles.techCard}>
                    <Avatar
                      size={40}
                      className={`${styles.techAvatar} ${styles.techAvatarAi}`}
                    >
                      AI
                    </Avatar>
                    <Title level={4} className={styles.sectionTitle}>
                      OpenAI APIs
                    </Title>
                    <Paragraph className={styles.techDesc}>
                      Tool-calling flows, structured outputs, and safe UX around
                      LLM features.
                    </Paragraph>
                    <div className={styles.tagRow}>
                      <Tag>STREAMING</Tag>
                      <Tag>TOOLS</Tag>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className={styles.techCard}>
                    <img
                      className={styles.techIcon}
                      src={viteLogo}
                      alt=""
                      width={40}
                      height={40}
                    />
                    <Title level={4} className={styles.sectionTitle}>
                      Vite & Tooling
                    </Title>
                    <Paragraph className={styles.techDesc}>
                      Fast dev loops, optimized bundles, and CI-friendly
                      pipelines.
                    </Paragraph>
                    <div className={styles.tagRow}>
                      <Tag>PNPM</Tag>
                      <Tag>VITEST</Tag>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className={styles.techCard}>
                    <Avatar
                      size={40}
                      className={`${styles.techAvatar} ${styles.techAvatarNg}`}
                    >
                      NG
                    </Avatar>
                    <Title level={4} className={styles.sectionTitle}>
                      Angular
                    </Title>
                    <Paragraph className={styles.techDesc}>
                      Enterprise modules, RxJS flows, and a11y-minded templates.
                    </Paragraph>
                    <div className={styles.tagRow}>
                      <Tag>NX</Tag>
                      <Tag>RXJS</Tag>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card className={styles.techCard}>
                    <span className={styles.perfIconWrap}>
                      <ThunderboltOutlined />
                    </span>
                    <Title level={4} className={styles.sectionTitle}>
                      Performance
                    </Title>
                    <Paragraph className={styles.techDesc}>
                      Budgets, profiling, and resilient loading states for heavy
                      UIs.
                    </Paragraph>
                    <div className={styles.tagRow}>
                      <Tag>RUM</Tag>
                      <Tag>CWV</Tag>
                    </div>
                  </Card>
                </Col>
              </Row>
            </section>
          </div>
        </Content>

        <Footer className={styles.footer} id="contact">
          <div className={styles.footerInner}>
            <Row gutter={[16, 16]} className={styles.footerRow}>
              <Col xs={24} md={8}>
                <Text className={styles.footerCopy}>
                  © {new Date().getFullYear()} AI Frontend. All rights reserved.
                </Text>
              </Col>
              <Col xs={24} md={8} className={styles.footerLinks}>
                <Space size="large" wrap>
                  <Typography.Link
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.footerLink}
                  >
                    GITHUB
                  </Typography.Link>
                  <Typography.Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.footerLink}
                  >
                    LINKEDIN
                  </Typography.Link>
                </Space>
              </Col>
              <Col xs={24} md={8}>
                <Text className={styles.footerCredit}>
                  MADE WITH REACT, TYPESCRIPT, AND AI
                </Text>
              </Col>
            </Row>
          </div>
        </Footer>
      </MainLayout>
    </ConfigProvider>
  )
}
