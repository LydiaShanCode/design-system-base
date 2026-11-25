import { CircleDashed, Plus, Tag, UserRound } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Button, Checkbox, IconButton, Menu, MenuItem, StatusIcon, Switch, Tooltip, type Status } from 'design-system-base'
import { PageHeader, SectionTitle, Specs } from '../docs/ui'

function Motion({ title, lead, specimen, hint, specs, still }: { title: string; lead: string; specimen: ReactNode; hint: string; specs: [string, ReactNode][]; still: string }) {
  return (
    <>
      <PageHeader title={title} lead={lead} />
      <div className="ds-motion">
        <div className="ds-motion__stage">
          {specimen}
          <span className="ds-motion__hint">{hint}</span>
        </div>
        <Specs rows={specs} />
      </div>
      <section className="ds-block">
        <SectionTitle>What stays still</SectionTitle>
        <p className="ds-prose">{still}</p>
      </section>
    </>
  )
}

export function PressMotion() {
  return (
    <Motion
      title="Button press"
      lead="Every pressable control gives way slightly under the pointer, so a click is felt before its result arrives."
      specimen={
        <Button variant="primary" size="lg" icon={<Plus />}>
          Create issue
        </Button>
      }
      hint="Press and hold"
      specs={[
        ['Property', 'transform: scale(0.97)'],
        ['Duration', '160ms · --duration-base'],
        ['Easing', 'ease-out · --ease-out'],
        ['Trigger', ':active, pointer only'],
      ]}
      still="The label, icon and color do not change on press. Hover changes background color over 120ms with plain ease, and only on devices with a fine pointer."
    />
  )
}

export function ToggleMotion() {
  const [on, setOn] = useState(true)
  return (
    <Motion
      title="Switch toggle"
      lead="The thumb travels to the new side so the state change has a direction, and the track recolors underneath it."
      specimen={<Switch checked={on} onChange={setOn} label="Auto-assign to me" />}
      hint="Click to toggle"
      specs={[
        ['Property', 'transform: translateX on the thumb, background-color on the track'],
        ['Duration', '160ms · --duration-base'],
        ['Easing', 'ease-out for the thumb, ease for the color'],
        ['Reduced motion', 'The thumb jumps, the color still fades'],
      ]}
      still="The thumb keeps its size and the label does not move. Nothing bounces."
    />
  )
}

export function CheckMotion() {
  const [on, setOn] = useState(false)
  return (
    <Motion
      title="Checkbox check"
      lead="The check draws itself from the short stroke to the long one, the way it would be written."
      specimen={<Checkbox checked={on} onChange={setOn} label="Close sub-issues with parent" />}
      hint="Click to check"
      specs={[
        ['Property', 'stroke-dashoffset on the check path, background-color on the box'],
        ['Duration', '160ms draw, 120ms fill'],
        ['Easing', 'ease-out · --ease-out'],
        ['Press', 'The box scales to 0.92 while held'],
      ]}
      still="Unchecking does not erase the stroke backwards; it fades with the fill. The label never moves."
    />
  )
}

export function MenuMotion() {
  const [status, setStatus] = useState<Status>('todo')
  const items: [Status, string, string][] = [
    ['backlog', 'Backlog', '1'],
    ['todo', 'Todo', '2'],
    ['progress', 'In Progress', '3'],
    ['done', 'Done', '4'],
  ]
  return (
    <Motion
      title="Menu open"
      lead="Menus grow out of the control that opened them, so the eye knows where they came from."
      specimen={
        <Menu trigger={<Button icon={<StatusIcon status={status} />}>{items.find((i) => i[0] === status)![1]}</Button>} width={200}>
          {items.map(([s, label, key]) => (
            <MenuItem key={s} icon={<StatusIcon status={s} />} shortcut={[key]} checked={s === status} onSelect={() => setStatus(s)}>
              {label}
            </MenuItem>
          ))}
        </Menu>
      }
      hint="Click to open"
      specs={[
        ['Property', 'opacity 0 → 1, transform: scale(0.97 → 1)'],
        ['Origin', 'The trigger’s corner, top left or top right'],
        ['Duration', '160ms in, 120ms out'],
        ['Easing', 'ease-out · --ease-out'],
      ]}
      still="Menus opened from the keyboard use the same motion but no stagger: rows appear together. The command menu, opened hundreds of times a day, does not animate at all."
    />
  )
}

export function TooltipMotion() {
  return (
    <Motion
      title="Tooltip"
      lead="A tooltip waits before it appears, so passing over a toolbar shows nothing. Once one is open, its neighbors open instantly."
      specimen={
        <span className="ds-row">
          <Tooltip content="Change status" shortcut={['S']}>
            <IconButton label="Change status" variant="secondary">
              <CircleDashed />
            </IconButton>
          </Tooltip>
          <Tooltip content="Assign" shortcut={['A']}>
            <IconButton label="Assign" variant="secondary">
              <UserRound />
            </IconButton>
          </Tooltip>
          <Tooltip content="Add labels" shortcut={['L']}>
            <IconButton label="Add labels" variant="secondary">
              <Tag />
            </IconButton>
          </Tooltip>
        </span>
      }
      hint="Hover, then slide across"
      specs={[
        ['Property', 'opacity 0 → 1, scale 0.97 → 1'],
        ['Delay', '500ms first, 0ms for 600ms after one closes'],
        ['Duration', '125ms, 0ms when warm'],
        ['Easing', 'ease-out · --ease-out'],
      ]}
      still="The tooltip does not slide toward the control. It scales from the edge nearest it and stays centered."
    />
  )
}
