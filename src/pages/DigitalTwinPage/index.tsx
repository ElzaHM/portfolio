import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import { Button, Card, Col, Input, Layout, Row, Space, Spin, Typography } from 'antd'
import {
  CaretRightOutlined,
  GlobalOutlined,
  SendOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import homeStyles from '../HomePage/styles.module.css'
import {
  DIGITAL_TWIN_SYSTEM_SUFFIX,
  sendToGemini,
} from '../../services/gemini.service'
import styles from './styles.module.css'
import virtualAvatar from '../../assets/virtual-avatar2.png'

const { Content, Footer } = Layout
const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

export default function DigitalTwinPage() {
  const [twinPrompt, setTwinPrompt] = useState('')
  const [twinReply, setTwinReply] = useState<string | null>(null)
  const [twinLoading, setTwinLoading] = useState(false)

  useEffect(() => {
    document.title = 'Digital Twin — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  const handleTwinSend = useCallback(async () => {
    const text = twinPrompt.trim()
    if (!text || twinLoading) return

    setTwinPrompt('')
    setTwinReply(null)
    setTwinLoading(true)

    const reply = await sendToGemini([{ role: 'user', text }], {
      systemInstructionSuffix: DIGITAL_TWIN_SYSTEM_SUFFIX,
    })

    setTwinReply(reply.trim() || '…')
    setTwinLoading(false)
  }, [twinPrompt, twinLoading])

  const onTwinKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleTwinSend()
    }
  }

  return (
    <>
      <Content className={homeStyles.main}>
        <div className={`${homeStyles.contentInner} ${styles.dtPageInner}`}>
          <section className={styles.dtMasthead} aria-labelledby="digital-twin-heading">
            <div className={styles.twinHeading}>
              <Title level={2} className={styles.twinTitle} id="digital-twin-heading">
                AI Digital Twin
              </Title>
              <Paragraph className={styles.twinIntro}>
                Interview my virtual consciousness to learn more about my technical methodology and
                architectural vision.
              </Paragraph>
            </div>
          </section>

          <section className={styles.virtualSection} aria-label="Digital twin preview">
            <div className={styles.virtualShowcase}>
              <Row gutter={[20, 28]} align="middle" className={styles.virtualRow}>
                <Col xs={24} lg={12}>
                  <div className={styles.virtualMediaWrap}>
                    <img
                      src={virtualAvatar}
                      alt="Digital avatar preview"
                      className={styles.virtualImage}
                    />
                    <div className={styles.virtualImageOverlay} aria-hidden />
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
                      <Text className={styles.virtualAvatarId}>DIGITAL_AVATAR_01</Text>
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
                      <span className={styles.virtualTitleAccent}>Virtual Self</span>
                    </Title>
                    <Paragraph className={styles.virtualLead}>
                      AI-driven briefings that explain my workflow, tooling, and how I approach
                      complex interface problems—before we ever meet on a call.
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
                              Short-form walkthroughs generated from structured prompts—great for
                              async stakeholder updates.
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
                              Briefings and documentation localized for distributed teams across
                              regions.
                            </Paragraph>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className={styles.dialogueSection}>
                      {(twinLoading || twinReply !== null) && (
                        <div
                          className={styles.twinReplyCard}
                          aria-live="polite"
                          aria-busy={twinLoading}
                        >
                          <div className={styles.twinReplyHeader}>
                            <span className={styles.twinReplyChip}>Twin reply</span>
                          </div>
                          <div className={styles.twinReplyBody}>
                            {twinLoading ? (
                              <div className={styles.twinReplyLoading}>
                                <Spin size="small" />
                                <span className={styles.twinReplyLoadingLabel}>Synthesizing…</span>
                              </div>
                            ) : (
                              <div className={styles.twinReplyMarkdown}>
                                <ReactMarkdown>{twinReply ?? ''}</ReactMarkdown>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className={styles.dialoguePanel}>
                        <TextArea
                          value={twinPrompt}
                          onChange={(e) => setTwinPrompt(e.target.value)}
                          onKeyDown={onTwinKeyDown}
                          placeholder="Ask the Digital Twin anything about methodology, stack, or delivery…"
                          disabled={twinLoading}
                          rows={3}
                          className={styles.dialogueTextarea}
                          aria-label="Question for the Digital Twin"
                        />
                        <div className={styles.dialogueActions}>
                          <Text type="secondary" className={styles.dialogueHint}>
                            Enter to send · Shift+Enter for a new line
                          </Text>
                          <Button
                            type="primary"
                            icon={<SendOutlined />}
                            className={styles.dialogueSend}
                            loading={twinLoading}
                            disabled={twinLoading || !twinPrompt.trim()}
                            onClick={() => void handleTwinSend()}
                          >
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
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
                  href="https://github.com/ElzaHM/portfolio"
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
