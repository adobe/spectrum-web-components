import './sp-icon-38633c83.js';
import './icons-demo-948987d9.js';
import { m } from './until-04c313f5.js';
import { x } from './lit-html-126adc72.js';
import './IconBase-d00b1a4e.js';
import './lit-element-9354aa77.js';
import './define-element-e64f5ea4.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-eaccf8c1.js';
import './sp-clear-button-42b9f79d.js';
import './spectrum-icon-cross.css-5810d93c.js';
import './ButtonBase-997f7a09.js';
import './like-anchor-72ed571c.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './sizedMixin-43fe982f.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-b0889d95.js';
import './custom-tag-b5526d41.js';
import './Textfield-f4934212.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-359949f2.js';
import './sp-icon-alert-248f0d52.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-5175507d.js';
import './sp-field-label-eb7b786c.js';
import './ElementResolution-7469f128.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-e88ae1be.js';
import './custom-element-e937bb64.js';
import './async-directive-e6357bae.js';

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
      await import('./icon-manifest-774866d0.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-774866d0.js').then(
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
  const content = import('./index-a14339d8.js').then((icons) => {
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
