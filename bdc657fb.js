function t(t,e,i){const r=t.getAttribute(e);let n=r?r.split(/\s+/):[];n=n.filter((t=>!i.find((e=>t===e)))),n.length?t.setAttribute(e,n.join(" ")):t.removeAttribute(e)}function e(e,i,r){const n=Array.isArray(r)?r:[r],s=e.getAttribute(i),u=s?s.split(/\s+/):[];return n.every((t=>u.indexOf(t)>-1))?()=>{}:(u.push(...n),e.setAttribute(i,u.join(" ")),()=>t(e,i,n))}export{t as a,e as c};
//# sourceMappingURL=bdc657fb.js.map