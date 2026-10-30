#!/usr/bin/env node

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
 * Generates tool-specific files from the canonical `.ai/` sources.
 *
 * Inputs:
 *   .ai/rules/<name>.md   → .github/instructions/<name>.instructions.md  (Copilot)
 *                         → .cursor/rules/<name>.mdc                     (Cursor)
 *   .ai/memory/<name>.md  → the same targets, named memory-<name>
 *   .ai/agents/<name>.agent.md → .github/agents/<name>.agent.md             (Copilot only)
 *   provenance metadata   → .ai/THIRD-PARTY-NOTICES.md                     (vendored files)
 *   skill and rule frontmatter → the catalog block in .ai/README.md, between
 *                                <!-- ai:catalog:start --> and <!-- ai:catalog:end -->
 *
 * Claude Code reads `.ai/rules` directly through the `.claude/rules` symlink, so it needs
 * no generated copy.
 *
 * Usage:
 *   node .ai/scripts/sync.js          Write generated files (`yarn ai:sync`)
 *   node .ai/scripts/sync.js --check  Report drift without writing; exits 1 on drift.
 *                                     Checks only git-tracked sources and generated files.
 *
 * Both modes fail when the catalog markers in .ai/README.md are missing, duplicated, or out
 * of order, so a damaged marker can't silently turn off the catalog check.
 */

import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import path from 'path';
import * as prettier from 'prettier';
import { fileURLToPath } from 'url';
import { stringify as stringifyYaml } from 'yaml';

import {
  AI_DIR,
  GENERATED_MARKER,
  isTracked,
  isVisible,
  licenseFileFor,
  listAgents,
  listInstructionSources,
  listSkills,
  provenanceOf,
  rel,
  ROOT,
} from './ai-files.js';

const README = path.join(AI_DIR, 'README.md');
const NOTICES = path.join(AI_DIR, 'THIRD-PARTY-NOTICES.md');
const AGENTS_TARGET_DIR = '.github/agents';
const CATALOG_START = '<!-- ai:catalog:start -->';
const CATALOG_END = '<!-- ai:catalog:end -->';

const header = (source) =>
  `${GENERATED_MARKER} from ${source.rel}. Do not edit. Edit the source and run \`yarn ai:sync\`. -->`;

const yamlBlock = (data) =>
  `---\n${stringifyYaml(data, { lineWidth: 0 }).trimEnd()}\n---\n`;

async function formatMarkdown(text, filepath) {
  const options = (await prettier.resolveConfig(filepath)) ?? {};
  return prettier.format(text, { ...options, filepath, parser: 'markdown' });
}

/** Copilot: `.github/instructions/<target>.instructions.md` with `applyTo`. */
const copilotTarget = {
  dir: '.github/instructions',
  file: (source) => `${source.target}.instructions.md`,
  async render(source, filepath) {
    const data = {
      description: source.data.description,
      applyTo: source.data.paths.join(','),
    };
    if (source.data.excludeAgent) {
      data.excludeAgent = source.data.excludeAgent;
    }
    const text = `${yamlBlock(data)}\n${header(source)}\n\n${source.body.trimStart()}`;
    return formatMarkdown(text, filepath);
  },
};

/**
 * Cursor: `.cursor/rules/<target>.mdc`. Cursor reads `globs` as one comma-separated string,
 * so this frontmatter is written by hand rather than as strict YAML.
 */
const cursorTarget = {
  dir: '.cursor/rules',
  file: (source) => `${source.target}.mdc`,
  async render(source) {
    const description = String(source.data.description).replace(/\s+/g, ' ');
    const text =
      `---\ndescription: ${description}\nglobs: ${source.data.paths.join(',')}\nalwaysApply: false\n---\n\n` +
      `${header(source)}\n\n${source.body.trimStart()}`;
    return `${text.trimEnd()}\n`;
  },
};

const TARGETS = [copilotTarget, cursorTarget];

/**
 * Copilot custom agents: `.ai/agents/<name>.agent.md` → `.github/agents/<name>.agent.md`.
 * Only Copilot gets a copy; `metadata` (provenance) stays in the source.
 */
async function renderAgent(agent, filepath) {
  const data = { ...agent.data };
  delete data.metadata;
  const text = `${yamlBlock(data)}\n${header(agent)}\n\n${agent.body.trimStart()}`;
  return formatMarkdown(text, filepath);
}

/** First "Copyright …" line of a license text, used in the notices. */
function copyrightLine(licenseFile) {
  if (!existsSync(licenseFile)) {
    return '';
  }
  return (
    readFileSync(licenseFile, 'utf8')
      .split('\n')
      .find((line) => /^copyright/i.test(line.trim()))
      ?.trim() ?? ''
  );
}

/**
 * `.ai/THIRD-PARTY-NOTICES.md`, generated from the provenance metadata of vendored files.
 * Returns `null` when nothing in `.ai/` is vendored.
 */
function renderNotices(entries) {
  if (!entries.length) {
    return null;
  }
  const bySource = new Map();
  for (const entry of entries) {
    const list = bySource.get(entry.source) ?? [];
    list.push(entry);
    bySource.set(entry.source, list);
  }
  const lines = [
    '# Third-party notices',
    '',
    `${GENERATED_MARKER} from provenance metadata. Do not edit. Run \`yarn ai:sync\`. -->`,
    '',
    'Some files in `.ai/` are adapted from third-party open-source projects. Each is listed below with the upstream path and commit it was copied from and its license. The adaptations made for this repository are described in the pull request that added each file. The full license texts are in [`licenses/`](./licenses/).',
    '',
  ];
  for (const [source, list] of [...bySource].sort()) {
    const licenses = [...new Set(list.map((item) => item.license))];
    lines.push(`## ${source}`, '');
    for (const license of licenses) {
      const file = licenseFileFor(source, license);
      lines.push(
        `- **License:** ${license}, ${copyrightLine(file)} ([\`licenses/${path.basename(file)}\`](./licenses/${path.basename(file)}))`
      );
    }
    lines.push('');
    for (const entry of list.sort((a, b) => a.file.localeCompare(b.file))) {
      const upstream = entry.upstream
        ? `; upstream: ${entry.upstream} (${entry.license}, ${copyrightLine(licenseFileFor(entry.upstream, entry.license))})`
        : '';
      lines.push(
        `- [\`${entry.file}\`](./${entry.file}): adapted from \`${entry.sourcePath}\` at \`${entry.sourceSha}\`${upstream}`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

/** Every vendored file, as `{ file, source, sourcePath, sourceSha, upstream, license }`. */
function vendoredEntries(sources, skills, agents) {
  const entries = [];
  const add = (file, data) => {
    const provenance = provenanceOf(data);
    if (provenance) {
      entries.push({ file: path.relative(AI_DIR, file), ...provenance });
    }
  };
  sources.forEach((s) => add(s.file, s.data));
  skills.forEach((s) => add(path.dirname(s.file), s.data));
  agents.forEach((a) => add(a.file, a.data));
  return entries;
}

/** True for a file this script owns: it has the marker, or it's a legacy symlink into `.ai/rules/`. */
function isOwned(file) {
  const stat = lstatSync(file);
  if (stat.isSymbolicLink()) {
    return readlinkSync(file).includes('.ai/rules/');
  }
  if (!stat.isFile()) {
    return false;
  }
  return readFileSync(file, 'utf8').includes(GENERATED_MARKER);
}

const escapeCell = (value) =>
  String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();

function renderCatalog(sources, skills, agents = []) {
  const lines = [
    CATALOG_START,
    '',
    '_Generated by `yarn ai:sync` from frontmatter. Do not edit this block by hand._',
    '',
    '### Instructions',
    '',
    ...sources.map((s) => {
      const file = s.rel.replace(/^\.ai\//, '');
      const scope = s.data.paths.map((p) => `\`${p}\``).join(', ');
      const excluded = s.data.excludeAgent
        ? `; not used by ${s.data.excludeAgent}`
        : '';
      return `- **[\`${file}\`](./${file})** (${scope}${excluded}): ${escapeCell(s.data.description)}`;
    }),
    '',
    '### Skills',
    '',
    ...skills.map(
      (s) =>
        `- **[\`${s.data?.name ?? s.dir}\`](./skills/${s.dir}/SKILL.md)**: ${escapeCell(s.data?.description)}`
    ),
    '',
    ...(agents.length
      ? [
          '### Custom agents',
          '',
          ...agents.map(
            (a) =>
              `- **[\`${a.name}\`](./agents/${a.name}.agent.md)** (tools: ${[].concat(a.data.tools ?? 'all').join(', ')}): ${escapeCell(a.data.description)}`
          ),
          '',
        ]
      : []),
    CATALOG_END,
  ];
  return lines.join('\n');
}

const count = (text, needle) => text.split(needle).length - 1;

/**
 * Locate the generated catalog block in README text. Returns `{ start, end }`, where `end`
 * is the index just past the end marker, or `{ error }` unless each marker appears exactly
 * once with the start marker first.
 */
export function findCatalogBlock(text) {
  const starts = count(text, CATALOG_START);
  const ends = count(text, CATALOG_END);
  if (starts !== 1 || ends !== 1) {
    return {
      error: `expected one ${CATALOG_START} and one ${CATALOG_END}, found ${starts} and ${ends}`,
    };
  }
  const start = text.indexOf(CATALOG_START);
  const end = text.indexOf(CATALOG_END);
  if (end < start) {
    return { error: `${CATALOG_END} comes before ${CATALOG_START}` };
  }
  return { start, end: end + CATALOG_END.length };
}

/**
 * Compute every generated file and compare it with disk.
 * With `write: true`, update disk to match. Returns `{ errors, changes, fileCount }`.
 * `readme` overrides the catalog file, for tests.
 */
export async function syncAi({ write = false, readme = README } = {}) {
  const errors = [];
  const changes = [];
  // `--check` sees only tracked files, as CI does. Writing also covers untracked sources so
  // a new rule generates before it's staged, but never gitignored ones, which the git hooks
  // can't see.
  const inScope = write ? isVisible : isTracked;
  const sources = listInstructionSources().filter(
    (s) => inScope(s.file) && s.data && !s.error && Array.isArray(s.data.paths)
  );

  const expected = new Map();
  for (const target of TARGETS) {
    for (const source of sources) {
      const filepath = path.join(ROOT, target.dir, target.file(source));
      expected.set(filepath, await target.render(source, filepath));
    }
  }

  const agents = listAgents().filter(
    (a) => inScope(a.file) && a.data && !a.error
  );
  for (const agent of agents) {
    const filepath = path.join(
      ROOT,
      AGENTS_TARGET_DIR,
      `${agent.name}.agent.md`
    );
    expected.set(filepath, await renderAgent(agent, filepath));
  }

  const skills = listSkills().filter(
    (s) => inScope(s.file) && s.data && !s.error
  );
  const notices = renderNotices(vendoredEntries(sources, skills, agents));
  if (notices) {
    expected.set(NOTICES, await formatMarkdown(notices, NOTICES));
  }

  if (!existsSync(readme)) {
    errors.push(`${rel(readme)}: missing, so the catalog can't be checked`);
  } else {
    const current = readFileSync(readme, 'utf8');
    const block = findCatalogBlock(current);
    if (block.error) {
      errors.push(
        `${rel(readme)}: ${block.error}. Restore the catalog markers, then run \`yarn ai:sync\``
      );
    } else {
      const replaced =
        current.slice(0, block.start) +
        renderCatalog(sources, skills, agents) +
        current.slice(block.end);
      expected.set(readme, await formatMarkdown(replaced, readme));
    }
  }

  for (const [filepath, content] of expected) {
    const exists = existsSync(filepath) || isDanglingLink(filepath);
    const isLink = exists && lstatSync(filepath).isSymbolicLink();
    const same =
      exists && !isLink && readFileSync(filepath, 'utf8') === content;
    if (same) {
      continue;
    }
    changes.push(
      `${rel(filepath)}: ${!exists ? 'missing' : isLink ? 'is a legacy symlink' : 'out of date'}`
    );
    if (write) {
      mkdirSync(path.dirname(filepath), { recursive: true });
      if (isLink) {
        // Never write through a symlink: that would overwrite the canonical source.
        unlinkSync(filepath);
      }
      writeFileSync(filepath, content);
    }
  }

  // Remove generated files whose source no longer exists.
  for (const dir of [...TARGETS.map((t) => t.dir), AGENTS_TARGET_DIR].map((d) =>
    path.join(ROOT, d)
  )) {
    if (!existsSync(dir)) {
      continue;
    }
    for (const name of readdirSync(dir)) {
      const filepath = path.join(dir, name);
      if (expected.has(filepath) || !inScope(filepath) || !isOwned(filepath)) {
        continue;
      }
      changes.push(`${rel(filepath)}: orphaned (source removed)`);
      if (write) {
        unlinkSync(filepath);
      }
    }
  }

  if (!write) {
    errors.push(
      ...changes.map((c) => `${c}: run \`yarn ai:sync\` and commit the result`)
    );
  }
  return { errors, changes, fileCount: expected.size };
}

function isDanglingLink(filepath) {
  try {
    return lstatSync(filepath).isSymbolicLink();
  } catch {
    return false;
  }
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const check = process.argv.includes('--check');
  const { errors, changes, fileCount } = await syncAi({ write: !check });
  if (check) {
    if (errors.length) {
      errors.forEach((error) => console.error(`✖ ${error}`));
      process.exit(1);
    }
    console.warn(`✔ ${fileCount} generated file(s) up to date`);
  } else {
    changes.forEach((c) => console.warn(`updated ${c}`));
    if (errors.length) {
      errors.forEach((error) => console.error(`✖ ${error}`));
      process.exit(1);
    }
    console.warn(
      `✔ ${fileCount} generated file(s) in sync (${changes.length} change(s))`
    );
  }
}
