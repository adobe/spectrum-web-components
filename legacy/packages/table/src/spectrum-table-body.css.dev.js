"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{border-radius:var(--mod-table-border-radius,var(--spectrum-table-border-radius));border:none;display:table-row-group;position:relative}:host([drop-target]){--mod-table-border-color:transparent;outline-width:var(--mod-table-focus-indicator-thickness,var(--spectrum-table-focus-indicator-thickness));outline-style:solid;outline-color:var(--highcontrast-table-focus-indicator-color,var(--mod-table-drop-zone-outline-color,var(--spectrum-table-drop-zone-outline-color)))}
`;
export default styles;
//# sourceMappingURL=spectrum-table-body.css.dev.js.map
