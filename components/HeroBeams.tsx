'use client'

import { useEffect, useRef } from 'react'

function rnd(min: number, max: number) { return min + Math.random() * (max - min) }

const SOURCES = [
  { dim: false },
  { dim: true },
  { dim: true },
] as const

const FRAME_INTERVAL = 1000 / 30

export function HeroBeams() {
  const rootRef   = useRef<HTMLDivElement>(null)
  const moverRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const beamRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const params = SOURCES.map(() => {
      const spread = rnd(25, 60)
      return {
        baseX:     rnd(15, 80),
        baseY:     rnd(10, 75),
        ampX:      rnd(8, 18),
        ampY:      rnd(5, 12),
        freqX:     rnd(7.5e-5, 1.5e-4),
        freqY:     rnd(1e-4, 2e-4),
        rotSpeed:  rnd(0.0025, 0.0065),
        rotOffset: rnd(0, 360),
        offsets:   [0, -spread / 2, spread / 2] as [number, number, number],
      }
    })

    // Hand beam rotation off to CSS — compositor-thread, zero JS per frame
    for (let i = 0; i < SOURCES.length; i++) {
      const p = params[i]
      const durationMs = 360 / p.rotSpeed
      const container = beamRefs.current[i]
      if (!container) continue
      for (let j = 0; j < container.children.length; j++) {
        const beam = container.children[j] as HTMLElement
        const startAngle = p.rotOffset + p.offsets[j]
        beam.style.animation = `hero-spin ${durationMs.toFixed(0)}ms linear infinite`
        beam.style.animationDelay = `${(-(startAngle / 360) * durationMs).toFixed(0)}ms`
      }
    }

    // JS only drives the slow sinusoidal float
    let raf: number
    let running = false
    let lastFrame = 0
    const t0 = performance.now()

    function tick(now: number) {
      raf = requestAnimationFrame(tick)
      if (now - lastFrame < FRAME_INTERVAL) return
      lastFrame = now
      const t = now - t0
      for (let i = 0; i < SOURCES.length; i++) {
        const p = params[i]
        const x = p.baseX + Math.sin(t * p.freqX) * p.ampX
        const y = p.baseY + Math.cos(t * p.freqY) * p.ampY
        const mover = moverRefs.current[i]
        if (mover) mover.style.transform = `translate(${x}%, ${y}%)`
      }
    }

    function start() {
      if (running) return
      running = true
      raf = requestAnimationFrame(tick)
    }

    function stop() {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
    }

    start()

    // Pause when tab is hidden
    const onVisibility = () => document.hidden ? stop() : start()
    document.addEventListener('visibilitychange', onVisibility)

    // Pause when hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting ? start() : stop(),
      { threshold: 0 }
    )
    if (rootRef.current) observer.observe(rootRef.current)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`@keyframes hero-spin { to { transform: rotate(360deg) } }`}</style>
      <div ref={rootRef} className="absolute inset-0 overflow-visible pointer-events-none">
        {SOURCES.map((src, i) => {
          const scale       = src.dim ? 0.6 : 1
          const opacities   = [0.42 * scale, 0.24 * scale, 0.15 * scale]
          const glowAlpha   = src.dim ? 0.11 : 0.18
          const glowSize    = src.dim ? 280 : 380
          const beamWidths  = [2, 1.5, 1]
          const beamHeights = [70, 58, 46]

          return (
            <div key={i} className="absolute inset-0 overflow-visible">
              <div
                ref={el => { moverRefs.current[i] = el }}
                className="absolute left-0 top-0 w-full h-full"
                style={{ willChange: 'transform' }}
              >
                {/* Glow */}
                <div
                  className="absolute rounded-full"
                  style={{
                    left: 0, top: 0,
                    width: `${glowSize}px`, height: `${glowSize}px`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, oklch(0.62 0.18 250 / ${glowAlpha}) 0%, transparent 65%)`,
                    filter: 'blur(40px)',
                  }}
                />

                {/* Beams — rotated via CSS animation set in useEffect */}
                <div
                  ref={el => { beamRefs.current[i] = el }}
                  className="absolute"
                  style={{ left: 0, top: 0, width: 0, overflow: 'visible' }}
                >
                  {opacities.map((op, j) => (
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
                  className="absolute rounded-full"
                  style={{
                    left: 0, top: 0,
                    width: '6px', height: '6px',
                    transform: 'translate(-50%, -50%)',
                    background: 'oklch(0.72 0.18 250 / 0.65)',
                    boxShadow: '0 0 6px 2px oklch(0.62 0.18 250 / 0.35)',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
