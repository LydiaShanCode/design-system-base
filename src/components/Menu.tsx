import { cloneElement, useEffect, useLayoutEffect, useRef, useState, type HTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { cx } from '../cx'
import { Shortcut } from './Kbd'
import './Menu.css'

export function MenuList({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div role="menu" className={cx('b-menu', className)} {...rest} />
}

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  icon?: ReactNode
  shortcut?: string[]
  checked?: boolean
  active?: boolean
  danger?: boolean
  disabled?: boolean
  onSelect?: () => void
}

export function MenuItem({ icon, shortcut, checked, active, danger, disabled, onSelect, className, children, ...rest }: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cx('b-menu__item', className)}
      data-active={active || undefined}
      data-danger={danger || undefined}
      onClick={onSelect}
      {...rest}
    >
      {icon && <span className="b-menu__icon">{icon}</span>}
      <span className="b-menu__text">{children}</span>
      {checked && (
        <svg className="b-menu__check" viewBox="0 0 14 14" width="14" height="14" aria-hidden>
          <path d="M3.5 7.2 5.9 9.5l4.6-5" />
        </svg>
      )}
      {shortcut && <Shortcut keys={shortcut} size="sm" className="b-menu__shortcut" />}
    </button>
  )
}

export function MenuSeparator() {
  return <div role="separator" className="b-menu__separator" />
}

export function MenuLabel({ children }: { children: ReactNode }) {
  return <div className="b-menu__label">{children}</div>
}

export interface MenuProps {
  trigger: ReactElement<{ onClick?: () => void; 'aria-expanded'?: boolean; 'aria-haspopup'?: string }>
  children: ReactNode
  align?: 'start' | 'end'
  width?: number
  className?: string
}

export function Menu({ trigger, children, align = 'start', width = 220, className }: MenuProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const root = useRef<HTMLSpanElement>(null)
  const list = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const items = [...(list.current?.querySelectorAll<HTMLButtonElement>('.b-menu__item:not(:disabled)') ?? [])]
        const i = items.indexOf(document.activeElement as HTMLButtonElement)
        const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length
        items[next]?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <span ref={root} className={cx('b-menu-root', className)}>
      {cloneElement(trigger, {
        onClick: () => setOpen((o) => !o),
        'aria-expanded': open,
        'aria-haspopup': 'menu',
      })}
      {mounted && (
        <div
          ref={list}
          className="b-menu-popover"
          data-open={open || undefined}
          data-align={align}
          style={{ width }}
          onTransitionEnd={(e) => {
            if (!open && e.propertyName === 'opacity') setMounted(false)
          }}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('.b-menu__item')) setOpen(false)
          }}
        >
          <MenuList>{children}</MenuList>
        </div>
      )}
    </span>
  )
}
