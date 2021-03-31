(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{208:function(e,t,r){"use strict";r.r(t),r.d(t,"DarkCode",(function(){return E})),r.d(t,"LightCode",(function(){return L})),r.d(t,"CodeExample",(function(){return z}));var o=r(2),i=r(6),a=r(106),c=r(26),d=r(107),n=r(108);let s;var l=Object(i.b)(s||(s=(e=>e)`
:host{display:flex;margin:1rem -4px 2rem;flex-direction:column;border-radius:6px;border:1px solid var(--spectrum-global-color-gray-100);width:100%;position:relative}.demo-example{max-width:100%;overflow:auto;flex:1;padding:var(--spectrum-global-dimension-size-400) var(--spectrum-global-dimension-size-500);border-radius:6px 6px 0 0;background:var(--spectrum-global-color-gray-100)}.demo-example .flex{display:flex}@media (max-width:768px){.demo-example{padding:var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-200)}}#markup{position:relative;max-width:100%;padding:.75rem 1.5rem;border-radius:0 0 6px 6px;border-top:1px solid var(--spectrum-global-color-gray-100);background:var(--spectrum-global-color-gray-75);overflow:hidden;line-height:1.3em;overflow-x:auto}.copy{position:absolute;bottom:1px;right:1px}
`)),h=r(181),g=r(44),u=(r(25),r(189)),p=r(4);let x,m=e=>e;class b extends u.a{render(){return Object(p.a)(i.d),(({width:e=24,height:t=24,hidden:r=!1,title:o="Copy"}={})=>Object(p.b)(x||(x=m`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="${0}"
    viewBox="0 0 36 36"
    width="${0}"
    aria-hidden="${0}"
    role="img"
    fill="currentColor"
    aria-label="${0}"
  >
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="18" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="14" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="10" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="6" />
    <rect height="2" rx=".5" ry=".5" width="2" x="32" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="28" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="24" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="20" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="16" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="2" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="6" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="10" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="14" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="18" />
    <rect height="2" rx=".5" ry=".5" width="2" x="12" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="16" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="20" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="24" y="22" />
    <rect height="2" rx=".5" ry=".5" width="2" x="28" y="22" />
    <path d="M10 12H3a1 1 0 00-1 1v20a1 1 0 001 1h20a1 1 0 001-1v-7H11a1 1 0 01-1-1z" />
  </svg>`),t,e,r?"true":"false",o))({hidden:!this.label,title:this.label})}}function y(e){if("clipboard"in navigator)return navigator.clipboard.writeText(e.textContent||"");const t=getSelection();if(null==t)return Promise.reject(new Error);t.removeAllRanges();const r=document.createRange();return r.selectNodeContents(e),t.addRange(r),document.execCommand("copy"),t.removeAllRanges(),Promise.resolve()}customElements.define("sp-icon-copy",b);let v,w,O,j,k,f,C,T=e=>e;class $ extends i.a{constructor(){super(...arguments),this.code=""}get highlightedCode(){return Object(c.a)(this.code)}render(){return Object(i.d)(v||(v=T` <pre><code>${0}</code></pre> `),this.highlightedCode)}}Object(o.a)([Object(i.e)()],$.prototype,"code",void 0);let E=class extends ${static get styles(){return[d.a]}};E=Object(o.a)([Object(i.c)("dark-code")],E);let L=class extends ${static get styles(){return[n.a,Object(i.b)(w||(w=T`.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#567f01}.token.punctuation{color:#737373}.language-css .token.function{color:inherit}`))]}};L=Object(o.a)([Object(i.c)("light-code")],L);let z=class extends(Object(g.a)(i.a)){constructor(){super(...arguments),this.codeTheme="dark",this.shouldManageTabOrderForScrolling=()=>{[this.markup,this.demo].map(e=>{if(!e)return;const{offsetWidth:t,scrollWidth:r}=e;t<r?e.tabIndex=0:e.removeAttribute("tabindex")})}}static get styles(){return[l]}get code(){return Object(h.a)(O||(O=T`${0}`),this.textContent)||""}get language(){return this.classList.contains("language-javascript")?"javascript":"markup"}get showDemo(){return this.classList.contains("language-html")||this.classList.contains("language-html-live")}get highlightedCode(){const e=a.highlight(this.code,a.languages[this.language],this.language);return"dark"===this.codeTheme?Object(i.d)(j||(j=T` <dark-code .code="${0}"></dark-code> `),e):Object(i.d)(k||(k=T` <light-code .code="${0}"></light-code> `),e)}get renderedCode(){if(this.classList.contains("language-html-live")){const e=document.createElement("div");e.slot="demo",e.innerHTML=this.code,this.append(e)}return Object(c.a)(this.code)}render(){var e;const t={color:void 0,scale:void 0},r=new CustomEvent("sp-query-theme",{bubbles:!0,composed:!0,detail:t,cancelable:!0});this.dispatchEvent(r),this.codeTheme=(null===(e=t.color)||void 0===e?void 0:e.startsWith("light"))?"light":"dark";const{highlightedCode:o,renderedCode:a}=this;return Object(i.d)(f||(f=T` ${0} <bdo id="markup" dir="ltr"> ${0} <sp-action-button class="copy" @click="${0}" quiet> <sp-icon-copy slot="icon"></sp-icon-copy> Copy to Clipboard </sp-action-button> </bdo> `),this.showDemo?Object(i.d)(C||(C=T` <div class="demo-example"> <slot name="demo">${0}</slot> </div> `),a):void 0,o,this.copyToClipboard)}copyToClipboard(){y(this)}updated(){requestAnimationFrame(()=>{this.shouldManageTabOrderForScrolling()})}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.shouldManageTabOrderForScrolling)}disconnectedCallback(){window.removeEventListener("resize",this.shouldManageTabOrderForScrolling),super.disconnectedCallback()}};Object(o.a)([Object(i.f)("#markup")],z.prototype,"markup",void 0),Object(o.a)([Object(i.f)(".demo-example")],z.prototype,"demo",void 0),Object(o.a)([Object(i.e)()],z.prototype,"codeTheme",void 0),z=Object(o.a)([Object(i.c)("code-example")],z)},26:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var o=r(6);function i(e){const t=[""+e];return t.raw=[""+e],Object(o.d)(t)}}}]);
//# sourceMappingURL=10.827818d62438a51fc60d.js.map