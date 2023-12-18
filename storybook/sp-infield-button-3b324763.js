import { B as ButtonBase } from './ButtonBase-dba358cb.js';
import { i } from './lit-element-9354aa77.js';
import { S as SizedMixin } from './sizedMixin-3d08a58f.js';
import { x } from './lit-html-126adc72.js';
import { n } from './define-element-7dc6a572.js';

const e=i`
:host{--spectrum-infield-button-height:var(--spectrum-component-height-100);--spectrum-infield-button-width:var(--spectrum-component-height-100);--spectrum-infield-button-stacked-border-radius-reset:var(
--spectrum-in-field-button-fill-stacked-inner-border-rounding
);--spectrum-infield-button-edge-to-fill:var(
--spectrum-in-field-button-edge-to-fill
);--spectrum-infield-button-inner-edge-to-fill:var(
--spectrum-in-field-button-stacked-inner-edge-to-fill
);--spectrum-infield-button-fill-padding:0px;--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-medium
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-medium
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-medium
);--spectrum-infield-button-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-infield-button-icon-color:var(
--spectrum-neutral-content-color-default
);--spectrum-infield-button-icon-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-infield-button-icon-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-infield-button-icon-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
)}:host([disabled]){--mod-infield-button-background-color:var(
--mod-infield-button-background-color-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-background-color-hover:var(
--mod-infield-button-background-color-hover-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-background-color-down:var(
--mod-infield-button-background-color-down-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-border-color:var(
--mod-infield-button-border-color-disabled,var(--spectrum-disabled-background-color)
);--mod-infield-button-icon-color:var(
--mod-infield-button-icon-color-disabled,var(--spectrum-disabled-content-color)
);--mod-infield-button-icon-color-hover:var(
--mod-infield-button-icon-color-hover-disabled,var(--spectrum-disabled-content-color)
);--mod-infield-button-icon-color-down:var(
--mod-infield-button-icon-color-down-disabled,var(--spectrum-disabled-content-color)
);--mod-infield-button-icon-color-key-focus:var(
--mod-infield-button-icon-color-key-focus-disabled,var(--spectrum-disabled-content-color)
)}:host([size=s]){--spectrum-infield-button-height:var(--spectrum-component-height-75);--spectrum-infield-button-width:var(--spectrum-component-height-75);--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-small
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-small
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-small
)}:host([size=l]){--spectrum-infield-button-height:var(--spectrum-component-height-200);--spectrum-infield-button-width:var(--spectrum-component-height-200);--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-large
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-large
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-large
)}:host([size=xl]){--spectrum-infield-button-height:var(--spectrum-component-height-300);--spectrum-infield-button-width:var(--spectrum-component-height-300);--spectrum-infield-button-stacked-fill-padding-inline:var(
--spectrum-in-field-button-edge-to-disclosure-icon-stacked-extra-large
);--spectrum-infield-button-stacked-fill-padding-outer:var(
--spectrum-in-field-button-outer-edge-to-disclosure-icon-stacked-extra-large
);--spectrum-infield-button-stacked-fill-padding-inner:var(
--spectrum-in-field-button-inner-edge-to-disclosure-icon-stacked-extra-large
)}:host([block=end]),:host([block=start]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-medium)
)}:host([block=end][size=s]),:host([block=start][size=s]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-small)
)}:host([block=end][size=l]),:host([block=start][size=l]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-large)
)}:host([block=end][size=xl]),:host([block=start][size=xl]){--mod-infield-button-width:var(
--mod-infield-button-width-stacked,var(--spectrum-in-field-button-width-stacked-extra-large)
)}:host([quiet]){--mod-infield-button-background-color:var(
--mod-infield-button-background-color-quiet,transparent
);--mod-infield-button-background-color-hover:var(
--mod-infield-button-background-color-hover-quiet,transparent
);--mod-infield-button-background-color-down:var(
--mod-infield-button-background-color-down-quiet,transparent
);--mod-infield-button-background-color-key-focus:var(
--mod-infield-button-background-color-key-focus-quiet,transparent
);--mod-infield-border-color:var(
--mod-infield-border-color-quiet,transparent
);--mod-infield-button-border-width:var(
--mod-infield-button-border-width-quiet,0
)}:host([quiet][disabled]){--mod-infield-button-background-color:var(
--mod-infield-button-background-color-quiet-disabled,transparent
);--mod-infield-button-border-color:var(
--mod-infield-button-border-color-quiet-disabled,transparent
)}:host{align-items:center;background-color:#0000;block-size:var(
--mod-infield-button-height,var(--spectrum-infield-button-height)
);border-style:none;cursor:pointer;display:flex;inline-size:var(
--mod-infield-button-width,var(--spectrum-infield-button-width)
);justify-content:center;padding:var(
--mod-infield-button-edge-to-fill,var(--spectrum-infield-button-edge-to-fill)
)}.fill{background-color:var(
--mod-infield-button-background-color,var(--spectrum-infield-button-background-color)
);block-size:100%;border-color:var(
--mod-infield-button-border-color,var(--spectrum-infield-button-border-color)
);border-end-end-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-end-start-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-start-end-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-start-start-radius:var(
--mod-infield-button-border-radius,var(--spectrum-infield-button-border-radius)
);border-style:solid;border-width:var(
--mod-infield-button-border-width,var(--spectrum-infield-button-border-width)
);inline-size:100%;padding:var(
--mod-infield-button-fill-padding,var(--spectrum-infield-button-fill-padding)
)}::slotted(*){color:var(
--mod-infield-button-icon-color,var(--spectrum-infield-button-icon-color)
)}:host([inline=end]) .fill{border-end-start-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
);border-start-start-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
)}:host([inline=start]) .fill{border-end-end-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
);border-start-end-radius:var(
--mod-infield-button-border-radius-reset,var(--spectrum-infield-button-border-radius-reset)
)}:host([disabled]){cursor:auto}:host(:hover) .fill{background-color:var(
--mod-infield-button-background-color-hover,var(--spectrum-infield-button-background-color-hover)
)}:host(:hover) ::slotted(*){color:var(
--mod-infield-button-icon-color-hover,var(--spectrum-infield-button-icon-color-hover)
)}:host:active .fill{background-color:var(
--mod-infield-button-background-color-down,var(--spectrum-infield-button-background-color-down)
)}:host:active ::slotted(*){color:var(
--mod-infield-button-icon-color-down,var(--spectrum-infield-button-icon-color-down)
)}:host(.focus-visible) .fill,:host(:focus) .fill{background-color:var(
--mod-infield-button-background-color-key-focus,var(--spectrum-infield-button-background-color-key-focus)
)}:host(:focus) .fill,:host(:focus-visible) .fill{background-color:var(
--mod-infield-button-background-color-key-focus,var(--spectrum-infield-button-background-color-key-focus)
)}:host(.focus-visible) ::slotted(*),:host(:focus) ::slotted(*){color:var(
--mod-infield-button-icon-color-key-focus,var(--spectrum-infield-button-icon-color-key-focus)
)}:host(:focus) ::slotted(*),:host(:focus-visible) ::slotted(*){color:var(
--mod-infield-button-icon-color-key-focus,var(--spectrum-infield-button-icon-color-key-focus)
)}.fill{align-items:center;display:flex;justify-content:center;transition:border-color var(--spectrum-global-animation-duration-100) ease-in-out}:host([block=end]),:host([block=start]){block-size:calc(var(--mod-infield-button-height, var(--spectrum-infield-button-height))/2)}:host([block=end]) .fill,:host([block=start]) .fill{box-sizing:border-box;padding-inline-end:calc(var(
--mod-infield-button-stacked-fill-padding-inline,
var(--spectrum-infield-button-stacked-fill-padding-inline)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
));padding-inline-start:calc(var(
--mod-infield-button-stacked-fill-padding-inline,
var(--spectrum-infield-button-stacked-fill-padding-inline)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
))}:host([block=start]){padding-block-end:var(
--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill)
)}:host([block=start]) .fill{border-block-end:none;border-end-end-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);border-end-start-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);border-start-start-radius:var(
--mod-infield-button-stacked-top-border-radius-start-start,var(--spectrum-infield-button-stacked-top-border-radius-start-start)
);padding-block-end:calc(var(
--mod-infield-button-stacked-fill-padding-inner,
var(--spectrum-infield-button-stacked-fill-padding-inner)
) - var(
--mod-infield-button-inner-edge-to-fill,
var(--spectrum-infield-button-inner-edge-to-fill)
));padding-block-start:calc(var(
--mod-infield-button-stacked-fill-padding-outer,
var(--spectrum-infield-button-stacked-fill-padding-outer)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
))}:host([block=end]){padding-block-start:var(
--mod-infield-button-inner-edge-to-fill,var(--spectrum-infield-button-inner-edge-to-fill)
)}:host([block=end]) .fill{border-end-start-radius:var(
--mod-infield-button-stacked-bottom-border-radius-end-start,var(--spectrum-infield-button-stacked-bottom-border-radius-end-start)
);border-start-end-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);border-start-start-radius:var(
--mod-infield-button-stacked-border-radius-reset,var(--spectrum-infield-button-stacked-border-radius-reset)
);padding-block-end:calc(var(
--mod-infield-button-stacked-fill-padding-outer,
var(--spectrum-infield-button-stacked-fill-padding-outer)
) - var(
--mod-infield-button-inner-edge-to-fill,
var(--spectrum-infield-button-inner-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
));padding-block-start:calc(var(
--mod-infield-button-stacked-fill-padding-inner,
var(--spectrum-infield-button-stacked-fill-padding-inner)
) - var(
--mod-infield-button-edge-to-fill,
var(--spectrum-infield-button-edge-to-fill)
) - var(
--mod-infield-button-border-width,
var(--spectrum-infield-button-border-width)
))}::slotted(*){display:initial;flex-shrink:0;margin:0!important}:host{--spectrum-infield-button-border-width:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-width
);--spectrum-infield-button-border-color:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-color
);--spectrum-infield-button-border-radius:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-radius
);--spectrum-infield-button-border-radius-reset:var(
--system-spectrum-infieldbutton-spectrum-infield-button-border-radius-reset
);--spectrum-infield-button-stacked-top-border-radius-start-start:var(
--system-spectrum-infieldbutton-spectrum-infield-button-stacked-top-border-radius-start-start
);--spectrum-infield-button-stacked-bottom-border-radius-end-start:var(
--system-spectrum-infieldbutton-spectrum-infield-button-stacked-bottom-border-radius-end-start
);--spectrum-infield-button-background-color:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color
);--spectrum-infield-button-background-color-hover:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color-hover
);--spectrum-infield-button-background-color-down:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color-down
);--spectrum-infield-button-background-color-key-focus:var(
--system-spectrum-infieldbutton-spectrum-infield-button-background-color-key-focus
)}:host{box-sizing:border-box;-webkit-user-select:none;user-select:none}
`;var y = e;

var u=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var o=(l,e,r,s)=>{for(var t=s>1?void 0:s?p(e,r):e,i=l.length-1,n;i>=0;i--)(n=l[i])&&(t=(s?n(e,r,t):n(t))||t);return s&&t&&u(e,r,t),t};class InfieldButton extends SizedMixin(ButtonBase,{noDefaultSize:!0,validSizes:["s","m","l","xl"]}){constructor(){super(...arguments);this.quiet=!1;}static get styles(){return [...super.styles,y]}get buttonContent(){return [x`
            <div class="fill">
                <slot></slot>
            </div>
        `]}}o([n()],InfieldButton.prototype,"block",2),o([n()],InfieldButton.prototype,"inline",2),o([n({type:Boolean,reflect:!0})],InfieldButton.prototype,"quiet",2);

customElements.define("sp-infield-button",InfieldButton);
