/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import {
  RadioController,
  radioControllerSelectionChange,
  type RadioControllerSelectionChangeDetail,
} from '../index.js';
import radioMeta from '../stories/radio-controller.stories.js';

const FIXTURE_TAG = 'test-radio-controller-fixture';

const FIXTURE_DISABLED_TAG = 'test-radio-controller-disabled-fixture';

const FIXTURE_TOGGLE_TAG = 'test-radio-controller-toggle-fixture';

const FIXTURE_DEFAULT_FIRST_ONCHANGE_TAG =
  'test-radio-default-first-onchange-fixture';

/**
 * Three shadow `role="radio"` buttons; tests assert callback wiring and pointer selection only.
 */
@customElement(FIXTURE_TAG)
export class TestRadioControllerFixture extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    button {
      font: inherit;
      margin-inline-end: 0.25rem;
    }
  `;

  /** Increments whenever the controller re-queries participants via `getItems`. */
  getItemsCallCount = 0;

  readonly selectCalls: HTMLElement[] = [];

  readonly deselectCalls: HTMLElement[] = [];

  private readonly radio = new RadioController(this, {
    getItems: () => {
      this.getItemsCallCount += 1;
      return Array.from(
        this.renderRoot.querySelectorAll<HTMLElement>('[data-item]')
      );
    },
    selectItem: (item) => {
      this.selectCalls.push(item);
      item.setAttribute('aria-checked', 'true');
    },
    deselectItem: (item) => {
      this.deselectCalls.push(item);
      item.setAttribute('aria-checked', 'false');
    },
    defaultToFirstSelectable: false,
  });

  getRadioController(): RadioController {
    return this.radio;
  }

  clearCallLogs(): void {
    this.selectCalls.length = 0;
    this.deselectCalls.length = 0;
  }

  protected override firstUpdated(): void {
    this.radio.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button" data-item role="radio" aria-checked="false">
        A
      </button>
      <button type="button" data-item role="radio" aria-checked="false">
        B
      </button>
      <button type="button" data-item role="radio" aria-checked="false">
        C
      </button>
    `;
  }
}

/**
 * A native **disabled** middle control and an **`aria-disabled="true"`** third control.
 */
@customElement(FIXTURE_DISABLED_TAG)
export class TestRadioControllerDisabledFixture extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    button {
      font: inherit;
      margin-inline-end: 0.25rem;
    }
  `;

  private readonly radio = new RadioController(this, {
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('[data-item]')),
    selectItem: (item) => item.setAttribute('aria-checked', 'true'),
    deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: false,
  });

  getRadioController(): RadioController {
    return this.radio;
  }

  protected override firstUpdated(): void {
    this.radio.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button" data-item role="radio" aria-checked="false">
        A
      </button>
      <button
        type="button"
        data-item
        role="radio"
        disabled
        aria-checked="false"
      >
        B
      </button>
      <button
        type="button"
        data-item
        role="radio"
        aria-disabled="true"
        aria-checked="false"
      >
        C
      </button>
    `;
  }
}

/**
 * Same three radios as {@link TestRadioControllerFixture}, with **`toggles: true`** so
 * **`setSelectedItem(null)`**, **`toggleItem`** on the active control, and a click on the active
 * control can clear selection.
 */
@customElement(FIXTURE_TOGGLE_TAG)
export class TestRadioControllerToggleFixture extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    button {
      font: inherit;
      margin-inline-end: 0.25rem;
    }
  `;

  private readonly radio = new RadioController(this, {
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('[data-item]')),
    selectItem: (item) => item.setAttribute('aria-checked', 'true'),
    deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
    toggles: true,
    defaultToFirstSelectable: false,
  });

  getRadioController(): RadioController {
    return this.radio;
  }

  protected override firstUpdated(): void {
    this.radio.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button" data-item role="radio" aria-checked="false">
        A
      </button>
      <button type="button" data-item role="radio" aria-checked="false">
        B
      </button>
      <button type="button" data-item role="radio" aria-checked="false">
        C
      </button>
    `;
  }
}

/**
 * Three radios with **`defaultToFirstSelectable: true`**, **`toggles: true`**, and
 * **`onSelectionChange`** that records each **`selectedItem`** for assertions.
 */
@customElement(FIXTURE_DEFAULT_FIRST_ONCHANGE_TAG)
export class TestRadioDefaultFirstOnChangeFixture extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    button {
      font: inherit;
      margin-inline-end: 0.25rem;
    }
  `;

  /** Each **`selectedItem`** passed to **`onSelectionChange`**, in order. */
  readonly selectionLog: Array<HTMLElement | null> = [];

  private readonly radio = new RadioController(this, {
    getItems: () =>
      Array.from(this.renderRoot.querySelectorAll<HTMLElement>('[data-item]')),
    selectItem: (item) => item.setAttribute('aria-checked', 'true'),
    deselectItem: (item) => item.setAttribute('aria-checked', 'false'),
    defaultToFirstSelectable: true,
    toggles: true,
    onSelectionChange: (detail: RadioControllerSelectionChangeDetail) => {
      this.selectionLog.push(detail.selectedItem);
    },
  });

  getRadioController(): RadioController {
    return this.radio;
  }

  clearSelectionLog(): void {
    this.selectionLog.length = 0;
  }

  protected override firstUpdated(): void {
    this.radio.refresh();
  }

  protected override render(): TemplateResult {
    return html`
      <button type="button" data-item role="radio" aria-checked="false">
        A
      </button>
      <button type="button" data-item role="radio" aria-checked="false">
        B
      </button>
      <button type="button" data-item role="radio" aria-checked="false">
        C
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [FIXTURE_TAG]: TestRadioControllerFixture;
    [FIXTURE_DISABLED_TAG]: TestRadioControllerDisabledFixture;
    [FIXTURE_TOGGLE_TAG]: TestRadioControllerToggleFixture;
    [FIXTURE_DEFAULT_FIRST_ONCHANGE_TAG]: TestRadioDefaultFirstOnChangeFixture;
  }
}

export default {
  ...radioMeta,
  title: 'Radio controller/Tests',
  parameters: {
    ...radioMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

function fixtureRender() {
  return html`
    <test-radio-controller-fixture></test-radio-controller-fixture>
  `;
}

function defaultFirstOnChangeFixtureRender() {
  return html`
    <test-radio-default-first-onchange-fixture></test-radio-default-first-onchange-fixture>
  `;
}

/** `getItems` runs during `refresh` on connect and returns the three `[data-item]` controls. */

export const GetItemsSuppliesParticipants: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );

    expect(host.getItemsCallCount).toBeGreaterThan(0);
    const listed = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );
    expect(listed).toHaveLength(3);
  },
};

/** `setSelectedItem` calls `selectItem` on the target and `deselectItem` on every other item. */

export const SetSelectedItemInvokesSelectAndDeselectCallbacks: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );
    const middle = buttons[1]!;

    host.clearCallLogs();
    host.getRadioController().setSelectedItem(middle);

    expect(host.selectCalls).toEqual([middle]);
    expect(host.deselectCalls).toEqual([buttons[0]!, buttons[2]!]);
  },
};

/** `selectItem` / `deselectItem` leave exactly one `aria-checked="true"` after `setSelectedItem`. */

export const SetSelectedItemLeavesSingleAriaChecked: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[2]!);

    expect(buttons[2]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('false');
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');
    expect(
      buttons.filter((b) => b.getAttribute('aria-checked') === 'true').length
    ).toBe(1);
  },
};

/** Primary click selects that control and clears the others. */

export const ClickSelectsExclusive: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[0]!);
    await host.updateComplete;

    buttons[2]!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await host.updateComplete;

    expect(buttons[2]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('false');
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');
    expect(
      buttons.filter((b) => b.getAttribute('aria-checked') === 'true').length
    ).toBe(1);
  },
};

function disabledFixtureRender() {
  return html`
    <test-radio-controller-disabled-fixture></test-radio-controller-disabled-fixture>
  `;
}

/** `setSelectedItem` returns false for `disabled` and `aria-disabled` controls. */

export const DisabledParticipantsRejectSetSelected: Story = {
  render: disabledFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerDisabledFixture>(
      canvasElement,
      FIXTURE_DISABLED_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );
    const [first, nativeDisabled, ariaDisabled] = buttons;

    expect(host.getRadioController().setSelectedItem(first!)).toBe(true);
    expect(host.getRadioController().setSelectedItem(nativeDisabled!)).toBe(
      false
    );
    expect(host.getRadioController().setSelectedItem(ariaDisabled!)).toBe(
      false
    );
    expect(first?.getAttribute('aria-checked')).toBe('true');
    expect(nativeDisabled?.getAttribute('aria-checked')).toBe('false');
    expect(ariaDisabled?.getAttribute('aria-checked')).toBe('false');
  },
};

/** Primary click on an `aria-disabled` control does not move selection. */

export const AriaDisabledClickDoesNotChangeSelection: Story = {
  render: disabledFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerDisabledFixture>(
      canvasElement,
      FIXTURE_DISABLED_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[0]!);
    await host.updateComplete;

    buttons[2]!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await host.updateComplete;

    expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[2]?.getAttribute('aria-checked')).toBe('false');
  },
};

function toggleFixtureRender() {
  return html`
    <test-radio-controller-toggle-fixture></test-radio-controller-toggle-fixture>
  `;
}

/** `toggleItem` on the active control is a no-op when **`toggles`** is **`false`**. */

export const ToggleItemNoOpWhenAlreadySelectedWithoutToggles: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[0]!);
    await host.updateComplete;

    expect(host.getRadioController().toggleItem(buttons[0]!)).toBe(false);
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
  },
};

/** `setSelectedItem(null)` returns false when **`toggles`** is **`false`**. */

export const SetNullRejectedWhenTogglesFalse: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[0]!);
    await host.updateComplete;

    expect(host.getRadioController().setSelectedItem(null)).toBe(false);
    expect(host.getRadioController().getSelectedItem()).toBe(buttons[0]!);
  },
};

/** `toggleItem` selects a different control when it is not yet active. */

export const ToggleItemSelectsWhenInactive: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    expect(host.getRadioController().toggleItem(buttons[1]!)).toBe(true);
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('false');
  },
};

/** With **`toggles: true`**, `toggleItem` on the active control clears every `aria-checked`. */

export const ToggleItemClearsWhenTogglesTrue: Story = {
  render: toggleFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerToggleFixture>(
      canvasElement,
      FIXTURE_TOGGLE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[0]!);
    await host.updateComplete;

    expect(host.getRadioController().toggleItem(buttons[0]!)).toBe(true);
    await host.updateComplete;

    expect(
      buttons.every((b) => b.getAttribute('aria-checked') === 'false')
    ).toBe(true);
    expect(host.getRadioController().getSelectedItem()).toBeNull();
  },
};

/** `setSelectedItem(null)` succeeds with only **`toggles: true`**. */

export const SetNullAllowedWhenTogglesTrue: Story = {
  render: toggleFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerToggleFixture>(
      canvasElement,
      FIXTURE_TOGGLE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[2]!);
    await host.updateComplete;

    expect(host.getRadioController().setSelectedItem(null)).toBe(true);
    expect(host.getRadioController().getSelectedItem()).toBeNull();
  },
};

/** Primary click on the active control clears selection when **`toggles`** is **`true`**. */

export const ClickActiveClearsWhenTogglesTrue: Story = {
  render: toggleFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerToggleFixture>(
      canvasElement,
      FIXTURE_TOGGLE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[1]!);
    await host.updateComplete;

    buttons[1]!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await host.updateComplete;

    expect(
      buttons.every((b) => b.getAttribute('aria-checked') === 'false')
    ).toBe(true);
    expect(host.getRadioController().getSelectedItem()).toBeNull();
  },
};

/** Primary click on the active control does not clear when **`toggles`** is **`false`**. */

export const ClickActiveDoesNotClearWhenTogglesFalse: Story = {
  render: fixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerFixture>(
      canvasElement,
      FIXTURE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    host.getRadioController().setSelectedItem(buttons[1]!);
    await host.updateComplete;

    buttons[1]!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await host.updateComplete;

    expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
    expect(host.getRadioController().getSelectedItem()).toBe(buttons[1]!);
  },
};

/** `setOptions({ toggles })` toggles whether **`setSelectedItem(null)`** can clear without reconstructing the controller. */

export const SetOptionsTogglesEnablesAndDisablesClear: Story = {
  render: toggleFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerToggleFixture>(
      canvasElement,
      FIXTURE_TOGGLE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );
    const radio = host.getRadioController();

    radio.setSelectedItem(buttons[0]!);
    await host.updateComplete;

    radio.setOptions({ toggles: false });
    expect(radio.setSelectedItem(null)).toBe(false);
    expect(radio.getSelectedItem()).toBe(buttons[0]!);

    radio.setOptions({ toggles: true });
    expect(radio.setSelectedItem(null)).toBe(true);
    expect(radio.getSelectedItem()).toBeNull();
  },
};

/** Clearing via **`toggleItem`** dispatches **`radioControllerSelectionChange`** with **`null`**. */

export const SelectionChangeEventWhenClearedViaToggleItem: Story = {
  render: toggleFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerToggleFixture>(
      canvasElement,
      FIXTURE_TOGGLE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );
    const radio = host.getRadioController();

    let last: RadioControllerSelectionChangeDetail | undefined;
    host.addEventListener(radioControllerSelectionChange, ((event: Event) => {
      last = (event as CustomEvent<RadioControllerSelectionChangeDetail>)
        .detail;
    }) as EventListener);

    radio.setSelectedItem(buttons[0]!);
    await host.updateComplete;

    expect(radio.toggleItem(buttons[0]!)).toBe(true);
    await host.updateComplete;

    expect(last?.selectedItem).toBeNull();
  },
};

/** After clearing with **`toggles`**, a primary click selects again. */

export const ClearThenPrimaryClickReselectsWhenTogglesTrue: Story = {
  render: toggleFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioControllerToggleFixture>(
      canvasElement,
      FIXTURE_TOGGLE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );
    const radio = host.getRadioController();

    radio.setSelectedItem(buttons[0]!);
    await host.updateComplete;
    expect(radio.toggleItem(buttons[0]!)).toBe(true);
    await host.updateComplete;
    expect(radio.getSelectedItem()).toBeNull();

    buttons[2]!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await host.updateComplete;

    expect(buttons[2]?.getAttribute('aria-checked')).toBe('true');
    expect(radio.getSelectedItem()).toBe(buttons[2]!);
  },
};

/** With **`defaultToFirstSelectable`**, **`refresh`** asserts the first eligible control. */

export const DefaultFirstSelectableSelectsFirstOnConnect: Story = {
  render: defaultFirstOnChangeFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioDefaultFirstOnChangeFixture>(
      canvasElement,
      FIXTURE_DEFAULT_FIRST_ONCHANGE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');
    expect(buttons[2]?.getAttribute('aria-checked')).toBe('false');
    expect(host.getRadioController().getSelectedItem()).toBe(buttons[0]!);
  },
};

/** **`onSelectionChange`** runs when the default-first selection is applied and on each later change. */

export const OnSelectionChangeReceivesDetailAfterDefaultAndOnClick: Story = {
  render: defaultFirstOnChangeFixtureRender,
  play: async ({ canvasElement }) => {
    const host = await getComponent<TestRadioDefaultFirstOnChangeFixture>(
      canvasElement,
      FIXTURE_DEFAULT_FIRST_ONCHANGE_TAG
    );
    const buttons = Array.from(
      host.shadowRoot!.querySelectorAll<HTMLButtonElement>('[data-item]')
    );

    expect(host.selectionLog).toEqual([buttons[0]!]);

    buttons[1]!.dispatchEvent(
      new MouseEvent('click', { bubbles: true, composed: true })
    );
    await host.updateComplete;

    expect(host.selectionLog).toEqual([buttons[0]!, buttons[1]!]);
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');
  },
};
