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

import type { MigrationStep } from './types.js';

export interface MigrationStatusEntry {
  component: string;
  status: 'not-started' | 'analyzed' | 'in-progress' | 'complete';
  completedSteps: MigrationStep[];
}

const MIGRATION_STEPS: MigrationStep[] = [
  'analyze',
  'factor-component',
  'move-to-core',
  'add-data-model',
  'add-2nd-gen',
  'render-and-style',
  'add-stories',
];

function isCheckMark(cell: string): boolean {
  const trimmed = cell.trim();
  return (
    trimmed.includes(':white_check_mark:') ||
    trimmed.includes('\u2705') ||
    trimmed.includes('\u2713')
  );
}

function determineStatus(
  completedSteps: MigrationStep[]
): MigrationStatusEntry['status'] {
  if (completedSteps.length === 0) {
    return 'not-started';
  }
  if (completedSteps.length === MIGRATION_STEPS.length) {
    return 'complete';
  }
  if (completedSteps.length === 1 && completedSteps[0] === 'analyze') {
    return 'analyzed';
  }
  return 'in-progress';
}

/**
 * Parses a migration status markdown table and extracts structured entries.
 */
export function parseMigrationStatus(content: string): MigrationStatusEntry[] {
  const lines = content.split('\n');
  const entries: MigrationStatusEntry[] = [];

  // Find table rows (lines starting with |)
  const tableRows = lines.filter((line) => line.trimStart().startsWith('|'));

  // Need at least header + separator + 1 data row
  if (tableRows.length < 3) {
    return entries;
  }

  // Skip header (index 0) and separator (index 1)
  const dataRows = tableRows.slice(2);

  for (const row of dataRows) {
    // Split by | and remove first/last empty elements
    const cells = row
      .split('|')
      .map((c) => c.trim())
      .filter((_, i, arr) => i > 0 && i < arr.length - 1);

    if (cells.length < 8) {
      continue;
    }

    const component = cells[0].trim();
    const completedSteps: MigrationStep[] = [];

    for (let i = 0; i < MIGRATION_STEPS.length; i++) {
      if (isCheckMark(cells[i + 1])) {
        completedSteps.push(MIGRATION_STEPS[i]);
      }
    }

    entries.push({
      component,
      status: determineStatus(completedSteps),
      completedSteps,
    });
  }

  return entries;
}

/**
 * Converts a component display name to its tag name.
 * e.g., "Badge" -> "sp-badge", "Progress Circle" -> "sp-progress-circle"
 */
export function componentNameToTagName(name: string): string {
  return 'sp-' + name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Converts a component display name to its gen-2 package name.
 * e.g., "Badge" -> "@adobe/spectrum-wc/badge"
 */
export function componentNameToGen2Package(name: string): string {
  return '@adobe/spectrum-wc/' + name.toLowerCase().replace(/\s+/g, '-');
}
