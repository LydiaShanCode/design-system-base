import source from '../content/design-engineering.md?raw'
import { Markdown } from './markdown'

export function DesignEngineering() {
  return <Markdown source={source} />
}
