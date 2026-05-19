import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Button, Card, Col, Input, Layout, Row, Spin, Typography } from 'antd'
import {
  CaretRightOutlined,
  GlobalOutlined,
  SendOutlined,
  StopOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import SiteFooter from '../../components/SiteFooter'
import homeStyles from '../HomePage/styles.module.css'
import {
  DIGITAL_TWIN_SYSTEM_SUFFIX,
  sendToGemini,
} from '../../services/gemini.service'
import { speak } from '../../services/azureSpeech.service'
import { createTalk, pollTalkUntilTerminal } from '../../services/did.service'
import { useTwinSession, resetTwinVideoElement } from '../../hooks/useTwinSession'
import { isAbortError } from '../../lib/abortError'
import styles from './styles.module.css'
import virtualAvatar from '../../assets/virtual-avatar2.png'

const { Content } = Layout
const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

type DidPhase = 'idle' | 'creating' | 'polling' | 'ready' | 'error'

export default function DigitalTwinPage() {
  const [twinPrompt, setTwinPrompt] = useState('')
  const [twinUserMessage, setTwinUserMessage] = useState<string | null>(null)
  const [twinReply, setTwinReply] = useState<string | null>(null)
  const [twinLoading, setTwinLoading] = useState(false)

  const [didPhase, setDidPhase] = useState<DidPhase>('idle')
  const [didVideoUrl, setDidVideoUrl] = useState<string | null>(null)
  const [didError, setDidError] = useState<string | null>(null)
  const didVideoRef = useRef<HTMLVideoElement>(null)
  const { beginSession, stopSession, isCurrentSession, clearAbortRefIfCurrent } =
    useTwinSession()

  const resetDidVideo = useCallback(() => {
    resetTwinVideoElement(didVideoRef.current)
    setDidVideoUrl(null)
  }, [])

  const isTwinSessionActive =
    twinLoading ||
    didPhase === 'creating' ||
    didPhase === 'polling' ||
    didVideoUrl !== null

  const handleTwinStop = useCallback(() => {
    stopSession()
    resetDidVideo()
    setDidPhase('idle')
    setDidError(null)
    setTwinLoading(false)
  }, [resetDidVideo, stopSession])

  useEffect(() => {
    document.title = 'Digital Twin — EH'
    return () => {
      document.title = 'portfolio-cursor'
    }
  }, [])

  const handleTwinSend = useCallback(async () => {
    const text = twinPrompt.trim()
    if (!text || isTwinSessionActive) return

    const { generation, signal } = beginSession()

    setTwinPrompt('')
    setTwinUserMessage(text)
    setTwinReply(null)
    setTwinLoading(true)
    resetDidVideo()
    setDidError(null)
    setDidPhase('idle')

    try {
      const reply = await sendToGemini([{ role: 'user', text }], {
        systemInstructionSuffix: DIGITAL_TWIN_SYSTEM_SUFFIX,
        signal,
      })

      if (!isCurrentSession(generation)) return

      const trimmed = reply.trim() || '…'
      setTwinReply(trimmed)
      setTwinLoading(false)
      speak(trimmed)

      if (trimmed.length >= 3) {
        setDidPhase('creating')
        const id = await createTalk(trimmed, { signal })
        if (!isCurrentSession(generation)) return

        setDidPhase('polling')
        const url = await pollTalkUntilTerminal(id, { signal })
        if (!isCurrentSession(generation)) return

        setDidVideoUrl(url)
        setDidPhase('ready')
      }
    } catch (e) {
      if (isAbortError(e)) return
      if (!isCurrentSession(generation)) return

      const message = e instanceof Error ? e.message : String(e)
      setDidError(message)
      setDidPhase('error')
      resetDidVideo()
      console.error('[DigitalTwin] D-ID:', message)
    } finally {
      if (isCurrentSession(generation)) {
        setTwinLoading(false)
        clearAbortRefIfCurrent(generation)
      }
    }
  }, [
    beginSession,
    clearAbortRefIfCurrent,
    isCurrentSession,
    isTwinSessionActive,
    resetDidVideo,
    twinPrompt,
  ])

  const handleDidVideoEnded = useCallback(() => {
    setDidVideoUrl(null)
    setDidPhase('idle')
  }, [])

  /** Prefer unmuted playback; if autoplay policy blocks sound, retry muted (browser-compatible). */
  useEffect(() => {
    if (!didVideoUrl) return
    const el = didVideoRef.current
    if (!el) return

    el.muted = false
    const attempt = el.play()
    if (attempt === undefined) return
    void attempt.catch((err: unknown) => {
      console.warn(
        '[DigitalTwin] D-ID video: unmuted autoplay blocked (browser policy). Retrying muted.',
        err,
      )
      el.muted = true
      void el.play().catch((e2: unknown) => {
        console.error('[DigitalTwin] D-ID video: playback failed after muted fallback', e2)
      })
    })
  }, [didVideoUrl])

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
                  <div
                    className={styles.virtualMediaWrap}
                    data-did-phase={didPhase}
                    data-did-has-error={didError ? '1' : '0'}
                  >
                    {didVideoUrl ? (
                      <video
                        key={didVideoUrl}
                        ref={didVideoRef}
                        className={styles.virtualVideo}
                        src={didVideoUrl}
                        playsInline
                        autoPlay
                        onEnded={handleDidVideoEnded}
                        onError={() => {
                          const el = didVideoRef.current
                          const code = el?.error?.code
                          const message = el?.error?.message
                          console.error('[DigitalTwin] D-ID video: media error', { code, message })
                        }}
                      />
                    ) : (
                      <img
                        src={virtualAvatar}
                        alt="Digital avatar preview"
                        className={styles.virtualImage}
                      />
                    )}
                    {!didVideoUrl ? <div className={styles.virtualImageOverlay} aria-hidden /> : null}
                    {!didVideoUrl ? (
                      <button
                        type="button"
                        className={styles.virtualPlay}
                        aria-label="Play video"
                      >
                        <CaretRightOutlined className={styles.virtualPlayGlyph} />
                      </button>
                    ) : null}
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
                    {(didPhase === 'creating' || didPhase === 'polling') && (
                      <div className={styles.didMediaLoading} aria-live="polite" aria-busy="true">
                        <Spin size="small" />
                      </div>
                    )}
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div className={styles.virtualIntroCol}>
                    <Title level={2} className={styles.virtualMainTitle}>
                      <span className={styles.virtualTitlePart}>Meet My </span>
                      <span className={styles.virtualTitleAccent}>Virtual Self</span>
                    </Title>
                    <Paragraph className={styles.virtualLead}>
                      AI-driven briefings that explain my workflow, tooling, and how I approach
                      complex interface problems—before we ever meet on a call.
                    </Paragraph>
                  </div>
                </Col>
              </Row>

              <div className={styles.featureCardsRow} aria-label="Digital twin capabilities">
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
                      {twinUserMessage ? (
                        <div className={styles.userBubble} role="article" aria-label="Your question">
                          <span className={styles.transcriptLabel}>You</span>
                          <p className={styles.transcriptText}>{twinUserMessage}</p>
                        </div>
                      ) : null}
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
                          disabled={isTwinSessionActive}
                          rows={3}
                          className={styles.dialogueTextarea}
                          aria-label="Question for the Digital Twin"
                        />
                        <div className={styles.dialogueActions}>
                          <Text type="secondary" className={styles.dialogueHint}>
                            Enter to send · Shift+Enter for a new line
                          </Text>
                          {isTwinSessionActive ? (
                            <Button
                              danger
                              type="primary"
                              icon={<StopOutlined />}
                              className={styles.dialogueSend}
                              onClick={handleTwinStop}
                            >
                              Stop
                            </Button>
                          ) : (
                            <Button
                              type="primary"
                              icon={<SendOutlined />}
                              className={styles.dialogueSend}
                              loading={twinLoading}
                              disabled={!twinPrompt.trim()}
                              onClick={() => void handleTwinSend()}
                            >
                              Send
                            </Button>
                          )}
                        </div>
                      </div>
              </div>
            </div>
          </section>
        </div>
      </Content>

      <SiteFooter />
    </>
  )
}
