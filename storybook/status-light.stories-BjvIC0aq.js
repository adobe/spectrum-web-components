import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-D4VoaNlz.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-2VgsDjbW.js';
import { x } from './lit-html-COgVUehj.js';

const s$1=i`
    :host([dir]){min-block-size:var(--mod-statuslight-height,var(--spectrum-statuslight-height));box-sizing:border-box;font-size:var(--mod-statuslight-font-size,var(--spectrum-statuslight-font-size));font-weight:var(--mod-statuslight-font-weight,var(--spectrum-statuslight-font-weight));line-height:var(--mod-statuslight-line-height,var(--spectrum-statuslight-line-height));color:var(--highcontrast-statuslight-content-color-default,var(--mod-statuslight-content-color-default,var(--spectrum-statuslight-content-color-default)));flex-direction:row;align-items:flex-start;padding-block-start:var(--mod-statuslight-spacing-top-to-label,var(--spectrum-statuslight-spacing-top-to-label));padding-block-end:var(--mod-statuslight-spacing-bottom-to-label,var(--spectrum-statuslight-spacing-bottom-to-label));padding-inline:0;display:flex}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(--mod-statuslight-line-height-cjk,var(--spectrum-statuslight-line-height-cjk))}:host:before{--spectrum-statuslight-spacing-computed-top-to-dot:calc(var(--mod-statuslight-spacing-top-to-dot,var(--spectrum-statuslight-spacing-top-to-dot)) - var(--mod-statuslight-spacing-top-to-label,var(--spectrum-statuslight-spacing-top-to-label)));content:"";inline-size:var(--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size));block-size:var(--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size));border-radius:var(--mod-statuslight-corner-radius,var(--spectrum-statuslight-corner-radius));flex-grow:0;flex-shrink:0;margin-block-start:var(--spectrum-statuslight-spacing-computed-top-to-dot);margin-inline-end:var(--mod-statuslight-spacing-dot-to-label,var(--spectrum-statuslight-spacing-dot-to-label));display:inline-block}:host([variant=neutral]){color:var(--highcontrast-statuslight-subdued-content-color-default,var(--mod-statuslight-subdued-content-color-default,var(--spectrum-statuslight-subdued-content-color-default)));font-style:italic}:host([variant=neutral]):before{background-color:var(--mod-statuslight-semantic-neutral-color,var(--spectrum-statuslight-semantic-neutral-color))}.spectrum-StatusLight--accent:before{background-color:var(--mod-statuslight-semantic-accent-color,var(--spectrum-statuslight-semantic-accent-color))}:host([variant=info]):before{background-color:var(--mod-statuslight-semantic-info-color,var(--spectrum-statuslight-semantic-info-color))}:host([variant=negative]):before{background-color:var(--mod-statuslight-semantic-negative-color,var(--spectrum-statuslight-semantic-negative-color))}:host([variant=notice]):before{background-color:var(--mod-statuslight-semantic-notice-color,var(--spectrum-statuslight-semantic-notice-color))}:host([variant=positive]):before{background-color:var(--mod-statuslight-semantic-positive-color,var(--spectrum-statuslight-semantic-positive-color))}.spectrum-StatusLight--gray:before{background-color:var(--mod-statuslight-nonsemantic-gray-color,var(--spectrum-statuslight-nonsemantic-gray-color))}.spectrum-StatusLight--red:before{background-color:var(--mod-statuslight-nonsemantic-red-color,var(--spectrum-statuslight-nonsemantic-red-color))}.spectrum-StatusLight--orange:before{background-color:var(--mod-statuslight-nonsemantic-orange-color,var(--spectrum-statuslight-nonsemantic-orange-color))}:host([variant=yellow]):before{background-color:var(--mod-statuslight-nonsemantic-yellow-color,var(--spectrum-statuslight-nonsemantic-yellow-color))}:host([variant=chartreuse]):before{background-color:var(--mod-statuslight-nonsemantic-chartreuse-color,var(--spectrum-statuslight-nonsemantic-chartreuse-color))}:host([variant=celery]):before{background-color:var(--mod-statuslight-nonsemantic-celery-color,var(--spectrum-statuslight-nonsemantic-celery-color))}.spectrum-StatusLight--green:before{background-color:var(--mod-statuslight-nonsemantic-green-color,var(--spectrum-statuslight-nonsemantic-green-color))}:host([variant=seafoam]):before{background-color:var(--mod-statuslight-nonsemantic-seafoam-color,var(--spectrum-statuslight-nonsemantic-seafoam-color))}.spectrum-StatusLight--cyan:before{background-color:var(--mod-statuslight-nonsemantic-cyan-color,var(--spectrum-statuslight-nonsemantic-cyan-color))}.spectrum-StatusLight--blue:before{background-color:var(--mod-statuslight-nonsemantic-blue-color,var(--spectrum-statuslight-nonsemantic-blue-color))}:host([variant=indigo]):before{background-color:var(--mod-statuslight-nonsemantic-indigo-color,var(--spectrum-statuslight-nonsemantic-indigo-color))}:host([variant=purple]):before{background-color:var(--mod-statuslight-nonsemantic-purple-color,var(--spectrum-statuslight-nonsemantic-purple-color))}:host([variant=fuchsia]):before{background-color:var(--mod-statuslight-nonsemantic-fuchsia-color,var(--spectrum-statuslight-nonsemantic-fuchsia-color))}:host([variant=magenta]):before{background-color:var(--mod-statuslight-nonsemantic-magenta-color,var(--spectrum-statuslight-nonsemantic-magenta-color))}@media (forced-colors:active){:host([dir]){--highcontrast-statuslight-content-color-default:CanvasText;--highcontrast-statuslight-subdued-content-color-default:CanvasText;forced-color-adjust:none}:host:before{forced-color-adjust:none;border:var(--mod-statuslight-border-width,var(--spectrum-statuslight-border-width))solid ButtonText}}:host([dir]){--spectrum-statuslight-corner-radius:var(--system-status-light-corner-radius);--spectrum-statuslight-font-weight:var(--system-status-light-font-weight);--spectrum-statuslight-border-width:var(--system-status-light-border-width);--spectrum-statuslight-height:var(--system-status-light-height);--spectrum-statuslight-dot-size:var(--system-status-light-dot-size);--spectrum-statuslight-line-height:var(--system-status-light-line-height);--spectrum-statuslight-line-height-cjk:var(--system-status-light-line-height-cjk);--spectrum-statuslight-font-size:var(--system-status-light-font-size);--spectrum-statuslight-spacing-dot-to-label:var(--system-status-light-spacing-dot-to-label);--spectrum-statuslight-spacing-top-to-dot:var(--system-status-light-spacing-top-to-dot);--spectrum-statuslight-spacing-top-to-label:var(--system-status-light-spacing-top-to-label);--spectrum-statuslight-spacing-bottom-to-label:var(--system-status-light-spacing-bottom-to-label);--spectrum-statuslight-content-color-default:var(--system-status-light-content-color-default);--spectrum-statuslight-subdued-content-color-default:var(--system-status-light-subdued-content-color-default);--spectrum-statuslight-semantic-neutral-color:var(--system-status-light-semantic-neutral-color);--spectrum-statuslight-semantic-accent-color:var(--system-status-light-semantic-accent-color);--spectrum-statuslight-semantic-negative-color:var(--system-status-light-semantic-negative-color);--spectrum-statuslight-semantic-info-color:var(--system-status-light-semantic-info-color);--spectrum-statuslight-semantic-notice-color:var(--system-status-light-semantic-notice-color);--spectrum-statuslight-semantic-positive-color:var(--system-status-light-semantic-positive-color);--spectrum-statuslight-nonsemantic-gray-color:var(--system-status-light-nonsemantic-gray-color);--spectrum-statuslight-nonsemantic-red-color:var(--system-status-light-nonsemantic-red-color);--spectrum-statuslight-nonsemantic-orange-color:var(--system-status-light-nonsemantic-orange-color);--spectrum-statuslight-nonsemantic-yellow-color:var(--system-status-light-nonsemantic-yellow-color);--spectrum-statuslight-nonsemantic-chartreuse-color:var(--system-status-light-nonsemantic-chartreuse-color);--spectrum-statuslight-nonsemantic-celery-color:var(--system-status-light-nonsemantic-celery-color);--spectrum-statuslight-nonsemantic-green-color:var(--system-status-light-nonsemantic-green-color);--spectrum-statuslight-nonsemantic-seafoam-color:var(--system-status-light-nonsemantic-seafoam-color);--spectrum-statuslight-nonsemantic-cyan-color:var(--system-status-light-nonsemantic-cyan-color);--spectrum-statuslight-nonsemantic-blue-color:var(--system-status-light-nonsemantic-blue-color);--spectrum-statuslight-nonsemantic-indigo-color:var(--system-status-light-nonsemantic-indigo-color);--spectrum-statuslight-nonsemantic-purple-color:var(--system-status-light-nonsemantic-purple-color);--spectrum-statuslight-nonsemantic-fuchsia-color:var(--system-status-light-nonsemantic-fuchsia-color);--spectrum-statuslight-nonsemantic-magenta-color:var(--system-status-light-nonsemantic-magenta-color)}:host([size=s]){--spectrum-statuslight-height:var(--system-status-light-size-s-height);--spectrum-statuslight-dot-size:var(--system-status-light-size-s-dot-size);--spectrum-statuslight-font-size:var(--system-status-light-size-s-font-size);--spectrum-statuslight-spacing-dot-to-label:var(--system-status-light-size-s-spacing-dot-to-label);--spectrum-statuslight-spacing-top-to-dot:var(--system-status-light-size-s-spacing-top-to-dot);--spectrum-statuslight-spacing-top-to-label:var(--system-status-light-size-s-spacing-top-to-label);--spectrum-statuslight-spacing-bottom-to-label:var(--system-status-light-size-s-spacing-bottom-to-label)}:host{--spectrum-statuslight-height:var(--system-status-light-size-m-height);--spectrum-statuslight-dot-size:var(--system-status-light-size-m-dot-size);--spectrum-statuslight-font-size:var(--system-status-light-size-m-font-size);--spectrum-statuslight-spacing-dot-to-label:var(--system-status-light-size-m-spacing-dot-to-label);--spectrum-statuslight-spacing-top-to-dot:var(--system-status-light-size-m-spacing-top-to-dot);--spectrum-statuslight-spacing-top-to-label:var(--system-status-light-size-m-spacing-top-to-label);--spectrum-statuslight-spacing-bottom-to-label:var(--system-status-light-size-m-spacing-bottom-to-label)}:host([size=l]){--spectrum-statuslight-height:var(--system-status-light-size-l-height);--spectrum-statuslight-dot-size:var(--system-status-light-size-l-dot-size);--spectrum-statuslight-font-size:var(--system-status-light-size-l-font-size);--spectrum-statuslight-spacing-dot-to-label:var(--system-status-light-size-l-spacing-dot-to-label);--spectrum-statuslight-spacing-top-to-dot:var(--system-status-light-size-l-spacing-top-to-dot);--spectrum-statuslight-spacing-top-to-label:var(--system-status-light-size-l-spacing-top-to-label);--spectrum-statuslight-spacing-bottom-to-label:var(--system-status-light-size-l-spacing-bottom-to-label)}:host([size=xl]){--spectrum-statuslight-height:var(--system-status-light-size-xl-height);--spectrum-statuslight-dot-size:var(--system-status-light-size-xl-dot-size);--spectrum-statuslight-font-size:var(--system-status-light-size-xl-font-size);--spectrum-statuslight-spacing-dot-to-label:var(--system-status-light-size-xl-spacing-dot-to-label);--spectrum-statuslight-spacing-top-to-dot:var(--system-status-light-size-xl-spacing-top-to-dot);--spectrum-statuslight-spacing-top-to-label:var(--system-status-light-size-xl-spacing-top-to-label);--spectrum-statuslight-spacing-bottom-to-label:var(--system-status-light-size-xl-spacing-bottom-to-label)}:host([disabled]):before{background-color:var(--spectrum-statuslight-dot-color-disabled,var(--spectrum-gray-400))}
`;

var d=Object.defineProperty;var o=(l,r,t,i)=>{for(var e=void 0,a=l.length-1,s;a>=0;a--)(s=l[a])&&(e=(s(r,t,e))||e);return e&&d(r,t,e),e};class StatusLight extends SizedMixin(SpectrumElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.disabled=!1;this.variant="info";}static get styles(){return [s$1]}render(){return x`
            <slot></slot>
        `}updated(t){super.updated(t),t.has("disabled")&&(this.disabled?this.setAttribute("aria-disabled","true"):this.removeAttribute("aria-disabled"));}}o([n({type:Boolean,reflect:!0})],StatusLight.prototype,"disabled"),o([n({reflect:!0})],StatusLight.prototype,"variant");

defineElement("sp-status-light",StatusLight);

var statusLight_stories = {
  component: "sp-status-light",
  title: "StatusLight"
};
const s = () => x`
    <sp-status-light size="s" variant="positive">positive</sp-status-light>
    <sp-status-light size="s" variant="negative">negative</sp-status-light>
    <sp-status-light size="s" variant="notice">notice</sp-status-light>
    <sp-status-light size="s" variant="info">info</sp-status-light>
    <sp-status-light size="s" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="s" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="s" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="s" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="s" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="s" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="s" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="s" variant="celery">celery</sp-status-light>
    <sp-status-light size="s" variant="purple">purple</sp-status-light>
`;
const m = () => x`
    <sp-status-light size="m" variant="positive">positive</sp-status-light>
    <sp-status-light size="m" variant="negative">negative</sp-status-light>
    <sp-status-light size="m" variant="notice">notice</sp-status-light>
    <sp-status-light size="m" variant="info">info</sp-status-light>
    <sp-status-light size="m" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="m" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="m" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="m" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="m" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="m" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="m" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="m" variant="celery">celery</sp-status-light>
    <sp-status-light size="m" variant="purple">purple</sp-status-light>
`;
const l = () => x`
    <sp-status-light size="l" variant="positive">positive</sp-status-light>
    <sp-status-light size="l" variant="negative">negative</sp-status-light>
    <sp-status-light size="l" variant="notice">notice</sp-status-light>
    <sp-status-light size="l" variant="info">info</sp-status-light>
    <sp-status-light size="l" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="l" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="l" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="l" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="l" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="l" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="l" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="l" variant="celery">celery</sp-status-light>
    <sp-status-light size="l" variant="purple">purple</sp-status-light>
`;
const XL = () => x`
    <sp-status-light size="xl" variant="positive">positive</sp-status-light>
    <sp-status-light size="xl" variant="negative">negative</sp-status-light>
    <sp-status-light size="xl" variant="notice">notice</sp-status-light>
    <sp-status-light size="xl" variant="info">info</sp-status-light>
    <sp-status-light size="xl" variant="neutral">neutral</sp-status-light>
    <sp-status-light size="xl" variant="yellow">yellow</sp-status-light>
    <sp-status-light size="xl" variant="fuchsia">fuchsia</sp-status-light>
    <sp-status-light size="xl" variant="indigo">indigo</sp-status-light>
    <sp-status-light size="xl" variant="seafoam">seafoam</sp-status-light>
    <sp-status-light size="xl" variant="chartreuse">chartreuse</sp-status-light>
    <sp-status-light size="xl" variant="magenta">magenta</sp-status-light>
    <sp-status-light size="xl" variant="celery">celery</sp-status-light>
    <sp-status-light size="xl" variant="purple">purple</sp-status-light>
`;
const disabledTrue = () => x`
    <sp-status-light variant="positive" disabled>positive</sp-status-light>
`;
disabledTrue.storyName = "disabled: true";
const __namedExportsOrder = ['s', 'm', 'l', 'XL', 'disabledTrue'];

export { XL, __namedExportsOrder, statusLight_stories as default, disabledTrue, l, m, s };
