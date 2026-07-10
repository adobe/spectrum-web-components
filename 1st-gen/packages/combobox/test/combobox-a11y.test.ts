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
import {
  a11ySnapshot,
  findAccessibilityNode,
  sendKeys,
} from '@web/test-runner-commands';

import { Combobox } from '@spectrum-web-components/combobox';
import { MenuItem } from '@spectrum-web-components/menu';
import { isWebKit } from '@spectrum-web-components/shared';

import '@spectrum-web-components/combobox/sp-combobox.js';

import { fixture } from '../../../test/testing-helpers.js';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import {
  withFieldLabel,
  withHelpText,
  withTooltip,
} from '../stories/combobox.stories.js';
import type { AccessibleNamedNode, TestableCombobox } from './helpers.js';
import { comboboxFixture } from './helpers.js';

describe('Combobox accessibility', () => {
  it('renders accessibly with `label` attribute', async () => {
    const el = await comboboxFixture();

    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('renders accessibly with <sp-field-label>', async () => {
    const test = await fixture<HTMLDivElement>(html`
      <div>${withFieldLabel()}</div>
    `);
    const el = test.querySelector('sp-combobox') as unknown as Combobox;

    await elementUpdated(el);

    await expect(el).to.be.accessible();
  });
  it('renders accessibly with <sp-help-text>', async () => {
    const test = await fixture<HTMLDivElement>(html`
      <div>${withHelpText()}</div>
    `);
    const el = test.querySelector('sp-combobox') as unknown as Combobox;

    await elementUpdated(el);

    await expect(el).to.be.accessible();
  });
  it('manages its "name" value with <sp-field-label>', async () => {
    const test = await fixture<HTMLDivElement>(html`
      <div>${withFieldLabel()}</div>
    `);
    const el = test.querySelector('sp-combobox') as unknown as Combobox;

    await elementUpdated(el);
    await nextFrame();
    await nextFrame();

    let snapshot = (await a11ySnapshot(
      {}
    )) as unknown as AccessibleNamedNode & {
      children: AccessibleNamedNode[];
    };

    const a11yNode = findAccessibilityNode<AccessibleNamedNode>(
      snapshot,
      (node) =>
        node.name === 'Pick something' &&
        !node.value &&
        node.role === 'combobox'
    );
    // by default, is there a combobox that has `name` as the label?
    expect(a11yNode, '`name` is the label text').to.not.be.null;

    el.value = 'Banana';
    await elementUpdated(el);

    snapshot = (await a11ySnapshot({})) as unknown as AccessibleNamedNode & {
      children: AccessibleNamedNode[];
    };
    const node = findAccessibilityNode<AccessibleNamedNode>(
      snapshot,
      (node) =>
        node.name === 'Pick something' &&
        node.value === 'Banana' &&
        node.role === 'combobox'
    );

    expect(node, `node not available: ${JSON.stringify(snapshot, null, '  ')}`)
      .to.not.be.null;
  });
  it('manages its "name" value in the accessibility tree', async () => {
    const el = await comboboxFixture();

    await elementUpdated(el);
    await nextFrame();
    await nextFrame();

    let snapshot = (await a11ySnapshot(
      {}
    )) as unknown as AccessibleNamedNode & {
      children: AccessibleNamedNode[];
    };

    const a11yNode = findAccessibilityNode<AccessibleNamedNode>(
      snapshot,
      (node) =>
        node.name === 'Combobox' && !node.value && node.role === 'combobox'
    );
    // by default, is there a combobox that has `name` as the label?
    expect(a11yNode, '`name` is the label text').to.not.be.null;

    el.value = 'Banana';
    await elementUpdated(el);

    snapshot = (await a11ySnapshot({})) as unknown as AccessibleNamedNode & {
      children: AccessibleNamedNode[];
    };
    const node = findAccessibilityNode<AccessibleNamedNode>(
      snapshot,
      (node) =>
        node.name === 'Combobox' &&
        node.value === 'Banana' &&
        node.role === 'combobox'
    );

    expect(node, `node not available: ${JSON.stringify(snapshot, null, '  ')}`)
      .to.not.be.null;
  });
  it('manages its "description" value with slotted <sp-tooltip>', async () => {
    const test = await fixture<HTMLDivElement>(html`
      <div>${withTooltip()}</div>
    `);
    const el = test.querySelector('sp-combobox') as unknown as Combobox;
    const tooltipText = 'This combobox has a tooltip.';

    await elementUpdated(el);
    await findDescribedNode(el.label, tooltipText);
  });
  it('renders open', async () => {
    const el = await comboboxFixture();

    const opened = oneEvent(el, 'sp-opened');
    el.open = true;
    await opened;

    await elementUpdated(el);
    await expect(el).to.be.accessible();
  });
  it('manages aria-activedescendant', async () => {
    // a11ySnapshot does not track the aria-activedescendant, hence querySelecting
    const el = await comboboxFixture();
    await elementUpdated(el);

    expect(el.activeDescendant).to.be.undefined;

    el.focus();
    await elementUpdated(el);

    await sendKeys({ press: 'ArrowDown' });
    await elementUpdated(el);

    expect(el.activeDescendant).to.not.be.undefined;
    expect(el.activeDescendant.value).to.equal('apple');

    // aria-activedescendant should keep the combobox focused even when navigating the menu
    const activeDescendant = el.shadowRoot.querySelector('#apple') as MenuItem;

    await elementUpdated(activeDescendant);
    // Menu Item association with a Menu happens outside of the update lifecycle
    await nextFrame();
    await nextFrame();

    expect(activeDescendant.focused).to.be.true;
    expect(el.focused).to.be.true;
    await expect(el).to.be.accessible();
  });
  it('manages aria-selected', async () => {
    // @TODO: skipping this test because it's flaky in WebKit in CI. Will review in the migration to Spectrum 2.
    if (isWebKit()) {
      return;
    }
    const el = await comboboxFixture();

    await elementUpdated(el);

    type SelectedNode = { selected?: boolean };
    let snapshot = (await a11ySnapshot({})) as unknown as SelectedNode & {
      children: SelectedNode[];
    };

    expect(
      findAccessibilityNode<SelectedNode>(snapshot, (node) => !!node.selected)
    ).to.be.null;

    const opened = oneEvent(el, 'sp-opened');
    el.click();
    await opened;
    await elementUpdated(el);
    expect(el.open).to.be.true;

    el.focus();
    await elementUpdated(el);

    await sendKeys({ press: 'ArrowDown' });
    await elementUpdated(el);

    expect(el.activeDescendant.value).to.equal('apple');
    snapshot = (await a11ySnapshot({})) as unknown as SelectedNode & {
      children: SelectedNode[];
    };
    expect(
      findAccessibilityNode<SelectedNode>(snapshot, (node) => !!node.selected),
      JSON.stringify(snapshot, null, '  ')
    ).to.not.be.null;
  });
  it('manages aria-expanded', async () => {
    const el = await comboboxFixture();

    await elementUpdated(el);

    type ExpandedNode = { expanded?: boolean };
    let snapshot = (await a11ySnapshot({})) as unknown as ExpandedNode & {
      children: ExpandedNode[];
    };

    expect(
      findAccessibilityNode<ExpandedNode>(snapshot, (node) => !!node.expanded)
    ).to.be.null;

    el.click();
    await elementUpdated(el);
    expect(el.open).to.be.true;

    snapshot = (await a11ySnapshot({})) as unknown as ExpandedNode & {
      children: ExpandedNode[];
    };
    expect(
      findAccessibilityNode<ExpandedNode>(snapshot, (node) => !!node.expanded)
    ).to.not.be.null;
  });
  it('loads with list closed', async () => {
    const el = await comboboxFixture();

    await elementUpdated(el);

    expect(el.open).to.be.false;
  });
  it('renders accessibly with `pending` attribute', async () => {
    const el = await comboboxFixture();
    el.value = 'Banana';
    el.pending = true;

    await elementUpdated(el);
    await nextFrame();

    const name = 'Combobox Pending';

    const snapshot = (await a11ySnapshot(
      {}
    )) as unknown as AccessibleNamedNode & {
      children: AccessibleNamedNode[];
    };

    const a11yNode = findAccessibilityNode<AccessibleNamedNode>(
      snapshot,
      (node) => node.name === name && node.role === 'combobox'
    );

    expect(a11yNode).to.not.be.null;
  });
  describe('language and direction of parts', () => {
    // Autonyms (each language's name rendered in that language), alphabetized
    // by the rendered text so both LTR and RTL scripts are interleaved.
    const languages = [
      { value: 'de', itemText: 'Deutsch', lang: 'de', dir: 'ltr' },
      { value: 'en', itemText: 'English', lang: 'en', dir: 'ltr' },
      { value: 'es', itemText: 'Español', lang: 'es', dir: 'ltr' },
      { value: 'fr', itemText: 'Français', lang: 'fr', dir: 'ltr' },
      { value: 'ru', itemText: 'Русский', lang: 'ru', dir: 'ltr' },
      { value: 'he', itemText: 'עברית', lang: 'he', dir: 'rtl' },
      { value: 'ar', itemText: 'العربية', lang: 'ar', dir: 'rtl' },
      { value: 'zh', itemText: '中文', lang: 'zh', dir: 'ltr' },
      { value: 'ja', itemText: '日本語', lang: 'ja', dir: 'ltr' },
      { value: 'ko', itemText: '한국어', lang: 'ko', dir: 'ltr' },
    ] as const;

    it('propagates lang and dir from a slotted sp-menu-item to its rendered counterpart in the popover', async () => {
      const el = await fixture<TestableCombobox>(html`
        <sp-combobox label="Language">
          ${languages.map(
            (language) => html`
              <sp-menu-item
                value=${language.value}
                lang=${language.lang}
                dir=${language.dir}
              >
                ${language.itemText}
              </sp-menu-item>
            `
          )}
        </sp-combobox>
      `);
      await elementUpdated(el);

      const opened = oneEvent(el, 'sp-opened');
      el.open = true;
      await opened;
      await elementUpdated(el);

      languages.forEach((language) => {
        const renderedItem = el.shadowRoot.querySelector(
          `#${language.value}`
        ) as MenuItem;

        expect(renderedItem, `rendered item for ${language.value}`).to.exist;
        expect(renderedItem.lang, `lang for ${language.value}`).to.equal(
          language.lang
        );
        expect(
          renderedItem.getAttribute('dir'),
          `dir attribute for ${language.value}`
        ).to.equal(language.dir);
      });
    });
    it('reads the authored dir from a slotted sp-menu-item even when its own computed direction differs', async () => {
      const el = await fixture<TestableCombobox>(html`
        <sp-combobox label="Language">
          <sp-menu-item value="he" lang="he" dir="rtl" style="direction: ltr">
            עברית
          </sp-menu-item>
          <sp-menu-item value="en">English</sp-menu-item>
        </sp-combobox>
      `);
      await elementUpdated(el);

      const source = el.querySelector('sp-menu-item[value="he"]') as MenuItem;
      // `SpectrumElement` overrides `dir` to return the computed CSS
      // direction, not the attribute; the inline style above forces that
      // divergence so this test actually exercises the fallback to
      // `getAttribute('dir')` in `Combobox.ts`'s `getOptionDir()`.
      expect(source.dir, 'computed dir on the source element').to.equal('ltr');
      expect(source.getAttribute('dir'), 'authored dir attribute').to.equal(
        'rtl'
      );

      const opened = oneEvent(el, 'sp-opened');
      el.open = true;
      await opened;
      await elementUpdated(el);

      const renderedItem = el.shadowRoot.querySelector('#he') as MenuItem;
      expect(renderedItem.getAttribute('dir'), 'rendered item dir').to.equal(
        'rtl'
      );
    });
    it("syncs the input's lang to the selected option's language", async () => {
      const el = await fixture<TestableCombobox>(html`
        <sp-combobox label="Language">
          <sp-menu-item value="he" lang="he" dir="rtl">עברית</sp-menu-item>
          <sp-menu-item value="en" lang="en">English</sp-menu-item>
        </sp-combobox>
      `);
      await elementUpdated(el);

      const input = el.shadowRoot.querySelector('#input') as HTMLInputElement;
      expect(input.lang, 'no lang before a value is selected').to.equal('');

      el.value = 'עברית';
      await elementUpdated(el);

      expect(input.lang, "input adopts the selected option's lang").to.equal(
        'he'
      );

      el.value = 'English';
      await elementUpdated(el);

      expect(
        input.lang,
        'input switches lang with the newly selected option'
      ).to.equal('en');

      el.value = 'not one of the options';
      await elementUpdated(el);

      expect(
        input.lang,
        'input falls back once the value no longer matches an option'
      ).to.equal('');
    });
  });
});
