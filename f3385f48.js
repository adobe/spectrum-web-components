import{x as e,D as t}from"./032a7dfd.js";import{l as n}from"./9beeb9da.js";import"./112b2095.js";const o=document.querySelector(".demo-preview"),r=document.querySelector(".demo-config");function s(){const e={};if(!r)return e;return r.querySelectorAll(".demo-control").forEach((t=>{e[t.id]="false"!==t.value&&t.value})),e}const i=(r={})=>{t((({disabled:t,pending:o,size:r,treatment:s,variant:i})=>e`<sp-button ?disabled="${t}" ?pending="${o}" size="${n(r)}" treatment="${n(s)}" variant="${n(i)}">Test Button</sp-button>`)(r),o)};r&&r.addEventListener("change",(()=>{i(s())})),customElements.whenDefined("sp-picker").then((()=>{const e=s();console.log(e),i(e)}));
//# sourceMappingURL=f3385f48.js.map