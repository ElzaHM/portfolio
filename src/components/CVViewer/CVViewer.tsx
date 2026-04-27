import { Card, Space, Typography } from 'antd'
import ReactMarkdown from 'react-markdown'
import cvMarkdown from '../../data/cv.md?raw'
import styles from './CVViewer.module.css'

export function CVViewer() {
  return (
    <div className={styles.root}>
      <Space orientation="vertical" size="large" className={styles.wrapper}>
        <Typography.Title level={2} className={styles.title}>
          My CV
        </Typography.Title>
        <Card className={styles.cvCard} variant="borderless">
          <div className={styles.markdown}>
          <ReactMarkdown>{cvMarkdown}</ReactMarkdown>
        </div>
        </Card>
      </Space>
    </div>
  )
}
