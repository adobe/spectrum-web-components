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

const SKIP_SINGLE_LINE =
  /^\s*(<Meta\b|<Title\s*\/>|<StatusBadge|<\/Subtitle>|<Subtitle>)/;
const SUBTITLE_OPEN = /<Subtitle>\s*/;
const SUBTITLE_CLOSE = /\s*<\/Subtitle>/;
const CANVAS_RE = /<Canvas\s+of=\{\w+\.(\w+)\}\s*\/>/;
const OVERVIEW_STORY_RE = /<OverviewStory\s*\/>/;
const GETTING_STARTED_RE = /<GettingStarted\s*\/>/;
const API_TABLE_RE = /<ApiTable\s*\/>/;

/**
 * Extracts Storybook meta fields from a CSF stories file.
 *
 * @param {string} storiesSource - Raw stories file contents
 * @returns {{ title: string, component: string, migrated: boolean }} Parsed meta fields
 */
export function parseStoriesMeta(storiesSource) {
  const titleMatch = storiesSource.match(/title:\s*['"]([^'"]+)['"]/);
  const componentMatch = storiesSource.match(/component:\s*['"]([^'"]+)['"]/);
  const migrated = /tags:\s*\[[^\]]*['"]migrated['"]/.test(storiesSource);

  return {
    title: titleMatch?.[1] ?? 'Component',
    component: componentMatch?.[1] ?? '',
    migrated,
  };
}

/**
 * Parses a component docs.mdx file into structured segments.
 *
 * @param {string} mdxSource - Raw docs.mdx contents
 * @returns {{ segments: import('./types.js').DocsSegment[]; subtitle: string }} Parsed segments and subtitle
 */
export function parseDocsMdx(mdxSource) {
  /** @type {import('./types.js').DocsSegment[]} */
  const segments = [];
  let subtitle = '';
  let inSubtitle = false;
  let inImport = false;
  /** @type {string[]} */
  let markdownBuffer = [];

  const flushMarkdown = () => {
    const text = markdownBuffer.join('\n').trim();
    if (text) {
      segments.push({ type: 'markdown', content: `${text}\n\n` });
    }
    markdownBuffer = [];
  };

  for (const line of mdxSource.split('\n')) {
    if (inImport) {
      if (/from\s+['"]/.test(line)) {
        inImport = false;
      }
      continue;
    }

    if (/^\s*import\b/.test(line)) {
      inImport = true;
      if (/from\s+['"]/.test(line)) {
        inImport = false;
      }
      continue;
    }

    if (SUBTITLE_OPEN.test(line)) {
      inSubtitle = true;
      subtitle = line
        .replace(SUBTITLE_OPEN, '')
        .replace(SUBTITLE_CLOSE, '')
        .trim();
      if (SUBTITLE_CLOSE.test(line)) {
        inSubtitle = false;
      }
      continue;
    }

    if (inSubtitle) {
      subtitle += ` ${line.replace(SUBTITLE_CLOSE, '').trim()}`;
      if (SUBTITLE_CLOSE.test(line)) {
        inSubtitle = false;
      }
      continue;
    }

    if (SKIP_SINGLE_LINE.test(line.trim())) {
      continue;
    }

    if (OVERVIEW_STORY_RE.test(line)) {
      flushMarkdown();
      segments.push({ type: 'story', exportName: 'Overview' });
      continue;
    }

    if (GETTING_STARTED_RE.test(line)) {
      flushMarkdown();
      segments.push({ type: 'getting-started' });
      continue;
    }

    if (API_TABLE_RE.test(line)) {
      flushMarkdown();
      segments.push({ type: 'api-table' });
      continue;
    }

    const canvasMatch = line.match(CANVAS_RE);
    if (canvasMatch) {
      flushMarkdown();
      segments.push({ type: 'story', exportName: canvasMatch[1] });
      continue;
    }

    markdownBuffer.push(line);
  }

  flushMarkdown();

  return { segments, subtitle: subtitle.trim() };
}
