"use strict";import{html as t,nothing as e}from"@spectrum-web-components/base";import{BadgeBase as s}from"@core/components/badge/badge.base.js";import l from"./badge.css.js";export class Badge extends s{static get styles(){return[l]}render(){return t`
            ${this.hasIcon?t`
                      <slot
                          name="icon"
                          ?icon-only=${!this.slotHasContent}
                          @slotchange=${this.handleSlotChange}
                      ></slot>
                  `:e}
            <div class="label">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        `}}
//# sourceMappingURL=Badge.js.map
