---
'@adobe/spectrum-wc': patch
---

Fix several `swc-response-status` visual/behavior mismatches against the Figma spec:

- The header label no longer stays in its lighter, unfocused color while the step timeline is expanded — it now darkens to match the hover treatment.
- The completed-status default label reads "Response complete" instead of "Response generated".
- The header toggle button no longer relies on the browser's native `<button>` text color, which some mobile browsers rendered as accent blue for the completed checkmark icon.
- The `Status only` Storybook story no longer leaks into the sidebar/docs/prod build; it was incorrectly tagged `dev`, a tag reserved for the Playground story.
- The header toggle's clickable area now spans the full row, not just the fit-content label and chevron.
