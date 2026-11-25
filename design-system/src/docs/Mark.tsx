export function Mark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden className="ds-mark">
      <path d="M2 11a8 8 0 0 1 16 0z" fill="currentColor" />
      <rect x="2" y="13.5" width="16" height="3.5" rx="1.75" fill="currentColor" />
    </svg>
  )
}
