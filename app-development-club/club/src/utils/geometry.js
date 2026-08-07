import * as THREE from 'three'

/**
 * Builds a rounded-rectangle box geometry (used for the phone body) by
 * extruding a rounded-rect shape and beveling the edges slightly.
 */
export function createRoundedBoxGeometry(width, height, depth, radius = 0.08) {
  const shape = new THREE.Shape()
  const w = width / 2
  const h = height / 2
  const r = Math.min(radius, w, h)

  shape.moveTo(-w + r, -h)
  shape.lineTo(w - r, -h)
  shape.quadraticCurveTo(w, -h, w, -h + r)
  shape.lineTo(w, h - r)
  shape.quadraticCurveTo(w, h, w - r, h)
  shape.lineTo(-w + r, h)
  shape.quadraticCurveTo(-w, h, -w, h - r)
  shape.lineTo(-w, -h + r)
  shape.quadraticCurveTo(-w, -h, -w + r, -h)

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
    curveSegments: 12,
  })
  geometry.center()
  return geometry
}

/**
 * Draws a "terminal screen" onto a canvas for the given platform and returns
 * a THREE.CanvasTexture. Redraw + texture.needsUpdate = true on platform change.
 */
export function drawTerminalTexture(canvas, platform) {
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  ctx.clearRect(0, 0, w, h)

  const gradient = ctx.createLinearGradient(0, 0, 0, h)
  gradient.addColorStop(0, '#090b1c')
  gradient.addColorStop(1, '#05060f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)

  // status bar
  ctx.fillStyle = 'rgba(238, 240, 255, 0.35)'
  ctx.font = '500 22px "JetBrains Mono", monospace'
  ctx.fillText('9:41', 36, 56)
  ctx.fillStyle = platform.color
  ctx.beginPath()
  ctx.arc(w - 56, 44, 6, 0, Math.PI * 2)
  ctx.fill()

  // platform label
  ctx.fillStyle = '#eef0ff'
  ctx.font = '700 34px Sora, sans-serif'
  ctx.fillText(platform.label, 36, 130)

  ctx.fillStyle = 'rgba(139, 147, 184, 0.9)'
  ctx.font = '500 20px Inter, sans-serif'
  ctx.fillText(platform.note, 36, 164)

  // divider
  ctx.strokeStyle = 'rgba(139, 147, 184, 0.25)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(36, 200)
  ctx.lineTo(w - 36, 200)
  ctx.stroke()

  // terminal window
  const termY = 240
  ctx.fillStyle = 'rgba(9, 11, 28, 0.8)'
  roundRect(ctx, 36, termY, w - 72, h - termY - 60, 18)
  ctx.fill()
  ctx.strokeStyle = 'rgba(79, 125, 255, 0.25)'
  ctx.lineWidth = 1
  roundRect(ctx, 36, termY, w - 72, h - termY - 60, 18)
  ctx.stroke()

  // traffic lights
  const dotColors = ['#ff6b6b', '#ffd93d', '#6bffb0']
  dotColors.forEach((c, i) => {
    ctx.fillStyle = c
    ctx.beginPath()
    ctx.arc(66 + i * 26, termY + 32, 7, 0, Math.PI * 2)
    ctx.fill()
  })

  // prompt + command
  ctx.fillStyle = platform.color
  ctx.font = '600 22px "JetBrains Mono", monospace'
  ctx.fillText('$', 60, termY + 88)

  ctx.fillStyle = '#eef0ff'
  wrapMonoText(ctx, platform.command, 92, termY + 88, w - 160, 30)

  return ctx
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function wrapMonoText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ')
  let line = ''
  let lineY = y
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' '
    if (ctx.measureText(testLine).width > maxWidth && line !== '') {
      ctx.fillText(line, x, lineY)
      line = words[i] + ' '
      lineY += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line, x, lineY)
}
