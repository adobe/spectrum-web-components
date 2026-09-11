"use strict";var c=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var r=(u,l,e,t)=>{for(var i=t>1?void 0:t?v(l,e):l,s=u.length-1,n;s>=0;s--)(n=u[s])&&(i=(t?n(l,e,i):n(i))||i);return t&&i&&c(l,e,i),i};import{html as m}from"@spectrum-web-components/base";import{property as o,query as d}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as h,styleMap as f}from"@spectrum-web-components/base/src/directives.js";import{streamingListener as b}from"@spectrum-web-components/base/src/streaming-listener.js";import g from"@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js";import{ColorController as y}from"@spectrum-web-components/reactive-controllers/src/ColorController.js";import{LanguageResolutionController as w}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import{Focusable as P}from"@spectrum-web-components/shared/src/focusable.js";import"@spectrum-web-components/color-handle/sp-color-handle.js";import E from"./color-slider.css.js";export class ColorSlider extends P{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.vertical=!1;this.languageResolver=new w(this);this.colorController=new y(this,{manageAs:"hsv"});this.step=1;this._altered=0;this._pointerDown=!1}static get styles(){return[g,E]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e}get sliderHandlePosition(){return this.colorController.hue/360*100}get color(){return this.colorController.colorValue}set color(e){this.colorController.color=e}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,this.altered*10)}get focusElement(){return this.input}handleKeydown(e){const{key:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(p=>!!p).length;let i=0;switch(t){case"ArrowUp":i=this.step;break;case"ArrowDown":i=-this.step;break;case"ArrowLeft":i=this.step*(this.dir==="ltr"?-1:1);break;case"ArrowRight":i=this.step*(this.dir==="ltr"?1:-1);break;default:return}e.preventDefault();const n=100/360,a=Math.min(100,Math.max(0,this.sliderHandlePosition+i*n));this.value=360*(a/100),i!=0&&(this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})))}handleInput(e){const{valueAsNumber:t}=e.target;this.value=t}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocus(){this.focused=!0}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0)}handlePointermove(e){const t=this.calculateHandlePosition(e);this.value=360*(t/100),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1)}calculateHandlePosition(e){if(!this.boundingClientRect)return this.sliderHandlePosition;const t=this.boundingClientRect,i=this.vertical?t.top:t.left,s=this.vertical?e.clientY:e.clientX,n=this.vertical?t.height:t.width,a=Math.max(0,Math.min(1,(s-i)/n));return this.vertical||this.dir==="rtl"?100-100*a:100*a}handleGradientPointerdown(e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e))}get handlePositionStyles(){return`${this.vertical?"inset-block-end":"inset-inline-start"}: ${this.sliderHandlePosition}%`}get getColorSliderStyle(){return{background:`linear-gradient(to ${this.vertical?"top":"right"}, var(--sp-color-slider-gradient, var(--sp-color-slider-gradient-fallback)))`}}render(){return m`
      <div
        class="opacity-checkerboard checkerboard"
        role="presentation"
        @pointerdown=${this.handleGradientPointerdown}
      >
        <div
          class="gradient"
          role="presentation"
          style=${f(this.getColorSliderStyle)}
        >
          <slot name="gradient"></slot>
        </div>
      </div>
      <sp-color-handle
        tabindex=${h(this.focused?void 0:"0")}
        @focus=${this.forwardFocus}
        ?focused=${this.focused}
        class="handle"
        color="hsl(${this.value}, 100%, 50%)"
        ?disabled=${this.disabled}
        style=${this.handlePositionStyles}
        ${b({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
      ></sp-color-handle>
      <input
        type="range"
        class="slider"
        min="0"
        max="360"
        aria-orientation=${h(this.vertical?"vertical":void 0)}
        orient=${h(this.vertical?"vertical":void 0)}
        step=${this.step}
        aria-label=${this.label}
        .value=${String(this.value)}
        aria-valuetext=${`${new Intl.NumberFormat(this.languageResolver.language,{maximumFractionDigits:0,minimumIntegerDigits:1,style:"unit",unit:"degree",unitDisplay:"narrow"}).format(this.value)}`}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @keydown=${this.handleKeydown}
      />
    `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur)}}r([o({type:Boolean,reflect:!0})],ColorSlider.prototype,"disabled",2),r([o({type:Boolean,reflect:!0})],ColorSlider.prototype,"focused",2),r([d(".handle")],ColorSlider.prototype,"handle",2),r([d(".gradient")],ColorSlider.prototype,"gradient",2),r([o({type:String})],ColorSlider.prototype,"label",2),r([o({type:Boolean,reflect:!0})],ColorSlider.prototype,"vertical",2),r([o({type:Number})],ColorSlider.prototype,"value",1),r([o({type:String})],ColorSlider.prototype,"color",1),r([o({type:Number})],ColorSlider.prototype,"step",2),r([d("input")],ColorSlider.prototype,"input",2);
//# sourceMappingURL=ColorSlider.js.map
