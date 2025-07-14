"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { conditionAttributeWithId } from "@spectrum-web-components/base/src/condition-attribute-with-id.js";
import { randomID } from "@spectrum-web-components/shared/src/random-id.js";
export class HelpTextManager {
  constructor(host, { mode } = { mode: "internal" }) {
    this.mode = "internal";
    this.handleSlotchange = ({
      target
    }) => {
      this.handleHelpText(target);
      this.handleNegativeHelpText(target);
    };
    this.host = host;
    this.id = `sp-help-text-${randomID()}`;
    this.mode = mode;
  }
  get isInternal() {
    return this.mode === "internal";
  }
  render(negative) {
    return html`
            <div
                id=${ifDefined(this.isInternal ? this.id : void 0)}
                aria-live="assertive"
            >
                <slot
                    name=${negative ? "negative-help-text" : `pass-through-help-text-${randomID()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `;
  }
  addId() {
    const id = this.helpTextElement ? this.helpTextElement.id : this.id;
    this.conditionId = conditionAttributeWithId(
      this.host,
      "aria-describedby",
      id
    );
    if (this.host.hasAttribute("tabindex")) {
      this.previousTabindex = parseFloat(
        this.host.getAttribute("tabindex")
      );
    }
    this.host.tabIndex = 0;
  }
  removeId() {
    if (this.conditionId) {
      this.conditionId();
      delete this.conditionId;
    }
    if (this.helpTextElement) return;
    if (this.previousTabindex) {
      this.host.tabIndex = this.previousTabindex;
    } else {
      this.host.removeAttribute("tabindex");
    }
  }
  handleHelpText(target) {
    if (this.isInternal) return;
    if (this.helpTextElement && this.helpTextElement.id === this.id) {
      this.helpTextElement.removeAttribute("id");
    }
    this.removeId();
    const assignedElements = target.assignedElements();
    const nextHelpTextElement = assignedElements[0];
    this.helpTextElement = nextHelpTextElement;
    if (nextHelpTextElement) {
      if (!nextHelpTextElement.id) {
        nextHelpTextElement.id = this.id;
      }
      this.addId();
    }
  }
  handleNegativeHelpText(target) {
    if (target.name !== "negative-help-text") return;
    const assignedElements = target.assignedElements();
    assignedElements.forEach(
      (el) => el.variant = "negative"
    );
  }
}
//# sourceMappingURL=HelpTextManager.dev.js.map
