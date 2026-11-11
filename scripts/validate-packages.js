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
 * Validates what each public package would ship to npm, as a consumer sees it.
 *
 * Each package is packed once with `npm pack`, then the tarball is checked with:
 * - publint: do `exports`, `main`, `module`, and `types` point at files that are
 *   actually in the tarball, in the right format?
 * - attw (Are the Types Wrong?): do TypeScript consumers resolve working types
 *   for each entry point? Run with the `esm-only` profile, since every package
 *   here is ESM.
 * - Lightning CSS: does every shipped `.css` file parse? Vite minifies CSS with
 *   Lightning CSS, so a file it rejects breaks consumers' production builds.
 *
 * Usage:
 *   node scripts/validate-packages.js --gen=<1st-gen|gen2> [--report-only]
 *
 * Packages must be built first. With --report-only, findings are reported but
 * the script exits 0. Writes a Markdown report to $GITHUB_STEP_SUMMARY when set.
 */

import { execFile, spawn } from 'child_process';
import {
  appendFileSync,
  closeSync,
  mkdtempSync,
  openSync,
  readFileSync,
  rmSync,
} from 'fs';
import { transform } from 'lightningcss';
import { tmpdir } from 'os';
import { join } from 'path';
import { publint } from 'publint';
import { formatMessage } from 'publint/utils';
import { promisify } from 'util';

import {
  findPublicPackages,
  GENERATIONS,
  mapWithConcurrency,
  root,
} from './workspace-packages.js';

const run = promisify(execFile);
const attwBin = join(root, 'node_modules', '.bin', 'attw');
const CONCURRENCY = 4;

const args = process.argv.slice(2);
const gen = args.find((arg) => arg.startsWith('--gen='))?.split('=')[1];
const reportOnly = args.includes('--report-only');

if (!GENERATIONS.includes(gen)) {
  console.error(
    'Usage: node scripts/validate-packages.js --gen=<1st-gen|gen2> [--report-only]'
  );
  process.exit(1);
}

async function pack(dir, destination) {
  const { stdout } = await run(
    'npm',
    ['pack', '--json', '--ignore-scripts', '--pack-destination', destination],
    { cwd: dir, maxBuffer: 64 * 1024 * 1024 }
  );
  const [{ filename, files }] = JSON.parse(stdout);
  return { tarball: join(destination, filename), files };
}

/**
 * Parses each shipped `.css` file the way a consumer's minifier would. The
 * packed file list comes from `npm pack`, so this checks exactly what ships.
 */
function runCssCheck(dir, files) {
  return files
    .map(({ path }) => path)
    .filter((path) => path.endsWith('.css'))
    .flatMap((path) => {
      try {
        // Invalid rules nested in a block, such as `@property` inside
        // `@media`, surface as warnings rather than errors.
        const { warnings } = transform({
          filename: path,
          code: readFileSync(join(dir, path)),
          minify: true,
          errorRecovery: false,
        });
        return warnings.map(
          ({ message, loc }) => `\`${path}:${loc.line}\`: ${message}`
        );
      } catch (error) {
        const line = error.loc ? `:${error.loc.line}` : '';
        return [`\`${path}${line}\`: ${error.message}`];
      }
    });
}

async function runPublint(tarball, pkg) {
  const data = readFileSync(tarball);
  const { messages } = await publint({
    // Copy into a standalone ArrayBuffer: small Buffers can share a pooled one.
    pack: {
      tarball: data.buffer.slice(
        data.byteOffset,
        data.byteOffset + data.byteLength
      ),
    },
    level: 'warning',
  });
  return messages.map((message) => ({
    type: message.type,
    text: formatMessage(message, pkg, { color: false }),
  }));
}

/**
 * Export subpaths that only point at non-JS assets, such as CSS or the custom
 * elements manifest. They have no types by design, so attw would flag them.
 */
function assetEntrypoints(pkg) {
  const targets = (value) =>
    typeof value === 'string'
      ? [value]
      : Object.values(value ?? {}).flatMap(targets);
  return Object.entries(
    typeof pkg.exports === 'object' && !Array.isArray(pkg.exports)
      ? pkg.exports
      : {}
  )
    .filter(([subpath]) => subpath.startsWith('.'))
    .filter(([, value]) => {
      const paths = targets(value);
      return paths.length && paths.every((path) => /\.(css|json)$/.test(path));
    })
    .map(([subpath]) => subpath);
}

// Resolution modes the `esm-only` profile ignores. attw's JSON output lists
// problems for every mode, so filter them the same way its table output does.
const IGNORED_RESOLUTIONS = new Set(['node10', 'node16-cjs']);

async function runAttw(tarball, pkg) {
  const exclude = assetEntrypoints(pkg);
  const outputPath = `${tarball}.attw.json`;
  // attw calls process.exit() after printing, which can truncate piped output
  // larger than 64 KB, so write it to a file instead.
  const output = openSync(outputPath, 'w');
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(
        attwBin,
        [
          tarball,
          '--profile',
          'esm-only',
          '--format',
          'json',
          ...(exclude.length ? ['--exclude-entrypoints', ...exclude] : []),
        ],
        { stdio: ['ignore', output, 'pipe'] }
      );
      let stderr = '';
      child.stderr.on('data', (chunk) => (stderr += chunk));
      child.on('error', reject);
      // attw exits non-zero when it finds problems, and still writes its JSON.
      child.on('close', () => resolve(stderr));
    });
  } finally {
    closeSync(output);
  }

  const { analysis, problems } = JSON.parse(readFileSync(outputPath, 'utf-8'));
  if (!analysis?.types) {
    // No types shipped at all: nothing for TypeScript consumers to resolve.
    return [];
  }
  return Object.values(problems ?? {})
    .flat()
    .filter(({ resolutionKind }) => !IGNORED_RESOLUTIONS.has(resolutionKind))
    .map(
      ({ kind, entrypoint, resolutionKind }) =>
        `${kind}: \`${entrypoint ?? '(package)'}\`${resolutionKind ? ` (${resolutionKind})` : ''}`
    );
}

async function validate({ dir, pkg }, destination) {
  try {
    const { tarball, files } = await pack(dir, destination);
    const [publintMessages, attwProblems] = await Promise.all([
      runPublint(tarball, pkg),
      runAttw(tarball, pkg),
    ]);
    const cssProblems = runCssCheck(dir, files);
    return { name: pkg.name, publintMessages, attwProblems, cssProblems };
  } catch (error) {
    return {
      name: pkg.name,
      publintMessages: [
        { type: 'error', text: `Validation failed: ${error.message}` },
      ],
      attwProblems: [],
      cssProblems: [],
    };
  }
}

function report(results) {
  const count = (result, type) =>
    result.publintMessages.filter((message) => message.type === type).length;
  const failing = results.filter(
    (result) =>
      count(result, 'error') > 0 ||
      result.attwProblems.length > 0 ||
      result.cssProblems.length > 0
  );

  const lines = [
    `## Package validation (${gen})`,
    '',
    `Checked ${results.length} public packages with \`publint\`, \`attw --profile esm-only\`, and Lightning CSS. ${failing.length} with errors.${reportOnly ? ' Report-only: findings do not fail this check yet.' : ''}`,
    '',
    '| Package | publint errors | publint warnings | attw problems | CSS errors |',
    '| --- | --- | --- | --- | --- |',
    ...results.map(
      (result) =>
        `| \`${result.name}\` | ${count(result, 'error') || '✅'} | ${count(result, 'warning') || '–'} | ${result.attwProblems.length || '✅'} | ${result.cssProblems.length || '✅'} |`
    ),
    '',
  ];

  for (const result of results) {
    if (
      !result.publintMessages.length &&
      !result.attwProblems.length &&
      !result.cssProblems.length
    ) {
      continue;
    }
    lines.push(`<details><summary><code>${result.name}</code></summary>`, '');
    for (const message of result.publintMessages) {
      lines.push(`- publint ${message.type}: ${message.text}`);
    }
    for (const problem of result.attwProblems) {
      lines.push(`- attw: ${problem}`);
    }
    for (const problem of result.cssProblems) {
      lines.push(`- CSS: ${problem}`);
    }
    lines.push('', '</details>', '');
  }

  const markdown = lines.join('\n');
  console.log(markdown);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
  }
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `checked=${results.length}\nfailing=${failing.length}\n`
    );
  }
  if (failing.length && process.env.GITHUB_ACTIONS) {
    // An annotation shows on the run page, so findings aren't buried in logs.
    const level = reportOnly ? 'warning' : 'error';
    console.log(
      `::${level} title=Package validation (${gen})::${failing.length} of ${results.length} packages have findings. See the job summary.`
    );
  }
  return failing.length;
}

const packages = findPublicPackages(gen);
const destination = mkdtempSync(join(tmpdir(), 'swc-validate-'));
try {
  const results = await mapWithConcurrency(packages, CONCURRENCY, (entry) =>
    validate(entry, destination)
  );
  results.sort((a, b) => a.name.localeCompare(b.name));
  const failing = report(results);
  if (failing && !reportOnly) {
    process.exitCode = 1;
  }
} finally {
  rmSync(destination, { recursive: true, force: true });
}
