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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../swc-prompt-field.js';
import '../../../upload-attachment/swc-upload-attachment.js';

import {
  createPermutations,
  forcedColorsVrtParameters,
  forcePseudoState,
  groupPermutationsBy,
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import type { PixelLoader } from '../../../pixel-loader/index.js';
import type { PromptField } from '../../PromptField.js';

// Metadata

const meta: Meta = {
  title: 'Conversational AI/Prompt field/Prompt field VRT',
  component: 'swc-prompt-field',
  tags: ['dev'],
  // Snapshot-only; without explicit argTypes the auto-generated controls also surface the component's private @state, so drop the panel.
  parameters: { controls: { disable: true } },
};

export default meta;

// Helpers

const VARIANTS = ['subtle', 'balanced', 'prominent'] as const;

const SHORT_PROMPT = 'Summarize the API changes in this branch.';
const LONG_PROMPT =
  'Draft a detailed launch plan covering positioning, target segments, channel strategy, budget allocation, and a week-by-week rollout timeline for the next two quarters, then list the key risks and open questions to review.';

type AttachmentKind =
  | 'none'
  | 'card'
  | 'cards'
  | 'media'
  | 'mediaBadge'
  | 'manyMedia';

// Every action button (upload, send, and both attachment-scroll chevrons),
// forced together so one snapshot captures all their hover/focus colors ahead
// of the swc-button swap.
const BUTTON_SELECTORS = [
  '.swc-PromptField-upload',
  '.swc-PromptField-send',
  '.swc-PromptField-attachments-scroll-prev',
  '.swc-PromptField-attachments-scroll-next',
];

type ButtonState = 'hover' | 'focus-visible';

const legalDisclaimerSlot = html`
  <p slot="legal" class="swc-Typography--links">
    Responses are generated using AI, and may be inaccurate. Check before using.
    <a
      href="https://www.adobe.com/legal/licenses-terms/adobe-gen-ai-user-guidelines.html"
    >
      AI User Guidelines
    </a>
  </p>
`;

const cardAttachment = (title: string, subtitle: string) => html`
  <swc-upload-attachment slot="attachment" type="card" dismissible>
    <div slot="thumbnail" role="img" aria-label=${subtitle}></div>
    <span slot="title">${title}</span>
    <span slot="subtitle">${subtitle}</span>
  </swc-upload-attachment>
`;

const mediaAttachment = (id: number, alt: string, badge?: string) => html`
  <swc-upload-attachment slot="attachment" type="media" dismissible>
    <img
      slot="thumbnail"
      src="https://picsum.photos/id/${id}/68/68"
      alt=${alt}
      style="inline-size: 100%; block-size: 100%; object-fit: cover;"
    />
    ${badge
      ? html`
          <span slot="badge">${badge}</span>
        `
      : nothing}
  </swc-upload-attachment>
`;

const attachmentSlot = (kind: AttachmentKind) => {
  switch (kind) {
    case 'card':
      return cardAttachment('Brand guidelines', 'PDF');
    case 'cards':
      return html`
        ${cardAttachment('Brand guidelines', 'PDF')}
        ${cardAttachment('Q2 metrics draft', 'XLSX')}
        ${cardAttachment('Launch brief', 'DOCX')}
      `;
    case 'media':
      return mediaAttachment(64, 'Campaign still');
    case 'mediaBadge':
      return html`
        ${mediaAttachment(64, 'Campaign still')}
        ${mediaAttachment(56, 'Storyboard frame', 'PDF')}
      `;
    // Enough tiles to overflow the composer width and expose the scroll
    // chevrons and edge fades.
    case 'manyMedia':
      return html`
        ${Array.from({ length: 9 }, (_, i) =>
          mediaAttachment([64, 56, 823][i % 3], `Frame ${i + 1}`)
        )}
      `;
    default:
      return nothing;
  }
};

type FieldCase = {
  group?: string;
  variant?: (typeof VARIANTS)[number];
  generating?: boolean;
  collapsed?: boolean;
  disabled?: boolean;
  dragged?: boolean;
  value?: string;
  attachment?: AttachmentKind;
  buttonState?: ButtonState;
};

// Fields render at a roomy composer width by default. Long prompts and the
// overflowing attachment strip get a narrow width instead, so wrapping and the
// scroll state actually trigger.
const renderField = ({
  variant = 'balanced',
  generating = false,
  collapsed = false,
  disabled = false,
  dragged = false,
  value = '',
  attachment = 'none',
  buttonState,
}: FieldCase) => {
  const constrained = value === LONG_PROMPT || attachment === 'manyMedia';
  const width = constrained
    ? 'inline-size: 380px;'
    : 'inline-size: 800px; max-inline-size: 90vw;';
  return html`
    <div style=${width}>
      <swc-prompt-field
        label="Prompt"
        placeholder="Ask a question, share an idea, or add a task."
        variant=${variant}
        ?generating=${generating}
        ?collapsed=${collapsed}
        ?disabled=${disabled}
        ?data-dragged-state=${dragged}
        value=${value}
        data-button-state=${buttonState ?? nothing}
      >
        ${attachmentSlot(attachment)} ${legalDisclaimerSlot}
      </swc-prompt-field>
    </div>
  `;
};

// Renders content in light/ltr and dark/rtl (that pair covers both axes) in one
// story so each matrix costs a single snapshot.
const bothThemes = (content: unknown) => html`
  ${theme(content, 'light', 'ltr')} ${theme(content, 'dark', 'rtl')}
`;

// The AI brand treatment (ring/hue-sweep/gloss/inset-shadow) across every
// variant x generating combination.
const VARIANT_PERMUTATIONS = createPermutations([
  { variant: VARIANTS, generating: [false, true], value: [SHORT_PROMPT] },
]);

// Anatomy, layout, and state axes on the balanced variant: text length x
// expanded/collapsed layout, disabled, and the card/media attachment strips
// (single, multi, and an overflowing set that triggers the scroll chevrons).
const ANATOMY_PERMUTATIONS = createPermutations([
  {
    group: ['Content'],
    collapsed: [false, true],
    value: ['', SHORT_PROMPT, LONG_PROMPT],
  },
  {
    group: ['Disabled'],
    disabled: [true],
    value: ['', LONG_PROMPT],
    attachment: ['none', 'card'],
  },
  {
    group: ['Attachments'],
    value: [SHORT_PROMPT],
    attachment: ['card', 'cards', 'media', 'mediaBadge', 'manyMedia'],
  },
  // manyMedia overflows the strip so the scroll chevrons render and can be
  // forced alongside the upload/send buttons.
  {
    group: ['Buttons hover'],
    value: [SHORT_PROMPT],
    attachment: ['manyMedia'],
    buttonState: ['hover'],
  },
  {
    group: ['Buttons focus'],
    value: [SHORT_PROMPT],
    attachment: ['manyMedia'],
    buttonState: ['focus-visible'],
  },
  {
    group: ['Dragged'],
    dragged: [true],
    value: [SHORT_PROMPT],
  },
]);

// Resolves once `selector` exists in the host's shadow root, or after a few
// frames. The scroll chevrons only render once the overflowing strip is
// measured (a frame after first paint), so wait before forcing them.
const waitForShadowSelector = (host: HTMLElement, selector: string) =>
  new Promise<void>((resolve) => {
    let frames = 0;
    const check = () => {
      if (host.shadowRoot?.querySelector(selector) || frames >= 30) {
        resolve();
        return;
      }
      frames += 1;
      requestAnimationFrame(check);
    };
    check();
  });

// Forces every action button in a tagged field into the same state at once, so
// one snapshot shows all their hover/focus colors (real :hover/:focus-visible
// can't fire in a static snapshot).
const forceButtonStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const fields = canvasElement.querySelectorAll<HTMLElement>(
    'swc-prompt-field[data-button-state]'
  );
  await Promise.all(
    [...fields].map(async (field) => {
      const state = field.dataset.buttonState as ButtonState;
      await waitForShadowSelector(
        field,
        '.swc-PromptField-attachments-scroll-next'
      );
      // Each button is an swc-action-button that styles its own hover/focus on
      // its internal .swc-ActionButton, so force the state on that element.
      for (const selector of BUTTON_SELECTORS) {
        const button = field.shadowRoot?.querySelector<HTMLElement>(selector);
        if (button) {
          forcePseudoState(button, state, '.swc-ActionButton');
        }
      }
    })
  );
};

// Freeze the animating status loader so Chromatic doesn't snapshot a random mid-animation frame.
const pauseLoaders = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  canvasElement.querySelectorAll('swc-prompt-field').forEach((field) => {
    const loader = field.shadowRoot?.querySelector('swc-pixel-loader');
    if (loader) {
      (loader as PixelLoader).paused = true;
    }
  });
};

const makeFileDataTransfer = (): DataTransfer => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(
    new File(['hello'], 'hello.txt', { type: 'text/plain' })
  );
  return dataTransfer;
};

const forceDraggedStates = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const dataTransfer = makeFileDataTransfer();
  const fields = canvasElement.querySelectorAll<PromptField>(
    'swc-prompt-field[data-dragged-state]'
  );

  await Promise.all(
    [...fields].map(async (field) => {
      field.dispatchEvent(
        new DragEvent('dragover', {
          bubbles: true,
          cancelable: true,
          composed: true,
          dataTransfer,
        })
      );
      await field.updateComplete;
    })
  );
};

// Stack a group's fields vertically instead of packing them side by side.
const stack = (cases: FieldCase[]) => html`
  <div
    style="display: flex; flex-direction: column; gap: var(--swc-spacing-400); align-items: start;"
  >
    ${cases.map(renderField)}
  </div>
`;

const variantRows = () =>
  groupPermutationsBy(VARIANT_PERMUTATIONS, 'variant').map(([variant, cases]) =>
    row(stack(cases as FieldCase[]), variant)
  );

const anatomyRows = () =>
  groupPermutationsBy(ANATOMY_PERMUTATIONS, 'group').map(([group, cases]) =>
    row(stack(cases as FieldCase[]), group)
  );

// VRT stories

export const Permutations: Story = {
  render: () => bothThemes([...variantRows(), ...anatomyRows()]),
  parameters: vrtParameters,
  play: async (context) => {
    await forceButtonStates(context);
    await forceDraggedStates(context);
    await pauseLoaders(context);
  },
};

// Forced-colors replaces the whole palette, so it gets its own story:
// checks the opaque card boundary the treatment falls back to when the
// gradients are dropped.
export const ForcedColors: Story = {
  render: () => theme(variantRows(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: pauseLoaders,
};
