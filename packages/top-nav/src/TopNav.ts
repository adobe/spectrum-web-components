/* eslint-disable lit-a11y/click-events-have-key-events */
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
  PropertyValues,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from "@spectrum-web-components/base";
import {
  property,
  query,
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { ResizeController } from "@lit-labs/observers/resize-controller.js";
import { TopNavItem } from "./TopNavItem.js";

import tabsSizes from "@spectrum-web-components/tabs/src/tabs-sizes.css.js";
import tabStyles from "@spectrum-web-components/tabs/src/tabs.css.js";
import { ScaledIndicator } from "@spectrum-web-components/tabs/src/Tabs.js";

const noSelectionStyle = "transform: translateX(0px) scaleX(0) scaleY(0)";

/**
 * The `TopNav` component is a custom web component that represents a top navigation bar.
 * It includes various properties and methods to manage its state, selection, and animations.
 *
 * @element sp-top-nav
 *
 * @slot - Nav Items to display as a group
 *
 */
export class TopNav extends SizedMixin(SpectrumElement) {
  /**
   * Returns the styles to be applied to the component.
   */
  public static override get styles(): CSSResultArray {
    return [tabsSizes, tabStyles, ScaledIndicator.baseStyles()];
  }

  /**
   * The text direction of the component.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   */
  @property({ reflect: true })
  public override dir!: "ltr" | "rtl";

  /**
   * The label for the top navigation bar.
   */
  @property({ type: String })
  public label = "";

  /**
   * A space-separated list of parts of the URL to ignore when matching
   * for the "selected" Top Nav Item. Currently supported values are
   * `hash` and `search`, which will remove the `#hash` and
   * `?search=value` respectively.
   */
  @property({ attribute: "ignore-url-parts" })
  public ignoreURLParts = "";

  /**
   * The style for the selection indicator.
   */
  @property()
  public selectionIndicatorStyle = noSelectionStyle;

  /**
   * Indicates whether the selection indicator should animate.
   */
  @property({ attribute: false })
  public shouldAnimate = false;

  /**
   * The Top Nav is displayed without a border.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   */
  @property({ type: Boolean, reflect: true })
  public quiet = false;

  /**
   * Handles the click event on a Top Nav Item.
   *
   * This method sets the shouldAnimate flag to true and selects the clicked target.
   */
  private onClick = (event: Event): void => {
    const target = event.target as TopNavItem;

    this.shouldAnimate = true;
    this.selectTarget(target);
  };

  /**
   * The selected top navigation item.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   */
  @property({ reflect: true })
  public set selected(value: string | undefined) {
    const oldValue = this.selected;

    if (value === oldValue) {
      return;
    }

    this.updateCheckedState(value);
    this._selected = value;
    this.requestUpdate("selected", oldValue);
  }

  public get selected(): string | undefined {
    return this._selected;
  }

  private _selected!: string | undefined;

  /**
   * Query to select the slot element within the component.
   */
  @query("slot")
  private slotEl!: HTMLSlotElement;

  /**
   * Gets the items in the top navigation bar.
   */
  protected get items(): TopNavItem[] {
    return this._items;
  }

  /**
   * Sets the items in the top navigation bar.
   *
   * This method observes the new items for resize events and updates the internal items array.
   */
  protected set items(items: TopNavItem[]) {
    if (items === this.items) {
      return;
    }

    this._items.forEach((item) => {
      this.resizeController.unobserve(item);
    });
    items.forEach((item) => {
      this.resizeController.observe(item);
    });
    this._items = items;
  }

  /**
   * Internal array to store the top navigation items.
   */
  private _items: TopNavItem[] = [];

  /**
   * Controller to manage resize events for the items.
   */
  protected resizeController = new ResizeController(this, {
    callback: () => {
      this.updateSelectionIndicator();
    },
  });

  /**
   * Manages the items in the top navigation bar.
   *
   * This method filters the assigned elements to find top navigation items,
   * updates the items array, and selects the appropriate item based on the URL.
   */
  private manageItems(): void {
    // Get the assigned elements from the slot and filter for top navigation items.
    this.items = this.slotEl
      .assignedElements({ flatten: true })
      .filter((el) => el.localName === "sp-top-nav-item") as TopNavItem[];

    let { href } = window.location;
    const ignoredURLParts = this.ignoreURLParts.split(" ");

    // Remove the hash part of the URL if specified in ignoreURLParts.
    if (ignoredURLParts.includes("hash")) {
      href = href.replace(window.location.hash, "");
    }

    // Remove the search part of the URL if specified in ignoreURLParts.
    if (ignoredURLParts.includes("search")) {
      href = href.replace(window.location.search, "");
    }

    // Find the top navigation item that matches the current URL.
    const selectedChild = this.items.find((item) => item.value === href);

    if (selectedChild) {
      this.selectTarget(selectedChild);
    } else {
      this.selected = "";
    }
  }

  /**
   * Renders the content of the top navigation bar component.
   *
   * This method returns a template result containing the slot for nav items
   * and the selection indicator.
   */
  protected override render(): TemplateResult {
    return html`
      <div @click=${this.onClick} id="list">
        <slot @slotchange=${this.onSlotChange}></slot>
        <div
          id="selection-indicator"
          class=${ifDefined(this.shouldAnimate ? undefined : "first-position")}
          style=${this.selectionIndicatorStyle}
        ></div>
      </div>
    `;
  }

  /**
   * Lifecycle method called after the component's DOM has been rendered for the first time.
   *
   * This method sets up the initial attributes for the component.
   */
  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute("direction", "horizontal");
    this.setAttribute("role", "navigation");
  }

  /**
   * Lifecycle method called when the component updates.
   *
   * This method handles various tasks after the component updates, such as updating the
   * selection indicator, enabling animations, and setting the aria-label attribute.
   */
  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    // Update the selection indicator if the 'dir' property has changed.
    if (changes.has("dir")) {
      this.updateSelectionIndicator();
    }

    // Enable animations if the 'shouldAnimate' property has changed.
    if (
      !this.shouldAnimate &&
      typeof changes.get("shouldAnimate") !== "undefined"
    ) {
      this.shouldAnimate = true;
    }

    // Set or remove the aria-label attribute based on the 'label' property.
    if (
      changes.has("label") &&
      (this.label || typeof changes.get("label") !== "undefined")
    ) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }

  /**
   * Selects the target top navigation item.
   *
   * This method sets the selected value to the value of the target item.
   */
  private selectTarget(target: TopNavItem): void {
    const { value } = target;

    if (value) {
      this.selected = value;
    }
  }

  /**
   * Handles the slotchange event.
   *
   * This method manages the items in the top navigation bar when the slot content changes.
   */
  protected onSlotChange(): void {
    this.manageItems();
  }

  /**
   * Updates the checked state of the top navigation items.
   *
   * This method sets the selected state of the items based on the provided value.
   */
  protected updateCheckedState(value: string | undefined): void {
    // Deselect all items.
    this.items.forEach((item) => {
      item.selected = false;
    });

    // Use requestAnimationFrame to ensure the DOM is updated before selecting the item.
    requestAnimationFrame(() => {
      if (value && value.length) {
        // Find the item that matches the selected value or the current URL.
        const currentItem = this.items.find(
          (item) => item.value === value || item.value === window.location.href,
        );

        if (currentItem) {
          currentItem.selected = true;
        } else {
          this.selected = "";
        }
      }

      this.updateSelectionIndicator();
    });
  }

  /**
   * Updates the selection indicator.
   *
   * This method sets the style of the selection indicator based on the selected item.
   */
  private updateSelectionIndicator = async (): Promise<void> => {
    // Find the item that matches the selected value or the current URL.
    const selectedItem = this.items.find(
      (item) =>
        item.value === this.selected || item.value === window.location.href,
    );

    if (!selectedItem) {
      // Set the selection indicator style to no selection if no matching item is found.
      this.selectionIndicatorStyle = noSelectionStyle;

      return;
    }

    await Promise.all([
      selectedItem.updateComplete,
      document.fonts ? document.fonts.ready : Promise.resolve(),
    ]);

    const { width } = selectedItem.getBoundingClientRect();

    // Set the selection indicator style based on the selected item's position and width.
    this.selectionIndicatorStyle = ScaledIndicator.transformX(
      selectedItem.offsetLeft,
      width,
    );
  };

  /**
   * Lifecycle method called when the component is connected to the DOM.
   *
   * This method sets up event listeners for resize and font loading events.
   */
  public override connectedCallback(): void {
    super.connectedCallback();

    window.addEventListener("resize", this.updateSelectionIndicator);

    if ("fonts" in document) {
      document.fonts.addEventListener(
        "loadingdone",
        this.updateSelectionIndicator,
      );
    }
  }

  /**
   * Lifecycle method called when the component is disconnected from the DOM.
   *
   * This method removes event listeners for resize and font loading events.
   */
  public override disconnectedCallback(): void {
    window.removeEventListener("resize", this.updateSelectionIndicator);

    if ("fonts" in document) {
      (
        document as unknown as {
          fonts: {
            removeEventListener: (name: string, callback: () => void) => void;
          };
        }
      ).fonts.removeEventListener("loadingdone", this.updateSelectionIndicator);
    }

    super.disconnectedCallback();
  }
}
