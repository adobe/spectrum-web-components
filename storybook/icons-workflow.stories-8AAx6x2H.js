import './sp-icon-ahQVpxKt.js';
import './icons-demo-wgmFBLK1.js';
import { x } from './lit-html-GmIhAbMP.js';
import { m } from './until-Dcj5TJ3M.js';
import './IconBase-6HeAKn4X.js';
import './lit-element-xBOPiTek.js';
import './define-element-2SKaLcgv.js';
import './if-defined-pV6JZKXB.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';
import './sp-search-DkEhaqdt.js';
import './sp-clear-button-9xyPyYU6.js';
import './spectrum-icon-cross.css-fyatyW0U.js';
import './ButtonBase-75QTpX6n.js';
import './like-anchor-aNXO7yKS.js';
import './focusable-n0Bfj6en.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-mc0YsU0d.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './custom-tag-z2Xx81l9.js';
import './sizedMixin-i8vReDsT.js';
import './sp-icon-magnify-I5n_8A3q.js';
import './custom-tag-JXLWq-Sj.js';
import './Textfield-LLFln75U.js';
import './manage-help-text-f9KNpcsn.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './random-id-M2k-wjyE.js';
import './spectrum-icon-checkmark.css-1U1WWTA-.js';
import './sp-icon-alert-vqzws53s.js';
import './directive-C1gRZbRe.js';
import './directive-helpers-WPlpPO1F.js';
import './state-q_CC9QX6.js';
import './sp-field-label-zgYSrBxX.js';
import './ElementResolution-TTOqkMM7.js';
import './body-L3waIILQ.js';
import './spectrum-lang.css-2lWqTBNP.js';
import './sp-help-text-7NegzDWq.js';
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
      await import('./icon-manifest---BR6Rtf.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest---BR6Rtf.js').then(
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
  const content = import('./index-0oTf2IEQ.js').then((icons) => {
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
