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
 * Generates Agent Skills for Spectrum Web Components.
 *
 * Implements the Agent Skills Discovery RFC v0.2.0:
 * https://github.com/cloudflare/agent-skills-discovery-rfc
 *
 * Produces two skills whose prose is authored in dedicated source files:
 *   2nd-gen/packages/ai/skills/swc-skill/SKILL.md
 *   2nd-gen/packages/ai/skills/gen2-migration/SKILL.md
 *
 * The script resolves {{TOKEN}} placeholders in those files with generated
 * component and guide lists, then assembles each skill into a tar.gz archive
 * under .well-known/agent-skills/ in the 2nd-gen Storybook public dir.
 *
 * Usage:
 *   node scripts/generate-agent-skills.mjs
 *
 * Install (once the site is deployed):
 *   npx skills add spectrum-web-components.adobe.com
 */

import { execSync } from 'child_process';
import { createHash } from 'crypto';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const FIRST_GEN_PACKAGES = join(ROOT, '1st-gen/packages');
const FIRST_GEN_CONTENT = join(ROOT, '1st-gen/projects/documentation/content');
const FIRST_GEN_REF_DIR = join(FIRST_GEN_CONTENT, 'reference');
const SECOND_GEN_COMPONENTS = join(ROOT, '2nd-gen/packages/swc/components');
const SKILL_SOURCE_DIR = join(ROOT, '2nd-gen/packages/ai/skills');

/**
 * Storybook's staticDirs root — files here are served verbatim at the site root.
 *
 * SKILLS_BASE_URL overrides the URL embedded in index.json at build time:
 *   SKILLS_BASE_URL=https://example.com node scripts/generate-agent-skills.mjs
 *
 * Update the fallback once the canonical domain is confirmed.
 */
const OUTPUT_DIR = join(ROOT, '2nd-gen/packages/swc/public');
const SITE_URL =
  process.env.SKILLS_BASE_URL ??
  'https://opensource.adobe.com/spectrum-web-components/second-gen';
const SCHEMA_VERSION =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

// ---------------------------------------------------------------------------
// Guide definitions
// ---------------------------------------------------------------------------

/**
 * Guides bundled into the spectrum-web-components skill.
 * sourcePath is relative to ROOT; refPath is the path inside references/.
 */
const GEN1_GUIDES = [
  {
    sourcePath: '1st-gen/projects/documentation/content/getting-started.md',
    refPath: 'guides/getting-started.md',
    title: 'Getting started',
    description:
      'Set up a new project and start using Spectrum Web Components.',
    stripFn: 'eleventy',
  },
  {
    sourcePath: '1st-gen/projects/documentation/content/what-is-a-theme.md',
    refPath: 'guides/what-is-a-theme.md',
    title: 'What is a theme?',
    description:
      'Understand sp-theme: system, color, scale, direction, and language.',
    stripFn: 'eleventy',
  },
  {
    sourcePath: '1st-gen/projects/documentation/content/using-swc-react.md',
    refPath: 'guides/using-swc-react.md',
    title: 'Using SWC with React',
    description:
      'Use @swc-react/* wrapper components to integrate sp-* elements into React apps.',
    stripFn: 'eleventy',
  },
  {
    sourcePath:
      '1st-gen/projects/documentation/content/support-and-compatibility.md',
    refPath: 'guides/support-and-compatibility.md',
    title: 'Support and compatibility',
    description:
      'Browser support, versioning policy, and SLA for Spectrum Web Components.',
    stripFn: 'eleventy',
  },
  {
    sourcePath: '1st-gen/projects/documentation/content/registry-conflicts.md',
    refPath: 'guides/registry-conflicts.md',
    title: 'Registry conflicts',
    description: 'Diagnose and resolve custom element registry conflicts.',
    stripFn: 'eleventy',
  },
  {
    sourcePath: '1st-gen/projects/documentation/content/dev-mode.md',
    refPath: 'guides/dev-mode.md',
    title: 'Dev mode',
    description:
      'Enable dev mode for additional warnings and debugging information.',
    stripFn: 'eleventy',
  },
  {
    sourcePath: '1st-gen/projects/documentation/content/deprecation.md',
    refPath: 'guides/deprecation.md',
    title: 'Deprecation',
    description: 'What is deprecated in Spectrum 1 and what to use instead.',
    stripFn: 'eleventy',
  },
  {
    sourcePath:
      '1st-gen/projects/documentation/content/migrating-to-spectrum2.md',
    refPath: 'guides/migrating-to-spectrum2.md',
    title: 'Migrating to Spectrum 2 (sp-theme bridge)',
    description:
      'Apply the spectrum-two theme to sp-* components as a visual bridge while migrating.',
    stripFn: 'eleventy',
  },
];

/**
 * Guides bundled into the migrate-swc-gen1-to-gen2 skill.
 */
const GEN2_MIGRATION_GUIDES = [
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/resources/migrate-from-gen1.mdx',
    refPath: 'guides/migrate-from-gen1.md',
    title: 'Migrate from Gen1',
    description:
      'Complete step-by-step walkthrough: coexist sp-* and swc-*, swap themes and fonts, map --mod-* overrides to --swc-*, then decommission Gen1.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/learn-about-swc/gen1-vs-gen2.mdx',
    refPath: 'guides/gen1-vs-gen2.md',
    title: 'Gen1 vs Gen2',
    description:
      'Side-by-side comparison of package names, architecture, styling, and long-term support.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/learn-about-swc/get-started.mdx',
    refPath: 'guides/get-started.md',
    title: 'Get started (Gen2)',
    description:
      'Install @adobe/spectrum-wc, add the stylesheet, and use your first swc-* component.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/guides/customization/getting-started.mdx',
    refPath: 'guides/customization-getting-started.md',
    title: 'Customization: getting started',
    description:
      'Required stylesheet setup, PostCSS configuration, and application background color.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/guides/customization/theme-scales.mdx',
    refPath: 'guides/customization-theme-scales.md',
    title: 'Customization: theme and scales',
    description:
      'Apply light/dark/adaptive themes and medium/large scale via CSS classes.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/guides/customization/fonts.mdx',
    refPath: 'guides/customization-fonts.md',
    title: 'Customization: fonts',
    description:
      'Load Adobe Clean Spectrum VF via Adobe Fonts (Typekit), CDN, or self-hosted setup.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/guides/customization/component-styles.mdx',
    refPath: 'guides/customization-component-styles.md',
    title: 'Customization: component styles',
    description:
      'Customise swc-* components via --swc-* CSS custom properties.',
    stripFn: 'mdx',
  },
  {
    sourcePath:
      '2nd-gen/packages/swc/.storybook/resources/support-and-compatibility.mdx',
    refPath: 'guides/support-and-compatibility.md',
    title: 'Support and compatibility (Gen2)',
    description:
      'Browser support, versioning, and semantic versioning policy for @adobe/spectrum-wc.',
    stripFn: 'mdx',
  },
];

// ---------------------------------------------------------------------------
// Content strippers
// ---------------------------------------------------------------------------

/**
 * Strip Eleventy-specific syntax from 1st-gen Markdown content files.
 *
 * Removes:
 *   - YAML frontmatter (--- ... ---)
 *   - <iframe> elements (live demo embeds, not useful as text)
 *   - <style> blocks
 *   - <sp-link> wrapper tags, keeping inner text
 *   - Other custom element tags that are wrappers, keeping inner text
 */
function stripEleventy(content) {
  return (
    content
      // Remove YAML frontmatter
      .replace(/^---[\s\S]*?---\s*\n/, '')
      // Remove <iframe> blocks
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
      // Remove <style> blocks
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      // Unwrap <sp-link> and similar inline elements, keeping inner text
      .replace(/<sp-link[^>]*>([\s\S]*?)<\/sp-link>/gi, '$1')
      // Collapse runs of 3+ blank lines
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\n+/, '')
      .trimEnd() + '\n'
  );
}

/**
 * Strip MDX-specific syntax leaving plain Markdown.
 *
 * Removes:
 *   - import statements
 *   - <Meta .../> single-line self-closing tags
 *   - <img src={expr}> tags with JS expression sources
 *   - JSX block comments
 *   - Multi-line JSX elements whose opening tag contains a JS expression
 *     (e.g. callout divs with inline style={{...}})
 */
function stripMdx(content) {
  return (
    content
      // Remove import statements
      .replace(/^import\s+.*?from\s+['"][^'"]+['"]\s*;?\s*\n/gm, '')
      // Remove <Meta .../> (single-line self-closing)
      .replace(/^<Meta\s[^>]*\/>\s*\n/gm, '')
      // Remove <img> tags with a JS expression source (can't resolve at build time)
      .replace(/<img\s[^>]*\{[^}]*\}[^>]*\/?>/gi, '')
      // Remove JSX block comments
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      // Remove JSX elements whose opening tag contains a JS expression {}
      // (callout divs, inline-styled blocks, etc.)
      .replace(
        /<[A-Z][A-Za-z]*\s[^>]*\{[^>]*\}>[\s\S]*?<\/[A-Z][A-Za-z]*>\s*\n?/g,
        ''
      )
      .replace(/<[a-z]+\s[^>]*\{[^>]*\}>[\s\S]*?<\/[a-z]+>\s*\n?/g, '')
      // Collapse runs of 3+ blank lines introduced by removals
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\n+/, '')
      .trimEnd() + '\n'
  );
}

function stripContent(content, stripFn) {
  if (stripFn === 'eleventy') {
    return stripEleventy(content);
  }
  if (stripFn === 'mdx') {
    return stripMdx(content);
  }
  return content;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha256(filePath) {
  const hash = createHash('sha256');
  hash.update(readFileSync(filePath));
  return 'sha256:' + hash.digest('hex');
}

/**
 * Create a tar.gz archive from a source directory.
 */
function createArchive(sourceDir, outputPath) {
  const dirName = basename(sourceDir);
  const parentDir = join(sourceDir, '..');
  execSync(`tar -czf "${outputPath}" -C "${parentDir}" "${dirName}"`, {
    stdio: 'pipe',
  });
}

/**
 * Extract the first sentence of the Overview section from a 1st-gen README
 * for use as an inline description in the component list.
 */
function readmeDescription(packageDir) {
  const readmePath = join(FIRST_GEN_PACKAGES, packageDir, 'README.md');
  if (!existsSync(readmePath)) {
    return '';
  }
  const content = readFileSync(readmePath, 'utf8');
  const match = content.match(/## Overview\s*\n\s*\n([^#]+)/);
  if (!match) {
    return '';
  }
  const raw = match[1]
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/<\/[^>]+>/g, '')
    .replace(/<([a-z][a-z0-9-]*)(?:\s[^>]*)?\s*\/?>/gi, '$1 ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return raw.match(/^(.*?[.!?])(?:\s|$).*/s)?.[1]?.trim() ?? raw.slice(0, 120);
}

/**
 * Read the pre-generated CEM-based per-component reference for a 1st-gen tag.
 * Falls back to a minimal reference built from the component's README when the
 * pre-generated file is absent (e.g. when docs:analyze hasn't run yet).
 */
function readGen1Reference(tagName, packageDir) {
  const pregenPath = join(FIRST_GEN_REF_DIR, `${tagName}.md`);
  if (existsSync(pregenPath)) {
    return readFileSync(pregenPath, 'utf8');
  }

  const readmePath = join(FIRST_GEN_PACKAGES, packageDir, 'README.md');
  if (!existsSync(readmePath)) {
    return null;
  }

  const readme = readFileSync(readmePath, 'utf8');
  return (
    [
      `# ${tagName}`,
      '',
      `**Package**: \`@spectrum-web-components/${packageDir}\``,
      '',
      '```js',
      `import '@spectrum-web-components/${packageDir}/${tagName}.js';`,
      '```',
      '',
      '---',
      '',
      readme.trim(),
    ].join('\n') + '\n'
  );
}

/**
 * List all 1st-gen packages that have a README.
 * Returns [{ packageDir, tagName }] sorted by tagName.
 */
function listGen1Components() {
  const components = [];
  for (const dir of readdirSync(FIRST_GEN_PACKAGES)) {
    const readmePath = join(FIRST_GEN_PACKAGES, dir, 'README.md');
    if (!existsSync(readmePath)) {
      continue;
    }

    let tagName = `sp-${dir}`;
    const pkgJsonPath = join(FIRST_GEN_PACKAGES, dir, 'package.json');
    if (existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
        const inferred = pkg.name?.replace('@spectrum-web-components/', 'sp-');
        if (inferred?.startsWith('sp-')) {
          tagName = inferred;
        }
      } catch {
        // ignore
      }
    }
    components.push({ packageDir: dir, tagName });
  }
  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

/**
 * List all 2nd-gen components that have a migration-guide.mdx.
 * Returns [{ componentDir, guidePath }] sorted by componentDir.
 */
function listMigrationComponents() {
  return readdirSync(SECOND_GEN_COMPONENTS)
    .map((dir) => ({
      componentDir: dir,
      guidePath: join(SECOND_GEN_COMPONENTS, dir, 'migration-guide.mdx'),
    }))
    .filter((c) => existsSync(c.guidePath))
    .sort((a, b) => a.componentDir.localeCompare(b.componentDir));
}

// ---------------------------------------------------------------------------
// Token resolution
// ---------------------------------------------------------------------------

/**
 * Replace {{TOKEN}} placeholders in SKILL.md source content.
 */
function resolveTokens(template, tokens) {
  let result = template;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replaceAll(`{{${token}}}`, value);
  }
  return result;
}

function buildGuideList(guides) {
  return guides
    .map(
      (g) =>
        `- [${g.title}](references/${g.refPath})` +
        (g.description ? `: ${g.description}` : '')
    )
    .join('\n');
}

function buildComponentList(components) {
  return components
    .map((c) => {
      const desc = readmeDescription(c.packageDir);
      return (
        `- [${c.tagName}](references/components/${c.tagName}.md)` +
        (desc ? `: ${desc}` : '')
      );
    })
    .join('\n');
}

function buildMigrationComponentList(components) {
  return components
    .map(
      (c) => `- [${c.componentDir}](references/components/${c.componentDir}.md)`
    )
    .join('\n');
}

// ---------------------------------------------------------------------------
// Skill builders
// ---------------------------------------------------------------------------

function buildSwcSkill(skillName, tmpRoot) {
  const skillDir = join(tmpRoot, skillName);
  const refsDir = join(skillDir, 'references');
  mkdirSync(join(refsDir, 'guides'), { recursive: true });
  mkdirSync(join(refsDir, 'components'), { recursive: true });

  const components = listGen1Components();

  // Resolve tokens in the handcrafted SKILL.md
  const sourceMd = readFileSync(
    join(SKILL_SOURCE_DIR, 'swc-skill', 'SKILL.md'),
    'utf8'
  );
  const skillMd = resolveTokens(sourceMd, {
    GUIDE_LIST: buildGuideList(GEN1_GUIDES),
    COMPONENT_NAMES: components.map((c) => `\`${c.tagName}\``).join(', '),
    COMPONENT_LIST: buildComponentList(components),
  });
  writeFileSync(join(skillDir, 'SKILL.md'), skillMd);

  // Copy guide references
  let guideCount = 0;
  for (const guide of GEN1_GUIDES) {
    const src = join(ROOT, guide.sourcePath);
    if (!existsSync(src)) {
      console.warn(`  ⚠ guide not found: ${guide.sourcePath}`);
      continue;
    }
    const raw = readFileSync(src, 'utf8');
    writeFileSync(
      join(refsDir, guide.refPath),
      stripContent(raw, guide.stripFn)
    );
    guideCount++;
  }

  // Copy component references
  let componentCount = 0;
  for (const comp of components) {
    const content = readGen1Reference(comp.tagName, comp.packageDir);
    if (content) {
      writeFileSync(join(refsDir, 'components', `${comp.tagName}.md`), content);
      componentCount++;
    }
  }

  console.log(
    `  ${skillName}: ${guideCount} guides + ${componentCount} component references`
  );
  return skillDir;
}

function buildMigrationSkill(skillName, tmpRoot) {
  const skillDir = join(tmpRoot, skillName);
  const refsDir = join(skillDir, 'references');
  mkdirSync(join(refsDir, 'guides'), { recursive: true });
  mkdirSync(join(refsDir, 'components'), { recursive: true });

  const components = listMigrationComponents();

  // Resolve tokens in the handcrafted SKILL.md
  const sourceMd = readFileSync(
    join(SKILL_SOURCE_DIR, 'gen2-migration', 'SKILL.md'),
    'utf8'
  );
  const skillMd = resolveTokens(sourceMd, {
    MIGRATION_GUIDE_LIST: buildGuideList(GEN2_MIGRATION_GUIDES),
    MIGRATION_COMPONENT_NAMES: components
      .map((c) => `\`${c.componentDir}\``)
      .join(', '),
    MIGRATION_COMPONENT_LIST: buildMigrationComponentList(components),
  });
  writeFileSync(join(skillDir, 'SKILL.md'), skillMd);

  // Copy guide references
  let guideCount = 0;
  for (const guide of GEN2_MIGRATION_GUIDES) {
    const src = join(ROOT, guide.sourcePath);
    if (!existsSync(src)) {
      console.warn(`  ⚠ guide not found: ${guide.sourcePath}`);
      continue;
    }
    const raw = readFileSync(src, 'utf8');
    writeFileSync(
      join(refsDir, guide.refPath),
      stripContent(raw, guide.stripFn)
    );
    guideCount++;
  }

  // Copy per-component migration guides (MDX → MD)
  for (const comp of components) {
    const raw = readFileSync(comp.guidePath, 'utf8');
    writeFileSync(
      join(refsDir, 'components', `${comp.componentDir}.md`),
      stripMdx(raw)
    );
  }

  console.log(
    `  ${skillName}: ${guideCount} guides + ${components.length} migration guides`
  );
  return skillDir;
}

// ---------------------------------------------------------------------------
// Skill dispatch
// ---------------------------------------------------------------------------

const SKILL_CONFIGS = [
  {
    name: 'spectrum-web-components',
    description:
      "Build UIs with Spectrum Web Components (SWC), Adobe's Spectrum 1 web component library. " +
      'Use when developers are working with @spectrum-web-components/* packages or sp-* custom elements. ' +
      'Includes component API references, usage examples, accessibility guidance, and integration guides.',
    buildFn: buildSwcSkill,
  },
  {
    name: 'migrate-swc-gen1-to-gen2',
    description:
      'Upgrade Spectrum 1 (sp-* elements, @spectrum-web-components/*) to Spectrum 2 ' +
      '(swc-* elements, @adobe/spectrum-wc). Use when developers need to migrate from ' +
      'Spectrum 1 to Spectrum 2 web components.',
    kind: 'migration',
    buildFn: buildMigrationSkill,
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Generating Agent Skills for Spectrum Web Components…\n');

  const wellKnownDir = join(OUTPUT_DIR, '.well-known', 'agent-skills');

  if (existsSync(wellKnownDir)) {
    rmSync(wellKnownDir, { recursive: true });
  }
  mkdirSync(wellKnownDir, { recursive: true });

  const tmpRoot = join(tmpdir(), `swc-skills-${Date.now()}`);
  mkdirSync(tmpRoot, { recursive: true });

  try {
    const indexEntries = [];

    for (const config of SKILL_CONFIGS) {
      console.log(`Building skill: ${config.name}`);

      const skillDir = config.buildFn(config.name, tmpRoot);

      const archiveFile = `${config.name}.tar.gz`;
      const archivePath = join(wellKnownDir, archiveFile);
      createArchive(skillDir, archivePath);

      const digest = sha256(archivePath);

      indexEntries.push({
        name: config.name,
        description: config.description,
        type: 'archive',
        url: `${SITE_URL}/.well-known/agent-skills/${archiveFile}`,
        digest,
        ...(config.kind ? { kind: config.kind } : {}),
      });

      console.log(`  → ${archiveFile} (${digest.slice(0, 19)}…)\n`);
    }

    const indexPath = join(wellKnownDir, 'index.json');
    writeFileSync(
      indexPath,
      JSON.stringify(
        { $schema: SCHEMA_VERSION, skills: indexEntries },
        null,
        2
      ) + '\n'
    );
    console.log(`index.json → ${indexPath}`);
    console.log(
      `\nDiscovery endpoint:\n  ${SITE_URL}/.well-known/agent-skills/index.json`
    );

    if (!process.env.SKILLS_BASE_URL) {
      console.log(
        '(Set SKILLS_BASE_URL or update the fallback in this script once the canonical domain is confirmed.)'
      );
    }
  } finally {
    rmSync(tmpRoot, { recursive: true, force: true });
  }
}

main();
