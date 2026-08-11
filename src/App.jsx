import React, { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import ScrollToTop from './components/ScrollToTop'
import CursorGlow from './components/CursorGlow'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import AchievementsPage from './pages/AchievementsPage'
import TeamPage from './pages/TeamPage'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  const handleLoadingFinish = useCallback(() => {
    setIsFadingOut(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 700)
  }, [])

  return (
    <ThemeProvider>
      {isLoading && (
        <LoadingScreen isFadingOut={isFadingOut} onFinish={handleLoadingFinish} />
      )}
      <BrowserRouter>
        <ScrollToTop />
        <CursorGlow />
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

