import React from 'react'

const features = [
  {
    tag: '01 / DEVELOPMENT',
    title: 'Code. Build. Launch.',
    desc: 'Learn modern mobile app development through practical workshops, live coding sessions, and real-world projects that prepare you for internships and careers.',
    glow: 'rgba(0, 255, 102, 0.18)',
    border: 'rgba(0, 255, 102, 0.3)',
  },
  {
    tag: '02 / PROJECTS',
    title: 'Create Impactful Apps',
    desc: 'Work with talented peers to build innovative applications, contribute to open-source projects, and participate in national-level hackathons.',
    glow: 'rgba(0, 230, 118, 0.18)',
    border: 'rgba(0, 230, 118, 0.3)',
  },
  {
    tag: '03 / LEARNING',
    title: 'Master Modern Technologies',
    desc: 'Explore Flutter, Android, React Native, Firebase, REST APIs, GitHub, UI/UX, and cloud technologies through interactive technical sessions.',
    glow: 'rgba(57, 255, 20, 0.18)',
    border: 'rgba(57, 255, 20, 0.3)',
  },
  {
    tag: '04 / NETWORK',
    title: 'Connect & Collaborate',
    desc: 'Become part of an active developer community that encourages teamwork, mentorship, knowledge sharing, and continuous innovation.',
    glow: 'rgba(163, 230, 53, 0.18)',
    border: 'rgba(163, 230, 53, 0.3)',
  },
]

export default function ClubFeatures() {
  return (
    <section id="features" className="hero-bg relative py-16 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
      {/* Background glow effects */}
      <div 
        className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full pointer-events-none opacity-15 filter blur-[90px]"
        style={{ background: 'radial-gradient(circle, #00ff66, transparent)' }}
      />
      <div 
        className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full pointer-events-none opacity-15 filter blur-[90px]"
        style={{ background: 'radial-gradient(circle, #00e676, transparent)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-xs tracking-[0.3em] text-cyan uppercase">
            Inside the Club
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text mt-3 tracking-tight">
            Why <span className="text-gradient">Join Us</span>?
          </h2>
          <p className="font-body text-text-dim mt-4 max-w-xl text-base md:text-lg leading-relaxed">
            A startup-minded incubator designed to give you production-grade mobile engineering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
              style={{
                background: 'rgba(9, 11, 28, 0.45)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* Radial glow background that shows on hover */}
              <div 
                className="absolute inset-0 opacity-100 pointer-events-none transition-all duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, ${feat.glow}, transparent 65%)`
                }}
              />
              
              {/* Highlight borders on hover */}
              <div 
                className="absolute inset-0 border rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ borderColor: feat.border }}
              />

              <div className="relative z-10">
                <span className="font-mono text-xs text-text-faint tracking-wider block mb-4">
                  {feat.tag}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl text-text group-hover:text-cyan transition-colors duration-300">
                  {feat.title}
                </h3>
                <p className="font-body text-sm md:text-base text-text-dim mt-4 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              {/* Little bottom arrow indicator */}
              <div className="relative z-10 mt-8 flex items-center justify-end">
                <span className="w-8 h-8 rounded-full border border-text-faint/30 flex items-center justify-center text-text-dim group-hover:text-text group-hover:border-cyan group-hover:bg-cyan/10 transition-all duration-300">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="w-4 h-4 transform group-hover:translate-x-[2px] transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
