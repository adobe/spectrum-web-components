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
import { stub } from 'sinon';

import { customElement } from '@spectrum-web-components/base/src/decorators.js';
import { PickerBase } from '@spectrum-web-components/picker';

import '@spectrum-web-components/menu/sp-menu-item.js';

/**
 * Test component that extends PickerBase to verify deprecation warning is emitted.
 */
@customElement('test-picker-base-extension')
class TestPickerBaseExtension extends PickerBase {}

declare global {
  interface HTMLElementTagNameMap {
    'test-picker-base-extension': TestPickerBaseExtension;
  }
}

describe('PickerBase deprecation warning', () => {
  let consoleWarnStub: ReturnType<typeof stub>;

  before(() => {
    window.__swc.verbose = true;
    consoleWarnStub = stub(console, 'warn');
  });

  afterEach(() => {
    consoleWarnStub.resetHistory();
  });

  after(() => {
    window.__swc.verbose = false;
    consoleWarnStub.restore();
  });

  it('emits deprecation warning when a component extends PickerBase', async () => {
    const el = await fixture<TestPickerBaseExtension>(html`
      <test-picker-base-extension label="Test Picker">
        <sp-menu-item value="option-1">Option 1</sp-menu-item>
        <sp-menu-item value="option-2">Option 2</sp-menu-item>
      </test-picker-base-extension>
    `);
    await elementUpdated(el);

    expect(consoleWarnStub.called, 'console.warn should be called').to.be.true;

    // Find the deprecation warning call
    const deprecationCall = consoleWarnStub
      .getCalls()
      .find(
        (call: { args: unknown[] }) =>
          typeof call.args[0] === 'string' &&
          call.args[0].includes('PickerBase class is deprecated')
      );

    expect(deprecationCall, 'should emit PickerBase deprecation warning').to.not
      .be.undefined;

    expect(
      deprecationCall?.args[0],
      'warning message should mention ExpandableElement'
    ).to.include('ExpandableElement');

    expect(
      deprecationCall?.args.at(-1),
      'should have deprecation level in data'
    ).to.deep.equal({
      data: {
        localName: 'test-picker-base-extension',
        type: 'api',
        level: 'deprecation',
      },
    });
  });

  it('includes documentation URL in deprecation warning', async () => {
    const el = await fixture<TestPickerBaseExtension>(html`
      <test-picker-base-extension label="Test Picker">
        <sp-menu-item value="option-1">Option 1</sp-menu-item>
      </test-picker-base-extension>
    `);
    await elementUpdated(el);

    const deprecationCall = consoleWarnStub
      .getCalls()
      .find(
        (call: { args: unknown[] }) =>
          typeof call.args[0] === 'string' &&
          call.args[0].includes('PickerBase class is deprecated')
      );
    const deprecationURL = deprecationCall?.args.find(
      (arg: unknown) =>
        typeof arg === 'string' &&
        arg.includes(
          'https://opensource.adobe.com/spectrum-web-components/components/picker/#deprecation'
        )
    );

    expect(deprecationURL, 'should include documentation URL').to.not.be
      .undefined;
  });
});
