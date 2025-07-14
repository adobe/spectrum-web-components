"use strict";
import {
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import menuDividerStyles from "./menu-divider.css.js";
import dividerStyles from "@spectrum-web-components/divider/src/divider.css.js";
export class MenuDivider extends SizedMixin(SpectrumElement, {
  validSizes: ["s", "m", "l"]
}) {
  static get styles() {
    return [dividerStyles, menuDividerStyles];
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.setAttribute("role", "separator");
  }
}
//# sourceMappingURL=MenuDivider.dev.js.map
