import { useState } from 'react'
import { Avatar, Button, Input, Space, Typography } from 'antd'
import {
  ApiOutlined,
  SafetyOutlined,
  SendOutlined,
} from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { sendToGemini } from '../../services/gemini.service'
import styles from './Chat.module.css'

const { TextArea } = Input
const { Title } = Typography

const Chat = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSend = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    const result = await sendToGemini(prompt)
    setResponse(result)
    setIsLoading(false)
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
            <div className={styles.messageRow}>
            
              <Avatar
                size={36}
                icon={<ApiOutlined />}
                className={styles.headerAvatar}
              />
              <div className={styles.aiBubble}>
                Hello! I&apos;m your AI digital twin. Ask me anything about my
                skills, projects, or experience.
              </div>
            </div>

            {response && (
              <div className={styles.messageRow}>
                <Avatar
                  size={36}
                  icon={<ApiOutlined />}
                  className={styles.headerAvatar}
                />
                <div className={styles.aiBubble}>
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          <div className={styles.inputSection}>
            <TextArea
              rows={4}
              value={prompt}
              placeholder="Type your message..."
              onChange={(e) => setPrompt(e.target.value)}
              className={styles.textarea}
            />

            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSend}
              loading={isLoading}
              className={styles.sendButton}
            >
              Send
            </Button>

            <div className={styles.disclaimer}>
              <div className={styles.disclaimerInner}>
                <SafetyOutlined className={styles.disclaimerIcon} aria-hidden />
                <span className={styles.disclaimerText}>
                  AI-generated responses may be inaccurate or incomplete. Always
                  verify important information before making decisions.
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
