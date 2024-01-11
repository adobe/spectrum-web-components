import { g as getLabelFromSlot } from './get-label-from-slot-oGgDjBHa.js';
import { O as ObserveSlotText } from './observe-slot-text-CVZsl2bC.js';
import { L as LanguageResolutionController } from './LanguageResolution-433GhF-m.js';
import './sp-field-label-OXdzlFiz.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-qrvMoaCA.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-IUrhCXKn.js';
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
)}.spectrum-Meter{--spectrum-progressbar-size-default:var(
--mod-meter-inline-size,var(--spectrum-meter-inline-size)
);--spectrum-progressbar-max-size:var(
--mod-meter-max-width,var(--spectrum-meter-max-width)
);--spectrum-progressbar-min-size:var(
--mod-meter-min-width,var(--spectrum-meter-min-width)
)}:host([positive]) .spectrum-Meter .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-positive,var(--spectrum-progressbar-fill-color-positive)
)
)}:host([notice]) .spectrum-Meter .fill{background-color:var(
--highcontrast-progressbar-fill-color,var(
--mod-progressbar-fill-color-notice,var(--spectrum-progressbar-fill-color-notice)
)
)}:host([negative]) .spectrum-Meter .fill{background-color:var(
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
)*-1))}}@media (forced-colors:active){.track{--highcontrast-progressbar-fill-color:ButtonText;--highcontrast-progressbar-track-color:ButtonFace;border:1px solid ButtonText;forced-color-adjust:none}}.fill{transform-origin:left;width:100%}:host([dir=rtl]) .fill{transform-origin:right}
`;var g = e;

var b=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var t=(o,s,e,a)=>{for(var l=a>1?void 0:a?d(s,e):s,n=o.length-1,p;n>=0;n--)(p=o[n])&&(l=(a?p(s,e,l):p(l))||l);return a&&l&&b(s,e,l),l};class ProgressBar extends SizedMixin(ObserveSlotText(SpectrumElement,""),{noDefaultSize:!0}){constructor(){super(...arguments);this.indeterminate=!1;this.label="";this.languageResolver=new LanguageResolutionController(this);this.overBackground=!1;this.sideLabel=!1;this.progress=0;}static get styles(){return [g]}render(){return x`
            ${this.slotHasContent||this.label?x`
                      <sp-field-label size=${this.size} class="label">
                          ${this.slotHasContent?x``:this.label}
                          <slot @slotchange=${this.handleSlotchange}>
                              ${this.label}
                          </slot>
                      </sp-field-label>
                  `:x``}
            ${this.label?x`
                      ${this.indeterminate?A:x`
                                <sp-field-label
                                    size=${this.size}
                                    class="percentage"
                                >
                                    ${new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.progress/100)}
                                </sp-field-label>
                            `}
                  `:A}
            <div class="track">
                <div
                    class="fill"
                    style="transform: scaleX(calc(${this.progress} / 100));"
                ></div>
            </div>
        `}handleSlotchange(){const e=getLabelFromSlot(this.label,this.slotEl);e&&(this.label=e);}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("role")||this.setAttribute("role","progressbar");}updated(e){super.updated(e),e.has("indeterminate")&&(this.indeterminate?(this.removeAttribute("aria-valuemin"),this.removeAttribute("aria-valuemax"),this.removeAttribute("aria-valuenow")):(this.setAttribute("aria-valuemin","0"),this.setAttribute("aria-valuemax","100"))),!this.indeterminate&&e.has("progress")&&this.setAttribute("aria-valuenow",""+this.progress),e.has("label")&&(this.label.length?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"));}}t([n({type:Boolean,reflect:!0})],ProgressBar.prototype,"indeterminate",2),t([n({type:String,reflect:!0})],ProgressBar.prototype,"label",2),t([n({type:Boolean,reflect:!0,attribute:"over-background"})],ProgressBar.prototype,"overBackground",2),t([n({type:Boolean,reflect:!0,attribute:"side-label"})],ProgressBar.prototype,"sideLabel",2),t([n({type:Number})],ProgressBar.prototype,"progress",2),t([n({type:String,reflect:!0})],ProgressBar.prototype,"static",2),t([i$1("slot")],ProgressBar.prototype,"slotEl",2);

defineElement("sp-progress-bar",ProgressBar);
