import './sp-color-loupe-d1537abd.js';
import { i } from './lit-element-9354aa77.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-617dba69.js';
import { x } from './lit-html-126adc72.js';

const r$1=i`
:host{--spectrum-opacity-checkerboard-dark:var(
--spectrum-opacity-checkerboard-square-dark
);--spectrum-opacity-checkerboard-light:var(
--spectrum-opacity-checkerboard-square-light
);--spectrum-opacity-checkerboard-size:var(
--spectrum-opacity-checkerboard-square-size
);--spectrum-opacity-checkerboard-position:left top}:host{background:repeating-conic-gradient(var(
--mod-opacity-checkerboard-light,var(--spectrum-opacity-checkerboard-light)
) 0 25%,var(
--mod-opacity-checkerboard-dark,var(--spectrum-opacity-checkerboard-dark)
) 0 50%) var(
--mod-opacity-checkerboard-position,var(--spectrum-opacity-checkerboard-position)
) /calc(var(
--mod-opacity-checkerboard-size,
var(--spectrum-opacity-checkerboard-size)
)*2) calc(var(
--mod-opacity-checkerboard-size,
var(--spectrum-opacity-checkerboard-size)
)*2);block-size:100%;inline-size:100%}@media (forced-colors:active){:host{forced-color-adjust:none}}
`;var h = r$1;

const r=i`
:host{--spectrum-colorhandle-size:var(--spectrum-color-handle-size);--spectrum-colorhandle-focused-size:var(
--spectrum-color-handle-size-key-focus
);--spectrum-colorhandle-hitarea-size:var(
--spectrum-color-control-track-width
);--spectrum-colorhandle-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-colorhandle-animation-easing:ease-in-out;--spectrum-colorhandle-outer-border-color:rgba(var(--spectrum-black-rgb),var(--spectrum-color-handle-outer-border-opacity));--spectrum-colorhandle-outer-border-width:var(
--spectrum-color-handle-outer-border-width
);--spectrum-colorhandle-inner-border-color:rgba(var(--spectrum-black-rgb),var(--spectrum-color-handle-inner-border-opacity));--spectrum-colorhandle-inner-border-width:var(
--spectrum-color-handle-inner-border-width
);--spectrum-colorhandle-border-width:var(
--spectrum-color-handle-border-width
);--spectrum-colorhandle-border-color:var(--spectrum-white);--spectrum-colorhandle-border-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-colorhandle-fill-color-disabled:var(
--spectrum-disabled-background-color
);--mod-opacity-checkerboard-position:50%}:host{block-size:var(--mod-colorhandle-size,var(--spectrum-colorhandle-size));border-color:var(
--highcontrast-colorhandle-border-color,var(
--mod-colorhandle-border-color,var(--spectrum-colorhandle-border-color)
)
);border-radius:100%;border-style:solid;border-width:var(
--mod-colorhandle-border-width,var(--spectrum-colorhandle-border-width)
);box-shadow:0 0 0 var(
--mod-colorhandle-outer-border-width,var(--spectrum-colorhandle-outer-border-width)
) var(
--mod-colorhandle-outer-border-color,var(--spectrum-colorhandle-outer-border-color)
);box-sizing:border-box;display:block;inline-size:var(--mod-colorhandle-size,var(--spectrum-colorhandle-size));margin-block:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1/2);margin-inline:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1/2);position:absolute;transition:all var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
);z-index:1}:host:after{block-size:var(
--mod-colorhandle-hitarea-size,var(--spectrum-colorhandle-hitarea-size)
);border-radius:var(--mod-colorhandle-hitarea-border-radius,100%);content:"";display:block;inline-size:var(
--mod-colorhandle-hitarea-size,var(--spectrum-colorhandle-hitarea-size)
);inset-block:calc(50% - var(
--mod-colorhandle-hitarea-size,
var(--spectrum-colorhandle-hitarea-size)
)/2);inset-inline:calc(50% - var(
--mod-colorhandle-hitarea-size,
var(--spectrum-colorhandle-hitarea-size)
)/2);position:absolute}:host(.focus-visible),:host([focused]){block-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);inline-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);margin-block:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);margin-inline:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);outline:none}:host(:focus-visible),:host([focused]){block-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);inline-size:var(
--mod-colorhandle-focused-size,var(--spectrum-colorhandle-focused-size)
);margin-block:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);margin-inline:calc(var(--mod-colorhandle-size, var(--spectrum-colorhandle-size))*-1);outline:none}:host([disabled]){background:var(
--highcontrast-colorhandle-fill-color-disabled,var(
--mod-colorhandle-fill-color-disabled,var(--spectrum-colorhandle-fill-color-disabled)
)
);border-color:var(
--highcontrast-colorhandle-border-color-disabled,var(
--mod-colorhandle-border-color-disabled,var(--spectrum-colorhandle-border-color-disabled)
)
);box-shadow:none;pointer-events:none}:host([disabled]) .inner{display:none}.inner{background-color:var(--spectrum-picked-color);block-size:100%;border-radius:100%;box-shadow:inset 0 0 0 var(
--mod-colorhandle-inner-border-width,var(--spectrum-colorhandle-inner-border-width)
) var(
--mod-colorhandle-inner-border-color,var(--spectrum-colorhandle-inner-border-color)
);inline-size:100%}@media (forced-colors:active){:host{forced-color-adjust:none}:host([disabled]){--highcontrast-colorhandle-border-color-disabled:GrayText;--highcontrast-colorhandle-fill-color-disabled:Canvas}}:host{touch-action:none;transition:inline-size var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),block-size var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),border-width var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),margin-inline var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
),margin-block var(
--mod-colorhandle-animation-duration,var(--spectrum-colorhandle-animation-duration)
) var(
--mod-colorhandle-animation-easing,var(--spectrum-colorhandle-animation-easing)
)}:host(:focus){outline:none}
`;var f = r;

var d=Object.defineProperty;var a=Object.getOwnPropertyDescriptor;var o=(s,r,e,i)=>{for(var t=i>1?void 0:i?a(r,e):r,n=s.length-1,l;n>=0;n--)(l=s[n])&&(t=(i?l(r,e,t):l(t))||t);return i&&t&&d(r,e,t),t};class ColorHandle extends SpectrumElement{constructor(){super(...arguments);this.disabled=!1;this.focused=!1;this.open=!1;this.color="rgba(255, 0, 0, 0.5)";}static get styles(){return [h,f]}handlePointerdown(e){e.pointerType==="touch"&&(this.open=!0),this.setPointerCapture(e.pointerId);}handlePointerup(e){this.open=!1,this.releasePointerCapture(e.pointerId);}render(){return x`
            <div class="inner" style="background-color: ${this.color}"></div>
            <sp-color-loupe
                color=${this.color}
                ?open=${this.open&&!this.disabled}
            ></sp-color-loupe>
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("pointerdown",this.handlePointerdown),this.addEventListener("pointerup",this.handlePointerup),this.addEventListener("pointercancel",this.handlePointerup);}}o([n({type:Boolean,reflect:!0})],ColorHandle.prototype,"disabled",2),o([n({type:Boolean,reflect:!0})],ColorHandle.prototype,"focused",2),o([n({type:Boolean,reflect:!0})],ColorHandle.prototype,"open",2),o([n({type:String})],ColorHandle.prototype,"color",2);

defineElement("sp-color-handle",ColorHandle);
