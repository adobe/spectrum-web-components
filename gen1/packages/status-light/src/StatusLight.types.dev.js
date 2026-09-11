"use strict";
export const STATUSLIGHT_VALID_SIZES = [
  "s",
  "m",
  "l",
  "xl"
];
export const STATUSLIGHT_VARIANTS_SEMANTIC = [
  "neutral",
  "info",
  "positive",
  "negative",
  "notice"
];
export const STATUSLIGHT_VARIANTS_SEMANTIC_S1 = [
  ...STATUSLIGHT_VARIANTS_SEMANTIC,
  "accent"
];
export const STATUSLIGHT_VARIANTS_SEMANTIC_S2 = [
  ...STATUSLIGHT_VARIANTS_SEMANTIC
];
export const STATUSLIGHT_VARIANTS_COLOR_S1 = [
  "fuchsia",
  "indigo",
  "magenta",
  "purple",
  "seafoam",
  "yellow",
  "chartreuse",
  "celery",
  "cyan"
];
export const STATUSLIGHT_VARIANTS_COLOR_S2 = [
  ...STATUSLIGHT_VARIANTS_COLOR_S1,
  "pink",
  "turquoise",
  "brown",
  "cinnamon",
  "silver"
];
export const STATUSLIGHT_VARIANTS_S1 = [
  ...STATUSLIGHT_VARIANTS_SEMANTIC_S1,
  ...STATUSLIGHT_VARIANTS_COLOR_S1
];
export const STATUSLIGHT_VARIANTS_S2 = [
  ...STATUSLIGHT_VARIANTS_SEMANTIC_S2,
  ...STATUSLIGHT_VARIANTS_COLOR_S2
];
//# sourceMappingURL=StatusLight.types.dev.js.map
