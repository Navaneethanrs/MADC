import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Achievements from '../components/Achievements'
import JoinUs from '../components/JoinUs'

export default function AchievementsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full min-h-screen hero-bg text-text flex flex-col justify-between overflow-hidden">
      <div>
        <Navbar />
        <main className="pt-24 sm:pt-28">
          <Achievements />
        </main>
      </div>
      <JoinUs />
    </div>
  )
}
