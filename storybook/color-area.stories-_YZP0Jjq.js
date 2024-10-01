import './sp-color-slider-CI5f5ugE.js';
import { s as streamingListener } from './streaming-listener-CmIYw2xv.js';
import './sp-color-handle-yIzFs7zJ.js';
import { C as ColorController } from './Color-h42Fr28G.js';
import { L as LanguageResolutionController } from './LanguageResolution-BeoILyI5.js';
import { i as isAndroid, a as isIOS } from './platform-r3Lf9REX.js';
import { i } from './lit-element-BulMEkr1.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { o as o$1 } from './style-map-DtKTc8KS.js';
import { o as o$2 } from './if-defined-DDJGFaN4.js';
import { e } from './query-DQF6X5qW.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './opacity-checkerboard.css-Cz3bIIfY.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './directive-Bn5c4u4M.js';
import './sp-color-loupe-CU_59vd7.js';
import './index-DII9xnLW.js';
import './base-u8Z1Hrsd.js';

const o=i`
    :host{--spectrum-colorarea-border-radius:var(--spectrum-color-area-border-rounding);--spectrum-colorarea-border-color:#0000001a;--spectrum-colorarea-disabled-background-color:var(--spectrum-disabled-background-color);--spectrum-colorarea-border-width:var(--spectrum-color-area-border-width);--spectrum-colorarea-height:var(--spectrum-color-area-height);--spectrum-colorarea-width:var(--spectrum-color-area-width);--spectrum-colorarea-min-width:var(--spectrum-color-area-minimum-width);--spectrum-colorarea-min-height:var(--spectrum-color-area-minimum-height)}@media (forced-colors:active){:host{--highcontrast-colorarea-border-color-disabled:GrayText;--highcontrast-colorarea-border-color:Canvas;--highcontrast-colorarea-fill-color-disabled:Canvas}.gradient,:host([disabled]){forced-color-adjust:none}}:host{cursor:default;-webkit-user-select:none;user-select:none;min-inline-size:var(--mod-colorarea-min-width,var(--spectrum-colorarea-min-width));min-block-size:var(--mod-colorarea-min-height,var(--spectrum-colorarea-min-height));inline-size:var(--mod-colorarea-width,var(--spectrum-colorarea-width));block-size:var(--mod-colorarea-height,var(--spectrum-colorarea-height));box-sizing:border-box;border-radius:var(--mod-colorarea-border-radius,var(--spectrum-colorarea-border-radius));border:var(--mod-colorarea-border-width,var(--spectrum-colorarea-border-width))solid var(--highcontrast-colorarea-border-color,var(--mod-colorarea-border-color,var(--spectrum-colorarea-border-color)));display:inline-block;position:relative}:host([focused]){z-index:1}:host([disabled]){pointer-events:none;background:var(--highcontrast-colorarea-fill-color-disabled,var(--mod-colorarea-disabled-background-color,var(--spectrum-colorarea-disabled-background-color)));border:var(--mod-colorarea-border-width,var(--spectrum-colorarea-border-width))solid var(--highcontrast-colorarea-border-color-disabled)}:host([disabled]) .gradient{display:none}.handle{transform:translate(calc(var(--mod-colorarea-width,var(--spectrum-colorarea-width)) - var(--spectrum-colorarea-border-width)));inset-block-start:0}.handle:dir(rtl),:host([dir=rtl]) .handle{inset-inline-end:0}.gradient{inline-size:100%;block-size:100%;border-radius:var(--mod-colorarea-border-radius,var(--spectrum-colorarea-border-radius))}.slider{opacity:0;inline-size:100%;block-size:100%;z-index:0;pointer-events:none;margin:0;position:absolute;inset-block-start:0;inset-inline-start:0}:host{touch-action:none}:host:before{pointer-events:none}.gradient{overflow:hidden}.handle{transform:translate(var(--spectrum-colorarea-default-width),0)}::slotted(*){width:100%;height:100%}:host([dir=rtl]) .gradient{transform:scaleX(-1)}.slider[orient=vertical]{appearance:slider-vertical}.slider:focus{z-index:1}.fieldset{border:0;margin:0;padding:0}
`;

var m=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var s=(c,u,e,t)=>{for(var i=t>1?void 0:t?y(u,e):u,r=c.length-1,n;r>=0;r--)(n=c[r])&&(i=(t?n(u,e,i):n(i))||i);return t&&i&&m(u,e,i),i};class ColorArea extends SpectrumElement{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.labelX="saturation";this.labelY="luminosity";this.languageResolver=new LanguageResolutionController(this);this.colorController=new ColorController(this,{extractColorFromState:()=>({h:this.hue,s:this.x,v:this.y}),applyColorToState:({s:e,v:t})=>{this._x=e,this._y=t,this.requestUpdate();}});this.activeAxis="x";this._x=1;this._y=1;this.step=.01;this.altered=0;this.activeKeys=new Set;this._valueChanged=!1;this._pointerDown=!1;}static get styles(){return [o]}get hue(){return this.colorController.hue}set hue(e){this.colorController.hue=e;}get value(){return this.colorController.color}get color(){return this.colorController.color}set color(e){this.colorController.color=e;}get x(){return this._x}set x(e){if(e===this.x)return;const t=this.x;this._x=e,this.inputX&&(this.inputX.value=e.toString(),this._x=this.inputX.valueAsNumber),this.requestUpdate("x",t),this.colorController.applyColorFromState();}get y(){return this._y}set y(e){if(e===this.y)return;const t=this.y;this._y=e,this.inputY&&(this.inputY.value=e.toString(),this._y=this.inputY.valueAsNumber),this.requestUpdate("y",t),this.colorController.applyColorFromState();}focus(e={}){super.focus(e),this.forwardFocus();}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.activeAxis==="x"?this.inputX.focus():this.inputY.focus();}handleFocus(){this.focused=!0,this._valueChanged=!1;}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1,this._valueChanged=!1);}handleKeydown(e){const{code:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length,(t.search("Arrow")===0||t.search("Page")===0||t.search("Home")===0||t.search("End")===0)&&(e.preventDefault(),this.activeKeys.add(t),this.handleKeypress());}handleKeypress(){let e=0,t=0;const i=Math.max(this.step,this.altered*5*this.step);this.activeKeys.forEach(r=>{switch(r){case"ArrowUp":t=i;break;case"ArrowDown":t=i*-1;break;case"ArrowLeft":e=this.step*(this.isLTR?-1:1);break;case"ArrowRight":e=this.step*(this.isLTR?1:-1);break;case"PageUp":t=i*10;break;case"PageDown":t=i*-10;break;case"Home":e=i*(this.isLTR?-10:10);break;case"End":e=i*(this.isLTR?10:-10);break;}}),e!=0?(this.activeAxis="x",this.inputX.focus()):t!=0&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+e,0)),this.y=Math.min(1,Math.max(this.y+t,0)),this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),(e!=0||t!=0)&&(this._valueChanged=!0,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor());}handleKeyup(e){e.preventDefault();const{code:t}=e;this.activeKeys.delete(t);}handleInput(e){const{valueAsNumber:t,name:i}=e.target;this[i]=t,this.colorController.applyColorFromState();}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0);}handlePointermove(e){const[t,i]=this.calculateHandlePosition(e);this._valueChanged=!1,this.x=t,this.y=1-i,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerup(e){e.preventDefault(),this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId);const t=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),e.pointerType==="mouse"&&(this.focused=!1),t||this.colorController.restorePreviousColor();}calculateHandlePosition(e){if(!this.boundingClientRect)return [this.x,this.y];const t=this.boundingClientRect,i=t.left,r=t.top,n=e.clientX,d=e.clientY,a=t.width,l=t.height,h=Math.max(0,Math.min(1,(n-i)/a)),p=Math.max(0,Math.min(1,(d-r)/l));return [this.isLTR?h:1-h,p]}handleAreaPointerdown(e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e));}render(){const{width:e=0,height:t=0}=this.boundingClientRect||{},i=isAndroid()||isIOS(),n="Color Picker",d=o$2(i?void 0:"2d slider"),a=this.labelX,l=this.labelY,h=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.x),p=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.y),f={background:`linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);`};return x`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style=${o$1(f)}
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${o$2(this.focused?void 0:"0")}
                @focus=${this.forwardFocus}
                ?focused=${this.focused}
                class="handle"
                color=${this.colorController.getHslString()}
                ?disabled=${this.disabled}
                style=${`transform: translate(${(this.isLTR?this.x:1-this.x)*e}px, ${t-this.y*t}px);`}
                ${streamingListener({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup]})}
            ></sp-color-handle>

            <fieldset
                class="fieldset"
                aria-label=${o$2(i?n:void 0)}
            >
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="x"
                        aria-label=${i?a:`${a} ${n}`}
                        aria-roledescription=${d}
                        aria-orientation="horizontal"
                        aria-valuetext=${i?h:`${h}, ${a}${this._valueChanged?"":`, ${p}, ${l}`}`}
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
                        aria-label=${i?l:`${l} ${n}`}
                        aria-roledescription=${d}
                        aria-orientation="vertical"
                        aria-valuetext=${i?p:`${p}, ${l}${this._valueChanged?"":`, ${h}, ${a}`}`}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown);}updated(e){if(super.updated(e),this.x!==this.inputX.valueAsNumber&&(this._x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this._y=this.inputY.valueAsNumber),e.has("focused")&&this.focused){const t=this.inputX.parentElement,i=this.inputY.parentElement;if(!t.shadowRoot&&!i.shadowRoot){t.attachShadow({mode:"open"}),i.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,i.shadowRoot.innerHTML=r;}}}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver(t=>{for(const i of t)this.boundingClientRect=i.contentRect;this.requestUpdate();})),(e=this.observer)==null||e.observe(this);}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback();}}s([n({type:String,reflect:!0})],ColorArea.prototype,"dir",2),s([n({type:Boolean,reflect:!0})],ColorArea.prototype,"disabled",2),s([n({type:Boolean,reflect:!0})],ColorArea.prototype,"focused",2),s([n({type:String,attribute:"label-x"})],ColorArea.prototype,"labelX",2),s([n({type:String,attribute:"label-y"})],ColorArea.prototype,"labelY",2),s([e(".handle")],ColorArea.prototype,"handle",2),s([n({type:Number})],ColorArea.prototype,"hue",1),s([n({type:String})],ColorArea.prototype,"value",1),s([n({type:String})],ColorArea.prototype,"color",1),s([n({attribute:!1})],ColorArea.prototype,"activeAxis",2),s([n({type:Number})],ColorArea.prototype,"x",1),s([n({type:Number})],ColorArea.prototype,"y",1),s([n({type:Number})],ColorArea.prototype,"step",2),s([e('[name="x"]')],ColorArea.prototype,"inputX",2),s([e('[name="y"]')],ColorArea.prototype,"inputY",2);

defineElement("sp-color-area",ColorArea);

var colorArea_stories = {
  title: "Color/Area",
  component: "sp-color-area",
  argTypes: {
    onInput: { action: "input" },
    onChange: { action: "change" },
    color: {
      name: "color",
      type: { name: "ColorValue", required: "true" },
      description: "The color displayed by the ColorArea.",
      table: {
        type: { summary: "ColorValue" },
        defaultValue: { summary: "" }
      },
      control: "text"
    }
  }
};
const Default = ({ onChange, onInput }) => {
  return x`
        <sp-color-area
            @input=${({ target }) => {
    const next = target.nextElementSibling;
    next.textContent = target.color;
    next.style.color = target.color;
    onInput(target.value);
  }}
            @change=${({ target }) => {
    onChange(target.value);
  }}
        ></sp-color-area>
        <div style="color: #ff0000" aria-live="off">#ff0000</div>
    `;
};
const joint = () => {
  return x`
        <div>
            <sp-color-area
                color="hsv (120 0% 100%)"
                @input=${({ target }) => {
    const next = target.nextElementSibling;
    const display = next.nextElementSibling;
    display.textContent = target.color;
    display.style.color = target.color;
    next.color = target.color;
  }}
            ></sp-color-area>
            <sp-color-slider
                color="hsv(120 0% 1)"
                @input=${({
    target: {
      color,
      previousElementSibling,
      nextElementSibling
    }
  }) => {
    previousElementSibling.color = color;
    nextElementSibling.textContent = color;
    nextElementSibling.style.color = color;
  }}
            ></sp-color-slider>
            <div style="color: hsv(120, 0, 1)">hsv(120, 0, 1)</div>
        </div>
    `;
};
const disabled = () => {
  return x`
        <sp-color-area disabled></sp-color-area>
    `;
};
const sized = () => {
  return x`
        <sp-color-area style="width: 72px; height: 72px"></sp-color-area>
    `;
};
const canvas = () => {
  return x`
        <sp-color-area>
            <canvas slot="gradient"></canvas>
        </sp-color-area>
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
          const gradB = context.createLinearGradient(
            0,
            0,
            0,
            canvas2.height
          );
          gradB.addColorStop(0, "white");
          gradB.addColorStop(1, "black");
          const gradC = context.createLinearGradient(
            0,
            0,
            canvas2.width,
            0
          );
          gradC.addColorStop(0, "hsla(0,100%,50%,0)");
          gradC.addColorStop(1, "hsla(0,100%,50%,1)");
          context.fillStyle = gradB;
          context.fillRect(0, 0, canvas2.width, canvas2.height);
          context.fillStyle = gradC;
          context.globalCompositeOperation = "multiply";
          context.fillRect(0, 0, canvas2.width, canvas2.height);
          context.globalCompositeOperation = "source-over";
        }
      }
    }
  }
  get updateComplete() {
    return this.writeStatePromise;
  }
}
customElements.define("area-canvas-writer", CanvasWriter);
canvas.decorators = [
  (story) => {
    return x`
            ${story()}
            <area-canvas-writer></area-canvas-writer>
        `;
  }
];
const __namedExportsOrder = ['Default', 'joint', 'disabled', 'sized', 'canvas'];

export { Default, __namedExportsOrder, canvas, colorArea_stories as default, disabled, joint, sized };
