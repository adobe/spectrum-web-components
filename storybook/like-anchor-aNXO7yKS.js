import { n as n$1 } from './define-element-2SKaLcgv.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';

var f=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var n=(s,r,p,o)=>{for(var t=o>1?void 0:o?b(r,p):r,a=s.length-1,l;a>=0;a--)(l=s[a])&&(t=(o?l(r,p,t):l(t))||t);return o&&t&&f(r,p,t),t};function LikeAnchor(s){class r extends s{renderAnchor({id:t,className:a,ariaHidden:l$1,labelledby:d,tabindex:g,anchorContent:u=x`<slot></slot>`}){return x`<a
                    id=${t}
                    class=${l(a)}
                    href=${l(this.href)}
                    download=${l(this.download)}
                    target=${l(this.target)}
                    aria-label=${l(this.label)}
                    aria-labelledby=${l(d)}
                    aria-hidden=${l(l$1?"true":void 0)}
                    tabindex=${l(g)}
                    referrerpolicy=${l(this.referrerpolicy)}
                    rel=${l(this.rel)}
                >${u}</a>`}}return n([n$1()],r.prototype,"download",2),n([n$1()],r.prototype,"label",2),n([n$1()],r.prototype,"href",2),n([n$1()],r.prototype,"target",2),n([n$1()],r.prototype,"referrerpolicy",2),n([n$1()],r.prototype,"rel",2),r}

export { LikeAnchor as L };
