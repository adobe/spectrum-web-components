import { O as ObserveSlotText } from './observe-slot-text-94a58958.js';
import { O as ObserveSlotPresence } from './observe-slot-presence-ae37a9bc.js';
import { i } from './lit-element-9354aa77.js';
import { S as SizedMixin } from './sizedMixin-9a9da45c.js';
import { x, A } from './lit-html-126adc72.js';
import { n, S as SpectrumElement, d as defineElement } from './define-element-617dba69.js';
import './sp-icon-checkmark-circle-8c94d2f7.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './base-511c8c11.js';
import './CheckmarkCircle-16ae9e7f.js';
import './custom-tag-b5526d41.js';
import './IconBase-d9572ad8.js';

const r=i`
:host{--spectrum-badge-corner-radius:var(--spectrum-corner-radius-100);--spectrum-badge-line-height:var(--spectrum-line-height-100);--spectrum-badge-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-badge-label-icon-color:var(--spectrum-white);--spectrum-badge-background-color-default:var(
--spectrum-neutral-subdued-background-color-default
);--spectrum-badge-background-color-accent:var(
--spectrum-accent-background-color-default
);--spectrum-badge-background-color-informative:var(
--spectrum-informative-background-color-default
);--spectrum-badge-background-color-negative:var(
--spectrum-negative-background-color-default
);--spectrum-badge-background-color-positive:var(
--spectrum-positive-background-color-default
);--spectrum-badge-background-color-notice:var(
--spectrum-notice-background-color-default
);--spectrum-badge-background-color-gray:var(
--spectrum-gray-background-color-default
);--spectrum-badge-background-color-red:var(
--spectrum-red-background-color-default
);--spectrum-badge-background-color-orange:var(
--spectrum-orange-background-color-default
);--spectrum-badge-background-color-yellow:var(
--spectrum-yellow-background-color-default
);--spectrum-badge-background-color-chartreuse:var(
--spectrum-chartreuse-background-color-default
);--spectrum-badge-background-color-celery:var(
--spectrum-celery-background-color-default
);--spectrum-badge-background-color-green:var(
--spectrum-green-background-color-default
);--spectrum-badge-background-color-seafoam:var(
--spectrum-seafoam-background-color-default
);--spectrum-badge-background-color-cyan:var(
--spectrum-cyan-background-color-default
);--spectrum-badge-background-color-blue:var(
--spectrum-blue-background-color-default
);--spectrum-badge-background-color-indigo:var(
--spectrum-indigo-background-color-default
);--spectrum-badge-background-color-purple:var(
--spectrum-purple-background-color-default
);--spectrum-badge-background-color-fuchsia:var(
--spectrum-fuchsia-background-color-default
);--spectrum-badge-background-color-magenta:var(
--spectrum-magenta-background-color-default
);--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-100);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-100
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-100
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-100
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-100);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-100
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-100
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-100
)}.spectrum-Badge--celery,.spectrum-Badge--chartreuse,.spectrum-Badge--orange,:host([variant=yellow]){--spectrum-badge-label-icon-color:var(--spectrum-black)}.spectrum-Badge--blue,.spectrum-Badge--cyan,.spectrum-Badge--gray,.spectrum-Badge--green,.spectrum-Badge--red,:host([variant=fuchsia]),:host([variant=indigo]),:host([variant=magenta]),:host([variant=purple]),:host([variant=seafoam]){--spectrum-badge-label-icon-color:var(
--spectrum-badge-label-icon-color-primary
)}:host([size=s]){--spectrum-badge-height:var(--spectrum-component-height-75);--spectrum-badge-font-size:var(--spectrum-font-size-75);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-75
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-75
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-75
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-75);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-75
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-75
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-75
)}:host([size=l]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-200);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-200
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-200
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-200
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-200);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-200
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-200
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-200
)}:host([size=xl]){--spectrum-badge-height:var(--spectrum-component-height-100);--spectrum-badge-font-size:var(--spectrum-font-size-300);--spectrum-badge-label-spacing-vertical-top:var(
--spectrum-component-top-to-text-300
);--spectrum-badge-label-spacing-vertical-bottom:var(
--spectrum-component-bottom-to-text-300
);--spectrum-badge-label-spacing-horizontal:var(
--spectrum-component-edge-to-text-300
);--spectrum-badge-workflow-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-badge-icon-text-spacing:var(--spectrum-text-to-visual-300);--spectrum-badge-icon-spacing-horizontal:var(
--spectrum-component-edge-to-visual-300
);--spectrum-badge-icon-spacing-vertical-top:var(
--spectrum-component-top-to-workflow-icon-300
);--spectrum-badge-icon-only-spacing-horizontal:var(
--spectrum-component-edge-to-visual-only-300
)}@media (forced-colors:active){:host{border-color:CanvasText}}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;background:var(
--mod-badge-background-color-default,var(--spectrum-badge-background-color-default)
);border:1px solid #0000;border-radius:var(
--mod-badge-corner-radius,var(--spectrum-badge-corner-radius)
);color:var(
--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color)
);cursor:default;display:inline-flex;inline-size:auto;min-block-size:var(--mod-badge-height,var(--spectrum-badge-height));position:relative;vertical-align:middle}:host([variant=neutral]){background:var(
--mod-badge-background-color-default,var(--spectrum-badge-background-color-default)
)}:host([variant=accent]){background:var(
--mod-badge-background-color-accent,var(--spectrum-badge-background-color-accent)
)}:host([variant=informative]){background:var(
--mod-badge-background-color-informative,var(--spectrum-badge-background-color-informative)
)}:host([variant=negative]){background:var(
--mod-badge-background-color-negative,var(--spectrum-badge-background-color-negative)
)}:host([variant=positive]){background:var(
--mod-badge-background-color-positive,var(--spectrum-badge-background-color-positive)
)}.spectrum-Badge--notice{background:var(
--mod-badge-background-color-notice,var(--spectrum-badge-background-color-notice)
)}.spectrum-Badge--gray{background:var(
--mod-badge-background-color-gray,var(--spectrum-badge-background-color-gray)
)}.spectrum-Badge--red{background:var(
--mod-badge-background-color-red,var(--spectrum-badge-background-color-red)
)}.spectrum-Badge--orange{background:var(
--mod-badge-background-color-orange,var(--spectrum-badge-background-color-orange)
)}:host([variant=yellow]){background:var(
--mod-badge-background-color-yellow,var(--spectrum-badge-background-color-yellow)
)}.spectrum-Badge--chartreuse{background:var(
--mod-badge-background-color-chartreuse,var(--spectrum-badge-background-color-chartreuse)
)}.spectrum-Badge--celery{background:var(
--mod-badge-background-color-celery,var(--spectrum-badge-background-color-celery)
)}.spectrum-Badge--green{background:var(
--mod-badge-background-color-green,var(--spectrum-badge-background-color-green)
)}:host([variant=seafoam]){background:var(
--mod-badge-background-color-seafoam,var(--spectrum-badge-background-color-seafoam)
)}.spectrum-Badge--cyan{background:var(
--mod-badge-background-color-cyan,var(--spectrum-badge-background-color-cyan)
)}.spectrum-Badge--blue{background:var(
--mod-badge-background-color-blue,var(--spectrum-badge-background-color-blue)
)}:host([variant=indigo]){background:var(
--mod-badge-background-color-indigo,var(--spectrum-badge-background-color-indigo)
)}:host([variant=purple]){background:var(
--mod-badge-background-color-purple,var(--spectrum-badge-background-color-purple)
)}:host([variant=fuchsia]){background:var(
--mod-badge-background-color-fuchsia,var(--spectrum-badge-background-color-fuchsia)
)}:host([variant=magenta]){background:var(
--mod-badge-background-color-magenta,var(--spectrum-badge-background-color-magenta)
)}:host([fixed=inline-start]){border-end-start-radius:0;border-start-start-radius:0}:host([fixed=inline-end]){border-end-end-radius:0;border-start-end-radius:0}:host([fixed=block-start]){border-start-end-radius:0;border-start-start-radius:0}:host([fixed=block-end]){border-end-end-radius:0;border-end-start-radius:0}.label{color:var(
--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color)
);font-size:var(--mod-badge-font-size,var(--spectrum-badge-font-size));line-height:var(
--mod-badge-line-height,var(--spectrum-badge-line-height)
);padding-block-end:var(
--mod-badge-label-spacing-vertical-bottom,var(--spectrum-badge-label-spacing-vertical-bottom)
);padding-block-start:var(
--mod-badge-label-spacing-vertical-top,var(--spectrum-badge-label-spacing-vertical-top)
);padding-inline-end:var(
--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal)
);padding-inline-start:var(
--mod-badge-label-spacing-horizontal,var(--spectrum-badge-label-spacing-horizontal)
)}.label:lang(ja),.label:lang(ko),.label:lang(zh){line-height:var(
--mod-badge-line-height-cjk,var(--spectrum-badge-line-height-cjk)
)}[name=icon]+.label{padding-inline-start:0}::slotted([slot=icon]){block-size:var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);color:var(
--mod-badge-label-icon-color,var(--spectrum-badge-label-icon-color)
);flex:0 0 var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);inline-size:var(
--mod-badge-workflow-icon-size,var(--spectrum-badge-workflow-icon-size)
);padding-block-end:var(
--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top)
);padding-block-start:var(
--mod-badge-icon-spacing-vertical-top,var(--spectrum-badge-icon-spacing-vertical-top)
);padding-inline-end:var(
--mod-badge-icon-text-spacing,var(--spectrum-badge-icon-text-spacing)
);padding-inline-start:var(
--mod-badge-icon-spacing-horizontal,var(--spectrum-badge-icon-spacing-horizontal)
)}[icon-only]::slotted(*){padding-inline-end:var(
--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal)
);padding-inline-start:var(
--mod-badge-icon-only-spacing-horizontal,var(--spectrum-badge-icon-only-spacing-horizontal)
)}:host{align-items:center}:host([fixed=left]){border-end-start-radius:0;border-start-start-radius:0}:host([fixed=right]){border-end-end-radius:0;border-start-end-radius:0}:host([fixed=top]){border-start-end-radius:0;border-start-start-radius:0}:host([fixed=bottom]){border-end-end-radius:0;border-end-start-radius:0}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}::slotted([slot=icon]){flex-shrink:0}.label slot{display:block;max-height:calc(var(--spectrum-badge-line-height)*var(--spectrum-badge-font-size)*2);overflow:hidden}[icon-only]+.label{display:none}
`;var b = r;

var d=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var a=(s,o,e,i)=>{for(var t=i>1?void 0:i?p(o,e):o,n=s.length-1,r;n>=0;n--)(r=s[n])&&(t=(i?r(o,e,t):r(t))||t);return i&&t&&d(o,e,t),t};class Badge extends SizedMixin(ObserveSlotText(ObserveSlotPresence(SpectrumElement,'[slot="icon"]'),""),{noDefaultSize:!0}){constructor(){super(...arguments);this.variant="informative";}static get styles(){return [b]}get fixed(){return this._fixed}set fixed(e){if(e===this.fixed)return;const i=this.fixed;this._fixed=e,e?this.setAttribute("fixed",e):this.removeAttribute("fixed"),this.requestUpdate("fixed",i);}get hasIcon(){return this.slotContentIsPresent}render(){return x`
            ${this.hasIcon?x`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                      ></slot>
                  `:A}
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
    `;
};
const NonSemantic = () => {
  return x`
        <sp-badge
            variant="seafoam"
            style="--mod-badge-background-color-default: var(--spectrum-global-color-static-seafoam-600)"
        >
            Seafoam
        </sp-badge>
        <sp-badge
            variant="indigo"
            style="--mod-badge-background-color-default: var(--spectrum-global-color-static-indigo-600)"
        >
            Indigo
        </sp-badge>
        <sp-badge
            variant="purple"
            style="--mod-badge-background-color-default: var(--spectrum-global-color-static-purple-600)"
        >
            Purple
        </sp-badge>
        <sp-badge
            variant="fuchsia"
            style="--mod-badge-background-color-default: var(--spectrum-global-color-static-fuchsia-600)"
        >
            Fuchsia
        </sp-badge>
        <sp-badge
            variant="magenta"
            style="--mod-badge-background-color-default: var(--spectrum-global-color-static-magenta-600)"
        >
            Magenta
        </sp-badge>
        <sp-badge
            variant="yellow"
            static="black"
            style="--mod-badge-background-color-default: var(--spectrum-alias-background-color-yellow-default)"
        >
            Yellow
        </sp-badge>
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
