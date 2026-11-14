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
 * Packages must be built first. With --report-only, publint and attw findings
 * are reported but don't fail the script. CSS errors always fail it: there are
 * no known existing ones, and they break consumers' production builds. So does
 * a tool that crashes, since its checks didn't run. Writes a
 * Markdown report to $GITHUB_STEP_SUMMARY when set.
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
 * Returns the index of the `}` that closes the block opened at `open`, skipping
 * braces inside comments and strings, or -1 if the block never closes.
 */
function findBlockEnd(css, open) {
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    const char = css[i];
    if (char === '/' && css[i + 1] === '*') {
      const close = css.indexOf('*/', i + 2);
      if (close === -1) {
        return -1;
      }
      i = close + 1;
    } else if (char === '"' || char === "'") {
      for (i++; i < css.length && css[i] !== char; i++) {
        if (css[i] === '\\') {
          i++;
        }
      }
    } else if (char === '{') {
      depth++;
    } else if (char === '}' && --depth === 0) {
      return i;
    }
  }
  return -1;
}

/**
 * Lightning CSS doesn't parse `@property` nested in `@media` or `@supports`.
 * It warns "Unknown at rule" whether or not the rule is valid. Extract the
 * nested rule and parse it at the top level, where its descriptors are checked.
 * Returns the parse error, or `null` if the rule is valid.
 */
function checkNestedProperty(css, { line, column }) {
  const lineStart = css
    .split('\n', line - 1)
    .reduce((offset, text) => offset + text.length + 1, 0);
  // The warning's column points just past the `@property` it's about, so
  // search backward from there to find that rule, not the first on the line.
  const start = css.lastIndexOf('@property', lineStart + column - 1);
  const open = start < lineStart ? -1 : css.indexOf('{', start);
  const end = open === -1 ? -1 : findBlockEnd(css, open);
  if (end === -1) {
    return 'Unknown at rule: @property';
  }
  try {
    const { warnings } = transform({
      filename: 'property.css',
      code: Buffer.from(css.slice(start, end + 1)),
      errorRecovery: false,
    });
    return warnings[0]?.message ?? null;
  } catch (error) {
    return error.message;
  }
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
        const code = readFileSync(join(dir, path));
        // Invalid rules nested in a block surface as warnings, not errors.
        const { warnings } = transform({
          filename: path,
          code,
          minify: true,
          errorRecovery: false,
        });
        return warnings.flatMap(({ message, loc }) => {
          const problem =
            message === 'Unknown at rule: @property'
              ? checkNestedProperty(code.toString(), loc)
              : message;
          return problem ? [`\`${path}:${loc.line}\`: ${problem}`] : [];
        });
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
  let stderr = '';
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
      child.stderr.on('data', (chunk) => (stderr += chunk));
      child.on('error', reject);
      // attw exits non-zero when it finds problems, and still writes its JSON.
      child.on('close', resolve);
    });
  } finally {
    closeSync(output);
  }

  let json;
  try {
    json = JSON.parse(readFileSync(outputPath, 'utf-8'));
  } catch (error) {
    throw new Error(
      `no JSON output (${error.message})${stderr ? `: ${stderr.trim()}` : ''}`
    );
  }
  const { analysis, problems } = json;
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

/**
 * A tool that crashes hasn't checked anything, so its error is reported
 * separately and always fails the script, even with --report-only.
 */
async function settle(tool, check) {
  try {
    return { value: await check() };
  } catch (error) {
    // Flattened, so a multi-line error doesn't break the Markdown report.
    const message = error.message.replace(/\s+/g, ' ').trim();
    return { toolError: `${tool}: ${message}` };
  }
}

async function validate({ dir, pkg }, destination) {
  const result = {
    name: pkg.name,
    publintMessages: [],
    attwProblems: [],
    cssProblems: [],
    toolErrors: [],
  };
  const packed = await settle('npm pack', () => pack(dir, destination));
  if (packed.toolError) {
    result.toolErrors.push(packed.toolError);
    return result;
  }
  const { tarball, files } = packed.value;
  // CSS is checked first and on its own, so a publint or attw crash can't skip it.
  const css = await settle('Lightning CSS', () => runCssCheck(dir, files));
  const [publint, attw] = await Promise.all([
    settle('publint', () => runPublint(tarball, pkg)),
    settle('attw', () => runAttw(tarball, pkg)),
  ]);
  result.cssProblems = css.value ?? [];
  result.publintMessages = publint.value ?? [];
  result.attwProblems = attw.value ?? [];
  result.toolErrors = [css, publint, attw]
    .map(({ toolError }) => toolError)
    .filter(Boolean);
  return result;
}

function report(results) {
  const count = (result, type) =>
    result.publintMessages.filter((message) => message.type === type).length;
  const failing = results.filter(
    (result) =>
      count(result, 'error') > 0 ||
      result.attwProblems.length > 0 ||
      result.cssProblems.length > 0 ||
      result.toolErrors.length > 0
  );

  // Always blocking: invalid CSS, or a check that didn't run.
  const blocking = results.filter(
    (result) => result.cssProblems.length > 0 || result.toolErrors.length > 0
  );

  const lines = [
    `## Package validation (${gen})`,
    '',
    `Checked ${results.length} public packages with \`publint\`, \`attw --profile esm-only\`, and Lightning CSS. ${failing.length} with errors.${reportOnly ? ' Report-only for `publint` and `attw`: those findings do not fail this check yet. CSS errors and tool errors always fail it.' : ''}`,
    '',
    '| Package | publint errors | publint warnings | attw problems | CSS errors | Tool errors |',
    '| --- | --- | --- | --- | --- | --- |',
    ...results.map(
      (result) =>
        `| \`${result.name}\` | ${count(result, 'error') || '✅'} | ${count(result, 'warning') || '–'} | ${result.attwProblems.length || '✅'} | ${result.cssProblems.length || '✅'} | ${result.toolErrors.length || '✅'} |`
    ),
    '',
  ];

  for (const result of results) {
    if (
      !result.publintMessages.length &&
      !result.attwProblems.length &&
      !result.cssProblems.length &&
      !result.toolErrors.length
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
    for (const error of result.toolErrors) {
      lines.push(`- Tool error: ${error}`);
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
      `checked=${results.length}\nfailing=${failing.length}\nblocking=${blocking.length}\n`
    );
  }
  if (process.env.GITHUB_ACTIONS) {
    // An annotation shows on the run page, so findings aren't buried in logs.
    if (blocking.length) {
      console.log(
        `::error title=Package validation (${gen})::${blocking.length} of ${results.length} packages ship CSS that doesn't parse or couldn't be checked. See the job summary.`
      );
    }
    if (failing.length > blocking.length || (failing.length && !reportOnly)) {
      const level = reportOnly ? 'warning' : 'error';
      console.log(
        `::${level} title=Package validation (${gen})::${failing.length} of ${results.length} packages have findings. See the job summary.`
      );
    }
  }
  return { failing: failing.length, blocking: blocking.length };
}

const packages = findPublicPackages(gen);
const destination = mkdtempSync(join(tmpdir(), 'swc-validate-'));
try {
  const results = await mapWithConcurrency(packages, CONCURRENCY, (entry) =>
    validate(entry, destination)
  );
  results.sort((a, b) => a.name.localeCompare(b.name));
  const { failing, blocking } = report(results);
  if (blocking || (failing && !reportOnly)) {
    process.exitCode = 1;
  }
} finally {
  rmSync(destination, { recursive: true, force: true });
}
