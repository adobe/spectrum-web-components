import './scale-large-901751af.js';
import './sp-button-d4cd36d2.js';
import './sp-button-group-16723e6a.js';
import './sp-switch-9f5f34fb.js';
import './sp-slider-9f7749e9.js';
import { x } from './lit-html-126adc72.js';
import './lit-element-9354aa77.js';
import './ButtonBase-a71d6ce3.js';
import './like-anchor-0c856f1c.js';
import './define-element-43d4edd5.js';
import './if-defined-ae83b405.js';
import './focusable-d03021f6.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-dbd83f39.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8aaaadd.js';
import './base-511c8c11.js';
import './sizedMixin-281e4c72.js';
import './query-d0113d5a.js';
import './CheckboxBase-694e006f.js';
import './LanguageResolution-630dfe34.js';
import './import-76526f12.js';
import './sp-field-label-05f39d18.js';
import './custom-tag-c228386e.js';
import './IconBase-fb970ebf.js';
import './condition-attribute-with-id-62869347.js';
import './ElementResolution-b58a0825.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './streaming-listener-70cd7ec3.js';
import './async-directive-e6357bae.js';
import './directive-helpers-aa9210f2.js';
import './repeat-c64faecc.js';

var theme_stories = {
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
const storyStyles = x`
    <style type="text/css">
        #outer,
        #example {
            width: 500px;
            padding: 3em;
            background-color: var(--spectrum-global-color-gray-100);
            color: var(--spectrum-global-color-gray-800);
        }

        #inner {
            margin-top: 2em;
            padding: 2em;
            background-color: var(--spectrum-global-color-gray-100);
            color: var(--spectrum-global-color-gray-800);
        }

        #buttons {
            margin-top: 2em;
        }
    </style>
`;
const Default = ({
  colorStop: color
}) => {
  return x`
        ${storyStyles}
        <sp-theme
            color="${color}"
            theme=${window.__swc_hack_knobs__.defaultThemeVariant}
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
const displayFlex = () => x`
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
        theme=${window.__swc_hack_knobs__.defaultThemeVariant}
    >
        <sp-button>Start</sp-button>
        <sp-button id="middle-button">Middle</sp-button>
        <sp-button>End</sp-button>
    </sp-theme>
`;
const none = () => x`
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
const nestedTheme = ({
  colorStop: outer
}) => {
  const inner = outer === "light" ? "dark" : "light";
  return x`
        ${storyStyles}
        <sp-theme
            color="${outer}"
            theme=${window.__swc_hack_knobs__.defaultThemeVariant}
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
                    theme=${window.__swc_hack_knobs__.defaultThemeVariant}
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
const reverseColorNestedTheme = ({
  colorStop: outer
}) => {
  const inner = outer === "light" ? "dark" : "light";
  return x`
        <style type="text/css">
            #outer {
                width: 500px;
                padding: 3em;
                background-color: var(--spectrum-global-color-gray-100);
                color: var(--spectrum-global-color-gray-800);
            }

            #inner {
                margin-top: 2em;
                padding: 2em;
                background-color: var(--spectrum-global-color-gray-100);
                color: var(--spectrum-global-color-gray-800);
            }

            #buttons {
                margin-top: 2em;
            }
        </style>
        <sp-theme
            color="${inner}"
            theme=${window.__swc_hack_knobs__.defaultThemeVariant}
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
                    theme=${window.__swc_hack_knobs__.defaultThemeVariant}
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
const __namedExportsOrder = ['Default', 'displayFlex', 'none', 'nestedTheme', 'reverseColorNestedTheme'];

export { Default, __namedExportsOrder, theme_stories as default, displayFlex, nestedTheme, none, reverseColorNestedTheme };
