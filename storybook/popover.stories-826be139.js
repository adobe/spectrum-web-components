import"./lit-html-6898710b.js";import{h as o,e,i as t,l as i}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./index-9d9ec6e0.js";var p=()=>{var t=o("Text content","The quick brown fox jumps over the lazy dog");return e`
        <div style="color: var(--spectrum-global-color-gray-800)">
            <sp-popover variant="default" open style="max-width: 320px">
                <div style="font-size: 14px; padding: 10px">
                    ${t}
                </div>
            </sp-popover>
        </div>
    `},l=()=>{var o=t("Has Tip",!0),p={top:"top",bottom:"bottom",left:"left",right:"right"},l=i("Direction",p,p.bottom);return e`
        <div
            style="color: var(--spectrum-global-color-gray-800); position: relative"
        >
            <sp-popover
                variant="dialog"
                direction=${l}
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
    `};export default{component:"sp-popover",title:"Popover"};export{p as Default,l as Dialog};
//# sourceMappingURL=popover.stories-826be139.js.map
