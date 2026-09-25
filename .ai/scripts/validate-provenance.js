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
 * Validate provenance for content vendored from other open-source projects.
 *
 * Any `.ai/` rule, lesson, skill, or agent whose frontmatter `metadata` has a `source`
 * must also record:
 *   - `source-path`: where the file came from in the upstream repository
 *   - `source-sha`: the full 40-character upstream commit it was copied from
 *   - a license: top-level `license` for skills (Agent Skills spec), `metadata.license`
 *     for rules and agents
 *   - `upstream` (optional): an earlier origin, when the source itself adapted the file
 * and a matching license text must exist in `.ai/licenses/<owner>-<repo>.<license>.txt`.
 *
 * `.ai/THIRD-PARTY-NOTICES.md` is generated from this metadata by `yarn ai:sync`, so the
 * generated-files check catches a stale notices file.
 *
 * Returns { errors, warnings, fileCount } for integration with validate.js.
 */

import { existsSync } from 'fs';

import {
  licenseFileFor,
  listAgents,
  listInstructionSources,
  listSkills,
  provenanceOf,
  rel,
} from './ai-files.js';

const SOURCE = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;
const SHA = /^[0-9a-f]{40}$/;
const LICENSE = /^[A-Za-z0-9.-]+$/;

export function validateProvenance() {
  const errors = [];
  const warnings = [];
  const files = [
    ...listInstructionSources(),
    ...listSkills(),
    ...listAgents(),
  ].filter((f) => f.data && !f.error);
  let vendored = 0;

  for (const file of files) {
    const where = file.rel;
    const meta = file.data.metadata;
    if (
      meta !== undefined &&
      (typeof meta !== 'object' || Array.isArray(meta))
    ) {
      errors.push(`${where}: \`metadata\` must be a mapping`);
      continue;
    }
    const provenance = provenanceOf(file.data);
    if (!provenance) {
      continue;
    }
    vendored++;
    const { source, sourcePath, sourceSha, upstream, license } = provenance;
    if (!SOURCE.test(source)) {
      errors.push(`${where}: \`metadata.source\` must be '<owner>/<repo>'`);
    }
    if (typeof sourcePath !== 'string' || !sourcePath) {
      errors.push(`${where}: \`metadata.source-path\` is required`);
    }
    if (!SHA.test(String(sourceSha ?? ''))) {
      errors.push(
        `${where}: \`metadata.source-sha\` must be a full 40-character commit SHA`
      );
    }
    if (!LICENSE.test(String(license ?? ''))) {
      errors.push(
        `${where}: a license is required (\`license\` for skills, \`metadata.license\` otherwise)`
      );
      continue;
    }
    for (const origin of [source, upstream].filter(Boolean)) {
      if (!SOURCE.test(origin)) {
        errors.push(`${where}: '${origin}' must be '<owner>/<repo>'`);
        continue;
      }
      const licenseFile = licenseFileFor(origin, license);
      if (!existsSync(licenseFile)) {
        errors.push(
          `${where}: missing license text ${rel(licenseFile)} for ${origin}`
        );
      }
    }
  }

  return { errors, warnings, fileCount: vendored };
}
