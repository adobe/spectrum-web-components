"use strict";var m=Object.defineProperty;var n=Object.getOwnPropertyDescriptor;var l=(r,t,s,i)=>{for(var e=i>1?void 0:i?n(t,s):t,o=r.length-1,d;o>=0;o--)(d=r[o])&&(e=(i?d(t,s,e):d(e))||e);return i&&e&&m(t,s,e),e};import{html as a,SpectrumElement as c}from"@spectrum-web-components/base";import{property as p}from"@spectrum-web-components/base/src/decorators.js";import u from"./illustrated-message.css.js";import h from"@spectrum-web-components/styles/heading.js";import y from"@spectrum-web-components/styles/body.js";export class IllustratedMessage extends c{constructor(){super(...arguments);this.heading="";this.description=""}static get styles(){return[h,y,u]}render(){return a`
            <div id="illustration"><slot></slot></div>
            <h2
                id="heading"
                class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
            >
                <slot name="heading">${this.heading}</slot>
            </h2>
            <div id="description" class="spectrum-Body spectrum-Body--sizeS">
                <slot name="description">${this.description}</slot>
            </div>
        `}}IllustratedMessage.is="sp-illustrated-message",l([p()],IllustratedMessage.prototype,"heading",2),l([p()],IllustratedMessage.prototype,"description",2);
//# sourceMappingURL=IllustratedMessage.js.map
