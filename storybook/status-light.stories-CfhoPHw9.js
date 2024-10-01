import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';

const s$1=i`
    :host([dir]){--spectrum-statuslight-corner-radius:50%;--spectrum-statuslight-font-weight:400;--spectrum-statuslight-border-width:var(--spectrum-border-width-100);--spectrum-statuslight-height:var(--spectrum-component-height-100);--spectrum-statuslight-dot-size:var(--spectrum-status-light-dot-size-medium);--spectrum-statuslight-line-height:var(--spectrum-line-height-100);--spectrum-statuslight-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(--spectrum-text-to-visual-100);--spectrum-statuslight-spacing-top-to-dot:var(--spectrum-status-light-top-to-dot-medium);--spectrum-statuslight-spacing-top-to-label:var(--spectrum-component-top-to-text-100);--spectrum-statuslight-spacing-bottom-to-label:var(--spectrum-component-bottom-to-text-100);--spectrum-statuslight-content-color-default:var(--spectrum-neutral-content-color-default);--spectrum-statuslight-subdued-content-color-default:var(--spectrum-neutral-subdued-content-color-default);--spectrum-statuslight-semantic-neutral-color:var(--spectrum-neutral-visual-color);--spectrum-statuslight-semantic-accent-color:var(--spectrum-accent-visual-color);--spectrum-statuslight-semantic-negative-color:var(--spectrum-negative-visual-color);--spectrum-statuslight-semantic-info-color:var(--spectrum-informative-visual-color);--spectrum-statuslight-semantic-notice-color:var(--spectrum-notice-visual-color);--spectrum-statuslight-semantic-positive-color:var(--spectrum-positive-visual-color);--spectrum-statuslight-nonsemantic-gray-color:var(--spectrum-gray-visual-color);--spectrum-statuslight-nonsemantic-red-color:var(--spectrum-red-visual-color);--spectrum-statuslight-nonsemantic-orange-color:var(--spectrum-orange-visual-color);--spectrum-statuslight-nonsemantic-yellow-color:var(--spectrum-yellow-visual-color);--spectrum-statuslight-nonsemantic-chartreuse-color:var(--spectrum-chartreuse-visual-color);--spectrum-statuslight-nonsemantic-celery-color:var(--spectrum-celery-visual-color);--spectrum-statuslight-nonsemantic-green-color:var(--spectrum-green-visual-color);--spectrum-statuslight-nonsemantic-seafoam-color:var(--spectrum-seafoam-visual-color);--spectrum-statuslight-nonsemantic-cyan-color:var(--spectrum-cyan-visual-color);--spectrum-statuslight-nonsemantic-blue-color:var(--spectrum-blue-visual-color);--spectrum-statuslight-nonsemantic-indigo-color:var(--spectrum-indigo-visual-color);--spectrum-statuslight-nonsemantic-purple-color:var(--spectrum-purple-visual-color);--spectrum-statuslight-nonsemantic-fuchsia-color:var(--spectrum-fuchsia-visual-color);--spectrum-statuslight-nonsemantic-magenta-color:var(--spectrum-magenta-visual-color)}:host([size=s]){--spectrum-statuslight-height:var(--spectrum-component-height-75);--spectrum-statuslight-dot-size:var(--spectrum-status-light-dot-size-small);--spectrum-statuslight-font-size:var(--spectrum-font-size-75);--spectrum-statuslight-spacing-dot-to-label:var(--spectrum-text-to-visual-75);--spectrum-statuslight-spacing-top-to-dot:var(--spectrum-status-light-top-to-dot-small);--spectrum-statuslight-spacing-top-to-label:var(--spectrum-component-top-to-text-75);--spectrum-statuslight-spacing-bottom-to-label:var(--spectrum-component-bottom-to-text-75)}:host{--spectrum-statuslight-height:var(--spectrum-component-height-100);--spectrum-statuslight-dot-size:var(--spectrum-status-light-dot-size-medium);--spectrum-statuslight-font-size:var(--spectrum-font-size-100);--spectrum-statuslight-spacing-dot-to-label:var(--spectrum-text-to-visual-100);--spectrum-statuslight-spacing-top-to-dot:var(--spectrum-status-light-top-to-dot-medium);--spectrum-statuslight-spacing-top-to-label:var(--spectrum-component-top-to-text-100);--spectrum-statuslight-spacing-bottom-to-label:var(--spectrum-component-bottom-to-text-100)}:host([size=l]){--spectrum-statuslight-height:var(--spectrum-component-height-200);--spectrum-statuslight-dot-size:var(--spectrum-status-light-dot-size-large);--spectrum-statuslight-font-size:var(--spectrum-font-size-200);--spectrum-statuslight-spacing-dot-to-label:var(--spectrum-text-to-visual-200);--spectrum-statuslight-spacing-top-to-dot:var(--spectrum-status-light-top-to-dot-large);--spectrum-statuslight-spacing-top-to-label:var(--spectrum-component-top-to-text-200);--spectrum-statuslight-spacing-bottom-to-label:var(--spectrum-component-bottom-to-text-200)}:host([size=xl]){--spectrum-statuslight-height:var(--spectrum-component-height-300);--spectrum-statuslight-dot-size:var(--spectrum-status-light-dot-size-extra-large);--spectrum-statuslight-font-size:var(--spectrum-font-size-300);--spectrum-statuslight-spacing-dot-to-label:var(--spectrum-text-to-visual-300);--spectrum-statuslight-spacing-top-to-dot:var(--spectrum-status-light-top-to-dot-extra-large);--spectrum-statuslight-spacing-top-to-label:var(--spectrum-component-top-to-text-300);--spectrum-statuslight-spacing-bottom-to-label:var(--spectrum-component-bottom-to-text-300)}@media (forced-colors:active){:host([dir]){forced-color-adjust:none;--highcontrast-statuslight-content-color-default:CanvasText;--highcontrast-statuslight-subdued-content-color-default:CanvasText}:host:before{border:var(--mod-statuslight-border-width,var(--spectrum-statuslight-border-width))solid ButtonText}}:host([dir]){min-block-size:var(--mod-statuslight-height,var(--spectrum-statuslight-height));box-sizing:border-box;font-size:var(--mod-statuslight-font-size,var(--spectrum-statuslight-font-size));font-weight:var(--mod-statuslight-font-weight,var(--spectrum-statuslight-font-weight));line-height:var(--mod-statuslight-line-height,var(--spectrum-statuslight-line-height));color:var(--highcontrast-statuslight-content-color-default,var(--mod-statuslight-content-color-default,var(--spectrum-statuslight-content-color-default)));flex-direction:row;align-items:flex-start;padding-block-start:var(--mod-statuslight-spacing-top-to-label,var(--spectrum-statuslight-spacing-top-to-label));padding-block-end:var(--mod-statuslight-spacing-bottom-to-label,var(--spectrum-statuslight-spacing-bottom-to-label));padding-inline:0;display:flex}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(--mod-statuslight-line-height-cjk,var(--spectrum-statuslight-line-height-cjk))}:host:before{content:"";inline-size:var(--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size));block-size:var(--mod-statuslight-dot-size,var(--spectrum-statuslight-dot-size));border-radius:var(--mod-statuslight-corner-radius,var(--spectrum-statuslight-corner-radius));--spectrum-statuslight-spacing-computed-top-to-dot:calc(var(--mod-statuslight-spacing-top-to-dot,var(--spectrum-statuslight-spacing-top-to-dot)) - var(--mod-statuslight-spacing-top-to-label,var(--spectrum-statuslight-spacing-top-to-label)));-ms-high-contrast-adjust:none;forced-color-adjust:none;flex-grow:0;flex-shrink:0;margin-block-start:var(--spectrum-statuslight-spacing-computed-top-to-dot);margin-inline-end:var(--mod-statuslight-spacing-dot-to-label,var(--spectrum-statuslight-spacing-dot-to-label));display:inline-block}:host([variant=neutral]){color:var(--highcontrast-statuslight-subdued-content-color-default,var(--mod-statuslight-subdued-content-color-default,var(--spectrum-statuslight-subdued-content-color-default)));font-style:italic}:host([variant=neutral]):before{background-color:var(--mod-statuslight-semantic-neutral-color,var(--spectrum-statuslight-semantic-neutral-color))}.spectrum-StatusLight--accent:before{background-color:var(--mod-statuslight-semantic-accent-color,var(--spectrum-statuslight-semantic-accent-color))}:host([variant=info]):before{background-color:var(--mod-statuslight-semantic-info-color,var(--spectrum-statuslight-semantic-info-color))}:host([variant=negative]):before{background-color:var(--mod-statuslight-semantic-negative-color,var(--spectrum-statuslight-semantic-negative-color))}:host([variant=notice]):before{background-color:var(--mod-statuslight-semantic-notice-color,var(--spectrum-statuslight-semantic-notice-color))}:host([variant=positive]):before{background-color:var(--mod-statuslight-semantic-positive-color,var(--spectrum-statuslight-semantic-positive-color))}.spectrum-StatusLight--gray:before{background-color:var(--mod-statuslight-nonsemantic-gray-color,var(--spectrum-statuslight-nonsemantic-gray-color))}.spectrum-StatusLight--red:before{background-color:var(--mod-statuslight-nonsemantic-red-color,var(--spectrum-statuslight-nonsemantic-red-color))}.spectrum-StatusLight--orange:before{background-color:var(--mod-statuslight-nonsemantic-orange-color,var(--spectrum-statuslight-nonsemantic-orange-color))}:host([variant=yellow]):before{background-color:var(--mod-statuslight-nonsemantic-yellow-color,var(--spectrum-statuslight-nonsemantic-yellow-color))}:host([variant=chartreuse]):before{background-color:var(--mod-statuslight-nonsemantic-chartreuse-color,var(--spectrum-statuslight-nonsemantic-chartreuse-color))}:host([variant=celery]):before{background-color:var(--mod-statuslight-nonsemantic-celery-color,var(--spectrum-statuslight-nonsemantic-celery-color))}.spectrum-StatusLight--green:before{background-color:var(--mod-statuslight-nonsemantic-green-color,var(--spectrum-statuslight-nonsemantic-green-color))}:host([variant=seafoam]):before{background-color:var(--mod-statuslight-nonsemantic-seafoam-color,var(--spectrum-statuslight-nonsemantic-seafoam-color))}.spectrum-StatusLight--cyan:before{background-color:var(--mod-statuslight-nonsemantic-cyan-color,var(--spectrum-statuslight-nonsemantic-cyan-color))}.spectrum-StatusLight--blue:before{background-color:var(--mod-statuslight-nonsemantic-blue-color,var(--spectrum-statuslight-nonsemantic-blue-color))}:host([variant=indigo]):before{background-color:var(--mod-statuslight-nonsemantic-indigo-color,var(--spectrum-statuslight-nonsemantic-indigo-color))}:host([variant=purple]):before{background-color:var(--mod-statuslight-nonsemantic-purple-color,var(--spectrum-statuslight-nonsemantic-purple-color))}:host([variant=fuchsia]):before{background-color:var(--mod-statuslight-nonsemantic-fuchsia-color,var(--spectrum-statuslight-nonsemantic-fuchsia-color))}:host([variant=magenta]):before{background-color:var(--mod-statuslight-nonsemantic-magenta-color,var(--spectrum-statuslight-nonsemantic-magenta-color))}:host([disabled]):before{background-color:var(--spectrum-statuslight-dot-color-disabled,var(--spectrum-gray-400))}
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
