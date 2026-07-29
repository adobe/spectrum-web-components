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

import { expect, fixture, html } from '@open-wc/testing';

import { observeAttribute } from '@spectrum-web-components/reactive-controllers/src/AttributeObserver.js';

/**
 * Flush MutationObserver callbacks by yielding a microtask.
 */
const flushObserver = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

describe('observeAttribute', () => {
  it('notifies the listener when the watched attribute changes', async () => {
    const el = await fixture<HTMLDivElement>(html`
      <div></div>
    `);
    let count = 0;
    const unsubscribe = observeAttribute(el, 'dir', () => count++);

    el.setAttribute('dir', 'rtl');
    await flushObserver();

    expect(count, 'listener fired once').to.equal(1);

    unsubscribe();
  });

  it('stops notifying once unsubscribed', async () => {
    const el = await fixture<HTMLDivElement>(html`
      <div></div>
    `);
    let count = 0;
    const unsubscribe = observeAttribute(el, 'dir', () => count++);

    unsubscribe();
    el.setAttribute('dir', 'rtl');
    await flushObserver();

    expect(count, 'listener does not fire after unsubscribe').to.equal(0);
  });

  it('shares a single observer across multiple targets and attributes', async () => {
    const elA = await fixture<HTMLDivElement>(html`
      <div></div>
    `);
    const elB = await fixture<HTMLDivElement>(html`
      <div></div>
    `);
    let aCount = 0;
    let bCount = 0;

    const unsubscribeA = observeAttribute(elA, 'dir', () => aCount++);
    const unsubscribeB = observeAttribute(elB, 'lang', () => bCount++);

    elA.setAttribute('dir', 'rtl');
    elB.setAttribute('lang', 'he');
    await flushObserver();

    expect(aCount, 'target A was notified').to.equal(1);
    expect(bCount, 'target B was notified').to.equal(1);

    unsubscribeA();
    unsubscribeB();
  });

  it("does not drop a pending mutation record when reconnect() runs before it's delivered", async () => {
    const elA = await fixture<HTMLDivElement>(html`
      <div></div>
    `);
    const elB = await fixture<HTMLDivElement>(html`
      <div></div>
    `);
    let aCount = 0;

    const unsubscribeA = observeAttribute(elA, 'dir', () => aCount++);

    // Queues a mutation record for elA synchronously; the MutationObserver
    // callback hasn't fired yet (it's scheduled as a microtask), so the
    // record is still sitting in the observer's internal queue.
    elA.setAttribute('dir', 'rtl');

    // Registering a second target/attribute, as an unrelated component
    // mounting would, triggers reconnect(), which disconnects and
    // re-observes the shared MutationObserver. Without draining
    // takeRecords() first, this would silently discard elA's still-pending
    // record before it's ever delivered.
    const unsubscribeB = observeAttribute(elB, 'lang', () => undefined);

    await flushObserver();

    expect(
      aCount,
      "elA's listener still fires even though reconnect() ran before delivery"
    ).to.equal(1);

    unsubscribeA();
    unsubscribeB();
  });
});
