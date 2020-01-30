import"./lit-element-089a5717.js";import{v as o,k as e,w as t,y as a}from"./storybook-preview-9aba481c.js";import"./tslib.es6-d9c764b6.js";import"./index-da10f6c3.js";var p=()=>{var t=o("Text content","The quick brown fox jumps over the lazy dog");return e`
        <div style="color: var(--spectrum-global-color-gray-800)">
            <sp-popover variant="default" open style="max-width: 320px">
                <div style="font-size: 14px; padding: 10px">
                    ${t}
                </div>
            </sp-popover>
        </div>
    `},i=()=>{var o=t("Has Tip",!0),p={top:"top",bottom:"bottom",left:"left",right:"right"},i=a("Placement",p,p.bottom);return e`
        <div
            style="color: var(--spectrum-global-color-gray-800); position: relative"
        >
            <sp-popover
                variant="dialog"
                placement=${i}
                open
                style=" max-width: 320px"
                .tip="${o}"
            >
                <div
                    style="padding-bottom: 30px; font-size: 18px; font-weight: 700"
                >
                    Popover Title
                </div>
                <div style="font-size: 14px">
                    Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                    caramels. Icing soufflé chupa chups donut cheesecake.
                    Jelly-o chocolate cake sweet roll cake danish candy biscuit
                    halvah
                </div>
            </sp-popover>
        </div>
    `},l=["Default","Dialog"];export default{component:"sp-popover",title:"Popover"};export{p as Default,i as Dialog,l as __namedExportsOrder};
//# sourceMappingURL=popover.stories-f49eb9af.js.map
