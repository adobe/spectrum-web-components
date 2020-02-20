import"./lit-element-089a5717.js";import{k as e,x as t}from"./storybook-preview-9aba481c.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-f9b5fa5b.js";import"./index-33bfe3e9.js";import"./index-16f3b7d2.js";import"./spectrum-icon-alert-small.css-52aaded2.js";import"./focusable-f84f80fc.js";import"./iconset-svg-7745673b.js";import"./index-71d657ab.js";import"./observe-slot-text-5194cee4.js";import"./index-41afc42f.js";import"./index-da10f6c3.js";import"./index-3b69cd23.js";import"./index-784f6851.js";var n=()=>e`
        <sp-dropdown
            @change="${e=>{var n=e.target;t(`Change: ${n.value}`)()}}"
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu>
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
    `,s=()=>e`
        <style>
            fieldset {
                float: left;
                clear: left;
                display: inline-block;
                margin-bottom: 15px;
            }
        </style>
        <fieldset>
            <sp-dropdown
                label="Open dropdown"
                open
                @change="${e=>{var n=e.target;t(`Change: ${n.value}`)()}}"
            >
                <span slot="label">
                    Select a Country with a very long label, too long in fact
                </span>
                <sp-menu>
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
        </fieldset>
        <fieldset>
            <sp-dropdown
                label="Dropdown that displays below the options"
                @change="${e=>{var n=e.target;t(`Change: ${n.value}`)()}}"
            >
                <span slot="label">
                    Other menu that goes behind the open one
                </span>
                <sp-menu>
                    <sp-menu-item>
                        Not so many options...
                    </sp-menu-item>
                </sp-menu>
            </sp-dropdown>
        </fieldset>
    `,m=()=>e`
        <sp-dropdown
            @change="${e=>{var n=e.target;t(`Change: ${n.value}`)()}}"
            value="item-2"
        >
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
            <sp-menu>
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
    `,i=["Default","Open","initialValue"];export default{component:"sp-dropdown",title:"Dropdown"};export{n as Default,s as Open,i as __namedExportsOrder,m as initialValue};
//# sourceMappingURL=dropdown.stories-b7623482.js.map
