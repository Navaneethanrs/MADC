import React, { useState } from 'react'
import { familyPhotos2024, eventsPlan2026 } from '../data/achievementsData'
import AchievementModal from './AchievementModal'

export default function Achievements() {
  const [activeTab, setActiveTab] = useState('roadmap2024') // 'roadmap2024' or 'yearplan2026'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  const currentPhoto = selectedPhotoIndex !== null ? familyPhotos2024[selectedPhotoIndex] : null

  const handleNextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % familyPhotos2024.length)
    }
  }

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + familyPhotos2024.length) % familyPhotos2024.length)
    }
  }

  return (
    <section id="achievements" className="hero-bg relative py-16 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden select-none">
      {/* Ambient background glow effects */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-green/15 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[140px]" />

      {/* Top line accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* --- SINGLE UNIFIED SECTION HEADER --- */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green/40 bg-green/10 backdrop-blur-md mb-4 shadow-[0_0_15px_rgba(0,255,102,0.15)]">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="font-mono text-xs tracking-[0.25em] text-green-bright uppercase font-semibold">
              The Heart of MADC &bull; Legacy & Year Plan
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text">
            MADC <span className="text-gradient">Achievements & Roadmap</span>
          </h1>
          <p className="font-body text-text-dim mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Exploring our rich <span className="text-green-bright font-semibold">Family of MADC 2k25</span> memories and our upcoming <span className="text-green-bright font-semibold">2026-2027 Events Roadmap</span> leading to SPECTRA'27 National Hackathon!
          </p>
        </div>

        {/* --- MAIN NAVIGATION TAB SWITCHER --- */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md shadow-2xl tab-container">
            <button
              onClick={() => setActiveTab('roadmap2024')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'roadmap2024'
                  ? 'bg-gradient-to-r from-green to-emerald-400 text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                  : 'text-text-dim hover:text-text hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Family of MADC 2k25 Roadmap
            </button>

            <button
              onClick={() => setActiveTab('yearplan2026')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeTab === 'yearplan2026'
                  ? 'bg-gradient-to-r from-green to-emerald-400 text-black shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                  : 'text-text-dim hover:text-text hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              2026-2027 Events Plan & Hackathon
            </button>
          </div>
        </div>

        {/* --- VIEW 1: FAMILY OF MADC 2K25 ROADMAP --- */}
        {activeTab === 'roadmap2024' && (
          <div className="relative animate-fade-in">
            <div className="text-center mb-14">
              <span className="font-mono text-xs font-bold text-green-bright uppercase tracking-widest">
                FAMILY ROADMAP &bull; TOUCH PHOTO TO ZOOM
              </span>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-text mt-2">
                Family of <span className="text-gradient">MADC 2k25</span> Timeline
              </h3>
              <p className="font-body text-text-dim text-sm mt-2 max-w-xl mx-auto">
                Memorable moments capturing unity, innovation, and strength. Click or touch any photo for full details!
              </p>
            </div>

            {/* Responsive Roadmap Timeline */}
            <div className="relative">
              {/* Vertical Wire Line: Left on mobile, Center on desktop */}
              <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[3px] bg-gradient-to-b from-green via-emerald-400/40 to-transparent -translate-x-1/2 z-0 rounded-full shadow-[0_0_12px_rgba(0,255,102,0.5)]" />

              <div className="space-y-12 md:space-y-16 relative z-10">
                {familyPhotos2024.map((photo, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <div
                      key={photo.id}
                      className={`relative flex flex-col md:flex-row items-center pl-14 md:pl-0 gap-6 md:gap-16 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Timeline Node Dot */}
                      <div className="absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border-2 border-green shadow-[0_0_20px_rgba(0,255,102,0.8)] timeline-node bg-[#050906]">
                        <span className="w-3.5 h-3.5 rounded-full bg-green animate-pulse" />
                      </div>

                      {/* Photo Roadmap Card with Highlighted Border */}
                      <div className="w-full md:w-[44%]">
                        <div
                          onClick={() => setSelectedPhotoIndex(index)}
                          className="group relative rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] achievement-card"
                          style={{
                            borderColor: photo.badgeColor,
                            boxShadow: `0 0 25px ${photo.glow}, 0 10px 30px rgba(0, 0, 0, 0.4)`,
                          }}
                        >
                          {/* Image Box */}
                          <div className="relative h-60 sm:h-72 w-full overflow-hidden flex items-center justify-center photo-box p-0">
                            <img
                              src={photo.image}
                              alt={photo.title}
                              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 ease-out transform group-hover:scale-105 group-active:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                            {/* Clean Badge */}
                            <div className="absolute top-3 left-3 z-20 pointer-events-none">
                              <span
                                className="font-mono text-[10px] font-bold px-3 py-1.5 rounded-full border backdrop-blur-md shadow-md"
                                style={{
                                  color: photo.badgeColor,
                                  borderColor: `${photo.badgeColor}80`,
                                  background: 'rgba(5, 10, 7, 0.88)',
                                }}
                              >
                                {photo.tag}
                              </span>
                            </div>

                            <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-green-bright opacity-0 group-hover:opacity-100 transition-opacity">
                              Click to Expand Photo
                            </div>
                          </div>

                          {/* Info */}
                          <div className="p-5">
                            <h4 className="font-display font-extrabold text-lg sm:text-xl text-text group-hover:text-green-bright transition-colors">
                              {photo.title}
                            </h4>
                            <p className="font-mono text-xs text-green-bright mt-0.5 font-medium">
                              {photo.subtitle}
                            </p>
                            <p className="font-body text-xs text-text-dim mt-2 leading-relaxed line-clamp-2">
                              {photo.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Empty balancing side on desktop */}
                      <div className="w-full md:w-[44%] hidden md:block" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 2: 2026-2027 OFFICIAL EVENTS ROADMAP (HIGHLIGHTED GLOWING BORDERS) --- */}
        {activeTab === 'yearplan2026' && (
          <div className="relative animate-fade-in">
            <div className="text-center mb-14">
              <span className="font-mono text-xs font-bold text-green-bright uppercase tracking-widest">
                OFFICIAL KEC / MADC EVENTS PLAN &bull; ACADEMIC YEAR 2026-2027
              </span>
              <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-text mt-2">
                2026-2027 <span className="text-gradient">Events Roadmap</span>
              </h3>
              <p className="font-body text-text-dim text-sm mt-2 max-w-xl mx-auto">
                Step-by-step technical journey leading to our grand finale: <span className="text-red-400 font-bold">SPECTRA'27 National Hackathon</span>!
              </p>
            </div>

            {/* Central Roadmap Timeline */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-6 md:left-1/2 top-6 bottom-6 w-[3px] bg-gradient-to-b from-green via-emerald-400 to-red-500 -translate-x-1/2 z-0 rounded-full shadow-[0_0_15px_rgba(0,255,102,0.4)]" />

              <div className="space-y-12 md:space-y-16 relative z-10">
                {eventsPlan2026.map((event, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <div
                      key={event.sNo}
                      className={`relative flex flex-col md:flex-row items-center pl-14 md:pl-0 gap-6 md:gap-16 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Step Node Circle */}
                      <div
                        className={`absolute left-6 md:left-1/2 top-8 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 font-mono text-xs sm:text-sm font-extrabold shadow-2xl transition-transform duration-300 hover:scale-110 timeline-node ${
                          event.isFeatured
                            ? 'bg-[#18050c] border-red-500 text-white shadow-[0_0_25px_rgba(255,0,85,0.8)]'
                            : 'bg-[#050906] border-green text-green-bright shadow-[0_0_20px_rgba(0,255,102,0.6)]'
                        }`}
                      >
                        #{event.sNo}
                      </div>

                      {/* Event Card Box - HIGHLIGHTED GLOWING BORDER FOR ALL CARDS */}
                      <div className="w-full md:w-[44%]">
                        <div
                          className="group relative rounded-3xl border-2 p-6 sm:p-7 transition-all duration-500 overflow-hidden achievement-card hover:-translate-y-1.5 hover:scale-[1.02]"
                          style={{
                            borderColor: event.isFeatured ? '#ff0055' : event.color,
                            boxShadow: `0 0 30px ${event.glow}, 0 10px 30px rgba(0, 0, 0, 0.4)`,
                          }}
                        >
                          {/* Top Tag & Month */}
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className="font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                              style={{
                                color: event.color,
                                borderColor: `${event.color}60`,
                                background: `${event.color}20`,
                              }}
                            >
                              {event.category}
                            </span>

                            <span className="font-mono text-xs font-bold text-green-bright px-3 py-1 rounded-lg border border-white/10 date-badge">
                              📅 {event.date}
                            </span>
                          </div>

                          {/* Title & Subtitle */}
                          <h4 className="font-display font-extrabold text-2xl text-text group-hover:text-green-bright transition-colors mt-1">
                            {event.title}
                          </h4>
                          <p className="font-mono text-xs font-medium text-text-dim mt-0.5">
                            {event.subtitle}
                          </p>

                          <p className="font-body text-xs text-text-dim mt-3 leading-relaxed">
                            {event.description}
                          </p>

                          {/* Special SPECTRA'27 Highlight Box */}
                          {event.highlights && (
                            <div className="mt-4 p-3.5 rounded-2xl border-2 border-red-500/50 shadow-inner spectra-highlight">
                              <div className="font-mono text-xs font-bold text-red-400 uppercase mb-1.5 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                                🚀 Flagship National Level Event
                              </div>
                              <ul className="space-y-1 text-xs font-body text-text">
                                {event.highlights.map((h, i) => (
                                  <li key={i} className="flex items-center gap-1.5 font-medium text-text">
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-text-faint">
                            <span>{event.type}</span>
                            <span className="text-green font-bold">&check; Official Plan</span>
                          </div>
                        </div>
                      </div>

                      {/* Empty balancing side on desktop */}
                      <div className="w-full md:w-[44%] hidden md:block" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Banner Callout for SPECTRA'27 Hackathon */}
            <div className="mt-16 p-8 sm:p-10 rounded-3xl border-2 border-red-500 relative overflow-hidden shadow-[0_0_50px_rgba(255,0,85,0.4)] spectra-banner">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="font-mono text-xs font-bold px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 uppercase tracking-widest inline-block mb-3">
                    🔥 GRAND FINALE &bull; NATIONAL LEVEL HACKATHON
                  </span>
                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-text">
                    Prepare for <span className="text-red-500">SPECTRA'27</span> Hackathon!
                  </h3>
                  <p className="font-body text-text-dim text-sm mt-2 max-w-2xl">
                    Gear up for a 24-hour National Level Mobile App Hackathon in February 2027! Build skills through our upcoming UI/UX, Flutter, and Backend workshops.
                  </p>
                </div>

                <a
                  href="#join"
                  className="px-7 py-3.5 rounded-2xl font-mono text-xs font-bold text-white bg-gradient-to-r from-red-600 to-emerald-500 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,0,85,0.4)] whitespace-nowrap"
                >
                  Join MADC Cohort &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      {selectedPhotoIndex !== null && (
        <AchievementModal
          photo={currentPhoto}
          currentIndex={selectedPhotoIndex}
          totalCount={familyPhotos2024.length}
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={handleNextPhoto}
          onPrev={handlePrevPhoto}
        />
      )}
    </section>
  )
}
