---
'@adobe/spectrum-wc': patch
---

**fix(ai-toolkit):** Documented `@cssprop` JSDoc for every exposed custom property across the AI Toolkit patterns (`swc-pixel-loader`, `swc-user-message`, `swc-upload-attachment`, `swc-prompt-field`, `swc-response-status`, `swc-response-status-step`, `swc-message-sources`), and removed custom properties that existed for consumer convenience alone rather than to support the component's own variant, state, or size needs, per the [Custom properties style guide](../2nd-gen/packages/swc/.storybook/contributor-docs/02_style-guide/01_css/02_custom-properties.mdx).

Removed (now static values, no longer overridable): `--swc-suggestion-item-min-block-size`, `--swc-suggestion-item-icon-margin-inline-start`, `--swc-suggestion-item-icon-margin-inline-end`, `--swc-suggestion-item-label-padding-block`, `--swc-suggestion-item-label-padding-inline-end`, `--swc-message-feedback-gap`, `--swc-message-feedback-button-inline-size`, `--swc-message-feedback-button-block-size`, `--swc-message-feedback-button-border-radius`, `--swc-conversation-thread-gap`, `--swc-conversation-turn-group-gap`, `--swc-system-message-gap`, `--swc-system-message-body-gap`, `--swc-system-message-output-gap`, `--swc-system-message-content-gap`, `--swc-user-message-meta-gap`, `--swc-message-sources-gap`, `--swc-message-sources-icon-inline-size`, `--swc-message-sources-icon-block-size`, `--swc-message-sources-list-gap`.

Renamed to match every other component's `--swc-<component>-*` naming: `--swc-sources-toggle-gap` → `--swc-message-sources-toggle-gap`, `--swc-sources-toggle-padding` → `--swc-message-sources-toggle-padding`.

No visual change; all removed/renamed properties previously resolved to their existing fallback value in every shipped usage.
