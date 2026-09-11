"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{display:inline-flex}:host([quiet]){min-width:0}:host>sp-menu{display:none}::slotted([slot=icon]),.icon{flex-shrink:0}#popover{max-width:none}::slotted([slot=icon]:dir(ltr)),.icon:dir(ltr){margin-left:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}::slotted([slot=icon]:dir(rtl)),.icon:dir(rtl){margin-right:calc(-1*(var(--spectrum-actionbutton-textonly-padding-left-adjusted) - var(--spectrum-actionbutton-padding-left-adjusted)))}slot[icon-only]::slotted([slot=icon]),slot[icon-only] .icon{margin-inline:calc((var(--custom-actionbutton-edge-to-text,var(--spectrum-actionbutton-edge-to-text)) - var(--custom-actionbutton-edge-to-visual-only,var(--spectrum-actionbutton-edge-to-visual-only)))*-1)}sp-overlay:not(:defined){display:none}
`;
export default styles;
//# sourceMappingURL=action-menu.css.dev.js.map
