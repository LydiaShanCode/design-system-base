import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Input, Kbd, Tabs } from 'design-system-base'
import { Mark } from './docs/Mark'
import { GROUPS, PAGES } from './nav'
import { Intro } from './pages/Intro'
import { useTheme, type ThemePref } from './theme'

const REPO = 'https://github.com/LydiaShanCode/design-system-base'

function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '')
  const [slug, setSlug] = useState(read)
  useEffect(() => {
    const on = () => {
      setSlug(read())
      document.querySelector('.ds-main')?.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return slug
}

export function App() {
  const slug = useRoute()
  const { pref, setPref, resolved } = useTheme()
  const [query, setQuery] = useState('')
  const search = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        search.current?.focus()
        search.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return GROUPS
    return GROUPS.map((g) => ({ ...g, pages: g.pages.filter((p) => p.title.toLowerCase().includes(q)) })).filter((g) => g.pages.length)
  }, [query])

  const index = Math.max(0, PAGES.findIndex((p) => p.slug === slug))
  const page = PAGES[index]
  const prev = PAGES[index - 1]
  const next = PAGES[index + 1]
  const Page = page.Component

  useEffect(() => {
    document.title = page.slug ? `${page.title} · Base` : 'Base design system'
  }, [page])

  return (
    <div className="ds-app">
      <aside className="ds-sidebar">
        <a href="#/" className="ds-brandlink">
          <Mark size={18} />
          <span>Base</span>
        </a>

        <div className="ds-search">
          <Input
            ref={search}
            icon={<Search />}
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setQuery('')
                e.currentTarget.blur()
              }
              if (e.key === 'Enter' && groups[0]?.pages[0]) {
                window.location.hash = `#/${groups[0].pages[0].slug}`
                setQuery('')
                e.currentTarget.blur()
              }
            }}
            trailing={<Kbd size="sm">⌘K</Kbd>}
          />
        </div>

        <nav className="ds-nav">
          {groups.map((g) => (
            <div key={g.title} className="ds-nav__group">
              {g.title !== 'Introduction' && <div className="ds-nav__title">{g.title}</div>}
              {g.pages.map((p) => (
                <a key={p.slug} href={`#/${p.slug}`} className="ds-nav__link" data-active={p.slug === page.slug || undefined}>
                  {p.title}
                </a>
              ))}
            </div>
          ))}
          {!groups.length && <div className="ds-nav__empty">No pages match “{query}”</div>}
        </nav>

        <div className="ds-sidebar__foot">
          <Tabs
            value={pref}
            onChange={(v) => setPref(v as ThemePref)}
            items={[
              { value: 'system', label: 'System' },
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
          <a className="ds-open" href={REPO} target="_blank" rel="noreferrer">
            Open Base
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>
      </aside>

      <main className="ds-main">
        <div className="ds-page" data-wide={!Page || undefined}>
          {Page ? <Page /> : <Intro theme={resolved} />}
          {Page && (
            <footer className="ds-pager">
              {prev ? (
                <a href={`#/${prev.slug}`} className="ds-pager__link">
                  <span className="ds-pager__dir">
                    <ArrowLeft size={14} strokeWidth={1.75} />
                    Previous
                  </span>
                  <span className="ds-pager__name">{prev.title}</span>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a href={`#/${next.slug}`} className="ds-pager__link" data-next>
                  <span className="ds-pager__dir">
                    Next
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </span>
                  <span className="ds-pager__name">{next.title}</span>
                </a>
              )}
            </footer>
          )}
        </div>
      </main>
    </div>
  )
}
