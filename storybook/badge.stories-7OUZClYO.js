import { O as ObserveSlotText } from './observe-slot-text-C6K935AT.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-Ceiwt-jV.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { x, T } from './lit-html-COgVUehj.js';
import { n, S as SpectrumElement, d as defineElement } from './define-element-C_3bgzm7.js';
import './sp-icon-checkmark-circle-Byi1eUQm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './CheckmarkCircle-DkBM2WW_.js';
import './custom-tag-Diwq7nXX.js';
import './IconBase-BIYWpr2G.js';

const r=i`
    :host{--spectrum-badge-corner-radius:var(--spectrum-corner-radius-100);--spectrum-badge-line-height:var(--spectrum-line-height-100);--spectrum-badge-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-badge-label-icon-color:var(--spectrum-white);--spectrum-badge-background-color-default:var(--spectrum-neutral-subdued-background-color-default);--spectrum-badge-background-color-accent:var(--spectrum-accent-background-color-default);--spectrum-badge-background-color-informative:var(--spectrum-informative-background-color-default);--spectrum-badge-background-color-negative:var(--spectrum-negative-background-color-default);--spectrum-badge-background-color-positive:var(--spectrum-positive-background-color-default);--spectrum-badge-background-color-notice:var(--spectrum-notice-background-color-default);--spectrum-badge-background-color-gray:var(--spectrum-gray-background-color-default);--spectrum-badge-background-color-red:var(--spectrum-red-background-color-default);--spectrum-badge-background-color-orange:var(--spectrum-orange-background-color-default);--spectrum-badge-background-color-yellow:var(--spectrum-yellow-background-color-default);--spectrum-badge-background-color-chartreuse:var(--spectrum-chartreuse-background-color-default);--spectrum-badge-background-color-celery:var(--spectrum-celery-background-color-default);--spectrum-badge-background-color-green:var(--spectrum-green-background-color-default);--spectrum-badge-background-color-seafoam:var(--spectrum-seafoam-background-color-default);--spectrum-badge-background-color-cyan:var(--spectrum-cyan-background-color-default);--spectrum-badge-background-color-blue:var(--spectrum-blue-background-color-default);--spectrum-badge-background-color-indigo:var(--spectrum-indigo-background-color-default);--spectrum-badge-background-color-purple:var(--spectrum-purple-background-color-default);--spectrum-badge-background-color-fuchsia:var(--spectrum-fuchsia-background-color-default);--spectrum-badge-background-color-magenta:var(--spectrum-magenta-background-color-default);--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-100);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-100);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-100);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-100);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-100);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-100);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-100);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-100)}:host([variant=celery]),:host([variant=chartreuse]),:host([variant=orange]),:host([variant=yellow]){--spectrum-badge-label-icon-color:var(--spectrum-black)}:host([variant=blue]),:host([variant=cyan]),:host([variant=fuchsia]),:host([variant=gray]),:host([variant=green]),:host([variant=indigo]),:host([variant=magenta]),:host([variant=purple]),:host([variant=red]),:host([variant=seafoam]){--spectrum-badge-label-icon-color:var(--spectrum-badge-label-icon-color-primary)}:host([size=s]){--spectrum-badge-height:var(--spectrum-component-height-75);--spectrum-badge-font-size:var(--spectrum-font-size-75);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-75);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-75);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-75);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-75);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-75);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-75);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-75)}:host([size=l]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-200);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-200);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-200);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-200);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-200);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-200);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-200);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-200)}:host([size=xl]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-300);--spectrum-badge-label-spacing-vertical-top:var(--spectrum-component-top-to-text-300);--spectrum-badge-label-spacing-vertical-bottom:var(--spectrum-component-bottom-to-text-300);--spectrum-badge-label-spacing-horizontal:var(--spectrum-component-edge-to-text-300);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-300);--spectrum-badge-icon-spacing-horizontal:var(--spectrum-component-edge-to-visual-300);--spectrum-badge-icon-spacing-vertical-top:var(--spectrum-component-top-to-workflow-icon-300);--spectrum-badge-icon-only-spacing-horizontal:var(--spectrum-component-edge-to-visual-only-300)}@media (forced-colors:active){:host{border-color:CanvasText}}:host{min-block-size:var(--mod-badge-height,var(--spectrum-badge-height));inline-size:auto;vertical-align:middle;cursor:default;-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;border-radius:var(--mod-badge-corner-radius,var(--spectrum-badge-corner-radius));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));border:1px solid #0000;display:inline-flex;position:relative}:host,:host([variant=neutral]){background:var(--mod-badge-background-color-default,var(--spectrum-badge-background-color-default))}:host([variant=accent]){background:var(--mod-badge-background-color-accent,var(--spectrum-badge-background-color-accent))}:host([variant=informative]){background:var(--mod-badge-background-color-informative,var(--spectrum-badge-background-color-informative))}:host([variant=negative]){background:var(--mod-badge-background-color-negative,var(--spectrum-badge-background-color-negative))}:host([variant=positive]){background:var(--mod-badge-background-color-positive,var(--spectrum-badge-background-color-positive))}:host([variant=notice]){background:var(--mod-badge-background-color-notice,var(--spectrum-badge-background-color-notice))}:host([variant=gray]){background:var(--mod-badge-background-color-gray,var(--spectrum-badge-background-color-gray))}:host([variant=red]){background:var(--mod-badge-background-color-red,var(--spectrum-badge-background-color-red))}:host([variant=orange]){background:var(--mod-badge-background-color-orange,var(--spectrum-badge-background-color-orange))}:host([variant=yellow]){background:var(--mod-badge-background-color-yellow,var(--spectrum-badge-background-color-yellow))}:host([variant=chartreuse]){background:var(--mod-badge-background-color-chartreuse,var(--spectrum-badge-background-color-chartreuse))}:host([variant=celery]){background:var(--mod-badge-background-color-celery,var(--spectrum-badge-background-color-celery))}:host([variant=green]){background:var(--mod-badge-background-color-green,var(--spectrum-badge-background-color-green))}:host([variant=seafoam]){background:var(--mod-badge-background-color-seafoam,var(--spectrum-badge-background-color-seafoam))}:host([variant=cyan]){background:var(--mod-badge-background-color-cyan,var(--spectrum-badge-background-color-cyan))}:host([variant=blue]){background:var(--mod-badge-background-color-blue,var(--spectrum-badge-background-color-blue))}:host([variant=indigo]){background:var(--mod-badge-background-color-indigo,var(--spectrum-badge-background-color-indigo))}:host([variant=purple]){background:var(--mod-badge-background-color-purple,var(--spectrum-badge-background-color-purple))}:host([variant=fuchsia]){background:var(--mod-badge-background-color-fuchsia,var(--spectrum-badge-background-color-fuchsia))}:host([variant=magenta]){background:var(--mod-badge-background-color-magenta,var(--spectrum-badge-background-color-magenta))}:host([fixed=inline-start]){border-start-start-radius:0;border-end-start-radius:0}:host([fixed=inline-end]){border-start-end-radius:0;border-end-end-radius:0}:host([fixed=block-start]){border-start-start-radius:0;border-start-end-radius:0}:host([fixed=block-end]){border-end-end-radius:0;border-end-start-radius:0}.label{font-size:var(--mod-badge-font-size,var(--spectrum-badge-font-size));line-height:var(--mod-badge-line-height,var(--spectrum-badge-line-height));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));padding-block-start:var(--mod-badge-label-spacing-vertical-top,var(--spectrum-badge-label-spacing-vertical-top));padding-block-end:var(--mod-badge-label-spacing-vertical-bottom,var(--spectrum-badge-label-spacing-vertical-bottom));padding-inline-start:var(--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal));padding-inline-end:var(--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal))}.label:lang(ja),.label:lang(ko),.label:lang(zh){line-height:var(--mod-badge-line-height-cjk,var(--spectrum-badge-line-height-cjk))}[name=icon]+.label{padding-inline-start:0}::slotted([slot=icon]){block-size:var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));inline-size:var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));flex:0 0 var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));padding-block-start:var(--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top));padding-block-end:var(--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top));padding-inline-start:var(--mod-badge-icon-spacing-horizontal,var(--spectrum-badge-icon-spacing-horizontal));padding-inline-end:var(--mod-badge-icon-text-spacing,var(--spectrum-badge-icon-text-spacing))}[icon-only]::slotted(*){padding-inline-start:var(--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal));padding-inline-end:var(--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal))}:host{align-items:center}:host([fixed=left]){border-start-start-radius:0;border-end-start-radius:0}:host([fixed=right]){border-start-end-radius:0;border-end-end-radius:0}:host([fixed=top]){border-start-start-radius:0;border-start-end-radius:0}:host([fixed=bottom]){border-end-end-radius:0;border-end-start-radius:0}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=m]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-400)}::slotted([slot=icon]){flex-shrink:0}.label slot{max-height:calc(var(--spectrum-badge-line-height)*var(--spectrum-badge-font-size)*2);display:block;overflow:hidden}[icon-only]+.label{display:none}
`;

var d=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var a=(r,o,e,i)=>{for(var t=i>1?void 0:i?u(o,e):o,s=r.length-1,n;s>=0;s--)(n=r[s])&&(t=(i?n(o,e,t):n(t))||t);return i&&t&&d(o,e,t),t};class Badge extends SizedMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement,'[slot="icon"]'),""),{noDefaultSize:!0}){constructor(){super(...arguments);this.variant="informative";}static get styles(){return [r]}get fixed(){return this._fixed}set fixed(e){if(e===this.fixed)return;const i=this.fixed;this._fixed=e,e?this.setAttribute("fixed",e):this.removeAttribute("fixed"),this.requestUpdate("fixed",i);}get hasIcon(){return this.slotContentIsPresent}render(){return x`
            ${this.hasIcon?x`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:T}
            <div class="label">
                <slot></slot>
            </div>
        `}}a([n({reflect:!0})],Badge.prototype,"fixed",1),a([n({type:String,reflect:!0})],Badge.prototype,"variant",2);

defineElement("sp-badge",Badge);

var badge_stories = {
  title: "Badge",
  component: "sp-badge"
};
const Default = () => {
  return x`
        <sp-badge>Badge</sp-badge>
    `;
};
const Icons = () => {
  return x`
        <sp-badge>No icon</sp-badge>

        <sp-badge>
            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
            Icon and label
        </sp-badge>

        <sp-badge>
            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        </sp-badge>
    `;
};
const Sizes = () => {
  return x`
        <div style="display: flex; align-items: center; gap: 8px;">
            <sp-badge size="s">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Small
            </sp-badge>
            <sp-badge size="m">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Medium
            </sp-badge>
            <sp-badge size="l">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Large
            </sp-badge>
            <sp-badge size="xl">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Extra-large
            </sp-badge>
            <sp-badge style="max-width: 180px">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                This long content automatically wraps, but shows no more than
                two lines
            </sp-badge>
        </div>
    `;
};
const Semantic = () => {
  return x`
        <sp-badge variant="accent">Accent</sp-badge>
        <sp-badge variant="positive">Positive</sp-badge>
        <sp-badge variant="informative">Informative</sp-badge>
        <sp-badge variant="negative">Negative</sp-badge>
        <sp-badge variant="neutral">Neutral</sp-badge>
        <sp-badge variant="notice">Notice</sp-badge>
    `;
};
const NonSemantic = () => {
  return x`
        <sp-badge variant="seafoam">Seafoam</sp-badge>
        <sp-badge variant="indigo">Indigo</sp-badge>
        <sp-badge variant="purple">Purple</sp-badge>
        <sp-badge variant="fuchsia">Fuchsia</sp-badge>
        <sp-badge variant="magenta">Magenta</sp-badge>
        <sp-badge variant="yellow">Yellow</sp-badge>
        <sp-badge variant="gray">Gray</sp-badge>
        <sp-badge variant="red">Red</sp-badge>
        <sp-badge variant="orange">Orange</sp-badge>
        <sp-badge variant="chartreuse">Chartreuse</sp-badge>
        <sp-badge variant="celery">Celery</sp-badge>
        <sp-badge variant="green">Green</sp-badge>
        <sp-badge variant="cyan">Cyan</sp-badge>
        <sp-badge variant="blue">Blue</sp-badge>
    `;
};
const Inline = () => {
  return x`
        Badge is a simple
        <sp-badge variant="positive" size="s">inline</sp-badge>
        element that should
        <sp-badge variant="neutral" size="s">flow</sp-badge>
        with the rest of the page:
        <sp-badge variant="negative">Missing</sp-badge>
        <sp-badge variant="positive">Successful</sp-badge>
        <sp-badge variant="accent">Accent</sp-badge>
    `;
};
const Fixed = () => {
  return x`
        <div
            style="position: relative; width: 400px; height: 200px; background: #eee"
        >
            <sp-badge>None</sp-badge>
            <sp-badge
                fixed="block-start"
                style="position: absolute; top: 0; left: 200px;"
            >
                block-start
            </sp-badge>
            <sp-badge
                fixed="inline-end"
                style="position: absolute; right: 0; top: 100px;"
            >
                inline-end
            </sp-badge>
            <sp-badge
                fixed="block-end"
                style="position: absolute; bottom: 0; left: 200px;"
            >
                block-end
            </sp-badge>
            <sp-badge
                fixed="inline-start"
                style="position: absolute; left: 0; top: 100px;"
            >
                inline-start
            </sp-badge>
        </div>
    `;
};
const __namedExportsOrder = ['Default', 'Icons', 'Sizes', 'Semantic', 'NonSemantic', 'Inline', 'Fixed'];

export { Default, Fixed, Icons, Inline, NonSemantic, Semantic, Sizes, __namedExportsOrder, badge_stories as default };
