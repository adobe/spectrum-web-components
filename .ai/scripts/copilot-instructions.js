// Copyright 2026 Adobe. All rights reserved.
// This file is licensed to you under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may obtain a copy
// of the License at http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software distributed under
// the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
// OF ANY KIND, either express or implied. See the License for the specific language
// governing permissions and limitations under the License.

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import { basename, join } from 'path';

const ROOT = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');
const RULES_DIR = join(ROOT, '.ai/rules');
const COPILOT_INSTRUCTIONS_DIR = join(ROOT, '.github/instructions');
const GENERATED_MARKER =
  '<!-- Generated from .ai/rules/ by yarn generate:copilot-instructions. Do not edit. -->';

function parseRule(source, sourcePath) {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!frontmatter) {
    throw new Error(`${sourcePath} is missing YAML frontmatter`);
  }

  const globsLine = frontmatter[1].match(/^globs:[ \t]*(.*)$/m);
  const alwaysApply = /^alwaysApply:\s*true$/m.test(frontmatter[1]);
  const globs = (globsLine?.[1] ?? '')
    .replace(/^(['"])(.*)\1$/, '$2')
    .split(',')
    .map((glob) => glob.trim())
    .filter(Boolean)
    .map((glob) => (glob.includes('/') ? glob : `**/${glob}`));

  if (globs.length === 0 && alwaysApply) {
    globs.push('**');
  }
  if (globs.length === 0) {
    throw new Error(`${sourcePath} has no Copilot-compatible file scope`);
  }

  return {
    body: source.slice(frontmatter[0].length).replace(/^\n+/, ''),
    applyTo: globs.join(','),
  };
}

export function buildCopilotInstructionAdapters() {
  const adapters = new Map();
  const ruleFiles = readdirSync(RULES_DIR)
    .filter((file) => file.endsWith('.md'))
    .sort();

  for (const ruleFile of ruleFiles) {
    const sourcePath = `.ai/rules/${ruleFile}`;
    const source = readFileSync(join(RULES_DIR, ruleFile), 'utf8');
    const { applyTo, body } = parseRule(source, sourcePath);
    const outputName = `${basename(ruleFile, '.md')}.instructions.md`;
    const content = `---
applyTo: "${applyTo}"
---

${GENERATED_MARKER}

${body}`;

    adapters.set(outputName, content);
  }

  return adapters;
}

function generatedAdapterFiles() {
  if (!existsSync(COPILOT_INSTRUCTIONS_DIR)) {
    return [];
  }

  return readdirSync(COPILOT_INSTRUCTIONS_DIR).filter((file) => {
    if (!file.endsWith('.instructions.md')) {
      return false;
    }
    return readFileSync(join(COPILOT_INSTRUCTIONS_DIR, file), 'utf8').includes(
      GENERATED_MARKER
    );
  });
}

export function generateCopilotInstructionAdapters() {
  const adapters = buildCopilotInstructionAdapters();
  mkdirSync(COPILOT_INSTRUCTIONS_DIR, { recursive: true });

  for (const [file, content] of adapters) {
    writeFileSync(join(COPILOT_INSTRUCTIONS_DIR, file), content);
  }

  for (const file of generatedAdapterFiles()) {
    if (!adapters.has(file)) {
      unlinkSync(join(COPILOT_INSTRUCTIONS_DIR, file));
    }
  }

  return adapters.size;
}

export function validateCopilotInstructionAdapters() {
  const errors = [];
  let adapters;

  try {
    adapters = buildCopilotInstructionAdapters();
  } catch (error) {
    return { errors: [error.message], fileCount: 0 };
  }

  for (const [file, expected] of adapters) {
    const relativePath = `.github/instructions/${file}`;
    const outputPath = join(COPILOT_INSTRUCTIONS_DIR, file);
    if (!existsSync(outputPath)) {
      errors.push(
        `${relativePath} is missing; run yarn generate:copilot-instructions`
      );
      continue;
    }

    const actual = readFileSync(outputPath, 'utf8');
    if (actual !== expected) {
      errors.push(
        `${relativePath} is stale; run yarn generate:copilot-instructions`
      );
    }
  }

  for (const file of generatedAdapterFiles()) {
    if (!adapters.has(file)) {
      errors.push(
        `.github/instructions/${file} has no matching .ai/rules source`
      );
    }
  }

  return { errors, fileCount: adapters.size };
}
