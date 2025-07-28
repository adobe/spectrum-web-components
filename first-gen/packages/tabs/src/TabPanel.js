"use strict";var p=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var l=(s,t,i,r)=>{for(var e=r>1?void 0:r?u(t,i):t,o=s.length-1,d;o>=0;o--)(d=s[o])&&(e=(r?d(t,i,e):d(e))||e);return r&&e&&p(t,i,e),e};import{html as h,SpectrumElement as n}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import{randomID as c}from"@spectrum-web-components/shared/src/random-id.js";import m from"./tab-panel.css.js";export class TabPanel extends n{constructor(){super(...arguments);this.selected=!1;this.value=""}handleFocusin(){this.removeAttribute("tabindex")}handleFocusout(){this.tabIndex=this.selected?0:-1}render(){return h`
            <slot
                @focusin=${this.handleFocusin}
                @focusout=${this.handleFocusout}
            ></slot>
        `}firstUpdated(){this.slot="tab-panel",this.setAttribute("role","tabpanel"),this.tabIndex=0,this.hasAttribute("id")||(this.id=`sp-tab-panel-${c()}`)}updated(i){i.has("selected")&&(this.selected?(this.removeAttribute("aria-hidden"),this.tabIndex=0):(this.setAttribute("aria-hidden","true"),this.tabIndex=-1))}}TabPanel.styles=[m],l([a({type:Boolean,reflect:!0})],TabPanel.prototype,"selected",2),l([a({type:String,reflect:!0})],TabPanel.prototype,"value",2);
//# sourceMappingURL=TabPanel.js.map
