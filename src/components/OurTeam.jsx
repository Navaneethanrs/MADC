import React, { useState, useMemo } from 'react'
import { officeBearers, categories } from '../data/teamData'
import PhotoModal from './PhotoModal'

export default function OurTeam() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeModalMember, setActiveModalMember] = useState(null)

  const filteredMembers = useMemo(() => {
    return officeBearers.filter((member) => {
      const matchesCategory =
        selectedCategory === 'All' || member.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.rollNo.toLowerCase().includes(query) ||
        member.posting.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Group for tiered display when 'All' is selected
  const coreExecs = useMemo(
    () => officeBearers.filter((m) => m.category === 'Core Executive'),
    []
  )
  const jointOfficers = useMemo(
    () => officeBearers.filter((m) => m.category === 'Joint Officers'),
    []
  )
  const addlOfficers = useMemo(
    () => officeBearers.filter((m) => m.category === 'Additional Officers'),
    []
  )
  const docTeam = useMemo(
    () => officeBearers.filter((m) => m.category === 'Documentation Team'),
    []
  )
  const mediaTeam = useMemo(
    () => officeBearers.filter((m) => m.category === 'Media Team'),
    []
  )
  const execMembers = useMemo(
    () => officeBearers.filter((m) => m.category === 'Executive Members'),
    []
  )

  // Navigation handlers for photo popup lightbox
  const currentList = selectedCategory !== 'All' || searchQuery !== '' ? filteredMembers : officeBearers

  const handleNextModal = () => {
    if (!activeModalMember) return
    const currentIndex = currentList.findIndex((m) => m.id === activeModalMember.id)
    const nextIndex = (currentIndex + 1) % currentList.length
    setActiveModalMember(currentList[nextIndex])
  }

  const handlePrevModal = () => {
    if (!activeModalMember) return
    const currentIndex = currentList.findIndex((m) => m.id === activeModalMember.id)
    const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length
    setActiveModalMember(currentList[prevIndex])
  }

  return (
    <section id="team" className="hero-bg relative py-24 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green/30 to-transparent" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full pointer-events-none opacity-15 filter blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00ff66, #00e676, transparent)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.35em] text-green-bright uppercase flex items-center justify-center gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            MADC OFFICE BEARERS 2026 - 2027
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-text mt-4 tracking-tight">
            Our <span className="text-gradient">Team & Leadership</span>
          </h2>
          <p className="font-body text-text-dim mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            40 passionate student developers, designers, operations leads, and executive officers driving mobile development at MADC.
          </p>

          {/* Stat summary pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="font-mono text-xs px-4 py-2 rounded-full border border-green/40 bg-green/10 text-green-bright font-bold shadow-[0_0_15px_rgba(0,255,102,0.15)]">
              40 Office Bearers
            </span>
            <span className="font-mono text-xs px-4 py-2 rounded-full border border-white/15 text-text-dim font-medium">
              2 Core Executives
            </span>
            <span className="font-mono text-xs px-4 py-2 rounded-full border border-white/15 text-text-dim font-medium">
              10 Joint & Additional Officers
            </span>
            <span className="font-mono text-xs px-4 py-2 rounded-full border border-white/15 text-text-dim font-medium">
              10 Specialized Team Leads
            </span>
            <span className="font-mono text-xs px-4 py-2 rounded-full border border-white/15 text-text-dim font-medium">
              18 Executive Members
            </span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 max-w-full overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-green to-emerald-400 text-black font-bold shadow-[0_0_20px_rgba(0,255,102,0.4)]'
                    : 'border border-white/15 text-text-dim hover:text-text hover:border-green/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <input
              type="text"
              placeholder="Search member, roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 text-xs font-mono text-text placeholder-text-faint focus:outline-none focus:border-green transition-all"
              style={{ background: 'rgba(9, 16, 12, 0.7)' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-faint hover:text-text"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* DISPLAY MEMBERS */}
        {selectedCategory !== 'All' || searchQuery !== '' ? (
          /* Filtered View */
          <div>
            <div className="mb-6 font-mono text-xs text-text-dim">
              Showing {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} onSelect={() => setActiveModalMember(member)} />
              ))}
            </div>
          </div>
        ) : (
          /* Tiered Grand Presentation when 'All' is selected */
          <div className="space-y-20">
            {/* TIER 1: CORE EXECUTIVE LEADERSHIP (PROMINENT HIGHLIGHTED) */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="w-3 h-3 rounded-full bg-green animate-ping" />
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-text tracking-tight">
                  Executive Officers
                </h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-green/40 via-green/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {coreExecs.map((member) => (
                  <GrandMemberCard key={member.id} member={member} onSelect={() => setActiveModalMember(member)} />
                ))}
              </div>
            </div>

            {/* TIER 2: JOINT & ADDITIONAL OFFICERS */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-text tracking-tight">
                  Joint & Additional Officers
                </h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-green/30 via-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...jointOfficers, ...addlOfficers].map((member) => (
                  <MemberCard key={member.id} member={member} onSelect={() => setActiveModalMember(member)} />
                ))}
              </div>
            </div>

            {/* TIER 3: SPECIALIZED TEAMS */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-text tracking-tight">
                  Documentation & Media Teams
                </h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-green/30 via-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Documentation Team Column */}
                <div className="p-6 rounded-3xl border border-white/10 bg-[#09100c]/60 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="font-mono text-xs font-bold text-green-bright uppercase tracking-wider">
                      Documentation Team ({docTeam.length})
                    </span>
                    <span className="font-mono text-[10px] text-text-faint">Technical Writing & Records</span>
                  </div>
                  <div className="space-y-4">
                    {docTeam.map((member) => (
                      <TeamRowMember key={member.id} member={member} onSelect={() => setActiveModalMember(member)} />
                    ))}
                  </div>
                </div>

                {/* Media Team Column */}
                <div className="p-6 rounded-3xl border border-white/10 bg-[#09100c]/60 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <span className="font-mono text-xs font-bold text-green-bright uppercase tracking-wider">
                      Media Team ({mediaTeam.length})
                    </span>
                    <span className="font-mono text-[10px] text-text-faint">Design & Content Creation</span>
                  </div>
                  <div className="space-y-4">
                    {mediaTeam.map((member) => (
                      <TeamRowMember key={member.id} member={member} onSelect={() => setActiveModalMember(member)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TIER 4: EXECUTIVE MEMBERS */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-text tracking-tight">
                  Executive Members ({execMembers.length})
                </h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-green/30 via-white/10 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {execMembers.map((member) => (
                  <CompactMemberCard key={member.id} member={member} onSelect={() => setActiveModalMember(member)} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Photo Lightbox Popup Modal */}
      {activeModalMember && (
        <PhotoModal
          member={activeModalMember}
          onClose={() => setActiveModalMember(null)}
          onNext={handleNextModal}
          onPrev={handlePrevModal}
        />
      )}
    </section>
  )
}

/* Smart Avatar Image component */
function MemberAvatar({ member, size = 'normal', onClick }) {
  const [imgSrc, setImgSrc] = useState(member.image || `/team/${member.rollNo}.jpg`)
  const [hasError, setHasError] = useState(false)

  // Determine size classes
  let containerClasses = 'w-24 h-24 sm:w-28 sm:h-28'
  let textClasses = 'text-3xl'

  if (size === 'large') {
    containerClasses = 'w-36 h-36 md:w-44 md:h-44'
    textClasses = 'text-4xl md:text-5xl'
  } else if (size === 'small') {
    containerClasses = 'w-14 h-14'
    textClasses = 'text-base'
  }

  const showImage = imgSrc && !hasError

  return (
    <div
      onClick={onClick}
      className={`${containerClasses} rounded-2xl overflow-hidden border-2 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center flex-shrink-0 relative shadow-xl cursor-pointer group/avatar`}
      style={{
        borderColor: member.color || '#00ff66',
        background: 'rgba(5, 8, 6, 0.95)',
        boxShadow: `0 0 15px ${member.glow || 'rgba(0, 255, 102, 0.3)'}`,
      }}
    >
      {showImage ? (
        <img
          src={imgSrc}
          alt={member.name}
          onError={() => {
            if (imgSrc.endsWith('.jpg')) {
              setImgSrc(`/team/${member.rollNo}.png`)
            } else {
              setHasError(true)
            }
          }}
          className="w-full h-full object-cover object-top rounded-xl transition-all duration-300 group-hover/avatar:brightness-110"
        />
      ) : (
        <span
          className={`font-display font-black uppercase ${textClasses}`}
          style={{ color: member.color || '#00ff66' }}
        >
          {member.initials}
        </span>
      )}
    </div>
  )
}

/* Featured Grand Member Card (Secretary & Treasurer) - PROMINENT HIGHLIGHTED 2PX BORDER */
function GrandMemberCard({ member, onSelect }) {
  return (
    <div
      className="group relative p-8 rounded-3xl border-2 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden team-card-grand"
      style={{
        background: 'rgba(9, 16, 12, 0.85)',
        borderColor: member.color || '#00ff66',
        boxShadow: `0 0 25px ${member.glow || 'rgba(0, 255, 102, 0.35)'}, 0 10px 30px rgba(0, 0, 0, 0.4)`,
        backdropFilter: 'blur(14px)',
      }}
    >
      {/* Photo Frame */}
      <div className="relative flex-shrink-0">
        <MemberAvatar member={member} size="large" onClick={onSelect} />
        <span
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9.5px] font-extrabold tracking-widest uppercase px-3.5 py-1 rounded-full border shadow-xl whitespace-nowrap z-10"
          style={{
            background: '#050806',
            color: member.color || '#00ff66',
            borderColor: member.color || '#00ff66',
          }}
        >
          {member.posting}
        </span>
      </div>

      {/* Member Details */}
      <div className="flex-1 text-center sm:text-left mt-3 sm:mt-0 min-w-0">
        <h4 
          onClick={onSelect}
          className="font-display font-extrabold text-2xl md:text-3xl uppercase text-text group-hover:text-green transition-colors duration-300 cursor-pointer break-words leading-tight"
        >
          {member.name}
        </h4>
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-2">
          <span className="font-mono text-xs font-bold text-green-bright">
            {member.rollNo}
          </span>
          <span className="text-text-faint">&middot;</span>
          <span className="font-mono text-xs text-text-dim">
            {member.phone}
          </span>
        </div>
        <p className="font-body text-xs text-text-dim mt-3 leading-relaxed">
          Executive Leadership Officer driving innovation, development workshops, and student projects.
        </p>
      </div>
    </div>
  )
}

/* Standard Member Card - VERY LIGHT DELICATE BORDER */
function MemberCard({ member, onSelect }) {
  const accentColor = member.color || '#00ff66'

  return (
    <div
      className="group flex flex-col items-center justify-between text-center p-6 rounded-3xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_10px_25px_rgba(0,255,102,0.12)] h-full min-h-[330px] team-card-subtle bg-[#09100c]/55 backdrop-blur-md"
    >
      <div className="flex flex-col items-center text-center w-full">
        {/* Photo Frame */}
        <div className="relative mb-4">
          <MemberAvatar member={member} size="normal" onClick={onSelect} />
        </div>

        {/* Aligned Name Container */}
        <div className="min-h-[2.8rem] flex items-center justify-center w-full px-1">
          <h4 
            onClick={onSelect}
            className="font-display font-bold text-base sm:text-lg uppercase text-text group-hover:text-green transition-colors duration-300 cursor-pointer break-words leading-snug text-center"
          >
            {member.name}
          </h4>
        </div>

        {/* Posting Badge */}
        <span
          className="font-mono text-[10px] font-bold tracking-wider uppercase mt-2 px-3 py-1 rounded-md border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}40`,
            background: `${accentColor}10`,
          }}
        >
          {member.posting}
        </span>
      </div>

      <div className="flex flex-col items-center text-center mt-3 pt-2.5 border-t border-white/10 w-full">
        <span className="font-mono text-xs font-semibold text-text-dim">
          {member.rollNo}
        </span>

        {member.phone && (
          <span className="font-mono text-[10.5px] text-text-faint mt-1">
            {member.phone}
          </span>
        )}
      </div>
    </div>
  )
}

/* Team Row Member (For Documentation & Media Teams) - VERY LIGHT DELICATE BORDER */
function TeamRowMember({ member, onSelect }) {
  return (
    <div
      className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-black/30 transition-all duration-300 group min-h-[72px] hover:border-green/40 hover:bg-black/50 team-card-subtle"
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
        <MemberAvatar member={member} size="small" onClick={onSelect} />
        <div className="min-w-0 flex-1 flex flex-col justify-center">
          <h5 
            onClick={onSelect}
            className="font-display font-bold text-sm uppercase text-text group-hover:text-green transition-colors cursor-pointer truncate leading-snug"
          >
            {member.name}
          </h5>
          <span className="font-mono text-[11px] text-text-dim font-semibold">{member.rollNo}</span>
        </div>
      </div>
      <span className="font-mono text-[10.5px] text-text-faint flex-shrink-0 font-medium">{member.phone}</span>
    </div>
  )
}

/* Compact Member Card (For Executive Members) - VERY LIGHT DELICATE BORDER */
function CompactMemberCard({ member, onSelect }) {
  return (
    <div
      className="p-4 rounded-2xl border border-white/10 bg-black/30 transition-all duration-300 flex items-center gap-3.5 group min-h-[76px] hover:border-green/40 hover:bg-black/50 team-card-subtle"
    >
      <MemberAvatar member={member} size="small" onClick={onSelect} />
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <h5 
          onClick={onSelect}
          className="font-display font-bold text-sm uppercase text-text truncate group-hover:text-green transition-colors cursor-pointer leading-snug"
        >
          {member.name}
        </h5>
        <div className="flex items-center gap-2 mt-0.5 font-mono text-[10.5px] text-text-dim">
          <span className="font-semibold text-green-bright">{member.rollNo}</span>
          {member.phone && (
            <>
              <span>&middot;</span>
              <span className="text-text-faint truncate font-medium">{member.phone}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
