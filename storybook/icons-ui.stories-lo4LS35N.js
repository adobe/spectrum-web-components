import './sp-icon-ei_CiDUC.js';
import './icons-demo-KtKSEIR5.js';
import { m } from './until-Dcj5TJ3M.js';
import { x } from './lit-html-GmIhAbMP.js';
import './IconBase-EFa3DHxz.js';
import './lit-element-xBOPiTek.js';
import './define-element-tO8-r1bu.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-search-7OeFwX-T.js';
import './sp-clear-button-jBIhRkzG.js';
import './spectrum-icon-cross.css-jF12fKiX.js';
import './ButtonBase--K-lWDuL.js';
import './like-anchor-A-VxslPW.js';
import './focusable-GZ06kf6F.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-RiUvi5fT.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './custom-tag-z2Xx81l9.js';
import './sizedMixin-JAQz02f5.js';
import './sp-icon-magnify-dOVYszCN.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-tevcOEW2.js';
import './manage-help-text-f9KNpcsn.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './spectrum-icon-checkmark.css-vEh5gvyq.js';
import './sp-icon-alert-HIZE6wdL.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-W6so4P5i.js';
import './sp-field-label-LR663cei.js';
import './ElementResolution-TTOqkMM7.js';
import './body-L3waIILQ.js';
import './spectrum-lang.css-2lWqTBNP.js';
import './sp-help-text-qV58Z5c6.js';
import './custom-element-4W0aDW2j.js';
import './async-directive-cHMFxS7f.js';

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
      await import('./icon-manifest-HxQP_pCR.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-HxQP_pCR.js').then(
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
  const content = import('./index-IN5pbl7G.js').then((icons) => {
    const iconTemplates = [];
    for (const icon in icons) {
      if (icon === "setCustomTemplateLiteralTag")
        continue;
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
