"use strict";import{HelpTextManager as l}from"./HelpTextManager.js";export function ManageHelpText(e,{mode:t}={mode:"internal"}){class n extends e{constructor(){super(...arguments);this.helpTextManager=new l(this,{mode:t})}get helpTextId(){return this.helpTextManager.id}renderHelpText(r){return this.helpTextManager.render(r)}}return n}
//# sourceMappingURL=manage-help-text.js.map
