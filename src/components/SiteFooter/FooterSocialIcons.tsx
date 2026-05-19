import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import techahartakFavicon from '../../assets/favicon-16x16.png'
import { GITHUB_PORTFOLIO_URL, LINKEDIN_PROFILE_URL, TECHAHARTAK_URL } from '../../constants/socialLinks'
import styles from './styles.module.css'

export default function FooterSocialIcons() {
  return (
    <nav className={styles.socialRow} aria-label="Social links">
    <a
      href={LINKEDIN_PROFILE_URL}
      target="_blank"
      rel="noreferrer"
      className={`${styles.socialLink} ${styles.linkedin}`}
      aria-label="LinkedIn"
    >
      <LinkedinOutlined className={styles.socialIcon} aria-hidden />
    </a>
      <a
        href={GITHUB_PORTFOLIO_URL}
        target="_blank"
        rel="noreferrer"
        className={`${styles.socialLink} ${styles.github}`}
        aria-label="GitHub"
      >
        <GithubOutlined className={styles.socialIcon} aria-hidden />
      </a>
      <a
        href={TECHAHARTAK_URL}
        target="_blank"
        rel="noreferrer"
        className={`${styles.socialLink} ${styles.techahartak}`}
        aria-label="Techahartak"
      >
        <img
          src={techahartakFavicon}
          alt=""
          className={styles.socialFavicon}
          width={16}
          height={16}
          decoding="async"
          aria-hidden
        />
      </a>
    </nav>
  )
}
