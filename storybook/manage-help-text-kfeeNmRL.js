import { c as conditionAttributeWithId } from './condition-attribute-with-id-nb2zon-s.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

const i=class i{constructor(e,{mode:n}={mode:"internal"}){this.mode="internal";this.handleSlotchange=({target:e})=>{this.handleHelpText(e),this.handleNegativeHelpText(e);};this.host=e,this.instanceCount=i.instanceCount++,this.id=`sp-help-text-${this.instanceCount}`,this.mode=n;}get isInternal(){return this.mode==="internal"}render(e){return x`
            <div id=${l(this.isInternal?this.id:void 0)}>
                <slot
                    name=${e?"negative-help-text":`pass-through-help-text-${this.instanceCount}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=conditionAttributeWithId(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0;}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"));}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId());}handleNegativeHelpText(e){if(e.name!=="negative-help-text")return;e.assignedElements().forEach(t=>t.variant="negative");}};i.instanceCount=0;let HelpTextManager=i;

function ManageHelpText(e,{mode:t}={mode:"internal"}){class n extends e{constructor(){super(...arguments);this.helpTextManager=new HelpTextManager(this,{mode:t});}get helpTextId(){return this.helpTextManager.id}renderHelpText(r){return this.helpTextManager.render(r)}}return n}

export { ManageHelpText as M };
