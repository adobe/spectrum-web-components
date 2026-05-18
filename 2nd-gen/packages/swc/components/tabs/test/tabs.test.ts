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

import { Tab, TabPanel, Tabs } from '@adobe/spectrum-wc/tabs';

import '@adobe/spectrum-wc/components/tabs/swc-tabs.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab.js';
import '@adobe/spectrum-wc/components/tabs/swc-tab-panel.js';

import { TABS_DIRECTIONS } from '../../../../core/components/tabs/Tabs.types.js';
import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import {
  Anatomy,
  DensityVariants,
  Directions,
  meta,
  Overview,
  States,
} from '../stories/tabs.stories.js';

export default {
  ...meta,
  title: 'Tabs/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('renders with expected default property values', async () => {
      expect(tabs.direction, 'default direction is horizontal').toBe(
        'horizontal'
      );
      expect(tabs.keyboardActivation, 'default keyboard activation').toBe(
        'manual'
      );
      expect(tabs.density, 'default density is regular').toBe('regular');
      expect(tabs.disabled, 'default disabled is false').toBe(false);
    });

    await step('has selected tab', async () => {
      expect(tabs.selected, 'selected value is set').toBeTruthy();
    });

    await step('exposes role="tablist" on internal element', async () => {
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist, 'tablist element exists in shadow DOM').toBeTruthy();
    });

    await step('shadow root delegates focus to slotted tabs', async () => {
      expect(
        tabs.shadowRoot?.delegatesFocus,
        'delegatesFocus matches migration plan'
      ).toBe(true);
    });

    await step(
      'focusing swc-tabs host moves focus to the selected tab',
      async () => {
        const selectedTab = canvasElement.querySelector(
          `swc-tab[tab-id="${tabs.selected}"]`
        ) as Tab;
        expect(selectedTab, 'selected tab exists').toBeTruthy();

        tabs.focus();
        await tabs.updateComplete;

        const doc = tabs.ownerDocument;
        expect(
          doc.activeElement,
          'host focus delegates to roving tab stop'
        ).toBe(selectedTab);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const DirectionPropertyTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Direction test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('direction reflects to attribute after mutation', async () => {
      tabs.direction = 'vertical';
      await tabs.updateComplete;
      expect(
        tabs.getAttribute('direction'),
        'attribute reflects vertical'
      ).toBe('vertical');

      tabs.direction = 'horizontal';
      await tabs.updateComplete;
      expect(
        tabs.getAttribute('direction'),
        'attribute reflects horizontal'
      ).toBe('horizontal');
    });

    await step('invalid direction falls back to horizontal', async () => {
      tabs.direction = 'invalid' as Tabs['direction'];
      await tabs.updateComplete;
      expect(tabs.direction, 'direction resets to horizontal').toBe(
        'horizontal'
      );
    });
  },
};

export const SelectedPropertyTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Selection test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('selected reflects to attribute', async () => {
      expect(tabs.getAttribute('selected'), 'initially "1"').toBe('1');
    });

    await step('changing selected updates tab states', async () => {
      tabs.selected = '2';
      await tabs.updateComplete;

      const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
      const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;

      expect(tab1.selected, 'tab 1 is deselected').toBe(false);
      expect(tab2.selected, 'tab 2 is selected').toBe(true);
      expect(
        tab2.getAttribute('aria-selected'),
        'tab 2 aria-selected is true'
      ).toBe('true');
    });

    await step('selecting nonexistent value clears selection', async () => {
      tabs.selected = 'nonexistent';
      await tabs.updateComplete;
      expect(tabs.selected, 'selected resets to empty').toBe('');
    });
  },
};

export const DensityAndKeyboardActivationTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Density / activation test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('density compact reflects to attribute', async () => {
      tabs.density = 'compact';
      await tabs.updateComplete;
      expect(tabs.getAttribute('density'), 'density attribute').toBe('compact');
    });

    await step(
      'keyboard activation automatic reflects to attribute',
      async () => {
        tabs.keyboardActivation = 'automatic';
        await tabs.updateComplete;
        expect(
          tabs.getAttribute('keyboard-activation'),
          'keyboard-activation attribute'
        ).toBe('automatic');
      }
    );
  },
};

/**
 * Vertical `.tablist` gap must follow `density` (same tokens as horizontal),
 * not override it with a fixed zero gap.
 */
export const VerticalDensityTablistGapTest: Story = {
  render: () => html`
    <div>
      <swc-tabs
        selected="1"
        direction="vertical"
        density="regular"
        accessible-label="Vertical regular"
      >
        <swc-tab tab-id="1">A</swc-tab>
        <swc-tab tab-id="2">B</swc-tab>
        <swc-tab-panel tab-id="1"><p>P1</p></swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>P2</p></swc-tab-panel>
      </swc-tabs>
      <swc-tabs
        selected="1"
        direction="vertical"
        density="compact"
        accessible-label="Vertical compact"
      >
        <swc-tab tab-id="1">A</swc-tab>
        <swc-tab tab-id="2">B</swc-tab>
        <swc-tab-panel tab-id="1"><p>P1</p></swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>P2</p></swc-tab-panel>
      </swc-tabs>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const groups = await getComponents<Tabs>(canvasElement, 'swc-tabs');
    expect(groups.length, 'two tab groups').toBe(2);

    await step(
      'vertical compact tablist gap is less than regular',
      async () => {
        const tablistGap = (t: Tabs) => {
          const list = t.shadowRoot?.querySelector('.tablist') as HTMLElement;
          expect(list, 'tablist element').toBeTruthy();
          const raw = getComputedStyle(list).gap;
          const n = parseFloat(raw);
          expect(Number.isFinite(n), `gap parses as number: "${raw}"`).toBe(
            true
          );
          return n;
        };

        const regularGap = tablistGap(groups[0]);
        const compactGap = tablistGap(groups[1]);
        expect(compactGap, 'compact gap').toBeLessThan(regularGap);
      }
    );
  },
};

/**
 * Covers toggling `keyboard-activation` and `disabled` after mount.
 */
export const HostAutoDisabledReactiveTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Reactive keyboard/disabled test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
    const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;

    await step(
      'manual mode: arrow moves focus without changing selection',
      async () => {
        expect(tabs.keyboardActivation, 'starts in manual mode').toBe('manual');
        tab1.focus();
        tab1.dispatchEvent(
          new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true })
        );
        await tabs.updateComplete;
        expect(tabs.ownerDocument.activeElement, 'focus on tab 2').toBe(tab2);
        expect(tabs.selected, 'selection unchanged in manual mode').toBe('1');
      }
    );

    await step('automatic mode: arrow then selects focused tab', async () => {
      tabs.keyboardActivation = 'automatic';
      await tabs.updateComplete;
      expect(tabs.keyboardActivation, 'keyboard activation is automatic').toBe(
        'automatic'
      );

      tab1.focus();
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true })
      );
      await tabs.updateComplete;
      expect(
        tabs.ownerDocument.activeElement,
        'focus on tab 2 after arrow'
      ).toBe(tab2);
      expect(tabs.selected, 'selection follows focus in automatic mode').toBe(
        '2'
      );
    });

    await step(
      'disabling host: tablist aria-disabled and flat tabindex',
      async () => {
        tabs.disabled = true;
        await tabs.updateComplete;

        const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
        expect(
          tablist?.getAttribute('aria-disabled'),
          'tablist aria-disabled when host disabled'
        ).toBe('true');
        expect(
          tab1.tabIndex,
          'tab 1 not in tab order when container disabled'
        ).toBe(-1);
        expect(
          tab2.tabIndex,
          'tab 2 not in tab order when container disabled'
        ).toBe(-1);
      }
    );

    await step(
      're-enabling host: restores roving tabindex on selected tab',
      async () => {
        tabs.disabled = false;
        await tabs.updateComplete;

        const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
        expect(
          tablist?.hasAttribute('aria-disabled'),
          'aria-disabled removed from tablist'
        ).toBe(false);

        const selected =
          tabs.selected === '1' ? tab1 : tabs.selected === '2' ? tab2 : null;
        expect(selected, 'expected a selected tab').toBeTruthy();
        expect(
          selected!.tabIndex,
          'selected tab is in tab order after re-enable'
        ).toBe(0);
      }
    );
  },
};

/**
 * `keyboard-activation` from markup must drive arrow-key selection (Storybook
 * uses the hyphenated attribute; this guards against args/render drift).
 */
export const KeyboardActivationFromAttributeTest: Story = {
  render: () => html`
    <div>
      <swc-tabs
        id="tabs-keyboard-manual"
        selected="1"
        keyboard-activation="manual"
        accessible-label="Manual from attribute"
      >
        <swc-tab tab-id="1">One</swc-tab>
        <swc-tab tab-id="2">Two</swc-tab>
        <swc-tab-panel tab-id="1"><p>Panel one</p></swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Panel two</p></swc-tab-panel>
      </swc-tabs>
      <swc-tabs
        id="tabs-keyboard-automatic"
        selected="1"
        keyboard-activation="automatic"
        accessible-label="Automatic from attribute"
      >
        <swc-tab tab-id="1">One</swc-tab>
        <swc-tab tab-id="2">Two</swc-tab>
        <swc-tab-panel tab-id="1"><p>Panel one</p></swc-tab-panel>
        <swc-tab-panel tab-id="2"><p>Panel two</p></swc-tab-panel>
      </swc-tabs>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const manualHost = canvasElement.querySelector(
      '#tabs-keyboard-manual'
    ) as Tabs;
    const autoHost = canvasElement.querySelector(
      '#tabs-keyboard-automatic'
    ) as Tabs;

    expect(manualHost, 'manual fixture').toBeTruthy();
    expect(autoHost, 'automatic fixture').toBeTruthy();
    await Promise.all([manualHost.updateComplete, autoHost.updateComplete]);

    const doc = manualHost.ownerDocument;

    await step('manual: ArrowRight moves focus only', async () => {
      expect(manualHost.keyboardActivation, 'mode is manual').toBe('manual');

      const t1 = canvasElement.querySelector(
        '#tabs-keyboard-manual swc-tab[tab-id="1"]'
      ) as Tab;
      const t2 = canvasElement.querySelector(
        '#tabs-keyboard-manual swc-tab[tab-id="2"]'
      ) as Tab;

      t1.focus();
      t1.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'ArrowRight',
          bubbles: true,
          cancelable: true,
        })
      );
      await manualHost.updateComplete;

      expect(doc.activeElement, 'focus moves to tab 2').toBe(t2);
      expect(manualHost.selected, 'host selection unchanged').toBe('1');
      expect(t1.selected, 'tab 1 stays selected').toBe(true);
      expect(t2.selected, 'tab 2 stays unselected').toBe(false);
    });

    await step('automatic: ArrowRight moves focus and selection', async () => {
      expect(autoHost.keyboardActivation, 'mode is automatic').toBe(
        'automatic'
      );

      const t1 = canvasElement.querySelector(
        '#tabs-keyboard-automatic swc-tab[tab-id="1"]'
      ) as Tab;
      const t2 = canvasElement.querySelector(
        '#tabs-keyboard-automatic swc-tab[tab-id="2"]'
      ) as Tab;

      t1.focus();
      t1.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'ArrowRight',
          bubbles: true,
          cancelable: true,
        })
      );
      await autoHost.updateComplete;

      expect(doc.activeElement, 'focus on tab 2').toBe(t2);
      expect(autoHost.selected, 'host selection follows focus').toBe('2');
      expect(t1.selected, 'tab 1 unselected').toBe(false);
      expect(t2.selected, 'tab 2 selected').toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: ARIA roles, states, and properties
// ──────────────────────────────────────────────────────────────

export const AriaRolesTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="ARIA test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('tablist has correct ARIA attributes', async () => {
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist, 'tablist exists').toBeTruthy();
      expect(
        tablist?.getAttribute('aria-label'),
        'tablist has aria-label'
      ).toBe('ARIA test');
    });

    await step('tabs have correct ARIA roles and states', async () => {
      const tabElements = await getComponents<Tab>(canvasElement, 'swc-tab');

      for (const tab of tabElements) {
        expect(tab.getAttribute('role'), 'tab has role="tab"').toBe('tab');
        expect(tab.hasAttribute('aria-selected'), 'tab has aria-selected').toBe(
          true
        );
      }

      const selectedTab = tabElements.find((t) => t.tabId === '1')!;
      expect(
        selectedTab.getAttribute('aria-selected'),
        'selected tab has aria-selected=true'
      ).toBe('true');

      const unselectedTab = tabElements.find((t) => t.tabId === '2')!;
      expect(
        unselectedTab.getAttribute('aria-selected'),
        'unselected tab has aria-selected=false'
      ).toBe('false');
    });

    await step('panels have correct ARIA roles', async () => {
      const panels = await getComponents<TabPanel>(
        canvasElement,
        'swc-tab-panel'
      );

      for (const panel of panels) {
        expect(panel.getAttribute('role'), 'panel has role="tabpanel"').toBe(
          'tabpanel'
        );
      }
    });

    await step(
      'aria-controls and aria-labelledby wire up correctly',
      async () => {
        const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
        const panel1 = canvasElement.querySelector(
          'swc-tab-panel[tab-id="1"]'
        ) as TabPanel;

        expect(
          tab1.getAttribute('aria-controls'),
          'tab has aria-controls pointing to panel'
        ).toBe(panel1.id);
        expect(
          panel1.getAttribute('aria-labelledby'),
          'panel has aria-labelledby pointing to tab'
        ).toBe(tab1.id);
      }
    );
  },
};

export const AriaOrientationTest: Story = {
  render: () => html`
    <swc-tabs
      selected="1"
      direction="vertical"
      accessible-label="Orientation test"
    >
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step(
      'vertical direction sets aria-orientation on tablist',
      async () => {
        const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
        expect(
          tablist?.getAttribute('aria-orientation'),
          'aria-orientation is vertical'
        ).toBe('vertical');
      }
    );

    await step('horizontal direction omits aria-orientation', async () => {
      tabs.direction = 'horizontal';
      await tabs.updateComplete;

      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(
        tablist?.hasAttribute('aria-orientation'),
        'aria-orientation is not present'
      ).toBe(false);
    });
  },
};

export const AriaDisabledTest: Story = {
  render: () => html`
    <swc-tabs selected="1" disabled accessible-label="Disabled test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('disabled sets aria-disabled on tablist', async () => {
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(
        tablist?.getAttribute('aria-disabled'),
        'aria-disabled is true'
      ).toBe('true');
    });

    await step('disabled removes all tab stops from child tabs', async () => {
      const tab = canvasElement.querySelector('swc-tab') as Tab;
      expect(tab.tabIndex, 'tab has tabindex -1 when container disabled').toBe(
        -1
      );
    });
  },
};

export const DisabledTabAriaTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Disabled tab test">
      <swc-tab tab-id="1">Enabled</swc-tab>
      <swc-tab tab-id="2" disabled>Disabled</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const disabledTab = canvasElement.querySelector(
      'swc-tab[tab-id="2"]'
    ) as Tab;
    await disabledTab.updateComplete;

    await step('disabled tab has aria-disabled="true"', async () => {
      expect(
        disabledTab.getAttribute('aria-disabled'),
        'aria-disabled set'
      ).toBe('true');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Roving tabindex
// ──────────────────────────────────────────────────────────────

export const RovingTabindexTest: Story = {
  render: () => html`
    <swc-tabs selected="2" accessible-label="Roving tabindex test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab tab-id="3">Tab 3</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
      <swc-tab-panel tab-id="3"><p>Panel 3</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tabElements = await getComponents<Tab>(canvasElement, 'swc-tab');

    await step(
      'selected tab has tabindex=0, others have tabindex=-1',
      async () => {
        const tab1 = tabElements.find((t) => t.tabId === '1')!;
        const tab2 = tabElements.find((t) => t.tabId === '2')!;
        const tab3 = tabElements.find((t) => t.tabId === '3')!;

        expect(tab1.tabIndex, 'tab 1 tabindex is -1').toBe(-1);
        expect(tab2.tabIndex, 'tab 2 (selected) tabindex is 0').toBe(0);
        expect(tab3.tabIndex, 'tab 3 tabindex is -1').toBe(-1);
      }
    );
  },
};

export const TabindexFallbackTest: Story = {
  render: () => html`
    <swc-tabs accessible-label="Fallback tabindex test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('first tab gets tabindex=0 when none selected', async () => {
      const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
      expect(
        tab1.tabIndex,
        'first tab is the tab stop when none selected'
      ).toBe(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Panel visibility
// ──────────────────────────────────────────────────────────────

export const PanelVisibilityTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Panel visibility test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('active panel is visible, inactive is hidden', async () => {
      const panel1 = canvasElement.querySelector(
        'swc-tab-panel[tab-id="1"]'
      ) as TabPanel;
      const panel2 = canvasElement.querySelector(
        'swc-tab-panel[tab-id="2"]'
      ) as TabPanel;

      expect(panel1.selected, 'panel 1 is selected').toBe(true);
      expect(panel1.hasAttribute('aria-hidden'), 'panel 1 not hidden').toBe(
        false
      );
      expect(panel1.tabIndex, 'panel 1 tabindex is 0').toBe(0);

      expect(panel2.selected, 'panel 2 is not selected').toBe(false);
      expect(panel2.getAttribute('aria-hidden'), 'panel 2 is hidden').toBe(
        'true'
      );
      expect(panel2.tabIndex, 'panel 2 tabindex is -1').toBe(-1);
    });

    await step('switching selection updates panel visibility', async () => {
      tabs.selected = '2';
      await tabs.updateComplete;

      const panel1 = canvasElement.querySelector(
        'swc-tab-panel[tab-id="1"]'
      ) as TabPanel;
      const panel2 = canvasElement.querySelector(
        'swc-tab-panel[tab-id="2"]'
      ) as TabPanel;

      expect(panel1.selected, 'panel 1 is now deselected').toBe(false);
      expect(panel2.selected, 'panel 2 is now selected').toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Keyboard interaction
// ──────────────────────────────────────────────────────────────

export const ArrowKeyNavigationTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Arrow key test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab tab-id="3">Tab 3</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
      <swc-tab-panel tab-id="3"><p>Panel 3</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
    const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;
    const tab3 = canvasElement.querySelector('swc-tab[tab-id="3"]') as Tab;

    tab1.focus();

    await step('ArrowRight moves focus to next tab', async () => {
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus moved to tab 2').toBe(tab2);
    });

    await step('ArrowRight wraps from last to first', async () => {
      tab3.focus();
      tab3.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus wrapped to tab 1').toBe(tab1);
    });

    await step('ArrowLeft moves focus to previous tab', async () => {
      tab2.focus();
      tab2.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus moved to tab 1').toBe(tab1);
    });

    await step('ArrowLeft wraps from first to last', async () => {
      tab1.focus();
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowLeft', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus wrapped to tab 3').toBe(tab3);
    });
  },
};

export const VerticalArrowKeyTest: Story = {
  render: () => html`
    <swc-tabs
      selected="1"
      direction="vertical"
      accessible-label="Vertical arrow test"
    >
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
    const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;

    tab1.focus();

    await step('ArrowDown moves focus in vertical mode', async () => {
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus moved to tab 2').toBe(tab2);
    });

    await step('ArrowRight has no effect in vertical mode', async () => {
      tab1.focus();
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', {
          code: 'ArrowRight',
          bubbles: true,
        })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus stays on tab 1').toBe(tab1);
    });

    await step('ArrowUp moves focus backward in vertical mode', async () => {
      tab2.focus();
      tab2.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus moved to tab 1').toBe(tab1);
    });
  },
};

export const HomeEndKeyTest: Story = {
  render: () => html`
    <swc-tabs selected="2" accessible-label="Home/End test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab tab-id="3">Tab 3</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
      <swc-tab-panel tab-id="3"><p>Panel 3</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
    const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;
    const tab3 = canvasElement.querySelector('swc-tab[tab-id="3"]') as Tab;

    tab2.focus();

    await step('Home moves focus to first tab', async () => {
      tab2.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'Home', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus on first tab').toBe(tab1);
    });

    await step('End moves focus to last tab', async () => {
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'End', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus on last tab').toBe(tab3);
    });
  },
};

export const EnterSpaceActivationTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Activation test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;

    await step('Enter activates focused tab in manual mode', async () => {
      tab2.focus();
      tab2.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'Enter', bubbles: true })
      );
      await tabs.updateComplete;
      expect(tabs.selected, 'selected changed to 2').toBe('2');
    });

    await step('Space activates focused tab in manual mode', async () => {
      tabs.selected = '1';
      await tabs.updateComplete;

      tab2.focus();
      tab2.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'Space', bubbles: true })
      );
      await tabs.updateComplete;
      expect(tabs.selected, 'selected changed to 2').toBe('2');
    });
  },
};

export const AutoActivationTest: Story = {
  render: () => html`
    <swc-tabs
      selected="1"
      keyboard-activation="automatic"
      accessible-label="Automatic activation test"
    >
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab tab-id="3">Tab 3</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
      <swc-tab-panel tab-id="3"><p>Panel 3</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;

    tab1.focus();

    await step(
      'arrow key immediately selects tab in automatic mode',
      async () => {
        tab1.dispatchEvent(
          new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true })
        );
        await tabs.updateComplete;
        expect(tabs.selected, 'selection follows focus to tab 2').toBe('2');
      }
    );
  },
};

export const DisabledTabKeyboardTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Disabled tab keyboard test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2" disabled>Tab 2</swc-tab>
      <swc-tab tab-id="3">Tab 3</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
      <swc-tab-panel tab-id="3"><p>Panel 3</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tab1 = canvasElement.querySelector('swc-tab[tab-id="1"]') as Tab;
    const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;

    tab1.focus();

    await step('disabled tab receives focus via arrow keys', async () => {
      tab1.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'ArrowRight', bubbles: true })
      );
      await tabs.updateComplete;
      expect(document.activeElement, 'focus moves to disabled tab').toBe(tab2);
    });

    await step('Enter does not activate disabled tab', async () => {
      tab2.dispatchEvent(
        new KeyboardEvent('keydown', { code: 'Enter', bubbles: true })
      );
      await tabs.updateComplete;
      expect(tabs.selected, 'selection remains on tab 1').toBe('1');
    });

    await step('click does not activate disabled tab', async () => {
      tab2.click();
      await tabs.updateComplete;
      expect(tabs.selected, 'selection still on tab 1').toBe('1');
    });
  },
};

export const DisabledContainerKeyboardTest: Story = {
  render: () => html`
    <swc-tabs selected="1" disabled accessible-label="Disabled container test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('click does nothing when container is disabled', async () => {
      const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;
      tab2.click();
      await tabs.updateComplete;
      expect(tabs.selected, 'selection unchanged').toBe('1');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Change event
// ──────────────────────────────────────────────────────────────

export const ChangeEventTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Change event test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('change event fires on tab click', async () => {
      let eventFired = false;
      tabs.addEventListener('change', () => {
        eventFired = true;
      });

      const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;
      tab2.click();
      await tabs.updateComplete;

      expect(eventFired, 'change event was dispatched').toBe(true);
    });

    await step('change event is cancelable', async () => {
      tabs.selected = '1';
      await tabs.updateComplete;

      tabs.addEventListener(
        'change',
        (event) => {
          event.preventDefault();
        },
        { once: true }
      );

      const tab2 = canvasElement.querySelector('swc-tab[tab-id="2"]') as Tab;
      tab2.click();
      await tabs.updateComplete;

      expect(tabs.selected, 'selection reverted after preventDefault').toBe(
        '1'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    await step('renders tab and panel slot content', async () => {
      const tabElements = await getComponents<Tab>(canvasElement, 'swc-tab');
      expect(tabElements.length, 'multiple tabs are rendered').toBeGreaterThan(
        0
      );

      const panels = await getComponents<TabPanel>(
        canvasElement,
        'swc-tab-panel'
      );
      expect(panels.length, 'multiple panels are rendered').toBeGreaterThan(0);
    });

    await step('tab-panel elements get slot="tab-panel"', async () => {
      const panel = canvasElement.querySelector('swc-tab-panel') as TabPanel;
      expect(panel.getAttribute('slot'), 'panel has slot="tab-panel"').toBe(
        'tab-panel'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Selection indicator
// ──────────────────────────────────────────────────────────────

export const SelectionIndicatorTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Indicator test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab tab-id="2">Tab 2</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel 1</p></swc-tab-panel>
      <swc-tab-panel tab-id="2"><p>Panel 2</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('selection indicator exists in shadow DOM', async () => {
      const indicator = tabs.shadowRoot?.querySelector('.selection-indicator');
      expect(indicator, 'indicator element exists').toBeTruthy();
    });

    await step(
      'indicator has transform style when a tab is selected',
      async () => {
        await new Promise((r) => requestAnimationFrame(r));
        await tabs.updateComplete;

        const indicator = tabs.shadowRoot?.querySelector(
          '.selection-indicator'
        ) as HTMLElement;
        const style = indicator.getAttribute('style') || '';
        expect(
          style.includes('transform'),
          'indicator style contains transform'
        ).toBe(true);
      }
    );

    await step(
      'indicator updates position when selection changes',
      async () => {
        const indicator = tabs.shadowRoot?.querySelector(
          '.selection-indicator'
        ) as HTMLElement;
        const styleBefore = indicator.getAttribute('style') || '';

        tabs.selected = '2';
        await tabs.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));
        await tabs.updateComplete;

        const styleAfter = indicator.getAttribute('style') || '';
        expect(
          styleBefore !== styleAfter,
          'indicator style changed after selection change'
        ).toBe(true);
      }
    );

    await step(
      'indicator has first-position class initially then removes it',
      async () => {
        const indicator = tabs.shadowRoot?.querySelector(
          '.selection-indicator'
        ) as HTMLElement;
        await tabs.updateComplete;
        await new Promise((r) => setTimeout(r, 200));
        await tabs.updateComplete;

        expect(
          !indicator.classList.contains('first-position'),
          'first-position class removed after initial render'
        ).toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const DensityVariantsTest: Story = {
  ...DensityVariants,
  play: async ({ canvasElement, step }) => {
    await step('renders regular and compact density examples', async () => {
      const tabGroups = await getComponents<Tabs>(canvasElement, 'swc-tabs');
      const densities = tabGroups.map((t) => t.density);
      expect(densities, 'includes regular').toContain('regular');
      expect(densities, 'includes compact').toContain('compact');
    });
  },
};

export const DirectionsTest: Story = {
  ...Directions,
  play: async ({ canvasElement, step }) => {
    await step('renders both direction values', async () => {
      const tabGroups = await getComponents<Tabs>(canvasElement, 'swc-tabs');
      const renderedDirs = tabGroups.map((t) => t.direction);

      for (const dir of TABS_DIRECTIONS) {
        expect(renderedDirs, `direction "${dir}" is rendered`).toContain(dir);
      }
    });
  },
};

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const tabGroups = await getComponents<Tabs>(canvasElement, 'swc-tabs');

    await step('renders enabled and disabled tab states', async () => {
      const allTabs = await getComponents<Tab>(canvasElement, 'swc-tab');
      const disabledTabs = allTabs.filter((t) => t.disabled);
      expect(
        disabledTabs.length,
        'at least one disabled tab exists'
      ).toBeGreaterThan(0);
    });

    await step('renders disabled container state', async () => {
      const disabledContainer = tabGroups.find((t) => t.disabled);
      expect(disabledContainer, 'disabled container exists').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const MissingLabelWarningTest: Story = {
  render: () => html`
    <div id="warning-host"></div>
  `,
  play: async ({ step }) => {
    await step('warns when accessible-label attribute is missing', () =>
      withWarningSpy(async (warnCalls) => {
        const tabs = await fixture<Tabs>(html`
          <swc-tabs selected="1">
            <swc-tab tab-id="1">Tab 1</swc-tab>
            <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
          </swc-tabs>
        `);

        expect(warnCalls.length, 'warning was issued').toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning mentions label'
        ).toContain('label');

        tabs.parentElement?.remove();
      })
    );
  },
};

export const InvalidDirectionWarningTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Warning test">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('warns when an invalid direction is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        tabs.direction = 'diagonal' as Tabs['direction'];
        await tabs.updateComplete;

        expect(warnCalls.length, 'warning was issued').toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning mentions direction'
        ).toContain('direction');
      })
    );
  },
};

export const ValidLabelNoWarningTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Has a label">
      <swc-tab tab-id="1">Tab 1</swc-tab>
      <swc-tab-panel tab-id="1"><p>Panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step('does not warn when label is provided', () =>
      withWarningSpy(async (warnCalls) => {
        tabs.requestUpdate();
        await tabs.updateComplete;
        expect(warnCalls.length, 'no warnings issued').toBe(0);
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Regression — tabId and accessible-label renames
// ──────────────────────────────────────────────────────────────

export const TabIdPropertyReflectionTest: Story = {
  render: () => html`
    <swc-tabs selected="alpha" accessible-label="Reflection test">
      <swc-tab tab-id="alpha">Alpha</swc-tab>
      <swc-tab tab-id="beta">Beta</swc-tab>
      <swc-tab-panel tab-id="alpha"><p>Alpha panel</p></swc-tab-panel>
      <swc-tab-panel tab-id="beta"><p>Beta panel</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');
    const tabElements = await getComponents<Tab>(canvasElement, 'swc-tab');
    const panels = await getComponents<TabPanel>(
      canvasElement,
      'swc-tab-panel'
    );

    await step('tab-id attribute reflects to tabId property', () => {
      expect(tabElements[0].tabId, 'first tab tabId').toBe('alpha');
      expect(tabElements[1].tabId, 'second tab tabId').toBe('beta');
      expect(panels[0].tabId, 'first panel tabId').toBe('alpha');
      expect(panels[1].tabId, 'second panel tabId').toBe('beta');
    });

    await step('tabId property reflects back to tab-id attribute', async () => {
      tabElements[0].tabId = 'gamma';
      await tabElements[0].updateComplete;
      expect(tabElements[0].getAttribute('tab-id'), 'attribute updated').toBe(
        'gamma'
      );
    });

    await step('selection still works after property mutation', async () => {
      tabs.selected = 'gamma';
      await tabs.updateComplete;
      expect(tabElements[0].selected, 'first tab re-selected').toBe(true);
    });
  },
};

export const AccessibleLabelReflectionTest: Story = {
  render: () => html`
    <swc-tabs selected="1" accessible-label="Settings panel">
      <swc-tab tab-id="1">General</swc-tab>
      <swc-tab-panel tab-id="1"><p>General settings</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabs = await getComponent<Tabs>(canvasElement, 'swc-tabs');

    await step(
      'accessible-label attribute reflects to accessibleLabel property',
      () => {
        expect(tabs.accessibleLabel, 'property value').toBe('Settings panel');
      }
    );

    await step('accessible-label renders as aria-label on tablist', () => {
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist?.getAttribute('aria-label'), 'aria-label').toBe(
        'Settings panel'
      );
    });

    await step('updating property updates aria-label', async () => {
      tabs.accessibleLabel = 'Account preferences';
      await tabs.updateComplete;
      const tablist = tabs.shadowRoot?.querySelector('[role="tablist"]');
      expect(tablist?.getAttribute('aria-label'), 'updated aria-label').toBe(
        'Account preferences'
      );
    });
  },
};

export const IconOnlyTabAriaLabelTest: Story = {
  render: () => html`
    <swc-tabs selected="home" accessible-label="Navigation">
      <swc-tab tab-id="home" aria-label="Home">
        <span slot="icon" aria-hidden="true">🏠</span>
      </swc-tab>
      <swc-tab tab-id="search" aria-label="Search">
        <span slot="icon" aria-hidden="true">🔍</span>
      </swc-tab>
      <swc-tab-panel tab-id="home"><p>Home content</p></swc-tab-panel>
      <swc-tab-panel tab-id="search"><p>Search content</p></swc-tab-panel>
    </swc-tabs>
  `,
  play: async ({ canvasElement, step }) => {
    const tabElements = await getComponents<Tab>(canvasElement, 'swc-tab');

    await step('icon-only tabs have aria-label from attribute', () => {
      expect(
        tabElements[0].getAttribute('aria-label'),
        'first tab aria-label'
      ).toBe('Home');
      expect(
        tabElements[1].getAttribute('aria-label'),
        'second tab aria-label'
      ).toBe('Search');
    });

    await step(
      'old label attribute does not auto-sync to aria-label',
      async () => {
        tabElements[0].setAttribute('label', 'Legacy');
        await tabElements[0].updateComplete;
        expect(
          tabElements[0].getAttribute('aria-label'),
          'aria-label unchanged by label attr'
        ).toBe('Home');
      }
    );
  },
};
