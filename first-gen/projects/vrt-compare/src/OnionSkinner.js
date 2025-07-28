"use strict";var n=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var a=(s,l,e,t)=>{for(var i=t>1?void 0:t?m(l,e):l,o=s.length-1,r;o>=0;o--)(r=s[o])&&(i=(t?r(l,e,i):r(i))||i);return t&&i&&n(l,e,i),i};import{css as h,html as p,SpectrumElement as g}from"@spectrum-web-components/base";import{property as v,queryAssignedNodes as c}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/slider/sp-slider.js";import"@spectrum-web-components/thumbnail/sp-thumbnail.js";import"@spectrum-web-components/overlay/sync/overlay-trigger.js";import"@spectrum-web-components/tooltip/sp-tooltip.js";export class OnionSkinner extends g{constructor(){super(...arguments);this.onionLevel=.5}handleOnionInput(e){this.onionLevel=e.target.value}handleSlotchange(){const e=[...this.assignments].filter(t=>t.tagName&&t.matches("img"));e[0]&&(this.leftThumbnail=e[0].cloneNode(),this.leftThumbnail.removeAttribute("slot")),e[1]&&(this.rightThumbnail=e[1].cloneNode(),this.rightThumbnail.removeAttribute("slot")),e.length&&this.requestUpdate()}allLeft(){this.onionLevel=0}allRight(){this.onionLevel=1}render(){return p`
            <slot
                @slotchange=${this.handleSlotchange}
                style="--onion-level: ${this.onionLevel}"
            ></slot>
            <div class="controls">
                <overlay-trigger placement="top">
                    <sp-thumbnail
                        slot="trigger"
                        size="xl"
                        @click=${this.allLeft}
                    >
                        ${this.leftThumbnail}
                    </sp-thumbnail>
                    <sp-tooltip slot="hover-content">
                        Baseline screenshot
                    </sp-tooltip>
                </overlay-trigger>
                <sp-slider
                    min="0"
                    max="1"
                    step="0.001"
                    .value=${this.onionLevel}
                    .getAriaValueText=${()=>""}
                    @input=${this.handleOnionInput}
                ></sp-slider>
                <overlay-trigger placement="top">
                    <sp-thumbnail
                        slot="trigger"
                        size="xl"
                        @click=${this.allRight}
                    >
                        ${this.rightThumbnail}
                    </sp-thumbnail>
                    <sp-tooltip slot="hover-content">
                        Current screenshot
                    </sp-tooltip>
                </overlay-trigger>
            </div>
        `}}OnionSkinner.styles=[h`
            :host {
                display: grid;
                grid-template-areas: 'main';
            }
            ::slotted(*) {
                grid-area: main;
            }
            ::slotted(:first-child) {
                opacity: calc(1 - var(--onion-level));
            }
            ::slotted(:last-child) {
                opacity: var(--onion-level);
            }
            .controls {
                display: flex;
                gap: 1em;
                margin: 0.25em;
                align-items: center;
            }
            sp-slider {
                flex-grow: 1;
            }
        `],a([v({type:Number})],OnionSkinner.prototype,"onionLevel",2),a([c({slot:"",flatten:!0})],OnionSkinner.prototype,"assignments",2);
//# sourceMappingURL=OnionSkinner.js.map
