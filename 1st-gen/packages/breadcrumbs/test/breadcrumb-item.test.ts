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
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';

import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';

import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { BreadcrumbItem, BreadcrumbSelectDetail } from '../src/index.js';

describe('Breadcrumb Item', () => {
  testForLitDevWarnings(
    async () =>
      await fixture<BreadcrumbItem>(html`
        <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
      `)
  );
  it('should render accessibly', async () => {
    const el = await fixture<BreadcrumbItem>(html`
      <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
    `);

    expect(el.getAttribute('role')).to.equal('listitem');
  });

  it('should render a disabled item', async () => {
    const el = await fixture<BreadcrumbItem>(html`
      <sp-breadcrumb-item value="home" disabled>Home</sp-breadcrumb-item>
    `);
    expect(el.hasAttribute('aria-disabled')).to.be.true;
  });

  it('should manage aria-current', async () => {
    const el = await fixture<BreadcrumbItem>(html`
      <sp-breadcrumbs>
        <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
        <sp-breadcrumb-item value="products">Products</sp-breadcrumb-item>
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const currentItem = el.querySelector(
      'sp-breadcrumb-item:nth-child(2)'
    ) as BreadcrumbItem;
    const otherItem = el.querySelector(
      'sp-breadcrumb-item:nth-child(1)'
    ) as BreadcrumbItem;

    await elementUpdated(currentItem);
    await elementUpdated(otherItem);

    expect(currentItem.focusElement.hasAttribute('aria-current'), 'current').to
      .be.true;
    expect(otherItem.focusElement.hasAttribute('aria-current'), 'other').to.be
      .false;
  });

  it('should not emit change event if element is the last one', async () => {
    const changeSpy = spy();
    const el = await fixture<BreadcrumbItem>(html`
      <sp-breadcrumb-item
        isLastOfType
        @breadcrumb-select=${(event: CustomEvent<BreadcrumbSelectDetail>) =>
          changeSpy(event.detail.value)}
        value="https://adobe.com/home"
      >
        Home
      </sp-breadcrumb-item>
    `);

    await elementUpdated(el);

    el.click();
    expect(changeSpy.callCount).to.equal(0);
  });

  it('should emit change event if href is not provided and element is not the last one', async () => {
    const changeSpy = spy();
    const el = await fixture<BreadcrumbItem>(html`
      <sp-breadcrumb-item
        @breadcrumb-select=${(event: CustomEvent<BreadcrumbSelectDetail>) =>
          changeSpy(event.detail.value)}
        value="home"
      >
        Home
      </sp-breadcrumb-item>
    `);

    await elementUpdated(el);

    el.click();
    expect(changeSpy.callCount).to.equal(1);
    expect(changeSpy).to.have.been.calledWith('home');
  });

  it('scopes a per-item `dir` override to `#item-link`, not its own layout', async () => {
    const el = await fixture<HTMLElement>(html`
      <sp-breadcrumbs>
        <sp-breadcrumb-item value="he" lang="he" dir="rtl">
          עברית
        </sp-breadcrumb-item>
        <sp-breadcrumb-item value="en">English</sp-breadcrumb-item>
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const rtlItem = el.querySelector(
      'sp-breadcrumb-item[value="he"]'
    ) as BreadcrumbItem;
    await elementUpdated(rtlItem);

    // The host's own box keeps the ambient (LTR) direction, so its
    // separator does not mirror out of step with its LTR siblings.
    expect(getComputedStyle(rtlItem).direction, 'host direction').to.equal(
      'ltr'
    );

    // Only the link carrying the item's text picks up the override.
    const itemLink = rtlItem.shadowRoot.querySelector(
      '#item-link'
    ) as HTMLElement;
    expect(itemLink.dir, 'item-link dir').to.equal('rtl');
    expect(itemLink.lang, 'item-link lang').to.equal('he');
    expect(
      getComputedStyle(itemLink).direction,
      'item-link direction'
    ).to.equal('rtl');
  });

  it('mirrors the separator to match the ancestor dir, or the document default otherwise', async () => {
    const el = await fixture<HTMLDivElement>(html`
      <div>
        <sp-breadcrumbs dir="rtl">
          <sp-breadcrumb-item value="a">A</sp-breadcrumb-item>
          <sp-breadcrumb-item value="b">B</sp-breadcrumb-item>
        </sp-breadcrumbs>
        <sp-breadcrumbs>
          <sp-breadcrumb-item value="c">C</sp-breadcrumb-item>
          <sp-breadcrumb-item value="d">D</sp-breadcrumb-item>
        </sp-breadcrumbs>
      </div>
    `);

    await elementUpdated(el);

    const rtlItem = el.querySelector(
      'sp-breadcrumbs[dir="rtl"] sp-breadcrumb-item[value="a"]'
    ) as BreadcrumbItem;
    await elementUpdated(rtlItem);

    const rtlSeparator = rtlItem.shadowRoot.querySelector(
      '#separator'
    ) as HTMLElement;
    expect(
      getComputedStyle(rtlSeparator).transform,
      'separator mirrors under a dir="rtl" ancestor'
    ).to.not.equal('none');

    const defaultItem = el.querySelector(
      'sp-breadcrumbs:not([dir]) sp-breadcrumb-item[value="c"]'
    ) as BreadcrumbItem;
    await elementUpdated(defaultItem);

    const defaultSeparator = defaultItem.shadowRoot.querySelector(
      '#separator'
    ) as HTMLElement;
    expect(
      getComputedStyle(defaultSeparator).transform,
      'separator matches the document default (ltr) absent an ancestor dir'
    ).to.equal('none');
  });

  it('does not mirror the separator for a single item whose own dir mismatches the ambient direction', async () => {
    const el = await fixture<HTMLElement>(html`
      <sp-breadcrumbs>
        <sp-breadcrumb-item value="he" lang="he" dir="rtl">
          עברית
        </sp-breadcrumb-item>
        <sp-breadcrumb-item value="en">English</sp-breadcrumb-item>
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const mismatchedItem = el.querySelector(
      'sp-breadcrumb-item[value="he"]'
    ) as BreadcrumbItem;
    await elementUpdated(mismatchedItem);

    // `:dir()` resolves via the attribute chain, so absent the explicit
    // `dir` set on `#separator` in `renderSeparator()` it would incorrectly
    // pick up this host's own `dir="rtl"` (meant only for `#item-link`).
    const separator = mismatchedItem.shadowRoot.querySelector(
      '#separator'
    ) as HTMLElement;
    expect(separator.getAttribute('dir'), 'separator dir attribute').to.equal(
      'ltr'
    );
    expect(
      getComputedStyle(separator).transform,
      'separator stays unmirrored, matching its ltr siblings'
    ).to.equal('none');
  });

  it('updates the separator when an ancestor dir changes after the item has mounted', async () => {
    const el = await fixture<HTMLElement>(html`
      <sp-breadcrumbs>
        <sp-breadcrumb-item value="a">A</sp-breadcrumb-item>
        <sp-breadcrumb-item value="b">B</sp-breadcrumb-item>
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const item = el.querySelector(
      'sp-breadcrumb-item[value="a"]'
    ) as BreadcrumbItem;
    await elementUpdated(item);

    const separator = item.shadowRoot.querySelector(
      '#separator'
    ) as HTMLElement;
    expect(
      getComputedStyle(separator).transform,
      'unmirrored before the ancestor sets dir="rtl"'
    ).to.equal('none');

    el.setAttribute('dir', 'rtl');
    await elementUpdated(item);
    // The ancestor MutationObserver triggers `requestUpdate()`, which is
    // async relative to the attribute mutation itself.
    await item.updateComplete;

    expect(
      getComputedStyle(separator).transform,
      'mirrored once the ancestor dir changes after mount'
    ).to.not.equal('none');
  });

  it("updates #item-link when this item's own lang/dir change after mount", async () => {
    const el = await fixture<BreadcrumbItem>(html`
      <sp-breadcrumb-item value="home">Home</sp-breadcrumb-item>
    `);

    await elementUpdated(el);

    const itemLink = el.shadowRoot.querySelector('#item-link') as HTMLElement;
    expect(itemLink.lang, 'no lang before it is set').to.equal('');
    expect(itemLink.dir, 'no dir before it is set').to.equal('');

    el.setAttribute('lang', 'he');
    el.setAttribute('dir', 'rtl');
    await el.updateComplete;

    expect(itemLink.lang, 'lang updates after mount').to.equal('he');
    expect(itemLink.dir, 'dir updates after mount').to.equal('rtl');

    el.removeAttribute('lang');
    el.removeAttribute('dir');
    await el.updateComplete;

    expect(itemLink.lang, 'lang clears after being removed').to.equal('');
    expect(itemLink.dir, 'dir clears after being removed').to.equal('');
  });
});
