import type { ComponentType } from 'react'
import { CheckMotion, MenuMotion, PressMotion, ToggleMotion, TooltipMotion } from './pages/animations'
import { DesignEngineering } from './pages/designEngineering'
import { Brand, Colors, Radius, Shadows } from './pages/foundations'
import {
  AvatarPage,
  BadgePage,
  ButtonPage,
  CardPage,
  CheckboxPage,
  IconButtonPage,
  InputPage,
  KbdPage,
  LabelPage,
  MenuPage,
  PriorityPage,
  StatusPage,
  SwitchPage,
  TabsPage,
  TooltipPage,
} from './pages/primitives'
import { Caption, Code, FontFamilies, Headings, Text } from './pages/typography'

export type Page = { slug: string; title: string; Component?: ComponentType }
export type Group = { title: string; pages: Page[] }

export const GROUPS: Group[] = [
  { title: 'Introduction', pages: [{ slug: '', title: 'Introduction' }] },
  {
    title: 'Foundations',
    pages: [
      { slug: 'brand', title: 'Brand', Component: Brand },
      { slug: 'colors', title: 'Colors', Component: Colors },
      { slug: 'radius', title: 'Radius', Component: Radius },
      { slug: 'shadows', title: 'Shadows', Component: Shadows },
    ],
  },
  {
    title: 'Typography',
    pages: [
      { slug: 'font-families', title: 'Font families', Component: FontFamilies },
      { slug: 'headings', title: 'Headings', Component: Headings },
      { slug: 'text', title: 'Text', Component: Text },
      { slug: 'caption', title: 'Caption', Component: Caption },
      { slug: 'code', title: 'Code', Component: Code },
    ],
  },
  {
    title: 'Animations',
    pages: [
      { slug: 'button-press', title: 'Button press', Component: PressMotion },
      { slug: 'switch-toggle', title: 'Switch toggle', Component: ToggleMotion },
      { slug: 'checkbox-check', title: 'Checkbox check', Component: CheckMotion },
      { slug: 'menu-open', title: 'Menu open', Component: MenuMotion },
      { slug: 'tooltip-delay', title: 'Tooltip', Component: TooltipMotion },
    ],
  },
  {
    title: 'Primitives',
    pages: [
      { slug: 'avatar', title: 'Avatar', Component: AvatarPage },
      { slug: 'badge', title: 'Badge', Component: BadgePage },
      { slug: 'button', title: 'Button', Component: ButtonPage },
      { slug: 'card', title: 'Card', Component: CardPage },
      { slug: 'checkbox', title: 'Checkbox', Component: CheckboxPage },
      { slug: 'icon-button', title: 'Icon button', Component: IconButtonPage },
      { slug: 'input', title: 'Input', Component: InputPage },
      { slug: 'kbd', title: 'Kbd', Component: KbdPage },
      { slug: 'label', title: 'Label', Component: LabelPage },
      { slug: 'menu', title: 'Menu', Component: MenuPage },
      { slug: 'priority-icon', title: 'Priority icon', Component: PriorityPage },
      { slug: 'status-icon', title: 'Status icon', Component: StatusPage },
      { slug: 'switch', title: 'Switch', Component: SwitchPage },
      { slug: 'tabs', title: 'Tabs', Component: TabsPage },
      { slug: 'tooltip', title: 'Tooltip', Component: TooltipPage },
    ],
  },
  {
    title: 'Design engineering',
    pages: [{ slug: 'design-engineering', title: 'Tips and snippets', Component: DesignEngineering }],
  },
]

export const PAGES = GROUPS.flatMap((g) => g.pages)
