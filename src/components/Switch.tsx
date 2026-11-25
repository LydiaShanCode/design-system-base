import { useId, type ReactNode } from 'react'
import { cx } from '../cx'
import './Switch.css'

export interface SwitchProps {
  checked: boolean
  onChange?: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}

export function Switch({ checked, onChange, label, disabled, size = 'md', className }: SwitchProps) {
  const id = useId()
  return (
    <label className={cx('b-switch', className)} htmlFor={id} data-disabled={disabled || undefined}>
      {label != null && <span className="b-switch__label">{label}</span>}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className="b-switch__track"
        data-size={size}
        data-state={checked ? 'on' : 'off'}
        onClick={() => onChange?.(!checked)}
      >
        <span className="b-switch__thumb" />
      </button>
    </label>
  )
}
