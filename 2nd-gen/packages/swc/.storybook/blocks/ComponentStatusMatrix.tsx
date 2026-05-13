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

import React, { useEffect, useRef } from 'react';
import customElements from '../custom-elements.json' with { type: 'json' };

import {
  components as overrides,
  defaults,
  type ComponentOverride,
} from '../../../../../CONTRIBUTOR-DOCS/reference/component-status.data';

// Register the badge custom element so the live <swc-badge> cells render in the
// docs iframe. After the per-element side-effect-entry refactor (#6273), the bare
// index.js only exports the class — registration lives in the swc-<tag>.js file.
import '../../components/badge/swc-badge.js';

/**
 * Maps a CEM `@status` value to a Spectrum badge variant.
 *
 * Components without an explicit status JSDoc are treated as `preview` — the
 * sane default for migrated 2nd-gen components.
 */
const STATUS_BADGE_CONFIG: Record<
  string,
  { label: string; variant: string; outline?: boolean }
> = {
  preview: { label: 'Preview', variant: 'fuchsia' },
  stable: { label: 'Stable', variant: 'positive' },
  deprecated: { label: 'Deprecated', variant: 'negative', outline: true },
  internal: { label: 'Internal', variant: 'neutral', outline: true },
  unsupported: { label: 'Unsupported', variant: 'negative', outline: true },
};

const PARITY_BADGE_CONFIG: Record<
  string,
  { label: string; variant: string; outline?: boolean }
> = {
  full: { label: 'Full', variant: 'positive' },
  partial: { label: 'Partial', variant: 'notice' },
  none: { label: 'None', variant: 'negative', outline: true },
};

type Decl = {
  tagName?: string;
  status?: string;
  since?: string;
};

/**
 * Renders a single `<swc-badge>` via a ref. Mirrors the StatusBadge block's
 * pattern, since React's JSX doesn't type custom elements without global
 * augmentation.
 */
const Badge = ({
  variant,
  outline,
  children,
}: {
  variant: string;
  outline?: boolean;
  children: string;
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute('size', 's');
    el.setAttribute('variant', variant);
    if (outline) {
      el.setAttribute('outline', '');
    } else {
      el.removeAttribute('outline');
    }
    el.textContent = children;
  }, [variant, outline, children]);

  return React.createElement('swc-badge', { ref });
};

/**
 * Look up overrides for a given tagName, falling back to defaults.
 */
function resolveOverride(tagName: string): Required<ComponentOverride> {
  const shortName = tagName.replace(/^swc-/, '');
  const override = overrides[shortName] ?? {};
  return {
    parity: override.parity ?? defaults.parity,
    figma: override.figma ?? defaults.figma,
    stackblitz: override.stackblitz ?? defaults.stackblitz,
    notes: override.notes ?? defaults.notes,
  };
}

/**
 * Collect every component declaration in the CEM that has a `swc-*` tagName.
 * Deduplicates on tagName (some components appear in multiple modules).
 */
function collectComponents(): Decl[] {
  const seen = new Set<string>();
  const out: Decl[] = [];
  for (const mod of (customElements as any).modules ?? []) {
    for (const decl of mod.declarations ?? []) {
      const tn = decl.tagName as string | undefined;
      if (!tn || !tn.startsWith('swc-')) continue;
      if (seen.has(tn)) continue;
      seen.add(tn);
      out.push({ tagName: tn, status: decl.status, since: decl.since });
    }
  }
  out.sort((a, b) => (a.tagName ?? '').localeCompare(b.tagName ?? ''));
  return out;
}

const cellStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid var(--swc-gray-300, #e1e1e1)',
  verticalAlign: 'middle',
  fontSize: '14px',
};

const headerCellStyle: React.CSSProperties = {
  ...cellStyle,
  textAlign: 'left',
  fontWeight: 600,
  borderBottom: '2px solid var(--swc-gray-500, #b3b3b3)',
};

/**
 * Renders the at-a-glance component status matrix.
 *
 * Columns:
 * - Component — the `swc-*` tagName from the CEM
 * - Status — live `<swc-badge>` colored by `@status` JSDoc tag (preview /
 *   stable / deprecated / internal / unsupported). Components without an
 *   explicit tag default to Preview.
 * - Since — version string from `@since` JSDoc tag
 * - Parity — coverage relative to React Spectrum 2 (Full / Partial / None
 *   or free-form string), from `component-status.data.ts` overrides
 * - Figma — optional link from overrides
 * - StackBlitz — optional link from overrides
 * - Notes — optional free-text from overrides
 *
 * The badges are real `<swc-badge>` custom elements — the matrix dogfoods
 * the component library.
 */
export const ComponentStatusMatrix = () => {
  const components = collectComponents();

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '16px 0',
      }}
    >
      <thead>
        <tr>
          <th style={headerCellStyle}>Component</th>
          <th style={headerCellStyle}>Status</th>
          <th style={headerCellStyle}>Since</th>
          <th style={headerCellStyle}>RSP 2 parity</th>
          <th style={headerCellStyle}>Figma</th>
          <th style={headerCellStyle}>StackBlitz</th>
          <th style={headerCellStyle}>Notes</th>
        </tr>
      </thead>
      <tbody>
        {components.map(({ tagName, status, since }) => {
          const o = resolveOverride(tagName!);
          const statusKey = (status ?? 'preview').toLowerCase();
          const statusCfg =
            STATUS_BADGE_CONFIG[statusKey] ?? STATUS_BADGE_CONFIG.preview;
          const parityKey =
            typeof o.parity === 'string' ? o.parity.toLowerCase() : 'partial';
          const parityCfg = PARITY_BADGE_CONFIG[parityKey];
          return (
            <tr key={tagName}>
              <td style={cellStyle}>
                <code>{tagName}</code>
              </td>
              <td style={cellStyle}>
                <Badge variant={statusCfg.variant} outline={statusCfg.outline}>
                  {statusCfg.label}
                </Badge>
              </td>
              <td style={cellStyle}>{since ?? '—'}</td>
              <td style={cellStyle}>
                {parityCfg ? (
                  <Badge
                    variant={parityCfg.variant}
                    outline={parityCfg.outline}
                  >
                    {parityCfg.label}
                  </Badge>
                ) : (
                  <span>{o.parity || '—'}</span>
                )}
              </td>
              <td style={cellStyle}>
                {o.figma ? (
                  <a href={o.figma} target="_blank" rel="noreferrer">
                    Figma ↗
                  </a>
                ) : (
                  '—'
                )}
              </td>
              <td style={cellStyle}>
                {o.stackblitz ? (
                  <a href={o.stackblitz} target="_blank" rel="noreferrer">
                    StackBlitz ↗
                  </a>
                ) : (
                  '—'
                )}
              </td>
              <td style={cellStyle}>{o.notes || '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
