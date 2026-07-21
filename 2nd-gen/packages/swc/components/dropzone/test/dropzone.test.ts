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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Dropzone } from '@adobe/spectrum-wc/dropzone';
import {
  DROP_EFFECTS,
  DROPZONE_VALID_SIZES,
  SWC_DROPZONE_DRAGLEAVE_EVENT,
  SWC_DROPZONE_DRAGOVER_EVENT,
  SWC_DROPZONE_DROP_EVENT,
  SWC_DROPZONE_SHOULD_ACCEPT_EVENT,
} from '@adobe/spectrum-wc-core/components/dropzone';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/dropzone/swc-dropzone.js';

import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  BrowseAndDrop,
  Overview,
  Sizes,
  States,
} from '../stories/dropzone.stories.js';

export default {
  ...meta,
  title: 'Drop Zone/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// Creates a synthetic DragEvent, optionally with a DataTransfer.
const makeDragEvent = (type: string, dt?: DataTransfer): DragEvent =>
  new DragEvent(type, {
    cancelable: true,
    bubbles: true,
    composed: true,
    dataTransfer: dt,
  });

// Returns the textContent of the shadow DOM status region.
const statusText = (dropzone: Dropzone): string =>
  dropzone.renderRoot.querySelector('[role="status"]')?.textContent ?? '';

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step('has role="group" on host element', async () => {
      expect(dropzone.getAttribute('role'), 'role attribute is group').toBe(
        'group'
      );
    });

    await step('has no tabindex on host element', async () => {
      expect(dropzone.hasAttribute('tabindex'), 'host has no tabindex').toBe(
        false
      );
    });

    await step('renders role="status" in shadow DOM', async () => {
      const status = dropzone.renderRoot.querySelector('[role="status"]');
      expect(status, 'status element exists in shadow root').toBeTruthy();
    });

    await step('has correct default property values', async () => {
      expect(dropzone.dragged, 'dragged defaults to false').toBe(false);
      expect(dropzone.filled, 'filled defaults to false').toBe(false);
      expect(dropzone.size, 'size defaults to m').toBe('m');
      expect(dropzone.dropEffect, 'dropEffect defaults to copy').toBe('copy');
    });

    await step('status region is empty in default state', async () => {
      expect(statusText(dropzone), 'status is empty by default').toBe('');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyReflectionTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step('dragged=true reflects to [dragged] attribute', async () => {
      dropzone.dragged = true;
      await dropzone.updateComplete;
      expect(
        dropzone.hasAttribute('dragged'),
        'dragged attribute added when dragged=true'
      ).toBe(true);
    });

    await step('dragged=false removes [dragged] attribute', async () => {
      dropzone.dragged = false;
      await dropzone.updateComplete;
      expect(
        dropzone.hasAttribute('dragged'),
        'dragged attribute removed when dragged=false'
      ).toBe(false);
    });

    await step('filled=true reflects to [filled] attribute', async () => {
      dropzone.filled = true;
      await dropzone.updateComplete;
      expect(
        dropzone.hasAttribute('filled'),
        'filled attribute added when filled=true'
      ).toBe(true);
    });

    await step('filled=false removes [filled] attribute', async () => {
      dropzone.filled = false;
      await dropzone.updateComplete;
      expect(
        dropzone.hasAttribute('filled'),
        'filled attribute removed when filled=false'
      ).toBe(false);
    });
  },
};

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('reflects all valid sizes', async () => {
      for (const size of DROPZONE_VALID_SIZES) {
        const dropzone = canvasElement.querySelector(
          `swc-dropzone[size="${size}"]`
        ) as Dropzone;
        await dropzone.updateComplete;
        expect(dropzone.size, `size="${size}" is reflected`).toBe(size);
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Drag over
// ──────────────────────────────────────────────────────────────

export const DragOverTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'dragover without dataTransfer always calls preventDefault (regression guard)',
      async () => {
        const event = makeDragEvent('dragover');
        dropzone.dispatchEvent(event);
        expect(
          event.defaultPrevented,
          'preventDefault called even without dataTransfer'
        ).toBe(true);
        await dropzone.updateComplete;
        expect(
          dropzone.dragged,
          'dragged stays false when dataTransfer is null'
        ).toBe(false);
      }
    );

    await step(
      'dragover with dataTransfer sets dragged=true and fires swc-dropzone-dragover',
      async () => {
        let dragoverFired = false;
        dropzone.addEventListener(
          SWC_DROPZONE_DRAGOVER_EVENT,
          () => {
            dragoverFired = true;
          },
          { once: true }
        );

        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;

        expect(dropzone.dragged, 'dragged becomes true on dragover').toBe(true);
        expect(
          dragoverFired,
          'swc-dropzone-dragover event fires on accepted dragover'
        ).toBe(true);
      }
    );

    await step(
      'swc-dropzone-dragover fires on every dragover, not only the first',
      async () => {
        // dropzone.dragged is already true from the previous step.
        let dragoverCount = 0;
        const listener = (): void => {
          dragoverCount++;
        };
        dropzone.addEventListener(SWC_DROPZONE_DRAGOVER_EVENT, listener);

        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));

        dropzone.removeEventListener(SWC_DROPZONE_DRAGOVER_EVENT, listener);
        expect(
          dragoverCount,
          'swc-dropzone-dragover fires on each dragover'
        ).toBe(2);
      }
    );

    await step('reset dragged for subsequent tests', async () => {
      dropzone.dragged = false;
      await dropzone.updateComplete;
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Should-accept cancellation
// ──────────────────────────────────────────────────────────────

export const ShouldAcceptTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'cancelling swc-dropzone-should-accept prevents dragged=true',
      async () => {
        dropzone.addEventListener(
          SWC_DROPZONE_SHOULD_ACCEPT_EVENT,
          (event) => event.preventDefault(),
          { once: true }
        );

        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;

        expect(
          dropzone.dragged,
          'dragged stays false when should-accept is cancelled'
        ).toBe(false);
      }
    );

    await step(
      'cancelling swc-dropzone-should-accept sets dataTransfer.dropEffect to "none"',
      async () => {
        dropzone.addEventListener(
          SWC_DROPZONE_SHOULD_ACCEPT_EVENT,
          (event) => event.preventDefault(),
          { once: true }
        );

        const dt = new DataTransfer();
        dropzone.dispatchEvent(makeDragEvent('dragover', dt));

        expect(
          dt.dropEffect,
          'dropEffect is "none" when should-accept is cancelled'
        ).toBe('none');
      }
    );

    await step(
      'dragleave after rejected dragover still fires swc-dropzone-dragleave',
      async () => {
        const reject = (event: Event): void => event.preventDefault();
        dropzone.addEventListener(SWC_DROPZONE_SHOULD_ACCEPT_EVENT, reject);
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(dropzone.dragged, 'precondition: dragged is false').toBe(false);
        dropzone.removeEventListener(SWC_DROPZONE_SHOULD_ACCEPT_EVENT, reject);

        const leaveSettled = new Promise<void>((resolve) => {
          dropzone.addEventListener(
            SWC_DROPZONE_DRAGLEAVE_EVENT,
            () => resolve(),
            {
              once: true,
            }
          );
        });
        dropzone.dispatchEvent(makeDragEvent('dragleave'));
        await leaveSettled;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Drag leave (debounce)
// ──────────────────────────────────────────────────────────────

export const DragLeaveTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'dragleave debounces 100 ms then sets dragged=false',
      async () => {
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(dropzone.dragged, 'dragged is true before dragleave').toBe(true);

        const leaveSettled = new Promise<void>((resolve) => {
          dropzone.addEventListener(
            SWC_DROPZONE_DRAGLEAVE_EVENT,
            () => resolve(),
            {
              once: true,
            }
          );
        });
        dropzone.dispatchEvent(makeDragEvent('dragleave'));
        expect(
          dropzone.dragged,
          'dragged stays true immediately after dragleave (debouncing)'
        ).toBe(true);

        await leaveSettled;
        expect(
          dropzone.dragged,
          'dragged becomes false after the 100 ms debounce'
        ).toBe(false);
      }
    );

    await step(
      'dragleave fires swc-dropzone-dragleave event after the debounce',
      async () => {
        const leaveSettled = new Promise<void>((resolve) => {
          dropzone.addEventListener(
            SWC_DROPZONE_DRAGLEAVE_EVENT,
            () => resolve(),
            {
              once: true,
            }
          );
        });

        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        dropzone.dispatchEvent(makeDragEvent('dragleave'));

        await leaveSettled;
      }
    );

    await step(
      'dragleave is ignored when relatedTarget is inside the drop zone',
      async () => {
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(
          dropzone.dragged,
          'dragged is true before internal dragleave'
        ).toBe(true);

        const browseButton = dropzone.querySelector('swc-button');
        dropzone.dispatchEvent(
          new DragEvent('dragleave', {
            bubbles: true,
            composed: true,
            relatedTarget: browseButton,
          })
        );

        // The contains() guard short-circuits immediately for contained relatedTargets;
        // no timer is scheduled, so updateComplete is sufficient.
        await dropzone.updateComplete;
        expect(
          dropzone.dragged,
          'dragged stays true when leaving to internal child'
        ).toBe(true);

        dropzone.dragged = false;
        await dropzone.updateComplete;
      }
    );

    await step('new dragover cancels the pending dragleave timer', async () => {
      dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
      await dropzone.updateComplete;

      let spuriousLeave = false;
      dropzone.addEventListener(
        SWC_DROPZONE_DRAGLEAVE_EVENT,
        () => {
          spuriousLeave = true;
        },
        { once: true }
      );

      dropzone.dispatchEvent(makeDragEvent('dragleave'));
      // Re-enter immediately: this must clear the timer.
      dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
      await dropzone.updateComplete;

      // Negative assertion: must wait past the debounce window to confirm the timer was cancelled.
      await new Promise<void>((r) => setTimeout(r, 150));
      expect(
        spuriousLeave,
        'swc-dropzone-dragleave not fired after timer cancellation'
      ).toBe(false);
      expect(
        dropzone.dragged,
        'dragged stays true because dragover cancelled the dragleave timer'
      ).toBe(true);

      dropzone.dragged = false;
      await dropzone.updateComplete;
    });

    await step('drop cancels the pending dragleave timer', async () => {
      dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
      await dropzone.updateComplete;

      let spuriousLeave = false;
      dropzone.addEventListener(
        SWC_DROPZONE_DRAGLEAVE_EVENT,
        () => {
          spuriousLeave = true;
        },
        { once: true }
      );

      dropzone.dispatchEvent(makeDragEvent('dragleave'));
      // Drop immediately: this must clear the pending debounce timer.
      dropzone.dispatchEvent(makeDragEvent('drop'));
      await dropzone.updateComplete;

      // Negative assertion: must wait past the debounce window to confirm the timer was cancelled.
      await new Promise<void>((r) => setTimeout(r, 150));
      expect(
        spuriousLeave,
        'swc-dropzone-dragleave not fired after drop cancelled the timer'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Drop
// ──────────────────────────────────────────────────────────────

export const DropTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'swc-dropzone-drop fires while dragged is still true',
      async () => {
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(dropzone.dragged, 'precondition: dragged is true').toBe(true);

        let draggedDuringDrop: boolean | null = null;
        dropzone.addEventListener(
          SWC_DROPZONE_DROP_EVENT,
          () => {
            draggedDuringDrop = dropzone.dragged;
          },
          { once: true }
        );

        dropzone.dispatchEvent(makeDragEvent('drop'));
        await dropzone.updateComplete;

        expect(
          draggedDuringDrop,
          'dragged is true when swc-dropzone-drop fires'
        ).toBe(true);
      }
    );

    await step('dragged becomes false after drop completes', async () => {
      expect(dropzone.dragged, 'dragged is false after drop').toBe(false);
    });

    await step('drop without prior drag state fires no event', async () => {
      expect(dropzone.dragged, 'precondition: dragged is false').toBe(false);

      let dropFired = false;
      dropzone.addEventListener(
        SWC_DROPZONE_DROP_EVENT,
        () => {
          dropFired = true;
        },
        { once: true }
      );

      dropzone.dispatchEvent(makeDragEvent('drop'));
      await dropzone.updateComplete;

      expect(
        dropFired,
        'swc-dropzone-drop not fired when not in drag state'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Status region text
// ──────────────────────────────────────────────────────────────

export const StatusRegionTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step('status is empty in the default state', async () => {
      expect(statusText(dropzone), 'status is empty initially').toBe('');
    });

    await step(
      'status reads "File ready to drop" when dragged=true',
      async () => {
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(statusText(dropzone), 'status while dragging').toBe(
          'File ready to drop'
        );
      }
    );

    await step(
      'status reads "File accepted" when filled=true and dragged=false',
      async () => {
        expect(
          dropzone.dragged,
          'precondition: dragged is true before drop'
        ).toBe(true);
        dropzone.dispatchEvent(makeDragEvent('drop'));
        dropzone.filled = true;
        await dropzone.updateComplete;

        expect(dropzone.dragged, 'dragged is false after drop').toBe(false);
        expect(statusText(dropzone), 'status after successful drop').toBe(
          'File accepted'
        );
      }
    );

    await step(
      'status reads "Drop to replace existing file" when dragged=true and filled=true',
      async () => {
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(
          statusText(dropzone),
          'status when dragging over filled zone'
        ).toBe('Drop to replace existing file');
      }
    );

    await step(
      'status returns to "File accepted" when dragleave resolves on a filled zone',
      async () => {
        const leaveSettled = new Promise<void>((resolve) => {
          dropzone.addEventListener(
            SWC_DROPZONE_DRAGLEAVE_EVENT,
            () => resolve(),
            {
              once: true,
            }
          );
        });
        dropzone.dispatchEvent(makeDragEvent('dragleave'));
        await leaveSettled;
        await dropzone.updateComplete;
        expect(
          statusText(dropzone),
          'status after drag leaves filled zone'
        ).toBe('File accepted');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: States story verification
// ──────────────────────────────────────────────────────────────

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const dropzones = await getComponents<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );
    const [defaultDz, draggedDz, filledDz, filledAndDraggedDz] = dropzones;

    await step(
      'default drop zone has dragged=false and filled=false',
      async () => {
        expect(defaultDz.dragged, 'default: not dragged').toBe(false);
        expect(defaultDz.filled, 'default: not filled').toBe(false);
        expect(statusText(defaultDz), 'default status is empty').toBe('');
      }
    );

    await step(
      'dragged drop zone has correct state and status text',
      async () => {
        expect(draggedDz.dragged, 'dragged state: dragged=true').toBe(true);
        expect(draggedDz.filled, 'dragged state: filled=false').toBe(false);
        expect(statusText(draggedDz), 'dragged status text').toBe(
          'File ready to drop'
        );
      }
    );

    await step(
      'filled drop zone has correct state and status text',
      async () => {
        expect(filledDz.filled, 'filled state: filled=true').toBe(true);
        expect(filledDz.dragged, 'filled state: dragged=false').toBe(false);
        expect(statusText(filledDz), 'filled status text').toBe(
          'File accepted'
        );
      }
    );

    await step(
      'filled-and-dragged drop zone has both states and correct status text',
      async () => {
        expect(
          filledAndDraggedDz.filled,
          'filled-and-dragged: filled=true'
        ).toBe(true);
        expect(
          filledAndDraggedDz.dragged,
          'filled-and-dragged: dragged=true'
        ).toBe(true);
        expect(
          statusText(filledAndDraggedDz),
          'filled-and-dragged status text'
        ).toBe('Drop to replace existing file');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: dropEffect validation
// ──────────────────────────────────────────────────────────────

export const DropEffectTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step('accepts all valid dropEffect values', async () => {
      for (const effect of DROP_EFFECTS) {
        dropzone.dropEffect = effect;
        expect(dropzone.dropEffect, `dropEffect="${effect}" accepted`).toBe(
          effect
        );
      }
    });

    await step(
      'rejects invalid dropEffect and emits a warning in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          dropzone.dropEffect = 'copy';
          dropzone.dropEffect = 'invalid-effect' as Dropzone['dropEffect'];
          expect(
            dropzone.dropEffect,
            'invalid value rejected; stays at prior valid value'
          ).toBe('copy');
          expect(
            warnCalls.length,
            'warning emitted for invalid dropEffect'
          ).toBeGreaterThan(0);
        })
    );

    await step(
      'reflects the drop-effect attribute at initial parse',
      async () => {
        const fresh = await fixture<Dropzone>(html`
          <swc-dropzone aria-label="Upload files" drop-effect="move">
            <swc-button variant="accent">Browse files</swc-button>
          </swc-dropzone>
        `);
        expect(
          fresh.dropEffect,
          'drop-effect attribute parsed into dropEffect on connect'
        ).toBe('move');
        fresh.parentElement?.remove();
      }
    );

    await step(
      'reacts to drop-effect attribute changes at runtime',
      async () => {
        dropzone.setAttribute('drop-effect', 'link');
        await dropzone.updateComplete;
        expect(
          dropzone.dropEffect,
          'dropEffect updates when the attribute changes'
        ).toBe('link');
      }
    );

    await step(
      'rejects an invalid drop-effect attribute and emits a warning',
      () =>
        withWarningSpy(async (warnCalls) => {
          dropzone.setAttribute('drop-effect', 'link');
          await dropzone.updateComplete;
          dropzone.setAttribute('drop-effect', 'invalid-effect');
          await dropzone.updateComplete;
          expect(
            dropzone.dropEffect,
            'invalid attribute value rejected; stays at prior valid value'
          ).toBe('link');
          expect(
            warnCalls.length,
            'warning emitted for invalid drop-effect attribute'
          ).toBeGreaterThan(0);
        })
    );

    await step(
      'removing the drop-effect attribute resets to the default without a warning',
      () =>
        withWarningSpy(async (warnCalls) => {
          dropzone.setAttribute('drop-effect', 'move');
          await dropzone.updateComplete;
          dropzone.removeAttribute('drop-effect');
          await dropzone.updateComplete;
          expect(
            dropzone.dropEffect,
            'dropEffect resets to the default when the attribute is removed'
          ).toBe('copy');
          expect(
            warnCalls.length,
            'no warning emitted when the attribute is removed'
          ).toBe(0);
        })
    );
  },
};

// ──────────────────────────────────────────
//    TEST: Dev mode warnings
// ──────────────────────────────────────────

export const MissingLabelWarningTest: Story = {
  render: () => html`
    <swc-dropzone>
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'warns in DEBUG mode when no aria-label or aria-labelledby is set',
      () =>
        withWarningSpy(async (warnCalls) => {
          // connectedCallback fires with DEBUG active before the spy is installed, consuming
          // the one-shot warning. Reset by giving the element a label (clears the flag),
          // then removing it and toggling dragged to trigger another warn check.
          dropzone.setAttribute('aria-label', 'reset');
          dropzone.dragged = true;
          await dropzone.updateComplete;
          dropzone.removeAttribute('aria-label');
          dropzone.dragged = false;
          await dropzone.updateComplete;

          expect(
            warnCalls.length,
            'warning emitted for missing accessible name'
          ).toBeGreaterThan(0);
        })
    );
  },
};

export const DisconnectDuringDragLeaveTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload files">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'disconnecting during dragleave debounce cancels the pending timer',
      async () => {
        dropzone.dispatchEvent(makeDragEvent('dragover', new DataTransfer()));
        await dropzone.updateComplete;
        expect(dropzone.dragged, 'precondition: dragged is true').toBe(true);

        let leaveFired = false;
        dropzone.addEventListener(SWC_DROPZONE_DRAGLEAVE_EVENT, () => {
          leaveFired = true;
        });

        dropzone.dispatchEvent(makeDragEvent('dragleave'));
        const parent = dropzone.parentElement!;
        parent.removeChild(dropzone);

        // Negative assertion: must wait past the debounce window.
        await new Promise<void>((r) => setTimeout(r, 150));
        expect(
          leaveFired,
          'swc-dropzone-dragleave not fired after element disconnected'
        ).toBe(false);

        parent.appendChild(dropzone);
        await dropzone.updateComplete;
      }
    );
  },
};

export const AriaLabelNoWarningTest: Story = {
  render: () => html`
    <swc-dropzone aria-label="Upload profile photo">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'does not warn when aria-label provides the accessible name',
      () =>
        withWarningSpy(async (warnCalls) => {
          dropzone.dragged = true;
          await dropzone.updateComplete;

          expect(
            warnCalls.length,
            'no warning emitted when aria-label is present'
          ).toBe(0);
        })
    );
  },
};

export const AriaLabelledbyNoWarningTest: Story = {
  render: () => html`
    <span id="dz-label-ext">Drop your files here</span>
    <swc-dropzone aria-labelledby="dz-label-ext">
      <swc-button variant="accent">Browse files</swc-button>
    </swc-dropzone>
  `,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );

    await step(
      'does not warn when aria-labelledby provides the accessible name',
      () =>
        withWarningSpy(async (warnCalls) => {
          dropzone.dragged = true;
          await dropzone.updateComplete;

          expect(
            warnCalls.length,
            'no warning emitted when aria-labelledby is present'
          ).toBe(0);
        })
    );
  },
};

// ──────────────────────────────────────
//    TEST: Focus management on fill
// ──────────────────────────────────────

// Focus management here is the consumer's responsibility (see
// bindFilledStateHandlers in dropzone.stories.ts), not the component's:
// filled-content is consumer-authored, so this verifies the story's own
// handler moves focus correctly, not a component-level guarantee.
export const BrowseAndDropFocusTest: Story = {
  ...BrowseAndDrop,
  play: async ({ canvasElement, step }) => {
    const dropzone = await getComponent<Dropzone>(
      canvasElement,
      'swc-dropzone'
    );
    const browseButton = dropzone.querySelector(
      'swc-button:not([slot])'
    ) as HTMLElement;
    const replaceButton = dropzone.querySelector(
      '[slot="filled-content"] swc-button'
    ) as HTMLElement;

    await step(
      'moves focus to the replace control after the consumer handler accepts a drop',
      async () => {
        browseButton.focus();
        dropzone.dispatchEvent(
          new CustomEvent(SWC_DROPZONE_DROP_EVENT, {
            bubbles: true,
            composed: true,
            detail: {},
          })
        );
        await dropzone.updateComplete;

        expect(
          document.activeElement,
          'focus moves to the replace control'
        ).toBe(replaceButton);
      }
    );
  },
};
