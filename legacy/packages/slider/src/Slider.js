"use strict";var v=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var l=(u,o,e,t)=>{for(var i=t>1?void 0:t?f(o,e):o,r=u.length-1,s;r>=0;r--)(s=u[r])&&(i=(t?s(o,e,i):s(i))||i);return t&&i&&v(o,e,i),i};import{html as a,nothing as h,SizedMixin as g}from"@spectrum-web-components/base";import{property as n,query as p}from"@spectrum-web-components/base/src/decorators.js";import{classMap as c,ifDefined as $,repeat as m,styleMap as b}from"@spectrum-web-components/base/src/directives.js";import y from"./slider.css.js";import{ObserveSlotText as k}from"@spectrum-web-components/shared/src/observe-slot-text.js";import"@spectrum-web-components/field-label/sp-field-label.js";import{HandleController as C}from"./HandleController.js";import{SliderHandle as N}from"./SliderHandle.js";import{streamingListener as P}from"@spectrum-web-components/base/src/streaming-listener.js";export const variants=["filled","ramp","range","tick"];export class Slider extends g(k(N,""),{noDefaultSize:!0,validSizes:["s","m","l","xl"]}){constructor(){super(...arguments);this.handleController=new C(this);this._editable=!1;this.hideStepper=!1;this.type="";this._variant="";this.getAriaValueText=e=>{const t=[...e.values()];return t.length===2?`${t[0]} - ${t[1]}`:t.join(", ")};this.min=0;this.max=100;this.step=1;this.tickStep=0;this.tickLabels=!1;this.disabled=!1;this.quiet=!1;this.indeterminate=!1;this._numberFieldInput=Promise.resolve()}static get styles(){return[y]}get editable(){return this._editable}set editable(e){if(e===this.editable)return;const t=this.editable;this._editable=this.handleController.size<2?e:!1,this.editable&&(this._numberFieldInput=import("@spectrum-web-components/number-field/sp-number-field.js")),t!==this.editable&&this.requestUpdate("editable",t)}set variant(e){const t=this.variant;e!==this.variant&&(variants.includes(e)&&this.fillStart===void 0?(this._variant=e,this.setAttribute("variant",e)):(this._variant="",this.removeAttribute("variant")),this.requestUpdate("variant",t))}get variant(){return this._variant}get values(){return this.handleController.values}get handleName(){return"value"}get ariaValueText(){return this.getAriaValueText?this.getAriaValueText(this.handleController.formattedValues):`${this.value}${this._forcedUnit}`}get numberFormat(){return this.getNumberFormat()}get focusElement(){return this.handleController.focusElement}handleLabelClick(e){this.editable&&(e.preventDefault(),this.focus())}render(){return a`
            ${this.renderLabel()} ${this.renderTrack()}
            ${this.editable?a`
                      <sp-number-field
                          .formatOptions=${this.formatOptions||{}}
                          id="number-field"
                          min=${this.min}
                          max=${this.max}
                          step=${this.step}
                          size=${this.size}
                          value=${this.value}
                          ?hide-stepper=${this.hideStepper}
                          ?disabled=${this.disabled}
                          ?quiet=${this.quiet}
                          ?indeterminate=${this.indeterminate}
                          @input=${this.handleNumberInput}
                          @change=${this.handleNumberChange}
                      ></sp-number-field>
                  `:h}
        `}connectedCallback(){super.connectedCallback(),this.handleController.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.handleController.hostDisconnected()}update(e){this.handleController.hostUpdate(),e.has("disabled")&&this.disabled&&this.handleController.cancelDrag(),super.update(e)}renderLabel(){const e=this.labelVisibility==="none"||this.labelVisibility==="value",t=this.labelVisibility==="none"||this.labelVisibility==="text";return a`
            <div id="label-container">
                <sp-field-label
                    class=${c({"visually-hidden":e})}
                    ?disabled=${this.disabled}
                    id="label"
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    @click=${this.handleLabelClick}
                    size=${this.size}
                >
                    ${this.slotHasContent?h:a`
                              <span>${this.label}</span>
                          `}
                    <slot></slot>
                </sp-field-label>
                <sp-field-label
                    class=${c({"visually-hidden":t})}
                    ?disabled=${this.disabled}
                    for=${this.editable?"number-field":this.handleController.activeHandleInputId}
                    size=${this.size}
                >
                    <output id="value" aria-live="off" for="input">
                        ${this.ariaValueText}
                    </output>
                </sp-field-label>
            </div>
        `}renderRamp(){return this.variant!=="ramp"?a``:a`
            <div id="ramp">
                <svg
                    viewBox="0 0 240 16"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path
                        d="M240,4v8c0,2.3-1.9,4.1-4.2,4L1,9C0.4,9,0,8.5,0,8c0-0.5,0.4-1,1-1l234.8-7C238.1-0.1,240,1.7,240,4z"
                    ></path>
                </svg>
            </div>
        `}renderTicks(){if(this.variant!=="tick")return a``;const e=this.tickStep||this.step,t=(this.max-this.min)/e,i=t%1!==0,r=new Array(Math.floor(t+1));return r.fill(0,0,t+1),a`
            <div
                class="${i?"not-exact ":""}ticks"
                style=${$(i?`--sp-slider-tick-offset: calc(100% / ${this.max} * ${this.tickStep}`:void 0)}
            >
                ${r.map((s,d)=>a`
                        <div class="tick">
                            ${this.tickLabels?a`
                                      <div class="tickLabel">
                                          ${d*e+this.min}
                                      </div>
                                  `:h}
                        </div>
                    `)}
            </div>
        `}renderTrackSegment(e,t){return this.variant==="ramp"?a``:a`
            <div
                class="track"
                style=${b(this.trackSegmentStyles(e,t))}
                role="presentation"
            ></div>
        `}getOffsetWidth(e,t){return Math.abs(t-e)*100}fillStyles(e){const t=this.handleController.activeHandleModel,i=t.normalization.toNormalized(e,this.min,this.max),r=this.dir==="rtl"?"right":"left",s=(this.value>e?i:t.normalizedValue)*100,d=this.getOffsetWidth(i,t.normalizedValue);return{[r]:`${s}%`,width:`${d}%`}}renderFillOffset(){return this._cachedValue===void 0||this.centerPoint===void 0?a``:a`
            <div
                class=${c({fill:!0,offset:this.value>this.centerPoint})}
                style=${b(this.fillStyles(this.centerPoint))}
            ></div>
        `}renderHandle(){return this.variant==="tick"?a``:a`
            ${this.handleController.render()}
        `}renderTrack(){const e=this.handleController.trackSegments(),t=[{id:"handles",html:this.handleController.render()}],i=[{id:"track0",html:this.renderTrackSegment(...e[0])},{id:"fill",html:this.renderFillOffset()},{id:"ramp",html:this.renderRamp()},{id:"handles",html:this.renderHandle()},...e.slice(1).map(([r,s],d)=>({id:`track${d+1}`,html:this.renderTrackSegment(r,s)}))];return a`
            <div
                id="track"
                ${P({start:["pointerdown",this.handlePointerdown],streamInside:["pointermove",this.handlePointermove],end:[["pointerup","pointercancel","pointerleave"],this.handlePointerup],streamOutside:["dblclick",this.handleDoubleClick]})}
            >
                <div id="controls">
                    ${this.variant==="tick"?a`
                              ${this.renderTicks()}
                              <div class="trackContainer">
                                  ${m(i,r=>r.id,r=>r.html)}
                              </div>
                              <div class="handleContainer">
                                  ${m(t,r=>r.id,r=>r.html)}
                              </div>
                          `:a`
                              ${m(i,r=>r.id,r=>r.html)}
                          `}
                </div>
            </div>
        `}handleDoubleClick(e){this.handleController.handleDoubleClick(e)}handlePointerdown(e){this.handleController.handlePointerdown(e)}handlePointermove(e){this.handleController.handlePointermove(e)}handlePointerup(e){this.handleController.handlePointerup(e)}handleNumberInput(e){var i;const{value:t}=e.target;if((i=e.target)!=null&&i.managedInput&&!isNaN(t)){this.value=t;return}e.stopPropagation()}handleNumberChange(e){var i;const{value:t}=e.target;isNaN(t)?(e.target.value=this.value,e.stopPropagation()):(this.value=t,(i=e.target)!=null&&i.managedInput||this.dispatchInputEvent()),this.indeterminate=!1}trackSegmentStyles(e,t){const i=t-e;return{width:`${i*100}%`,"--spectrum-slider-track-background-size":`${1/i*100}%`,"--spectrum-slider-track-segment-position":`${e*100}%`}}async getUpdateComplete(){const e=await super.getUpdateComplete();return this.editable&&(await this._numberFieldInput,await this.numberField.updateComplete),await this.handleController.handleUpdatesComplete(),e}willUpdate(e){e.has("value")&&e.has("fillStart")&&(this._cachedValue=Number(this.value),this.getAttribute("fill-start")===""?this.centerPoint=(Number(this.max)-Number(this.min))/2+Number(this.min):Number.isNaN(Number(this.fillStart))||(this.centerPoint=Number(this.fillStart)))}}l([n({type:Boolean,reflect:!0})],Slider.prototype,"editable",1),l([n({type:Boolean,reflect:!0,attribute:"hide-stepper"})],Slider.prototype,"hideStepper",2),l([n()],Slider.prototype,"type",2),l([n({reflect:!0})],Slider.prototype,"dir",2),l([n({type:String})],Slider.prototype,"variant",1),l([n({attribute:!1})],Slider.prototype,"getAriaValueText",2),l([n({type:String,reflect:!0,attribute:"label-visibility"})],Slider.prototype,"labelVisibility",2),l([n({type:Number,reflect:!0})],Slider.prototype,"min",2),l([n({type:Number,reflect:!0})],Slider.prototype,"max",2),l([n({type:Number})],Slider.prototype,"step",2),l([n({type:Number,attribute:"tick-step"})],Slider.prototype,"tickStep",2),l([n({type:Boolean,attribute:"tick-labels"})],Slider.prototype,"tickLabels",2),l([n({type:Boolean,reflect:!0})],Slider.prototype,"disabled",2),l([n({type:Number,reflect:!0,attribute:"fill-start"})],Slider.prototype,"fillStart",2),l([n({type:Boolean})],Slider.prototype,"quiet",2),l([n({type:Boolean})],Slider.prototype,"indeterminate",2),l([p("#label")],Slider.prototype,"labelEl",2),l([p("#number-field")],Slider.prototype,"numberField",2),l([p("#track")],Slider.prototype,"track",2);
//# sourceMappingURL=Slider.js.map
