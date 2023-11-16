import { s as streamingListener } from './streaming-listener-70cd7ec3.js';
import { F as Focusable } from './focusable-c7e64029.js';
import './sp-color-handle-a0c12aab.js';
import { C as ColorController } from './Color-e70ce6d0.js';
import { L as LanguageResolutionController } from './LanguageResolution-630dfe34.js';
import { i } from './lit-element-9354aa77.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import { n as n$1, d as defineElement } from './define-element-617dba69.js';
import { i as i$1 } from './query-d0113d5a.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './directive-2bb7789e.js';
import './focus-visible-03398d98.js';
import './sp-color-loupe-d1537abd.js';
import './opacity-checkerboard.css-531d5753.js';
import './base-511c8c11.js';

const o=i`
:host{--spectrum-colorwheel-width:var(--spectrum-color-wheel-width);--spectrum-colorwheel-min-width:var(--spectrum-color-wheel-minimum-width);--spectrum-colorwheel-height:var(--spectrum-color-wheel-width);--spectrum-colorwheel-border-color:var(--spectrum-transparent-black-200);--spectrum-colorwheel-border-width:var(--spectrum-border-width-100);--spectrum-colorwheel-fill-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-colorwheel-track-width:var(
--spectrum-color-control-track-width
);--spectrum-colorwheel-colorarea-margin:var(
--spectrum-color-wheel-color-area-margin
);--spectrum-colorwheel-colorhandle-position:calc(var(--spectrum-colorwheel-width)/2 - var(--spectrum-colorwheel-track-width)/2)}@media (forced-colors:active){:host{--highcontrast-colorwheel-border-color-disabled:GrayText;--highcontrast-colorwheel-fill-color-disabled:Canvas}:host{forced-color-adjust:none}}:host{--track-width:var(
--mod-colorwheel-track-width,var(--spectrum-colorwheel-track-width)
);--border-width:var(
--mod-colorwheel-border-width,var(--spectrum-colorwheel-border-width)
);block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));cursor:default;display:block;inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));min-inline-size:var(
--mod-colorwheel-min-width,var(--spectrum-colorwheel-min-width)
);position:relative;-webkit-user-select:none;user-select:none}:host([focused]){z-index:2}:host([disabled]){pointer-events:none}:host([dragged]){z-index:2}.inner{block-size:var(
--mod-colorwheel-colorarea-container-size,var(--spectrum-colorwheel-colorarea-container-size)
);display:flex;inline-size:var(
--mod-colorwheel-colorarea-container-size,var(--spectrum-colorwheel-colorarea-container-size)
);inset-block:0;inset-inline:0;margin:auto;position:absolute}.colorarea-container{align-items:center;block-size:auto;display:flex;inline-size:100%;justify-content:center;margin:var(
--mod-colorwheel-colorarea-margin,var(--spectrum-colorwheel-colorarea-margin)
)}.slider{block-size:100%;inline-size:100%;inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;pointer-events:none;position:absolute;z-index:0}.handle{inset-block-start:50%;inset-inline:50%;transform:translate(var(--spectrum-colorwheel-colorhandle-position))}.border{background-color:var(
--mod-colorwheel-border-color,var(--spectrum-colorwheel-border-color)
);block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));clip-path:path(evenodd,var(
--mod-colorwheel-path-borders,var(--spectrum-colorwheel-path-borders)
));inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));position:relative}:host([disabled]) .border{background-color:var(
--highcontrast-colorwheel-border-color-disabled,var(
--mod-colorwheel-fill-color-disabled,var(--spectrum-colorwheel-fill-color-disabled)
)
)}.wheel{background:conic-gradient(from 90deg,red,#ff8000,#ff0,#80ff00,#0f0,#00ff80,#0ff,#0080ff,#00f,#8000ff,#f0f,#ff0080,red);clip-path:path(evenodd,var(--mod-colorwheel-path,var(--spectrum-colorwheel-path)));inset-block:var(--spectrum-colorwheel-border-width);inset-inline:var(--spectrum-colorwheel-border-width);position:absolute}:host([disabled]) .wheel{background:var(
--highcontrast-colorwheel-fill-color-disabled,var(
--mod-colorwheel-fill-color-disabled,var(--spectrum-colorwheel-fill-color-disabled)
)
);pointer-events:none}:host{touch-action:none}:host(:focus){outline:none}::slotted([slot=gradient]){block-size:var(--mod-colorwheel-height,var(--spectrum-colorwheel-height));border-color:var(
--spectrum-colorwheel-border-color,var(--spectrum-alias-border-color-translucent)
);border-radius:100%;border-style:solid;border-width:var(
--spectrum-colorwheel-border-size,var(--spectrum-alias-border-size-thin)
);box-sizing:border-box;inline-size:var(--mod-colorwheel-width,var(--spectrum-colorwheel-width));position:relative;z-index:0}:host([dir=rtl]) .wheel,:host([dir=rtl]) ::slotted([slot=gradient]){transform:scaleX(-1)}
`;var M = o;

var y=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var n=(v,c,e,i)=>{for(var t=i>1?void 0:i?C(c,e):c,o=v.length-1,r;o>=0;o--)(r=v[o])&&(t=(i?r(c,e,t):r(t))||t);return i&&t&&y(c,e,t),t};class ColorWheel extends Focusable{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.label="hue";this.step=1;this.languageResolver=new LanguageResolutionController(this);this.colorController=new ColorController(this,{applyColorToState:()=>{},extractColorFromState:e=>({...e.getColor("hsl"),h:this.value}),maintains:"saturation"});this._altered=0;this._pointerDown=!1;}static get styles(){return [M]}get value(){return this.colorController.hue}set value(e){this.colorController.hue=e;}get color(){return this.colorController.color}set color(e){this.colorController.color=e;}get altered(){return this._altered}set altered(e){this._altered=e,this.step=Math.max(1,this.altered*10);}get focusElement(){return this.input}handleKeydown(e){const{key:i}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length;let t=0;switch(i){case"ArrowUp":t=this.step;break;case"ArrowDown":t=-this.step;break;case"ArrowLeft":t=this.step*(this.isLTR?-1:1);break;case"ArrowRight":t=this.step*(this.isLTR?1:-1);break;default:return}e.preventDefault(),this.value=(360+this.value+t)%360,this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor();}handleInput(e){const{valueAsNumber:i}=e.target;this.value=i,this.colorController.applyColorFromState();}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));}focus(e={}){super.focus(e),this.forwardFocus();}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.input.focus();}handleFocus(){this.focused=!0;}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1);}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0);}handlePointermove(e){this.value=this.calculateHandlePosition(e),this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerup(e){this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor(),this.focus(),e.pointerType==="mouse"&&(this.focused=!1);}calculateHandlePosition(e){if(!this.boundingClientRect)return this.value;const i=this.boundingClientRect,{width:t,height:o,left:r,top:h}=i,s=r+t/2,a=h+o/2,d=e.clientX-s,l=e.clientY-a,p=Math.atan2(l,d)*180/Math.PI;return (360+(360+(this.isLTR?p:180-p)))%360}handleGradientPointerdown(e){if(e.button!==0||e.target.classList.contains("innerCircle"))return;e.stopPropagation(),e.preventDefault();const{button:i,pointerId:t,pointerType:o}=e;this.handle.dispatchEvent(new PointerEvent("pointerdown",{button:i,pointerId:t,pointerType:o})),this.handlePointermove(e);}calculateStyleData(){const{width:e=160}=this.boundingClientRect||{},i=getComputedStyle(this),t=parseFloat(i.getPropertyValue("--border-width")),o=parseFloat(i.getPropertyValue("--track-width")),r=e/2,h=e-t*2,s=r-t,a=r-o,d=a*2,l=a+t,p=d+t*2,m=`"M ${r} ${r} m -${r} 0 a ${r} ${r} 0 1 0 ${e} 0 a ${r} ${r} 0 1 0 -${e} 0 M ${r} ${r} m -${a} 0 a ${a} ${a} 0 1 0 ${d} 0 a ${a} ${a} 0 1 0 -${d} 0"`,f=`"M ${s} ${s} m -${s} 0 a ${s} ${s} 0 1 0 ${h} 0 a ${s} ${s} 0 1 0 -${h} 0 M ${s} ${s} m -${l} 0 a ${l} ${l} 0 1 0 ${p} 0 a ${l} ${l} 0 1 0 -${p} 0"`,g=(this.isLTR?1:-1)*(r-o/2)*Math.cos(this.value*Math.PI/180),$=(r-o/2)*Math.sin(this.value*Math.PI/180),w=`transform: translate(${g}px, ${$}px);`;return {clipPath:f,clipPathBorders:m,diameter:e,handleLocationStyles:w}}render(){const{clipPath:e,clipPathBorders:i,diameter:t,handleLocationStyles:o}=this.calculateStyleData();return x`
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
                tabindex=${l(this.focused?void 0:"0")}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur);}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver(i=>{for(const t of i)this.boundingClientRect=t.contentRect;this.requestUpdate();})),(e=this.observer)==null||e.observe(this);}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback();}}n([n$1({type:String,reflect:!0})],ColorWheel.prototype,"dir",2),n([n$1({type:Boolean,reflect:!0})],ColorWheel.prototype,"disabled",2),n([n$1({type:Boolean,reflect:!0})],ColorWheel.prototype,"focused",2),n([i$1(".handle")],ColorWheel.prototype,"handle",2),n([n$1({type:String})],ColorWheel.prototype,"label",2),n([n$1({type:Number})],ColorWheel.prototype,"step",2),n([n$1({type:Number})],ColorWheel.prototype,"value",1),n([n$1({type:String})],ColorWheel.prototype,"color",1),n([i$1("input")],ColorWheel.prototype,"input",2);

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
