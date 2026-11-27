# Design engineering

Tips and code snippets that make product design feel better in the browser. One section per tip, newest at the bottom, each with its source.

## Don't read and write layout in the same loop

Every `offsetHeight` you read after changing a style makes the browser redo the whole layout. In a masonry grid that's one layout per item, and 160ms per frame.

Read all heights first, then set all styles. One layout, 4ms.

```ts
// 1. Read every height first (one layout)
const hs = items.map((el) => el.offsetHeight)

// 2. Then write every style (no forced re-layout in between)
items.forEach((el, i) => {
  el.style.gridRowEnd = span(hs[i])
})
```

- Applies to any layout read: `offsetHeight`, `offsetWidth`, `getBoundingClientRect()`, `scrollTop`, `getComputedStyle()`.
- `span()` is your own helper that turns a height into a grid row span.

Source: [Gabriel (@gabriell_lab), 2026-11-23](https://x.com/gabriell_lab/status/2124867210258563232)
