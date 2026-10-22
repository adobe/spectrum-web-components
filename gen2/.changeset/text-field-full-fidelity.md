---
'@adobe/spectrum-wc-core': minor
'@adobe/spectrum-wc': minor
---

Add Spectrum 2 text-field rendering and behavior, with shared labelling and description support for form fields.

- **Text-field appearance and interaction**: Add a visible label, native input, non-interactive `prefix` slot, validation icon, and supporting text. Support sizes `s`, `m`, `l`, and `xl`, with customizable control widths and side-label wrapping. Use `field-status` for disabled, read-only, invalid, or valid status, with `required` independent. The field has one tab stop and supports click-to-focus and native text selection through `select()` and `setSelectionRange()`.
- **Accessible labels**: Add `LabellingMixin` and `renderFieldLabel` to `@adobe/spectrum-wc-core`, and use them in `swc-text-field`. Support a clickable slotted label, `accessible-label`, and external labels through `accessible-labelledby`, with browser-resolved accessible-name precedence and development warnings for missing or conflicting names.
- **Descriptions and errors**: Add `FieldDescriptionMixin` and `renderFieldDescription` to `@adobe/spectrum-wc-core`, and use them in `swc-text-field`. Combine slotted descriptions with external `accessible-describedby` references. While invalid, supplied `error-text` replaces the description; without an `error-text` slot, keep the description visible in the error color. Associate the visible message with the input.
- **Validation and forms**: Support native form validation, reset, `FormData`, and ancestor fieldset disabling. Application-controlled invalid status makes eligible fields fail validation, using the plain text of `error-text` as the validation message and observing message changes automatically. Missing or empty error text uses "Enter a valid value." for validation without showing fallback inline text. Clearing invalid status clears the application error without bypassing native constraints. Form reset restores the initial value and clears valid or invalid status without changing disabled or read-only status. Inline error presentation remains application-controlled.
- **Implicit submission**: Count only native inputs with supported text-field types when determining whether another input prevents Enter-key submission in a form without a submit button.
- **Necessity indicators**: Add `necessity-indicator="icon|label"` and allow consumers and downstream field components to customize or translate required and optional text.
- **Shared styling**: Extract reusable form-field styles into `@adobe/spectrum-wc-core`.
