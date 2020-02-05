import{_ as e}from"./lit-element-089a5717.js";import{d as o,e as s,f as r,g as t,h as i,j as n,k as a,l as c}from"./storybook-preview-9aba481c.js";import"./index-e0e40925.js";var l={url:new URL("./.storybook/preview.js",document.baseURI).href};function p(){return(p=e((function*(){var e=yield(yield fetch(new URL("../custom-elements.json",l.url))).json();o(e),s(r),s(t),s(i);var p={Lightest:"lightest",Light:"light",Dark:"dark"},m=p.Light,d={Medium:"medium",Large:"large"},h=d.Medium;s(e=>{var o=n("Color",p,m,"Theme");m=o;var s=n("Scale",d,h,"Theme");return h=s,a`
            <sp-theme id="root-theme" color=${o} scale=${s}>
                ${e()}
            </sp-theme>
        `}),c({a11y:{config:{},options:{checks:{"color-contrast":{options:{noScroll:!0}}},restoreScroll:!0}},docs:{iframeHeight:"200px"}})}))).apply(this,arguments)}window.process=window.process||{},window.process.env=window.process.env||{},window.process.env.NODE_ENV=window.process.env.NODE_ENV||"production",function(){p.apply(this,arguments)}();
//# sourceMappingURL=preview-f538910d.js.map
