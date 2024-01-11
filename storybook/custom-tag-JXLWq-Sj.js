let t;const tag=function(e,...a){return t?t(e,...a):a.reduce((r,p,l)=>r+p+e[l+1],e[0])},setCustomTemplateLiteralTag=e=>{t=e;};

export { setCustomTemplateLiteralTag as s, tag as t };
