import { n as n$1 } from './define-element-467f3dc4.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';

var b=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var n=(s,e,p,l)=>{for(var t=l>1?void 0:l?g(e,p):e,a=s.length-1,i;a>=0;a--)(i=s[a])&&(t=(l?i(e,p,t):i(t))||t);return l&&t&&b(e,p,t),t};function LikeAnchor(s){class e extends s{renderAnchor({id:t,className:a,ariaHidden:i,labelledby:c,tabindex:u,anchorContent:f=x`<slot></slot>`}){return x`<a
                    id=${t}
                    class=${l(a)}
                    href=${l(this.href)}
                    download=${l(this.download)}
                    target=${l(this.target)}
                    aria-label=${l(this.label)}
                    aria-labelledby=${l(c)}
                    aria-hidden=${l(i?"true":void 0)}
                    tabindex=${l(u)}
                    rel=${l(this.rel)}
                >${f}</a>`}}return n([n$1({reflect:!0})],e.prototype,"download",2),n([n$1()],e.prototype,"label",2),n([n$1({reflect:!0})],e.prototype,"href",2),n([n$1({reflect:!0})],e.prototype,"target",2),n([n$1({reflect:!0})],e.prototype,"rel",2),e}

export { LikeAnchor as L };
