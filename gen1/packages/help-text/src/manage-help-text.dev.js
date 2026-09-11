"use strict";
import { HelpTextManager } from "./HelpTextManager.dev.js";
export function ManageHelpText(constructor, { mode } = { mode: "internal" }) {
  class HelpTextElement extends constructor {
    constructor() {
      super(...arguments);
      this.helpTextManager = new HelpTextManager(this, { mode });
    }
    get helpTextId() {
      return this.helpTextManager.id;
    }
    renderHelpText(negative) {
      return this.helpTextManager.render(negative);
    }
  }
  return HelpTextElement;
}
//# sourceMappingURL=manage-help-text.dev.js.map
