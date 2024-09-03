import './sp-icon-DiFmj6GE.js';
import './icons-demo-DC3m4-ir.js';
import { m } from './until-9Rn6bNib.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-BoJOjJXT.js';
import './lit-element-BL-po2DW.js';
import './define-element-CuLWp0nJ.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-CLdigTyQ.js';
import './sp-clear-button-L_mfyHCN.js';
import './spectrum-icon-cross.css-BQ7-mmrJ.js';
import './ButtonBase-DrEDDNGU.js';
import './like-anchor-Cds2yNgE.js';
import './focusable-B74rwTMw.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-bZJQT55z.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-BYlU5N2O.js';
import './sp-icon-magnify-1NJgIVBV.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-C7am2oMy.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BSJio64e.js';
import './sp-icon-alert-wnSI2IJT.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-BIupEmlh.js';
import './sp-field-label-HzV2nEXR.js';
import './ElementResolution-B9KteuX8.js';
import './body-DaM1E36c.js';
import './spectrum-lang.css-J6J1vfcw.js';
import './sp-help-text-DgD4ZIm8.js';
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
      await import('./icon-manifest-DTNwzBOu.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-DTNwzBOu.js').then(
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
  const content = import('./index-CkklPcCU.js').then((icons) => {
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
