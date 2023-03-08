import{a as e,i as t,S as r,t as o,l as s}from"./01bc7f71.js";import"./b891beff.js";import{i as c}from"./d230bd74.js";import{y as a,e as l,S as i,l as d,Z as u}from"./99636b0a.js";import{R as b}from"./464e15ff.js";import"./a3268a6a.js";import{u as p}from"./c93980f2.js";import{v as h,b as n}from"./2989aa79.js";function m(e,t,r){return e?t():null==r?void 0:r()}var g=Object.defineProperty,v=Object.getOwnPropertyDescriptor,f=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?v(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&g(t,r,c),c};class k extends e{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}get focusElement(){return this.inputElement}handleChange(){if(this.readonly)return void(this.inputElement.checked=this.checked);this.checked=this.inputElement.checked;const e=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(e)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return a`
            <input
                id="input"
                aria-labelledby="label"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `}}f([l({type:Boolean,reflect:!0})],k.prototype,"checked",2),f([l({type:Boolean,reflect:!0})],k.prototype,"readonly",2),f([t("#input")],k.prototype,"inputElement",2);var x=c`
:host{--spectrum-checkbox-content-color-default:var(
--spectrum-neutral-content-color-default
);--spectrum-checkbox-content-color-hover:var(
--spectrum-neutral-content-color-hover
);--spectrum-checkbox-content-color-down:var(
--spectrum-neutral-content-color-down
);--spectrum-checkbox-content-color-focus:var(
--spectrum-neutral-content-color-key-focus
);--spectrum-checkbox-focus-indicator-color:var(
--spectrum-focus-indicator-color
);--spectrum-checkbox-content-color-disabled:var(
--spectrum-disabled-content-color
);--spectrum-checkbox-control-color-disabled:var(--spectrum-gray-400);--spectrum-checkbox-checkmark-color:var(--spectrum-gray-75);--spectrum-checkbox-invalid-color-default:var(
--spectrum-negative-color-900
);--spectrum-checkbox-invalid-color-hover:var(
--spectrum-negative-color-1000
);--spectrum-checkbox-invalid-color-down:var(--spectrum-negative-color-1100);--spectrum-checkbox-invalid-color-focus:var(
--spectrum-negative-color-1000
);--spectrum-checkbox-emphasized-color-default:var(
--spectrum-accent-color-900
);--spectrum-checkbox-emphasized-color-hover:var(
--spectrum-accent-color-1000
);--spectrum-checkbox-emphasized-color-down:var(
--spectrum-accent-color-1100
);--spectrum-checkbox-emphasized-color-focus:var(
--spectrum-accent-color-1000
);--spectrum-checkbox-font-size:var(--spectrum-font-size-100);--spectrum-checkbox-line-height:var(--spectrum-line-height-100);--spectrum-checkbox-line-height-cjk:var(--spectrum-cjk-line-height-100);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-medium
);--spectrum-checkbox-control-corner-radius:var(--spectrum-corner-radius-75);--spectrum-checkbox-focus-indicator-gap:var(
--spectrum-focus-indicator-gap
);--spectrum-checkbox-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-checkbox-border-width:var(--spectrum-border-width-200);--spectrum-checkbox-selected-border-width:calc(var(--spectrum-checkbox-control-size)/2);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100);--spectrum-checkbox-animation-duration:var(
--spectrum-animation-duration-100
)}:host([size=s]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-75
);--spectrum-checkbox-height:var(--spectrum-component-height-75);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-small
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-75)}:host([size=m]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-100
);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-medium
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100)}:host([size=l]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-200
);--spectrum-checkbox-height:var(--spectrum-component-height-200);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-200)}:host([size=xl]){--spectrum-checkbox-font-size:var(
--spectrum-font-size-300
);--spectrum-checkbox-height:var(--spectrum-component-height-300);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-extra-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-300);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-300)}:host{align-items:flex-start;color:var(
--highcontrast-checkbox-content-color-default,var(
--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)
)
);max-inline-size:100%;min-block-size:var(--mod-checkox-height,var(--spectrum-checkbox-height));position:relative}:host(:hover) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-color-hover,var(--spectrum-checkbox-control-color-hover)
)
)}:host(:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)
)
)}:host(:hover) #label{color:var(
--highcontrast-checkbox-content-color-hover,var(
--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)
)
)}:host(:active) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-color-down,var(--spectrum-checkbox-control-color-down)
)
)}:host(:active) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-selected-color-down,var(--spectrum-checkbox-control-selected-color-down)
)
)}:host(:active) #label{color:var(
--highcontrast-checkbox-content-color-down,var(
--mod-checkbox-content-color-down,var(--spectrum-checkbox-content-color-down)
)
)}:host([invalid][dir]) #box:before,:host([invalid][dir]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
)}:host([invalid]) #input.focus-visible+#box:before,:host([invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid]) #input.focus-visible+#box:before,:host([invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid]) #input:focus-visible+#box:before,:host([invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid]:hover) #box:before,:host([invalid][dir]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([readonly]){border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]:active) #box:before{border-color:var(
--highcontrast-checkbox-selected-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]) #input:checked:disabled+#box:before,:host([readonly]) #input:disabled+#box:before{background-color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
)}:host([readonly]) #input:checked:disabled~#label,:host([readonly]) #input:disabled~#label{color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-content-color-default,var(--spectrum-checkbox-content-color-default)
)
);forced-color-adjust:none}:host([indeterminate]) #box:before,:host([indeterminate]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([indeterminate]) #box #checkmark,:host([indeterminate]) #input:checked+#box #checkmark{display:none}:host([indeterminate]) #box #partialCheckmark,:host([indeterminate]) #input:checked+#box #partialCheckmark{display:block;opacity:1;transform:scale(1)}:host([indeterminate]:hover) #box:before,:host([indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-control-selected-color-hover,var(--spectrum-checkbox-control-selected-color-hover)
)
)}:host([invalid][indeterminate]) #input:checked+#box:before,:host([invalid][indeterminate][size]) #box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([invalid][indeterminate]:hover) #box:before,:host([invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][indeterminate]:hover) #label{color:var(
--highcontrast-checkbox-content-color-hover,var(
--mod-checkbox-content-color-hover,var(--spectrum-checkbox-content-color-hover)
)
)}:host([emphasized]) #input:checked+#box:before,:host([emphasized][indeterminate]) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-default,var(--spectrum-checkbox-emphasized-color-default)
)
)}:host([emphasized]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}:host([emphasized]) #input.focus-visible+#box:before,:host([emphasized]) #input.focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized]) #input.focus-visible+#box:before,:host([emphasized]) #input.focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized]) #input:focus-visible+#box:before,:host([emphasized]) #input:focus-visible:checked+#box:before,:host([emphasized][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}:host([emphasized][invalid]) #input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid]) #input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid]) #input:focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid]:hover) #input:checked+#box:before,:host([emphasized][invalid][indeterminate]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([emphasized]:hover) #input:checked+#box:before,:host([emphasized][indeterminate]:hover) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}:host([emphasized]:active) #input:checked+#box:before,:host([emphasized][indeterminate]:active) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-down,var(--spectrum-checkbox-emphasized-color-down)
)
)}:host([emphasized][invalid]:active) #box:before,:host([emphasized][invalid]:active) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-invalid-color-down,var(--spectrum-checkbox-invalid-color-down)
)
)}:host([emphasized].focus-visible) #box:before,:host([emphasized].focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}:host([emphasized].focus-visible) #box:before,:host([emphasized].focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}:host([emphasized]:focus-visible) #box:before,:host([emphasized]:focus-visible) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}#label{font-size:var(
--mod-checkbox-font-size,var(--spectrum-checkbox-font-size)
);line-height:var(
--mod-checkbox-line-height,var(--spectrum-checkbox-line-height)
);margin-block-start:var(
--mod-checkbox-top-to-text,var(--spectrum-checkbox-top-to-text)
);margin-inline-start:var(
--mod-checkbox-text-to-control,var(--spectrum-checkbox-text-to-control)
);text-align:start;transition:color var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out}#label:lang(js),#label:lang(ko),#label:lang(zh){line-height:var(
--mod-checkbox-line-height-cjk,var(--spectrum-checkbox-line-height-cjk)
)}#input{block-size:100%;box-sizing:border-box;color:var(
--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)
);cursor:pointer;font-family:inherit;font-size:100%;inline-size:100%;line-height:1.15;margin:0;opacity:.0001;overflow:visible;padding:0;position:absolute;z-index:1}#input:disabled{cursor:default}#input:checked+#box:before{background-color:var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
);border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-selected-color-default,var(--spectrum-checkbox-control-selected-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}#input:checked+#box #checkmark{opacity:1;transform:scale(1)}#input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}#input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}#input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-focus,var(
--mod-checkbox-emphasized-color-focus,var(--spectrum-checkbox-emphasized-color-focus)
)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input.focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input:focus-visible+#box:after{box-shadow:0 0 0 var(
--mod-checkbox-focus-indicator-thinkness,var(--spectrum-checkbox-focus-indicator-thickness)
) var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);forced-color-adjust:none;margin:calc(var(
--mod-checkbox-focus-indicator-gap,
var(--spectrum-checkbox-focus-indicator-gap)
)*-1)}#input.focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#input.focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#input:focus-visible+#label{color:var(
--highcontrast-checkbox-content-color-focus,var(
--mod-checkbox-content-color-focus,var(--spectrum-checkbox-content-color-focus)
)
)}#box{--spectrum-checkbox-spacing:calc(var(--spectrum-checkbox-height) - var(--spectrum-checkbox-control-size));align-items:center;block-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);box-sizing:border-box;display:flex;flex-grow:0;flex-shrink:0;inline-size:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);justify-content:center;margin:calc(var(--mod-checkbox-spacing, var(--spectrum-checkbox-spacing))/2) 0;position:relative}#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-control-color-default,var(--spectrum-checkbox-control-color-default)
)
);border-radius:var(--spectrum-checkbox-control-corner-radius);border-style:solid;border-width:var(
--mod-checkbox-border-width,var(--spectrum-checkbox-border-width)
);box-sizing:border-box;content:"";display:block;forced-color-adjust:none;height:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);position:absolute;transition:border var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out,box-shadow var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out;width:var(
--mod-checkbox-control-size,var(--spectrum-checkbox-control-size)
);z-index:0}#box:after{border-radius:calc(var(--spectrum-checkbox-control-corner-radius) + var(--spectrum-checkbox-focus-indicator-gap));bottom:0;content:"";display:block;left:0;margin:var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
);position:absolute;right:0;top:0;transform:translate(0);transition:box-shadow var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-out,margin var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-out}#checkmark,#partialCheckmark{color:var(
--highcontrast-checkbox-background-color-default,var(
--mode-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);opacity:0;transform:scale(0);transition:opacity var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out,transform var(
--mod-checkbox-animation-duration,var(--spectrum-checkbox-animation-duration)
) ease-in-out}#partialCheckmark{display:none}#input:disabled+#box:before,:host([dir]) #input:checked:disabled+#box:before{background-color:var(
--highcontrast-checkbox-background-color-default,var(
--mod-checkbox-checkmark-color,var(--spectrum-checkbox-checkmark-color)
)
);border-color:var(
--highcontrast-checkbox-disabled-color-default,var(
--mod-checkbox-control-color-disabled,var(--spectrum-checkbox-control-color-disabled)
)
)}#input:checked:disabled~#label,#input:disabled~#label{color:var(
--highcontrast-checkbox-disabled-color-default,var(
--mod-checkbox-content-color-disabled,var(--spectrum-checkbox-content-color-disabled)
)
);forced-color-adjust:none}@media (forced-colors:active){#input.focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input.focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input:focus-visible+#box{forced-color-adjust:none;outline-color:var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
);outline-offset:var(
--highcontrast-checkbox-focus-indicator-gap,var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
)
);outline-style:auto;outline-width:var(
--mod-focus-indicator-thickness,var(--spectrum-focus-indicator-thickness)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}#input.focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}#input:focus-visible+#box:after{box-shadow:0 0 0 0 var(
--highcontrast-checkbox-focus-indicator-color,var(
--mod-checkbox-focus-indicator-color,var(--spectrum-checkbox-focus-indicator-color)
)
)}:host{--highcontrast-checkbox-content-color-default:ButtonText;--highcontrast-checkbox-content-color-hover:ButtonText;--highcontrast-checkbox-content-color-down:ButtonText;--highcontrast-checkbox-content-color-focus:ButtonText;--highcontrast-checkbox-background-color-default:Background;--highcontrast-checkbox-color-default:ButtonText;--highcontrast-checkbox-color-hover:ButtonText;--highcontrast-checkbox-highlight-color-default:Highlight;--highcontrast-checkbox-highlight-color-hover:Highlight;--highcontrast-checkbox-highlight-color-down:Highlight;--highcontrast-checkbox-disabled-color-default:GrayText;--highcontrast-checkbox-highlight-color-focus:Highlight;--highcontrast-checkbox-focus-indicator-color:FieldText;--highcontrast-checkbox-color-focus:FieldText}}:host{--spectrum-checkbox-control-color-default:var(
--system-spectrum-checkbox-control-color-default
);--spectrum-checkbox-control-color-hover:var(
--system-spectrum-checkbox-control-color-hover
);--spectrum-checkbox-control-color-down:var(
--system-spectrum-checkbox-control-color-down
);--spectrum-checkbox-control-color-focus:var(
--system-spectrum-checkbox-control-color-focus
);--spectrum-checkbox-control-selected-color-default:var(
--system-spectrum-checkbox-control-selected-color-default
);--spectrum-checkbox-control-selected-color-hover:var(
--system-spectrum-checkbox-control-selected-color-hover
);--spectrum-checkbox-control-selected-color-down:var(
--system-spectrum-checkbox-control-selected-color-down
)}:host{display:inline-flex;vertical-align:top}:host(:focus){outline:none}:host([disabled]){pointer-events:none}:host(:empty) label{display:none}
`;var y=c`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Dash50{height:var(--spectrum-alias-ui-icon-dash-size-50);width:var(
--spectrum-alias-ui-icon-dash-size-50
)}.spectrum-UIIcon-Dash75{height:var(--spectrum-alias-ui-icon-dash-size-75);width:var(
--spectrum-alias-ui-icon-dash-size-75
)}.spectrum-UIIcon-Dash100{height:var(--spectrum-alias-ui-icon-dash-size-100);width:var(
--spectrum-alias-ui-icon-dash-size-100
)}.spectrum-UIIcon-Dash200{height:var(--spectrum-alias-ui-icon-dash-size-200);width:var(
--spectrum-alias-ui-icon-dash-size-200
)}.spectrum-UIIcon-Dash300{height:var(--spectrum-alias-ui-icon-dash-size-300);width:var(
--spectrum-alias-ui-icon-dash-size-300
)}.spectrum-UIIcon-Dash400{height:var(--spectrum-alias-ui-icon-dash-size-400);width:var(
--spectrum-alias-ui-icon-dash-size-400
)}.spectrum-UIIcon-Dash500{height:var(--spectrum-alias-ui-icon-dash-size-500);width:var(
--spectrum-alias-ui-icon-dash-size-500
)}.spectrum-UIIcon-Dash600{height:var(--spectrum-alias-ui-icon-dash-size-600);width:var(
--spectrum-alias-ui-icon-dash-size-600
)}
`,w=Object.defineProperty,T=Object.getOwnPropertyDescriptor,z=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?T(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&w(t,r,c),c};const I={s:a`
        <sp-icon-checkmark75
            id="checkmark"
            class="spectrum-UIIcon-Checkmark75"
        ></sp-icon-checkmark75>
    `,m:a`
        <sp-icon-checkmark100
            id="checkmark"
            class="spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
    `,l:a`
        <sp-icon-checkmark200
            id="checkmark"
            class="spectrum-UIIcon-Checkmark200"
        ></sp-icon-checkmark200>
    `,xl:a`
        <sp-icon-checkmark300
            id="checkmark"
            class="spectrum-UIIcon-Checkmark300"
        ></sp-icon-checkmark300>
    `},C={s:a`
        <sp-icon-dash75
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,m:a`
        <sp-icon-dash100
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,l:a`
        <sp-icon-dash200
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,xl:a`
        <sp-icon-dash300
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class U extends(r(k)){constructor(){super(...arguments),this.indeterminate=!1,this.invalid=!1,this.emphasized=!1}static get styles(){return[x,p,y]}render(){return a`
            ${super.render()}
            <span id="box">
                ${I[this.size]}
                ${C[this.size]}
            </span>
            <label id="label"><slot></slot></label>
        `}updated(e){super.updated(e),e.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid")),e.has("indeterminate")&&(this.indeterminate?this.inputElement.setAttribute("aria-checked","mixed"):this.inputElement.removeAttribute("aria-checked"))}}z([l({type:Boolean,reflect:!0})],U.prototype,"indeterminate",2),z([l({type:Boolean,reflect:!0})],U.prototype,"invalid",2),z([l({type:Boolean,reflect:!0})],U.prototype,"emphasized",2),customElements.define("sp-checkbox",U);var q=c`
:host{--spectrum-swatch-focus-indicator-border-radius:8px;--spectrum-swatch-icon-border-color:rgba(0,0,0,.51);--spectrum-swatch-size:var(--spectrum-swatch-size-small);--spectrum-swatch-border-radius:var(--spectrum-corner-radius-100);--spectrum-swatch-border-thickness:var(--spectrum-border-width-100);--spectrum-swatch-border-thickness-selected:var(
--spectrum-border-width-200
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-small
);--spectrum-swatch-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-swatch-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-swatch-border-color-selected:var(--spectrum-gray-900);--spectrum-swatch-inner-border-color-selected:var(--spectrum-gray-50);--spectrum-swatch-disabled-icon-border-color:var(
--spectrum-swatch-disabled-icon-border-color
);--spectrum-swatch-disabled-icon-color:var(--spectrum-white);--spectrum-swatch-dash-icon-color:var(--spectrum-gray-800);--spectrum-swatch-slash-icon-color:var(--spectrum-red-900);--spectrum-swatch-focus-indicator-color:var(
--spectrum-focus-indicator-color
)}:host([size=xs]){--spectrum-swatch-size:var(
--spectrum-swatch-size-extra-small
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-50);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-extra-small
)}:host([size=s]){--spectrum-swatch-size:var(
--spectrum-swatch-size-small
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-small
)}:host([size=m]){--spectrum-swatch-size:var(
--spectrum-swatch-size-medium
);--spectrum-swatch-disabled-icon-size:var(
--spectrum-workflow-icon-size-100
);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-medium
)}:host([size=l]){--spectrum-swatch-size:var(
--spectrum-swatch-size-large
);--spectrum-swatch-disabled-icon-size:var(
--spectrum-workflow-icon-size-200
);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-large
)}@media (forced-colors:active){:host{--highcontrast-swatch-disabled-icon-color:GrayText;--highcontrast-swatch-focus-indicator-color:ButtonText;--highcontrast-swatch-background-color-selected:Background;--highcontrast-swatch-border-color-selected:Highlight;--highcontrast-swatch-border-color:ButtonText;--highcontrast-swatch-fill-foreground-color:ButtonText}.fill{forced-color-adjust:none}:host([disabled]) .fill{forced-color-adjust:auto}}:host{align-items:center;display:flex;height:var(--mod-swatch-size,var(--spectrum-swatch-size));justify-content:center;outline:none;position:relative;-webkit-user-select:none;user-select:none;width:var(
--mod-swatch-size,var(--spectrum-swatch-size)
)}.disabledIcon{height:var(
--mod-swatch-disabled-icon-size,var(--spectrum-swatch-disabled-icon-size)
);width:var(
--mod-swatch-disabled-icon-size,var(--spectrum-swatch-disabled-icon-size)
)}:host,:host:before{border-radius:var(
--mod-swatch-border-radius,var(--spectrum-swatch-border-radius)
)}:host([selected]){background-color:var(
--highcontrast-swatch-background-color-selected,var(
--mod-swatch-inner-border-color-selected,var(--spectrum-swatch-inner-border-color-selected)
)
)}:host([selected]) .fill{border-radius:0;clip-path:polygon(calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2),calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2),calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2),calc(var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) calc(100% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2))}:host([selected]) .fill:before{border-radius:0;box-shadow:none}:host([selected]):before{opacity:1}:host(.is-image) .fill:before{background-color:transparent}:host([mixed-value]) .fill{background:var(
--spectrum-picked-color,transparent
)}:host([mixed-value]) .mixedValueIcon{color:var(
--spectrum-swatch-dash-icon-color
);visibility:visible}:host([nothing]) .fill{background-color:var(
--spectrum-picked-color,transparent
);background-image:none}:host([nothing]) .fill:after{background:var(
--highcontrast-swatch-fill-foreground-color,var(
--mod-swatch-slash-icon-color,var(--spectrum-swatch-slash-icon-color)
)
);content:"";height:var(
--mod-swatch-slash-thickness,var(--spectrum-swatch-slash-thickness)
);position:absolute;transform:rotate(-45deg);width:200%}:host([nothing][shape=rectangle]) .fill:after{transform:rotate(-25deg)}:host([disabled]) .disabledIcon{visibility:visible}:host:before{border-color:var(
--highcontrast-swatch-border-color-selected,var(
--mod-swatch-border-color-selected,var(--spectrum-swatch-border-color-selected)
)
);border-style:solid;border-width:var(
--mod-swatch-border-thickness-selected,var(--spectrum-swatch-border-thickness-selected)
);content:"";inset:0;opacity:0;pointer-events:none;position:absolute}:host:after{border-color:var(
--highcontrast-swatch-focus-indicator-color,var(
--mod-swatch-focus-indicator-color,var(--spectrum-swatch-focus-indicator-color)
)
);border-radius:var(
--mod-swatch-focus-indicator-border-radius,var(--spectrum-swatch-focus-indicator-border-radius)
);border-style:solid;border-width:var(
--mod-swatch-focus-indicator-thickness,var(--spectrum-swatch-focus-indicator-thickness)
);content:"";inset:calc(var(
--mod-swatch-focus-indicator-gap,
var(--spectrum-swatch-focus-indicator-gap)
)*-2);opacity:0;position:absolute;transition:opacity var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out}:host(.focus-visible):after{opacity:1}:host(.focus-visible):after{opacity:1}:host(:focus-visible):after{opacity:1}.fill{--spectrum-swatch-checkerboard-size:8px;--spectrum-swatch-checkerboard-background-offset:0px;--spectrum-swatch-checkerboard-dark-color:#d9d9d9;--spectrum-swatch-checkerboard-light-color:#fff;align-items:center;background-color:var(--spectrum-swatch-checkerboard-light-color);background-image:linear-gradient(-45deg,transparent 75.5%,var(--spectrum-swatch-checkerboard-dark-color) 75.5%),linear-gradient(45deg,transparent 75.5%,var(--spectrum-swatch-checkerboard-dark-color) 75.5%),linear-gradient(-45deg,var(--spectrum-swatch-checkerboard-dark-color) 25.5%,transparent 25.5%),linear-gradient(45deg,var(--spectrum-swatch-checkerboard-dark-color) 25.5%,transparent 25.5%);background-position:var(--spectrum-swatch-checkerboard-background-offset) var(--spectrum-swatch-checkerboard-background-offset),var(--spectrum-swatch-checkerboard-background-offset) calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
) + var(--spectrum-swatch-checkerboard-background-offset)),calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
) + var(--spectrum-swatch-checkerboard-background-offset)) calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*-1 + var(--spectrum-swatch-checkerboard-background-offset)),calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*-1 + var(--spectrum-swatch-checkerboard-background-offset)) var(--spectrum-swatch-checkerboard-background-offset);background-size:calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*2) calc(var(
--mod-swatch-checkerboard-size,
var(--spectrum-swatch-checkerboard-size)
)*2);border-radius:var(
--mod-swatch-border-radius,var(--spectrum-swatch-border-radius)
);box-sizing:border-box;display:flex;height:100%;justify-content:center;overflow:hidden;position:relative;width:100%}.fill:before{background-color:var(--spectrum-picked-color,transparent);border-radius:var(
--mod-swatch-border-radius,var(--spectrum-swatch-border-radius)
);box-shadow:inset 0 0 0 var(
--mod-swatch-border-thickness,var(--spectrum-swatch-border-thickness)
) var(
--highcontrast-swatch-border-color,var(--mod-swatch-border-color,var(--spectrum-swatch-border-color))
);content:"";inset:0;position:absolute;z-index:0}:host([border=none]) .fill:before{background-color:var(--spectrum-picked-color,transparent);box-shadow:none}.mixedValueIcon{color:var(
--spectrum-picked-color,transparent
)}.disabledIcon,.mixedValueIcon{pointer-events:none;visibility:hidden}.disabledIcon{stroke:var(
--highcontrast-swatch-disabled-icon-color,var(
--mod-swatch-disabled-icon-color,var(--spectrum-swatch-disabled-icon-color)
)
);color:var(
--highcontrast-swatch-disabled-icon-color,var(
--mod-swatch-disabled-icon-color,var(--spectrum-swatch-disabled-icon-color)
)
);position:relative;z-index:2}.disabledIcon path:first-child{fill:var(
--highcontrast-swatch-disabled-icon-color,var(
--mod-swatch-disabled-icon-color,var(--spectrum-swatch-disabled-icon-color)
)
)}.disabledIcon path:last-child{fill:var(
--mod-swatch-icon-border-color,var(--spectrum-swatch-icon-border-color)
)}:host([shape=rectangle]){width:calc(var(--mod-swatch-size, var(--spectrum-swatch-size))*2)}:host([rounding=none]),:host([rounding=none]) .fill,:host([rounding=none]) .fill:before,:host([rounding=none]):after,:host([rounding=none]):before,:host([rounding=none][selected]) .fill,:host([rounding=none][selected]) .fill:before{border-radius:0}:host([rounding=full]:not([shape=rectangle])),:host([rounding=full]:not([shape=rectangle])) .fill,:host([rounding=full]:not([shape=rectangle])) .fill:before,:host([rounding=full]:not([shape=rectangle])):after,:host([rounding=full]:not([shape=rectangle])):before,:host([rounding=full][selected]:not([shape=rectangle])) .fill,:host([rounding=full][selected]:not([shape=rectangle])) .fill:before{border-radius:100%}:host([rounding=full][selected]:not([shape=rectangle])) .fill{clip-path:circle(calc(50% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) at 50% 50%)}::slotted([slot=image]){height:100%;object-fit:contain;transition:width var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,height var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;width:100%}
`,A=Object.defineProperty,S=Object.getOwnPropertyDescriptor,E=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?S(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&A(t,r,c),c};const j={xs:()=>a`
        <sp-icon-dash75
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,s:()=>a`
        <sp-icon-dash100
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,m:()=>a`
        <sp-icon-dash200
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,l:()=>a`
        <sp-icon-dash300
            slot="icon"
            class="mixedValueIcon spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class D extends(r(e,{validSizes:["xs","s","m","l"]})){constructor(){super(...arguments),this.color="",this.label="",this.mixedValue=!1,this.nothing=!1,this.role="button",this.selected=!1,this.renderDisabled=()=>a`
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="disabledIcon"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.889,1a8.889,8.889,0,1,0,8.889,8.889A8.889,8.889,0,0,0,9.889,1Zm6.667,8.889a6.635,6.635,0,0,1-1.233,3.863l-9.3-9.3A6.667,6.667,0,0,1,16.556,9.889Zm-13.333,0A6.636,6.636,0,0,1,4.455,6.026l9.3,9.3A6.667,6.667,0,0,1,3.222,9.889Z"
                    stroke="none"
                    fill="var(--spectrum-swatch-disabled-icon-color)"
                />
                <path
                    d="M 9.888889312744141 1 C 4.979689598083496 1 1 4.979689598083496 1 9.888889312744141 C 1 14.7980899810791 4.979689598083496 18.77777862548828 9.888889312744141 18.77777862548828 C 14.7980899810791 18.77777862548828 18.77777862548828 14.7980899810791 18.77777862548828 9.888889312744141 C 18.77777862548828 4.979689598083496 14.7980899810791 1 9.888889312744141 1 M 15.32277870178223 13.75166893005371 L 6.02610969543457 4.454998970031738 C 8.059318542480469 3.009572982788086 10.72937774658203 2.820217132568359 12.9462194442749 3.964249610900879 C 15.16304969787598 5.10828971862793 16.55568885803223 7.394259452819824 16.5555591583252 9.888889312744141 C 16.55776977539062 11.27357959747314 16.126708984375 12.62425994873047 15.32277870178223 13.75166893005371 M 9.888258934020996 16.55648612976074 C 8.843273162841797 16.55648612976074 7.794573783874512 16.31111145019531 6.831318855285645 15.8139591217041 C 4.614439010620117 14.66977882385254 3.221879959106445 12.38361930847168 3.222219467163086 9.888889312744141 C 3.220088958740234 8.504219055175781 3.651140213012695 7.153559684753418 4.454998970031738 6.02610969543457 L 13.75166893005371 15.32333946228027 C 12.60186290740967 16.14075088500977 11.24825286865234 16.55648612976074 9.888258934020996 16.55648612976074 M 9.888889312744141 0 C 15.34163951873779 0 19.77777862548828 4.436139106750488 19.77777862548828 9.888889312744141 C 19.77777862548828 15.34163951873779 15.34163951873779 19.77777862548828 9.888889312744141 19.77777862548828 C 4.436139106750488 19.77777862548828 0 15.34163951873779 0 9.888889312744141 C 0 4.436139106750488 4.436139106750488 0 9.888889312744141 0 Z M 15.10232830047607 12.11699867248535 C 15.40205764770508 11.41858959197998 15.55679702758789 10.66494941711426 15.5555591583252 9.89048957824707 C 15.5556697845459 7.759209632873535 14.38009929656982 5.829549789428711 12.48761940002441 4.852889060974121 C 11.68764972686768 4.440059661865234 10.78924942016602 4.22184944152832 9.889529228210449 4.22184944152832 C 9.114802360534668 4.22184944152832 8.360831260681152 4.377038955688477 7.661839485168457 4.676509857177734 L 15.10232830047607 12.11699867248535 Z M 12.11597919464111 15.10181331634521 L 4.675475120544434 7.660861015319824 C 4.375750541687012 8.359296798706055 4.221027374267578 9.112875938415527 4.222219467163086 9.887349128723145 C 4.221929550170898 12.01874923706055 5.397418975830078 13.94855880737305 7.289958953857422 14.92533874511719 C 8.08997917175293 15.3382396697998 8.988459587097168 15.55648994445801 9.888258934020996 15.55648994445801 C 10.66298007965088 15.55648994445801 11.41698551177979 15.40128421783447 12.11597919464111 15.10181331634521 Z"
                    stroke="none"
                    fill="var(--spectrum-swatch-disabled-icon-stroke-color)"
                />
            </svg>
        `,this.renderMixedValue=()=>j[this.size]()}static get styles(){return[q,y]}get value(){return this._value||this.color||this.label}set value(e){if(e===this._value)return;const t=this.value;this._value=e,this.requestUpdate("value",t)}get focusElement(){return this}toggle(e){this.selected=null!=e?e:!this.selected}handleClick(){this.disabled||this.mixedValue||(this.toggle(),this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||this.toggle())}handleKeydown(e){const{code:t}=e;if("Space"===t)e.preventDefault(),this.addEventListener("keyup",this.handleKeyup)}handleKeypress(e){const{code:t}=e;switch(t){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:t}=e;if("Space"===t)this.removeEventListener("keyup",this.handleKeyup),this.click()}render(){return a`
            <div class="fill" style="--spectrum-picked-color: ${this.color}">
                <slot name="image"></slot>
                ${m(this.disabled,this.renderDisabled)}
                ${m(this.mixedValue,this.renderMixedValue)}
            </div>
        `}willUpdate(e){if(this.getAttribute("role")||this.setAttribute("role","button"),e.has("selected")||e.has("role")){const t="button"===this.role?"aria-pressed":"aria-checked",r="button"===this.role?"aria-checked":"aria-pressed";e.has("role")&&this.removeAttribute(r),this.setAttribute(t,this.selected?"true":"false")}e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.hasAttribute("tabindex")||(this.tabIndex=0)}}E([l({reflect:!0})],D.prototype,"border",2),E([l()],D.prototype,"color",2),E([l()],D.prototype,"label",2),E([l({type:Boolean,reflect:!0,attribute:"mixed-value"})],D.prototype,"mixedValue",2),E([l({type:Boolean,reflect:!0})],D.prototype,"nothing",2),E([l({reflect:!0})],D.prototype,"role",2),E([l({reflect:!0})],D.prototype,"rounding",2),E([l({type:Boolean,reflect:!0})],D.prototype,"selected",2),E([l({reflect:!0})],D.prototype,"shape",2),E([l()],D.prototype,"value",1),customElements.define("sp-swatch",D);var O=c`
:host{--spectrum-swatchgroup-spacing-compact:var(
--spectrum-spacing-50
);--spectrum-swatchgroup-spacing-regular:var(--spectrum-spacing-75);--spectrum-swatchgroup-spacing-spacious:var(--spectrum-spacing-100)}:host{align-items:flex-start;display:inline-flex;flex-direction:row;flex-wrap:wrap;justify-content:flex-start}:host{gap:var(
--mod-swatchgroup-spacing-regular,var(--spectrum-swatchgroup-spacing-regular)
)}:host([density=compact]){gap:var(
--mod-swatchgroup-spacing-compact,var(--spectrum-swatchgroup-spacing-compact)
)}:host([density=spacious]){gap:var(
--mod-swatchgroup-spacing-spacious,var(--spectrum-swatchgroup-spacing-spacious)
)}
`,B=Object.defineProperty,H=Object.getOwnPropertyDescriptor,R=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?H(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&B(t,r,c),c};class $ extends(r(i,{validSizes:["xs","s","m","l"]})){constructor(){super(),this._selected=[],this.selectedSet=new Set,this.rovingTabindexController=new b(this,{focusInIndex:e=>{let t=-1;const r=e.findIndex(((r,o)=>(!e[t]&&!r.disabled&&(t=o),r.selected&&!r.disabled)));return e[r]?r:t},elements:()=>[...this.children],isFocusableElement:e=>!e.disabled}),this.manageChange=()=>{const e=new Set;this.selectedSet=new Set(this.selected),[...this.children].forEach((t=>{e.add(t.value),t.selected&&this.selectedSet.add(t.value)})),this.selectedSet.forEach((t=>{e.has(t)||this.selectedSet.delete(t)})),this._selected=[...this.selectedSet]},new o(this,{config:{attributes:!0,childList:!0,subtree:!0},callback:()=>{this.manageChange()}})}static get styles(){return[O]}get selected(){return this._selected}set selected(e){if(e===this.selected)return;const t=this.selected;this._selected=e,this.requestUpdate("selected",t)}focus(e){this.rovingTabindexController.focus(e)}handleChange(e){e.stopPropagation();const t=this.selected;if(this.selects){if("single"===this.selects){const{target:t}=e;if(t.tabIndex=0,t.selected=!0,this.selectedSet.has(t.value))return;this.selectedSet.clear(),this.selectedSet.add(t.value),this.rovingTabindexController.elements.forEach((e=>{e!==t&&(e.selected=!1)}))}else if("multiple"===this.selects){const{target:t}=e;t.selected?this.selectedSet.add(t.value):this.selectedSet.delete(t.value)}this._selected=[...this.selectedSet],this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||(this.selected=t,e.preventDefault())}else e.preventDefault()}getPassthroughSwatchActions(e){const t={};e.has("border")&&(this.border||void 0!==e.get("border"))&&(t.border=this.border),e.has("rounding")&&(this.rounding||void 0!==e.get("rounding"))&&(t.rounding=this.rounding),e.has("size")&&(this.size||void 0!==e.get("size"))&&(t.size=this.size),e.has("shape")&&(this.shape||void 0!==e.get("shape"))&&(t.shape=this.shape);const r=[];return Object.keys(t).length&&r.push((e=>{"border"in t&&(e.border=t.border),"rounding"in t&&(e.rounding=t.rounding),"shape"in t&&(e.shape=t.shape),"size"in t&&(e.size=t.size)})),r}getSelectionSwatchActions(e){const t=[];if(!e.has("selects"))return t;this.selects?this.setAttribute("role","single"===this.selects?"radiogroup":"group"):this.removeAttribute("role");const r=this.selects?{single:"radio",multiple:"checkbox"}[this.selects]:"button";return t.push((e=>{e.setAttribute("role",r)})),t}render(){return a`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `}willUpdate(e){const t=[...this.getPassthroughSwatchActions(e),...this.getSelectionSwatchActions(e)],r=new Set(this.selected),o=new Set;e.has("selected")&&t.push((e=>{o.add(e.value),r.has(e.value)||e.selected?e.selected=!0:e.selected=!1})),this.rovingTabindexController.elements.forEach((e=>{t.forEach((t=>{t(e)}))})),e.has("selected")&&(this.selected=[...r].filter((e=>o.has(e))),this.rovingTabindexController.clearElementCache())}}R([l({reflect:!0})],$.prototype,"border",2),R([l({reflect:!0})],$.prototype,"rounding",2),R([l({type:Array})],$.prototype,"selected",1),R([l()],$.prototype,"selects",2),R([l({reflect:!0})],$.prototype,"shape",2),customElements.define("sp-swatch-group",$);var L=c`
:host([dir=ltr][drop-target]):before{left:0}:host([dir=rtl][drop-target]):before{right:0}:host([dir=ltr][drop-target]):before{right:0}:host([dir=rtl][drop-target]):before{left:0}:host([drop-target]):before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host(:focus){outline:0}:host([dir=ltr]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host{background-color:var(
--spectrum-table-m-regular-row-background-color,var(--spectrum-alias-background-color-transparent)
);border-bottom:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host(:hover){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(.focus-visible),:host([focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(.focus-visible),:host([focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(:focus-visible),:host([focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}:host(:active){background-color:var(
--spectrum-table-m-regular-row-background-color-down,var(--spectrum-alias-highlight-down)
)}:host([selected]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected,var(--spectrum-alias-highlight-selected)
)}:host([selected]:hover){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover)
)}:host([selected].focus-visible),:host([selected][focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([selected].focus-visible),:host([selected][focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([selected]:focus-visible),:host([selected][focused]){background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([drop-target]):before{background-color:var(--spectrum-alias-highlight-selected);box-shadow:inset 0 0 0 2px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}:host{display:flex;width:100%}
`,P=Object.defineProperty,V=Object.getOwnPropertyDescriptor,M=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?V(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&P(t,r,c),c};class _ extends i{constructor(){super(...arguments),this.role="row",this.selectable=!1,this.selected=!1,this.value=""}static get styles(){return[L]}async handleChange(e){this.selected=e.target.checkbox.checked,await 0,e.defaultPrevented&&(this.selected=!this.selected)}handleSlotchange({target:e}){const t=e.assignedElements();this.selectable=!!t.find((e=>"sp-table-checkbox-cell"===e.localName))}manageSelected(){const[e]=this.checkboxCells;e&&(e.checked=this.selected)}handleClick(e){if(e.composedPath().find((e=>"sp-checkbox"===e.localName)))return;const[t]=this.checkboxCells;t&&t.click()}render(){return a`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `}willUpdate(e){e.has("selected")&&this.manageSelected(),e.has("selectable")&&(this.selectable?this.addEventListener("click",this.handleClick):this.removeEventListener("click",this.handleClick))}}M([d({selector:"sp-table-checkbox-cell",flatten:!0})],_.prototype,"checkboxCells",2),M([l({reflect:!0})],_.prototype,"role",2),M([l({type:Boolean})],_.prototype,"selectable",2),M([l({type:Boolean,reflect:!0})],_.prototype,"selected",2),M([l({type:String})],_.prototype,"value",2),customElements.define("sp-table-row",_);var K=c`
:host([align=center]){text-align:center}:host([dir=ltr][align=end]){text-align:right}:host([dir=rtl][align=end]){text-align:left}:host([dir=ltr]){padding-left:var(
--spectrum-table-regular-cell-padding-left
);padding-right:var(--spectrum-table-regular-cell-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-cell-padding-right);padding-right:var(
--spectrum-table-regular-cell-padding-left
)}:host{box-sizing:border-box;font-size:var(--spectrum-table-regular-cell-text-size);font-weight:var(--spectrum-table-regular-cell-text-font-weight);line-height:var(--spectrum-table-regular-cell-text-line-height);min-height:calc(var(--spectrum-table-regular-cell-min-height) - var(--spectrum-table-regular-cell-padding-top) - var(--spectrum-table-regular-cell-padding-bottom));padding-bottom:var(--spectrum-table-regular-cell-padding-bottom);padding-top:var(--spectrum-table-regular-cell-padding-top)}:host{position:relative}:host(.focus-visible),:host(.is-focused){outline:none}:host(.is-focused),:host(:focus-visible){outline:none}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr].focus-visible):before{right:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]:focus-visible):before{right:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl].focus-visible):before{left:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]:focus-visible):before{left:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr].focus-visible):before{left:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]:focus-visible):before{left:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl].focus-visible):before{right:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]:focus-visible):before{right:0}:host(.focus-visible):before,:host(.is-focused):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(.is-focused):before,:host(:focus-visible):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr]) .divider{border-right-width:var(
--spectrum-table-regular-divider-border-size
)}:host([dir=rtl]) .divider{border-left-width:var(
--spectrum-table-regular-divider-border-size
)}:host(.focus-visible):before,:host(.is-focused):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(.is-focused):before,:host(:focus-visible):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host{background-color:var(
--spectrum-table-m-regular-cell-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-table-m-regular-cell-text-color,var(--spectrum-alias-text-color)
)}:host([dir=ltr]) .divider{border-right-style:solid}:host([dir=rtl]) .divider{border-left-style:solid}:host([dir=ltr]) .divider{border-right-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) .divider{border-left-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}:host{display:block;flex:1}
`;var N=c`
:host([dir=ltr]) .sortedIcon{margin-left:var(
--spectrum-table-regular-header-sort-icon-gap
)}:host([dir=rtl]) .sortedIcon{margin-right:var(
--spectrum-table-regular-header-sort-icon-gap
)}:host([dir=ltr]){text-align:left}:host([dir=rtl]){text-align:right}:host([dir=ltr]){padding-left:var(
--spectrum-table-regular-header-padding-left
);padding-right:var(--spectrum-table-regular-header-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-header-padding-right);padding-right:var(
--spectrum-table-regular-header-padding-left
)}:host{border-radius:var(--spectrum-table-regular-header-border-radius);box-sizing:border-box;cursor:default;font-size:var(--spectrum-table-regular-header-text-size);font-weight:var(--spectrum-table-regular-header-text-font-weight);letter-spacing:var(--spectrum-table-regular-header-text-letter-spacing);line-height:var(--spectrum-table-regular-header-text-line-height);min-height:var(--spectrum-table-regular-header-min-height);outline:0;padding-bottom:var(--spectrum-table-regular-header-padding-bottom);padding-top:var(--spectrum-table-regular-header-padding-top);text-transform:uppercase;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([sortable]){cursor:pointer}:host([sort-direction=asc]) .sortedIcon,:host([sort-direction=desc]) .sortedIcon{display:inline-block;margin-top:calc(var(--spectrum-global-dimension-size-25)*-1)}:host([sort-direction=asc]) .sortedIcon{transform:rotate(-90deg)}:host{position:relative}:host(.focus-visible),:host([focused]){outline:none}:host(.focus-visible),:host([focused]){outline:none}:host(:focus-visible),:host([focused]){outline:none}:host([dir=ltr]) .spectrum-Table-headCell.focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=ltr]) .spectrum-Table-headCell.focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=ltr]) .spectrum-Table-headCell:focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=rtl]) .spectrum-Table-headCell.focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=rtl]) .spectrum-Table-headCell.focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=rtl]) .spectrum-Table-headCell:focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=ltr]) .spectrum-Table-headCell.focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=ltr]) .spectrum-Table-headCell.focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=ltr]) .spectrum-Table-headCell:focus-visible:before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:0}:host([dir=rtl]) .spectrum-Table-headCell.focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=rtl]) .spectrum-Table-headCell.focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:0}:host([dir=rtl]) .spectrum-Table-headCell:focus-visible:before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:0}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(:focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]) .spectrum-Table-headCell:before{left:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]) .spectrum-Table-headCell:before{right:var(
--spectrum-table-regular-border-size
)}:host(.focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(
--spectrum-table-regular-border-size
)}:host(.focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(
--spectrum-table-regular-border-size
)}:host(:focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(
--spectrum-table-regular-border-size
)}:host{background-color:var(
--spectrum-table-m-regular-header-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-table-m-regular-header-text-color,var(--spectrum-alias-label-text-color)
)}:host([sortable]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color,var(--spectrum-global-color-gray-600)
)}:host([sortable]:hover){color:var(
--spectrum-table-m-regular-header-text-color-hover,var(--spectrum-alias-text-color-hover)
)}:host([sortable]:hover) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-hover,var(--spectrum-alias-icon-color-hover)
)}:host([sortable].focus-visible),:host([sortable][focused]){color:var(
--spectrum-table-m-regular-header-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([sortable].focus-visible),:host([sortable][focused]){color:var(
--spectrum-table-m-regular-header-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([sortable]:focus-visible),:host([sortable][focused]){color:var(
--spectrum-table-m-regular-header-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}:host([sortable].focus-visible) .sortedIcon,:host([sortable][focused]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([sortable].focus-visible) .sortedIcon,:host([sortable][focused]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([sortable]:focus-visible) .sortedIcon,:host([sortable][focused]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-key-focus,var(--spectrum-alias-icon-color-key-focus)
)}:host([sortable][active]){color:var(
--spectrum-table-m-regular-header-text-color-down,var(--spectrum-alias-text-color-down)
)}:host([sortable][active]) .sortedIcon{color:var(
--spectrum-table-m-regular-header-sort-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(:focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host{display:block;flex:1}
`;var F=c`
:host([dir=ltr]){padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]){padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-regular-cell-checkbox-vertical-alignment
)}.checkbox{vertical-align:super}:host{align-items:center;display:flex;flex:0 1 0%}:host([selects-single]) sp-checkbox{visibility:hidden}
`,Z=Object.defineProperty,G=Object.getOwnPropertyDescriptor,J=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?G(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&Z(t,r,c),c};class Q extends i{constructor(){super(...arguments),this.role="gridcell",this.indeterminate=!1,this.checked=!1,this.disabled=!1,this.selectsSingle=!1}static get styles(){return[K,N,F]}click(){this.checkbox.click()}render(){return a`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                aria-hidden=${s(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}J([l({reflect:!0})],Q.prototype,"role",2),J([t(".checkbox")],Q.prototype,"checkbox",2),J([l({type:Boolean})],Q.prototype,"indeterminate",2),J([l({type:Boolean})],Q.prototype,"checked",2),J([l({type:Boolean})],Q.prototype,"disabled",2),J([l({type:Boolean,reflect:!0,attribute:"selects-single"})],Q.prototype,"selectsSingle",2),customElements.define("sp-table-checkbox-cell",Q);var W=c`
:host([dir=ltr][drop-target]):before{left:0}:host([dir=rtl][drop-target]):before{right:0}:host([dir=ltr][drop-target]):before{right:0}:host([dir=rtl][drop-target]):before{left:0}:host([drop-target]):before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(--spectrum-table-regular-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-regular-cell-vertical-alignment)}:host{background-color:var(
--spectrum-table-m-regular-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
);border-style:solid}:host([drop-target]){border-color:var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}:host([drop-target]):before{background-color:var(
--spectrum-alias-highlight-selected
)}:host{display:block;flex-grow:1}:host(:not([tabindex])){overflow:visible}
`,X=Object.defineProperty,Y=Object.getOwnPropertyDescriptor;class ee extends i{constructor(){super(),this.role="rowgroup",new o(this,{config:{childList:!0,subtree:!0},callback:()=>{requestAnimationFrame((()=>{this.shouldHaveTabIndex()}))}})}static get styles(){return[W]}shouldHaveTabIndex(){this.offsetHeight<this.scrollHeight?this.tabIndex=0:this.removeAttribute("tabindex")}render(){return a`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,c=o>1?void 0:o?Y(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);o&&c&&X(t,r,c)})([l({reflect:!0})],ee.prototype,"role",2),customElements.define("sp-table-body",ee);var te=c`
:host{border-collapse:separate;border-spacing:0}:host([size=s]){--spectrum-table-compact-quiet-border-radius:var(
--spectrum-table-s-compact-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-header-border-radius:var(
--spectrum-table-s-compact-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-cell-border-radius-key-focus:var(
--spectrum-table-s-compact-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-divider-border-size:var(
--spectrum-table-s-compact-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-compact-header-text-size:var(
--spectrum-table-s-compact-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-compact-header-text-font-weight:var(
--spectrum-table-s-compact-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-compact-header-text-letter-spacing:var(
--spectrum-table-s-compact-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-compact-header-text-line-height:var(
--spectrum-table-s-compact-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-compact-header-sort-icon-gap:var(
--spectrum-table-s-compact-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-compact-header-min-height:var(
--spectrum-table-s-compact-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-compact-header-padding-top:var(
--spectrum-table-s-compact-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-bottom:var(
--spectrum-table-s-compact-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-left:var(
--spectrum-table-s-compact-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-header-padding-right:var(
--spectrum-table-s-compact-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-text-size:var(
--spectrum-table-s-compact-cell-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-table-compact-cell-text-font-weight:var(
--spectrum-table-s-compact-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-compact-cell-text-line-height:var(
--spectrum-table-s-compact-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-compact-cell-checkbox-padding-right:var(
--spectrum-table-s-compact-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-compact-cell-checkbox-vertical-alignment:var(
--spectrum-table-s-compact-cell-checkbox-vertical-alignment,middle
);--spectrum-table-compact-cell-min-height:var(
--spectrum-table-s-compact-cell-min-height,var(--spectrum-global-dimension-size-300)
);--spectrum-table-compact-cell-padding-top:var(
--spectrum-table-s-compact-cell-padding-top,var(--spectrum-global-dimension-size-50)
);--spectrum-table-compact-cell-padding-bottom:var(
--spectrum-table-s-compact-cell-padding-bottom,var(--spectrum-global-dimension-size-50)
);--spectrum-table-compact-cell-padding-left:var(
--spectrum-table-s-compact-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-padding-right:var(
--spectrum-table-s-compact-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-vertical-alignment:var(
--spectrum-table-s-compact-cell-vertical-alignment,top
);--spectrum-table-compact-border-radius:var(
--spectrum-table-s-compact-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-border-size:var(
--spectrum-table-s-compact-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-quiet-border-radius:var(
--spectrum-table-s-regular-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-header-border-radius:var(
--spectrum-table-s-regular-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-cell-border-radius-key-focus:var(
--spectrum-table-s-regular-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-divider-border-size:var(
--spectrum-table-s-regular-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-header-text-size:var(
--spectrum-table-s-regular-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-regular-header-text-font-weight:var(
--spectrum-table-s-regular-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-regular-header-text-letter-spacing:var(
--spectrum-table-s-regular-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-regular-header-text-line-height:var(
--spectrum-table-s-regular-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-regular-header-sort-icon-gap:var(
--spectrum-table-s-regular-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-regular-header-min-height:var(
--spectrum-table-s-regular-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-regular-header-padding-top:var(
--spectrum-table-s-regular-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-bottom:var(
--spectrum-table-s-regular-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-left:var(
--spectrum-table-s-regular-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-header-padding-right:var(
--spectrum-table-s-regular-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-text-size:var(
--spectrum-table-s-regular-cell-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-table-regular-cell-text-font-weight:var(
--spectrum-table-s-regular-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-regular-cell-text-line-height:var(
--spectrum-table-s-regular-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-regular-cell-checkbox-padding-right:var(
--spectrum-table-s-regular-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-regular-cell-checkbox-vertical-alignment:var(
--spectrum-table-s-regular-cell-checkbox-vertical-alignment,middle
);--spectrum-table-regular-cell-min-height:var(
--spectrum-table-s-regular-cell-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-regular-cell-padding-top:var(
--spectrum-table-s-regular-cell-padding-top,var(--spectrum-global-dimension-size-85)
);--spectrum-table-regular-cell-padding-bottom:var(
--spectrum-table-s-regular-cell-padding-bottom,var(--spectrum-global-dimension-size-85)
);--spectrum-table-regular-cell-padding-left:var(
--spectrum-table-s-regular-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-padding-right:var(
--spectrum-table-s-regular-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-vertical-alignment:var(
--spectrum-table-s-regular-cell-vertical-alignment,top
);--spectrum-table-regular-border-radius:var(
--spectrum-table-s-regular-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-border-size:var(
--spectrum-table-s-regular-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-quiet-border-radius:var(
--spectrum-table-s-spacious-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-header-border-radius:var(
--spectrum-table-s-spacious-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-cell-border-radius-key-focus:var(
--spectrum-table-s-spacious-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-divider-border-size:var(
--spectrum-table-s-spacious-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-header-text-size:var(
--spectrum-table-s-spacious-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-spacious-header-text-font-weight:var(
--spectrum-table-s-spacious-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-spacious-header-text-letter-spacing:var(
--spectrum-table-s-spacious-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-spacious-header-text-line-height:var(
--spectrum-table-s-spacious-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-spacious-header-sort-icon-gap:var(
--spectrum-table-s-spacious-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-header-min-height:var(
--spectrum-table-s-spacious-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-spacious-header-padding-top:var(
--spectrum-table-s-spacious-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-bottom:var(
--spectrum-table-s-spacious-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-left:var(
--spectrum-table-s-spacious-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-header-padding-right:var(
--spectrum-table-s-spacious-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-text-size:var(
--spectrum-table-s-spacious-cell-text-size,var(--spectrum-global-dimension-font-size-75)
);--spectrum-table-spacious-cell-text-font-weight:var(
--spectrum-table-s-spacious-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-spacious-cell-text-line-height:var(
--spectrum-table-s-spacious-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-spacious-cell-checkbox-padding-right:var(
--spectrum-table-s-spacious-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-spacious-cell-checkbox-vertical-alignment:var(
--spectrum-table-s-spacious-cell-checkbox-vertical-alignment,middle
);--spectrum-table-spacious-cell-min-height:var(
--spectrum-table-s-spacious-cell-min-height,var(--spectrum-global-dimension-size-500)
);--spectrum-table-spacious-cell-padding-top:var(
--spectrum-table-s-spacious-cell-padding-top,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-cell-padding-bottom:var(
--spectrum-table-s-spacious-cell-padding-bottom,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-cell-padding-left:var(
--spectrum-table-s-spacious-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-padding-right:var(
--spectrum-table-s-spacious-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-vertical-alignment:var(
--spectrum-table-s-spacious-cell-vertical-alignment,top
);--spectrum-table-spacious-border-radius:var(
--spectrum-table-s-spacious-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-border-size:var(
--spectrum-table-s-spacious-border-size,var(--spectrum-alias-border-size-thin)
)}:host([size=m]){--spectrum-table-compact-quiet-border-radius:var(
--spectrum-table-m-compact-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-header-border-radius:var(
--spectrum-table-m-compact-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-compact-cell-border-radius-key-focus:var(
--spectrum-table-m-compact-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-divider-border-size:var(
--spectrum-table-m-compact-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-compact-header-text-size:var(
--spectrum-table-m-compact-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-compact-header-text-font-weight:var(
--spectrum-table-m-compact-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-compact-header-text-letter-spacing:var(
--spectrum-table-m-compact-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-compact-header-text-line-height:var(
--spectrum-table-m-compact-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-compact-header-sort-icon-gap:var(
--spectrum-table-m-compact-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-compact-header-min-height:var(
--spectrum-table-m-compact-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-compact-header-padding-top:var(
--spectrum-table-m-compact-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-bottom:var(
--spectrum-table-m-compact-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-compact-header-padding-left:var(
--spectrum-table-m-compact-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-header-padding-right:var(
--spectrum-table-m-compact-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-text-size:var(
--spectrum-table-m-compact-cell-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-table-compact-cell-text-font-weight:var(
--spectrum-table-m-compact-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-compact-cell-text-line-height:var(
--spectrum-table-m-compact-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-compact-cell-checkbox-padding-right:var(
--spectrum-table-m-compact-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-compact-cell-checkbox-vertical-alignment:var(
--spectrum-table-m-compact-cell-checkbox-vertical-alignment,middle
);--spectrum-table-compact-cell-min-height:var(
--spectrum-table-m-compact-cell-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-compact-cell-padding-top:var(
--spectrum-table-m-compact-cell-padding-top,var(--spectrum-global-dimension-size-85)
);--spectrum-table-compact-cell-padding-bottom:var(
--spectrum-table-m-compact-cell-padding-bottom,var(--spectrum-global-dimension-size-85)
);--spectrum-table-compact-cell-padding-left:var(
--spectrum-table-m-compact-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-padding-right:var(
--spectrum-table-m-compact-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-compact-cell-vertical-alignment:var(
--spectrum-table-m-compact-cell-vertical-alignment,top
);--spectrum-table-compact-border-radius:var(
--spectrum-table-m-compact-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-compact-border-size:var(
--spectrum-table-m-compact-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-quiet-border-radius:var(
--spectrum-table-m-regular-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-header-border-radius:var(
--spectrum-table-m-regular-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-regular-cell-border-radius-key-focus:var(
--spectrum-table-m-regular-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-divider-border-size:var(
--spectrum-table-m-regular-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-regular-header-text-size:var(
--spectrum-table-m-regular-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-regular-header-text-font-weight:var(
--spectrum-table-m-regular-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-regular-header-text-letter-spacing:var(
--spectrum-table-m-regular-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-regular-header-text-line-height:var(
--spectrum-table-m-regular-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-regular-header-sort-icon-gap:var(
--spectrum-table-m-regular-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-regular-header-min-height:var(
--spectrum-table-m-regular-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-regular-header-padding-top:var(
--spectrum-table-m-regular-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-bottom:var(
--spectrum-table-m-regular-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-regular-header-padding-left:var(
--spectrum-table-m-regular-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-header-padding-right:var(
--spectrum-table-m-regular-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-text-size:var(
--spectrum-table-m-regular-cell-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-table-regular-cell-text-font-weight:var(
--spectrum-table-m-regular-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-regular-cell-text-line-height:var(
--spectrum-table-m-regular-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-regular-cell-checkbox-padding-right:var(
--spectrum-table-m-regular-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-regular-cell-checkbox-vertical-alignment:var(
--spectrum-table-m-regular-cell-checkbox-vertical-alignment,middle
);--spectrum-table-regular-cell-min-height:var(
--spectrum-table-m-regular-cell-min-height,var(--spectrum-global-dimension-size-500)
);--spectrum-table-regular-cell-padding-top:var(
--spectrum-table-m-regular-cell-padding-top,var(--spectrum-global-dimension-size-130)
);--spectrum-table-regular-cell-padding-bottom:var(
--spectrum-table-m-regular-cell-padding-bottom,var(--spectrum-global-dimension-size-130)
);--spectrum-table-regular-cell-padding-left:var(
--spectrum-table-m-regular-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-padding-right:var(
--spectrum-table-m-regular-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-regular-cell-vertical-alignment:var(
--spectrum-table-m-regular-cell-vertical-alignment,top
);--spectrum-table-regular-border-radius:var(
--spectrum-table-m-regular-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-regular-border-size:var(
--spectrum-table-m-regular-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-quiet-border-radius:var(
--spectrum-table-m-spacious-quiet-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-header-border-radius:var(
--spectrum-table-m-spacious-header-border-radius,var(--spectrum-global-dimension-static-size-0)
);--spectrum-table-spacious-cell-border-radius-key-focus:var(
--spectrum-table-m-spacious-cell-border-radius-key-focus,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-divider-border-size:var(
--spectrum-table-m-spacious-divider-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-table-spacious-header-text-size:var(
--spectrum-table-m-spacious-header-text-size,var(--spectrum-global-dimension-font-size-50)
);--spectrum-table-spacious-header-text-font-weight:var(
--spectrum-table-m-spacious-header-text-font-weight,var(--spectrum-alias-detail-text-font-weight-regular)
);--spectrum-table-spacious-header-text-letter-spacing:var(
--spectrum-table-m-spacious-header-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);--spectrum-table-spacious-header-text-line-height:var(
--spectrum-table-m-spacious-header-text-line-height,var(--spectrum-alias-heading-text-line-height)
);--spectrum-table-spacious-header-sort-icon-gap:var(
--spectrum-table-m-spacious-header-sort-icon-gap,var(--spectrum-global-dimension-size-125)
);--spectrum-table-spacious-header-min-height:var(
--spectrum-table-m-spacious-header-min-height,var(--spectrum-global-dimension-size-400)
);--spectrum-table-spacious-header-padding-top:var(
--spectrum-table-m-spacious-header-padding-top,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-bottom:var(
--spectrum-table-m-spacious-header-padding-bottom,var(--spectrum-global-dimension-static-size-125)
);--spectrum-table-spacious-header-padding-left:var(
--spectrum-table-m-spacious-header-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-header-padding-right:var(
--spectrum-table-m-spacious-header-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-text-size:var(
--spectrum-table-m-spacious-cell-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-table-spacious-cell-text-font-weight:var(
--spectrum-table-m-spacious-cell-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);--spectrum-table-spacious-cell-text-line-height:var(
--spectrum-table-m-spacious-cell-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-table-spacious-cell-checkbox-padding-right:var(
--spectrum-table-m-spacious-cell-checkbox-padding-right,var(--spectrum-global-dimension-size-100)
);--spectrum-table-spacious-cell-checkbox-vertical-alignment:var(
--spectrum-table-m-spacious-cell-checkbox-vertical-alignment,middle
);--spectrum-table-spacious-cell-min-height:var(
--spectrum-table-m-spacious-cell-min-height,var(--spectrum-global-dimension-size-600)
);--spectrum-table-spacious-cell-padding-top:var(
--spectrum-table-m-spacious-cell-padding-top,var(--spectrum-global-dimension-size-185)
);--spectrum-table-spacious-cell-padding-bottom:var(
--spectrum-table-m-spacious-cell-padding-bottom,var(--spectrum-global-dimension-size-185)
);--spectrum-table-spacious-cell-padding-left:var(
--spectrum-table-m-spacious-cell-padding-left,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-padding-right:var(
--spectrum-table-m-spacious-cell-padding-right,var(--spectrum-global-dimension-static-size-200)
);--spectrum-table-spacious-cell-vertical-alignment:var(
--spectrum-table-m-spacious-cell-vertical-alignment,top
);--spectrum-table-spacious-border-radius:var(
--spectrum-table-m-spacious-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-table-spacious-border-size:var(
--spectrum-table-m-spacious-border-size,var(--spectrum-alias-border-size-thin)
)}.spectrum-Table-cell--alignCenter{text-align:center}:host([dir=ltr]) .spectrum-Table-cell--alignRight{text-align:right}:host([dir=rtl]) .spectrum-Table-cell--alignRight{text-align:left}:host([dir=ltr]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([dir=rtl]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=ltr]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=rtl]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}.spectrum-Table-body.is-drop-target:before,.spectrum-Table-row.is-drop-target:before,:host([density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious]) .spectrum-Table-row.is-drop-target:before{bottom:0;content:"";position:absolute;top:0;z-index:1}.spectrum-Table-body{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(--spectrum-table-regular-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-regular-cell-vertical-alignment)}:host(:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(
--spectrum-table-regular-border-size
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=rtl]:not(.spectrum-Table--quiet)) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-left-radius:var(
--spectrum-table-regular-border-radius
)}:host([dir=ltr]) .spectrum-Table-cell{padding-left:var(
--spectrum-table-regular-cell-padding-left
);padding-right:var(--spectrum-table-regular-cell-padding-right)}:host([dir=rtl]) .spectrum-Table-cell{padding-left:var(--spectrum-table-regular-cell-padding-right);padding-right:var(
--spectrum-table-regular-cell-padding-left
)}.spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-regular-cell-text-size);font-weight:var(--spectrum-table-regular-cell-text-font-weight);line-height:var(--spectrum-table-regular-cell-text-line-height);min-height:calc(var(--spectrum-table-regular-cell-min-height) - var(--spectrum-table-regular-cell-padding-top) - var(--spectrum-table-regular-cell-padding-bottom));padding-bottom:var(--spectrum-table-regular-cell-padding-bottom);padding-top:var(--spectrum-table-regular-cell-padding-top);position:relative}.spectrum-Table-cell.focus-visible,.spectrum-Table-cell.is-focused{outline:none}.spectrum-Table-cell.is-focused,.spectrum-Table-cell:focus-visible{outline:none}:host([dir=ltr]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]) .spectrum-Table-cell:focus-visible:before{right:0}:host([dir=rtl]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=ltr]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=ltr]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=rtl]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=rtl]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl]) .spectrum-Table-cell:focus-visible:before{right:0}.spectrum-Table-cell.focus-visible:before,.spectrum-Table-cell.is-focused:before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}.spectrum-Table-cell.is-focused:before,.spectrum-Table-cell:focus-visible:before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr]) .spectrum-Table-cell--divider{border-right-width:var(
--spectrum-table-regular-divider-border-size
)}:host([dir=rtl]) .spectrum-Table-cell--divider{border-left-width:var(
--spectrum-table-regular-divider-border-size
)}.spectrum-Table-row{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.spectrum-Table-row:focus{outline:0}:host>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}.spectrum-Table--quiet .spectrum-Table-body{border-radius:var(
--spectrum-table-regular-quiet-border-radius
)}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,.spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}:host([dir=rtl]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-regular-cell-checkbox-padding-right
)}.spectrum-Table-checkboxCell{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-regular-cell-checkbox-vertical-alignment
)}.spectrum-Table-checkbox{vertical-align:super}:host([density=compact]) .spectrum-Table-cell--alignCenter{text-align:center}:host([dir=ltr][density=compact]) .spectrum-Table-cell--alignRight{text-align:right}:host([dir=rtl][density=compact]) .spectrum-Table-cell--alignRight{text-align:left}:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=ltr][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=rtl][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=compact][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=compact][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=compact][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=compact][density=spacious]) .spectrum-Table-row.is-drop-target:before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=compact]) .spectrum-Table-body{border-radius:var(--spectrum-table-compact-border-radius);border-width:var(--spectrum-table-compact-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-compact-cell-vertical-alignment)}:host([density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body{border-radius:var(--spectrum-table-compact-border-radius);border-width:var(
--spectrum-table-compact-border-size
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=rtl][density=compact]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-left-radius:var(
--spectrum-table-compact-border-radius
)}:host([dir=ltr][density=compact]) .spectrum-Table-cell{padding-left:var(
--spectrum-table-compact-cell-padding-left
);padding-right:var(--spectrum-table-compact-cell-padding-right)}:host([dir=rtl][density=compact]) .spectrum-Table-cell{padding-left:var(--spectrum-table-compact-cell-padding-right);padding-right:var(
--spectrum-table-compact-cell-padding-left
)}:host([density=compact]) .spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-compact-cell-text-size);font-weight:var(--spectrum-table-compact-cell-text-font-weight);line-height:var(--spectrum-table-compact-cell-text-line-height);min-height:calc(var(--spectrum-table-compact-cell-min-height) - var(--spectrum-table-compact-cell-padding-top) - var(--spectrum-table-compact-cell-padding-bottom));padding-bottom:var(--spectrum-table-compact-cell-padding-bottom);padding-top:var(--spectrum-table-compact-cell-padding-top)}:host([density=compact]) .spectrum-Table-cell{position:relative}:host([density=compact]) .spectrum-Table-cell.focus-visible,:host([density=compact]) .spectrum-Table-cell.is-focused{outline:none}:host([density=compact]) .spectrum-Table-cell.is-focused,:host([density=compact]) .spectrum-Table-cell:focus-visible{outline:none}:host([dir=ltr][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell:focus-visible:before{right:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=ltr][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=ltr][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=compact]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=rtl][density=compact]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=compact]) .spectrum-Table-cell:focus-visible:before{right:0}:host([density=compact]) .spectrum-Table-cell.focus-visible:before,:host([density=compact]) .spectrum-Table-cell.is-focused:before{border-radius:calc(var(--spectrum-table-compact-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=compact]) .spectrum-Table-cell.is-focused:before,:host([density=compact]) .spectrum-Table-cell:focus-visible:before{border-radius:calc(var(--spectrum-table-compact-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr][density=compact]) .spectrum-Table-cell--divider{border-right-width:var(
--spectrum-table-compact-divider-border-size
)}:host([dir=rtl][density=compact]) .spectrum-Table-cell--divider{border-left-width:var(
--spectrum-table-compact-divider-border-size
)}:host([density=compact]) .spectrum-Table-row{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([density=compact]) .spectrum-Table-row:focus{outline:0}:host([density=compact]) .spectrum-Table>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}:host([density=compact]) .spectrum-Table--quiet .spectrum-Table-body{border-radius:var(
--spectrum-table-compact-quiet-border-radius
)}:host([density=compact]) .spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,:host([density=compact]) .spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][density=compact]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-compact-cell-checkbox-padding-right
)}:host([dir=rtl][density=compact]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-compact-cell-checkbox-padding-right
)}:host([density=compact]) .spectrum-Table-checkboxCell{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-compact-cell-checkbox-vertical-alignment
)}:host([density=compact]) .spectrum-Table-checkbox{vertical-align:super}:host([density=spacious]) .spectrum-Table-cell--alignCenter{text-align:center}:host([dir=ltr][density=spacious]) .spectrum-Table-cell--alignRight{text-align:right}:host([dir=rtl][density=spacious]) .spectrum-Table-cell--alignRight{text-align:left}:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=ltr][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=ltr][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{right:0}:host([dir=rtl][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([dir=rtl][density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{left:0}:host([density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious]) .spectrum-Table-row.is-drop-target:before,:host([density=spacious][density=compact]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious][density=compact]) .spectrum-Table-row.is-drop-target:before,:host([density=spacious][density=spacious]) .spectrum-Table-body.is-drop-target:before,:host([density=spacious][density=spacious]) .spectrum-Table-row.is-drop-target:before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=spacious]) .spectrum-Table-body{border-radius:var(--spectrum-table-spacious-border-radius);border-width:var(--spectrum-table-spacious-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-spacious-cell-vertical-alignment)}:host([density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body{border-radius:var(--spectrum-table-spacious-border-radius);border-width:var(
--spectrum-table-spacious-border-size
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:first-child{border-top-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:first-child .spectrum-Table-cell:last-child{border-top-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:first-child{border-bottom-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-right-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=rtl][density=spacious]) .spectrum-Table:not(.spectrum-Table--quiet) tbody.spectrum-Table-body .spectrum-Table-row:last-child .spectrum-Table-cell:last-child{border-bottom-left-radius:var(
--spectrum-table-spacious-border-radius
)}:host([dir=ltr][density=spacious]) .spectrum-Table-cell{padding-left:var(
--spectrum-table-spacious-cell-padding-left
);padding-right:var(--spectrum-table-spacious-cell-padding-right)}:host([dir=rtl][density=spacious]) .spectrum-Table-cell{padding-left:var(--spectrum-table-spacious-cell-padding-right);padding-right:var(
--spectrum-table-spacious-cell-padding-left
)}:host([density=spacious]) .spectrum-Table-cell{box-sizing:border-box;font-size:var(--spectrum-table-spacious-cell-text-size);font-weight:var(--spectrum-table-spacious-cell-text-font-weight);line-height:var(--spectrum-table-spacious-cell-text-line-height);min-height:calc(var(--spectrum-table-spacious-cell-min-height) - var(--spectrum-table-spacious-cell-padding-top) - var(--spectrum-table-spacious-cell-padding-bottom));padding-bottom:var(--spectrum-table-spacious-cell-padding-bottom);padding-top:var(--spectrum-table-spacious-cell-padding-top)}:host([density=spacious]) .spectrum-Table-cell{position:relative}:host([density=spacious]) .spectrum-Table-cell.focus-visible,:host([density=spacious]) .spectrum-Table-cell.is-focused{outline:none}:host([density=spacious]) .spectrum-Table-cell.is-focused,:host([density=spacious]) .spectrum-Table-cell:focus-visible{outline:none}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell:focus-visible:before{right:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before{left:0}:host([dir=ltr][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=ltr][density=spacious]) .spectrum-Table-cell:focus-visible:before{left:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before{right:0}:host([dir=rtl][density=spacious]) .spectrum-Table-cell.is-focused:before,:host([dir=rtl][density=spacious]) .spectrum-Table-cell:focus-visible:before{right:0}:host([density=spacious]) .spectrum-Table-cell.focus-visible:before,:host([density=spacious]) .spectrum-Table-cell.is-focused:before{border-radius:calc(var(--spectrum-table-spacious-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([density=spacious]) .spectrum-Table-cell.is-focused:before,:host([density=spacious]) .spectrum-Table-cell:focus-visible:before{border-radius:calc(var(--spectrum-table-spacious-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr][density=spacious]) .spectrum-Table-cell--divider{border-right-width:var(
--spectrum-table-spacious-divider-border-size
)}:host([dir=rtl][density=spacious]) .spectrum-Table-cell--divider{border-left-width:var(
--spectrum-table-spacious-divider-border-size
)}:host([density=spacious]) .spectrum-Table-row{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([density=spacious]) .spectrum-Table-row:focus{outline:0}:host([density=spacious]) .spectrum-Table>.spectrum-Table-body>.spectrum-Table-row:last-of-type{border-bottom-style:none}:host([density=spacious]) .spectrum-Table--quiet .spectrum-Table-body{border-radius:var(
--spectrum-table-spacious-quiet-border-radius
)}:host([density=spacious]) .spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before,:host([density=spacious]) .spectrum-Table--quiet .spectrum-Table-row.is-drop-target:before{border-radius:var(
--spectrum-alias-border-radius-regular,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr][density=spacious]) .spectrum-Table-checkboxCell{padding-right:var(
--spectrum-table-spacious-cell-checkbox-padding-right
)}:host([dir=rtl][density=spacious]) .spectrum-Table-checkboxCell{padding-left:var(
--spectrum-table-spacious-cell-checkbox-padding-right
)}:host([density=spacious]) .spectrum-Table-checkboxCell{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-spacious-cell-checkbox-vertical-alignment
)}:host([density=spacious]) .spectrum-Table-checkbox{vertical-align:super}.spectrum-Table-cell.focus-visible:before,.spectrum-Table-cell.is-focused:before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}.spectrum-Table-cell.is-focused:before,.spectrum-Table-cell:focus-visible:before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}.spectrum-Table-body{background-color:var(
--spectrum-table-m-regular-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
);border-style:solid}.spectrum-Table-body.is-drop-target{border-color:var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}.spectrum-Table-body.is-drop-target:before{background-color:var(
--spectrum-alias-highlight-selected
)}:host([dir=ltr]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child{border-left:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child{border-right:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=ltr]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}.spectrum-Table-row{background-color:var(
--spectrum-table-m-regular-row-background-color,var(--spectrum-alias-background-color-transparent)
);border-bottom:1px solid var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
)}.spectrum-Table-row:hover{background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table-row.focus-visible,.spectrum-Table-row.is-focused{background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table-row.is-focused,.spectrum-Table-row:focus-visible{background-color:var(
--spectrum-table-m-regular-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table-row:active{background-color:var(
--spectrum-table-m-regular-row-background-color-down,var(--spectrum-alias-highlight-down)
)}.spectrum-Table-row.is-selected{background-color:var(
--spectrum-table-m-regular-row-background-color-selected,var(--spectrum-alias-highlight-selected)
)}.spectrum-Table-row.is-selected:hover{background-color:var(
--spectrum-table-m-regular-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table-row.is-selected.focus-visible,.spectrum-Table-row.is-selected.is-focused{background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table-row.is-selected.is-focused,.spectrum-Table-row.is-selected:focus-visible{background-color:var(
--spectrum-table-m-regular-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table-row.is-drop-target:before{background-color:var(--spectrum-alias-highlight-selected);box-shadow:inset 0 0 0 2px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}.spectrum-Table-cell{background-color:var(
--spectrum-table-m-regular-cell-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-table-m-regular-cell-text-color,var(--spectrum-alias-text-color)
)}:host([dir=ltr]) .spectrum-Table-cell--divider{border-right-style:solid}:host([dir=rtl]) .spectrum-Table-cell--divider{border-left-style:solid}:host([dir=ltr]) .spectrum-Table-cell--divider{border-right-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}:host([dir=rtl]) .spectrum-Table-cell--divider{border-left-color:var(
--spectrum-table-m-regular-divider-border-color,var(--spectrum-alias-border-color-mid)
)}.spectrum-Table--quiet .spectrum-Table-body{background-color:var(
--spectrum-table-m-regular-quiet-cell-background-color,var(--spectrum-alias-background-color-transparent)
);border-width:1px 0}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target{border-color:transparent;box-shadow:none}.spectrum-Table--quiet .spectrum-Table-body.is-drop-target:before{box-shadow:inset 0 0 0 2px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}.spectrum-Table--quiet .spectrum-Table-row{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color,var(--spectrum-alias-background-color-transparent)
)}.spectrum-Table--quiet .spectrum-Table-row:hover{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.focus-visible,.spectrum-Table--quiet .spectrum-Table-row.is-focused{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.is-focused,.spectrum-Table--quiet .spectrum-Table-row:focus-visible{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-hover,var(--spectrum-alias-highlight-hover)
)}.spectrum-Table--quiet .spectrum-Table-row:active{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-down,var(--spectrum-alias-highlight-down)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected,var(--spectrum-alias-highlight-selected)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected:hover{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected-hover,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected.focus-visible,.spectrum-Table--quiet .spectrum-Table-row.is-selected.is-focused{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}.spectrum-Table--quiet .spectrum-Table-row.is-selected.is-focused,.spectrum-Table--quiet .spectrum-Table-row.is-selected:focus-visible{background-color:var(
--spectrum-table-m-regular-quiet-row-background-color-selected-key-focus,var(--spectrum-alias-highlight-selected-hover)
)}:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:none}:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:none}:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=ltr]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-right:none}:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:first-child,:host([dir=rtl]) .spectrum-Table--quiet tbody.spectrum-Table-body .spectrum-Table-row .spectrum-Table-cell:last-child{border-left:none}:host{display:flex;flex-direction:column}
`,re=Object.defineProperty,oe=Object.getOwnPropertyDescriptor,se=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?oe(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&re(t,r,c),c},ce=(e=>(e[e.ITEM=0]="ITEM",e[e.INFORMATION=1]="INFORMATION",e))(ce||{});const ae=class extends Event{constructor(e){super(ae.eventName,{bubbles:!0}),this.first=e.first,this.last=e.last}};let le=ae;le.eventName="rangeChanged";class ie extends(r(i,{validSizes:["s","m"],defaultSize:"m"})){constructor(){super(...arguments),this._renderItem=()=>a``,this.role="grid",this.selected=[],this.selectedSet=new Set,this.items=[],this.itemValue=(e,t)=>`${t}`,this.scroller=!1}static get styles(){return[te]}get renderItem(){return this._renderItem}set renderItem(e){this._renderItem=(t,r)=>{const o=this.itemValue(t,r),s=this.selected.includes(o),c=this.selects&&1!==(null==t?void 0:t._$rowType$);return a`
                <sp-table-row
                    value=${o}
                    aria-rowindex=${r+1}
                    ?selected=${s}
                >
                    ${c?a`
                              <sp-table-checkbox-cell
                                  ?checked=${s}
                              ></sp-table-checkbox-cell>
                          `:a``}
                    ${e(t,r)}
                </sp-table-row>
            `}}get tableHead(){return this.querySelector("sp-table-head")}get tableRows(){return this.isVirtualized?[]:[...this.querySelectorAll("sp-table-row")]}get isVirtualized(){return!!this.items.length}focus(){const e=this.querySelector("sp-table-head-cell[sortable]");e&&e.focus()}selectAllRows(){this.isVirtualized?this.items.forEach(((e,t)=>{1!==e._$rowType$&&this.selectedSet.add(this.itemValue(e,t))})):this.tableRows.forEach((e=>{e.selected=!0,this.selectedSet.add(e.value)})),this.selected=[...this.selectedSet],this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!0,this.tableHeadCheckboxCell.indeterminate=!1)}deselectAllRows(){this.selectedSet.clear(),this.selected=[],this.isVirtualized||[...this.querySelectorAll("[selected]")].forEach((e=>{e.selected=!1})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!1,this.tableHeadCheckboxCell.indeterminate=!1)}manageSelects(){const e=this.querySelectorAll("sp-table-checkbox-cell"),t=document.createElement("sp-table-checkbox-cell");if(this.selects){let e=!1;this.isVirtualized?e=this.selected.length>0&&this.selected.length===this.items.length:(this.tableRows.forEach((e=>{if(e.selected=this.selectedSet.has(e.value),!e.querySelector(":scope > sp-table-checkbox-cell")){const r=t.cloneNode();e.insertAdjacentElement("afterbegin",r),t.checked=e.selected}})),e=this.selected.length===this.tableRows.length),this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell)),this.manageHeadCheckbox(e)}else e.forEach((e=>{e.remove()})),delete this.tableHeadCheckboxCell}validateSelected(){const e=new Set;this.isVirtualized?this.items.forEach(((t,r)=>{const o=this.itemValue(t,r);e.add(o)})):this.tableRows.forEach((t=>{e.add(t.value)}));const t=this.selected.length;this.selected=this.selected.filter((t=>e.has(t))),t!==this.selected.length&&this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})),this.selectedSet=new Set(this.selected)}manageSelected(){this.validateSelected(),!this.isVirtualized&&(this.tableRows.forEach((e=>{e.selected=this.selectedSet.has(e.value)})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=this.selected.length===this.tableRows.length))}manageCheckboxes(){var e;if(this.selects){this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell");const e=this.selected.length===this.tableRows.length;this.manageHeadCheckbox(e),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell),this.tableRows.forEach((e=>{const t=document.createElement("sp-table-checkbox-cell");e.insertAdjacentElement("afterbegin",t),e.selected=this.selectedSet.has(e.value),t.checked=e.selected}))}else null==(e=this.tableHead.querySelector("sp-table-checkbox-cell"))||e.remove(),this.tableRows.forEach((e=>{var t;null==(t=e.checkboxCells[0])||t.remove(),this.selected.length&&(e.selected=this.selectedSet.has(e.value))}))}manageHeadCheckbox(e){this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.selectsSingle="single"===this.selects,this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e)}handleChange(e){e.stopPropagation();const t=new Set(this.selectedSet),r=[...this.selected],{target:o}=e,{parentElement:s}=o;if(s.value)switch(this.selects){case"single":this.deselectAllRows(),s.selected&&(this.selectedSet.add(s.value),this.selected=[...this.selectedSet]);break;case"multiple":{s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value),this.selected=[...this.selectedSet];const e=this.selected.length===this.tableRows.length;if(!this.tableHeadCheckboxCell)return;this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e;break}}else{const{checkbox:e}=o;e.checked||e.indeterminate?this.selectAllRows():this.deselectAllRows()}this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(e.preventDefault(),this.selectedSet=t,this.selected=r)}scrollToIndex(e){if(e&&this.tableBody){const t=this.tableBody[h].element(e);t&&t.scrollIntoView()}}render(){return a`
            <slot @change=${this.handleChange}></slot>
        `}willUpdate(e){this.hasUpdated||(this.validateSelected(),this.manageCheckboxes()),e.has("selects")&&this.manageSelects(),e.has("selected")&&this.hasUpdated&&this.manageSelected()}updated(){this.items.length&&this.renderVirtualizedItems()}renderVirtualizedItems(){if(!this.isConnected)return;this.tableBody||(this.tableBody=this.querySelector("sp-table-body"),this.tableBody||(this.tableBody=document.createElement("sp-table-body"),this.append(this.tableBody)),this.tableBody.addEventListener("rangeChanged",(e=>{this.dispatchEvent(new le({first:e.first,last:e.last}))})));const e={items:this.items,renderItem:this.renderItem,scroller:this.scroller};u(a`
                ${n(e)}
            `,this.tableBody)}disconnectedCallback(){super.disconnectedCallback()}}se([l({reflect:!0})],ie.prototype,"role",2),se([l({type:String,reflect:!0})],ie.prototype,"selects",2),se([l({type:Array})],ie.prototype,"selected",2),se([l({type:Array})],ie.prototype,"items",2),se([l({type:Object})],ie.prototype,"itemValue",2),se([l({type:Boolean,reflect:!0})],ie.prototype,"scroller",2),customElements.define("sp-table",ie);var de=Object.defineProperty,ue=Object.getOwnPropertyDescriptor;class be extends i{constructor(){super(...arguments),this.role="gridcell"}static get styles(){return[K]}render(){return a`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,c=o>1?void 0:o?ue(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);o&&c&&de(t,r,c)})([l({reflect:!0})],be.prototype,"role",2),customElements.define("sp-table-cell",be);var pe=c`
:host{display:flex}
`,he=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,me=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?ne(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&he(t,r,c),c};class ge extends i{constructor(){super(...arguments),this.role="row"}static get styles(){return[pe]}handleSorted({target:e}){[...this.children].forEach((t=>{t!==e&&(t.sortDirection=void 0)}))}handleChange({target:e}){this.selected=e.checkbox.checked||e.checkbox.indeterminate}render(){return a`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}me([l({reflect:!0})],ge.prototype,"role",2),me([l({type:Boolean,reflect:!0})],ge.prototype,"selected",2),customElements.define("sp-table-head",ge);var ve=c`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowDown75{transform:rotate(90deg)}.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ArrowUp100,.spectrum-UIIcon-ArrowUp200,.spectrum-UIIcon-ArrowUp300,.spectrum-UIIcon-ArrowUp400,.spectrum-UIIcon-ArrowUp500,.spectrum-UIIcon-ArrowUp600,.spectrum-UIIcon-ArrowUp75{transform:rotate(270deg)}.spectrum-UIIcon-ArrowDown75,.spectrum-UIIcon-ArrowLeft75,.spectrum-UIIcon-ArrowRight75,.spectrum-UIIcon-ArrowUp75{height:var(--spectrum-alias-ui-icon-arrow-size-75);width:var(
--spectrum-alias-ui-icon-arrow-size-75
)}.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowRight100,.spectrum-UIIcon-ArrowUp100{height:var(--spectrum-alias-ui-icon-arrow-size-100);width:var(
--spectrum-alias-ui-icon-arrow-size-100
)}.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowRight200,.spectrum-UIIcon-ArrowUp200{height:var(--spectrum-alias-ui-icon-arrow-size-200);width:var(
--spectrum-alias-ui-icon-arrow-size-200
)}.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowRight300,.spectrum-UIIcon-ArrowUp300{height:var(--spectrum-alias-ui-icon-arrow-size-300);width:var(
--spectrum-alias-ui-icon-arrow-size-300
)}.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowRight400,.spectrum-UIIcon-ArrowUp400{height:var(--spectrum-alias-ui-icon-arrow-size-400);width:var(
--spectrum-alias-ui-icon-arrow-size-400
)}.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowRight500,.spectrum-UIIcon-ArrowUp500{height:var(--spectrum-alias-ui-icon-arrow-size-500);width:var(
--spectrum-alias-ui-icon-arrow-size-500
)}.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowRight600,.spectrum-UIIcon-ArrowUp600{height:var(--spectrum-alias-ui-icon-arrow-size-600);width:var(
--spectrum-alias-ui-icon-arrow-size-600
)}
`,fe=Object.defineProperty,ke=Object.getOwnPropertyDescriptor,xe=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?ke(t,r):t,a=e.length-1;a>=0;a--)(s=e[a])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&fe(t,r,c),c};class ye extends i{constructor(){super(...arguments),this.role="columnheader",this.sortable=!1,this.sortKey=""}static get styles(){return[N,ve]}handleClick(){this.sortable&&(this.sortDirection?this.sortDirection="asc"===this.sortDirection?"desc":"asc":this.sortDirection="asc",this.dispatchEvent(new CustomEvent("sorted",{bubbles:!0,detail:{sortDirection:this.sortDirection,sortKey:this.sortKey}})))}render(){const e=this.sortable&&!!this.sortDirection;return a`
            <slot></slot>
            ${e?a`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `:a``}
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}update(e){e.has("sortDirection")&&this.setAttribute("aria-sort",(e=>({asc:"ascending",desc:"descending"}[e]||"none"))(this.sortDirection)),e.has("sortable")&&(this.tabIndex=this.sortable?0:-1),super.update(e)}}xe([l({reflect:!0})],ye.prototype,"role",2),xe([l({type:Boolean,reflect:!0})],ye.prototype,"sortable",2),xe([l({reflect:!0,attribute:"sort-direction"})],ye.prototype,"sortDirection",2),xe([l({attribute:"sort-key"})],ye.prototype,"sortKey",2),customElements.define("sp-table-head-cell",ye);export{k as C};
//# sourceMappingURL=1726438b.js.map
