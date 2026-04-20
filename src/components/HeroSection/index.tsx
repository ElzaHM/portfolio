import { Button, Col, Row, Space, Typography } from 'antd'
import {
  CodeOutlined,
  DownloadOutlined,
  SoundOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import avatarSrc from '../../assets/avatar.jpg'
import styles from './styles.module.css'

const { Title, Paragraph, Text } = Typography

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.inner}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={14}>
            <Text className={styles.badge}>ARCHITECTING TOMORROW</Text>
            <Title level={1} className={styles.titleLine1} id="hero-title">
              Frontend
            </Title>
            <Title level={1} className={styles.titleLine2}>
              Developer
            </Title>
            <Paragraph className={styles.lead}>
              Engineering scalable web ecosystems and sophisticated AI
              interfaces. Bridging the gap between technical precision and
              high-end editorial experiences.
            </Paragraph>
            <Space direction="vertical" size="middle" className={styles.actions}>
  <Space size="middle" wrap className={styles.ctaRow}>
    <Button
      type="primary"
      size="large"
      icon={<DownloadOutlined />}
      className={styles.btnPrimary}
    >
      Download CV
    </Button>

    <Button size="large" className={styles.btnSecondary}>
      Ask AI About Me
    </Button>
  </Space>

  <Space size="middle" className={styles.iconRow}>
    <Button
      shape="circle"
      icon={<SoundOutlined />}
      className={styles.iconCircle}
    />
    <Button
      shape="circle"
      icon={<CodeOutlined />}
      className={styles.iconCircle}
    />
    <Button
      shape="circle"
      icon={<TeamOutlined />}
      className={styles.iconCircle}
    />
  </Space>
</Space>
          </Col>
          <Col xs={24} lg={10} className={styles.colImage}>
            <div className={styles.avatarWrap}>
              <img
                src={avatarSrc}
                alt=""
                className={styles.avatar}
                width={400}
                height={500}
              />
            </div>
          </Col>
        </Row>

        <div className={styles.statsDivider} role="separator" />

        <Row gutter={[24, 24]} className={styles.stats} aria-label="Statistics">
          <Col xs={24} sm={8} className={styles.statCol}>
            <Title level={2} className={styles.statValue}>
              5+ Years
            </Title>
            <Text className={styles.statLabel}>EXPERIENCE</Text>
          </Col>
          <Col xs={24} sm={8} className={styles.statCol}>
            <Title level={2} className={styles.statValue}>
              50+
            </Title>
            <Text className={styles.statLabel}>PROJECTS</Text>
          </Col>
          <Col xs={24} sm={8} className={styles.statCol}>
            <Title level={2} className={styles.statValue}>
              100%
            </Title>
            <Text className={styles.statLabel}>SATISFACTION</Text>
          </Col>
        </Row>
      </div>
    </section>
  )
}
