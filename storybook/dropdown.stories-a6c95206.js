import"./lit-element-45614e86.js";import{j as e,v as t,w as i,x as m}from"./storybook-preview-54ad6afb.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-b94f78ef.js";import"./index-e4452e6e.js";import"./index-16394ca3.js";import"./spectrum-icon-alert-small.css-b909ec33.js";import"./focusable-b12aa67a.js";import"./iconset-svg-5d368e15.js";import"./index-d58ab459.js";import"./observe-slot-text-5194cee4.js";import"./index-6ffc8a58.js";import"./index-7dda8932.js";var s=()=>e`
        <sp-dropdown
            ?disabled=${t("Is Disabled",!1,"Component")}
            ?invalid=${t("Is Invalid",!1,"Component")}
            ?quiet=${t("Is Quiet",!1,"Component")}
            @change="${e=>{var t=e.target;i(`Change: ${t.value}`)()}}"
        >
            Select a Country with a very long label, too long in fact
            <sp-menu slot="options" role="listbox">
                <sp-menu-item>
                    Deselect
                </sp-menu-item>
                <sp-menu-item>
                    Select Inverse
                </sp-menu-item>
                <sp-menu-item>
                    Feather...
                </sp-menu-item>
                <sp-menu-item>
                    Select and Mask...
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    Save Selection
                </sp-menu-item>
                <sp-menu-item disabled>
                    Make Work Path
                </sp-menu-item>
            </sp-menu>
        </sp-dropdown>
    `,n=()=>{var s=["","item-1","item-2","item-3","item-4","item-5","item-6"];return e`
        <sp-dropdown
            ?disabled=${t("Is Disabled",!1,"Component")}
            ?invalid=${t("Is Invalid",!1,"Component")}
            ?quiet=${t("Is Quiet",!1,"Component")}
            @change="${e=>{var t=e.target;i(`Change: ${t.value}`)()}}"
            value=${m("Value",s,s[2],"Component")}
        >
            Select a Country with a very long label, too long in fact
            <sp-menu slot="options" role="listbox">
                <sp-menu-item value="item-1">
                    Deselect
                </sp-menu-item>
                <sp-menu-item value="item-2">
                    Select Inverse
                </sp-menu-item>
                <sp-menu-item value="item-3">
                    Feather...
                </sp-menu-item>
                <sp-menu-item value="item-4">
                    Select and Mask...
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item value="item-5">
                    Save Selection
                </sp-menu-item>
                <sp-menu-item disabled value="item-6">
                    Make Work Path
                </sp-menu-item>
            </sp-menu>
        </sp-dropdown>
    `},o=["Default","initialValue"];export default{component:"sp-dropdown",title:"Dropdown"};export{s as Default,o as __namedExportsOrder,n as initialValue};
//# sourceMappingURL=dropdown.stories-a6c95206.js.map
