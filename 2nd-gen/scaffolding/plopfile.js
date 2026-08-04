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

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../..');

const CORE_COMPONENTS = '2nd-gen/packages/core/components';
const SWC_COMPONENTS = '2nd-gen/packages/swc/components';

/**
 * 2nd-gen scaffolder.
 *
 * Mirrors the file layout and conventions described by the migration skills
 * (`migration-setup`, `stories-format`, `stories-documentation`, `vrt-authoring`)
 * and the `badge` / `button` reference units. It produces the deterministic
 * skeleton so a human or an agent only has to apply the decisions that actually
 * differ between units (the base-vs-concrete split, the real API, the
 * assertions) rather than author every file by hand.
 *
 * Generators:
 *   component — a custom-element component (core base + swc concrete + docs/tests)
 *   test      — retrofit an existing component with unit + a11y test files
 *   vrt       — retrofit an existing component with a Chromatic VRT story
 *
 * Built-in plop case helpers do most name derivation, plus the custom
 * `titleName` helper for the space-separated sentence-case title:
 *   {{dashCase name}}     -> action-button   (kebab tag, dir, css, file names)
 *   {{pascalCase name}}   -> ActionButton    (class names, CSS BEM block)
 *   {{constantCase name}} -> ACTION_BUTTON   (exported constant prefixes)
 *   {{titleName name}}    -> Action button    (Storybook title, sentence case)
 *
 * @param {import('plop').NodePlopAPI} plop
 */
export default function (plop) {
  // ──────────────────
  //     HELPERS
  // ──────────────────

  // Render a value through plop's handlebars so custom actions can reuse the
  // same name derivations as the templates.
  const render = (tmpl, data) => plop.renderString(tmpl, data);

  // Literal braces for emitting JSX expressions in `.mdx` templates, where a
  // bare `{` next to a `{{helper}}` would otherwise be parsed as handlebars.
  // Usage: `of={{lb}}{{pascalCase name}}Stories{{rb}}` -> `of={NameStories}`.
  plop.setHelper('lb', () => '{');
  plop.setHelper('rb', () => '}');

  // Space-separated sentence-case label for human-facing text (Storybook
  // titles, describe blocks, prose). Spectrum titles are sentence case:
  // capitalize only the first word ("action-button" -> "Action button").
  // Authors re-capitalize any acronyms or proper nouns the scaffold can't know.
  // plop's built-in `titleCase` can't do this (it keeps the dash and caps every
  // word).
  plop.setHelper('titleName', (text) => {
    const words = String(text)
      .replace(/^(sp|swc)-/i, '')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((word) => word.toLowerCase());
    if (words.length === 0) {
      return '';
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ');
  });

  // Shared prompt for the retrofit generators. A component name is entered in
  // any form (`action-button`, `actionButton`, `Action Button`,
  // `sp-action-button`); the case helpers normalize it.
  const namePrompt = (message) => ({
    type: 'input',
    name: 'name',
    message,
    filter: (input) => input.trim().replace(/^(sp|swc)-/i, ''),
    validate: (input) =>
      input.trim().length > 0 || 'A name is required. You can rename it later.',
  });

  // ──────────────────────
  //     CUSTOM ACTIONS
  // ──────────────────────

  // The SWC package (`@adobe/spectrum-wc`) uses wildcard `exports`, so a new
  // SWC component needs no package.json edit. The core package
  // (`@spectrum-web-components/core`) uses explicit per-component entries in
  // BOTH `exports` and `typesVersions`, so a new core component must add both.
  // This is the deterministic, easy-to-forget wiring step humans skip; do it
  // automatically.
  plop.setActionType('wire-core-export', (answers) => {
    const name = render('{{dashCase name}}', answers);
    const pkgPath = path.join(repoRoot, '2nd-gen/packages/core/package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const before = JSON.stringify([pkg.exports, pkg.typesVersions]);

    const entry = {
      types: `./dist/components/${name}/index.d.ts`,
      import: `./dist/components/${name}/index.js`,
    };
    pkg.exports[`./components/${name}`] = entry;
    pkg.exports[`./components/${name}/index.js`] = entry;

    // Mirror the export in `typesVersions` so `moduleResolution: node`
    // consumers resolve the component's types from the subpath too. Without
    // this, the `exports` entry alone leaves the component's types unresolved
    // for those consumers.
    const typesEntry = [`dist/components/${name}/index.d.ts`];
    pkg.typesVersions ??= {};
    pkg.typesVersions['*'] ??= {};
    pkg.typesVersions['*'][`components/${name}`] = typesEntry;
    pkg.typesVersions['*'][`components/${name}/index.js`] = typesEntry;

    // Re-sort keys alphabetically. Core has no wildcard component keys, so
    // order does not affect resolution; sorting keeps the diff minimal and the
    // file deterministic.
    const sortKeys = (obj) =>
      Object.fromEntries(
        Object.keys(obj)
          .sort()
          .map((key) => [key, obj[key]])
      );
    pkg.exports = sortKeys(pkg.exports);
    pkg.typesVersions['*'] = sortKeys(pkg.typesVersions['*']);

    if (JSON.stringify([pkg.exports, pkg.typesVersions]) === before) {
      return `core exports already wired for ./components/${name}`;
    }

    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    return `wired core exports + typesVersions for ./components/${name}`;
  });

  // Format only the two generated directories so output lands pre-formatted
  // without paying for a full-repo lint. Resilient: a failure here never
  // aborts the scaffold (the files exist; formatting can be re-run).
  plop.setActionType('format-component', (answers) => {
    const name = render('{{dashCase name}}', answers);
    const targets = [
      `${CORE_COMPONENTS}/${name}`,
      `${SWC_COMPONENTS}/${name}`,
    ].join(' ');
    try {
      execSync(`yarn prettier --write ${targets}`, {
        cwd: repoRoot,
        stdio: 'ignore',
      });
      return `formatted ${name}`;
    } catch {
      return `skipped formatting (run "yarn lint" manually)`;
    }
  });

  // Retrofit generators (`test`, `vrt`) only make sense for a component that
  // already exists. Fail loudly and early — before any file is written — when
  // the target directory is missing, so a typo does not silently scaffold tests
  // for a non-existent component.
  plop.setActionType('assert-component-exists', (answers) => {
    const name = render('{{dashCase name}}', answers);
    const dir = path.join(repoRoot, SWC_COMPONENTS, name);
    if (!fs.existsSync(dir)) {
      throw new Error(
        `Component "${name}" does not exist at ${SWC_COMPONENTS}/${name}. ` +
          `Scaffold it first with: yarn plop component "${name}"`
      );
    }
    return `found component ${name}`;
  });

  // Format the directories a retrofit generator wrote (a `test/` or `test/vrt/`
  // subtree), scoped so the surrounding component files are left untouched.
  // Config: { paths: string[] } — handlebars-templated repo-relative dirs.
  plop.setActionType('format-dir', (answers, config) => {
    const targets = (config.paths ?? [])
      .map((p) => render(p, answers))
      .join(' ');
    try {
      execSync(`yarn prettier --write ${targets}`, {
        cwd: repoRoot,
        stdio: 'ignore',
      });
      return `formatted ${targets}`;
    } catch {
      return `skipped formatting (run "yarn lint" manually)`;
    }
  });

  // ──────────────────
  //     GENERATORS
  // ──────────────────

  plop.setGenerator('component', {
    description:
      'Scaffold a 2nd-gen component (core base + SWC concrete + stories, docs, tests)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g. action-button):',
        // Strip an sp-/swc- prefix if pasted; dashCase in templates
        // normalizes the rest, so "Action Button" and "actionButton"
        // both resolve correctly.
        filter: (input) => input.trim().replace(/^(sp|swc)-/i, ''),
        validate: (input) =>
          input.trim().length > 0 ||
          'A component needs a name. You can rename it later.',
      },
    ],
    actions: () => {
      const coreDir = `${CORE_COMPONENTS}/{{dashCase name}}`;
      const swcDir = `${SWC_COMPONENTS}/{{dashCase name}}`;
      const t = (file) => path.join(here, 'templates/component', file);

      return [
        // ── core layer ───────────────────────────────────────────
        {
          type: 'add',
          path: `${coreDir}/{{pascalCase name}}.types.ts`,
          templateFile: t('core/types.ts.hbs'),
        },
        {
          type: 'add',
          path: `${coreDir}/{{pascalCase name}}.base.ts`,
          templateFile: t('core/base.ts.hbs'),
        },
        {
          type: 'add',
          path: `${coreDir}/index.ts`,
          templateFile: t('core/index.ts.hbs'),
        },
        // ── SWC layer ────────────────────────────────────────────
        {
          type: 'add',
          path: `${swcDir}/{{pascalCase name}}.ts`,
          templateFile: t('swc/component.ts.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/index.ts`,
          templateFile: t('swc/index.ts.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/swc-{{dashCase name}}.ts`,
          templateFile: t('swc/registration.ts.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/{{dashCase name}}.css`,
          templateFile: t('swc/component.css.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/{{dashCase name}}.mdx`,
          templateFile: t('swc/component.mdx.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/stories/{{dashCase name}}.stories.ts`,
          templateFile: t('swc/stories.ts.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/test/{{dashCase name}}.test.ts`,
          templateFile: t('swc/test.ts.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/test/{{dashCase name}}.a11y.spec.ts`,
          templateFile: t('swc/a11y.spec.ts.hbs'),
        },
        {
          type: 'add',
          path: `${swcDir}/test/vrt/{{dashCase name}}.vrt.ts`,
          templateFile: path.join(here, 'templates/vrt/vrt.ts.hbs'),
        },
        // ── wiring + formatting ──────────────────────────────────
        { type: 'wire-core-export' },
        { type: 'format-component' },
      ];
    },
  });

  plop.setGenerator('test', {
    description: 'Retrofit an existing component with unit + a11y test files',
    prompts: [namePrompt('Component to add tests for (e.g. action-button):')],
    actions: () => {
      const swcDir = `${SWC_COMPONENTS}/{{dashCase name}}`;

      return [
        { type: 'assert-component-exists' },
        {
          type: 'add',
          path: `${swcDir}/test/{{dashCase name}}.test.ts`,
          templateFile: path.join(here, 'templates/test/test.ts.hbs'),
          skipIfExists: true,
        },
        {
          type: 'add',
          path: `${swcDir}/test/{{dashCase name}}.a11y.spec.ts`,
          templateFile: path.join(here, 'templates/test/a11y.spec.ts.hbs'),
          skipIfExists: true,
        },
        { type: 'format-dir', paths: [`${swcDir}/test`] },
      ];
    },
  });

  plop.setGenerator('vrt', {
    description: 'Retrofit an existing component with a Chromatic VRT story',
    prompts: [
      namePrompt('Component to add a VRT story for (e.g. action-button):'),
    ],
    actions: () => {
      const swcDir = `${SWC_COMPONENTS}/{{dashCase name}}`;

      return [
        { type: 'assert-component-exists' },
        {
          type: 'add',
          path: `${swcDir}/test/vrt/{{dashCase name}}.vrt.ts`,
          templateFile: path.join(here, 'templates/vrt/vrt.ts.hbs'),
          skipIfExists: true,
        },
        { type: 'format-dir', paths: [`${swcDir}/test/vrt`] },
      ];
    },
  });
}
