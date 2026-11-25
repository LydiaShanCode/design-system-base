import type { CSSProperties } from 'react'
import { cx } from '../cx'
import './Avatar.css'

export type AvatarSize = 16 | 20 | 24 | 32

const HUES = [22, 48, 142, 188, 212, 236, 262, 300, 340]

function hueOf(name: string) {
  let h = 0
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return HUES[h % HUES.length]
}

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

export interface AvatarProps {
  name?: string
  src?: string
  size?: AvatarSize
  className?: string
  style?: CSSProperties
}

export function Avatar({ name, src, size = 20, className, style }: AvatarProps) {
  if (!name && !src) {
    return (
      <span className={cx('b-avatar b-avatar--empty', className)} style={{ width: size, height: size, ...style }} role="img" aria-label="Unassigned">
        <svg viewBox="0 0 18 18" width={size} height={size} aria-hidden>
          <circle cx="9" cy="9" r="8" fill="none" strokeWidth="1.2" strokeDasharray="2 1.6" />
          <circle cx="9" cy="7.2" r="2.1" />
          <path d="M5.4 13.1a3.9 3.9 0 0 1 7.2 0z" />
        </svg>
      </span>
    )
  }
  const hue = hueOf(name ?? '')
  return (
    <span
      className={cx('b-avatar', className)}
      data-size={size}
      role="img"
      aria-label={name}
      style={{ width: size, height: size, ['--hue' as string]: hue, ...style }}
    >
      {src ? <img src={src} alt="" /> : initialsOf(name ?? '').slice(0, size <= 16 ? 1 : 2)}
    </span>
  )
}

export function AvatarGroup({ names, size = 20, max = 4, className }: { names: string[]; size?: AvatarSize; max?: number; className?: string }) {
  const shown = names.slice(0, max)
  const rest = names.length - shown.length
  return (
    <span className={cx('b-avatar-group', className)} data-size={size}>
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} />
      ))}
      {rest > 0 && (
        <span className="b-avatar b-avatar--more" data-size={size} style={{ width: size, height: size }}>
          +{rest}
        </span>
      )}
    </span>
  )
}
