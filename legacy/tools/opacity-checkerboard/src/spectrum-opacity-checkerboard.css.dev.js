"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    .opacity-checkerboard{background:repeating-conic-gradient(var(--mod-opacity-checkerboard-light,var(--spectrum-opacity-checkerboard-square-light))0 25%,var(--mod-opacity-checkerboard-dark,var(--spectrum-opacity-checkerboard-square-dark))0 50%)0 0/calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)}@supports (background:repeating-conic-gradient(from 0deg, red 0deg, red 0deg 1deg, red 2deg)){.opacity-checkerboard{background:repeating-conic-gradient(var(--mod-opacity-checkerboard-light,var(--spectrum-opacity-checkerboard-square-light))0 25%,var(--mod-opacity-checkerboard-dark,var(--spectrum-opacity-checkerboard-square-dark))0 50%)var(--mod-opacity-checkerboard-position,left top)/calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)calc(var(--mod-opacity-checkerboard-size,var(--spectrum-opacity-checkerboard-square-size))*2)}}@media (forced-colors:active){.opacity-checkerboard{forced-color-adjust:none}}
`;
export default styles;
//# sourceMappingURL=spectrum-opacity-checkerboard.css.dev.js.map
