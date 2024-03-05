import{c as t}from"./D1tPGqVW.js";import{x as e}from"./4DfSdS6s.js";import{l as i}from"./C7UkmZfZ.js";const s=class s{constructor(t,{mode:e}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:t})=>{this.handleHelpText(t),this.handleNegativeHelpText(t)},this.host=t,this.instanceCount=s.instanceCount++,this.id=`sp-help-text-${this.instanceCount}`,this.mode=e}get isInternal(){return"internal"===this.mode}render(t){return e`
            <div id=${i(this.isInternal?this.id:void 0)}>
                <slot
                    name=${t?"negative-help-text":`pass-through-help-text-${this.instanceCount}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=t(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(t){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const e=t.assignedElements()[0];this.helpTextElement=e,e&&(e.id||(e.id=this.id),this.addId())}handleNegativeHelpText(t){"negative-help-text"===t.name&&t.assignedElements().forEach((t=>t.variant="negative"))}};s.instanceCount=0;let n=s;function h(t,{mode:e}={mode:"internal"}){return class extends t{constructor(){super(...arguments),this.helpTextManager=new n(this,{mode:e})}get helpTextId(){return this.helpTextManager.id}renderHelpText(t){return this.helpTextManager.render(t)}}}export{h as M};
//# sourceMappingURL=COGf_fJD.js.map
