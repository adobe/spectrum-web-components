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
import {
  elementUpdated,
  expect,
  html,
  nextFrame,
  oneEvent,
} from '@open-wc/testing';

import { OverlayTrigger } from '@spectrum-web-components/overlay';

import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';

import { fixture } from '../../../test/testing-helpers.js';

describe('Overlay Trigger - ARIA attributes', () => {
  it('sets aria-expanded="false" when closed', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
  });

  it('sets aria-expanded="true" when opened and back to "false" on close', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');

    const opened = oneEvent(el, 'sp-opened');
    trigger.click();
    await opened;

    expect(trigger.getAttribute('aria-expanded')).to.equal('true');

    const closed = oneEvent(el, 'sp-closed');
    el.removeAttribute('open');
    await elementUpdated(el);
    await closed;

    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
  });

  it('sets aria-haspopup="dialog" by default', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');
  });

  it('does not overwrite consumer-set aria-haspopup', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger" aria-haspopup="menu">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('menu');
  });

  it('updates aria-haspopup when type changes and component manages it', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger type="auto" triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');

    el.type = 'modal';
    await elementUpdated(el);

    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');
  });

  it('sets aria-controls pointing to the content element id', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content" id="my-popover">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-controls')).to.equal('my-popover');
  });

  it('auto-generates an id on the content element when missing', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    const content = el.querySelector('[slot="click-content"]') as HTMLElement;

    expect(content.id).to.match(/^sp-overlay-content-/);
    expect(trigger.getAttribute('aria-controls')).to.equal(content.id);
  });

  it('preserves existing id on the content element', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content" id="custom-id">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const content = el.querySelector('[slot="click-content"]') as HTMLElement;
    expect(content.id).to.equal('custom-id');
  });

  it('does not set ARIA attributes for hover-only overlays', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="hover">
        <sp-button slot="trigger">Hover me</sp-button>
        <sp-tooltip slot="hover-content">Tooltip text</sp-tooltip>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.hasAttribute('aria-expanded')).to.be.false;
    expect(trigger.hasAttribute('aria-controls')).to.be.false;
  });

  it('cleans up ARIA attributes when content is removed', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
    expect(trigger.hasAttribute('aria-controls')).to.be.true;

    const popover = el.querySelector('[slot="click-content"]') as HTMLElement;
    popover.remove();
    await elementUpdated(el);
    await nextFrame();

    expect(trigger.hasAttribute('aria-expanded')).to.be.false;
    expect(trigger.hasAttribute('aria-controls')).to.be.false;
  });

  it('cleans up ARIA attributes on disconnect', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');

    el.remove();

    expect(trigger.hasAttribute('aria-expanded')).to.be.false;
    expect(trigger.hasAttribute('aria-haspopup')).to.be.false;
    expect(trigger.hasAttribute('aria-controls')).to.be.false;
  });

  it('cleans up old trigger when trigger element changes', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger" id="first-trigger">First</sp-button>
        <sp-popover slot="click-content">Content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const firstTrigger = el.querySelector('#first-trigger') as HTMLElement;
    expect(firstTrigger.getAttribute('aria-expanded')).to.equal('false');

    firstTrigger.remove();
    const newButton = document.createElement('sp-button');
    newButton.id = 'second-trigger';
    newButton.slot = 'trigger';
    newButton.textContent = 'Second';
    el.prepend(newButton);
    await elementUpdated(el);
    await nextFrame();
    await nextFrame();

    expect(firstTrigger.hasAttribute('aria-expanded')).to.be.false;
    expect(firstTrigger.hasAttribute('aria-haspopup')).to.be.false;

    expect(newButton.getAttribute('aria-expanded')).to.equal('false');
    expect(newButton.getAttribute('aria-haspopup')).to.equal('dialog');
  });

  it('works with longpress content', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="longpress">
        <sp-button slot="trigger">Long press me</sp-button>
        <sp-popover slot="longpress-content">Longpress content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');
    expect(trigger.hasAttribute('aria-controls')).to.be.true;
  });

  it('sets aria-expanded for modal type overlays', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger type="modal" triggered-by="click">
        <sp-button slot="trigger">Open modal</sp-button>
        <sp-popover slot="click-content">Modal content</sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');

    const opened = oneEvent(el, 'sp-opened');
    trigger.click();
    await opened;

    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
  });

  it('does not strip consumer-authored ARIA on hover-only triggers', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="hover">
        <sp-button
          slot="trigger"
          aria-expanded="true"
          aria-controls="external-panel"
        >
          Hover me
        </sp-button>
        <sp-tooltip slot="hover-content">Tooltip text</sp-tooltip>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');
    expect(trigger.getAttribute('aria-controls')).to.equal('external-panel');
  });

  it('switches aria-controls to longpress content when longpress is open', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click longpress">
        <sp-button slot="trigger">Trigger</sp-button>
        <sp-popover slot="click-content" id="click-panel">
          Click content
        </sp-popover>
        <sp-popover slot="longpress-content" id="longpress-panel">
          Longpress content
        </sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-controls')).to.equal('click-panel');

    el.open = 'longpress';
    await elementUpdated(el);

    expect(trigger.getAttribute('aria-controls')).to.equal('longpress-panel');

    el.open = 'click';
    await elementUpdated(el);

    expect(trigger.getAttribute('aria-controls')).to.equal('click-panel');
  });

  it('sets aria-haspopup="dialog" when content has role="dialog"', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open dialog</sp-button>
        <div slot="click-content" role="dialog">Dialog content</div>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');
  });

  it('sets aria-haspopup="menu" when content has role="menu"', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open menu</sp-button>
        <div slot="click-content" role="menu">Menu content</div>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('menu');
  });

  it('sets aria-haspopup="listbox" when content has role="listbox"', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open listbox</sp-button>
        <div slot="click-content" role="listbox">Listbox content</div>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('listbox');
  });

  it('detects role from first child when content wrapper has no role', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">
          <div role="menu">Menu inside popover</div>
        </sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('menu');
  });

  it('defaults to "dialog" when content has no recognized role', async () => {
    const el = await fixture<OverlayTrigger>(html`
      <overlay-trigger triggered-by="click">
        <sp-button slot="trigger">Open</sp-button>
        <sp-popover slot="click-content">
          <div>Plain content with no role</div>
        </sp-popover>
      </overlay-trigger>
    `);
    await elementUpdated(el);
    await nextFrame();

    const trigger = el.querySelector('[slot="trigger"]') as HTMLElement;
    expect(trigger.getAttribute('aria-haspopup')).to.equal('dialog');
  });
});
