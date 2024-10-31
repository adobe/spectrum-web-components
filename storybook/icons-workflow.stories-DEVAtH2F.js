import './sp-icon-Cr3qyNV8.js';
import './icons-demo-CvC1a2Ni.js';
import { x } from './lit-html-COgVUehj.js';
import { m } from './until-9Rn6bNib.js';
import './IconBase-sFh2_uG3.js';
import './lit-element-BulMEkr1.js';
import './state-DWB0FQGh.js';
import './define-element-BacrH-dd.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-oyTyDBW1.js';
import './sp-clear-button-DHHIUdXe.js';
import './icon-cross-overrides.css-DsCXcMtK.js';
import './ButtonBase-DjpCcxMx.js';
import './like-anchor-BTdhD6VU.js';
import './focusable-Qk_nX99k.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CG33WdGp.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-D27dvb1g.js';
import './sp-icon-search-Bw8seBGu.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './Textfield-BGVDP1SC.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './icon-checkmark-overrides.css-DQNJ1kXI.js';
import './sp-icon-alert-DaBQ9iwA.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sp-field-label-CcbnA-9i.js';
import './ElementResolution-B9KteuX8.js';
import './body-B9qMrH_g.js';
import './lang-overrides.css-C0Oe700S.js';
import './sp-help-text-Cp9a106m.js';
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
      await import('./icon-manifest-B-jaQ2dM.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-B-jaQ2dM.js').then(
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
  const content = import('./index-CtQ95BrO.js').then((icons) => {
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
