import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { getAppThemeConfig } from './appTheme'
import SiteShell from './layouts/SiteShell'
import AboutPage from './pages/AboutPage'
import ChatAssistantPage from './pages/ChatAssistantPage'
import HomePage from './pages/HomePage'
import ProjectStrategyLeadershipPage from './pages/ProjectStrategyLeadershipPage'
import TechnicalMasteryPage from './pages/TechnicalMasteryPage'
import ContactPage from './pages/ContactPage'
import DigitalTwinPage from './pages/DigitalTwinPage'
import { ThemeProvider, useTheme } from './theme'

function ThemedApp() {
  const { theme } = useTheme()

  return (
    <ConfigProvider theme={getAppThemeConfig(theme)}>
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/tech-mastery" element={<TechnicalMasteryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/chat-assistant" element={<ChatAssistantPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/digital-twin" element={<DigitalTwinPage />} />
          <Route path="/pm-strategy" element={<ProjectStrategyLeadershipPage />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  )
}
