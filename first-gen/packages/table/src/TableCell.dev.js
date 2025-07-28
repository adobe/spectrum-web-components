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
import styles from "./table-cell.css.js";
export class TableCell extends SpectrumElement {
  constructor() {
    super(...arguments);
    this.role = "gridcell";
  }
  static get styles() {
    return [styles];
  }
  render() {
    return html`
            <slot></slot>
        `;
  }
}
__decorateClass([
  property({ reflect: true })
], TableCell.prototype, "role", 2);
//# sourceMappingURL=TableCell.dev.js.map
