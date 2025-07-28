"use strict";
import "@spectrum-web-components/icons/sp-icons-large.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import "../../iconset/stories/icons-demo.js";
import { html } from "@spectrum-web-components/base";
export default {
  title: "Icons",
  argTypes: {
    color: { control: "color" }
  },
  args: {
    color: "#000000"
  }
};
export const listMedium = ({ color }) => html`
    <icons-demo style="color: ${color}">
        <sp-icons-medium></sp-icons-medium>
    </icons-demo>
`;
listMedium.storyName = "UI Icons - Medium";
export const listLarge = ({ color }) => html`
    <icons-demo style="color: ${color}">
        <sp-icons-large></sp-icons-large>
    </icons-demo>
`;
listLarge.storyName = "UI Icons - Large";
//# sourceMappingURL=icons.stories.js.map
