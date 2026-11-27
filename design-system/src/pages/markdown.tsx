import { Check, Copy } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'
import { PageHeader, SectionTitle, useCopy } from '../docs/ui'

type Block =
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'code'; lang: string; text: string }

function parse(md: string): Block[] {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const out: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const body: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) body.push(lines[i++])
      i++
      out.push({ kind: 'code', lang, text: body.join('\n') })
    } else if (line.startsWith('# ')) {
      out.push({ kind: 'h1', text: line.slice(2).trim() })
      i++
    } else if (line.startsWith('## ')) {
      out.push({ kind: 'h2', text: line.slice(3).trim() })
      i++
    } else if (/^[-*] /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2).trim())
      out.push({ kind: 'ul', items })
    } else if (!line.trim()) {
      i++
    } else {
      const para: string[] = []
      while (i < lines.length && lines[i].trim() && !/^(#|```|[-*] )/.test(lines[i])) para.push(lines[i++].trim())
      out.push({ kind: 'p', text: para.join(' ') })
    }
  }
  return out
}

function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /`([^`]+)`|\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<code key={m.index} className="ds-md__inline">{m[1]}</code>)
    else if (m[2]) parts.push(<strong key={m.index}>{m[2]}</strong>)
    else parts.push(<a key={m.index} href={m[4]} target="_blank" rel="noreferrer" className="ds-md__link">{m[3]}</a>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function CodeBlock({ text }: { text: string }) {
  const { copied, copy } = useCopy()
  return (
    <div className="ds-example__frame ds-md__code">
      <div className="ds-example__bar">
        <span />
        <button type="button" className="ds-copy" onClick={() => copy(text)}>
          {copied === text ? <Check size={14} strokeWidth={1.75} /> : <Copy size={14} strokeWidth={1.75} />}
          {copied === text ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="ds-code">
        <code>{text}</code>
      </pre>
    </div>
  )
}

export function Markdown({ source }: { source: string }) {
  const blocks = parse(source)
  const title = blocks.find((b) => b.kind === 'h1') as { text: string } | undefined
  const leadIndex = blocks.findIndex((b) => b.kind === 'p')
  const firstH2 = blocks.findIndex((b) => b.kind === 'h2')
  const hasLead = leadIndex > -1 && (firstH2 === -1 || leadIndex < firstH2)
  const lead = hasLead ? (blocks[leadIndex] as { text: string }).text : undefined

  return (
    <div className="ds-md">
      {title && <PageHeader title={title.text} lead={lead && inline(lead)} />}
      {blocks.map((b, i) => {
        if (b.kind === 'h1' || (hasLead && i === leadIndex)) return <Fragment key={i} />
        if (b.kind === 'h2') return <div key={i} className="ds-md__section"><SectionTitle>{b.text}</SectionTitle></div>
        if (b.kind === 'p') return <p key={i} className="ds-md__p">{inline(b.text)}</p>
        if (b.kind === 'ul')
          return (
            <ul key={i} className="ds-md__ul">
              {b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}
            </ul>
          )
        return <CodeBlock key={i} text={b.text} />
      })}
    </div>
  )
}
