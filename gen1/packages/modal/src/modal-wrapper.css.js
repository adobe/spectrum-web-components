"use strict";import{css as i}from"@spectrum-web-components/base";const e=i`
    :host{box-sizing:border-box;visibility:hidden;z-index:1;pointer-events:none;block-size:stretch;inline-size:100vw;transition:visibility 0s linear var(--mod-modal-transition-animation-duration,var(--spectrum-animation-duration-100));justify-content:center;align-items:center;display:flex;position:fixed;inset-block-start:0;inset-inline-start:0}:host([open]){visibility:visible}@media only screen and (device-height<=350px),only screen and (device-width<=400px){:host([responsive]){border-radius:0;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;margin-block-start:0}}
`;export default e;
//# sourceMappingURL=modal-wrapper.css.js.map
