import { useEffect } from 'react'
import { CodeOutlined, GlobalOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Col, Layout, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import homeStyles from '../HomePage/styles.module.css'
import tmStyles from '../TechnicalMasteryPage/styles.module.css'
import styles from './styles.module.css'

const { Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography

const GITHUB_PORTFOLIO = 'https://github.com/ElzaHM/portfolio'
const GITHUB_PROFILE = 'https://github.com/ElzaHM'

const LINKEDIN_HREF =
  'https://www.linkedin.com/in/elza-hovhannisyan-25a6b0233/'

const TECHAHARTAK_EMAIL = 'info@techahartak.com'

function trimEnv(key: keyof ImportMetaEnv): string {
  const v = import.meta.env[key]
  return typeof v === 'string' ? v.trim() : ''
}

export default function ContactPage() {
  const personalEmail =
    trimEnv('VITE_CONTACT_PRO_EMAIL') || 'elzahovhannisyan7@gmail.com'
  const personalPhone =
    trimEnv('VITE_CONTACT_PHONE') || '+374 94 53 65 30'

  useEffect(() => {
    document.title = 'Contact — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  return (
    <>
      <Content className={`${homeStyles.main} ${styles.contactMain}`}>
        <div className={`${homeStyles.contentInner} ${styles.pageInner}`}>
          <div className={styles.topBar}>
            <Link to="/" className={tmStyles.backLink}>
             {/*  ← Back to Home */}
            </Link>
          </div>

          <header className={styles.hero}>
            <Title level={1} className={styles.heroTitle}>
              GET IN TOUCH
            </Title>
            <Paragraph className={styles.heroSubtitle}>
              Let&apos;s collaborate on technology strategy, project leadership, or social impact
              initiatives.
            </Paragraph>
          </header>

          <Row gutter={[24, 24]} className={styles.cardRow}>
            <Col xs={24} md={12}>
              <Card className={styles.glassCard} variant="borderless">
                <Text className={styles.cardEyebrow}>Strategy &amp; Delivery (Professional)</Text>
                <div className={styles.cardIconGold} aria-hidden>
                  <UserOutlined />
                </div>
                {/* <Title level={4} className={styles.cardTitle}>
                  Direct Collaboration
                </Title> */}
                <div className={styles.profileLegalName}>ELZA HOVHANNISYAN</div>
                <ul className={styles.contactDetailList}>
                  <li className={styles.contactDetailItem}>
                    <span className={styles.detailLabel}>Email</span>
                    <div className={styles.detailBody}>
                      <Text className={styles.detailValue} copyable={{ text: personalEmail }}>
                        {personalEmail}
                      </Text>
                      {/* <Button
                        type="default"
                        size="small"
                        className={styles.copyEmailBtn}
                        onClick={() => void copyToClipboard('Email', personalEmail)}
                      >
                        Copy email
                      </Button> */}
                    </div>
                  </li>
                  <li className={styles.contactDetailItem}>
                    <span className={styles.detailLabel}>Mobile</span>
                    <Text className={styles.detailValue}>{personalPhone}</Text>
                  </li>
                </ul>

                <Paragraph className={styles.cardBody}>
                 Hiring, Consulting & Architecture Reviews
                </Paragraph>

                <div className={styles.socialButtonsRow}>
                  <Button
                    type="primary"
                    href={LINKEDIN_HREF}
                    target="_blank"
                    rel="noreferrer noopener"
                    icon={<LinkedinOutlined />}
                    className={styles.socialBtnGold}
                  >
                    LINKEDIN
                  </Button>
                  <Button
                    type="default"
                    href={GITHUB_PROFILE}
                    target="_blank"
                    rel="noreferrer noopener"
                    icon={<CodeOutlined aria-hidden />}
                    className={styles.socialBtnGhost}
                  >
                    GITHUB
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card className={styles.glassCard} variant="borderless">
                <Text className={styles.cardEyebrow}>Social Impact (Techahartak)</Text>
                <div className={styles.cardIconGold} aria-hidden>
                  <GlobalOutlined />
                </div>
                <Title level={4} className={styles.cardTitle}>
                  Techahartak.com
                </Title>
                <Paragraph className={styles.cardBody}>
                  Partnerships, accessibility-focused audits, and inclusion-driven digital products—especially
                  work that aligns with multilingual and community-centered delivery.
                </Paragraph>
                <div className={styles.techMailBlock}>
                  <Text className={styles.techMailLabel}>Email</Text>
                  <Typography.Link
                    href={`mailto:${TECHAHARTAK_EMAIL}?subject=${encodeURIComponent('Techahartak partnership inquiry')}`}
                    className={styles.techMailLink}
                    copyable={{ text: TECHAHARTAK_EMAIL }}
                  >
                    {TECHAHARTAK_EMAIL}
                  </Typography.Link>
                </div>
              </Card>
            </Col>
          </Row>

          {/* <p className={styles.locationNote}>
            Based in Yerevan, Armenia (GMT+4). Available for global remote engagement.
          </p> */}
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
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className={homeStyles.footerLink}
                >
                  LINKEDIN
                </Typography.Link>
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Text className={homeStyles.footerCredit}>MADE WITH REACT AND TYPESCRIPT</Text>
            </Col>
          </Row>
        </div>
      </Footer>
    </>
  )
}
