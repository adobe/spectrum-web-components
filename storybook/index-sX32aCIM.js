import { x, A } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

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
            position=${l(position)}
            ?quiet=${quiet}
            ?rounded=${rounded}
            size=${size}
        >
            ${icon ? icon : A}
            ${label ? x`
                      <span slot="label">
                          ${typeof label === "string" ? label : "All"}
                      </span>
                  ` : A}
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
