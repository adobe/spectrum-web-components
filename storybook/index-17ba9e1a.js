import './sp-tab-panel-004528f6.js';
import { s as s$1 } from './resize-controller-55608b66.js';
import './sp-action-button-9bf3b735.js';
import './sp-icon-chevron100-19c0ec20.js';
import { b } from './spectrum-icon-chevron.css-d3283c08.js';
import { g } from './tab.css-4277abb8.js';
import { i } from './lit-element-9354aa77.js';
import { S as SizedMixin, l } from './sizedMixin-3d08a58f.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-7dc6a572.js';
import { x, A } from './lit-html-126adc72.js';
import { o } from './class-map-14530ec2.js';
import { t } from './state-3927c84f.js';
import { i as i$1 } from './query-d0113d5a.js';
import { c } from './repeat-c64faecc.js';

const e=i`
:host{--sp-tabs-overflow-next-button-right:calc(var(--spectrum-component-edge-to-text-100)*-1);--sp-tabs-overflow-previous-button-left:calc(var(--spectrum-component-edge-to-text-100)*-1);--sp-tabs-overflow-button-height:var(--spectrum-tab-item-height-medium);--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-medium);--sp-tabs-overflow-icon-color:var(--spectrum-gray-800);--sp-tabs-overflow-shadow-color:var(--spectrum-gray-100);--sp-tabs-overflow-shadow-width:50px;inset:0;width:100%}:host([size=s]){--sp-tabs-overflow-button-height:var(--spectrum-tab-item-height-small);--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-small)}:host([size=l]){--sp-tabs-overflow-button-height:var(--spectrum-tab-item-height-large);--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-large)}:host([size=xl]){--sp-tabs-overflow-button-height:var(
--spectrum-tab-item-height-extra-large
);--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-extra-large)}:host([compact]){--sp-tabs-overflow-button-height:var(
--spectrum-tab-item-compact-height-medium
)}sp-action-button{background:transparent;border:none;box-shadow:none;height:var(--sp-tabs-overflow-button-height);position:absolute;text-align:center;width:var(--sp-tabs-overflow-button-size);z-index:2}sp-action-button.left-scroll{left:var(--sp-tabs-overflow-previous-button-left);visibility:hidden}sp-action-button.right-scroll{right:var(--sp-tabs-overflow-next-button-right);visibility:hidden}sp-action-button.left-scroll.show,sp-action-button.right-scroll.show{visibility:visible}.tabs-overflow-container{position:relative}.tabs-overflow-container:after,.tabs-overflow-container:before{content:"";height:var(--sp-tabs-overflow-button-height);inset-block-start:0;pointer-events:none;position:absolute;visibility:hidden;width:var(--sp-tabs-overflow-shadow-width);z-index:1}.tabs-overflow-container:before{background:transparent linear-gradient(270deg,transparent,var(--sp-tabs-overflow-shadow-color)) 0 0 no-repeat padding-box;left:0}.tabs-overflow-container:after{background:transparent linear-gradient(90deg,transparent,var(--sp-tabs-overflow-shadow-color)) 0 0 no-repeat padding-box;right:0}.tabs-overflow-container.left-shadow:before,.tabs-overflow-container.right-shadow:after{visibility:visible}
`;var y = e;

var p=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var s=(i,c,t,e)=>{for(var o=e>1?void 0:e?h(c,t):c,r=i.length-1,l;r>=0;r--)(l=i[r])&&(o=(e?l(c,t,o):l(o))||o);return e&&o&&p(c,t,o),o};class TabsOverflow extends SizedMixin(SpectrumElement){constructor(){super();this.compact=!1;this.overflowState={canScrollLeft:!1,canScrollRight:!1};this.resizeController=new s$1(this,{target:this,callback:()=>{this._updateScrollState();}});}static get styles(){return [b,y,g]}firstUpdated(t){super.firstUpdated(t);const[e]=this.scrollContent;e&&(e.enableTabsScroll=!0),this.resizeController.observe(this.overflowContainer);}async _handleSlotChange(){const[t]=this.scrollContent;await(t==null?void 0:t.updateComplete),this._updateScrollState();}_updateScrollState(){const{scrollContent:t,overflowState:e}=this;if(t){const[o]=this.scrollContent,{canScrollLeft:r,canScrollRight:l}=(o==null?void 0:o.scrollState)||{canScrollLeft:!1,canScrollRight:!1};this.overflowState={...e,canScrollLeft:r,canScrollRight:l};}}_handleScrollClick(t){const e=t.currentTarget,[o]=this.scrollContent,r=o.clientWidth*.5,l=e.classList.contains("left-scroll")?-r:r;o.scrollTabs(l,"smooth");}updated(t){super.updated(t),t.has("dir")&&this._updateScrollState();}render(){const{canScrollRight:t,canScrollLeft:e}=this.overflowState;return x`
            <div
                class=${o({"tabs-overflow-container":!0,"left-shadow":e,"right-shadow":t})}
            >
                <sp-action-button
                    class=${o({"left-scroll":!0,show:e})}
                    quiet
                    dir="rtl"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${o({"right-scroll":!0,show:t})}
                    quiet
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronRight300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <slot
                    @slotchange=${this._handleSlotChange}
                    @sp-tabs-scroll=${this._updateScrollState}
                ></slot>
            </div>
        `}}s([n({type:Boolean,reflect:!0})],TabsOverflow.prototype,"compact",2),s([n({reflect:!0})],TabsOverflow.prototype,"dir",2),s([t()],TabsOverflow.prototype,"overflowState",2),s([l({selector:"sp-tabs",flatten:!0})],TabsOverflow.prototype,"scrollContent",2),s([i$1(".tabs-overflow-container")],TabsOverflow.prototype,"overflowContainer",2);

defineElement("sp-tabs-overflow",TabsOverflow);

const renderTabsOverflowExample = ({
  count = 20,
  size = "m",
  includeTabPanel,
  compact
}) => {
  return x`
        <style>
            .container {
                width: 100%;
                height: 150px;
                border: 4px solid gray;
                resize: both;
            }
        </style>
        <div class="container">
            <sp-tabs-overflow size=${size} ?compact=${compact}>
                <sp-tabs size=${size} selected="1" ?compact=${compact}>
                    ${c(
    new Array(count),
    (item) => item,
    (_item, index) => x`
                                <sp-tab
                                    label=${`Tab Item ${index + 1}`}
                                    value=${index + 1}
                                ></sp-tab>
                            `
  )}
                    ${includeTabPanel ? x`
                              ${c(
    new Array(count),
    (item) => item,
    (_item, index) => x`
                                          <sp-tab-panel value=${index + 1}>
                                              Content for Tab Item ${index + 1}
                                          </sp-tab-panel>
                                      `
  )}
                          ` : A}
                </sp-tabs>
            </sp-tabs-overflow>
        </div>
    `;
};

export { renderTabsOverflowExample as r };
