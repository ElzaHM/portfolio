import { Col, Layout, Row, Typography } from 'antd'
import FooterSocialIcons from './FooterSocialIcons'
import styles from './styles.module.css'

const { Footer } = Layout
const { Text } = Typography

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <Footer className={styles.footer} id="contact">
      <div className={styles.footerInner}>
        <Row gutter={[16, 16]} className={styles.footerRow}>
          <Col xs={24} md={8}>
            <Text className={styles.footerCopy}>
              © {year} EH. All rights reserved.
            </Text>
          </Col>
          <Col xs={24} md={8} className={styles.footerLinks} />
          <Col xs={24} md={8} className={styles.footerSocialCol}>
            <FooterSocialIcons />
          </Col>
        </Row>
      </div>
    </Footer>
  )
}
