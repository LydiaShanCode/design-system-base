import { CircleDashed, Plus, Search } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  Avatar,
  AvatarGroup,
  Button,
  IconButton,
  Input,
  Kbd,
  Label,
  MenuItem,
  MenuLabel,
  MenuList,
  PriorityIcon,
  StatusIcon,
  Switch,
  type Priority,
  type Status,
} from 'design-system-base'
import { Bar, Stage, type Act, type LookTokens } from '../kit'
import type { Resolved } from '../theme'

const LOOK: LookTokens = {
  '--ss-canvas': 'var(--bg-canvas)',
  '--ss-surface': 'var(--bg-surface)',
  '--ss-chrome': 'var(--bg-canvas)',
  '--ss-well': 'var(--bg-well)',
  '--ss-raised': 'var(--bg-raised)',
  '--ss-line': 'var(--border-default)',
  '--ss-text': 'var(--text-secondary)',
  '--ss-text-strong': 'var(--text-primary)',
  '--ss-text-faint': 'var(--text-tertiary)',
  '--ss-icon': 'var(--icon-default)',
  '--ss-icon-faint': 'var(--icon-faint)',
  '--ss-accent': 'var(--accent)',
  '--ss-font': 'var(--font-sans)',
}

const COL = 228
const WIDE = COL * 2 + 12
const H = 200

function Tile({ w, theme, span, children, script, initial }: { w: number; theme: Resolved; span?: 2; children: (s: { on: boolean }) => ReactNode; script?: (a: Act<{ on: boolean }>) => Promise<void>; initial?: { on: boolean } }) {
  return (
    <div className="ds-tile" data-span={span}>
      <Stage
        width={w}
        height={H}
        theme={theme}
        tokens={LOOK}
        initial={initial}
        poster={initial ? { on: true } : undefined}
        script={script}
        cursor={script ? { at: { at: 'rest', x: 0.5, y: 0.5 }, idle: 1800 } : undefined}
        className="ds-tile__stage"
      >
        {(s) => children(s as { on: boolean })}
      </Stage>
    </div>
  )
}

const ROWS: { pri: Priority; status: Status; title?: string; id?: string; w: number; who?: string }[] = [
  { pri: 2, status: 'progress', w: 150, who: 'Theo Park' },
  { pri: 3, status: 'todo', id: 'ENG-142', title: 'Fix login redirect loop', w: 0, who: 'Mara Lindqvist' },
  { pri: 1, status: 'todo', w: 180 },
  { pri: 0, status: 'backlog', w: 120, who: 'Ines Duarte' },
  { pri: 2, status: 'done', w: 164 },
]

async function toggle(a: Act<{ on: boolean }>) {
  await a.wait(1100)
  await a.move({ at: 'switch', x: 0.5, y: 0.5 })
  await a.click()
  await a.set({ on: true })
  await a.wait(1800)
  await a.click()
  await a.set({ on: false })
  await a.wait(500)
  await a.move({ at: 'rest', x: 0.5, y: 0.5 })
  await a.wait(900)
}

export function Intro({ theme }: { theme: Resolved }) {
  return (
    <div className="ds-bento">
      <Tile w={WIDE} span={2} theme={theme}>
        {() => (
          <div className="it-issues">
            {ROWS.map((r, i) => (
              <div key={i} className="it-issue" data-focus={r.title ? true : undefined}>
                <PriorityIcon level={r.pri} />
                <span className="it-issue__id">{r.id ?? <Bar w={38} h={5} tone={2} />}</span>
                <StatusIcon status={r.status} />
                <span className="it-issue__title">{r.title ?? <Bar w={r.w} h={6} tone={3} />}</span>
                {r.title && <Label color="red">Bug</Label>}
                {r.who ? <Avatar name={r.who} size={20} /> : <Avatar size={20} />}
              </div>
            ))}
          </div>
        )}
      </Tile>

      <Tile w={COL} theme={theme}>
        {() => (
          <div className="it-type">
            <span className="it-type__glyph">Aa</span>
            <span className="it-type__name">Inter Variable · 510</span>
          </div>
        )}
      </Tile>

      <Tile w={COL} theme={theme}>
        {() => (
          <div className="it-center">
            <AvatarGroup names={['Mara Lindqvist', 'Theo Park', 'Ines Duarte', 'Sam Okafor', 'Ruth Abe', 'Kai Moreno']} size={32} max={4} />
          </div>
        )}
      </Tile>

      <Tile w={COL} theme={theme}>
        {() => (
          <div className="it-search">
            <Input size="lg" icon={<Search />} defaultValue="redirect" trailing={<Kbd size="sm">/</Kbd>} readOnly />
          </div>
        )}
      </Tile>

      <div className="ds-tile ds-tile--name" data-span={2}>
        <span className="ds-tile__name">Base</span>
      </div>

      <Tile w={COL} theme={theme} initial={{ on: false }} script={toggle}>
        {(s) => (
          <div className="it-settings">
            <div className="it-setting">
              <span>Auto-assign to me</span>
              <span data-target="switch" className="it-setting__switch">
                <Switch checked={s.on} />
              </span>
            </div>
            <div className="it-setting" data-target="rest">
              <Bar w={92} h={6} tone={3} />
              <Switch checked={false} />
            </div>
          </div>
        )}
      </Tile>

      <Tile w={COL} theme={theme}>
        {() => (
          <div className="it-center it-buttons">
            <Button variant="primary" size="lg" icon={<Plus />}>
              New issue
            </Button>
            <IconButton label="Status" variant="secondary" size="lg">
              <CircleDashed />
            </IconButton>
          </div>
        )}
      </Tile>

      <Tile w={COL} theme={theme}>
        {() => (
          <div className="it-labels">
            <Label color="purple">Design</Label>
            <Label color="blue">Docs</Label>
            <Label color="orange">Performance</Label>
            <Label color="green">Feature</Label>
            <Label color="teal">Infra</Label>
            <Label color="gray">Chore</Label>
          </div>
        )}
      </Tile>

      <Tile w={WIDE} span={2} theme={theme}>
        {() => (
          <div className="it-menu">
            <MenuList style={{ width: 240 }}>
              <MenuLabel>Change status</MenuLabel>
              <MenuItem icon={<StatusIcon status="backlog" />} shortcut={['1']}>
                Backlog
              </MenuItem>
              <MenuItem icon={<StatusIcon status="todo" />} shortcut={['2']}>
                Todo
              </MenuItem>
              <MenuItem icon={<StatusIcon status="progress" />} shortcut={['3']} active checked>
                In Progress
              </MenuItem>
              <MenuItem icon={<StatusIcon status="done" />} shortcut={['4']}>
                Done
              </MenuItem>
            </MenuList>
          </div>
        )}
      </Tile>
    </div>
  )
}
