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
 * Validate the structure and content of .ai/config.json.
 *
 * Checks:
 * - Required top-level sections are present
 * - git.types is a non-empty array of strings
 * - git.validationPattern is a valid regex
 * - jira_tickets.title_format.max_length is a positive integer
 * - jira_tickets.title_format.pattern is a valid regex
 * - jira_tickets.labels keys and issue_types entries are non-empty strings
 * - text_formatting.headings.case is a string
 *
 * Usage:
 *   node .ai/scripts/validate-config-schema.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, '../config.json');

/**
 * Try to compile a string as a RegExp. Returns an error message or null.
 */
function validateRegex(pattern, label) {
  try {
    new RegExp(pattern);
    return null;
  } catch (e) {
    return `${label}: invalid regex '${pattern}' — ${e.message}`;
  }
}

/**
 * Validate .ai/config.json. Returns { errors, warnings }.
 */
export function validateConfigSchema() {
  const errors = [];
  const warnings = [];
  const configRel = path.relative(path.resolve(__dirname, '../..'), configPath);

  if (!fs.existsSync(configPath)) {
    errors.push(`${configRel}: file not found`);
    return { errors, warnings };
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch (e) {
    errors.push(`${configRel}: invalid JSON — ${e.message}`);
    return { errors, warnings };
  }

  // ── git ──────────────────────────────────────────────────────────────────

  if (!config.git) {
    errors.push(`${configRel}: missing required section 'git'`);
  } else {
    const { git } = config;

    if (!Array.isArray(git.types) || git.types.length === 0) {
      errors.push(
        `${configRel}: git.types must be a non-empty array of strings`
      );
    } else if (!git.types.every((t) => typeof t === 'string' && t)) {
      errors.push(
        `${configRel}: git.types must contain only non-empty strings`
      );
    }

    if (git.validationPattern) {
      const regexError = validateRegex(
        git.validationPattern,
        `${configRel}: git.validationPattern`
      );
      if (regexError) {
        errors.push(regexError);
      }
    } else {
      warnings.push(
        `${configRel}: git.validationPattern is missing — branch name validation will not work`
      );
    }

    if (!git.branchNameTemplate) {
      warnings.push(`${configRel}: git.branchNameTemplate is missing`);
    }
  }

  // ── jira_tickets ─────────────────────────────────────────────────────────

  if (!config.jira_tickets) {
    errors.push(`${configRel}: missing required section 'jira_tickets'`);
  } else {
    const { jira_tickets: jira } = config;

    if (!jira.title_format) {
      errors.push(`${configRel}: jira_tickets.title_format is required`);
    } else {
      const { max_length, pattern } = jira.title_format;

      if (
        typeof max_length !== 'number' ||
        !Number.isInteger(max_length) ||
        max_length <= 0
      ) {
        errors.push(
          `${configRel}: jira_tickets.title_format.max_length must be a positive integer`
        );
      }

      if (pattern) {
        const regexError = validateRegex(
          pattern,
          `${configRel}: jira_tickets.title_format.pattern`
        );
        if (regexError) {
          errors.push(regexError);
        }
      } else {
        warnings.push(
          `${configRel}: jira_tickets.title_format.pattern is missing`
        );
      }
    }

    if (
      !jira.labels ||
      typeof jira.labels !== 'object' ||
      Array.isArray(jira.labels)
    ) {
      errors.push(
        `${configRel}: jira_tickets.labels must be a non-null object`
      );
    } else if (Object.keys(jira.labels).length === 0) {
      warnings.push(`${configRel}: jira_tickets.labels is empty`);
    }

    if (!Array.isArray(jira.issue_types) || jira.issue_types.length === 0) {
      errors.push(
        `${configRel}: jira_tickets.issue_types must be a non-empty array`
      );
    }

    if (!Array.isArray(jira.required_sections)) {
      errors.push(
        `${configRel}: jira_tickets.required_sections must be an array`
      );
    }
  }

  // ── text_formatting ───────────────────────────────────────────────────────

  if (!config.text_formatting) {
    warnings.push(
      `${configRel}: missing section 'text_formatting' — heading case rules will not apply`
    );
  } else if (!config.text_formatting.headings?.case) {
    warnings.push(`${configRel}: text_formatting.headings.case is missing`);
  }

  return { errors, warnings };
}
