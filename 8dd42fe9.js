import{y as e,S as t}from"./f71774c5.js";import{i as r}from"./112b2095.js";import"./f01bf7e0.js";import{S as o}from"./52dd9942.js";import{T as i,A as c,x as a,n as l,d as s}from"./bd0a9f1e.js";import"./ff4c7038.js";import{c as n,t as d}from"./4f31466a.js";import{l as u,a as p,i as m}from"./92bf7466.js";import"./fb42b368.js";import"./6218a3ce.js";import{S as h}from"./9ddc847e.js";import{e as f,i as v,t as b}from"./16ab2288.js";import{e as x,s as g}from"./4ac61a3f.js";const k=f(class extends v{constructor(e){if(super(e),e.type!==b.PROPERTY&&e.type!==b.ATTRIBUTE&&e.type!==b.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!x(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===i||t===c)return t;const r=e.element,o=e.name;if(e.type===b.PROPERTY){if(t===r[o])return i}else if(e.type===b.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(o))return i}else if(e.type===b.ATTRIBUTE&&r.getAttribute(o)===t+"")return i;return g(e),t}});var y=r`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;-webkit-text-decoration:none;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;-webkit-user-select:none;user-select:none;vertical-align:top}:host(:focus){outline:none}:host([disabled]){cursor:default}:host{background-color:#0000;border:none;border-radius:100%;margin:0;padding:var(--spectrum-clearbutton-padding)}.icon{margin:0 auto}:host([size=s]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-s-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-s-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-s-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-s-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-s-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-s-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-s-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-s-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-s-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-s-fill-size,var(--spectrum-alias-infieldbutton-full-height-s)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-s-padding,var(--spectrum-alias-infieldbutton-padding-s)
)}:host([size=m]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-m-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-m-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-m-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-m-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-m-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-m-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-m-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-m-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-m-fill-size,var(--spectrum-alias-infieldbutton-full-height-m)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-m-padding,var(--spectrum-alias-infieldbutton-padding-m)
)}:host([size=l]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-l-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-l-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-l-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-l-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-l-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-l-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-l-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-l-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-l-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-l-fill-size,var(--spectrum-alias-infieldbutton-full-height-l)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-l-padding,var(--spectrum-alias-infieldbutton-padding-l)
)}:host([size=xl]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-xl-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-xl-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-xl-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-xl-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-xl-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-xl-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-xl-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-xl-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-xl-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-xl-fill-size,var(--spectrum-alias-infieldbutton-full-height-xl)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-xl-padding,var(--spectrum-alias-infieldbutton-padding-xl)
)}.fill{align-items:center;background-color:var(--spectrum-clearbutton-fill-background-color);border-radius:100%;display:flex;height:var(--spectrum-clearbutton-fill-size);justify-content:center;width:var(--spectrum-clearbutton-fill-size)}:host{color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){color:var(--spectrum-clearbutton-fill-uiicon-color)}:host([active]){color:var(--spectrum-clearbutton-fill-uiicon-color-down)}:host(.focus-visible){color:var(--spectrum-clearbutton-fill-uiicon-color-key-focus)}:host(.focus-visible){color:var(--spectrum-clearbutton-fill-uiicon-color-key-focus)}:host(:focus-visible){color:var(--spectrum-clearbutton-fill-uiicon-color-key-focus)}:host([disabled]){color:var(--spectrum-clearbutton-fill-uiicon-color-disabled)}:host(:hover) .fill{background-color:var(--spectrum-clearbutton-fill-background-color-hover)}:host([active]) .fill{background-color:var(--spectrum-clearbutton-fill-background-color-down)}:host(.focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(.focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(:focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host([disabled]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-disabled
)}:host([variant=overBackground]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][disabled]),:host([variant=overBackground][disabled]) .fill{background-color:var(
--spectrum-alias-icon-color-overbackground-disabled,#fff3
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-down,var(--spectrum-global-color-static-transparent-white-400)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-down,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-disabled,var(--spectrum-global-color-static-transparent-white-200)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-disabled,var(--spectrum-global-color-static-transparent-white-500)
)}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){.icon{margin:0}}@media (forced-colors:active){:host{--spectrum-alias-icon-color-overbackground:ButtonText;--spectrum-alias-icon-color-overbackground-disabled:GrayText;--spectrum-button-m-primary-outline-white-texticon-background-color:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-border-color:ButtonText;--spectrum-button-m-primary-outline-white-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-outline-white-texticon-border-color-down:ButtonText;--spectrum-button-m-primary-outline-white-texticon-border-color-hover:ButtonText;--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus:ButtonText;--spectrum-button-m-primary-outline-white-texticon-text-color:ButtonText;--spectrum-button-m-primary-outline-white-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-outline-white-texticon-text-color-down:Highlight;--spectrum-button-m-primary-outline-white-texticon-text-color-hover:Highlight;--spectrum-clearbutton-fill-background-color:ButtonFace;--spectrum-clearbutton-fill-background-color-disabled:ButtonFace;--spectrum-clearbutton-fill-background-color-down:ButtonFace;--spectrum-clearbutton-fill-background-color-hover:ButtonFace;--spectrum-clearbutton-fill-background-color-key-focus:ButtonFace;--spectrum-clearbutton-fill-uiicon-color:ButtonText;--spectrum-clearbutton-fill-uiicon-color-disabled:GrayText;--spectrum-clearbutton-fill-uiicon-color-down:Highlight;--spectrum-clearbutton-fill-uiicon-color-key-focus:Highlight;--spectrum-clearbutton-m-fill-uiicon-color:ButtonText}:host(:hover){color:var(--spectrum-clearbutton-fill-uiicon-color-key-focus)}:host([disabled]){color:var(--spectrum-clearbutton-fill-uiicon-color-disabled)}}
`,w=Object.defineProperty,z=Object.getOwnPropertyDescriptor;const q={s:()=>a`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,m:()=>a`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,l:()=>a`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,xl:()=>a`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `};class T extends(o(t)){constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,y,e]}get buttonContent(){return[q[this.size]()]}render(){return a`
            <div class="fill">${super.render()}</div>
        `}}((e,t,r,o)=>{for(var i,c=o>1?void 0:o?z(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(c=(o?i(t,r,c):i(c))||c);o&&c&&w(t,r,c)})([l({reflect:!0})],T.prototype,"variant",2);const $=class e{constructor(t,{mode:r}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:e})=>{this.handleHelpText(e),this.handleNegativeHelpText(e)},this.host=t,this.instanceCount=e.instanceCount++,this.id=`sp-help-text-${this.instanceCount}`,this.mode=r}get isInternal(){return"internal"===this.mode}render(e){return a`
            <div id=${u(this.isInternal?this.id:void 0)}>
                <slot
                    name=${e?"negative-help-text":`pass-through-help-text-${this.instanceCount}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const e=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=n(this.host,"aria-describedby",e),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(e){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const t=e.assignedElements()[0];this.helpTextElement=t,t&&(t.id||(t.id=this.id),this.addId())}handleNegativeHelpText(e){"negative-help-text"===e.name&&e.assignedElements().forEach((e=>e.variant="negative"))}};$.instanceCount=0;let B=$;function E(e,{mode:t}={mode:"internal"}){return class extends e{constructor(){super(...arguments),this.helpTextManager=new B(this,{mode:t})}get helpTextId(){return this.helpTextManager.id}renderHelpText(e){return this.helpTextManager.render(e)}}}var I=r`
:host{--spectrum-texfield-animation-duration:var(
--spectrum-animation-duration-100
);--spectrum-textfield-width:240px;--spectrum-textfield-min-width:var(
--spectrum-text-field-minimum-width-multiplier
);--spectrum-textfield-corner-radius:var(--spectrum-corner-radius-100);--spectrum-textfield-height:var(--spectrum-component-height-100);--spectrum-textfield-spacing-inline:var(
--spectrum-component-edge-to-text-100
);--spectrum-textfield-spacing-inline-quiet:var(
--spectrum-field-edge-to-text-quiet
);--spectrum-textfield-spacing-block-start:var(
--spectrum-component-top-to-text-100
);--spectrum-textfield-spacing-block-end:var(
--spectrum-component-bottom-to-text-100
);--spectrum-textfield-spacing-block-quiet:var(
--spectrum-field-edge-to-border-quiet
);--spectrum-textfield-label-spacing-block:var(
--spectrum-field-label-to-component
);--spectrum-textfield-label-spacing-block-quiet:var(
--spectrum-field-label-to-component-quiet-medium
);--spectrum-textfield-label-spacing-inline-side-label:var(
--spectrum-spacing-100
);--spectrum-textfield-helptext-spacing-block:var(
--spectrum-help-text-to-component
);--spectrum-textfield-icon-size-invalid:var(
--spectrum-workflow-icon-size-100
);--spectrum-textfield-icon-spacing-inline-start-invalid:var(
--spectrum-field-text-to-alert-icon-medium
);--spectrum-textfield-icon-spacing-inline-end-invalid:var(
--spectrum-field-edge-to-alert-icon-medium
);--spectrum-textfield-icon-spacing-inline-end-quiet-invalid:var(
--spectrum-field-edge-to-alert-icon-quiet
);--spectrum-textfield-icon-spacing-block-invalid:var(
--spectrum-field-top-to-alert-icon-medium
);--spectrum-textfield-icon-spacing-inline-start-valid:var(
--spectrum-field-text-to-validation-icon-medium
);--spectrum-textfield-icon-spacing-inline-end-valid:var(
--spectrum-field-edge-to-validation-icon-medium
);--spectrum-textfield-icon-spacing-inline-end-quiet-valid:var(
--spectrum-field-edge-to-validation-icon-quiet
);--spectrum-textfield-icon-spacing-block-valid:var(
--spectrum-field-top-to-validation-icon-medium
);--spectrum-textfield-icon-spacing-inline-end-override:32px;--spectrum-Textfield-workflow-icon-width:18px;--spectrum-Textfield-workflow-icon-gap:6px;--spectrum-textfield-font-family:var(--spectrum-sans-font-family-stack);--spectrum-textfield-font-weight:var(--spectrum-regular-font-weight);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-100);--spectrum-textfield-character-count-font-family:var(
--spectrum-sans-font-family-stack
);--spectrum-textfield-character-count-font-weight:var(
--spectrum-regular-font-weight
);--spectrum-textfield-character-count-font-size:var(
--spectrum-font-size-75
);--spectrum-textfield-character-count-spacing-inline:var(
--spectrum-spacing-200
);--spectrum-textfield-character-count-spacing-block:var(
--spectrum-component-bottom-to-text-75
);--spectrum-textfield-character-count-spacing-inline-side:var(
--spectrum-side-label-character-count-to-field
);--spectrum-textfield-character-count-spacing-block-side:var(
--spectrum-side-label-character-count-top-margin-medium
);--spectrum-textfield-focus-indicator-width:var(
--spectrum-focus-indicator-thickness
);--spectrum-textfield-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-textfield-background-color:var(--spectrum-gray-50);--spectrum-textfield-text-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-textfield-text-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-textfield-text-color-focus:var(
--spectrum-neutral-content-color-focus
);--spectrum-textfield-text-color-focus-hover:var(
--spectrum-neutral-content-color-focus-hover
);--spectrum-textfield-text-color-keyboard-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-textfield-text-color-readonly:var(
--spectrum-neutral-content-color-default
);--spectrum-textfield-background-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-textfield-border-color-disabled:var(
--spectrum-disabled-border-color
);--spectrum-textfield-text-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-textfield-border-color-invalid-default:var(
--spectrum-negative-border-color-default
);--spectrum-textfield-border-color-invalid-hover:var(
--spectrum-negative-border-color-hover
);--spectrum-textfield-border-color-invalid-focus:var(
--spectrum-negative-border-color-focus
);--spectrum-textfield-border-color-invalid-focus-hover:var(
--spectrum-negative-border-color-focus-hover
);--spectrum-textfield-border-color-invalid-keyboard-focus:var(
--spectrum-negative-border-color-key-focus
);--spectrum-textfield-icon-color-invalid:var(
--spectrum-negative-visual-color
);--spectrum-textfield-text-color-invalid:var(
--spectrum-neutral-content-color-default
);--spectrum-textfield-text-color-valid:var(
--spectrum-neutral-content-color-default
);--spectrum-textfield-icon-color-valid:var(
--spectrum-positive-visual-color
);--spectrum-textfield-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-text-area-min-inline-size:var(
--spectrum-text-area-minimum-width
);--spectrum-text-area-min-block-size:var(
--spectrum-text-area-minimum-height
);--spectrum-text-area-min-block-size-quiet:var(
--spectrum-component-height-100
)}:host([size=s]){--spectrum-textfield-height:var(--spectrum-component-height-75);--spectrum-textfield-label-spacing-block-quiet:var(
--spectrum-field-label-to-component-quiet-small
);--spectrum-textfield-label-spacing-inline-side-label:var(
--spectrum-spacing-100
);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-75);--spectrum-textfield-spacing-inline:var(
--spectrum-component-edge-to-text-75
);--spectrum-textfield-icon-size-invalid:var(
--spectrum-workflow-icon-size-75
);--spectrum-textfield-icon-spacing-inline-end-invalid:var(
--spectrum-field-edge-to-alert-icon-small
);--spectrum-textfield-icon-spacing-inline-end-valid:var(
--spectrum-field-edge-to-validation-icon-small
);--spectrum-textfield-icon-spacing-block-invalid:var(
--spectrum-field-top-to-alert-icon-small
);--spectrum-textfield-icon-spacing-block-valid:var(
--spectrum-field-top-to-validation-icon-small
);--spectrum-textfield-icon-spacing-inline-start-invalid:var(
--spectrum-field-text-to-alert-icon-small
);--spectrum-textfield-icon-spacing-inline-start-valid:var(
--spectrum-field-text-to-validation-icon-small
);--spectrum-textfield-character-count-font-size:var(
--spectrum-font-size-75
);--spectrum-textfield-character-count-spacing-block:var(
--spectrum-component-bottom-to-text-75
);--spectrum-textfield-character-count-spacing-block-quiet:var(
--spectrum-character-count-to-field-quiet-small
);--spectrum-textfield-character-count-spacing-block-side:var(
--spectrum-side-label-character-count-top-margin-small
);--spectrum-text-area-min-block-size-quiet:var(
--spectrum-component-height-75
)}:host([size=m]){--spectrum-textfield-height:var(--spectrum-component-height-100);--spectrum-textfield-label-spacing-block-quiet:var(
--spectrum-field-label-to-component-quiet-medium
);--spectrum-textfield-label-spacing-inline-side-label:var(
--spectrum-spacing-200
);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-100);--spectrum-textfield-spacing-inline:var(
--spectrum-component-edge-to-text-100
);--spectrum-textfield-icon-size-invalid:var(
--spectrum-workflow-icon-size-100
);--spectrum-textfield-icon-spacing-inline-end-invalid:var(
--spectrum-field-edge-to-alert-icon-medium
);--spectrum-textfield-icon-spacing-inline-end-valid:var(
--spectrum-field-edge-to-validation-icon-medium
);--spectrum-textfield-icon-spacing-block-invalid:var(
--spectrum-field-top-to-alert-icon-medium
);--spectrum-textfield-icon-spacing-block-valid:var(
--spectrum-field-top-to-validation-icon-medium
);--spectrum-textfield-icon-spacing-inline-start-invalid:var(
--spectrum-field-text-to-alert-icon-medium
);--spectrum-textfield-icon-spacing-inline-start-valid:var(
--spectrum-field-text-to-validation-icon-medium
);--spectrum-textfield-character-count-font-size:var(
--spectrum-font-size-75
);--spectrum-textfield-character-count-spacing-block:var(
--spectrum-component-bottom-to-text-75
);--spectrum-textfield-character-count-spacing-block-quiet:var(
--spectrum-character-count-to-field-quiet-medium
);--spectrum-textfield-character-count-spacing-block-side:var(
--spectrum-side-label-character-count-top-margin-medium
);--spectrum-text-area-min-block-size-quiet:var(
--spectrum-component-height-100
)}:host([size=l]){--spectrum-textfield-height:var(--spectrum-component-height-200);--spectrum-textfield-label-spacing-block-quiet:var(
--spectrum-field-label-to-component-quiet-large
);--spectrum-textfield-label-spacing-inline-side-label:var(
--spectrum-spacing-200
);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-200);--spectrum-textfield-spacing-inline:var(
--spectrum-component-edge-to-text-200
);--spectrum-textfield-icon-size-invalid:var(
--spectrum-workflow-icon-size-200
);--spectrum-textfield-icon-spacing-inline-end-invalid:var(
--spectrum-field-edge-to-alert-icon-large
);--spectrum-textfield-icon-spacing-inline-end-valid:var(
--spectrum-field-edge-to-validation-icon-large
);--spectrum-textfield-icon-spacing-block-invalid:var(
--spectrum-field-top-to-alert-icon-large
);--spectrum-textfield-icon-spacing-block-valid:var(
--spectrum-field-top-to-validation-icon-large
);--spectrum-textfield-icon-spacing-inline-start-invalid:var(
--spectrum-field-text-to-alert-icon-large
);--spectrum-textfield-icon-spacing-inline-start-valid:var(
--spectrum-field-text-to-validation-icon-large
);--spectrum-textfield-character-count-font-size:var(
--spectrum-font-size-100
);--spectrum-textfield-character-count-spacing-block:var(
--spectrum-component-bottom-to-text-100
);--spectrum-textfield-character-count-spacing-block-quiet:var(
--spectrum-character-count-to-field-quiet-large
);--spectrum-textfield-character-count-spacing-block-side:var(
--spectrum-side-label-character-count-top-margin-large
);--spectrum-text-area-min-block-size-quiet:var(
--spectrum-component-height-200
)}:host([size=xl]){--spectrum-textfield-height:var(--spectrum-component-height-300);--spectrum-textfield-label-spacing-block-quiet:var(
--spectrum-field-label-to-component-quiet-extra-large
);--spectrum-textfield-label-spacing-inline-side-label:var(
--spectrum-spacing-200
);--spectrum-textfield-placeholder-font-size:var(--spectrum-font-size-300);--spectrum-textfield-spacing-inline:var(
--spectrum-component-edge-to-text-200
);--spectrum-textfield-icon-size-invalid:var(
--spectrum-workflow-icon-size-300
);--spectrum-textfield-icon-spacing-inline-end-invalid:var(
--spectrum-field-edge-to-alert-icon-extra-large
);--spectrum-textfield-icon-spacing-inline-end-valid:var(
--spectrum-field-edge-to-validation-icon-extra-large
);--spectrum-textfield-icon-spacing-block-invalid:var(
--spectrum-field-top-to-alert-icon-extra-large
);--spectrum-textfield-icon-spacing-block-valid:var(
--spectrum-field-top-to-validation-icon-extra-large
);--spectrum-textfield-icon-spacing-inline-start-invalid:var(
--spectrum-field-text-to-alert-icon-extra-large
);--spectrum-textfield-icon-spacing-inline-start-valid:var(
--spectrum-field-text-to-validation-icon-extra-large
);--spectrum-textfield-character-count-font-size:var(
--spectrum-font-size-200
);--spectrum-textfield-character-count-spacing-block:var(
--spectrum-component-bottom-to-text-200
);--spectrum-textfield-character-count-spacing-block-quiet:var(
--spectrum-character-count-to-field-quiet-extra-large
);--spectrum-textfield-character-count-spacing-block-side:var(
--spectrum-side-label-character-count-top-margin-extra-large
);--spectrum-text-area-min-block-size-quiet:var(
--spectrum-component-height-300
)}#textfield{-moz-appearance:textfield;display:inline-grid;grid-template-columns:auto auto;grid-template-rows:auto auto auto;inline-size:var(--mod-textfield-width,var(--spectrum-textfield-width));margin:0;overflow:visible;position:relative;text-indent:0;text-overflow:ellipsis}:host([quiet]) #textfield:after{block-size:var(
--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width)
);bottom:calc((var(
--mod-textfield-focus-indicator-gap,
var(--spectrum-textfield-focus-indicator-gap)
) + var(
--mod-textfield-focus-indicator-width,
var(--spectrum-textfield-focus-indicator-width)
))*-1);content:"";inline-size:100%;left:0;position:absolute}:host([quiet]) #textfield.focus-visible:after,:host([quiet]) #textfield:focus-within:after,:host([quiet][focused]) #textfield:after{background-color:var(
--highcontrast-textfield-focus-indicator-color,var(
--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)
)
)}:host([quiet]) #textfield.focus-visible:after,:host([quiet]) #textfield:focus-within:after,:host([quiet][focused]) #textfield:after{background-color:var(
--highcontrast-textfield-focus-indicator-color,var(
--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)
)
)}:host([quiet]) #textfield:focus-visible:after,:host([quiet]) #textfield:focus-within:after,:host([quiet][focused]) #textfield:after{background-color:var(
--highcontrast-textfield-focus-indicator-color,var(
--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)
)
)}:host([invalid]) #textfield .icon,:host([valid]) #textfield .icon{grid-area:2/2;margin-inline-start:auto;pointer-events:all;position:absolute;top:0}:host([valid]) #textfield .icon{color:var(
--highcontrast-textfield-icon-color-valid,var(
--mod-textfield-icon-color-valid,var(--spectrum-textfield-icon-color-valid)
)
);inset-block-end:var(
--mod-textfield-icon-spacing-block-valid,var(--spectrum-textfield-icon-spacing-block-valid)
);inset-block-start:var(
--mod-textfield-icon-spacing-block-valid,var(--spectrum-textfield-icon-spacing-block-valid)
);inset-inline-end:var(
--mod-textfield-icon-spacing-inline-end-valid,var(--spectrum-textfield-icon-spacing-inline-end-valid)
);inset-inline-start:var(
--mod-textfield-icon-spacing-inline-start-valid,var(--spectrum-textfield-icon-spacing-inline-start-valid)
)}:host([invalid]) #textfield .icon{block-size:var(
--mod-textfield-icon-size-invalid,var(--spectrum-textfield-icon-size-invalid)
);color:var(
--highcontrast-textfield-icon-color-invalid,var(
--mod-textfield-icon-color-invalid,var(--spectrum-textfield-icon-color-invalid)
)
);inline-size:var(
--mod-textfield-icon-size-invalid,var(--spectrum-textfield-icon-size-invalid)
);inset-block-end:var(
--mod-textfield-icon-spacing-block-invalid,var(--spectrum-textfield-icon-spacing-block-invalid)
);inset-block-start:var(
--mod-textfield-icon-spacing-block-invalid,var(--spectrum-textfield-icon-spacing-block-invalid)
);inset-inline-end:var(
--mod-textfield-icon-spacing-inline-end-invalid,var(--spectrum-textfield-icon-spacing-inline-end-invalid)
);inset-inline-start:var(
--mod-textfield-icon-spacing-inline-start-invalid,var(--spectrum-textfield-icon-spacing-inline-start-invalid)
)}:host([disabled]) #textfield .icon,:host([readonly]) #textfield .icon{color:#0000}:host([quiet]) .icon{padding-inline-end:0}:host([quiet][valid]) .icon{inset-inline-end:var(
--mod-textfield-icon-spacing-inline-end-quiet-valid,var(--spectrum-textfield-icon-spacing-inline-end-quiet-valid)
)}:host([quiet][invalid]) .icon{inset-inline-end:var(
--mod-textfield-icon-spacing-inline-end-quiet-invalid,var(--spectrum-textfield-icon-spacing-inline-end-quiet-invalid)
)}.spectrum-InputGroup .icon{margin-inline-end:var(
--spectrum-textfield-icon-spacing-inline-end-override
)}#textfield .spectrum-FieldLabel{grid-area:1/1/auto/span 1;margin-block-end:var(
--mod-textfield-label-spacing-block,var(--spectrum-textfield-label-spacing-block)
);padding-left:calc(var(
--mod-textfield-corner-radius,
var(--spectrum-textfield-corner-radius)
)/2)}:host([quiet]) .spectrum-FieldLabel{margin-block-end:var(
--mod-textfield-label-spacing-block-quiet,var(--spectrum-textfield-label-spacing-block-quiet)
)}:host([disabled]) .spectrum-FieldLabel{color:var(--spectrum-textfield-text-color-disabled)}#textfield .spectrum-HelpText{grid-area:3/1/auto/span 2;margin-block-start:var(
--mod-textfield-helptext-spacing-block,var(--spectrum-textfield-helptext-spacing-block)
);padding-left:calc(var(
--mod-textfield-corner-radius,
var(--spectrum-textfield-corner-radius)
)/2)}.spectrum-Textfield-characterCount{align-items:flex-end;display:inline-flex;font-family:var(
--mod-textfield-character-count-font-family,var(--spectrum-textfield-character-count-font-family)
);font-size:var(
--mod-textfield-character-count-font-size,var(--spectrum-textfield-character-count-font-size)
);font-weight:var(
--mod-textfield-character-count-font-weight,var(--spectrum-textfield-character-count-font-weight)
);grid-area:1/2/auto/span 1;justify-content:flex-end;margin-block-end:var(
--mod-textfield-character-count-spacing-block,var(--spectrum-textfield-character-count-spacing-block)
);margin-inline-end:0;margin-inline-start:var(
--mod-textfield-character-count-spacing-inline,var(--spectrum-textfield-character-count-spacing-inline)
);padding-right:calc(var(
--mod-textfield-corner-radius,
var(--spectrum-textfield-corner-radius)
)/2);width:auto}:host([quiet]) .spectrum-Textfield-characterCount{margin-block-end:var(
--mod-textfield-character-count-spacing-block-quiet,var(--spectrum-textfield-character-count-spacing-block-quiet)
)}.input{-webkit-appearance:none;-moz-appearance:textfield;background-color:var(
--mod-textfield-background-color,var(--spectrum-textfield-background-color)
);block-size:var(--mod-textfield-height,var(--spectrum-textfield-height));border:var(
--mod-textfield-border-width,var(--spectrum-textfield-border-width)
) solid var(
--highcontrast-textfield-border-color,var(
--mod-textfield-border-color,var(--spectrum-textfield-border-color)
)
);border-radius:var(
--mod-textfield-corner-radius,var(--spectrum-textfield-corner-radius)
);box-sizing:border-box;color:var(
--highcontrast-textfield-text-color-default,var(
--mod-textfield-text-color-default,var(--spectrum-textfield-text-color-default)
)
);font-family:var(
--mod-textfield-font-family,var(--spectrum-textfield-font-family)
);font-size:var(
--mod-textfield-placeholder-font-size,var(--spectrum-textfield-placeholder-font-size)
);font-weight:var(
--mod-textfield-font-weight,var(--spectrum-textfield-font-weight)
);grid-area:2/1/auto/span 2;inline-size:100%;margin:0;min-inline-size:var(
--mod-textfield-min-width,var(--spectrum-textfield-min-width)
);outline:none;overflow:visible;padding-block-end:calc(var(
--mod-textfield-spacing-block-end,
var(--spectrum-textfield-spacing-block-end)
) - var(
--mod-textfield-border-width,
var(--spectrum-textfield-border-width)
));padding-block-start:calc(var(
--mod-textfield-spacing-block-start,
var(--spectrum-textfield-spacing-block-start)
) - var(
--mod-textfield-border-width,
var(--spectrum-textfield-border-width)
));padding-inline:calc(var(
--mod-textfield-spacing-inline,
var(--spectrum-textfield-spacing-inline)
) - var(
--mod-textfield-border-width,
var(--spectrum-textfield-border-width)
));text-indent:0;text-overflow:ellipsis;transition:border-color var(
--mod-texfield-animation-duration,var(--spectrum-texfield-animation-duration)
) ease-in-out;vertical-align:top}:host([quiet]) .icon-workflow~.input{padding-inline-start:calc(var(
--mod--Textfield-workflow-icon-gap,
var(--spectrum-Textfield-workflow-icon-gap)
) + var(
--mod-Textfield-workflow-icon-width,
var(--spectrum-Textfield-workflow-icon-width)
))}.input::-ms-clear{block-size:0;inline-size:0}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}.input::placeholder{color:var(
--highcontrast-textfield-text-color-default,var(
--mod-textfield-text-color-default,var(--spectrum-textfield-text-color-default)
)
);font-family:var(
--mod-textfield-font-family,var(--spectrum-textfield-font-family)
);font-size:var(
--mod-textfield-placeholder-font-size,var(--spectrum-textfield-placeholder-font-size)
);font-weight:var(
--mod-textfield-font-weight,var(--spectrum-textfield-font-weight)
);opacity:1;transition:color var(
--mod-texfield-animation-duration,var(--spectrum-texfield-animation-duration)
) ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}.input:lang(ja)::-moz-placeholder,.input:lang(ko)::-moz-placeholder,.input:lang(zh)::-moz-placeholder{font-style:normal}#textfield:hover .input,.input:hover{border-color:var(
--highcontrast-textfield-border-color-hover,var(
--mod-textfield-border-color-hover,var(--spectrum-textfield-border-color-hover)
)
);color:var(
--highcontrast-textfield-text-color-hover,var(
--mod-textfield-text-color-hover,var(--spectrum-textfield-text-color-hover)
)
)}#textfield:hover .input::placeholder,.input:hover::placeholder{color:var(
--highcontrast-textfield-text-color-hover,var(
--mod-textfield-text-color-hover,var(--spectrum-textfield-text-color-hover)
)
)}.input:focus,:host([focused]) .input{border-color:var(
--highcontrast-textfield-border-color-focus,var(
--mod-textfield-border-color-focus,var(--spectrum-textfield-border-color-focus)
)
);color:var(
--highcontrast-textfield-text-color-focus,var(
--mod-textfield-text-color-focus,var(--spectrum-textfield-text-color-focus)
)
)}.input:focus::placeholder,:host([focused]) .input::placeholder{color:var(
--highcontrast-textfield-text-color-focus,var(
--mod-textfield-text-color-focus,var(--spectrum-textfield-text-color-focus)
)
)}.input:focus:hover,:host([focused]) .input:hover{border-color:var(
--highcontrast-textfield-border-color-focus-hover,var(
--mod-textfield-border-color-focus-hover,var(--spectrum-textfield-border-color-focus-hover)
)
);color:var(
--highcontrast-textfield-text-color-focus-hover,var(
--mod-textfield-text-color-focus-hover,var(--spectrum-textfield-text-color-focus-hover)
)
)}.input:focus:hover::placeholder,:host([focused]) .input:hover::placeholder{color:var(
--highcontrast-textfield-text-color-focus-hover,var(
--mod-textfield-text-color-focus-hover,var(--spectrum-textfield-text-color-focus-hover)
)
)}.input.focus-visible,:host([focused]) .input{border-color:var(
--highcontrast-textfield-border-color-keyboard-focus,var(
--mod-textfield-border-color-keyboard-focus,var(--spectrum-textfield-border-color-keyboard-focus)
)
);color:var(
--highcontrast-textfield-text-color-keyboard-focus,var(
--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)
)
);outline:var(
--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-textfield-focus-indicator-color,var(
--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)
)
);outline-offset:var(
--mod-textfield-focus-indicator-gap,var(--spectrum-textfield-focus-indicator-gap)
)}.input.focus-visible,:host([focused]) .input{border-color:var(
--highcontrast-textfield-border-color-keyboard-focus,var(
--mod-textfield-border-color-keyboard-focus,var(--spectrum-textfield-border-color-keyboard-focus)
)
);color:var(
--highcontrast-textfield-text-color-keyboard-focus,var(
--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)
)
);outline:var(
--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-textfield-focus-indicator-color,var(
--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)
)
);outline-offset:var(
--mod-textfield-focus-indicator-gap,var(--spectrum-textfield-focus-indicator-gap)
)}.input:focus-visible,:host([focused]) .input{border-color:var(
--highcontrast-textfield-border-color-keyboard-focus,var(
--mod-textfield-border-color-keyboard-focus,var(--spectrum-textfield-border-color-keyboard-focus)
)
);color:var(
--highcontrast-textfield-text-color-keyboard-focus,var(
--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)
)
);outline:var(
--mod-textfield-focus-indicator-width,var(--spectrum-textfield-focus-indicator-width)
) solid;outline-color:var(
--highcontrast-textfield-focus-indicator-color,var(
--mod-textfield-focus-indicator-color,var(--spectrum-textfield-focus-indicator-color)
)
);outline-offset:var(
--mod-textfield-focus-indicator-gap,var(--spectrum-textfield-focus-indicator-gap)
)}.input.focus-visible::placeholder,:host([focused]) .input::placeholder{color:var(
--highcontrast-textfield-text-color-keyboard-focus,var(
--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)
)
)}.input.focus-visible::placeholder,:host([focused]) .input::placeholder{color:var(
--highcontrast-textfield-text-color-keyboard-focus,var(
--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)
)
)}.input:focus-visible::placeholder,:host([focused]) .input::placeholder{color:var(
--highcontrast-textfield-text-color-keyboard-focus,var(
--mod-textfield-text-color-keyboard-focus,var(--spectrum-textfield-text-color-keyboard-focus)
)
)}:host([valid]) .input{color:var(
--highcontrast-textfield-text-color-valid,var(
--mod-textfield-text-color-valid,var(--spectrum-textfield-text-color-valid)
)
)}:host([invalid]) .input{border-color:var(
--highcontrast-textfield-border-color-invalid-default,var(
--mod-textfield-border-color-invalid-default,var(--spectrum-textfield-border-color-invalid-default)
)
);color:var(
--highcontrast-textfield-text-color-invalid,var(
--mod-textfield-text-color-invalid,var(--spectrum-textfield-text-color-invalid)
)
)}:host([invalid]) .input:hover,:host([invalid]:hover) .input{border-color:var(
--highcontrast-textfield-border-color-invalid-hover,var(
--mod-textfield-border-color-invalid-hover,var(--spectrum-textfield-border-color-invalid-hover)
)
)}:host([invalid]) .input:focus,:host([invalid]:focus) .input,:host([invalid][focused]) .input{border-color:var(
--highcontrast-textfield-border-color-invalid-focus,var(
--mod-textfield-border-color-invalid-focus,var(--spectrum-textfield-border-color-invalid-focus)
)
)}:host([invalid]) .input:focus:hover,:host([invalid]:focus) .input:hover,:host([invalid][focused]) .input:hover{border-color:var(
--highcontrast-textfield-border-color-invalid-focus-hover,var(
--mod-textfield-border-color-invalid-focus-hover,var(--spectrum-textfield-border-color-invalid-focus-hover)
)
)}:host([invalid]) .input.focus-visible,:host([invalid][focused]) .input{border-color:var(
--highcontrast-textfield-border-color-invalid-keyboard-focus,var(
--mod-textfield-border-color-invalid-keyboard-focus,var(--spectrum-textfield-border-color-invalid-keyboard-focus)
)
)}:host([invalid]) .input.focus-visible,:host([invalid][focused]) .input{border-color:var(
--highcontrast-textfield-border-color-invalid-keyboard-focus,var(
--mod-textfield-border-color-invalid-keyboard-focus,var(--spectrum-textfield-border-color-invalid-keyboard-focus)
)
)}:host([invalid]) .input:focus-visible,:host([invalid][focused]) .input{border-color:var(
--highcontrast-textfield-border-color-invalid-keyboard-focus,var(
--mod-textfield-border-color-invalid-keyboard-focus,var(--spectrum-textfield-border-color-invalid-keyboard-focus)
)
)}.input:disabled,:host([disabled]) #textfield .input,:host([disabled]) #textfield:hover .input{-webkit-text-fill-color:var(
--highcontrast-textfield-text-color-disabled,var(
--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)
)
);background-color:var(
--mod-textfield-background-color-disabled,var(--spectrum-textfield-background-color-disabled)
);border-color:#0000;color:var(
--highcontrast-textfield-text-color-disabled,var(
--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)
)
);opacity:1;resize:none}.input:disabled::placeholder,:host([disabled]) #textfield .input::placeholder,:host([disabled]) #textfield:hover .input::placeholder{color:var(
--highcontrast-textfield-text-color-disabled,var(
--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)
)
)}:host([quiet]) .input{background-color:#0000;border-block-start-width:0;border-inline-width:0;border-radius:0;margin-block-end:var(
--mod-textfield-spacing-block-quiet,var(--spectrum-textfield-spacing-block-quiet)
);outline:none;overflow-y:hidden;padding-block-start:var(
--mod-textfield-spacing-block-start,var(--spectrum-textfield-spacing-block-start)
);padding-inline:var(
--mod-textfield-spacing-inline-quiet,var(--spectrum-textfield-spacing-inline-quiet)
);resize:none}.input:disabled,:host([quiet][disabled]) .input,:host([quiet][disabled]:hover) .input{background-color:#0000;border-color:var(
--mod-textfield-border-color-disabled,var(--spectrum-textfield-border-color-disabled)
);color:var(
--highcontrast-textfield-text-color-disabled,var(
--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)
)
)}.input:disabled::placeholder,:host([quiet][disabled]) .input::placeholder,:host([quiet][disabled]:hover) .input::placeholder{color:var(
--highcontrast-textfield-text-color-disabled,var(
--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)
)
)}.input:read-only,:host([readonly]) #textfield .input,:host([readonly]) #textfield:hover .input{background-color:#0000;border-color:#0000;color:var(
--highcontrast-textfield-text-color-readonly,var(
--mod-textfield-text-color-readonly,var(--spectrum-textfield-text-color-readonly)
)
);outline:none}.input:read-only::placeholder,:host([readonly]) #textfield .input::placeholder,:host([readonly]) #textfield:hover .input::placeholder{background-color:#0000;color:var(
--highcontrast-textfield-text-color-readonly,var(
--mod-textfield-text-color-readonly,var(--spectrum-textfield-text-color-readonly)
)
)}.spectrum-Textfield--sideLabel{grid-template-columns:auto auto auto;grid-template-rows:auto auto}.spectrum-Textfield--sideLabel:after{grid-area:1/2/span 1/span 1}.spectrum-Textfield--sideLabel .spectrum-FieldLabel{grid-area:1/1/span 2/span 1;margin-inline-end:var(
--mod-textfield-label-spacing-inline-side-label,var(--spectrum-textfield-label-spacing-inline-side-label)
)}.spectrum-Textfield--sideLabel .spectrum-Textfield-characterCount{align-items:flex-start;grid-area:1/3/auto/span 1;margin-block-start:var(
--mod-textfield-character-count-spacing-block-side,var(--spectrum-textfield-character-count-spacing-block-side)
);margin-inline-start:var(
--mod-textfield-character-count-spacing-inline-side,var(--spectrum-textfield-character-count-spacing-inline-side)
)}.spectrum-Textfield--sideLabel .spectrum-HelpText{grid-area:2/2/auto/span 1}.spectrum-Textfield--sideLabel .icon,.spectrum-Textfield--sideLabel .input{grid-area:1/2/span 1/span 1}:host([multiline]) .input{min-block-size:var(
--mod-text-area-min-block-size,var(--spectrum-text-area-min-block-size)
);min-inline-size:var(
--mod-text-area-min-inline-size,var(--spectrum-text-area-min-inline-size)
);resize:inherit}:host([multiline][grows]) .input{grid-row:1}:host([multiline][quiet]) .input{min-block-size:var(
--mod-text-area-min-block-size-quiet,var(--spectrum-text-area-min-block-size-quiet)
);overflow-y:hidden;resize:none}@media (forced-colors:active){:host{--highcontrast-textfield-border-color-hover:Highlight;--highcontrast-textfield-border-color-focus:Highlight;--highcontrast-textfield-border-color-keyboard-focus:CanvasText;--highcontrast-textfield-focus-indicator-color:Highlight;--highcontrast-textfield-border-color-invalid-default:Highlight;--highcontrast-textfield-border-color-invalid-hover:Highlight;--highcontrast-textfield-border-color-invalid-focus:Highlight;--highcontrast-textfield-border-color-invalid-keyboard-focus:Highlight;--highcontrast-textfield-text-color-valid:CanvasText;--highcontrast-textfield-text-color-invalid:CanvasText}#textfield .input{--highcontrast-textfield-text-color-default:CanvasText;--highcontrast-textfield-text-color-hover:CanvasText;--highcontrast-textfield-text-color-keyboard-focus:CanvasText;--highcontrast-textfield-text-color-disabled:GrayText;--highcontrast-textfield-text-color-readonly:CanvasText}#textfield .input::placeholder{--highcontrast-textfield-text-color-default:GrayText;--highcontrast-textfield-text-color-hover:GrayText;--highcontrast-textfield-text-color-keyboard-focus:GrayText;--highcontrast-textfield-text-color-disabled:GrayText;--highcontrast-textfield-text-color-readonly:CanvasText}}:host{--spectrum-textfield-border-color:var(
--system-spectrum-textfield-border-color
);--spectrum-textfield-border-color-hover:var(
--system-spectrum-textfield-border-color-hover
);--spectrum-textfield-border-color-focus:var(
--system-spectrum-textfield-border-color-focus
);--spectrum-textfield-border-color-focus-hover:var(
--system-spectrum-textfield-border-color-focus-hover
);--spectrum-textfield-border-color-keyboard-focus:var(
--system-spectrum-textfield-border-color-keyboard-focus
);--spectrum-textfield-border-width:var(
--system-spectrum-textfield-border-width
)}:host{display:inline-flex;flex-direction:column;inline-size:var(--mod-textfield-width,var(--spectrum-textfield-width))}:host([multiline]){resize:both}:host([multiline][readonly]){resize:none}#textfield{inline-size:100%}#textfield,textarea{resize:inherit}.input{min-inline-size:var(--spectrum-textfield-min-width)}:host([focused]) .input{caret-color:var(--swc-test-caret-color);forced-color-adjust:var(--swc-test-forced-color-adjust)}:host([grows]:not([quiet])) #textfield:after{grid-area:unset;min-block-size:calc(var(
--mod-text-area-min-block-size,
var(--spectrum-text-area-min-block-size)
) + var(
--mod-textfield-focus-indicator-gap,
var(--spectrum-textfield-focus-indicator-gap)
)*2)}#sizer{block-size:auto;opacity:0;word-break:break-word}.icon,.icon-workflow{pointer-events:none}:host([multiline]) #textfield{display:inline-grid}:host([multiline]) textarea{transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([multiline]:not([quiet])) #textfield:after{box-shadow:none}:host([multiline][rows]) .input{block-size:auto;resize:none}:host([multiline][rows="1"]) .input{min-block-size:auto}:host([grows]:not([rows])) .input:not(#sizer){height:100%;left:0;overflow:hidden;position:absolute;resize:none;top:0}:host([disabled][quiet]) #textfield .input,:host([disabled][quiet]) #textfield:hover .input,:host([quiet]) .input :disabled{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}:host([disabled]) #textfield .icon.icon-search,:host([readonly]) #textfield .icon.icon-search{color:var(
--highcontrast-textfield-text-color-disabled,var(
--mod-textfield-text-color-disabled,var(--spectrum-textfield-text-color-disabled)
)
)}
`,C=Object.defineProperty,L=Object.getOwnPropertyDescriptor,j=(e,t,r,o)=>{for(var i,c=o>1?void 0:o?L(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(c=(o?i(t,r,c):i(c))||c);return o&&c&&C(t,r,c),c};const S=["text","url","tel","email","password"];class F extends(E(o(p,{noDefaultSize:!0}))){constructor(){super(...arguments),this.allowedKeys="",this.focused=!1,this.invalid=!1,this.label="",this.placeholder="",this._type="text",this.grows=!1,this.maxlength=-1,this.minlength=-1,this.multiline=!1,this.readonly=!1,this.rows=-1,this.valid=!1,this._value="",this.quiet=!1,this.required=!1}static get styles(){return[I,h]}get type(){var e;return null!=(e=S.find((e=>e===this._type)))?e:"text"}set type(e){const t=this._type;this._type=e,this.requestUpdate("type",t)}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(e,t,r="none"){this.inputElement.setSelectionRange(e,t,r)}select(){this.inputElement.select()}handleInput(){if(this.allowedKeys&&this.inputElement.value&&!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const e=this.inputElement.selectionStart-1;return this.inputElement.value=this.value.toString(),void this.inputElement.setSelectionRange(e,e)}this.value=this.inputElement.value}handleChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!this.readonly&&!0}onBlur(){this.focused=!this.readonly&&!1}renderStateIcons(){return this.invalid?a`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `:this.valid?a`
                <sp-icon-checkmark100
                    id="valid"
                    class="icon spectrum-UIIcon-Checkmark100"
                ></sp-icon-checkmark100>
            `:c}get displayValue(){return this.value.toString()}get renderMultiline(){return a`
            ${this.grows&&-1===this.rows?a`
                      <div id="sizer" class="input" aria-hidden="true">
                          ${this.value}&#8203;
                      </div>
                  `:c}
            <!-- @ts-ignore -->
            <textarea
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.appliedLabel||this.placeholder}
                aria-invalid=${u(this.invalid||void 0)}
                class="input"
                maxlength=${u(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${u(this.minlength>-1?this.minlength:void 0)}
                title=${this.invalid?"":c}
                pattern=${u(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                rows=${u(this.rows>-1?this.rows:void 0)}
                autocomplete=${u(this.autocomplete)}
            ></textarea>
        `}get renderInput(){return a`
            <!-- @ts-ignore -->
            <input
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.appliedLabel||this.placeholder}
                aria-invalid=${u(this.invalid||void 0)}
                class="input"
                title=${this.invalid?"":c}
                maxlength=${u(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${u(this.minlength>-1?this.minlength:void 0)}
                pattern=${u(this.pattern)}
                placeholder=${this.placeholder}
                .value=${k(this.displayValue)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${u(this.autocomplete)}
            />
        `}renderField(){return a`
            ${this.renderStateIcons()}
            ${this.multiline?this.renderMultiline:this.renderInput}
        `}render(){return a`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `}update(e){(e.has("value")||e.has("required")&&this.required)&&this.updateComplete.then((()=>{this.checkValidity()})),super.update(e)}checkValidity(){let e=this.inputElement.checkValidity();return(this.required||this.value&&this.pattern)&&((this.disabled||this.multiline)&&this.pattern&&(e=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())),void 0!==this.minlength&&(e=e&&this.value.toString().length>=this.minlength),this.valid=e,this.invalid=!e),e}}j([d()],F.prototype,"appliedLabel",2),j([l({attribute:"allowed-keys"})],F.prototype,"allowedKeys",2),j([l({type:Boolean,reflect:!0})],F.prototype,"focused",2),j([m(".input:not(#sizer)")],F.prototype,"inputElement",2),j([l({type:Boolean,reflect:!0})],F.prototype,"invalid",2),j([l()],F.prototype,"label",2),j([l()],F.prototype,"placeholder",2),j([l({attribute:"type",reflect:!0})],F.prototype,"_type",2),j([d()],F.prototype,"type",1),j([l()],F.prototype,"pattern",2),j([l({type:Boolean,reflect:!0})],F.prototype,"grows",2),j([l({type:Number})],F.prototype,"maxlength",2),j([l({type:Number})],F.prototype,"minlength",2),j([l({type:Boolean,reflect:!0})],F.prototype,"multiline",2),j([l({type:Boolean,reflect:!0})],F.prototype,"readonly",2),j([l({type:Number})],F.prototype,"rows",2),j([l({type:Boolean,reflect:!0})],F.prototype,"valid",2),j([l({type:String})],F.prototype,"value",1),j([l({type:Boolean,reflect:!0})],F.prototype,"quiet",2),j([l({type:Boolean,reflect:!0})],F.prototype,"required",2),j([l({type:String,reflect:!0})],F.prototype,"autocomplete",2);class H extends F{constructor(){super(...arguments),this._value=""}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}}j([l({type:String})],H.prototype,"value",1),s("sp-clear-button",T);var U=r`
:host{--spectrum-search-inline-size:var(--spectrum-field-width);--spectrum-search-block-size:var(--spectrum-component-height-100);--spectrum-search-button-inline-size:var(--spectrum-search-block-size);--spectrum-search-min-inline-size:calc(var(--spectrum-search-field-minimum-width-multiplier)*var(--spectrum-search-block-size));--spectrum-search-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-search-text-to-icon:var(--spectrum-text-to-visual-100);--spectrum-search-to-help-text:var(--spectrum-help-text-to-component);--spectrum-search-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-search-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-search-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-search-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-search-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-search-font-family:var(--spectrum-sans-font-family-stack);--spectrum-search-font-weight:var(--spectrum-regular-font-weight);--spectrum-search-font-style:var(--spectrum-default-font-style);--spectrum-search-line-height:var(--spectrum-line-height-100);--spectrum-search-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-search-color-hover:var(--spectrum-neutral-content-color-hover);--spectrum-search-color-focus:var(--spectrum-neutral-content-color-focus);--spectrum-search-color-focus-hover:var(
--spectrum-neutral-content-color-focus-hover
);--spectrum-search-color-key-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-search-border-width:var(--spectrum-border-width-100);--spectrum-search-background-color:var(--spectrum-gray-50);--spectrum-search-color-disabled:var(--spectrum-disabled-content-color);--spectrum-search-background-color-disabled:var(
--spectrum-disabled-background-color
);--spectrum-search-border-color-disabled:var(
--spectrum-disabled-background-color
);--mod-textfield-font-family:var(
--mod-search-font-family,var(--spectrum-search-font-family)
);--mod-textfield-font-weight:var(
--mod-search-font-weight,var(--spectrum-search-font-weight)
);--mod-textfield-corner-radius:var(
--mod-search-border-radius,var(--spectrum-search-border-radius)
);--mod-textfield-border-width:var(
--mod-search-border-width,var(--spectrum-search-border-width)
);--mod-textfield-focus-indicator-gap:var(
--mod-search-focus-indicator-gap,var(--spectrum-search-focus-indicator-gap)
);--mod-textfield-focus-indicator-width:var(
--mod-search-focus-indicator-thickness,var(--spectrum-search-focus-indicator-thickness)
);--mod-textfield-focus-indicator-color:var(
--mod-search-focus-indicator-color,var(--spectrum-search-focus-indicator-color)
);--mod-textfield-text-color-default:var(
--mod-search-color-default,var(--spectrum-search-color-default)
);--mod-textfield-text-color-hover:var(
--mod-search-color-hover,var(--spectrum-search-color-hover)
);--mod-textfield-text-color-focus:var(
--mod-search-color-focus,var(--spectrum-search-color-focus)
);--mod-textfield-text-color-focus-hover:var(
--mod-search-color-focus-hover,var(--spectrum-search-color-focus-hover)
);--mod-textfield-text-color-keyboard-focus:var(
--mod-search-color-key-focus,var(--spectrum-search-color-key-focus)
);--mod-textfield-text-color-disabled:var(
--mod-search-color-disabled,var(--spectrum-search-color-disabled)
);--mod-textfield-border-color:var(
--mod-search-border-color-default,var(--spectrum-search-border-color-default)
);--mod-textfield-border-color-hover:var(
--mod-search-border-color-hover,var(--spectrum-search-border-color-hover)
);--mod-textfield-border-color-focus:var(
--mod-search-border-color-focus,var(--spectrum-search-border-color-focus)
);--mod-textfield-border-color-focus-hover:var(
--mod-search-border-color-focus-hover,var(--spectrum-search-border-color-focus-hover)
);--mod-textfield-border-color-keyboard-focus:var(
--mod-search-border-color-key-focus,var(--spectrum-search-border-color-key-focus)
);--mod-textfield-border-color-disabled:var(
--mod-search-border-color-disabled,var(--spectrum-search-border-color-disabled)
);--mod-textfield-background-color:var(
--mod-search-background-color,var(--spectrum-search-background-color)
);--mod-textfield-background-color-disabled:var(
--mod-search-background-color-disabled,var(--spectrum-search-background-color-disabled)
)}:host([size=s]){--spectrum-search-block-size:var(--spectrum-component-height-75);--spectrum-search-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-search-text-to-icon:var(--spectrum-text-to-visual-75)}:host([size=l]){--spectrum-search-block-size:var(--spectrum-component-height-200);--spectrum-search-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-search-text-to-icon:var(--spectrum-text-to-visual-200)}:host([size=xl]){--spectrum-search-block-size:var(--spectrum-component-height-300);--spectrum-search-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-search-text-to-icon:var(--spectrum-text-to-visual-300)}:host([quiet]){--spectrum-search-quiet-button-offset:calc(var(--mod-search-block-size, var(--spectrum-search-block-size))/2 - var(
--mod-workflow-icon-size-100,
var(--spectrum-workflow-icon-size-100)
)/2);--spectrum-search-background-color:transparent;--spectrum-search-background-color-disabled:transparent;--spectrum-search-border-color-disabled:var(
--spectrum-disabled-border-color
)}:host([quiet]) #textfield{--spectrum-search-border-radius:0;--spectrum-search-edge-to-visual:var(
--spectrum-field-edge-to-visual-quiet
)}@media (forced-colors:active){#textfield #textfield,#textfield #textfield .input{--highcontrast-search-color-default:CanvasText;--highcontrast-search-color-hover:CanvasText;--highcontrast-search-color-focus:CanvasText;--highcontrast-search-color-disabled:GrayText}#textfield #button .spectrum-ClearButton-fill{background-color:#0000;forced-color-adjust:none}}#textfield{display:inline-block;inline-size:var(
--mod-search-inline-size,var(--spectrum-search-inline-size)
);min-inline-size:var(
--mod-search-min-inline-size,var(--spectrum-search-min-inline-size)
);position:relative}#textfield .spectrum-HelpText{margin-block-start:var(
--mod-search-to-help-text,var(--spectrum-search-to-help-text)
)}#button{inset-block-start:0;inset-inline-end:0;position:absolute}#button,#button .spectrum-ClearButton-fill{border-radius:var(
--mod-search-border-radius,var(--spectrum-search-border-radius)
)}#textfield.is-disabled #button{display:none}#textfield{inline-size:100%}.icon-search{--spectrum-search-color:var(
--highcontrast-search-color-default,var(--mod-search-color-default,var(--spectrum-search-color-default))
);color:var(--spectrum-search-color);display:block;inset-block:0;margin-block:auto;position:absolute}#textfield:hover .icon-search{--spectrum-search-color:var(
--highcontrast-search-color-hover,var(--mod-search-color-hover,var(--spectrum-search-color-hover))
)}#textfield.is-focused .icon-search{--spectrum-search-color:var(
--highcontrast-search-color-focus,var(--mod-search-color-focus,var(--spectrum-search-color-focus))
)}#textfield.is-focused:hover .icon-search{--spectrum-search-color:var(
--highcontrast-search-color-focus,var(
--mod-search-color-focus-hover,var(--spectrum-search-color-focus-hover)
)
)}#textfield.is-keyboardFocused .icon-search{--spectrum-search-color:var(
--highcontrast-search-color-focus,var(
--mod-search-color-key-focus,var(--spectrum-search-color-key-focus)
)
)}#textfield.is-disabled .icon-search,#textfield.is-disabled:hover .icon-search{--spectrum-search-color:var(
--highcontrast-search-color-disabled,var(--mod-search-color-disabled,var(--spectrum-search-color-disabled))
)}.input{-webkit-appearance:none;block-size:var(--mod-search-block-size,var(--spectrum-search-block-size));font-style:var(--mod-search-font-style,var(--spectrum-search-font-style));line-height:var(
--mod-search-line-height,var(--spectrum-search-line-height)
);padding-block-end:calc(var(--mod-search-bottom-to-text, var(--spectrum-search-bottom-to-text)) - var(--mod-search-border-width, var(--spectrum-search-border-width)));padding-block-start:calc(var(--mod-search-top-to-text, var(--spectrum-search-top-to-text)) - var(--mod-search-border-width, var(--spectrum-search-border-width)))}.input::-webkit-search-cancel-button,.input::-webkit-search-decoration{-webkit-appearance:none}:host(:not([quiet])) #textfield .icon-search{inset-inline-start:var(
--mod-search-edge-to-visual,var(--spectrum-search-edge-to-visual)
)}:host(:not([quiet])) #textfield .input{padding-inline-end:calc(var(
--mod-search-button-inline-size,
var(--spectrum-search-button-inline-size)
) - var(--mod-search-border-width, var(--spectrum-search-border-width)));padding-inline-start:calc(var(--mod-search-edge-to-visual, var(--spectrum-search-edge-to-visual)) - var(--mod-search-border-width, var(--spectrum-search-border-width)) + var(--mod-search-icon-size, var(--spectrum-search-icon-size)) + var(--mod-search-text-to-icon, var(--spectrum-search-text-to-icon)))}:host([quiet]) #button{transform:translateX(var(
--mod-search-quiet-button-offset,var(--spectrum-search-quiet-button-offset)
))}:host([quiet]) #textfield .input{border-radius:var(
--mod-search-border-radius,var(--spectrum-search-border-radius)
);padding-block-start:var(
--mod-search-top-to-text,var(--spectrum-search-top-to-text)
);padding-inline-end:calc(var(
--mod-search-button-inline-size,
var(--spectrum-search-button-inline-size)
) - var(
--mod-search-quiet-button-offset,
var(--spectrum-search-quiet-button-offset)
));padding-inline-start:calc(var(--mod-search-edge-to-visual, var(--spectrum-search-edge-to-visual)) + var(--mod-search-icon-size, var(--spectrum-search-icon-size)) + var(--mod-search-text-to-icon, var(--spectrum-search-text-to-icon)))}:host{--spectrum-search-border-radius:var(
--system-spectrum-search-border-radius
);--spectrum-search-edge-to-visual:var(
--system-spectrum-search-edge-to-visual
);--spectrum-search-border-color-default:var(
--system-spectrum-search-border-color-default
);--spectrum-search-border-color-hover:var(
--system-spectrum-search-border-color-hover
);--spectrum-search-border-color-focus:var(
--system-spectrum-search-border-color-focus
);--spectrum-search-border-color-focus-hover:var(
--system-spectrum-search-border-color-focus-hover
);--spectrum-search-border-color-key-focus:var(
--system-spectrum-search-border-color-key-focus
)}:host([size=s]){--spectrum-search-border-radius:var(
--system-spectrum-search-sizes-border-radius
);--spectrum-search-edge-to-visual:var(
--system-spectrum-search-sizes-edge-to-visual
)}:host([size=m]){--spectrum-search-border-radius:var(
--system-spectrum-search-sizem-border-radius
);--spectrum-search-edge-to-visual:var(
--system-spectrum-search-sizem-edge-to-visual
)}:host([size=l]){--spectrum-search-border-radius:var(
--system-spectrum-search-sizel-border-radius
);--spectrum-search-edge-to-visual:var(
--system-spectrum-search-sizel-edge-to-visual
)}:host([size=xl]){--spectrum-search-border-radius:var(
--system-spectrum-search-sizexl-border-radius
);--spectrum-search-edge-to-visual:var(
--system-spectrum-search-sizexl-edge-to-visual
)}:host{--mod-textfield-spacing-inline:var(
--spectrum-alias-infieldbutton-full-height-m
)}input::-webkit-search-cancel-button{display:none}:host([size=s]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-s
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-75
)}:host([size=m]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-m
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-100
)}:host([size=l]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-l
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-200
)}:host([size=xl]){--spectrum-icon-tshirt-size-height:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-icon-tshirt-size-width:var(
--spectrum-alias-workflow-icon-size-xl
);--spectrum-ui-icon-tshirt-size-height:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
);--spectrum-ui-icon-tshirt-size-width:var(
--spectrum-alias-ui-icon-cornertriangle-size-300
)}
`,O=Object.defineProperty,_=Object.getOwnPropertyDescriptor,R=(e,t,r,o)=>{for(var i,c=o>1?void 0:o?_(t,r):t,a=e.length-1;a>=0;a--)(i=e[a])&&(c=(o?i(t,r,c):i(c))||c);return o&&c&&O(t,r,c),c};const A=e=>e.stopPropagation();class G extends H{constructor(){super(...arguments),this.action="",this.label="Search",this.placeholder="Search"}static get styles(){return[...super.styles,U]}handleSubmit(e){this.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))||e.preventDefault()}handleKeydown(e){const{code:t}=e;!this.value||"Escape"!==t||this.reset()}async reset(){this.value="",await this.updateComplete,this.focusElement.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.focusElement.dispatchEvent(new InputEvent("change",{bubbles:!0}))}renderField(){return a`
            <form
                action=${this.action}
                id="form"
                method=${u(this.method)}
                @submit=${this.handleSubmit}
                @reset=${this.reset}
                @keydown=${this.handleKeydown}
            >
                <sp-icon-magnify
                    class="icon magnifier icon-workflow icon-search"
                ></sp-icon-magnify>
                ${super.renderField()}
                ${this.value?a`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              type="reset"
                              size=${u(this.size)}
                              @keydown=${A}
                          ></sp-clear-button>
                      `:a``}
            </form>
        `}firstUpdated(e){super.firstUpdated(e),this.inputElement.setAttribute("type","search")}willUpdate(){this.multiline=!1}}R([l()],G.prototype,"action",2),R([l()],G.prototype,"label",2),R([l()],G.prototype,"method",2),R([l()],G.prototype,"placeholder",2),R([m("#form")],G.prototype,"form",2),s("sp-search",G);export{E as M,F as T,H as a};
//# sourceMappingURL=8dd42fe9.js.map
