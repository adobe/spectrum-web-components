"use strict";export const getDeepElementFromPoint=(o,t)=>{let e=document.elementFromPoint(o,t);for(;e!=null&&e.shadowRoot;){const n=e.shadowRoot.elementFromPoint(o,t);if(!n||n===e)break;e=n}return e};
//# sourceMappingURL=get-deep-element-from-point.js.map
