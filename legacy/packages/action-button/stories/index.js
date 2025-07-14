"use strict";
import { html, nothing } from "@spectrum-web-components/base";
import {
  ifDefined,
  unsafeHTML
} from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
export function renderButton({
  icon,
  label,
  ...properties
}) {
  return html`
        <sp-action-button
            href=${ifDefined(properties.href)}
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            static-color="${ifDefined(properties.staticColor)}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
            size=${properties.size || "m"}
            ?hold-affordance=${!!properties.holdAffordance}
            ?active=${!!properties.active}
        >
            ${icon ? unsafeHTML(icon) : nothing}${label}
        </sp-action-button>
    `;
}
function renderGroup(properties) {
  const label = "Edit";
  const holdAffordance = true;
  const icon = `<sp-icon-edit slot="icon"></sp-icon-edit>`;
  return html`
        <sp-action-group
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            size=${properties.size || "m"}
            static-color="${ifDefined(properties.staticColor)}"
        >
            ${renderButton({
    ...properties,
    label
  })}
            ${renderButton({
    ...properties,
    label,
    icon
  })}
            ${renderButton({
    ...properties,
    icon
  })}
            ${renderButton({
    ...properties,
    icon,
    holdAffordance
  })}
        </sp-action-group>
    `;
}
export function renderButtons(properties) {
  return html`
        <div
            style="display: flex; flex-direction: column; gap: calc(var(--spectrum-spacing-100) * var(--swc-scale-factor));"
        >
            ${renderGroup(properties)}
            ${renderGroup({
    ...properties,
    selected: true
  })}
            ${renderGroup({
    ...properties,
    disabled: true
  })}
            ${renderGroup({
    ...properties,
    disabled: true,
    selected: true
  })}
        </div>
    `;
}
//# sourceMappingURL=index.js.map
