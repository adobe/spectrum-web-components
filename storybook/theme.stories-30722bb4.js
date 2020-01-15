import"./lit-element-45614e86.js";import{j as t,y as e}from"./storybook-preview-54ad6afb.js";import"./index-6a7dd94f.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-b94f78ef.js";import"./index-16394ca3.js";import"./focusable-b12aa67a.js";import"./observe-slot-text-5194cee4.js";import"./checkbox-base-6ecca498.js";import"./index-0a4961e4.js";import"./index-a18ca6b2.js";var i=t`
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
`,r=()=>{var r={Light:"light",Dark:"dark"},s=e("Color stop",r,r.Light);return t`
        ${i}
        <sp-theme color="${s}">
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
                <div id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="cta">Continue</sp-button>
                </div>
            </div>
        </sp-theme>
    `},s=()=>t`
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
    <sp-theme id="flex-theme" color="dark">
        <sp-button>Left</sp-button>
        <sp-button id="middle-button">Middle</sp-button>
        <sp-button>Right</sp-button>
    </sp-theme>
`,o=()=>t`
    ${i}
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
    </div>
    <sp-theme></sp-theme>
`,d=()=>{var r={Light:"light",Dark:"dark"},s=e("Outer color stop",r,r.Light);return t`
        ${i}
        <sp-theme color="${s}">
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
                <div id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="cta">Continue</sp-button>
                </div>
                <sp-theme color="${"light"===s?"dark":"light"}">
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
                        <div id="buttons-inner">
                            <sp-button variant="primary">Cancel</sp-button>
                            <sp-button variant="cta">Continue</sp-button>
                        </div>
                    </div>
                </sp-theme>
            </div>
        </sp-theme>
    `},l=()=>{var i={Light:"light",Dark:"dark"},r=e("Outer color stop",i,i.Light);return t`
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
        <sp-theme color="${"light"===r?"dark":"light"}">
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
                <div id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="cta">Continue</sp-button>
                </div>
                <sp-theme color="${r}">
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
                        <div id="buttons-inner">
                            <sp-button variant="primary">Cancel</sp-button>
                            <sp-button variant="cta">Continue</sp-button>
                        </div>
                    </div>
                </sp-theme>
            </div>
        </sp-theme>
    `},a=["Default","displayFlex","none","nestedTheme","reverseColorNestedTheme"];export default{component:"sp-theme",title:"Theme"};export{r as Default,a as __namedExportsOrder,s as displayFlex,d as nestedTheme,o as none,l as reverseColorNestedTheme};
//# sourceMappingURL=theme.stories-30722bb4.js.map
