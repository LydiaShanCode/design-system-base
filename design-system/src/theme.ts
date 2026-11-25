import { useEffect, useState } from 'react'

export type ThemePref = 'system' | 'light' | 'dark'
export type Resolved = 'light' | 'dark'

const query = () => matchMedia('(prefers-color-scheme: dark)')

function resolve(pref: ThemePref): Resolved {
  if (pref === 'system') return query().matches ? 'dark' : 'light'
  return pref
}

export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(() => (localStorage.getItem('base-theme') as ThemePref) || 'system')
  const [resolved, setResolved] = useState<Resolved>(() => resolve(pref))

  useEffect(() => {
    localStorage.setItem('base-theme', pref)
    const apply = () => {
      const r = resolve(pref)
      document.documentElement.dataset.theme = r
      setResolved(r)
    }
    apply()
    const mq = query()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [pref])

  return { pref, setPref, resolved }
}
