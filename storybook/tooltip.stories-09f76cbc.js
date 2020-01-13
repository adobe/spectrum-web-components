import"./lit-element-45614e86.js";import{j as t,v as e,x as o,u as i}from"./storybook-preview-54ad6afb.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-b94f78ef.js";import"./iconset-svg-5d368e15.js";import"./index-2268ac09.js";var p=["top","bottom","left","right"],n=["","info","positive","negative"],l=["AlertSmall","CheckmarkSmall","InfoSmall"],s=()=>t`
        <sp-tooltip
            ?open=${e("Open",!0,"Element")}
            tip=${o("Tip direction",p,p[0],"Element")}
            variant=${o("Variant",n,n[0],"Element")}
        >
            ${i("Tip text","Tooltip","Element")}
        </sp-tooltip>
    `,m=()=>t`
        <sp-icons-medium></sp-icons-medium>
        <sp-tooltip
            ?open=${e("Open",!0,"Element")}
            tip=${o("Tip direction",p,p[0],"Element")}
            variant=${o("Variant",n,n[0],"Element")}
        >
            <sp-icon
                size="s"
                name="ui:${o("Icon",l,l[0],"Element")}"
                slot="icon"
            ></sp-icon>
            ${i("Tip text","Tooltip","Element")}
        </sp-tooltip>
    `;m.story={name:"w/ Icon"};var a=["Default","wIcon"];export default{component:"sp-tooltip",title:"Tooltip"};export{s as Default,a as __namedExportsOrder,m as wIcon};
//# sourceMappingURL=tooltip.stories-09f76cbc.js.map
