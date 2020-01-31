import{c as e,p as t,L as o,_ as r}from"./lit-element-089a5717.js";import{q as n,k as i,j as a,z as s,y as l}from"./storybook-preview-9aba481c.js";import"./index-e0e40925.js";import{_ as p}from"./tslib.es6-d9c764b6.js";import"./if-defined-f9b5fa5b.js";import"./index-16f3b7d2.js";import"./focusable-f84f80fc.js";import"./observe-slot-text-5194cee4.js";import"./index-da10f6c3.js";import"./index-fcda0df5.js";import"./index-160e7101.js";import"./index-a0f0b1d0.js";var c=e`:host([disabled]) #trigger{pointer-events:none}#overlay-content{display:none}`;function d(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function u(e){if("[object Window]"!=={}.toString.call(e)){var t=e.ownerDocument;return t?t.defaultView:window}return e}function h(e){var t=u(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function f(e){return e instanceof u(e).Element}function m(e){return e instanceof u(e).HTMLElement}function v(e){return e?(e.nodeName||"").toLowerCase():null}function g(e,t,o){void 0===o&&(o=!1);var r,n,i=d(e),a={scrollLeft:0,scrollTop:0},s={x:0,y:0};return o||("body"!==v(t)&&(a=(r=t)!==u(r)&&m(r)?{scrollLeft:(n=r).scrollLeft,scrollTop:n.scrollTop}:h(r)),m(t)&&((s=d(t)).x+=t.clientLeft,s.y+=t.clientTop)),{x:i.left+a.scrollLeft-s.x,y:i.top+a.scrollTop-s.y,width:i.width,height:i.height}}function y(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function b(e){return"html"===v(e)?e:e.parentNode||e.host||document.ownerDocument||document.documentElement}function w(e){return u(e).getComputedStyle(e)}function O(e,t){void 0===t&&(t=[]);var o=function e(t){if(["html","body","#document"].indexOf(v(t))>=0)return t.ownerDocument.body;if(m(t)){var o=w(t),r=o.overflow,n=o.overflowX,i=o.overflowY;if(/auto|scroll|overlay|hidden/.test(r+i+n))return t}return e(b(t))}(e),r="body"===v(o),n=r?u(o):o,i=t.concat(n);return r?i:i.concat(O(b(n)))}function x(e){return["table","td","th"].indexOf(v(e))>=0}var C=function(){return void 0!==window.InstallTrigger};function E(e){var t;return!m(e)||!(t=e.offsetParent)||C()&&"fixed"===w(t).position?null:t}function k(e){for(var t=u(e),o=E(e);o&&x(o);)o=E(o);return o&&"body"===v(o)&&"static"===w(o).position?t:o||t}var T="top",P="bottom",S="right",M="left",j="auto",A=[T,P,S,M],D="start",L="end",q="clippingParents",N="viewport",R="popper",$="reference",F=A.reduce((function(e,t){return e.concat([t+"-"+D,t+"-"+L])}),[]),H=[].concat(A,[j]).reduce((function(e,t){return e.concat([t,t+"-"+D,t+"-"+L])}),[]),W=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function z(e){var t=new Map,o=new Set,r=[];return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){o.has(e.name)||function e(n){o.add(n.name),[].concat(n.requires||[],n.requiresIfExists||[]).forEach((function(r){if(!o.has(r)){var n=t.get(r);n&&e(n)}})),r.push(n)}(e)})),r}function B(e){for(var t=arguments.length,o=new Array(t>1?t-1:0),r=1;r<t;r++)o[r-1]=arguments[r];return[].concat(o).reduce((function(e,t){return e.replace(/%s/,t)}),e)}var I='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',_='Popper: modifier "%s" requires "%s", but "%s" modifier is not available',U=["name","enabled","phase","fn","effect","requires","options"];function V(e,t){var o=new Set;return e.filter((function(e){var r=t(e);if(!o.has(r))return o.add(r),!0}))}function K(e){return e.split("-")[0]}var X="Popper: Invalid reference or popper argument provided to Popper, they must be either a valid DOM element, virtual element, or a jQuery-wrapped DOM element.",Y="Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",J={placement:"bottom",modifiers:[],strategy:"absolute"};function Q(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}var G={passive:!0};function Z(e){return e.split("-")[1]}function ee(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function te(e){var t,o=e.reference,r=e.element,n=e.placement,i=n?K(n):null,a=n?Z(n):null,s=o.x+o.width/2-r.width/2,l=o.y+o.height/2-r.height/2;switch(i){case T:t={x:s,y:o.y-r.height};break;case P:t={x:s,y:o.y+o.height};break;case S:t={x:o.x+o.width,y:l};break;case M:t={x:o.x-r.width,y:l};break;default:t={x:o.x,y:o.y}}var p=i?ee(i):null;if(null!=p){var c="y"===p?"height":"width";switch(a){case D:t[p]=Math.floor(t[p])-Math.floor(o[c]/2-r[c]/2);break;case L:t[p]=Math.floor(t[p])+Math.ceil(o[c]/2-r[c]/2)}}return t}function oe(e){return e.ownerDocument.documentElement}var re={top:"auto",right:"auto",bottom:"auto",left:"auto"};function ne(e){var t,o=e.popper,r=e.popperRect,n=e.placement,i=e.offsets,a=e.position,s=e.gpuAcceleration,l=e.adaptive,p=function(e){var t=e.x,o=e.y,r=window.devicePixelRatio||1;return{x:Math.round(t*r)/r||0,y:Math.round(o*r)/r||0}}(i),c=p.x,d=p.y,h=i.hasOwnProperty("x"),f=i.hasOwnProperty("y"),m=M,v=T;if(l){var g=k(o);g===u(o)&&(g=oe(o)),n===T&&(v=P,d-=g.clientHeight-r.height,d*=s?1:-1),n===M&&(m=S,c-=g.clientWidth-r.width,c*=s?1:-1)}var y,b=Object.assign({position:a},l&&re);return s?Object.assign({},b,((y={})[v]=f?"0":"",y[m]=h?"0":"",y.transform=(window.devicePixelRatio||1)<2?"translate("+c+"px, "+d+"px)":"translate3d("+c+"px, "+d+"px, 0)",y)):Object.assign({},b,((t={})[v]=f?d+"px":"",t[m]=h?c+"px":"",t.transform="",t))}var ie={left:"right",right:"left",bottom:"top",top:"bottom"};function ae(e){return e.replace(/left|right|bottom|top/g,(function(e){return ie[e]}))}var se={start:"end",end:"start"};function le(e){return e.replace(/start|end/g,(function(e){return se[e]}))}function pe(e){return parseFloat(e)||0}function ce(e){var t=u(e),o=function(e){var t=m(e)?w(e):{};return{top:pe(t.borderTopWidth),right:pe(t.borderRightWidth),bottom:pe(t.borderBottomWidth),left:pe(t.borderLeftWidth)}}(e),r="html"===v(e),n=e.clientWidth+o.right,i=e.clientHeight+o.bottom;return{top:e.clientTop,right:e.clientLeft>o.left?o.right:r?t.innerWidth-n:e.offsetWidth-n,bottom:r?t.innerHeight-i:e.offsetHeight-i,left:e.clientLeft}}function de(e,t){var o=Boolean(t.getRootNode&&t.getRootNode().host);if(e.contains(t))return!0;if(o){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ue(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function he(e,t){return t===N?ue(function(e){var t=u(e);return{width:t.innerWidth,height:t.innerHeight,x:0,y:0}}(e)):m(t)?d(t):ue(function(e){var t=u(e),o=h(e),r=g(oe(e),t);return r.height=Math.max(r.height,t.innerHeight),r.width=Math.max(r.width,t.innerWidth),r.x=-o.scrollLeft,r.y=-o.scrollTop,r}(oe(e)))}function fe(e,t,o){var r="clippingParents"===t?function(e){var t=O(e),o=["absolute","fixed"].indexOf(w(e).position)>=0&&m(e)?k(e):e;return f(o)?t.filter((function(e){return f(e)&&de(e,o)})):[]}(e):[].concat(t),n=[].concat(r,[o]),i=n[0],a=n.reduce((function(t,o){var r=he(e,o),n=ce(m(o)?o:oe(e));return t.top=Math.max(r.top+n.top,t.top),t.right=Math.min(r.right-n.right,t.right),t.bottom=Math.min(r.bottom-n.bottom,t.bottom),t.left=Math.max(r.left+n.left,t.left),t}),he(e,i));return a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}function me(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},{},e)}function ve(e,t){return t.reduce((function(t,o){return t[o]=e,t}),{})}function ge(e,t){void 0===t&&(t={});var o=t,r=o.placement,n=void 0===r?e.placement:r,i=o.boundary,a=void 0===i?q:i,s=o.rootBoundary,l=void 0===s?N:s,p=o.elementContext,c=void 0===p?R:p,u=o.altBoundary,h=void 0!==u&&u,m=o.padding,v=void 0===m?0:m,g=me("number"!=typeof v?v:ve(v,A)),y=c===R?$:R,b=e.elements.reference,w=e.rects.popper,O=e.elements[h?y:c],x=fe(f(O)?O:oe(e.elements.popper),a,l),C=d(b),E=te({reference:C,element:w,strategy:"absolute",placement:n}),k=ue(Object.assign({},w,{},E)),M=c===R?k:C,j={top:x.top-M.top+g.top,bottom:M.bottom-x.bottom+g.bottom,left:x.left-M.left+g.left,right:M.right-x.right+g.right},D=e.modifiersData.offset;if(c===R&&D){var L=D[n];Object.keys(j).forEach((function(e){var t=[S,P].indexOf(e)>=0?1:-1,o=[T,P].indexOf(e)>=0?"y":"x";j[e]+=L[o]*t}))}return j}function ye(e,t,o){return Math.max(e,Math.min(t,o))}var be=function(e){void 0===e&&(e={});var t=e,o=t.defaultModifiers,r=void 0===o?[]:o,n=t.defaultOptions,i=void 0===n?J:n;return function(e,t,o){void 0===o&&(o=i);var n,a,s={placement:"bottom",orderedModifiers:[],options:Object.assign({},J,{},i),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},l=[],p=!1,c={state:s,setOptions:function(o){d(),s.options=Object.assign({},i,{},s.options,{},o),s.scrollParents={reference:f(e)?O(e):[],popper:O(t)};var n=function(e){var t=z(e);return W.reduce((function(e,o){return e.concat(t.filter((function(e){return e.phase===o})))}),[])}([].concat(s.options.modifiers.filter((function(e){return!r.find((function(t){return t.name===e.name}))})),r.map((function(e){return Object.assign({},e,{},s.options.modifiers.find((function(t){return t.name===e.name})))}))));if("production"!==process.env.NODE_ENV){if(function(e){e.forEach((function(t){Object.keys(t).forEach((function(o){switch(o){case"name":"string"!=typeof t.name&&console.error(B(I,String(t.name),'"name"','"string"','"'+String(t.name)+'"'));break;case"enabled":"boolean"!=typeof t.enabled&&console.error(B(I,t.name,'"enabled"','"boolean"','"'+String(t.enabled)+'"'));case"phase":W.indexOf(t.phase)<0&&console.error(B(I,t.name,'"phase"',"either "+W.join(", "),'"'+String(t.phase)+'"'));break;case"fn":"function"!=typeof t.fn&&console.error(B(I,t.name,'"fn"','"function"','"'+String(t.fn)+'"'));break;case"effect":"function"!=typeof t.effect&&console.error(B(I,t.name,'"effect"','"function"','"'+String(t.fn)+'"'));break;case"requires":Array.isArray(t.requires)||console.error(B(I,t.name,'"requires"','"array"','"'+String(t.requires)+'"'));break;case"requiresIfExists":Array.isArray(t.requiresIfExists)||console.error(B(I,t.name,'"requiresIfExists"','"array"','"'+String(t.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+t.name+'" modifier, valid properties are '+U.map((function(e){return'"'+e+'"'})).join(", ")+'; but "'+o+'" was provided.')}t.requires&&t.requires.forEach((function(o){null==e.find((function(e){return e.name===o}))&&console.error(B(_,String(t.name),o,o))}))}))}))}(V([].concat(n,s.options.modifiers),(function(e){return e.name}))),K(s.options.placement)===j)n.find((function(e){return"flip"===e.name}))||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" "));var a=w(t);[a.marginTop,a.marginRight,a.marginBottom,a.marginLeft].some((function(e){return parseFloat(e)}))&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" "))}return s.orderedModifiers=n.filter((function(e){return e.enabled})),s.orderedModifiers.forEach((function(e){var t=e.name,o=e.options,r=void 0===o?{}:o,n=e.effect;if("function"==typeof n){var i=n({state:s,name:t,instance:c,options:r});l.push(i||function(){})}})),c.update()},forceUpdate:function(){if(!p){var e=s.elements,t=e.reference,o=e.popper;if(Q(t,o)){s.rects={reference:g(t,k(o),"fixed"===s.options.strategy),popper:y(o)},s.reset=!1,s.placement=s.options.placement,s.orderedModifiers.forEach((function(e){return s.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0,n=0;n<s.orderedModifiers.length;n++){if("production"!==process.env.NODE_ENV&&(r+=1)>100){console.error(Y);break}if(!0!==s.reset){var i=s.orderedModifiers[n],a=i.fn,l=i.options,d=void 0===l?{}:l,u=i.name;"function"==typeof a&&(s=a({state:s,options:d,name:u,instance:c})||s)}else s.reset=!1,n=-1}}else"production"!==process.env.NODE_ENV&&console.error(X)}},update:(n=function(){return new Promise((function(e){c.forceUpdate(),e(s)}))},function(){return a||(a=new Promise((function(e){Promise.resolve().then((function(){a=void 0,e(n())}))}))),a}),destroy:function(){d(),p=!0}};if(!Q(e,t))return"production"!==process.env.NODE_ENV&&console.error(X),c;function d(){l.forEach((function(e){return e()})),l=[]}return c.setOptions(o).then((function(e){!p&&o.onFirstUpdate&&o.onFirstUpdate(e)})),c}}({defaultModifiers:[...[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,o=e.instance,r=e.options,n=r.scroll,i=void 0===n||n,a=r.resize,s=void 0===a||a,l=u(t.elements.popper),p=[].concat(t.scrollParents.reference,t.scrollParents.popper);return i&&p.forEach((function(e){e.addEventListener("scroll",o.update,G)})),s&&l.addEventListener("resize",o.update,G),function(){i&&p.forEach((function(e){e.removeEventListener("scroll",o.update,G)})),s&&l.removeEventListener("resize",o.update,G)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,o=e.name;t.modifiersData[o]=te({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,o=e.options,r=o.gpuAcceleration,n=void 0===r||r,i=o.adaptive,a=void 0===i||i;"production"!==process.env.NODE_ENV&&a&&parseFloat(w(t.elements.popper).transitionDuration)&&console.warn(['Popper: The "computeStyles" modifier\'s `adaptive` option must be',"disabled if CSS transitions are applied to the popper element."].join(" "));var s={placement:K(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:n};t.styles.popper=Object.assign({},t.styles.popper,{},ne(Object.assign({},s,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a}))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,{},ne(Object.assign({},s,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var o=t.styles[e]||{},r=t.attributes[e]||{},n=t.elements[e];m(n)&&v(n)&&(Object.assign(n.style,o),Object.keys(r).forEach((function(e){var t=r[e];!1===t?n.removeAttribute(e):n.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,o={position:"absolute",left:"0",top:"0",margin:"0"};return Object.assign(t.elements.popper.style,o),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],n=Object.keys(t.styles.hasOwnProperty(e)?Object.assign({},t.styles[e]):o),i=t.attributes[e]||{},a=n.reduce((function(e,t){var o;return Object.assign({},e,((o={})[String(t)]="",o))}),{});m(r)&&v(r)&&(Object.assign(r.style,a),Object.keys(i).forEach((function(e){return r.removeAttribute(e)})))}))}},requires:["computeStyles"]}],{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var n=o.fallbackPlacements,i=o.padding,a=o.boundary,s=o.rootBoundary,l=o.flipVariations,p=void 0===l||l,c=t.options.placement,d=K(c),u=n||(d===c||!p?[ae(c)]:function(e){if(K(e)===j)return[];var t=ae(e);return[le(e),t,le(t)]}(c)),h=V([c].concat(u).reduce((function(e,o){return K(o)===j?e.concat(function(e,t){void 0===t&&(t={});var o=t,r=o.placement,n=o.boundary,i=o.rootBoundary,a=o.padding,s=o.flipVariations,l=Z(r),p=(l?s?F:F.filter((function(e){return Z(e)===l})):A).reduce((function(t,o){return t[o]=ge(e,{placement:o,boundary:n,rootBoundary:i,padding:a})[K(o)],t}),{});return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}(t,{placement:o,boundary:a,rootBoundary:s,padding:i,flipVariations:p})):e.concat(o)}),[]),(function(e){return e})),f=t.rects.reference,m=t.rects.popper,v=new Map,g=!0,y=h[0],b=0;b<h.length;b++){var w=h[b],O=K(w),x=Z(w)===D,C=[T,P].indexOf(O)>=0,E=C?"width":"height",k=ge(t,{placement:w,boundary:a,rootBoundary:s,padding:i}),L=C?x?S:M:x?P:T;f[E]>m[E]&&(L=ae(L));var q=ae(L),N=[k[O]<=0,k[L]<=0,k[q]<=0];if(N.every((function(e){return e}))){y=w,g=!1;break}v.set(w,N)}if(g)for(var R=function(e){var t=h.find((function(t){var o=v.get(t);if(o)return o.slice(0,e).every((function(e){return e}))}));if(t)return y=t,"break"},$=p?3:1;$>0;$--){if("break"===R($))break}t.placement!==y&&(t.modifiersData[r]._skip=!0,t.placement=y,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,o=e.options,r=e.name,n=o.mainAxis,i=void 0===n||n,a=o.altAxis,s=void 0!==a&&a,l=o.boundary,p=o.rootBoundary,c=o.padding,d=o.tether,u=void 0===d||d,h=o.tetherOffset,f=void 0===h?0:h,m=ge(t,{boundary:l,rootBoundary:p,padding:c}),v=K(t.placement),g=Z(t.placement),b=!g,w=ee(v),O="x"===w?"y":"x",x=t.modifiersData.popperOffsets,C=t.rects.reference,E=t.rects.popper,k="function"==typeof f?f(Object.assign({},t.rects,{placement:t.placement})):f,j={x:0,y:0};if(i){var A="y"===w?T:M,L="y"===w?P:S,q="y"===w?"height":"width",N=x[w],R=x[w]+m[A],$=x[w]-m[L],F=u?-E[q]/2:0,H=g===D?C[q]:E[q],W=g===D?-E[q]:-C[q],z=t.elements.arrow,B=u&&z?y(z):{width:0,height:0},I=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},_=I[A],U=I[L],V=ye(0,Math.abs(C[q]-B[q]),B[q]),X=b?C[q]/2-F-V-_-k:H-V-_-k,Y=b?-C[q]/2+F+V+U+k:W+V+U+k,J=t.modifiersData.offset?t.modifiersData.offset[t.placement][w]:0,Q=t.modifiersData.popperOffsets[w]+X-J,G=t.modifiersData.popperOffsets[w]+Y-J,te=ye(u?Math.min(R,Q):R,N,u?Math.max($,G):$);t.modifiersData.popperOffsets[w]=te,j[w]=te-N}if(s){var oe="x"===w?T:M,re="x"===w?P:S,ne=x[O],ie=ye(ne+m[oe],ne,ne-m[re]);t.modifiersData.popperOffsets[O]=ie,j[O]=ie-ne}t.modifiersData[r]=j},requiresIfExists:["offset"]},{name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,o=e.state,r=e.name,n=o.elements.arrow,i=o.modifiersData.popperOffsets,a=K(o.placement),s=ee(a),l=[M,S].indexOf(a)>=0?"height":"width";if(n){var p=o.modifiersData[r+"#persistent"].padding,c=y(n),d="y"===s?T:M,u="y"===s?P:S,h=(o.rects.reference[l]+o.rects.reference[s]-i[s]-o.rects.popper[l])/2-(i[s]-o.rects.reference[s])/2,f=ye(p[d],o.rects.popper[l]/2-c[l]/2+h,o.rects.popper[l]-c[l]-p[u]),m=s;o.modifiersData[r]=((t={})[m]=f,t)}},effect:function(e){var t=e.state,o=e.options,r=e.name,n=o.element,i=void 0===n?"[data-popper-arrow]":n,a=o.padding,s=void 0===a?0:a;("string"!=typeof i||(i=t.elements.popper.querySelector(i)))&&(de(t.elements.popper,i)?(t.elements.arrow=i,t.modifiersData[r+"#persistent"]={padding:me("number"!=typeof s?s:ve(s,A))}):"production"!==process.env.NODE_ENV&&console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper',"element."].join(" ")))},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,o=e.options,r=e.name,n=o.offset,i=void 0===n?[0,0]:n,a=H.reduce((function(e,o){return e[o]=function(e,t,o){var r=K(e),n=[M,T].indexOf(r)>=0?-1:1,i="function"==typeof o?o(Object.assign({},t,{placement:e})):o,a=i[0],s=i[1];return a=a||0,s=(s||0)*n,[M,S].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(o,t.rects,i),e}),{}),s=a[t.placement],l=s.x,p=s.y;t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=p,t.modifiersData[r]=a}},{name:"computeArrowRotateStyles",enabled:!0,phase:"beforeWrite",requiresIfExists:["arrow"],fn:function(e){if(e.state.styles&&e.state.styles.arrow){var t;switch(e.state.placement){case"bottom":case"bottom-start":case"bottom-end":t=180;break;case"top":case"top-start":case"top-end":return;case"left":case"left-start":case"left-end":t=270;break;case"right":case"right-start":case"right-end":t=90;break;default:return}e.state.styles.arrow.transform+=` rotate(${t}deg)`}},data:{}}]}),we=e`@keyframes spOverlayFadeIn{0%{opacity:0;transform:var(--sp-overlay-from)}to{opacity:1;transform:translate(0)}}@keyframes spOverlayFadeOut{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:var(--sp-overlay-from)}}:host{z-index:2;position:absolute}#contents,:host{display:inline-block;pointer-events:none}#contents{animation-duration:var(--spectrum-global-animation-duration-200);animation-timing-function:var(--spectrum-global-animation-ease-out);opacity:1;visibility:visible}:host([data-popper-placement*=top]) #contents{--sp-overlay-from:translateY(var(--spectrum-global-dimension-size-75))}:host([data-popper-placement*=right]) #contents{--sp-overlay-from:translateX(calc(-1*var(--spectrum-global-dimension-size-75)))}:host([data-popper-placement*=bottom]) #contents{--sp-overlay-from:translateY(calc(-1*var(--spectrum-global-dimension-size-75)))}:host([data-popper-placement*=left]) #contents{--sp-overlay-from:translateX(var(--spectrum-global-dimension-size-75))}::slotted(*){position:relative}:host([animating]) ::slotted(*){pointer-events:none}`,Oe={initial:"idle",states:{idle:{on:{active:"active"}},active:{on:{visible:"visible",hiding:"hiding",idle:"idle"}},visible:{on:{hiding:"hiding",idle:"idle"}},hiding:{on:{idle:"idle"}}}},xe=(e,t)=>e?t&&Oe.states[e].on[t]||e:Oe.initial;class Ce extends o{constructor(){super(...arguments),this.originalSlot=null,this._state=xe(),this.animating=!1,this.offset=6,this.interaction="hover",this.positionAnimationFrame=0}get state(){return this._state}set state(e){var t=xe(this.state,e);t!==this.state&&(this._state=t,"idle"===this.state?this.removeAttribute("state"):this.setAttribute("state",this.state))}get hasTheme(){return!!this.color||!!this.scale}static get styles(){return[we]}firstUpdated(e){super.firstUpdated(e),this.overlayContent&&(this.stealOverlayContent(this.overlayContent),this.overlayContent&&this.trigger&&this.shadowRoot&&(this.placement&&"none"!==this.placement&&(this.popper=be(this.trigger,this,{placement:this.placement,modifiers:[{name:"arrow",options:{element:this.overlayContentTip}},{name:"offset",options:{offset:[0,this.offset]}}]})),this.state="active",document.addEventListener("sp-update-overlays",()=>{this.updateOverlayPosition(),this.state="visible"}),this.updateOverlayPosition().then(()=>this.applyContentAnimation("spOverlayFadeIn"))))}updateOverlayPopperPlacement(){this.overlayContent&&(this.dataPopperPlacement?this.overlayContent.setAttribute("placement",this.dataPopperPlacement):this.originalPlacement?this.overlayContent.setAttribute("placement",this.originalPlacement):this.overlayContent.removeAttribute("placement"))}updated(e){e.has("dataPopperPlacement")&&this.updateOverlayPopperPlacement()}open(e){this.extractDetail(e)}extractDetail(e){this.overlayContent=e.content,this.overlayContentTip=e.contentTip,this.trigger=e.trigger,this.placement=e.placement,this.offset=e.offset,this.interaction=e.interaction,this.color=e.theme.color,this.scale=e.theme.scale}dispose(){this.state="idle",this.timeout&&(clearTimeout(this.timeout),delete this.timeout),this.popper&&(this.popper.destroy(),this.popper=void 0),this.returnOverlayContent()}stealOverlayContent(e){!this.placeholder&&e&&(this.placeholder||(this.placeholder=document.createComment("placeholder for "+e.nodeName)),e.parentElement&&e.parentElement.replaceChild(this.placeholder,e),this.overlayContent=e,this.originalSlot=this.overlayContent.getAttribute("slot"),this.overlayContent.setAttribute("slot","overlay"),this.appendChild(this.overlayContent),this.originalPlacement=this.overlayContent.getAttribute("placement"))}returnOverlayContent(){this.overlayContent&&(this.originalSlot?(this.overlayContent.setAttribute("slot",this.originalSlot),delete this.originalSlot):this.overlayContent.removeAttribute("slot"),this.placeholder&&this.placeholder.parentElement&&this.placeholder.parentElement.replaceChild(this.overlayContent,this.placeholder),this.originalPlacement&&(this.overlayContent.setAttribute("placement",this.originalPlacement),delete this.originalPlacement),delete this.placeholder)}updateOverlayPosition(){var e=this;return r((function*(){e.popper&&(yield e.popper.update())}))()}hide(e=!0){var t=this;return r((function*(){e&&(t.state="hiding",yield t.applyContentAnimation("spOverlayFadeOut")),t.state="idle"}))()}schedulePositionUpdate(){cancelAnimationFrame(this.positionAnimationFrame),this.positionAnimationFrame=requestAnimationFrame(()=>this.updateOverlayPosition())}onSlotChange(){this.schedulePositionUpdate()}connectedCallback(){super.connectedCallback(),this.schedulePositionUpdate()}applyContentAnimation(e){return new Promise((t,o)=>{if(this.shadowRoot){var r=this.shadowRoot.querySelector("#contents"),n=o=>{e===o.animationName&&(r.removeEventListener("animationend",n),r.removeEventListener("animationcancel",n),this.animating=!1,t("animationcancel"===o.type))};r.addEventListener("animationend",n),r.addEventListener("animationcancel",n),r.style.animationName=e,this.animating=!0}else o()})}renderTheme(e){importShim("./index-e0e40925.js");var t=this.color,o=this.scale;return n` <sp-theme .color="${t}" .scale="${o}"> ${e} </sp-theme> `}render(){var e=n` <div id="contents"> <slot @slotchange="${this.onSlotChange}" name="overlay"></slot> </div> `;return this.hasTheme?this.renderTheme(e):e}static create(e){var t=new Ce;return e.content&&t.open(e),t}}p([t()],Ce.prototype,"_state",void 0),p([t({reflect:!0,type:Boolean})],Ce.prototype,"animating",void 0),p([t({reflect:!0})],Ce.prototype,"placement",void 0),p([t({attribute:!1})],Ce.prototype,"color",void 0),p([t({attribute:!1})],Ce.prototype,"scale",void 0),p([t({attribute:"data-popper-placement"})],Ce.prototype,"dataPopperPlacement",void 0);var Ee=1e3,ke=1e3;class Te{constructor(e={}){this.warmUpDelay=Ee,this.coolDownDelay=ke,this.isWarm=!1,this.cooldownTimeout=0,this.timeout=0,Object.assign(this,e)}openTimer(e){var t=this;return r((function*(){if(t.cancelCooldownTimer(),t.component&&e.isSameNode(t.component)){if(t.promise)return t.promise;throw new Error("Inconsistent state")}return t.component&&(t.close(t.component),t.cancelCooldownTimer()),t.component=e,!t.isWarm&&(t.promise=new Promise(e=>{t.resolve=e,t.timeout=window.setTimeout(()=>{t.resolve&&(t.resolve(!1),t.isWarm=!0)},t.warmUpDelay)}),t.promise)}))()}close(e){this.component&&this.component.isSameNode(e)&&(this.resetCooldownTimer(),this.timeout>0&&(clearTimeout(this.timeout),this.timeout=0),this.resolve&&(this.resolve(!0),delete this.resolve),delete this.promise,delete this.component)}resetCooldownTimer(){this.isWarm&&(this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),this.cooldownTimeout=window.setTimeout(()=>{this.isWarm=!1,delete this.cooldownTimeout},this.coolDownDelay))}cancelCooldownTimer(){this.cooldownTimeout&&window.clearTimeout(this.cooldownTimeout),delete this.cooldownTimeout}}class Pe{constructor(e,t,o){this.isOpen=!1,this.owner=e,this.overlayElement=o,this.interaction=t}static open(e,t,o,r){var n=new Pe(e,t,o);return n.open(r),()=>n.close()}static update(){var e=new CustomEvent("sp-update-overlays",{bubbles:!0,composed:!0,cancelable:!0});document.dispatchEvent(e)}open({delayed:e,offset:t=0,placement:o="top"}){var n=this;return r((function*(){if(n.isOpen)return!0;void 0===e&&(e=n.overlayElement.hasAttribute("delayed"));var r={color:void 0,scale:void 0},i=new CustomEvent("sp-query-theme",{bubbles:!0,composed:!0,detail:r,cancelable:!0});n.owner.dispatchEvent(i);var a={},s=new CustomEvent("sp-overlay-query",{bubbles:!0,composed:!0,detail:a,cancelable:!0});return n.overlayElement.dispatchEvent(s),Pe.overlayStack.openOverlay(Object.assign({content:n.overlayElement,contentTip:a.overlayContentTipElement,delayed:e,offset:t,placement:o,trigger:n.owner,interaction:n.interaction,theme:r},a)),n.isOpen=!0,!0}))()}close(){Pe.overlayStack.closeOverlay(this.overlayElement)}}Pe.overlayStack=new class{constructor(){var e=this;this.overlays=[],this.preventMouseRootClose=!1,this.root=document.body,this.handlingResize=!1,this.overlayTimer=new Te,this.handleMouseCapture=e=>{var t=this.topOverlay;if(e.target&&t&&t.overlayContent&&!function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)&&function(e){return 0===e.button}(e)){if(e.target instanceof Node){if(e.composedPath().indexOf(t.overlayContent)>=0)return void(this.preventMouseRootClose=!0);this.preventMouseRootClose=!1}}else this.preventMouseRootClose=!0},this.handleMouse=()=>{this.preventMouseRootClose||this.closeTopOverlay()},this.handleKeyUp=e=>{"Escape"===e.key&&this.closeTopOverlay()},this.handleResize=()=>{this.handlingResize||(this.handlingResize=!0,requestAnimationFrame(r((function*(){var t=e.overlays.map(e=>e.updateOverlayPosition());yield Promise.all(t),e.handlingResize=!1}))))},this.addEventListeners()}get document(){return this.root.ownerDocument||document}get topOverlay(){return this.overlays.slice(-1)[0]}findOverlayForContent(e){for(var t of this.overlays)if(e.isSameNode(t.overlayContent))return t}addEventListeners(){this.document.addEventListener("click",this.handleMouseCapture,!0),this.document.addEventListener("click",this.handleMouse),this.document.addEventListener("keyup",this.handleKeyUp),window.addEventListener("resize",this.handleResize)}isOverlayActive(e){return!!this.overlays.find(t=>e.isSameNode(t.overlayContent))}isClickOverlayActiveForTrigger(e){return this.overlays.some(t=>e.isSameNode(t.trigger)&&"click"===t.interaction)}openOverlay(e){var t=this;return r((function*(){if(t.isOverlayActive(e.content))return!1;if(e.delayed){var o=t.overlayTimer.openTimer(e.content);if(yield o)return o}return new Promise(o=>{requestAnimationFrame(()=>{if("click"===e.interaction)t.closeAllHoverOverlays();else if("hover"===e.interaction&&t.isClickOverlayActiveForTrigger(e.trigger))return void o(!0);var r=Ce.create(e);t.overlays.push(r),document.body.appendChild(r),o(!1)})})}))()}closeOverlay(e){this.overlayTimer.close(e),requestAnimationFrame(()=>{var t=this.findOverlayForContent(e);this.hideAndCloseOverlay(t)})}closeAllHoverOverlays(){for(var e of this.overlays)"hover"===e.interaction&&this.hideAndCloseOverlay(e,!1)}hideAndCloseOverlay(e,t=!0){var o=this;return r((function*(){if(e){yield e.hide(t),e.remove(),e.dispose();var r=o.overlays.indexOf(e);r>=0&&o.overlays.splice(r,1)}}))()}closeTopOverlay(){return this.hideAndCloseOverlay(this.topOverlay)}};class Se extends o{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1}static get styles(){return[c]}render(){return n` <div id="trigger" @click="${this.onTriggerClick}" @mouseenter="${this.onTriggerMouseEnter}" @mouseleave="${this.onTriggerMouseLeave}"> <slot @slotchange="${this.onTargetSlotChange}" name="trigger"></slot> </div> <div id="overlay-content"> <slot @slotchange="${this.onClickSlotChange}" name="click-content"></slot> <slot @slotchange="${this.onHoverSlotChange}" name="hover-content"></slot> </div> `}onTriggerClick(){this.targetContent&&this.clickContent&&(this.closeClickOverlay=Pe.open(this.targetContent,"click",this.clickContent,{offset:this.offset,placement:this.placement}))}onTriggerMouseEnter(){this.targetContent&&this.hoverContent&&(this.closeHoverOverlay=Pe.open(this.targetContent,"hover",this.hoverContent,{offset:this.offset,placement:this.placement}))}onTriggerMouseLeave(){this.closeHoverOverlay&&(this.closeHoverOverlay(),delete this.closeHoverOverlay)}onClickSlotChange(e){var t=this.extractSlotContentFromEvent(e);this.clickContent=t}onHoverSlotChange(e){var t=this.extractSlotContentFromEvent(e);this.hoverContent=t}onTargetSlotChange(e){var t=this.extractSlotContentFromEvent(e);this.targetContent=t}extractSlotContentFromEvent(e){if(e.target)return e.target.assignedNodes().find(e=>e instanceof HTMLElement)}disconnectedCallback(){this.closeClickOverlay&&(this.closeClickOverlay(),delete this.closeClickOverlay),this.closeHoverOverlay&&(this.closeHoverOverlay(),delete this.closeHoverOverlay),super.disconnectedCallback()}}p([t({reflect:!0})],Se.prototype,"placement",void 0),p([t({type:Number,reflect:!0})],Se.prototype,"offset",void 0),p([t({type:Boolean,reflect:!0})],Se.prototype,"disabled",void 0),customElements.get("overlay-trigger")||customElements.define("overlay-trigger",Se),customElements.get("active-overlay")||customElements.define("active-overlay",Ce);var Me=7;customElements.define("overlay-target-icon",class extends o{static get styles(){return e`:host{position:absolute;display:block;color:var(--spectrum-global-color-magenta-700);width:64px;height:64px}`}render(){return n` <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bullseye" class="svg-inline--fa fa-bullseye fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"> <path fill="currentColor" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"></path> </svg> `}});class je extends o{constructor(){super(...arguments),this.top=100,this.left=100}static get styles(){return e`:host{display:block;width:100%;height:100%;position:relative}::slotted(*){display:block;width:100%;height:100%}`}onSlotChange(e){if(e.target){var t=e.target;this.targetElement=void 0;var o=t.assignedNodes().find(e=>e instanceof HTMLElement);o&&(this.targetElement=o.querySelector('[slot="trigger"]'),this.targetElement&&(this.targetElement.addEventListener("mousedown",e=>this.onMouseDown(e)),this.resetTargetPosition()))}}onMouseDown(e){var t=e.target,o=t.parentElement;if(o){var r={x:o.offsetWidth-t.offsetWidth,y:o.offsetHeight-t.offsetHeight},n=e.clientX,i=e.clientY,a=this.left,s=this.top,l=e=>{var t=e.clientX-n,o=e.clientY-i,l={x:t+a,y:o+s};this.left=Math.min(Math.max(l.x,0),r.x),this.top=Math.min(Math.max(l.y,0),r.y),Pe.update()},p=()=>{document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",p)};document.addEventListener("mousemove",l),document.addEventListener("mouseup",p)}}resetTargetPosition(){if(this.targetElement){var e=this.targetElement,t=e.parentElement;t&&(this.left=(t.offsetWidth-e.offsetWidth)/2,this.top=(t.offsetHeight-e.offsetHeight)/2)}}updated(){this.targetElement&&(this.targetElement.style.transform=`translate(${this.left}px, ${this.top}px)`)}render(){return n` <slot @slotchange="${this.onSlotChange}"></slot> `}}p([t({type:Number})],je.prototype,"top",void 0),p([t({type:Number})],je.prototype,"left",void 0),customElements.define("overlay-drag",je);class Ae extends o{constructor(){super(),this.depth=0,this.placement="right",this.depth=0}static get styles(){return[e`:host{display:block;text-align:center}sp-button{margin-top:11px}`]}onRadioChange(e){var t=e.target;this.placement=t.value}render(){return n` <sp-radio-group selected="${this.placement}" name="group-example"> <sp-radio @change="${this.onRadioChange}" value="top"> Top </sp-radio> <sp-radio @change="${this.onRadioChange}" value="right"> Right </sp-radio> <sp-radio @change="${this.onRadioChange}" value="bottom"> Bottom </sp-radio> <sp-radio @change="${this.onRadioChange}" value="left"> Left </sp-radio> </sp-radio-group> <overlay-trigger placement="${this.placement}"> <sp-button slot="trigger" variant="cta">Open Popover</sp-button> <sp-popover dialog slot="click-content" direction="${this.placement}" tip open> ${this.depth<Me?n` <recursive-popover position="${this.placement}" depth="${this.depth+1}"></recursive-popover> `:n` <div>Maximum Depth</div> `} </sp-popover> </overlay-trigger> `}}p([t({type:String})],Ae.prototype,"placement",void 0),p([t({type:Number})],Ae.prototype,"depth",void 0),customElements.define("recursive-popover",Ae);var De=i`
    <style>
        html,
        body,
        #root,
        #root-inner,
        #root-theme {
            height: 100%;
            margin: 0;
        }

        #root-theme {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: blue;
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`,Le=()=>{var e=a("Placement",["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end","auto","auto-start","auto-end","none"],"bottom"),t=s("Offset",0);return i`
        ${De}
        <overlay-trigger
            id="trigger"
            placement="${e}"
            offset="${t}"
        >
            <sp-button variant="primary" slot="trigger">
                Show Popover
            </sp-button>
            <sp-popover
                dialog
                slot="click-content"
                placement="${e}"
                tip
                open
            >
                <div class="options-popover-content">
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger id="inner-trigger" placement="bottom">
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover
                            dialog
                            slot="click-content"
                            placement="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                Another Popover
                            </div>
                        </sp-popover>

                        <sp-tooltip
                            slot="hover-content"
                            delayed
                            open
                            tip="bottom"
                        >
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </div>
            </sp-popover>
            <sp-tooltip open slot="hover-content" delayed tip="bottom">
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `},qe=()=>{var e={Light:"light",Dark:"dark"},t=l("Color stop",e,e.Light);return i`
        ${De}
        <sp-theme color=${"light"===t?"dark":"light"}>
            <sp-theme color=${t}>
                <recursive-popover
                    style="
                        background-color: var(--spectrum-global-color-gray-100);
                        color: var(--spectrum-global-color-gray-800);
                        padding: var(--spectrum-global-dimension-size-225);
                    "
                ></recursive-popover>
            </sp-theme>
        </sp-theme>
    `},Ne=()=>i`
        <style>
            .demo {
                position: absolute;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .bottom-right {
                bottom: 0;
                right: 0;
            }
            .bottom-left {
                bottom: 0;
                left: 0;
            }
        </style>
        <overlay-trigger class="demo top-left" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `,Re=()=>i`
        ${De}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger class="demo top-left" placement="bottom">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed open tip="bottom">
                    Click to open popover
                </sp-tooltip>
                <sp-popover
                    dialog
                    slot="click-content"
                    position="bottom"
                    tip
                    open
                >
                    <div class="options-popover-content">
                        <sp-slider
                            value="5"
                            step="0.5"
                            min="0"
                            max="20"
                            label="Awesomeness"
                        ></sp-slider>
                        <div id="styled-div">
                            The background of this div should be blue
                        </div>
                        <overlay-trigger id="inner-trigger" placement="bottom">
                            <sp-button slot="trigger">Press Me</sp-button>
                            <sp-popover
                                dialog
                                slot="click-content"
                                placement="bottom"
                                tip
                                open
                            >
                                <div class="options-popover-content">
                                    Another Popover
                                </div>
                            </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                open
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </div>
                </sp-popover>
            </overlay-trigger>
        </overlay-drag>
    `,$e=()=>i`
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed open tip="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus egestas sed enim sed condimentum. Nunc facilisis
                    scelerisque massa sed luctus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Suspendisse sagittis sodales purus vitae ultricies. Integer
                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus
                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.
                    Sed feugiat semper libero, sit amet vehicula orci fermentum
                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt
                    malesuada ante, faucibus viverra nunc blandit a. Fusce et
                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a
                    ultricies dui. In hac habitasse platea dictumst. Curabitur
                    gravida lobortis vestibulum.
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `,Fe=["Default","deepNesting","edges","updated","sideHoverDraggable"];export default{title:"Overlay"};export{Le as Default,Fe as __namedExportsOrder,qe as deepNesting,Ne as edges,$e as sideHoverDraggable,Re as updated};
//# sourceMappingURL=overlay.stories-c051e1b5.js.map
