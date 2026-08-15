import React, { useState } from 'react'
import PhotoModal from './PhotoModal'

export default function ClubSecretary() {
  const [showModal, setShowModal] = useState(false)

  const secretaryMember = {
    name: 'HARISH KANNAN N',
    rollNo: '23CSR077',
    phone: '8667577236',
    posting: 'SECRETARY',
    category: 'Core Executive Leadership',
    image: '/secretary-harish.png',
    initials: 'HK',
    color: '#00ff66',
    glow: 'rgba(0, 255, 102, 0.4)',
  }

  return (
    <section id="secretary" className="relative py-20 px-6 md:px-16 lg:px-24 bg-void overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green/30 to-transparent" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full pointer-events-none opacity-15 filter blur-[110px]"
        style={{ background: 'radial-gradient(circle, #00ff66, #39ff14, transparent)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="font-mono text-xs tracking-[0.35em] text-green-bright uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-ping" />
            Student Executive Leadership
          </span>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-text mt-3 tracking-tight">
            Club <span className="text-gradient">Secretary</span>
          </h2>
          <p className="font-body text-text-dim mt-3 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Bridging faculty guidance with student execution to lead MADC toward continuous innovation.
          </p>
        </div>

        {/* Executive Profile Card */}
        <div 
          className="group relative p-8 md:p-12 rounded-3xl border flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-500 hover:border-green hover:shadow-[0_0_50px_rgba(0,255,102,0.2)] overflow-hidden"
          style={{
            background: 'rgba(9, 16, 12, 0.75)',
            borderColor: 'rgba(0, 255, 102, 0.25)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Subtle card radial shine */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-500"
            style={{
              background: 'radial-gradient(circle at 20% 20%, rgba(0, 255, 102, 0.15) 0%, transparent 60%)'
            }}
          />

          {/* Secretary Image (Clickable for Photo Modal) */}
          <div 
            className="relative flex-shrink-0 cursor-pointer group/photo"
            onClick={() => setShowModal(true)}
            title="Click to view photo in high resolution"
          >
            <div 
              className="w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 p-1.5 transition-transform duration-500 group-hover/photo:scale-105 relative"
              style={{
                borderColor: '#00ff66',
                background: 'rgba(5, 8, 6, 0.9)',
                boxShadow: '0 0 30px rgba(0, 255, 102, 0.3)',
              }}
            >
              <img
                src="/secretary-harish.png"
                alt="Harish Kannan"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover/photo:brightness-110"
              />
            </div>

            {/* Glowing Executive Badge */}
            <span 
              className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-extrabold tracking-widest uppercase px-4 py-1.2 rounded-full border shadow-xl whitespace-nowrap"
              style={{
                background: '#050806',
                color: '#00ff66',
                borderColor: '#00ff66',
                boxShadow: '0 0 15px rgba(0,255,102,0.4)',
              }}
            >
              CLUB SECRETARY
            </span>
          </div>

          {/* Content & Details */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-text group-hover:text-green transition-colors duration-300">
                  Harish Kannan
                </h3>
                <p className="font-mono text-xs font-bold text-green-bright mt-1 tracking-wider uppercase">
                  Club Secretary & Executive Student Lead
                </p>
              </div>
            </div>

            <p className="font-body text-xs md:text-sm text-text-dim mt-2 tracking-wide font-medium">
              Department of Computer Science & Engineering (CSE)
            </p>

            <blockquote className="font-body italic text-sm md:text-base text-text/90 mt-5 pt-5 border-t border-white/10 leading-relaxed">
              "Empowering student developers to build impactful mobile solutions, collaborate seamlessly, and push the boundaries of software innovation."
            </blockquote>

            {/* Core Leadership Focus */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6">
              {['Executive Leadership', 'Mobile App Architecture', 'Technical Operations', 'Community Growth'].map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="font-mono text-[10px] text-green-bright px-3 py-1 rounded-lg border"
                  style={{
                    background: 'rgba(0, 255, 102, 0.05)',
                    borderColor: 'rgba(0, 255, 102, 0.2)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Photo Popup */}
      {showModal && (
        <PhotoModal
          member={secretaryMember}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  )
}
