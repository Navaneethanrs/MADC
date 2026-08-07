import React from 'react'
import Navbar from '../components/Navbar'
import Achievements from '../components/Achievements'
import JoinUs from '../components/JoinUs'

export default function AchievementsPage() {
  return (
    <div className="w-full min-h-screen bg-void text-text flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <Achievements />
        </main>
      </div>
      <JoinUs />
    </div>
  )
}
