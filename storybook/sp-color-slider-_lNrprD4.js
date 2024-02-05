import { s as streamingListener } from './streaming-listener-99YRN1c8.js';
import { F as Focusable } from './focusable-WZR9a5Bc.js';
import './sp-color-handle-S2d57ovd.js';
import { C as ColorController } from './Color-Y79G7Zyd.js';
import { L as LanguageResolutionController } from './LanguageResolution-433GhF-m.js';
import { b } from './opacity-checkerboard.css-uDCNYB6s.js';
import { i } from './lit-element-xBOPiTek.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import { n, d as defineElement } from './define-element-2O4ZhTAw.js';
import { i as i$1 } from './query-JMOstM_r.js';

const o=i`
:host{--spectrum-color-slider-handle-margin-block:var(
--spectrum-component-top-to-text-75
);--spectrum-color-slider-border-color-rgba:rgba(var(--spectrum-gray-900-rgb),var(--spectrum-color-slider-border-opacity));--spectrum-color-slider-checkerboard-size:var(
--spectrum-opacity-checkerboard-square-size
);--spectrum-color-slider-checkerboard-dark-color:var(
--spectrum-opacity-checkerboard-square-dark
);--spectrum-color-slider-checkerboard-light-color:var(
--spectrum-opacity-checkerboard-square-light
);--mod-colorhandle-hitarea-border-radius:var(
--mod-color-slider-handle-hitarea-border-radius,0px
)}@media (forced-colors:active){:host{--highcontrast-color-slider-border-color:CanvasText;--highcontrast-color-slider-border-color-disabled:GrayText;--highcontrast-color-slider-background-color-disabled:Canvas;forced-color-adjust:none}}:host{block-size:var(
--mod-color-slider-control-track-width,var(--spectrum-color-control-track-width)
);cursor:default;display:block;inline-size:var(
--mod-color-slider-length,var(--spectrum-color-slider-length)
);min-inline-size:var(
--mod-color-slider-minimum-length,var(--spectrum-color-slider-minimum-length)
);position:relative;-webkit-user-select:none;user-select:none}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([disabled]) .gradient{display:none}:host([vertical]){block-size:var(
--mod-color-slider-vertical-height,var(--mod-color-slider-length,var(--spectrum-color-slider-length))
);display:inline-block;inline-size:var(
--mod-color-slider-vertical-control-track-width,var(
--mod-color-slider-control-track-height,var(--spectrum-color-control-track-width)
)
);min-block-size:var(
--mod-color-slider-vertical-minimum-height,var(
--mod-color-slider-minimum-length,var(--spectrum-color-slider-minimum-length)
)
);min-inline-size:0}:host([vertical]) .handle{inset-block-start:0;inset-inline-start:50%}.handle{inset-block-start:50%;inset-inline-start:0}.checkerboard{--spectrum-color-slider-border-color-local:var(
--highcontrast-color-slider-border-color,var(
--mod-color-slider-border-color,var(--spectrum-color-slider-border-color-rgba)
)
)}.checkerboard:before{border-radius:var(
--mod-color-slider-border-rounding,var(--spectrum-color-slider-border-rounding)
);box-shadow:inset 0 0 0 var(
--mod-color-slider-border-width,var(--spectrum-color-slider-border-width)
) var(--spectrum-color-slider-border-color-local);content:"";inset:0;position:absolute;z-index:1}:host([disabled]) .checkerboard{--spectrum-color-slider-border-color-local:var(
--highcontrast-color-slider-border-color-disabled,var(
--mod-color-slider-border-color-disabled,var(--spectrum-disabled-background-color)
)
);background:var(
--highcontrast-color-slider-background-color-disabled,var(
--mod-color-slider-background-color-disabled,var(--spectrum-disabled-background-color)
)
)}.checkerboard,.gradient{block-size:100%;border-radius:var(
--mod-color-slider-border-rounding,var(--spectrum-color-slider-border-rounding)
);inline-size:100%}:host([dir=rtl]) .gradient{transform:scaleX(-1)}.slider{block-size:100%;inline-size:100%;inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;pointer-events:none;position:absolute;z-index:0}:host{--sp-color-slider-gradient-fallback:red 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%;touch-action:none}:host([vertical]) .handle{inset-block-end:0;inset-block-start:unset}:host([vertical]) .slider{appearance:slider-vertical}:host(:focus){outline:none}.gradient{overflow:hidden}::slotted(*){height:100%;width:100%}
`;var P = o;

var p=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var r=(u,l,e,i)=>{for(var t=i>1?void 0:i?c(l,e):l,s=u.length-1,n;s>=0;s--)(n=u[s])&&(t=(i?n(l,e,t):n(t))||t);return i&&t&&p(l,e,t),t};class ColorSlider extends Focusable{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.vertical=!1;this.languageResolver=new LanguageResolutionController(this);this.colorController=new ColorController(this,{applyColorToState:()=>{this.sliderHandlePosition=100*(this.colorController.hue/360);},extractColorFromState:e=>({...e.getColor("hsl"),h:this.value}),maintains:"saturation"});this.sliderHandlePosition=0;this.step=1;this._altered=0;this._pointerDown=!1;}static get styles(){return [b,P]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e;}get color(){return this.colorController.color}set color(e){this.colorController.color=e;}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,this.altered*10);}get focusElement(){return this.input}handleKeydown(e){const{key:i}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(a=>!!a).length;let t=0;switch(i){case"ArrowUp":t=this.step;break;case"ArrowDown":t=-this.step;break;case"ArrowLeft":t=this.step*(this.isLTR?-1:1);break;case"ArrowRight":t=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault();const n=100/360;this.sliderHandlePosition=Math.min(100,Math.max(0,this.sliderHandlePosition+t*n)),this.value=Math.min(100,Math.max(0,this.value+t)),this.colorController.applyColorFromState(),t!=0&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));}handleInput(e){const{valueAsNumber:i}=e.target;this.value=i,this.sliderHandlePosition=100*(this.value/360),this.colorController.applyColorFromState();}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));}focus(e={}){super.focus(e),this.forwardFocus();}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus();}handleFocus(){this.focused=!0;}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1);}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0);}handlePointermove(e){this.sliderHandlePosition=this.calculateHandlePosition(e),this.value=360*(this.sliderHandlePosition/100),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1);}calculateHandlePosition(e){if(!this.boundingClientRect)return this.sliderHandlePosition;const i=this.boundingClientRect,t=this.vertical?i.top:i.left,s=this.vertical?e.clientY:e.clientX,n=this.vertical?i.height:i.width,a=Math.max(0,Math.min(1,(s-t)/n));return this.vertical||!this.isLTR?100-100*a:100*a}handleGradientPointerdown(e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e));}get handlePositionStyles(){return `${this.vertical?"inset-block-end":"inset-inline-start"}: ${this.sliderHandlePosition}%`}render(){return x`
            <div
                class="opacity-checkerboard checkerboard"
                role="presentation"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div
                    class="gradient"
                    role="presentation"
                    style="background: linear-gradient(to ${this.vertical?"top":"right"}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)));"
                >
                    <slot name="gradient"></slot>
                </div>
            </div>
            <sp-color-handle
                tabindex=${l(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${this.handlePositionStyles}
                ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            ></sp-color-handle>
            <input
                type="range"
                class="slider"
                min="0"
                max="360"
                aria-orientation=${l(this.vertical?"vertical":void 0)}
                orient=${l(this.vertical?"vertical":void 0)}
                step=${this.step}
                aria-label=${this.label}
                .value=${String(this.value)}
                aria-valuetext=${`${new Intl.NumberFormat(this.languageResolver.language,{maximumFractionDigits:0,minimumIntegerDigits:1,style:"unit",unit:"degree",unitDisplay:"narrow"}).format(this.value)}`}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur);}}r([n({type:String,reflect:!0})],ColorSlider.prototype,"dir",2),r([n({type:Boolean,reflect:!0})],ColorSlider.prototype,"disabled",2),r([n({type:Boolean,reflect:!0})],ColorSlider.prototype,"focused",2),r([i$1(".handle")],ColorSlider.prototype,"handle",2),r([n({type:String})],ColorSlider.prototype,"label",2),r([n({type:Boolean,reflect:!0})],ColorSlider.prototype,"vertical",2),r([n({type:Number})],ColorSlider.prototype,"value",1),r([n({type:Number,reflect:!0})],ColorSlider.prototype,"sliderHandlePosition",2),r([n({type:String})],ColorSlider.prototype,"color",1),r([n({type:Number})],ColorSlider.prototype,"step",2),r([i$1("input")],ColorSlider.prototype,"input",2);

defineElement("sp-color-slider",ColorSlider);
