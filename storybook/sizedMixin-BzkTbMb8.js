import { n } from './define-element-C_3bgzm7.js';

var a=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=(r,i,s,t)=>{for(var e=u(i,s),l=r.length-1,o;l>=0;l--)(o=r[l])&&(e=(o(i,s,e))||e);return e&&a(i,s,e),e};const ElementSizes={xxs:"xxs",xs:"xs",s:"s",m:"m",l:"l",xl:"xl",xxl:"xxl"};function SizedMixin(r,{validSizes:i=["s","m","l","xl"],noDefaultSize:s,defaultSize:t="m"}={}){class e extends r{constructor(){super(...arguments);this._size=t;}get size(){return this._size||t}set size(n){const p=s?null:t,z=n&&n.toLocaleLowerCase(),x=i.includes(z)?z:p;if(x&&this.setAttribute("size",x),this._size===x)return;const c=this._size;this._size=x,this.requestUpdate("size",c);}update(n){!this.hasAttribute("size")&&!s&&this.setAttribute("size",this.size),super.update(n);}}return m([n({type:String})],e.prototype,"size"),e}

export { ElementSizes as E, SizedMixin as S };
