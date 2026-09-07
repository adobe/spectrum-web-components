---
'@adobe/spectrum-wc': patch
---

**fix(ai-toolkit):** Documented `@cssprop` JSDoc for every exposed custom property across the AI Toolkit patterns (`swc-pixel-loader`, `swc-user-message`, `swc-upload-attachment`, `swc-prompt-field`, `swc-response-status`, `swc-response-status-step`, `swc-message-sources`), and removed custom properties that existed for consumer convenience alone rather than to support the component's own variant, state, or size needs, per the [Custom properties style guide](../2nd-gen/packages/swc/.storybook/contributor-docs/02_style-guide/01_css/02_custom-properties.mdx).

Removed (now static values, no longer overridable): `--swc-suggestion-item-min-block-size`, `--swc-suggestion-item-icon-margin-inline-start`, `--swc-suggestion-item-icon-margin-inline-end`, `--swc-suggestion-item-label-padding-block`, `--swc-suggestion-item-label-padding-inline-end`, `--swc-message-feedback-gap`, `--swc-message-feedback-button-inline-size`, `--swc-message-feedback-button-block-size`, `--swc-message-feedback-button-border-radius`, `--swc-conversation-thread-gap`, `--swc-conversation-turn-group-gap`, `--swc-system-message-gap`, `--swc-system-message-body-gap`, `--swc-system-message-output-gap`, `--swc-system-message-content-gap`, `--swc-message-sources-gap`, `--swc-message-sources-icon-inline-size`, `--swc-message-sources-icon-block-size`, `--swc-message-sources-list-gap`, `--swc-user-message-padding-block`, `--swc-user-message-padding-inline`, `--swc-user-message-card-padding`, `--swc-user-message-media-padding`, `--swc-user-message-attachment-card-gap`, `--swc-user-message-attachment-media-gap`, `--swc-user-message-meta-gap`.

Renamed to match every other component's `--swc-<component>-*` naming: `--swc-sources-toggle-gap` → `--swc-message-sources-toggle-gap`, `--swc-sources-toggle-padding` → `--swc-message-sources-toggle-padding`.

Made private (internal JS-to-CSS wiring, not a consumer override surface — use the `min-rows`/`max-rows` attributes instead): `--swc-prompt-field-textarea-min-rows` → `--_swc-prompt-field-textarea-min-rows`, `--swc-prompt-field-textarea-max-rows` → `--_swc-prompt-field-textarea-max-rows`.

Also replaced hardcoded pixel values with the matching design token wherever one exists at that exact value (`border: 1px solid transparent` → `token("border-width-100")`, assorted `2px`/`6px`/`16px` gaps, margins, and insets → their `spacing-*` token). Bespoke Figma-spec dimensions with no matching token (attachment tile sizes, badge geometry, box-shadow offsets, etc.) are left as literal values.

No visual change; all removed/renamed/retokenized properties previously resolved to their existing fallback (or, for the token swaps, the exact same pixel value) in every shipped usage.
