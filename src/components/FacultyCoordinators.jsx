import React, { useState } from 'react'
import PhotoModal from './PhotoModal'

const facultyMembers = [
  {
    name: 'A.P.Ponselvakumar',
    designation: 'Assistant Professor (SLG)',
    role: 'Faculty Coordinator',
    image: '/faculty-vanitha.png',
    badge: 'Faculty Coordinator',
    color: '#00ff66',
    glow: 'rgba(0, 255, 102, 0.25)',
  },
  {
    name: 'P.Vanitha',
    designation: 'Assistant Professor',
    role: 'Faculty Coordinator',
    image: '/faculty-ponselvakumar.jpg',
    badge: 'Faculty Coordinator',
    color: '#00e676',
    glow: 'rgba(0, 230, 118, 0.25)',
  },
]

export default function FacultyCoordinators() {
  const [selectedFaculty, setSelectedFaculty] = useState(null)

  const handleNext = () => {
    if (!selectedFaculty) return
    const currentIndex = facultyMembers.findIndex(m => m.name === selectedFaculty.name)
    const nextIndex = (currentIndex + 1) % facultyMembers.length
    setSelectedFaculty(facultyMembers[nextIndex])
  }

  const handlePrev = () => {
    if (!selectedFaculty) return
    const currentIndex = facultyMembers.findIndex(m => m.name === selectedFaculty.name)
    const prevIndex = (currentIndex - 1 + facultyMembers.length) % facultyMembers.length
    setSelectedFaculty(facultyMembers[prevIndex])
  }

  return (
    <section id="faculty" className="relative py-24 px-6 md:px-16 lg:px-24 bg-[#09100c] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green/20 to-transparent" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-10 filter blur-[100px]"
        style={{ background: 'radial-gradient(circle, #00ff66, #00e676, transparent)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-green-bright uppercase">
            Mentorship & Leadership
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text mt-3 tracking-tight">
            Faculty <span className="text-gradient">Coordinators</span>
          </h2>
          <p className="font-body text-text-dim mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Guiding MADC students towards technical excellence, innovative problem solving, and industry readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {facultyMembers.map((member, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center p-8 md:p-10 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,255,102,0.15)] overflow-hidden"
              style={{
                background: 'rgba(5, 8, 6, 0.75)',
                borderColor: 'rgba(0, 255, 102, 0.15)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Card hover border glow */}
              <div 
                className="absolute inset-0 border rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ borderColor: member.color }}
              />

              {/* Photo Frame (Clickable for Modal) */}
              <div 
                className="relative mb-6 cursor-pointer group/photo"
                onClick={() => setSelectedFaculty(member)}
                title="Click to expand photo"
              >
                <div 
                  className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 p-1.5 transition-transform duration-500 group-hover/photo:scale-105 relative shadow-xl"
                  style={{
                    borderColor: member.color,
                    background: 'rgba(9, 16, 12, 0.8)',
                    boxShadow: `0 0 25px ${member.glow}`,
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover/photo:brightness-110"
                  />
                </div>
                
                {/* Floating Role Badge */}
                <span 
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9.5px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border shadow-lg whitespace-nowrap"
                  style={{
                    background: '#050806',
                    color: member.color,
                    borderColor: member.color,
                  }}
                >
                  {member.badge}
                </span>
              </div>

              {/* Text Info */}
              <div className="mt-3">
                <h3 className="font-display font-bold text-2xl text-text group-hover:text-green transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="font-mono text-xs font-semibold text-green-bright mt-1.5 tracking-wide">
                  {member.designation}
                </p>
                <p className="font-body text-xs text-text-dim mt-3 leading-relaxed">
                  Department of Information Technology
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div 
                className="w-12 h-[2px] rounded-full mt-6 opacity-60 group-hover:w-24 group-hover:opacity-100 transition-all duration-500"
                style={{ background: member.color }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Photo Modal */}
      {selectedFaculty && (
        <PhotoModal
          member={selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  )
}
