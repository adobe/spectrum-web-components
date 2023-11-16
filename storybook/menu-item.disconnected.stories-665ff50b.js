import { s } from './lit-element-9354aa77.js';
import { x } from './lit-html-126adc72.js';
import { n as n$1, a as SpectrumMixin } from './define-element-617dba69.js';
import { t } from './state-59f591cf.js';
import './sizedMixin-29c62bc2.js';
import { c } from './repeat-c64faecc.js';
import { n } from './when-67eca38c.js';
import './sp-picker-4f20703d.js';
import './sp-button-b85e30a6.js';
import './base-511c8c11.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './Picker-2a08fe09.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './sp-icon-alert-4033bfea.js';
import './custom-tag-b5526d41.js';
import './sp-menu-2e53fd90.js';
import './query-d0113d5a.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './style-map-156e3c36.js';
import './if-defined-ae83b405.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
const XElement = SpectrumMixin(s);
class MyContainer extends XElement {
  constructor() {
    super(...arguments);
    this._counter = 0;
  }
  _handleClick() {
    this._counter += 1;
  }
  render() {
    return x`
            <div>
                ${n(
      this._counter % 2 === 0,
      () => x`
                        <my-view1></my-view1>
                    `,
      () => x`
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
  t()
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
    return x`
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
    return x`
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
    return x`
            ${c(
      this.blendModeOptions,
      // This is intentional so that repeat directive will add instead of
      // update existing DOM which will then trigger error in
      // MenuItem.childrenItem
      // Using .value for the key will workaround the issue
      (blendModeOption) => blendModeOption,
      (blendModeOption) => x`
                        <sp-menu-item value=${blendModeOption.value}>
                            ${blendModeOption.title}
                            <span slot="value">
                                ${blendModeOption.subtitle}
                            </span>
                        </sp-menu-item>
                    `
    )}
        `;
  }
  render() {
    return x`
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
  n$1({ type: Array })
], MyPicker.prototype, "blendModeOptions", 2);
__decorateClass([
  n$1()
], MyPicker.prototype, "blendMode", 2);
customElements.define("my-picker", MyPicker);
var menuItem_disconnected_stories = {
  component: "sp-menu-item",
  title: "Menu Item/Disconnected"
};
const disconnectedChildItems = () => x`
    <my-container></my-container>
`;
disconnectedChildItems.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['disconnectedChildItems'];

export { __namedExportsOrder, menuItem_disconnected_stories as default, disconnectedChildItems };
