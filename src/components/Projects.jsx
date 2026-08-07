import React from 'react'

const projects = [
  {
    title: 'CampusMap',
    category: 'iOS / SWIFTUI / COREML',
    desc: 'An indoor navigation app using AR/LiDAR and CoreML to map university hallways and provide turn-by-turn indoor routing for students.',
    tags: ['SwiftUI', 'LiDAR', 'ARKit', 'CoreML'],
    color: '#00ff66',
    badge: 'Trending',
  },
  {
    title: 'LaundroTrack',
    category: 'ANDROID / KOTLIN / IOT',
    desc: 'An IoT dashboard and app integrated with laundry machines. Uses vibration sensors to send push notifications when laundry cycles are done.',
    tags: ['Kotlin', 'Firebase', 'Raspberry Pi', 'MQTT'],
    color: '#39ff14',
    badge: 'Popular',
  },
  {
    title: 'ClubConnect',
    category: 'CROSS-PLATFORM / FLUTTER',
    desc: 'The official campus activities hub. Featuring secure ticketing, group chats, live event mapping, and collaborative scheduling.',
    tags: ['Flutter', 'Dart', 'Node.js', 'MongoDB'],
    color: '#00e676',
    badge: 'New Release',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 md:px-16 lg:px-24 bg-[#090b1c] overflow-hidden">
      {/* Visual top border styling */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-text-faint/15 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-violet-bright uppercase">
            Innovation Labs
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text mt-3 tracking-tight">
            Shipped by <span className="text-gradient">Members</span>
          </h2>
          <p className="font-body text-text-dim mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Take a look at the open-source mobile projects built, tested, and published to the App Stores by our club cohorts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(3,4,10,0.4)]"
              style={{
                background: 'rgba(5, 6, 15, 0.65)',
                borderColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-[10px] tracking-wider text-text-faint uppercase">
                    {proj.category}
                  </span>
                  <span 
                    className="font-mono text-[9px] font-semibold tracking-widest uppercase px-[10px] py-[3px] rounded-full border"
                    style={{ 
                      color: proj.color, 
                      borderColor: `${proj.color}25`, 
                      background: `${proj.color}08` 
                    }}
                  >
                    {proj.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-text group-hover:text-cyan transition-colors duration-300">
                  {proj.title}
                </h3>
                <p className="font-body text-sm text-text-dim mt-4 leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-8 mb-6">
                  {proj.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="font-mono text-[10px] text-text-dim px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="font-mono text-xs text-text group-hover:text-cyan inline-flex items-center gap-[6px] transition-colors duration-300"
                >
                  View Code
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    className="w-3.5 h-3.5 transform group-hover:translate-x-[2px] transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
