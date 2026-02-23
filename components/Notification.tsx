'use client'

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

export type NotifyFn = (msg: string, type?: 'success' | 'error') => void

export interface NotificationRef {
  notify: NotifyFn
}

const Notification = forwardRef<NotificationRef>((_, ref) => {
  const [visible, setVisible] = useState(false)
  const [msg, setMsg] = useState('')
  const [type, setType] = useState<'success' | 'error'>('success')

  useImperativeHandle(ref, () => ({
    notify(message: string, notifType: 'success' | 'error' = 'success') {
      setMsg(message)
      setType(notifType)
      setVisible(true)
      setTimeout(() => setVisible(false), 4000)
    }
  }))

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px', right: '48px',
        padding: '16px 24px',
        background: '#1A1A1A',
        border: `1px solid ${type === 'success' ? '#22c55e' : '#E8231A'}`,
        borderRadius: '4px',
        fontSize: '14px', fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: '12px',
        zIndex: 999,
        transform: visible ? 'translateY(0)' : 'translateY(120%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        maxWidth: '360px',
        fontFamily: "'Space Grotesk', sans-serif",
        color: '#F5F4F0',
      }}
    >
      <div style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: type === 'success' ? '#22c55e' : '#E8231A',
        flexShrink: 0,
      }} />
      {msg}
    </div>
  )
})

Notification.displayName = 'Notification'
export default Notification
