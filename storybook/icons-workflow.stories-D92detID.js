import './sp-icon-CYuqy0p0.js';
import './icons-demo-YxPbl5pU.js';
import { x } from './lit-html-COgVUehj.js';
import { m } from './until-9Rn6bNib.js';
import './IconBase-LhykbR0q.js';
import './lit-element-BL-po2DW.js';
import './define-element-CXRu6sWi.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './sp-search-B5z0po9_.js';
import './sp-clear-button-CFFjYw-P.js';
import './spectrum-icon-cross.css-BAONp4pC.js';
import './ButtonBase-B6EfsHA8.js';
import './like-anchor-BAH-foY5.js';
import './focusable-BHn_FpaM.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CBh62R5W.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './custom-tag-B5IH9PTE.js';
import './sizedMixin-BKu_31Nm.js';
import './sp-icon-magnify-BV_mQ6Zk.js';
import './custom-tag-Diwq7nXX.js';
import './Textfield-Ip91EHmq.js';
import './manage-help-text-83_bseGo.js';
import './condition-attribute-with-id-Cnyhr7Mp.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-BQx7WYUd.js';
import './sp-icon-alert-Q6xYlBo2.js';
import './directive-Bn5c4u4M.js';
import './directive-helpers-icdnqxxc.js';
import './state-dMhNMyLY.js';
import './sp-field-label-CZ0naTeT.js';
import './ElementResolution-B9KteuX8.js';
import './body-DaM1E36c.js';
import './spectrum-lang.css-J6J1vfcw.js';
import './sp-help-text-LBPqZMr_.js';
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
      await import('./icon-manifest-jwrsMbFG.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-jwrsMbFG.js').then(
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
  const content = import('./index-i1hJSbvN.js').then((icons) => {
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
