import { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Input, Space, Typography } from 'antd'
import { ApiOutlined, SafetyOutlined, SendOutlined, UserOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { sendToGemini, type ConversationTurn } from '../../services/gemini.service'
import styles from './Chat.module.css'

const { TextArea } = Input
const { Title } = Typography

const WELCOME_TEXT =
  "Hello! I am the AI Assistant of Elza Hovhannisyan. I'm here to tell you about her expertise in Frontend Development, Project Management, and her social impact projects like techahartak.com."

type ChatMessage =
  | { id: string; role: 'assistant'; content: string; isStatic?: boolean }
  | { id: string; role: 'user'; content: string }

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function messagesToHistory(msgs: ChatMessage[]): ConversationTurn[] {
  return msgs
    .filter(
      (m): m is ChatMessage & { content: string } =>
        m.role === 'user' || (m.role === 'assistant' && !m.isStatic),
    )
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      text: m.content,
    }))
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'assistant', content: WELCOME_TEXT, isStatic: true },
  ])
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const handleSend = async () => {
    const text = prompt.trim()
    if (!text || isLoading) return

    const userMessage: ChatMessage = { id: newId(), role: 'user', content: text }
    setPrompt('')
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    const history = messagesToHistory([...messages, userMessage])
    const reply = await sendToGemini(history)

    setMessages((prev) => [
      ...prev,
      { id: newId(), role: 'assistant', content: reply || '…' },
    ])
    setIsLoading(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSend()
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.chatCard}>
        <Space orientation="vertical" size="large" className={styles.stack}>
          <div className={styles.header}>
            <div className={styles.headerMain}>
              <Title level={3} className={styles.title}>
                ✨ Gemini Chat
              </Title>
            </div>
          </div>

          <div className={styles.headerDivider} />

          <div className={styles.messages}>
            {messages.map((msg) =>
              msg.role === 'user' ? (
                <div key={msg.id} className={styles.userRow}>
                  <div className={styles.userBubble}>{msg.content}</div>
                  <Avatar
                    size={36}
                    icon={<UserOutlined />}
                    className={styles.userAvatar}
                    aria-hidden
                  />
                </div>
              ) : (
                <div key={msg.id} className={styles.messageRow}>
                  <Avatar
                    size={36}
                    icon={<ApiOutlined />}
                    className={styles.headerAvatar}
                    aria-hidden
                  />
                  <div className={styles.aiBubble}>
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ),
            )}

            {isLoading ? (
              <div className={styles.messageRow}>
                <Avatar
                  size={36}
                  icon={<ApiOutlined />}
                  className={styles.headerAvatar}
                  aria-hidden
                />
                <div className={`${styles.aiBubble} ${styles.typingBubble}`} aria-live="polite">
                  <span className={styles.typingDots}>Thinking</span>
                </div>
              </div>
            ) : null}

            <div ref={bottomRef} className={styles.scrollAnchor} aria-hidden />
          </div>

          <div className={styles.inputSection}>
            <TextArea
              rows={4}
              value={prompt}
              placeholder="Type your message..."
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={onKeyDown}
              className={styles.textarea}
              disabled={isLoading}
            />

            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={() => void handleSend()}
              loading={isLoading}
              disabled={isLoading}
              className={styles.sendButton}
            >
              Send
            </Button>

            <div className={styles.disclaimer}>
              <div className={styles.disclaimerInner}>
                <SafetyOutlined className={styles.disclaimerIcon} aria-hidden />
                <span className={styles.disclaimerText}>
                  AI-generated responses may be inaccurate or incomplete. Always verify important
                  information before making decisions.
                </span>
              </div>
            </div>
          </div>
        </Space>
      </div>
    </div>
  )
}

export { Chat }
export default Chat
