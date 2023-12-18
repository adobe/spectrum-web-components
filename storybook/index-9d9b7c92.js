import './sp-action-group-c5fb8392.js';
import './sp-icon-ec6672fe.js';
import './sp-icon-edit-f75652ae.js';
import './sp-action-button-9bf3b735.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';

function renderButton(properties) {
  return x`
        <sp-action-button
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            static="${l(properties.variant)}"
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
            style="display: flex; flex-direction: column; gap: var(--spectrum-global-dimension-size-100);"
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
