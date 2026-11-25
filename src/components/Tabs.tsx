import type { ReactNode } from 'react'
import { cx } from '../cx'
import './Tabs.css'

export interface TabItem {
  value: string
  label: ReactNode
  icon?: ReactNode
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange?: (value: string) => void
  className?: string
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div className={cx('b-tabs', className)} role="tablist">
      {items.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          aria-selected={t.value === value}
          className="b-tabs__tab"
          data-active={t.value === value || undefined}
          onClick={() => onChange?.(t.value)}
        >
          {t.icon && <span className="b-tabs__icon">{t.icon}</span>}
          {t.label}
        </button>
      ))}
    </div>
  )
}
