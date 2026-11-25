import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cx } from '../cx'
import { Shortcut } from './Kbd'
import './Tooltip.css'

const DELAY = 500
const WARM_FOR = 600
let lastClosed = 0

export interface TooltipProps {
  content: ReactNode
  shortcut?: string[]
  side?: 'top' | 'bottom'
  children: ReactNode
  className?: string
}

export function Tooltip({ content, shortcut, side = 'top', children, className }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const [instant, setInstant] = useState(false)
  const timer = useRef<number>()

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const show = () => {
    window.clearTimeout(timer.current)
    const warm = performance.now() - lastClosed < WARM_FOR
    setInstant(warm)
    if (warm) setOpen(true)
    else timer.current = window.setTimeout(() => setOpen(true), DELAY)
  }

  const hide = () => {
    window.clearTimeout(timer.current)
    setOpen((was) => {
      if (was) lastClosed = performance.now()
      return false
    })
  }

  return (
    <span className={cx('b-tooltip-root', className)} onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <span role="tooltip" className="b-tooltip" data-side={side} data-open={open || undefined} data-instant={instant || undefined}>
        {content}
        {shortcut && <Shortcut keys={shortcut} size="sm" />}
      </span>
    </span>
  )
}
