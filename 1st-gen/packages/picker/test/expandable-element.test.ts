/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {
  elementUpdated,
  expect,
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';

import {
  css,
  CSSResultArray,
  TemplateResult,
} from '@spectrum-web-components/base';
import { customElement } from '@spectrum-web-components/base/src/decorators.js';
import { ExpandableElement } from '@spectrum-web-components/picker';

import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';

/**
 * Minimal test component that extends ExpandableElement.
 * This validates that any subclass can properly open and close
 * using the base class methods (toggle, close, open property).
 */
@customElement('test-expandable-element')
class TestExpandableElement extends ExpandableElement {
  public static override get styles(): CSSResultArray {
    return [
      css`
        :host {
          display: inline-block;
        }
        button {
          padding: 8px 16px;
          cursor: pointer;
        }
      `,
    ];
  }

  protected override render(): TemplateResult {
    return html`
      <button
        id="button"
        aria-expanded=${this.open ? 'true' : 'false'}
        aria-haspopup="true"
        ?disabled=${this.disabled}
      >
        Test Button
      </button>
      <sp-overlay
        .open=${this.open}
        .triggerElement=${this}
        placement=${this.placement}
        @beforetoggle=${this.handleBeforetoggle}
      >
        <sp-popover>
          <sp-menu id="menu">
            <slot></slot>
          </sp-menu>
        </sp-popover>
      </sp-overlay>
    `;
  }

  public override connectedCallback(): void {
    super.connectedCallback?.();
    this.updateComplete.then(() => {
      this.bindEvents();
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-expandable-element': TestExpandableElement;
  }
}

describe('ExpandableElement', () => {
  describe('open property', () => {
    it('is false by default', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.open).to.be.false;
    });

    it('can be set to true to open', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);

      expect(el.open).to.be.true;
    });

    it('can be set to false to close', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);
      expect(el.open).to.be.true;

      el.open = false;
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });

    it('reflects to attribute', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.hasAttribute('open')).to.be.false;

      el.open = true;
      await elementUpdated(el);
      expect(el.hasAttribute('open')).to.be.true;

      el.open = false;
      await elementUpdated(el);
      expect(el.hasAttribute('open')).to.be.false;
    });
  });

  describe('close() method', () => {
    it('closes when open', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);
      expect(el.open).to.be.true;

      el.close();
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });

    it('has no effect when already closed', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      el.close();
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });

    it('does not close when readonly', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element readonly>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      // Manually set open (bypassing toggle which respects readonly)
      el.open = true;
      await elementUpdated(el);
      expect(el.open, 'should be open').to.be.true;

      el.close();
      await elementUpdated(el);
      expect(el.open, 'should still be open due to readonly').to.be.true;
    });

    it('opens and closes programmatically', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      // Ensure strategy is bound
      el.bindEvents();
      await elementUpdated(el);

      const open = oneEvent(el, 'sp-opened');
      el.open = true;
      await open;

      const closed = oneEvent(el, 'sp-closed');
      el.close();
      await closed;
      expect(el.open, 'should be closed').to.be.false;
    });
  });

  describe('toggle() method', () => {
    it('toggles from closed to open', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      el.toggle();
      await elementUpdated(el);
      expect(el.open).to.be.true;
    });

    it('toggles from open to closed', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);
      expect(el.open).to.be.true;

      el.toggle();
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });

    it('accepts explicit true to open', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.toggle(true);
      await elementUpdated(el);
      expect(el.open).to.be.true;

      // Calling toggle(true) when already open should keep it open
      el.toggle(true);
      await elementUpdated(el);
      expect(el.open).to.be.true;
    });

    it('accepts explicit false to close', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);

      el.toggle(false);
      await elementUpdated(el);
      expect(el.open).to.be.false;

      // Calling toggle(false) when already closed should keep it closed
      el.toggle(false);
      await elementUpdated(el);
      expect(el.open).to.be.false;
    });

    it('syncs strategy open state', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      // Ensure strategy is bound
      el.bindEvents();
      await elementUpdated(el);

      const opened = oneEvent(el, 'sp-opened');
      el.toggle();
      await opened;
      expect(el.open, 'should open after toggle').to.be.true;
      expect(el.strategy?.open, 'strategy should be open').to.be.equal(true);

      const closed = oneEvent(el, 'sp-closed');
      el.toggle();
      await closed;
      expect(el.open, 'should close after second toggle').to.be.false;
      expect(el.strategy?.open, 'strategy should be open').to.be.equal(false);
    });
  });

  describe('disabled state', () => {
    it('prevents toggle when disabled', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element disabled>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      el.toggle();
      await elementUpdated(el);
      expect(el.open, 'should remain closed when disabled').to.be.false;
    });

    it('prevents explicit toggle(true) when disabled', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element disabled>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.toggle(true);
      await elementUpdated(el);
      expect(
        el.open,
        'should remain closed when disabled even with explicit true'
      ).to.be.false;
    });

    it('disabled attribute reflects to property', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element disabled>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.disabled).to.be.true;
    });
  });

  describe('readonly state', () => {
    it('prevents toggle when readonly', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element readonly>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      el.toggle();
      await elementUpdated(el);
      expect(el.open, 'should remain closed when readonly').to.be.false;
    });

    it('readonly attribute reflects to property', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element readonly>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.readonly).to.be.true;
    });
  });

  describe('pending state', () => {
    it('prevents toggle when pending', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element pending>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.open).to.be.false;
      el.toggle();
      await elementUpdated(el);
      expect(el.open, 'should remain closed when pending').to.be.false;
    });

    it('pending attribute reflects to property', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element pending>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.pending).to.be.true;
    });
  });

  describe('bindEvents()', () => {
    it('creates a strategy when called', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      // Strategy should be created from connectedCallback
      expect(el.strategy, 'strategy should exist').to.exist;
    });

    it('aborts previous strategy when called again', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      const originalStrategy = el.strategy;

      // Call bindEvents again
      el.bindEvents();
      await elementUpdated(el);

      expect(el.strategy, 'new strategy should exist after rebind').to.exist;
      expect(el.strategy, 'should be a new strategy instance').to.not.equal(
        originalStrategy
      );
    });
  });

  describe('focusElement', () => {
    it('returns button when closed', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.focusElement).to.equal(el.button);
    });

    it('returns optionsMenu when open', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);

      expect(el.focusElement).to.equal(el.optionsMenu);
    });
  });

  describe('button reference', () => {
    it('has a button element via @query', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.button, 'button should exist').to.exist;
      expect(el.button.tagName).to.equal('BUTTON');
      expect(el.button.id).to.equal('button');
    });
  });

  describe('disconnectedCallback', () => {
    it('closes the overlay when disconnected', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.open = true;
      await elementUpdated(el);
      expect(el.open).to.be.true;

      // Remove from DOM
      el.remove();

      // After disconnection, open should be false
      expect(el.open, 'should be closed after disconnection').to.be.false;
    });
  });

  describe('placement property', () => {
    it('has default placement of bottom-start', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.placement).to.equal('bottom-start');
    });

    it('can be set to a different placement', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element placement="top-end">
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.placement).to.equal('top-end');
    });
  });

  describe('focused property', () => {
    it('is false by default', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.focused).to.be.false;
    });

    it('can be set programmatically', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      el.focused = true;
      await elementUpdated(el);
      expect(el.focused).to.be.true;
      expect(el.hasAttribute('focused')).to.be.true;
    });
  });

  describe('forcePopover property', () => {
    it('is false by default', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.forcePopover).to.be.false;
    });

    it('can be set via attribute', async () => {
      const el = await fixture<TestExpandableElement>(html`
        <test-expandable-element force-popover>
          <sp-menu-item value="option-1">Option 1</sp-menu-item>
        </test-expandable-element>
      `);
      await elementUpdated(el);

      expect(el.forcePopover).to.be.true;
    });
  });
});
