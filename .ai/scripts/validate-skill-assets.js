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
 * Validate the files bundled with each skill in `.ai/skills/<name>/`.
 *
 * Checks:
 * - Every relative link in `SKILL.md` resolves inside the skill or the repository (error)
 * - No bundled file is larger than 5 MB (error)
 * - Every bundled file is referenced from `SKILL.md` by name (warning), because VS Code
 *   only loads the files that `SKILL.md` links to
 *
 * Adapted from the skill validator pattern in github/awesome-copilot
 * (`eng/validate-skills.mjs`).
 *
 * Returns { errors, warnings, fileCount } for integration with validate.js.
 */

import { existsSync, readdirSync, statSync } from 'fs';
import path from 'path';

import { listSkills, SAMPLE_LINKS } from './ai-files.js';

const MAX_ASSET_BYTES = 5 * 1024 * 1024;

/** Blank out fenced and inline code so example links inside code are ignored. */
const stripCode = (text) =>
  text
    .replace(/^([ \t]*)(```|~~~)[\s\S]*?^\1\2[^\n]*$/gm, (block) =>
      block.replace(/[^\n]/g, ' ')
    )
    .replace(/`[^`\n]*`/g, (span) => ' '.repeat(span.length));

export function validateSkillAssets() {
  const errors = [];
  const warnings = [];
  let fileCount = 0;

  for (const skill of listSkills()) {
    const dir = path.dirname(skill.file);
    const where = skill.rel;

    const linkPattern = /\[[^\]]*\]\(([^)\s]+)\)/g;
    let match;
    const body = stripCode(skill.source);
    while ((match = linkPattern.exec(body)) !== null) {
      const href = match[1].split('#')[0].split('?')[0];
      if (
        !href ||
        /^(https?:|mailto:|\/\/)/.test(href) ||
        SAMPLE_LINKS.has(`${where} ${href}`)
      ) {
        continue;
      }
      if (!existsSync(path.resolve(dir, decodeURI(href)))) {
        const line = body.slice(0, match.index).split('\n').length;
        errors.push(`${where}:${line}: link '${href}' doesn't resolve`);
      }
    }

    const bundled = readdirSync(dir, { recursive: true })
      .map(String)
      .filter((f) => f !== 'SKILL.md' && statSync(path.join(dir, f)).isFile());
    for (const file of bundled) {
      fileCount++;
      const size = statSync(path.join(dir, file)).size;
      if (size > MAX_ASSET_BYTES) {
        errors.push(
          `${where}: ${file} is ${(size / 1024 / 1024).toFixed(1)} MB; bundled files must be 5 MB or less`
        );
      }
      const posix = file.split(path.sep).join('/');
      if (
        !skill.source.includes(posix) &&
        !skill.source.includes(path.basename(file))
      ) {
        warnings.push(
          `${where}: bundled file ${posix} isn't referenced from SKILL.md, so some tools won't load it`
        );
      }
    }
  }

  return { errors, warnings, fileCount };
}
