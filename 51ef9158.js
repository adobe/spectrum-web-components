import{S as e,a as s,t}from"./7bbd9edb.js";import"./a90b2ffb.js";import{i as r}from"./d230bd74.js";import{v as c}from"./c3f7cd27.js";import{y as a,e as o,S as i}from"./d036ac45.js";import{R as d}from"./464e15ff.js";function l(e,s,t){return e?s():null==t?void 0:t()}var h=r`
:host{--spectrum-swatch-focus-indicator-border-radius:8px;--spectrum-swatch-icon-border-color:#00000082;--spectrum-swatch-size:var(--spectrum-swatch-size-small);--spectrum-swatch-border-radius:var(--spectrum-corner-radius-100);--spectrum-swatch-border-thickness:var(--spectrum-border-width-100);--spectrum-swatch-border-thickness-selected:var(
--spectrum-border-width-200
);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-small
);--spectrum-swatch-focus-indicator-thickness:var(
--spectrum-focus-indicator-thickness
);--spectrum-swatch-focus-indicator-gap:var(--spectrum-focus-indicator-gap);--spectrum-swatch-border-color-selected:var(--spectrum-gray-900);--spectrum-swatch-inner-border-color-selected:var(--spectrum-gray-50);--spectrum-swatch-disabled-icon-border-color:var(
--spectrum-swatch-disabled-icon-border-color
);--spectrum-swatch-disabled-icon-color:var(--spectrum-white);--spectrum-swatch-dash-icon-color:var(--spectrum-gray-800);--spectrum-swatch-slash-icon-color:var(--spectrum-red-900);--spectrum-swatch-focus-indicator-color:var(
--spectrum-focus-indicator-color
)}:host([size=xs]){--spectrum-swatch-size:var(--spectrum-swatch-size-extra-small);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-50);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-extra-small
)}:host([size=s]){--spectrum-swatch-size:var(--spectrum-swatch-size-small);--spectrum-swatch-disabled-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-small
)}:host([size=m]){--spectrum-swatch-size:var(--spectrum-swatch-size-medium);--spectrum-swatch-disabled-icon-size:var(
--spectrum-workflow-icon-size-100
);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-medium
)}:host([size=l]){--spectrum-swatch-size:var(--spectrum-swatch-size-large);--spectrum-swatch-disabled-icon-size:var(
--spectrum-workflow-icon-size-200
);--spectrum-swatch-slash-thickness:var(
--spectrum-swatch-slash-thickness-large
)}@media (forced-colors:active){:host{--highcontrast-swatch-disabled-icon-color:GrayText;--highcontrast-swatch-focus-indicator-color:ButtonText;--highcontrast-swatch-background-color-selected:Background;--highcontrast-swatch-border-color-selected:Highlight;--highcontrast-swatch-border-color:ButtonText;--highcontrast-swatch-fill-foreground-color:ButtonText}.fill{forced-color-adjust:none}:host([disabled]) .fill{forced-color-adjust:auto}}:host{align-items:center;display:flex;height:var(--mod-swatch-size,var(--spectrum-swatch-size));justify-content:center;outline:none;position:relative;-webkit-user-select:none;user-select:none;width:var(--mod-swatch-size,var(--spectrum-swatch-size))}.disabledIcon{height:var(
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
)*2))}:host([selected]) .fill:before{border-radius:0;box-shadow:none}:host([selected]):before{opacity:1}:host .is-image .fill:before{background-color:#0000}:host([mixed-value]) .fill{background:var(--spectrum-picked-color,transparent)}:host([mixed-value]) .mixedValueIcon{color:var(--spectrum-swatch-dash-icon-color);visibility:visible}:host([nothing]) .fill{background-color:var(--spectrum-picked-color,transparent);background-image:none}:host([nothing]) .fill:after{background:var(
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
);content:"";inset:0;position:absolute;z-index:0}:host([border=none]) .fill:before{background-color:var(--spectrum-picked-color,transparent);box-shadow:none}.mixedValueIcon{color:var(--spectrum-picked-color,transparent)}.disabledIcon,.mixedValueIcon{pointer-events:none;visibility:hidden}.disabledIcon{stroke:var(
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
)}:host([shape=rectangle]){width:calc(var(--mod-swatch-size, var(--spectrum-swatch-size))*2)}:host([rounding=none]),:host([rounding=none]) .fill,:host([rounding=none]) .fill:before,:host([rounding=none]):after,:host([rounding=none]):before,:host([rounding=none][selected]) .fill,:host([rounding=none][selected]) .fill:before{border-radius:0}:host([rounding=full]:not([shape=rectangle])),:host([rounding=full]:not([shape=rectangle])) .fill,:host([rounding=full]:not([shape=rectangle])) .fill:before,:host([rounding=full]:not([shape=rectangle])):after,:host([rounding=full]:not([shape=rectangle])):before,:host([rounding=full]:not([shape=rectangle])[selected]) .fill,:host([rounding=full]:not([shape=rectangle])[selected]) .fill:before{border-radius:100%}:host([rounding=full]:not([shape=rectangle])[selected]) .fill{clip-path:circle(calc(50% - var(
--mod-swatch-border-thickness-selected,
var(--spectrum-swatch-border-thickness-selected)
)*2) at 50% 50%)}::slotted([slot=image]){height:100%;object-fit:contain;transition:width var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out,height var(
--mod-animation-duration-100,var(--spectrum-animation-duration-100)
) ease-in-out;width:100%}
`,n=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p=(e,s,t,r)=>{for(var c,a=r>1?void 0:r?u(s,t):s,o=e.length-1;o>=0;o--)(c=e[o])&&(a=(r?c(s,t,a):c(a))||a);return r&&a&&n(s,t,a),a};const m={xs:()=>a`
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
    `};class b extends(e(s,{validSizes:["xs","s","m","l"]})){constructor(){super(...arguments),this.color="",this.label="",this.mixedValue=!1,this.nothing=!1,this.role="button",this.selected=!1,this.renderDisabled=()=>a`
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
        `,this.renderMixedValue=()=>m[this.size]()}static get styles(){return[h,c]}get value(){return this._value||this.color||this.label}set value(e){if(e===this._value)return;const s=this.value;this._value=e,this.requestUpdate("value",s)}get focusElement(){return this}toggle(e){this.selected=null!=e?e:!this.selected}handleClick(){this.disabled||this.mixedValue||(this.toggle(),this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||this.toggle())}handleKeydown(e){const{code:s}=e;if("Space"===s)e.preventDefault(),this.addEventListener("keyup",this.handleKeyup)}handleKeypress(e){const{code:s}=e;switch(s){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(e){const{code:s}=e;if("Space"===s)this.removeEventListener("keyup",this.handleKeyup),this.click()}render(){return a`
            <div class="fill" style="--spectrum-picked-color: ${this.color}">
                <slot name="image"></slot>
                ${l(this.disabled,this.renderDisabled)}
                ${l(this.mixedValue,this.renderMixedValue)}
            </div>
        `}willUpdate(e){if(this.getAttribute("role")||this.setAttribute("role","button"),e.has("selected")||e.has("role")){const s="button"===this.role?"aria-pressed":"aria-checked",t="button"===this.role?"aria-checked":"aria-pressed";e.has("role")&&this.removeAttribute(t),this.setAttribute(s,this.selected?"true":"false")}e.has("label")&&(this.label?this.setAttribute("aria-label",this.label):this.removeAttribute("aria-label"))}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.hasAttribute("tabindex")||(this.tabIndex=0)}}p([o({reflect:!0})],b.prototype,"border",2),p([o()],b.prototype,"color",2),p([o()],b.prototype,"label",2),p([o({type:Boolean,reflect:!0,attribute:"mixed-value"})],b.prototype,"mixedValue",2),p([o({type:Boolean,reflect:!0})],b.prototype,"nothing",2),p([o({reflect:!0})],b.prototype,"role",2),p([o({reflect:!0})],b.prototype,"rounding",2),p([o({type:Boolean,reflect:!0})],b.prototype,"selected",2),p([o({reflect:!0})],b.prototype,"shape",2),p([o()],b.prototype,"value",1),customElements.define("sp-swatch",b);var v=r`
:host{--spectrum-swatchgroup-spacing-compact:var(--spectrum-spacing-50);--spectrum-swatchgroup-spacing-regular:var(--spectrum-spacing-75);--spectrum-swatchgroup-spacing-spacious:var(--spectrum-spacing-100)}:host{align-items:flex-start;display:inline-flex;flex-flow:wrap;justify-content:flex-start}:host{gap:var(
--mod-swatchgroup-spacing-regular,var(--spectrum-swatchgroup-spacing-regular)
)}:host([density=compact]){gap:var(
--mod-swatchgroup-spacing-compact,var(--spectrum-swatchgroup-spacing-compact)
)}:host([density=spacious]){gap:var(
--mod-swatchgroup-spacing-spacious,var(--spectrum-swatchgroup-spacing-spacious)
)}
`,w=Object.defineProperty,g=Object.getOwnPropertyDescriptor,f=(e,s,t,r)=>{for(var c,a=r>1?void 0:r?g(s,t):s,o=e.length-1;o>=0;o--)(c=e[o])&&(a=(r?c(s,t,a):c(a))||a);return r&&a&&w(s,t,a),a};class k extends(e(i,{validSizes:["xs","s","m","l"]})){constructor(){super(),this._selected=[],this.selectedSet=new Set,this.rovingTabindexController=new d(this,{focusInIndex:e=>{let s=-1;const t=e.findIndex(((t,r)=>(!e[s]&&!t.disabled&&(s=r),t.selected&&!t.disabled)));return e[t]?t:s},elements:()=>[...this.children],isFocusableElement:e=>!e.disabled}),this.manageChange=()=>{const e=new Set;this.selectedSet=new Set(this.selected),[...this.children].forEach((s=>{e.add(s.value),s.selected&&this.selectedSet.add(s.value)})),this.selectedSet.forEach((s=>{e.has(s)||this.selectedSet.delete(s)})),this._selected=[...this.selectedSet]},new t(this,{config:{attributes:!0,childList:!0,subtree:!0},callback:()=>{this.manageChange()}})}static get styles(){return[v]}get selected(){return this._selected}set selected(e){if(e===this.selected)return;const s=this.selected;this._selected=e,this.requestUpdate("selected",s)}focus(e){this.rovingTabindexController.focus(e)}handleChange(e){e.stopPropagation();const s=this.selected;if(this.selects){if("single"===this.selects){const{target:s}=e;if(s.tabIndex=0,s.selected=!0,this.selectedSet.has(s.value))return;this.selectedSet.clear(),this.selectedSet.add(s.value),this.rovingTabindexController.elements.forEach((e=>{e!==s&&(e.selected=!1)}))}else if("multiple"===this.selects){const{target:s}=e;s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value)}this._selected=[...this.selectedSet],this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0}))||(this.selected=s,e.preventDefault())}else e.preventDefault()}getPassthroughSwatchActions(e){const s={};e.has("border")&&(this.border||void 0!==e.get("border"))&&(s.border=this.border),e.has("rounding")&&(this.rounding||void 0!==e.get("rounding"))&&(s.rounding=this.rounding),e.has("size")&&(this.size||void 0!==e.get("size"))&&(s.size=this.size),e.has("shape")&&(this.shape||void 0!==e.get("shape"))&&(s.shape=this.shape);const t=[];return Object.keys(s).length&&t.push((e=>{"border"in s&&(e.border=s.border),"rounding"in s&&(e.rounding=s.rounding),"shape"in s&&(e.shape=s.shape),"size"in s&&(e.size=s.size)})),t}getSelectionSwatchActions(e){const s=[];if(!e.has("selects"))return s;this.selects?this.setAttribute("role","single"===this.selects?"radiogroup":"group"):this.removeAttribute("role");const t=this.selects?{single:"radio",multiple:"checkbox"}[this.selects]:"button";return s.push((e=>{e.setAttribute("role",t)})),s}render(){return a`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.manageChange}
            ></slot>
        `}willUpdate(e){const s=[...this.getPassthroughSwatchActions(e),...this.getSelectionSwatchActions(e)],t=new Set(this.selected),r=new Set;e.has("selected")&&s.push((e=>{r.add(e.value),t.has(e.value)||e.selected?e.selected=!0:e.selected=!1})),this.rovingTabindexController.elements.forEach((e=>{s.forEach((s=>{s(e)}))})),e.has("selected")&&(this.selected=[...t].filter((e=>r.has(e))),this.rovingTabindexController.clearElementCache())}}f([o({reflect:!0})],k.prototype,"border",2),f([o({reflect:!0})],k.prototype,"rounding",2),f([o({type:Array})],k.prototype,"selected",1),f([o()],k.prototype,"selects",2),f([o({reflect:!0})],k.prototype,"shape",2),customElements.define("sp-swatch-group",k);
//# sourceMappingURL=51ef9158.js.map
