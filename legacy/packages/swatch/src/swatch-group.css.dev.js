"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{justify-content:flex-start;align-items:flex-start;gap:var(--mod-swatchgroup-spacing-regular,var(--spectrum-swatchgroup-spacing-regular));flex-flow:wrap;display:inline-flex}:host([density=compact]){gap:var(--mod-swatchgroup-spacing-compact,var(--spectrum-swatchgroup-spacing-compact))}:host([density=spacious]){gap:var(--mod-swatchgroup-spacing-spacious,var(--spectrum-swatchgroup-spacing-spacious))}:host{--spectrum-swatchgroup-spacing-compact:var(--system-swatch-group-spacing-compact);--spectrum-swatchgroup-spacing-regular:var(--system-swatch-group-spacing-regular);--spectrum-swatchgroup-spacing-spacious:var(--system-swatch-group-spacing-spacious)}
`;
export default styles;
//# sourceMappingURL=swatch-group.css.dev.js.map
