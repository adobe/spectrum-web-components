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

import { html, LitElement } from 'lit';
import { elementUpdated, expect, fixture } from '@open-wc/testing';

import {
  LanguageResolutionController,
  languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

import { createLanguageContext } from './helpers.js';

class TestLangHost extends LitElement {
  languageResolver = new LanguageResolutionController(this);
}

if (!customElements.get('test-lang-host')) {
  customElements.define('test-lang-host', TestLangHost);
}

/**
 * Flush MutationObserver callbacks by yielding a microtask.
 */
const flushObserver = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

describe('LanguageResolutionController', () => {
  let savedLang: string;

  beforeEach(() => {
    savedLang = document.documentElement.lang;
  });

  afterEach(() => {
    document.documentElement.lang = savedLang;
  });

  it('exports the languageResolverUpdatedSymbol', () => {
    expect(languageResolverUpdatedSymbol).to.be.a('symbol');
    expect(languageResolverUpdatedSymbol.toString()).to.include(
      'language resolver updated'
    );
  });

  it('reads initial language from <html lang>', async () => {
    document.documentElement.lang = 'fr-FR';
    const el = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);
    expect(el.languageResolver.language).to.equal('fr-FR');
  });

  it('falls back to en-US for invalid locale on <html lang>', async () => {
    document.documentElement.lang = '!invalid';
    const el = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);
    expect(el.languageResolver.language).to.equal('en-US');
  });

  it('responds to <html lang> attribute changes', async () => {
    document.documentElement.lang = 'en-US';
    const el = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);
    expect(el.languageResolver.language).to.equal('en-US');

    document.documentElement.lang = 'ja-JP';
    await flushObserver();
    await elementUpdated(el);
    expect(el.languageResolver.language).to.equal('ja-JP');
  });

  it('ignores no-op <html lang> changes (same value)', async () => {
    document.documentElement.lang = 'en-US';
    const el = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);
    let updateCount = 0;
    const origRequestUpdate = el.requestUpdate.bind(el);
    el.requestUpdate = (...args: Parameters<typeof el.requestUpdate>) => {
      updateCount++;
      return origRequestUpdate(...args);
    };

    // Re-set to the same value to trigger observer but not an update
    document.documentElement.lang = 'en-US';
    await flushObserver();
    await elementUpdated(el);
    expect(updateCount).to.equal(0);
  });

  it('shares a single observer across multiple controllers', async () => {
    document.documentElement.lang = 'en-US';
    const el1 = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);
    const el2 = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);

    document.documentElement.lang = 'de-DE';
    await flushObserver();
    await elementUpdated(el1);
    await elementUpdated(el2);

    expect(el1.languageResolver.language).to.equal('de-DE');
    expect(el2.languageResolver.language).to.equal('de-DE');
  });

  it('cleans up observer when all controllers disconnect', async () => {
    document.documentElement.lang = 'en-US';
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <test-lang-host id="a"></test-lang-host>
        <test-lang-host id="b"></test-lang-host>
      </div>
    `);
    const elA = wrapper.querySelector('#a') as TestLangHost;
    const elB = wrapper.querySelector('#b') as TestLangHost;

    // Remove both elements, disconnecting their controllers
    elA.remove();
    elB.remove();

    // Change lang after disconnect; should not throw
    document.documentElement.lang = 'ko-KR';
    await flushObserver();

    // Reconnect one element; it should pick up the current lang
    wrapper.appendChild(elA);
    await elementUpdated(elA);
    expect(elA.languageResolver.language).to.equal('ko-KR');
  });

  it('ignores <html lang> when a provider is active', async () => {
    const [handleContext] = createLanguageContext('ko-KR');
    const wrapper = await fixture<HTMLDivElement>(html`
      <div @sp-language-context=${handleContext}>
        <test-lang-host></test-lang-host>
      </div>
    `);
    const el = wrapper.querySelector('test-lang-host') as TestLangHost;
    expect(el.languageResolver.language).to.equal('ko-KR');

    // Changing <html lang> should be ignored when provider is active
    document.documentElement.lang = 'de-DE';
    await flushObserver();
    await elementUpdated(el);
    expect(el.languageResolver.language).to.equal('ko-KR');
  });

  it('validates locale support via Intl API', async () => {
    document.documentElement.lang = 'en-GB';
    const el = await fixture<TestLangHost>(html`
      <test-lang-host></test-lang-host>
    `);
    expect(el.languageResolver.language).to.equal('en-GB');
  });

  it('resumes observing <html lang> after disconnect and reconnect', async () => {
    document.documentElement.lang = 'en-US';
    const wrapper = await fixture<HTMLDivElement>(html`
      <div>
        <test-lang-host></test-lang-host>
      </div>
    `);
    const el = wrapper.querySelector('test-lang-host') as TestLangHost;
    expect(el.languageResolver.language).to.equal('en-US');

    // Disconnect
    el.remove();

    // Change lang while disconnected
    document.documentElement.lang = 'pt-BR';
    await flushObserver();

    // Reconnect
    wrapper.appendChild(el);
    await elementUpdated(el);
    expect(el.languageResolver.language).to.equal('pt-BR');

    // Verify observer is active again after reconnect
    document.documentElement.lang = 'it-IT';
    await flushObserver();
    await elementUpdated(el);
    expect(el.languageResolver.language).to.equal('it-IT');
  });
});
