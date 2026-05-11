import { useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Layout, Row, Space, Typography } from 'antd'
import { ApiOutlined } from '@ant-design/icons'
import Chat from '../../components/Chat/Chat'
import homeStyles from '../HomePage/styles.module.css'
import styles from './styles.module.css'

const { Content, Footer } = Layout
const { Title, Text, Paragraph } = Typography

const GITHUB_PORTFOLIO = 'https://github.com/ElzaHM/portfolio'

export default function ChatAssistantPage() {
  const [chatSessionKey, setChatSessionKey] = useState(0)

  useEffect(() => {
    document.title = 'Chat Assistant — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  return (
    <>
      <Content className={`${homeStyles.main} ${styles.chatLayoutContent}`}>
        <div
          className={`${homeStyles.contentInner} ${styles.pageInner} ${styles.chatPageColumn}`}
        >
          <header className={styles.pageHeader}>
            <div className={styles.heroCopy}>
              <Title level={1} className={styles.heroTitle}>
                AI Assistant
              </Title>
              <Paragraph className={styles.heroSubtitle}>
                Engage with a specialized AI model trained on Elza&apos;s professional background,
                project management methodology, and technical expertise. Ask about her specific role in
                scaling techahartak.com or her approach to Agile delivery.
              </Paragraph>
            </div>
          </header>

          <div className={`${styles.chatShell} ${styles.chatShellStretch}`}>
            <Card className={homeStyles.twinCard} variant="borderless">
              <div className={homeStyles.twinInner}>
                <Space
                  orientation="vertical"
                  size="large"
                  className={`${homeStyles.twinStack} ${styles.twinStackStretch}`}
                >
                  <div className={homeStyles.twinCardToolbar}>
                    <Row align="middle" justify="space-between" gutter={[16, 16]}>
                      <Col flex="auto">
                        <Space align="start" size={16}>
                          <Avatar
                            className={homeStyles.twinHeaderAvatar}
                            icon={<ApiOutlined />}
                            size={48}
                          />
                          <div className={homeStyles.twinHeaderMeta}>
                            <Title level={5} className={homeStyles.twinHeaderName}>
                              AI-Frontend_v1.0
                            </Title>
                            <Text className={homeStyles.twinHeaderModel}>
                              MODEL: FRONTEND_EXPERT_OPT
                            </Text>
                          </div>
                        </Space>
                      </Col>
                      <Col flex="none">
                        <Space size={14} align="center" wrap>
                          <Button
                            type="default"
                            className={styles.clearConversationBtn}
                            onClick={() => setChatSessionKey((k) => k + 1)}
                            aria-label="Clear conversation and restore the welcome message"
                          >
                            New Chat
                          </Button>
                          {/* <Space size={6}>
                            <span className={homeStyles.twinStatusDot} aria-hidden />
                            <span className={homeStyles.twinStatusDot} aria-hidden />
                            <span className={homeStyles.twinStatusDot} aria-hidden />
                          </Space> */}
                        </Space>
                      </Col>
                    </Row>
                  </div>

                  <div className={styles.chatEmbedSurface}>
                    <Chat key={chatSessionKey} />
                  </div>
                </Space>
              </div>
            </Card>
          </div>
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
