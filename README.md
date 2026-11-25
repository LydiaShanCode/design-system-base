# design-system-base

Base is a calm, keyboard-first design system in the style of Linear: warm-neutral grays, Inter Variable, one indigo accent, light and dark themes.

- `src/` holds the tokens (`tokens.css`) and the React primitives, exported from `src/index.ts`.
- `design-system/` is the docs site, which renders those components directly.

```bash
npm install
npm run dev     # docs at http://localhost:5190
npm run build   # typecheck and build the docs
```

```tsx
import { Button } from 'design-system-base'

<Button variant="primary">Create issue</Button>
```
