'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      id="nav"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 48px', height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'border-color 0.4s, background 0.4s',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <a href="#" style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.04em', color: '#F5F4F0', textDecoration: 'none' }}>
        FORM<span style={{ color: '#E8231A' }}>A</span>
      </a>
      <ul style={{ display: 'flex', alignItems: 'center', gap: '40px', listStyle: 'none' }}>
        {['Features', 'Tools', 'Privacy', 'How It Works'].map(item => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(' ', '')}`}
              style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8A8A8A', textDecoration: 'none' }}
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#tools"
            style={{ padding: '10px 24px', background: '#E8231A', color: '#F5F4F0', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none' }}
          >
            Use Free
          </a>
        </li>
      </ul>
    </nav>
  )
}
