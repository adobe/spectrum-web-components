import{_ as e}from"./lit-element-089a5717.js";import{d as o,e as r,f as t,g as s,h as a,j as i,k as l,l as n}from"./storybook-preview-9aba481c.js";import"./index-e412a2b3.js";var m={url:new URL("./.storybook/preview.js",document.baseURI).href};function c(){return(c=e((function*(){var e=yield(yield fetch(new URL("../custom-elements.json",m.url))).json();o(e),r(t),r(s),r(a);var c={Lightest:"lightest",Light:"light",Dark:"dark"},h=c.Light,p={Medium:"medium",Large:"large"},u=p.Medium;r(e=>{var o=i("Color",c,h,"Theme");h=o;var r=i("Scale",p,u,"Theme");return u=r,l`
            <sp-theme id="root-theme" color=${o} scale=${r}>
                ${e()}
            </sp-theme>
        `}),n({a11y:{config:{},options:{checks:{"color-contrast":{options:{noScroll:!0}}},restoreScroll:!0}},docs:{iframeHeight:"200px"}})}))).apply(this,arguments)}!function(){c.apply(this,arguments)}();
//# sourceMappingURL=preview-fc154c88.js.map
