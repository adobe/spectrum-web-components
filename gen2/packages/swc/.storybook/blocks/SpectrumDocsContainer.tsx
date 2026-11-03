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
import {
  DocsContainer,
  type DocsContainerProps,
} from '@storybook/addon-docs/blocks';
import React, {
  type PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';

import {
  applyThemeClass,
  onPreferredColorSchemeChange,
  resolveColorScheme,
} from '../utils/color-scheme.js';
import { createSpectrumTheme } from '../utils/spectrum-theme.js';

type Channel = DocsContainerProps['context']['channel'];

/** Reads the Theme toolbar value from the latest globals event. */
const getThemeGlobal = (channel: Channel): string | undefined => {
  const [updated] = channel.last(GLOBALS_UPDATED) ?? [];
  const [initial] = channel.last(SET_GLOBALS) ?? [];
  return (updated?.userGlobals ?? initial?.globals)?.theme;
};

/**
 * Themes docs pages with Spectrum token colors in the color scheme picked
 * in the Theme toolbar, so the docs page and its story previews match.
 */
export const SpectrumDocsContainer = ({
  children,
  ...props
}: PropsWithChildren<DocsContainerProps>) => {
  const { channel, projectAnnotations } = props.context;

  const subscribeToGlobals = useCallback(
    (onChange: () => void) => {
      channel.on(GLOBALS_UPDATED, onChange);
      channel.on(SET_GLOBALS, onChange);
      return () => {
        channel.off(GLOBALS_UPDATED, onChange);
        channel.off(SET_GLOBALS, onChange);
      };
    },
    [channel]
  );
  const theme =
    useSyncExternalStore(subscribeToGlobals, () => getThemeGlobal(channel)) ??
    projectAnnotations.initialGlobals?.theme;
  const scheme = useSyncExternalStore(onPreferredColorSchemeChange, () =>
    resolveColorScheme(theme)
  );
  const docsTheme = useMemo(() => createSpectrumTheme(scheme), [scheme]);

  // Story decorators set this class too, but docs pages without stories
  // don't run them.
  useLayoutEffect(() => {
    if (theme) {
      applyThemeClass(document.documentElement, theme);
    }
  }, [theme]);

  return (
    <DocsContainer {...props} theme={docsTheme}>
      {children}
    </DocsContainer>
  );
};
