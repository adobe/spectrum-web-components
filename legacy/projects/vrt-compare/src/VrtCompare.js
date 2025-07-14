"use strict";var h=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(c,a,s,t)=>{for(var i=t>1?void 0:t?u(a,s):a,r=c.length-1,o;r>=0;r--)(o=c[r])&&(i=(t?o(a,s,i):o(i))||i);return t&&i&&h(a,s,i),i};import{css as m,html as e,nothing as n,SpectrumElement as g}from"@spectrum-web-components/base";import{property as d}from"@spectrum-web-components/base/src/decorators.js";import{ObserveSlotPresence as f}from"@spectrum-web-components/shared";import b from"@spectrum-web-components/styles/body.js";import"@spectrum-web-components/action-button/sp-action-button.js";import"@spectrum-web-components/action-group/sp-action-group.js";import"@spectrum-web-components/split-view/sp-split-view.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-in.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-out.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js";import"@spectrum-web-components/action-bar/sp-action-bar.js";import"@spectrum-web-components/progress-circle/sp-progress-circle.js";import"../onion-skinner.js";export class VrtCompare extends f(g,['[slot="actual"]','[slot="baseline"]','[slot="diff"]']){constructor(){super(...arguments);this.view="scrubber";this.zoom=1;this.imagesLoaded=!1;this._loadingImages=!1}get hasActual(){return this.getSlotContentPresence('[slot="actual"]')}get hasBaseline(){return this.getSlotContentPresence('[slot="baseline"]')}get hasDiff(){return this.getSlotContentPresence('[slot="diff"]')}get canCompare(){return this.hasActual&&this.hasBaseline}handleChange(s){const t=s.target.selected[0];t&&(this.view=t)}handleZoomIn(){this.zoom+=.1}handleZoomClear(){this.zoom=1}handleZoomOut(){this.zoom-=.1}get error(){return e`
            <sp-icon-alert class="icon" size="xl"></sp-icon-alert>
            <p class="spectrum-Body spectrum-Body--sizeXL">
                Please be sure to supply some combination of actual, baseline,
                and diff screenshots for review.
            </p>
        `}get actual(){return e`
            <div class="view actual">
                <slot name="actual"></slot>
            </div>
        `}get baseline(){return e`
            <div class="view baseline">
                <slot name="baseline"></slot>
            </div>
        `}get diff(){return e`
            <div class="view diff">
                <slot name="diff"></slot>
            </div>
        `}get scrubber(){return e`
            <sp-split-view resizable primary-size="50%">
                ${this.baseline} ${this.actual}
            </sp-split-view>
        `}get sidebyside(){return e`
            ${this.baseline} ${this.actual}
        `}get onion(){return e`
            <onion-skinner>
                <slot name="baseline"></slot>
                <slot name="actual"></slot>
            </onion-skinner>
        `}get renderView(){switch(this.view){case"error":return this.error;case"actual":return this.actual;case"baseline":return this.baseline;case"diff":return this.diff;case"onion":return this.onion;case"sidebyside":return this.sidebyside;case"scrubber":default:return this.scrubber}}get viewFallback(){return this.canCompare?"scrubber":this.hasActual?"actual":this.hasBaseline?"baseline":this.hasDiff?"diff":"error"}async prepImages(s){const t=s.target;if(this._loadingImages||!t.assignedNodes().length)return;this._loadingImages=!0,this.imagesLoaded=!1;const i=[...this.querySelectorAll("img")];if(!i.length){this.imagesLoaded=!0,this._loadingImages=!1;return}const r=i.map(o=>o.naturalWidth?(this.style.setProperty("--image-width",`${o.naturalWidth}px`),Promise.resolve()):new Promise(p=>{o.addEventListener("load",()=>{this.style.setProperty("--image-width",`${o.naturalWidth}px`),p(!0)})}));await Promise.all(r),this.imagesLoaded=!0,this._loadingImages=!1}shouldUpdate(){return(this.view==="error"||this.view==="actual"&&!this.hasActual||this.view==="baseline"&&!this.hasBaseline||this.view==="diff"&&!this.hasDiff||(this.view==="onion"||this.view==="sidebyside"||this.view==="scrubber")&&!this.canCompare)&&(this.view=this.viewFallback),!0}render(){return this._loadingImages?e`
                <sp-progress-circle indeterminate></sp-progress-circle>
                <slot
                    name="actual"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot
                    name="baseline"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot name="diff" @slotchange=${this.prepImages} hidden></slot>
            `:this.imagesLoaded?e`
            <sp-action-group
                selects="single"
                compact
                emphasized
                @change=${this.handleChange}
            >
                ${this.view!=="error"?n:e`
                          <sp-action-button value="error" disabled>
                              Error
                          </sp-action-button>
                      `}
                ${this.canCompare?e`
                          <sp-action-button
                              value="scrubber"
                              ?selected=${this.view==="scrubber"}
                          >
                              Scrubber
                          </sp-action-button>
                          <sp-action-button
                              value="onion"
                              ?selected=${this.view==="onion"}
                          >
                              Onion skin
                          </sp-action-button>
                          <sp-action-button
                              value="sidebyside"
                              ?selected=${this.view==="sidebyside"}
                          >
                              Side by side
                          </sp-action-button>
                      `:n}
                ${this.hasDiff?e`
                          <sp-action-button
                              value="diff"
                              ?selected=${this.view==="diff"}
                          >
                              Diff
                          </sp-action-button>
                      `:n}
                ${this.hasActual?e`
                          <sp-action-button
                              value="actual"
                              ?selected=${this.view==="actual"}
                          >
                              Actual
                          </sp-action-button>
                      `:n}
                ${this.hasBaseline?e`
                          <sp-action-button
                              value="baseline"
                              ?selected=${this.view==="baseline"}
                          >
                              Baseline
                          </sp-action-button>
                      `:n}
            </sp-action-group>
            <div class="review ${this.view}">${this.renderView}</div>
            <sp-action-group compact class="zoom-controls">
                <sp-action-button
                    @click=${this.handleZoomOut}
                    ?disabled=${this.zoom<=.5}
                >
                    <sp-icon-zoom-out slot="icon"></sp-icon-zoom-out>
                </sp-action-button>
                <sp-action-button @click=${this.handleZoomClear}>
                    <sp-icon-refresh slot="icon"></sp-icon-refresh>
                </sp-action-button>
                <sp-action-button
                    @click=${this.handleZoomIn}
                    ?disabled=${this.zoom>=2}
                >
                    <sp-icon-zoom-in slot="icon"></sp-icon-zoom-in>
                </sp-action-button>
            </sp-action-group>
        `:e`
                <p class="spectrum-Body spectrum-Body--sizeXL">
                    Choose a test to review on the left...
                </p>
                <slot
                    name="actual"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot
                    name="baseline"
                    @slotchange=${this.prepImages}
                    hidden
                ></slot>
                <slot name="diff" @slotchange=${this.prepImages} hidden></slot>
            `}updated(s){if(s.has("zoom")){let t=Math.min(this.zoom,2);t=Math.min(t,.5),this.style.setProperty("--zoom-level",`${this.zoom}`)}}}VrtCompare.styles=[m`
            :host {
                display: grid;
                max-width: 100%;
                overflow: auto;
                margin: 0 auto;
                position: relative;

                --image-display-width: calc(
                    var(--zoom-level, 1) * var(--image-width, 500px)
                );
            }
            sp-progress-circle {
                margin: auto;
                place-self: center;
            }
            .review {
                margin: 100px auto 0;
                display: flex;
                width: var(--image-display-width);
                place-self: start;
            }
            .error {
                flex-direction: column;
            }
            ::slotted(img) {
                display: flex;
                pointer-events: none;
            }
            sp-action-group[selects] {
                margin-bottom: 1em;
                justify-content: center;
                position: fixed;
                top: calc(var(--swc-scale-factor) * 8px);
                right: calc(var(--swc-scale-factor) * 8px);
            }
            .sidebyside {
                display: flex;
                gap: 2px;
            }
            .sidebyside ::slotted(img) {
                width: 100%;
            }
            .view {
                overflow: hidden;
            }
            .review:is(.baseline, .actual, .diff) .view,
            .review:is(.baseline, .actual, .diff) ::slotted(img) {
                width: 100%;
            }
            sp-split-view {
                width: var(--image-display-width);
            }
            sp-split-view ::slotted(img) {
                width: var(--image-display-width);
                height: auto;
                flex-shrink: 0;
            }
            sp-split-view .actual ::slotted(img) {
                float: right;
            }
            p {
                text-align: center;
                margin: 0 3em;
            }
            .icon {
                margin: 0 auto 2em;
                display: flex;
                color: var(--spectrum-semantic-negative-color-background);
            }
            .zoom-controls {
                position: fixed;
                bottom: calc(var(--swc-scale-factor) * 8px);
                left: calc(var(--swc-scale-factor) * 8px);
                z-index: 1;
            }
        `,b],l([d()],VrtCompare.prototype,"view",2),l([d({type:Number})],VrtCompare.prototype,"zoom",2),l([d({type:Boolean,attribute:!1})],VrtCompare.prototype,"imagesLoaded",2);
//# sourceMappingURL=VrtCompare.js.map
