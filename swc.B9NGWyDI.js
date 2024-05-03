import{r as e,c as t}from"./swc.vweuFVat.js";import{x as i}from"./swc.DAPqj1CM.js";import{o as s}from"./swc.BljSg25L.js";class h{constructor(t,{mode:i}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:e})=>{this.handleHelpText(e),this.handleNegativeHelpText(e)},this.host=t,this.id=`sp-help-text-${e()}`,this.mode=i}get isInternal(){return"internal"===this.mode}render(t){return i`
            <div id=${s(this.isInternal?this.id:void 0)}>
                <slot
                    name=${t?"negative-help-text":`pass-through-help-text-${e()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=t(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId())}handleNegativeHelpText(e){"negative-help-text"===e.name&&e.assignedElements().forEach((e=>e.variant="negative"))}}function n(e,{mode:t}={mode:"internal"}){return class extends e{constructor(){super(...arguments),this.helpTextManager=new h(this,{mode:t})}get helpTextId(){return this.helpTextManager.id}renderHelpText(e){return this.helpTextManager.render(e)}}}export{n as M};
//# sourceMappingURL=swc.CMKTFo0C.js.map
