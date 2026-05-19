import { createContext } from 'react'
import type { ThemeMode } from './constants'

export type ThemeContextValue = {
  theme: ThemeMode
  setTheme: (mode: ThemeMode) => void
  toggleTheme: () => void
  isLight: boolean
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
