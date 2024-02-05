import { i } from './lit-element-xBOPiTek.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-2O4ZhTAw.js';
import { x } from './lit-html-GmIhAbMP.js';

const r=i`
@keyframes pulse{0%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-0-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-0-scale,1))}50%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-50-opacity,1
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-50-scale,1.5))}to{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-100-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-100-scale,2))}}@keyframes pulse--quiet{0%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-0-opacity,0
);-webkit-transform:scale(var(
--spectrum-coachmark-quiet-animation-indicator-keyframe-0-scale,.8
))}50%{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-50-opacity,1
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-50-scale,1.5))}to{opacity:var(
--spectrum-coachmark-animation-indicator-keyframe-100-opacity,0
);-webkit-transform:scale(var(--spectrum-coachmark-animation-indicator-keyframe-100-scale,2))}}:host{margin:var(
--spectrum-coachmark-indicator-gap,var(--spectrum-global-dimension-size-75)
);position:relative}.ring{border-radius:50%;border-style:solid;border-width:var(
--spectrum-coachmark-indicator-ring-border-size,var(--spectrum-global-dimension-static-size-25)
);display:block;position:absolute}.ring:nth-child(2){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-center-delay-multiple,
-.66
))}.ring:nth-child(3){animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-outer-delay-multiple,
-1
))}:host{min-height:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*3);min-width:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*3)}:host([dir=ltr]) .ring{left:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75)}:host([dir=rtl]) .ring{right:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75)}.ring{animation:pulse var(--spectrum-coachmark-animation-indicator-ring-duration,3s) linear infinite;height:var(
--spectrum-coachmark-indicator-ring-diameter,var(--spectrum-global-dimension-size-200)
);top:calc(var(
--spectrum-coachmark-indicator-ring-diameter,
var(--spectrum-global-dimension-size-200)
)*.75);width:var(
--spectrum-coachmark-indicator-ring-diameter,var(--spectrum-global-dimension-size-200)
)}.ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-animation-indicator-ring-inner-delay-multiple,
-.5
))}:host([quiet]){min-height:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*2.75);min-width:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*2.75)}:host([dir=ltr][quiet]) .ring{left:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75)}:host([dir=rtl][quiet]) .ring{right:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75)}:host([quiet]) .ring{animation:pulse--quiet var(--spectrum-coachmark-animation-indicator-ring-duration,3s) linear infinite;height:var(
--spectrum-coachmark-quiet-indicator-ring-diameter,var(--spectrum-global-dimension-size-100)
);top:calc(var(
--spectrum-coachmark-quiet-indicator-ring-diameter,
var(--spectrum-global-dimension-size-100)
)*.75);width:var(
--spectrum-coachmark-quiet-indicator-ring-diameter,var(--spectrum-global-dimension-size-100)
)}:host([quiet]) .ring:first-child{animation-delay:calc(var(--spectrum-coachmark-animation-indicator-ring-duration, 3s)*var(
--spectrum-coachmark-quiet-animation-indicator-ring-inner-delay-multiple,
-.33
))}.ring{border-color:var(
--spectrum-coachmark-indicator-ring-default-color,var(--spectrum-alias-focus-color)
)}:host([variant=light]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-low-contrast-color,var(--spectrum-global-color-gray-50)
)}:host([variant=dark]) .ring{border-color:var(
--spectrum-coachmark-indicator-ring-high-contrast-color,var(--spectrum-global-color-gray-900)
)}:host{display:inline-block}
`;var n = r;

var d=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var u=(l,r,i,t)=>{for(var e=t>1?void 0:t?o(r,i):r,s=l.length-1,p;s>=0;s--)(p=l[s])&&(e=(t?p(r,i,e):p(e))||e);return t&&e&&d(r,i,e),e};class Coachmark extends SpectrumElement{constructor(){super(...arguments);this.quiet=!1;this.variant="";}static get styles(){return [n]}render(){return x`
            <div class="ring"></div>
            <div class="ring"></div>
            <div class="ring"></div>
        `}}u([n$1({type:Boolean,reflect:!0})],Coachmark.prototype,"quiet",2),u([n$1({reflect:!0})],Coachmark.prototype,"variant",2);

defineElement("sp-coachmark",Coachmark);

var coachmark_stories = {
  title: "Coachmark",
  component: "sp-coachmark"
};
const Default = () => {
  return x`
        <sp-coachmark></sp-coachmark>
        <sp-coachmark variant="dark"></sp-coachmark>
        <sp-coachmark variant="light"></sp-coachmark>
    `;
};
const quiet = () => {
  return x`
        <sp-coachmark quiet></sp-coachmark>
        <sp-coachmark quiet variant="dark"></sp-coachmark>
        <sp-coachmark quiet variant="light"></sp-coachmark>
    `;
};
const __namedExportsOrder = ['Default', 'quiet'];

export { Default, __namedExportsOrder, coachmark_stories as default, quiet };
