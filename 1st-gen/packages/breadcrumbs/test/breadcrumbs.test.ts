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
  fixture,
  html,
  oneEvent,
} from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';

import { ActionMenu } from '@spectrum-web-components/action-menu';
import {
  BreadcrumbItem,
  Breadcrumbs,
  BreadcrumbSelectDetail,
} from '@spectrum-web-components/breadcrumbs';

import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
import '@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js';

import { testForLitDevWarnings } from '../../../test/testing-helpers.js';
import { getBreadcrumbs } from '../stories/template.js';

describe('Breadcrumbs', () => {
  testForLitDevWarnings(
    async () =>
      await fixture<Breadcrumbs>(html`
        <sp-breadcrumbs>${getBreadcrumbs(4)}</sp-breadcrumbs>
      `)
  );
  it('should render accessibly', async () => {
    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs>${getBreadcrumbs(4)}</sp-breadcrumbs>
    `);

    await elementUpdated(el);
    await expect(el).to.be.accessible();

    // Default role and aria-label.
    expect(el.getAttribute('role')).to.equal('navigation');
    expect(el.getAttribute('aria-label')).to.equal('Breadcrumbs');

    // Reacts to changes of `label` attribute.
    el.label = 'My breadcrumbs';
    await elementUpdated(el);
    expect(el.getAttribute('aria-label')).to.equal('My breadcrumbs');
  });
  it('should display all breadcrumbs if max-visible-items >= nr. or slotted breadcrumb items', async () => {
    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs>${getBreadcrumbs(4)}</sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
    breadcrumbs.forEach((breadcrumb) => {
      expect(breadcrumb).to.be.displayed;
    });
  });
  it('should collapse breadcrumbs if max-visible-items < nr. or slotted breadcrumb items', async () => {
    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs max-visible-items="3">
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
    expect(breadcrumbs[0]).not.to.be.displayed;
    expect(breadcrumbs[1]).to.be.displayed;
    expect(breadcrumbs[2]).to.be.displayed;
    expect(breadcrumbs[3]).to.be.displayed;

    const menu = el.shadowRoot.querySelector('sp-action-menu') as ActionMenu;
    expect(menu).to.exist;

    menu.click();
    await elementUpdated(menu);
    expect(menu.open).to.be.true;

    const menuitems = menu.querySelectorAll('sp-menu-item');
    expect(menuitems.length).to.equal(4);
    expect(menu.getAttribute('value')).to.equal('3');
  });
  it('should respect max-visible-items when adding items dynamically', async () => {
    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs max-visible-items="3">
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    `);

    // let's verify that we have 3 breadcrumbs visible and 1 hidden
    const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
    expect(breadcrumbs.length).to.equal(4);
    expect(breadcrumbs[0]).not.to.be.displayed;
    expect(breadcrumbs[1]).to.be.displayed;
    expect(breadcrumbs[2]).to.be.displayed;
    expect(breadcrumbs[3]).to.be.displayed;

    // let's add one more item to the breadcrumbs directly
    const newItem = document.createElement('sp-breadcrumb-item');
    newItem.textContent = 'New item';
    el.appendChild(newItem);
    await elementUpdated(el);

    // let's verify that we have 3 breadcrumbs visible and 2 hidden
    const newBreadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
    expect(newBreadcrumbs.length).to.equal(5);
    expect(newBreadcrumbs[0]).not.to.be.displayed;
    expect(newBreadcrumbs[1]).not.to.be.displayed;
    expect(newBreadcrumbs[2]).to.be.displayed;
    expect(newBreadcrumbs[3]).to.be.displayed;
    expect(newBreadcrumbs[4]).to.be.displayed;
  });
  it('should always show the first breadcrumb if slot="root" is populated', async () => {
    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs max-visible-items="3">
        <sp-breadcrumb-item value="Home" slot="root">Home</sp-breadcrumb-item>
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
    expect(breadcrumbs[0]).to.be.displayed;
    expect(breadcrumbs[1]).not.to.be.displayed;
    expect(breadcrumbs[2]).to.be.displayed;
    expect(breadcrumbs[3]).to.be.displayed;
    expect(breadcrumbs[4]).to.be.displayed;

    const menu = el.shadowRoot.querySelector('sp-action-menu') as ActionMenu;
    expect(menu).to.exist;
  });
  it('should emit a change event on breadcrumb click if no href is provided', async () => {
    const changeSpy = spy();

    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs
        max-visible-items="3"
        @change=${(event: Event & { detail: BreadcrumbSelectDetail }) => {
          changeSpy(event.detail.value);
        }}
      >
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    // Simulate a click from the visible breadcrumb.
    const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');
    breadcrumbs[1].click();

    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledWith('1');

    changeSpy.resetHistory();

    // Simulate a click from the menu dropdown.
    const menu = el.shadowRoot.querySelector('sp-action-menu') as ActionMenu;
    expect(menu).to.exist;

    const opened = oneEvent(el, 'sp-opened');
    menu.click();
    await elementUpdated(menu);
    await opened;

    const closed = oneEvent(el, 'sp-closed');
    const menuitems = menu.querySelectorAll('sp-menu-item');
    menuitems[0].click();
    await closed;

    expect(menu.open).to.be.false;

    await elementUpdated(el);
    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledWith('0');
  });

  it('should emit a change event on Enter keypress', async () => {
    const changeSpy = spy();

    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs
        @change=${(event: Event & { detail: BreadcrumbSelectDetail }) => {
          changeSpy(event.detail.value);
        }}
      >
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    `);

    await elementUpdated(el);

    // Simulate a click from the visible breadcrumb.
    const breadcrumbs = el.querySelectorAll('sp-breadcrumb-item');

    breadcrumbs[1].focus();
    await sendKeys({ press: 'Enter' });

    expect(changeSpy).to.have.been.calledOnce;
    expect(changeSpy).to.have.been.calledWith('1');
  });
  describe('language and direction of parts', () => {
    // Autonyms (each language's name rendered in that language), alphabetized
    // by the rendered text so both LTR and RTL scripts are interleaved.
    const languages = [
      { value: 'de', label: 'Deutsch', lang: 'de', dir: 'ltr' },
      { value: 'en', label: 'English', lang: 'en', dir: 'ltr' },
      { value: 'es', label: 'Español', lang: 'es', dir: 'ltr' },
      { value: 'fr', label: 'Français', lang: 'fr', dir: 'ltr' },
      { value: 'ru', label: 'Русский', lang: 'ru', dir: 'ltr' },
      { value: 'he', label: 'עברית', lang: 'he', dir: 'rtl' },
      { value: 'ar', label: 'العربية', lang: 'ar', dir: 'rtl' },
    ] as const;

    it('propagates lang and dir from a slotted sp-breadcrumb-item to its rendered counterpart in the overflow menu', async () => {
      const el = await fixture<Breadcrumbs>(html`
        <sp-breadcrumbs max-visible-items="3">
          ${languages.map(
            (language) => html`
              <sp-breadcrumb-item
                value=${language.value}
                lang=${language.lang}
                dir=${language.dir}
              >
                ${language.label}
              </sp-breadcrumb-item>
            `
          )}
        </sp-breadcrumbs>
      `);

      await elementUpdated(el);

      const menu = el.shadowRoot.querySelector('sp-action-menu') as ActionMenu;
      menu.click();
      await elementUpdated(menu);

      languages.forEach((language) => {
        const renderedItem = menu.querySelector(
          `sp-menu-item[value="${language.value}"]`
        ) as HTMLElement;

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
  });
  it('updates the overflow menu wrapper separator when dir changes after mount', async () => {
    // The "is-menu" wrapper `<sp-breadcrumb-item>` rendered by `renderMenu()`
    // lives inside `Breadcrumbs`' own shadow root rather than as a light-DOM
    // child, so a plain `parentElement` walk for ancestor `dir` changes
    // never reaches `<sp-breadcrumbs>` itself.
    const el = await fixture<Breadcrumbs>(html`
      <sp-breadcrumbs max-visible-items="1">
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    `);
    await elementUpdated(el);

    const menuWrapper = el.shadowRoot.querySelector(
      'sp-breadcrumb-item.is-menu'
    ) as BreadcrumbItem;
    const separator = menuWrapper.shadowRoot.querySelector(
      '#separator'
    ) as HTMLElement;
    expect(
      getComputedStyle(separator).transform,
      'unmirrored before the ancestor sets dir="rtl"'
    ).to.equal('none');

    el.setAttribute('dir', 'rtl');
    await elementUpdated(el);
    await menuWrapper.updateComplete;

    expect(
      getComputedStyle(separator).transform,
      'mirrored once sp-breadcrumbs dir changes after mount'
    ).to.not.equal('none');
  });
});
