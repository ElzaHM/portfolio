import { ConfigProvider } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { appThemeConfig } from './appTheme'
import SiteShell from './layouts/SiteShell'
import AboutPage from './pages/AboutPage'
import ChatAssistantPage from './pages/ChatAssistantPage'
import HomePage from './pages/HomePage'
import ProjectStrategyLeadershipPage from './pages/ProjectStrategyLeadershipPage'
import TechnicalMasteryPage from './pages/TechnicalMasteryPage'
import ContactPage from './pages/ContactPage'
import DigitalTwinPage from './pages/DigitalTwinPage'

export default function App() {
  return (
    <ConfigProvider theme={appThemeConfig}>
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
