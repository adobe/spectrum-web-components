import './sp-icon-8061244b.js';
import './icons-demo-ae7e4f15.js';
import { m } from './until-04c313f5.js';
import { x } from './lit-html-126adc72.js';
import './IconBase-d9572ad8.js';
import './lit-element-9354aa77.js';
import './define-element-617dba69.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './sp-search-d1cc37b1.js';
import './sp-clear-button-5d866f28.js';
import './spectrum-icon-cross.css-db5add4c.js';
import './ButtonBase-5cb3a7f7.js';
import './like-anchor-86192240.js';
import './focusable-f5539e66.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-94a58958.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-db063b1b.js';
import './sizedMixin-9a9da45c.js';
import './custom-tag-c228386e.js';
import './sp-icon-magnify-4997aa6c.js';
import './custom-tag-b5526d41.js';
import './Textfield-7e6cdcd0.js';
import './manage-help-text-39f4c7ea.js';
import './condition-attribute-with-id-62869347.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './sp-icon-alert-4033bfea.js';
import './directive-2bb7789e.js';
import './directive-helpers-aa9210f2.js';
import './state-59f591cf.js';
import './sp-field-label-286ffe1f.js';
import './ElementResolution-b58a0825.js';
import './body-734819b4.js';
import './spectrum-lang.css-9eeeffe9.js';
import './sp-help-text-c83a6f75.js';
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
      await import('./icon-manifest-4fd75561.js');
    }
  }
};
const elements = ({ color, size }) => {
  const content = import('./icon-manifest-4fd75561.js').then(
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
  const content = import('./index-dd294dce.js').then((icons) => {
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
