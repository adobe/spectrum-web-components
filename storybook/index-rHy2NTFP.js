import './sp-tab-panel-JHDGEm52.js';
import { s } from './resize-controller--ByFn5Jx.js';
import './sp-action-button-5SXoTk2c.js';
import './sp-icon-chevron100-hP_myJxP.js';
import { C } from './spectrum-icon-chevron.css-hA8DP86t.js';
import { g } from './tab.css-RK-bbgRK.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-VwrJiqSW.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-lju0qz2P.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { o as o$1 } from './class-map-Q7DIFm9x.js';
import { t } from './state-UPADzOvr.js';
import { l } from './query-assigned-elements-1m6Cs7Ix.js';
import { i as i$1 } from './query-JMOstM_r.js';
import { c } from './repeat-ry-ySa1b.js';

const o=i`
    :host{--sp-tabs-overflow-next-button-right:calc(-1*var(--spectrum-component-edge-to-text-100));--sp-tabs-overflow-previous-button-left:calc(-1*var(--spectrum-component-edge-to-text-100));--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-medium) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-medium);--sp-tabs-overflow-icon-color:var(--spectrum-gray-800);--sp-tabs-overflow-shadow-color:var(--spectrum-gray-100);--sp-tabs-overflow-shadow-width:50px;--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-100);width:100%;inset:0}:host([size=s]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-small) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-small);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-extra-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-extra-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-300)}:host([compact]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-compact-height-medium) - var(--spectrum-border-width-200));--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-50)}sp-action-button{width:var(--sp-tabs-overflow-button-size);height:var(--sp-tabs-overflow-button-height);z-index:2;text-align:center;box-shadow:none;background:0 0;border:none;position:absolute}sp-action-button.left-scroll{visibility:hidden;left:var(--sp-tabs-overflow-previous-button-left)}sp-action-button.right-scroll{visibility:hidden;right:var(--sp-tabs-overflow-next-button-right)}sp-action-button.left-scroll.show,sp-action-button.right-scroll.show{visibility:visible}.tabs-overflow-container{position:relative}.tabs-overflow-container:before,.tabs-overflow-container:after{content:"";visibility:hidden;z-index:1;height:var(--sp-tabs-overflow-button-height);width:var(--sp-tabs-overflow-shadow-width);pointer-events:none;position:absolute;inset-block-start:0}.tabs-overflow-container:before{background:transparent linear-gradient(270deg,transparent,var(--sp-tabs-overflow-shadow-color))0 0 no-repeat padding-box;left:0}.tabs-overflow-container:after{background:transparent linear-gradient(90deg,transparent,var(--sp-tabs-overflow-shadow-color))0 0 no-repeat padding-box;right:0}.tabs-overflow-container.left-shadow:before,.tabs-overflow-container.right-shadow:after{visibility:visible}
`;var y = o;

var p=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var r=(c,a,t,o)=>{for(var e=o>1?void 0:o?u(a,t):a,l=c.length-1,s;l>=0;l--)(s=c[l])&&(e=(o?s(a,t,e):s(e))||e);return o&&e&&p(a,t,e),e};class TabsOverflow extends SizedMixin(SpectrumElement){constructor(){super();this.compact=!1;this.labelPrevious="Scroll to previous tabs";this.labelNext="Scroll to next tabs";this.overflowState={canScrollLeft:!1,canScrollRight:!1};this.resizeController=new s(this,{target:this,callback:()=>{this._updateScrollState();}});}static get styles(){return [C,y,g]}firstUpdated(t){super.firstUpdated(t);const[o]=this.scrollContent;o&&(o.enableTabsScroll=!0),this.resizeController.observe(this.overflowContainer);}async _handleSlotChange(){const[t]=this.scrollContent;await(t==null?void 0:t.updateComplete),this._updateScrollState();}_updateScrollState(){const{scrollContent:t,overflowState:o}=this;if(t){const[e]=this.scrollContent,{canScrollLeft:l,canScrollRight:s}=(e==null?void 0:e.scrollState)||{canScrollLeft:!1,canScrollRight:!1};this.overflowState={...o,canScrollLeft:l,canScrollRight:s};}}_handleScrollClick(t){const o=t.currentTarget,[e]=this.scrollContent,l=e.clientWidth*.5,s=o.classList.contains("left-scroll")?-l:l;e.scrollTabs(s,"smooth");}updated(t){super.updated(t),t.has("dir")&&this._updateScrollState();}render(){const{canScrollRight:t,canScrollLeft:o}=this.overflowState,e=this.labelPrevious,l=this.labelNext;return x`
            <div
                class=${o$1({"tabs-overflow-container":!0,"left-shadow":o,"right-shadow":t})}
            >
                <sp-action-button
                    class=${o$1({"left-scroll":!0,show:o})}
                    aria-label=${e}
                    quiet
                    dir="rtl"
                    tabindex="-1"
                    @click=${this._handleScrollClick}
                >
                    <sp-icon-chevron100
                        slot="icon"
                        class="spectrum-UIIcon-ChevronLeft300"
                    ></sp-icon-chevron100>
                </sp-action-button>
                <sp-action-button
                    class=${o$1({"right-scroll":!0,show:t})}
                    aria-label=${l}
                    quiet
                    tabindex="-1"
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
        `}}r([n({type:Boolean,reflect:!0})],TabsOverflow.prototype,"compact",2),r([n({type:String,attribute:"label-previous"})],TabsOverflow.prototype,"labelPrevious",2),r([n({type:String,attribute:"label-next"})],TabsOverflow.prototype,"labelNext",2),r([n({reflect:!0})],TabsOverflow.prototype,"dir",2),r([t()],TabsOverflow.prototype,"overflowState",2),r([l({selector:"sp-tabs",flatten:!0})],TabsOverflow.prototype,"scrollContent",2),r([i$1(".tabs-overflow-container")],TabsOverflow.prototype,"overflowContainer",2);

defineElement("sp-tabs-overflow",TabsOverflow);

const renderTabsOverflowExample = ({
  selected = 1,
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
                <sp-tabs size=${size} selected=${selected} ?compact=${compact}>
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
