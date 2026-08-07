import React from 'react'

const achievements = [
  {
    number: '1st Place',
    title: 'Smart India Hackathon Winners',
    desc: 'Awarded 1st place for developing an AI-assisted emergency response mobile application for smart cities.',
    tag: 'NATIONAL AWARD',
    color: '#00ff66',
  },
  {
    number: '50,000+',
    title: 'Combined App Downloads',
    desc: 'Student-built mobile applications published to Google Play and Apple App Store reached over 50k active users globally.',
    tag: 'PRODUCTION METRIC',
    color: '#39ff14',
  },
  {
    number: '15+ Apps',
    title: 'Shipped to App Stores',
    desc: 'From campus utility tools to open-source developer libraries, MADC cohorts successfully published 15+ production apps.',
    tag: 'STORE LAUNCHES',
    color: '#00e676',
  },
  {
    number: 'GSoC & Top Tech',
    title: 'Alumni Career Impact',
    desc: 'MADC members selected for Google Summer of Code (GSoC) and placed as mobile engineers at top tech companies.',
    tag: 'ALUMNI SUCCESS',
    color: '#a3e635',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 px-6 md:px-16 lg:px-24 bg-[#09100c] overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green/20 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-green-bright uppercase">
            Milestones & Honors
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text mt-3 tracking-tight">
            Our <span className="text-gradient">Achievements</span>
          </h2>
          <p className="font-body text-text-dim mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Celebrating national hackathon victories, app store launches, and career accomplishments of MADC members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between p-7 rounded-3xl border transition-all duration-500 hover:-translate-y-2 hover:border-green hover:shadow-[0_15px_30px_rgba(0,255,102,0.12)]"
              style={{
                background: 'rgba(5, 8, 6, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div>
                <span 
                  className="font-mono text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md border inline-block mb-6"
                  style={{
                    color: item.color,
                    borderColor: `${item.color}30`,
                    background: `${item.color}08`,
                  }}
                >
                  {item.tag}
                </span>

                <h3 className="font-display font-extrabold text-3xl text-text group-hover:text-green transition-colors duration-300">
                  {item.number}
                </h3>
                
                <h4 className="font-display font-semibold text-lg text-text mt-2">
                  {item.title}
                </h4>

                <p className="font-body text-xs text-text-dim mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-faint group-hover:text-green transition-colors">
                <span>VERIFIED MILESTONE</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
