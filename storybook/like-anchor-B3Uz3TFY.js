import { n as n$1 } from './define-element-C_3bgzm7.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

var u=Object.defineProperty;var n=(s,r,p,i)=>{for(var t=void 0,a=s.length-1,l;a>=0;a--)(l=s[a])&&(t=(l(r,p,t))||t);return t&&u(r,p,t),t};function LikeAnchor(s){class r extends s{renderAnchor({id:i,className:t,ariaHidden:a,labelledby:l,tabindex:d,anchorContent:g=x`<slot></slot>`}){return x`<a
                    id=${i}
                    class=${o(t)}
                    href=${o(this.href)}
                    download=${o(this.download)}
                    target=${o(this.target)}
                    aria-label=${o(this.label)}
                    aria-labelledby=${o(l)}
                    aria-hidden=${o(a?"true":void 0)}
                    tabindex=${o(d)}
                    referrerpolicy=${o(this.referrerpolicy)}
                    rel=${o(this.rel)}
                >${g}</a>`}}return n([n$1()],r.prototype,"download"),n([n$1()],r.prototype,"label"),n([n$1()],r.prototype,"href"),n([n$1()],r.prototype,"target"),n([n$1()],r.prototype,"referrerpolicy"),n([n$1()],r.prototype,"rel"),r}

export { LikeAnchor as L };
