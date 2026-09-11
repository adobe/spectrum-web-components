"use strict";var m=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var s=(p,d,e,t)=>{for(var i=t>1?void 0:t?g(d,e):d,r=p.length-1,o;r>=0;r--)(o=p[r])&&(i=(t?o(d,e,i):o(i))||i);return t&&i&&m(d,e,i),i};import{html as y,SpectrumElement as w}from"@spectrum-web-components/base";import{property as n,query as b}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as v}from"@spectrum-web-components/base/src/directives.js";import{streamingListener as C}from"@spectrum-web-components/base/src/streaming-listener.js";import{ColorController as $}from"@spectrum-web-components/reactive-controllers/src/ColorController.js";import{LanguageResolutionController as x}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import{isAndroid as E,isIOS as R}from"@spectrum-web-components/shared/src/platform.js";import"@spectrum-web-components/color-handle/sp-color-handle.js";import P from"./color-area.css.js";export class ColorArea extends w{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.labelX="saturation";this.labelY="luminosity";this.languageResolver=new x(this);this.colorController=new $(this,{manageAs:"hsv"});this.activeAxis="x";this.step=.01;this.altered=0;this.activeKeys=new Set;this._valueChanged=!1;this._pointerDown=!1}static get styles(){return[P]}get hue(){return this.colorController.hue}set hue(e){this.colorController.hue=e}get value(){return this.colorController.colorValue}get color(){return this.colorController.colorValue}set color(e){this.colorController.color=e}get x(){return this.colorController.color.hsv.s/100}set x(e){if(e===this.x)return;const t=this.x;this.inputX?(this.inputX.value=e.toString(),this.colorController.color.set("s",this.inputX.valueAsNumber*100)):this.colorController.color.set("s",e*100),this.requestUpdate("x",t)}get y(){return this.colorController.color.hsv.v/100}set y(e){if(e===this.y)return;const t=this.y;this.inputY&&(this.inputY.value=e.toString(),this.colorController.color.set("v",this.inputY.valueAsNumber*100)),this.requestUpdate("y",t)}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.activeAxis==="x"?this.inputX.focus():this.inputY.focus()}handleFocus(){this.focused=!0,this._valueChanged=!1}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1,this._valueChanged=!1)}handleKeydown(e){const{code:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length,(t.search("Arrow")===0||t.search("Page")===0||t.search("Home")===0||t.search("End")===0)&&(e.preventDefault(),this.activeKeys.add(t),this.handleKeypress())}handleKeypress(){let e=0,t=0;const i=Math.max(this.step,this.altered*5*this.step);this.activeKeys.forEach(r=>{switch(r){case"ArrowUp":t=i;break;case"ArrowDown":t=i*-1;break;case"ArrowLeft":e=this.step*(this.dir==="ltr"?-1:1);break;case"ArrowRight":e=this.step*(this.dir==="ltr"?1:-1);break;case"PageUp":t=i*10;break;case"PageDown":t=i*-10;break;case"Home":e=i*(this.dir==="ltr"?-10:10);break;case"End":e=i*(this.dir==="ltr"?10:-10);break;default:break}}),e!=0?(this.activeAxis="x",this.inputX.focus()):t!=0&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+e,0)),this.y=Math.min(1,Math.max(this.y+t,0)),this.colorController.savePreviousColor(),(e!=0||t!=0)&&(this._valueChanged=!0,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor())}handleKeyup(e){e.preventDefault();const{code:t}=e;this.activeKeys.delete(t)}handleInput(e){const{valueAsNumber:t,name:i}=e.target;this[i]=t}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))}getContentBoundingRect(){const e=this.getBoundingClientRect(),t=getComputedStyle(this),i=parseFloat(t.borderLeftWidth),r=parseFloat(t.borderTopWidth),o=parseFloat(t.borderRightWidth),a=parseFloat(t.borderBottomWidth);return new DOMRect(e.left+i,e.top+r,e.width-i-o,e.height-r-a)}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getContentBoundingRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0)}handlePointermove(e){const[t,i]=this.calculateHandlePosition(e);this._valueChanged=!1,this.x=t,this.y=i,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){e.preventDefault(),this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId);const t=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),e.pointerType==="mouse"&&(this.focused=!1),t||this.colorController.restorePreviousColor()}calculateHandlePosition(e){if(!this.boundingClientRect)return[this.x,this.y];const t=this.boundingClientRect,i=t.left,r=t.top,o=e.clientX,a=e.clientY,l=t.width,h=t.height,u=Math.max(0,Math.min(1,(o-i)/l)),c=Math.max(0,Math.min(1,(a-r)/h));return[this.dir==="ltr"?u:1-u,1-c]}handleAreaPointerdown(e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e))}render(){const{width:e=0,height:t=0}=this.boundingClientRect||{},i=E()||R(),o="Color Picker",a=v(i?void 0:"2d slider"),l=this.labelX,h=this.labelY,u=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.x),c=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.y),f={background:`linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);`};return y`
      <div
        @pointerdown=${this.handleAreaPointerdown}
        class="gradient"
        style="background: ${f.background};"
      >
        <slot name="gradient"></slot>
      </div>

      <sp-color-handle
        tabindex=${v(this.focused?void 0:"0")}
        @focus=${this.forwardFocus}
        ?focused=${this.focused}
        class="handle"
        color=${this.colorController.getHslString()}
        ?disabled=${this.disabled}
        style=${`transform: translate(${(this.dir==="ltr"?this.x:1-this.x)*e}px, ${t-this.y*t}px);`}
        ${C({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
      ></sp-color-handle>

      <fieldset
        class="fieldset"
        aria-label=${v(i?o:void 0)}
      >
        <div role="presentation">
          <input
            type="range"
            class="slider"
            name="x"
            aria-label=${i?l:`${l} ${o}`}
            aria-roledescription=${a}
            aria-orientation="horizontal"
            aria-valuetext=${i?u:`${u}, ${l}${this._valueChanged?"":`, ${c}, ${h}`}`}
            min="0"
            max="1"
            step=${this.step}
            tabindex="-1"
            .value=${String(this.x)}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
        </div>
        <div role="presentation">
          <input
            type="range"
            class="slider"
            name="y"
            aria-label=${i?h:`${h} ${o}`}
            aria-roledescription=${a}
            aria-orientation="vertical"
            aria-valuetext=${i?c:`${c}, ${h}${this._valueChanged?"":`, ${u}, ${l}`}`}
            orient="vertical"
            min="0"
            max="1"
            step=${this.step}
            tabindex="-1"
            .value=${String(this.y)}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
        </div>
      </fieldset>
    `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getContentBoundingRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown)}updated(e){if(super.updated(e),this.x!==this.inputX.valueAsNumber&&this.colorController.color.set("s",this.inputX.valueAsNumber*100),this.y!==this.inputY.valueAsNumber&&this.colorController.color.set("v",this.inputY.valueAsNumber*100),e.has("focused")&&this.focused){const t=this.inputX.parentElement,i=this.inputY.parentElement;if(!t.shadowRoot&&!i.shadowRoot){t.attachShadow({mode:"open"}),i.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,i.shadowRoot.innerHTML=r}}}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver(t=>{this.boundingClientRect=this.getContentBoundingRect(),this.requestUpdate()})),(e=this.observer)==null||e.observe(this)}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback()}}s([n({type:Boolean,reflect:!0})],ColorArea.prototype,"disabled",2),s([n({type:Boolean,reflect:!0})],ColorArea.prototype,"focused",2),s([n({type:String,attribute:"label-x"})],ColorArea.prototype,"labelX",2),s([n({type:String,attribute:"label-y"})],ColorArea.prototype,"labelY",2),s([b(".handle")],ColorArea.prototype,"handle",2),s([n({type:Number})],ColorArea.prototype,"hue",1),s([n({type:String})],ColorArea.prototype,"value",1),s([n({type:String})],ColorArea.prototype,"color",1),s([n({attribute:!1})],ColorArea.prototype,"activeAxis",2),s([n({type:Number})],ColorArea.prototype,"x",1),s([n({type:Number})],ColorArea.prototype,"y",1),s([n({type:Number})],ColorArea.prototype,"step",2),s([b('[name="x"]')],ColorArea.prototype,"inputX",2),s([b('[name="y"]')],ColorArea.prototype,"inputY",2);
//# sourceMappingURL=ColorArea.js.map
