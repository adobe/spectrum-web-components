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
import { LitElement } from 'lit';
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import type { ActionButton } from '@spectrum-web-components/action-button';
import type { ActionGroup } from '@spectrum-web-components/action-group';
import { html, TemplateResult } from '@spectrum-web-components/base';
import type { RadioGroup } from '@spectrum-web-components/radio';
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';
import type { Theme } from '@spectrum-web-components/theme';

import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/swatch/sp-swatch-group.js';
import '@spectrum-web-components/swatch/sp-swatch.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tags/sp-tag.js';
import '@spectrum-web-components/tags/sp-tags.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';

type Dir = 'ltr' | 'rtl';
type Layout = 'row' | 'column';

const renderInTheme = async <T extends HTMLElement>(
  dir: Dir,
  template: TemplateResult,
  selector: string
): Promise<{ theme: Theme; host: T }> => {
  const theme = await fixture<Theme>(html`
    <sp-theme system="spectrum" color="light" scale="medium" dir=${dir}>
      ${template}
    </sp-theme>
  `);
  const host = theme.querySelector(selector) as T;
  await elementUpdated(host);
  await nextFrame();
  return { theme, host };
};

/**
 * Reads the layout from the rendered boxes of the first two items. Only the
 * tests measure; the controller relies on what the host reports.
 */
const measure = (
  items: Element[]
): { layout: Layout; forwardKey: 'ArrowLeft' | 'ArrowRight' } => {
  const first = items[0].getBoundingClientRect();
  const second = items[1].getBoundingClientRect();
  const dx = second.left - first.left;
  const dy = second.top - first.top;
  if (Math.abs(dx) > Math.abs(dy)) {
    return { layout: 'row', forwardKey: dx > 0 ? 'ArrowRight' : 'ArrowLeft' };
  }
  // A column has no inline axis, so ArrowRight means "next", like ArrowDown.
  return { layout: 'column', forwardKey: 'ArrowRight' };
};

const opposite = (key: 'ArrowLeft' | 'ArrowRight'): string =>
  key === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight';

const expectFocus = (item: Element, message: string): void => {
  expect(document.activeElement === item, message).to.be.true;
};

/**
 * Checks that the host renders in `expectedLayout`, then that the arrow key
 * pointing at the second item moves focus there and the opposite key moves
 * it back.
 */
const expectArrowsFollowLayout = async (
  host: HTMLElement,
  items: Element[],
  expectedLayout: Layout
): Promise<void> => {
  const { layout, forwardKey } = measure(items);
  expect(layout, 'rendered layout').to.equal(expectedLayout);

  host.focus();
  await nextFrame();
  expectFocus(items[0], 'initial focus');

  await sendKeys({ press: forwardKey });
  expectFocus(items[1], `${forwardKey} moves toward the second item`);

  await sendKeys({ press: opposite(forwardKey) });
  expectFocus(items[0], `${opposite(forwardKey)} moves back`);

  if (layout === 'column') {
    await sendKeys({ press: 'ArrowDown' });
    expectFocus(items[1], 'ArrowDown agrees with ArrowRight');
  }
};

const actionButtons = html`
  <sp-action-button>Button 1</sp-action-button>
  <sp-action-button>Button 2</sp-action-button>
  <sp-action-button>Button 3</sp-action-button>
`;
const radios = html`
  <sp-radio value="1">Option 1</sp-radio>
  <sp-radio value="2">Option 2</sp-radio>
  <sp-radio value="3">Option 3</sp-radio>
`;
const tabs = html`
  <sp-tab label="Tab 1" value="1"></sp-tab>
  <sp-tab label="Tab 2" value="2"></sp-tab>
  <sp-tab label="Tab 3" value="3"></sp-tab>
`;

const hosts: {
  name: string;
  layout: Layout;
  host: string;
  item: string;
  template: TemplateResult;
}[] = [
  {
    name: 'sp-action-group',
    layout: 'row',
    host: 'sp-action-group',
    item: 'sp-action-button',
    template: html`
      <sp-action-group>${actionButtons}</sp-action-group>
    `,
  },
  {
    name: 'sp-action-group[vertical]',
    layout: 'column',
    host: 'sp-action-group',
    item: 'sp-action-button',
    template: html`
      <sp-action-group vertical>${actionButtons}</sp-action-group>
    `,
  },
  {
    name: 'sp-radio-group',
    layout: 'column',
    host: 'sp-radio-group',
    item: 'sp-radio',
    template: html`
      <sp-radio-group name="example" selected="1">${radios}</sp-radio-group>
    `,
  },
  {
    name: 'sp-radio-group[vertical]',
    layout: 'column',
    host: 'sp-radio-group',
    item: 'sp-radio',
    template: html`
      <sp-radio-group vertical name="example" selected="1">
        ${radios}
      </sp-radio-group>
    `,
  },
  {
    name: 'sp-radio-group[horizontal]',
    layout: 'row',
    host: 'sp-radio-group',
    item: 'sp-radio',
    template: html`
      <sp-radio-group horizontal name="example" selected="1">
        ${radios}
      </sp-radio-group>
    `,
  },
  {
    name: 'sp-radio-group[horizontal][vertical]',
    layout: 'row',
    host: 'sp-radio-group',
    item: 'sp-radio',
    template: html`
      <sp-radio-group horizontal vertical name="example" selected="1">
        ${radios}
      </sp-radio-group>
    `,
  },
  {
    name: 'sp-tabs',
    layout: 'row',
    host: 'sp-tabs',
    item: 'sp-tab',
    template: html`
      <sp-tabs selected="1">${tabs}</sp-tabs>
    `,
  },
  {
    name: 'sp-tabs[direction="vertical"]',
    layout: 'column',
    host: 'sp-tabs',
    item: 'sp-tab',
    template: html`
      <sp-tabs selected="1" direction="vertical">${tabs}</sp-tabs>
    `,
  },
  {
    name: 'sp-tabs[direction="vertical-right"]',
    layout: 'column',
    host: 'sp-tabs',
    item: 'sp-tab',
    template: html`
      <sp-tabs selected="1" direction="vertical-right">${tabs}</sp-tabs>
    `,
  },
  {
    name: 'sp-swatch-group',
    layout: 'row',
    host: 'sp-swatch-group',
    item: 'sp-swatch',
    template: html`
      <sp-swatch-group aria-label="Colors">
        <sp-swatch color="red" label="Red" value="red"></sp-swatch>
        <sp-swatch color="green" label="Green" value="green"></sp-swatch>
        <sp-swatch color="blue" label="Blue" value="blue"></sp-swatch>
      </sp-swatch-group>
    `,
  },
  {
    name: 'sp-tags',
    layout: 'row',
    host: 'sp-tags',
    item: 'sp-tag',
    template: html`
      <sp-tags>
        <sp-tag deletable>Tag 1</sp-tag>
        <sp-tag deletable>Tag 2</sp-tag>
        <sp-tag deletable>Tag 3</sp-tag>
      </sp-tags>
    `,
  },
];

describe('FocusGroupController text direction', () => {
  (['ltr', 'rtl'] as Dir[]).forEach((dir) => {
    describe(`arrow keys follow the rendered layout in ${dir}`, () => {
      hosts.forEach(({ name, layout, host, item, template }) => {
        it(`${name} (${layout})`, async () => {
          const rendered = await renderInTheme(dir, template, host);
          await expectArrowsFollowLayout(
            rendered.host,
            [...rendered.host.querySelectorAll(item)],
            layout
          );
        });
      });
    });
  });

  describe('in RTL', () => {
    const renderActionGroup = async (
      template = html`
        <sp-action-group>${actionButtons}</sp-action-group>
      `
    ): Promise<{
      theme: Theme;
      host: ActionGroup;
      buttons: ActionButton[];
    }> => {
      const { theme, host } = await renderInTheme<ActionGroup>(
        'rtl',
        template,
        'sp-action-group'
      );
      const buttons = [
        ...host.querySelectorAll('sp-action-button'),
      ] as ActionButton[];
      return { theme, host, buttons };
    };

    it('wraps from the first item to the last with ArrowRight', async () => {
      const { host, buttons } = await renderActionGroup();
      const [first, , last] = buttons;

      host.focus();
      await nextFrame();
      expectFocus(first, 'initial focus');

      // The first item renders at the right edge, so ArrowRight wraps.
      await sendKeys({ press: 'ArrowRight' });
      expectFocus(last, 'ArrowRight wraps to the last item');

      await sendKeys({ press: 'ArrowLeft' });
      expectFocus(first, 'ArrowLeft wraps back to the first item');
    });

    it('keeps Home and End logical', async () => {
      const { host, buttons } = await renderActionGroup();
      const [first, , last] = buttons;

      host.focus();
      await nextFrame();

      await sendKeys({ press: 'End' });
      expectFocus(last, 'End moves to the last item');

      await sendKeys({ press: 'Home' });
      expectFocus(first, 'Home moves to the first item');
    });

    it('skips disabled items', async () => {
      const { host, buttons } = await renderActionGroup(html`
        <sp-action-group>
          <sp-action-button>Button 1</sp-action-button>
          <sp-action-button disabled>Button 2</sp-action-button>
          <sp-action-button>Button 3</sp-action-button>
        </sp-action-group>
      `);
      const [first, , third] = buttons;

      host.focus();
      await nextFrame();
      expectFocus(first, 'initial focus');

      await sendKeys({ press: 'ArrowLeft' });
      expectFocus(third, 'ArrowLeft skips the disabled item');

      await sendKeys({ press: 'ArrowRight' });
      expectFocus(first, 'ArrowRight skips the disabled item');
    });

    it('does not depend on item widths', async () => {
      const { host, buttons } = await renderActionGroup(html`
        <sp-action-group>
          <sp-action-button>A</sp-action-button>
          <sp-action-button>
            A considerably longer button label
          </sp-action-button>
          <sp-action-button>Mid length</sp-action-button>
        </sp-action-group>
      `);
      await expectArrowsFollowLayout(host, buttons, 'row');

      await sendKeys({ press: 'ArrowLeft' });
      await sendKeys({ press: 'ArrowLeft' });
      expectFocus(buttons[2], 'ArrowLeft reaches the third item');
    });

    it('keeps focus on the only item of a single-item group', async () => {
      const { host, buttons } = await renderActionGroup(html`
        <sp-action-group>
          <sp-action-button>Only</sp-action-button>
        </sp-action-group>
      `);
      const [only] = buttons;

      host.focus();
      await nextFrame();
      expectFocus(only, 'initial focus');

      await sendKeys({ press: 'ArrowRight' });
      expectFocus(only, 'ArrowRight keeps focus');

      await sendKeys({ press: 'ArrowLeft' });
      expectFocus(only, 'ArrowLeft keeps focus');
    });

    it('follows direction inherited through CSS, without a dir attribute', async () => {
      const { host } = await renderInTheme<ActionGroup>(
        'ltr',
        html`
          <div style="direction: rtl">
            <sp-action-group>${actionButtons}</sp-action-group>
          </div>
        `,
        'sp-action-group'
      );
      const buttons = [...host.querySelectorAll('sp-action-button')];
      expect(measure(buttons).forwardKey, 'renders right to left').to.equal(
        'ArrowLeft'
      );
      await expectArrowsFollowLayout(host, buttons, 'row');
    });

    it('follows a text direction change at runtime', async () => {
      const { theme, host } = await renderInTheme<ActionGroup>(
        'ltr',
        html`
          <sp-action-group>${actionButtons}</sp-action-group>
        `,
        'sp-action-group'
      );
      const buttons = [...host.querySelectorAll('sp-action-button')];
      await expectArrowsFollowLayout(host, buttons, 'row');

      theme.setAttribute('dir', 'rtl');
      await elementUpdated(theme);
      await nextFrame();

      expect(measure(buttons).forwardKey, 'renders right to left').to.equal(
        'ArrowLeft'
      );
      await sendKeys({ press: 'ArrowLeft' });
      expectFocus(buttons[1], 'ArrowLeft now moves to the second item');
    });

    it('follows a layout change at runtime', async () => {
      const { host, buttons } = await renderActionGroup();
      await expectArrowsFollowLayout(host, buttons, 'row');

      host.vertical = true;
      await elementUpdated(host);
      await nextFrame();

      expect(measure(buttons).layout, 'renders as a column').to.equal('column');
      await sendKeys({ press: 'ArrowRight' });
      expectFocus(buttons[1], 'ArrowRight now agrees with ArrowDown');
    });

    it('follows a radio group layout change at runtime', async () => {
      const { host } = await renderInTheme<RadioGroup>(
        'rtl',
        html`
          <sp-radio-group name="example" selected="1">${radios}</sp-radio-group>
        `,
        'sp-radio-group'
      );
      const items = [...host.querySelectorAll('sp-radio')];
      await expectArrowsFollowLayout(host, items, 'column');

      host.horizontal = true;
      await elementUpdated(host);
      await nextFrame();

      expect(measure(items).layout, 'renders as a row').to.equal('row');
      // Focus is on the second radio; in an RTL row the first is to its right.
      await sendKeys({ press: 'ArrowRight' });
      expectFocus(items[0], 'ArrowRight now moves toward the first radio');
    });
  });

  describe('mirrorHorizontalInRTL option', () => {
    class TestEl extends LitElement {}
    customElements.define('test-focus-group-direction-el', TestEl);

    const createController = (
      config: Partial<ConstructorParameters<typeof FocusGroupController>[1]>
    ): FocusGroupController<HTMLElement> =>
      new FocusGroupController<HTMLElement>(
        new TestEl() as LitElement & { shadowRoot: ShadowRoot },
        { elements: () => [], ...config }
      );

    it('defaults to true only for the horizontal direction', () => {
      const defaults = {
        horizontal: true,
        vertical: false,
        both: false,
        grid: false,
      } as const;

      (Object.keys(defaults) as (keyof typeof defaults)[]).forEach(
        (direction) => {
          expect(
            createController({ direction }).mirrorHorizontalInRTL,
            `default for "${direction}"`
          ).to.equal(defaults[direction]);
        }
      );
    });

    it('accepts a boolean that overrides the default', () => {
      expect(
        createController({
          direction: 'horizontal',
          mirrorHorizontalInRTL: false,
        }).mirrorHorizontalInRTL
      ).to.be.false;
      expect(
        createController({ direction: 'grid', mirrorHorizontalInRTL: true })
          .mirrorHorizontalInRTL
      ).to.be.true;
    });

    it('reads a callback on every access', () => {
      let vertical = false;
      const controller = createController({
        direction: 'both',
        mirrorHorizontalInRTL: () => !vertical,
      });

      expect(controller.mirrorHorizontalInRTL).to.be.true;

      vertical = true;
      expect(controller.mirrorHorizontalInRTL).to.be.false;
    });
  });
});
