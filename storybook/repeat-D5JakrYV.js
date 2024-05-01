import { w } from './lit-html-COgVUehj.js';
import { e, i, t } from './directive-Bn5c4u4M.js';
import { p, v, r, h, m } from './directive-helpers-icdnqxxc.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u=(e,s,t)=>{const r=new Map;for(let l=s;l<=t;l++)r.set(e[l],l);return r},c=e(class extends i{constructor(e){if(super(e),e.type!==t.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,s,t){let r;void 0===t?t=s:void 0!==s&&(r=s);const l=[],o=[];let i=0;for(const s of e)l[i]=r?r(s,i):i,o[i]=t(s,i),i++;return {values:o,keys:l}}render(e,s,t){return this.dt(e,s,t).values}update(s,[t,r$1,c]){const d=p(s),{values:p$1,keys:a}=this.dt(t,r$1,c);if(!Array.isArray(d))return this.ut=a,p$1;const h$1=this.ut??=[],v$1=[];let m$1,y,x=0,j=d.length-1,k=0,w$1=p$1.length-1;for(;x<=j&&k<=w$1;)if(null===d[x])x++;else if(null===d[j])j--;else if(h$1[x]===a[k])v$1[k]=v(d[x],p$1[k]),x++,k++;else if(h$1[j]===a[w$1])v$1[w$1]=v(d[j],p$1[w$1]),j--,w$1--;else if(h$1[x]===a[w$1])v$1[w$1]=v(d[x],p$1[w$1]),r(s,v$1[w$1+1],d[x]),x++,w$1--;else if(h$1[j]===a[k])v$1[k]=v(d[j],p$1[k]),r(s,d[x],d[j]),j--,k++;else if(void 0===m$1&&(m$1=u(a,k,w$1),y=u(h$1,x,j)),m$1.has(h$1[x]))if(m$1.has(h$1[j])){const e=y.get(a[k]),t=void 0!==e?d[e]:null;if(null===t){const e=r(s,d[x]);v(e,p$1[k]),v$1[k]=e;}else v$1[k]=v(t,p$1[k]),r(s,d[x],t),d[e]=null;k++;}else h(d[j]),j--;else h(d[x]),x++;for(;k<=w$1;){const e=r(s,v$1[w$1+1]);v(e,p$1[k]),v$1[k++]=e;}for(;x<=j;){const e=d[x++];null!==e&&h(e);}return this.ut=a,m(s,v$1),w}});

export { c };
