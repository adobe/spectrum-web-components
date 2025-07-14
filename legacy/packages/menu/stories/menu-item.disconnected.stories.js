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
import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { when } from "lit/directives/when.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/button/sp-button.js";
import { SpectrumMixin } from "@spectrum-web-components/base";
var BlendModeValue = /* @__PURE__ */ ((BlendModeValue2) => {
  BlendModeValue2[BlendModeValue2["normal"] = 2] = "normal";
  BlendModeValue2[BlendModeValue2["multiply"] = 3] = "multiply";
  BlendModeValue2[BlendModeValue2["screen"] = 7] = "screen";
  return BlendModeValue2;
})(BlendModeValue || {});
const XElement = SpectrumMixin(LitElement);
class MyContainer extends XElement {
  constructor() {
    super(...arguments);
    this._counter = 0;
  }
  _handleClick() {
    this._counter += 1;
  }
  render() {
    return html`
            <div>
                ${when(
      this._counter % 2 === 0,
      () => html`
                        <my-view1></my-view1>
                    `,
      () => html`
                        <my-view2></my-view2>
                    `
    )}
                <sp-button
                    variant="primary"
                    size="m"
                    @click=${this._handleClick}
                >
                    Switch views
                </sp-button>
            </div>
        `;
  }
}
__decorateClass([
  state()
], MyContainer.prototype, "_counter", 2);
customElements.define("my-container", MyContainer);
class MyView1 extends XElement {
  render() {
    const blendModeOptions = [
      {
        value: 2 /* normal */,
        title: "Normal 1",
        subtitle: "No effect applied"
      },
      {
        value: 3 /* multiply */,
        title: "Multiply",
        subtitle: "Darken shadows with contrast and details"
      },
      {
        value: 7 /* screen */,
        title: "Screen",
        subtitle: "Brighten highlights with contrast and details"
      }
    ];
    return html`
            View 1
            <my-picker
                .blendMode=${2 /* normal */}
                .blendModeOptions=${blendModeOptions}
                dir="ltr"
            ></my-picker>
        `;
  }
}
customElements.define("my-view1", MyView1);
class MyView2 extends XElement {
  render() {
    const blendModeOptions = [
      {
        value: 2 /* normal */,
        title: "Normal 2",
        subtitle: "No effect applied"
      },
      {
        value: 3 /* multiply */,
        title: "Multiply",
        subtitle: "Darken shadows with contrast and details"
      },
      {
        value: 7 /* screen */,
        title: "Screen",
        subtitle: "Brighten highlights with contrast and details"
      }
    ];
    return html`
            View 2
            <my-picker
                .blendMode=${2 /* normal */}
                .blendModeOptions=${blendModeOptions}
            ></my-picker>
        `;
  }
}
customElements.define("my-view2", MyView2);
class MyPicker extends XElement {
  constructor() {
    super(...arguments);
    this.blendModeOptions = [];
    this.blendMode = 2 /* normal */;
  }
  _renderBlendOptions() {
    return html`
            ${repeat(
      this.blendModeOptions,
      // This is intentional so that repeat directive will add instead of
      // update existing DOM which will then trigger error in
      // MenuItem.childrenItem
      // Using .value for the key will workaround the issue
      (blendModeOption) => blendModeOption,
      (blendModeOption) => html`
                    <sp-menu-item value=${blendModeOption.value}>
                        ${blendModeOption.title}
                        <span slot="value">${blendModeOption.subtitle}</span>
                    </sp-menu-item>
                `
    )}
        `;
  }
  render() {
    return html`
            <sp-picker
                id="blendMode"
                size="l"
                label="Blend"
                value=${this.blendMode}
            >
                ${this._renderBlendOptions()}
            </sp-picker>
        `;
  }
}
__decorateClass([
  property({ type: Array })
], MyPicker.prototype, "blendModeOptions", 2);
__decorateClass([
  property()
], MyPicker.prototype, "blendMode", 2);
customElements.define("my-picker", MyPicker);
export default {
  component: "sp-menu-item",
  title: "Menu Item/Disconnected"
};
export const disconnectedChildItems = () => html`
    <my-container></my-container>
`;
disconnectedChildItems.swc_vrt = {
  skip: true
};
disconnectedChildItems.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
//# sourceMappingURL=menu-item.disconnected.stories.js.map
