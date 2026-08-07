import React from 'react'
import Navbar from '../components/Navbar'
import OurTeam from '../components/OurTeam'
import JoinUs from '../components/JoinUs'

export default function TeamPage() {
  return (
    <div className="w-full min-h-screen bg-void text-text flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <OurTeam />
        </main>
      </div>
      <JoinUs />
    </div>
  )
}
