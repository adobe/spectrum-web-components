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
 * Validates `.ai/` instruction and skill frontmatter against the canonical schema, so
 * every generated Copilot, Claude, and Cursor file loads the way the source intends.
 *
 * Instructions (`.ai/rules/*.md` and `.ai/memory/*.md`):
 *   - `description` (required, a plain one-line YAML value so Cursor parses it) and `paths`
 *     (required, quoted YAML list); optional `excludeAgent`
 *   - no `globs`, `alwaysApply`, `applyTo`, or `name`
 *   - every `paths` glob matches at least one tracked file (GitHub `applyTo` semantics)
 *   - warns above 12 KB, which dilutes always-loaded context
 *
 * Skills (`.ai/skills/<name>/SKILL.md`):
 *   - one level deep, `name` equals the directory, lowercase with single hyphens, 64 max
 *   - `description` of 1 to 1,024 decoded characters that says when to use the skill
 *   - no rule-style keys; `allowed-tools` never pre-approves `shell`, `bash`, or `*`
 *
 * Also: unique names, no hand-authored files in generated folders, and a warning for
 * tool-specific wording (Claude, Cursor, .mdc) in tool-agnostic sources.
 *
 * Only git-tracked files are checked (staged new files count), so untracked or ignored
 * local files, such as tool caches and handoff notes, never fail the run.
 *
 * Returns { errors, warnings, fileCount } for integration with validate.js.
 */

import { readFileSync } from 'fs';
import path from 'path';
import { parse as parseYaml } from 'yaml';

import {
  AI_DIR,
  assertGlobSemantics,
  codePointLength,
  EXCLUDE_AGENT_VALUES,
  GENERATED_MARKER,
  INSTRUCTION_KEYS,
  isTracked,
  listInstructionSources,
  listSkills,
  matchesGlob,
  readMarkdown,
  REJECTED_INSTRUCTION_KEYS,
  REJECTED_SKILL_KEYS,
  rel,
  SKILL_KEYS,
  trackedFiles,
  trackedFilesOnDisk,
} from './ai-files.js';

/**
 * Skill layout problems (nesting, a name that differs from its directory, rule-style keys)
 * are errors now that every skill is normalized.
 */
const STRICT_SKILL_LAYOUT = true;

const INSTRUCTION_SIZE_WARNING = 12 * 1024;
const SKILL_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const WHEN_TO_USE = /\b(use|when|whenever|before|after|trigger)\b/i;
const TOOL_WORDING = /\bClaude\b|\bCursor\b|\.mdc\b/;
const TOOL_WORDING_ALLOWLIST = [
  // Adapter documentation has to name the tools it adapts to.
  /^\.ai\/README\.md$/,
  // Model-comparison evals record which model produced each result.
  /^\.ai\/skills\/session-handoff\/evals\//,
];
const FORBIDDEN_ALLOWED_TOOLS = /^(shell|bash|\*)(\(|$)/i;

/**
 * Cursor's frontmatter is written unquoted (see sync.js), so the collapsed description
 * must parse back to itself as a plain YAML scalar.
 */
function isPlainYamlScalar(description) {
  const value = description.replace(/\s+/g, ' ').trim();
  try {
    return parseYaml(`description: ${value}`)?.description === value;
  } catch {
    return false;
  }
}

function validateInstruction(source, errors, warnings) {
  const where = source.rel;
  if (source.error) {
    errors.push(`${where}: ${source.error}`);
    return;
  }
  if (!source.data) {
    errors.push(`${where}: missing frontmatter (description, paths)`);
    return;
  }
  const data = source.data;

  for (const key of Object.keys(data)) {
    if (REJECTED_INSTRUCTION_KEYS[key]) {
      errors.push(
        `${where}: \`${key}\` isn't allowed; ${REJECTED_INSTRUCTION_KEYS[key]}`
      );
    } else if (!INSTRUCTION_KEYS.has(key)) {
      errors.push(`${where}: unknown frontmatter key \`${key}\``);
    }
  }

  if (typeof data.description !== 'string' || !data.description.trim()) {
    errors.push(`${where}: \`description\` must be a non-empty string`);
  } else if (!isPlainYamlScalar(data.description)) {
    errors.push(
      `${where}: \`description\` must stay a plain YAML value on one line for Cursor; avoid \`: \`, \` #\`, and leading quotes or YAML symbols`
    );
  }

  if (
    !Array.isArray(data.paths) ||
    data.paths.length === 0 ||
    !data.paths.every((p) => typeof p === 'string' && p.trim())
  ) {
    errors.push(
      `${where}: \`paths\` must be a non-empty list of quoted glob strings`
    );
  } else {
    const files = trackedFiles();
    for (const pattern of data.paths) {
      if (pattern.includes(',')) {
        errors.push(
          `${where}: glob '${pattern}' contains a comma; list each glob separately`
        );
        continue;
      }
      if (!files.some((f) => matchesGlob(f, pattern))) {
        errors.push(
          `${where}: glob '${pattern}' matches no tracked file (\`*\` stays in one directory; use \`**/\` to recurse)`
        );
      }
    }
  }

  if (
    data.excludeAgent !== undefined &&
    !EXCLUDE_AGENT_VALUES.has(data.excludeAgent)
  ) {
    errors.push(
      `${where}: \`excludeAgent\` must be one of ${[...EXCLUDE_AGENT_VALUES].join(', ')}`
    );
  }

  const bytes = Buffer.byteLength(source.source);
  if (bytes > INSTRUCTION_SIZE_WARNING) {
    warnings.push(
      `${where}: ${Math.round(bytes / 1024)} KB loads with every matching file; move long procedures into a skill`
    );
  }
}

function validateSkill(skill, errors, warnings) {
  const where = skill.rel;
  const layout = STRICT_SKILL_LAYOUT ? errors : warnings;

  if (skill.error || !skill.data) {
    errors.push(`${where}: ${skill.error ?? 'missing frontmatter'}`);
    return;
  }
  const { name, description } = skill.data;

  if (skill.depth !== 1) {
    layout.push(
      `${where}: skills must be one level deep (.ai/skills/<name>/SKILL.md)`
    );
  }

  if (typeof name !== 'string' || !name) {
    errors.push(`${where}: \`name\` is required`);
  } else {
    if (!SKILL_NAME.test(name) || name.length > 64) {
      errors.push(
        `${where}: \`name\` '${name}' must be lowercase letters, digits, and single hyphens, 64 characters max`
      );
    }
    if (name !== skill.dirName) {
      layout.push(
        `${where}: \`name\` '${name}' must match its directory '${skill.dirName}' (VS Code skips mismatched skills)`
      );
    }
  }

  if (typeof description !== 'string' || !description.trim()) {
    errors.push(`${where}: \`description\` is required`);
  } else {
    const length = codePointLength(description);
    if (length > 1024) {
      errors.push(
        `${where}: \`description\` is ${length} characters; Copilot rejects more than 1,024`
      );
    }
    if (!WHEN_TO_USE.test(description)) {
      warnings.push(
        `${where}: \`description\` should say when to use the skill`
      );
    }
  }

  for (const key of Object.keys(skill.data)) {
    if (REJECTED_SKILL_KEYS[key]) {
      layout.push(
        `${where}: \`${key}\` isn't a skill key; ${REJECTED_SKILL_KEYS[key]}`
      );
    } else if (!SKILL_KEYS.has(key)) {
      warnings.push(`${where}: unknown skill frontmatter key \`${key}\``);
    }
  }

  const tools = skill.data['allowed-tools'];
  const toolList = Array.isArray(tools)
    ? tools
    : typeof tools === 'string'
      ? tools.split(/[\s,]+/)
      : [];
  for (const tool of toolList.filter(Boolean)) {
    if (FORBIDDEN_ALLOWED_TOOLS.test(tool.trim())) {
      errors.push(
        `${where}: \`allowed-tools\` must not pre-approve '${tool.trim()}'`
      );
    }
  }
}

function validateUniqueness(sources, skills, errors) {
  const skillNames = new Map();
  for (const skill of skills) {
    const name = skill.data?.name;
    if (!name) {
      continue;
    }
    if (skillNames.has(name)) {
      errors.push(
        `${skill.rel}: skill name '${name}' is already used by ${skillNames.get(name)}`
      );
    } else {
      skillNames.set(name, skill.rel);
    }
  }

  const targets = new Map();
  for (const source of sources) {
    if (targets.has(source.target)) {
      errors.push(
        `${source.rel}: generates '${source.target}', which ${targets.get(source.target)} also generates`
      );
    }
    targets.set(source.target, source.rel);
    // A rule may share a skill's name only when it points to that skill.
    if (
      skillNames.has(source.name) &&
      !source.body.includes(`skills/${source.name}/SKILL.md`)
    ) {
      errors.push(
        `${source.rel}: shares the name '${source.name}' with a skill but doesn't link to .ai/skills/${source.name}/SKILL.md`
      );
    }
  }

  // Generated folders hold only generated files. Untracked local files, such as tool
  // caches, are skipped because they never reach the repository.
  for (const dir of ['.github/instructions', '.cursor/rules']) {
    const inDir = (f) => path.posix.dirname(f) === dir;
    for (const file of trackedFilesOnDisk(inDir)) {
      let text = '';
      try {
        text = readFileSync(file, 'utf8');
      } catch {
        continue;
      }
      if (!text.includes(GENERATED_MARKER)) {
        errors.push(
          `${rel(file)}: hand-authored file in a generated folder; add it to .ai/ instead`
        );
      }
    }
  }
}

function validateToolWording(files, warnings) {
  for (const file of files) {
    if (TOOL_WORDING_ALLOWLIST.some((re) => re.test(file.rel))) {
      continue;
    }
    let inFence = false;
    const lines = [];
    file.body.split('\n').forEach((line, i) => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;
        return;
      }
      if (!inFence && TOOL_WORDING.test(line)) {
        lines.push(i + 1);
      }
    });
    if (lines.length) {
      warnings.push(
        `${file.rel}: tool-specific wording (Claude, Cursor, .mdc) in a tool-agnostic source, body line(s) ${lines.join(', ')}`
      );
    }
  }
}

export function validateFrontmatter() {
  const errors = [...assertGlobSemantics()];
  const warnings = [];

  const sources = listInstructionSources().filter((s) => isTracked(s.file));
  const skills = listSkills().filter((s) => isTracked(s.file));

  sources.forEach((s) => validateInstruction(s, errors, warnings));
  skills.forEach((s) => validateSkill(s, errors, warnings));
  validateUniqueness(
    sources.filter((s) => s.data && !s.error),
    skills,
    errors
  );

  const agents = trackedFilesOnDisk(
    (f) => path.posix.basename(f) === 'AGENTS.md'
  ).map(readMarkdown);

  const skillDirs = skills.map((skill) => `${rel(path.dirname(skill.file))}/`);
  const skillSupport = trackedFilesOnDisk(
    (f) =>
      f.endsWith('.md') &&
      path.posix.basename(f) !== 'SKILL.md' &&
      skillDirs.some((dir) => f.startsWith(dir))
  ).map(readMarkdown);

  const aiDocs = trackedFilesOnDisk(
    (f) => path.posix.dirname(f) === rel(AI_DIR) && f.endsWith('.md')
  ).map(readMarkdown);

  validateToolWording(
    [...sources, ...skills, ...skillSupport, ...agents, ...aiDocs],
    warnings
  );

  return {
    errors,
    warnings,
    fileCount: sources.length + skills.length,
  };
}
