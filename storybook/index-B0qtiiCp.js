import './sp-action-group-BuA30sND.js';
import './sp-icon-DY-5T7Ex.js';
import './sp-icon-edit-BAtqCbns.js';
import './sp-action-button-BGmiWspi.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

function renderButton(properties) {
  return x`
        <sp-action-button
            ?quiet="${!!properties.quiet}"
            ?emphasized="${!!properties.emphasized}"
            static="${o(properties.variant)}"
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
