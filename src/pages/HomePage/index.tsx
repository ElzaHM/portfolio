import { Col, Layout, Row, Space, Typography } from 'antd'
import HeroSection from '../../components/HeroSection'
import styles from './styles.module.css'

const { Content, Footer } = Layout
const { Text } = Typography

export default function HomePage() {
  return (
    <>
      <Content className={styles.main}>
          <div className={styles.contentInner}>
            <HeroSection />

            {/* <section className={styles.section} id="projects">
              <Title level={2} className={styles.sectionTitle}>
                Selected Projects
              </Title>
              <Paragraph className={styles.sectionIntro}>
                Recent work focused on scalable UI systems, performance, and
                measurable UX outcomes.
              </Paragraph>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={8}>
                  <Card className={styles.projectCard} title="Design System Hub">
                    <Paragraph className={styles.sectionIntro}>
                      Component library, tokens, and documentation for a
                      multi-brand product suite.
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className={styles.projectCard} title="Realtime Dashboard">
                    <Paragraph className={styles.sectionIntro}>
                      Low-latency charts and role-based views for operations
                      teams.
                    </Paragraph>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card className={styles.projectCard} title="Marketing Site">
                    <Paragraph className={styles.sectionIntro}>
                      Static-first build with interactive demos and optimized
                      Core Web Vitals.
                    </Paragraph>
                  </Card>
                </Col>
              </Row>
            </section> */}
          </div>
      </Content>

      <Footer className={styles.footer} id="contact">
        <div className={styles.footerInner}>
          <Row gutter={[16, 16]} className={styles.footerRow}>
            <Col xs={24} md={8}>
              <Text className={styles.footerCopy}>
                © {new Date().getFullYear()} EH. All rights reserved.
              </Text>
            </Col>
            <Col xs={24} md={8} className={styles.footerLinks}>
              <Space size="large" wrap>
                <Typography.Link
                  href="https://github.com/ElzaHM/portfolio"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerLink}
                >
                  GITHUB
                </Typography.Link>
                <Typography.Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerLink}
                >
                  LINKEDIN
                </Typography.Link>
                <Typography.Link
                  href="https://techahartak.com"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.footerLink}
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
