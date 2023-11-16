import { F as Focusable } from './focusable-c7e64029.js';
import { L as LanguageResolutionController, l as languageResolverUpdatedSymbol } from './LanguageResolution-630dfe34.js';
import { $ as $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5 } from './import-76526f12.js';
import { n, d as defineElement } from './define-element-617dba69.js';
import { i } from './lit-element-9354aa77.js';
import { O as ObserveSlotText } from './observe-slot-text-03ae7746.js';
import './sp-field-label-b445efc6.js';
import { t as t$1 } from './mutation-controller-81a30f7f.js';
import { x, A } from './lit-html-126adc72.js';
import { o as o$1 } from './class-map-14530ec2.js';
import { o as o$2 } from './style-map-156e3c36.js';
import { l } from './if-defined-ae83b405.js';
import { s as streamingListener } from './streaming-listener-70cd7ec3.js';
import { S as SizedMixin } from './sizedMixin-29c62bc2.js';
import { c } from './repeat-c64faecc.js';
import { i as i$1 } from './query-d0113d5a.js';

var p=Object.defineProperty;var b$1=Object.getOwnPropertyDescriptor;var o=(t,a,e,r)=>{for(var u=r>1?void 0:r?b$1(a,e):a,m=t.length-1,n;m>=0;m--)(n=t[m])&&(u=(r?n(a,e,u):n(u))||u);return r&&u&&p(a,e,u),u};const defaultNormalization={toNormalized(t,a,e){return (t-a)/(e-a)},fromNormalized(t,a,e){return t*(e-a)+a}};const f={fromAttribute:t=>t==="previous"?t:parseFloat(t),toAttribute:t=>t.toString()},d={fromAttribute:t=>t==="next"?t:parseFloat(t),toAttribute:t=>t.toString()};class SliderHandle extends Focusable{constructor(){super(...arguments);this._forcedUnit="";this.dragging=!1;this.highlight=!1;this.name="";this.label="";this.getAriaHandleText=(e,r)=>r.format(e);this.languageResolver=new LanguageResolutionController(this);this.normalization=defaultNormalization;}get handleName(){return this.name}get focusElement(){var e,r;return (r=(e=this.handleController)==null?void 0:e.inputForHandle(this))!=null?r:this}update(e){var r,u;if(!this.hasUpdated){const{max:m,min:n}=this;this.value==null&&!isNaN(m)&&!isNaN(n)&&(this.value=m<n?n:n+(m-n)/2,(r=this.handleController)==null||r.hostUpdate());}(e.has("formatOptions")||e.has(languageResolverUpdatedSymbol))&&delete this._numberFormatCache,e.has("value")&&e.get("value")!=null&&this.updateComplete.then(()=>{var n;(n=this.handleController)==null||n.setValueFromHandle(this);}),(u=this.handleController)==null||u.handleHasChanged(this),super.update(e);}firstUpdated(e){super.firstUpdated(e),this.dispatchEvent(new CustomEvent("sp-slider-handle-ready"));}dispatchInputEvent(){const e=new Event("input",{bubbles:!0,composed:!0});this.dispatchEvent(e);}getNumberFormat(){var e;if(!this._numberFormatCache||this.languageResolver.language!==this._numberFormatCache.language){let r;try{r=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,this.formatOptions),this._forcedUnit="";}catch(u){const{style:m,unit:n,unitDisplay:v,...l}=this.formatOptions||{};m==="unit"&&(this._forcedUnit=n),r=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,l);}this._numberFormatCache={language:this.languageResolver.language,numberFormat:r};}return (e=this._numberFormatCache)==null?void 0:e.numberFormat}get numberFormat(){if(this.formatOptions)return this.getNumberFormat()}}o([n({type:Number})],SliderHandle.prototype,"value",2),o([n({type:Boolean,reflect:!0})],SliderHandle.prototype,"dragging",2),o([n({type:Boolean})],SliderHandle.prototype,"highlight",2),o([n({type:String})],SliderHandle.prototype,"name",2),o([n({reflect:!0,converter:f})],SliderHandle.prototype,"min",2),o([n({reflect:!0,converter:d})],SliderHandle.prototype,"max",2),o([n({type:Number,reflect:!0})],SliderHandle.prototype,"step",2),o([n({type:Object,attribute:"format-options"})],SliderHandle.prototype,"formatOptions",2),o([n({type:String})],SliderHandle.prototype,"label",2),o([n({attribute:!1})],SliderHandle.prototype,"getAriaHandleText",2),o([n({attribute:!1})],SliderHandle.prototype,"normalization",2);

defineElement("sp-slider-handle",SliderHandle);

const e=i`
:host{--spectrum-slider-font-size:var(--spectrum-font-size-75);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-medium);--spectrum-slider-control-height:var(--spectrum-component-height-100);--spectrum-slider-handle-border-radius:var(--spectrum-corner-radius-200);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-medium
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-medium
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:18px}:host([size=s]){--spectrum-slider-font-size:var(--spectrum-font-size-75);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-small);--spectrum-slider-control-height:var(--spectrum-component-height-75);--spectrum-slider-handle-border-radius:var(--spectrum-corner-radius-200);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-small
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-small
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-100)}:host([size=l]){--spectrum-slider-font-size:var(--spectrum-font-size-100);--spectrum-slider-handle-size:var(--spectrum-slider-handle-size-large);--spectrum-slider-control-height:var(--spectrum-component-height-200);--spectrum-slider-handle-border-radius:calc(var(--spectrum-corner-radius-200)*4);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-large
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-large
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:18px}:host([size=xl]){--spectrum-slider-font-size:var(--spectrum-font-size-200);--spectrum-slider-handle-size:var(
--spectrum-slider-handle-size-extra-large
);--spectrum-slider-control-height:var(--spectrum-component-height-300);--spectrum-slider-handle-border-radius:calc(var(--spectrum-corner-radius-200)*4);--spectrum-slider-handle-border-width-down:var(
--spectrum-slider-handle-border-width-down-extra-large
);--spectrum-slider-label-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-slider-control-to-field-label:var(
--spectrum-slider-control-to-field-label-extra-large
);--spectrum-slider-value-side-padding-inline:var(--spectrum-spacing-200);--spectrum-slider-value-inline-size:22px}:host{--spectrum-slider-cjk-line-height:var(--spectrum-cjk-line-height-100);--spectrum-slider-min-size:var(--spectrum-spacing-900);--spectrum-slider-track-corner-radius:var(--spectrum-corner-radius-75);--spectrum-slider-label-margin-start:var(--spectrum-spacing-300);--spectrum-slider-handle-border-width:var(--spectrum-border-width-200);--spectrum-slider-handle-margin-left:calc(var(--spectrum-slider-handle-size)/-2);--spectrum-slider-controls-margin:calc(var(--spectrum-slider-handle-size)/2);--spectrum-slider-track-margin-offset:calc(var(--spectrum-slider-controls-margin)*-1);--spectrum-slider-track-middle-handleoffset:calc(var(--spectrum-slider-handle-gap) + var(--spectrum-slider-handle-size)/2);--spectrum-slider-input-top-size:calc(var(--spectrum-slider-handle-size)/-2/4);--spectrum-slider-track-fill-thickness:var(
--spectrum-slider-track-thickness
);--spectrum-slider-tick-mark-width:var(--spectrum-border-width-200);--spectrum-slider-tick-mark-border-radius:2px;--spectrum-slider-tick-handle-background-color:var(--spectrum-gray-100);--spectrum-slider-track-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-slider-track-fill-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-slider-handle-border-color-disabled:var(
--spectrum-disabled-border-color
);--spectrum-slider-label-text-color:var(
--spectrum-neutral-content-color-default
);--spectrum-slider-label-text-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-slider-tick-mark-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-slider-ramp-handle-border-color-active:var(--spectrum-gray-100);--spectrum-slider-input-left:calc(var(--spectrum-slider-handle-margin-left)/4);--spectrum-slider-track-handleoffset:var(--spectrum-slider-handle-gap);--spectrum-slider-range-track-reset:0}:host{display:block;min-inline-size:var(
--mod-slider-min-size,var(--spectrum-slider-min-size)
);position:relative;-webkit-user-select:none;user-select:none;z-index:1}.spectrum-Slider--sideLabel{align-items:center;display:flex}.spectrum-Slider--sideLabel #label-container,.spectrum-Slider--sideLabel #label-container+#track{margin-block-start:0}.spectrum-Slider--sideLabel #controls{margin-inline-end:var(
--mod-slider-controls-margin,var(--spectrum-slider-controls-margin)
)}.spectrum-Slider--sideLabel #value{inline-size:var(
--mod-slider-value-inline-size,var(--spectrum-slider-value-inline-size)
);margin-inline-start:var(
--mod-slider-value-side-padding-inline,var(--spectrum-slider-value-side-padding-inline)
);text-align:start}#controls{block-size:var(
--mod-slider-control-height,var(--spectrum-slider-control-height)
);box-sizing:border-box;cursor:pointer;display:inline-block;inline-size:calc(100% - var(
--mod-slider-controls-margin,
var(--spectrum-slider-controls-margin)
)*2);margin-inline-start:var(
--mod-slider-controls-margin,var(--spectrum-slider-controls-margin)
);position:relative;vertical-align:top;z-index:auto}#label-container+#track{margin-block-start:calc(var(--spectrum-slider-control-to-field-label)*-1)}:host([tick-labels]){margin-block-end:var(
--mod-slider-control-height,var(--spectrum-slider-control-height)
)}#fill,.track{block-size:var(
--mod-slider-track-fill-thickness,var(--spectrum-slider-track-fill-thickness)
);box-sizing:border-box;inset-block-start:calc(var(--mod-slider-control-height, var(--spectrum-slider-control-height))/2 - var(
--mod-slider-track-fill-thickness,
var(--spectrum-slider-track-fill-thickness)
)/2);inset-inline:0 auto;margin-inline-start:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);padding-block:0;padding-inline-end:var(
--mod-slider-handle-gap,var(--spectrum-slider-handle-gap)
);padding-inline-start:0;pointer-events:none;position:absolute;z-index:1}#fill:before,.track:before{block-size:100%;border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:0;border-start-start-radius:0;content:"";display:block}.track:first-of-type:before{border-end-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}.track:last-of-type:before{border-end-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}.track~.track{inset-inline-end:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);inset-inline-start:auto;margin-inline-end:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);margin-inline-start:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);padding-block:0;padding-inline-end:0;padding-inline-start:var(
--mod-slider-track-handleoffset,var(--spectrum-slider-track-handleoffset)
)}:host([variant=range]) .track~.track{inset-inline:auto;margin-inline:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);padding-inline:var(
--mod-slider-track-middle-handleoffset,var(--spectrum-slider-track-middle-handleoffset)
) var(
--mod-slider-track-middle-handleoffset,var(--spectrum-slider-track-middle-handleoffset)
)}#fill{margin-inline-start:0;padding-block:0;padding-inline-end:0;padding-inline-start:calc(var(
--mod-slider-controls-margin,
var(--spectrum-slider-controls-margin)
) + var(--spectrum-slider-handle-gap, var(--spectrum-slider-handle-gap)))}.spectrum-Slider-fill--right{padding-block:0;padding-inline-end:calc(var(
--mod-slider-controls-margin,
var(--spectrum-slider-controls-margin)
) + var(--spectrum-slider-handle-gap, var(--spectrum-slider-handle-gap)));padding-inline-start:0}:host([variant=range]) #value{-webkit-user-select:text;user-select:text}:host([variant=range]) .track:first-of-type{inset-inline-end:auto;inset-inline-start:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);margin-inline-start:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);padding-inline-end:var(
--mod-slider-track-handleoffset,var(--spectrum-slider-track-handleoffset)
);padding-inline-start:0}:host([variant=range]) .track:first-of-type:before{border-end-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-start-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}:host([variant=range]) .track:last-of-type{inset-inline-end:var(
--mod-slider-range-track-reset,var(--spectrum-slider-range-track-reset)
);inset-inline-start:auto;margin-inline-end:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);padding-inline-end:0;padding-inline-start:var(--spectrum-slider-track-handleoffset)}:host([variant=range]) .track:last-of-type:before{border-end-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
);border-start-end-radius:var(
--mod-slider-track-corner-radius,var(--spectrum-slider-track-corner-radius)
)}#ramp{block-size:var(
--mod-slider-ramp-track-height,var(--spectrum-slider-ramp-track-height)
);inset-inline-end:var(
--spectrum-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);inset-inline-start:var(
--spectrum-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);margin-block-start:calc(var(
--mod-slider-ramp-track-height,
var(--spectrum-slider-ramp-track-height)
)/2);position:absolute}:host([dir=rtl]) #ramp svg{transform:matrix(-1,0,0,1,0,0)}#ramp svg{block-size:100%;inline-size:100%}.handle{block-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);border-radius:var(
--mod-slider-handle-border-radius,var(--spectrum-slider-handle-border-radius)
);border-style:solid;border-width:var(
--mod-slider-handle-border-width,var(--spectrum-slider-handle-border-width)
);box-sizing:border-box;display:inline-block;inline-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);inset-block-start:calc(var(--mod-slider-control-height, var(--spectrum-slider-control-height))/2 - var(--mod-slider-handle-size, var(--spectrum-slider-handle-size))/2);inset-inline-start:0;margin-block:0;margin-inline:calc(var(--mod-slider-handle-size, var(--spectrum-slider-handle-size))/-2) 0;outline:none;position:absolute;transition:border-width var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;z-index:2}.handle.dragging,.handle.handle-highlight,.handle:active{border-width:var(
--mod-slider-handle-border-width-down,var(--spectrum-slider-handle-border-width-down)
)}.handle.dragging,.handle.handle-highlight,.handle.is-tophandle,.handle:active{z-index:3}.handle:before{block-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);border-radius:100%;content:" ";display:block;inline-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);inset-block-start:50%;inset-inline-start:50%;position:absolute;transform:translate(-50%,-50%);transition:box-shadow var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,inline-size var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out,block-size var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-out}.handle.handle-highlight:before{block-size:calc(var(--mod-slider-handle-size, var(--spectrum-slider-handle-size)) + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*2);inline-size:calc(var(--mod-slider-handle-size, var(--spectrum-slider-handle-size)) + var(--mod-focus-indicator-gap, var(--spectrum-focus-indicator-gap))*2)}.input{-webkit-appearance:none;block-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);border:0;cursor:default;inline-size:var(
--mod-slider-handle-size,var(--spectrum-slider-handle-size)
);inset-block-start:var(
--mod-slider-input-top-size,var(--spectrum-slider-input-top-size)
);inset-inline-start:var(
--mod-slider-input-left,var(--spectrum-slider-input-left)
);margin:0;opacity:.000001;overflow:hidden;padding:0;pointer-events:none;position:absolute}.input:focus{outline:none}#label-container{align-items:center;display:flex;font-size:var(--mod-slider-font-size,var(--spectrum-slider-font-size));inline-size:auto;line-height:var(--mod-line-height-100,var(--spectrum-line-height-100));margin-block-start:var(
--mod-slider-label-top-to-text,var(--spectrum-slider-label-top-to-text)
);position:relative}#label-container:lang(ja),#label-container:lang(ko),#label-container:lang(zh){line-height:var(
--mod-slider-cjk-line-height,var(--spectrum-slider-cjk-line-height)
)}#label{flex-grow:1;font-size:var(--mod-slider-font-size,var(--spectrum-slider-font-size));padding-inline-start:0}#value{font-feature-settings:"tnum";cursor:default;flex-grow:0;margin-inline-start:var(
--mod-slider-label-margin-start,var(--spectrum-slider-label-margin-start)
);padding-inline-end:0;text-align:end}:host([variant=tick]) .handle{background-color:var(
--highcontrast-slider-tick-handle-background-color,var(
--mod-slider-tick-handle-background-color,var(--spectrum-slider-tick-handle-background-color)
)
)}:host([variant=tick]) #controls{margin-block-start:calc(var(--spectrum-text-to-visual-75) - var(
--mod-slider-tick-mark-height,
var(--spectrum-slider-tick-mark-height)
)/2 - var(
--mod-slider-track-thickness,
var(--spectrum-slider-track-thickness)
)/2)}:host([variant=tick]) .tickLabel{margin-block-start:calc(var(
--mod-slider-tick-mark-height,
var(--spectrum-slider-tick-mark-height)
) + var(--spectrum-text-to-visual-75))}.ticks{display:flex;justify-content:space-between;margin-inline:var(
--mod-slider-track-margin-offset,var(--spectrum-slider-track-margin-offset)
);z-index:0}.ticks~.spectrum-Slider-handleContainer .handle{background:var(
--mod-slider-ticks-handle-background-color,var(--spectrum-slider-ticks-handle-background-color)
)}.tick{inline-size:var(
--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width)
);inset-block-start:calc(var(--mod-slider-track-thickness, var(--spectrum-slider-control-height))/2 - var(
--mod-slider-tick-mark-height,
var(--spectrum-slider-tick-mark-height)
)/2);position:relative}.tick:after{block-size:var(
--mod-slider-tick-mark-height,var(--spectrum-slider-tick-mark-height)
);border-radius:var(
--mod-slider-tick-mark-border-radius,var(--spectrum-slider-tick-mark-border-radius)
);content:"";display:block;inline-size:var(
--mod-slider-tick-mark-width,var(--spectrum-slider-tick-mark-width)
);inset-block-start:0;inset-inline-start:calc(50% - var(
--mod-slider-tick-mark-width,
var(--spectrum-slider-tick-mark-width)
)/2);position:absolute}.tick .tickLabel{align-items:center;display:flex;font-size:var(--mod-font-size-75,var(--spectrum-font-size-75));justify-content:center;line-height:var(--mod-line-height-100,var(--spectrum-line-height-100))}.tick:first-of-type .tickLabel,.tick:last-of-type .tickLabel{display:block;margin-inline:0;position:absolute}.tick:first-of-type{inset-inline-start:calc(var(
--mod-slider-tick-mark-width,
var(--spectrum-slider-tick-mark-width)
)/-2)}.tick:first-of-type .tickLabel{inset-inline-start:0}.tick:last-of-type{inset-inline-end:calc(var(
--mod-slider-tick-mark-width,
var(--spectrum-slider-tick-mark-width)
)/-2)}.tick:last-of-type .tickLabel{inset-inline-end:0}:host([disabled]){cursor:default}:host([disabled]) .handle{cursor:default;pointer-events:none}:host([disabled]) .tickLabel{color:var(
--highcontrast-slider-label-text-color-disabled,var(
--mod-slider-label-text-color-disabled,var(--spectrum-slider-label-text-color-disabled)
)
)}.spectrum-Slider-handleContainer,.spectrum-Slider-trackContainer{inline-size:calc(100% + var(--spectrum-slider-handle-size));inset-block-start:0;margin-inline-start:calc(var(--spectrum-slider-handle-size)/2*-1);position:absolute}.spectrum-Slider-trackContainer{block-size:var(
--mod-slider-control-height,var(--spectrum-slider-control-height)
);overflow:hidden}.track:before{background:var(
--highcontrast-slider-track-color,var(--mod-slider-track-color,var(--spectrum-slider-track-color))
)}#label-container{color:var(
--highcontrast-slider-label-text-color,var(
--mod-slider-label-text-color,var(--spectrum-slider-label-text-color)
)
)}:host([variant=filled]) .track:first-child:before{background:var(
--highcontrast-slider-track-fill-color,var(
--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)
)
)}#fill:before{background:var(
--highcontrast-slider-track-fill-color,var(
--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)
)
)}#ramp path{fill:var(
--highcontrast-slider-ramp-track-color,var(
--mod-slider-ramp-track-color,var(--spectrum-slider-ramp-track-color)
)
)}.handle{background:var(
--highcontrast-slider-handle-background-color,var(
--mod-slider-handle-background-color,var(--spectrum-slider-handle-background-color)
)
);border-color:var(
--highcontrast-slider-handle-border-color,var(
--mod-slider-handle-border-color,var(--spectrum-slider-handle-border-color)
)
)}.handle:hover{border-color:var(
--highcontrast-slider-handle-border-color-hover,var(
--mod-slider-handle-border-color-hover,var(--spectrum-slider-handle-border-color-hover)
)
)}.handle.handle-highlight{border-color:var(
--highcontrast-slider-handle-border-color-key-focus,var(
--mod-slider-handle-border-color-key-focus,var(--spectrum-slider-handle-border-color-key-focus)
)
)}.handle.handle-highlight:before{box-shadow:0 0 0 var(--spectrum-focus-indicator-thickness) var(
--highcontrast-slider-handle-focus-ring-color-key-focus,var(
--mod-slider-handle-focus-ring-color-key-focus,var(--spectrum-slider-handle-focus-ring-color-key-focus)
)
)}.handle.dragging,.handle:active{border-color:var(
--highcontrast-slider-handle-border-color-down,var(
--mod-slider-handle-border-color-down,var(--spectrum-slider-handle-border-color-down)
)
)}:host([variant=ramp]) .handle{background:var(
--mod-slider-ramp-handle-background-color,var(--spectrum-slider-ramp-handle-background-color)
);box-shadow:0 0 0 var(--spectrum-slider-handle-gap) var(
--highcontrast-slider-ramp-handle-border-color-active,var(
--mod-sectrum-slider-ramp-handle-border-color-active,var(--spectrum-slider-ramp-handle-border-color-active)
)
)}@media (forced-colors:active){:host([variant=ramp]) .handle{background-color:ButtonFace;border-color:ButtonText;box-shadow:0 0 0 var(--spectrum-slider-handle-gap) ButtonFace;forced-color-adjust:none}}.input{background:none}.tick:after{background-color:var(
--highcontrast-slider-tick-mark-color,var(
--mod-slider-tick-mark-color,var(--spectrum-slider-tick-mark-color)
)
)}.handle.dragging{background:var(
--highcontrast-slider-handle-background-color,var(
--mod-slider-handle-background-color,var(--spectrum-slider-handle-background-color)
)
);border-color:var(
--highcontrast-slider-handle-border-color-down,var(
--mod-slider-handle-border-color-down,var(--spectrum-slider-handle-border-color-down)
)
)}:host([variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(
--highcontrast-slider-track-fill-color,var(
--mod-slider-track-fill-color,var(--spectrum-slider-track-fill-color)
)
)}:host([disabled]) #label-container{color:var(
--highcontrast-slider-label-text-color-disabled,var(
--mod-slider-label-text-color-disabled,var(--spectrum-slider-label-text-color-disabled)
)
)}:host([disabled]) .handle{background:var(
--highcontrast-slider-handle-disabled-background-color,var(
--mod-slider-handle-disabled-background-color,var(--spectrum-slider-handle-disabled-background-color)
)
);border-color:var(
--highcontrast-slider-handle-border-color-disabled,var(
--mod-slider-handle-border-color-disabled,var(--spectrum-slider-handle-border-color-disabled)
)
)}:host([disabled]) .handle:active,:host([disabled]) .handle:hover{background:var(
--highcontrast-slider-handle-background-color-disabled,var(
--mod-slider-handle-background-color-disabled,var(--spectrum-slider-handle-background-color-disabled)
)
);border-color:var(
--highcontrast-disabled-border-color,var(--mod-disabled-border-color,var(--spectrum-disabled-border-color))
)}:host([disabled]) .track:before{background:var(
--highcontrast-slider-track-color-disabled,var(
--mod-slider-track-color-disabled,var(--spectrum-slider-track-color-disabled)
)
)}:host([disabled][variant=filled]) .track:first-child:before{background:var(
--highcontrast-slider-track-fill-color-disabled,var(
--mod-slider-track-fill-color-disabled,var(--spectrum-slider-track-fill-color-disabled)
)
)}:host([disabled]) #fill:before{background:var(
--highcontrast-slider-track-fill-color-disabled,var(
--mod-slider-track-fill-color-disabled,var(--spectrum-slider-track-fill-color-disabled)
)
)}:host([disabled]) #ramp path{fill:var(
--highcontrast-slider-ramp-track-color-disabled,var(
--mod-slider-ramp-track-color-disabled,var(--spectrum-slider-ramp-track-color-disabled)
)
)}:host([disabled]) .tick:after{background-color:var(
--highcontrast-slider-tick-mark-color-disabled,var(
--mod-slider-tick-mark-color-disabled,var(--spectrum-slider-tick-mark-color-disabled)
)
)}:host([disabled][variant=range]) .track:not(:first-of-type):not(:last-of-type):before{background:var(
--highcontrast-slider-track-color-disabled,var(
--mod-slider-track-color-disabled,var(--spectrum-slider-track-color-disabled)
)
)}@media (forced-colors:active){:host{--highcontrast-slider-track-color:ButtonText;--highcontrast-slider-track-fill-color:ButtonText;--highcontrast-slider-ramp-track-color:ButtonText;--highcontrast-slider-ramp-track-color-disabled:GrayText;--highcontrast-slider-tick-mark-color:ButtonText;--spectrum-slider-track-color:ButtonText;--spectrum-slider-track-fill-color:ButtonText;--spectrum-slider-ramp-track-color:ButtonText;--spectrum-slider-ramp-track-color-disabled:GrayText;--spectrum-slider-handle-background-color:ButtonFace;--spectrum-slider-handle-background-color-disabled:GrayText;--spectrum-slider-handle-border-color:ButtonText;--spectrum-slider-handle-disabled-background-color:GrayText;--spectrum-slider-tick-mark-color:ButtonText;--spectrum-slider-tick-mark-color-disabled:GrayText;--spectrum-slider-handle-border-color-hover:Highlight;--spectrum-slider-handle-border-color-down:Highlight;--spectrum-slider-handle-border-color-key-focus:Highlight;--spectrum-slider-handle-focus-ring-color-key-focus:Highlight;--spectrum-slider-track-color-disabled:GrayText;--spectrum-slider-track-fill-color-disabled:GrayText;--spectrum-slider-handle-border-color-disabled:GrayText;--spectrum-slider-label-text-color:CanvasText;--spectrum-slider-label-text-color-disabled:GrayText;--spectrum-slider-ramp-handle-border-color-active:ButtonText}:host([disabled]) #ramp+.handle{fill:ButtonFace;background-color:ButtonFace}}:host{--spectrum-slider-track-color:var(--system-spectrum-slider-track-color);--spectrum-slider-track-fill-color:var(
--system-spectrum-slider-track-fill-color
);--spectrum-slider-ramp-track-color:var(
--system-spectrum-slider-ramp-track-color
);--spectrum-slider-ramp-track-color-disabled:var(
--system-spectrum-slider-ramp-track-color-disabled
);--spectrum-slider-handle-background-color:var(
--system-spectrum-slider-handle-background-color
);--spectrum-slider-handle-background-color-disabled:var(
--system-spectrum-slider-handle-background-color-disabled
);--spectrum-slider-ramp-handle-background-color:var(
--system-spectrum-slider-ramp-handle-background-color
);--spectrum-slider-ticks-handle-background-color:var(
--system-spectrum-slider-ticks-handle-background-color
);--spectrum-slider-handle-border-color:var(
--system-spectrum-slider-handle-border-color
);--spectrum-slider-handle-disabled-background-color:var(
--system-spectrum-slider-handle-disabled-background-color
);--spectrum-slider-tick-mark-color:var(
--system-spectrum-slider-tick-mark-color
);--spectrum-slider-handle-border-color-hover:var(
--system-spectrum-slider-handle-border-color-hover
);--spectrum-slider-handle-border-color-down:var(
--system-spectrum-slider-handle-border-color-down
);--spectrum-slider-handle-border-color-key-focus:var(
--system-spectrum-slider-handle-border-color-key-focus
);--spectrum-slider-handle-focus-ring-color-key-focus:var(
--system-spectrum-slider-handle-focus-ring-color-key-focus
)}:host(:focus){outline:0}:host([editable]){display:grid;grid-template-areas:"label number" "slider number";grid-template-columns:1fr auto}:host([editable]) #label-container{grid-area:label}:host([editable]) #label-container+div{grid-area:slider}:host([editable]) sp-number-field{align-self:flex-end;grid-area:number;margin-inline-start:var(--spectrum-global-dimension-size-200)}:host([editable]) output{clip:rect(0,0,0,0);border:0;clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;white-space:nowrap;width:1px}:host([disabled]){pointer-events:none}#track,:host([dragging]){touch-action:none;-webkit-user-select:none;user-select:none}.not-exact.ticks{justify-content:start}:host([dir=ltr]) .not-exact .tick{padding-right:var(--sp-slider-tick-offset)}:host([dir=rtl]) .not-exact .tick{padding-left:var(--sp-slider-tick-offset)}:host([dir=ltr]) .not-exact .tick:after{left:auto;transform:translate(-50%)}:host([dir=rtl]) .not-exact .tick:after{right:auto;transform:translate(50%)}.track:before{background-size:var(--spectrum-slider-track-background-size)!important}:host([dir=ltr]) .track:last-of-type:before{background-position:100%}:host([dir=rtl]) .track:first-of-type:before{background-position:100%}:host([dir=ltr]) .track:not(:first-of-type,:last-of-type){left:var(--spectrum-slider-track-segment-position)}:host([dir=rtl]) .track:not(:first-of-type,:last-of-type){right:var(--spectrum-slider-track-segment-position)}.visually-hidden{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}:host([label-visibility=value][dir=ltr]) #value{margin-left:auto}:host([label-visibility=value][dir=rtl]) #value{margin-right:auto}:host([label-visibility=none]) #label-container{margin:0;padding:0}
`;var $ = e;

class HandleController{constructor(e){this.handles=new Map;this.model=[];this.handleOrder=[];this.handleOrientation=()=>{this.updateBoundingRect();};this.extractModelFromLightDom=()=>{let e=[...this.host.querySelectorAll('[slot="handle"]')];e.length===0&&(e=[this.host]),!e.some(t=>this.waitForUpgrade(t))&&(this.handles=new Map,this.handleOrder=[],e.forEach((t,n)=>{var i;(i=t.handleName)!=null&&i.length||(t.name=`handle${n+1}`),this.handles.set(t.handleName,t),this.handleOrder.push(t.handleName),t.handleController=this;}),this.requestUpdate());};this.onInputChange=e=>{const t=e.target;t.model.handle.value=t.valueAsNumber,this.requestUpdate(),this.dispatchChangeEvent(t,t.model.handle);};this.onInputFocus=e=>{const t=e.target;let n;try{n=t.matches(":focus-visible")||this.host.matches(".focus-visible");}catch(i){n=this.host.matches(".focus-visible");}t.model.handle.highlight=n,this.requestUpdate();};this.onInputBlur=e=>{const t=e.target;t.model.handle.highlight=!1,this.requestUpdate();};this.onInputKeydown=e=>{const t=e.target;t.model.handle.highlight=!0,this.requestUpdate();};this.host=e,new t$1(this.host,{config:{subtree:!0,childList:!0},callback:()=>{this.extractModelFromLightDom();}}),this.extractModelFromLightDom();}get values(){const e={};for(const t of this.handles.values())e[t.handleName]=t.value;return e}get size(){return this.handles.size}inputForHandle(e){if(this.handles.has(e.handleName)){const{input:t}=this.getHandleElements(e);return t}throw new Error(`No input for handle "${e.name}"`)}requestUpdate(){this.host.hasUpdated&&this.host.requestUpdate();}setValueFromHandle(e){const t=this.getHandleElements(e);if(!t)return;const{input:n}=t;n.valueAsNumber===e.value?e.dragging&&e.dispatchInputEvent():(n.valueAsNumber=e.value,this.requestUpdate()),e.value=n.valueAsNumber;}handleHasChanged(e){e!==this.host&&this.requestUpdate();}formattedValueForHandle(e){var a;const{handle:t}=e,n=(a=t.numberFormat)!=null?a:this.host.numberFormat,i=t._forcedUnit===""?this.host._forcedUnit:t._forcedUnit;return t.getAriaHandleText(e.value,n)+i}get formattedValues(){const e=new Map;for(const t of this.model)e.set(t.name,this.formattedValueForHandle(t));return e}get focusElement(){const{input:e}=this.getActiveHandleElements();return this.host.editable&&!e.model.handle.dragging?this.host.numberField:e}hostConnected(){"orientation"in screen?screen.orientation.addEventListener("change",this.handleOrientation):window.addEventListener("orientationchange",this.handleOrientation);}hostDisconnected(){"orientation"in screen?screen.orientation.removeEventListener("change",this.handleOrientation):window.removeEventListener("orientationchange",this.handleOrientation);}hostUpdate(){this.updateModel();}waitForUpgrade(e){return e instanceof SliderHandle?!1:(e.addEventListener("sp-slider-handle-ready",()=>this.extractModelFromLightDom(),{once:!0,passive:!0}),!0)}get activeHandle(){return this.handleOrder[this.handleOrder.length-1]}get activeHandleInputId(){const e=this.activeHandle;return `input-${this.model.findIndex(n=>n.name===e)}`}activateHandle(e){const t=this.handleOrder.findIndex(n=>n===e);t>=0&&this.handleOrder.splice(t,1),this.handleOrder.push(e);}getActiveHandleElements(){const e=this.activeHandle,t=this.handles.get(e),n=this.getHandleElements(t);return {model:t,...n}}getHandleElements(e){if(!this.handleRefMap){this.handleRefMap=new WeakMap;const n=this.host.shadowRoot.querySelectorAll(".handle > input");for(const i of n){const a=i,r=a.parentElement,s=this.handles.get(r.getAttribute("name"));s&&this.handleRefMap.set(s,{input:a,handle:r});}}return this.handleRefMap.get(e)}clearHandleComponentCache(){delete this.handleRefMap;}get boundingClientRect(){return this._boundingClientRect||(this._boundingClientRect=this.host.track.getBoundingClientRect()),this._boundingClientRect}updateBoundingRect(){delete this._boundingClientRect;}extractDataFromEvent(e){if(!this._activePointerEventData){let t=e.target.querySelector(":scope > .input");const n=!t,i=t?t.model:this.model.find(a=>a.name===this.activeHandle);!t&&i&&(t=i.handle.focusElement),this._activePointerEventData={input:t,model:i,resolvedInput:n};}return this._activePointerEventData}handlePointerdown(e){const{resolvedInput:t,model:n}=this.extractDataFromEvent(e);if(!n||this.host.disabled||e.button!==0){e.preventDefault();return}this.host.track.setPointerCapture(e.pointerId),this.updateBoundingRect(),e.pointerType==="mouse"&&this.host.labelEl.click(),this.draggingHandle=n.handle,n.handle.dragging=!0,this.activateHandle(n.name),t&&this.handlePointermove(e),this.requestUpdate();}handlePointerup(e){const{input:t,model:n}=this.extractDataFromEvent(e);delete this._activePointerEventData,n&&(e.pointerType==="mouse"&&this.host.labelEl.click(),this.cancelDrag(n),this.requestUpdate(),this.host.track.releasePointerCapture(e.pointerId),this.dispatchChangeEvent(t,n.handle));}handlePointermove(e){const{input:t,model:n}=this.extractDataFromEvent(e);n&&this.draggingHandle&&(e.stopPropagation(),t.value=this.calculateHandlePosition(e,n).toString(),n.handle.value=parseFloat(t.value),this.host.indeterminate=!1,this.requestUpdate());}cancelDrag(e){e=e||this.model.find(t=>t.name===this.activeHandle),e&&(e.handle.highlight=!1,delete this.draggingHandle,e.handle.dragging=!1);}dispatchChangeEvent(e,t){e.valueAsNumber=t.value;const n=new Event("change",{bubbles:!0,composed:!0});t.dispatchEvent(n);}calculateHandlePosition(e,t){const n=this.boundingClientRect,i=n.left,a=e.clientX,r=n.width,l=(this.host.isLTR?a-i:r-(a-i))/r;return t.normalization.fromNormalized(l,t.range.min,t.range.max)}renderHandle(e,t,n,i){var l$1;const a={handle:!0,dragging:((l$1=this.draggingHandle)==null?void 0:l$1.handleName)===e.name,"handle-highlight":e.highlight},r={[this.host.isLTR?"left":"right"]:`${e.normalizedValue*100}%`,"z-index":n.toString(),"background-color":`var(--spectrum-slider-handle-background-color-${t}, var(--spectrum-slider-handle-background-color))`,"border-color":`var(--spectrum-slider-handle-border-color-${t}, var(--spectrum-slider-handle-border-color))`},s=i?`label input-${t}`:"label";return x`
            <div
                class=${o$1(a)}
                name=${e.name}
                style=${o$2(r)}
                role="presentation"
            >
                <input
                    type="range"
                    class="input"
                    id="input-${t}"
                    min=${e.clamp.min}
                    max=${e.clamp.max}
                    step=${e.step}
                    value=${e.value}
                    aria-disabled=${l(this.host.disabled?"true":void 0)}
                    tabindex=${l(this.host.editable?-1:void 0)}
                    aria-label=${l(e.ariaLabel)}
                    aria-labelledby=${s}
                    aria-valuetext=${this.formattedValueForHandle(e)}
                    @change=${this.onInputChange}
                    @focus=${this.onInputFocus}
                    @blur=${this.onInputBlur}
                    @keydown=${this.onInputKeydown}
                    .model=${e}
                />
            </div>
        `}render(){return this.clearHandleComponentCache(),this.model.map((e,t)=>{const n=this.handleOrder.indexOf(e.name)+2;return this.renderHandle(e,t,n,this.model.length>1)})}trackSegments(){const e=this.model.map(t=>t.normalizedValue);return e.sort((t,n)=>t-n),e.unshift(0),e.map((t,n,i)=>{var a;return [t,(a=i[n+1])!=null?a:1]})}updateModel(){const e=[...this.handles.values()],t=i=>{const a=e[i],r=e[i-1],s=e[i+1],l=typeof a.min=="number"?a.min:this.host.min,u=typeof a.max=="number"?a.max:this.host.max,d={range:{min:l,max:u},clamp:{min:l,max:u}};if(a.min==="previous"&&r){for(let o=i-1;o>=0;o--){const h=e[o];if(typeof h.min=="number"){d.range.min=h.min;break}}d.clamp.min=Math.max(r.value,d.range.min);}if(a.max==="next"&&s){for(let o=i+1;o<e.length;o++){const h=e[o];if(typeof h.max=="number"){d.range.max=h.max;break}}d.clamp.max=Math.min(s.value,d.range.max);}return d},n=e.map((i,a)=>{var o;const r=t(a),{toNormalized:s}=i.normalization,l=Math.max(Math.min(i.value,r.clamp.max),r.clamp.min),u=s(l,r.range.min,r.range.max);return {name:i.handleName,value:l,normalizedValue:u,highlight:i.highlight,step:(o=i.step)!=null?o:this.host.step,normalization:i.normalization,handle:i,ariaLabel:i!==this.host&&(i==null?void 0:i.label.length)>0?i.label:void 0,...r}});this.model=n;}async handleUpdatesComplete(){const e=[...this.handles.values()].filter(t=>t!==this.host).map(t=>t.updateComplete);await Promise.all(e);}}

var b=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var r=(d,o,e,t)=>{for(var i=t>1?void 0:t?m(o,e):o,n=d.length-1,s;n>=0;n--)(s=d[n])&&(i=(t?s(o,e,i):s(i))||i);return t&&i&&b(o,e,i),i};const variants=["filled","ramp","range","tick"];class Slider extends SizedMixin(ObserveSlotText(SliderHandle,""),{noDefaultSize:!0,validSizes:["s","m","l","xl"]}){constructor(){super(...arguments);this.handleController=new HandleController(this);this._editable=!1;this.hideStepper=!1;this.type="";this._variant="";this.getAriaValueText=e=>{const t=[...e.values()];return t.length===2?`${t[0]} - ${t[1]}`:t.join(", ")};this.min=0;this.max=100;this.step=1;this.tickStep=0;this.tickLabels=!1;this.disabled=!1;this.quiet=!1;this.indeterminate=!1;this._numberFieldInput=Promise.resolve();}static get styles(){return [$]}get editable(){return this._editable}set editable(e){if(e===this.editable)return;const t=this.editable;this._editable=this.handleController.size<2?e:!1,this.editable&&(this._numberFieldInput=import('./sp-number-field-fea6e15e.js')),t!==this.editable&&this.requestUpdate("editable",t);}set variant(e){const t=this.variant;e!==this.variant&&(variants.includes(e)?(this.setAttribute("variant",e),this._variant=e):(this.removeAttribute("variant"),this._variant=""),this.requestUpdate("variant",t));}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return "value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(e){this.editable&&(e.preventDefault(),this.focus());}render(){return x`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?x`
                      <sp-number-field
                          .formatOptions=${this.formatOptions||{}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          size=${this.size}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `:A}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected();}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected();}update(e){this.handleController.hostUpdate(),e.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(e);}renderLabel(){const e=this.labelVisibility==="none"||this.labelVisibility==="value",t=this.labelVisibility==="none"||this.labelVisibility==="text";return x`
            <div id="label-container">
                <sp-field-label
                    class=${o$1({"visually-hidden":e})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                    size=${this.size}
                >
                    ${this.slotHasContent?A:this.label}
                    <slot>${this.label}</slot>
                </sp-field-label>
                <sp-field-label
                    class=${o$1({"visually-hidden":t})}
                    ?disabled=${this.disabled}
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    size=${this.size}
                >
                    <output id="value" aria-live="off" for="input">
                        ${this.ariaValueText}
                    </output>
                </sp-field-label>
            </div>
        `}renderRamp(){return this.variant!=="ramp"?x``:x`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `}renderTicks(){if(this.variant!=="tick")return x``;const e=this.tickStep||this.step,t=(this.max-this.min)/e,i=t%1!==0,n=new Array(Math.floor(t+1));return n.fill(0,0,t+1),x`
            <div
                class="${i?"not-exact ":""}ticks"
                style=${l(i?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${n.map((s,c)=>x`
                        <div class="tick">
                            ${this.tickLabels?x`
                                      <div class="tickLabel">
                                          ${c*e+this.min}
                                      </div>
                                  `:A}
                        </div>
                    `)}
            </div>
        `}renderTrackSegment(e,t){return this.variant==="ramp"?x``:x`
            <div
                class="track"
                style=${o$2(this.trackSegmentStyles(e,t))}
                role="presentation"
            ></div>
        `}renderTrack(){const e=this.handleController.trackSegments(),t=[{id:"track0",html:this.renderTrackSegment(...e[0])},{id:"ramp",html:this.renderRamp()},{id:"ticks",html:this.renderTicks()},{id:"handles",html:this.handleController.render()},...e.slice(1).map(([i,n],s)=>({id:`track${s+1}`,html:this.renderTrackSegment(i,n)}))];return x`
            <div
                id="track"
                ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            >
                <div id="controls">
                    ${c(t,i=>i.id,i=>i.html)}
                </div>
            </div>
        `}handlePointerdown(e){this.handleController.handlePointerdown(e);}handlePointermove(e){this.handleController.handlePointermove(e);}handlePointerup(e){this.handleController.handlePointerup(e);}handleNumberInput(e){var i;const{value:t}=e.target;if((i=e.target)!=null&&i.managedInput&&!isNaN(t)){this.value=t;return}e.stopPropagation();}handleNumberChange(e){var i;const{value:t}=e.target;isNaN(t)?(e.target.value=this.value,e.stopPropagation()):(this.value=t,(i=e.target)!=null&&i.managedInput||this.dispatchInputEvent()),this.indeterminate=!1;}trackSegmentStyles(e,t){const i=t-e;return {width:`${i*100}%`,"--spectrum-slider-track-background-size":`${1/i*100}%`,"--spectrum-slider-track-segment-position":`${e*100}%`}}async getUpdateComplete(){const e=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),e}}r([n({type:Boolean,reflect:!0})],Slider.prototype,"editable",1),r([n({type:Boolean,reflect:!0,attribute:"hide-stepper"})],Slider.prototype,"hideStepper",2),r([n()],Slider.prototype,"type",2),r([n({type:String})],Slider.prototype,"variant",1),r([n({attribute:!1})],Slider.prototype,"getAriaValueText",2),r([n({type:String,reflect:!0,attribute:"label-visibility"})],Slider.prototype,"labelVisibility",2),r([n({type:Number,reflect:!0})],Slider.prototype,"min",2),r([n({type:Number,reflect:!0})],Slider.prototype,"max",2),r([n({type:Number})],Slider.prototype,"step",2),r([n({type:Number,attribute:"tick-step"})],Slider.prototype,"tickStep",2),r([n({type:Boolean,attribute:"tick-labels"})],Slider.prototype,"tickLabels",2),r([n({type:Boolean,reflect:!0})],Slider.prototype,"disabled",2),r([n({type:Boolean})],Slider.prototype,"quiet",2),r([n({type:Boolean})],Slider.prototype,"indeterminate",2),r([i$1("#label")],Slider.prototype,"labelEl",2),r([i$1("#number-field")],Slider.prototype,"numberField",2),r([i$1("#track")],Slider.prototype,"track",2);

defineElement("sp-slider",Slider);

export { variants as v };
