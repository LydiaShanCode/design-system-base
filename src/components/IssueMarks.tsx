import { cx } from '../cx'
import './IssueMarks.css'

export type Status = 'backlog' | 'todo' | 'progress' | 'done' | 'canceled'

export const statusLabel: Record<Status, string> = {
  backlog: 'Backlog',
  todo: 'Todo',
  progress: 'In Progress',
  done: 'Done',
  canceled: 'Canceled',
}

export function StatusIcon({ status, size = 14, className }: { status: Status; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 14 14', role: 'img', 'aria-label': statusLabel[status] }
  if (status === 'backlog') {
    return (
      <svg {...common} className={cx('b-status', className)} data-status="backlog">
        <circle cx="7" cy="7" r="5.5" fill="none" strokeWidth="1.5" strokeDasharray="2.1 1.5" />
      </svg>
    )
  }
  if (status === 'done' || status === 'canceled') {
    return (
      <svg {...common} className={cx('b-status', className)} data-status={status}>
        <circle cx="7" cy="7" r="6.25" />
        {status === 'done' ? (
          <path d="M4.4 7.2 6.2 9l3.4-3.6" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M5 5l4 4M9 5l-4 4" fill="none" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    )
  }
  return (
    <svg {...common} className={cx('b-status', className)} data-status={status}>
      <circle className="b-status__ring" cx="7" cy="7" r="5.5" fill="none" strokeWidth="1.5" />
      <circle className="b-status__pie" cx="7" cy="7" r="1.75" fill="none" strokeWidth="3.5" pathLength={100} transform="rotate(-90 7 7)" />
    </svg>
  )
}

export type Priority = 0 | 1 | 2 | 3 | 4

export const priorityLabel: Record<Priority, string> = {
  0: 'No priority',
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Urgent',
}

export function PriorityIcon({ level, size = 14, className }: { level: Priority; size?: number; className?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 14 14', role: 'img', 'aria-label': priorityLabel[level] }
  if (level === 0) {
    return (
      <svg {...common} className={cx('b-priority', className)} data-level="0">
        {[2, 6, 10].map((x) => (
          <rect key={x} x={x - 0.75} y="6.25" width="2.5" height="1.5" rx="0.5" />
        ))}
      </svg>
    )
  }
  if (level === 4) {
    return (
      <svg {...common} className={cx('b-priority', className)} data-level="4">
        <rect x="1" y="1" width="12" height="12" rx="3" />
        <rect className="b-priority__mark" x="6.25" y="3.5" width="1.5" height="4.5" rx="0.75" />
        <rect className="b-priority__mark" x="6.25" y="9.25" width="1.5" height="1.5" rx="0.75" />
      </svg>
    )
  }
  return (
    <svg {...common} className={cx('b-priority', className)} data-level={level}>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={1.5 + i * 4} y={8 - i * 3} width="3" height={4 + i * 3} rx="1" data-on={i < level || undefined} />
      ))}
    </svg>
  )
}
