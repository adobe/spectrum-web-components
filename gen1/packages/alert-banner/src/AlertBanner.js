"use strict";import{html as e}from"@spectrum-web-components/base";import"@spectrum-web-components/button/sp-close-button.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";import"@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";import r from"./alert-banner.css.js";import{AlertBannerBase as s}from"./AlertBanner.base.js";export class AlertBanner extends s{static get styles(){return[r]}renderIcon(t){switch(t){case"info":return e`
          <sp-icon-info label="Information" class="type"></sp-icon-info>
        `;case"negative":return e`
          <sp-icon-alert label="Error" class="type"></sp-icon-alert>
        `;default:return e``}}render(){return e`
      <div class="body" role="alert">
        <div class="content">
          ${this.renderIcon(this.variant)}
          <div class="text"><slot></slot></div>
        </div>
        <slot name="action"></slot>
      </div>
      <div class="end">
        ${this.dismissible?e`
              <sp-close-button
                @click=${this.shouldClose}
                label="Close"
                static-color="white"
              ></sp-close-button>
            `:e``}
      </div>
    `}}
//# sourceMappingURL=AlertBanner.js.map
