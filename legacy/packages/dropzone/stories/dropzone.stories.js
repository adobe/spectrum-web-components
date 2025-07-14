"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  LitElement
} from "@spectrum-web-components/base";
import { defineElement } from "@spectrum-web-components/base/src/define-element.js";
import { state } from "@spectrum-web-components/base/src/decorators.js";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import "@spectrum-web-components/action-button/sp-action-button.js";
import { illustration } from "../test/test-svg";
import "@spectrum-web-components/illustrated-message/sp-illustrated-message.js";
import "@spectrum-web-components/link/sp-link.js";
export default {
  component: "sp-dropzone",
  title: "Dropzone",
  args: {
    isDragged: false,
    isFilled: false
  },
  argTypes: {
    isDragged: {
      name: "isDragged",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    isFilled: {
      name: "isFilled",
      type: { name: "boolean", required: false },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
export const Default = (args) => {
  return html`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>
            <div>
                <label for="file-input">
                    <sp-link
                        href="javascript:;"
                        onclick="this.parentElement.nextElementSibling.click()"
                    >
                        Select a File
                    </sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </sp-dropzone>
    `;
};
export const Dragged = (args) => {
  return html`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>
            <div>
                <label for="file-input">
                    <sp-link
                        href="javascript:;"
                        onclick="this.parentElement.nextElementSibling.click()"
                    >
                        Select a File
                    </sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </sp-dropzone>
    `;
};
Dragged.args = {
  isDragged: true
};
export const Filled = (args) => {
  return html`
        <sp-dropzone id="dropzone" ?filled=${args.isFilled}>
            Filled dropzone
        </sp-dropzone>
    `;
};
Filled.args = {
  isFilled: true
};
class ControlledDropzone extends LitElement {
  constructor() {
    super(...arguments);
    this.beingDraggedOver = false;
    this.input = void 0;
  }
  render() {
    return html`
            <span>
                <sp-action-button
                    draggable="true"
                    style="margin-block-end: 16px;"
                >
                    Drag me
                </sp-action-button>
                <sp-dropzone
                    tabindex="0"
                    id="dropzone"
                    drop-effect="copy"
                    ?filled=${this.input !== void 0}
                    @sp-dropzone-drop=${this.onChange}
                    @sp-dropzone-dragover=${this.onDragOver}
                    @sp-dropzone-dragleave=${this.onDragLeave}
                >
                    <sp-illustrated-message
                        style="--mod-illustrated-message-display: flex;"
                        heading=${this.input !== void 0 ? this.beingDraggedOver ? "Drop here to replace!" : "You dropped something!" : "Drag and drop your file"}
                    >
                        ${illustration}
                    </sp-illustrated-message>
                    <div>
                        <label for="file-input">
                            <sp-link
                                href="javascript:;"
                                onclick="this.parentElement.nextElementSibling.click()"
                            >
                                Select a File
                            </sp-link>
                            from your computer
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style="display: none"
                            @change=${this.onChange}
                        />
                    </div>
                </sp-dropzone>
            </span>
        `;
  }
  onChange() {
    this.input = "mock-file";
    this.beingDraggedOver = false;
  }
  onDragOver() {
    this.beingDraggedOver = true;
  }
  onDragLeave() {
    this.beingDraggedOver = false;
  }
}
__decorateClass([
  state()
], ControlledDropzone.prototype, "beingDraggedOver", 2);
__decorateClass([
  state()
], ControlledDropzone.prototype, "input", 2);
defineElement("controlled-dropzone", ControlledDropzone);
export const Controlled = () => {
  return html`
        <controlled-dropzone></controlled-dropzone>
    `;
};
//# sourceMappingURL=dropzone.stories.js.map
