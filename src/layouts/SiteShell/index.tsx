import { useLayoutEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from '../../components/SiteHeader'
import MainLayout from '../MainLayout'
import styles from './styles.module.css'

/**
 * Shared shell: stable header + animated main (Outlet) for SPA route changes.
 * Scroll resets on pathname change so Tech Mastery always enters from the top.
 */
export default function SiteShell() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  const transition = {
    type: 'tween' as const,
    duration: reduceMotion ? 0 : 0.38,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  }

  return (
    <MainLayout>
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className={styles.shellMain}
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={transition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </MainLayout>
  )
}
