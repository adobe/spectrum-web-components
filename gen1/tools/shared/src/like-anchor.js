"use strict";var u=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var n=(s,r,p,i)=>{for(var t=i>1?void 0:i?f(r,p):r,a=s.length-1,l;a>=0;a--)(l=s[a])&&(t=(i?l(r,p,t):l(t))||t);return i&&t&&u(r,p,t),t};import{html as c}from"@spectrum-web-components/base";import{property as o}from"@spectrum-web-components/base/src/decorators.js";import{ifDefined as e}from"@spectrum-web-components/base/src/directives.js";export function LikeAnchor(s){class r extends s{renderAnchor({id:i,className:t,ariaHidden:a,labelledby:l,tabindex:d,anchorContent:g=c`<slot></slot>`}){return c`<a
                    id=${i}
                    class=${e(t)}
                    href=${e(this.href)}
                    download=${e(this.download)}
                    target=${e(this.target)}
                    aria-label=${e(this.label)}
                    aria-labelledby=${e(l)}
                    aria-hidden=${e(a?"true":void 0)}
                    tabindex=${e(d)}
                    referrerpolicy=${e(this.referrerpolicy)}
                    rel=${e(this.rel)}
                >${g}</a>`}}return n([o()],r.prototype,"download",2),n([o()],r.prototype,"label",2),n([o()],r.prototype,"href",2),n([o()],r.prototype,"target",2),n([o()],r.prototype,"referrerpolicy",2),n([o()],r.prototype,"rel",2),r}
//# sourceMappingURL=like-anchor.js.map
