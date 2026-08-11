import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import OurTeam from '../components/OurTeam'
import JoinUs from '../components/JoinUs'

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full min-h-screen hero-bg text-text flex flex-col justify-between overflow-hidden">
      <div>
        <Navbar />
        <main className="pt-24 sm:pt-28">
          <OurTeam />
        </main>
      </div>
      <JoinUs />
    </div>
  )
}
