import { theme } from 'antd'

export const appThemeConfig = {
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
    /* ~20% smaller than prior compact tier — aligns with rem /18 scale + 14.4 root */
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
}
