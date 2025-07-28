"use strict";var v=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var r=(c,l,n,e)=>{for(var i=e>1?void 0:e?b(l,n):l,o=c.length-1,a;o>=0;o--)(a=c[o])&&(i=(e?a(l,n,i):a(i))||i);return e&&i&&v(l,n,i),i};import{html as t,nothing as u}from"@spectrum-web-components/base";import{property as s}from"@spectrum-web-components/base/src/decorators.js";import{when as p}from"@spectrum-web-components/base/src/directives.js";import T from"./coachmark.css.js";import f from"@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js";import"@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js";import{Popover as g}from"@spectrum-web-components/popover";import{join as $}from"@spectrum-web-components/base/src/directives.js";import{ifDefined as y}from"@spectrum-web-components/base/src/directives.js";import{MediaType as A}from"./CoachmarkItem.js";import"@spectrum-web-components/asset/sp-asset.js";import"@spectrum-web-components/button/sp-button.js";import"@spectrum-web-components/button-group/sp-button-group.js";export class Coachmark extends g{constructor(){super(...arguments);this.placement="right";this.modifierKeys=[];this.hasAsset=!1;this.renderSecondaryButton=()=>t`
            <sp-button
                treatment="outline"
                variant="secondary"
                @click=${this.handleSecondaryCTA}
            >
                ${this.secondaryCTA}
            </sp-button>
        `;this.renderPrimaryButton=()=>t`
            <sp-button
                size="s"
                treatment="outline"
                variant="primary"
                @click=${this.handlePrimaryCTA}
            >
                ${this.primaryCTA}
            </sp-button>
        `;this.renderSecondaryButtonMobile=()=>t`
            <sp-button
                variant="secondary"
                treatment="outline"
                icon-only
                aria-label="previous"
                @click=${this.handleSecondaryCTA}
            >
                <sp-icon-chevron200
                    size="s"
                    class="spectrum-UIIcon-ChevronLeft75"
                    slot="icon"
                ></sp-icon-chevron200>
            </sp-button>
        `;this.renderPrimaryButtonMobile=()=>t`
            <sp-button
                size="s"
                treatment="outline"
                variant="primary"
                @click=${this.handlePrimaryCTA}
            >
                ${this.primaryCTA}
            </sp-button>
        `;this.renderSteps=()=>t`
            <div class="step" role="status">
                <span aria-live="polite">
                    <slot name="step-count">
                        ${this.currentStep} of ${this.totalSteps}
                    </slot>
                </span>
            </div>
        `;this.renderActionMenu=()=>t`
            <div class="action-menu">
                <slot name="actions"></slot>
            </div>
        `}static get styles(){return[...super.styles,T,f]}renderMedia(){var e;return this.mediaType===A.IMAGE?t`
            <sp-asset id="cover-photo">
                <div class="image-wrapper">
                    <img
                        class="image"
                        loading="lazy"
                        slot="cover-photo"
                        src="${y(this.source)}"
                        alt="${y((e=this==null?void 0:this.content)==null?void 0:e.imageAlt)}"
                    />
                </div>
            </sp-asset>
        `:t`
                <slot name="asset"></slot>
            `}renderModifier(n,e="modifier"){return t`
            <span type="${e}" class="keyboard-shortcut">${n}</span>
        `}renderJoiner(){return t`
            <span class="plus">&plus;</span>
        `}renderHeader(){var o,a,d,m;const n=this.modifierKeys&&((o=this.modifierKeys)==null?void 0:o.length)>0,e=!!this.shortcutKey,i=!!((a=this.content)!=null&&a.title);return!i&&!n&&!e?t`
                <div class="title"><slot name="title"></slot></div>
            `:t`
            ${i?t`
                      <div class="title">${(d=this.content)==null?void 0:d.title}</div>
                  `:u}
            ${n||e?t`
                      <kbd class="keys spectrum-Body spectrum-Body--sizeS">
                          ${n?$((m=this.modifierKeys)==null?void 0:m.map(h=>this.renderModifier(h)),this.renderJoiner()):u}
                          ${e&&n?this.renderJoiner():u}
                          ${e?this.renderModifier(this.shortcutKey,"shortcut"):u}
                      </kbd>
                  `:u}
        `}renderContent(){var e,i;return!((e=this.content)!=null&&e.description)?t`
                <slot name="content"></slot>
            `:t`
            <div>${(i=this.content)==null?void 0:i.description}</div>
        `}handlePrimaryCTA(){this.dispatchEvent(new Event("primary",{bubbles:!0,composed:!0}))}handleSecondaryCTA(){this.dispatchEvent(new Event("secondary",{bubbles:!0,composed:!0}))}renderButtons(){return t`
            <sp-button-group class="spectrum-ButtonGroup buttongroup">
                ${p(this.secondaryCTA,this.renderSecondaryButton)}
                ${p(this.primaryCTA,this.renderPrimaryButton)}
            </sp-button-group>
            <sp-button-group
                class="spectrum-ButtonGroup buttongroup-mobile"
                size="s"
            >
                ${p(this.secondaryCTA,this.renderSecondaryButtonMobile)}
                ${p(this.primaryCTA,this.renderPrimaryButtonMobile)}
            </sp-button-group>
        `}render(){return t`
            ${this.renderMedia()}
            <div class="header">
                <div class="flex-container">${this.renderHeader()}</div>
                <div class="static-item">
                    ${p(this.secondaryCTA&&this.primaryCTA,this.renderActionMenu)}
                </div>
            </div>

            <div class="content">${this.renderContent()}</div>
            <div class="footer">
                ${p(this.totalSteps&&this.totalSteps>1,this.renderSteps)}
                ${this.renderButtons()}
            </div>
        `}}r([s({type:Object})],Coachmark.prototype,"item",2),r([s({type:String})],Coachmark.prototype,"placement",2),r([s({type:Object,attribute:!1})],Coachmark.prototype,"content",2),r([s({attribute:"shortcut-key"})],Coachmark.prototype,"shortcutKey",2),r([s({type:Array})],Coachmark.prototype,"modifierKeys",2),r([s({attribute:"src"})],Coachmark.prototype,"source",2),r([s({attribute:"media-type"})],Coachmark.prototype,"mediaType",2),r([s({type:Boolean,attribute:"has-asset",reflect:!0})],Coachmark.prototype,"hasAsset",2),r([s()],Coachmark.prototype,"asset",2),r([s({type:Number,attribute:"current-step"})],Coachmark.prototype,"currentStep",2),r([s({type:Number,attribute:"total-steps"})],Coachmark.prototype,"totalSteps",2),r([s({type:String,attribute:"primary-cta"})],Coachmark.prototype,"primaryCTA",2),r([s({type:String,attribute:"secondary-cta"})],Coachmark.prototype,"secondaryCTA",2);
//# sourceMappingURL=Coachmark.js.map
