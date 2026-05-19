import { theme } from 'antd'
import type { ThemeMode } from './theme/constants'

const darkThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorBgBase: '#1a1c2c',
    colorBgContainer: '#111827',
    colorPrimary: '#d4af37',
    colorLink: '#a78bfa',
    colorInfo: '#38bdf8',
    colorBorder: 'rgba(255, 255, 255, 0.08)',
    colorText: '#ffffff',
    colorTextSecondary: '#94a3b8',
    borderRadius: 8,
    fontFamily: '"Inter", system-ui, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    fontSizeSM: 9,
    fontSizeLG: 11,
    fontSizeXL: 12,
    lineHeight: 1.5715,
    controlHeight: 26,
    controlHeightLG: 32,
    controlHeightSM: 19,
    paddingXS: 5,
    paddingSM: 6,
    padding: 10,
    paddingLG: 13,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      primaryColor: '#1a1c2c',
      colorPrimary: '#d4af37',
      colorPrimaryHover: '#e8c84c',
      colorPrimaryActive: '#b8922a',
    },
    Card: {
      colorBgContainer: '#111827',
    },
    Tag: {
      colorBorder: 'rgba(255, 255, 255, 0.12)',
    },
  },
} as const

const lightThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorBgBase: '#f4f1eb',
    colorBgContainer: '#faf8f4',
    colorPrimary: '#b8922a',
    colorLink: '#6d28d9',
    colorInfo: '#0284c7',
    colorBorder: 'rgba(26, 32, 48, 0.08)',
    colorText: '#1c2333',
    colorTextSecondary: '#5c6b7f',
    borderRadius: 8,
    fontFamily: '"Inter", system-ui, "Segoe UI", Roboto, sans-serif',
    fontSize: 10,
    fontSizeSM: 9,
    fontSizeLG: 11,
    fontSizeXL: 12,
    lineHeight: 1.5715,
    controlHeight: 26,
    controlHeightLG: 32,
    controlHeightSM: 19,
    paddingXS: 5,
    paddingSM: 6,
    padding: 10,
    paddingLG: 13,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      primaryColor: '#1c2333',
      colorPrimary: '#b8922a',
      colorPrimaryHover: '#c9a227',
      colorPrimaryActive: '#9a7b1a',
    },
    Card: {
      colorBgContainer: '#faf8f4',
    },
    Tag: {
      colorBorder: 'rgba(26, 32, 48, 0.12)',
    },
  },
} as const

/** @deprecated Use getAppThemeConfig(theme) */
export const appThemeConfig = darkThemeConfig

export function getAppThemeConfig(mode: ThemeMode) {
  return mode === 'light' ? lightThemeConfig : darkThemeConfig
}
