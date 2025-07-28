"use strict";var a=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var i=(r,t,o,s)=>{for(var e=s>1?void 0:s?p(t,o):t,l=r.length-1,n;l>=0;l--)(n=r[l])&&(e=(s?n(t,o,e):n(e))||e);return s&&e&&a(t,o,e),e};import{html as m,SizedMixin as u}from"@spectrum-web-components/base";import{classMap as h}from"@spectrum-web-components/base/src/directives.js";import{property as c}from"@spectrum-web-components/base/src/decorators.js";import{ButtonBase as v}from"@spectrum-web-components/button/src/ButtonBase.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js";import{ObserveSlotPresence as d}from"@spectrum-web-components/shared/src/observe-slot-presence.js";import f from"./picker-button.css.js";import I from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";const x={s:"spectrum-UIIcon-ChevronDown75",m:"spectrum-UIIcon-ChevronDown100",l:"spectrum-UIIcon-ChevronDown200",xl:"spectrum-UIIcon-ChevronDown300"};export class PickerButton extends u(d(v,'[slot="label"]')){constructor(){super(...arguments);this.invalid=!1;this.position="right"}static get styles(){return[f,I]}get hasText(){return this.slotContentIsPresent}render(){const o={root:!0,uiicononly:!this.hasText,textuiicon:this.hasText};return m`
            <div class=${h(o)}>
                <div class="spectrum-PickerButton-fill">
                    <span
                        class="spectrum-PickerButton-label is-placeholder"
                        ?hidden=${!this.hasText}
                    >
                        <slot name="label"></slot>
                    </span>
                    <slot name="icon">
                        <sp-icon-chevron100
                            class="spectrum-PickerButton-icon spectrum-Icon ${x[this.size]}"
                        ></sp-icon-chevron100>
                    </slot>
                </div>
            </div>
        `}}i([c({type:Boolean,reflect:!0})],PickerButton.prototype,"invalid",2),i([c({reflect:!0})],PickerButton.prototype,"position",2);
//# sourceMappingURL=PickerButton.js.map
