import './sp-icon-alert-8xHFckqN.js';
import { i } from './lit-element-xBOPiTek.js';
import { S as SizedMixin } from './sizedMixin-6sBuja8e.js';
import { S as SpectrumElement, n as n$1, d as defineElement } from './define-element-UHExAFdK.js';
import { x, A } from './lit-html-GmIhAbMP.js';

const e=i`
:host{--spectrum-helptext-line-height:var(--spectrum-line-height-100);--spectrum-helptext-content-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-helptext-icon-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-helptext-disabled-content-color:var(
--spectrum-disabled-content-color
)}:host([variant=neutral]){--spectrum-helptext-content-color-default:var(
--spectrum-neutral-subdued-content-color-default
);--spectrum-helptext-icon-color-default:var(
--spectrum-neutral-subdued-content-color-default
)}:host([variant=negative]){--spectrum-helptext-content-color-default:var(
--spectrum-negative-color-900
);--spectrum-helptext-icon-color-default:var(--spectrum-negative-color-900)}:host([disabled]){--spectrum-helptext-content-color-default:var(
--spectrum-helptext-disabled-content-color
);--spectrum-helptext-icon-color-default:var(
--spectrum-helptext-disabled-content-color
)}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){--spectrum-helptext-line-height-cjk:var(--spectrum-cjk-line-height-100)}:host([size=s]){--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-75);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-small
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
)}:host{--spectrum-helptext-min-height:var(--spectrum-component-height-75);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-100);--spectrum-helptext-font-size:var(--spectrum-font-size-75);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-75);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-medium
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-75);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
)}:host([size=l]){--spectrum-helptext-min-height:var(--spectrum-component-height-100);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-200);--spectrum-helptext-font-size:var(--spectrum-font-size-100);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-100);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-large
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-100);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
)}:host([size=xl]){--spectrum-helptext-min-height:var(--spectrum-component-height-200);--spectrum-helptext-icon-size:var(--spectrum-workflow-icon-size-300);--spectrum-helptext-font-size:var(--spectrum-font-size-200);--spectrum-helptext-text-to-visual:var(--spectrum-text-to-visual-200);--spectrum-helptext-top-to-workflow-icon:var(
--spectrum-help-text-top-to-workflow-icon-extra-large
);--spectrum-helptext-bottom-to-workflow-icon:var(
--spectrum-helptext-top-to-workflow-icon
);--spectrum-helptext-top-to-text:var(--spectrum-component-top-to-text-200);--spectrum-helptext-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
)}@media (forced-colors:active){:host{--highcontrast-helptext-content-color-default:CanvasText;--highcontrast-helptext-icon-color-default:CanvasText;forced-color-adjust:none}.icon,.text{forced-color-adjust:none}}:host{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
);display:flex;font-size:var(
--mod-helptext-font-size,var(--spectrum-helptext-font-size)
);min-block-size:var(
--mod-helptext-min-height,var(--spectrum-helptext-min-height)
)}.icon{block-size:var(
--mod-helptext-icon-size,var(--spectrum-helptext-icon-size)
);flex-shrink:0;inline-size:var(
--mod-helptext-icon-size,var(--spectrum-helptext-icon-size)
);margin-inline-end:var(
--mod-helptext-text-to-visual,var(--spectrum-helptext-text-to-visual)
);padding-block-end:var(
--mod-helptext-bottom-to-workflow-icon,var(--spectrum-helptext-bottom-to-workflow-icon)
);padding-block-start:var(
--mod-helptext-top-to-workflow-icon,var(--spectrum-helptext-top-to-workflow-icon)
)}.text{line-height:var(
--mod-helptext-line-height,var(--spectrum-helptext-line-height)
);padding-block-end:var(
--mod-helptext-bottom-to-text,var(--spectrum-helptext-bottom-to-text)
);padding-block-start:var(
--mod-helptext-top-to-text,var(--spectrum-helptext-top-to-text)
)}:host(:lang(ja)) .text,:host(:lang(ko)) .text,:host(:lang(zh)) .text{line-height:var(
--mod-helptext-line-height-cjk,var(--spectrum-helptext-line-height-cjk)
)}:host([variant=neutral]) .text{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
)}:host([variant=neutral]) .icon{color:var(
--highcontrast-helptext-icon-color-default,var(
--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)
)
)}:host([variant=negative]) .text{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
)}:host([variant=negative]) .icon{color:var(
--highcontrast-helptext-icon-color-default,var(
--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)
)
)}:host([disabled]) .text{color:var(
--highcontrast-helptext-content-color-default,var(
--mod-helptext-content-color-default,var(--spectrum-helptext-content-color-default)
)
)}:host([disabled]) .icon{color:var(
--highcontrast-helptext-icon-color-default,var(
--mod-helptext-icon-color-default,var(--spectrum-helptext-icon-color-default)
)
)}
`;var f = e;

var c=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var n=(i,t,l,r)=>{for(var e=r>1?void 0:r?u(t,l):t,a=i.length-1,s;a>=0;a--)(s=i[a])&&(e=(r?s(t,l,e):s(e))||e);return r&&e&&c(t,l,e),e};class HelpText extends SizedMixin(SpectrumElement,{noDefaultSize:!0}){constructor(){super(...arguments);this.icon=!1;this.variant="neutral";}static get styles(){return [f]}render(){return x`
            ${this.variant==="negative"&&this.icon?x`
                      <sp-icon-alert class="icon"></sp-icon-alert>
                  `:A}
            <div class="text"><slot></slot></div>
        `}}n([n$1({type:Boolean,reflect:!0})],HelpText.prototype,"icon",2),n([n$1({reflect:!0})],HelpText.prototype,"variant",2);

defineElement("sp-help-text",HelpText);