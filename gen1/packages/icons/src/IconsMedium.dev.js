"use strict";
import { IconsetSVG } from "@spectrum-web-components/iconset/src/iconset-svg.js";
import iconsSVG from "./icons-medium.svg.dev.js";
export class IconsMedium extends IconsetSVG {
  constructor() {
    super();
    this.name = "ui";
  }
  firstUpdated() {
    super.firstUpdated();
    if (true) {
      window.__swc.warn(
        this,
        "Icons package has been deprecated and will be removed from the project in an upcoming release. For default Spectrum Icons, learn more about leveraging UI Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-ui/) or Workflow Icons (https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/) as an alternative.",
        "https://opensource.adobe.com/spectrum-web-components/components/icons/#deprecated",
        { level: "deprecation" }
      );
    }
  }
  renderDefaultContent() {
    return iconsSVG;
  }
  /**
   * Overrides createIconName to make icon strings compatible with spectrum-icon id format
   * @param icon
   * @param size
   */
  getSVGIconName(icon) {
    return `spectrum-icon-${icon}`;
  }
  getSanitizedIconName(icon) {
    return icon.replace("spectrum-icon-", "");
  }
}
//# sourceMappingURL=IconsMedium.dev.js.map
