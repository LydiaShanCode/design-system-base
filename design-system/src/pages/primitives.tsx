import { Archive, ArrowRight, CircleDashed, Copy, Link2, MoreHorizontal, Plus, Search, SignalHigh, Star, Tag, Trash2, UserRound } from 'lucide-react'
import { useState } from 'react'
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Checkbox,
  IconButton,
  Input,
  Kbd,
  Label,
  Menu,
  MenuItem,
  MenuLabel,
  MenuList,
  MenuSeparator,
  PriorityIcon,
  Shortcut,
  StatusIcon,
  Switch,
  Tabs,
  Tooltip,
  type Priority,
  type Status,
} from 'design-system-base'
import { Example, PageHeader } from '../docs/ui'

const IMPORT = "import { %s } from 'design-system-base'\n\n"
const code = (names: string, body: string) => IMPORT.replace('%s', names) + body

export function AvatarPage() {
  return (
    <>
      <PageHeader title="Avatar" />
      <Example title="Sizes" code={code('Avatar', `<Avatar name="Mara Lindqvist" size={16} />\n<Avatar name="Mara Lindqvist" size={20} />\n<Avatar name="Mara Lindqvist" size={24} />\n<Avatar name="Mara Lindqvist" size={32} />`)}>
        {([16, 20, 24, 32] as const).map((s) => (
          <Avatar key={s} name="Mara Lindqvist" size={s} />
        ))}
      </Example>
      <Example title="Unassigned" code={code('Avatar', `<Avatar size={20} />`)}>
        <Avatar size={20} />
        <Avatar size={32} />
      </Example>
      <Example title="Group" code={code('AvatarGroup', `<AvatarGroup names={['Mara Lindqvist', 'Theo Park', 'Ines Duarte', 'Sam Okafor', 'Ruth Abe']} size={24} />`)}>
        <AvatarGroup names={['Mara Lindqvist', 'Theo Park', 'Ines Duarte', 'Sam Okafor', 'Ruth Abe']} size={24} />
      </Example>
    </>
  )
}

export function BadgePage() {
  return (
    <>
      <PageHeader title="Badge" />
      <Example title="Neutral" code={code('Badge', `<Badge>Beta</Badge>`)}>
        <Badge>Beta</Badge>
        <Badge>3 sub-issues</Badge>
      </Example>
      <Example title="Tones" code={code('Badge', `<Badge tone="accent">Cycle 24</Badge>\n<Badge tone="danger">Overdue</Badge>`)}>
        <Badge tone="accent">Cycle 24</Badge>
        <Badge tone="danger">Overdue</Badge>
      </Example>
    </>
  )
}

export function ButtonPage() {
  return (
    <>
      <PageHeader title="Button" />
      <Example
        title="Variants"
        code={code('Button', `<Button variant="primary">Create issue</Button>\n<Button variant="secondary">Filter</Button>\n<Button variant="ghost">Cancel</Button>\n<Button variant="danger">Delete</Button>`)}
      >
        <Button variant="primary">Create issue</Button>
        <Button variant="secondary">Filter</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </Example>
      <Example title="Sizes" code={code('Button', `<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>`)}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Example>
      <Example
        title="With icon and shortcut"
        code={code('Button, Kbd', `<Button variant="primary" icon={<Plus />}>New issue</Button>\n<Button icon={<Link2 />} trailing={<Kbd size="sm">⌘L</Kbd>}>Copy link</Button>`)}
      >
        <Button variant="primary" icon={<Plus />}>
          New issue
        </Button>
        <Button icon={<Link2 />} trailing={<Kbd size="sm">⌘L</Kbd>}>
          Copy link
        </Button>
      </Example>
      <Example title="Disabled" code={code('Button', `<Button variant="primary" disabled>Create issue</Button>`)}>
        <Button variant="primary" disabled>
          Create issue
        </Button>
        <Button disabled>Filter</Button>
      </Example>
    </>
  )
}

export function CardPage() {
  return (
    <>
      <PageHeader title="Card" />
      <Example
        title="Elevations"
        code={code('Card', `<Card elevation="flat">…</Card>\n<Card elevation="low">…</Card>\n<Card elevation="medium">…</Card>`)}
      >
        {(['flat', 'low', 'medium'] as const).map((e) => (
          <Card key={e} elevation={e} padding="lg" className="ds-card-sample">
            <span className="ds-card-sample__title">{e[0].toUpperCase() + e.slice(1)}</span>
            <span className="ds-card-sample__body">elevation="{e}"</span>
          </Card>
        ))}
      </Example>
      <Example
        title="With content"
        code={code('Card, StatusIcon, Avatar', `<Card padding="lg">\n  <StatusIcon status="progress" />\n  <span>Fix login redirect loop</span>\n  <Avatar name="Mara Lindqvist" />\n</Card>`)}
      >
        <Card padding="lg" className="ds-card-issue">
          <span className="ds-card-issue__head">
            <StatusIcon status="progress" />
            <span className="ds-card-issue__id">ENG-142</span>
          </span>
          <span className="ds-card-issue__title">Fix login redirect loop</span>
          <span className="ds-card-issue__foot">
            <PriorityIcon level={3} />
            <Label color="red">Bug</Label>
            <Avatar name="Mara Lindqvist" size={20} style={{ marginLeft: 'auto' }} />
          </span>
        </Card>
      </Example>
    </>
  )
}

export function CheckboxPage() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <>
      <PageHeader title="Checkbox" />
      <Example
        title="States"
        code={code('Checkbox', `const [checked, setChecked] = useState(false)\n\n<Checkbox checked={checked} onChange={setChecked} label="Close sub-issues" />`)}
      >
        <Checkbox checked={b} onChange={setB} label="Unchecked" />
        <Checkbox checked={a} onChange={setA} label="Checked" />
        <Checkbox checked="mixed" label="Mixed" />
      </Example>
      <Example title="Disabled" code={code('Checkbox', `<Checkbox checked disabled label="Inherited from team" />`)}>
        <Checkbox checked disabled label="Inherited from team" />
        <Checkbox checked={false} disabled label="Unavailable" />
      </Example>
    </>
  )
}

export function IconButtonPage() {
  return (
    <>
      <PageHeader title="Icon button" />
      <Example
        title="Variants"
        code={code('IconButton', `<IconButton label="More" variant="ghost"><MoreHorizontal /></IconButton>\n<IconButton label="Favorite" variant="secondary"><Star /></IconButton>\n<IconButton label="New issue" variant="primary"><Plus /></IconButton>`)}
      >
        <IconButton label="More" variant="ghost">
          <MoreHorizontal />
        </IconButton>
        <IconButton label="Favorite" variant="secondary">
          <Star />
        </IconButton>
        <IconButton label="New issue" variant="primary">
          <Plus />
        </IconButton>
      </Example>
      <Example title="Sizes" code={code('IconButton', `<IconButton label="Search" size="sm"><Search /></IconButton>\n<IconButton label="Search" size="md"><Search /></IconButton>\n<IconButton label="Search" size="lg"><Search /></IconButton>`)}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <IconButton key={s} label="Search" size={s} variant="secondary">
            <Search />
          </IconButton>
        ))}
      </Example>
    </>
  )
}

export function InputPage() {
  return (
    <>
      <PageHeader title="Input" />
      <Example title="Default" code={code('Input', `<Input placeholder="Issue title" />`)} stack>
        <div className="ds-field">
          <Input placeholder="Issue title" />
        </div>
      </Example>
      <Example title="With icon and shortcut" code={code('Input, Kbd', `<Input icon={<Search />} placeholder="Search issues" trailing={<Kbd size="sm">/</Kbd>} />`)} stack>
        <div className="ds-field">
          <Input icon={<Search />} placeholder="Search issues" trailing={<Kbd size="sm">/</Kbd>} />
        </div>
      </Example>
      <Example title="Sizes" code={code('Input', `<Input size="md" placeholder="Medium" />\n<Input size="lg" placeholder="Large" />`)} stack>
        <div className="ds-field">
          <Input size="md" placeholder="Medium · 28px" />
        </div>
        <div className="ds-field">
          <Input size="lg" placeholder="Large · 32px" />
        </div>
      </Example>
      <Example title="Invalid and disabled" code={code('Input', `<Input invalid defaultValue="eng-14x" />\n<Input disabled defaultValue="ENG" />`)} stack>
        <div className="ds-field">
          <Input invalid defaultValue="eng-14x" />
        </div>
        <div className="ds-field">
          <Input disabled defaultValue="ENG" />
        </div>
      </Example>
    </>
  )
}

export function KbdPage() {
  return (
    <>
      <PageHeader title="Kbd" />
      <Example title="Sizes" code={code('Kbd', `<Kbd>⌘</Kbd>\n<Kbd size="sm">⌘</Kbd>`)}>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
        <Kbd size="sm">⌘</Kbd>
        <Kbd size="sm">K</Kbd>
      </Example>
      <Example title="Shortcut" code={code('Shortcut', `<Shortcut keys={['⌘', 'K']} />\n<Shortcut keys={['G', 'I']} />`)}>
        <Shortcut keys={['⌘', 'K']} />
        <Shortcut keys={['G', 'I']} />
        <Shortcut keys={['⇧', '⌘', 'P']} />
      </Example>
    </>
  )
}

export function LabelPage() {
  const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'gray'] as const
  const names = ['Bug', 'Performance', 'Design', 'Feature', 'Infra', 'Docs', 'Platform', 'Research', 'Chore']
  return (
    <>
      <PageHeader title="Label" />
      <Example title="Colors" code={code('Label', `<Label color="red">Bug</Label>\n<Label color="purple">Research</Label>`)}>
        <span className="ds-wrap">
          {colors.map((c, i) => (
            <Label key={c} color={c}>
              {names[i]}
            </Label>
          ))}
        </span>
      </Example>
    </>
  )
}

export function MenuPage() {
  const [status, setStatus] = useState<Status>('todo')
  return (
    <>
      <PageHeader title="Menu" />
      <Example
        title="Dropdown"
        code={code(
          'Menu, MenuItem, Button',
          `<Menu trigger={<Button icon={<MoreHorizontal />}>Actions</Button>}>\n  <MenuItem icon={<Copy />} shortcut={['⌘', 'C']}>Copy ID</MenuItem>\n  <MenuItem icon={<Link2 />} shortcut={['⌘', 'L']}>Copy link</MenuItem>\n  <MenuSeparator />\n  <MenuItem icon={<Trash2 />} danger>Delete</MenuItem>\n</Menu>`,
        )}
      >
        <Menu trigger={<Button icon={<MoreHorizontal />}>Actions</Button>}>
          <MenuItem icon={<Copy />} shortcut={['⌘', 'C']}>
            Copy ID
          </MenuItem>
          <MenuItem icon={<Link2 />} shortcut={['⌘', 'L']}>
            Copy link
          </MenuItem>
          <MenuItem icon={<Archive />}>Archive</MenuItem>
          <MenuSeparator />
          <MenuItem icon={<Trash2 />} danger>
            Delete
          </MenuItem>
        </Menu>
      </Example>
      <Example
        title="Selection"
        code={code('MenuList, MenuItem, MenuLabel, StatusIcon', `<MenuList>\n  <MenuLabel>Status</MenuLabel>\n  <MenuItem icon={<StatusIcon status="todo" />} shortcut={['2']} checked>Todo</MenuItem>\n</MenuList>`)}
      >
        <MenuList style={{ width: 220 }}>
          <MenuLabel>Status</MenuLabel>
          {(['backlog', 'todo', 'progress', 'done', 'canceled'] as Status[]).map((s, i) => (
            <MenuItem key={s} icon={<StatusIcon status={s} />} shortcut={[String(i + 1)]} checked={s === status} onSelect={() => setStatus(s)}>
              {['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'][i]}
            </MenuItem>
          ))}
        </MenuList>
      </Example>
      <Example title="Active row" code={code('MenuList, MenuItem', `<MenuItem icon={<UserRound />} active>Assign to me</MenuItem>`)}>
        <MenuList style={{ width: 220 }}>
          <MenuItem icon={<CircleDashed />} shortcut={['S']}>
            Change status…
          </MenuItem>
          <MenuItem icon={<UserRound />} shortcut={['I']} active>
            Assign to me
          </MenuItem>
          <MenuItem icon={<SignalHigh />} shortcut={['P']}>
            Change priority…
          </MenuItem>
          <MenuItem icon={<Tag />} shortcut={['L']}>
            Add labels…
          </MenuItem>
        </MenuList>
      </Example>
    </>
  )
}

export function PriorityPage() {
  const levels: Priority[] = [0, 1, 2, 3, 4]
  return (
    <>
      <PageHeader title="Priority icon" />
      <Example title="Levels" code={code('PriorityIcon', `<PriorityIcon level={0} /> // No priority\n<PriorityIcon level={1} /> // Low\n<PriorityIcon level={2} /> // Medium\n<PriorityIcon level={3} /> // High\n<PriorityIcon level={4} /> // Urgent`)}>
        {levels.map((l) => (
          <span key={l} className="ds-mark-cell">
            <PriorityIcon level={l} size={16} />
            <span>{['No priority', 'Low', 'Medium', 'High', 'Urgent'][l]}</span>
          </span>
        ))}
      </Example>
    </>
  )
}

export function StatusPage() {
  const all: Status[] = ['backlog', 'todo', 'progress', 'done', 'canceled']
  const [s, setS] = useState<Status>('todo')
  return (
    <>
      <PageHeader title="Status icon" />
      <Example title="Workflow states" code={code('StatusIcon', `<StatusIcon status="backlog" />\n<StatusIcon status="todo" />\n<StatusIcon status="progress" />\n<StatusIcon status="done" />\n<StatusIcon status="canceled" />`)}>
        {all.map((st) => (
          <span key={st} className="ds-mark-cell">
            <StatusIcon status={st} size={16} />
            <span>{['Backlog', 'Todo', 'In Progress', 'Done', 'Canceled'][all.indexOf(st)]}</span>
          </span>
        ))}
      </Example>
      <Example title="Changing state" code={code('StatusIcon', `<StatusIcon status={status} />`)}>
        <Button icon={<StatusIcon status={s} />} trailing={<ArrowRight size={14} />} onClick={() => setS(s === 'todo' ? 'progress' : 'todo')}>
          {s === 'todo' ? 'Start progress' : 'Back to Todo'}
        </Button>
      </Example>
    </>
  )
}

export function SwitchPage() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <>
      <PageHeader title="Switch" />
      <Example title="States" code={code('Switch', `const [on, setOn] = useState(true)\n\n<Switch checked={on} onChange={setOn} label="Auto-assign to me" />`)} stack>
        <Switch checked={a} onChange={setA} label="Auto-assign to me" className="ds-switch-row" />
        <Switch checked={b} onChange={setB} label="Email on mention" className="ds-switch-row" />
      </Example>
      <Example title="Sizes" code={code('Switch', `<Switch size="sm" checked />\n<Switch size="md" checked />`)}>
        <Switch size="sm" checked />
        <Switch size="md" checked />
      </Example>
      <Example title="Disabled" code={code('Switch', `<Switch checked disabled />`)}>
        <Switch checked disabled />
        <Switch checked={false} disabled />
      </Example>
    </>
  )
}

export function TabsPage() {
  const [v, setV] = useState('all')
  return (
    <>
      <PageHeader title="Tabs" />
      <Example
        title="View tabs"
        code={code('Tabs', `<Tabs\n  value={view}\n  onChange={setView}\n  items={[\n    { value: 'all', label: 'All issues' },\n    { value: 'active', label: 'Active' },\n    { value: 'backlog', label: 'Backlog' },\n  ]}\n/>`)}
      >
        <Tabs
          value={v}
          onChange={setV}
          items={[
            { value: 'all', label: 'All issues' },
            { value: 'active', label: 'Active' },
            { value: 'backlog', label: 'Backlog' },
          ]}
        />
      </Example>
    </>
  )
}

export function TooltipPage() {
  return (
    <>
      <PageHeader title="Tooltip" />
      <Example title="With shortcut" code={code('Tooltip, IconButton', `<Tooltip content="Create issue" shortcut={['C']}>\n  <IconButton label="Create issue"><Plus /></IconButton>\n</Tooltip>`)}>
        <Tooltip content="Create issue" shortcut={['C']}>
          <IconButton label="Create issue" variant="secondary">
            <Plus />
          </IconButton>
        </Tooltip>
        <Tooltip content="Search" shortcut={['/']}>
          <IconButton label="Search" variant="secondary">
            <Search />
          </IconButton>
        </Tooltip>
      </Example>
      <Example title="Below" code={code('Tooltip', `<Tooltip content="Copy link" side="bottom">…</Tooltip>`)}>
        <Tooltip content="Copy link" side="bottom">
          <IconButton label="Copy link" variant="secondary">
            <Link2 />
          </IconButton>
        </Tooltip>
      </Example>
    </>
  )
}
