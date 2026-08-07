import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import AchievementsPage from './pages/AchievementsPage'
import TeamPage from './pages/TeamPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
