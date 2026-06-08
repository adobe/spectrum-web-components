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
import { SinonSpyCall, SinonStub, stub } from 'sinon';

import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';

import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';

describe('Accordion - deprecation warnings', () => {
  let consoleWarnStub!: SinonStub;

  before(() => {
    consoleWarnStub = stub(console, 'warn');
  });

  beforeEach(() => {
    window.__swc.issuedWarnings = new Set<BrandedSWCWarningID>();
  });

  afterEach(() => {
    consoleWarnStub.resetHistory();
  });

  after(() => {
    consoleWarnStub.restore();
  });

  const deprecationCalls = (): SinonSpyCall[] =>
    consoleWarnStub
      .getCalls()
      .filter(
        (call) =>
          (call.args[call.args.length - 1] as { data?: { level?: string } })
            ?.data?.level === 'deprecation'
      );

  const expectDeprecationData = (
    call: SinonSpyCall,
    localName: 'sp-accordion' | 'sp-accordion-item'
  ): void => {
    expect(
      call.args[call.args.length - 1],
      'confirm `data` shape'
    ).to.deep.equal({
      data: {
        localName,
        type: 'api',
        level: 'deprecation',
      },
    });
  };

  it('warns about deprecated "label" attribute', async () => {
    const item = await fixture<AccordionItem>(html`
      <sp-accordion-item label="Section"></sp-accordion-item>
    `);

    await elementUpdated(item);

    expect(consoleWarnStub.called).to.be.true;
    const labelCall = deprecationCalls().find((call) =>
      String(call.args[0]).includes('"label"')
    );
    expect(labelCall, 'label deprecation warn fired').to.exist;
    expect(
      String(labelCall!.args[0]).includes('deprecated'),
      'confirm deprecation message'
    ).to.be.true;
    expect(
      String(labelCall!.args[0]).includes('Spectrum 2'),
      'confirm Spectrum 2 timeline'
    ).to.be.true;
    expectDeprecationData(labelCall!, 'sp-accordion-item');
  });

  it('does not warn when label is empty', async () => {
    const item = await fixture<AccordionItem>(html`
      <sp-accordion-item></sp-accordion-item>
    `);

    await elementUpdated(item);

    expect(deprecationCalls().length).to.equal(0);
  });

  it('warns when focus() is called on the accordion host', async () => {
    const accordion = await fixture<Accordion>(html`
      <sp-accordion>
        <sp-accordion-item label="Section">Panel</sp-accordion-item>
      </sp-accordion>
    `);

    await elementUpdated(accordion);
    consoleWarnStub.resetHistory();
    accordion.focus();

    const focusCall = deprecationCalls().find((call) =>
      String(call.args[0]).includes('focus()')
    );
    expect(focusCall, 'focus deprecation warn fired').to.exist;
    expect(
      String(focusCall!.args[0]).includes('deprecated'),
      'confirm deprecation message'
    ).to.be.true;
    expect(
      String(focusCall!.args[0]).includes('Spectrum 2'),
      'confirm Spectrum 2 timeline'
    ).to.be.true;
    expectDeprecationData(focusCall!, 'sp-accordion');
  });

  it('does not warn when focus() is not called on the accordion host', async () => {
    const accordion = await fixture<Accordion>(html`
      <sp-accordion>
        <sp-accordion-item>Panel</sp-accordion-item>
      </sp-accordion>
    `);

    await elementUpdated(accordion);

    const focusWarnings = deprecationCalls().filter((call) =>
      String(call.args[0]).includes('focus()')
    );
    expect(focusWarnings.length).to.equal(0);
  });

  it('warns when item level attribute differs from parent accordion level', async () => {
    const accordion = await fixture<Accordion>(html`
      <sp-accordion>
        <sp-accordion-item level="2">Panel</sp-accordion-item>
      </sp-accordion>
    `);

    await elementUpdated(accordion);

    const levelCall = deprecationCalls().find((call) =>
      String(call.args[0]).includes('"level"')
    );
    expect(levelCall, 'level deprecation warn fired').to.exist;
    expect(
      String(levelCall!.args[0]).includes('deprecated'),
      'confirm deprecation message'
    ).to.be.true;
    expect(
      String(levelCall!.args[0]).includes('Spectrum 2'),
      'confirm Spectrum 2 timeline'
    ).to.be.true;
    expectDeprecationData(levelCall!, 'sp-accordion-item');
  });

  it('does not warn when item level matches parent accordion level', async () => {
    const accordion = await fixture<Accordion>(html`
      <sp-accordion>
        <sp-accordion-item level="3">Panel</sp-accordion-item>
      </sp-accordion>
    `);

    await elementUpdated(accordion);

    const levelWarnings = deprecationCalls().filter((call) =>
      String(call.args[0]).includes('"level"')
    );
    expect(levelWarnings.length).to.equal(0);
  });

  it('warns when sp-accordion-item-toggle is dispatched', async () => {
    const item = await fixture<AccordionItem>(html`
      <sp-accordion-item>Panel</sp-accordion-item>
    `);

    await elementUpdated(item);
    consoleWarnStub.resetHistory();
    window.__swc.issuedWarnings = new Set<BrandedSWCWarningID>();

    (item.shadowRoot!.querySelector('#header') as HTMLButtonElement).click();
    await elementUpdated(item);

    const toggleCall = deprecationCalls().find((call) =>
      String(call.args[0]).includes('sp-accordion-item-toggle')
    );
    expect(toggleCall, 'toggle event deprecation warn fired').to.exist;
    expect(
      String(toggleCall!.args[0]).includes('swc-accordion-item-toggle'),
      'confirm renamed event name'
    ).to.be.true;
    expect(
      String(toggleCall!.args[0]).includes('deprecated'),
      'confirm deprecation message'
    ).to.be.true;
    expectDeprecationData(toggleCall!, 'sp-accordion-item');
  });
});
