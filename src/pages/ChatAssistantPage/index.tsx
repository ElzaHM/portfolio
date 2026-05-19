import { useEffect, useState } from 'react'
import { Avatar, Button, Card, Col, Layout, Row, Space, Typography } from 'antd'
import { ApiOutlined } from '@ant-design/icons'
import Chat from '../../components/Chat/Chat'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import styles from './styles.module.css'

const { Content } = Layout
const { Title, Text, Paragraph } = Typography

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
            <Card className={`${homeStyles.twinCard} ${styles.chatTwinCard}`} variant="borderless">
              <div className={`${homeStyles.twinInner} ${styles.chatTwinInner}`}>
                <Space
                  orientation="vertical"
                  size="large"
                  className={`${homeStyles.twinStack} ${styles.twinStackStretch}`}
                >
                  <div className={`${homeStyles.twinCardToolbar} ${styles.chatToolbar}`}>
                    <Row align="middle" justify="space-between" gutter={[16, 16]}>
                      <Col flex="auto">
                        <Space align="start" size={16}>
                          <Avatar
                            className={`${homeStyles.twinHeaderAvatar} ${styles.chatTwinAvatar}`}
                            icon={<ApiOutlined />}
                            size={48}
                          />
                          <div className={`${homeStyles.twinHeaderMeta} ${styles.chatTwinMeta}`}>
                            <Title level={5} className={`${homeStyles.twinHeaderName} ${styles.chatTwinName}`}>
                              AI-Frontend_v1.0
                            </Title>
                            <Text className={`${homeStyles.twinHeaderModel} ${styles.chatTwinModel}`}>
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

      <SiteFooter />
    </>
  )
}
