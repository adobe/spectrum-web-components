import './sp-action-group-C-nRzmr2.js';
import './sp-icon-DHw3q-p5.js';
import './sp-icon-edit-DRa_Ir8V.js';
import './sp-action-button-lv7YPDyg.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

function renderButton(properties) {
  return x`
        <sp-action-button
            href=${o(properties.href)}
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            static-color="${o(properties.staticColor)}"
            ?disabled=${!!properties.disabled}
            ?selected=${!!properties.selected}
            ?toggles=${!!properties.toggles}
            size=${properties.size || "m"}
            ?hold-affordance=${!!properties.holdAffordance}
            ?active=${!!properties.active}
        >
            ${properties.icon}${properties.label}
        </sp-action-button>
    `;
}
function renderGroup(properties) {
  const label = "Edit";
  const holdAffordance = true;
  const icon = x`
        <sp-icon-edit slot="icon"></sp-icon-edit>
    `;
  return x`
        <sp-action-group
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            size=${properties.size || "m"}
            static-color="${o(properties.staticColor)}"
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
function renderButtons(properties) {
  const selected = true;
  const disabled = true;
  return x`
        <div
            style="display: flex; flex-direction: column; gap: calc(var(--spectrum-spacing-100) * var(--swc-scale-factor));"
        >
            ${renderGroup({
    ...properties
  })}
            ${renderGroup({
    ...properties,
    selected
  })}
            ${renderGroup({
    ...properties,
    disabled
  })}
            ${renderGroup({
    ...properties,
    disabled,
    selected
  })}
        </div>
    `;
}

export { renderButton as a, renderButtons as r };
