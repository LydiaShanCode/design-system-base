import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../cx'
import './Input.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'md' | 'lg'
  icon?: ReactNode
  trailing?: ReactNode
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', icon, trailing, invalid, className, disabled, ...rest },
  ref,
) {
  return (
    <span className={cx('b-input', className)} data-size={size} data-invalid={invalid || undefined} data-disabled={disabled || undefined}>
      {icon && <span className="b-input__icon">{icon}</span>}
      <input ref={ref} className="b-input__field" disabled={disabled} aria-invalid={invalid || undefined} {...rest} />
      {trailing && <span className="b-input__trailing">{trailing}</span>}
    </span>
  )
})
