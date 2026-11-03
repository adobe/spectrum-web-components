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
 * Verifies that npm serves what a release just published: every public package
 * in the generation exists at the version in its package.json, and each expected
 * dist-tag points at that version. npm can take a few minutes to serve a new
 * version everywhere, so each package is polled with backoff until it passes or
 * the timeout runs out.
 *
 * Usage:
 *   node scripts/verify-registry.js --gen=<1st-gen|gen2> [--tag=latest]...
 *     [--include=<repo-relative dir>]... [--timeout=<seconds>]
 *
 * --tag       Dist-tag that must point at the released version. Repeatable.
 *             Defaults to `latest`.
 * --include   Extra parent directory whose child packages are also published,
 *             for example the generated `1st-gen/react` wrappers. Repeatable.
 * --timeout   How long to keep polling each package. Defaults to 600 seconds.
 *
 * Exits 1 if any package fails. Writes a Markdown report to $GITHUB_STEP_SUMMARY
 * when set.
 */

import { appendFileSync } from 'fs';

import {
  findPublicPackages,
  GENERATIONS,
  mapWithConcurrency,
} from './workspace-packages.js';

const REGISTRY = 'https://registry.npmjs.org';
const CONCURRENCY = 8;
const INITIAL_DELAY_MS = 5_000;
const MAX_DELAY_MS = 60_000;

const args = process.argv.slice(2);
const values = (name) =>
  args
    .filter((arg) => arg.startsWith(`--${name}=`))
    .map((arg) => arg.slice(name.length + 3));

const [gen] = values('gen');
const tags = values('tag').length ? values('tag') : ['latest'];
const includes = values('include');
const timeoutMs = Number(values('timeout')[0] ?? 600) * 1000;

if (!GENERATIONS.includes(gen) || !Number.isFinite(timeoutMs)) {
  console.error(
    'Usage: node scripts/verify-registry.js --gen=<1st-gen|gen2> [--tag=latest]... [--include=<dir>]... [--timeout=<seconds>]'
  );
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Problems with one package on the registry, or [] when it matches. */
async function check(name, version) {
  const response = await fetch(`${REGISTRY}/${name.replace('/', '%2f')}`, {
    headers: {
      // The abbreviated packument has `versions` and `dist-tags`, and is small.
      accept: 'application/vnd.npm.install-v1+json',
      'cache-control': 'no-cache',
    },
  });
  if (response.status === 404) {
    return ['not found on npm'];
  }
  if (!response.ok) {
    return [`registry returned HTTP ${response.status}`];
  }
  const packument = await response.json();
  const problems = [];
  if (!packument.versions?.[version]) {
    problems.push(`version \`${version}\` not published`);
  }
  for (const tag of tags) {
    const actual = packument['dist-tags']?.[tag];
    if (actual !== version) {
      problems.push(
        `\`${tag}\` is \`${actual ?? 'unset'}\`, expected \`${version}\``
      );
    }
  }
  return problems;
}

async function verify({ pkg: { name, version } }) {
  const deadline = Date.now() + timeoutMs;
  let delay = INITIAL_DELAY_MS;
  let problems;
  for (;;) {
    try {
      problems = await check(name, version);
    } catch (error) {
      problems = [`request failed: ${error.message}`];
    }
    if (!problems.length || Date.now() + delay > deadline) {
      return { name, version, problems };
    }
    await sleep(delay);
    delay = Math.min(delay * 2, MAX_DELAY_MS);
  }
}

function report(results) {
  const failing = results.filter((result) => result.problems.length);
  const lines = [
    `## Registry verification (${gen})`,
    '',
    failing.length
      ? `❌ ${failing.length} of ${results.length} packages don't match the release. Don't announce it yet.`
      : `✅ All ${results.length} packages are on npm at the released version, with ${tags.map((tag) => `\`${tag}\``).join(', ')} pointing at it.`,
    '',
  ];
  if (failing.length) {
    lines.push('| Package | Expected | Problems |', '| --- | --- | --- |');
    for (const { name, version, problems } of failing) {
      lines.push(`| \`${name}\` | \`${version}\` | ${problems.join('; ')} |`);
    }
    lines.push('');
  }

  const markdown = lines.join('\n');
  console.log(markdown);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
  }
  return failing.length;
}

const packages = findPublicPackages(gen, includes);
if (!packages.length) {
  console.error(`No public ${gen} packages found.`);
  process.exit(1);
}
const results = await mapWithConcurrency(packages, CONCURRENCY, verify);
results.sort((a, b) => a.name.localeCompare(b.name));
if (report(results)) {
  process.exitCode = 1;
}
