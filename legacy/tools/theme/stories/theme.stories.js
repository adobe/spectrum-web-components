"use strict";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/switch/sp-switch.js";
import "@spectrum-web-components/slider/sp-slider.js";
import { html } from "@spectrum-web-components/base";
export default {
  component: "sp-theme",
  title: "Theme",
  argTypes: {
    colorStop: {
      control: {
        type: "inline-radio",
        options: ["light", "dark"]
      }
    }
  },
  args: {
    colorStop: "light"
  }
};
const storyStyles = html`
    <style type="text/css">
        #outer,
        #example {
            width: 500px;
            padding: 3em;
            background-color: var(--spectrum-gray-100);
            color: var(--spectrum-gray-800);
        }

        #inner {
            margin-top: 2em;
            padding: 2em;
            background-color: var(--spectrum-gray-100);
            color: var(--spectrum-gray-800);
        }

        #buttons {
            margin-top: 2em;
        }
    </style>
`;
export const Default = ({
  colorStop: color
}) => {
  return html`
        ${storyStyles}
        <sp-theme
            color="${color}"
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div id="example">
                <div>
                    <sp-slider
                        value="5"
                        step="1"
                        min="1"
                        max="11"
                        label="Volume"
                        id="volume-slider"
                    ></sp-slider>
                </div>
                <div><sp-switch>Overdrive</sp-switch></div>
                <sp-button-group id="buttons">
                    <sp-button variant="primary" treatment="outline">
                        Cancel
                    </sp-button>
                    <sp-button variant="accent">Continue</sp-button>
                </sp-button-group>
            </div>
        </sp-theme>
    `;
};
export const displayFlex = () => html`
    <style type="text/css">
        #flex-theme {
            display: flex;
            flex-direction: row;
        }
        #flex-theme sp-button {
            flex: 0 0;
        }
        #flex-theme #middle-button {
            flex: 1 0;
        }
    </style>
    <sp-theme
        id="flex-theme"
        color="dark"
        theme=${window.__swc_hack_knobs__.defaultSystemVariant}
        system=${window.__swc_hack_knobs__.defaultSystemVariant}
    >
        <sp-button>Start</sp-button>
        <sp-button id="middle-button">Middle</sp-button>
        <sp-button>End</sp-button>
    </sp-theme>
`;
export const none = () => html`
    ${storyStyles}
    <div id="example">
        <div>
            <sp-slider
                value="5"
                step="1"
                min="1"
                max="11"
                label="Volume"
                id="volume-slider"
            ></sp-slider>
        </div>
        <div><sp-switch>Overdrive</sp-switch></div>
        <sp-button-group id="buttons">
            <sp-button variant="primary" treatment="outline">Cancel</sp-button>
            <sp-button variant="accent">Continue</sp-button>
        </sp-button-group>
    </div>
    <sp-theme></sp-theme>
`;
export const nestedTheme = ({
  colorStop: outer
}) => {
  const inner = outer === "light" ? "dark" : "light";
  return html`
        ${storyStyles}
        <sp-theme
            color="${outer}"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div id="outer">
                <div>
                    <sp-slider
                        value="5"
                        step="1"
                        min="1"
                        max="11"
                        label="Volume"
                        id="volume-slider"
                    ></sp-slider>
                </div>
                <div><sp-switch>Overdrive</sp-switch></div>
                <sp-button-group id="buttons">
                    <sp-button variant="primary" treatment="outline">
                        Cancel
                    </sp-button>
                    <sp-button variant="accent">Continue</sp-button>
                </sp-button-group>
                <sp-theme
                    color="${inner}"
                    dir="ltr"
                    theme=${window.__swc_hack_knobs__.defaultSystemVariant}
                    system=${window.__swc_hack_knobs__.defaultSystemVariant}
                >
                    <div id="inner">
                        <div>
                            <sp-slider
                                value="5"
                                step="1"
                                min="1"
                                max="11"
                                label="Volume"
                                id="volume-slider-inner"
                            ></sp-slider>
                        </div>
                        <div><sp-switch>Overdrive</sp-switch></div>
                        <sp-button-group id="buttons-inner">
                            <sp-button variant="primary" treatment="outline">
                                Cancel
                            </sp-button>
                            <sp-button variant="accent">Continue</sp-button>
                        </sp-button-group>
                    </div>
                </sp-theme>
            </div>
        </sp-theme>
    `;
};
export const reverseColorNestedTheme = ({
  colorStop: outer
}) => {
  const inner = outer === "light" ? "dark" : "light";
  return html`
        <style type="text/css">
            #outer {
                width: 500px;
                padding: 3em;
                background-color: var(--spectrum-gray-100);
                color: var(--spectrum-gray-800);
            }

            #inner {
                margin-top: 2em;
                padding: 2em;
                background-color: var(--spectrum-gray-100);
                color: var(--spectrum-gray-800);
            }

            #buttons {
                margin-top: 2em;
            }
        </style>
        <sp-theme
            color="${inner}"
            theme=${window.__swc_hack_knobs__.defaultSystemVariant}
            system=${window.__swc_hack_knobs__.defaultSystemVariant}
        >
            <div id="outer">
                <div>
                    <sp-slider
                        value="5"
                        step="1"
                        min="1"
                        max="11"
                        label="Volume"
                        id="volume-slider"
                    ></sp-slider>
                </div>
                <div><sp-switch>Overdrive</sp-switch></div>
                <sp-button-group id="buttons">
                    <sp-button variant="primary" treatment="outline">
                        Cancel
                    </sp-button>
                    <sp-button variant="accent">Continue</sp-button>
                </sp-button-group>
                <sp-theme
                    color="${outer}"
                    dir="rtl"
                    theme=${window.__swc_hack_knobs__.defaultSystemVariant}
                    system=${window.__swc_hack_knobs__.defaultSystemVariant}
                >
                    <div id="inner">
                        <div>
                            <sp-slider
                                value="5"
                                step="1"
                                min="1"
                                max="11"
                                label="Volume"
                                id="volume-slider-inner"
                            ></sp-slider>
                        </div>
                        <div><sp-switch>Overdrive</sp-switch></div>
                        <sp-button-group id="buttons-inner">
                            <sp-button variant="primary" treatment="outline">
                                Cancel
                            </sp-button>
                            <sp-button variant="accent">Continue</sp-button>
                        </sp-button-group>
                    </div>
                </sp-theme>
            </div>
        </sp-theme>
    `;
};
//# sourceMappingURL=theme.stories.js.map
