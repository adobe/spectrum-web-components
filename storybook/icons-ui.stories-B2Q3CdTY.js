import './sp-icon-B0oE-qZ2.js';
import './icons-demo-T1zEzxTB.js';
import { m } from './until-9Rn6bNib.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-L76-n75s.js';
import './lit-element-BL-po2DW.js';
import './define-element-9Zj84-C8.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-BcP9H3Kz.js';
import './sp-clear-button-Bv8codpA.js';
import './spectrum-icon-cross.css-DAq7WwgI.js';
import './ButtonBase-adwZ7HOt.js';
import './like-anchor-c-omWQV-.js';
import './focusable-CfMGZF2L.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Dr0dVrDu.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-H6qLwJc0.js';
import './sp-icon-magnify-yczs9bmB.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-Ckg-egQR.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-B4Pvgr0C.js';
import './sp-icon-alert-GYTZvYm3.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-DdC_O7Nr.js';
import './sp-field-label-C3QRVf2K.js';
import './ElementResolution-B9KteuX8.js';
import './body-DaM1E36c.js';
import './spectrum-lang.css-J6J1vfcw.js';
import './sp-help-text-Vhvq_3v8.js';
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
      await import('./icon-manifest-uynMnRyB.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-uynMnRyB.js').then(
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
  const content = import('./index-BYWzAMGP.js').then((icons) => {
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
