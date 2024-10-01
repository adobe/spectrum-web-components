import { x } from './lit-html-COgVUehj.js';
import { i } from './lit-element-BulMEkr1.js';
import { h } from './heading-C6ZIrIYw.js';
import { b as bodyStyles } from './body-gNxcWIKV.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';

const illustration = x`
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        width="200"
        height="100"
    >
        <defs>
            <style>
                .cls-1,
                .cls-2 {
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                .cls-1 {
                    stroke-width: 3px;
                }
                .cls-2 {
                    stroke-width: 2px;
                }
            </style>
        </defs>
        <path
            class="cls-1"
            d="M110.53,85.66,100.26,95.89a1.09,1.09,0,0,1-1.52,0L88.47,85.66"
        ></path>
        <line class="cls-1" x1="99.5" y1="95.5" x2="99.5" y2="58.5"></line>
        <path class="cls-1" d="M105.5,73.5h19a2,2,0,0,0,2-2v-43"></path>
        <path
            class="cls-1"
            d="M126.5,22.5h-19a2,2,0,0,1-2-2V1.5h-31a2,2,0,0,0-2,2v68a2,2,0,0,0,2,2h19"
        ></path>
        <line class="cls-1" x1="105.5" y1="1.5" x2="126.5" y2="22.5"></line>
        <path
            class="cls-2"
            d="M47.93,50.49a5,5,0,1,0-4.83-5A4.93,4.93,0,0,0,47.93,50.49Z"
        ></path>
        <path
            class="cls-2"
            d="M36.6,65.93,42.05,60A2.06,2.06,0,0,1,45,60l12.68,13.2"
        ></path>
        <path
            class="cls-2"
            d="M3.14,73.23,22.42,53.76a1.65,1.65,0,0,1,2.38,0l19.05,19.7"
        ></path>
        <path
            class="cls-1"
            d="M139.5,36.5H196A1.49,1.49,0,0,1,197.5,38V72A1.49,1.49,0,0,1,196,73.5H141A1.49,1.49,0,0,1,139.5,72V32A1.49,1.49,0,0,1,141,30.5H154a2.43,2.43,0,0,1,1.67.66l6,5.66"
        ></path>
        <rect
            class="cls-1"
            x="1.5"
            y="34.5"
            width="58"
            height="39"
            rx="2"
            ry="2"
        ></rect>
    </svg>
`;

const t=i`
    :host{--spectrum-illustrated-message-description-max-inline-size:var(--spectrum-illustrated-message-maximum-width);--spectrum-illustrated-message-heading-max-inline-size:var(--spectrum-illustrated-message-maximum-width);--spectrum-illustrated-message-title-to-heading:var(--spectrum-spacing-400);--spectrum-illustrated-message-heading-to-description:var(--spectrum-spacing-75);--spectrum-illustrated-message-illustration-color:var(--spectrum-neutral-visual-color);--spectrum-illustrated-message-illustration-accent-color:var(--spectrum-accent-visual-color);--spectrum-illustrated-message-title-font-family:var(--spectrum-sans-font-family-stack);--spectrum-illustrated-message-title-font-weight:var(--spectrum-heading-sans-serif-font-weight);--spectrum-illustrated-message-title-font-style:var(--spectrum-heading-sans-serif-font-style);--spectrum-illustrated-message-title-font-size:var(--spectrum-illustrated-message-title-size);--spectrum-illustrated-message-title-line-height:var(--spectrum-heading-line-height);--spectrum-illustrated-message-title-color:var(--spectrum-heading-color);--spectrum-illustrated-message-description-font-family:var(--spectrum-sans-font-family-stack);--spectrum-illustrated-message-description-font-weight:var(--spectrum-body-sans-serif-font-weight);--spectrum-illustrated-message-description-font-style:var(--spectrum-body-sans-serif-font-style);--spectrum-illustrated-message-description-font-size:var(--spectrum-illustrated-message-body-size);--spectrum-illustrated-message-description-line-height:var(--spectrum-body-line-height);--spectrum-illustrated-message-description-color:var(--spectrum-body-color)}:host:lang(ja),:host:lang(ko),:host:lang(zh){--spectrum-illustrated-message-title-font-size:var(--spectrum-illustrated-message-cjk-title-size)}@media (forced-colors:active){:host{--highcontrast-illustrated-message-illustration-color:CanvasText;--highcontrast-illustrated-message-illustration-accent-color:Highlight}}:host{block-size:100%;display:var(--mod-illustrated-message-display,flex);text-align:center;pointer-events:var(--mod-illustrated-message-pointer-events,auto);max-inline-size:var(--mod-illustrated-message-content-maximum-width);flex-direction:column;justify-content:center;align-items:center}#illustration{color:var(--highcontrast-illustrated-message-illustration-color,var(--mod-illustrated-message-illustration-color,var(--spectrum-illustrated-message-illustration-color)));fill:currentColor;stroke:currentColor;margin-block-end:var(--mod-illustrated-message-title-to-heading,var(--spectrum-illustrated-message-title-to-heading))}.spectrum-IllustratedMessage-accent{color:var(--highcontrast-illustrated-message-illustration-accent-color,var(--mod-illustrated-message-illustration-accent-color,var(--spectrum-illustrated-message-illustration-accent-color)));fill:currentColor;stroke:currentColor}#heading{font-family:var(--mod-illustrated-message-title-font-family,var(--spectrum-illustrated-message-title-font-family));font-weight:var(--mod-illustrated-message-title-font-weight,var(--spectrum-illustrated-message-title-font-weight));font-style:var(--mod-illustrated-message-title-font-style,var(--spectrum-illustrated-message-title-font-style));font-size:var(--mod-illustrated-message-title-font-size,var(--spectrum-illustrated-message-title-font-size));line-height:var(--mod-illustrated-message-title-line-height,var(--spectrum-illustrated-message-title-line-height));color:var(--mod-illustrated-message-title-color,var(--spectrum-illustrated-message-title-color));max-inline-size:var(--mod-illustrated-message-heading-max-inline-size,var(--spectrum-illustrated-message-heading-max-inline-size));margin-block-start:0;margin-block-end:var(--mod-illustrated-message-heading-to-body,0)}#description{position:var(--mod-illustrated-message-description-position);z-index:var(--mod-illustrated-message-description-z-index);pointer-events:var(--mod-illustrated-message-description-pointer-events,auto);font-family:var(--mod-illustrated-message-description-font-family,var(--spectrum-illustrated-message-description-font-family));font-weight:var(--mod-illustrated-message-description-font-weight,var(--spectrum-illustrated-message-description-font-weight));font-style:var(--mod-illustrated-message-description-font-style,var(--spectrum-illustrated-message-description-font-style));font-size:var(--mod-illustrated-message-description-font-size,var(--spectrum-illustrated-message-description-font-size));line-height:var(--mod-illustrated-message-description-line-height,var(--spectrum-illustrated-message-description-line-height));color:var(--mod-illustrated-message-description-color,var(--spectrum-illustrated-message-description-color));max-inline-size:var(--mod-illustrated-message-description-max-inline-size,var(--spectrum-illustrated-message-description-max-inline-size));margin-block-start:var(--mod-illustrated-message-heading-to-description,var(--spectrum-illustrated-message-heading-to-description));margin-block-end:0}::slotted(svg[viewBox]){width:100%}
`;

var m=Object.defineProperty;var l=(r,t,s,i)=>{for(var e=void 0,o=r.length-1,d;o>=0;o--)(d=r[o])&&(e=(d(t,s,e))||e);return e&&m(t,s,e),e};class IllustratedMessage extends SpectrumElement{constructor(){super(...arguments);this.heading="";this.description="";}static get styles(){return [h,bodyStyles,t]}render(){return x`
            <div id="illustration"><slot></slot></div>
            <h2
                id="heading"
                class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
            >
                <slot name="heading">${this.heading}</slot>
            </h2>
            <div id="description" class="spectrum-Body spectrum-Body--sizeS">
                <slot name="description">${this.description}</slot>
            </div>
        `}}IllustratedMessage.is="sp-illustrated-message",l([n()],IllustratedMessage.prototype,"heading"),l([n()],IllustratedMessage.prototype,"description");

defineElement("sp-illustrated-message",IllustratedMessage);

export { illustration as i };
