import { Card } from 'design-system-base'
import { Mark } from '../docs/Mark'
import { PageHeader, SectionTitle, Swatch, SwatchGrid } from '../docs/ui'

export function Brand() {
  return (
    <>
      <PageHeader title="Brand" />
      <div className="ds-brand">
        <div className="ds-brand__tile" data-ground="surface">
          <Mark size={56} />
        </div>
        <div className="ds-brand__tile" data-ground="inverse">
          <Mark size={56} />
        </div>
        <div className="ds-brand__tile ds-brand__tile--wide" data-ground="surface">
          <span className="ds-wordmark">
            <Mark size={32} />
            Base
          </span>
        </div>
      </div>
    </>
  )
}

const COLORS: { group: string; tokens: [string, string][] }[] = [
  {
    group: 'Surfaces',
    tokens: [
      ['--bg-well', 'Well'],
      ['--bg-canvas', 'Canvas'],
      ['--bg-surface', 'Surface'],
      ['--bg-raised', 'Raised'],
      ['--bg-hover', 'Hover'],
      ['--bg-selected', 'Selected'],
    ],
  },
  {
    group: 'Text',
    tokens: [
      ['--text-primary', 'Primary'],
      ['--text-secondary', 'Secondary'],
      ['--text-tertiary', 'Tertiary'],
      ['--text-on-accent', 'On accent'],
    ],
  },
  {
    group: 'Icons',
    tokens: [
      ['--icon-default', 'Icon'],
      ['--icon-faint', 'Icon faint'],
    ],
  },
  {
    group: 'Accent',
    tokens: [
      ['--accent', 'Accent'],
      ['--accent-hover', 'Accent hover'],
      ['--accent-soft', 'Accent soft'],
      ['--accent-text', 'Accent text'],
      ['--focus-ring', 'Focus ring'],
    ],
  },
  {
    group: 'Borders',
    tokens: [
      ['--border-faint', 'Faint'],
      ['--border-default', 'Default'],
      ['--border-strong', 'Strong'],
    ],
  },
  {
    group: 'Status',
    tokens: [
      ['--status-backlog', 'Backlog'],
      ['--status-todo', 'Todo'],
      ['--status-progress', 'In Progress'],
      ['--status-done', 'Done'],
      ['--status-canceled', 'Canceled'],
      ['--danger', 'Danger'],
      ['--warning', 'Urgent'],
    ],
  },
  {
    group: 'Labels',
    tokens: [
      ['--label-red', 'Red'],
      ['--label-orange', 'Orange'],
      ['--label-yellow', 'Yellow'],
      ['--label-green', 'Green'],
      ['--label-teal', 'Teal'],
      ['--label-blue', 'Blue'],
      ['--label-indigo', 'Indigo'],
      ['--label-purple', 'Purple'],
      ['--label-gray', 'Gray'],
    ],
  },
]

export function Colors() {
  return (
    <>
      <PageHeader title="Colors" lead="Warm-neutral grays in one family. Color is kept for the accent, status marks and labels. Click a card to copy its token." />
      {COLORS.map((g) => (
        <section key={g.group} className="ds-block">
          <SectionTitle>{g.group}</SectionTitle>
          <SwatchGrid>
            {g.tokens.map(([token, name]) => (
              <Swatch key={token} token={token} name={name} />
            ))}
          </SwatchGrid>
        </section>
      ))}
    </>
  )
}

const RADII: [string, string, string][] = [
  ['--radius-xs', 'Extra small', '4px · checkboxes, badges, keys'],
  ['--radius-sm', 'Small', '6px · buttons, inputs, tabs'],
  ['--radius-md', 'Medium', '8px · menu rows, nested cards'],
  ['--radius-lg', 'Large', '12px · cards, menus'],
  ['--radius-xl', 'Extra large', '16px · dialogs'],
  ['--radius-full', 'Full', 'Pills, avatars, switches'],
]

export function Radius() {
  return (
    <>
      <PageHeader title="Radius" lead="Click a card to copy its token." />
      <SwatchGrid>
        {RADII.map(([token, name, use]) => (
          <Swatch key={token} token={token} name={name} value={use}>
            <span className="ds-radius-demo" style={{ borderRadius: `var(${token})` }} />
          </Swatch>
        ))}
      </SwatchGrid>
      <section className="ds-block">
        <SectionTitle>Nested radius</SectionTitle>
        <p className="ds-prose">A child always has a smaller radius than its parent: the parent's radius minus the inset, or the parent's minus 4px when the inset is as large as the radius. Never below 4px.</p>
        <div className="ds-nested">
          <div className="ds-nested__parent" style={{ padding: 4 }}>
            <div className="ds-nested__child" style={{ borderRadius: 8 }}>12px menu, 4px inset, 8px row</div>
          </div>
          <div className="ds-nested__parent" style={{ padding: 12 }}>
            <div className="ds-nested__child" style={{ borderRadius: 8 }}>12px card, 12px inset, 8px child</div>
          </div>
          <div className="ds-nested__parent" style={{ padding: 8 }}>
            <div className="ds-nested__child" style={{ borderRadius: 4 }}>12px card, 8px inset, 4px child</div>
          </div>
        </div>
      </section>
    </>
  )
}

const SHADOWS: [string, string, string][] = [
  ['--shadow-low', 'Low', 'Cards and secondary buttons, with a border'],
  ['--shadow-medium', 'Medium', 'Menus, tooltips and popovers'],
  ['--shadow-high', 'High', 'Dialogs and the command menu'],
]

export function Shadows() {
  return (
    <>
      <PageHeader title="Shadows" lead="Depth is mostly a lighter surface. Shadows are for things that float. Click a card to copy its token." />
      <SwatchGrid>
        {SHADOWS.map(([token, name, use]) => (
          <Swatch key={token} token={token} name={name} value={use}>
            <span className="ds-shadow-demo">
              <Card elevation="flat" padding="none" className="ds-shadow-card" style={{ boxShadow: `var(${token})`, borderColor: token === '--shadow-low' ? undefined : 'transparent' }} />
            </span>
          </Swatch>
        ))}
      </SwatchGrid>
    </>
  )
}
