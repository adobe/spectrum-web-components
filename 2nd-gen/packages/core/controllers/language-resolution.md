# Language resolution (`language-resolution`)

`LanguageResolutionController` resolves the active **locale / language** for Lit components and triggers updates when `<html lang>` or an optional provider changes.

**Package:** `@spectrum-web-components/core/controllers/language-resolution.js`  
**Barrel:** `@spectrum-web-components/core/controllers/index.js`

## Exports

### `languageResolverUpdatedSymbol`

`Symbol` — use in `updated(changes)` to detect language context changes and refresh locale-dependent output (for example `aria-valuetext`, formatted dates).

### `LanguageResolutionController`

Lit `ReactiveController`.

#### Behavior

- Initial language: `<html lang>`, then `navigator.language`, then `'en-US'`.
- Validates with `Intl` and falls back to `'en-US'` when unsupported.
- Observes `document.documentElement` for `lang` attribute changes via a **shared** `MutationObserver` (one observer for all instances).
- May subscribe to a 1st-gen-style `sp-language-context` provider when present; in pure 2nd-gen, `<html lang>` is the main live source.

#### API (typical usage)

| Member                         | Description                                            |
| ------------------------------ | ------------------------------------------------------ |
| `language`                     | Current BCP 47 language tag (read after connect).      |
| Constructor `(host, options?)` | `options.fallbackLanguage` overrides default fallback. |

See JSDoc on `language-resolution.ts` for the full constructor options and examples.

## Import

```typescript
import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from '@spectrum-web-components/core/controllers/index.js';
```
