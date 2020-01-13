import{c as t,p as e,L as o,_ as i}from"./lit-element-45614e86.js";import{o as r,j as n,y as s,z as a}from"./storybook-preview-54ad6afb.js";import"./index-6a7dd94f.js";import{_ as l}from"./tslib.es6-d9c764b6.js";import"./if-defined-b94f78ef.js";import"./index-98b98505.js";import"./focusable-03c6e0e8.js";import"./observe-slot-text-5194cee4.js";import"./index-7dda8932.js";import"./index-71082d44.js";import"./index-80f41d19.js";import"./index-2268ac09.js";var h=t`:host([disabled]) #trigger{pointer-events:none}#overlay-content{display:none}`,p={bottom:"top",left:"left",right:"left",top:"top"},d={bottom:"top",left:"right",right:"left",top:"bottom"},c={left:"top",top:"left"},v={left:"width",top:"height"},m={};function g(t){var e,o,i=0,r=0,n={top:0,left:0};return"BODY"===t.tagName?(e=window.innerWidth,o=window.innerHeight,t.ownerDocument?(n.top=t.ownerDocument.documentElement.scrollTop,n.left=t.ownerDocument.documentElement.scrollLeft):(n.top=t.scrollTop,n.left=t.scrollLeft)):(({width:e,height:o,top:i,left:r}=t.getBoundingClientRect()),n.top=t.scrollTop,n.left=t.scrollLeft),{width:e,height:o,scroll:n,top:i,left:r}}function u(t,e,o,i,r){var n=i.scroll[t],s=i[v[t]],a=e-r-n,l=e+r-n+o;return a<0?-a:l>s?Math.max(s-l,-a):0}function y(t,e,o,i,r,n,s){var a=n.scroll[t],l=n[v[t]],h=s[t]+e-i-a,p=s[t]+e+i-a+o;return h<0&&("top"===r||"left"===r)||p>l&&("bottom"===r||"right"===r)}function f(t){if(m[t])return m[t];var[e]=t.split(" "),[,o]=t.split(" "),i=p[e]||"right",r=c[i];p[o]||(o="center");var n=v[i],s=v[r];return m[t]={axis:i,crossAxis:r,crossPlacement:o,crossSize:s,placement:e,size:n},m[t]}function b(t,e,o,i,r,n){var{axis:s,crossAxis:a,crossPlacement:l,crossSize:h,size:p,placement:d}=i,c={top:0,left:0,bottom:0,right:0};if(c[a]=t[a]+n,"center"===l?c[a]+=(t[h]-o[h])/2:l!==a&&(c[a]+=t[h]-o[h]),t[h]<o[h]){var v=Math.min(c[a],t[a]);c[a]=Math.max(v,t[a]-o[h]+t[h])}return c[s]=d===s?t[s]-o[p]-r:t[s]+t[p]+r,c}function C(t,e){var o=t.getBoundingClientRect(),i=e.getBoundingClientRect();return{bottom:o.bottom-i.bottom,height:o.height,left:o.left-i.left,right:o.right-i.right,top:o.top-i.top,width:o.width,x:o.x,y:o.y}}function O(t,e,o,i,r,n,s,a,l){var h="BODY"===i.tagName,p=h?o.getBoundingClientRect():C(o,i);h||(p.top+=parseInt(o.style.marginTop,10)||0,p.left+=parseInt(o.style.marginLeft,10)||0);var c,v,{top:m,right:O,bottom:k,left:x,width:w,height:E,x:T,y:A}=e.getBoundingClientRect(),$={top:m,right:O,bottom:k,left:x,width:w,height:E,x:T,y:A},S=(c=e,v=window.getComputedStyle(c),{bottom:parseInt(v.marginBottom,10)||0,left:parseInt(v.marginLeft,10)||0,right:parseInt(v.marginRight,10)||0,top:parseInt(v.marginTop,10)||0});$.width+=S.left+S.right,$.height+=S.top+S.bottom;g(i);var L=i;return function(t,e,o,i,r,n,s,a,l,h,p){var c=f(t),{axis:v,size:m,crossAxis:g,crossSize:C,placement:O,crossPlacement:k}=c,x=b(o,0,i,c,h,p),w=h;if(s&&y(v,x[v],i[m],n,O,a,l)){var E=f(`${d[O]} ${k}`),T=E.axis,A=E.size,$=b(o,0,i,E,-1*h,p);y(T,$[T],i[A],n,d[O],a,l)||(c=E,x=$,w=-1*h)}var S=u(g,x[g],i[C],a,n);x[g]+=S;var L=Math.max(0,a.height+a.top+a.scroll.top-l.top-x.top-r.top-r.bottom-n);i.height=Math.min(i.height,L),S=S=u(g,(x=b(o,0,i,c,w,p))[g],i[C],a,n),x[g]+=S;var R={top:0,bottom:0,left:0,right:0};return R[g]=o[C]>i[C]?null:o[g]-x[g]+o[C]/2,{arrowOffsetLeft:R.left||0,arrowOffsetTop:R.top||0,maxHeight:L,placement:c.placement,positionLeft:x.left||0,positionTop:x.top||0}}(t,0,p,$,S,r,n,g(L),"BODY"===L.tagName?i.getBoundingClientRect():C(i,L),a,l)}var k=t`@keyframes spOverlayFadeIn{0%{opacity:0;transform:var(--animation-transform)}to{opacity:1;transform:translate(0)}}@keyframes spOverlayFadeOut{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:var(--animation-transform)}}:host{z-index:2;position:absolute;display:none;opacity:0;top:-999em;left:-999em;animation-duration:var(--spectrum-global-animation-duration-100);animation-timing-function:ease-in-out}:host([state]){display:block}:host([state=visible]){opacity:1;transform:translate(0)!important;visibility:visible;animation-name:spOverlayFadeIn}:host([state=hiding]){animation-name:spOverlayFadeOut}:host([placement=top]){--animation-transform:translateY(6px)}:host([placement=right]){--animation-transform:translate(-6px)}:host([placement=bottom]){--animation-transform:translateY(-6px)}:host([placement=left]){--animation-transform:translate(6px)}`;class x{constructor(){this.promise=new Promise(t=>this.resolveFn=t)}resolve(t){this.resolveFn&&this.resolveFn(t)}}var w,E={containerPadding:10,crossOffset:0,flip:!0,offset:0,placement:"left"},T="spOverlayFadeOut",A={initial:"idle",states:{idle:{on:{active:"active"}},active:{on:{visible:"visible",hiding:"hiding",idle:"idle"}},visible:{on:{hiding:"hiding",idle:"idle"}},hiding:{on:{idle:"idle"}}}},$=(t,e)=>t?e&&A.states[t].on[e]||t:A.initial;class S extends o{constructor(){super(...arguments),this._state=$(),this.placement="bottom",this.offset=6,this.interaction="hover",this.positionAnimationFrame=0,this.onAnimationEnd=t=>{this.hiddenDeferred&&t.animationName===T&&this.hiddenDeferred.resolve()}}get state(){return this._state}set state(t){var e=$(this.state,t);e!==this.state&&(this._state=e,"idle"===this.state?this.removeAttribute("state"):this.setAttribute("state",this.state))}get hasTheme(){return!!this.color||!!this.size}static get styles(){return[k]}open(t){this.extractEventDetail(t),this.stealOverlayContent(t.detail.content),this.overlayContent&&(this.state="active",this.timeout=window.setTimeout(()=>{this.state="visible",delete this.timeout},t.detail.delay),this.hiddenDeferred=new x,this.addEventListener("animationend",this.onAnimationEnd),this.hiddenDeferred.promise.then(()=>{this.removeEventListener("animationend",this.onAnimationEnd)}))}extractEventDetail(t){this.overlayContent=t.detail.content,this.trigger=t.detail.trigger,this.placement=t.detail.placement,this.offset=t.detail.offset,this.interaction=t.detail.interaction,this.color=t.detail.theme.color,this.size=t.detail.theme.size}dispose(){this.state="idle",this.timeout&&(clearTimeout(this.timeout),delete this.timeout),this.returnOverlayContent()}stealOverlayContent(t){!this.placeholder&&t&&(this.placeholder||(this.placeholder=document.createComment("placeholder for "+t.nodeName)),t.parentElement&&t.parentElement.replaceChild(this.placeholder,t),this.overlayContent=t,this.overlayContent.setAttribute("slot","overlay"),this.appendChild(this.overlayContent))}returnOverlayContent(){this.overlayContent&&(this.overlayContent.removeAttribute("slot"),this.placeholder&&this.placeholder.parentElement&&this.placeholder.parentElement.replaceChild(this.overlayContent,this.placeholder),delete this.placeholder)}get hasSlotenOverlayContent(){return!(!this.overlayContent||this.overlayContent.parentElement!==this)}updateOverlayPosition(){if(this.trigger&&this.overlayContent&&this.hasSlotenOverlayContent&&this.root&&this.isConnected){var t={containerPadding:0,crossOffset:0,flip:!1,offset:this.offset,placement:this.placement},e=Object.assign(Object.assign({},E),t);this.position=O(e.placement,this.overlayContent,this.trigger,this.root,e.containerPadding,e.flip,this.root,e.offset,e.crossOffset),this.style.setProperty("left",`${this.position.positionLeft}px`),this.style.setProperty("top",`${this.position.positionTop}px`)}}hide(){var t=this;return i((function*(){if(t.state="hiding",t.hiddenDeferred)return t.hiddenDeferred.promise}))()}schedulePositionUpdate(){cancelAnimationFrame(this.positionAnimationFrame),this.positionAnimationFrame=requestAnimationFrame(()=>this.updateOverlayPosition())}onSlotChange(){this.schedulePositionUpdate()}connectedCallback(){super.connectedCallback(),this.schedulePositionUpdate()}renderTheme(t){importShim("./index-6a7dd94f.js");var e=this.color,o=this.size;return r` <sp-theme .color="${e}" .size="${o}"> ${t} </sp-theme> `}render(){var t=r` <slot @slotchange="${this.onSlotChange}" name="overlay"></slot> `;return this.hasTheme?this.renderTheme(t):t}static create(t,e){var o=new S;return t.detail.content&&(o.root=e,o.open(t)),o}}l([e()],S.prototype,"_state",void 0),l([e({reflect:!0})],S.prototype,"placement",void 0),l([e({attribute:!1})],S.prototype,"color",void 0),l([e({attribute:!1})],S.prototype,"size",void 0);class L{constructor(t,e){this.overlays=[],this.preventMouseRootClose=!1,this.root=document.body,this.handlingResize=!1,this.handleMouseCapture=t=>{var e=this.topOverlay;if(t.target&&e&&e.overlayContent&&!function(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)&&function(t){return 0===t.button}(t)){if(t.target instanceof Node){if(t.composedPath().indexOf(e.overlayContent)>=0)return void(this.preventMouseRootClose=!0);this.preventMouseRootClose=!1}}else this.preventMouseRootClose=!0},this.handleMouse=()=>{this.preventMouseRootClose||this.closeTopOverlay()},this.handleKeyUp=t=>{"Escape"===t.key&&this.closeTopOverlay()},this.handleResize=()=>{this.handlingResize||(this.handlingResize=!0,requestAnimationFrame(()=>{this.overlays.forEach(t=>{t.updateOverlayPosition()}),this.handlingResize=!1}))},this.root=t,this.onChange=e,this.addEventListeners()}get document(){return this.root.ownerDocument||document}get topOverlay(){return this.overlays.slice(-1)[0]}addEventListeners(){this.document.addEventListener("click",this.handleMouseCapture,!0),this.document.addEventListener("click",this.handleMouse),this.document.addEventListener("keyup",this.handleKeyUp),window.addEventListener("resize",this.handleResize)}isOverlayActive(t){return!!this.overlays.find(e=>t.isSameNode(e.overlayContent))}isClickOverlayActiveForTrigger(t){return this.overlays.some(e=>t.isSameNode(e.trigger)&&"click"===e.interaction)}openOverlay(t){this.isOverlayActive(t.detail.content)||requestAnimationFrame(()=>{var e=t.detail.interaction;if("click"===e)this.closeAllHoverOverlays();else if("hover"===e&&this.isClickOverlayActiveForTrigger(t.detail.trigger))return;var o=S.create(t,this.root);this.overlays.push(o),this.onChange(this.overlays)})}closeOverlay(t){requestAnimationFrame(()=>{var e=t.detail.content,o=this.overlays.find(t=>e.isSameNode(t.overlayContent));this.hideAndCloseOverlay(o)})}closeAllHoverOverlays(){for(var t of this.overlays)"hover"===t.interaction&&this.hideAndCloseOverlay(t)}hideAndCloseOverlay(t){var e=this;return i((function*(){if(t){yield t.hide();var o=e.overlays.indexOf(t);o>=0&&(e.overlays[o].dispose(),e.overlays.splice(o,1)),e.onChange(e.overlays)}}))()}closeTopOverlay(){return this.hideAndCloseOverlay(this.topOverlay)}}class R{constructor(){this.onOverlayOpen=t=>{t.stopPropagation(),this.overlayStack.openOverlay(t)},this.onOverlayClose=t=>{t.stopPropagation(),this.overlayStack.closeOverlay(t)},this.onOverlayStackChange=t=>{var e=new Set(t);for(var o of document.body.children)o instanceof S&&!e.has(o)&&document.body.removeChild(o);for(var i of t)i.parentElement!==document.body&&(i.setAttribute("slot","overlays"),document.body.append(i))},this.overlayStack=new L(document.body,this.onOverlayStackChange),this.listen()}listen(){document.body.addEventListener("sp-overlay-open",this.onOverlayOpen,!0),document.body.addEventListener("sp-overlay-close",this.onOverlayClose,!0)}}class z extends o{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1}static get styles(){return[h]}onOverlayOpen(t,e){var o="click"===e?this.clickContent:this.hoverContent;if(o){w||(w=new R);var i=o.getAttribute("delay"),r=i?parseFloat(i):0,n={color:void 0,size:void 0},s=new CustomEvent("query-theme",{bubbles:!0,composed:!0,detail:n,cancelable:!0});this.dispatchEvent(s);var a={content:o,delay:r,offset:this.offset,placement:this.placement,trigger:this,interaction:e,theme:n},l=new CustomEvent("sp-overlay-open",{bubbles:!0,composed:!0,detail:a});this.dispatchEvent(l)}}onOverlayClose(t,e){var o="click"===e?this.clickContent:this.hoverContent;if(o){var i=new CustomEvent("sp-overlay-close",{bubbles:!0,composed:!0,detail:{content:o}});this.dispatchEvent(i)}}onTriggerClick(t){this.clickContent&&this.onOverlayOpen(t,"click")}onTriggerMouseOver(t){this.hoverContent&&this.onOverlayOpen(t,"hover")}onTriggerMouseLeave(t){this.hoverContent&&this.onOverlayClose(t,"hover")}render(){return r` <div id="trigger" @click="${this.onTriggerClick}" @mouseenter="${this.onTriggerMouseOver}" @mouseleave="${this.onTriggerMouseLeave}"> <slot name="trigger"></slot> </div> <div id="overlay-content"> <slot @slotchange="${this.onClickSlotChange}" name="click-content"></slot> <slot @slotchange="${this.onHoverSlotChange}" name="hover-content"></slot> </div> `}onClickSlotChange(t){if(t.target){var e=t.target,o=this.extractSlotContent(e);o&&(this.clickContent=o)}}onHoverSlotChange(t){if(t.target){var e=t.target,o=this.extractSlotContent(e);o&&(this.hoverContent=o)}}extractSlotContent(t){var e=t.assignedNodes();return e.length?e[0]:null}disconnectedCallback(){this.clickContent&&this.onOverlayClose(new Event("remove"),"click"),this.hoverContent&&this.onOverlayClose(new Event("remove"),"hover"),super.disconnectedCallback()}}l([e({reflect:!0})],z.prototype,"placement",void 0),l([e({type:Number,reflect:!0})],z.prototype,"offset",void 0),l([e({type:Boolean,reflect:!0})],z.prototype,"disabled",void 0),customElements.get("overlay-trigger")||customElements.define("overlay-trigger",z),customElements.get("active-overlay")||customElements.define("active-overlay",S);var M=7;class P extends o{constructor(){super(),this.depth=0,this.placement="right",this.depth=0}static get styles(){return[t`:host{display:block;text-align:center}sp-button{margin-top:11px}`]}onRadioChange(t){var e=t.target;this.placement=e.value}render(){return n`
            <sp-radio-group selected="${this.placement}" name="group-example">
                <sp-radio @change=${this.onRadioChange} value="top">
                    Top
                </sp-radio>
                <sp-radio @change=${this.onRadioChange} value="right">
                    Right
                </sp-radio>
                <sp-radio @change=${this.onRadioChange} value="bottom">
                    Bottom
                </sp-radio>
                <sp-radio @change=${this.onRadioChange} value="left">
                    Left
                </sp-radio>
            </sp-radio-group>
            <overlay-trigger placement="${this.placement}">
                <sp-button slot="trigger" variant="cta">Open Popover</sp-button>
                <sp-popover
                    dialog
                    slot="click-content"
                    direction="${this.placement}"
                    tip
                    open
                >
                    ${this.depth<M?n`
                              <recursive-popover
                                  position="${this.placement}"
                                  depth="${this.depth+1}"
                              ></recursive-popover>
                          `:n`
                              <div>Maximum Depth</div>
                          `}
                </sp-popover>
            </overlay-trigger>
        `}}l([e({type:String})],P.prototype,"placement",void 0),l([e({type:Number})],P.prototype,"depth",void 0),customElements.define("recursive-popover",P);var F=n`
    <style>
        html,
        body,
        #root,
        #root-inner,
        #root-theme {
            height: 100%;
            margin: 0;
        }

        #root-theme {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: blue;
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`,D=()=>{var t={top:"top",bottom:"bottom",left:"left",right:"right"},e=s("Type",t,t.bottom),o=a("Offset",6);return n`
        ${F}
        <overlay-trigger
            id="trigger"
            placement="${e}"
            offset="${o}"
        >
            <sp-button variant="primary" slot="trigger">
                Show Popover
            </sp-button>
            <sp-popover
                dialog
                slot="click-content"
                direction="${e}"
                tip
                open
            >
                <div class="options-popover-content">
                    <sp-slider
                        value="5"
                        step="0.5"
                        min="0"
                        max="20"
                        label="Awesomeness"
                    ></sp-slider>
                    <div id="styled-div">
                        The background of this div should be blue
                    </div>
                    <overlay-trigger id="inner-trigger" placement="bottom">
                        <sp-button slot="trigger">Press Me</sp-button>
                        <sp-popover
                            dialog
                            slot="click-content"
                            direction="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                Another Popover
                            </div>
                        </sp-popover>

                        <sp-tooltip
                            slot="hover-content"
                            delay="100"
                            open
                            tip="bottom"
                        >
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </div>
            </sp-popover>
            <sp-tooltip open slot="hover-content" delay="100" tip="bottom">
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `},j=()=>{var t={Light:"light",Dark:"dark"},e=s("Color stop",t,t.Light);return n`
        ${F}
        <sp-theme color=${"light"===e?"dark":"light"}>
            <sp-theme color=${e}>
                <recursive-popover
                    style="
                        background-color: var(--spectrum-global-color-gray-100);
                        color: var(--spectrum-global-color-gray-800);
                        padding: var(--spectrum-global-dimension-size-225);
                    "
                ></recursive-popover>
            </sp-theme>
        </sp-theme>
    `},B=()=>n`
        <style>
            .demo {
                position: absolute;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .bottom-right {
                bottom: 0;
                right: 0;
            }
            .bottom-left {
                bottom: 0;
                left: 0;
            }
        </style>
        <overlay-trigger class="demo top-left" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delay="100" open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `,N=["Default","deepNesting","edges"];export default{title:"Overlay"};export{D as Default,N as __namedExportsOrder,j as deepNesting,B as edges};
//# sourceMappingURL=overlay.stories-38cbfd46.js.map
