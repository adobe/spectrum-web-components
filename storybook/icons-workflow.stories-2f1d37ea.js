import './sp-icon-8061244b.js';
import './icons-demo-3463af0e.js';
import { x } from './lit-html-126adc72.js';
import { m } from './until-04c313f5.js';
import './IconBase-d9572ad8.js';
import './lit-element-9354aa77.js';
import './define-element-617dba69.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-40cc2551.js';
import './sp-clear-button-1531965a.js';
import './spectrum-icon-cross.css-8f837689.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './sizedMixin-29c62bc2.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-4997aa6c.js';
import './custom-tag-b5526d41.js';
import './Textfield-773874be.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-alert-4033bfea.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-59f591cf.js';
import './sp-field-label-b445efc6.js';
import './ElementResolution-b58a0825.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-b97b22d2.js';
import './custom-element-e937bb64.js';
import './async-directive-e6357bae.js';

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
      await import('./icon-manifest-bcb0de95.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-bcb0de95.js').then(
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
  const content = import('./index-61ce53e1.js').then((icons) => {
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
