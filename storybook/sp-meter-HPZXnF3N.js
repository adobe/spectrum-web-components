import { g as getLabelFromSlot } from './get-label-from-slot-oGgDjBHa.js';
import { O as ObserveSlotText } from './observe-slot-text-ybW1xuBS.js';
import { L as LanguageResolutionController } from './LanguageResolution-433GhF-m.js';
import './sp-field-label--CBS1ijW.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-mnNfh2gr.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-2O4ZhTAw.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { i as i$1 } from './query-JMOstM_r.js';

const e=i`
:host{--spectrum-progressbar-animation-ease-in-out-indeterminate:var(
--spectrum-animation-ease-in-out
);--spectrum-progressbar-animation-duration-indeterminate:var(
--spectrum-animation-duration-2000
);--spectrum-progressbar-corner-radius:var(--spectrum-corner-radius-100);--spectrum-progressbar-fill-size-indeterminate:70%;--spectrum-progressbar-size-2400:192px;--spectrum-progressbar-size-2500:200px;--spectrum-progressbar-size-2800:224px;--spectrum-progressbar-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-progressbar-min-size:var(--spectrum-progress-bar-minimum-width);--spectrum-progressbar-max-size:var(--spectrum-progress-bar-maximum-width);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-medium
);--spectrum-progressbar-line-height:var(--spectrum-line-height-100);--spectrum-progressbar-spacing-label-to-progressbar:var(
--spectrum-spacing-75
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-progressbar-spacing-label-to-text:var(--spectrum-spacing-200);--spectrum-progressbar-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-progressbar-track-color:var(--spectrum-gray-300);--spectrum-progressbar-fill-color:var(--spectrum-accent-color-900);--spectrum-progressbar-fill-color-positive:var(
--spectrum-positive-visual-color
);--spectrum-progressbar-fill-color-notice:var(
--spectrum-notice-visual-color
);--spectrum-progressbar-fill-color-negative:var(
--spectrum-negative-visual-color
);--spectrum-progressbar-label-and-value-white:var(--spectrum-white);--spectrum-progressbar-track-color-white:var(
--spectrum-transparent-white-300
);--spectrum-progressbar-fill-color-white:var(--spectrum-white);--spectrum-meter-min-width:var(--spectrum-meter-minimum-width);--spectrum-meter-max-width:var(--spectrum-meter-maximum-width);--spectrum-meter-inline-size:var(--spectrum-meter-default-width);--spectrum-meter-thickness-s:var(--spectrum-meter-thickness-small);--spectrum-meter-thickness-l:var(--spectrum-meter-thickness-large);--spectrum-meter-top-to-text:var(--spectrum-component-top-to-text)}:host([size=s]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2400);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-small
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host{--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2400);--spectrum-progressbar-font-size:var(--spectrum-font-size-75);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-75
)}:host([size=l]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2500);--spectrum-progressbar-font-size:var(--spectrum-font-size-100);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-200
)}:host([size=xl]){--spectrum-progressbar-size-default:var(--spectrum-progressbar-size-2800);--spectrum-progressbar-font-size:var(--spectrum-font-size-200);--spectrum-progressbar-thickness:var(
--spectrum-progress-bar-thickness-extra-large
);--spectrum-progressbar-spacing-top-to-text:var(
--spectrum-component-top-to-text-300
)}:host{--spectrum-progressbar-size-default:var(
--mod-meter-inline-size,var(--spectrum-meter-inline-size)
);--spectrum-progressbar-max-size:var(
--mod-meter-max-width,var(--spectrum-meter-max-width)
);--spectrum-progressbar-min-size:var(
--mod-meter-min-width,var(--spectrum-meter-min-width)
)}:host([variant=positive]) .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-positive,var(--spectrum-progressbar-fill-color-positive)
)
)}:host([variant=notice]) .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-notice,var(--spectrum-progressbar-fill-color-notice)
)
)}:host([variant=negative]) .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-negative,var(--spectrum-progressbar-fill-color-negative)
)
)}:host{align-items:center;display:inline-flex;flex-flow:wrap;font-size:var(
--mod-progressbar-font-size,var(--spectrum-progressbar-font-size)
);inline-size:var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
);justify-content:space-between;max-inline-size:var(
--mod-progressbar-max-size,var(--spectrum-progressbar-max-size)
);min-inline-size:var(
--mod-progressbar-min-size,var(--spectrum-progressbar-min-size)
);position:relative;vertical-align:top}.label,.percentage{color:var(
--mod-progressbar-text-color,var(--spectrum-progressbar-text-color)
);line-height:var(
--mod-progressbar-line-height,var(--spectrum-progressbar-line-height)
);margin-block-end:var(
--mod-progressbar-spacing-label-to-progressbar,var(--spectrum-progressbar-spacing-label-to-progressbar)
);margin-block-start:var(
--mod-progressbar-spacing-top-to-text,var(--spectrum-progressbar-spacing-top-to-text)
);text-align:start}.label:lang(ja),.label:lang(ko),.label:lang(zh),.percentage:lang(ja),.percentage:lang(ko),.percentage:lang(zh){line-height:var(
--mod-progressbar-line-height-cjk,var(--spectrum-progressbar-line-height-cjk)
)}.label{flex:1}.percentage{align-self:flex-start;margin-inline-start:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}.track{background-color:var(
--highcontrast-progressbar-track-color,var(
--mod-progressbar-track-color,var(--spectrum-progressbar-track-color)
)
);border-radius:var(--spectrum-progressbar-corner-radius);inline-size:100%;overflow:hidden}.fill,.track{block-size:var(
--mod-progressbar-thickness,var(--spectrum-progressbar-thickness)
)}.fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color,var(--spectrum-progressbar-fill-color)
)
);border:none;transition:width 1s}:host([indeterminate]) .fill{animation-timing-function:var(
--mod-progressbar-animation-ease-in-out-indeterminate,var(--spectrum-progressbar-animation-ease-in-out-indeterminate)
);inline-size:var(
--mod-progressbar-fill-size-indeterminate,var(--spectrum-progressbar-fill-size-indeterminate)
);position:relative;will-change:transform}:host([side-label]){display:inline-flex;flex-flow:row;justify-content:space-between}:host([side-label]) .track{flex:1 1 var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
)}:host([side-label]) .label{flex-grow:0;margin-block-end:0;margin-inline-end:var(
--mod-progressbar-spacing-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
)}:host([side-label]) .percentage{margin-block-end:0;margin-inline-start:var(
--mod-spacing-progressbar-label-to-text,var(--spectrum-progressbar-spacing-label-to-text)
);order:3;text-align:end}:host([static=white]) .fill{background-color:var(
--mod-progressbar-fill-color-white,var(--spectrum-progressbar-fill-color-white)
);color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .label,:host([static=white]) .percentage{color:var(
--mod-progressbar-label-and-value-white,var(--spectrum-progressbar-label-and-value-white)
)}:host([static=white]) .track{background-color:var(--spectrum-progressbar-track-color-white)}:host([dir=ltr][indeterminate]) .fill{animation:indeterminate-loop-ltr var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}:host([dir=rtl][indeterminate]) .fill{animation:indeterminate-loop-rtl var(
--mod-progressbar-animation-duration-indeterminate,var(--spectrum-progressbar-animation-duration-indeterminate)
) infinite}@keyframes indeterminate-loop-ltr{0%{transform:translate(calc(var(
--mod-progressbar-fill-size-indeterminate,
var(--spectrum-progressbar-fill-size-indeterminate)
)*-1))}to{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-size-default)
))}}@keyframes indeterminate-loop-rtl{0%{transform:translate(var(
--mod-progressbar-size-default,var(--spectrum-progressbar-fill-size-indeterminate)
))}to{transform:translate(calc(var(
--mod-progressbar-size-default,
var(--spectrum-progressbar-size-default)
)*-1))}}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}.fill{transform-origin:left}:host([dir=rtl]) .fill{transform-origin:right}
`;var y = e;

var p=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var r=(a,s,e,i)=>{for(var t=i>1?void 0:i?u(s,e):s,o=a.length-1,n;o>=0;o--)(n=a[o])&&(t=(i?n(s,e,t):n(t))||t);return i&&t&&p(s,e,t),t};const meterVariants=["positive","notice","negative"];class Meter extends SizedMixin(ObserveSlotText(SpectrumElement,""),{noDefaultSize:!0}){constructor(){super(...arguments);this.progress=0;this._variant="";this.label="";this.languageResolver=new LanguageResolutionController(this);this.sideLabel=!1;}static get styles(){return [y]}set variant(e){if(e===this.variant)return;const i=this.variant;meterVariants.includes(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",i);}get variant(){return this._variant}render(){return x`
            <sp-field-label size=${this.size} class="label">
                ${this.slotHasContent?A:this.label}
                <slot @slotchange=${this.handleSlotchange}>${this.label}</slot>
            </sp-field-label>
            <sp-field-label size=${this.size} class="percentage">
                ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
            </sp-field-label>
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const e=getLabelFromSlot(this.label,this.slotEl);e&&(this.label=e);}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","meter progressbar");}updated(e){super.updated(e),e.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}}r([n({type:Number})],Meter.prototype,"progress",2),r([n({type:String})],Meter.prototype,"variant",1),r([n({type:String,reflect:!0})],Meter.prototype,"label",2),r([i$1("slot")],Meter.prototype,"slotEl",2),r([n({type:Boolean,reflect:!0,attribute:"side-label"})],Meter.prototype,"sideLabel",2),r([n({type:String,reflect:!0})],Meter.prototype,"static",2);

defineElement("sp-meter",Meter);
