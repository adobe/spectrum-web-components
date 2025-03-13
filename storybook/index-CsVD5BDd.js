import './sp-tab-panel-BJzcOGRm.js';
import { s } from './resize-controller-BJKfu6ft.js';
import './sp-action-button-lv7YPDyg.js';
import './sp-icon-chevron100-CWW9sooh.js';
import { r } from './spectrum-icon-chevron.css-CeYia-Jd.js';
import { s as s$1 } from './tab.css-Dh6IU813.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-D4VoaNlz.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-2VgsDjbW.js';
import { x, T } from './lit-html-COgVUehj.js';
import { e } from './class-map-DdRvesrq.js';
import { r as r$1 } from './state-ChcedIDn.js';
import { o as o$1 } from './query-assigned-elements-C9WOp2R6.js';
import { e as e$1 } from './query-DQF6X5qW.js';
import { c } from './repeat-D5JakrYV.js';

const o=i`
    :host{width:100%;--sp-tabs-overflow-next-button-right:calc(-1*var(--spectrum-component-edge-to-text-100));--sp-tabs-overflow-previous-button-left:calc(-1*var(--spectrum-component-edge-to-text-100));--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-medium) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-medium);--sp-tabs-overflow-icon-color:var(--spectrum-gray-800);--sp-tabs-overflow-shadow-color:var(--spectrum-gray-100);--sp-tabs-overflow-shadow-width:50px;--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-100);inset:0}:host([size=s]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-small) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-small);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=l]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-height-extra-large) - var(--spectrum-border-width-200));--sp-tabs-overflow-button-size:var(--spectrum-tab-item-height-extra-large);--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-300)}:host([compact]){--sp-tabs-overflow-button-height:calc(var(--spectrum-tab-item-compact-height-medium) - var(--spectrum-border-width-200));--mod-actionbutton-icon-size:var(--spectrum-workflow-icon-size-50)}sp-action-button{width:var(--sp-tabs-overflow-button-size);height:var(--sp-tabs-overflow-button-height);z-index:2;text-align:center;box-shadow:none;color:var(--sp-tabs-overflow-icon-color);background:0 0;border:none;position:absolute}sp-action-button.left-scroll{visibility:hidden;left:var(--sp-tabs-overflow-previous-button-left)}sp-action-button.right-scroll{visibility:hidden;right:var(--sp-tabs-overflow-next-button-right)}sp-action-button.left-scroll.show,sp-action-button.right-scroll.show{visibility:visible}.tabs-overflow-container{position:relative}.tabs-overflow-container:before,.tabs-overflow-container:after{content:"";visibility:hidden;z-index:1;height:var(--sp-tabs-overflow-button-height);width:var(--sp-tabs-overflow-shadow-width);pointer-events:none;position:absolute;inset-block-start:0}.tabs-overflow-container:before{background:transparent linear-gradient(270deg,transparent,var(--sp-tabs-overflow-shadow-color))0 0 no-repeat padding-box;left:0}.tabs-overflow-container:after{background:transparent linear-gradient(90deg,transparent,var(--sp-tabs-overflow-shadow-color))0 0 no-repeat padding-box;right:0}.tabs-overflow-container.left-shadow:before,.tabs-overflow-container.right-shadow:after{visibility:visible}
`;

var p=Object.defineProperty;var l=(c,a,t,o)=>{for(var e=void 0,r=c.length-1,s;r>=0;r--)(s=c[r])&&(e=(s(a,t,e))||e);return e&&p(a,t,e),e};class TabsOverflow extends SizedMixin(SpectrumElement){constructor(){super();this.compact=!1;this.labelPrevious="Scroll to previous tabs";this.labelNext="Scroll to next tabs";this.overflowState={canScrollLeft:!1,canScrollRight:!1};this.scrollFactor=.5;this.resizeController=new s(this,{target:this,callback:()=>{this._updateScrollState();}});}static get styles(){return [o,s$1,r]}firstUpdated(t){super.firstUpdated(t);const[o]=this.scrollContent;o&&(o.enableTabsScroll=!0),this.resizeController.observe(this.overflowContainer);}async _handleSlotChange(){const[t]=this.scrollContent;await(t==null?void 0:t.updateComplete),this._updateScrollState();}_updateScrollState(){const{scrollContent:t,overflowState:o}=this;if(t){const[e]=this.scrollContent,{canScrollLeft:r,canScrollRight:s}=(e==null?void 0:e.scrollState)||{canScrollLeft:!1,canScrollRight:!1};this.overflowState={...o,canScrollLeft:r,canScrollRight:s};}}_handleScrollClick(t){const o=t.currentTarget,[e]=this.scrollContent,r=e.clientWidth*this.scrollFactor,s=o.classList.contains("left-scroll")?-r:r;e.scrollTabs(s,"smooth");}updated(t){super.updated(t),t.has("dir")&&this._updateScrollState();}render(){const{canScrollRight:t,canScrollLeft:o}=this.overflowState,e$1=this.labelPrevious,r=this.labelNext;return x`
            <div
                class=${e({"tabs-overflow-container":!0,"left-shadow":o,"right-shadow":t})}
            >
                <sp-action-button
                    class=${e({"left-scroll":!0,show:o})}
                    aria-label=${e$1}
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
                    class=${e({"right-scroll":!0,show:t})}
                    aria-label=${r}
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
        `}}l([n({type:Boolean,reflect:!0})],TabsOverflow.prototype,"compact"),l([n({type:String,attribute:"label-previous"})],TabsOverflow.prototype,"labelPrevious"),l([n({type:String,attribute:"label-next"})],TabsOverflow.prototype,"labelNext"),l([n({reflect:!0})],TabsOverflow.prototype,"dir"),l([r$1()],TabsOverflow.prototype,"overflowState"),l([o$1({selector:"sp-tabs",flatten:!0})],TabsOverflow.prototype,"scrollContent"),l([e$1(".tabs-overflow-container")],TabsOverflow.prototype,"overflowContainer");

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
                          ` : T}
                </sp-tabs>
            </sp-tabs-overflow>
        </div>
    `;
};

export { renderTabsOverflowExample as r };
