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
import { create } from '@storybook/theming';
import React from 'react';
import { Button, ToggleButton } from 'storybook/internal/components';

import packageJson from '../package.json';
import logo from './assets/logo.svg';

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

addons.setConfig({
  toolbar: {
    'storybook/outline': { hidden: true },
  },

  theme: create({
    base: 'light',

    brandTitle: 'Adobe | Spectrum Web Components',
    brandUrl: '?path=/docs/learn-about-swc-overview--docs',
    brandImage: logo,
    brandTarget: '_self',

    fontBase: 'var(--swc-sans-font-family-stack)',

    // SB did not accept the var here
    textColor: 'rgb(34 34 34)',

    // Only applies to "Playground" background
    appPreviewBg:
      'var( --swc-gray-25, light-dark(rgb(255 255 255), rgb(17 17 17)))',

    inputBorderRadius: 4,
  }),
});
