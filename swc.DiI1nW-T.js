let e=(e=>{const t=e,n=[];for(;e;)e--,n.push({name:String(t-e),date:e});return n})(50);customElements.whenDefined("code-example").then((()=>{customElements.whenDefined("sp-table").then((()=>{(async()=>{const t=document.querySelector("#sorted-virtualized-table");await t.updateComplete,await(t.closest("code-example")?.updateComplete),t.items=e,t.renderItem=(e,t)=>{const n=document.createElement("sp-table-cell"),o=document.createElement("sp-table-cell"),a=document.createElement("sp-table-cell");return n.textContent=`Row Item Alpha ${e.name}`,o.textContent=`Row Item Beta ${e.date}`,a.textContent=`Index: ${t}`,[n,o,a]},t.addEventListener("sorted",(n=>{const{sortDirection:o,sortKey:a}=n.detail;e=e.sort(((e,t)=>{const n=String(e[a]),l=String(t[a]);return"asc"===o?n.localeCompare(l):l.localeCompare(n)})),t.items=[...e]}))})()}))}));
//# sourceMappingURL=swc.D_h9stKe.js.map
