import { L as LanguageResolutionController, l as languageResolverUpdatedSymbol } from './LanguageResolution-433GhF-m.js';
import { s as streamingListener } from './streaming-listener-99YRN1c8.js';
import { $ as $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5, a as $6c7bd7858deea686$export$cd11ab140839f11d } from './import-mabg3nA1.js';
import './sp-icon-chevron50-W6ndkU50.js';
import './sp-icon-chevron75-uC23rgSE.js';
import './sp-icon-chevron100-Z3b2AbFg.js';
import './sp-icon-chevron200-Ct7cJy16.js';
import './sp-infield-button-W1ZQSTRk.js';
import { i as isIPhone, a as isAndroid } from './platform-c1C9ET3y.js';
import { b as b$1 } from './spectrum-icon-chevron.css-nkKXiUlE.js';
import { i } from './lit-element-xBOPiTek.js';
import { a as TextfieldBase } from './Textfield-5Qr4UnN3.js';
import { x, A } from './lit-html-GmIhAbMP.js';
import { i as i$1 } from './query-JMOstM_r.js';
import { n as n$1, d as defineElement } from './define-element-b58XwwBM.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './Chevron50-QkUmZTlQ.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-O-P913zU.js';
import './Chevron75-ykt7YsHW.js';
import './Chevron100-ok1mOHjI.js';
import './Chevron200-uafXU_JZ.js';
import './ButtonBase-8MKa1AnW.js';
import './like-anchor-SzCf8Fo9.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-sowxnoY7.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-NJVGD18T.js';
import './base-STdhtiz1.js';
import './sizedMixin-SQxNgkJG.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-HAq4zshr.js';
import './sp-icon-alert-R3VPMRV3.js';
import './custom-tag-JXLWq-Sj.js';
import './state-OAXf-QuH.js';

const e=i`
:host{--spectrum-stepper-height:var(--spectrum-component-height-100);--spectrum-stepper-border-radius:var(--spectrum-corner-radius-100);--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-medium
);--spectrum-stepper-button-padding:var(
--spectrum-in-field-button-edge-to-fill
);--spectrum-stepper-width:calc(var(--mod-stepper-height, var(--spectrum-stepper-height))*var(
--mod-stepper-min-width-multiplier,
var(--spectrum-text-field-minimum-width-multiplier)
) + var(
--mod-stepper-button-width,
var(--spectrum-stepper-button-width)
) + var(
--mod-stepper-border-width,
var(--spectrum-stepper-border-width)
)*2);--spectrum-stepper-focus-indicator-width:var(
--spectrum-focus-indicator-thickness
);--spectrum-stepper-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-stepper-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-stepper-button-offset:calc(var(--spectrum-stepper-button-width)/2);--spectrum-stepper-animation-duration:var(
--spectrum-animation-duration-100
);--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color,var(
--mod-stepper-buttons-border-color,var(--spectrum-stepper-buttons-border-color)
)
);--mod-infield-button-border-width:var(
--mod-stepper-button-border-width,var(--spectrum-stepper-button-border-width)
);--mod-textfield-border-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
)}:host([size=s]) #textfield{--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-small
);--spectrum-stepper-height:var(--spectrum-component-height-75)}:host([size=l]) #textfield{--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-large
);--spectrum-stepper-height:var(--spectrum-component-height-200)}:host([size=xl]) #textfield{--spectrum-stepper-button-width:var(
--spectrum-in-field-button-width-stacked-extra-large
);--spectrum-stepper-height:var(--spectrum-component-height-300)}:host([quiet]) #textfield{--mod-infield-button-width-stacked:var(
--mod-stepper-button-width-quiet,var(--spectrum-stepper-button-width)
);--mod-textfield-focus-indicator-color:transparent}:host([disabled]) #textfield{--mod-infield-button-border-color-quiet-disabled:var(
--spectrum-disabled-border-color
)}:host([invalid]) #textfield{--mod-stepper-border-color:var(
--mod-stepper-border-color-invalid,var(--spectrum-negative-border-color-default)
);--mod-stepper-border-color-hover:var(
--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover)
);--mod-stepper-border-color-focus:var(
--mod-stepper-border-color-focus-invalid,var(--spectrum-negative-border-color-focus)
);--mod-stepper-border-color-focus-hover:var(
--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-negative-border-color-focus-hover)
);--mod-stepper-border-color-keyboard-focus:var(
--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-negative-border-color-key-focus)
);--mod-infield-button-border-color:var(
--mod-stepper-border-color-invalid,var(--spectrum-stepper-border-color-invalid)
);--mod-textfield-icon-spacing-inline-start-invalid:0}:host([invalid]) #textfield:focus,:host([invalid][focused]) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-focus-invalid,var(--spectrum-stepper-border-color-focus-invalid)
)}:host([invalid]) #textfield.focus-visible,:host([invalid][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-stepper-border-color-keyboard-focus-invalid)
)}:host([invalid]) #textfield:focus-visible,:host([invalid][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-keyboard-focus-invalid,var(--spectrum-stepper-border-color-keyboard-focus-invalid)
)}.x{border-radius:var(--spectrum-stepper-button-border-radius-reset)}#textfield{block-size:var(--mod-stepper-height,var(--spectrum-stepper-height));border-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);display:inline-flex;flex-flow:row;inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width));position:relative}#textfield,#textfield .input{border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
)}#textfield .input{border-end-end-radius:0;border-inline-end-width:0;border-start-end-radius:0}#textfield:focus,:host([focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-buttons-border-color-focus,var(--spectrum-stepper-buttons-border-color-focus)
)
)}#textfield:focus .input,:host([focused]) #textfield .input{outline:none}#textfield:focus .buttons,#textfield:focus .input,:host([focused]) #textfield .buttons,:host([focused]) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)
)
)}#textfield.focus-visible,:host([keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-buttons-border-color-keyboard-focus,var(--spectrum-stepper-buttons-border-color-keyboard-focus)
)
);outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield:focus-visible,:host([keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-buttons-border-color-keyboard-focus,var(--spectrum-stepper-buttons-border-color-keyboard-focus)
)
);outline:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
);outline-offset:var(
--mod-stepper-focus-indicator-gap,var(--spectrum-stepper-focus-indicator-gap)
)}#textfield.focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield:focus-visible .input,:host([keyboard-focused]) #textfield .input{outline:none}#textfield.focus-visible .buttons,#textfield.focus-visible .input,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}#textfield:focus-visible .buttons,#textfield:focus-visible .input,:host([keyboard-focused]) #textfield .buttons,:host([keyboard-focused]) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
)}:host([quiet]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
);border-end-end-radius:0;border-end-start-radius:0;border-start-end-radius:0;border-start-start-radius:0}:host([quiet]) #textfield.hide-stepper .input{border-end-end-radius:0;border-inline-end-width:0}:host([quiet]) #textfield:after{block-size:var(
--mod-stepper-focus-indicator-width,var(--spectrum-stepper-focus-indicator-width)
);content:"";inline-size:100%;inset-block-end:calc((var(
--mod-stepper-focus-indicator-gap,
var(--spectrum-stepper-focus-indicator-gap)
) + var(
--mod-stepper-focus-indicator-width,
var(--spectrum-stepper-focus-indicator-width)
))*-1);inset-inline-start:0;position:absolute}:host([quiet]) #textfield .buttons{border:none}:host([quiet]) #textfield .button{--mod-infield-button-border-block-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);--mod-infield-button-stacked-bottom-border-block-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);--mod-infield-button-stacked-bottom-border-radius-end-end:0;--mod-infield-button-stacked-bottom-border-radius-end-start:0;--mod-infield-button-fill-justify-content:flex-end;padding:0}:host([quiet]) #textfield .buttons,:host([quiet]) #textfield .input{background-color:#0000}:host([quiet]) #textfield:focus,:host([quiet][focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus,var(
--mod-stepper-border-color-focus,var(--spectrum-stepper-border-color-focus)
)
)}:host([quiet][keyboard-focused]) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-keyboard-focus,var(
--mod-stepper-border-color-keyboard-focus,var(--spectrum-stepper-border-color-keyboard-focus)
)
);outline:none}:host([quiet][keyboard-focused]) #textfield:after{background-color:var(
--highcontrast-stepper-focus-indicator-color,var(
--mod-stepper-focus-indicator-color,var(--spectrum-stepper-focus-indicator-color)
)
)}@media (hover:hover){:host([invalid]:hover) #textfield:focus,:host([invalid][focused]:hover) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-focus-hover-invalid,var(--spectrum-stepper-border-color-focus-hover-invalid)
)}:host(:hover) #textfield:focus .buttons,:host(:hover) #textfield:focus .input,:host([focused]:hover) #textfield .buttons,:host([focused]:hover) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)
)
)}:host([invalid]:hover) #textfield{--mod-infield-button-border-color:var(
--mod-stepper-border-color-hover-invalid,var(--spectrum-negative-border-color-hover)
)}:host(:hover:not([disabled])) #textfield .buttons,:host(:hover:not([disabled])) #textfield .input{border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}:host(:hover) #textfield:focus,:host([focused]:hover) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-buttons-border-color-focus-hover,var(--spectrum-stepper-buttons-border-color-focus-hover)
)
)}:host(:hover) #textfield:not(.is-disabled,.is-invalid){--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-buttons-border-color-hover,var(--spectrum-stepper-buttons-border-color-hover)
)
)}:host([quiet]:hover:not([disabled])) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}:host([quiet]:hover:not([disabled])) #textfield .buttons{background-color:#0000}:host([quiet]:hover) #textfield:focus,:host([quiet][focused]:hover) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-focus-hover,var(
--mod-stepper-border-color-focus-hover,var(--spectrum-stepper-border-color-focus-hover)
)
)}:host([quiet][keyboard-focused]:hover) #textfield{--mod-infield-button-border-color:var(
--highcontrast-stepper-border-color-hover,var(
--mod-stepper-border-color-hover,var(--spectrum-stepper-border-color-hover)
)
)}}#textfield:before{content:""}.buttons{background-color:var(
--highcontrast-stepper-buttons-background-color,var(
--mod-stepper-buttons-background-color,var(--spectrum-stepper-buttons-background-color)
)
);block-size:var(--mod-stepper-height,var(--spectrum-stepper-height));border-color:var(
--highcontrast-stepper-border-color,var(--mod-stepper-border-color,var(--spectrum-stepper-border-color))
);border-end-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-style:var(
--mod-stepper-buttons-border-style,var(--spectrum-stepper-buttons-border-style)
);border-width:var(
--highcontrast-stepper-buttons-border-width,var(
--mod-stepper-buttons-border-width,var(--spectrum-stepper-buttons-border-width)
)
);border-inline-start-width:0;border-start-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);box-sizing:border-box;display:flex;flex-direction:column;inline-size:var(
--mod-stepper-button-width,var(--spectrum-stepper-button-width)
);justify-content:center;transition:border-color var(
--mod-stepper-animation-duration,var(--spectrum-stepper-animation-duration)
) ease-in-out}#textfield.hide-stepper .input{border-end-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
);border-inline-end-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
);border-start-end-radius:var(
--mod-stepper-border-radius,var(--spectrum-stepper-border-radius)
)}@media (forced-colors:active){:host{--highcontrast-stepper-border-color:CanvasText;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:CanvasText;--highcontrast-stepper-button-background-color-default:Canvas;--highcontrast-stepper-button-background-color-hover:Canvas;--highcontrast-stepper-button-background-color-focus:Canvas;--highcontrast-stepper-button-background-color-keyboard-focus:Canvas;--highcontrast-stepper-focus-indicator-color:Highlight}:host([disabled]) #textfield{--highcontrast-stepper-border-color:GrayText;--highcontrast-stepper-buttons-border-width:var(
--mod-stepper-border-width,var(--spectrum-stepper-border-width)
)}:host([invalid]) #textfield{--highcontrast-stepper-border-color:Highlight;--highcontrast-stepper-border-color-hover:Highlight;--highcontrast-stepper-border-color-focus:Highlight;--highcontrast-stepper-border-color-focus-hover:Highlight;--highcontrast-stepper-border-color-keyboard-focus:Highlight}}:host{--spectrum-stepper-border-width:var(
--system-spectrum-stepper-border-width
);--spectrum-stepper-buttons-border-style:var(
--system-spectrum-stepper-buttons-border-style
);--spectrum-stepper-buttons-border-width:var(
--system-spectrum-stepper-buttons-border-width
);--spectrum-stepper-buttons-border-color:var(
--system-spectrum-stepper-buttons-border-color
);--spectrum-stepper-buttons-background-color:var(
--system-spectrum-stepper-buttons-background-color
);--spectrum-stepper-buttons-border-color-hover:var(
--system-spectrum-stepper-buttons-border-color-hover
);--spectrum-stepper-buttons-border-color-focus:var(
--system-spectrum-stepper-buttons-border-color-focus
);--spectrum-stepper-buttons-border-color-keyboard-focus:var(
--system-spectrum-stepper-buttons-border-color-keyboard-focus
);--spectrum-stepper-button-border-radius-reset:var(
--system-spectrum-stepper-button-border-radius-reset
);--spectrum-stepper-button-border-width:var(
--system-spectrum-stepper-button-border-width
);--spectrum-stepper-border-color:var(
--system-spectrum-stepper-border-color
);--spectrum-stepper-border-color-hover:var(
--system-spectrum-stepper-border-color-hover
);--spectrum-stepper-border-color-focus:var(
--system-spectrum-stepper-border-color-focus
);--spectrum-stepper-border-color-focus-hover:var(
--system-spectrum-stepper-border-color-focus-hover
);--spectrum-stepper-border-color-keyboard-focus:var(
--system-spectrum-stepper-border-color-keyboard-focus
);--spectrum-stepper-border-color-invalid:var(
--system-spectrum-stepper-border-color-invalid
);--spectrum-stepper-border-color-focus-invalid:var(
--system-spectrum-stepper-border-color-focus-invalid
);--spectrum-stepper-border-color-focus-hover-invalid:var(
--system-spectrum-stepper-border-color-focus-hover-invalid
);--spectrum-stepper-border-color-keyboard-focus-invalid:var(
--system-spectrum-stepper-border-color-keyboard-focus-invalid
);--spectrum-stepper-button-background-color-focus:var(
--system-spectrum-stepper-button-background-color-focus
);--spectrum-stepper-button-background-color-keyboard-focus:var(
--system-spectrum-stepper-button-background-color-keyboard-focus
)}:host([disabled]) #textfield{--spectrum-stepper-buttons-background-color:var(
--system-spectrum-stepper-disabled-buttons-background-color
);--spectrum-stepper-buttons-border-width:var(
--system-spectrum-stepper-disabled-buttons-border-width
)}:host{inline-size:var(--mod-stepper-width,var(--spectrum-stepper-width));--swc-number-field-width:calc(var(--mod-stepper-height, var(--spectrum-stepper-height))*var(
--mod-stepper-min-width-multiplier,
var(--spectrum-text-field-minimum-width-multiplier)
) + var(
--mod-stepper-button-width,
var(--spectrum-stepper-button-width)
) + var(
--mod-stepper-border-width,
var(--spectrum-stepper-border-width)
)*2);--mod-infield-button-border-width:var(--unset-value-resets-inheritance)}:host([size=s]){--spectrum-stepper-width:calc(var(--swc-number-field-width)/5*4)}:host([size=l]){--spectrum-stepper-width:calc(var(--swc-number-field-width)*1.25)}:host([size=xl]){--spectrum-stepper-width:calc(var(--swc-number-field-width)*1.25*1.25)}#textfield{inline-size:100%}.input{font-variant-numeric:tabular-nums}:host([readonly]) .buttons{pointer-events:none;visibility:hidden}:host([readonly]:not([disabled],[invalid],[focused],[keyboard-focused])) #textfield:hover .input{border-color:transparent}:host([hide-stepper]:not([quiet])) #textfield input{border:var(--spectrum-textfield-border-width) solid var(--spectrum-textfield-border-color);border-radius:var(--spectrum-textfield-corner-radius)}
`;var I = e;

var g=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var n=(a,l,e,t)=>{for(var i=t>1?void 0:t?y(l,e):l,s=a.length-1,r;s>=0;s--)(r=a[s])&&(i=(t?r(l,e,i):r(i))||i);return t&&i&&g(l,e,i),i};const FRAMES_PER_CHANGE=5,CHANGE_DEBOUNCE_MS=100,indeterminatePlaceholder="-",remapMultiByteCharacters={"\uFF11":"1","\uFF12":"2","\uFF13":"3","\uFF14":"4","\uFF15":"5","\uFF16":"6","\uFF17":"7","\uFF18":"8","\uFF19":"9","\uFF10":"0","\u3001":",","\uFF0C":",","\u3002":".","\uFF0E":".","\uFF05":"%","\uFF0B":"+",\u30FC:"-"};const b={s:a=>x`
        <sp-icon-chevron50
            class="stepper-icon spectrum-UIIcon-Chevron${a}50"
        ></sp-icon-chevron50>
    `,m:a=>x`
        <sp-icon-chevron75
            class="stepper-icon spectrum-UIIcon-Chevron${a}75"
        ></sp-icon-chevron75>
    `,l:a=>x`
        <sp-icon-chevron100
            class="stepper-icon spectrum-UIIcon-Chevron${a}100"
        ></sp-icon-chevron100>
    `,xl:a=>x`
        <sp-icon-chevron200
            class="stepper-icon spectrum-UIIcon-Chevron${a}200"
        ></sp-icon-chevron200>
    `};class NumberField extends TextfieldBase{constructor(){super(...arguments);this.focused=!1;this._forcedUnit="";this.formatOptions={};this.hideStepper=!1;this.indeterminate=!1;this.keyboardFocused=!1;this.managedInput=!1;this.stepModifier=10;this._value=NaN;this._trackingValue="";this.changeCount=0;this.languageResolver=new LanguageResolutionController(this);this.wasIndeterminate=!1;this.applyFocusElementLabel=e=>{this.appliedLabel=e;};this.isComposing=!1;}static get styles(){return [...super.styles,I,b$1]}set value(e){const t=this.validateInput(e);if(t===this.value)return;this.lastCommitedValue=t;const i=this._value;this._value=t,this.requestUpdate("value",i);}get value(){return this._value}get inputValue(){return this.indeterminate?this.formattedValue:this.inputElement.value}setValue(e=this.value){this.value=e,!(typeof this.lastCommitedValue=="undefined"||this.lastCommitedValue===this.value)&&(this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.lastCommitedValue=this.value);}get valueAsString(){return this._value.toString()}set valueAsString(e){this.value=this.numberParser.parse(e);}get formattedValue(){return isNaN(this.value)?"":this.numberFormatter.format(this.value)+(this.focused?"":this._forcedUnit)}convertValueToNumber(e){var t;if(isIPhone()&&this.inputElement.inputMode==="decimal"){const i=this.numberFormatter.formatToParts(1000.1),s=e.split("").find(u=>u===","||u==="."),r=(t=i.find(u=>u.type==="decimal"))==null?void 0:t.value;s&&r&&(e=e.replace(s,r));}return this.numberParser.parse(e)}get _step(){var e;return typeof this.step!="undefined"?this.step:((e=this.formatOptions)==null?void 0:e.style)==="percent"?.01:1}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this.managedInput=!0,this.buttons.setPointerCapture(e.pointerId);const t=this.buttons.children[0].getBoundingClientRect(),i=this.buttons.children[1].getBoundingClientRect();this.findChange=s=>{s.clientX>=t.x&&s.clientY>=t.y&&s.clientX<=t.x+t.width&&s.clientY<=t.y+t.height?this.change=r=>this.increment(r.shiftKey?this.stepModifier:1):s.clientX>=i.x&&s.clientY>=i.y&&s.clientX<=i.x+i.width&&s.clientY<=i.y+i.height&&(this.change=r=>this.decrement(r.shiftKey?this.stepModifier:1));},this.findChange(e),this.startChange(e);}startChange(e){this.changeCount=0,this.doChange(e),this.safty=setTimeout(()=>{this.doNextChange(e);},400);}doChange(e){this.change(e);}handlePointermove(e){this.findChange(e);}handlePointerup(e){this.buttons.releasePointerCapture(e.pointerId),cancelAnimationFrame(this.nextChange),clearTimeout(this.safty),this.managedInput=!1,this.setValue();}doNextChange(e){return this.changeCount+=1,this.changeCount%FRAMES_PER_CHANGE===0&&this.doChange(e),requestAnimationFrame(()=>{this.nextChange=this.doNextChange(e);})}stepBy(e){if(this.disabled||this.readonly)return;const t=typeof this.min!="undefined"?this.min:0;let i=this.value;i+=e*this._step,isNaN(this.value)&&(i=t),i=this.valueWithLimits(i),this.requestUpdate(),this._value=this.validateInput(i),this.inputElement.value=i.toString(),this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.indeterminate=!1,this.focus();}increment(e=1){this.stepBy(1*e);}decrement(e=1){this.stepBy(-1*e);}handleKeydown(e){if(!this.isComposing)switch(e.code){case"ArrowUp":e.preventDefault(),this.increment(e.shiftKey?this.stepModifier:1),this.setValue();break;case"ArrowDown":e.preventDefault(),this.decrement(e.shiftKey?this.stepModifier:1),this.setValue();break}}onScroll(e){e.preventDefault(),this.managedInput=!0;const t=e.shiftKey?e.deltaX/Math.abs(e.deltaX):e.deltaY/Math.abs(e.deltaY);t!==0&&!isNaN(t)&&(this.stepBy(t*(e.shiftKey?this.stepModifier:1)),clearTimeout(this.queuedChangeEvent),this.queuedChangeEvent=setTimeout(()=>{this.setValue();},CHANGE_DEBOUNCE_MS)),this.managedInput=!1;}onFocus(){super.onFocus(),this._trackingValue=this.inputValue,this.keyboardFocused=!this.readonly&&!0,this.addEventListener("wheel",this.onScroll,{passive:!1});}onBlur(e){super.onBlur(e),this.keyboardFocused=!this.readonly&&!1,this.removeEventListener("wheel",this.onScroll);}handleFocusin(){this.focused=!this.readonly&&!0,this.keyboardFocused=!this.readonly&&!0;}handleFocusout(){this.focused=!this.readonly&&!1,this.keyboardFocused=!this.readonly&&!1;}handleChange(){const e=this.convertValueToNumber(this.inputValue);if(this.wasIndeterminate&&(this.wasIndeterminate=!1,this.indeterminateValue=void 0,isNaN(e))){this.indeterminate=!0;return}this.setValue(e),this.inputElement.value=this.formattedValue;}handleCompositionStart(){this.isComposing=!0;}handleCompositionEnd(){this.isComposing=!1,requestAnimationFrame(()=>{this.inputElement.dispatchEvent(new Event("input",{composed:!0,bubbles:!0}));});}handleInput(e){var m;if(this.isComposing){e.stopPropagation();return}this.indeterminate&&(this.wasIndeterminate=!0,this.indeterminateValue=this.value,this.inputElement.value=this.inputElement.value.replace(indeterminatePlaceholder,""));const{value:t,selectionStart:i}=this.inputElement,s=t.split("").map(d=>remapMultiByteCharacters[d]||d).join("");if(this.numberParser.isValidPartialNumber(s)){this.lastCommitedValue=(m=this.lastCommitedValue)!=null?m:this.value;const d=this.convertValueToNumber(s);!s&&this.indeterminateValue?(this.indeterminate=!0,this._value=this.indeterminateValue):(this.indeterminate=!1,this._value=this.validateInput(d)),this._trackingValue=s,this.inputElement.value=s,this.inputElement.setSelectionRange(i,i);return}else this.inputElement.value=this.indeterminate?indeterminatePlaceholder:this._trackingValue;const r=s.length,u=this._trackingValue.length,p=(i||r)-(r-u);this.inputElement.setSelectionRange(p,p);}valueWithLimits(e){let t=e;return typeof this.min!="undefined"&&(t=Math.max(this.min,t)),typeof this.max!="undefined"&&(t=Math.min(this.max,t)),t}validateInput(e){e=this.valueWithLimits(e);const t=e<0?-1:1;if(e*=t,this.step){const i=typeof this.min!="undefined"?this.min:0,s=(e-i)%this.step;if(s===0||(Math.round(s/this.step)===1?e+=this.step-s:e-=s),typeof this.max!="undefined")for(;e>this.max;)e-=this.step;}return e*=t,e}get displayValue(){const e=this.focused?"":indeterminatePlaceholder;return this.indeterminate?e:this.formattedValue}clearNumberFormatterCache(){this._numberFormatter=void 0,this._numberParser=void 0;}get numberFormatter(){if(!this._numberFormatter||!this._numberFormatterFocused){const{style:e,unit:t,unitDisplay:i,...s}=this.formatOptions;e!=="unit"&&(s.style=e),this._numberFormatterFocused=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,s);try{this._numberFormatter=new $488c6ddbf4ef74c2$export$cc77c4ff7e8673c5(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberFormatter.format(1);}catch(r){e==="unit"&&(this._forcedUnit=t),this._numberFormatter=this._numberFormatterFocused;}}return this.focused?this._numberFormatterFocused:this._numberFormatter}get numberParser(){if(!this._numberParser||!this._numberParserFocused){const{style:e,unit:t,unitDisplay:i,...s}=this.formatOptions;e!=="unit"&&(s.style=e),this._numberParserFocused=new $6c7bd7858deea686$export$cd11ab140839f11d(this.languageResolver.language,s);try{this._numberParser=new $6c7bd7858deea686$export$cd11ab140839f11d(this.languageResolver.language,this.formatOptions),this._forcedUnit="",this._numberParser.parse("0");}catch(r){e==="unit"&&(this._forcedUnit=t),this._numberParser=this._numberParserFocused;}}return this.focused?this._numberParserFocused:this._numberParser}renderField(){return this.autocomplete="off",x`
            ${super.renderField()}
            ${this.hideStepper?A:x`
                      <span
                          class="buttons"
                          @focusin=${this.handleFocusin}
                          @focusout=${this.handleFocusout}
                          ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:[["pointermove","pointerenter","pointerleave","pointerover","pointerout"],this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
                      >
                          <sp-infield-button
                              inline="end"
                              block="start"
                              class="button step-up"
                              aria-describedby=${this.helpTextId}
                              label=${"Increase "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.max!="undefined"&&this.value===this.max}
                              ?quiet=${this.quiet}
                          >
                              ${b[this.size]("Up")}
                          </sp-infield-button>
                          <sp-infield-button
                              inline="end"
                              block="end"
                              class="button step-down"
                              aria-describedby=${this.helpTextId}
                              label=${"Decrease "+this.appliedLabel}
                              size=${this.size}
                              tabindex="-1"
                              ?focused=${this.focused}
                              ?disabled=${this.disabled||this.readonly||typeof this.min!="undefined"&&this.value===this.min}
                              ?quiet=${this.quiet}
                          >
                              ${b[this.size]("Down")}
                          </sp-infield-button>
                      </span>
                  `}
        `}update(e){if((e.has("formatOptions")||e.has("resolvedLanguage"))&&this.clearNumberFormatterCache(),e.has("value")||e.has("max")||e.has("min")){const t=this.numberParser.parse(this.formattedValue.replace(this._forcedUnit,""));this.value=t;}super.update(e);}willUpdate(e){this.multiline=!1,e.has(languageResolverUpdatedSymbol)&&this.clearNumberFormatterCache();}firstUpdated(e){super.firstUpdated(e),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("compositionstart",this.handleCompositionStart),this.addEventListener("compositionend",this.handleCompositionEnd);}updated(e){if(e.has("min")||e.has("formatOptions")){let t="numeric";const i=typeof this.min!="undefined"&&this.min<0,{maximumFractionDigits:s}=this.numberFormatter.resolvedOptions(),r=s>0;isIPhone()?i?t="text":r&&(t="decimal"):isAndroid()&&(i?t="numeric":r&&(t="decimal")),this.inputElement.inputMode=t;}}}n([i$1(".buttons")],NumberField.prototype,"buttons",2),n([n$1({type:Boolean,reflect:!0})],NumberField.prototype,"focused",2),n([n$1({type:Object,attribute:"format-options"})],NumberField.prototype,"formatOptions",2),n([n$1({type:Boolean,reflect:!0,attribute:"hide-stepper"})],NumberField.prototype,"hideStepper",2),n([n$1({type:Boolean,reflect:!0})],NumberField.prototype,"indeterminate",2),n([n$1({type:Boolean,reflect:!0,attribute:"keyboard-focused"})],NumberField.prototype,"keyboardFocused",2),n([n$1({type:Number})],NumberField.prototype,"max",2),n([n$1({type:Number})],NumberField.prototype,"min",2),n([n$1({type:Number})],NumberField.prototype,"step",2),n([n$1({type:Number,reflect:!0,attribute:"step-modifier"})],NumberField.prototype,"stepModifier",2),n([n$1({type:Number})],NumberField.prototype,"value",1);

defineElement("sp-number-field",NumberField);
