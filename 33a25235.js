import{i as e}from"./67a87733.js";import{b as t,a as r,i as o,S as s,$ as c,l as i,t as a}from"./0c1af6fc.js";import{T as l,S as n,x as h,e as d,d as u,B as p}from"./cd228091.js";import"./9f12f255.js";import"./9cdb9ada.js";import{e as m,i as b,t as v}from"./16ab2288.js";import{m as g,u as f,r as x,p as k,s as _,e as z}from"./7dca79b5.js";const w=(e,t,r)=>{const o=new Map;for(let s=t;s<=r;s++)o.set(e[s],s);return o},y=m(class extends b{constructor(e){if(super(e),e.type!==v.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let o;void 0===r?r=t:void 0!==t&&(o=t);const s=[],c=[];let i=0;for(const t of e)s[i]=o?o(t,i):i,c[i]=r(t,i),i++;return{values:c,keys:s}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,o]){var s;const c=g(e),{values:i,keys:a}=this.dt(t,r,o);if(!Array.isArray(c))return this.ht=a,i;const n=null!==(s=this.ht)&&void 0!==s?s:this.ht=[],h=[];let d,u,p=0,m=c.length-1,b=0,v=i.length-1;for(;p<=m&&b<=v;)if(null===c[p])p++;else if(null===c[m])m--;else if(n[p]===a[b])h[b]=f(c[p],i[b]),p++,b++;else if(n[m]===a[v])h[v]=f(c[m],i[v]),m--,v--;else if(n[p]===a[v])h[v]=f(c[p],i[v]),x(e,h[v+1],c[p]),p++,v--;else if(n[m]===a[b])h[b]=f(c[m],i[b]),x(e,c[p],c[m]),m--,b++;else if(void 0===d&&(d=w(a,b,v),u=w(n,p,m)),d.has(n[p]))if(d.has(n[m])){const t=u.get(a[b]),r=void 0!==t?c[t]:null;if(null===r){const t=x(e,c[p]);f(t,i[b]),h[b]=t}else h[b]=f(r,i[b]),x(e,c[p],r),c[t]=null;b++}else k(c[m]),m--;else k(c[p]),p++;for(;b<=v;){const t=x(e,h[v+1]);f(t,i[b]),h[b++]=t}for(;p<=m;){const e=c[p++];null!==e&&k(e)}return this.ht=a,_(e,h),l}}),C=(e,t)=>{var r,o;const s=e._$AN;if(void 0===s)return!1;for(const e of s)null===(o=(r=e)._$AO)||void 0===o||o.call(r,t,!1),C(e,t);return!0},I=e=>{let t,r;do{if(void 0===(t=e._$AM))break;r=t._$AN,r.delete(e),e=t}while(0===(null==r?void 0:r.size))},S=e=>{for(let t;t=e._$AM;e=t){let r=t._$AN;if(void 0===r)t._$AN=r=new Set;else if(r.has(e))break;r.add(e),L(t)}};function E(e){void 0!==this._$AN?(I(this),this._$AM=e,S(this)):this._$AM=e}function A(e,t=!1,r=0){const o=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(t)if(Array.isArray(o))for(let e=r;e<o.length;e++)C(o[e],!1),I(o[e]);else null!=o&&(C(o,!1),I(o));else C(this,e)}const L=e=>{var t,r,o,s;e.type==v.CHILD&&(null!==(t=(o=e)._$AP)&&void 0!==t||(o._$AP=A),null!==(r=(s=e)._$AQ)&&void 0!==r||(s._$AQ=E))};let U=class extends b{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,r){super._$AT(e,t,r),S(this),this.isConnected=e._$AU}_$AO(e,t=!0){var r,o;e!==this.isConnected&&(this.isConnected=e,e?null===(r=this.reconnected)||void 0===r||r.call(this):null===(o=this.disconnected)||void 0===o||o.call(this)),t&&(C(this,e),I(this))}setValue(e){if(z(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}};var O=e`
:host([dir=ltr][drop-target]):before{left:0}:host([dir=rtl][drop-target]):before{right:0}:host([dir=ltr][drop-target]):before{right:0}:host([dir=rtl][drop-target]):before{left:0}:host([drop-target]):before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host{cursor:pointer;position:relative;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host(:focus){outline:0}:host{background-color:var(
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
)}:host:active{background-color:var(
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
)}:host{display:flex;width:100%}:host(:last-of-type){border-bottom:none}
`,T=Object.defineProperty,D=Object.getOwnPropertyDescriptor,$=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?D(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&T(t,r,c),c};class R extends n{constructor(){super(...arguments),this.role="row",this.selectable=!1,this.selected=!1,this.value=""}static get styles(){return[O]}async handleChange(e){e.target.checkbox&&(this.selected=e.target.checkbox.checked,await 0,e.defaultPrevented&&(this.selected=!this.selected))}handleSlotchange({target:e}){const t=e.assignedElements();this.selectable=!!t.find((e=>"sp-table-checkbox-cell"===e.localName))}async manageSelected(){await this.updateComplete;const[e]=this.checkboxCells;e&&(e.checked=this.selected)}handleClick(e){if(e.composedPath().find((e=>"sp-table-checkbox-cell"===e.localName)))return;const[t]=this.checkboxCells;t&&t.click()}render(){return h`
            <slot
                @change=${this.handleChange}
                @slotchange=${this.handleSlotchange}
            ></slot>
        `}willUpdate(e){e.has("selected")&&this.manageSelected(),e.has("selectable")&&(this.selectable?this.addEventListener("click",this.handleClick):this.removeEventListener("click",this.handleClick))}}$([t({selector:"sp-table-checkbox-cell",flatten:!0})],R.prototype,"checkboxCells",2),$([d({reflect:!0})],R.prototype,"role",2),$([d({type:Boolean})],R.prototype,"selectable",2),$([d({type:Boolean,reflect:!0})],R.prototype,"selected",2),$([d({type:String})],R.prototype,"value",2),u("sp-table-row",R);var j=Object.defineProperty,V=Object.getOwnPropertyDescriptor,H=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?V(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&j(t,r,c),c};class M extends r{constructor(){super(...arguments),this.checked=!1,this.readonly=!1}get focusElement(){return this.inputElement}handleChange(){if(this.readonly)return void(this.inputElement.checked=this.checked);this.checked=this.inputElement.checked;const e=new CustomEvent("change",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(e)||(this.checked=!this.inputElement.checked,this.inputElement.checked=this.checked)}render(){return h`
            <input
                id="input"
                aria-labelledby="label"
                type="checkbox"
                .checked=${this.checked}
                @change=${this.handleChange}
            />
        `}}H([d({type:Boolean,reflect:!0})],M.prototype,"checked",2),H([d({type:Boolean,reflect:!0})],M.prototype,"readonly",2),H([o("#input")],M.prototype,"inputElement",2);var B=e`
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
)}:host([size=s]){--spectrum-checkbox-font-size:var(--spectrum-font-size-75);--spectrum-checkbox-height:var(--spectrum-component-height-75);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-small
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-75)}:host([size=m]){--spectrum-checkbox-font-size:var(--spectrum-font-size-100);--spectrum-checkbox-height:var(--spectrum-component-height-100);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-medium
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-100)}:host([size=l]){--spectrum-checkbox-font-size:var(--spectrum-font-size-200);--spectrum-checkbox-height:var(--spectrum-component-height-200);--spectrum-checkbox-control-size:var(
--spectrum-checkbox-control-size-large
);--spectrum-checkbox-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-checkbox-text-to-control:var(--spectrum-text-to-control-200)}:host([size=xl]){--spectrum-checkbox-font-size:var(--spectrum-font-size-300);--spectrum-checkbox-height:var(--spectrum-component-height-300);--spectrum-checkbox-control-size:var(
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
)}:host:active #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-color-down,var(--spectrum-checkbox-control-color-down)
)
)}:host:active #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-down,var(
--mod-checkbox-control-selected-color-down,var(--spectrum-checkbox-control-selected-color-down)
)
)}:host:active #label{color:var(
--highcontrast-checkbox-content-color-down,var(
--mod-checkbox-content-color-down,var(--spectrum-checkbox-content-color-down)
)
)}:host([invalid][invalid]) #box:before,:host([invalid][invalid]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
)}:host([invalid][invalid]) #input.focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][invalid]) #input.focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input.focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][invalid]) #input:focus-visible+#box:before,:host([invalid][invalid][indeterminate]) #input:focus-visible+#box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][invalid]:hover) #box:before,:host([invalid][invalid]:hover) #input:checked+#box:before{border-color:var(
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
)}:host([readonly]):active #box:before{border-color:var(
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
)}:host([invalid][invalid][indeterminate]) #box:before,:host([invalid][invalid][indeterminate]) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-default,var(--spectrum-checkbox-invalid-color-default)
)
);border-width:var(
--mod-checkbox-selected-border-width,var(--spectrum-checkbox-selected-border-width)
)}:host([invalid][invalid][indeterminate]:hover) #box:before,:host([invalid][invalid][indeterminate]:hover) #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-default,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([invalid][invalid][indeterminate]:hover) #label{color:var(
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
)}:host([emphasized][invalid][invalid]) #input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid][invalid]) #input.focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid][invalid]) #input:focus-visible:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-invalid-color-focus,var(--spectrum-checkbox-invalid-color-focus)
)
)}:host([emphasized][invalid][invalid]:hover) #input:checked+#box:before,:host([emphasized][invalid][invalid][indeterminate]:hover) #box:before{border-color:var(
--highcontrast-checkbox-color-hover,var(
--mod-checkbox-invalid-color-hover,var(--spectrum-checkbox-invalid-color-hover)
)
)}:host([emphasized]:hover) #input:checked+#box:before,:host([emphasized][indeterminate]:hover) #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-hover,var(
--mod-checkbox-emphasized-color-hover,var(--spectrum-checkbox-emphasized-color-hover)
)
)}:host([emphasized]):active #input:checked+#box:before,:host([emphasized][indeterminate]):active #box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-emphasized-color-down,var(--spectrum-checkbox-emphasized-color-down)
)
)}:host([emphasized][invalid][invalid]):active #box:before,:host([emphasized][invalid][invalid]):active #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-highlight-color-default,var(
--mod-checkbox-control-invalid-color-down,var(--spectrum-checkbox-invalid-color-down)
)
)}:host([emphasized]).focus-visible #box:before,:host([emphasized]).focus-visible #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}:host([emphasized]).focus-visible #box:before,:host([emphasized]).focus-visible #input:checked+#box:before{border-color:var(
--highcontrast-checkbox-color-focus,var(
--mod-checkbox-control-color-focus,var(--spectrum-checkbox-control-color-focus)
)
)}:host([emphasized]):focus-visible #box:before,:host([emphasized]):focus-visible #input:checked+#box:before{border-color:var(
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
);z-index:0}#box:after{border-radius:calc(var(--spectrum-checkbox-control-corner-radius) + var(--spectrum-checkbox-focus-indicator-gap));content:"";display:block;inset:0;margin:var(
--mod-checkbox-focus-indicator-gap,var(--spectrum-checkbox-focus-indicator-gap)
);position:absolute;transform:translate(0);transition:box-shadow var(
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
) ease-in-out}#partialCheckmark{display:none}#input:checked:disabled+#box:before,#input:disabled+#box:before{background-color:var(
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
`;var P=e`
.spectrum-UIIcon-Dash50{height:var(--spectrum-alias-ui-icon-dash-size-50);width:var(--spectrum-alias-ui-icon-dash-size-50)}.spectrum-UIIcon-Dash75{height:var(--spectrum-alias-ui-icon-dash-size-75);width:var(--spectrum-alias-ui-icon-dash-size-75)}.spectrum-UIIcon-Dash100{height:var(--spectrum-alias-ui-icon-dash-size-100);width:var(--spectrum-alias-ui-icon-dash-size-100)}.spectrum-UIIcon-Dash200{height:var(--spectrum-alias-ui-icon-dash-size-200);width:var(--spectrum-alias-ui-icon-dash-size-200)}.spectrum-UIIcon-Dash300{height:var(--spectrum-alias-ui-icon-dash-size-300);width:var(--spectrum-alias-ui-icon-dash-size-300)}.spectrum-UIIcon-Dash400{height:var(--spectrum-alias-ui-icon-dash-size-400);width:var(--spectrum-alias-ui-icon-dash-size-400)}.spectrum-UIIcon-Dash500{height:var(--spectrum-alias-ui-icon-dash-size-500);width:var(--spectrum-alias-ui-icon-dash-size-500)}.spectrum-UIIcon-Dash600{height:var(--spectrum-alias-ui-icon-dash-size-600);width:var(--spectrum-alias-ui-icon-dash-size-600)}
`,N=Object.defineProperty,q=Object.getOwnPropertyDescriptor,F=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?q(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&N(t,r,c),c};const W={s:h`
        <sp-icon-checkmark75
            id="checkmark"
            class="spectrum-UIIcon-Checkmark75"
        ></sp-icon-checkmark75>
    `,m:h`
        <sp-icon-checkmark100
            id="checkmark"
            class="spectrum-UIIcon-Checkmark100"
        ></sp-icon-checkmark100>
    `,l:h`
        <sp-icon-checkmark200
            id="checkmark"
            class="spectrum-UIIcon-Checkmark200"
        ></sp-icon-checkmark200>
    `,xl:h`
        <sp-icon-checkmark300
            id="checkmark"
            class="spectrum-UIIcon-Checkmark300"
        ></sp-icon-checkmark300>
    `},K={s:h`
        <sp-icon-dash75
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash75"
        ></sp-icon-dash75>
    `,m:h`
        <sp-icon-dash100
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash100"
        ></sp-icon-dash100>
    `,l:h`
        <sp-icon-dash200
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash200"
        ></sp-icon-dash200>
    `,xl:h`
        <sp-icon-dash300
            id="partialCheckmark"
            class="spectrum-UIIcon-Dash300"
        ></sp-icon-dash300>
    `};class G extends(s(M)){constructor(){super(...arguments),this.indeterminate=!1,this.invalid=!1,this.emphasized=!1}static get styles(){return[B,c,P]}render(){return h`
            ${super.render()}
            <span id="box">
                ${W[this.size]}
                ${K[this.size]}
            </span>
            <label id="label"><slot></slot></label>
        `}updated(e){super.updated(e),e.has("invalid")&&(this.invalid?this.inputElement.setAttribute("aria-invalid","true"):this.inputElement.removeAttribute("aria-invalid")),e.has("indeterminate")&&(this.indeterminate?this.inputElement.setAttribute("aria-checked","mixed"):this.inputElement.removeAttribute("aria-checked"))}}F([d({type:Boolean,reflect:!0})],G.prototype,"indeterminate",2),F([d({type:Boolean,reflect:!0})],G.prototype,"invalid",2),F([d({type:Boolean,reflect:!0})],G.prototype,"emphasized",2),u("sp-checkbox",G);var Q=e`
:host([align=center]){text-align:center}:host([dir=ltr][align=end]){text-align:right}:host([dir=rtl][align=end]){text-align:left}:host([dir=ltr]){padding-left:var(--spectrum-table-regular-cell-padding-left);padding-right:var(--spectrum-table-regular-cell-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-cell-padding-right);padding-right:var(--spectrum-table-regular-cell-padding-left)}:host{box-sizing:border-box;font-size:var(--spectrum-table-regular-cell-text-size);font-weight:var(--spectrum-table-regular-cell-text-font-weight);line-height:var(--spectrum-table-regular-cell-text-line-height);min-height:calc(var(--spectrum-table-regular-cell-min-height) - var(--spectrum-table-regular-cell-padding-top) - var(--spectrum-table-regular-cell-padding-bottom));padding-bottom:var(--spectrum-table-regular-cell-padding-bottom);padding-top:var(--spectrum-table-regular-cell-padding-top)}:host{position:relative}:host(.focus-visible),:host([focused]){outline:none}:host(.focus-visible),:host([focused]){outline:none}:host(:focus-visible),:host([focused]){outline:none}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{right:0}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{right:0}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]):before{right:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{left:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{left:0}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]):before{left:0}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{left:0}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{left:0}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]):before{left:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{right:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{right:0}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]):before{right:0}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(:focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr]) .divider{border-right-width:var(--spectrum-table-regular-divider-border-size)}:host([dir=rtl]) .divider{border-left-width:var(--spectrum-table-regular-divider-border-size)}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(.focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
--spectrum-table-m-regular-cell-border-color-key-focus,var(--spectrum-alias-border-color-key-focus)
)}:host(:focus-visible):before,:host([focused]):before{box-shadow:inset 0 0 0 2px var(
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
`;var J=e`
:host([dir=ltr]) .sortedIcon{margin-left:var(--spectrum-table-regular-header-sort-icon-gap)}:host([dir=rtl]) .sortedIcon{margin-right:var(--spectrum-table-regular-header-sort-icon-gap)}.sortedIcon{display:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:middle}:host([dir=ltr]){text-align:left}:host([dir=rtl]){text-align:right}:host([dir=ltr]){padding-left:var(--spectrum-table-regular-header-padding-left);padding-right:var(--spectrum-table-regular-header-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-header-padding-right);padding-right:var(--spectrum-table-regular-header-padding-left)}:host{border-radius:var(--spectrum-table-regular-header-border-radius);box-sizing:border-box;cursor:default;font-size:var(--spectrum-table-regular-header-text-size);font-weight:var(--spectrum-table-regular-header-text-font-weight);letter-spacing:var(--spectrum-table-regular-header-text-letter-spacing);line-height:var(--spectrum-table-regular-header-text-line-height);min-height:var(--spectrum-table-regular-header-min-height);outline:0;padding-bottom:var(--spectrum-table-regular-header-padding-bottom);padding-top:var(--spectrum-table-regular-header-padding-top);text-transform:uppercase;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([sortable]){cursor:pointer}:host([sort-direction=asc]) .sortedIcon,:host([sort-direction=desc]) .sortedIcon{display:inline-block;margin-top:calc(var(--spectrum-global-dimension-size-25)*-1)}:host([sort-direction=asc]) .sortedIcon{transform:rotate(-90deg)}:host{position:relative}:host(.focus-visible),:host([focused]){outline:none}:host(.focus-visible),:host([focused]){outline:none}:host(:focus-visible),:host([focused]){outline:none}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{right:0}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{right:0}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]):before{right:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{left:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{left:0}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]):before{left:0}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{left:0}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{left:0}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]):before{left:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{right:0}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{right:0}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]):before{right:0}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(.focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host(:focus-visible):before,:host([focused]):before{border-radius:calc(var(--spectrum-table-regular-cell-border-radius-key-focus) - 1px);bottom:0;content:"";position:absolute;top:0;z-index:1}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{right:var(--spectrum-table-regular-border-size)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{right:var(--spectrum-table-regular-border-size)}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]):before{right:var(--spectrum-table-regular-border-size)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{left:var(--spectrum-table-regular-border-size)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{left:var(--spectrum-table-regular-border-size)}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]):before{left:var(--spectrum-table-regular-border-size)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{left:var(--spectrum-table-regular-border-size)}:host([dir=ltr].focus-visible):before,:host([dir=ltr][focused]):before{left:var(--spectrum-table-regular-border-size)}:host([dir=ltr]:focus-visible):before,:host([dir=ltr][focused]):before{left:var(--spectrum-table-regular-border-size)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{right:var(--spectrum-table-regular-border-size)}:host([dir=rtl].focus-visible):before,:host([dir=rtl][focused]):before{right:var(--spectrum-table-regular-border-size)}:host([dir=rtl]:focus-visible):before,:host([dir=rtl][focused]):before{right:var(--spectrum-table-regular-border-size)}:host(.focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(--spectrum-table-regular-border-size)}:host(.focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(--spectrum-table-regular-border-size)}:host(:focus-visible):before,:host([focused]):before{bottom:var(--spectrum-table-regular-border-size);top:var(--spectrum-table-regular-border-size)}:host{background-color:var(
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
`;var X=e`
:host([dir=ltr]){padding-right:var(--spectrum-table-regular-cell-checkbox-padding-right)}:host([dir=rtl]){padding-left:var(--spectrum-table-regular-cell-checkbox-padding-right)}:host{padding-bottom:0;padding-top:0;vertical-align:var(
--spectrum-table-regular-cell-checkbox-vertical-alignment
)}.checkbox{vertical-align:super}:host{align-items:center;display:flex;flex:0 1 0%}:host([selects-single]) sp-checkbox{visibility:hidden}
`,Y=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,ee=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?Z(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&Y(t,r,c),c};class te extends n{constructor(){super(...arguments),this.role="gridcell",this.indeterminate=!1,this.checked=!1,this.disabled=!1,this.selectsSingle=!1}static get styles(){return[Q,J,X]}click(){this.checkbox.click()}render(){return h`
            <sp-checkbox
                ?checked=${this.checked}
                ?indeterminate=${this.indeterminate}
                ?disabled=${this.disabled}
                aria-hidden=${i(this.selectsSingle)}
                class="checkbox"
            ></sp-checkbox>
        `}}ee([d({reflect:!0})],te.prototype,"role",2),ee([o(".checkbox")],te.prototype,"checkbox",2),ee([d({type:Boolean})],te.prototype,"indeterminate",2),ee([d({type:Boolean})],te.prototype,"checked",2),ee([d({type:Boolean})],te.prototype,"disabled",2),ee([d({type:Boolean,reflect:!0,attribute:"selects-single"})],te.prototype,"selectsSingle",2),u("sp-table-checkbox-cell",te);var re=e`
:host([dir=ltr][drop-target]):before{left:0}:host([dir=rtl][drop-target]):before{right:0}:host([dir=ltr][drop-target]):before{right:0}:host([dir=rtl][drop-target]):before{left:0}:host([drop-target]):before{bottom:0;content:"";position:absolute;top:0;z-index:1}:host{border-radius:var(--spectrum-table-regular-border-radius);border-width:var(--spectrum-table-regular-border-size);overflow:auto;position:relative;vertical-align:var(--spectrum-table-regular-cell-vertical-alignment)}:host{background-color:var(
--spectrum-table-m-regular-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-table-m-regular-border-color,var(--spectrum-alias-border-color-mid)
);border-style:solid}:host([drop-target]){border-color:var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
);box-shadow:0 0 0 1px var(
--spectrum-alias-border-color-key-focus,var(--spectrum-global-color-blue-400)
)}:host([drop-target]):before{background-color:var(--spectrum-alias-highlight-selected)}:host{display:block;flex-grow:1}:host(:not([tabindex])){overflow:visible}
`,oe=Object.defineProperty,se=Object.getOwnPropertyDescriptor;class ce extends n{constructor(){super(),this.role="rowgroup",new a(this,{config:{childList:!0,subtree:!0},callback:()=>{requestAnimationFrame((()=>{this.shouldHaveTabIndex()}))}})}static get styles(){return[re]}shouldHaveTabIndex(){this.offsetHeight<this.scrollHeight?this.tabIndex=0:this.removeAttribute("tabindex")}render(){return h`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,c=o>1?void 0:o?se(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);o&&c&&oe(t,r,c)})([d({reflect:!0})],ce.prototype,"role",2),u("sp-table-body",ce);var ie=e`
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
)}:host{display:flex;flex-direction:column}
`;let ae,le;async function ne(){return le||async function(){if(ae)return(await ae).default;ae=window.ResizeObserver;try{new ae((function(){}))}catch(e){ae=import("./7d2460f9.js"),ae=(await ae).default}return le=ae}()}let he=class e extends Event{constructor(t){super(e.eventName,{bubbles:!0}),this.first=t.first,this.last=t.last}};he.eventName="rangeChanged";class de extends Event{constructor(e){super(de.eventName,{bubbles:!0}),this.first=e.first,this.last=e.last}}de.eventName="visibilityChanged";class ue extends Event{constructor(){super(ue.eventName,{bubbles:!1})}}ue.eventName="unpinned";class pe{constructor(e){this._node=null,this._element=null;const t=null!=e?e:window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}}class me extends pe{constructor(e,t){super(t),this._originalScrollTo=null,this._originalScrollBy=null,this._originalScroll=null,this._clients=[],this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1;const r=this._node,o=me._instanceMap.get(r);if(o)return o._attach(e),o;this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this),this._originalScrollTo=r.scrollTo,this._originalScrollBy=r.scrollBy,this._originalScroll=r.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return null!==this._destination}scrollTo(e,t){const r="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;this._scrollTo(r)}scrollBy(e,t){const r="number"==typeof e&&"number"==typeof t?{left:e,top:t}:e;void 0!==r.top&&(r.top+=this.scrollTop),void 0!==r.left&&(r.left+=this.scrollLeft),this._scrollTo(r)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,r=null){null!==this._end&&this._end(),"smooth"===e.behavior?(this._setDestination(e),this._retarget=t,this._end=r):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:r}=e;return t=void 0===t?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),r=void 0===r?void 0:Math.max(0,Math.min(r,this.maxScrollLeft)),(null===this._destination||r!==this._destination.left||t!==this._destination.top)&&(this.__destination={top:t,left:r,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,r){return this._scrollTo(e,t,r),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame((()=>requestAnimationFrame((()=>this.correctingScrollError=!1)))),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(null!==this._destination){const{scrollTop:e,scrollLeft:t}=this;let{top:r,left:o}=this._destination;r=Math.min(r||0,this.maxScrollTop),o=Math.min(o||0,this.maxScrollLeft);const s=Math.abs(r-e),c=Math.abs(o-t);s<1&&c<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients=this._clients.splice(this._clients.indexOf(e),1),0===this._clients.length&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.push(e),1===this._clients.length&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}}me._instanceMap=new WeakMap;const be=Symbol("virtualizerRef"),ve="virtualizer-sizer";let ge;class fe{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,!e)throw new Error("Virtualizer constructor requires a configuration object");if(!e.hostElement)throw new Error('Virtualizer configuration requires the "hostElement" property');this._init(e)}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e),this._initLayout(e.layout||{})}async _initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this));const e=await ne();this._hostElementRO=new e((()=>this._hostElementSizeChanged())),this._childrenRO=new e(this._childrenSizeChanged.bind(this))}_initHostElement(e){const t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[be]=this}async connected(){await this._initObservers();const e=this._isScroller;this._clippingAncestors=function(e,t=!1){return function(e,t=!1){const r=[];let o=t?e:ke(e);for(;null!==o;)r.push(o),o=ke(o);return r}(e,t).filter((e=>"visible"!==getComputedStyle(e).overflow))}(this._hostElement,e),this._scrollerController=new me(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen()}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach((e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)})),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach((e=>this._childrenRO.observe(e))),this._scrollEventListeners.forEach((e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions)))}disconnected(){var e,t,r,o;this._scrollEventListeners.forEach((e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions))),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController=(null===(e=this._scrollerController)||void 0===e?void 0:e.detach(this))||null,null===(t=this._mutationObserver)||void 0===t||t.disconnect(),null===(r=this._hostElementRO)||void 0===r||r.disconnect(),null===(o=this._childrenRO)||void 0===o||o.disconnect(),this._rejectLayoutCompletePromise("disconnected")}_applyVirtualizerStyles(){const e=this._hostElement.style;e.display=e.display||"block",e.position=e.position||"relative",e.contain=e.contain||"size layout",this._isScroller&&(e.overflow=e.overflow||"auto",e.minHeight=e.minHeight||"150px")}_getSizer(){const e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${ve}]`);t||(t=document.createElement("div"),t.setAttribute(ve,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.innerHTML="&nbsp;",t.setAttribute(ve,""),this._sizer=t}return this._sizer}updateLayoutConfig(e){const t=e.type||ge;if("function"==typeof t&&this._layout instanceof t){const t={...e};return delete t.type,this._layout.config=t,!0}return!1}async _initLayout(e){let t,r;if("function"==typeof e.type){r=e.type;const o={...e};delete o.type,t=o}else t=e;void 0===r&&(ge=r=(await import("./54f56836.js")).FlowLayout),this._layout=new r(t),this._layout.measureChildren&&"function"==typeof this._layout.updateItemSizes&&("function"==typeof this._layout.measureChildren&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.addEventListener("scrollsizechange",this),this._layout.addEventListener("scrollerrorchange",this),this._layout.addEventListener("itempositionchange",this),this._layout.addEventListener("rangechange",this),this._layout.addEventListener("unpinned",this),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){null===this._benchmarkStart&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(null!==this._benchmarkStart){const e=window.performance.now(),t=e-this._benchmarkStart,r=performance.getEntriesByName("uv-virtualizing","measure").filter((t=>t.startTime>=this._benchmarkStart&&t.startTime<e)).reduce(((e,t)=>e+t.duration),0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:r}}return null}_measureChildren(){const e={},t=this._children,r=this._measureChildOverride||this._measureChild;for(let o=0;o<t.length;o++){const s=t[o],c=this._first+o;(this._itemsChanged||this._toBeMeasured.has(s))&&(e[c]=r.call(this,s,this._items[c]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){const{width:t,height:r}=e.getBoundingClientRect();return Object.assign({width:t,height:r},function(e){const t=window.getComputedStyle(e);return{marginTop:xe(t.marginTop),marginRight:xe(t.marginRight),marginBottom:xe(t.marginBottom),marginLeft:xe(t.marginLeft)}}(e))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(){const{_rangeChanged:e,_itemsChanged:t}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),e||t?(this._notifyRange(),this._rangeChanged=!1):this._finishDOMUpdate()}_finishDOMUpdate(){this._children.forEach((e=>this._childrenRO.observe(e))),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end")}_updateLayout(){this._layout&&(this._layout.items=this._items,this._updateView(),null!==this._childMeasurements&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){var e;if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(e){console.warn("Error measuring performance data: ",e)}window.performance.mark("uv-start")}!1===this._scrollerController.correctingScrollError&&(null===(e=this._layout)||void 0===e||e.unpin()),this._schedule(this._updateLayout)}handleEvent(e){switch(e.type){case"scroll":(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent();break;case"scrollsizechange":this._scrollSize=e.detail,this._schedule(this._updateDOM);break;case"scrollerrorchange":this._scrollError=e.detail,this._schedule(this._updateDOM);break;case"itempositionchange":this._childrenPos=e.detail,this._schedule(this._updateDOM);break;case"rangechange":this._adjustRange(e.detail),this._schedule(this._updateDOM);break;case"unpinned":this._hostElement.dispatchEvent(new ue);break;default:console.warn("event not handled",e)}}get _children(){const e=[];let t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(ve)||e.push(t),t=t.nextElementSibling;return e}_updateView(){var e;const t=this._hostElement,r=null===(e=this._scrollerController)||void 0===e?void 0:e.element,o=this._layout;if(t&&r&&o){let e,s,c,i;const a=t.getBoundingClientRect();e=0,s=0,c=window.innerHeight,i=window.innerWidth;const l=this._clippingAncestors.map((e=>e.getBoundingClientRect()));l.unshift(a);for(const t of l)e=Math.max(e,t.top),s=Math.max(s,t.left),c=Math.min(c,t.bottom),i=Math.min(i,t.right);const n=r.getBoundingClientRect(),h={left:a.left-n.left,top:a.top-n.top},d={width:r.scrollWidth,height:r.scrollHeight},u=e-a.top+t.scrollTop,p=s-a.left+t.scrollLeft,m=Math.max(1,c-e),b=Math.max(1,i-s);o.viewportSize={width:b,height:m},o.viewportScroll={top:u,left:p},o.totalScrollSize=d,o.offsetWithinScroller=h}}_sizeHostElement(e){const t=82e5,r=e&&null!==e.width?Math.min(t,e.width):0,o=e&&null!==e.height?Math.min(t,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${r}px, ${o}px)`;else{const e=this._hostElement.style;e.minWidth=r?`${r}px`:"100%",e.minHeight=o?`${o}px`:"100%"}}_positionChildren(e){e&&e.forEach((({top:e,left:t,width:r,height:o,xOffset:s,yOffset:c},i)=>{const a=this._children[i-this._first];a&&(a.style.position="absolute",a.style.boxSizing="border-box",a.style.transform=`translate(${t}px, ${e}px)`,void 0!==r&&(a.style.width=r+"px"),void 0!==o&&(a.style.height=o+"px"),a.style.left=void 0===s?null:s+"px",a.style.top=void 0===c?null:c+"px")}))}async _adjustRange(e){const{_first:t,_last:r,_firstVisible:o,_lastVisible:s}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==r,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==o||this._lastVisible!==s}_correctScrollError(){if(this._scrollError){const{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:r,left:o}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-r,left:t-o})}}element(e){var t;return e===1/0&&(e=this._items.length-1),void 0===(null===(t=this._items)||void 0===t?void 0:t[e])?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),"smooth"===e.behavior){const t=this._layout.getScrollIntoViewCoordinates(e),{behavior:r}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:r}),(()=>this._layout.getScrollIntoViewCoordinates(e)),(()=>this._scrollIntoViewTarget=null)),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){const{index:t}=this._scrollIntoViewTarget||{};t&&(null==e?void 0:e.has(t))&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new he({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new de({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise(((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t}))),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){null!==this._layoutCompleteRejecter&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&null===this._pendingLayoutComplete&&(this._pendingLayoutComplete=requestAnimationFrame((()=>requestAnimationFrame((()=>this._resolveLayoutCompletePromise())))))}_resolveLayoutCompletePromise(){null!==this._layoutCompleteResolver&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout.measureChildren){for(const t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}}function xe(e){const t=e?parseFloat(e):NaN;return Number.isNaN(t)?0:t}function ke(e){if(null!==e.assignedSlot)return e.assignedSlot;if(null!==e.parentElement)return e.parentElement;const t=e.parentNode;return t&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&t.host||null}const _e=e=>e,ze=(e,t)=>h`${t}: ${JSON.stringify(e,null,2)}`;const we=m(class extends U{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(e,t)=>ze(e,t+this._first),this._keyFunction=(e,t)=>_e(e,this._first),this._items=[],e.type!==v.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);const t=[],r=Math.min(this._items.length,this._last+1);if(this._first>=0&&this._last>=this._first)for(let e=this._first;e<r;e++)t.push(this._items[e]);return y(t,this._keyFunction,this._renderItem)}update(e,[t]){return this._setFunctions(t),this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),this.render()}_updateVirtualizerConfig(e,t){if(!this._virtualizer.updateLayoutConfig(t.layout||{})){const r=e.parentNode;this._makeVirtualizer(r,t)}this._virtualizer.items=this._items}_setFunctions(e){const{renderItem:t,keyFunction:r}=e;t&&(this._renderItem=(e,r)=>t(e,r+this._first)),r&&(this._keyFunction=(e,t)=>r(e,t+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();const{layout:r,scroller:o,items:s}=t;this._virtualizer=new fe({hostElement:e,layout:r,scroller:o}),this._virtualizer.items=s,this._virtualizer.connected()}_initialize(e,t){const r=e.parentNode;r&&1===r.nodeType&&(r.addEventListener("rangeChanged",(e=>{e.stopPropagation(),this._first=e.first,this._last=e.last,this.setValue(this.render())})),this._makeVirtualizer(r,t))}disconnected(){var e;null===(e=this._virtualizer)||void 0===e||e.disconnected()}reconnected(){var e;null===(e=this._virtualizer)||void 0===e||e.connected()}});var ye=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,Ie=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?Ce(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&ye(t,r,c),c},Se=(e=>(e[e.ITEM=0]="ITEM",e[e.INFORMATION=1]="INFORMATION",e))(Se||{});const Ee=class extends Event{constructor(e){super(Ee.eventName,{bubbles:!0}),this.first=e.first,this.last=e.last}};let Ae=Ee;Ae.eventName="rangeChanged";class Le extends(s(n,{validSizes:["s","m"],defaultSize:"m"})){constructor(){super(...arguments),this._renderItem=()=>h``,this.role="grid",this.selected=[],this.selectedSet=new Set,this.items=[],this.itemValue=(e,t)=>`${t}`,this.scroller=!1}static get styles(){return[ie]}get renderItem(){return this._renderItem}set renderItem(e){this._renderItem=(t,r)=>{const o=this.itemValue(t,r),s=this.selected.includes(o),c=this.selects&&1!==(null==t?void 0:t._$rowType$);return h`
                <sp-table-row
                    value=${o}
                    aria-rowindex=${r+1}
                    ?selected=${s}
                >
                    ${c?h`
                              <sp-table-checkbox-cell
                                  ?checked=${s}
                              ></sp-table-checkbox-cell>
                          `:h``}
                    ${e(t,r)}
                </sp-table-row>
            `}}get tableHead(){return this.querySelector("sp-table-head")}get tableRows(){return this.isVirtualized?[]:[...this.querySelectorAll("sp-table-row")]}get isVirtualized(){return!!this.items.length}focus(){const e=this.querySelector("sp-table-head-cell[sortable]");e&&e.focus()}selectAllRows(){this.isVirtualized?this.items.forEach(((e,t)=>{1!==e._$rowType$&&this.selectedSet.add(this.itemValue(e,t))})):this.tableRows.forEach((e=>{e.selected=!0,this.selectedSet.add(e.value)})),this.selected=[...this.selectedSet],this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!0,this.tableHeadCheckboxCell.indeterminate=!1)}deselectAllRows(){this.selectedSet.clear(),this.selected=[],this.isVirtualized||[...this.querySelectorAll("[selected]")].forEach((e=>{e.selected=!1})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=!1,this.tableHeadCheckboxCell.indeterminate=!1)}manageSelects(){const e=this.querySelectorAll("sp-table-checkbox-cell"),t=document.createElement("sp-table-checkbox-cell");if(this.selects){let e=!1;this.isVirtualized?e=this.selected.length>0&&this.selected.length===this.items.length:(this.tableRows.forEach((e=>{if(e.selected=this.selectedSet.has(e.value),!e.querySelector(":scope > sp-table-checkbox-cell")){const r=t.cloneNode();e.insertAdjacentElement("afterbegin",r),t.checked=e.selected}})),e=this.selected.length===this.tableRows.length),this.tableHeadCheckboxCell||(this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell"),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell)),this.manageHeadCheckbox(e)}else e.forEach((e=>{e.remove()})),delete this.tableHeadCheckboxCell}validateSelected(){const e=new Set;this.isVirtualized?this.items.forEach(((t,r)=>{const o=this.itemValue(t,r);e.add(o)})):this.tableRows.forEach((t=>{e.add(t.value)}));const t=this.selected.length;this.selected=this.selected.filter((t=>e.has(t))),t!==this.selected.length&&this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0})),this.selectedSet=new Set(this.selected)}manageSelected(){this.validateSelected(),!this.isVirtualized&&(this.tableRows.forEach((e=>{e.selected=this.selectedSet.has(e.value)})),this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.checked=this.selected.length===this.tableRows.length))}manageCheckboxes(){var e;if(this.selects){this.tableHeadCheckboxCell=document.createElement("sp-table-checkbox-cell");const e=this.selected.length===this.tableRows.length;this.manageHeadCheckbox(e),this.tableHead.insertAdjacentElement("afterbegin",this.tableHeadCheckboxCell),this.tableRows.forEach((e=>{const t=document.createElement("sp-table-checkbox-cell");e.insertAdjacentElement("afterbegin",t),e.selected=this.selectedSet.has(e.value),t.checked=e.selected}))}else null==(e=this.tableHead.querySelector("sp-table-checkbox-cell"))||e.remove(),this.tableRows.forEach((e=>{var t;null==(t=e.checkboxCells[0])||t.remove(),this.selected.length&&(e.selected=this.selectedSet.has(e.value))}))}manageHeadCheckbox(e){this.tableHeadCheckboxCell&&(this.tableHeadCheckboxCell.selectsSingle="single"===this.selects,this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e)}handleChange(e){e.stopPropagation();const t=new Set(this.selectedSet),r=[...this.selected],{target:o}=e,{parentElement:s}=o;if(s.value)switch(this.selects){case"single":this.deselectAllRows(),s.selected&&(this.selectedSet.add(s.value),this.selected=[...this.selectedSet]);break;case"multiple":{s.selected?this.selectedSet.add(s.value):this.selectedSet.delete(s.value),this.selected=[...this.selectedSet];const e=this.selected.length===this.tableRows.length;if(!this.tableHeadCheckboxCell)return;this.tableHeadCheckboxCell.checked=e,this.tableHeadCheckboxCell.indeterminate=this.selected.length>0&&!e;break}}else{const{checkbox:e}=o;if(!e)return;e.checked||e.indeterminate?this.selectAllRows():this.deselectAllRows()}this.dispatchEvent(new Event("change",{cancelable:!0,bubbles:!0,composed:!0}))||(e.preventDefault(),this.selectedSet=t,this.selected=r)}scrollToIndex(e){if(e&&this.tableBody){const t=this.tableBody[be].element(e);t&&t.scrollIntoView()}}render(){return h`
            <slot @change=${this.handleChange}></slot>
        `}willUpdate(e){this.hasUpdated||(this.validateSelected(),this.manageCheckboxes()),e.has("selects")&&this.manageSelects(),e.has("selected")&&this.hasUpdated&&this.manageSelected()}updated(){this.items.length&&this.renderVirtualizedItems()}renderVirtualizedItems(){if(!this.isConnected)return;this.tableBody||(this.tableBody=this.querySelector("sp-table-body"),this.tableBody||(this.tableBody=document.createElement("sp-table-body"),this.append(this.tableBody)),this.tableBody.addEventListener("rangeChanged",(e=>{this.dispatchEvent(new Ae({first:e.first,last:e.last}))})));const e={items:this.items,renderItem:this.renderItem,scroller:this.scroller};p(h`
                ${we(e)}
            `,this.tableBody)}disconnectedCallback(){super.disconnectedCallback()}}Ie([d({reflect:!0})],Le.prototype,"role",2),Ie([d({type:String,reflect:!0})],Le.prototype,"selects",2),Ie([d({type:Array})],Le.prototype,"selected",2),Ie([d({type:Array})],Le.prototype,"items",2),Ie([d({type:Object})],Le.prototype,"itemValue",2),Ie([d({type:Boolean,reflect:!0})],Le.prototype,"scroller",2),u("sp-table",Le);var Ue=Object.defineProperty,Oe=Object.getOwnPropertyDescriptor;class Te extends n{constructor(){super(...arguments),this.role="gridcell"}static get styles(){return[Q]}render(){return h`
            <slot></slot>
        `}}((e,t,r,o)=>{for(var s,c=o>1?void 0:o?Oe(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);o&&c&&Ue(t,r,c)})([d({reflect:!0})],Te.prototype,"role",2),u("sp-table-cell",Te);var De=e`
:host{display:flex}
`,$e=Object.defineProperty,Re=Object.getOwnPropertyDescriptor,je=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?Re(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&$e(t,r,c),c};class Ve extends n{constructor(){super(...arguments),this.role="row"}static get styles(){return[De]}handleSorted({target:e}){[...this.children].forEach((t=>{t!==e&&(t.sortDirection=void 0)}))}handleChange({target:e}){this.selected=e.checkbox.checked||e.checkbox.indeterminate}render(){return h`
            <slot
                @sorted=${this.handleSorted}
                @change=${this.handleChange}
            ></slot>
        `}}je([d({reflect:!0})],Ve.prototype,"role",2),je([d({type:Boolean,reflect:!0})],Ve.prototype,"selected",2),u("sp-table-head",Ve);var He=e`
.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowDown75{transform:rotate(90deg)}.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowLeft75{transform:rotate(180deg)}.spectrum-UIIcon-ArrowUp100,.spectrum-UIIcon-ArrowUp200,.spectrum-UIIcon-ArrowUp300,.spectrum-UIIcon-ArrowUp400,.spectrum-UIIcon-ArrowUp500,.spectrum-UIIcon-ArrowUp600,.spectrum-UIIcon-ArrowUp75{transform:rotate(270deg)}.spectrum-UIIcon-ArrowDown75,.spectrum-UIIcon-ArrowLeft75,.spectrum-UIIcon-ArrowRight75,.spectrum-UIIcon-ArrowUp75{height:var(--spectrum-alias-ui-icon-arrow-size-75);width:var(--spectrum-alias-ui-icon-arrow-size-75)}.spectrum-UIIcon-ArrowDown100,.spectrum-UIIcon-ArrowLeft100,.spectrum-UIIcon-ArrowRight100,.spectrum-UIIcon-ArrowUp100{height:var(--spectrum-alias-ui-icon-arrow-size-100);width:var(--spectrum-alias-ui-icon-arrow-size-100)}.spectrum-UIIcon-ArrowDown200,.spectrum-UIIcon-ArrowLeft200,.spectrum-UIIcon-ArrowRight200,.spectrum-UIIcon-ArrowUp200{height:var(--spectrum-alias-ui-icon-arrow-size-200);width:var(--spectrum-alias-ui-icon-arrow-size-200)}.spectrum-UIIcon-ArrowDown300,.spectrum-UIIcon-ArrowLeft300,.spectrum-UIIcon-ArrowRight300,.spectrum-UIIcon-ArrowUp300{height:var(--spectrum-alias-ui-icon-arrow-size-300);width:var(--spectrum-alias-ui-icon-arrow-size-300)}.spectrum-UIIcon-ArrowDown400,.spectrum-UIIcon-ArrowLeft400,.spectrum-UIIcon-ArrowRight400,.spectrum-UIIcon-ArrowUp400{height:var(--spectrum-alias-ui-icon-arrow-size-400);width:var(--spectrum-alias-ui-icon-arrow-size-400)}.spectrum-UIIcon-ArrowDown500,.spectrum-UIIcon-ArrowLeft500,.spectrum-UIIcon-ArrowRight500,.spectrum-UIIcon-ArrowUp500{height:var(--spectrum-alias-ui-icon-arrow-size-500);width:var(--spectrum-alias-ui-icon-arrow-size-500)}.spectrum-UIIcon-ArrowDown600,.spectrum-UIIcon-ArrowLeft600,.spectrum-UIIcon-ArrowRight600,.spectrum-UIIcon-ArrowUp600{height:var(--spectrum-alias-ui-icon-arrow-size-600);width:var(--spectrum-alias-ui-icon-arrow-size-600)}
`,Me=Object.defineProperty,Be=Object.getOwnPropertyDescriptor,Pe=(e,t,r,o)=>{for(var s,c=o>1?void 0:o?Be(t,r):t,i=e.length-1;i>=0;i--)(s=e[i])&&(c=(o?s(t,r,c):s(c))||c);return o&&c&&Me(t,r,c),c};class Ne extends n{constructor(){super(...arguments),this.role="columnheader",this.sortable=!1,this.sortKey=""}static get styles(){return[J,He]}handleClick(){this.sortable&&(this.sortDirection?this.sortDirection="asc"===this.sortDirection?"desc":"asc":this.sortDirection="asc",this.dispatchEvent(new CustomEvent("sorted",{bubbles:!0,detail:{sortDirection:this.sortDirection,sortKey:this.sortKey}})))}render(){const e=this.sortable&&!!this.sortDirection;return h`
            <slot></slot>
            ${e?h`
                      <sp-icon-arrow100
                          class="sortedIcon spectrum-UIIcon-ArrowDown100"
                      ></sp-icon-arrow100>
                  `:h``}
        `}firstUpdated(e){super.firstUpdated(e),this.addEventListener("click",this.handleClick)}update(e){e.has("sortDirection")&&this.setAttribute("aria-sort",(e=>({asc:"ascending",desc:"descending"}[e]||"none"))(this.sortDirection)),e.has("sortable")&&(this.tabIndex=this.sortable?0:-1),super.update(e)}}Pe([d({reflect:!0})],Ne.prototype,"role",2),Pe([d({type:Boolean,reflect:!0})],Ne.prototype,"sortable",2),Pe([d({reflect:!0,attribute:"sort-direction"})],Ne.prototype,"sortDirection",2),Pe([d({attribute:"sort-key"})],Ne.prototype,"sortKey",2),u("sp-table-head-cell",Ne);export{M as C,y as a,_e as b,U as c,ze as d,we as e,be as f,P as v};
//# sourceMappingURL=33a25235.js.map
