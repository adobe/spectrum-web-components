import { x, T } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

const Template = ({
  active,
  icon,
  invalid,
  label,
  open,
  position,
  quiet,
  rounded,
  size
}) => {
  return x`
        <sp-picker-button
            ?active=${active}
            ?invalid=${invalid}
            ?open=${open}
            position=${o(position)}
            ?quiet=${quiet}
            ?rounded=${rounded}
            size=${size}
        >
            ${icon ? icon : T}
            ${label ? x`
                      <span slot="label">
                          ${typeof label === "string" ? label : "All"}
                      </span>
                  ` : T}
        </sp-picker-button>
    `;
};
const argTypes = {
  argTypes: {
    open: {
      control: {
        type: "boolean"
      }
    },
    position: {
      control: {
        type: "inline-radio",
        options: ["right", "left"]
      }
    },
    quiet: {
      control: {
        type: "boolean"
      }
    },
    size: {
      control: {
        type: "inline-radio",
        options: ["s", "m", "l", "xl"]
      }
    }
  }
};

export { Template as T, argTypes as a };
