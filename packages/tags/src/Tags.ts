/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  CSSResultArray,
  html,
  SpectrumElement,
  TemplateResult,
} from "@spectrum-web-components/base";
import { queryAssignedNodes } from "@spectrum-web-components/base/src/decorators.js";
import { FocusVisiblePolyfillMixin } from "@spectrum-web-components/shared/src/focus-visible.js";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";

import { Tag } from "./Tag.js";

import styles from "./tags.css.js";

/**
 * @element sp-tags
 * The `Tags` component is a custom web component that manages a group of tag elements.
 *
 * @slot - Tag elements to manage as a group.
 *
 */
export class Tags extends FocusVisiblePolyfillMixin(SpectrumElement) {
  /**
   * Returns the styles to be applied to the component.
   */
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * Query to select the assigned nodes within the default slot.
   */
  @queryAssignedNodes()
  public defaultNodes!: Node[];

  /**
   * Gets the tag elements managed by the component.
   *
   * Filters the assigned nodes to return only the tag elements.
   */
  public get tags(): Tag[] {
    return this.defaultNodes.filter(
      (node) => (node as HTMLElement) instanceof Tag,
    ) as Tag[];
  }

  /**
   * Controller to manage roving tabindex for the tag elements.
   */
  rovingTabindexController = new RovingTabindexController<Tag>(this, {
    focusInIndex: (elements: Tag[]) => {
      return elements.findIndex((el) => {
        return !el.disabled && el.deletable;
      });
    },
    elements: () => this.tags,
    isFocusableElement: (el: Tag) => !el.disabled && el.deletable,
  });

  constructor() {
    super();
    // Add event listener for focusin event to handle focus-related interactions.
    this.addEventListener("focusin", this.handleFocusin);
  }

  /**
   * Sets focus on the first focusable tag element.
   */
  public override focus(): void {
    this.rovingTabindexController.focus();
  }

  /**
   * Handles the focusin event.
   *
   * Adds event listeners for focusout and keydown events when the tags component gains focus.
   */
  private handleFocusin = (): void => {
    this.addEventListener("focusout", this.handleFocusout);
    this.addEventListener("keydown", this.handleKeydown);
  };

  /**
   * Handles the keydown event.
   *
   * Navigates between sibling tags components using PageUp and PageDown keys.
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    const { code } = event;

    if (code !== "PageUp" && code !== "PageDown") {
      return;
    }

    // Function to get the element at a circular index in a list.
    const circularIndexedElement = <T extends HTMLElement>(
      list: T[],
      index: number,
    ): T => list[(list.length + index) % list.length];

    // Get all sibling tags components in the document.
    const tagsSiblings = [
      ...(this.getRootNode() as Document).querySelectorAll<Tags>("sp-tags"),
    ];

    if (tagsSiblings.length < 2) {
      return;
    }

    event.preventDefault();
    const currentIndex = tagsSiblings.indexOf(this);
    const offset = code === "PageUp" ? -1 : 1;
    let nextTagsIndex = currentIndex + offset;
    let nextTags = circularIndexedElement(tagsSiblings, nextTagsIndex);

    // Find the next tags component with tag elements.
    while (!nextTags.tags.length) {
      nextTagsIndex += offset;
      nextTags = circularIndexedElement(tagsSiblings, nextTagsIndex);
    }

    // Set focus on the next tags component.
    nextTags.focus();
  };

  /**
   * Handles the focusout event.
   *
   * Removes event listeners for keydown and focusout events when the tags component loses focus.
   */
  private handleFocusout = (): void => {
    this.removeEventListener("keydown", this.handleKeydown);
    this.removeEventListener("focusout", this.handleFocusout);
  };

  /**
   * Handles the slotchange event.
   *
   * Clears the element cache in the roving tabindex controller.
   */
  private handleSlotchange(): void {
    this.rovingTabindexController.clearElementCache();
  }

  /**
   * Renders the content of the tags component.
   *
   * This method returns a template result containing the slot for tag elements.
   */
  protected override render(): TemplateResult {
    return html` <slot @slotchange=${this.handleSlotchange}></slot> `;
  }

  /**
   * Lifecycle method called after the component's DOM has been rendered for the first time.
   *
   * Sets the role attribute to 'list' and the aria-label attribute to 'Tags' if they are not already present.
   */
  protected override firstUpdated(): void {
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "list");
    }

    if (!this.hasAttribute("aria-label")) {
      this.setAttribute("aria-label", "Tags");
    }
  }
}
