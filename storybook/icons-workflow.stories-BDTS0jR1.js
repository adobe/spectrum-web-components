import './sp-icon-BTK-ls8P.js';
import './icons-demo-XBFSaO1a.js';
import { x } from './lit-html-COgVUehj.js';
import { m } from './until-9Rn6bNib.js';
import './IconBase-B4NmWdYY.js';
import './lit-element-BulMEkr1.js';
import './define-element-BgsU7oi-.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-Boj3ltMH.js';
import './sp-clear-button-BKqP97a8.js';
import './spectrum-icon-cross.css-DdK5rkHs.js';
import './ButtonBase-CGWMAWIx.js';
import './like-anchor-BF2mSMlR.js';
import './focusable-BVZVIowx.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-vBV0Xc1Q.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-CHWWI7zp.js';
import './sp-icon-magnify-DBYopHCv.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-DHp3zspX.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BXqe6sWG.js';
import './sp-icon-alert-DGTYhaNN.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-ClgQn688.js';
import './sp-field-label-CRRlpuuh.js';
import './ElementResolution-B9KteuX8.js';
import './body-gNxcWIKV.js';
import './spectrum-lang.css-DOD3bmds.js';
import './sp-help-text-CaKSu0ym.js';
import './custom-element-Drg7uMpU.js';
import './async-directive-DF6rMZJ5.js';

var iconsWorkflow_stories = {
  title: "Icons/Workflow",
  argTypes: {
    color: { control: "color" },
    size: {
      control: {
        type: "inline-radio",
        options: ["s", "m", "l", "xl"]
      }
    }
  },
  args: {
    color: "#000000",
    size: "m"
  },
  swc_vrt: {
    preload: async () => {
      await import('./icon-manifest-DYjP2jAj.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-DYjP2jAj.js').then(
    (iconManifest) => x`
            <icons-demo
                style="color: ${color}"
                size=${size}
                .icons=${iconManifest.iconManifest}
            ></icons-demo>
        `
  );
  return x`
        <style>
            .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            sp-icon {
                margin-bottom: 10px;
            }
        </style>
        <delayed-ready>
            ${m(
    content,
    x`
                    Loading...
                `
  )}
        </delayed-ready>
    `;
};
const Icons = ({ color, size }) => {
  const content = import('./index-Bd2XrIu_.js').then((icons) => {
    const iconTemplates = [];
    for (const icon in icons) {
      if (icon === "setCustomTemplateLiteralTag") continue;
      iconTemplates.push({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        template: icons[icon],
        name: icon
      });
    }
    return x`
            <icons-demo style="color: ${color}">
                ${iconTemplates.map(
      (icon) => x`
                        <bdo class="icon" dir="ltr">
                            <sp-icon size=${size}>${icon.template()}</sp-icon>
                            ${icon.name}
                        </bdo>
                    `
    )}
            </icons-demo>
        `;
  });
  return x`
        <style>
            .icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            sp-icon {
                margin-bottom: 10px;
            }
        </style>
        <delayed-ready>
            ${m(
    content,
    x`
                    Loading...
                `
  )}
        </delayed-ready>
    `;
};
const __namedExportsOrder = ['elements', 'Icons'];

export { Icons, __namedExportsOrder, iconsWorkflow_stories as default, elements };
