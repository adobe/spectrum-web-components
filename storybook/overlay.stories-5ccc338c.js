import{p as t,L as e,c as o}from"./lit-element-089a5717.js";import{q as i,k as r,j as s,z as a,y as p}from"./storybook-preview-9aba481c.js";import"./index-e0e40925.js";import{_ as n}from"./tslib.es6-d9c764b6.js";import"./if-defined-f9b5fa5b.js";import"./index-16f3b7d2.js";import"./focusable-f84f80fc.js";import"./observe-slot-text-5194cee4.js";import"./index-da10f6c3.js";import{O as l}from"./index-3b69cd23.js";import"./index-fcda0df5.js";import"./index-160e7101.js";import"./index-a0f0b1d0.js";var d=7;customElements.define("overlay-target-icon",class extends e{static get styles(){return o`:host{position:absolute;display:block;color:var(--spectrum-global-color-magenta-700);width:64px;height:64px}`}render(){return i` <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bullseye" class="svg-inline--fa fa-bullseye fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"> <path fill="currentColor" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"></path> </svg> `}});class g extends e{constructor(){super(...arguments),this.top=100,this.left=100}static get styles(){return o`:host{display:block;width:100%;height:100%;position:relative}::slotted(*){display:block;width:100%;height:100%}`}onSlotChange(t){if(t.target){var e=t.target;this.targetElement=void 0;var o=e.assignedNodes().find(t=>t instanceof HTMLElement);o&&(this.targetElement=o.querySelector('[slot="trigger"]'),this.targetElement&&(this.targetElement.addEventListener("mousedown",t=>this.onMouseDown(t)),this.resetTargetPosition()))}}onMouseDown(t){var e=t.target,o=e.parentElement;if(o){var i={x:o.offsetWidth-e.offsetWidth,y:o.offsetHeight-e.offsetHeight},r=t.clientX,s=t.clientY,a=this.left,p=this.top,n=t=>{var e=t.clientX-r,o=t.clientY-s,n={x:e+a,y:o+p};this.left=Math.min(Math.max(n.x,0),i.x),this.top=Math.min(Math.max(n.y,0),i.y),l.update()},d=()=>{document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",d)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",d)}}resetTargetPosition(){if(this.targetElement){var t=this.targetElement,e=t.parentElement;e&&(this.left=(e.offsetWidth-t.offsetWidth)/2,this.top=(e.offsetHeight-t.offsetHeight)/2)}}updated(){this.targetElement&&(this.targetElement.style.transform=`translate(${this.left}px, ${this.top}px)`)}render(){return i` <slot @slotchange="${this.onSlotChange}"></slot> `}}n([t({type:Number})],g.prototype,"top",void 0),n([t({type:Number})],g.prototype,"left",void 0),customElements.define("overlay-drag",g);class c extends e{constructor(){super(),this.depth=0,this.placement="right",this.depth=0}static get styles(){return[o`:host{display:block;text-align:center}sp-button{margin-top:11px}`]}onRadioChange(t){var e=t.target;this.placement=e.value}render(){return i` <sp-radio-group selected="${this.placement}" name="group-example"> <sp-radio @change="${this.onRadioChange}" value="top"> Top </sp-radio> <sp-radio @change="${this.onRadioChange}" value="right"> Right </sp-radio> <sp-radio @change="${this.onRadioChange}" value="bottom"> Bottom </sp-radio> <sp-radio @change="${this.onRadioChange}" value="left"> Left </sp-radio> </sp-radio-group> <overlay-trigger placement="${this.placement}"> <sp-button slot="trigger" variant="cta">Open Popover</sp-button> <sp-popover dialog slot="click-content" direction="${this.placement}" tip open> ${this.depth<d?i` <recursive-popover position="${this.placement}" depth="${this.depth+1}"></recursive-popover> `:i` <div>Maximum Depth</div> `} </sp-popover> </overlay-trigger> `}}n([t({type:String})],c.prototype,"placement",void 0),n([t({type:Number})],c.prototype,"depth",void 0),customElements.define("recursive-popover",c);var m=r`
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
`,u=()=>{var t=s("Placement",["top","top-start","top-end","bottom","bottom-start","bottom-end","left","left-start","left-end","right","right-start","right-end","auto","auto-start","auto-end","none"],"bottom"),e=a("Offset",0);return r`
        ${m}
        <overlay-trigger
            id="trigger"
            placement="${t}"
            offset="${e}"
        >
            <sp-button variant="primary" slot="trigger">
                Show Popover
            </sp-button>
            <sp-popover
                dialog
                slot="click-content"
                placement="${t}"
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
                            placement="bottom"
                            tip
                            open
                        >
                            <div class="options-popover-content">
                                Another Popover
                            </div>
                        </sp-popover>

                        <sp-tooltip
                            slot="hover-content"
                            delayed
                            open
                            tip="bottom"
                        >
                            Click to open another popover.
                        </sp-tooltip>
                    </overlay-trigger>
                </div>
            </sp-popover>
            <sp-tooltip open slot="hover-content" delayed tip="bottom">
                Click to open a popover.
            </sp-tooltip>
        </overlay-trigger>
    `},v=()=>{var t={Light:"light",Dark:"dark"},e=p("Color stop",t,t.Light);return r`
        ${m}
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
    `},h=()=>r`
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
            <sp-tooltip slot="hover-content" delayed open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo top-right" placement="bottom">
            <sp-button slot="trigger">
                Top/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="bottom">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger class="demo bottom-left" placement="top">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Left
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
        <overlay-trigger placement="top" class="demo bottom-right">
            <sp-button slot="trigger">
                Bottom/
                <br />
                Right
            </sp-button>
            <sp-tooltip slot="hover-content" delayed open tip="top">
                Triskaidekaphobia and More
            </sp-tooltip>
        </overlay-trigger>
    `,b=()=>r`
        ${m}
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger class="demo top-left" placement="bottom">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed open tip="bottom">
                    Click to open popover
                </sp-tooltip>
                <sp-popover
                    dialog
                    slot="click-content"
                    position="bottom"
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
                                placement="bottom"
                                tip
                                open
                            >
                                <div class="options-popover-content">
                                    Another Popover
                                </div>
                            </sp-popover>

                            <sp-tooltip
                                slot="hover-content"
                                delayed
                                open
                                tip="bottom"
                            >
                                Click to open another popover.
                            </sp-tooltip>
                        </overlay-trigger>
                    </div>
                </sp-popover>
            </overlay-trigger>
        </overlay-drag>
    `,f=()=>r`
        <style>
            sp-tooltip {
                transition: none;
            }
        </style>
        <overlay-drag>
            <overlay-trigger placement="right">
                <overlay-target-icon slot="trigger"></overlay-target-icon>
                <sp-tooltip slot="hover-content" delayed open tip="right">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus egestas sed enim sed condimentum. Nunc facilisis
                    scelerisque massa sed luctus. Orci varius natoque penatibus
                    et magnis dis parturient montes, nascetur ridiculus mus.
                    Suspendisse sagittis sodales purus vitae ultricies. Integer
                    at dui sem. Sed quam tortor, ornare in nisi et, rhoncus
                    lacinia mauris. Sed vel rutrum mauris, ac pellentesque nibh.
                    Sed feugiat semper libero, sit amet vehicula orci fermentum
                    id. Vivamus imperdiet egestas luctus. Mauris tincidunt
                    malesuada ante, faucibus viverra nunc blandit a. Fusce et
                    nisl nisi. Aenean dictum quam id mollis faucibus. Nulla a
                    ultricies dui. In hac habitasse platea dictumst. Curabitur
                    gravida lobortis vestibulum.
                </sp-tooltip>
            </overlay-trigger>
        </overlay-drag>
    `,y=["Default","deepNesting","edges","updated","sideHoverDraggable"];export default{title:"Overlay"};export{u as Default,y as __namedExportsOrder,v as deepNesting,h as edges,f as sideHoverDraggable,b as updated};
//# sourceMappingURL=overlay.stories-5ccc338c.js.map
