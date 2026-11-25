import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from '../cx'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ReactNode
  trailing?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', icon, trailing, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cx('b-button', className)} data-variant={variant} data-size={size} {...rest}>
      {icon && <span className="b-button__icon">{icon}</span>}
      {children != null && <span className="b-button__label">{children}</span>}
      {trailing && <span className="b-button__trailing">{trailing}</span>}
    </button>
  )
})

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Exclude<ButtonVariant, 'danger'>
  size?: ButtonSize
  label: string
  children: ReactNode
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant = 'ghost', size = 'md', label, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} aria-label={label} className={cx('b-button b-button--icon', className)} data-variant={variant} data-size={size} {...rest}>
      {children}
    </button>
  )
})
