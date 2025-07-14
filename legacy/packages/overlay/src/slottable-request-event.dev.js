"use strict";
export class SlottableRequestEvent extends Event {
  constructor(name, data, key) {
    super("slottable-request", {
      bubbles: false,
      cancelable: true,
      composed: false
    });
    this.name = name;
    this.data = data;
    this.slotName = key !== void 0 ? `${name}.${key}` : name;
    if (true) {
      window.__swc.warn(
        void 0,
        `\u26A0\uFE0F  WARNING \u26A0\uFE0F : \`slottable-request\` events are experimental and there is no guarantees behind usage of them in an application!! Their shape and presence within the library could be changed at anytime.
                
Learn more about the protocol these events are based on below:`,
        "https://github.com/webcomponents-cg/community-protocols/pull/45",
        {
          level: "high",
          type: "api"
        }
      );
    }
  }
}
export const removeSlottableRequest = Symbol("remove-slottable-request");
//# sourceMappingURL=slottable-request-event.dev.js.map
