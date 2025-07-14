"use strict";var u=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var l=(o,i,e,r)=>{for(var t=r>1?void 0:r?c(i,e):i,p=o.length-1,a;p>=0;p--)(a=o[p])&&(t=(r?a(i,e,t):a(t))||t);return r&&t&&u(i,e,t),t};import{html as f,SpectrumElement as m}from"@spectrum-web-components/base";import{property as s}from"@spectrum-web-components/base/src/decorators.js";import"@spectrum-web-components/popover/sp-popover.js";import"@spectrum-web-components/action-group/sp-action-group.js";import"@spectrum-web-components/button/sp-close-button.js";import"@spectrum-web-components/field-label/sp-field-label.js";import d from"./action-bar.css.js";import{ifDefined as n}from"@spectrum-web-components/base/src/directives.js";import{FocusVisiblePolyfillMixin as b}from"@spectrum-web-components/shared/src/focus-visible.js";export const actionBarVariants=["sticky","fixed"];export class ActionBar extends b(m){constructor(){super(...arguments);this.emphasized=!1;this.flexible=!1;this.open=!1;this._variant=""}static get styles(){return[d]}set variant(e){if(e!==this.variant){if(actionBarVariants.includes(e)){this.setAttribute("variant",e),this._variant=e;return}this.removeAttribute("variant"),this._variant=""}}get variant(){return this._variant}handleClick(){this.open=!1,this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0,cancelable:!0}))||(this.open=!0)}render(){return f`
            <sp-popover ?open=${this.open} id="popover">
                <slot name="override">
                    <sp-close-button
                        static-color=${n(this.emphasized?"white":void 0)}
                        class="close-button"
                        label="Clear selection"
                        @click=${this.handleClick}
                    ></sp-close-button>
                    <sp-field-label class="field-label">
                        <slot></slot>
                    </sp-field-label>
                    <sp-action-group
                        class="action-group"
                        quiet
                        static-color=${n(this.emphasized?"white":void 0)}
                    >
                        <slot name="buttons"></slot>
                    </sp-action-group>
                </slot>
            </sp-popover>
        `}}l([s({type:Boolean,reflect:!0})],ActionBar.prototype,"emphasized",2),l([s({type:Boolean,reflect:!0})],ActionBar.prototype,"flexible",2),l([s({type:Boolean,reflect:!0})],ActionBar.prototype,"open",2),l([s({type:String})],ActionBar.prototype,"variant",1);
//# sourceMappingURL=ActionBar.js.map
