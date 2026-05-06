#!/usr/bin/env node

/**
 * Copyright 2026 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 *
 * collect-guides.mjs
 *
 * Discovers Spectrum Web Components packages in a consumer project's
 * node_modules and copies each component's consumer migration guide into
 * <cwd>/.swc-migration/guides/<component>.md. Writes a manifest.json
 * describing every package found (with or without a guide).
 *
 * No external dependencies. Node >= 18.
 *
 * Usage:
 *   node path/to/collect-guides.mjs            run from consumer project root
 *   node path/to/collect-guides.mjs --help     print usage
 *   node path/to/collect-guides.mjs --cwd=<p>  override consumer root
 *   node path/to/collect-guides.mjs --repo=<p> fall back to a local checkout
 *                                              of spectrum-web-components when
 *                                              guides are missing in node_modules
 *
 * Supported published layouts (checked in order, first match wins):
 *   1. <pkg>/consumer-migration-guide.mdx              (per-component pkg, source layout)
 *   2. <pkg>/dist/consumer-migration-guide.mdx        (per-component pkg, dist)
 *   3. <pkg>/components/<name>/consumer-migration-guide.mdx
 *   4. <pkg>/dist/components/<name>/consumer-migration-guide.mdx
 *   5. <pkg>/docs/consumer-migration-guide.md         (fallback naming)
 *   6. <pkg>/CONSUMER-MIGRATION.md                    (legacy fallback)
 *
 * As of writing, the canonical source-of-truth path inside the
 * spectrum-web-components repo is:
 *   2nd-gen/packages/swc/components/<name>/consumer-migration-guide.mdx
 * Published 2nd-gen package (@adobe/spectrum-wc) only ships dist/, so
 * guides may not be present in node_modules until shipped. Use --repo to
 * point at a local checkout in that case.
 */

import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const HELP = `collect-guides.mjs

Collect Spectrum Web Components consumer migration guides from a consumer
project's node_modules into <cwd>/.swc-migration/.

Options:
  --help            Show this help and exit.
  --cwd=<path>      Consumer project root (default: process.cwd()).
  --repo=<path>     Local checkout of spectrum-web-components to fall back to
                    when a guide is missing in node_modules.
  --quiet           Suppress per-package log lines.

Output:
  <cwd>/.swc-migration/guides/<component>.md          one file per guide found
  <cwd>/.swc-migration/manifest.json                  full inventory

Exit codes:
  0   completed (even with partial coverage)
  1   node_modules has no Spectrum Web Components packages and no --repo set
  2   invalid arguments
`;

const SCOPE_NAMES = ['@spectrum-web-components', '@adobe'];
const SECOND_GEN_PKG = '@adobe/spectrum-wc';

const GUIDE_BASENAMES = [
  'consumer-migration-guide.mdx',
  'consumer-migration-guide.md',
  'CONSUMER-MIGRATION.md',
];

function parseArgs(argv) {
  const out = { cwd: process.cwd(), repo: null, quiet: false, help: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--help' || arg === '-h') {
      out.help = true;
    } else if (arg === '--quiet') {
      out.quiet = true;
    } else if (arg.startsWith('--cwd=')) {
      out.cwd = resolve(arg.slice(6));
    } else if (arg.startsWith('--repo=')) {
      out.repo = resolve(arg.slice(7));
    } else {
      console.error(`Unknown argument: ${arg}`);
      console.error(HELP);
      process.exit(2);
    }
  }
  return out;
}

function safeReaddir(dir) {
  try {
    return readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function readPkgJson(pkgDir) {
  const p = join(pkgDir, 'package.json');
  if (!existsSync(p)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(p, 'utf-8'));
  } catch {
    return null;
  }
}

/** Find every Spectrum Web Components package under node_modules (hoisted + nested). */
function findSwcPackages(rootCwd) {
  const seen = new Map();
  const queue = [join(rootCwd, 'node_modules')];

  while (queue.length) {
    const nm = queue.shift();
    if (!existsSync(nm)) {
      continue;
    }

    for (const entry of safeReaddir(nm)) {
      if (!entry.isDirectory()) {
        continue;
      }

      // Scoped package directory.
      if (entry.name.startsWith('@')) {
        const scopeDir = join(nm, entry.name);
        if (!SCOPE_NAMES.includes(entry.name)) {
          // Still descend into nested node_modules under non-target scopes.
          for (const sub of safeReaddir(scopeDir)) {
            if (sub.isDirectory()) {
              const inner = join(scopeDir, sub.name, 'node_modules');
              if (existsSync(inner)) {
                queue.push(inner);
              }
            }
          }
          continue;
        }
        for (const sub of safeReaddir(scopeDir)) {
          if (!sub.isDirectory()) {
            continue;
          }
          const pkgDir = join(scopeDir, sub.name);
          const pkgJson = readPkgJson(pkgDir);
          if (pkgJson && typeof pkgJson.name === 'string') {
            if (!seen.has(pkgJson.name)) {
              seen.set(pkgJson.name, { dir: pkgDir, pkgJson });
            }
          }
          const inner = join(pkgDir, 'node_modules');
          if (existsSync(inner)) {
            queue.push(inner);
          }
        }
        continue;
      }

      // Unscoped package — descend into nested node_modules.
      const pkgDir = join(nm, entry.name);
      const inner = join(pkgDir, 'node_modules');
      if (existsSync(inner)) {
        queue.push(inner);
      }
    }
  }

  return seen;
}

function deriveComponentName(pkgName) {
  // @spectrum-web-components/badge -> badge
  // @adobe/spectrum-wc -> spectrum-wc (handled separately for sub-components)
  const slash = pkgName.indexOf('/');
  return slash === -1 ? pkgName : pkgName.slice(slash + 1);
}

/** Look for a guide file directly inside a package directory. */
function findGuideInDir(dir) {
  for (const name of GUIDE_BASENAMES) {
    const direct = join(dir, name);
    if (existsSync(direct)) {
      return direct;
    }
  }
  for (const sub of ['docs', 'dist']) {
    for (const name of GUIDE_BASENAMES) {
      const p = join(dir, sub, name);
      if (existsSync(p)) {
        return p;
      }
    }
  }
  return null;
}

/** Enumerate per-component guides inside the 2nd-gen single-package layout. */
function findSecondGenComponentGuides(pkgDir) {
  const out = []; // { component, sourcePath }
  const componentRoots = [
    join(pkgDir, 'components'),
    join(pkgDir, 'dist', 'components'),
    join(pkgDir, 'src', 'components'),
  ];
  for (const root of componentRoots) {
    if (!existsSync(root)) {
      continue;
    }
    for (const entry of safeReaddir(root)) {
      if (!entry.isDirectory()) {
        continue;
      }
      const compDir = join(root, entry.name);
      const guide = findGuideInDir(compDir);
      if (guide) {
        out.push({ component: entry.name, sourcePath: guide });
      }
    }
  }
  return out;
}

/** Local-repo fallback: read guides directly from a spectrum-web-components checkout. */
function findRepoGuides(repoPath) {
  const out = [];
  const componentsDir = join(
    repoPath,
    '2nd-gen',
    'packages',
    'swc',
    'components'
  );
  if (!existsSync(componentsDir)) {
    return out;
  }
  for (const entry of safeReaddir(componentsDir)) {
    if (!entry.isDirectory()) {
      continue;
    }
    const guide = findGuideInDir(join(componentsDir, entry.name));
    if (guide) {
      out.push({ component: entry.name, sourcePath: guide });
    }
  }
  return out;
}

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function copyGuide(srcPath, destDir, component) {
  ensureDir(destDir);
  const destName = `${component}.md`;
  const destPath = join(destDir, destName);
  copyFileSync(srcPath, destPath);
  return destPath;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    process.stdout.write(HELP);
    return;
  }

  const cwd = args.cwd;
  const outDir = join(cwd, '.swc-migration');
  const guidesDir = join(outDir, 'guides');
  ensureDir(guidesDir);

  const log = (msg) => {
    if (!args.quiet) {
      process.stdout.write(msg + '\n');
    }
  };

  const packages = findSwcPackages(cwd);
  const manifest = [];

  if (packages.size === 0 && !args.repo) {
    console.error(
      'No @spectrum-web-components or @adobe/spectrum-wc packages found in node_modules.'
    );
    console.error(
      'Run install first, or pass --repo=<path-to-spectrum-web-components>.'
    );
    process.exit(1);
  }

  // Per-package guides (1st-gen-style: one package per component).
  for (const [name, info] of packages) {
    if (name === SECOND_GEN_PKG) {
      continue;
    } // handled below
    const guide = findGuideInDir(info.dir);
    const component = deriveComponentName(name);
    const entry = {
      packageName: name,
      packageVersion: info.pkgJson.version || null,
      sourcePackagePath: info.dir,
      component,
      sourceGuidePath: guide,
      guidePath: null,
    };
    if (guide) {
      entry.guidePath = copyGuide(guide, guidesDir, component);
      log(`+ ${name}@${entry.packageVersion}  (${component})`);
    } else {
      log(`- ${name}@${entry.packageVersion}  (no guide found)`);
    }
    manifest.push(entry);
  }

  // 2nd-gen single-package layout: components live inside one package.
  const secondGen = packages.get(SECOND_GEN_PKG);
  if (secondGen) {
    const guides = findSecondGenComponentGuides(secondGen.dir);
    for (const g of guides) {
      const dest = copyGuide(g.sourcePath, guidesDir, g.component);
      manifest.push({
        packageName: SECOND_GEN_PKG,
        packageVersion: secondGen.pkgJson.version || null,
        sourcePackagePath: secondGen.dir,
        component: g.component,
        sourceGuidePath: g.sourcePath,
        guidePath: dest,
      });
      log(`+ ${SECOND_GEN_PKG}/${g.component}`);
    }
  }

  // Repo fallback — fills in any guide we couldn't get from node_modules.
  if (args.repo) {
    const have = new Set(
      manifest.filter((m) => m.guidePath).map((m) => m.component)
    );
    const repoGuides = findRepoGuides(args.repo);
    for (const g of repoGuides) {
      if (have.has(g.component)) {
        continue;
      }
      const dest = copyGuide(g.sourcePath, guidesDir, g.component);
      manifest.push({
        packageName: '(repo fallback)',
        packageVersion: null,
        sourcePackagePath: args.repo,
        component: g.component,
        sourceGuidePath: g.sourcePath,
        guidePath: dest,
      });
      log(`+ (repo) ${g.component}`);
    }
  }

  const manifestPath = join(outDir, 'manifest.json');
  writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        cwd,
        repoFallback: args.repo,
        entries: manifest,
      },
      null,
      2
    ) + '\n'
  );

  const withGuide = manifest.filter((m) => m.guidePath).length;
  const without = manifest.length - withGuide;
  log(`\nCollected ${withGuide} guides. ${without} packages had no guide.`);
  log(`Manifest: ${manifestPath}`);
  log(`Guides:   ${guidesDir}`);
}

main();
