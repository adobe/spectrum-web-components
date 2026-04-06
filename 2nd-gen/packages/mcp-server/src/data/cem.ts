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
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const FRAMEWORK_BASE_CLASSES = new Set([
  'SpectrumElement',
  'SpectrumMixin',
  'LitElement',
  'HTMLElement',
]);

// ---- Public types ---------------------------------------------------------

export interface ComponentAttribute {
  name: string;
  type: string;
  description: string;
  default?: string;
  deprecated?: string;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface ComponentEvent {
  name: string;
  type: string;
  description: string;
}

export interface ComponentMethod {
  name: string;
  description: string;
  returnType: string;
  parameters: Array<{ name: string; type: string; description?: string }>;
}

export interface ComponentInfo {
  tagName: string;
  className: string;
  description: string;
  status: string;
  since: string;
  attributes: ComponentAttribute[];
  slots: ComponentSlot[];
  events: ComponentEvent[];
  methods: ComponentMethod[];
}

// ---- CEM schema (subset we care about) ------------------------------------

interface CEMType {
  text: string;
}

interface CEMAttribute {
  name: string;
  type?: CEMType;
  description?: string;
  default?: string;
  deprecated?: string;
  inheritedFrom?: { name: string; module: string };
}

interface CEMSlot {
  name: string;
  description?: string;
}

interface CEMEvent {
  name: string;
  type?: CEMType;
  description?: string;
}

interface CEMMember {
  kind: 'field' | 'method';
  name: string;
  privacy?: string;
  static?: boolean;
  description?: string;
  type?: CEMType;
  default?: string;
  deprecated?: string;
  return?: { type?: CEMType };
  parameters?: Array<{ name: string; type?: CEMType; description?: string }>;
  inheritedFrom?: { name: string; module: string };
}

interface CEMDeclaration {
  kind: string;
  name: string;
  customElement?: boolean;
  tagName?: string;
  description?: string;
  status?: string;
  since?: string;
  members?: CEMMember[];
  attributes?: CEMAttribute[];
  slots?: CEMSlot[];
  events?: CEMEvent[];
}

interface CEMModule {
  kind: string;
  path: string;
  declarations: CEMDeclaration[];
}

interface CEMSchema {
  schemaVersion: string;
  modules: CEMModule[];
}

// ---- Cache & loading -------------------------------------------------------

let cache: Map<string, ComponentInfo> | null = null;

function cemPath(): string {
  const env = process.env['CEM_PATH'];
  if (env) {
    return env;
  }
  const __dirname = dirname(fileURLToPath(import.meta.url));
  // dist/data/ -> dist/ -> mcp-server/ -> packages/ -> swc/.storybook/custom-elements.json
  return resolve(__dirname, '../../../swc/.storybook/custom-elements.json');
}

function isFrameworkMember(member: CEMMember): boolean {
  return (
    member.inheritedFrom !== undefined &&
    FRAMEWORK_BASE_CLASSES.has(member.inheritedFrom.name)
  );
}

function buildComponentInfo(decl: CEMDeclaration): ComponentInfo {
  const publicMembers = (decl.members ?? []).filter(
    (m) =>
      m.privacy !== 'private' &&
      m.privacy !== 'protected' &&
      !m.static &&
      !isFrameworkMember(m)
  );

  const attributes: ComponentAttribute[] = (decl.attributes ?? []).map((a) => ({
    name: a.name,
    type: a.type?.text ?? 'string',
    description: a.description ?? '',
    ...(a.default !== undefined && { default: a.default }),
    ...(a.deprecated !== undefined && { deprecated: a.deprecated }),
  }));

  const slots: ComponentSlot[] = (decl.slots ?? []).map((s) => ({
    name: s.name,
    description: s.description ?? '',
  }));

  const events: ComponentEvent[] = (decl.events ?? []).map((event) => ({
    name: event.name,
    type: event.type?.text ?? '',
    description: event.description ?? '',
  }));

  // Only surface public methods that have a description (i.e. intentional API)
  const methods: ComponentMethod[] = publicMembers
    .filter((m) => m.kind === 'method' && Boolean(m.description))
    .map((m) => ({
      name: m.name,
      description: m.description ?? '',
      returnType: m.return?.type?.text ?? 'void',
      parameters: (m.parameters ?? []).map((p) => ({
        name: p.name,
        type: p.type?.text ?? 'unknown',
        ...(p.description !== undefined && { description: p.description }),
      })),
    }));

  return {
    tagName: decl.tagName!,
    className: decl.name,
    description: decl.description ?? '',
    status: decl.status ?? 'stable',
    since: decl.since ?? '',
    attributes,
    slots,
    events,
    methods,
  };
}

export function loadComponents(): Map<string, ComponentInfo> {
  if (cache) {
    return cache;
  }

  const raw = readFileSync(cemPath(), 'utf-8');
  const cem = JSON.parse(raw) as CEMSchema;

  cache = new Map<string, ComponentInfo>();
  for (const mod of cem.modules) {
    for (const decl of mod.declarations) {
      if (decl.customElement && decl.tagName) {
        cache.set(decl.tagName, buildComponentInfo(decl));
      }
    }
  }

  return cache;
}

export function invalidateCache(): void {
  cache = null;
}
