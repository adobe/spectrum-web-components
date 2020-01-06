import"./lit-html-6898710b.js";import{e,j as c}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./focusable-ee5c66f3.js";import"./iconset-svg-cf078571.js";import"./index-047233f1.js";import"./checkbox-base-304c25ad.js";import"./index-ae948762.js";import"./spectrum-icon-checkmark-small.css-de150c91.js";var o=()=>e`
        <sp-checkbox @click="${c("Click")}" @change="${c("Change")}">
            Checkbox
        </sp-checkbox>
    `,b=()=>e`
        <sp-checkbox checked>Checkbox</sp-checkbox>
    `,s=()=>e`
        <sp-checkbox indeterminate>Checkbox</sp-checkbox>
    `,x=()=>e`
        <sp-checkbox quiet>Checkbox</sp-checkbox>
    `,h=()=>e`
        <sp-checkbox quiet checked>Checkbox</sp-checkbox>
    `;h.story={name:"Quiet checked"};var k=()=>e`
        <sp-checkbox quiet indeterminate>Checkbox</sp-checkbox>
    `;k.story={name:"Quiet indeterminate"};var i=()=>e`
        <sp-checkbox autofocus>Checkbox</sp-checkbox>
    `,t=()=>e`
        <sp-checkbox invalid>Checkbox</sp-checkbox>
    `,a=()=>e`
        <sp-checkbox invalid checked>Checkbox</sp-checkbox>
    `;a.story={name:"Invalid checked"};var p=()=>e`
        <sp-checkbox invalid indeterminate>Checkbox</sp-checkbox>
    `;p.story={name:"Invalid indeterminate"};var d=()=>e`
        <sp-checkbox disabled>Checkbox</sp-checkbox>
    `,n=()=>e`
        <sp-checkbox disabled checked>Checkbox</sp-checkbox>
    `;n.story={name:"Disabled checked"};var r=()=>e`
        <sp-checkbox disabled indeterminate>Checkbox</sp-checkbox>
    `;r.story={name:"Disabled indeterminate"};var m=()=>e`
        <sp-checkbox tabindex="0">Checkbox 0</sp-checkbox>
        <sp-checkbox disabled tabindex="3">Checkbox 3</sp-checkbox>
        <sp-checkbox tabindex="4">Checkbox 4</sp-checkbox>
        <sp-checkbox tabindex="2" autofocus>Checkbox 2</sp-checkbox>
        <sp-checkbox tabindex="1">Checkbox 1</sp-checkbox>
    `;m.story={name:"Tab index example"};export default{component:"sp-checkbox",title:"Checkbox"};export{i as Autofocus,b as Checked,o as Default,d as Disabled,s as Indeterminate,t as Invalid,x as Quiet,n as disabledChecked,r as disabledIndeterminate,a as invalidChecked,p as invalidIndeterminate,h as quietChecked,k as quietIndeterminate,m as tabIndexExample};
//# sourceMappingURL=checkbox.stories-c5a757f0.js.map
