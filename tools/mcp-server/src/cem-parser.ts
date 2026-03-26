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

import type {
  AttributeInfo,
  CEMDeclaration,
  CEMManifest,
  CEMMember,
  ComponentAPI,
  CSSPartInfo,
  CSSPropertyInfo,
  EventInfo,
  MethodInfo,
  PropertyInfo,
  SlotInfo,
} from './types.js';

/**
 * Parse a Custom Elements Manifest into an array of ComponentAPI objects.
 */
export function parseCEM(
  manifest: CEMManifest,
  packageName: string,
  generation: 'gen-1' | 'gen-2'
): ComponentAPI[] {
  const components: ComponentAPI[] = [];

  for (const module of manifest.modules) {
    if (!module.declarations) {
      continue;
    }

    for (const declaration of module.declarations) {
      if (
        declaration.kind !== 'class' ||
        !declaration.customElement ||
        !declaration.tagName
      ) {
        continue;
      }

      components.push(parseDeclaration(declaration, packageName, generation));
    }
  }

  return components;
}

/**
 * Parse a monolithic CEM (single file containing all packages) into ComponentAPI objects.
 * Derives package names from module paths like "packages/button/sp-button.js".
 */
export function parseMonolithicCEM(
  manifest: CEMManifest,
  generation: 'gen-1' | 'gen-2'
): ComponentAPI[] {
  const components: ComponentAPI[] = [];

  for (const module of manifest.modules) {
    if (!module.declarations) {
      continue;
    }

    const packageName = derivePackageName(module.path);

    for (const declaration of module.declarations) {
      if (
        declaration.kind !== 'class' ||
        !declaration.customElement ||
        !declaration.tagName
      ) {
        continue;
      }

      components.push(parseDeclaration(declaration, packageName, generation));
    }
  }

  return components;
}

/**
 * Derive package name from a CEM module path.
 * "packages/button/sp-button.js" → "@spectrum-web-components/button"
 * "packages/action-bar/sp-action-bar.js" → "@spectrum-web-components/action-bar"
 * "tools/shared/src/focusable.js" → "@spectrum-web-components/shared"
 */
function derivePackageName(modulePath: string): string {
  const match = modulePath.match(/^(?:packages|tools)\/([^/]+)\//);
  if (match) {
    return `@spectrum-web-components/${match[1]}`;
  }
  return '@spectrum-web-components/unknown';
}

function parseDeclaration(
  decl: CEMDeclaration,
  packageName: string,
  generation: 'gen-1' | 'gen-2'
): ComponentAPI {
  const members = decl.members ?? [];

  return {
    tagName: decl.tagName!,
    className: decl.name,
    package: packageName,
    generation,
    description: decl.description ?? '',
    hasGen2Equivalent: false,
    migrationStatus: 'not-started',
    superclass: decl.superclass?.name ?? '',
    mixins: (decl.mixins ?? []).map((m) => m.name),
    properties: extractProperties(members),
    attributes: extractAttributes(decl),
    events: extractEvents(decl),
    slots: extractSlots(decl),
    cssCustomProperties: extractCSSProperties(decl),
    cssParts: extractCSSParts(decl),
    methods: extractMethods(members),
  };
}

function normalizeDeprecated(
  value: string | boolean | undefined
): false | { reason: string } {
  if (value === undefined || value === false) {
    return false;
  }
  if (value === true) {
    return { reason: '' };
  }
  return { reason: value };
}

function extractProperties(members: CEMMember[]): PropertyInfo[] {
  return members
    .filter(
      (m) =>
        m.kind === 'field' &&
        m.privacy !== 'private' &&
        m.privacy !== 'protected'
    )
    .map((m) => {
      const deprecated = normalizeDeprecated(m.deprecated);
      const inherited = m.inheritedFrom != null;

      const prop: PropertyInfo = {
        name: m.name,
        type: m.type?.text ?? '',
        description: m.description ?? '',
        reflects: m.reflects ?? false,
        deprecated,
      };

      if (m.default !== undefined) {
        prop.default = m.default;
      }
      if (m.attribute) {
        prop.attribute = m.attribute;
      }
      if (inherited) {
        prop.inherited = true;
        prop.inheritedFrom = m.inheritedFrom!.name;
      }

      return prop;
    });
}

function extractAttributes(decl: CEMDeclaration): AttributeInfo[] {
  return (decl.attributes ?? []).map((attr) => ({
    name: attr.name,
    type: attr.type?.text,
    fieldName: attr.fieldName ?? attr.name,
    description: attr.description,
    default: attr.default,
  }));
}

function extractEvents(decl: CEMDeclaration): EventInfo[] {
  return (decl.events ?? []).map((cemEvent) => {
    const info: EventInfo = {
      name: cemEvent.name,
      description: cemEvent.description ?? '',
    };
    if (cemEvent.inheritedFrom) {
      info.inherited = true;
    }
    return info;
  });
}

function extractSlots(decl: CEMDeclaration): SlotInfo[] {
  return (decl.slots ?? []).map((slot) => ({
    name: slot.name,
    description: slot.description ?? '',
  }));
}

function extractCSSProperties(decl: CEMDeclaration): CSSPropertyInfo[] {
  return (decl.cssProperties ?? []).map((prop) => {
    const info: CSSPropertyInfo = {
      name: prop.name,
    };
    if (prop.description) {
      info.description = prop.description;
    }
    if (prop.default) {
      info.default = prop.default;
    }
    return info;
  });
}

function extractCSSParts(decl: CEMDeclaration): CSSPartInfo[] {
  return (decl.cssParts ?? []).map((part) => {
    const info: CSSPartInfo = {
      name: part.name,
    };
    if (part.description) {
      info.description = part.description;
    }
    return info;
  });
}

function extractMethods(members: CEMMember[]): MethodInfo[] {
  return members
    .filter(
      (m) =>
        m.kind === 'method' &&
        m.privacy !== 'private' &&
        m.privacy !== 'protected'
    )
    .map((m) => {
      const method: MethodInfo = {
        name: m.name,
      };
      if (m.description) {
        method.description = m.description;
      }
      if (m.parameters) {
        method.parameters = m.parameters.map((p) => ({
          name: p.name,
          type: p.type?.text,
          description: p.description,
        }));
      }
      if (m.return) {
        method.return = { type: m.return.type.text };
      }
      return method;
    });
}
