import { useState } from 'react'
import { Button, Drawer, Grid, Layout } from 'antd'
import { Link } from 'react-router-dom'
import {
  IconHome,
  IconLayers,
  IconLayoutGrid,
  IconMail,
  IconMenu,
  IconMessageCircle,
  IconUser,
  IconX,
} from '../NavThinIcons'
import styles from '../../pages/HomePage/styles.module.css'

const { Header } = Layout

type NavTo = string | { pathname: string; hash?: string }

const navLeftItems = [
  { key: 'home', to: '/' as NavTo, label: 'Home', Icon: IconHome },
  { key: 'tech-mastery', to: '/tech-mastery' as NavTo, label: 'Tech Stack', Icon: IconLayers },
  { key: 'digital-twin', to: '/digital-twin' as NavTo, label: 'Digital Twin', Icon: IconLayoutGrid },
] as const

const navRightItems = [
  { key: 'about', to: '/about' as NavTo, label: 'About', Icon: IconUser },
  {
    key: 'chat-assistant',
    to: '/chat-assistant' as NavTo,
    label: 'Chat Assistant',
    Icon: IconMessageCircle,
  },
  { key: 'contact', to: '/contact' as NavTo, label: 'Contact', Icon: IconMail },
] as const

const mobileNavItems = [...navLeftItems, ...navRightItems] as const

export default function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const screens = Grid.useBreakpoint()
  const showDesktopNav = screens.md

  return (
    <>
      <Header className={styles.header}>
        <div className={styles.headerInner}>
          {showDesktopNav ? (
            <nav className={styles.pillNav} aria-label="Primary">
              <div className={`${styles.pillNavCluster} ${styles.pillNavClusterLeft}`}>
                {navLeftItems.map(({ key, to, label, Icon }) => (
                  <Link key={key} to={to} className={styles.navPillLink}>
                    <Icon className={styles.navLucideIcon} aria-hidden />
                    {label}
                  </Link>
                ))}
              </div>
              <div className={styles.pillNavLogo}>
                <Link to="/" className={styles.monogramLink} aria-label="Home — EH">
                  <span className={styles.monogramRing}>
                    <span className={styles.monogramEh}>EH</span>
                  </span>
                </Link>
              </div>
              <div className={`${styles.pillNavCluster} ${styles.pillNavClusterRight}`}>
                {navRightItems.map(({ key, to, label, Icon }) => (
                  <Link key={key} to={to} className={styles.navPillLink}>
                    <Icon className={styles.navLucideIcon} aria-hidden />
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          ) : (
            <div className={styles.mobileHeader}>
              <Link to="/" className={styles.monogramLink} aria-label="Home — EH">
                <span className={styles.monogramRing}>
                  <span className={styles.monogramEh}>EH</span>
                </span>
              </Link>
              <Button
                type="text"
                className={styles.menuTrigger}
                icon={<IconMenu className={styles.menuIconLucide} aria-hidden />}
                aria-label="Open menu"
                onClick={() => setDrawerOpen(true)}
              />
            </div>
          )}
        </div>
      </Header>

      <Drawer
        placement="right"
        size="100%"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        rootClassName={styles.mobileNavDrawer}
        classNames={{ body: styles.mobileDrawerBody }}
      >
        <div className={styles.mobileDrawerShell}>
          <div className={styles.mobileDrawerHeader}>
            <Link to="/" className={styles.monogramLink} aria-label="Home — EH">
              <span className={styles.monogramRing}>
                <span className={styles.monogramEh}>EH</span>
              </span>
            </Link>
            <button
              type="button"
              className={styles.mobileDrawerClose}
              aria-label="Close menu"
              onClick={() => setDrawerOpen(false)}
            >
              <IconX className={styles.menuIconLucide} aria-hidden />
            </button>
          </div>
          <nav className={styles.drawerNav} aria-label="Site sections">
            {mobileNavItems.map(({ key, to, label, Icon }) => (
              <Link
                key={key}
                to={to}
                className={styles.drawerNavLink}
                onClick={() => setDrawerOpen(false)}
              >
                <Icon className={styles.drawerNavIcon} aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Drawer>
    </>
  )
}
