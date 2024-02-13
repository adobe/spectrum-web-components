import { S as SpectrumElement } from './define-element-UHExAFdK.js';

function T(o,i,l=[]){for(let e=0;e<i.length;++e){const n=i[e],r=o[e],t=r.parentElement||r.getRootNode();l[e]&&l[e](n),t&&t!==r&&t.replaceChild(n,r),delete o[e];}return i}const reparentChildren=(o,i,{position:l,prepareCallback:e}={position:"beforeend"})=>{let{length:n}=o;if(n===0)return ()=>o;let r=1,t=0;(l==="afterbegin"||l==="afterend")&&(r=-1,t=n-1);const a=new Array(n),c=new Array(n),p=document.createComment("placeholder for reparented element");do{const d=o[t];e&&(c[t]=e(d)),a[t]=p.cloneNode();const m=d.parentElement||d.getRootNode();m&&m!==d&&m.replaceChild(a[t],d),i.insertAdjacentElement(l,d),t+=r;}while(--n>0);return function(){return T(a,o,c)}};

class OverlayTimer{constructor(e={}){this.warmUpDelay=1e3;this.coolDownDelay=1e3;this.isWarm=!1;this.timeout=0;Object.assign(this,e);}async openTimer(e){if(this.cancelCooldownTimer(),!this.component||e!==this.component)return this.component&&(this.close(this.component),this.cancelCooldownTimer()),this.component=e,this.isWarm?!1:(this.promise=new Promise(o=>{this.resolve=o,this.timeout=window.setTimeout(()=>{this.resolve&&(this.resolve(!1),this.isWarm=!0);},this.warmUpDelay);}),this.promise);if(this.promise)return this.promise;throw new Error("Inconsistent state")}close(e){this.component&&this.component===e&&(this.resetCooldownTimer(),this.timeout>0&&(clearTimeout(this.timeout),this.timeout=0),this.resolve&&(this.resolve(!0),delete this.resolve),delete this.promise,delete this.component);}resetCooldownTimer(){this.isWarm&&(this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),this.cooldownTimeout=window.setTimeout(()=>{this.isWarm=!1,delete this.cooldownTimeout;},this.coolDownDelay));}cancelCooldownTimer(){this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),delete this.cooldownTimeout;}}

const overlayTimer=new OverlayTimer,noop=()=>{};class BeforetoggleClosedEvent extends Event{constructor(){super("beforetoggle",{bubbles:!1,composed:!1});this.currentState="open";this.newState="closed";}}class BeforetoggleOpenEvent extends Event{constructor(){super("beforetoggle",{bubbles:!1,composed:!1});this.currentState="closed";this.newState="open";}}class OverlayStateEvent extends Event{constructor(t,a,{publish:r,interaction:l,reason:p}){super(t,{bubbles:r,composed:r});this.overlay=a;this.detail={interaction:l,reason:p};}}const guaranteedAllTransitionend=(o,d,t)=>{const a=new AbortController,r=new Map,l=()=>{a.abort(),t();};let p,s;const e=requestAnimationFrame(()=>{p=requestAnimationFrame(()=>{s=requestAnimationFrame(()=>{l();});});}),u=n=>{n.target===o&&(r.set(n.propertyName,r.get(n.propertyName)-1),r.get(n.propertyName)||r.delete(n.propertyName),r.size===0&&l());},y=n=>{n.target===o&&(r.has(n.propertyName)||r.set(n.propertyName,0),r.set(n.propertyName,r.get(n.propertyName)+1),cancelAnimationFrame(e),cancelAnimationFrame(p),cancelAnimationFrame(s));};o.addEventListener("transitionrun",y,{signal:a.signal}),o.addEventListener("transitionend",u,{signal:a.signal}),o.addEventListener("transitioncancel",u,{signal:a.signal}),d();};function nextFrame(){return new Promise(o=>requestAnimationFrame(()=>o()))}function forcePaint(){document.body.offsetHeight;}class AbstractOverlay extends SpectrumElement{constructor(){super(...arguments);this.dispose=noop;this.offset=6;this.willPreventClose=!1;}async applyFocus(t,a){}get delayed(){return !1}set delayed(t){}async ensureOnDOM(t){}async makeTransition(t){return null}async manageDelay(t){}async manageDialogOpen(){}async managePopoverOpen(){}managePosition(){}get open(){return !1}set open(t){}get state(){return "closed"}set state(t){}manuallyKeepOpen(){}static update(){const t=new CustomEvent("sp-update-overlays",{bubbles:!0,composed:!0,cancelable:!0});document.dispatchEvent(t);}static async open(t,a,r,l){var g,b,f,E;await import('./sp-overlay-4pHcDtVF.js').then(function (n) { return n.s; });const p=arguments.length===2,s=r||t,e=new this;let u=!1;e.dispose=()=>{e.addEventListener("sp-closed",()=>{u||(y(),u=!0),requestAnimationFrame(()=>{e.remove();});}),e.open=!1,e.dispose=noop;};const y=reparentChildren([s],e,{position:"beforeend",prepareCallback:c=>{const v=c.slot;return c.removeAttribute("slot"),()=>{c.slot=v;}}});if(!p&&s&&l){const c=t,v=a,m=l;return e.delayed=m.delayed||s.hasAttribute("delayed"),e.receivesFocus=(g=m.receivesFocus)!=null?g:"auto",e.triggerElement=m.virtualTrigger||c,e.type=v==="modal"?"modal":v==="hover"?"hint":"auto",e.offset=(b=m.offset)!=null?b:6,e.placement=m.placement,e.willPreventClose=!!m.notImmediatelyClosable,c.insertAdjacentElement("afterend",e),await e.updateComplete,e.open=!0,e.dispose}const i=a;return e.append(s),e.delayed=i.delayed||s.hasAttribute("delayed"),e.receivesFocus=(f=i.receivesFocus)!=null?f:"auto",e.triggerElement=i.trigger||null,e.type=i.type||"modal",e.offset=(E=i.offset)!=null?E:6,e.placement=i.placement,e.willPreventClose=!!i.notImmediatelyClosable,e.updateComplete.then(()=>{e.open=!0;}),e}}

class VirtualTrigger{constructor(t,i){this.x=0;this.y=0;this.x=t,this.y=i;}updateBoundingClientRect(t,i){this.x=t,this.y=i,AbstractOverlay.update();}getBoundingClientRect(){return {width:0,height:0,top:this.y,right:this.x,y:this.y,x:this.x,bottom:this.y,left:this.x,toJSON(){}}}}

export { AbstractOverlay as A, BeforetoggleOpenEvent as B, OverlayStateEvent as O, VirtualTrigger as V, BeforetoggleClosedEvent as a, noop as b, forcePaint as f, guaranteedAllTransitionend as g, nextFrame as n, overlayTimer as o };