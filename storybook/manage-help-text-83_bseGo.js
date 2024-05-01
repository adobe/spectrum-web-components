import { c as conditionAttributeWithId } from './condition-attribute-with-id-Cnyhr7Mp.js';
import { r as randomID } from './random-id-BST1Puzz.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

class HelpTextManager{constructor(e,{mode:i}={mode:"internal"}){this.mode="internal";this.handleSlotchange=({target:e})=>{this.handleHelpText(e),this.handleNegativeHelpText(e);};this.host=e,this.id=`sp-help-text-${randomID()}`,this.mode=i;}get isInternal(){return this.mode==="internal"}render(e){return x`
            <div id=${o(this.isInternal?this.id:void 0)}>
                <slot
                    name=${e?"negative-help-text":`pass-through-help-text-${randomID()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=conditionAttributeWithId(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0;}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"));}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId());}handleNegativeHelpText(e){if(e.name!=="negative-help-text")return;e.assignedElements().forEach(t=>t.variant="negative");}}

function ManageHelpText(e,{mode:t}={mode:"internal"}){class n extends e{constructor(){super(...arguments);this.helpTextManager=new HelpTextManager(this,{mode:t});}get helpTextId(){return this.helpTextManager.id}renderHelpText(r){return this.helpTextManager.render(r)}}return n}

export { ManageHelpText as M };
