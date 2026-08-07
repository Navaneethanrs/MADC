import React from 'react'
import Navbar from '../components/Navbar'
import ClubFeatures from '../components/ClubFeatures'
import JoinUs from '../components/JoinUs'

export default function FeaturesPage() {
  return (
    <div className="w-full min-h-screen bg-void text-text flex flex-col justify-between">
      <div>
        <Navbar />
        <main>
          <ClubFeatures />
        </main>
      </div>
      <JoinUs />
    </div>
  )
}
