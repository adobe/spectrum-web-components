"use strict";export class SlottableRequestEvent extends Event{constructor(e,n,t){super("slottable-request",{bubbles:!1,cancelable:!0,composed:!1}),this.name=e,this.data=n,this.slotName=t!==void 0?`${e}.${t}`:e}}export const removeSlottableRequest=Symbol("remove-slottable-request");
//# sourceMappingURL=slottable-request-event.js.map
