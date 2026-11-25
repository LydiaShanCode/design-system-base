import { Check, ChevronRight, Copy } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Badge } from 'design-system-base'

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopied(text)
    window.setTimeout(() => setCopied((c) => (c === text ? null : c)), 1200)
  }
  return { copied, copy }
}

export function PageHeader({ title, lead }: { title: string; lead?: ReactNode }) {
  return (
    <header className="ds-header">
      <h1 className="ds-title">{title}</h1>
      {lead && <p className="ds-lead">{lead}</p>}
    </header>
  )
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="ds-section-title">{children}</h2>
}

export function Example({ title, code, children, align = 'center', stack }: { title?: string; code: string; children: ReactNode; align?: 'center' | 'start'; stack?: boolean }) {
  const [open, setOpen] = useState(false)
  const { copied, copy } = useCopy()
  return (
    <section className="ds-example">
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className="ds-example__frame">
        <div className="ds-example__preview" data-align={align} data-stack={stack || undefined}>
          {children}
        </div>
        <div className="ds-example__bar">
          <button type="button" className="ds-disclose" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <ChevronRight size={14} strokeWidth={1.75} className="ds-disclose__chev" data-open={open || undefined} />
            Show code
          </button>
          {open && (
            <button type="button" className="ds-copy" onClick={() => copy(code)}>
              {copied === code ? <Check size={14} strokeWidth={1.75} /> : <Copy size={14} strokeWidth={1.75} />}
              {copied === code ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
        {open && (
          <pre className="ds-code">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </section>
  )
}

export function SwatchGrid({ children }: { children: ReactNode }) {
  return <div className="ds-swatches">{children}</div>
}

export function Swatch({ token, name, children, value }: { token: string; name: string; value?: string; children?: ReactNode }) {
  const { copied, copy } = useCopy()
  return (
    <button type="button" className="ds-swatch" onClick={() => copy(token)} title={`Copy ${token}`}>
      <span className="ds-swatch__value">{children ?? <span className="ds-swatch__fill" style={{ background: `var(${token})` }} />}</span>
      <span className="ds-swatch__meta">
        <span className="ds-swatch__name">
          {name}
          {copied === token && <Badge>Copied</Badge>}
        </span>
        <span className="ds-swatch__token">{token}</span>
        {value && <span className="ds-swatch__raw">{value}</span>}
      </span>
    </button>
  )
}

export function Specs({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="ds-specs">
      {rows.map(([k, v]) => (
        <div key={k} className="ds-specs__row">
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function TypeRow({ label, token, meta, children }: { label: string; token: string; meta: string; children: ReactNode }) {
  const { copied, copy } = useCopy()
  return (
    <button type="button" className="ds-type-row" onClick={() => copy(token)}>
      <span className="ds-type-row__meta">
        <span className="ds-type-row__label">
          {label}
          {copied === token && <Badge>Copied</Badge>}
        </span>
        <span className="ds-type-row__token">{token}</span>
        <span className="ds-type-row__size">{meta}</span>
      </span>
      <span className="ds-type-row__specimen">{children}</span>
    </button>
  )
}
