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
 * Generator for `docs.llm.md`: the LLM-consumable component documentation
 * proposed in https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3854270520.
 *
 * Source of truth is the 1st-gen component README. The transform is fully
 * deterministic (no LLM in the loop): it strips Storybook/docs-site chrome from
 * the README and prepends a small metadata frontmatter block. The same input
 * always produces the same output, so the file can be regenerated and diffed in
 * CI to detect drift from the README.
 *
 * Two outputs per component, written from one generated string so they stay
 * byte-identical:
 *   1. 1st-gen/packages/{name}/docs.llm.md           per-component, beside the README
 *   2. 1st-gen/projects/llm-docs/src/{name}.llm.md   aggregate, published as
 *                                                    @spectrum-web-components/llm-docs
 *
 * Component discovery is automatic: any 1st-gen package whose README registers
 * a custom element (a `@spectrum-web-components/{name}/sp-*.js` side-effect
 * import) is treated as a component. Icon-set and tooling packages are skipped.
 *
 * Usage:
 *   node scripts/generate-llm-docs.mjs               # every gen1 component + aggregate package
 *   node scripts/generate-llm-docs.mjs --mvp         # only the original 5 MVP components
 *   node scripts/generate-llm-docs.mjs button menu   # only the named components
 *   node scripts/generate-llm-docs.mjs --check       # verify on-disk files are current (no writes)
 */

// Node filesystem primitives: existence checks, directory creation, directory
// listing, file reads, file deletion, and file writes.
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
// Path helpers: parent directory, segment joining, and absolute resolution.
import { dirname, join, resolve } from 'node:path';
// Converts this module's import.meta.url into a filesystem path (no __dirname in ESM).
import { fileURLToPath } from 'node:url';

// Absolute directory of this script (the ESM stand-in for CommonJS __dirname).
const __dirname = dirname(fileURLToPath(import.meta.url));
// Repository root, one level up from the scripts/ directory.
const REPO_ROOT = resolve(__dirname, '..');
// Directory holding every 1st-gen package (one subdirectory per component).
const PACKAGES_DIR = join(REPO_ROOT, '1st-gen', 'packages');
// Root of the aggregate publishable package (@spectrum-web-components/llm-docs).
const AGGREGATE_PKG_DIR = join(REPO_ROOT, '1st-gen', 'projects', 'llm-docs');
// The `.llm.md` files live under src/ so package.json and README.md stay
// visible at the package root instead of being buried among the docs files.
const AGGREGATE_SRC_DIR = join(AGGREGATE_PKG_DIR, 'src');

// The original MVP slice. Kept for `--mvp`. These five stress different
// generator edge cases: simple (button), near-duplicate (action-button),
// slotted (menu), composition-heavy (picker), overlay + a11y-heavy (dialog).
const MVP_COMPONENTS = ['button', 'picker', 'menu', 'action-button', 'dialog'];

// Filename written beside each component README.
const PER_COMPONENT_FILENAME = 'docs.llm.md';
// Suffix for the aggregate copies, e.g. `button.llm.md`.
const AGGREGATE_SUFFIX = '.llm.md';
// Generated index filename at the aggregate package root.
const AGGREGATE_README = 'README.md';

/**
 * A package is a component when its README registers a custom element via a
 * `@spectrum-web-components/{name}/sp-*.js` side-effect import. This filters out
 * icon-set packages (icons-ui, icons-workflow, iconset) and any tooling.
 */
function componentImportPattern(name) {
  // Build a case-insensitive matcher for this package's registration import,
  // capturing the registered tag (the `sp-...` segment) in group 1.
  return new RegExp(
    `@spectrum-web-components/${name}/(sp-[a-z0-9-]+)\\.js`,
    'i'
  );
}

// Returns true when the named package directory looks like a real component.
function isComponentPackage(name) {
  // Path to this package's README, the single source of truth for the docs.
  const readmePath = join(PACKAGES_DIR, name, 'README.md');
  // No README means nothing to generate from, so it is not a component.
  if (!existsSync(readmePath)) {
    return false;
  }
  // A README that registers an sp-* element via import qualifies as a component.
  return componentImportPattern(name).test(readFileSync(readmePath, 'utf8'));
}

/** Discover every gen1 component package, sorted for stable output. */
function discoverComponents() {
  // List the packages directory with file-type info so directories can be told
  // apart from stray files.
  return (
    readdirSync(PACKAGES_DIR, { withFileTypes: true })
      // Keep only directories (each candidate component is its own folder).
      .filter((entry) => entry.isDirectory())
      // Reduce each entry to its plain directory name.
      .map((entry) => entry.name)
      // Keep only directories that pass the component test above.
      .filter(isComponentPackage)
      // Sort alphabetically so generated output order is deterministic.
      .sort()
  );
}

/**
 * Deterministic chrome-stripping rules applied to the raw README body.
 * Each rule is intentionally line- or fence-scoped so the transform stays
 * predictable and easy to diff.
 *
 * Chrome rules only run OUTSIDE fenced code blocks. The `<sp-tabs>` /
 * `<sp-tab>` / `<sp-tab-panel>` elements are Storybook layout chrome when they
 * organize a README's examples, but they are literal example content for the
 * Tabs component itself. Inside a code fence the content is left untouched.
 */
function stripChrome(readme) {
  // Split the README into individual lines for line-by-line processing.
  const inputLines = readme.split('\n');
  // Accumulator for the lines that survive stripping.
  const outputLines = [];
  // Tracks whether the cursor is currently inside a fenced code block.
  let inFence = false;

  // Walk every source line in order.
  for (const rawLine of inputLines) {
    // Strip trailing whitespace so comparisons and output are clean.
    const line = rawLine.replace(/\s+$/, '');
    // Leading-and-trailing-trimmed copy used only for pattern tests.
    const trimmed = line.trim();

    // Fence boundaries toggle the literal-content mode.
    if (/^```/.test(trimmed)) {
      // A fence marker while outside a fence means this opens a block.
      if (!inFence) {
        // Opening fence: normalize live-demo fences (```html demo,
        // ```html demo ignore, ...) down to a plain language fence (```html).
        const fenceMatch = line.match(/^(\s*```[a-z0-9]+)\s+demo\b.*$/i);
        // Emit the normalized fence if it matched, otherwise the line as-is.
        outputLines.push(fenceMatch ? fenceMatch[1] : line);
        // We are now inside a code block.
        inFence = true;
      } else {
        // A fence marker while inside a fence closes the block; keep it verbatim.
        outputLines.push(line);
        // We are now back outside any code block.
        inFence = false;
      }
      // Fence markers are fully handled; move to the next line.
      continue;
    }

    // Inside a fence: literal example code, never stripped.
    if (inFence) {
      outputLines.push(line);
      continue;
    }

    // Rule 1: drop NPM / Bundlephobia / Stackblitz shield badge lines.
    if (/^\[!\[.*\]\(.*\)\]\(.*\)$/.test(trimmed)) {
      continue;
    }

    // Rule 2: drop Storybook tab chrome wrappers; keep their inner content.
    // First clause handles <sp-tabs>/<sp-tab> open and close tags.
    if (/^<\/?sp-tabs?(\s|>|$)/.test(trimmed)) {
      continue;
    }
    // Second clause handles <sp-tab-panel> open and close tags.
    if (/^<\/?sp-tab-panel(\s|>|$)/.test(trimmed)) {
      continue;
    }

    // Anything else outside a fence is real documentation prose; keep it.
    outputLines.push(line);
  }

  // Reassemble the kept lines, then do two whole-document cleanups.
  return (
    outputLines
      .join('\n')
      // Drop fenced blocks left empty after chrome stripping.
      .replace(/```[a-z0-9]*\n(?:[ \t]*\n)*```/gi, '')
      // Collapse 3+ blank lines into a single blank line and trim ends.
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

/**
 * Derive the registered custom-element tag from the side-effect import line in
 * the README (e.g. `@spectrum-web-components/button/sp-button.js` -> sp-button).
 * Falls back to `sp-{name}` when the import line is absent.
 */
function deriveTag(name, readme) {
  // Search the README for the registration import and capture the tag.
  const importMatch = readme.match(componentImportPattern(name));
  // Use the captured tag if found; otherwise assume the conventional sp-{name}.
  return importMatch ? importMatch[1] : `sp-${name}`;
}

// Builds the YAML frontmatter block prepended to every generated file.
function buildFrontmatter(name, tag) {
  // No timestamp: generation is deterministic so the same README always yields
  // byte-identical output, which keeps regenerations out of the git diff and
  // makes the `--check` drift gate a simple equality test.
  return [
    '---', // YAML frontmatter opening fence.
    `component: ${name}`, // The component's package/directory name.
    `tag: ${tag}`, // The registered custom-element tag.
    `package: '@spectrum-web-components/${name}'`, // The npm package to import from.
    `source: 1st-gen/packages/${name}/README.md`, // Where this content came from.
    'generator: scripts/generate-llm-docs.mjs', // What produced this file.
    '---', // YAML frontmatter closing fence.
  ].join('\n'); // Join the lines into one string.
}

// Produces the full generated file content (frontmatter + stripped body) for one component.
function generate(name) {
  // Resolve this component's README path.
  const readmePath = join(PACKAGES_DIR, name, 'README.md');
  // Fail loudly if a requested component has no README to read.
  if (!existsSync(readmePath)) {
    throw new Error(`README not found for "${name}" at ${readmePath}`);
  }
  // Read the raw README text.
  const readme = readFileSync(readmePath, 'utf8');
  // Determine the custom-element tag for the frontmatter.
  const tag = deriveTag(name, readme);
  // Strip Storybook/docs chrome from the README body.
  const body = stripChrome(readme);
  // Concatenate frontmatter and body with a blank line between and a trailing newline.
  return `${buildFrontmatter(name, tag)}\n\n${body}\n`;
}

/** README index for the aggregate package, listing every bundled component. */
function buildAggregateReadme(names) {
  // Build one Markdown bullet per component, linking into src/ and naming its package.
  const list = names
    .map(
      (name) =>
        `- [\`${name}.llm.md\`](./src/${name}.llm.md) (\`@spectrum-web-components/${name}\`)`
    )
    .join('\n'); // One bullet per line.
  // Return the complete README, interpolating the count and the bullet list.
  return `<!-- Generated by scripts/generate-llm-docs.mjs. Do not edit by hand. -->

# @spectrum-web-components/llm-docs

LLM-consumable documentation for Spectrum Web Components, one \`{component}.llm.md\`
file per component. Each file is derived deterministically from the component's
README and is byte-identical to the \`docs.llm.md\` that lives beside that README.

This package is optional. Install it when an AI assistant or build-time tool
needs the component docs as plain markdown:

\`\`\`bash
yarn add @spectrum-web-components/llm-docs
\`\`\`

## Bundled components (${names.length})

${list}
`;
}

// Reads a file if it exists, returning '' otherwise (used for drift comparisons).
function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

// Entry point: parses flags, then either checks for drift or writes files.
function main() {
  // Command-line arguments after `node script.mjs`.
  const args = process.argv.slice(2);
  // `--check` runs in read-only drift-detection mode.
  const checkOnly = args.includes('--check');
  // `--mvp` restricts the run to the original five MVP components.
  const mvpOnly = args.includes('--mvp');
  // Any non-flag arguments are treated as explicit component names.
  const requested = args.filter((arg) => !arg.startsWith('--'));

  // The set of components this run will operate on.
  let components;
  // Explicit names win over everything else.
  if (requested.length > 0) {
    components = requested;
    // Otherwise honor the MVP shortcut.
  } else if (mvpOnly) {
    components = MVP_COMPONENTS;
    // Default: discover every component automatically.
  } else {
    components = discoverComponents();
  }

  // Pre-build the aggregate README so both check and write modes can use it.
  const aggregateReadme = buildAggregateReadme(components);

  // ---- Drift-detection mode (no writes) ----
  if (checkOnly) {
    // Count of files that differ from freshly generated output.
    let drifted = 0;
    // Compare every component's two on-disk copies against expected output.
    for (const name of components) {
      // The content the generator would produce right now.
      const expected = generate(name);
      // The per-component file currently on disk (or '' if missing).
      const perComponent = readIfExists(
        join(PACKAGES_DIR, name, PER_COMPONENT_FILENAME)
      );
      // The aggregate copy currently on disk (or '' if missing).
      const aggregate = readIfExists(
        join(AGGREGATE_SRC_DIR, `${name}${AGGREGATE_SUFFIX}`)
      );
      // Flag the per-component file if it is stale.
      if (perComponent !== expected) {
        drifted += 1;
        console.error(
          `[generate-llm-docs] DRIFT: packages/${name}/${PER_COMPONENT_FILENAME}`
        );
      }
      // Flag the aggregate copy if it is stale.
      if (aggregate !== expected) {
        drifted += 1;
        console.error(
          `[generate-llm-docs] DRIFT: projects/llm-docs/src/${name}${AGGREGATE_SUFFIX}`
        );
      }
    }
    // Also verify the generated aggregate README is current.
    if (
      readIfExists(join(AGGREGATE_PKG_DIR, AGGREGATE_README)) !==
      aggregateReadme
    ) {
      drifted += 1;
      console.error(
        `[generate-llm-docs] DRIFT: projects/llm-docs/${AGGREGATE_README}`
      );
    }
    // Any drift fails the run so CI rejects stale files.
    if (drifted > 0) {
      console.error(
        `[generate-llm-docs] ${drifted} file(s) out of date; run "yarn generate:llm-docs"`
      );
      process.exit(1);
    }
    // Everything matched: report success and stop (no writes in check mode).
    console.log(
      `[generate-llm-docs] all files up to date for ${components.length} component(s)`
    );
    return;
  }

  // ---- Write mode ----
  // Only wipe stale aggregate files when regenerating the full set;
  // a scoped run (explicit names or --mvp) must not delete the other files.
  const fullRun = requested.length === 0 && !mvpOnly;
  // Ensure the aggregate src/ directory exists before writing into it.
  mkdirSync(AGGREGATE_SRC_DIR, { recursive: true });
  // On a full run, clear out old aggregate docs so deletions propagate.
  if (fullRun) {
    // Inspect every file currently in the aggregate src/ directory.
    for (const file of readdirSync(AGGREGATE_SRC_DIR)) {
      // Remove only the generated `.llm.md` files, leaving anything else alone.
      if (file.endsWith(AGGREGATE_SUFFIX)) {
        rmSync(join(AGGREGATE_SRC_DIR, file));
      }
    }
  }

  // Generate and write both copies for each selected component.
  for (const name of components) {
    // Single generated string, written to both destinations so they match.
    const content = generate(name);
    // Per-component file beside the README.
    writeFileSync(
      join(PACKAGES_DIR, name, PER_COMPONENT_FILENAME),
      content,
      'utf8'
    );
    // Aggregate copy inside the publishable package's src/ directory.
    writeFileSync(
      join(AGGREGATE_SRC_DIR, `${name}${AGGREGATE_SUFFIX}`),
      content,
      'utf8'
    );
  }

  // The aggregate README only makes sense for the complete set, so write it on full runs.
  if (fullRun) {
    writeFileSync(
      join(AGGREGATE_PKG_DIR, AGGREGATE_README),
      aggregateReadme,
      'utf8'
    );
  }

  // Summarize what was written.
  console.log(
    `[generate-llm-docs] wrote ${components.length} component(s) to packages/*/${PER_COMPONENT_FILENAME} and projects/llm-docs/src/`
  );
}

// Run the generator.
main();
