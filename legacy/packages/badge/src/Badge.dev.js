"use strict";
import {
  html,
  nothing
} from "@spectrum-web-components/base";
import { BadgeBase } from "@core/components/badge/badge.base.js";
import styles from "./badge.css.js";
export class Badge extends BadgeBase {
  static get styles() {
    return [styles];
  }
  render() {
    return html`
            ${this.hasIcon ? html`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                          @slotchange=${this.handleSlotChange}
                      ></slot>
                  ` : nothing}
            <div class="label">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `;
  }
}
//# sourceMappingURL=Badge.dev.js.map
