import './sp-icon-CThFoDUE.js';
import './icons-demo-DMjizVFx.js';
import { x } from './lit-html-COgVUehj.js';
import { m } from './until-9Rn6bNib.js';
import './IconBase-CmREmoFq.js';
import './lit-element-BulMEkr1.js';
import './state-DrGS5Kkk.js';
import './define-element-B3-QvDZd.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-CPIE3vko.js';
import './sp-clear-button-CYctPnkO.js';
import './spectrum-icon-cross.css-CaX-pCP6.js';
import './ButtonBase-DFBdS0ya.js';
import './like-anchor-YCQdykQc.js';
import './focusable-CRwO5NCP.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-BVY5OzXy.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-Bh0Au8rG.js';
import './sp-icon-search-YMpiW59j.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './Textfield-BMbLjje3.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-CQ7hyD1X.js';
import './sp-icon-alert-BbDxiD8e.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sp-field-label-Ch5xsMdL.js';
import './ElementResolution-B9KteuX8.js';
import './body-B9qMrH_g.js';
import './lang-overrides.css-C0Oe700S.js';
import './sp-help-text-iIORwHTb.js';
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
      await import('./icon-manifest-BTW6zfG6.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-BTW6zfG6.js').then(
    (iconManifest) => x`
            <icons-demo
                style="color: ${color}"
                size=${size}
                .icons=${iconManifest.iconManifest}
                name="workflow"
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
  const content = import('./index-3P08LN0T.js').then((icons) => {
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
