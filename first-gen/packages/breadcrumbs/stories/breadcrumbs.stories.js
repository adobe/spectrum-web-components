"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _maxVisibleItems;
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js";
import { LitElement } from "@spectrum-web-components/base";
import { property } from "@spectrum-web-components/base/src/decorators.js";
import {
  getBreadcrumbs,
  getBreadcrumbsWithLinks,
  getResizableStyles,
  Template
} from "./template.js";
import { argTypes } from "./args.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { spreadProps } from "../../../test/lit-helpers.js";
import "@spectrum-web-components/button/sp-button.js";
export default {
  title: "Breadcrumbs",
  component: "sp-breadcrumbs",
  args: {
    "max-visible-items": 4
  },
  argTypes
};
export const Default = (args) => Template(args);
export const Disabled = (args) => Template(args);
Disabled.args = {
  disabled: true
};
export const Compact = (args) => Template(args);
Compact.args = {
  compact: true
};
export const Links = (args) => {
  return html`
        <sp-breadcrumbs
            ${spreadProps(args)}
            max-visible-items=${ifDefined(args["max-visible-items"])}
            @change=${args.onChange}
        >
            ${getBreadcrumbsWithLinks(4)}
        </sp-breadcrumbs>
    `;
};
class AddItemsStoryBreadcrumbs extends LitElement {
  constructor() {
    super(...arguments);
    this._counter = 2;
    this._items = [];
    __privateAdd(this, _maxVisibleItems, 4);
  }
  get maxVisibleItems() {
    return __privateGet(this, _maxVisibleItems);
  }
  set maxVisibleItems(_) {
    __privateSet(this, _maxVisibleItems, _);
  }
  firstUpdated() {
    this._items = getBreadcrumbsWithLinks(this._counter);
    this.requestUpdate();
  }
  render() {
    return html`
            <sp-breadcrumbs
                max-visible-items=${this.maxVisibleItems}
                @slotchange=${() => {
      var _a;
      const breadcrumbs = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("sp-breadcrumbs");
      if (breadcrumbs) {
        breadcrumbs.requestUpdate();
      }
    }}
            >
                ${this._items}
            </sp-breadcrumbs>
            <sp-button
                @click=${() => {
      this._counter++;
      this._items = getBreadcrumbsWithLinks(this._counter);
      this.requestUpdate();
    }}
                style="margin-top: 8px;"
                id="add-more-items"
            >
                Add more items (current: ${this._counter})
            </sp-button>
        `;
  }
}
_maxVisibleItems = new WeakMap();
__decorateClass([
  property({ type: Number })
], AddItemsStoryBreadcrumbs.prototype, "maxVisibleItems", 1);
customElements.define("add-items-story-breadcrumbs", AddItemsStoryBreadcrumbs);
export const AddItemsDynamic = (args) => {
  return html`
        <add-items-story-breadcrumbs
            maxVisibleItems=${ifDefined(args["max-visible-items"])}
        ></add-items-story-breadcrumbs>
    `;
};
AddItemsDynamic.swc_vrt = {
  skip: true
};
export const ShowRoot = (args) => {
  return html`
        <sp-breadcrumbs
            ${spreadProps(args)}
            max-visible-items=${ifDefined(args["max-visible-items"])}
            @change=${args.onChange}
        >
            <sp-breadcrumb-item value="Home" slot="root">
                Home
            </sp-breadcrumb-item>
            ${getBreadcrumbs(6)}
        </sp-breadcrumbs>
    `;
};
export const resizableBehavior = (args) => {
  return html`
        <div class="resizable-container">
            ${getResizableStyles()}

            <sp-breadcrumbs
                ${spreadProps(args)}
                max-visible-items=${ifDefined(args["max-visible-items"])}
                @change=${args.onChange}
            >
                ${getBreadcrumbs(4)}
            </sp-breadcrumbs>
        </div>
    `;
};
//# sourceMappingURL=breadcrumbs.stories.js.map
