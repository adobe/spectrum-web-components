"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{--spectrum-buttongroup-spacing:var(--mod-buttongroup-spacing,var(--mod-buttongroup-spacing-horizontal,var(--spectrum-spacing-300)));--spectrum-buttongroup-display:flex;--spectrum-buttongroup-flex-direction:row;--spectrum-buttongroup-justify-content:var(--mod-buttongroup-justify-content,normal)}:host([size=s]){--spectrum-buttongroup-spacing:var(--mod-buttongroup-spacing,var(--mod-buttongroup-spacing-horizontal,var(--spectrum-spacing-200)))}:host([vertical]){--mod-buttongroup-spacing:var(--mod-buttongroup-spacing-vertical);--spectrum-buttongroup-display:inline-flex;--spectrum-buttongroup-flex-direction:column}:host{display:var(--spectrum-buttongroup-display);flex-direction:var(--spectrum-buttongroup-flex-direction);gap:var(--spectrum-buttongroup-spacing);justify-content:var(--spectrum-buttongroup-justify-content);flex-wrap:wrap}::slotted(*){flex-shrink:0}:host([vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-flex-grow:1}:host([dir=ltr][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:left}:host([dir=rtl][vertical]) ::slotted(sp-action-button){--spectrum-actionbutton-label-text-align:right}
`;
export default styles;
//# sourceMappingURL=button-group.css.dev.js.map
