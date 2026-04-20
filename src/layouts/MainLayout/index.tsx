import type { ReactNode } from 'react'
import { Layout } from 'antd'
import styles from './styles.module.css'

export type MainLayoutProps = {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <Layout className={styles.root}>{children}</Layout>
}
