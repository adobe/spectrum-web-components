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

import { html } from 'lit';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../swc-response-status.js';

import { getComponent } from '../../../../utils/test-utils.js';
import type { ResponseStatus } from '../ResponseStatus.js';
import { LongDescription, meta } from '../stories/response-status.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Response status/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

type TestResponseStatus = ResponseStatus;

const agenticMarkup = html`
  <swc-response-status status="active" open accessible-label="Execution steps">
    <span slot="label">Searching repositories for Europe trips</span>

    <swc-response-status-step status="complete">
      <span slot="label">Looked through documentation</span>
      <span slot="description">
        Prioritizing data from documents and press releases.
      </span>
    </swc-response-status-step>

    <swc-response-status-step status="active">
      <span slot="label">Searching repositories for Europe trips</span>
      <span slot="description">
        Checked 3 internal repositories for compiled trip package data.
      </span>
    </swc-response-status-step>

    <swc-response-status-step status="complete">
      <span slot="label">Compose response</span>
      <span slot="description">Synthesizing findings into a response.</span>
    </swc-response-status-step>
  </swc-response-status>
`;

const activeStepFallbackMarkup = html`
  <swc-response-status status="active" open accessible-label="Execution steps">
    <swc-response-status-step status="complete">
      <span slot="label">Looked through documentation</span>
      <span slot="description">Read the uploaded source material.</span>
    </swc-response-status-step>
    <swc-response-status-step status="active">
      <span slot="label">Gathering information from the web</span>
      <span slot="description">Searching recent public references.</span>
    </swc-response-status-step>
  </swc-response-status>
`;

export const StatusApiTest: Story = {
  render: () => html`
    <swc-response-status></swc-response-status>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('status reflects to the host attribute', async () => {
      expect(el.status).toBe('active');
      expect(el.shadowRoot?.querySelector('[role="status"]')).toBeTruthy();
      expect(el.shadowRoot?.querySelector('[aria-expanded]')).toBeNull();
      expect(el.shadowRoot?.querySelector('[aria-controls]')).toBeNull();

      el.status = 'complete';
      await el.updateComplete;

      expect(el.getAttribute('status')).toBe('complete');

      // Wait for the host update to render the default label.
      await waitFor(
        () => {
          expect(
            el.shadowRoot
              ?.querySelector('.swc-ResponseStatus-label')
              ?.textContent?.trim()
          ).toBe('Response generated');
        },
        { timeout: 2000 }
      );
    });

    await step(
      'coerces unsupported host status to active behavior',
      async () => {
        el.setAttribute('status', 'pending');
        await el.updateComplete;

        expect(el.getAttribute('status')).toBe('pending');
        expect(el.shadowRoot?.querySelector('[role="status"]')).toBeTruthy();
        expect(
          el.shadowRoot?.querySelector('.swc-ResponseStatus-row--processing')
        ).toBeTruthy();
        const loader = el.shadowRoot?.querySelector('swc-pixel-loader');
        expect(loader).toBeTruthy();
        expect(loader?.getAttribute('preset')).toBe('mega');
      }
    );

    await step('forwards a generating preset to the pixel loader', async () => {
      el.status = 'active';
      el.loader = 'cc';
      await el.updateComplete;

      expect(el.getAttribute('loader')).toBe('cc');
      expect(
        el.shadowRoot?.querySelector('swc-pixel-loader')?.getAttribute('preset')
      ).toBe('cc');
    });

    await step('forwards a static icon name to the pixel loader', async () => {
      el.loader = 'wand';
      await el.updateComplete;

      const pixelLoader = el.shadowRoot?.querySelector('swc-pixel-loader');
      expect(pixelLoader?.getAttribute('icon')).toBe('wand');
      expect(pixelLoader?.hasAttribute('preset')).toBe(false);
    });

    await step(
      'coerces an unsupported loader value to the mega preset',
      async () => {
        el.setAttribute('loader', 'not-a-preset-or-icon');
        await el.updateComplete;

        expect(el.getAttribute('loader')).toBe('not-a-preset-or-icon');
        expect(
          el.shadowRoot
            ?.querySelector('swc-pixel-loader')
            ?.getAttribute('preset')
        ).toBe('mega');
      }
    );
  },
};

export const DynamicLabelTest: Story = {
  render: () => agenticMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step(
      'updates the header label when the slotted label text changes',
      async () => {
        const slottedLabel = el.querySelector('[slot="label"]');
        expect(slottedLabel).toBeTruthy();

        // Mutating text content does not fire slotchange, so this exercises
        // the MutationObserver that keeps slotted label text in sync.
        (slottedLabel as HTMLElement).textContent =
          'Comparing cruise package pricing';

        await waitFor(
          () => {
            const rollingLines = el.shadowRoot?.querySelectorAll(
              '.swc-ResponseStatus-headerTrailLine'
            );
            expect(rollingLines?.length).toBe(2);
            expect(rollingLines?.[0]?.getAttribute('aria-hidden')).toBe('true');
            expect(rollingLines?.[1]?.hasAttribute('aria-hidden')).toBe(false);
            expect(rollingLines?.[1]?.textContent?.trim()).toBe(
              'Comparing cruise package pricing'
            );
          },
          { timeout: 2000 }
        );

        await waitFor(
          () => {
            expect(
              el.shadowRoot
                ?.querySelector('.swc-ResponseStatus-label')
                ?.textContent?.trim()
            ).toBe('Comparing cruise package pricing');
          },
          { timeout: 2000 }
        );
      }
    );
  },
};

export const StepApiTest: Story = {
  render: () => activeStepFallbackMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step(
      'shows a generic processing label while the timeline is open with an incomplete step',
      async () => {
        await waitFor(
          () => {
            expect(
              el.shadowRoot
                ?.querySelector('.swc-ResponseStatus-label')
                ?.textContent?.trim()
            ).toBe('Processing…');
            expect(
              el.shadowRoot?.querySelector(
                '.swc-ResponseStatus-label--emphasized'
              )
            ).toBeTruthy();
            expect(
              el.shadowRoot?.querySelector(
                '.swc-ResponseStatus-loader--emphasized'
              )
            ).toBeTruthy();
          },
          { timeout: 2000 }
        );
      }
    );

    await step(
      'falls back to the active step label once the timeline closes',
      async () => {
        el.open = false;
        await el.updateComplete;

        await waitFor(
          () => {
            expect(
              el.shadowRoot
                ?.querySelector('.swc-ResponseStatus-label')
                ?.textContent?.trim()
            ).toBe('Gathering information from the web');
            expect(
              el.shadowRoot?.querySelector(
                '.swc-ResponseStatus-label--emphasized'
              )
            ).toBeNull();
            expect(
              el.shadowRoot?.querySelector(
                '.swc-ResponseStatus-loader--emphasized'
              )
            ).toBeNull();
          },
          { timeout: 2000 }
        );
      }
    );

    await step(
      'treats a stopped step as settled, not still-processing',
      async () => {
        el.open = true;
        const activeStep = el.querySelector(
          'swc-response-status-step[status="active"]'
        );
        activeStep?.setAttribute('status', 'stopped');
        await el.updateComplete;

        await waitFor(
          () => {
            expect(
              el.shadowRoot
                ?.querySelector('.swc-ResponseStatus-label')
                ?.textContent?.trim()
            ).not.toBe('Processing…');
            expect(
              el.shadowRoot?.querySelector(
                '.swc-ResponseStatus-label--emphasized'
              )
            ).toBeNull();
            expect(
              el.shadowRoot?.querySelector(
                '.swc-ResponseStatus-loader--emphasized'
              )
            ).toBeNull();
          },
          { timeout: 2000 }
        );
      }
    );

    await step('coerces unsupported step statuses to active', async () => {
      const invalidStep = document.createElement('swc-response-status-step');
      invalidStep.setAttribute('status', 'pending');
      invalidStep.innerHTML = `
        <span slot="label">Unsupported pending step</span>
        <span slot="description">This should still render as active.</span>
      `;

      el.append(invalidStep);
      await el.updateComplete;

      await waitFor(
        () => {
          const renderedStatuses = Array.from(
            el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step') ?? []
          ).map((renderedStep) => renderedStep.getAttribute('data-status'));

          expect(renderedStatuses).toContain('active');
          expect(renderedStatuses).not.toContain('pending');
        },
        { timeout: 2000 }
      );
    });
  },
};

export const AgenticApiTest: Story = {
  render: () => agenticMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('uses status and open as the public state API', async () => {
      expect(el.status).toBe('active');
      expect(el.open).toBe(true);
      expect(el.hasAttribute('open')).toBe(true);
    });

    await step(
      'renders the slotted header label and step content',
      async () => {
        const headerLabel = el.shadowRoot?.querySelector(
          '.swc-ResponseStatus-label'
        );
        const renderedSteps = Array.from(
          el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step') ?? []
        );
        const labels = renderedSteps.map((renderedStep) =>
          renderedStep
            .querySelector('.swc-ResponseStatus-step-title')
            ?.textContent?.trim()
        );
        const statuses = renderedSteps.map((renderedStep) =>
          renderedStep.getAttribute('data-status')
        );
        const details = Array.from(
          el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step-detail') ??
            []
        ).map((detail) => detail.textContent?.trim());

        expect(headerLabel?.textContent?.trim()).toBe(
          'Searching repositories for Europe trips'
        );
        expect(details).toContain(
          'Prioritizing data from documents and press releases.'
        );
        expect(details).toContain(
          'Checked 3 internal repositories for compiled trip package data.'
        );
        expect(details).toContain('Synthesizing findings into a response.');
        expect(labels).toEqual([
          'Looked through documentation',
          'Searching repositories for Europe trips',
          'Compose response',
        ]);
        expect(statuses).toEqual(['complete', 'active', 'complete']);
      }
    );

    await step(
      'uses accessible-label as the timeline accessible name',
      async () => {
        // Scoped to the timeline panel: each step's description scroll region
        // is also `role="group"`, so an unscoped selector would be ambiguous.
        expect(
          el.shadowRoot?.querySelector(
            '.swc-ResponseStatus-panel[role="group"]'
          )
        ).toHaveAttribute('aria-label', 'Execution steps');
      }
    );

    await step('updates rendered steps when step status changes', async () => {
      const stepEl = el.querySelector('swc-response-status-step') as
        | (HTMLElement & { updateComplete?: Promise<boolean> })
        | null;
      stepEl?.setAttribute('status', 'stopped');
      await stepEl?.updateComplete;

      await waitFor(
        () => {
          const renderedStatuses = Array.from(
            el.shadowRoot?.querySelectorAll('.swc-ResponseStatus-step') ?? []
          ).map((renderedStep) => renderedStep.getAttribute('data-status'));

          expect(renderedStatuses).toEqual(['stopped', 'active', 'complete']);
        },
        { timeout: 2000 }
      );
    });

    await step('dispatches toggle event when disclosure toggles', async () => {
      let captured: CustomEvent<{ open: boolean }> | undefined;
      el.addEventListener('swc-response-status-toggle', (event) => {
        captured = event as CustomEvent<{ open: boolean }>;
      });

      const button = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-ResponseStatus-row--button'
      );
      button?.click();
      await el.updateComplete;

      expect(el.open).toBe(false);
      expect(captured?.detail.open).toBe(false);
      expect(captured?.bubbles).toBe(true);
      expect(captured?.composed).toBe(true);
    });
  },
};

export const StepDisclosureTest: Story = {
  render: () => agenticMarkup,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    const stepToggles = (): HTMLButtonElement[] =>
      Array.from(
        el.shadowRoot?.querySelectorAll<HTMLButtonElement>(
          '.swc-ResponseStatus-step-toggle'
        ) ?? []
      );

    await step('keeps every step collapsed by default', async () => {
      await waitFor(
        () => {
          const expanded = stepToggles().map((toggle) =>
            toggle.getAttribute('aria-expanded')
          );
          // No step declares `open`, so all start collapsed.
          expect(expanded).toEqual(['false', 'false', 'false']);
        },
        { timeout: 2000 }
      );
    });

    await step('each step toggle controls its own description', async () => {
      for (const toggle of stepToggles()) {
        const controls = toggle.getAttribute('aria-controls');
        expect(controls).toBeTruthy();
        expect(el.shadowRoot?.getElementById(controls as string)).toBeTruthy();
      }
    });

    await step(
      'expands a collapsed step and emits a step-toggle event',
      async () => {
        let captured: CustomEvent<{ open: boolean; index: number }> | undefined;
        el.addEventListener('swc-response-status-step-toggle', (event) => {
          captured = event as CustomEvent<{ open: boolean; index: number }>;
        });

        stepToggles()[0]?.click();
        await el.updateComplete;

        expect(captured?.detail).toEqual({ open: true, index: 0 });
        expect(captured?.bubbles).toBe(true);
        expect(captured?.composed).toBe(true);
        expect(stepToggles()[0]?.getAttribute('aria-expanded')).toBe('true');
      }
    );

    await step('toggles steps independently', async () => {
      let captured: CustomEvent<{ open: boolean; index: number }> | undefined;
      el.addEventListener('swc-response-status-step-toggle', (event) => {
        captured = event as CustomEvent<{ open: boolean; index: number }>;
      });

      stepToggles()[1]?.click();
      await el.updateComplete;

      expect(captured?.detail).toEqual({ open: true, index: 1 });
      // Index 0 stays expanded from the previous step; toggling index 1 is
      // independent.
      const expanded = stepToggles().map((toggle) =>
        toggle.getAttribute('aria-expanded')
      );
      expect(expanded).toEqual(['true', 'true', 'false']);
    });

    await step(
      "a toggle follows its step's element, not its array index, after a step is removed",
      async () => {
        // Removes the first step ("Looked through documentation", expanded).
        // The second step ("Searching repositories for Europe trips", also
        // expanded) shifts from index 1 to index 0, and the third step
        // ("Compose response", collapsed) shifts from index 2 to index 1.
        el.querySelector('swc-response-status-step')?.remove();
        await el.updateComplete;

        await waitFor(
          () => {
            const toggles = stepToggles();
            expect(toggles).toHaveLength(2);
            expect(
              toggles[0]?.textContent?.includes(
                'Searching repositories for Europe trips'
              )
            ).toBe(true);
            expect(toggles[0]?.getAttribute('aria-expanded')).toBe('true');
            expect(toggles[1]?.textContent?.includes('Compose response')).toBe(
              true
            );
            expect(toggles[1]?.getAttribute('aria-expanded')).toBe('false');
          },
          { timeout: 2000 }
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Off-screen instances skip overflow re-measurement
// ──────────────────────────────────────────────────────────────

// Reaches the private visibility flag and measurement method so an off-screen
// instance can be simulated deterministically (the harness cannot force the
// real IntersectionObserver to report non-intersecting without an actual
// viewport scroll).
type OverflowVisibilityInternals = {
  _isVisible: boolean;
  _syncDetailOverflow: () => void;
};

export const DetailOverflowVisibilityTest: Story = {
  ...LongDescription,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );
    const internals = el as unknown as OverflowVisibilityInternals;

    // `LongDescription` step index 1 is the only open step long enough to
    // overflow the capped height.
    const overflowingRegion = (): HTMLElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLElement>(
        '.swc-ResponseStatus-step-detailScroll[data-step-index="1"]'
      );
    const stepToggles = (): HTMLButtonElement[] =>
      Array.from(
        el.shadowRoot?.querySelectorAll<HTMLButtonElement>(
          '.swc-ResponseStatus-step-toggle'
        ) ?? []
      );

    await step(
      'the overflowing open step is focusable while visible',
      async () => {
        await waitFor(
          () => {
            expect(overflowingRegion()?.hasAttribute('tabindex')).toBe(true);
          },
          { timeout: 2000 }
        );
      }
    );

    await step(
      'collapsing a step while off-screen does not re-measure',
      async () => {
        internals._isVisible = false;

        stepToggles()[1]?.click();
        await el.updateComplete;

        // The step is now collapsed, but gated measurement leaves the stale
        // tabindex from the last real measurement in place instead of forcing
        // a scrollHeight/clientHeight read.
        expect(overflowingRegion()?.hasAttribute('tabindex')).toBe(true);
      }
    );

    await step(
      'becoming visible again re-syncs to the current state',
      async () => {
        internals._isVisible = true;
        internals._syncDetailOverflow();
        await el.updateComplete;

        // The step is collapsed, so it no longer needs a focusable region.
        expect(overflowingRegion()?.hasAttribute('tabindex')).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Settled header label wraps instead of overflowing
// ──────────────────────────────────────────────────────────────

export const HeaderLabelWrapTest: Story = {
  render: () => html`
    <div style="inline-size: 160px;">
      <swc-response-status status="complete">
        <span slot="label">
          A deliberately long status label written to exceed two full lines of
          wrapped text at this width so the multi-line clamp has something real
          to bound instead of just happening to fit
        </span>
      </swc-response-status>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step(
      'wraps and clamps the settled label without leaking past the row',
      async () => {
        await waitFor(
          () => {
            const row = el.shadowRoot?.querySelector<HTMLElement>(
              '.swc-ResponseStatus-row'
            );
            const label = el.shadowRoot?.querySelector<HTMLElement>(
              '.swc-ResponseStatus-headerTrailLine .swc-ResponseStatus-label'
            );
            expect(row).toBeTruthy();
            expect(label).toBeTruthy();

            // No horizontal overflow: the label never exceeds its container.
            expect(label?.scrollWidth).toBeLessThanOrEqual(
              (label?.clientWidth ?? 0) + 1
            );

            const lineHeight = parseFloat(
              getComputedStyle(label as HTMLElement).lineHeight || '0'
            );
            const labelHeight = label?.getBoundingClientRect().height ?? 0;

            // Wrapped to more than one line...
            expect(labelHeight).toBeGreaterThan(lineHeight * 1.5);
            // ...but clamped rather than unbounded: stays within the default
            // 2-line cap (`--swc-response-status-label-max-lines`) even
            // though the text alone would wrap to more lines at this width.
            expect(labelHeight).toBeLessThanOrEqual(lineHeight * 2 + 1);

            // The row grows to fit the wrapped label instead of staying a
            // fixed single-line height and letting the extra lines spill past
            // its own box into whatever follows.
            const rowRect = row?.getBoundingClientRect();
            const labelRect = label?.getBoundingClientRect();
            expect(labelRect?.bottom).toBeLessThanOrEqual(
              (rowRect?.bottom ?? 0) + 1
            );
          },
          { timeout: 2000 }
        );
      }
    );
  },
};
