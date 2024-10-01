import { s as streamingListener } from './streaming-listener-CmIYw2xv.js';
import { F as Focusable } from './focusable-w-VMKDtH.js';
import './sp-color-handle-yIzFs7zJ.js';
import { C as ColorController } from './Color-h42Fr28G.js';
import { L as LanguageResolutionController } from './LanguageResolution-BeoILyI5.js';
import { i } from './lit-element-BulMEkr1.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$1 } from './if-defined-DDJGFaN4.js';
import { n as n$1, d as defineElement } from './define-element-C_3bgzm7.js';
import { e } from './query-DQF6X5qW.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './focus-visible-D29Av9Xb.js';
import './sp-color-loupe-CU_59vd7.js';
import './opacity-checkerboard.css-Cz3bIIfY.js';
import './index-DII9xnLW.js';
import './base-u8Z1Hrsd.js';

const o=i`
    :host{--spectrum-colorwheel-width:var(--spectrum-color-wheel-width);--spectrum-colorwheel-min-width:var(--spectrum-color-wheel-minimum-width);--spectrum-colorwheel-height:var(--spectrum-color-wheel-width);--spectrum-colorwheel-border-color:var(--spectrum-transparent-black-200);--spectrum-colorwheel-border-width:var(--spectrum-border-width-100);--spectrum-colorwheel-fill-color-disabled:var(--spectrum-disabled-background-color);--spectrum-colorwheel-track-width:var(--spectrum-color-control-track-width);--spectrum-colorwheel-colorarea-margin:var(--spectrum-color-wheel-color-area-margin);--spectrum-colorwheel-colorhandle-position:calc(var(--spectrum-colorwheel-width)/2 - var(--spectrum-colorwheel-track-width)/2)}@media (forced-colors:active){:host{--highcontrast-colorwheel-border-color-disabled:GrayText;--highcontrast-colorwheel-fill-color-disabled:Canvas;forced-color-adjust:none}}:host{min-inline-size:var(--mod-colorwheel-min-width,var(--spectrum-colorwheel-min-width));inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));-webkit-user-select:none;user-select:none;cursor:default;--track-width:var(--mod-colorwheel-track-width,var(--spectrum-colorwheel-track-width));--border-width:var(--mod-colorwheel-border-width,var(--spectrum-colorwheel-border-width));display:block;position:relative}:host([focused]){z-index:1}:host([disabled]){pointer-events:none}:host([dragged]){z-index:1}.inner{inline-size:var(--mod-colorwheel-colorarea-container-size,var(--spectrum-colorwheel-colorarea-container-size));block-size:var(--mod-colorwheel-colorarea-container-size,var(--spectrum-colorwheel-colorarea-container-size));margin:auto;display:flex;position:absolute;inset-block:0;inset-inline:0}.colorarea-container{block-size:auto;inline-size:100%;margin:var(--mod-colorwheel-colorarea-margin,var(--spectrum-colorwheel-colorarea-margin));justify-content:center;align-items:center;display:flex}.slider{opacity:0;inline-size:100%;block-size:100%;z-index:0;pointer-events:none;margin:0;position:absolute;inset-block-start:0;inset-inline-start:0}.handle{transform:translate(var(--spectrum-colorwheel-colorhandle-position));inset-block-start:50%;inset-inline:50%}.border{background-color:var(--mod-colorwheel-border-color,var(--spectrum-colorwheel-border-color));inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));clip-path:path(evenodd,var(--mod-colorwheel-path-borders,var(--spectrum-colorwheel-path-borders)));position:relative}:host([disabled]) .border{background-color:var(--highcontrast-colorwheel-border-color-disabled,var(--mod-colorwheel-fill-color-disabled,var(--spectrum-colorwheel-fill-color-disabled)))}.wheel{inset-block:var(--spectrum-colorwheel-border-width);inset-inline:var(--spectrum-colorwheel-border-width);clip-path:path(evenodd,var(--mod-colorwheel-path,var(--spectrum-colorwheel-path)));background:conic-gradient(from 90deg,red,#ff8000,#ff0,#80ff00,#0f0,#00ff80,#0ff,#0080ff,#00f,#8000ff,#f0f,#ff0080,red);position:absolute}:host([disabled]) .wheel{pointer-events:none;background:var(--highcontrast-colorwheel-fill-color-disabled,var(--mod-colorwheel-fill-color-disabled,var(--spectrum-colorwheel-fill-color-disabled)))}:host{touch-action:none}:host(:focus){outline:none}::slotted([slot=gradient]){border-color:var(--mod-colorwheel-border-color,var(--spectrum-colorwheel-border-color));border-style:solid;border-width:var(--border-width);box-sizing:border-box;block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));z-index:0;border-radius:100%;position:relative}:host([dir=rtl]) .wheel,:host([dir=rtl]) ::slotted([slot=gradient]){transform:scaleX(-1)}
`;

var y=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var n=(v,c,e,i)=>{for(var t=i>1?void 0:i?C(c,e):c,o=v.length-1,r;o>=0;o--)(r=v[o])&&(t=(i?r(c,e,t):r(t))||t);return i&&t&&y(c,e,t),t};class ColorWheel extends Focusable{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.step=1;this.languageResolver=new LanguageResolutionController(this);this.colorController=new ColorController(this,{applyColorToState:()=>{},extractColorFromState:e=>({...e.getColor("hsl"),h:this.value}),maintains:"saturation"});this._altered=0;this._pointerDown=!1;}static get styles(){return [o]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e;}get color(){return this.colorController.color}set color(e){this.colorController.color=e;}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,this.altered*10);}get focusElement(){return this.input}handleKeydown(e){const{key:i}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length;let t=0;switch(i){case"ArrowUp":t=this.step;break;case"ArrowDown":t=-this.step;break;case"ArrowLeft":t=this.step*(this.isLTR?-1:1);break;case"ArrowRight":t=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault(),this.value=(360+this.value+t)%360,this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor();}handleInput(e){const{valueAsNumber:i}=e.target;this.value=i,this.colorController.applyColorFromState();}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));}focus(e={}){super.focus(e),this.forwardFocus();}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus();}handleFocus(){this.focused=!0;}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1);}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0);}handlePointermove(e){this.value=this.calculateHandlePosition(e),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1);}calculateHandlePosition(e){if(!this.boundingClientRect)return this.value;const i=this.boundingClientRect,{width:t,height:o,left:r,top:h}=i,s=r+t/2,a=h+o/2,d=e.clientX-s,l=e.clientY-a,p=Math.atan2(l,d)*180/Math.PI;return (360+(360+(this.isLTR?p:180-p)))%360}handleGradientPointerdown(e){if(e.button!==0||e.target.classList.contains("innerCircle"))return;e.stopPropagation(),e.preventDefault();const{button:i,pointerId:t,pointerType:o}=e;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:i,pointerId:t,pointerType:o})),this.handlePointermove(e);}calculateStyleData(){const{width:e=160}=this.boundingClientRect||{},i=getComputedStyle(this),t=parseFloat(i.getPropertyValue("--border-width")),o=parseFloat(i.getPropertyValue("--track-width")),r=e/2,h=e-t*2,s=r-t,a=r-o,d=a*2,l=a+t,p=d+t*2,m=`"M ${r} ${r} m -${r} 0 a ${r} ${r} 0 1 0 ${e} 0 a ${r} ${r} 0 1 0 -${e} 0 M ${r} ${r} m -${a} 0 a ${a} ${a} 0 1 0 ${d} 0 a ${a} ${a} 0 1 0 -${d} 0"`,f=`"M ${s} ${s} m -${s} 0 a ${s} ${s} 0 1 0 ${h} 0 a ${s} ${s} 0 1 0 -${h} 0 M ${s} ${s} m -${l} 0 a ${l} ${l} 0 1 0 ${p} 0 a ${l} ${l} 0 1 0 -${p} 0"`,g=(this.isLTR?1:-1)*(r-o/2)*Math.cos(this.value*Math.PI/180),$=(r-o/2)*Math.sin(this.value*Math.PI/180),w=`transform: translate(${g}px, ${$}px);`;return {clipPath:f,clipPathBorders:m,diameter:e,handleLocationStyles:w}}render(){const{clipPath:e,clipPathBorders:i,diameter:t,handleLocationStyles:o}=this.calculateStyleData();return x`
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
                tabindex=${o$1(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color="hsl(${this.value}, 100%, 50%)"
                ?disabled=${this.disabled}
                style=${o}
                ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur);}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver(i=>{for(const t of i)this.boundingClientRect=t.contentRect;this.requestUpdate();})),(e=this.observer)==null||e.observe(this);}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback();}}n([n$1({type:String,reflect:!0})],ColorWheel.prototype,"dir",2),n([n$1({type:Boolean,reflect:!0})],ColorWheel.prototype,"disabled",2),n([n$1({type:Boolean,reflect:!0})],ColorWheel.prototype,"focused",2),n([e(".handle")],ColorWheel.prototype,"handle",2),n([n$1({type:String})],ColorWheel.prototype,"label",2),n([n$1({type:Number})],ColorWheel.prototype,"step",2),n([n$1({type:Number})],ColorWheel.prototype,"value",1),n([n$1({type:String})],ColorWheel.prototype,"color",1),n([e("input")],ColorWheel.prototype,"input",2);

defineElement("sp-color-wheel",ColorWheel);

var colorWheel_stories = {
  title: "Color/Wheel",
  component: "sp-color-wheel"
};
const Default = () => {
  return x`
        <sp-color-wheel></sp-color-wheel>
    `;
};
const sized = () => {
  return x`
        <sp-color-wheel style="width: 300px; height: 300px;"></sp-color-wheel>
    `;
};
const wheelDisabled = () => {
  return x`
        <sp-color-wheel disabled></sp-color-wheel>
    `;
};
const canvas = () => {
  return x`
        <sp-color-wheel>
            <canvas slot="gradient"></canvas>
        </sp-color-wheel>
    `;
};
class CanvasWriter extends HTMLElement {
  constructor() {
    super();
    this.writeStatePromise = Promise.resolve(false);
    this.writeStatePromise = new Promise((res) => {
      requestAnimationFrame(() => {
        this.writeToCanvas();
        res(true);
      });
    });
  }
  writeToCanvas() {
    const { previousElementSibling } = this;
    if (previousElementSibling) {
      const canvas2 = previousElementSibling.querySelector(
        'canvas[slot="gradient"]'
      );
      if (canvas2) {
        canvas2.width = canvas2.offsetWidth;
        canvas2.height = canvas2.offsetHeight;
        const context = canvas2.getContext("2d");
        if (context) {
          context.rect(0, 0, canvas2.width, canvas2.height);
          const width = canvas2.width;
          const height = canvas2.height;
          const centerX = width / 2;
          const centerY = height / 2;
          const ringSize = centerX - 18;
          for (let i = 0; i < 360; i += Math.PI / 8) {
            const rad = i * (2 * Math.PI) / 360;
            context.strokeStyle = `hsla(${i}, 100%, 50%, 1.0)`;
            context.beginPath();
            context.moveTo(
              centerX + ringSize * Math.cos(rad),
              centerY + ringSize * Math.sin(rad)
            );
            context.lineTo(
              centerX + centerX * Math.cos(rad),
              centerY + centerY * Math.sin(rad)
            );
            context.stroke();
          }
        }
      }
    }
  }
  get updateComplete() {
    return this.writeStatePromise;
  }
}
customElements.define("wheel-canvas-writer", CanvasWriter);
canvas.decorators = [
  (story) => {
    return x`
            ${story()}
            <wheel-canvas-writer></wheel-canvas-writer>
        `;
  }
];
const __namedExportsOrder = ['Default', 'sized', 'wheelDisabled', 'canvas'];

export { Default, __namedExportsOrder, canvas, colorWheel_stories as default, sized, wheelDisabled };
