'use client'

import { useEffect, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(onDone, 300)
      }
      setPct(Math.floor(p))
    }, 80)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      id="loader"
      style={{
        position: 'fixed', inset: 0,
        background: '#0A0A0A',
        zIndex: 9990,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '24px',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{ fontSize: '72px', fontWeight: 700, letterSpacing: '-0.04em', color: '#F5F4F0' }}>
        FORMA
      </div>
      <div style={{ width: '240px', height: '1px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#E8231A', transition: 'width 0.1s' }} />
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#8A8A8A', letterSpacing: '0.1em' }}>
        {pct}%
      </div>
    </div>
  )
}
