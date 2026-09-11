"use strict";var w=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var c=(v,p,e,i)=>{for(var t=i>1?void 0:i?P(p,e):p,o=v.length-1,r;o>=0;o--)(r=v[o])&&(t=(i?r(p,e,t):r(t))||t);return i&&t&&w(p,e,t),t};import{html as C}from"@spectrum-web-components/base";import{property as d,query as b}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as E}from"@spectrum-web-components/base/src/directives.js";import{streamingListener as D}from"@spectrum-web-components/base/src/streaming-listener.js";import{ColorController as R}from"@spectrum-web-components/reactive-controllers/src/ColorController.js";import{LanguageResolutionController as S}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import{Focusable as L}from"@spectrum-web-components/shared/src/focusable.js";import"@spectrum-web-components/color-handle/sp-color-handle.js";import I from"./color-wheel.css.js";export class ColorWheel extends L{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.step=1;this.languageResolver=new S(this);this.colorController=new R(this,{manageAs:"hsv"});this._baseStep=1;this._altered=0;this._trackWidth=0;this._pointerDown=!1}static get styles(){return[I]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e}get color(){return this.colorController.colorValue}set color(e){this.colorController.color=e}set altered(e){this._altered=e}get effectiveStep(){return this._altered>0?this._baseStep*10:this._baseStep}get focusElement(){return this.input}handleKeydown(e){const{key:i}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length;let t=0;switch(i){case"ArrowUp":t=this.effectiveStep;break;case"ArrowDown":t=-this.effectiveStep;break;case"ArrowLeft":t=this.effectiveStep*(this.dir==="ltr"?-1:1);break;case"ArrowRight":t=this.effectiveStep*(this.dir==="ltr"?1:-1);break;default:return}e.preventDefault(),this.value=(360+this.value+t)%360,this.colorController.savePreviousColor(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor()}handleInput(e){const{valueAsNumber:i}=e.target;this.value=i}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocus(){this.focused=!0}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.cacheLayoutData(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0)}handlePointermove(e){this.value=this.calculateHandlePosition(e),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1)}calculateHandlePosition(e){if(!this.boundingClientRect)return this.value;const i=this.boundingClientRect,{width:t,height:o,left:r,top:n}=i,s=r+t/2,a=n+o/2,l=e.clientX-s,u=e.clientY-a,h=Math.atan2(u,l)*180/Math.PI;return(360+(360+(this.dir==="ltr"?h:180-h)))%360}isPointerInRing(e){const{width:i,height:t,left:o,top:r}=this.boundingClientRect,n=i/2;if(!n)return!1;const s=e.clientX-(o+n),a=e.clientY-(r+t/2),l=Math.sqrt(s*s+a*a);return this._trackWidth>0?l>=n-this._trackWidth&&l<=n:l<=n}handleGradientPointerdown(e){if(e.button!==0||e.target.classList.contains("innerCircle")||(this.cacheLayoutData(),!this.isPointerInRing(e)))return;e.stopPropagation(),e.preventDefault();const{button:i,pointerId:t,pointerType:o}=e;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:i,pointerId:t,pointerType:o})),this.handlePointermove(e)}calculateStyleData(){const{width:e=160}=this.boundingClientRect||{},i=getComputedStyle(this),t=parseFloat(i.getPropertyValue("--_border-width")),o=parseFloat(i.getPropertyValue("--_track-width")),r=e/2,n=e-t*2,s=r-t,a=r-o,l=a*2,u=a+t,h=l+t*2,m=`"M ${r} ${r} m -${r} 0 a ${r} ${r} 0 1 0 ${e} 0 a ${r} ${r} 0 1 0 -${e} 0 M ${r} ${r} m -${a} 0 a ${a} ${a} 0 1 0 ${l} 0 a ${a} ${a} 0 1 0 -${l} 0"`,f=`"M ${s} ${s} m -${s} 0 a ${s} ${s} 0 1 0 ${n} 0 a ${s} ${s} 0 1 0 -${n} 0 M ${s} ${s} m -${u} 0 a ${u} ${u} 0 1 0 ${h} 0 a ${u} ${u} 0 1 0 -${h} 0"`,g=(this.dir==="ltr"?1:-1)*(r-o/2)*Math.cos(this.value*Math.PI/180),$=(r-o/2)*Math.sin(this.value*Math.PI/180),y=`transform: translate(${g}px, ${$}px);`;return{clipPath:f,clipPathBorders:m,diameter:e,handleLocationStyles:y}}render(){const{clipPath:e,clipPathBorders:i,diameter:t,handleLocationStyles:o}=this.calculateStyleData();return C`
      <slot
        name="gradient"
        @pointerdown=${this.handleGradientPointerdown}
        style="
                    --spectrum-colorwheel-colorarea-container-size: ${t}px;
                    --spectrum-colorwheel-height: ${t}px;
                    --spectrum-colorwheel-width: ${t}px;
                    --spectrum-colorwheel-path-borders: ${i};
                    --spectrum-colorwheel-path: ${e};
                "
      >
        <div class="inner">
          <div class="colorarea-container"></div>
        </div>
        <div class="border">
          <div class="wheel"></div>
        </div>
      </slot>

      <sp-color-handle
        tabindex=${E(this.focused?void 0:"0")}
        @focus=${this.forwardFocus}
        ?focused=${this.focused}
        class="handle"
        color="hsl(${this.value}, 100%, 50%)"
        ?disabled=${this.disabled}
        style=${o}
        ${D({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
      ></sp-color-handle>

      <input
        type="range"
        class="slider"
        aria-label=${this.label}
        min="0"
        max="360"
        step=${this.step}
        .value=${String(this.value)}
        aria-valuetext=${`${new Intl.NumberFormat(this.languageResolver.language,{maximumFractionDigits:0,minimumIntegerDigits:1,style:"unit",unit:"degree",unitDisplay:"narrow"}).format(this.value)}`}
        @input=${this.handleInput}
        @change=${this.handleChange}
        @keydown=${this.handleKeydown}
      />
    `}cacheLayoutData(){this.boundingClientRect=this.getBoundingClientRect(),this._trackWidth=parseFloat(getComputedStyle(this).getPropertyValue("--_track-width"))||0}firstUpdated(e){super.firstUpdated(e),this.cacheLayoutData(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur)}willUpdate(e){e.has("step")&&(this._baseStep=this.step)}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new ResizeObserver(()=>{requestAnimationFrame(()=>{this.cacheLayoutData(),this.requestUpdate()})})),(e=this.observer)==null||e.observe(this)}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback()}}c([d({type:Boolean,reflect:!0})],ColorWheel.prototype,"disabled",2),c([d({type:Boolean,reflect:!0})],ColorWheel.prototype,"focused",2),c([b(".handle")],ColorWheel.prototype,"handle",2),c([d({type:String})],ColorWheel.prototype,"label",2),c([d({type:Number})],ColorWheel.prototype,"step",2),c([d({type:Number})],ColorWheel.prototype,"value",1),c([d({type:String})],ColorWheel.prototype,"color",1),c([b("input")],ColorWheel.prototype,"input",2);
//# sourceMappingURL=ColorWheel.js.map
