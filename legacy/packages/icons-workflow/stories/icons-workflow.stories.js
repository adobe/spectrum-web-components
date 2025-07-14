"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "../../iconset/stories/icons-demo.js";
import { html } from "@spectrum-web-components/base";
import { until } from "@spectrum-web-components/base/src/directives.js";
export default {
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
      await import("./icon-manifest.js");
    }
  }
};
export const elements = ({ color, size }) => {
  const content = import("./icon-manifest.js").then(
    (iconManifest) => html`
            <icons-demo
                style="color: ${color}"
                size=${size}
                .icons=${iconManifest.iconManifest}
                name="workflow"
            ></icons-demo>
        `
  );
  return html`
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
            ${until(
    content,
    html`
                    Loading...
                `
  )}
        </delayed-ready>
    `;
};
export const Icons = ({ color, size }) => {
  const content = import("../").then((icons) => {
    const iconTemplates = [];
    for (const icon in icons) {
      if (icon === "setCustomTemplateLiteralTag") continue;
      iconTemplates.push({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        template: icons[icon],
        name: icon
      });
    }
    return html`
            <icons-demo style="color: ${color}">
                ${iconTemplates.map(
      (icon) => html`
                        <bdo class="icon" dir="ltr">
                            <sp-icon size=${size}>${icon.template()}</sp-icon>
                            ${icon.name}
                        </bdo>
                    `
    )}
            </icons-demo>
        `;
  });
  return html`
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
            ${until(
    content,
    html`
                    Loading...
                `
  )}
        </delayed-ready>
    `;
};
//# sourceMappingURL=icons-workflow.stories.js.map
