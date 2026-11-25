import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx'
import './Badge.css'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'danger'
}

export function Badge({ tone = 'neutral', className, ...rest }: BadgeProps) {
  return <span className={cx('b-badge', className)} data-tone={tone} {...rest} />
}

export type LabelColor = 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'gray'

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  color: LabelColor
  children: ReactNode
}

export function Label({ color, className, children, ...rest }: LabelProps) {
  return (
    <span className={cx('b-label', className)} {...rest}>
      <span className="b-label__dot" style={{ background: `var(--label-${color})` }} />
      {children}
    </span>
  )
}
