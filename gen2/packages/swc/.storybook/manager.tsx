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
/// <reference types="./storybook-env.d.ts" />

import { GithubIcon, OutlineIcon } from '@storybook/icons';
import { addons, types, useGlobals } from '@storybook/manager-api';
import React from 'react';
import { Button, ToggleButton } from 'storybook/internal/components';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import type { ThemeVars } from 'storybook/theming';

import { Icon_FileText } from '../../icons/src/FileText';
import { Icon_Folder } from '../../icons/src/Folder';
import { Icon_InfoCircle } from '../../icons/src/InfoCircle';
import { Icon_Play } from '../../icons/src/Play';
import { Icon_ViewGrid } from '../../icons/src/ViewGrid';
import packageJson from '../package.json';
import logoDark from './assets/logo-dark.svg';
import logo from './assets/logo.svg';
import {
  applyThemeClass,
  onPreferredColorSchemeChange,
  resolveColorScheme,
} from './utils/color-scheme';
import { createSpectrumTheme } from './utils/spectrum-theme';

import '../stylesheets/swc.css';
import '../stylesheets/typography.css';
import '../stylesheets/global/global-elements.css';
import './assets/manager.css';

const { version } = packageJson;
const changelogUrl = '?path=/docs/resources-changelog--docs';

addons.register('swc/version', () => {
  addons.add('swc/version/tool', {
    type: types.TOOLEXTRA,
    title: 'Changelog',
    match: () => true,
    render: () => (
      <Button
        asChild
        ariaLabel={false}
        padding="small"
        variant="ghost"
        tooltip={`What's new in ${version}`}
      >
        <a href={changelogUrl} target="_self">
          {version}
        </a>
      </Button>
    ),
  });
});

addons.register('swc/github-link', () => {
  addons.add('swc/github-link/tool', {
    type: types.TOOLEXTRA,
    title: 'View on GitHub',
    match: () => true,
    render: () => (
      <Button
        asChild
        ariaLabel="View on GitHub"
        padding="small"
        variant="ghost"
      >
        <a
          href="https://github.com/adobe/spectrum-web-components"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </Button>
    ),
  });
});

// Storybook's own outline tool (id `storybook/outline`) is hidden in
// `setConfig` below and replaced here, so element outlines stay available
// where they help — the interactive Playground story — without adding a
// control to every docs page and example story.
const OutlineTool = () => {
  const [globals, updateGlobals] = useGlobals();
  const isActive = [true, 'true'].includes(globals.outline);

  return (
    <ToggleButton
      ariaLabel="Outline tool"
      ariaDescription="When enabled, this tool displays the outline of every element in the preview area, which helps understand their layout."
      padding="small"
      pressed={isActive}
      tooltip="Toggle outline"
      variant="ghost"
      onClick={() => updateGlobals({ outline: !isActive })}
    >
      <OutlineIcon />
    </ToggleButton>
  );
};

addons.register('swc/outline', () => {
  addons.add('swc/outline/tool', {
    type: types.TOOL,
    title: 'Outline',
    match: ({ storyId, tabId, viewMode }) =>
      viewMode === 'story' && !tabId && !!storyId?.endsWith('--playground'),
    render: () => <OutlineTool />,
  });
});

const root = document.body ?? document.documentElement;
if (root) {
  root.classList.add('spectrum', 'spectrum--light', 'spectrum--medium');
}

const createManagerTheme = (theme: string): ThemeVars => {
  const scheme = resolveColorScheme(theme);

  return createSpectrumTheme(scheme, {
    brandTitle: 'Adobe | Spectrum Web Components',
    brandUrl: '?path=/docs/learn-about-swc-overview--docs',
    brandImage: scheme === 'dark' ? logoDark : logo,
    brandTarget: '_self',

    inputBorderRadius: 4,
  });
};

// The Theme toolbar global themes the Storybook UI as well as the stories.
// Read it from the URL so a non-default theme doesn't flash while the preview
// loads; `light` matches `initialGlobals` in preview.ts.
const initialTheme =
  /(?:^|;)theme:(\w+)/.exec(
    new URLSearchParams(window.location.search).get('globals') ?? ''
  )?.[1] ?? 'light';

addons.register('swc/theme', (api) => {
  let theme = initialTheme;

  const applyTheme = (): void => {
    applyThemeClass(document.documentElement, theme);
    // Unlike `addons.setConfig()`, `setOptions()` doesn't reset the layout.
    api.setOptions({ theme: createManagerTheme(theme) });
  };

  const onGlobals = ({
    globals,
    userGlobals = globals,
  }: {
    globals: Record<string, string>;
    userGlobals?: Record<string, string>;
  }): void => {
    if (userGlobals.theme && userGlobals.theme !== theme) {
      theme = userGlobals.theme;
      applyTheme();
    }
  };

  api.on(SET_GLOBALS, onGlobals);
  api.on(GLOBALS_UPDATED, onGlobals);
  // `adaptive` follows the OS color scheme.
  onPreferredColorSchemeChange(applyTheme);
});

applyThemeClass(document.documentElement, initialTheme);

// Storybook draws sidebar icons from `<symbol id="icon--{type}">` elements.
// `<use>` resolves the first element with a matching ID, so prepending these
// symbols swaps in Spectrum workflow icons.
const SIDEBAR_ICONS = {
  group: Icon_Folder,
  component: Icon_ViewGrid,
  document: Icon_FileText,
  story: Icon_Play,
};

const sidebarIcons = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'svg'
);
sidebarIcons.setAttribute('aria-hidden', 'true');
sidebarIcons.setAttribute('width', '0');
sidebarIcons.setAttribute('height', '0');
sidebarIcons.style.position = 'absolute';
sidebarIcons.innerHTML = Object.entries(SIDEBAR_ICONS)
  .map(([type, icon]) =>
    icon()
      .replace('<svg', `<symbol id="icon--${type}"`)
      .replace('</svg>', '</symbol>')
  )
  .join('');
document.body.prepend(sidebarIcons);

// Storybook picks sidebar icons by node type only, so overview pages swap in
// their own icon through a CSS mask (see manager.css).
document.documentElement.style.setProperty(
  '--_swc-storybook-overview-icon',
  `url("data:image/svg+xml,${encodeURIComponent(Icon_InfoCircle())}")`
);

addons.setConfig({
  toolbar: {
    'storybook/outline': { hidden: true },
  },

  theme: createManagerTheme(initialTheme),
});
