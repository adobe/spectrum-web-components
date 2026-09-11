"use strict";var p=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var d=(r,i,e,s)=>{for(var t=s>1?void 0:s?l(i,e):i,n=r.length-1,o;n>=0;n--)(o=r[n])&&(t=(s?o(i,e,t):o(t))||t);return s&&t&&p(i,e,t),t};import{html as c,SpectrumElement as h}from"@spectrum-web-components/base";import{property as a}from"@spectrum-web-components/base/src/decorators.js";import m from"@spectrum-web-components/styles/body.js";import u from"@spectrum-web-components/styles/heading.js";import g from"./illustrated-message.css.js";export class IllustratedMessage extends h{constructor(){super(...arguments);this._heading="";this._description=""}static get styles(){return[u,m,g]}get heading(){return this._heading}set heading(e){this._heading=e,this.requestUpdate("heading",this._heading)}get description(){return this._description}set description(e){this._description=e,this.requestUpdate("description",this._description)}render(){return c`
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
    `}}IllustratedMessage.is="sp-illustrated-message",d([a()],IllustratedMessage.prototype,"heading",1),d([a()],IllustratedMessage.prototype,"description",1);
//# sourceMappingURL=IllustratedMessage.js.map
