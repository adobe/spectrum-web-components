import"./lit-html-6898710b.js";import{e,i as t,j as i,k as m}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./index-ef29cfa1.js";import"./index-7465a914.js";import"./spectrum-icon-alert-small.css-eb5bae9d.js";import"./focusable-5c74bfe6.js";import"./iconset-svg-cf078571.js";import"./index-047233f1.js";import"./observe-slot-text-5194cee4.js";import"./index-8f3c13c7.js";import"./index-9d9ec6e0.js";var s=()=>e`
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
    `};export default{component:"sp-dropdown",title:"Dropdown"};export{s as Default,n as initialValue};
//# sourceMappingURL=dropdown.stories-118a2727.js.map
