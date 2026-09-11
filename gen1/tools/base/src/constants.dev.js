"use strict";
export const INPUT_COMPONENT_TAGS = [
  "SP-SEARCH",
  "SP-TEXTFIELD",
  "SP-NUMBER-FIELD",
  "SP-COMBOBOX",
  "SP-COLOR-FIELD"
];
export const INPUT_COMPONENT_PATTERN = new RegExp(
  `^(${INPUT_COMPONENT_TAGS.join("|")})$`
);
//# sourceMappingURL=constants.dev.js.map
