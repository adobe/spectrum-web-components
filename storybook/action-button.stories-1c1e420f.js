import"./lit-element-45614e86.js";import{j as t,w as o}from"./storybook-preview-54ad6afb.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-b94f78ef.js";import"./index-16394ca3.js";import"./focusable-b12aa67a.js";import"./observe-slot-text-5194cee4.js";function i(i){return t`
        <sp-action-button
            .quiet="${!!i.quiet}"
            .disabled=${!!i.disabled}
            .selected=${!!i.selected}
            @click=${o("Action")}
        >
            Action
        </sp-action-button>
    `}var e=()=>(function(o){var e=Object.assign({},o,{disabled:!0}),a=Object.assign({},o,{selected:!0});return t`
        <div>
            ${i(o)} ${i(a)}
            ${i(e)}
        </div>
    `})({quiet:!1,disabled:!1,selected:!1}),a=()=>t`
        <sp-action-button>
            <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
            This is an action button
        </sp-action-button>
    `;a.story={name:"w/ Icon button"};var n=()=>t`
        <sp-action-button>
            <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
        </sp-action-button>
    `,s=["Default","wIconButton","iconOnlyButton"];export default{component:"sp-action-button",title:"ActionButton"};export{e as Default,s as __namedExportsOrder,n as iconOnlyButton,a as wIconButton};
//# sourceMappingURL=action-button.stories-1c1e420f.js.map
