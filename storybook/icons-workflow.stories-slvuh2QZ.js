import './sp-icon-h9aid892.js';
import './icons-demo-p6BuLrNf.js';
import { x } from './lit-html-GmIhAbMP.js';
import { m } from './until-Dcj5TJ3M.js';
import './IconBase-TDmbHQaH.js';
import './lit-element-xBOPiTek.js';
import './define-element-2O4ZhTAw.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-search-nk4z4dsI.js';
import './sp-clear-button-Ztp7NYGp.js';
import './spectrum-icon-cross.css-qXBF5GML.js';
import './ButtonBase-H8ie1_xx.js';
import './like-anchor-J4T73PxR.js';
import './focusable-WZR9a5Bc.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-ybW1xuBS.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-aJM_vOZ4.js';
import './sizedMixin-mnNfh2gr.js';
import './custom-tag-z2Xx81l9.js';
import './sp-icon-magnify-3v1Chz30.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-rAX4ihoL.js';
import './manage-help-text-kfeeNmRL.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './spectrum-icon-checkmark.css-3xBPG61g.js';
import './sp-icon-alert-Bolxr-zN.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-fuvayDA0.js';
import './sp-field-label--CBS1ijW.js';
import './ElementResolution-TTOqkMM7.js';
import './body-6aEtDKhV.js';
import './spectrum-lang.css-3hMTHKBE.js';
import './sp-help-text-l3IJIhWn.js';
import './custom-element-4W0aDW2j.js';
import './async-directive-cHMFxS7f.js';

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
      await import('./icon-manifest-YmUVPFZY.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-YmUVPFZY.js').then(
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
  const content = import('./index-_XmtACnk.js').then((icons) => {
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

export { Icons, __namedExportsOrder, iconsWorkflow_stories as default, elements };
