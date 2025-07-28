"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  SpectrumElement
} from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import sidenavItemStyles from "./sidenav-item.css.js";
import sidenavHeadingStyles from "./sidenav-heading.css.js";
export class SideNavHeading extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.label = "";
  }
  static get styles() {
    return [sidenavItemStyles, sidenavHeadingStyles];
  }
  update(changes) {
    if (!this.hasAttribute("slot")) {
      this.slot = "descendant";
    }
    super.update(changes);
  }
  render() {
    return html`
            <h2 id="heading">${this.label}</h2>
            <div id="list" aria-labelledby="heading" role="list">
                <slot name="descendant"></slot>
            </div>
        `;
  }
  firstUpdated(changed) {
    super.firstUpdated(changed);
    this.setAttribute("role", "listitem");
  }
}
__decorateClass([
  property({ reflect: true })
], SideNavHeading.prototype, "label", 2);
//# sourceMappingURL=SidenavHeading.dev.js.map
