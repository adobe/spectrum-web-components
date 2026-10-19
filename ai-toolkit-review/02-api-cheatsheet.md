# AI Toolkit API cheat sheet

One section per element. Base path: `gen2/packages/swc/patterns/ai-toolkit/`.
Register an element by importing `@adobe/spectrum-wc/patterns/ai-toolkit/<unit>/swc-<tag>.js`.
Every event below bubbles and is composed.

Legend: **R** = reflects to the attribute.

---

## Structure

### `swc-conversation-thread` (`conversation-thread/ConversationThread.ts`)

| Kind       | API                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Properties | none                                                                                                    |
| Slots      | default: `swc-conversation-turn` elements                                                               |
| Events     | none                                                                                                    |
| Methods    | `focus(options?)`: focuses the active turn                                                              |
| Keyboard   | ArrowUp/ArrowDown/Home/End move between turns (roving `tabindex`, via `FocusgroupNavigationController`) |
| CSS props  | none                                                                                                    |

### `swc-conversation-turn` (`conversation-turn/ConversationTurn.ts`)

| Kind               | API                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| Properties         | `type: 'user' \| 'system'` = `'user'` (R); `accessible-label: string`                           |
| Slots              | default: one `swc-user-message` or `swc-system-message`                                         |
| Host ARIA          | `role="group"` + `aria-label` set on the **host** (defaults: "User message" / "System message") |
| Events / CSS props | none                                                                                            |

### `swc-user-message` (`user-message/UserMessage.ts`)

| Kind               | API                                                                |
| ------------------ | ------------------------------------------------------------------ |
| Properties         | `type: 'copy' \| 'card' \| 'media'` = `'copy'` (R)                 |
| Slots              | default (copy text); `thumbnail`, `title`, `subtitle` (card/media) |
| Events / CSS props | none                                                               |

### `swc-system-message` (`system-message/SystemMessage.ts`)

| Kind                      | API                                                                |
| ------------------------- | ------------------------------------------------------------------ |
| Properties                | none                                                               |
| Slots (fixed paint order) | `status` → default (body) + `feedback` → `sources` → `suggestions` |
| Events / CSS props        | none                                                               |

---

## Response details

### `swc-response-status` (`response-status/ResponseStatus.ts`)

| Kind            | API                                                                                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Properties      | `status: 'active' \| 'complete' \| 'stopped'` = `'active'` (R); `open: boolean` (R); `loader: PixelLoaderIconName \| PixelLoaderPresetName` = `'mega'` (R); `accessible-label` (step panel name, default "Execution steps") |
| Slots           | `label` (header text override); default: `swc-response-status-step` elements                                                                                                                                                |
| Events          | `swc-response-status-toggle {open}`; `swc-response-status-step-toggle {open, index}`                                                                                                                                        |
| Default strings | "Generating response", "Response complete", "You stopped the response", "Processing…" (not configurable except through the `label` slot)                                                                                    |
| CSS props       | `--swc-response-status-label-max-lines`                                                                                                                                                                                     |
| A11y            | No steps: the active label is `role="status"`. With steps: the header becomes a disclosure `<button aria-expanded>`.                                                                                                        |

### `swc-response-status-step` (`response-status/response-status-step/ResponseStatusStep.ts`)

| Kind                                      | API                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| Properties                                | `status: 'active' \| 'complete' \| 'stopped'` = `'active'` (R); `open: boolean` (R)    |
| Slots                                     | `label`; `description` (or default slot as a fallback)                                 |
| Events (internal, consumed by the parent) | `swc-response-status-step-open-change`, `swc-response-status-step-active-label-change` |
| Public getter                             | `labelText` (exists for parent coupling)                                               |
| CSS props                                 | `--swc-response-status-step-detail-max-block-size` (120px)                             |
| Host ARIA                                 | `role="listitem"` set in `firstUpdated`                                                |

### `swc-message-feedback` (`message-feedback/MessageFeedback.ts`), controlled

| Kind              | API                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Properties        | `status: 'positive' \| 'negative' \| undefined` (R); `group-label` ("Response feedback"); `positive-label` ("Positive response"); `negative-label` ("Negative response") |
| Events            | `swc-message-feedback-change {status}`. **You** must set `status` in response.                                                                                           |
| Keyboard          | Arrow keys between thumbs (`FocusgroupNavigationController`, `direction: 'both'`)                                                                                        |
| Slots / CSS props | none                                                                                                                                                                     |

### `swc-message-sources` (`message-sources/MessageSources.ts`), self-managed

| Kind       | API                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------- |
| Properties | `open: boolean` (R); `label` ("Sources"); `accessible-label`                              |
| Slots      | default: `<a>` elements only (copied into a generated `<ol>`; read once per `slotchange`) |
| Events     | `swc-message-sources-toggle {open}` (fired after the element flips `open`)                |
| CSS props  | none                                                                                      |

### `swc-suggestion-group` (`suggestion/SuggestionGroup.ts`)

| Kind               | API                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Properties         | `accessible-label`                                                                                                  |
| Slots              | `heading` (documented as required; labels the group via `aria-labelledby`); default: `swc-suggestion-item` elements |
| Host ARIA          | `role="group"` on the host, removed when there's no heading and no label                                            |
| Events / CSS props | none                                                                                                                |

### `swc-suggestion-item` (`suggestion-item/SuggestionItem.ts`)

| Kind       | API                                                                  |
| ---------- | -------------------------------------------------------------------- |
| Properties | none                                                                 |
| Slots      | default: label text                                                  |
| Events     | `swc-suggestion {label}` (the label comes from `textContent.trim()`) |
| Renders    | `swc-button` + decorative icon                                       |

---

## Input

### `swc-prompt-field` (`prompt-field/PromptField.ts`)

| Property              | Attribute                                                                                                                                                                                                                                                             | Type / default                                          | R   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | --- |
| `value`               | `value`                                                                                                                                                                                                                                                               | `string` = `''`                                         |     |
| `generating`          | `generating`                                                                                                                                                                                                                                                          | `boolean`: send button becomes stop                     | ✓   |
| `disabled`            | `disabled`                                                                                                                                                                                                                                                            | `boolean`                                               | ✓   |
| `variant`             | `variant`                                                                                                                                                                                                                                                             | `'subtle' \| 'balanced' \| 'prominent'` = `'balanced'`  | ✓   |
| `size`                | `size`                                                                                                                                                                                                                                                                | `'s' \| 'm'` = `'m'`                                    | ✓   |
| `loader`              | `loader`                                                                                                                                                                                                                                                              | pixel-loader icon/preset = `'aiLogo'`                   | ✓   |
| `animateLoader`       | `animate-loader`                                                                                                                                                                                                                                                      | `boolean`                                               | ✓   |
| `minRows` / `maxRows` | `min-rows` / `max-rows`                                                                                                                                                                                                                                               | `number`                                                |     |
| `collapsed`           | `collapsed`                                                                                                                                                                                                                                                           | `boolean` (marked `@internal` but public and reflected) | ✓   |
| Labels                | `label` ("Prompt"), `accessible-label`, `placeholder`, `send-label` ("Send"), `stop-label` ("Stop generating"), `upload-label` ("Add attachment"), `attachment-scroll-prev-label`, `attachment-scroll-next-label`, `attachment-strip-label` ("Uploaded assets strip") | `string`                                                |     |

| Kind      | API                                                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slots     | `attachment` (`swc-upload-attachment` elements, one type only); `legal` (dev warning if empty)                                                                                                          |
| Events    | `-submit {value}`, `-input {value}`, `-stop`, `-upload-click` (cancelable flag has no effect), `-drop {files}`                                                                                          |
| CSS props | `--swc-prompt-field-brand-color`, `--swc-prompt-field-max-block-size`, `--swc-prompt-field-attachment-card-inline-size`, `--swc-prompt-field-attachment-media-{inline,min-inline,block,min-block}-size` |
| States    | idle, generating, disabled, collapsed, dragging, attachment overflow (chevrons use `aria-disabled`)                                                                                                     |

### `swc-upload-attachment` (`upload-attachment/UploadAttachment.ts`)

| Kind       | API                                                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Properties | `type: 'card' \| 'media'` = `'card'` (R); `dismissible: boolean` (R); `dismiss-label` (fallback "Remove {title}" / "Remove attachment"); `accessible-label` |
| Slots      | `thumbnail`, `badge`, `title`, `subtitle`, `actions`                                                                                                        |
| Events     | `swc-upload-attachment-dismiss {attachment}`. **You** remove the node.                                                                                      |
| Host ARIA  | `role="group"` + `aria-label` (from `accessible-label` or the title slot), set in `firstUpdated`                                                            |
| CSS props  | 8 × `--swc-upload-attachment-*` (focus color, card sizes, preview size, dismiss sizes)                                                                      |

### `swc-pixel-loader` (internal) (`pixel-loader/PixelLoader.ts`)

| Kind       | API                                                                          |
| ---------- | ---------------------------------------------------------------------------- |
| Properties | `icon` = `'aiLogo'` (R); `preset` (R); `paused` (R); `label` = "Loading" (R) |
| Exports    | `PIXEL_LOADER_ICON_NAMES`, `PIXEL_LOADER_PRESET_NAMES`, matching types       |
| A11y       | inner `role="progressbar"` (indeterminate); honors `prefers-reduced-motion`  |
| CSS props  | `--swc-pixel-loader-size`, `--swc-pixel-loader-color`                        |
| Validation | the only toolkit element that uses `validateEnum`                            |
