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
import { expect, userEvent, waitFor, within } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getComponent } from '@swc-test-helpers/dom';

import type { Checkbox } from '@adobe/spectrum-wc/checkbox';
import type { Radio, RadioGroup } from '@adobe/spectrum-wc/radio-group';
import type { TextField } from '@adobe/spectrum-wc/text-field';

import { FormBehavior } from '../stories/forms.stories.js';

// ────────────────
//    METADATA
// ────────────────

export default {
  title: 'Forms',
  parameters: {
    docs: { disable: true, page: null },
    controls: { disable: true },
  },
  tags: ['!autodocs', 'dev'],
} satisfies Meta;

const getExample = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  const email = await getComponent<TextField>(canvasElement, 'swc-text-field');
  const accountType = await getComponent<RadioGroup>(
    canvasElement,
    'swc-radio-group'
  );
  const work = await getComponent<Radio>(
    accountType,
    'swc-radio[value="work"]'
  );
  const terms = await getComponent<Checkbox>(canvasElement, 'swc-checkbox');
  const input = email.roleElement;
  const termsInput = terms.roleElement;
  const fieldset = canvasElement.querySelector('fieldset');
  if (!input || !termsInput || !fieldset) {
    throw new Error('Forms example is missing its inputs or fieldset.');
  }
  return {
    canvas,
    email,
    input,
    accountType,
    work,
    terms,
    termsInput,
    fieldset,
    submit: canvas.getByRole('button', { name: 'Submit' }),
    reset: canvas.getByRole('button', { name: 'Reset' }),
    output: canvas.getByLabelText('Form results'),
  };
};

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: FormBehavior.render,
  decorators: [
    (story) => html`
      <div
        style="display: flex; flex-direction: column; inline-size: min(48rem, 100vw - 2rem); max-inline-size: 100%; padding-block-start: 32px;"
      >
        <header style="display: flex; flex-direction: column; gap: 8px;">
          <h1 class="swc-Heading swc-Heading--sizeL">Forms playground</h1>
          <p class="swc-Body swc-Body--sizeS">
            Explore form behavior. No data is sent.
          </p>
        </header>
        ${story()}
      </div>
    `,
  ],
  play: async ({ canvasElement, step }) => {
    const {
      email,
      input,
      accountType,
      work,
      terms,
      termsInput,
      submit,
      output,
    } = await getExample(canvasElement);

    await step('empty submission shows errors and focuses email', async () => {
      await userEvent.click(submit);
      await waitFor(() => {
        expect(email.fieldStatus).toBe('invalid');
        expect(accountType.fieldStatus).toBe('invalid');
        expect(terms.fieldStatus).toBe('invalid');
        expect(input.matches(':focus')).toBe(true);
        expect(JSON.parse(output.textContent ?? '')).toEqual({
          valid: false,
          data: [
            ['email', ''],
            ['action', 'inspect'],
          ],
        });
      });
    });

    await step('errors clear on completed edits, not keystrokes', async () => {
      await userEvent.type(input, 'river@example.com');
      expect(email.fieldStatus).toBe('invalid');
      input.dispatchEvent(new Event('change'));
      await waitFor(() => expect(email.fieldStatus).toBeUndefined());
      await userEvent.click(work);
      await waitFor(() => expect(accountType.fieldStatus).toBeUndefined());
    });

    await step(
      'an unchecked required checkbox receives focus after other fields pass',
      async () => {
        await userEvent.click(submit);
        await waitFor(() => {
          expect(terms.fieldStatus).toBe('invalid');
          expect(termsInput.matches(':focus')).toBe(true);
          expect(JSON.parse(output.textContent ?? '')).toEqual({
            valid: false,
            data: [
              ['email', 'river@example.com'],
              ['account-type', 'work'],
              ['action', 'inspect'],
            ],
          });
        });
        await userEvent.click(termsInput);
        await waitFor(() => expect(terms.fieldStatus).toBeUndefined());
      }
    );

    await step(
      'valid submission displays every value and the submitter',
      async () => {
        await userEvent.click(submit);
        await waitFor(() =>
          expect(JSON.parse(output.textContent ?? '')).toEqual({
            valid: true,
            data: [
              ['email', 'river@example.com'],
              ['account-type', 'work'],
              ['terms', 'accepted'],
              ['action', 'inspect'],
            ],
          })
        );
      }
    );
  },
};

export const DisabledSubmissionTest: Story = {
  render: FormBehavior.render,
  play: async ({ canvasElement }) => {
    const { canvas, email, accountType, terms, fieldset, submit, output } =
      await getExample(canvasElement);

    await userEvent.click(submit);
    await waitFor(() => {
      expect(email.fieldStatus).toBe('invalid');
      expect(accountType.fieldStatus).toBe('invalid');
      expect(terms.fieldStatus).toBe('invalid');
      expect(output.textContent).toContain('"valid": false');
    });
    await userEvent.click(
      canvas.getByRole('button', { name: 'Disable fields' })
    );
    await waitFor(() => {
      expect(fieldset.disabled).toBe(true);
      expect(email.willValidate).toBe(false);
      expect(accountType.willValidate).toBe(false);
      expect(terms.willValidate).toBe(false);
    });

    await userEvent.click(submit);
    await waitFor(() =>
      expect(JSON.parse(output.textContent ?? '')).toEqual({
        valid: true,
        data: [['action', 'inspect']],
      })
    );
    expect(email.fieldStatus).toBe('invalid');
    expect(accountType.fieldStatus).toBe('invalid');
    expect(terms.fieldStatus).toBe('invalid');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Enable fields' })
    );
    await waitFor(() => {
      expect(fieldset.disabled).toBe(false);
      expect(email.willValidate).toBe(true);
      expect(accountType.willValidate).toBe(true);
      expect(terms.willValidate).toBe(true);
      expect(email.fieldStatus).toBe('invalid');
      expect(accountType.fieldStatus).toBe('invalid');
      expect(terms.fieldStatus).toBe('invalid');
    });
  },
};
DisabledSubmissionTest.storyName = 'Disabled submission preserves errors';

export const ResetTest: Story = {
  render: FormBehavior.render,
  play: async ({ canvasElement }) => {
    const {
      canvas,
      email,
      input,
      accountType,
      work,
      terms,
      termsInput,
      fieldset,
      submit,
      reset,
      output,
    } = await getExample(canvasElement);

    await userEvent.type(input, 'river@example.com');
    await userEvent.click(work);
    await userEvent.click(termsInput);
    await userEvent.click(submit);
    await waitFor(() => expect(output.textContent).toContain('"valid": true'));
    await userEvent.click(reset);
    await waitFor(() => {
      expect(email.value).toBe('');
      expect(accountType.selected).toBe('');
      expect(terms.checked).toBe(false);
      expect(output.textContent).toBe('Submit to view results.');
    });

    await userEvent.click(submit);
    await waitFor(() => {
      expect(email.fieldStatus).toBe('invalid');
      expect(accountType.fieldStatus).toBe('invalid');
      expect(terms.fieldStatus).toBe('invalid');
    });
    await userEvent.click(
      canvas.getByRole('button', { name: 'Disable fields' })
    );
    await userEvent.click(reset);
    await waitFor(() => {
      expect(email.fieldStatus).toBeUndefined();
      expect(accountType.fieldStatus).toBeUndefined();
      expect(terms.fieldStatus).toBeUndefined();
      expect(fieldset.disabled).toBe(true);
      expect(email.willValidate).toBe(false);
      expect(accountType.willValidate).toBe(false);
      expect(terms.willValidate).toBe(false);
      expect(output.textContent).toBe('Submit to view results.');
    });
    await userEvent.click(
      canvas.getByRole('button', { name: 'Enable fields' })
    );
    await waitFor(() => {
      expect(email.willValidate).toBe(true);
      expect(accountType.willValidate).toBe(true);
      expect(terms.willValidate).toBe(true);
      expect(input.disabled).toBe(false);
      expect(termsInput.disabled).toBe(false);
    });
  },
};
ResetTest.storyName = 'Reset restores the example without enabling fields';
