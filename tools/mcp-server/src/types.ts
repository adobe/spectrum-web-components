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

export interface ComponentSummary {
  tagName: string;
  className: string;
  package: string;
  generation: 'gen-1' | 'gen-2';
  description: string;
  hasGen2Equivalent: boolean;
  migrationStatus: MigrationStatus;
}

/**
 * Full API surface for a component — returned by get_component_api.
 */
export interface ComponentAPI extends ComponentSummary {
  superclass: string;
  mixins: string[];
  properties: PropertyInfo[];
  attributes: AttributeInfo[];
  events: EventInfo[];
  slots: SlotInfo[];
  cssCustomProperties: CSSPropertyInfo[];
  cssParts: CSSPartInfo[];
  methods: MethodInfo[];
}

export interface PropertyInfo {
  name: string;
  type: string;
  default?: string;
  attribute?: string;
  reflects: boolean;
  description: string;
  inherited?: boolean;
  inheritedFrom?: string;
  deprecated?: false | { reason: string; since?: string };
}

export interface AttributeInfo {
  name: string;
  type?: string;
  fieldName: string;
  description?: string;
  default?: string;
}

export interface EventInfo {
  name: string;
  description: string;
  bubbles?: boolean;
  composed?: boolean;
  cancelable?: boolean;
  detail?: string;
  inherited?: boolean;
}

export interface SlotInfo {
  name: string;
  description: string;
}

export interface CSSPropertyInfo {
  name: string;
  description?: string;
  default?: string;
}

export interface CSSPartInfo {
  name: string;
  description?: string;
}

export interface MethodInfo {
  name: string;
  description?: string;
  parameters?: { name: string; type?: string; description?: string }[];
  return?: { type: string };
}

export interface ComponentExample {
  title: string;
  html: string;
  source: 'readme' | 'storybook';
}

export type MigrationStatus =
  | 'not-started'
  | 'analyzed'
  | 'in-progress'
  | 'complete';

export type MigrationStep =
  | 'analyze'
  | 'factor-component'
  | 'move-to-core'
  | 'add-data-model'
  | 'add-2nd-gen'
  | 'render-and-style'
  | 'add-stories';

export interface MigrationInfo {
  gen1TagName: string;
  gen2Package: string | null;
  migrationStatus: MigrationStatus;
  steps: MigrationStep[];
  completedSteps: MigrationStep[];
  breakingChanges: BreakingChange[];
  apiDiff: {
    addedProperties: string[];
    removedProperties: string[];
    changedTypes: TypeChange[];
  };
}

export interface BreakingChange {
  type:
    | 'property-removed'
    | 'property-added'
    | 'variant-changed'
    | 'slot-changed'
    | 'event-changed';
  name: string;
  description: string;
}

export interface TypeChange {
  property: string;
  gen1Type: string;
  gen2Type: string;
}

export type SearchSection =
    | 'properties'
    | 'events'
    | 'slots'
    | 'description'
    | 'css-properties';

export interface SearchResult {
  tagName: string;
  matchType: 'property' | 'event' | 'slot' | 'description' | 'css-property';
  matchField: string;
  description: string;
  relevanceScore: number;
}

export interface ValidationDiagnostic {
  severity: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  column?: number;
}

export interface ValidationResult {
  valid: boolean;
  diagnostics: ValidationDiagnostic[];
}

/**
 * Raw CEM (Custom Elements Manifest) types — matches the JSON schema.
 */
export interface CEMManifest {
  schemaVersion: string;
  modules: CEMModule[];
}

export interface CEMModule {
  kind: string;
  path: string;
  declarations?: CEMDeclaration[];
  exports?: CEMExport[];
}

export interface CEMDeclaration {
  kind: string;
  name: string;
  description?: string;
  tagName?: string;
  customElement?: boolean;
  members?: CEMMember[];
  attributes?: CEMAttribute[];
  events?: CEMEvent[];
  slots?: CEMSlot[];
  cssProperties?: CEMCSSProperty[];
  cssParts?: CEMCSSPart[];
  superclass?: { name: string; package?: string; module?: string };
  mixins?: { name: string; package?: string; module?: string }[];
}

export interface CEMMember {
  kind: 'field' | 'method';
  name: string;
  type?: { text: string };
  default?: string;
  description?: string;
  attribute?: string;
  reflects?: boolean;
  privacy?: string;
  parameters?: {
    name: string;
    type?: { text: string };
    description?: string;
  }[];
  return?: { type: { text: string } };
  inheritedFrom?: { name: string; module?: string };
  deprecated?: string | boolean;
}

export interface CEMAttribute {
  name: string;
  type?: { text: string };
  default?: string;
  description?: string;
  fieldName?: string;
  deprecated?: string | boolean;
}

export interface CEMEvent {
  name: string;
  type?: { text: string };
  description?: string;
  inheritedFrom?: { name: string };
}

export interface CEMSlot {
  name: string;
  description?: string;
}

export interface CEMCSSProperty {
  name: string;
  description?: string;
  default?: string;
}

export interface CEMCSSPart {
  name: string;
  description?: string;
}

export interface CEMExport {
  kind: string;
  name: string;
  declaration: { name: string; module: string };
}
