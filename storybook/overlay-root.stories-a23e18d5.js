import{a as t,h as e}from"./lit-html-6898710b.js";import{e as o,l as i,m as n}from"./index-2626287a.js";import{c as s,p as r,L as a}from"./lit-element-81619d09.js";import{_ as l}from"./tslib.es6-d9c764b6.js";import"./if-defined-a4bc040d.js";import"./index-8f46dbd8.js";import"./focusable-ee5c66f3.js";import"./observe-slot-text-5194cee4.js";import"./index-9d9ec6e0.js";import"./index-9d1add8f.js";import"./index-7484fd97.js";import"./index-1e0c2eab.js";var h=s`:host{display:flex;flex-direction:column;width:100%;height:100%}`,p={bottom:"top",left:"left",right:"left",top:"top"},c={bottom:"top",left:"right",right:"left",top:"bottom"},d={left:"top",top:"left"},v={left:"width",top:"height"},m={};function g(t){var e,o,i=0,n=0,s={top:0,left:0};return"BODY"===t.tagName?(e=window.innerWidth,o=window.innerHeight,t.ownerDocument?(s.top=t.ownerDocument.documentElement.scrollTop,s.left=t.ownerDocument.documentElement.scrollLeft):(s.top=t.scrollTop,s.left=t.scrollLeft)):(({width:e,height:o,top:i,left:n}=t.getBoundingClientRect()),s.top=t.scrollTop,s.left=t.scrollLeft),{width:e,height:o,scroll:s,top:i,left:n}}function u(t,e,o,i,n){var s=i.scroll[t],r=i[v[t]],a=e-n-s,l=e+n-s+o;return a<0?-a:l>r?Math.max(r-l,-a):0}function y(t,e,o,i,n,s,r){var a=s.scroll[t],l=s[v[t]],h=r[t]+e-i-a,p=r[t]+e+i-a+o;return h<0&&("top"===n||"left"===n)||p>l&&("bottom"===n||"right"===n)}function f(t){if(m[t])return m[t];var[e]=t.split(" "),[,o]=t.split(" "),i=p[e]||"right",n=d[i];p[o]||(o="center");var s=v[i],r=v[n];return m[t]={axis:i,crossAxis:n,crossPlacement:o,crossSize:r,placement:e,size:s},m[t]}function C(t,e,o,i,n,s){var{axis:r,crossAxis:a,crossPlacement:l,crossSize:h,size:p,placement:c}=i,d={top:0,left:0,bottom:0,right:0};if(d[a]=t[a]+s,"center"===l?d[a]+=(t[h]-o[h])/2:l!==a&&(d[a]+=t[h]-o[h]),t[h]<o[h]){var v=Math.min(d[a],t[a]);d[a]=Math.max(v,t[a]-o[h]+t[h])}return d[r]=c===r?t[r]-o[p]-n:t[r]+t[p]+n,d}function b(t,e){var o=t.getBoundingClientRect(),i=e.getBoundingClientRect();return{bottom:o.bottom-i.bottom,height:o.height,left:o.left-i.left,right:o.right-i.right,top:o.top-i.top,width:o.width,x:o.x,y:o.y}}function O(t,e,o,i,n,s,r,a,l){var h="BODY"===i.tagName,p=h?o.getBoundingClientRect():b(o,i);h||(p.top+=parseInt(o.style.marginTop,10)||0,p.left+=parseInt(o.style.marginLeft,10)||0);var d,v,{top:m,right:O,bottom:x,left:k,width:E,height:w,x:A,y:L}=e.getBoundingClientRect(),S={top:m,right:O,bottom:x,left:k,width:E,height:w,x:A,y:L},R=(d=e,v=window.getComputedStyle(d),{bottom:parseInt(v.marginBottom,10)||0,left:parseInt(v.marginLeft,10)||0,right:parseInt(v.marginRight,10)||0,top:parseInt(v.marginTop,10)||0});S.width+=R.left+R.right,S.height+=R.top+R.bottom;g(i);var $=i;return function(t,e,o,i,n,s,r,a,l,h,p){var d=f(t),{axis:v,size:m,crossAxis:g,crossSize:b,placement:O,crossPlacement:x}=d,k=C(o,0,i,d,h,p),E=h;if(r&&y(v,k[v],i[m],s,O,a,l)){var w=f(`${c[O]} ${x}`),A=w.axis,L=w.size,S=C(o,0,i,w,-1*h,p);y(A,S[A],i[L],s,c[O],a,l)||(d=w,k=S,E=-1*h)}var R=u(g,k[g],i[b],a,s);k[g]+=R;var $=Math.max(0,a.height+a.top+a.scroll.top-l.top-k.top-n.top-n.bottom-s);i.height=Math.min(i.height,$),R=R=u(g,(k=C(o,0,i,d,E,p))[g],i[b],a,s),k[g]+=R;var T={top:0,bottom:0,left:0,right:0};return T[g]=o[b]>i[b]?null:o[g]-k[g]+o[b]/2,{arrowOffsetLeft:T.left||0,arrowOffsetTop:T.top||0,maxHeight:$,placement:d.placement,positionLeft:k.left||0,positionTop:k.top||0}}(t,0,p,S,R,n,s,g($),"BODY"===$.tagName?i.getBoundingClientRect():b(i,$),a,l)}var x=s`@keyframes spOverlayFadeIn{0%{opacity:0;transform:var(--animation-transform)}to{opacity:1;transform:translate(0)}}@keyframes spOverlayFadeOut{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:var(--animation-transform)}}:host{z-index:2;position:absolute;display:none;opacity:0;animation-duration:var(--spectrum-global-animation-duration-100);animation-timing-function:ease-in-out}:host([state]){display:block}:host([state=visible]){opacity:1;transform:translate(0)!important;visibility:visible;animation-name:spOverlayFadeIn}:host([state=hiding]){animation-name:spOverlayFadeOut}:host([placement=top]){--animation-transform:translateY(6px)}:host([placement=right]){--animation-transform:translate(-6px)}:host([placement=bottom]){--animation-transform:translateY(-6px)}:host([placement=left]){--animation-transform:translate(6px)}`;class k{constructor(){this.promise=new Promise(t=>this.resolveFn=t)}resolve(t){this.resolveFn&&this.resolveFn(t)}}var E={containerPadding:10,crossOffset:0,flip:!0,offset:0,placement:"left"},w="spOverlayFadeOut",A={initial:"idle",states:{idle:{on:{active:"active"}},active:{on:{visible:"visible",hiding:"hiding",idle:"idle"}},visible:{on:{hiding:"hiding",idle:"idle"}},hiding:{on:{idle:"idle"}}}},L=(t,e)=>t?e&&A.states[t].on[e]||t:A.initial;class S extends a{constructor(){super(...arguments),this._state=L(),this.placement="bottom",this.offset=6,this.interaction="hover",this.positionAnimationFrame=0,this.onAnimationEnd=t=>{this.hiddenDeferred&&t.animationName===w&&this.hiddenDeferred.resolve()}}get state(){return this._state}set state(t){var e=L(this.state,t);e!==this.state&&(this._state=e,"idle"===this.state?this.removeAttribute("state"):this.setAttribute("state",this.state))}static get styles(){return[x]}open(t){this.extractEventDetail(t),this.stealOverlayContent(t.detail.content),this.overlayContent&&(this.state="active",this.timeout=window.setTimeout(()=>{this.state="visible",delete this.timeout},t.detail.delay),this.hiddenDeferred=new k,this.addEventListener("animationend",this.onAnimationEnd),this.hiddenDeferred.promise.then(()=>{this.removeEventListener("animationend",this.onAnimationEnd)}))}extractEventDetail(t){this.overlayContent=t.detail.content,this.trigger=t.detail.trigger,this.placement=t.detail.placement,this.offset=t.detail.offset,this.interaction=t.detail.interaction}dispose(){this.state="idle",this.timeout&&(clearTimeout(this.timeout),delete this.timeout),this.returnOverlayContent()}stealOverlayContent(t){!this.placeholder&&t&&(this.placeholder||(this.placeholder=document.createComment("placeholder for "+t.nodeName)),t.parentElement&&t.parentElement.replaceChild(this.placeholder,t),this.overlayContent=t,this.overlayContent.setAttribute("slot","overlay"),this.appendChild(this.overlayContent))}returnOverlayContent(){this.overlayContent&&(this.overlayContent.removeAttribute("slot"),this.placeholder&&this.placeholder.parentElement&&this.placeholder.parentElement.replaceChild(this.overlayContent,this.placeholder),delete this.placeholder)}get hasSlotenOverlayContent(){return!(!this.overlayContent||this.overlayContent.parentElement!==this)}updateOverlayPosition(){if(this.trigger&&this.overlayContent&&this.hasSlotenOverlayContent&&this.root&&this.isConnected){var t={containerPadding:0,crossOffset:0,flip:!1,offset:this.offset,placement:this.placement},e=Object.assign(Object.assign({},E),t);this.position=O(e.placement,this.overlayContent,this.trigger,this.root,e.containerPadding,e.flip,this.root,e.offset,e.crossOffset),this.style.setProperty("left",`${this.position.positionLeft}px`),this.style.setProperty("top",`${this.position.positionTop}px`)}}hide(){var e=this;return t((function*(){if(e.state="hiding",e.hiddenDeferred)return e.hiddenDeferred.promise}))()}schedulePositionUpdate(){cancelAnimationFrame(this.positionAnimationFrame),this.positionAnimationFrame=requestAnimationFrame(()=>this.updateOverlayPosition())}onSlotChange(){this.schedulePositionUpdate()}connectedCallback(){super.connectedCallback(),this.schedulePositionUpdate()}render(){return e` <slot @slotchange="${this.onSlotChange}" name="overlay"></slot> `}static create(t,e){var o=new S;return t.detail.content&&(o.root=e,o.open(t)),o}}l([r()],S.prototype,"_state",void 0),l([r({reflect:!0})],S.prototype,"placement",void 0);class R{constructor(t,e){this.overlays=[],this.preventMouseRootClose=!1,this.root=document.body,this.handlingResize=!1,this.handleMouseCapture=t=>{var e=this.topOverlay;if(t.target&&e&&e.overlayContent&&!function(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)&&function(t){return 0===t.button}(t)){if(t.target instanceof Node){if(t.composedPath().indexOf(e.overlayContent)>=0)return void(this.preventMouseRootClose=!0);this.preventMouseRootClose=!1}}else this.preventMouseRootClose=!0},this.handleMouse=()=>{this.preventMouseRootClose||this.closeTopOverlay()},this.handleKeyUp=t=>{"Escape"===t.key&&this.closeTopOverlay()},this.handleResize=()=>{this.handlingResize||(this.handlingResize=!0,requestAnimationFrame(()=>{this.overlays.forEach(t=>{t.updateOverlayPosition()}),this.handlingResize=!1}))},this.root=t,this.onChange=e,this.addEventListeners()}get document(){return this.root.ownerDocument||document}get topOverlay(){return this.overlays.slice(-1)[0]}dispose(){this.removeEventListeners()}addEventListeners(){this.document&&(this.document.addEventListener("click",this.handleMouseCapture,!0),this.document.addEventListener("click",this.handleMouse),this.document.addEventListener("keyup",this.handleKeyUp),window.addEventListener("resize",this.handleResize))}removeEventListeners(){this.document&&(this.document.removeEventListener("click",this.handleMouseCapture,!0),this.document.removeEventListener("click",this.handleMouse),this.document.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("resize",this.handleResize))}isOverlayActive(t){return!!this.overlays.find(e=>e.overlayContent===t)}isClickOverlayActiveForTrigger(t){return this.overlays.some(e=>e.trigger===t&&"click"===e.interaction)}openOverlay(t){this.isOverlayActive(t.detail.content)||requestAnimationFrame(()=>{var e=t.detail.interaction;if("click"===e)this.closeAllHoverOverlays();else if("hover"===e&&this.isClickOverlayActiveForTrigger(t.detail.trigger))return;var o=S.create(t,this.root);this.overlays.push(o),this.onChange(this.overlays)})}closeOverlay(t){requestAnimationFrame(()=>{var e=t.detail.content,o=this.overlays.find(t=>t.overlayContent===e);this.hideAndCloseOverlay(o)})}closeAllHoverOverlays(){for(var t of this.overlays)"hover"===t.interaction&&this.hideAndCloseOverlay(t)}hideAndCloseOverlay(e){var o=this;return t((function*(){if(e){yield e.hide();var t=o.overlays.indexOf(e);t>=0&&(o.overlays[t].dispose(),o.overlays.splice(t,1)),o.onChange(o.overlays)}}))()}closeTopOverlay(){return this.hideAndCloseOverlay(this.topOverlay)}}class $ extends a{constructor(){super(),this.onOverlayStackChange=t=>{var e=new Set(t);for(var o of this.children)o instanceof S&&!e.has(o)&&this.removeChild(o);for(var i of t)i.parentElement!==this&&(i.setAttribute("slot","overlays"),this.appendChild(i))},this.overlayStack=new R(this,this.onOverlayStackChange)}static get styles(){return[h]}onOverlayOpen(t){this.overlayStack&&this.overlayStack.openOverlay(t)}onOverlayClose(t){this.overlayStack&&this.overlayStack.closeOverlay(t)}render(){return e` <slot></slot> <slot name="overlays"></slot> `}connectedCallback(){super.connectedCallback(),this.addEventListener("sp-overlay:open",this.onOverlayOpen),this.addEventListener("sp-overlay:close",this.onOverlayClose)}disconnectedCallback(){this.removeEventListener("sp-overlay:open",this.onOverlayOpen),this.removeEventListener("sp-overlay:close",this.onOverlayClose),this.overlayStack&&this.overlayStack.dispose(),super.disconnectedCallback()}}customElements.get("overlay-root")||customElements.define("overlay-root",$),customElements.get("active-overlay")||customElements.define("active-overlay",S);var T=s`:host([disabled]) #trigger{pointer-events:none}#overlay-content{display:none}`;class M extends a{constructor(){super(...arguments),this.placement="bottom",this.offset=6,this.disabled=!1}static get styles(){return[T]}onOverlayOpen(t,e){var o="click"===e?this.clickContent:this.hoverContent,i=o?o.getAttribute("delay"):null,n=i?parseFloat(i):0;if(o){var s={content:o,delay:n,offset:this.offset,placement:this.placement,trigger:this,interaction:e},r=new CustomEvent("sp-overlay:open",{bubbles:!0,composed:!0,detail:s});this.dispatchEvent(r)}}onOverlayClose(t,e){var o="click"===e?this.clickContent:this.hoverContent;if(o){var i=new CustomEvent("sp-overlay:close",{bubbles:!0,composed:!0,detail:{content:o}});this.dispatchEvent(i)}}onTriggerClick(t){this.clickContent&&this.onOverlayOpen(t,"click")}onTriggerMouseOver(t){this.hoverContent&&this.onOverlayOpen(t,"hover")}onTriggerMouseLeave(t){this.hoverContent&&this.onOverlayClose(t,"hover")}render(){return e` <div id="trigger" @click="${this.onTriggerClick}" @mouseenter="${this.onTriggerMouseOver}" @mouseleave="${this.onTriggerMouseLeave}"> <slot name="trigger"></slot> </div> <div id="overlay-content"> <slot @slotchange="${this.onClickSlotChange}" name="click-content"></slot> <slot @slotchange="${this.onHoverSlotChange}" name="hover-content"></slot> </div> `}onClickSlotChange(t){if(t.target){var e=t.target,o=this.extractSlotContent(e);o&&(this.clickContent=o)}}onHoverSlotChange(t){if(t.target){var e=t.target,o=this.extractSlotContent(e);o&&(this.hoverContent=o)}}extractSlotContent(t){var e=t.assignedNodes();return e.length?e[0]:null}}l([r({reflect:!0})],M.prototype,"placement",void 0),l([r({type:Number,reflect:!0})],M.prototype,"offset",void 0),l([r({type:Boolean,reflect:!0})],M.prototype,"disabled",void 0),customElements.get("overlay-trigger")||customElements.define("overlay-trigger",M);var P=7;class F extends a{constructor(){super(),this.depth=0,this.placement="right",this.depth=0}static get styles(){return[s`:host{text-align:center}sp-button{margin-top:11px}`]}onRadioChange(t){var e=t.target;this.placement=e.value}render(){return o`
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
                    ${this.depth<P?o`
                              <recursive-popover
                                  position="${this.placement}"
                                  depth="${this.depth+1}"
                              ></recursive-popover>
                          `:o`
                              <div>Maximum Depth</div>
                          `}
                </sp-popover>
            </overlay-trigger>
        `}}l([r({type:String})],F.prototype,"placement",void 0),l([r({type:Number})],F.prototype,"depth",void 0),customElements.define("recursive-popover",F);var z=o`
    <style>
        overlay-root {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
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
`,D=()=>{var t={top:"top",bottom:"bottom",left:"left",right:"right"},e=i("Type",t,t.bottom),s=n("Offset",6);return o`
        ${z}
        <overlay-root>
            <overlay-trigger
                id="trigger"
                placement="${e}"
                offset="${s}"
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
        </overlay-root>
    `},j=()=>o`
        ${z}
        <overlay-root>
            <recursive-popover></recursive-popover>
        </overlay-root>
    `;j.story={name:"Deep Nesting"};export default{component:"overlay-root",title:"Overlay Root"};export{D as Default,j as deepNesting};
//# sourceMappingURL=overlay-root.stories-a23e18d5.js.map
