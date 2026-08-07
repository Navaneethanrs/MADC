import React from 'react'
import Hero from '../components/Hero'
import ClubFeatures from '../components/ClubFeatures'
import FacultyCoordinators from '../components/FacultyCoordinators'
import ClubSecretary from '../components/ClubSecretary'
import JoinUs from '../components/JoinUs'

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-void text-text overflow-y-auto">
      <Hero />
      <ClubFeatures />
      <FacultyCoordinators />
      <ClubSecretary />
      <JoinUs />
    </main>
  )
}
