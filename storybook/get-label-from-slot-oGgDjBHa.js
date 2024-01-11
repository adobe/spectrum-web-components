const getLabelFromSlot=(r,l)=>{if(r)return null;const t=l.assignedNodes().reduce((e,n)=>n.textContent?e+n.textContent:e,"");return t?t.trim():null};

export { getLabelFromSlot as g };
