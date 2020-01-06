import"./lit-html-6898710b.js";import{e as t,j as i}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./index-7465a914.js";import"./focusable-5c74bfe6.js";import"./observe-slot-text-5194cee4.js";function e(e){return t`
        <sp-action-button
            .quiet="${!!e.quiet}"
            .disabled=${!!e.disabled}
            .selected=${!!e.selected}
            @click=${i("Action")}
        >
            Action
        </sp-action-button>
    `}var o=()=>(function(i){var o=Object.assign({},i,{disabled:!0}),s=Object.assign({},i,{selected:!0});return t`
        <div>
            ${e(i)} ${e(s)}
            ${e(o)}
        </div>
    `})({quiet:!1,disabled:!1,selected:!1}),s=()=>t`
        <sp-action-button>
            <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
            This is an action button
        </sp-action-button>
    `;s.story={name:"w/ Icon button"};var a=()=>t`
        <sp-action-button>
            <svg slot="icon" id="spectrum-icon-18-Edit" viewBox="0 0 36 36">
                <path
                    d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-.866-.353H26.9a1.371 1.371 0 0 0-.927.406L5.084 23.372a.99.99 0 0 0-.251.422L2.055 33.1c-.114.377.459.851.783.851a.251.251 0 0 0 .062-.007c.276-.063 7.866-2.344 9.311-2.778a.972.972 0 0 0 .414-.249l20.888-20.889a1.372 1.372 0 0 0 .4-.883 1.221 1.221 0 0 0-.346-.945zM11.4 29.316c-2.161.649-4.862 1.465-6.729 2.022l2.009-6.73z"
                ></path>
            </svg>
        </sp-action-button>
    `;export default{component:"sp-action-button",title:"ActionButton"};export{o as Default,a as iconOnlyButton,s as wIconButton};
//# sourceMappingURL=action-button.stories-680ed6ba.js.map
