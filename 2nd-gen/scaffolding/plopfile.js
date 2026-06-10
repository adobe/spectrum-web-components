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
 * 2nd-gen component scaffolder.
 *
 * Mirrors the file layout and conventions described by the migration skills
 * (`migration-setup`, `stories-format`, `stories-documentation`) and the `badge`
 * reference component. It produces the deterministic Phase 2 skeleton so the
 * migration-setup skill only has to apply plan-specific architecture decisions
 * (the base-vs-concrete split) rather than author every file by hand.
 *
 * Built-in plop case helpers do most name derivation, plus the custom
 * `titleName` helper for the space-separated proper-noun title:
 *   {{dashCase name}}     -> action-button   (kebab tag, dir, css, file names)
 *   {{pascalCase name}}   -> ActionButton    (class names, CSS BEM block)
 *   {{constantCase name}} -> ACTION_BUTTON   (exported constant prefixes)
 *   {{titleName name}}    -> Action Button   (Storybook title, proper noun)
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

  // Space-separated Title Case for human-facing labels (Storybook titles,
  // describe blocks, prose). plop's built-in `titleCase` keeps the dash
  // ("action-button" -> "Action-Button"), but Spectrum treats component names
  // as proper nouns rendered with spaces ("Action Button").
  plop.setHelper('titleName', (text) =>
    String(text)
      .replace(/^(sp|swc)-/i, '')
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // split camelCase
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );

  // ──────────────────────
  //     CUSTOM ACTIONS
  // ──────────────────────

  // The SWC package (`@adobe/spectrum-wc`) uses wildcard `exports`, so a new
  // SWC component needs no package.json edit. The core package
  // (`@spectrum-web-components/core`) uses explicit per-component `exports`
  // entries, so a new core component must add one. This is the deterministic,
  // easy-to-forget wiring step humans skip; do it automatically.
  plop.setActionType('wire-core-export', (answers) => {
    const name = render('{{dashCase name}}', answers);
    const pkgPath = path.join(repoRoot, '2nd-gen/packages/core/package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    const entry = {
      types: `./dist/components/${name}/index.d.ts`,
      import: `./dist/components/${name}/index.js`,
    };

    const before = JSON.stringify(pkg.exports);
    pkg.exports[`./components/${name}`] = entry;
    pkg.exports[`./components/${name}/index.js`] = entry;

    // Re-sort all export keys alphabetically. Core has no wildcard export
    // keys, so order does not affect resolution; sorting keeps the diff
    // minimal and the file deterministic.
    pkg.exports = Object.fromEntries(
      Object.keys(pkg.exports)
        .sort()
        .map((key) => [key, pkg.exports[key]])
    );

    if (JSON.stringify(pkg.exports) === before) {
      return `core exports already wired for ./components/${name}`;
    }

    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    return `wired core exports for ./components/${name}`;
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

  // ──────────────────
  //     GENERATOR
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
        // ── wiring + formatting ──────────────────────────────────
        { type: 'wire-core-export' },
        { type: 'format-component' },
      ];
    },
  });
}
