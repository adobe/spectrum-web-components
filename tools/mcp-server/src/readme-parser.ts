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

import type { ComponentExample } from './types.js';

/**
 * Parses a component README.md and extracts HTML code examples
 * from code blocks marked as ```html demo.
 */
export function parseReadmeExamples(content: string): ComponentExample[] {
  const examples: ComponentExample[] = [];
  const lines = content.split('\n');

  let lastHeading = '';
  let insideCodeBlock = false;
  let isHtmlDemo = false;
  let codeLines: string[] = [];

  for (const line of lines) {
    // Track headings
    const headingMatch = line.match(/^#{1,6}\s+(.+)/);
    if (headingMatch && !insideCodeBlock) {
      lastHeading = headingMatch[1].trim();
      continue;
    }

    // Check for code block boundaries
    if (line.startsWith('```')) {
      if (!insideCodeBlock) {
        // Opening a code block
        insideCodeBlock = true;
        const lang = line.slice(3).trim();
        isHtmlDemo = lang === 'html demo' || lang === 'html-demo';
        codeLines = [];
      } else {
        // Closing a code block
        if (isHtmlDemo) {
          examples.push({
            title: lastHeading,
            html: codeLines.join('\n'),
            source: 'readme',
          });
        }
        insideCodeBlock = false;
        isHtmlDemo = false;
      }
      continue;
    }

    // Accumulate lines inside a code block
    if (insideCodeBlock) {
      codeLines.push(line);
    }
  }

  return examples;
}
