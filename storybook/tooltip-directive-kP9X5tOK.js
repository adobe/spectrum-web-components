import { t as trigger } from './overlay-trigger-directive-CJyzyLDe.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';

const tooltip=function(t,r){return trigger(()=>(import('./sp-tooltip-Dfsn9E_X.js'),x`
                <sp-tooltip variant=${o(r==null?void 0:r.variant)}>
                    ${t()}
                </sp-tooltip>
            `),{...r,triggerInteraction:"hover",overlayOptions:{type:"hint",...r==null?void 0:r.overlayOptions}})};

export { tooltip as t };
