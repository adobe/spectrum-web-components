import './sp-button-BTMm_ibC.js';
import './sp-icon-DY-5T7Ex.js';
import './sp-icon-help-aQW-bR8x.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

const args = {
  disabled: false,
  variant: "cta",
  pending: false
};
const argTypes = {
  disabled: {
    name: "disabled",
    type: { name: "boolean", required: false },
    description: "Disable this control. It will not receive focus or events.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  },
  variant: {
    name: "variant",
    type: { name: "string", required: false },
    description: "The visual variant to apply to the button.",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "cta" }
    },
    control: {
      type: "inline-radio",
      options: [
        "cta",
        "accent",
        "primary",
        "secondary",
        "negative",
        "overBackground",
        "black",
        "white"
      ]
    }
  },
  treatment: {
    name: "treatment",
    type: { name: "string", required: false },
    description: "The visual treatment to apply to the button.",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "fill" }
    },
    control: {
      type: "inline-radio",
      options: ["fill", "outline"]
    }
  },
  pending: {
    name: "pending",
    type: { name: "boolean", required: false },
    description: "Shows the pending state of the button.",
    table: {
      type: { summary: "boolean" },
      defaultValue: { summary: false }
    },
    control: {
      type: "boolean"
    }
  }
};
const makeOverBackground = (variant) => (story) => {
  const color = variant === "black" ? "rgb(181, 209, 211)" : "var(--spectrum-seafoam-900)";
  return x`
            <div
                style="
                    --mod-actionbutton-static-content-color: ${color};
                    --mod-button-static-content-color: ${color};
                    background-color: ${color};
                    padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
                    display: inline-block;
                "
            >
                ${story()}
            </div>
        `;
};
function renderButton(properties) {
  return x`
        <sp-button
            ?disabled=${!!properties.disabled}
            href=${o(properties.href)}
            ?icon-only=${properties.iconOnly}
            ?pending=${!!properties.pending}
            ?quiet="${!!properties.quiet}"
            size=${properties.size}
            target=${o(properties.target)}
            treatment=${o(properties.treatment)}
            variant=${o(properties.variant)}
        >
            ${properties.content || "Click Me"}
        </sp-button>
    `;
}
function renderButtonSet(properties) {
  const disabled = Object.assign({}, properties, { disabled: true });
  const icon = Object.assign({}, properties, {
    content: x`
            <sp-icon-help slot="icon"></sp-icon-help>
            Click Me
        `
  });
  return x`
        ${renderButton(properties)} ${renderButton(disabled)}
        ${renderButton(icon)}
    `;
}
function renderIconButtonSet(properties) {
  const disabled = Object.assign({}, properties, {
    iconOnly: true,
    disabled: true
  });
  const iconOnly = Object.assign({}, properties, {
    iconOnly: true,
    content: x`
            <sp-icon-help slot="icon"></sp-icon-help>
        `
  });
  return x`
        ${renderButton(iconOnly)} ${renderButton(disabled)}
    `;
}
const bellIcon = x`
    <svg slot="icon" viewBox="0 0 36 36" focusable="false" aria-hidden="true">
        <path
            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
        ></path>
    </svg>
`;
const renderWithIcon = (props) => {
  return x`
        <style>
            .row {
                padding: 10px;
            }
        </style>
        <div class="row">
            ${renderButtonSet({
    ...props,
    content: x`
                    <sp-icon-help slot="icon"></sp-icon-help>
                    Help
                `
  })}
        </div>
        <div class="row">
            ${renderButtonSet({
    ...props,
    content: x`
                    ${bellIcon} Custom SVG
                `
  })}
        </div>
    `;
};
const renderWithIconOnly = (props) => {
  return x`
        ${renderIconButtonSet({
    ...props,
    content: x`
                <sp-icon-help slot="icon"></sp-icon-help>
            `
  })}
    `;
};
const renderIconSizeOverridden = (variant, treatment) => {
  return x`
        <sp-button
            label="Edit"
            size="xl"
            variant=${variant}
            treatment=${treatment}
        >
            <sp-icon-help slot="icon" size="s">Testing</sp-icon-help>
        </sp-button>
        <h1>For testing purposes only</h1>
        <p>
            This is a test to ensure that sizing the icon will still work when
            it's in the scope of a parent element. You shouldn't normally do
            this as it deviates from the Spectrum design specification.
        </p>
    `;
};
const renderMinWidthButton = (props) => {
  return x`
        <style>
            sp-button {
                min-width: 300px;
            }
        </style>
        ${renderButtonSet(props)}
    `;
};
const href = "https://github.com/adobe/spectrum-web-components";
const renderLink = (props) => renderButtonSet({
  ...props,
  href
});
const renderLinkWithTarget = (props) => renderButtonSet({
  ...props,
  href,
  target: "_blank"
});

export { args as a, argTypes as b, renderWithIcon as c, renderWithIconOnly as d, renderIconSizeOverridden as e, renderMinWidthButton as f, renderLink as g, renderLinkWithTarget as h, makeOverBackground as m, renderButtonSet as r };
