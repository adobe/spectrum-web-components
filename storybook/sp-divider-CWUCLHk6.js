import { i } from './divider.css-DO2_iA7o.js';
import { S as SizedMixin } from './sizedMixin-BzkTbMb8.js';
import { S as SpectrumElement, n, d as defineElement } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';

var p=Object.defineProperty;var l=(s,r,e,i)=>{for(var t=void 0,o=s.length-1,a;o>=0;o--)(a=s[o])&&(t=(a(r,e,t))||t);return t&&p(r,e,t),t};class Divider extends SizedMixin(SpectrumElement,{validSizes:["s","m","l"],noDefaultSize:!0}){constructor(){super(...arguments);this.vertical=!1;}render(){return x``}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","separator");}updated(e){super.updated(e),e.has("vertical")&&(this.vertical?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"));}}Divider.styles=[i],l([n({type:Boolean,reflect:!0})],Divider.prototype,"vertical");

defineElement("sp-divider",Divider);
