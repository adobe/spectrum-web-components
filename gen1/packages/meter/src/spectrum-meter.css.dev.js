"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{--mod-progressbar-size-default:var(--mod-meter-inline-size,var(--spectrum-meter-inline-size));--mod-progressbar-max-size:var(--mod-meter-max-width,var(--spectrum-meter-max-width));--mod-progressbar-min-size:var(--mod-meter-min-width,var(--spectrum-meter-min-width));--mod-progressbar-thickness:var(--spectrum-meter-thickness);--mod-progressbar-font-size:var(--spectrum-meter-font-size);--mod-progressbar-spacing-top-to-text:var(--spectrum-meter-top-to-text)}:host([variant=positive]){--mod-progressbar-fill-color:var(--mod-meter-fill-color-positive,var(--spectrum-meter-fill-color-positive))}:host([variant=notice]){--mod-progressbar-fill-color:var(--mod-meter-fill-color-notice,var(--spectrum-meter-fill-color-notice))}:host([variant=negative]){--mod-progressbar-fill-color:var(--mod-meter-fill-color-negative,var(--spectrum-meter-fill-color-negative))}
`;
export default styles;
//# sourceMappingURL=spectrum-meter.css.dev.js.map
