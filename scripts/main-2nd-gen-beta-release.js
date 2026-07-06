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
 * Prepares a 2nd-gen beta publish on main after `changeset version --snapshot`.
 *
 * The single-trigger publish workflow versions every package together for 1st-gen
 * `next` snapshots. That step also consumes 2nd-gen changesets and writes their
 * changelog entries, but under a `0.x-next.*` header. This script retitles those
 * entries to `2.0.0-beta.N`, sets core + @adobe/spectrum-wc to that beta version,
 * and refreshes the 2nd-gen version.ts file.
 *
 * Run only when pending changesets mention `@spectrum-web-components/core` or
 * `@adobe/spectrum-wc`. The workflow gates on that check before calling this script.
 */

import { execSync } from 'child_process';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';

const CORE_PKG = '2nd-gen/packages/core/package.json';
const SWC_PKG = '2nd-gen/packages/swc/package.json';
const CORE_CHANGELOG = '2nd-gen/packages/core/CHANGELOG.md';
const SWC_CHANGELOG = '2nd-gen/packages/swc/CHANGELOG.md';
const FIRST_GEN_VERSION_TS = '1st-gen/tools/base/src/version.ts';

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

function writeJson(file, data) {
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getNextBetaVersion() {
  const raw = execSync(
    'npm view @adobe/spectrum-wc versions --json 2>/dev/null',
    {
      encoding: 'utf8',
    }
  );
  let versions = [];
  try {
    versions = JSON.parse(raw || '[]');
  } catch {
    versions = [];
  }
  if (!Array.isArray(versions)) {
    versions = [versions];
  }
  const re = /^2\.0\.0-beta\.(\d+)$/;
  const betaNumbers = versions
    .map((version) => {
      const match = re.exec(version);
      return match ? Number(match[1]) : -1;
    })
    .filter((n) => n >= 0);
  const nextN = (betaNumbers.length ? Math.max(...betaNumbers) : -1) + 1;
  return `2.0.0-beta.${nextN}`;
}

function retitleChangelog(path, snapshotVersion, betaVersion) {
  const header = `## ${snapshotVersion}`;
  let content = readFileSync(path, 'utf8');
  if (!content.includes(header)) {
    throw new Error(
      `${path} is missing the expected snapshot section "## ${snapshotVersion}". ` +
        'Was changeset version run with 2nd-gen changesets present?'
    );
  }
  content = content.replace(header, `## ${betaVersion}`);
  content = content.replace(
    new RegExp(
      `@spectrum-web-components/core@${escapeRegex(snapshotVersion)}`,
      'g'
    ),
    `@spectrum-web-components/core@${betaVersion}`
  );
  writeFileSync(path, content);
  console.log(`   ✓ Retitled ${path} -> ${betaVersion}`);
}

function main() {
  const corePkg = readJson(CORE_PKG);
  const swcPkg = readJson(SWC_PKG);
  const snapshotVersion = corePkg.version;

  if (!snapshotVersion.includes('-next.')) {
    console.error(
      `❌ Expected a snapshot version on core (got "${snapshotVersion}"). ` +
        'Run changeset version --snapshot before this script.'
    );
    process.exit(1);
  }
  if (swcPkg.version !== snapshotVersion) {
    console.error(
      `❌ core (${snapshotVersion}) and swc (${swcPkg.version}) snapshot versions differ.`
    );
    process.exit(1);
  }

  const betaVersion = getNextBetaVersion();
  console.log(`\nℹ️  Snapshot version: ${snapshotVersion}`);
  console.log(`ℹ️  Next beta version:  ${betaVersion}`);

  retitleChangelog(CORE_CHANGELOG, snapshotVersion, betaVersion);
  retitleChangelog(SWC_CHANGELOG, snapshotVersion, betaVersion);

  corePkg.version = betaVersion;
  corePkg.private = false;
  swcPkg.version = betaVersion;
  swcPkg.private = false;
  swcPkg.dependencies['@spectrum-web-components/core'] = betaVersion;
  writeJson(CORE_PKG, corePkg);
  writeJson(SWC_PKG, swcPkg);
  console.log('   ✓ Updated core + swc package.json');

  execSync('node scripts/generate-versions.js', { stdio: 'inherit' });
  execSync(`git checkout -- '${FIRST_GEN_VERSION_TS}'`, { stdio: 'inherit' });
  console.log(
    `   ✓ Refreshed 2nd-gen version.ts (left ${FIRST_GEN_VERSION_TS} on main)`
  );

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `beta=${betaVersion}\n`);
  }

  console.log('\n✅ 2nd-gen beta prepared for publish:');
  console.log(`     @spectrum-web-components/core   ${betaVersion}`);
  console.log(`     @adobe/spectrum-wc              ${betaVersion}`);
}

main();
