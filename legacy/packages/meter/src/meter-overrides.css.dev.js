"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    :host{--spectrum-meter-min-width:var(--system-meter-min-width);--spectrum-meter-max-width:var(--system-meter-max-width);--spectrum-meter-inline-size:var(--system-meter-inline-size);--spectrum-meter-top-to-text:var(--system-meter-top-to-text);--spectrum-meter-fill-color-positive:var(--system-meter-fill-color-positive);--spectrum-meter-fill-color-notice:var(--system-meter-fill-color-notice);--spectrum-meter-fill-color-negative:var(--system-meter-fill-color-negative);--spectrum-meter-thickness:var(--system-meter-thickness);--spectrum-meter-font-size:var(--system-meter-font-size)}:host([size=s]){--spectrum-meter-thickness:var(--system-meter-size-s-thickness);--spectrum-meter-inline-size:var(--system-meter-size-s-inline-size);--spectrum-meter-font-size:var(--system-meter-size-s-font-size);--spectrum-meter-top-to-text:var(--system-meter-size-s-top-to-text)}:host([size=l]){--spectrum-meter-thickness:var(--system-meter-size-l-thickness);--spectrum-meter-inline-size:var(--system-meter-size-l-inline-size);--spectrum-meter-font-size:var(--system-meter-size-l-font-size);--spectrum-meter-top-to-text:var(--system-meter-size-l-top-to-text)}
`;
export default styles;
//# sourceMappingURL=meter-overrides.css.dev.js.map
