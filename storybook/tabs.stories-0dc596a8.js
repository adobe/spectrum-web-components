import{c as t,p as e,_ as a,L as s}from"./lit-element-089a5717.js";import{q as i,k as r,y as o}from"./storybook-preview-9aba481c.js";import{_ as l}from"./tslib.es6-d9c764b6.js";import"./if-defined-f9b5fa5b.js";import{F as c,a as n}from"./focusable-f84f80fc.js";import"./iconset-svg-7745673b.js";import"./index-71d657ab.js";import"./observe-slot-text-5194cee4.js";var b=t`:host{display:flex;position:relative;z-index:0;margin:0;padding:0 var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100));vertical-align:top;border-bottom-color:var(--spectrum-tabs-rule-color,var(--spectrum-global-color-gray-200))}#selectionIndicator{position:absolute;left:0;z-index:0;transition:transform var(--spectrum-tabs-selection-indicator-animation-duration,var(--spectrum-global-animation-duration-100)) ease-in-out;transform-origin:top left;border-radius:var(--spectrum-tabs-rule-border-radius,var(--spectrum-global-dimension-static-size-10));background-color:var(--spectrum-tabs-selection-indicator-color,var(--spectrum-global-color-gray-900))}:host([compact]) ::slotted(*){line-height:calc(var(--spectrum-tabs-quiet-compact-height,var(--spectrum-global-dimension-size-400)) - var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)));height:calc(var(--spectrum-tabs-quiet-compact-height,var(--spectrum-global-dimension-size-400)) - var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)))}:host([direction=horizontal]){align-items:center;border-bottom:var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)) solid}:host([direction=horizontal]) ::slotted(*){vertical-align:top}:host([direction=horizontal]) #selectionIndicator{position:absolute;bottom:0;height:var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick));bottom:calc(-1*var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)))}:host([direction=horizontal][compact]){box-sizing:initial;height:calc(var(--spectrum-tabs-quiet-compact-height,var(--spectrum-global-dimension-size-400)) - var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)));align-items:end}:host([quiet]){display:inline-flex;border-bottom-color:var(--spectrum-tabs-quiet-rule-color,var(--spectrum-alias-border-color-transparent))}:host([direction=vertical]){display:inline-flex;flex-direction:column;padding:0;border-left:var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick)) solid;border-left-color:var(--spectrum-tabs-vertical-rule-color,var(--spectrum-global-color-gray-200))}:host([direction=vertical]) ::slotted(*){height:var(--spectrum-tabs-vertical-item-height,var(--spectrum-global-dimension-size-550));padding:0 var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100));margin-left:calc(var(--spectrum-tabs-vertical-item-margin-left,var(--spectrum-global-dimension-size-150)) - var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100)));margin-bottom:var(--spectrum-tabs-vertical-item-gap,var(--spectrum-global-dimension-size-50))}:host([direction=vertical][compact]) ::slotted(*){line-height:var(--spectrum-tabs-compact-vertical-item-height,var(--spectrum-global-dimension-size-400));margin-bottom:var(--spectrum-tabs-compact-vertical-item-gap,var(--spectrum-global-dimension-size-50));height:var(--spectrum-tabs-compact-vertical-item-height,var(--spectrum-global-dimension-size-400))}:host([direction=vertical]) #selectionIndicator{position:absolute;left:0;width:var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick));left:calc(-1*var(--spectrum-tabs-vertical-rule-width,var(--spectrum-alias-border-size-thick)))}:host([quiet]) #selectionIndicator{background-color:var(--spectrum-tabs-quiet-selection-indicator-color,var(--spectrum-global-color-gray-900))}:host([direction=vertical][compact]),:host([direction=vertical][quiet]){border-left-color:var(--spectrum-tabs-quiet-vertical-rule-color,var(--spectrum-alias-border-color-transparent))}:host([direction=vertical][compact]) #selectionIndicator,:host([direction=vertical][quiet]) #selectionIndicator{background-color:var(--spectrum-tabs-quiet-selection-indicator-color,var(--spectrum-global-color-gray-900))}:host([direction=horizontal]){border-bottom-color:var(--spectrum-tabs-rule-color,var(--spectrum-global-color-gray-200))}:host([direction=horizontal]) ::slotted(sp-tab:not(:first-child)){margin-left:var(--spectrum-tabs-item-gap,var(--spectrum-global-dimension-size-300))}:host([compact]){--spectrum-tabs-height:var(--spectrum-tabs-quiet-compact-height)}`,p={vertical:["ArrowUp","ArrowDown"],horizontal:["ArrowLeft","ArrowRight"]};class u extends c{constructor(){super(...arguments),this.direction="horizontal",this.selectionIndicatorStyle="",this.value="",this._selected="",this.tabs=[],this.isListeningToKeyboard=!1,this.startListeningToKeyboard=()=>{this.addEventListener("keydown",this.handleKeydown),this.isListeningToKeyboard=!0},this.stopListeningToKeyboard=()=>{this.isListeningToKeyboard=!1,this.removeEventListener("keydown",this.handleKeydown)}}static get styles(){return[b]}get selected(){return this._selected}set selected(t){var e=this.selected;t!==e&&(this.updateCheckedState(t),this._selected=t,this.requestUpdate("selected",e))}get focusElement(){return this.querySelector('[tabindex="0"]')||this.querySelector("sp-tab")}manageAutoFocus(){var t=[...this.querySelectorAll('[role="tab"]')].map(t=>t.updateComplete);Promise.all(t).then(()=>super.manageAutoFocus())}render(){return i` <slot @click="${this.onClick}" @keydown="${this.onKeyDown}" @slotchange="${this.onSlotChange}"></slot> <div id="selectionIndicator" style="${this.selectionIndicatorStyle}"></div> `}firstUpdated(t){super.firstUpdated(t),this.setAttribute("role","tablist"),this.addEventListener("focusin",this.startListeningToKeyboard),this.addEventListener("focusout",this.stopListeningToKeyboard)}updated(t){super.updated(t),t.has("direction")&&("vertical"===this.direction?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"))}handleKeydown(t){var{code:e}=t,a=p[this.direction];if(a.includes(e)){t.preventDefault();var s=document.activeElement,i=this.tabs.indexOf(s);i+=e===a[0]?-1:1,this.tabs[(i+this.tabs.length)%this.tabs.length].focus()}}onClick(t){var e=t.target;this.selectTarget(e),this.isListeningToKeyboard&&(this.dispatchEvent(new KeyboardEvent("keydown",{code:"Tab"})),e.focus())}onKeyDown(t){if("Enter"===t.key||" "===t.key){t.preventDefault();var e=t.target;e&&this.selectTarget(e)}}selectTarget(t){var e=t.getAttribute("value");if(e){var a=this.selected;this.selected=e,this.dispatchEvent(new Event("change",{cancelable:!0}))||(this.selected=a)}}onSlotChange(){this.updateCheckedState(this.selected),this.tabs=[...this.querySelectorAll('[role="tab"]')]}updateCheckedState(t){if(this.querySelectorAll("[selected]").forEach(t=>{t.removeAttribute("selected")}),t.length){var e=this.querySelector(`[value="${t}"]`);e?e.setAttribute("selected",""):this.selected=""}if(!this.selected){var a=this.querySelector('[role="tab"]');a&&a.setAttribute("tabindex","0")}this.updateSelectionIndicator()}updateSelectionIndicator(){var t=this;return a((function*(){var e=t.querySelector("[selected]");if(e){yield e.updateComplete;var a=e.getBoundingClientRect();if("horizontal"===t.direction){var s=a.width,i=t.getBoundingClientRect().left,r=a.left-i;t.selectionIndicatorStyle=`width: ${s}px; transform: translateX(${r}px)`}else{var o=a.height,l=t.getBoundingClientRect().top,c=a.top-l;t.selectionIndicatorStyle=`height: ${o}px; transform: translateY(${c}px)`}}}))()}}l([e({reflect:!0})],u.prototype,"direction",void 0),l([e()],u.prototype,"selectionIndicatorStyle",void 0),l([e({type:String,reflect:!0})],u.prototype,"value",void 0),l([e({reflect:!0})],u.prototype,"selected",null),customElements.get("sp-tab-list")||customElements.define("sp-tab-list",u);var d=t`:host{position:relative;box-sizing:border-box;height:calc(var(--spectrum-tabs-height,var(--spectrum-global-dimension-size-600)) - var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)));line-height:calc(var(--spectrum-tabs-height,var(--spectrum-global-dimension-size-600)) - var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)));z-index:1;text-decoration:none;white-space:nowrap;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-out;cursor:pointer;outline:0;color:var(--spectrum-tabs-text-color,var(--spectrum-alias-label-text-color))}:host([disabled]),:host([disabled]) #itemLabel{cursor:default}::slotted([slot=icon]){height:calc(var(--spectrum-tabs-height,var(--spectrum-global-dimension-size-600)) - var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick)));color:var(--spectrum-tabs-icon-color,var(--spectrum-alias-icon-color))}slot[name=icon]+#itemLabel{margin-left:calc(var(--spectrum-tabs-icon-gap,var(--spectrum-global-dimension-size-100)) - var(--spectrum-global-dimension-size-40))}:host:before{content:"";position:absolute;top:50%;box-sizing:border-box;height:var(--spectrum-tabs-focus-ring-height,var(--spectrum-alias-single-line-height));margin-top:calc(var(--spectrum-tabs-focus-ring-height,var(--spectrum-alias-single-line-height))/ -2 + var(--spectrum-tabs-rule-height,var(--spectrum-alias-border-size-thick))/ 2);left:calc(-1*var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100)));right:calc(-1*var(--spectrum-tabs-focus-ring-padding-x,var(--spectrum-global-dimension-size-100)));border:var(--spectrum-tabs-focus-ring-size,var(--spectrum-alias-border-size-thick)) solid transparent;border-radius:var(--spectrum-tabs-focus-ring-border-radius);pointer-events:none}#itemLabel{cursor:pointer;vertical-align:top;display:inline-block;font-size:var(--spectrum-tabs-text-size,var(--spectrum-alias-font-size-default));font-weight:var(--spectrum-tabs-text-font-weight,var(--spectrum-alias-body-text-font-weight))}#itemLabel:empty{display:none}:host(:hover){color:var(--spectrum-tabs-text-color-hover,var(--spectrum-alias-text-color-hover))}:host(:hover) ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-hover,var(--spectrum-alias-icon-color-hover))}:host([selected]){color:var(--spectrum-tabs-text-color-selected,var(--spectrum-global-color-gray-900))}:host([selected]) ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-selected,var(--spectrum-global-color-gray-900))}:host(.focus-visible){color:var(--spectrum-tabs-text-color-key-focus,var(--spectrum-alias-text-color-hover))}:host(.focus-visible):before{border-color:var(--spectrum-tabs-focus-ring-color,var(--spectrum-alias-border-color-focus))}:host(.focus-visible) ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-key-focus,var(--spectrum-alias-icon-color-focus))}:host([disabled]){color:var(--spectrum-tabs-text-color-disabled,var(--spectrum-alias-text-color-disabled))}:host([disabled]) ::slotted([slot=icon]){color:var(--spectrum-tabs-icon-color-disabled,var(--spectrum-alias-icon-color-disabled))}:host([vertical]){display:flex;flex-direction:column;justify-content:center;align-items:center;height:auto}:host([vertical]):before{left:calc(-1*var(--spectrum-tabs-focus-ring-size,2px));right:calc(-1*var(--spectrum-tabs-focus-ring-size,2px));height:auto;margin-top:0;top:0;bottom:0}:host([vertical]) ::slotted([slot=icon]){flex-shrink:0}:host([vertical]) #itemLabel{font-size:13px;padding:8px 0;font-weight:400;line-height:1;margin:0}`;class v extends(n(s)){constructor(){super(...arguments),this.label="",this.selected=!1,this.vertical=!1,this.value=""}static get styles(){return[d]}get hasIcon(){return!!this.querySelector('[slot="icon"]')}render(){return i` ${this.hasIcon?i` <slot name="icon"></slot> `:i``} <label id="itemLabel"> ${this.label} </label> `}firstUpdated(){this.setAttribute("role","tab")}updated(t){t.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.setAttribute("tabindex",this.selected?"0":"-1"))}}l([e({reflect:!0})],v.prototype,"label",void 0),l([e({type:Boolean,reflect:!0})],v.prototype,"selected",void 0),l([e({type:Boolean,reflect:!0})],v.prototype,"vertical",void 0),l([e({type:String,reflect:!0})],v.prototype,"value",void 0),customElements.get("sp-tab")||customElements.define("sp-tab",v);var h=()=>r`
        <sp-tab-list selected="1">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `,m=()=>r`
        <sp-tab-list selected="1" autofocus>
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `,g=()=>r`
        <sp-tab-list selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `,f=()=>{var t={horizontal:"horizontal",vertical:"vertical"},e=o("List Type",t,t.horizontal),a=o("Tab Type",t,t.horizontal);return r`
        <sp-icons-medium></sp-icons-medium>
        <sp-tab-list selected="1" direction="${e}">
            <sp-tab
                label="Tab 1"
                value="1"
                ?vertical=${a===t.vertical}
            >
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:CheckmarkSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab
                label="Tab 2"
                value="2"
                ?vertical=${a===t.vertical}
            >
                <sp-icon slot="icon" size="s" name="ui:CrossSmall"></sp-icon>
            </sp-tab>
            <sp-tab
                label="Tab 3"
                value="3"
                ?vertical=${a===t.vertical}
            >
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:ChevronDownSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab
                label="Tab 4"
                value="4"
                ?vertical=${a===t.vertical}
            >
                <sp-icon slot="icon" size="s" name="ui:HelpSmall"></sp-icon>
            </sp-tab>
        </sp-tab-list>
    `},y=()=>r`
        <sp-icons-medium></sp-icons-medium>
        <sp-tab-list selected="1" direction="vertical">
            <sp-tab label="Tab 1" value="1" vertical>
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:CheckmarkSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab label="Tab 2" value="2" vertical>
                <sp-icon slot="icon" size="s" name="ui:CrossSmall"></sp-icon>
            </sp-tab>
            <sp-tab label="Tab 3" value="3" vertical>
                <sp-icon
                    slot="icon"
                    size="s"
                    name="ui:ChevronDownSmall"
                ></sp-icon>
            </sp-tab>
            <sp-tab label="Tab 4" value="4" vertical>
                <sp-icon slot="icon" size="s" name="ui:HelpSmall"></sp-icon>
            </sp-tab>
        </sp-tab-list>
    `;y.story={name:"Icons II"};var z=()=>{var t={horizontal:"horizontal",vertical:"vertical"},e=o("Type",t,t.horizontal);return r`
        <sp-tab-list selected="1" quiet direction="${e}">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `},x=()=>{var t={horizontal:"horizontal",vertical:"vertical"},e=o("Type",t,t.horizontal);return r`
        <sp-tab-list selected="1" compact direction="${e}">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `},T=()=>{var t={horizontal:"horizontal",vertical:"vertical"},e=o("Type",t,t.horizontal);return r`
        <sp-tab-list selected="1" quiet compact direction="${e}">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
        </sp-tab-list>
    `};T.story={name:"Quiet Compact"};var k=["Default","Autofocus","Vertical","Icons","iconsIi","Quiet","Compact","quietCompact"];export default{component:"sp-tab-list",title:"Tabs"};export{m as Autofocus,x as Compact,h as Default,f as Icons,z as Quiet,g as Vertical,k as __namedExportsOrder,y as iconsIi,T as quietCompact};
//# sourceMappingURL=tabs.stories-0dc596a8.js.map
