import { s as streamingListener } from './streaming-listener-CmIYw2xv.js';
import { F as Focusable } from './focusable-y67P8eQI.js';
import './sp-color-handle-CrmOWEZF.js';
import { C as ColorController } from './ColorController-D_pME4qj.js';
import { L as LanguageResolutionController } from './LanguageResolution-BeoILyI5.js';
import { c as c$1 } from './opacity-checkerboard.css-RLapebzO.js';
import { i } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$1 } from './style-map-DtKTc8KS.js';
import { o as o$2 } from './if-defined-DDJGFaN4.js';
import { n, d as defineElement } from './define-element-Bun2ZgR-.js';
import { e } from './query-DQF6X5qW.js';

const o=i`
    @media (forced-colors:active){:host{--highcontrast-color-slider-border-color:CanvasText;--highcontrast-color-slider-border-color-disabled:GrayText;--highcontrast-color-slider-background-color-disabled:Canvas;forced-color-adjust:none}}:host{--mod-colorhandle-hitarea-border-radius:var(--mod-color-slider-handle-hitarea-border-radius,0px);min-inline-size:var(--mod-color-slider-minimum-length,var(--spectrum-color-slider-minimum-length));inline-size:var(--mod-color-slider-length,var(--spectrum-color-slider-length));block-size:var(--mod-color-slider-control-track-width,var(--spectrum-color-control-track-width));-webkit-user-select:none;user-select:none;cursor:default;display:block;position:relative}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([disabled]) .gradient{display:none}:host([vertical]){min-block-size:var(--mod-color-slider-vertical-minimum-height,var(--mod-color-slider-minimum-length,var(--spectrum-color-slider-minimum-length)));block-size:var(--mod-color-slider-vertical-height,var(--mod-color-slider-length,var(--spectrum-color-slider-length)));min-inline-size:0;inline-size:var(--mod-color-slider-vertical-control-track-width,var(--mod-color-slider-control-track-height,var(--spectrum-color-control-track-width)));display:inline-block}:host([vertical]) .handle{inset-block-start:0;inset-inline-start:50%}.handle{inset-block-start:50%;inset-inline-start:0}.checkerboard{--spectrum-color-slider-border-color-local:var(--highcontrast-color-slider-border-color,var(--mod-color-slider-border-color,var(--spectrum-color-slider-border-color-rgba)))}.checkerboard:before{content:"";z-index:1;box-shadow:inset 0 0 0 var(--mod-color-slider-border-width,var(--spectrum-color-slider-border-width))var(--spectrum-color-slider-border-color-local);border-radius:var(--mod-color-slider-border-rounding,var(--spectrum-color-slider-border-rounding));position:absolute;inset:0}:host([disabled]) .checkerboard{--spectrum-color-slider-border-color-local:var(--highcontrast-color-slider-border-color-disabled,var(--mod-color-slider-border-color-disabled,var(--spectrum-disabled-background-color)));background:var(--highcontrast-color-slider-background-color-disabled,var(--mod-color-slider-background-color-disabled,var(--spectrum-disabled-background-color)))}.checkerboard,.gradient{inline-size:100%;block-size:100%;border-radius:var(--mod-color-slider-border-rounding,var(--spectrum-color-slider-border-rounding))}.gradient:dir(rtl),:host([dir=rtl]) .gradient{transform:scaleX(-1)}.slider{opacity:0;inline-size:100%;block-size:100%;z-index:0;pointer-events:none;margin:0;position:absolute;inset-block-start:0;inset-inline-start:0}:host{--spectrum-color-slider-handle-margin-block:var(--system-color-slider-handle-margin-block);--spectrum-color-slider-border-color-rgba:var(--system-color-slider-border-color-rgba);--spectrum-color-slider-checkerboard-size:var(--system-color-slider-checkerboard-size);--spectrum-color-slider-checkerboard-dark-color:var(--system-color-slider-checkerboard-dark-color);--spectrum-color-slider-checkerboard-light-color:var(--system-color-slider-checkerboard-light-color)}:host{--sp-color-slider-gradient-fallback:red 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%;touch-action:none}:host([vertical]) .handle{inset-block-start:unset;inset-block-end:0}:host([vertical]) .slider{appearance:slider-vertical}:host(:focus){outline:none}.gradient{overflow:hidden}::slotted(*){width:100%;height:100%}
`;

var c=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var r=(u,l,e,t)=>{for(var i=t>1?void 0:t?v(l,e):l,s=u.length-1,o;s>=0;s--)(o=u[s])&&(i=(t?o(l,e,i):o(i))||i);return t&&i&&c(l,e,i),i};class ColorSlider extends Focusable{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.vertical=!1;this.languageResolver=new LanguageResolutionController(this);this.colorController=new ColorController(this,{manageAs:"hsv"});this.step=1;this._altered=0;this._pointerDown=!1;}static get styles(){return [c$1,o]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e;}get sliderHandlePosition(){return this.colorController.hue/360*100}get color(){return this.colorController.colorValue}set color(e){this.colorController.color=e;}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,this.altered*10);}get focusElement(){return this.input}handleKeydown(e){const{key:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(p=>!!p).length;let i=0;switch(t){case"ArrowUp":i=this.step;break;case"ArrowDown":i=-this.step;break;case"ArrowLeft":i=this.step*(this.isLTR?-1:1);break;case"ArrowRight":i=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault();const o=100/360,a=Math.min(100,Math.max(0,this.sliderHandlePosition+i*o));this.value=360*(a/100),i!=0&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})));}handleInput(e){const{valueAsNumber:t}=e.target;this.value=t;}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));}focus(e={}){super.focus(e),this.forwardFocus();}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus();}handleFocus(){this.focused=!0;}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1);}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0);}handlePointermove(e){const t=this.calculateHandlePosition(e);this.value=360*(t/100),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1);}calculateHandlePosition(e){if(!this.boundingClientRect)return this.sliderHandlePosition;const t=this.boundingClientRect,i=this.vertical?t.top:t.left,s=this.vertical?e.clientY:e.clientX,o=this.vertical?t.height:t.width,a=Math.max(0,Math.min(1,(s-i)/o));return this.vertical||!this.isLTR?100-100*a:100*a}handleGradientPointerdown(e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e));}get handlePositionStyles(){return `${this.vertical?"inset-block-end":"inset-inline-start"}: ${this.sliderHandlePosition}%`}get getColorSliderStyle(){return {background:`linear-gradient(to ${this.vertical?"top":"right"}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)))`}}render(){return x`
            <div
                class="opacity-checkerboard checkerboard"
                role="presentation"
                @pointerdown=${this.handleGradientPointerdown}
            >
                <div
                    class="gradient"
                    role="presentation"
                    style=${o$1(this.getColorSliderStyle)}
                >
                    <slot name="gradient"></slot>
                </div>
            </div>
            <sp-color-handle
                tabindex=${o$2(this.focused?void 0:"0")}
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
                aria-orientation=${o$2(this.vertical?"vertical":void 0)}
                orient=${o$2(this.vertical?"vertical":void 0)}
                step=${this.step}
                aria-label=${this.label}
                .value=${String(this.value)}
                aria-valuetext=${`${new Intl.NumberFormat(this.languageResolver.language,{maximumFractionDigits:0,minimumIntegerDigits:1,style:"unit",unit:"degree",unitDisplay:"narrow"}).format(this.value)}`}
                @input=${this.handleInput}
                @change=${this.handleChange}
                @keydown=${this.handleKeydown}
            />
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur);}}r([n({type:String,reflect:!0})],ColorSlider.prototype,"dir",2),r([n({type:Boolean,reflect:!0})],ColorSlider.prototype,"disabled",2),r([n({type:Boolean,reflect:!0})],ColorSlider.prototype,"focused",2),r([e(".handle")],ColorSlider.prototype,"handle",2),r([n({type:String})],ColorSlider.prototype,"label",2),r([n({type:Boolean,reflect:!0})],ColorSlider.prototype,"vertical",2),r([n({type:Number})],ColorSlider.prototype,"value",1),r([n({type:String})],ColorSlider.prototype,"color",1),r([n({type:Number})],ColorSlider.prototype,"step",2),r([e("input")],ColorSlider.prototype,"input",2);

defineElement("sp-color-slider",ColorSlider);
