"use strict";import{html as s}from"@spectrum-web-components/base";import{ifDefined as l}from"@spectrum-web-components/base/src/directives.js";import{conditionAttributeWithId as a}from"@spectrum-web-components/base/src/condition-attribute-with-id.js";import{randomID as n}from"@spectrum-web-components/shared/src/random-id.js";export class HelpTextManager{constructor(e,{mode:i}={mode:"internal"}){this.mode="internal";this.handleSlotchange=({target:e})=>{this.handleHelpText(e),this.handleNegativeHelpText(e)};this.host=e,this.id=`sp-help-text-${n()}`,this.mode=i}get isInternal(){return this.mode==="internal"}render(e){return s`
            <div
                id=${l(this.isInternal?this.id:void 0)}
                aria-live="assertive"
            >
                <slot
                    name=${e?"negative-help-text":`pass-through-help-text-${n()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=a(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId())}handleNegativeHelpText(e){if(e.name!=="negative-help-text")return;e.assignedElements().forEach(t=>t.variant="negative")}}
//# sourceMappingURL=HelpTextManager.js.map
