import './sp-action-group-ng_q_-qr.js';
import './sp-icon--BEZXaNs.js';
import './sp-icon-edit-5IxIuPeY.js';
import './sp-action-button-IL4X3jdR.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

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
