import type { HTMLAttributes } from 'react'
import { cx } from '../cx'
import './Kbd.css'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md'
}

export function Kbd({ size = 'md', className, ...rest }: KbdProps) {
  return <kbd className={cx('b-kbd', className)} data-size={size} {...rest} />
}

export function Shortcut({ keys, size = 'md', className }: { keys: string[]; size?: 'sm' | 'md'; className?: string }) {
  return (
    <span className={cx('b-shortcut', className)}>
      {keys.map((k) => (
        <Kbd key={k} size={size}>
          {k}
        </Kbd>
      ))}
    </span>
  )
}
