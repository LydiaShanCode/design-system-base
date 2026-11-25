import type { HTMLAttributes } from 'react'
import { cx } from '../cx'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'low' | 'medium'
  padding?: 'none' | 'md' | 'lg'
}

export function Card({ elevation = 'low', padding = 'md', className, ...rest }: CardProps) {
  return <div className={cx('b-card', className)} data-elevation={elevation} data-padding={padding} {...rest} />
}
