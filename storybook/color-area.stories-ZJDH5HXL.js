import './sp-color-slider-_lNrprD4.js';
import { s as streamingListener } from './streaming-listener-99YRN1c8.js';
import './sp-color-handle-S2d57ovd.js';
import { C as ColorController } from './Color-Y79G7Zyd.js';
import { L as LanguageResolutionController } from './LanguageResolution-433GhF-m.js';
import { a as isAndroid, b as isIOS } from './platform-c1C9ET3y.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-2O4ZhTAw.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import { i as i$1 } from './query-JMOstM_r.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './opacity-checkerboard.css-uDCNYB6s.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './directive-C1gRZbRe.js';
import './sp-color-loupe-M3KmMpTh.js';
import './base-STdhtiz1.js';

const o=i`
:host{--spectrum-colorarea-border-radius:var(
--spectrum-color-area-border-rounding
);--spectrum-colorarea-border-color:#0000001a;--spectrum-colorarea-disabled-background-color:var(
--spectrum-disabled-background-color
);--spectrum-colorarea-border-width:var(--spectrum-color-area-border-width);--spectrum-colorarea-height:var(--spectrum-color-area-height);--spectrum-colorarea-width:var(--spectrum-color-area-width);--spectrum-colorarea-min-width:var(--spectrum-color-area-minimum-width);--spectrum-colorarea-min-height:var(--spectrum-color-area-minimum-height)}@media (forced-colors:active){:host{--highcontrast-colorarea-border-color-disabled:GrayText;--highcontrast-colorarea-border-color:Canvas;--highcontrast-colorarea-fill-color-disabled:Canvas}:host([disabled]){forced-color-adjust:none}.gradient{forced-color-adjust:none}}:host{block-size:var(--mod-colorarea-height,var(--spectrum-colorarea-height));border:var(
--mod-colorarea-border-width,var(--spectrum-colorarea-border-width)
) solid var(
--highcontrast-colorarea-border-color,var(
--mod-colorarea-border-color,var(--spectrum-colorarea-border-color)
)
);border-radius:var(
--mod-colorarea-border-radius,var(--spectrum-colorarea-border-radius)
);box-sizing:border-box;cursor:default;display:inline-block;inline-size:var(--mod-colorarea-width,var(--spectrum-colorarea-width));min-block-size:var(
--mod-colorarea-min-height,var(--spectrum-colorarea-min-height)
);min-inline-size:var(
--mod-colorarea-min-width,var(--spectrum-colorarea-min-width)
);position:relative;-webkit-user-select:none;user-select:none}:host([focused]){z-index:2}:host([disabled]){background:var(
--highcontrast-colorarea-fill-color-disabled,var(
--mod-colorarea-disabled-background-color,var(--spectrum-colorarea-disabled-background-color)
)
);border:var(
--mod-colorarea-border-width,var(--spectrum-colorarea-border-width)
) solid var(--highcontrast-colorarea-border-color-disabled);pointer-events:none}:host([disabled]) .gradient{display:none}.handle{inset-block-start:0;transform:translate(calc(var(--mod-colorarea-width, var(--spectrum-colorarea-width)) - var(--spectrum-colorarea-border-width)))}:host([dir=rtl]) .handle{inset-inline-end:0}.gradient{border-radius:var(
--mod-colorarea-border-radius,var(--spectrum-colorarea-border-radius)
)}.gradient,.slider{block-size:100%;inline-size:100%}.slider{inset-block-start:0;inset-inline-start:0;margin:0;opacity:0;pointer-events:none;position:absolute;z-index:0}:host{touch-action:none}:host:before{pointer-events:none}.gradient{overflow:hidden}.handle{transform:translate(var(--spectrum-colorarea-default-width))}::slotted(*){height:100%;width:100%}:host([dir=rtl]) .gradient{transform:scaleX(-1)}.slider[orient=vertical]{appearance:slider-vertical}.slider:focus{z-index:1}.fieldset{border:0;margin:0;padding:0}
`;var $ = o;

var m=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var s=(c,l,e,t)=>{for(var i=t>1?void 0:t?f(l,e):l,r=c.length-1,o;r>=0;r--)(o=c[r])&&(i=(t?o(l,e,i):o(i))||i);return t&&i&&m(l,e,i),i};class ColorArea extends SpectrumElement{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.labelX="saturation";this.labelY="luminosity";this.languageResolver=new LanguageResolutionController(this);this.colorController=new ColorController(this,{extractColorFromState:()=>({h:this.hue,s:this.x,v:this.y}),applyColorToState:({s:e,v:t})=>{this.x=e,this.y=t;}});this.activeAxis="x";this._x=1;this._y=1;this.step=.01;this.altered=0;this.activeKeys=new Set;this._valueChanged=!1;this._pointerDown=!1;}static get styles(){return [$]}get hue(){return this.colorController.hue}set hue(e){this.colorController.hue=e;}get value(){return this.colorController.color}get color(){return this.colorController.color}set color(e){this.colorController.color=e;}get x(){return this._x}set x(e){if(e===this.x)return;const t=this.x;this.inputX?(this.inputX.value=e.toString(),this._x=this.inputX.valueAsNumber):this._x=e,this.requestUpdate("x",t);}get y(){return this._y}set y(e){if(e===this.y)return;const t=this.y;this.inputY?(this.inputY.value=e.toString(),this._y=this.inputY.valueAsNumber):this._y=e,this.requestUpdate("y",t);}focus(e={}){super.focus(e),this.forwardFocus();}forwardFocus(){this.focused=this.hasVisibleFocusInTree(),this.activeAxis==="x"?this.inputX.focus():this.inputY.focus();}handleFocus(){this.focused=!0,this._valueChanged=!1;}handleBlur(){this._pointerDown||(this.altered=0,this.focused=!1,this._valueChanged=!1);}handleKeydown(e){const{code:t}=e;this.focused=!0,this.altered=[e.shiftKey,e.ctrlKey,e.altKey].filter(r=>!!r).length,(t.search("Arrow")===0||t.search("Page")===0||t.search("Home")===0||t.search("End")===0)&&(e.preventDefault(),this.activeKeys.add(t),this.handleKeypress());}handleKeypress(){let e=0,t=0;const i=Math.max(this.step,this.altered*5*this.step);this.activeKeys.forEach(r=>{switch(r){case"ArrowUp":t=i;break;case"ArrowDown":t=i*-1;break;case"ArrowLeft":e=this.step*(this.isLTR?-1:1);break;case"ArrowRight":e=this.step*(this.isLTR?1:-1);break;case"PageUp":t=i*10;break;case"PageDown":t=i*-10;break;case"Home":e=i*(this.isLTR?-10:10);break;case"End":e=i*(this.isLTR?10:-10);break;}}),e!=0?(this.activeAxis="x",this.inputX.focus()):t!=0&&(this.activeAxis="y",this.inputY.focus()),this.x=Math.min(1,Math.max(this.x+e,0)),this.y=Math.min(1,Math.max(this.y+t,0)),this.colorController.savePreviousColor(),this.colorController.applyColorFromState(),(e!=0||t!=0)&&(this._valueChanged=!0,this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))||this.colorController.restorePreviousColor());}handleKeyup(e){e.preventDefault();const{code:t}=e;this.activeKeys.delete(t);}handleInput(e){const{valueAsNumber:t,name:i}=e.target;this[i]=t,this.colorController.applyColorFromState();}handleChange(e){this.handleInput(e),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerdown(e){if(e.button!==0){e.preventDefault();return}this._pointerDown=!0,this.colorController.savePreviousColor(),this.boundingClientRect=this.getBoundingClientRect(),e.target.setPointerCapture(e.pointerId),e.pointerType==="mouse"&&(this.focused=!0);}handlePointermove(e){const[t,i]=this.calculateHandlePosition(e);this._valueChanged=!1,this.x=t,this.y=1-i,this.colorController.applyColorFromState(),this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0,cancelable:!0}));}handlePointerup(e){e.preventDefault(),this._pointerDown=!1,e.target.releasePointerCapture(e.pointerId);const t=this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}));this.inputX.focus(),e.pointerType==="mouse"&&(this.focused=!1),t||this.colorController.restorePreviousColor();}calculateHandlePosition(e){if(!this.boundingClientRect)return [this.x,this.y];const t=this.boundingClientRect,i=t.left,r=t.top,o=e.clientX,d=e.clientY,h=t.width,u=t.height,a=Math.max(0,Math.min(1,(o-i)/h)),p=Math.max(0,Math.min(1,(d-r)/u));return [this.isLTR?a:1-a,p]}handleAreaPointerdown(e){e.button===0&&(e.stopPropagation(),e.preventDefault(),this.handle.dispatchEvent(new PointerEvent("pointerdown",e)),this.handlePointermove(e));}render(){const{width:e=0,height:t=0}=this.boundingClientRect||{},i=isAndroid()||isIOS(),r="Color Picker",o=this.label?`${this.label} ${r}`:r,d=l(i?void 0:"2d slider"),h=this.labelX,u=this.labelY,a=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.x),p=new Intl.NumberFormat(this.languageResolver.language,{style:"percent",unitDisplay:"narrow"}).format(this.y);return x`
            <div
                @pointerdown=${this.handleAreaPointerdown}
                class="gradient"
                style="background:
                    linear-gradient(to top, black 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%),
                    linear-gradient(to right, white 0%, hsla(${this.hue}, 100%, 0.01%, 0) 100%), hsl(${this.hue}, 100%, 50%);"
            >
                <slot name="gradient"></slot>
            </div>

            <sp-color-handle
                tabindex=${l(this.focused?void 0:"0")}
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
                aria-label=${l(i?o:void 0)}
            >
                <div role="presentation">
                    <input
                        type="range"
                        class="slider"
                        name="x"
                        aria-label=${i?h:o}
                        aria-roledescription=${d}
                        aria-orientation="horizontal"
                        aria-valuetext=${i?a:`${a}, ${h}${this._valueChanged?"":`, ${p}, ${u}`}`}
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
                        aria-label=${i?u:o}
                        aria-roledescription=${d}
                        aria-orientation="vertical"
                        aria-valuetext=${i?p:`${p}, ${u}${this._valueChanged?"":`, ${a}, ${h}`}`}
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
        `}firstUpdated(e){super.firstUpdated(e),this.boundingClientRect=this.getBoundingClientRect(),this.addEventListener("focus",this.handleFocus),this.addEventListener("blur",this.handleBlur),this.addEventListener("keyup",this.handleKeyup),this.addEventListener("keydown",this.handleKeydown);}updated(e){if(super.updated(e),this.x!==this.inputX.valueAsNumber&&(this._x=this.inputX.valueAsNumber),this.y!==this.inputY.valueAsNumber&&(this._y=this.inputY.valueAsNumber),e.has("focused")&&this.focused){const t=this.inputX.parentElement,i=this.inputY.parentElement;if(!t.shadowRoot&&!i.shadowRoot){t.attachShadow({mode:"open"}),i.attachShadow({mode:"open"});const r='<div tabindex="-1"><slot></slot></div>';t.shadowRoot.innerHTML=r,i.shadowRoot.innerHTML=r;}}}connectedCallback(){var e;super.connectedCallback(),!this.observer&&window.ResizeObserver&&(this.observer=new window.ResizeObserver(t=>{for(const i of t)this.boundingClientRect=i.contentRect;this.requestUpdate();})),(e=this.observer)==null||e.observe(this);}disconnectedCallback(){var e;(e=this.observer)==null||e.unobserve(this),super.disconnectedCallback();}}s([n({type:String,reflect:!0})],ColorArea.prototype,"dir",2),s([n({type:Boolean,reflect:!0})],ColorArea.prototype,"disabled",2),s([n({type:Boolean,reflect:!0})],ColorArea.prototype,"focused",2),s([n({type:String})],ColorArea.prototype,"label",2),s([n({type:String,attribute:"label-x"})],ColorArea.prototype,"labelX",2),s([n({type:String,attribute:"label-y"})],ColorArea.prototype,"labelY",2),s([i$1(".handle")],ColorArea.prototype,"handle",2),s([n({type:Number})],ColorArea.prototype,"hue",1),s([n({type:String})],ColorArea.prototype,"value",1),s([n({type:String})],ColorArea.prototype,"color",1),s([n({attribute:!1})],ColorArea.prototype,"activeAxis",2),s([n({type:Number})],ColorArea.prototype,"x",1),s([n({type:Number})],ColorArea.prototype,"y",1),s([n({type:Number})],ColorArea.prototype,"step",2),s([i$1('[name="x"]')],ColorArea.prototype,"inputX",2),s([i$1('[name="y"]')],ColorArea.prototype,"inputY",2);

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
