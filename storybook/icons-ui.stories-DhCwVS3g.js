import './sp-icon-C0O1UE6w.js';
import './icons-demo-DpmvmekY.js';
import { m } from './until-9Rn6bNib.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-Z2IxLljH.js';
import './lit-element-BulMEkr1.js';
import './state-DMEtq-nM.js';
import './define-element-CbLZvyrL.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-CJxzXRl5.js';
import './sp-clear-button-IhvgnZPX.js';
import './icon-cross-overrides.css-DDISLFbH.js';
import './ButtonBase-ixFv8y71.js';
import './like-anchor-DD7X4GZI.js';
import './focusable-8mrYv4ai.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-nvMXakjD.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-HBGPeo6s.js';
import './sp-icon-search-BzY8cEQ_.js';
import './custom-tag-Diwq7nXX.js';
import './Magnify-C5ml_uGy.js';
import './Textfield-DSh0H6VQ.js';
import './manage-help-text-CQxj8H8g.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './icon-checkmark-overrides.css-DFANn-jw.js';
import './sp-icon-alert-hlBBLxyR.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './sp-field-label-BCAcbvCy.js';
import './ElementResolution-B9KteuX8.js';
import './body-B9qMrH_g.js';
import './lang-overrides.css-C0Oe700S.js';
import './sp-help-text-DmnXooA_.js';
import './custom-element-Drg7uMpU.js';
import './async-directive-DF6rMZJ5.js';

var iconsUi_stories = {
  title: "Icons/UI",
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
      await import('./icon-manifest-7M-C3OLB.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-7M-C3OLB.js').then(
    (iconManifest) => x`
            <icons-demo
                style="color: ${color}"
                size=${size}
                .icons=${iconManifest.iconManifest}
                name="ui"
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
  const content = import('./index-B0dDCnTA.js').then((icons) => {
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

export { Icons, __namedExportsOrder, iconsUi_stories as default, elements };
