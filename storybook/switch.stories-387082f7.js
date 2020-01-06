import"./lit-html-6898710b.js";import{e as c,j as i}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./focusable-ee5c66f3.js";import"./checkbox-base-304c25ad.js";import"./index-99c7e48a.js";var s=()=>c`
        <sp-switch @click="${i("Click")}" @change="${i("Change")}">
            Switch
        </sp-switch>
    `,t=()=>c`
        <sp-switch
            checked
            @click="${i("Click")}"
            @change="${i("Change")}"
        >
            Switch
        </sp-switch>
    `,e=()=>c`
        <sp-switch
            quiet
            @click="${i("Click")}"
            @change="${i("Change")}"
        >
            Switch
        </sp-switch>
    `,h=()=>c`
        <sp-switch
            quiet
            checked
            @click="${i("Click")}"
            @change="${i("Change")}"
        >
            Switch
        </sp-switch>
    `;h.story={name:"Quiet checked"};var a=()=>c`
        <sp-switch
            autofocus
            @click="${i("Click")}"
            @change="${i("Change")}"
        >
            Switch
        </sp-switch>
    `,p=()=>c`
        <sp-switch disabled>Switch</sp-switch>
    `,w=()=>c`
        <sp-switch disabled checked>Switch</sp-switch>
    `;w.story={name:"Disabled checked"};export default{component:"sp-switch",title:"Switch"};export{a as Autofocus,t as Checked,s as Default,p as Disabled,e as Quiet,w as disabledChecked,h as quietChecked};
//# sourceMappingURL=switch.stories-387082f7.js.map
