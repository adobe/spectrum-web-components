import './sp-icon--BEZXaNs.js';
import './icons-demo-rqYR-r12.js';
import { m } from './until-Dcj5TJ3M.js';
import { x } from './lit-html-GmIhAbMP.js';
import './IconBase-Tav-FzmR.js';
import './lit-element-xBOPiTek.js';
import './define-element-UHExAFdK.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-search-wul8nt8z.js';
import './sp-clear-button-YWlPNV7s.js';
import './spectrum-icon-cross.css-1cFDaPoP.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './sizedMixin-6sBuja8e.js';
import './custom-tag-z2Xx81l9.js';
import './sp-icon-magnify-k9rbvZPR.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-xQbGP5yq.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './sp-icon-alert-8xHFckqN.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-FLXW5LJZ.js';
import './sp-field-label-50w0r-Gn.js';
import './ElementResolution-TTOqkMM7.js';
import './body-6aEtDKhV.js';
import './spectrum-lang.css-3hMTHKBE.js';
import './sp-help-text-MQgthQoN.js';
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
      await import('./icon-manifest-QOy39kwu.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-QOy39kwu.js').then(
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
  const content = import('./index-guf26ASq.js').then((icons) => {
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
