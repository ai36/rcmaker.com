'use client'

import { useEffect, useRef } from 'react'

function rnd(min: number, max: number) { return min + Math.random() * (max - min) }

// ── Animated source ──────────────────────────────────────────────
function AnimatedSource({ dim = false }: { dim?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)
  const dotRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const baseX    = rnd(15, 80),  baseY    = rnd(10, 75)
    const ampX     = rnd(8, 18),   ampY     = rnd(5, 12)
    const freqX    = rnd(7.5e-5, 1.5e-4), freqY = rnd(1e-4, 2e-4)
    const spread    = rnd(25, 60)
    const rotSpeed  = rnd(0.0025, 0.0065)
    const rotOffset = rnd(0, 360)
    const offsets   = [0, -spread / 2, spread / 2]

    let raf: number
    const t0 = performance.now()

    function tick(now: number) {
      const t = now - t0
      const x = baseX + Math.sin(t * freqX) * ampX
      const y = baseY + Math.cos(t * freqY) * ampY
      const center = rotOffset + t * rotSpeed

      if (glowRef.current) {
        glowRef.current.style.left = `${x}%`
        glowRef.current.style.top  = `${y}%`
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${x}%`
        dotRef.current.style.top  = `${y}%`
      }
      if (containerRef.current) {
        containerRef.current.style.left = `${x}%`
        containerRef.current.style.top  = `${y}%`
        const beams = containerRef.current.children
        for (let i = 0; i < beams.length; i++) {
          ;(beams[i] as HTMLElement).style.transform = `rotate(${center + offsets[i]}deg)`
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const scale         = dim ? 0.6 : 1
  const beamOpacities = [0.42 * scale, 0.24 * scale, 0.15 * scale]
  const beamWidths    = [2, 1.5, 1]
  const beamHeights   = [70, 58, 46]
  const glowAlpha     = dim ? 0.11 : 0.18
  const glowSize      = dim ? 280 : 380

  return (
    <>
      {/* Glow */}
      <div
        ref={glowRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: `${glowSize}px`, height: `${glowSize}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, oklch(0.62 0.18 250 / ${glowAlpha}) 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }}
      />
      {/* Beams */}
      <div
        ref={containerRef}
        className="absolute pointer-events-none"
        style={{ width: 0, overflow: 'visible' }}
      >
        {beamOpacities.map((op, j) => (
          <div
            key={j}
            className="absolute"
            style={{
              top: 0, left: '-1px',
              width: `${beamWidths[j]}px`,
              height: `${beamHeights[j]}vh`,
              transformOrigin: 'top center',
              background: `linear-gradient(to bottom,
                oklch(0.62 0.18 250 / ${op}) 0%,
                oklch(0.63 0.14 254 / ${(op * 0.15).toFixed(2)}) 55%,
                transparent 100%)`,
            }}
          />
        ))}
      </div>
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '6px', height: '6px',
          transform: 'translate(-50%, -50%)',
          background: 'oklch(0.72 0.18 250 / 0.65)',
          boxShadow: '0 0 6px 2px oklch(0.62 0.18 250 / 0.35)',
        }}
      />
    </>
  )
}

// ── Main export ──────────────────────────────────────────────────
export function HeroBeams() {
  return (
    <>
      <AnimatedSource />
      <AnimatedSource dim />
      <AnimatedSource dim />
    </>
  )
}
