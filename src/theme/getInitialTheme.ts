import { THEME_STORAGE_KEY, type ThemeMode } from './constants'

export function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(THEME_STORAGE_KEY)
  if (raw === 'light' || raw === 'dark') return raw
  return null
}

export function getInitialTheme(): ThemeMode {
  return getStoredTheme() ?? getSystemTheme()
}

export function applyThemeToDocument(theme: ThemeMode): void {
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.style.colorScheme = theme
}
