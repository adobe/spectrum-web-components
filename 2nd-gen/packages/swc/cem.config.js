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

/**
 * Extract the string value of a JSDoc tag's comment, handling both the
 * plain-string and mixed-content (`JSDocText[]`) shapes the TS compiler emits.
 */
function readTagComment(tag) {
  if (!tag) return '';
  if (typeof tag.comment === 'string') {
    return tag.comment.trim();
  }
  if (Array.isArray(tag.comment)) {
    return tag.comment
      .map((c) => c.text ?? '')
      .join('')
      .trim();
  }
  return '';
}

/**
 * Try to coerce a `@deprecated` JSDoc tag body into a structured record.
 * Accepts any of these shapes, in order of preference:
 *
 *   @deprecated { "reason": "…", "since": "1.2.0", "replacedBy": "…" }
 *   @deprecated reason: …; since: …; replacedBy: …
 *   @deprecated free-form prose
 *
 * Returns either a `{ reason, since, replacedBy }` object (when any field
 * was parseable) or the original string (so downstream callers can fall
 * back to rendering it verbatim).
 */
function parseDeprecatedComment(raw) {
  if (!raw) return { reason: '' };

  // JSON form: `{ "reason": "…", "since": "…" }`
  if (raw.startsWith('{') && raw.endsWith('}')) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          reason: typeof parsed.reason === 'string' ? parsed.reason : '',
          since: typeof parsed.since === 'string' ? parsed.since : undefined,
          replacedBy:
            typeof parsed.replacedBy === 'string'
              ? parsed.replacedBy
              : undefined,
        };
      }
    } catch {
      // fall through to key-value parsing
    }
  }

  // Key-value form: `reason: …; since: …; replacedBy: …`
  if (raw.includes(':')) {
    const parts = raw
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);
    const out = {};
    let matched = 0;
    for (const part of parts) {
      const match = part.match(/^(reason|since|replacedBy)\s*:\s*(.+)$/i);
      if (match) {
        const key =
          match[1].toLowerCase() === 'reason'
            ? 'reason'
            : match[1].toLowerCase() === 'since'
              ? 'since'
              : 'replacedBy';
        out[key] = match[2].trim();
        matched++;
      }
    }
    if (matched > 0) {
      return {
        reason: out.reason ?? '',
        since: out.since,
        replacedBy: out.replacedBy,
      };
    }
  }

  // Fall through: treat as free-form prose attached to `reason`.
  return { reason: raw };
}

/**
 * CEM plugin that extracts SWC-authored JSDoc tags from class declarations
 * and attaches them to the corresponding CEM declaration.
 *
 * Tags handled:
 *
 * - `@status preview|beta|stable|deprecated` — lifecycle
 * - `@since 0.1.0` — first-released version
 * - `@summary …` — one-sentence description surfaced as Storybook subtitle
 *   (supersedes `parameters.docs.subtitle` in stories)
 * - `@genre component|controller|pattern|token-family|…` — top-level
 *   entity type; drives which blocks render in the composed README.mdx
 * - `@category status-display|…` — taxonomy string used for sidebar
 *   grouping and cross-references
 * - `@related tag-name,other-tag-name` — sibling entity names (comma-
 *   separated list) consumed by `<RelatedEntities>`
 * - `@RSPparity full|partial|none|<note>` — React Spectrum 2 parity;
 *   consumed by the component status matrix (MVP-6a)
 * - `@a11yPattern …` — accessibility pattern label; consumed by
 *   narrative + `<ApiTable>` extensions
 * - `@deprecated …` — free-form OR structured `{ reason, since,
 *   replacedBy }` (JSON or `key: value; …`), emitted as
 *   `declaration.deprecated = { reason, since?, replacedBy? }`
 *
 * Example:
 *
 * ```ts
 * /**
 *  * @element swc-badge
 *  * @status preview
 *  * @since 0.1.0
 *  * @summary A non-interactive label that communicates status or category.
 *  * @genre component
 *  * @category status-display
 *  * @related status-light,tag
 *  * @RSPparity partial
 *  * @a11yPattern aria-describedby-owner
 *  *\/
 * export class Badge extends BadgeBase {}
 * ```
 */
function swcJsdocTagsPlugin() {
  // Scalar tags whose value is stored verbatim on the declaration under the
  // same key. Extend this set as new tags are introduced.
  const SCALAR_TAGS = new Set([
    'status',
    'since',
    'summary',
    'genre',
    'category',
    'RSPparity',
    'a11yPattern',
  ]);

  return {
    name: 'cem-plugin-swc-jsdoc-tags',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) return;

      const jsDocs = node.jsDoc;
      if (!jsDocs?.length) return;

      const jsDoc = jsDocs[jsDocs.length - 1];
      if (!jsDoc.tags) return;

      const className = node.name?.getText();
      if (!className) return;

      const declaration = moduleDoc?.declarations?.find(
        (d) => d.name === className
      );
      if (!declaration) return;

      for (const tag of jsDoc.tags) {
        const tagName = tag.tagName.getText();
        const value = readTagComment(tag);
        if (!value) continue;

        if (SCALAR_TAGS.has(tagName)) {
          declaration[tagName] = value;
          continue;
        }

        if (tagName === 'related') {
          declaration.related = value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
          continue;
        }

        if (tagName === 'deprecated') {
          declaration.deprecated = parseDeprecatedComment(value);
          continue;
        }
      }
    },
  };
}

export default {
  globs: [
    'components/**/*.ts',
    '../core/components/**/*.ts',
    '../core/controllers/**/*.ts',
    '../core/element/**/*.ts',
    '../core/mixins/**/*.ts',
    '../core/utils/**/*.ts',
  ],
  exclude: [
    '**/*.stories.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/stories/**',
    '**/test/**',
    '../core/**/stories/**',
    '../core/**/test/**',
  ],
  outdir: '.storybook',
  litelement: true,
  dev: false,
  plugins: [swcJsdocTagsPlugin()],
};
