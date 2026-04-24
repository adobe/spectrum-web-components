<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / Reference / Component status

<!-- Document title (editable) -->

# Component status

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Column meanings](#column-meanings)

</details>

<!-- Document content (editable) -->

<!-- GENERATED FILE — DO NOT EDIT DIRECTLY.
Regenerate with: yarn generate:component-matrix
Rows + status + since come from CEM (`.storybook/custom-elements.json`).
Figma + Stackblitz URLs come from each component's `stories/*.stories.ts`.
RSP 2 parity is a human judgment set in `component-status.data.yml` (defaults
to `partial`). It will move to an `@RSPparity` JSDoc tag parsed by CEM once
the MVP-5 CEM plugin lands. -->

At-a-glance migration status, React Spectrum 2 parity, and design/
sandbox links for every 2nd-gen component. API surface (properties,
slots, events, CSS parts) lives on each component's Storybook page.

| Component | Status | Since | RSP 2 parity | Figma | Stackblitz | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| [`<swc-asset>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/asset) | Unsupported | — | partial | — | — | Will be considered when Card component is migrated |
| [`<swc-avatar>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/avatar) | Preview | 0.0.1 | partial | — | — |  |
| [`<swc-badge>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/badge) | Preview | 0.0.1 | partial | [Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=36806-6551) | [Stackblitz](https://stackblitz.com/edit/vitejs-vite-4glrpeeb?file=package.json) |  |
| [`<swc-divider>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/divider) | Preview | 0.0.1 | partial | [Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=13642-334) | [Stackblitz](https://stackblitz.com/edit/vitejs-vite-rqfjtpgz?file=package.json) | Horizontal and vertical orientations |
| [`<swc-icon>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/icon) | Internal | 0.0.1 | partial | — | — | Internal status; prefer icon packages directly |
| [`<swc-progress-circle>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/progress-circle) | Preview | 0.0.1 | partial | [Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13061-181&p=f&t=l8WhfseyuepkVXrl-0) | [Stackblitz](https://stackblitz.com/edit/vitejs-vite-xx1plot6?file=package.json) | Indeterminate + determinate |
| [`<swc-status-light>`](https://github.com/adobe/spectrum-web-components/tree/main/2nd-gen/packages/swc/components/status-light) | Preview | 0.0.1 | partial | [Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=36797-954) | [Stackblitz](https://stackblitz.com/edit/vitejs-vite-y2kz1rkx?file=package.json) |  |

## Column meanings

- **Status** — `Preview` (API may change), `Stable` (public), `Internal` (not for consumers), `Deprecated`, `Unsupported`. Derived from CEM (`@status` JSDoc tag).
- **Since** — first 2nd-gen package version to ship the component. Derived from CEM (`@since` JSDoc tag).
- **RSP 2 parity** — whether the 2nd-gen component reaches feature parity with the equivalent React Spectrum 2 component. Values: `full`, `partial`, `none`, or a short note. Currently a human judgment set in `component-status.data.yml`; defaults to `partial` while per-component RSP tracking is being designed. Will move to an `@RSPparity` JSDoc tag parsed by CEM once the MVP-5 plugin lands.
