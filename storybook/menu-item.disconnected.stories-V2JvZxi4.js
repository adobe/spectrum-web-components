import { s } from './lit-element-xBOPiTek.js';
import { x } from './lit-html-GmIhAbMP.js';
import { n as n$1, a as SpectrumMixin } from './define-element-lju0qz2P.js';
import { t } from './state-UPADzOvr.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import { c } from './repeat-ry-ySa1b.js';
import { n } from './when-kvvOyHr2.js';
import './sp-picker-AIZWEV-o.js';
import './sp-button-dfYWkmHE.js';
import './base-STdhtiz1.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './Picker-_l2TKksC.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './focusable-wnRI1QCz.js';
import './focus-visible-68QWcOy-.js';
import './sp-icon-chevron100-hP_myJxP.js';
import './Chevron100-ok1mOHjI.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-YN3-eQCN.js';
import './sp-icon-alert-FVCBnC1q.js';
import './custom-tag-JXLWq-Sj.js';
import './sp-menu-yyR1trsN.js';
import './sizedMixin-VwrJiqSW.js';
import './query-JMOstM_r.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './style-map-ak5mT6xX.js';
import './if-defined-pV6JZKXB.js';
import './ButtonBase-HA5NNgN2.js';
import './like-anchor-a_wuYSt2.js';
import './observe-slot-text-HaH5WFZ0.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';

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
