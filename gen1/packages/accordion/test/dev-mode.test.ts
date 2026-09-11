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

import { elementUpdated, expect, fixture } from '@open-wc/testing';
import { SinonStub, stub } from 'sinon';

import { Accordion } from '@spectrum-web-components/accordion';

import { Default } from '../stories/accordion.stories.js';

describe('Accordion - dev mode', () => {
  describe('lit dev mode', () => {
    let consoleWarnStub!: SinonStub;

    before(() => {
      consoleWarnStub = stub(console, 'warn');
    });

    afterEach(() => {
      consoleWarnStub.resetHistory();
    });

    after(() => {
      consoleWarnStub.restore();
    });

    it('does not emit non-deprecation warnings', async () => {
      const el = await fixture<Accordion>(Default());

      await elementUpdated(el);

      const nonDeprecationCalls = consoleWarnStub
        .getCalls()
        .filter(
          (call) =>
            (call.args[call.args.length - 1] as { data?: { level?: string } })
              ?.data?.level !== 'deprecation'
        );

      expect(
        nonDeprecationCalls.length > 0,
        nonDeprecationCalls[0]?.args.join(', ')
      ).to.be.false;
    });
  });
});
