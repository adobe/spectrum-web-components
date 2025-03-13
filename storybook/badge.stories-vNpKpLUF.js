import { O as ObserveSlotText } from './observe-slot-text-Mz9mFVuX.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-Ceiwt-jV.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SizedMixin } from './sizedMixin-D4VoaNlz.js';
import { x, T } from './lit-html-COgVUehj.js';
import { n, S as SpectrumElement, d as defineElement } from './define-element-2VgsDjbW.js';
import './sp-icon-checkmark-circle-BvjR225z.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './CheckmarkCircle-khREaDoc.js';
import './IconBase-BC0FCRBc.js';
import './state-ChcedIDn.js';

const e=i`
    @media (forced-colors:active){:host{border-color:CanvasText}}:host{min-block-size:var(--mod-badge-height,var(--spectrum-badge-height));inline-size:auto;vertical-align:middle;cursor:default;-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;border-radius:var(--mod-badge-corner-radius,var(--spectrum-badge-corner-radius));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));border:1px solid #0000;display:inline-flex;position:relative}:host,:host([variant=neutral]){background:var(--mod-badge-background-color-default,var(--spectrum-badge-background-color-default))}:host([variant=accent]){background:var(--mod-badge-background-color-accent,var(--spectrum-badge-background-color-accent))}:host([variant=informative]){background:var(--mod-badge-background-color-informative,var(--spectrum-badge-background-color-informative))}:host([variant=negative]){background:var(--mod-badge-background-color-negative,var(--spectrum-badge-background-color-negative))}:host([variant=positive]){background:var(--mod-badge-background-color-positive,var(--spectrum-badge-background-color-positive))}:host([variant=notice]){background:var(--mod-badge-background-color-notice,var(--spectrum-badge-background-color-notice))}:host([variant=gray]){background:var(--mod-badge-background-color-gray,var(--spectrum-badge-background-color-gray))}:host([variant=red]){background:var(--mod-badge-background-color-red,var(--spectrum-badge-background-color-red))}:host([variant=orange]){background:var(--mod-badge-background-color-orange,var(--spectrum-badge-background-color-orange))}:host([variant=yellow]){background:var(--mod-badge-background-color-yellow,var(--spectrum-badge-background-color-yellow))}:host([variant=chartreuse]){background:var(--mod-badge-background-color-chartreuse,var(--spectrum-badge-background-color-chartreuse))}:host([variant=celery]){background:var(--mod-badge-background-color-celery,var(--spectrum-badge-background-color-celery))}:host([variant=green]){background:var(--mod-badge-background-color-green,var(--spectrum-badge-background-color-green))}:host([variant=seafoam]){background:var(--mod-badge-background-color-seafoam,var(--spectrum-badge-background-color-seafoam))}:host([variant=cyan]){background:var(--mod-badge-background-color-cyan,var(--spectrum-badge-background-color-cyan))}:host([variant=blue]){background:var(--mod-badge-background-color-blue,var(--spectrum-badge-background-color-blue))}:host([variant=indigo]){background:var(--mod-badge-background-color-indigo,var(--spectrum-badge-background-color-indigo))}:host([variant=purple]){background:var(--mod-badge-background-color-purple,var(--spectrum-badge-background-color-purple))}:host([variant=fuchsia]){background:var(--mod-badge-background-color-fuchsia,var(--spectrum-badge-background-color-fuchsia))}:host([variant=magenta]){background:var(--mod-badge-background-color-magenta,var(--spectrum-badge-background-color-magenta))}:host([fixed=inline-start]){border-start-start-radius:0;border-end-start-radius:0}:host([fixed=inline-end]){border-start-end-radius:0;border-end-end-radius:0}:host([fixed=block-start]){border-start-start-radius:0;border-start-end-radius:0}:host([fixed=block-end]){border-end-end-radius:0;border-end-start-radius:0}.label{font-size:var(--mod-badge-font-size,var(--spectrum-badge-font-size));line-height:var(--mod-badge-line-height,var(--spectrum-badge-line-height));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));padding-block-start:var(--mod-badge-label-spacing-vertical-top,var(--spectrum-badge-label-spacing-vertical-top));padding-block-end:var(--mod-badge-label-spacing-vertical-bottom,var(--spectrum-badge-label-spacing-vertical-bottom));padding-inline-start:var(--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal));padding-inline-end:var(--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal))}.label:lang(ja),.label:lang(ko),.label:lang(zh){line-height:var(--mod-badge-line-height-cjk,var(--spectrum-badge-line-height-cjk))}[name=icon]+.label{padding-inline-start:0}::slotted([slot=icon]){block-size:var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));inline-size:var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));flex:0 0 var(--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size));color:var(--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color));padding-block-start:var(--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top));padding-block-end:var(--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top));padding-inline-start:var(--mod-badge-icon-spacing-horizontal,var(--spectrum-badge-icon-spacing-horizontal));padding-inline-end:var(--mod-badge-icon-text-spacing,var(--spectrum-badge-icon-text-spacing))}[icon-only]::slotted(*){padding-inline-start:var(--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal));padding-inline-end:var(--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal))}:host{--spectrum-badge-corner-radius:var(--system-badge-corner-radius);--spectrum-badge-line-height:var(--system-badge-line-height);--spectrum-badge-line-height-cjk:var(--system-badge-line-height-cjk);--spectrum-badge-label-icon-color:var(--system-badge-label-icon-color);--spectrum-badge-background-color-default:var(--system-badge-background-color-default);--spectrum-badge-background-color-accent:var(--system-badge-background-color-accent);--spectrum-badge-background-color-informative:var(--system-badge-background-color-informative);--spectrum-badge-background-color-negative:var(--system-badge-background-color-negative);--spectrum-badge-background-color-positive:var(--system-badge-background-color-positive);--spectrum-badge-background-color-notice:var(--system-badge-background-color-notice);--spectrum-badge-background-color-gray:var(--system-badge-background-color-gray);--spectrum-badge-background-color-red:var(--system-badge-background-color-red);--spectrum-badge-background-color-orange:var(--system-badge-background-color-orange);--spectrum-badge-background-color-yellow:var(--system-badge-background-color-yellow);--spectrum-badge-background-color-chartreuse:var(--system-badge-background-color-chartreuse);--spectrum-badge-background-color-celery:var(--system-badge-background-color-celery);--spectrum-badge-background-color-green:var(--system-badge-background-color-green);--spectrum-badge-background-color-seafoam:var(--system-badge-background-color-seafoam);--spectrum-badge-background-color-cyan:var(--system-badge-background-color-cyan);--spectrum-badge-background-color-blue:var(--system-badge-background-color-blue);--spectrum-badge-background-color-indigo:var(--system-badge-background-color-indigo);--spectrum-badge-background-color-purple:var(--system-badge-background-color-purple);--spectrum-badge-background-color-fuchsia:var(--system-badge-background-color-fuchsia);--spectrum-badge-background-color-magenta:var(--system-badge-background-color-magenta);--spectrum-badge-height:var(--system-badge-height);--spectrum-badge-font-size:var(--system-badge-font-size);--spectrum-badge-label-spacing-vertical-top:var(--system-badge-label-spacing-vertical-top);--spectrum-badge-label-spacing-vertical-bottom:var(--system-badge-label-spacing-vertical-bottom);--spectrum-badge-label-spacing-horizontal:var(--system-badge-label-spacing-horizontal);--spectrum-badge-workflow-icon-size:var(--system-badge-workflow-icon-size);--spectrum-badge-icon-text-spacing:var(--system-badge-icon-text-spacing);--spectrum-badge-icon-spacing-horizontal:var(--system-badge-icon-spacing-horizontal);--spectrum-badge-icon-spacing-vertical-top:var(--system-badge-icon-spacing-vertical-top);--spectrum-badge-icon-only-spacing-horizontal:var(--system-badge-icon-only-spacing-horizontal)}:host([variant=orange]){--spectrum-badge-label-icon-color:var(--system-badge-orange-label-icon-color)}:host([variant=yellow]){--spectrum-badge-label-icon-color:var(--system-badge-yellow-label-icon-color)}:host([variant=chartreuse]){--spectrum-badge-label-icon-color:var(--system-badge-chartreuse-label-icon-color)}:host([variant=celery]){--spectrum-badge-label-icon-color:var(--system-badge-celery-label-icon-color)}:host([variant=gray]){--spectrum-badge-label-icon-color:var(--system-badge-gray-label-icon-color)}:host([variant=red]){--spectrum-badge-label-icon-color:var(--system-badge-red-label-icon-color)}:host([variant=green]){--spectrum-badge-label-icon-color:var(--system-badge-green-label-icon-color)}:host([variant=seafoam]){--spectrum-badge-label-icon-color:var(--system-badge-seafoam-label-icon-color)}:host([variant=cyan]){--spectrum-badge-label-icon-color:var(--system-badge-cyan-label-icon-color)}:host([variant=blue]){--spectrum-badge-label-icon-color:var(--system-badge-blue-label-icon-color)}:host([variant=indigo]){--spectrum-badge-label-icon-color:var(--system-badge-indigo-label-icon-color)}:host([variant=purple]){--spectrum-badge-label-icon-color:var(--system-badge-purple-label-icon-color)}:host([variant=fuchsia]){--spectrum-badge-label-icon-color:var(--system-badge-fuchsia-label-icon-color)}:host([variant=magenta]){--spectrum-badge-label-icon-color:var(--system-badge-magenta-label-icon-color)}:host([size=s]){--spectrum-badge-height:var(--system-badge-size-s-height);--spectrum-badge-font-size:var(--system-badge-size-s-font-size);--spectrum-badge-label-spacing-vertical-top:var(--system-badge-size-s-label-spacing-vertical-top);--spectrum-badge-label-spacing-vertical-bottom:var(--system-badge-size-s-label-spacing-vertical-bottom);--spectrum-badge-label-spacing-horizontal:var(--system-badge-size-s-label-spacing-horizontal);--spectrum-badge-workflow-icon-size:var(--system-badge-size-s-workflow-icon-size);--spectrum-badge-icon-text-spacing:var(--system-badge-size-s-icon-text-spacing);--spectrum-badge-icon-spacing-horizontal:var(--system-badge-size-s-icon-spacing-horizontal);--spectrum-badge-icon-spacing-vertical-top:var(--system-badge-size-s-icon-spacing-vertical-top);--spectrum-badge-icon-only-spacing-horizontal:var(--system-badge-size-s-icon-only-spacing-horizontal)}:host([size=l]){--spectrum-badge-height:var(--system-badge-size-l-height);--spectrum-badge-font-size:var(--system-badge-size-l-font-size);--spectrum-badge-label-spacing-vertical-top:var(--system-badge-size-l-label-spacing-vertical-top);--spectrum-badge-label-spacing-vertical-bottom:var(--system-badge-size-l-label-spacing-vertical-bottom);--spectrum-badge-label-spacing-horizontal:var(--system-badge-size-l-label-spacing-horizontal);--spectrum-badge-workflow-icon-size:var(--system-badge-size-l-workflow-icon-size);--spectrum-badge-icon-text-spacing:var(--system-badge-size-l-icon-text-spacing);--spectrum-badge-icon-spacing-horizontal:var(--system-badge-size-l-icon-spacing-horizontal);--spectrum-badge-icon-spacing-vertical-top:var(--system-badge-size-l-icon-spacing-vertical-top);--spectrum-badge-icon-only-spacing-horizontal:var(--system-badge-size-l-icon-only-spacing-horizontal)}:host([size=xl]){--spectrum-badge-height:var(--system-badge-size-xl-height);--spectrum-badge-font-size:var(--system-badge-size-xl-font-size);--spectrum-badge-label-spacing-vertical-top:var(--system-badge-size-xl-label-spacing-vertical-top);--spectrum-badge-label-spacing-vertical-bottom:var(--system-badge-size-xl-label-spacing-vertical-bottom);--spectrum-badge-label-spacing-horizontal:var(--system-badge-size-xl-label-spacing-horizontal);--spectrum-badge-workflow-icon-size:var(--system-badge-size-xl-workflow-icon-size);--spectrum-badge-icon-text-spacing:var(--system-badge-size-xl-icon-text-spacing);--spectrum-badge-icon-spacing-horizontal:var(--system-badge-size-xl-icon-spacing-horizontal);--spectrum-badge-icon-spacing-vertical-top:var(--system-badge-size-xl-icon-spacing-vertical-top);--spectrum-badge-icon-only-spacing-horizontal:var(--system-badge-size-xl-icon-only-spacing-horizontal)}:host{align-items:center}:host([size=xs]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-50)}:host([size=s]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-75)}:host([size=m]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-100)}:host([size=l]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-200)}:host([size=xl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-300)}:host([size=xxl]){--spectrum-icon-size:var(--spectrum-workflow-icon-size-400)}::slotted([slot=icon]){flex-shrink:0}.label slot{max-height:calc(var(--spectrum-badge-line-height)*var(--spectrum-badge-font-size)*2);display:block;overflow:hidden}[icon-only]+.label{display:none}
`;

var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var a=(o,r,e,i)=>{for(var t=i>1?void 0:i?p(r,e):r,s=o.length-1,n;s>=0;s--)(n=o[s])&&(t=(i?n(r,e,t):n(t))||t);return i&&t&&u(r,e,t),t};class Badge extends SizedMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement,'[slot="icon"]'),""),{noDefaultSize:!0}){constructor(){super(...arguments);this.variant="informative";}static get styles(){return [e]}get fixed(){return this._fixed}set fixed(e){if(e===this.fixed)return;const i=this.fixed;this._fixed=e,e?this.setAttribute("fixed",e):this.removeAttribute("fixed"),this.requestUpdate("fixed",i);}get hasIcon(){return this.slotContentIsPresent}render(){return x`
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
