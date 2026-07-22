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
 * Blocks (or unblocks) PR merges into a release branch for the duration of a publish run,
 * by adding (or removing) a synthetic required status check that never reports success.
 * Required status checks only gate the GitHub merge button/API - they do not block a
 * direct `git push` from an actor with push access, so this does not interfere with the
 * release job's own commit-and-push step.
 *
 * ponytail: classic branch protection only; repos on the newer rulesets API instead of
 * classic protection will get a 404 here and this no-ops with a warning rather than
 * failing the release. Upgrade to the rulesets API if/when this repo migrates to it.
 */

import { execSync } from 'child_process';

const [, , mode, branch] = process.argv;
const LOCK_CONTEXT = 'release/in-progress';
const repo = process.env.GITHUB_REPOSITORY;

if (!['lock', 'unlock'].includes(mode) || !branch) {
  console.error('Usage: toggle-release-lock.mjs <lock|unlock> <branch>');
  process.exit(1);
}

function readProtection() {
  try {
    return JSON.parse(
      execSync(`gh api repos/${repo}/branches/${branch}/protection`, {
        encoding: 'utf-8',
      })
    );
  } catch {
    return null;
  }
}

const protection = readProtection();

if (!protection) {
  console.warn(
    `No branch protection found for '${branch}' (or this token can't read it) - skipping ${mode}. ` +
      'Concurrent-merge protection during this release is not active for this branch.'
  );
  process.exit(0);
}

const contexts = new Set(protection.required_status_checks?.contexts ?? []);
if (mode === 'lock') {
  contexts.add(LOCK_CONTEXT);
} else {
  contexts.delete(LOCK_CONTEXT);
}

const payload = {
  required_status_checks: {
    strict: protection.required_status_checks?.strict ?? false,
    contexts: [...contexts],
  },
  enforce_admins: protection.enforce_admins?.enabled ?? false,
  required_pull_request_reviews: protection.required_pull_request_reviews
    ? {
        dismiss_stale_reviews:
          protection.required_pull_request_reviews.dismiss_stale_reviews ??
          false,
        require_code_owner_reviews:
          protection.required_pull_request_reviews.require_code_owner_reviews ??
          false,
        required_approving_review_count:
          protection.required_pull_request_reviews
            .required_approving_review_count ?? 1,
      }
    : null,
  restrictions: protection.restrictions
    ? {
        users: protection.restrictions.users.map((user) => user.login),
        teams: protection.restrictions.teams.map((team) => team.slug),
        apps: protection.restrictions.apps.map((app) => app.slug),
      }
    : null,
};

execSync(
  `gh api repos/${repo}/branches/${branch}/protection -X PUT --input -`,
  {
    input: JSON.stringify(payload),
    encoding: 'utf-8',
  }
);

console.log(
  `${mode === 'lock' ? 'Locked' : 'Unlocked'} '${branch}': required status check '${LOCK_CONTEXT}' ${
    mode === 'lock' ? 'added' : 'removed'
  }.`
);
