class SlottableRequestEvent extends Event{constructor(e,n,t){super("slottable-request",{bubbles:!1,cancelable:!0,composed:!1}),this.name=e,this.data=n,this.slotName=t!==void 0?`${e}.${t}`:e;}}const removeSlottableRequest=Symbol("remove-slottable-request");

export { SlottableRequestEvent as S, removeSlottableRequest as r };
