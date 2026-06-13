import { useCallback } from 'react'

const COLORS = [
  '#3b82f6', '#60a5fa', '#8b5cf6', '#a78bfa',
  '#ec4899', '#f472b6', '#f59e0b', '#fbbf24',
  '#10b981', '#34d399', '#06b6d4', '#38bdf8',
]

const SHAPES = ['circle', 'square', 'triangle', 'star']

function rand(min, max) { return min + Math.random() * (max - min) }

function spawnShockwave(cx, cy) {
  const el = document.createElement('div')
  el.className = 'particle-shockwave'
  el.style.cssText = `left:${cx}px;top:${cy}px;position:fixed;z-index:9997;`
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

function spawnGlow(cx, cy) {
  const el = document.createElement('div')
  el.className = 'particle-glow'
  el.style.cssText = `left:${cx}px;top:${cy}px;position:fixed;z-index:9996;`
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

function spawnMain(cx, cy, index, total) {
  const el = document.createElement('div')
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  const color = COLORS[index % COLORS.length]
  const size = rand(6, 12)
  const angle = (index / total) * 2 * Math.PI + rand(-0.25, 0.25)
  const dist = rand(50, 95)

  el.className = `particle particle-${shape}`
  el.style.cssText = `
    left:${cx}px; top:${cy}px;
    width:${size}px; height:${size}px;
    background:${shape === 'triangle' ? 'transparent' : color};
    --color:${color};
    --tx:${Math.cos(angle) * dist}px;
    --ty:${Math.sin(angle) * dist}px;
    --rot:${rand(0, 720)}deg;
    --dur:${rand(0.55, 0.9)}s;
    --delay:${rand(0, 0.07)}s;
    ${shape !== 'triangle' ? `box-shadow:0 0 ${size * 2}px ${color}90;` : ''}
    position:fixed; z-index:9999;
  `
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

function spawnTrail(cx, cy, index, total) {
  const el = document.createElement('div')
  const color = COLORS[(index + 4) % COLORS.length]
  const angle = (index / total) * 2 * Math.PI + rand(-0.5, 0.5)
  const dist = rand(18, 42)

  el.className = 'particle particle-trail'
  el.style.cssText = `
    left:${cx}px; top:${cy}px;
    width:4px; height:4px;
    background:${color};
    --tx:${Math.cos(angle) * dist}px;
    --ty:${Math.sin(angle) * dist}px;
    --rot:${rand(0, 360)}deg;
    --dur:${rand(0.35, 0.6)}s;
    --delay:${rand(0.06, 0.18)}s;
    opacity:0.75;
    position:fixed; z-index:9998;
  `
  document.body.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

export function useParticles() {
  const burst = useCallback((anchorEl) => {
    if (!anchorEl) return
    const rect = anchorEl.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    spawnShockwave(cx, cy)
    spawnGlow(cx, cy)
    for (let i = 0; i < 20; i++) spawnMain(cx, cy, i, 20)
    for (let i = 0; i < 14; i++) spawnTrail(cx, cy, i, 14)
  }, [])

  return burst
}
