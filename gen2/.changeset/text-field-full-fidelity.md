---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

Add Spectrum 2 `<swc-text-field>` with accessible labelling, validation, and native form participation.

- **Appearance and interaction**: Support sizes `s`, `m`, `l`, and `xl`, `label-position="top|side"`, a non-interactive `prefix` slot, and customizable control widths. The field has one tab stop, supports click-to-focus, and exposes native text selection through `select()` and `setSelectionRange()`.
- **Accessible labels and descriptions**: Provide a clickable slotted label, an `accessible-label`, or external labels through `accessible-labelledby`. Combine a slotted `description` with external `accessible-describedby` references.
- **Field states**: Use `field-status` for disabled, read-only, invalid, or valid status. Keep `required` independent, and use `necessity-indicator="icon|label"` to show an icon or required/optional text.
- **Descriptions and errors**: While invalid, supplied `error-text` replaces the description. Without an `error-text` slot, keep the description visible in the error color. Associate the visible message with the input for assistive technology.
- **Validation**: Invalid status makes eligible fields fail validation, using the plain text of `error-text` as the message. Missing or empty text uses "Enter a valid value." for validation without adding fallback inline text. Clearing invalid status clears the application error; native constraints still apply.
- **Forms and reset**: Support `FormData`, ancestor fieldset disabling, and Enter-key submission. Form reset restores the initial value and clears valid or invalid status without changing disabled or read-only status.
