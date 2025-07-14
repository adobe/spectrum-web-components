"use strict";import{html as i}from"@spectrum-web-components/base";import{useEffect as _}from"@storybook/preview-api";import"./sp-story-decorator.js";export const themeStyles=i`
    <style>
        #root {
            padding: 0;
        }
        sp-story-decorator::part(controls) {
            position: absolute;
        }
    </style>
`,swcThemeDecorator=(a,c)=>{const{globals:{system:t,color:e,scale:n,textDirection:o,reduceMotion:r,lang:s}={}}=c;return _(()=>{t&&(window.__swc_hack_knobs__.defaultSystemVariant=t),e&&(window.__swc_hack_knobs__.defaultColor=e),n&&(window.__swc_hack_knobs__.defaultScale=n),o&&(window.__swc_hack_knobs__.defaultDirection=o,document.documentElement.dir!==o&&(document.documentElement.dir=o)),r!==void 0&&(window.__swc_hack_knobs__.defaultReduceMotion=r),s&&(window.__swc_hack_knobs__.defaultLocale=s)},[t,e,n,o,r,s]),i`
        <style>
            #root {
                padding: 0;
            }
            sp-story-decorator::part(controls) {
                position: absolute;
            }
            ${t||e||n||o||r?`sp-story-decorator::part(controls) {
                display: none;
            }
        `:""}
        </style>
        <sp-story-decorator
            role="main"
            system=${t}
            color=${e}
            scale=${n}
            lang=${s}
            .direction=${o}
            ?reduce-motion=${r}
        >
            ${a({},c)}
        </sp-story-decorator>
    `};
//# sourceMappingURL=decorator.js.map
