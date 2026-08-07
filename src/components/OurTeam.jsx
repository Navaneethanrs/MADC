import React from 'react'

const studentTeam = [
  {
    name: 'Student Tech Lead',
    role: 'Android & Flutter Lead',
    dept: '3rd Year, CSE',
    skills: ['Flutter', 'Kotlin', 'Firebase'],
    initials: 'TL',
    color: '#00ff66',
  },
  {
    name: 'iOS Lead Developer',
    role: 'SwiftUI & iOS Lead',
    dept: '3rd Year, IT',
    skills: ['SwiftUI', 'CoreML', 'Xcode'],
    initials: 'IL',
    color: '#39ff14',
  },
  {
    name: 'UI/UX Design Lead',
    role: 'Design & Aesthetics Lead',
    dept: '3rd Year, CSE',
    skills: ['Figma', 'Prototyping', 'Design Systems'],
    initials: 'DL',
    color: '#00e676',
  },
  {
    name: 'Events & Operations Lead',
    role: 'Hackathons & Community Lead',
    dept: '3rd Year, IT',
    skills: ['Event Mgmt', 'Public Relations', 'Logistics'],
    initials: 'EL',
    color: '#a3e635',
  },
]

export default function OurTeam() {
  return (
    <section id="team" className="relative py-24 px-6 md:px-16 lg:px-24 bg-void overflow-hidden">
      {/* Background ambient decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-text-faint/15 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-green-bright uppercase">
            Student Leadership
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text mt-3 tracking-tight">
            Our <span className="text-gradient">Team</span>
          </h2>
          <p className="font-body text-text-dim mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            The passionate student developers and designers driving workshops, hackathons, and projects at MADC.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentTeam.map((member, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center p-6 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:border-green hover:shadow-[0_15px_30px_rgba(0,255,102,0.12)]"
              style={{
                background: 'rgba(9, 16, 12, 0.55)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Avatar Initial Badge */}
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-2xl text-void mb-5 shadow-lg transform transition-transform group-hover:scale-105"
                style={{ background: member.color }}
              >
                {member.initials}
              </div>

              <h3 className="font-display font-bold text-xl text-text group-hover:text-green transition-colors duration-300">
                {member.name}
              </h3>
              
              <span className="font-mono text-xs font-semibold text-green-bright mt-1">
                {member.role}
              </span>

              <span className="font-body text-xs text-text-dim mt-1">
                {member.dept}
              </span>

              {/* Skills pills */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-5">
                {member.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-mono text-[9.5px] text-text-dim px-2.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
