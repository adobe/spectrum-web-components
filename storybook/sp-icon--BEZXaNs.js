import { I as IconBase } from './IconBase-Tav-FzmR.js';
import { l as l$1 } from './if-defined-pV6JZKXB.js';
import { i } from './query-JMOstM_r.js';
import { x } from './lit-html-GmIhAbMP.js';
import { n, d as defineElement } from './define-element-UHExAFdK.js';

class IconsetRegistry{constructor(){this.iconsetMap=new Map;}static getInstance(){return IconsetRegistry.instance||(IconsetRegistry.instance=new IconsetRegistry),IconsetRegistry.instance}addIconset(e,t){this.iconsetMap.set(e,t);const n=new CustomEvent("sp-iconset-added",{bubbles:!0,composed:!0,detail:{name:e,iconset:t}});setTimeout(()=>window.dispatchEvent(n),0);}removeIconset(e){this.iconsetMap.delete(e);const t=new CustomEvent("sp-iconset-removed",{bubbles:!0,composed:!0,detail:{name:e}});setTimeout(()=>window.dispatchEvent(t),0);}getIconset(e){return this.iconsetMap.get(e)}}

var p=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var o=(s,r,e,t)=>{for(var i=t>1?void 0:t?l(r,e):r,n=s.length-1,a;n>=0;n--)(a=s[n])&&(i=(t?a(r,e,i):a(i))||i);return t&&i&&p(r,e,i),i};class Icon extends IconBase{constructor(){super(...arguments);this.iconsetListener=e=>{if(!this.name)return;const t=this.parseIcon(this.name);e.detail.name===t.iconset&&(this.updateIconPromise=this.updateIcon());};}connectedCallback(){super.connectedCallback(),window.addEventListener("sp-iconset-added",this.iconsetListener);}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("sp-iconset-added",this.iconsetListener);}firstUpdated(){this.updateIconPromise=this.updateIcon();}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),this.updateIconPromise=this.updateIcon();}announceIconImageSrcError(){this.dispatchEvent(new Event("error",{cancelable:!1,bubbles:!1,composed:!1}));}render(){return this.name?x`
                <div id="container"></div>
            `:this.src?x`
                <img
                    src="${this.src}"
                    alt=${l$1(this.label)}
                    @error=${this.announceIconImageSrcError}
                />
            `:super.render()}async updateIcon(){if(this.updateIconPromise&&await this.updateIconPromise,!this.name)return Promise.resolve();const e=this.parseIcon(this.name),t=IconsetRegistry.getInstance().getIconset(e.iconset);return !t||!this.iconContainer?Promise.resolve():(this.iconContainer.innerHTML="",t.applyIconToElement(this.iconContainer,e.icon,this.size||"",this.label?this.label:""))}parseIcon(e){const t=e.split(":");let i="default",n=e;return t.length>1&&(i=t[0],n=t[1]),{iconset:i,icon:n}}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.updateIconPromise,e}}o([n()],Icon.prototype,"src",2),o([n()],Icon.prototype,"name",2),o([i("#container")],Icon.prototype,"iconContainer",2);

defineElement("sp-icon",Icon);

export { IconsetRegistry as I };
