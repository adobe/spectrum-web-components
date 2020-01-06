import"./lit-html-6898710b.js";import{e as t,i as a,j as i}from"./index-2626287a.js";import"./lit-element-81619d09.js";import"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./index-8f46dbd8.js";import"./focusable-ee5c66f3.js";import"./iconset-svg-cf078571.js";import"./index-047233f1.js";import"./observe-slot-text-5194cee4.js";function r(a){return a.variant?t`
            <sp-button
                variant="${a.variant}"
                ?quiet="${!!a.quiet}"
                ?disabled=${!!a.disabled}
                ?icon-right=${a.iconRight}
                @click=${i(`Click ${a.variant}`)}
            >
                ${a.content||"Click Me"}
            </sp-button>
        `:t`
            <sp-button
                ?quiet="${!!a.quiet}"
                ?disabled=${!!a.disabled}
                @click=${i(`Click ${a.variant}`)}
            >
                ${a.content||"Click Me"}
            </sp-button>
        `}function e(a){var i=Object.assign({},a,{disabled:!0});return t`
        ${r(a)} ${r(i)}
    `}var n=()=>e({}),o=()=>e({variant:"cta"});o.story={name:"variant: cta"};var s=()=>e({variant:"primary"});s.story={name:"variant: primary"};var v=()=>e({variant:"secondary"});v.story={name:"variant: secondary"};var c=()=>e({variant:"negative"});c.story={name:"variant: negative"};var d=()=>t`
        <div
            style='background-color: rgb(15, 121, 125); color: rgb(15, 121, 125); padding: 15px 20px; display: "inline-block"'
        >
            ${e({variant:"overBackground"})}
        </div>
    `;d.story={name:"variant: overBackground"};var u=()=>e({variant:"primary",quiet:!0});u.story={name:"attribute: quiet, variant: primary"};var p=()=>e({variant:"secondary",quiet:!0});p.story={name:"attribute: quiet, variant: secondary"};var l=()=>e({variant:"negative",quiet:!0});l.story={name:"attribute: quiet, variant: negative"};var b=()=>t`
        <div
            style='background-color: rgb(15, 121, 125); color: rgb(15, 121, 125); padding: 15px 20px; display: "inline-block"'
        >
            ${e({variant:"overBackground",quiet:!0})}
        </div>
    `;b.story={name:"attribute: quiet, variant: overBackground"};var m=()=>{var i=a("Icon on Right",!1);return t`
        <sp-icons-medium></sp-icons-medium>
        <style>
            .row {
                padding: 10px;
            }
        </style>
        <div class="row">
            ${e({variant:"primary",iconRight:i,content:t`
                    <sp-icon
                        slot="icon"
                        size="s"
                        name="ui:HelpMedium"
                    ></sp-icon>
                    Help
                `})}
        </div>
        <div class="row">
            ${e({variant:"primary",iconRight:i,content:t`
                    <svg
                        slot="icon"
                        viewBox="0 0 36 36"
                        focusable="false"
                        aria-hidden="true"
                        role="img"
                    >
                        <path
                            d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
                        ></path>
                    </svg>
                    Custom SVG
                `})}
        </div>
        <div class="row">
            <sp-button variant="secondary" icon-right>
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    focusable="false"
                    aria-hidden="true"
                    role="img"
                >
                    <path
                        d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
                    ></path>
                </svg>
                Custom SVG
            </sp-button>
            <sp-button variant="secondary">
                <svg
                    slot="icon"
                    viewBox="0 0 36 36"
                    focusable="false"
                    aria-hidden="true"
                    role="img"
                >
                    <path
                        d="M16 36a4.407 4.407 0 0 0 4-4h-8a4.407 4.407 0 0 0 4 4zm9.143-24.615c0-3.437-3.206-4.891-7.143-5.268V3a1.079 1.079 0 0 0-1.143-1h-1.714A1.079 1.079 0 0 0 14 3v3.117c-3.937.377-7.143 1.831-7.143 5.268C6.857 26.8 2 26.111 2 28.154V30h28v-1.846C30 26 25.143 26.8 25.143 11.385z"
                    ></path>
                </svg>
                Custom SVG
            </sp-button>
        </div>
    `},h=()=>t`
        <div>
            <style>
                sp-button {
                    min-width: 300px;
                }
            </style>
            ${e({variant:"cta"})}
        </div>
    `;h.story={name:"min-width button"};var g=()=>t`
        <sp-button href="https://github.com/adobe/spectrum-web-components">
            Github
        </sp-button>
    `;g.story={name:"button with href"};var y=()=>t`
        <sp-button
            href="https://github.com/adobe/spectrum-web-components"
            target="_blank"
        >
            Github
        </sp-button>
    `;y.story={name:'button with href target="_blank"'};export default{component:"sp-button",title:"Button"};export{n as Default,l as attributeQuietVariantNegative,b as attributeQuietVariantOverbackground,u as attributeQuietVariantPrimary,p as attributeQuietVariantSecondary,g as buttonWithHref,y as buttonWithHrefTargetBlank,h as minWidthButton,o as variantCta,c as variantNegative,d as variantOverbackground,s as variantPrimary,v as variantSecondary,m as withIcon};
//# sourceMappingURL=button.stories-29fa54c0.js.map
