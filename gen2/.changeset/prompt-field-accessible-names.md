---
'@adobe/spectrum-wc': minor
---

**feat(prompt-field):** Make `<swc-prompt-field>` name its textarea without visually hidden text, and keep focus on the send/stop button when `generating` changes.

**Breaking changes** to the beta API. Every attribute that sets a non-visible name now ends in `-accessible-label`:

- Removed `label`. The textarea is now named by `accessible-label` (default "AI prompt"), which the AI status indicator carries and the textarea references through `aria-labelledby`.
- Renamed `send-label` to `send-accessible-label`. The default changed from "Send" to "Submit AI prompt".
- Renamed `stop-label` to `stop-accessible-label`. The default changed from "Stop generating" to "Stop".
- Renamed `upload-label` to `upload-accessible-label`.
- Renamed `attachment-scroll-prev-label` and `attachment-scroll-next-label` to `attachment-scroll-prev-accessible-label` and `attachment-scroll-next-accessible-label`.
- Renamed `attachment-strip-label` to `attachment-strip-accessible-label`.

**Accessibility fixes:**

- Send and stop are now one persistent button, so focus stays on it when `generating` toggles and screen readers announce the new name on the focused control. Before, the button was replaced and focus dropped to the page.
- With no prompt content, the button uses `aria-disabled="true"` instead of native `disabled`, so it stays focusable after the value is cleared.
- Removed the visually hidden label element and the textarea's `aria-label`, which `aria-labelledby` overrode and never took effect.
