"use strict";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";
import { CheckboxMixin } from "./CheckboxMixin.dev.js";
export class CheckboxBase extends CheckboxMixin(Focusable) {
  get focusElement() {
    return this.inputElement;
  }
}
//# sourceMappingURL=CheckboxBase.dev.js.map
