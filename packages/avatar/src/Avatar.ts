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
  TemplateResult,
} from "@spectrum-web-components/base";
import {
  property,
  query,
} from "@spectrum-web-components/base/src/decorators.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { LikeAnchor } from "@spectrum-web-components/shared/src/like-anchor.js";
import { Focusable } from "@spectrum-web-components/shared/src/focusable.js";

import avatarStyles from "./avatar.css.js";
/**
 * Defines the possible sizes for the avatar.
 */
export type AvatarSize = 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700;

/**
 * List of valid avatar sizes.
 */
const validSizes: AvatarSize[] = [50, 75, 100, 200, 300, 400, 500, 600, 700];

/**
 * Default size for the avatar.
 */
const defaultSize = validSizes[2];

/**
 * @element sp-avatar
 */
export class Avatar extends LikeAnchor(Focusable) {
  public static override get styles(): CSSResultArray {
    return [avatarStyles];
  }

  @query("#link")
  anchorElement!: HTMLAnchorElement;

  public override get focusElement(): HTMLElement {
    return this.anchorElement || this;
  }

  /**
   * The source URL for the avatar image.
   */
  @property()
  public src = "";

  /**
   * The size of the avatar, which can be one of the predefined values.
   * The size is reflected as an attribute and defaults to `100` if an invalid size is provided.
   */
  @property({ type: Number, reflect: true })
  public get size(): AvatarSize {
    return this._size;
  }

  public set size(value: AvatarSize) {
    const size = value;
    const validSize = (
      validSizes.includes(size) ? size : defaultSize
    ) as AvatarSize;

    if (validSize) {
      this.setAttribute("size", `${validSize}`);
    }

    if (this._size === validSize) {
      return;
    }

    const oldSize = this._size;

    this._size = validSize;
    this.requestUpdate("size", oldSize);
  }

  private _size = defaultSize;

  /**
   * Renders the avatar template.
   * If the href property is set, renders the avatar as a link.
   * Otherwise, renders the avatar as an image.
   */
  protected override render(): TemplateResult {
    const avatar = html`
      <img
        class="image"
        alt=${ifDefined(this.label || undefined)}
        src=${this.src}
      />
    `;

    if (this.href) {
      return this.renderAnchor({
        id: "link",
        className: "link",
        anchorContent: avatar,
      });
    }

    return avatar;
  }

  /**
   * Called when the element is first updated.
   * Ensures the size attribute is set if it is not already present.
   */
  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    if (!this.hasAttribute("size")) {
      this.setAttribute("size", `${this.size}`);
    }
  }
}
