import { PageHeader, SectionTitle, TypeRow } from '../docs/ui'

export function FontFamilies() {
  return (
    <>
      <PageHeader title="Font families" />
      <div className="ds-families">
        <div className="ds-family">
          <span className="ds-family__glyph" style={{ fontFamily: 'var(--font-sans)' }}>
            Aa
          </span>
          <span className="ds-family__name">Inter Variable</span>
          <span className="ds-family__token">--font-sans · 400, 510, 590, 680</span>
          <span className="ds-family__set" style={{ fontFamily: 'var(--font-sans)' }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz 0123456789
          </span>
        </div>
        <div className="ds-family">
          <span className="ds-family__glyph" style={{ fontFamily: 'var(--font-mono)' }}>
            Aa
          </span>
          <span className="ds-family__name">System mono</span>
          <span className="ds-family__token">--font-mono · 400</span>
          <span className="ds-family__set" style={{ fontFamily: 'var(--font-mono)' }}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz 0123456789
          </span>
        </div>
      </div>
      <section className="ds-block">
        <SectionTitle>Weights</SectionTitle>
        <div className="ds-weights">
          {[
            ['Normal', 400],
            ['Medium', 510],
            ['Semibold', 590],
            ['Bold', 680],
          ].map(([name, w]) => (
            <div key={name} className="ds-weight">
              <span style={{ fontWeight: w }}>Ship it</span>
              <span className="ds-swatch__token">
                {name} · {w}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const HEADINGS: [string, string, string, string][] = [
  ['Title 1', '--title-1', '32 / 38 · 600', 'Plan the next cycle'],
  ['Title 2', '--title-2', '24 / 30 · 590', 'Plan the next cycle'],
  ['Title 3', '--title-3', '20 / 26 · 590', 'Plan the next cycle'],
  ['Title 4', '--title-4', '17 / 24 · 590', 'Plan the next cycle'],
]

export function Headings() {
  return (
    <>
      <PageHeader title="Headings" lead="Titles tighten as they grow. Click a row to copy its token." />
      <div className="ds-type-list">
        {HEADINGS.map(([label, token, meta, sample], i) => (
          <TypeRow key={token} label={label} token={token} meta={meta}>
            <span style={{ font: `var(${token})`, letterSpacing: ['-0.022em', '-0.018em', '-0.012em', '-0.008em'][i] }}>{sample}</span>
          </TypeRow>
        ))}
      </div>
    </>
  )
}

const TEXT: [string, string, string][] = [
  ['Large', '--text-large', '15 / 24 · body copy and descriptions'],
  ['Regular', '--text-regular', '14 / 20 · issue titles, comments'],
  ['Small', '--text-small', '13 / 20 · the default UI size'],
]

export function Text() {
  return (
    <>
      <PageHeader title="Text" lead="13px is the interface. Larger sizes are for reading. Click a row to copy its token." />
      <div className="ds-type-list">
        {TEXT.map(([label, token, meta]) => (
          <TypeRow key={token} label={label} token={token} meta={meta}>
            <span style={{ font: `var(${token})` }}>Fix the login redirect loop when a session expires mid-request.</span>
          </TypeRow>
        ))}
        <TypeRow label="Small medium" token="--weight-medium" meta="13 / 20 · 510 · buttons, nav, labels">
          <span style={{ font: 'var(--text-small)', fontWeight: 510 }}>Create issue</span>
        </TypeRow>
      </div>
    </>
  )
}

export function Caption() {
  return (
    <>
      <PageHeader title="Caption" lead="For metadata, shortcuts and counts. Click a row to copy its token." />
      <div className="ds-type-list">
        <TypeRow label="Mini" token="--text-mini" meta="12 / 16 · tabs, labels, tooltips">
          <span style={{ font: 'var(--text-mini)', color: 'var(--text-secondary)' }}>Updated 2 hours ago</span>
        </TypeRow>
        <TypeRow label="Micro" token="--text-micro" meta="11 / 16 · badges, keys, section labels">
          <span style={{ font: 'var(--text-micro)', fontWeight: 510, color: 'var(--text-secondary)' }}>ENG-142 · 3 sub-issues</span>
        </TypeRow>
      </div>
    </>
  )
}

export function Code() {
  return (
    <>
      <PageHeader title="Code" lead="Click a row to copy its token." />
      <div className="ds-type-list">
        <TypeRow label="Code regular" token="--code-regular" meta="13 / 20 · code blocks">
          <span style={{ font: 'var(--code-regular)' }}>git checkout -b lydia/eng-142-login-loop</span>
        </TypeRow>
        <TypeRow label="Code small" token="--code-small" meta="12 / 18 · inline code, IDs">
          <span style={{ font: 'var(--code-small)', color: 'var(--text-secondary)' }}>const issue = await base.issue('ENG-142')</span>
        </TypeRow>
      </div>
    </>
  )
}
