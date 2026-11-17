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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getComponent, withWarningSpy } from '@swc-test-helpers/dom';

import '../swc-response-status.js';

import type { ResponseStatusStep } from '../response-status-step/ResponseStatusStep.js';
import type { ResponseStatus } from '../ResponseStatus.js';
import {
  LongDescription,
  meta,
  Playground,
} from '../stories/response-status.stories.js';

export default {
  ...meta,
  title: 'AI Toolkit/Response status/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

type TestResponseStatus = ResponseStatus;

export const PlaygroundLabelControlTest: Story = {
  ...Playground,
  args: {
    ...Playground.args,
    'label-slot': 'Reviewing uploaded documents',
  },
  play: async ({ canvasElement }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await waitFor(() => {
      expect(
        el.shadowRoot
          ?.querySelector('.swc-ResponseStatus-label')
          ?.textContent?.trim()
      ).toBe('Reviewing uploaded documents');
    });
  },
};

export const PlaygroundDisclosureLabelTest: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );
    const expectLabel = async (label: string): Promise<void> => {
      await waitFor(
        () => {
          expect(
            el.shadowRoot
              ?.querySelector('.swc-ResponseStatus-label')
              ?.textContent?.trim()
          ).toBe(label);
        },
        { timeout: 2000 }
      );
    };

    await expectLabel('Searching repositories for Europe trips');
    const button = el.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    await userEvent.click(button as HTMLButtonElement);
    await expectLabel('Processing…');
    await userEvent.click(button as HTMLButtonElement);
    await expectLabel('Searching repositories for Europe trips');
  },
};

export const PlaygroundCompleteStatusTest: Story = {
  ...Playground,
  args: {
    ...Playground.args,
    status: 'complete',
  },
  play: async ({ canvasElement }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await waitFor(() => {
      expect(el.status).toBe('complete');
      expect(
        el.shadowRoot
          ?.querySelector('.swc-ResponseStatus-label')
          ?.textContent?.trim()
      ).toBe('Thought for 9 seconds');
      expect(
        Array.from(el.querySelectorAll('swc-response-status-step')).map(
          (step) => step.getAttribute('status')
        )
      ).toEqual(['complete', 'complete', 'complete', 'complete']);
    });
  },
};

export const PlaygroundStoppedStatusTest: Story = {
  ...Playground,
  args: {
    ...Playground.args,
    status: 'stopped',
  },
  play: async ({ canvasElement }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await waitFor(() => {
      expect(el.status).toBe('stopped');
      expect(
        el.shadowRoot
          ?.querySelector('.swc-ResponseStatus-label')
          ?.textContent?.trim()
      ).toBe('You stopped the response');
      expect(
        Array.from(el.querySelectorAll('swc-response-status-step')).map(
          (step) => step.getAttribute('status')
        )
      ).toEqual(['complete', 'complete', 'stopped']);
    });
  },
};

// A step's label/description are projected through a `<slot>`, so
// `.textContent` (raw-tree only) reads empty, and `.innerText` is gated by
// CSS visibility (empty while the step's own detail panel is collapsed).
// Reading the slot's assigned nodes directly works regardless of either.
function assignedText(slot: HTMLSlotElement | null | undefined): string {
  return (slot?.assignedNodes({ flatten: true }) ?? [])
    .map((node) => node.textContent?.trim() ?? '')
    .filter(Boolean)
    .join(' ');
}

function stepLabelText(stepEl: Element): string {
  return assignedText(
    stepEl.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="label"]')
  );
}

function stepDescriptionText(stepEl: Element): string {
  const named = assignedText(
    stepEl.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="description"]'
    )
  );
  if (named) {
    return named;
  }
  return assignedText(
    stepEl.shadowRoot?.querySelector<HTMLSlotElement>(
      '.swc-ResponseStatusStep-detail slot:not([name])'
    )
  );
}

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
          ).toBe('Response complete');
        },
        { timeout: 2000 }
      );
    });

    await step('settled labels without steps are not buttons', async () => {
      const row = el.shadowRoot?.querySelector('.swc-ResponseStatus-row');
      expect(row?.querySelector('button')).toBeNull();
      expect(row?.querySelector('[role="status"]')).toBeNull();

      el.status = 'stopped';
      await el.updateComplete;
      expect(row?.querySelector('button')).toBeNull();
      expect(row?.querySelector('[role="status"]')).toBeNull();
    });

    await step(
      'warns on an unsupported host status and renders active behavior',
      () =>
        withWarningSpy(async (warnCalls) => {
          el.setAttribute('status', 'pending');
          await el.updateComplete;

          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning names the property and received value'
          ).toMatch(/"status".*"pending"/);
          expect(el.getAttribute('status')).toBe('pending');
          expect(el.shadowRoot?.querySelector('[role="status"]')).toBeTruthy();
          expect(
            el.shadowRoot?.querySelector('.swc-ResponseStatus-row--processing')
          ).toBeTruthy();
          const loader = el.shadowRoot?.querySelector('swc-pixel-loader');
          expect(loader).toBeTruthy();
          expect(loader?.getAttribute('preset')).toBe('mega');
        })
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
      'warns on an unsupported loader value and renders the mega preset',
      () =>
        withWarningSpy(async (warnCalls) => {
          el.setAttribute('loader', 'not-a-preset-or-icon');
          await el.updateComplete;

          expect(el.getAttribute('loader')).toBe('not-a-preset-or-icon');
          expect(
            el.shadowRoot
              ?.querySelector('swc-pixel-loader')
              ?.getAttribute('preset')
          ).toBe('mega');
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning names the property and received value'
          ).toMatch(/"loader".*"not-a-preset-or-icon"/);
        })
    );

    await step('does not warn on valid loader values', () =>
      withWarningSpy(async (warnCalls) => {
        el.loader = 'cc';
        await el.updateComplete;
        el.loader = 'wand';
        await el.updateComplete;
        expect(warnCalls.length, 'no warnings for valid loaders').toBe(0);
      })
    );
  },
};

export const FirstStepTransitionTest: Story = {
  render: () => html`
    <swc-response-status status="active">
      <span slot="label">Generating response</span>
    </swc-response-status>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );
    const header = el.shadowRoot?.querySelector<HTMLElement>(
      '.swc-ResponseStatus-row'
    );
    const loader = el.shadowRoot?.querySelector('swc-pixel-loader');

    await step('a status without steps is not a button', async () => {
      expect(header?.querySelector('[role="status"]')).toBeTruthy();
      expect(header?.querySelector('button')).toBeNull();
      expect(header?.hasAttribute('tabindex')).toBe(false);
      expect(loader).toBeTruthy();
    });

    await step('the first step preserves the header and loader', async () => {
      el.appendChild(document.createElement('swc-response-status-step'));
      await waitFor(() => {
        expect(
          header
            ?.querySelector('button.swc-ResponseStatus-headerTrail')
            ?.getAttribute('aria-expanded')
        ).toBe('false');
      });

      expect(el.shadowRoot?.querySelector('.swc-ResponseStatus-row')).toBe(
        header
      );
      expect(el.shadowRoot?.querySelector('swc-pixel-loader')).toBe(loader);
      expect(
        header?.querySelector('button')?.getAttribute('aria-controls')
      ).toBe(el.shadowRoot?.querySelector('.swc-ResponseStatus-panel')?.id);
    });

    await step('Enter and Space toggle the disclosure', async () => {
      const button = header?.querySelector('button');
      button?.focus();
      await userEvent.keyboard('{Enter}');
      await el.updateComplete;
      expect(el.open).toBe(true);

      await userEvent.keyboard(' ');
      await el.updateComplete;
      expect(el.open).toBe(false);
    });
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
          },
          { timeout: 2000 }
        );
      }
    );

    await step('warns on unsupported step statuses and renders active', () =>
      withWarningSpy(async (warnCalls) => {
        const invalidStep = document.createElement('swc-response-status-step');
        invalidStep.setAttribute('status', 'pending');
        invalidStep.innerHTML = `
        <span slot="label">Unsupported pending step</span>
        <span slot="description">This should still render as active.</span>
      `;

        el.append(invalidStep);
        await el.updateComplete;

        // The raw attribute is kept as set; the step's own rendering falls back
        // to `active` for an unsupported value.
        await waitFor(
          () => {
            expect(invalidStep.getAttribute('status')).toBe('pending');
            expect(
              invalidStep.shadowRoot?.querySelector(
                '.swc-ResponseStatusStep-icon--active'
              )
            ).toBeTruthy();
          },
          { timeout: 2000 }
        );
        expect(
          warnCalls.some((call) => call[0] === invalidStep),
          'the step warns about its own status'
        ).toBe(true);
      })
    );
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
          el.querySelectorAll('swc-response-status-step')
        );
        const labels = renderedSteps.map((renderedStep) =>
          stepLabelText(renderedStep)
        );
        const statuses = renderedSteps.map((renderedStep) =>
          renderedStep.getAttribute('status')
        );
        const details = renderedSteps
          .map((renderedStep) => stepDescriptionText(renderedStep))
          .filter(Boolean);

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
          const statuses = Array.from(
            el.querySelectorAll('swc-response-status-step')
          ).map((renderedStep) => renderedStep.getAttribute('status'));

          expect(statuses).toEqual(['stopped', 'active', 'complete']);
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
        '.swc-ResponseStatus-headerTrail--button'
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

    const stepEls = (): ResponseStatusStep[] =>
      Array.from(el.querySelectorAll('swc-response-status-step'));

    const stepToggles = (): HTMLButtonElement[] =>
      stepEls()
        .map((stepEl) =>
          stepEl.shadowRoot?.querySelector<HTMLButtonElement>(
            '.swc-ResponseStatusStep-toggle'
          )
        )
        .filter((toggle): toggle is HTMLButtonElement => Boolean(toggle));

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
        // Each toggle's `aria-controls` id lives in its own step's shadow
        // root, not the parent's.
        const root = toggle.getRootNode() as ShadowRoot;
        expect(root.getElementById(controls as string)).toBeTruthy();
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
            const steps = stepEls();
            const toggles = stepToggles();
            expect(toggles).toHaveLength(2);
            expect(stepLabelText(steps[0])).toBe(
              'Searching repositories for Europe trips'
            );
            expect(toggles[0]?.getAttribute('aria-expanded')).toBe('true');
            expect(stepLabelText(steps[1])).toBe('Compose response');
            expect(toggles[1]?.getAttribute('aria-expanded')).toBe('false');
          },
          { timeout: 2000 }
        );
      }
    );

    await step(
      "a later programmatic write to a step's `open` property is respected after a user toggle",
      async () => {
        // The remaining first step starts expanded (toggled open earlier).
        // A user toggle writes through to the element's own `open` property,
        // so a subsequent external write is not shadowed by a stale override.
        const stepEl = el.querySelector('swc-response-status-step');
        expect(stepEl?.open).toBe(true);

        stepEl!.open = false;
        await el.updateComplete;

        await waitFor(
          () => {
            expect(stepToggles()[0]?.getAttribute('aria-expanded')).toBe(
              'false'
            );
          },
          { timeout: 2000 }
        );
        expect(stepEl?.open).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Overflowing step details get a focusable scroll region
// ──────────────────────────────────────────────────────────────

export const DetailOverflowVisibilityTest: Story = {
  ...LongDescription,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    // `LongDescription` step index 1 is the only open step long enough to
    // overflow the capped height.
    const overflowingStep = (): ResponseStatusStep | undefined =>
      Array.from(el.querySelectorAll('swc-response-status-step'))[1];
    const overflowingRegion = (): HTMLElement | null | undefined =>
      overflowingStep()?.shadowRoot?.querySelector<HTMLElement>(
        '.swc-ResponseStatusStep-detailScroll'
      );
    const overflowingToggle = (): HTMLButtonElement | null | undefined =>
      overflowingStep()?.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-ResponseStatusStep-toggle'
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

        expect(overflowingRegion()?.classList).toContain(
          'swc-ResponseStatusStep-detailScroll--overflows'
        );
        expect(getComputedStyle(overflowingRegion()!, '::before').content).toBe(
          '""'
        );
      }
    );

    await step(
      'collapsing then reopening the step re-measures overflow',
      async () => {
        // Overflow is measured once per toggle-open, not continuously: a
        // collapse/reopen cycle is the trigger for a fresh measurement.
        overflowingToggle()?.click();
        await overflowingStep()?.updateComplete;
        expect(overflowingStep()?.open).toBe(false);

        overflowingToggle()?.click();
        await overflowingStep()?.updateComplete;

        await waitFor(
          () => {
            expect(overflowingRegion()?.hasAttribute('tabindex')).toBe(true);
          },
          { timeout: 2000 }
        );
      }
    );

    await step(
      'a programmatic write to `open` (not a click) still measures overflow',
      async () => {
        // Freshly created and closed: overflow has never been measured, so
        // this only proves the fix if the tabindex appears from that cold
        // state, not because a prior click already measured it.
        const freshStep = document.createElement(
          'swc-response-status-step'
        ) as ResponseStatusStep;
        freshStep.innerHTML = overflowingStep()!.innerHTML;
        canvasElement.appendChild(freshStep);
        await freshStep.updateComplete;

        const freshRegion = (): HTMLElement | null | undefined =>
          freshStep.shadowRoot?.querySelector<HTMLElement>(
            '.swc-ResponseStatusStep-detailScroll'
          );
        expect(freshRegion()?.hasAttribute('tabindex')).toBe(false);

        freshStep.open = true;
        await freshStep.updateComplete;

        await waitFor(
          () => {
            expect(freshRegion()?.hasAttribute('tabindex')).toBe(true);
          },
          { timeout: 2000 }
        );

        freshStep.remove();
      }
    );

    await step(
      'a short, non-overflowing description does not get a tabindex',
      async () => {
        // Regression: the sticky fade pseudo-elements (see .css) reserve
        // their own negative-margined layout space inside the scroll
        // region, which can inflate `scrollHeight` even when the content
        // doesn't visually overflow. A short description must not be
        // measured as overflowing because of that.
        const shortStep = document.createElement(
          'swc-response-status-step'
        ) as ResponseStatusStep;
        shortStep.setAttribute('status', 'complete');
        shortStep.innerHTML = `
          <span slot="label">Short step</span>
          <span slot="description">A short one-line description.</span>
        `;
        canvasElement.appendChild(shortStep);
        await shortStep.updateComplete;

        shortStep.open = true;
        await shortStep.updateComplete;
        await new Promise((resolve) => requestAnimationFrame(resolve));

        const shortRegion = shortStep.shadowRoot?.querySelector<HTMLElement>(
          '.swc-ResponseStatusStep-detailScroll'
        );
        expect(shortRegion?.hasAttribute('tabindex')).toBe(false);

        expect(shortRegion?.classList).not.toContain(
          'swc-ResponseStatusStep-detailScroll--overflows'
        );
        expect(getComputedStyle(shortRegion!, '::before').content).toBe('none');

        shortStep.remove();
      }
    );

    await step(
      'a short but wide code sample overflows horizontally and still gets a tabindex',
      async () => {
        const wideStep = document.createElement(
          'swc-response-status-step'
        ) as ResponseStatusStep;
        wideStep.setAttribute('status', 'complete');
        wideStep.innerHTML = `
          <span slot="label">Wide step</span>
          <pre>const veryLongVariableNameThatKeepsGoingAndGoingAndGoing = 'a value long enough to overflow the detail panel horizontally';</pre>
        `;
        canvasElement.appendChild(wideStep);
        await wideStep.updateComplete;

        wideStep.open = true;
        await wideStep.updateComplete;

        const wideRegion = (): HTMLElement | null | undefined =>
          wideStep.shadowRoot?.querySelector<HTMLElement>(
            '.swc-ResponseStatusStep-detailScroll'
          );

        await waitFor(
          () => {
            const region = wideRegion();
            if (!region) {
              throw new Error('Expected the description scroll region');
            }

            expect(
              region.getAttribute('tabindex'),
              'remains keyboard-focusable'
            ).toBe('0');

            expect(
              region.clientHeight,
              'the region is rendered'
            ).toBeGreaterThan(0);

            expect(
              region.scrollWidth,
              'wide code still scrolls horizontally'
            ).toBeGreaterThan(region.clientWidth);

            expect(
              region.scrollHeight,
              'a single code line must not acquire vertical overflow'
            ).toBeLessThanOrEqual(region.clientHeight + 1);

            expect(
              getComputedStyle(region, '::before').content,
              'horizontal-only overflow does not trigger the vertical fade'
            ).toBe('none');
          },
          { timeout: 2000 }
        );

        wideStep.remove();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Growing a description while its step is already open updates the
// overflow fade/focusability without requiring a close/reopen
// ──────────────────────────────────────────────────────────────

export const DescriptionOverflowUpdatesTest: Story = {
  render: () => html`
    <swc-response-status-step status="complete" open>
      <span slot="label">Reviewing source documents</span>
      <span slot="description">Review started.</span>
    </swc-response-status-step>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'updates overflow fades when an open description grows',
      async () => {
        const el = await getComponent<ResponseStatusStep>(
          canvasElement,
          'swc-response-status-step'
        );
        const region = el.shadowRoot?.querySelector<HTMLElement>(
          '.swc-ResponseStatusStep-detailScroll'
        );
        const description = el.querySelector('[slot="description"]');

        if (!region || !description) {
          throw new Error('Expected the description and its scroll region');
        }

        await waitFor(() => {
          expect(
            region.clientHeight,
            'the description is rendered'
          ).toBeGreaterThan(0);

          expect(
            region.scrollHeight,
            'the initial short description fits'
          ).toBeLessThanOrEqual(region.clientHeight + 1);

          expect(
            getComputedStyle(region, '::after').content,
            'short content has no fade overlay'
          ).toBe('none');
        });

        description.textContent =
          'Reviewing source documents and cross-checking the reported figures. '.repeat(
            100
          );
        await el.updateComplete;

        await waitFor(() => {
          expect(el.open, 'the step remains open').toBe(true);

          expect(
            region.scrollHeight,
            'the updated description overflows vertically'
          ).toBeGreaterThan(region.clientHeight + 1);

          expect(
            getComputedStyle(region, '::after').content,
            'the fade overlay appears without reopening the step'
          ).toBe('""');
        });
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: A slotted `<pre>` toggles the step's code styling on and off
// ──────────────────────────────────────────────────────────────

export const StepCodeToggleTest: Story = {
  render: () => html`
    <swc-response-status-step status="complete">
      <span slot="label">Reviewed the source material</span>
      <span slot="description">A plain-text description.</span>
    </swc-response-status-step>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<ResponseStatusStep>(
      canvasElement,
      'swc-response-status-step'
    );
    const scroll = (): HTMLElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLElement>(
        '.swc-ResponseStatusStep-detailScroll'
      );

    await step(
      'does not get the code class with a plain-text description',
      async () => {
        await waitFor(() => {
          expect(
            scroll()?.classList.contains(
              'swc-ResponseStatusStep-detailScroll--code'
            )
          ).toBe(false);
        });
      }
    );

    await step('adds the code class once a `<pre>` is slotted in', async () => {
      const description = el.querySelector('[slot="description"]');
      description?.remove();

      const pre = document.createElement('pre');
      pre.textContent = 'const value = 1;';
      el.appendChild(pre);
      await el.updateComplete;

      await waitFor(() => {
        expect(
          scroll()?.classList.contains(
            'swc-ResponseStatusStep-detailScroll--code'
          )
        ).toBe(true);
      });
    });

    await step(
      'removes the code class once the `<pre>` is removed again',
      async () => {
        el.querySelector('pre')?.remove();
        const description = document.createElement('span');
        description.setAttribute('slot', 'description');
        description.textContent = 'Back to a plain-text description.';
        el.appendChild(description);
        await el.updateComplete;

        await waitFor(() => {
          expect(
            scroll()?.classList.contains(
              'swc-ResponseStatusStep-detailScroll--code'
            )
          ).toBe(false);
        });
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Completed header label remains readable at narrow widths
// ──────────────────────────────────────────────────────────────

export const HeaderLabelWrapTest: Story = {
  render: () => html`
    <div style="inline-size: 160px;">
      <swc-response-status status="complete">
        <span slot="label">
          A deliberately long status label written to exceed two full lines of
          wrapped text at this width so completed responses can still be read in
          full without expanding a panel
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
      'wraps the complete label without hiding the end of the text',
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

            expect(labelHeight).toBeGreaterThan(lineHeight * 2 + 1);

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

    await step('allows consumers to cap long labels explicitly', async () => {
      el.style.setProperty('--swc-response-status-label-max-lines', '2');
      const label = el.shadowRoot?.querySelector<HTMLElement>(
        '.swc-ResponseStatus-headerTrailLine .swc-ResponseStatus-label'
      );
      const lineHeight = parseFloat(
        getComputedStyle(label as HTMLElement).lineHeight || '0'
      );
      expect(label?.getBoundingClientRect().height).toBeLessThanOrEqual(
        lineHeight * 2 + 1
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Completed disclosure labels truncate at one line
// ──────────────────────────────────────────────────────────────

export const CompletedDisclosureLabelTest: Story = {
  render: () => html`
    <div style="inline-size: 240px;">
      <swc-response-status status="complete" open>
        <span slot="label">
          A deliberately long completed response status label that should be
          clamped at the available width when the execution steps disclosure is
          present
        </span>
        <swc-response-status-step status="complete">
          <span slot="label">Reviewed the source material</span>
        </swc-response-status-step>
      </swc-response-status>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    await step('clamps the disclosure label to one line', async () => {
      const label = el.shadowRoot?.querySelector<HTMLElement>(
        '.swc-ResponseStatus-headerTrailLine--settled .swc-ResponseStatus-label'
      );
      expect(label).toBeTruthy();

      const lineHeight = parseFloat(getComputedStyle(label!).lineHeight);
      await waitFor(() => {
        expect(label!.getBoundingClientRect().height).toBeLessThanOrEqual(
          lineHeight + 1
        );
        expect(label!.scrollHeight).toBeGreaterThan(label!.clientHeight);
      });
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Agentic status width scales with its parent container
// ──────────────────────────────────────────────────────────────

export const AgenticWidthTest: Story = {
  render: () => html`
    <div
      class="width-test-container"
      style="display: flex; inline-size: 320px;"
    >
      <swc-response-status status="active"></swc-response-status>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>(
      '.width-test-container'
    );
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );
    const content = el.shadowRoot?.querySelector<HTMLElement>(
      '.swc-ResponseStatus'
    );

    await step(
      'caps at 90% of a narrow container and interpolates down to 65% in a wide one',
      async () => {
        expect(container).toBeTruthy();
        expect(content).toBeTruthy();
        // The clamp lives on `:host`, so the host's own box and its painted
        // content clamp together instead of the host staying full-width
        // while only the inner content is constrained. Assert the two
        // boundary cases only (the 90% cap and the 65% floor), rather than
        // every width the `calc()` interpolates through in between.
        expect(el.getBoundingClientRect().width).toBe(288);
        expect(content!.getBoundingClientRect().width).toBe(288);

        container!.style.inlineSize = '1280px';
        expect(el.getBoundingClientRect().width).toBeCloseTo(832, 0);
        expect(content!.getBoundingClientRect().width).toBeCloseTo(832, 0);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Loader pauses on disconnect and resumes on reconnect
// ──────────────────────────────────────────────────────────────

export const LoaderReconnectTest: Story = {
  render: () => html`
    <swc-response-status status="active"></swc-response-status>
  `,
  play: async ({ canvasElement }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );

    el.loader = 'cc';
    await el.updateComplete;

    const loader = (): Element | null | undefined =>
      el.shadowRoot?.querySelector('swc-pixel-loader');
    expect(loader()?.hasAttribute('paused')).toBe(true);

    el.remove();
    canvasElement.appendChild(el);
    await el.updateComplete;

    expect(loader()?.hasAttribute('paused')).toBe(false);
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const AttributeRemovalResetsTest: Story = {
  render: () => html`
    <swc-response-status>
      <span slot="label">Thinking</span>
    </swc-response-status>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<TestResponseStatus>(
      canvasElement,
      'swc-response-status'
    );
    const cases: [string, string, string, unknown][] = [
      ['status', 'complete', 'status', 'active'],
      ['loader', 'cc', 'loader', 'mega'],
    ];

    for (const [attribute, value, property, defaultValue] of cases) {
      await step(
        `resets ${attribute} to its default without a warning when removed`,
        () =>
          withWarningSpy(async (warnCalls) => {
            el.setAttribute(attribute, value);
            await el.updateComplete;
            el.removeAttribute(attribute);
            await el.updateComplete;

            expect(
              (el as unknown as Record<string, unknown>)[property],
              `${property} after removal`
            ).toBe(defaultValue);
            expect(warnCalls.length, 'no warning when unset').toBe(0);
          })
      );
    }
  },
};

export const StepStatusRemovalResetsTest: Story = {
  render: () => html`
    <swc-response-status>
      <span slot="label">Thinking</span>
      <swc-response-status-step status="complete">
        <span slot="label">Step</span>
      </swc-response-status-step>
    </swc-response-status>
  `,
  play: async ({ canvasElement, step }) => {
    const stepEl = await getComponent<ResponseStatusStep>(
      canvasElement,
      'swc-response-status-step'
    );

    await step(
      'resets the step status to active without a warning when removed',
      () =>
        withWarningSpy(async (warnCalls) => {
          stepEl.removeAttribute('status');
          await stepEl.updateComplete;

          expect(stepEl.status, 'status after removal').toBe('active');
          expect(warnCalls.length, 'no warning when unset').toBe(0);
        })
    );
  },
};
