import { Layout } from 'antd'
import HeroSection from '../../components/HeroSection'
import SiteFooter from '../../components/SiteFooter'
import styles from './styles.module.css'

const { Content } = Layout

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

      <SiteFooter />
    </>
  )
}
