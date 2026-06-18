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
 * Produces two skills:
 *   1. spectrum-web-components  — Spectrum 1 component docs (sp-* elements)
 *   2. migrate-swc-gen1-to-gen2 — per-component migration guides (sp-* → swc-*)
 *
 * Output: .well-known/agent-skills/ inside the 2nd-gen Storybook public dir,
 * which is served as static files at the docs website root.
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
const FIRST_GEN_REF_DIR = join(
  ROOT,
  '1st-gen/projects/documentation/content/reference'
);
const SECOND_GEN_COMPONENTS = join(ROOT, '2nd-gen/packages/swc/components');

/**
 * Storybook's staticDirs root — files here are served verbatim from the
 * website root (i.e. public/foo.json → https://…/foo.json).
 *
 * SKILLS_BASE_URL can be overridden at build time to inject the correct
 * origin for each deployment (PR preview vs. production):
 *
 *   SKILLS_BASE_URL=https://example.com node scripts/generate-agent-skills.mjs
 *
 * Update the fallback value once a canonical domain is confirmed.
 */
const OUTPUT_DIR = join(ROOT, '2nd-gen/packages/swc/public');
const SITE_URL =
  process.env.SKILLS_BASE_URL ??
  'https://opensource.adobe.com/spectrum-web-components/second-gen';
const SCHEMA_VERSION =
  'https://schemas.agentskills.io/discovery/0.2.0/schema.json';

// ---------------------------------------------------------------------------
// Skill definitions
// ---------------------------------------------------------------------------

const SKILLS = [
  {
    name: 'spectrum-web-components',
    description:
      "Build UIs with Spectrum Web Components (SWC), Adobe's Spectrum 1 web component library. " +
      'Use when developers are working with @spectrum-web-components/* packages or sp-* custom elements. ' +
      'Includes component API references, usage examples, and accessibility guidance.',
    license: 'Apache-2.0',
    metadata: {
      author: 'Adobe',
      website: 'https://opensource.adobe.com/spectrum-web-components/',
    },
  },
  {
    name: 'migrate-swc-gen1-to-gen2',
    description:
      'Upgrade Spectrum 1 (sp-* elements, @spectrum-web-components/*) to Spectrum 2 ' +
      '(swc-* elements, @adobe/spectrum-wc). Use when developers need to migrate from ' +
      'Spectrum 1 to Spectrum 2 web components.',
    kind: 'migration',
    license: 'Apache-2.0',
    metadata: {
      author: 'Adobe',
      website: 'https://opensource.adobe.com/spectrum-web-components/',
    },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function sha256(filePath) {
  const hash = createHash('sha256');
  hash.update(readFileSync(filePath));
  return 'sha256:' + hash.digest('hex');
}

/**
 * Strip MDX-specific syntax leaving plain Markdown.
 *
 * Handles:
 *   - import statements
 *   - <Meta .../> single-line tags
 *   - JSX block comments (single- and multi-line)
 *   - Multi-line JSX elements with JS props (e.g. <div style={{...}}>…</div>)
 */
function stripMdx(content) {
  return (
    content
      // Remove import statements
      .replace(/^import\s+.*?from\s+['"][^'"]+['"]\s*;?\s*\n/gm, '')
      // Remove <Meta .../> (single-line self-closing)
      .replace(/^<Meta\s[^>]*\/>\s*\n/gm, '')
      // Remove JSX block comments {/* ... */} (possibly multi-line)
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
      // Remove JSX elements whose opening tag contains a JS expression ({}),
      // i.e. elements injected for callouts/alerts — matched greedily up to </Tag>
      .replace(
        /<[A-Z][A-Za-z]*\s[^>]*\{[^>]*\}>[\s\S]*?<\/[A-Z][A-Za-z]*>\s*\n?/g,
        ''
      )
      .replace(/<[a-z]+\s[^>]*\{[^>]*\}>[\s\S]*?<\/[a-z]+>\s*\n?/g, '')
      // Collapse runs of 3+ blank lines introduced by removals
      .replace(/\n{3,}/g, '\n\n')
      // Drop leading blank lines
      .replace(/^\n+/, '')
      .trimEnd() + '\n'
  );
}

/**
 * Extract the Overview section description from a 1st-gen README.
 */
function readmeDescription(packageName) {
  const readmePath = join(FIRST_GEN_PACKAGES, packageName, 'README.md');
  if (!existsSync(readmePath)) {
    return '';
  }
  const content = readFileSync(readmePath, 'utf8');
  const match = content.match(/## Overview\s*\n\s*\n([^#]+)/);
  if (!match) {
    return '';
  }
  return match[1]
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/<\/[^>]+>/g, '')
    .replace(/<([a-z][a-z0-9-]*)(?:\s[^>]*)?\s*\/?>/gi, '$1 ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(.*?[.!?])(?:\s|$).*/s, '$1')
    .trim();
}

/**
 * Create a tar.gz archive from a directory.
 * Returns the path to the created archive.
 */
function createArchive(sourceDir, outputPath) {
  const dirName = basename(sourceDir);
  const parentDir = join(sourceDir, '..');
  execSync(`tar -czf "${outputPath}" -C "${parentDir}" "${dirName}"`, {
    stdio: 'pipe',
  });
  return outputPath;
}

// ---------------------------------------------------------------------------
// Reference file generation
// ---------------------------------------------------------------------------

/**
 * Read and normalise the per-component reference markdown for a 1st-gen component.
 * Falls back to generating from the README if the pre-generated file is absent.
 */
function readGen1Reference(tagName, packageDir) {
  const pregenPath = join(FIRST_GEN_REF_DIR, `${tagName}.md`);
  if (existsSync(pregenPath)) {
    return readFileSync(pregenPath, 'utf8');
  }

  // Fallback: build a minimal reference from the README
  const readmePath = join(FIRST_GEN_PACKAGES, packageDir, 'README.md');
  if (!existsSync(readmePath)) {
    return null;
  }

  const readme = readFileSync(readmePath, 'utf8');
  const lines = [
    `# ${tagName}`,
    '',
    `**Package**: \`@spectrum-web-components/${packageDir}\``,
    '',
    `\`\`\`js`,
    `import '@spectrum-web-components/${packageDir}/${tagName}.js';`,
    `\`\`\``,
    '',
    '---',
    '',
    readme.trim(),
  ];
  return lines.join('\n') + '\n';
}

/**
 * List all 1st-gen packages that have a README.
 * Returns array of { packageDir, tagName } objects.
 * tagName is inferred from the package.json `name` field if available,
 * otherwise falls back to the `sp-${packageDir}` convention.
 */
function listGen1Components() {
  const components = [];
  for (const dir of readdirSync(FIRST_GEN_PACKAGES)) {
    const pkgJsonPath = join(FIRST_GEN_PACKAGES, dir, 'package.json');
    const readmePath = join(FIRST_GEN_PACKAGES, dir, 'README.md');
    if (!existsSync(readmePath)) {
      continue;
    }

    let tagName = `sp-${dir}`;
    if (existsSync(pkgJsonPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'));
        // package.json name is @spectrum-web-components/[dir], tag is sp-[dir]
        if (pkg.name) {
          const inferred = pkg.name.replace('@spectrum-web-components/', 'sp-');
          if (inferred.startsWith('sp-')) {
            tagName = inferred;
          }
        }
      } catch {
        // ignore parse errors
      }
    }

    components.push({ packageDir: dir, tagName });
  }
  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

/**
 * List all 2nd-gen components that have a migration guide.
 * Returns array of { componentDir, name } objects.
 */
function listMigrationComponents() {
  const components = [];
  for (const dir of readdirSync(SECOND_GEN_COMPONENTS)) {
    const guidePath = join(SECOND_GEN_COMPONENTS, dir, 'migration-guide.mdx');
    if (existsSync(guidePath)) {
      components.push({ componentDir: dir, guidePath });
    }
  }
  return components.sort((a, b) =>
    a.componentDir.localeCompare(b.componentDir)
  );
}

// ---------------------------------------------------------------------------
// SKILL.md generators
// ---------------------------------------------------------------------------

function frontmatter(skill) {
  const lines = [
    '---',
    `name: "${skill.name}"`,
    `description: "${skill.description}"`,
    `license: "${skill.license}"`,
    'metadata:',
    `  author: "${skill.metadata.author}"`,
    `  website: "${skill.metadata.website}"`,
    '---',
    '',
  ];
  return lines.join('\n');
}

function generateSwcSkillMd(skill, components) {
  const componentNames = components.map((c) => `\`${c.tagName}\``).join(', ');
  const componentList = components
    .map(
      (c) =>
        `- [${c.tagName}](references/components/${c.tagName}.md)` +
        (readmeDescription(c.packageDir)
          ? `: ${readmeDescription(c.packageDir)}`
          : '')
    )
    .join('\n');

  return (
    frontmatter(skill) +
    `# Spectrum Web Components (Spectrum 1)

Spectrum Web Components (SWC) is Adobe's Spectrum 1 design system implemented as
framework-agnostic web components. Each component is a standalone npm package
under the \`@spectrum-web-components\` scope. Elements are prefixed with \`sp-\`.

## Installation

Install individual component packages:

\`\`\`bash
yarn add @spectrum-web-components/button
yarn add @spectrum-web-components/badge
# …one package per component
\`\`\`

## Usage

Import the side-effectful registration, then use the custom element:

\`\`\`html
<script type="module">
  import '@spectrum-web-components/button/sp-button.js';
</script>

<sp-button variant="accent">Save</sp-button>
\`\`\`

## Key principles

- All \`sp-*\` elements are built with Lit and follow the Spectrum design language.
- Use \`<sp-theme>\` to provide color, scale, and theme context to descendant components.
- Accessibility is built-in: elements expose proper ARIA roles, labels, and keyboard
  navigation without extra configuration.
- For custom properties and CSS hooks, see each component's API reference.

## Documentation structure

The \`references/\` directory contains one Markdown file per component.
Read the file for a component when you need its API, usage examples, or accessibility notes.

Available components: ${componentNames}.

### Component references

${componentList}

## Migrating to Spectrum 2

If the project needs to upgrade from \`sp-*\` to \`swc-*\` elements,
install the \`migrate-swc-gen1-to-gen2\` skill:

\`\`\`bash
npx skills add spectrum-web-components.adobe.com --skill migrate-swc-gen1-to-gen2
\`\`\`
`.trimEnd() +
    '\n'
  );
}

function generateMigrationSkillMd(skill, components) {
  const migratedList = components
    .map(
      (c) => `- [${c.componentDir}](references/components/${c.componentDir}.md)`
    )
    .join('\n');

  return (
    frontmatter(skill) +
    `# Spectrum 1 to Spectrum 2 migration

Upgrade \`sp-*\` Spectrum 1 components to \`swc-*\` Spectrum 2 components.
Follow these steps for each component being migrated.

## Scope

This skill covers the Spectrum 1 (\`@spectrum-web-components/*\`) to
Spectrum 2 (\`@adobe/spectrum-wc\`) migration. Do **not** perform major
framework version upgrades as part of this migration; note them as follow-ups instead.

## Step 1: Install @adobe/spectrum-wc

\`\`\`bash
npm install @adobe/spectrum-wc
yarn add @adobe/spectrum-wc
pnpm add @adobe/spectrum-wc
\`\`\`

## Step 2: Update imports

For each migrated component, replace the per-package import with the monorepo import:

\`\`\`js
// Before (Spectrum 1)
import '@spectrum-web-components/button/sp-button.js';

// After (Spectrum 2)
import '@adobe/spectrum-wc/components/button/swc-button.js';
\`\`\`

## Step 3: Rename elements and attributes

Each component has a per-component migration guide listing renamed attributes,
removed features, and new additions. Read the guide for each component being migrated.

The element tag prefix changes from \`sp-\` to \`swc-\` for all components.

## Step 4: Validate

1. Run TypeScript / type-check: \`tsc --noEmit\`
2. Run tests covering migrated components
3. Run the build and verify output

Fix any failures before declaring the migration complete.

## Step 5: Generate a final report

Summarise:
- Components migrated (before/after element names)
- Attributes renamed or removed
- Any features not yet available in Spectrum 2 that need follow-up

## Available migration guides

The \`references/components/\` directory contains per-component migration guides.
Read the guide for a specific component to see the exact changes required.

${migratedList}

## Components without a guide yet

If a component you are migrating does not have a guide, check the
[Spectrum Web Components documentation](https://opensource.adobe.com/spectrum-web-components/)
for the latest migration notes, or refer to the component's CHANGELOG.
`.trimEnd() +
    '\n'
  );
}

// ---------------------------------------------------------------------------
// Skill builders
// ---------------------------------------------------------------------------

function buildSwcSkill(skill, tmpRoot) {
  const skillDir = join(tmpRoot, skill.name);
  const refsDir = join(skillDir, 'references', 'components');
  mkdirSync(refsDir, { recursive: true });

  const components = listGen1Components();

  // Write SKILL.md
  writeFileSync(
    join(skillDir, 'SKILL.md'),
    generateSwcSkillMd(skill, components)
  );

  // Copy / generate component references
  let copied = 0;
  for (const comp of components) {
    const content = readGen1Reference(comp.tagName, comp.packageDir);
    if (content) {
      writeFileSync(join(refsDir, `${comp.tagName}.md`), content);
      copied++;
    }
  }

  console.log(`  ${skill.name}: SKILL.md + ${copied} component references`);
  return skillDir;
}

function buildMigrationSkill(skill, tmpRoot) {
  const skillDir = join(tmpRoot, skill.name);
  const refsDir = join(skillDir, 'references', 'components');
  mkdirSync(refsDir, { recursive: true });

  const components = listMigrationComponents();

  // Write SKILL.md
  writeFileSync(
    join(skillDir, 'SKILL.md'),
    generateMigrationSkillMd(skill, components)
  );

  // Convert each migration-guide.mdx to plain Markdown
  for (const comp of components) {
    const raw = readFileSync(comp.guidePath, 'utf8');
    const md = stripMdx(raw);
    writeFileSync(join(refsDir, `${comp.componentDir}.md`), md);
  }

  console.log(
    `  ${skill.name}: SKILL.md + ${components.length} migration guides`
  );
  return skillDir;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('Generating Agent Skills for Spectrum Web Components…\n');

  const wellKnownDir = join(OUTPUT_DIR, '.well-known', 'agent-skills');

  // Clean previous output
  if (existsSync(wellKnownDir)) {
    rmSync(wellKnownDir, { recursive: true });
  }
  mkdirSync(wellKnownDir, { recursive: true });

  // Use a temp directory to build skill trees before archiving
  const tmpRoot = join(tmpdir(), `swc-skills-${Date.now()}`);
  mkdirSync(tmpRoot, { recursive: true });

  try {
    const indexEntries = [];

    for (const skill of SKILLS) {
      console.log(`Building skill: ${skill.name}`);

      const skillDir =
        skill.kind === 'migration'
          ? buildMigrationSkill(skill, tmpRoot)
          : buildSwcSkill(skill, tmpRoot);

      // Create tar.gz archive
      const archiveFile = `${skill.name}.tar.gz`;
      const archivePath = join(wellKnownDir, archiveFile);
      createArchive(skillDir, archivePath);

      // Compute SHA-256 digest
      const digest = sha256(archivePath);

      indexEntries.push({
        name: skill.name,
        description: skill.description,
        type: 'archive',
        url: `${SITE_URL}/.well-known/agent-skills/${archiveFile}`,
        digest,
        ...(skill.kind ? { kind: skill.kind } : {}),
      });

      console.log(`  → ${archiveFile} (${digest.slice(0, 19)}…)\n`);
    }

    // Write index.json
    const index = {
      $schema: SCHEMA_VERSION,
      skills: indexEntries,
    };
    const indexPath = join(wellKnownDir, 'index.json');
    writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
    console.log(`index.json → ${indexPath}`);

    console.log('\nAgent Skills generation complete.');
    console.log(
      `\nDiscovery endpoint:\n  ${SITE_URL}/.well-known/agent-skills/index.json`
    );
    if (!process.env.SKILLS_BASE_URL) {
      console.log(
        '(Set SKILLS_BASE_URL env var or update the fallback in this script once the canonical domain is confirmed.)'
      );
    }
  } finally {
    rmSync(tmpRoot, { recursive: true, force: true });
  }
}

main();
