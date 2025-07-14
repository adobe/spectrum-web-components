"use strict";var y=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var n=(v,c,e,i)=>{for(var t=i>1?void 0:i?C(c,e):c,o=v.length-1,r;o>=0;o--)(r=v[o])&&(t=(i?r(c,e,t):r(t))||t);return i&&t&&y(c,e,t),t};import{html as P}from"@spectrum-web-components/base";import{ifDefined as R}from"@spectrum-web-components/base/src/directives.js";import{property as u,query as b}from"@spectrum-web-components/base/src/decorators.js";import{streamingListener as E}from"@spectrum-web-components/base/src/streaming-listener.js";import{Focusable as D}from"@spectrum-web-components/shared/src/focusable.js";import"@spectrum-web-components/color-handle/sp-color-handle.js";import{ColorController as S}from"@spectrum-web-components/reactive-controllers/src/ColorController.js";import{LanguageResolutionController as L}from"@spectrum-web-components/reactive-controllers/src/LanguageResolution.js";import T from"./color-wheel.css.js";export class ColorWheel extends D{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.step=1;this.languageResolver=new L(this);this.colorController=new S(this,{manageAs:"hsv"});this._altered=0;this._pointerDown=!1}static get styles(){return[T]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e}get color(){return this.colorController.colorValue}set color(e){this.colorController.color=e}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,this.altered*10)}get focusElement(){return this.input}handleKeydown(e){const{key:i}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length;let t=0;switch(i){case"ArrowUp":t=this.step;break;case"ArrowDown":t=-this.step;break;case"ArrowLeft":t=this.step*(this.isLTR?-1:1);break;case"ArrowRight":t=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault(),this.value=(360+this.value+t)%360,this.colorController.savePreviousColor(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor()}handleInput(e){const{valueAsNumber:i}=e.target;this.value=i}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}focus(e={}){super.focus(e),this.forwardFocus()}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus()}handleFocus(){this.focused=!0}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1)}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0)}handlePointermove(e){this.value=this.calculateHandlePosition(e),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}))}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1)}calculateHandlePosition(e){if(!this.boundingClientRect)return this.value;const i=this.boundingClientRect,{width:t,height:o,left:r,top:h}=i,s=r+t/2,a=h+o/2,d=e.clientX-s,l=e.clientY-a,p=Math.atan2(l,d)*180/Math.PI;return(360+(360+(this.isLTR?p:180-p)))%360}handleGradientPointerdown(e){if(e.button!==0||e.target.classList.contains("innerCircle"))return;e.stopPropagation(),e.preventDefault();const{button:i,pointerId:t,pointerType:o}=e;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:i,pointerId:t,pointerType:o})),this.handlePointermove(e)}calculateStyleData(){const{width:e=160}=this.boundingClientRect||{},i=getComputedStyle(this),t=parseFloat(i.getPropertyValue("--_border-width")),o=parseFloat(i.getPropertyValue("--_track-width")),r=e/2,h=e-t*2,s=r-t,a=r-o,d=a*2,l=a+t,p=d+t*2,m=`"M ${r} ${r} m -${r} 0 a ${r} ${r} 0 1 0 ${e} 0 a ${r} ${r} 0 1 0 -${e} 0 M ${r} ${r} m -${a} 0 a ${a} ${a} 0 1 0 ${d} 0 a ${a} ${a} 0 1 0 -${d} 0"`,f=`"M ${s} ${s} m -${s} 0 a ${s} ${s} 0 1 0 ${h} 0 a ${s} ${s} 0 1 0 -${h} 0 M ${s} ${s} m -${l} 0 a ${l} ${l} 0 1 0 ${p} 0 a ${l} ${l} 0 1 0 -${p} 0"`,g=(this.isLTR?1:-1)*(r-o/2)*Math.cos(this.value*Math.PI/180),$=(r-o/2)*Math.sin(this.value*Math.PI/180),w=`transform: translate(${g}px, ${$}px);`;return{clipPath:f,clipPathBorders:m,diameter:e,handleLocationStyles:w}}render(){const{clipPath:e,clipPathBorders:i,diameter:t,handleLocationStyles:o}=this.calculateStyleData();return P`
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
                tabindex=${R(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${o}
                ${E({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur)}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver(i=>{for(const t of i)this.boundingClientRect=t.contentRect;this.requestUpdate()})),(e=this.observer)==null||e.observe(this)}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback()}}n([u({type:String,reflect:!0})],ColorWheel.prototype,"dir",2),n([u({type:Boolean,reflect:!0})],ColorWheel.prototype,"disabled",2),n([u({type:Boolean,reflect:!0})],ColorWheel.prototype,"focused",2),n([b(".handle")],ColorWheel.prototype,"handle",2),n([u({type:String})],ColorWheel.prototype,"label",2),n([u({type:Number})],ColorWheel.prototype,"step",2),n([u({type:Number})],ColorWheel.prototype,"value",1),n([u({type:String})],ColorWheel.prototype,"color",1),n([b("input")],ColorWheel.prototype,"input",2);
//# sourceMappingURL=ColorWheel.js.map
