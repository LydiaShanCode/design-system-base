import { useId, type ReactNode } from 'react'
import { cx } from '../cx'
import './Checkbox.css'

export interface CheckboxProps {
  checked: boolean | 'mixed'
  onChange?: (checked: boolean) => void
  label?: ReactNode
  disabled?: boolean
  className?: string
}

export function Checkbox({ checked, onChange, label, disabled, className }: CheckboxProps) {
  const id = useId()
  const state = checked === 'mixed' ? 'mixed' : checked ? 'on' : 'off'
  return (
    <label className={cx('b-checkbox', className)} htmlFor={id} data-disabled={disabled || undefined}>
      <button
        id={id}
        type="button"
        role="checkbox"
        aria-checked={checked === 'mixed' ? 'mixed' : checked}
        disabled={disabled}
        className="b-checkbox__box"
        data-state={state}
        onClick={() => onChange?.(checked !== true)}
      >
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden>
          <path className="b-checkbox__check" d="M3.5 7.2 5.9 9.5l4.6-5" pathLength={1} />
          <path className="b-checkbox__dash" d="M4 7h6" />
        </svg>
      </button>
      {label != null && <span className="b-checkbox__label">{label}</span>}
    </label>
  )
}
