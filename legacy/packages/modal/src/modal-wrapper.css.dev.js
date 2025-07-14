"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{box-sizing:border-box;inline-size:100vw;block-size:100vh;block-size:-webkit-fill-available;block-size:stretch;visibility:hidden;pointer-events:none;z-index:1;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-animation-duration-100));justify-content:center;align-items:center;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){inline-size:100%;block-size:100%;max-inline-size:100%;max-block-size:100%;border-radius:0}:host([responsive]){margin-block-start:0}}
`;
export default styles;
//# sourceMappingURL=modal-wrapper.css.dev.js.map
