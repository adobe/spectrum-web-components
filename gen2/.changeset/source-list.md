---
'@adobe/spectrum-wc': minor
---

**feat(source-list):** Add `<swc-source-list>` and `<swc-source-list-item>` to the AI toolkit, for showing the sources behind an AI response.

- **API:** the list sets `type` (`ordered` or `unordered`), `start`, `size` (`s` or `m`), and `verbosity` (`verbose`, `regular`, or `concise`), and applies `size` and `verbosity` to every item. Items take `source`, `thumbnail-src`, `value`, and `heading-level`, plus `link` and `description` slots. `source` falls back to the link's hostname.
- **Accessibility:** a native `<ol>` or `<ul>` with no added role, `role="listitem"` items, one focusable link per item whose hit area covers the card, and a number box hidden from assistive technology. The list is named by a `heading` slot, `labelElement`, or `accessible-label`. Dev-mode warnings flag a `link` slot that doesn't hold a single `<a href>` with text.
