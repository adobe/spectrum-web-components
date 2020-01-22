import"./lit-element-089a5717.js";import{k as c,x as e}from"./storybook-preview-9aba481c.js";import"./tslib.es6-d9c764b6.js";import"./focusable-f94b9d2d.js";import"./checkbox-base-8b59021f.js";import"./index-16b30ced.js";var i=()=>c`
        <sp-switch @click="${e("Click")}" @change="${e("Change")}">
            Switch
        </sp-switch>
    `,s=()=>c`
        <sp-switch
            checked
            @click="${e("Click")}"
            @change="${e("Change")}"
        >
            Switch
        </sp-switch>
    `,t=()=>c`
        <sp-switch
            quiet
            @click="${e("Click")}"
            @change="${e("Change")}"
        >
            Switch
        </sp-switch>
    `,h=()=>c`
        <sp-switch
            quiet
            checked
            @click="${e("Click")}"
            @change="${e("Change")}"
        >
            Switch
        </sp-switch>
    `;h.story={name:"Quiet checked"};var a=()=>c`
        <sp-switch
            autofocus
            @click="${e("Click")}"
            @change="${e("Change")}"
        >
            Switch
        </sp-switch>
    `,p=()=>c`
        <sp-switch disabled>Switch</sp-switch>
    `,w=()=>c`
        <sp-switch disabled checked>Switch</sp-switch>
    `;w.story={name:"Disabled checked"};var d=["Default","Checked","Quiet","quietChecked","Autofocus","Disabled","disabledChecked"];export default{component:"sp-switch",title:"Switch"};export{a as Autofocus,s as Checked,i as Default,p as Disabled,t as Quiet,d as __namedExportsOrder,w as disabledChecked,h as quietChecked};
//# sourceMappingURL=switch.stories-da48603c.js.map
