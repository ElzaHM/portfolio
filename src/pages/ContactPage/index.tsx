import { useEffect } from 'react'
import { CodeOutlined, GlobalOutlined, LinkedinOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Layout, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import tmStyles from '../TechnicalMasteryPage/styles.module.css'
import styles from './styles.module.css'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

type ContactFormValues = {
  name: string
  email: string
  message: string
}

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
                    className={`${styles.socialBtnGold} ${styles.socialBtnLinkedin}`}
                  >
                    LINKEDIN
                  </Button>
                  <Button
                    type="default"
                    href={GITHUB_PROFILE}
                    target="_blank"
                    rel="noreferrer noopener"
                    icon={<CodeOutlined aria-hidden />}
                    className={`${styles.socialBtnGhost} ${styles.socialBtnGithub}`}
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

          <Row gutter={[24, 24]} className={styles.formRow}>
            <Col xs={24}>
              <Card
                className={`${styles.glassCard} ${styles.contactFormCard}`}
                variant="borderless"
              >
                <Text className={styles.cardEyebrow}>Send a message</Text>
                <Paragraph className={styles.formIntro}>
                  Share context on your initiative—strategy, delivery, or partnership. I typically
                  respond within one business day.
                </Paragraph>
                <Form<ContactFormValues>
                  layout="vertical"
                  className={styles.contactForm}
                  requiredMark={false}
                  onFinish={(values) => {
                    const subject = encodeURIComponent(
                      `Portfolio inquiry from ${values.name}`,
                    )
                    const body = encodeURIComponent(
                      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
                    )
                    window.location.href = `mailto:${personalEmail}?subject=${subject}&body=${body}`
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Name"
                        className={styles.formField}
                        rules={[{ required: true, message: 'Please enter your name' }]}
                      >
                        <Input placeholder="Your name" autoComplete="name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        className={styles.formField}
                        rules={[
                          { required: true, message: 'Please enter your email' },
                          { type: 'email', message: 'Please enter a valid email' },
                        ]}
                      >
                        <Input placeholder="you@company.com" autoComplete="email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item
                        name="message"
                        label="Message"
                        className={styles.formField}
                        rules={[{ required: true, message: 'Please enter a message' }]}
                      >
                        <TextArea
                          rows={5}
                          placeholder="How can we collaborate?"
                          className={styles.formTextarea}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item className={styles.submitWrap}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      className={styles.submitBtn}
                    >
                      Send message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>

          {/* <p className={styles.locationNote}>
            Based in Yerevan, Armenia (GMT+4). Available for global remote engagement.
          </p> */}
        </div>
      </Content>

      <SiteFooter />
    </>
  )
}
