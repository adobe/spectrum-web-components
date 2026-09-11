"use strict";import{useEffect as d}from"@storybook/preview-api";import{html as i}from"@spectrum-web-components/base";import"./sp-story-decorator.js";export const themeStyles=i`
  <style>
    #root {
      padding: 0;
    }
    sp-story-decorator::part(controls) {
      position: absolute;
    }
  </style>
`,swcThemeDecorator=(a,c)=>{const{globals:{system:e,color:n,scale:r,textDirection:o,reduceMotion:s,lang:t}={}}=c;return d(()=>{e&&(window.__swc_hack_knobs__.defaultSystemVariant=e),n&&(window.__swc_hack_knobs__.defaultColor=n),r&&(window.__swc_hack_knobs__.defaultScale=r),o&&(window.__swc_hack_knobs__.defaultDirection=o,document.documentElement.dir!==o&&(document.documentElement.dir=o,requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize"))}))),s!==void 0&&(window.__swc_hack_knobs__.defaultReduceMotion=s),t&&(window.__swc_hack_knobs__.defaultLocale=t,document.documentElement.lang=t)},[e,n,r,o,s,t]),i`
    <style>
      #root {
          padding: 0;
      }
      sp-story-decorator::part(controls) {
          position: absolute;
      }
      ${e||n||r||o||s||t?`sp-story-decorator::part(controls) {
                display: none;
            }
        `:""}
    </style>
    <sp-story-decorator
      role="main"
      system=${e}
      color=${n}
      scale=${r}
      lang=${t}
      .direction=${o}
      ?reduce-motion=${s}
    >
      ${a({},c)}
    </sp-story-decorator>
  `};
//# sourceMappingURL=decorator.js.map
