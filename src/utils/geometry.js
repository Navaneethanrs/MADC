import * as THREE from 'three'

/**
 * Builds a rounded-rectangle box by extruding a rounded 2D shape.
 * Looks far closer to a real phone chassis than a plain BoxGeometry.
 */
export function createRoundedBoxGeometry(w, h, d, r) {
  const shape = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2

  shape.moveTo(x, y + r)
  shape.lineTo(x, y + h - r)
  shape.quadraticCurveTo(x, y + h, x + r, y + h)
  shape.lineTo(x + w - r, y + h)
  shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r)
  shape.lineTo(x + w, y + r)
  shape.quadraticCurveTo(x + w, y, x + w - r, y)
  shape.lineTo(x + r, y)
  shape.quadraticCurveTo(x, y, x, y + r)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 4,
    curveSegments: 10,
  })
  geometry.center()
  return geometry
}

/** Draws the little "terminal" UI onto a canvas used as the phone screen texture. */
export function drawPhoneScreen(ctx, platform) {
  const w = 300
  const h = 610
  ctx.clearRect(0, 0, w, h)

  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, '#061009')
  bg.addColorStop(1, '#030704')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  ctx.fillStyle = 'rgba(0,255,102,0.6)'
  ctx.font = '500 13px monospace'
  ctx.fillText('9:41', 18, 30)

  // MADC Header text on phone screen
  ctx.fillStyle = '#00FF66'
  ctx.font = 'bold 12px monospace'
  ctx.fillText('MADC // MOBILE DEV', 130, 30)

  ctx.strokeStyle = 'rgba(0,255,102,0.06)'
  for (let y = 60; y < h; y += 28) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y)
    ctx.stroke()
  }

  const cardY = 220
  roundRect(ctx, 20, cardY, 260, 160, 14)
  ctx.fillStyle = 'rgba(0,255,102,0.04)'
  ctx.fill()
  roundRect(ctx, 20, cardY, 260, 160, 14)
  ctx.strokeStyle = 'rgba(0,255,102,0.2)'
  ctx.stroke()
  ;['#ff5f56', '#ffbd2e', '#00ff66'].forEach((c, i) => {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(38 + i * 16, cardY + 22, 4.5, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.fillStyle = platform.color
  ctx.font = '600 15px monospace'
  ctx.fillText('$ ' + platform.cmd, 34, cardY + 58)

  ctx.fillStyle = 'rgba(244,248,241,0.7)'
  ctx.font = '400 12px monospace'
  ctx.fillText('> compiling MADC ' + platform.label + '...', 34, cardY + 84)
  ctx.fillStyle = '#00FF66'
  ctx.fillText('> build status: SUCCESS', 34, cardY + 106)
  ctx.fillStyle = '#39FF14'
  ctx.fillText('> launching app in 0.4s', 34, cardY + 126)
  ctx.fillRect(34, cardY + 138, 8, 12)

  ctx.fillStyle = platform.color
  ctx.font = '700 22px sans-serif'
  ctx.textAlign = 'center'
  ctx.shadowColor = platform.color
  ctx.shadowBlur = 18
  ctx.fillText(platform.label, 150, 160)
  ctx.shadowBlur = 0
  ctx.textAlign = 'left'
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

/** Radial-gradient glow sprite texture, reused for the phone halo. */
export function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  grad.addColorStop(0, 'rgba(0,255,102,0.9)')
  grad.addColorStop(0.4, 'rgba(0,255,102,0.35)')
  grad.addColorStop(1, 'rgba(0,255,102,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)
  return c
}

/** Soft radial dot texture used for the particle field. */
export function makeDotTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 64
  const ctx = c.getContext('2d')
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, 'rgba(255,255,255,1)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 64, 64)
  return c
}
