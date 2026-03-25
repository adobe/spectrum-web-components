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
import React, { useEffect, useRef } from 'react';
import customElements from '../custom-elements.json' with { type: 'json' };

// Register the badge component for use in the docs iframe
import '../../components/badge/index.js';

type Status = 'preview' | 'deprecated' | 'internal';

const STATUS_CONFIG: Record<Status, { label: string; variant: string }> = {
  preview: { label: 'Preview', variant: 'notice' },
  deprecated: { label: 'Deprecated', variant: 'negative' },
  internal: { label: 'Internal', variant: 'neutral' },
};

/**
 * Renders a single `<swc-badge>` via a ref, since React's JSX doesn't
 * natively type custom elements without global augmentation.
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
 * Renders status and "since" badges for a component using `<swc-badge>`,
 * sourced from the Custom Elements Manifest.
 *
 * The component class must include `@status` and/or `@since` JSDoc tags:
 *
 * ```ts
 * /**
 *  * @element swc-my-component
 *  * @status preview
 *  * @since 1.0.0
 *  *\/
 * ```
 *
 * These are extracted into the CEM by the `statusPlugin` in `cem.config.js`
 * and read at render time from `custom-elements.json`.
 */
export const StatusBadge = ({ of }: { of?: any }) => {
  const resolvedOf = useOf(of || 'meta', ['meta']);
  const componentTag = resolvedOf.preparedMeta?.component;

  if (!componentTag) return null;

  // Look up component declaration in the CEM
  let status: string | undefined;
  let since: string | undefined;

  for (const mod of (customElements as any).modules ?? []) {
    const decl = (mod.declarations ?? []).find(
      (d: any) => d.tagName === componentTag
    );
    if (decl) {
      status = decl.status;
      since = decl.since;
      break;
    }
  }

  const hasStatus = status && status in STATUS_CONFIG;

  if (!hasStatus && !since) return null;

  const statusConfig = hasStatus ? STATUS_CONFIG[status as Status] : undefined;

  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
      {statusConfig && (
        <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
      )}
      {since && (
        <Badge variant="neutral" outline>
          {`Since ${since}`}
        </Badge>
      )}
    </div>
  );
};
