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

import { useOf } from '@storybook/addon-docs/blocks';
import React, { useEffect, useState } from 'react';

/**
 * Renders a "View as Markdown" link that opens the component's
 * `context.md` file in a new tab.
 *
 * `context.md` is the LLM-consumable documentation for a component
 * (proposed in [RFC] context.md for 2nd-gen SWC components,
 * https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3854270520).
 *
 * The file is sourced from the component's package directory and
 * served at `/components/{slug}/context.md` via Storybook's
 * `staticDirs` configuration in `.storybook/main.ts`.
 *
 * Renders nothing if:
 * - the meta has no `component` tag
 * - the resolved `context.md` returns 404 (not yet authored for that component)
 */
export const ContextMarkdownButton = ({ of }: { of?: any }) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);
  const componentTag: string | undefined = resolvedOf.preparedMeta?.component;

  // Strip leading `swc-` (or `sp-`) so component dir name matches the URL slug.
  const slug = componentTag?.replace(/^(swc|sp)-/, '');

  // Resolve relative to `document.baseURI` (not absolute `/components/...`)
  // so the URL works in both local dev (served from domain root) and CI
  // preview deploys served under a sub-path like
  // `/pr-NNNN/docs/second-gen-storybook/`.
  const href = slug
    ? new URL(`components/${slug}/context.md`, document.baseURI).href
    : undefined;

  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    if (!href) {
      setExists(false);
      return;
    }
    let cancelled = false;
    fetch(href, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setExists(res.ok);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, [href]);

  if (!href || exists === false || exists === null) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '12px',
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        title="LLM-consumable component context (Markdown)"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--swc-color-neutral-content-color-default, #2c2c2c)',
          background:
            'var(--swc-color-neutral-background-color-default, #f5f5f5)',
          border: '1px solid var(--swc-color-neutral-border-color, #d6d6d6)',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        View as Markdown
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </div>
  );
};
