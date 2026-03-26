# MCP Server for Spectrum Web Components — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional MCP server that exposes SWC component APIs (gen-1 + gen-2) to AI coding tools, enabling accurate code generation, usage validation, and gen-1 → gen-2 migration guidance.

**Architecture:** Standalone TypeScript package at `tools/mcp-server/` using the `@modelcontextprotocol/sdk`. At startup, the server reads Custom Elements Manifest (CEM) JSON files from `1st-gen/packages/*/custom-elements.json`, parses README code examples, and builds an in-memory `ComponentRegistry`. Six MCP tools query this registry via stdio transport.

**Tech Stack:** TypeScript, `@modelcontextprotocol/sdk`, `zod`, `node-html-parser`, `vitest`

---

## File Structure

````
tools/mcp-server/
├── package.json                    # Package config, dependencies, scripts
├── tsconfig.json                   # TypeScript config extending root
├── vitest.config.ts                # Vitest test runner config
├── src/
│   ├── index.ts                    # CLI entry point — starts stdio server
│   ├── server.ts                   # MCP server factory — registers all tools
│   ├── types.ts                    # All TypeScript interfaces (ComponentAPI, etc.)
│   ├── registry.ts                 # ComponentRegistry — unified component store
│   ├── cem-parser.ts               # Parses custom-elements.json → ComponentAPI[]
│   ├── readme-parser.ts            # Extracts HTML code blocks from README.md
│   ├── migration-parser.ts         # Parses migration status + gen-2 .types.ts
│   └── html-validator.ts           # Validates HTML against known component APIs
├── test/
│   ├── fixtures/
│   │   ├── button-cem.json         # Minimal CEM for sp-button with properties, slots, events
│   │   ├── badge-cem.json          # Minimal CEM for sp-badge
│   │   ├── sample-readme.md        # README with ```html demo code blocks
│   │   └── migration-status.md     # Migration status table fixture
│   ├── cem-parser.test.ts          # CEM parser unit tests
│   ├── registry.test.ts            # Registry query/filter tests
│   ├── readme-parser.test.ts       # README code extraction tests
│   ├── migration-parser.test.ts    # Migration status parsing tests
│   ├── html-validator.test.ts      # HTML validation logic tests
│   └── server.test.ts              # Integration: call MCP tools via in-process client
└── scripts/
    └── generate-cem.sh             # Runs CEM analysis for 1st-gen packages
````

---

## Task 1: Scaffold the MCP Server Package

**Files:**

- Create: `tools/mcp-server/package.json`
- Create: `tools/mcp-server/tsconfig.json`
- Create: `tools/mcp-server/vitest.config.ts`
- Create: `tools/mcp-server/src/types.ts`
- Modify: `package.json` (root — add `tools/*` workspace)

### Steps

- [ ] **Step 1: Add `tools/*` to root workspaces**

In the root `package.json`, add `"tools/*"` to the `workspaces` array:

```json
"workspaces": [
    "1st-gen",
    "1st-gen/packages/*",
    "1st-gen/projects/*",
    "1st-gen/tools/*",
    "2nd-gen",
    "2nd-gen/packages/*",
    "2nd-gen/packages/tools/*",
    "linters/*",
    "tools/*"
]
```

- [ ] **Step 2: Create `tools/mcp-server/package.json`**

```json
{
  "name": "@spectrum-web-components/mcp",
  "version": "0.1.0",
  "description": "MCP server for Spectrum Web Components — exposes component APIs to AI tools",
  "license": "Apache-2.0",
  "author": "Adobe",
  "type": "module",
  "bin": {
    "swc-mcp": "./dist/index.js"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.17.0",
    "node-html-parser": "^7.0.1",
    "zod": "^3.23.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 3: Create `tools/mcp-server/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "declaration": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "test"]
}
```

- [ ] **Step 4: Create `tools/mcp-server/vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    globals: true,
  },
});
```

- [ ] **Step 5: Create `tools/mcp-server/src/types.ts`**

This file defines all data model interfaces used throughout the server.

```typescript
/**
 * Summary info for a component — returned by list_components.
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
```

- [ ] **Step 6: Install dependencies and verify setup**

Run:

```bash
cd tools/mcp-server && yarn install
```

Then verify TypeScript compiles the types file:

```bash
cd tools/mcp-server && npx tsc --noEmit src/types.ts
```

Expected: no errors.

- [ ] **Step 7: Commit scaffold**

```bash
git add tools/mcp-server/package.json tools/mcp-server/tsconfig.json tools/mcp-server/vitest.config.ts tools/mcp-server/src/types.ts package.json yarn.lock
git commit -m "feat(mcp): scaffold MCP server package with types"
```

---

## Task 2: CEM Parser

**Files:**

- Create: `tools/mcp-server/test/fixtures/button-cem.json`
- Create: `tools/mcp-server/test/fixtures/badge-cem.json`
- Create: `tools/mcp-server/test/cem-parser.test.ts`
- Create: `tools/mcp-server/src/cem-parser.ts`

### Steps

- [ ] **Step 1: Create button CEM fixture**

Create `tools/mcp-server/test/fixtures/button-cem.json` — a minimal but realistic CEM for `sp-button`:

```json
{
  "schemaVersion": "1.0.0",
  "readme": "",
  "modules": [
    {
      "kind": "javascript-module",
      "path": "sp-button.js",
      "declarations": [
        {
          "kind": "class",
          "name": "Button",
          "description": "A button component with multiple variants and treatments.",
          "tagName": "sp-button",
          "customElement": true,
          "superclass": {
            "name": "SizedMixin(ButtonBase)",
            "module": "./ButtonBase.js"
          },
          "mixins": [
            {
              "name": "SizedMixin",
              "package": "@spectrum-web-components/shared"
            },
            {
              "name": "ObserveSlotText",
              "package": "@spectrum-web-components/shared"
            }
          ],
          "members": [
            {
              "kind": "field",
              "name": "variant",
              "type": {
                "text": "'accent' | 'primary' | 'secondary' | 'negative'"
              },
              "default": "'accent'",
              "description": "The visual variant to apply to this button.",
              "attribute": "variant",
              "reflects": true,
              "privacy": "public"
            },
            {
              "kind": "field",
              "name": "treatment",
              "type": { "text": "'fill' | 'outline'" },
              "default": "'fill'",
              "description": "The treatment (fill or outline) to apply.",
              "attribute": "treatment",
              "reflects": true,
              "privacy": "public"
            },
            {
              "kind": "field",
              "name": "quiet",
              "type": { "text": "boolean" },
              "default": "false",
              "description": "Applies quiet visual treatment.",
              "attribute": "quiet",
              "reflects": true,
              "privacy": "public",
              "deprecated": "Use treatment='outline' instead."
            },
            {
              "kind": "field",
              "name": "disabled",
              "type": { "text": "boolean" },
              "default": "false",
              "description": "Disable this control.",
              "attribute": "disabled",
              "reflects": true,
              "privacy": "public",
              "inheritedFrom": {
                "name": "Focusable",
                "module": "../../tools/shared/src/focusable.js"
              }
            },
            {
              "kind": "field",
              "name": "pending",
              "type": { "text": "boolean" },
              "default": "false",
              "description": "Sets the button into a pending/loading state.",
              "attribute": "pending",
              "reflects": true,
              "privacy": "public"
            },
            {
              "kind": "field",
              "name": "_isActive",
              "privacy": "private",
              "type": { "text": "boolean" }
            },
            {
              "kind": "method",
              "name": "focus",
              "description": "Focus this control.",
              "privacy": "public",
              "parameters": [
                { "name": "options", "type": { "text": "FocusOptions" } }
              ],
              "return": { "type": { "text": "void" } }
            }
          ],
          "attributes": [
            {
              "name": "variant",
              "type": { "text": "string" },
              "fieldName": "variant"
            },
            {
              "name": "treatment",
              "type": { "text": "string" },
              "fieldName": "treatment"
            },
            {
              "name": "quiet",
              "type": { "text": "boolean" },
              "fieldName": "quiet",
              "deprecated": "Use treatment='outline' instead."
            },
            {
              "name": "disabled",
              "type": { "text": "boolean" },
              "fieldName": "disabled"
            },
            {
              "name": "pending",
              "type": { "text": "boolean" },
              "fieldName": "pending"
            }
          ],
          "events": [
            { "name": "click", "description": "Standard click event." }
          ],
          "slots": [
            {
              "name": "",
              "description": "Text label of the Button (default slot)."
            },
            { "name": "icon", "description": "The icon to use for Button." }
          ],
          "cssProperties": [
            { "name": "--spectrum-button-background-color-default" },
            { "name": "--spectrum-button-border-color-default" }
          ],
          "cssParts": [
            { "name": "button", "description": "The inner button element." }
          ]
        }
      ],
      "exports": [
        {
          "kind": "custom-element-definition",
          "name": "sp-button",
          "declaration": { "name": "Button", "module": "sp-button.js" }
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Create badge CEM fixture**

Create `tools/mcp-server/test/fixtures/badge-cem.json` — minimal CEM for `sp-badge`:

```json
{
  "schemaVersion": "1.0.0",
  "readme": "",
  "modules": [
    {
      "kind": "javascript-module",
      "path": "sp-badge.js",
      "declarations": [
        {
          "kind": "class",
          "name": "Badge",
          "description": "A badge component for displaying small status indicators.",
          "tagName": "sp-badge",
          "customElement": true,
          "superclass": { "name": "SizedMixin(BadgeBase)" },
          "members": [
            {
              "kind": "field",
              "name": "variant",
              "type": {
                "text": "'accent' | 'informative' | 'neutral' | 'positive' | 'negative'"
              },
              "default": "'informative'",
              "description": "The variant of the badge.",
              "attribute": "variant",
              "reflects": true,
              "privacy": "public"
            },
            {
              "kind": "field",
              "name": "size",
              "type": { "text": "'s' | 'm' | 'l' | 'xl'" },
              "default": "'m'",
              "description": "The size of the badge.",
              "attribute": "size",
              "reflects": true,
              "privacy": "public"
            }
          ],
          "attributes": [
            {
              "name": "variant",
              "type": { "text": "string" },
              "fieldName": "variant"
            },
            {
              "name": "size",
              "type": { "text": "string" },
              "fieldName": "size"
            }
          ],
          "events": [],
          "slots": [
            { "name": "", "description": "Text content of the badge." },
            {
              "name": "icon",
              "description": "The icon to display in the badge."
            }
          ],
          "cssProperties": [],
          "cssParts": []
        }
      ],
      "exports": [
        {
          "kind": "custom-element-definition",
          "name": "sp-badge",
          "declaration": { "name": "Badge", "module": "sp-badge.js" }
        }
      ]
    }
  ]
}
```

- [ ] **Step 3: Write CEM parser tests**

Create `tools/mcp-server/test/cem-parser.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseCEM } from '../src/cem-parser.js';

const fixturesDir = resolve(import.meta.dirname, 'fixtures');

function loadFixture(name: string) {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf-8'));
}

describe('parseCEM', () => {
  it('extracts component API from button CEM', () => {
    const cem = loadFixture('button-cem.json');
    const components = parseCEM(
      cem,
      '@spectrum-web-components/button',
      'gen-1'
    );

    expect(components).toHaveLength(1);
    const button = components[0];

    expect(button.tagName).toBe('sp-button');
    expect(button.className).toBe('Button');
    expect(button.generation).toBe('gen-1');
    expect(button.package).toBe('@spectrum-web-components/button');
    expect(button.description).toBe(
      'A button component with multiple variants and treatments.'
    );
  });

  it('extracts properties and filters out private members', () => {
    const cem = loadFixture('button-cem.json');
    const [button] = parseCEM(cem, '@spectrum-web-components/button', 'gen-1');

    const propNames = button.properties.map((p) => p.name);
    expect(propNames).toContain('variant');
    expect(propNames).toContain('treatment');
    expect(propNames).toContain('disabled');
    expect(propNames).not.toContain('_isActive');
  });

  it('preserves inherited property annotations', () => {
    const cem = loadFixture('button-cem.json');
    const [button] = parseCEM(cem, '@spectrum-web-components/button', 'gen-1');

    const disabled = button.properties.find((p) => p.name === 'disabled');
    expect(disabled?.inherited).toBe(true);
    expect(disabled?.inheritedFrom).toBe('Focusable');
  });

  it('parses deprecated properties', () => {
    const cem = loadFixture('button-cem.json');
    const [button] = parseCEM(cem, '@spectrum-web-components/button', 'gen-1');

    const quiet = button.properties.find((p) => p.name === 'quiet');
    expect(quiet?.deprecated).toEqual({
      reason: "Use treatment='outline' instead.",
    });
  });

  it('extracts slots, events, cssProperties, cssParts, methods', () => {
    const cem = loadFixture('button-cem.json');
    const [button] = parseCEM(cem, '@spectrum-web-components/button', 'gen-1');

    expect(button.slots).toHaveLength(2);
    expect(button.slots[0].name).toBe('');
    expect(button.slots[1].name).toBe('icon');

    expect(button.events).toHaveLength(1);
    expect(button.events[0].name).toBe('click');

    expect(button.cssCustomProperties).toHaveLength(2);
    expect(button.cssParts).toHaveLength(1);

    expect(button.methods).toHaveLength(1);
    expect(button.methods[0].name).toBe('focus');
  });

  it('extracts attributes with fieldName mapping', () => {
    const cem = loadFixture('button-cem.json');
    const [button] = parseCEM(cem, '@spectrum-web-components/button', 'gen-1');

    expect(button.attributes.length).toBeGreaterThan(0);
    const variant = button.attributes.find((a) => a.name === 'variant');
    expect(variant?.fieldName).toBe('variant');
  });

  it('extracts superclass and mixins', () => {
    const cem = loadFixture('button-cem.json');
    const [button] = parseCEM(cem, '@spectrum-web-components/button', 'gen-1');

    expect(button.superclass).toBe('SizedMixin(ButtonBase)');
    expect(button.mixins).toContain('SizedMixin');
    expect(button.mixins).toContain('ObserveSlotText');
  });

  it('handles badge CEM with no events or CSS properties', () => {
    const cem = loadFixture('badge-cem.json');
    const components = parseCEM(cem, '@spectrum-web-components/badge', 'gen-1');

    expect(components).toHaveLength(1);
    const badge = components[0];
    expect(badge.tagName).toBe('sp-badge');
    expect(badge.events).toHaveLength(0);
    expect(badge.cssCustomProperties).toHaveLength(0);
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `cd tools/mcp-server && npx vitest run test/cem-parser.test.ts`
Expected: FAIL — `Cannot find module '../src/cem-parser.js'`

- [ ] **Step 5: Implement CEM parser**

Create `tools/mcp-server/src/cem-parser.ts`:

```typescript
import type {
  CEMManifest,
  CEMDeclaration,
  CEMMember,
  ComponentAPI,
  PropertyInfo,
  AttributeInfo,
  EventInfo,
  SlotInfo,
  CSSPropertyInfo,
  CSSPartInfo,
  MethodInfo,
} from './types.js';

/**
 * Parse a Custom Elements Manifest JSON into ComponentAPI objects.
 */
export function parseCEM(
  manifest: CEMManifest,
  packageName: string,
  generation: 'gen-1' | 'gen-2'
): ComponentAPI[] {
  const components: ComponentAPI[] = [];

  for (const mod of manifest.modules) {
    for (const decl of mod.declarations ?? []) {
      if (decl.kind === 'class' && decl.customElement && decl.tagName) {
        components.push(
          declarationToComponentAPI(decl, packageName, generation)
        );
      }
    }
  }

  return components;
}

function declarationToComponentAPI(
  decl: CEMDeclaration,
  packageName: string,
  generation: 'gen-1' | 'gen-2'
): ComponentAPI {
  const members = decl.members ?? [];
  const publicFields = members.filter(
    (m) =>
      m.kind === 'field' && m.privacy !== 'private' && m.privacy !== 'protected'
  );
  const publicMethods = members.filter(
    (m) =>
      m.kind === 'method' &&
      m.privacy !== 'private' &&
      m.privacy !== 'protected'
  );

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
    properties: publicFields.map(memberToProperty),
    attributes: (decl.attributes ?? []).map(cemAttributeToAttribute),
    events: (decl.events ?? []).map(cemEventToEvent),
    slots: (decl.slots ?? []).map(cemSlotToSlot),
    cssCustomProperties: (decl.cssProperties ?? []).map(cemCSSPropToCSS),
    cssParts: (decl.cssParts ?? []).map(cemCSSPartToPart),
    methods: publicMethods.map(memberToMethod),
  };
}

function memberToProperty(member: CEMMember): PropertyInfo {
  let deprecated: PropertyInfo['deprecated'] = false;
  if (member.deprecated) {
    deprecated = {
      reason:
        typeof member.deprecated === 'string'
          ? member.deprecated
          : 'Deprecated',
    };
  }

  return {
    name: member.name,
    type: member.type?.text ?? 'unknown',
    default: member.default,
    attribute: member.attribute,
    reflects: member.reflects ?? false,
    description: member.description ?? '',
    inherited: !!member.inheritedFrom,
    inheritedFrom: member.inheritedFrom?.name,
    deprecated,
  };
}

function cemAttributeToAttribute(attr: {
  name: string;
  type?: { text: string };
  default?: string;
  description?: string;
  fieldName?: string;
}): AttributeInfo {
  return {
    name: attr.name,
    type: attr.type?.text,
    fieldName: attr.fieldName ?? attr.name,
    description: attr.description,
    default: attr.default,
  };
}

function cemEventToEvent(event: {
  name: string;
  description?: string;
  inheritedFrom?: { name: string };
}): EventInfo {
  return {
    name: event.name,
    description: event.description ?? '',
    inherited: !!event.inheritedFrom,
  };
}

function cemSlotToSlot(slot: { name: string; description?: string }): SlotInfo {
  return {
    name: slot.name,
    description: slot.description ?? '',
  };
}

function cemCSSPropToCSS(prop: {
  name: string;
  description?: string;
  default?: string;
}): CSSPropertyInfo {
  return {
    name: prop.name,
    description: prop.description,
    default: prop.default,
  };
}

function cemCSSPartToPart(part: {
  name: string;
  description?: string;
}): CSSPartInfo {
  return {
    name: part.name,
    description: part.description,
  };
}

function memberToMethod(member: CEMMember): MethodInfo {
  return {
    name: member.name,
    description: member.description,
    parameters: member.parameters?.map((p) => ({
      name: p.name,
      type: p.type?.text,
      description: p.description,
    })),
    return: member.return ? { type: member.return.type.text } : undefined,
  };
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd tools/mcp-server && npx vitest run test/cem-parser.test.ts`
Expected: All 8 tests PASS.

- [ ] **Step 7: Commit**

```bash
git add tools/mcp-server/test/fixtures/ tools/mcp-server/test/cem-parser.test.ts tools/mcp-server/src/cem-parser.ts
git commit -m "feat(mcp): add CEM parser with tests"
```

---

## Task 3: Component Registry

**Files:**

- Create: `tools/mcp-server/test/registry.test.ts`
- Create: `tools/mcp-server/src/registry.ts`

### Steps

- [ ] **Step 1: Write registry tests**

Create `tools/mcp-server/test/registry.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ComponentRegistry } from '../src/registry.js';
import { parseCEM } from '../src/cem-parser.js';

const fixturesDir = resolve(import.meta.dirname, 'fixtures');

function loadFixture(name: string) {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf-8'));
}

describe('ComponentRegistry', () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry();
    const buttonComps = parseCEM(
      loadFixture('button-cem.json'),
      '@spectrum-web-components/button',
      'gen-1'
    );
    const badgeComps = parseCEM(
      loadFixture('badge-cem.json'),
      '@spectrum-web-components/badge',
      'gen-1'
    );
    for (const c of [...buttonComps, ...badgeComps]) {
      registry.add(c);
    }
  });

  it('lists all components', () => {
    const all = registry.list();
    expect(all).toHaveLength(2);
    const tagNames = all.map((c) => c.tagName);
    expect(tagNames).toContain('sp-button');
    expect(tagNames).toContain('sp-badge');
  });

  it('filters by generation', () => {
    const gen1 = registry.list({ generation: 'gen-1' });
    expect(gen1).toHaveLength(2);

    const gen2 = registry.list({ generation: 'gen-2' });
    expect(gen2).toHaveLength(0);
  });

  it('gets component by tagName', () => {
    const button = registry.get('sp-button');
    expect(button).toBeDefined();
    expect(button?.className).toBe('Button');
  });

  it('returns undefined for unknown tag', () => {
    expect(registry.get('sp-unknown')).toBeUndefined();
  });

  it('searches by property name', () => {
    const results = registry.search('variant');
    expect(results.length).toBeGreaterThanOrEqual(2);
    expect(results.some((r) => r.tagName === 'sp-button')).toBe(true);
    expect(results.some((r) => r.tagName === 'sp-badge')).toBe(true);
  });

  it('searches by description text', () => {
    const results = registry.search('pending');
    expect(results.some((r) => r.tagName === 'sp-button')).toBe(true);
  });

  it('searches scoped to specific sections', () => {
    const results = registry.search('icon', ['slots']);
    expect(results.every((r) => r.matchType === 'slot')).toBe(true);
  });

  it('adds examples to a component', () => {
    registry.addExamples('sp-button', [
      {
        title: 'Basic',
        html: '<sp-button>Click</sp-button>',
        source: 'readme',
      },
    ]);
    const examples = registry.getExamples('sp-button');
    expect(examples).toHaveLength(1);
    expect(examples[0].title).toBe('Basic');
  });

  it('marks gen-2 equivalents', () => {
    registry.markGen2Equivalent('sp-badge', '@adobe/spectrum-wc/badge');
    const badge = registry.get('sp-badge');
    expect(badge?.hasGen2Equivalent).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools/mcp-server && npx vitest run test/registry.test.ts`
Expected: FAIL — `Cannot find module '../src/registry.js'`

- [ ] **Step 3: Implement Component Registry**

Create `tools/mcp-server/src/registry.ts`:

```typescript
import type {
  ComponentAPI,
  ComponentSummary,
  ComponentExample,
  SearchResult,
} from './types.js';

type SearchSection =
  | 'properties'
  | 'events'
  | 'slots'
  | 'descriptions'
  | 'css-properties';

interface ListFilter {
  generation?: 'gen-1' | 'gen-2';
  category?: string;
}

export class ComponentRegistry {
  private components = new Map<string, ComponentAPI>();
  private examples = new Map<string, ComponentExample[]>();

  add(component: ComponentAPI): void {
    this.components.set(component.tagName, component);
  }

  get(tagName: string): ComponentAPI | undefined {
    return this.components.get(tagName);
  }

  list(filter?: ListFilter): ComponentSummary[] {
    let results = Array.from(this.components.values());

    if (filter?.generation) {
      results = results.filter((c) => c.generation === filter.generation);
    }

    return results.map(toSummary);
  }

  search(query: string, searchIn?: SearchSection[]): SearchResult[] {
    const q = query.toLowerCase();
    const sections = searchIn ?? [
      'properties',
      'events',
      'slots',
      'descriptions',
      'css-properties',
    ];
    const results: SearchResult[] = [];

    for (const comp of this.components.values()) {
      if (sections.includes('properties')) {
        for (const prop of comp.properties) {
          if (
            prop.name.toLowerCase().includes(q) ||
            prop.description.toLowerCase().includes(q)
          ) {
            results.push({
              tagName: comp.tagName,
              matchType: 'property',
              matchField: prop.name,
              description: prop.description,
              relevanceScore: prop.name.toLowerCase() === q ? 1.0 : 0.7,
            });
          }
        }
      }

      if (sections.includes('events')) {
        for (const event of comp.events) {
          if (
            event.name.toLowerCase().includes(q) ||
            event.description.toLowerCase().includes(q)
          ) {
            results.push({
              tagName: comp.tagName,
              matchType: 'event',
              matchField: event.name,
              description: event.description,
              relevanceScore: event.name.toLowerCase() === q ? 1.0 : 0.7,
            });
          }
        }
      }

      if (sections.includes('slots')) {
        for (const slot of comp.slots) {
          if (
            slot.name.toLowerCase().includes(q) ||
            slot.description.toLowerCase().includes(q)
          ) {
            results.push({
              tagName: comp.tagName,
              matchType: 'slot',
              matchField: slot.name || '(default)',
              description: slot.description,
              relevanceScore: slot.name.toLowerCase() === q ? 1.0 : 0.6,
            });
          }
        }
      }

      if (sections.includes('descriptions')) {
        if (comp.description.toLowerCase().includes(q)) {
          results.push({
            tagName: comp.tagName,
            matchType: 'description',
            matchField: comp.tagName,
            description: comp.description,
            relevanceScore: 0.5,
          });
        }
      }

      if (sections.includes('css-properties')) {
        for (const cssProp of comp.cssCustomProperties) {
          if (cssProp.name.toLowerCase().includes(q)) {
            results.push({
              tagName: comp.tagName,
              matchType: 'css-property',
              matchField: cssProp.name,
              description: cssProp.description ?? '',
              relevanceScore: 0.6,
            });
          }
        }
      }
    }

    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  addExamples(tagName: string, examples: ComponentExample[]): void {
    const existing = this.examples.get(tagName) ?? [];
    this.examples.set(tagName, [...existing, ...examples]);
  }

  getExamples(tagName: string, variant?: string): ComponentExample[] {
    const examples = this.examples.get(tagName) ?? [];
    if (!variant) return examples;
    return examples.filter(
      (e) =>
        e.title.toLowerCase().includes(variant.toLowerCase()) ||
        e.html.toLowerCase().includes(variant.toLowerCase())
    );
  }

  markGen2Equivalent(gen1TagName: string, _gen2Package: string): void {
    const comp = this.components.get(gen1TagName);
    if (comp) {
      comp.hasGen2Equivalent = true;
    }
  }

  allTagNames(): string[] {
    return Array.from(this.components.keys());
  }
}

function toSummary(c: ComponentAPI): ComponentSummary {
  return {
    tagName: c.tagName,
    className: c.className,
    package: c.package,
    generation: c.generation,
    description: c.description,
    hasGen2Equivalent: c.hasGen2Equivalent,
    migrationStatus: c.migrationStatus,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools/mcp-server && npx vitest run test/registry.test.ts`
Expected: All 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/mcp-server/src/registry.ts tools/mcp-server/test/registry.test.ts
git commit -m "feat(mcp): add ComponentRegistry with search and examples"
```

---

## Task 4: README Parser

**Files:**

- Create: `tools/mcp-server/test/fixtures/sample-readme.md`
- Create: `tools/mcp-server/test/readme-parser.test.ts`
- Create: `tools/mcp-server/src/readme-parser.ts`

### Steps

- [ ] **Step 1: Create README fixture**

Create `tools/mcp-server/test/fixtures/sample-readme.md`:

````markdown
## Description

An `<sp-button>` represents an action a user can take.

## Usage

### Installation

```
yarn add @spectrum-web-components/button
```

### Basic

```html demo
<sp-button variant="accent">Save</sp-button>
```

### With Icon

```html demo
<sp-button variant="primary">
  <sp-icon-edit slot="icon"></sp-icon-edit>
  Edit
</sp-button>
```

### Pending State

```html demo
<sp-button pending pending-label="Saving...">Save</sp-button>
```

### TypeScript Example

```typescript
import { Button } from '@spectrum-web-components/button';
```

### Multiple Variants

```html demo
<div style="display: flex; gap: 8px;">
  <sp-button variant="accent">Accent</sp-button>
  <sp-button variant="primary">Primary</sp-button>
  <sp-button variant="secondary">Secondary</sp-button>
  <sp-button variant="negative">Negative</sp-button>
</div>
```
````

- [ ] **Step 2: Write README parser tests**

Create `tools/mcp-server/test/readme-parser.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseReadmeExamples } from '../src/readme-parser.js';

const fixturesDir = resolve(import.meta.dirname, 'fixtures');

describe('parseReadmeExamples', () => {
  it('extracts html demo code blocks', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'sample-readme.md'),
      'utf-8'
    );
    const examples = parseReadmeExamples(content);

    expect(examples.length).toBe(4);
    expect(examples[0].title).toBe('Basic');
    expect(examples[0].html).toContain('sp-button');
    expect(examples[0].source).toBe('readme');
  });

  it('ignores non-html code blocks', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'sample-readme.md'),
      'utf-8'
    );
    const examples = parseReadmeExamples(content);
    const titles = examples.map((e) => e.title);
    expect(titles).not.toContain('Installation');
    expect(titles).not.toContain('TypeScript Example');
  });

  it('uses the preceding heading as the example title', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'sample-readme.md'),
      'utf-8'
    );
    const examples = parseReadmeExamples(content);
    expect(examples[1].title).toBe('With Icon');
    expect(examples[2].title).toBe('Pending State');
  });

  it('handles empty content', () => {
    const examples = parseReadmeExamples('');
    expect(examples).toHaveLength(0);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd tools/mcp-server && npx vitest run test/readme-parser.test.ts`
Expected: FAIL

- [ ] **Step 4: Implement README parser**

Create `tools/mcp-server/src/readme-parser.ts`:

````typescript
import type { ComponentExample } from './types.js';

/**
 * Extract HTML code examples from a component README.md.
 * Matches ```html demo code blocks and uses the preceding markdown heading as the title.
 */
export function parseReadmeExamples(content: string): ComponentExample[] {
  if (!content.trim()) return [];

  const examples: ComponentExample[] = [];
  const lines = content.split('\n');

  let lastHeading = 'Example';
  let inCodeBlock = false;
  let isHtmlDemo = false;
  let codeLines: string[] = [];

  for (const line of lines) {
    // Track the most recent heading
    const headingMatch = line.match(/^#{1,6}\s+(.+)/);
    if (headingMatch && !inCodeBlock) {
      lastHeading = headingMatch[1].trim();
      continue;
    }

    // Start of a code block
    if (line.trimStart().startsWith('```') && !inCodeBlock) {
      inCodeBlock = true;
      const lang = line.trimStart().slice(3).trim().toLowerCase();
      isHtmlDemo = lang === 'html demo' || lang === 'html-demo';
      codeLines = [];
      continue;
    }

    // End of a code block
    if (line.trimStart().startsWith('```') && inCodeBlock) {
      if (isHtmlDemo && codeLines.length > 0) {
        examples.push({
          title: lastHeading,
          html: codeLines.join('\n').trim(),
          source: 'readme',
        });
      }
      inCodeBlock = false;
      isHtmlDemo = false;
      codeLines = [];
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
    }
  }

  return examples;
}
````

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd tools/mcp-server && npx vitest run test/readme-parser.test.ts`
Expected: All 4 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/mcp-server/test/fixtures/sample-readme.md tools/mcp-server/test/readme-parser.test.ts tools/mcp-server/src/readme-parser.ts
git commit -m "feat(mcp): add README parser for HTML code examples"
```

---

## Task 5: Migration Parser

**Files:**

- Create: `tools/mcp-server/test/fixtures/migration-status.md`
- Create: `tools/mcp-server/test/migration-parser.test.ts`
- Create: `tools/mcp-server/src/migration-parser.ts`

### Steps

- [ ] **Step 1: Create migration status fixture**

Create `tools/mcp-server/test/fixtures/migration-status.md` — a subset of the real migration status file:

```markdown
# 2nd-Gen Component Migration Status

## Migration Progress

| Component       | Analyze            | Factor component   | Move to core       | Add data model     | Add 2nd-gen        | Render & style     | Add stories        |
| --------------- | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| Badge           | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Button          | :white_check_mark: |                    |                    |                    |                    |                    |                    |
| Divider         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Progress Circle | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Status Light    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Checkbox        | :white_check_mark: |                    |                    |                    |                    |                    |                    |
| Alert Banner    | :white_check_mark: | :white_check_mark: |                    |                    |                    |                    |                    |
```

- [ ] **Step 2: Write migration parser tests**

Create `tools/mcp-server/test/migration-parser.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseMigrationStatus } from '../src/migration-parser.js';

const fixturesDir = resolve(import.meta.dirname, 'fixtures');

describe('parseMigrationStatus', () => {
  it('parses fully migrated components as complete', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'migration-status.md'),
      'utf-8'
    );
    const statuses = parseMigrationStatus(content);

    const badge = statuses.find((s) => s.component === 'Badge');
    expect(badge).toBeDefined();
    expect(badge?.status).toBe('complete');
    expect(badge?.completedSteps).toHaveLength(7);
  });

  it('parses analyzed-only components', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'migration-status.md'),
      'utf-8'
    );
    const statuses = parseMigrationStatus(content);

    const button = statuses.find((s) => s.component === 'Button');
    expect(button?.status).toBe('analyzed');
    expect(button?.completedSteps).toEqual(['analyze']);
  });

  it('parses partially migrated components', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'migration-status.md'),
      'utf-8'
    );
    const statuses = parseMigrationStatus(content);

    const alertBanner = statuses.find((s) => s.component === 'Alert Banner');
    expect(alertBanner?.status).toBe('in-progress');
    expect(alertBanner?.completedSteps).toEqual([
      'analyze',
      'factor-component',
    ]);
  });

  it('returns correct total count', () => {
    const content = readFileSync(
      resolve(fixturesDir, 'migration-status.md'),
      'utf-8'
    );
    const statuses = parseMigrationStatus(content);
    expect(statuses).toHaveLength(7);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd tools/mcp-server && npx vitest run test/migration-parser.test.ts`
Expected: FAIL

- [ ] **Step 4: Implement migration parser**

Create `tools/mcp-server/src/migration-parser.ts`:

```typescript
import type { MigrationStep } from './types.js';

const ALL_STEPS: MigrationStep[] = [
  'analyze',
  'factor-component',
  'move-to-core',
  'add-data-model',
  'add-2nd-gen',
  'render-and-style',
  'add-stories',
];

export interface MigrationStatusEntry {
  component: string;
  status: 'not-started' | 'analyzed' | 'in-progress' | 'complete';
  completedSteps: MigrationStep[];
}

/**
 * Parse the migration status markdown table into structured entries.
 * Expects a markdown table with columns: Component | Analyze | Factor component | ... | Add stories
 * Checks for :white_check_mark: in each column.
 */
export function parseMigrationStatus(content: string): MigrationStatusEntry[] {
  const lines = content.split('\n');
  const entries: MigrationStatusEntry[] = [];

  let inTable = false;
  let headerPassed = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|')) {
      if (inTable) break; // End of table
      continue;
    }

    // Skip separator row (e.g., | --- | --- |)
    if (trimmed.includes('---')) {
      headerPassed = true;
      continue;
    }

    // Skip header row
    if (!inTable) {
      inTable = true;
      continue;
    }

    if (!headerPassed) continue;

    const cells = trimmed
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c !== '');

    if (cells.length < 2) continue;

    const component = cells[0];
    const completedSteps: MigrationStep[] = [];

    for (let i = 1; i < Math.min(cells.length, ALL_STEPS.length + 1); i++) {
      if (
        cells[i].includes('white_check_mark') ||
        cells[i].includes('✅') ||
        cells[i].includes('✓')
      ) {
        completedSteps.push(ALL_STEPS[i - 1]);
      }
    }

    let status: MigrationStatusEntry['status'];
    if (completedSteps.length === 0) {
      status = 'not-started';
    } else if (completedSteps.length === ALL_STEPS.length) {
      status = 'complete';
    } else if (completedSteps.length === 1 && completedSteps[0] === 'analyze') {
      status = 'analyzed';
    } else {
      status = 'in-progress';
    }

    entries.push({ component, status, completedSteps });
  }

  return entries;
}

/**
 * Convert a component display name to a gen-1 tag name.
 * "Badge" → "sp-badge", "Progress Circle" → "sp-progress-circle"
 */
export function componentNameToTagName(name: string): string {
  return 'sp-' + name.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Convert a component display name to a gen-2 package path.
 * "Badge" → "@adobe/spectrum-wc/badge"
 */
export function componentNameToGen2Package(name: string): string {
  return '@adobe/spectrum-wc/' + name.toLowerCase().replace(/\s+/g, '-');
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd tools/mcp-server && npx vitest run test/migration-parser.test.ts`
Expected: All 4 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/mcp-server/test/fixtures/migration-status.md tools/mcp-server/test/migration-parser.test.ts tools/mcp-server/src/migration-parser.ts
git commit -m "feat(mcp): add migration status parser"
```

---

## Task 6: HTML Validator

**Files:**

- Create: `tools/mcp-server/test/html-validator.test.ts`
- Create: `tools/mcp-server/src/html-validator.ts`

### Steps

- [ ] **Step 1: Write HTML validator tests**

Create `tools/mcp-server/test/html-validator.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { validateHTML } from '../src/html-validator.js';
import { ComponentRegistry } from '../src/registry.js';
import { parseCEM } from '../src/cem-parser.js';

const fixturesDir = resolve(import.meta.dirname, 'fixtures');

function loadFixture(name: string) {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf-8'));
}

describe('validateHTML', () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry();
    const buttonComps = parseCEM(
      loadFixture('button-cem.json'),
      '@spectrum-web-components/button',
      'gen-1'
    );
    for (const c of buttonComps) registry.add(c);
  });

  it('validates correct usage with no diagnostics', () => {
    const result = validateHTML(
      '<sp-button variant="accent">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  it('flags unknown attributes', () => {
    const result = validateHTML(
      '<sp-button color="red">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(false);
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].severity).toBe('error');
    expect(result.diagnostics[0].message).toContain('color');
  });

  it('warns about deprecated attributes', () => {
    const result = validateHTML('<sp-button quiet>Click</sp-button>', registry);
    expect(result.diagnostics.some((d) => d.severity === 'warning')).toBe(true);
    expect(result.diagnostics[0].message).toContain('deprecated');
  });

  it('ignores non-SWC elements', () => {
    const result = validateHTML(
      '<div class="wrapper"><p>hello</p></div>',
      registry
    );
    expect(result.valid).toBe(true);
    expect(result.diagnostics).toHaveLength(0);
  });

  it('validates multiple SWC elements in one snippet', () => {
    const result = validateHTML(
      '<sp-button variant="accent">OK</sp-button><sp-button color="blue">Bad</sp-button>',
      registry
    );
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].message).toContain('color');
  });

  it('allows standard HTML attributes on SWC elements', () => {
    const result = validateHTML(
      '<sp-button variant="accent" id="my-btn" class="primary" style="margin: 4px">Click</sp-button>',
      registry
    );
    expect(result.valid).toBe(true);
  });

  it('suggests similar attribute names for typos', () => {
    const result = validateHTML(
      '<sp-button varient="accent">Click</sp-button>',
      registry
    );
    expect(result.diagnostics[0].message).toContain('variant');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools/mcp-server && npx vitest run test/html-validator.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement HTML validator**

Create `tools/mcp-server/src/html-validator.ts`:

```typescript
import { parse } from 'node-html-parser';
import type { ComponentRegistry } from './registry.js';
import type { ValidationResult, ValidationDiagnostic } from './types.js';

/** Standard HTML attributes that are always valid on any element. */
const GLOBAL_HTML_ATTRS = new Set([
  'id',
  'class',
  'style',
  'title',
  'lang',
  'dir',
  'hidden',
  'tabindex',
  'slot',
  'part',
  'role',
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-hidden',
  'aria-live',
  'aria-atomic',
  'aria-busy',
  'aria-controls',
  'aria-current',
  'aria-disabled',
  'aria-expanded',
  'aria-haspopup',
  'aria-invalid',
  'aria-pressed',
  'aria-selected',
  'aria-valuenow',
  'aria-valuemin',
  'aria-valuemax',
  'aria-valuetext',
  'data-testid',
  'data-test',
]);

export function validateHTML(
  html: string,
  registry: ComponentRegistry
): ValidationResult {
  const diagnostics: ValidationDiagnostic[] = [];

  let root;
  try {
    root = parse(html);
  } catch {
    return {
      valid: false,
      diagnostics: [
        { severity: 'error', message: 'Failed to parse HTML snippet.' },
      ],
    };
  }

  const allElements = root.querySelectorAll('*');

  for (const el of allElements) {
    const tagName = el.rawTagName?.toLowerCase();
    if (!tagName) continue;

    // Only validate elements we know about (sp-* tags in the registry)
    const component = registry.get(tagName);
    if (!component) continue;

    // Build set of known attribute names for this component
    const knownAttrs = new Set(component.attributes.map((a) => a.name));

    for (const attrName of Object.keys(el.attributes)) {
      const lowerAttr = attrName.toLowerCase();

      // Skip global HTML attributes and data-* / aria-*
      if (
        GLOBAL_HTML_ATTRS.has(lowerAttr) ||
        lowerAttr.startsWith('data-') ||
        lowerAttr.startsWith('aria-')
      ) {
        continue;
      }

      if (knownAttrs.has(lowerAttr)) {
        // Check if it's deprecated
        const cemAttr = component.attributes.find((a) => a.name === lowerAttr);
        const prop = component.properties.find(
          (p) => p.attribute === lowerAttr
        );
        if (prop?.deprecated && prop.deprecated !== false) {
          diagnostics.push({
            severity: 'warning',
            message: `Attribute '${lowerAttr}' on <${tagName}> is deprecated. ${prop.deprecated.reason}`,
          });
        }
      } else {
        // Unknown attribute — find closest match
        const suggestion = findClosestMatch(lowerAttr, knownAttrs);
        const didYouMean = suggestion ? ` Did you mean '${suggestion}'?` : '';
        diagnostics.push({
          severity: 'error',
          message: `Unknown attribute '${lowerAttr}' on <${tagName}>.${didYouMean}`,
        });
      }
    }
  }

  return {
    valid: diagnostics.length === 0,
    diagnostics,
  };
}

/**
 * Simple Levenshtein-based suggestion for typos.
 */
function findClosestMatch(
  input: string,
  candidates: Set<string>
): string | null {
  let best: string | null = null;
  let bestDist = Infinity;

  for (const candidate of candidates) {
    const dist = levenshtein(input, candidate);
    if (dist < bestDist && dist <= 3) {
      bestDist = dist;
      best = candidate;
    }
  }

  return best;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools/mcp-server && npx vitest run test/html-validator.test.ts`
Expected: All 7 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/mcp-server/test/html-validator.test.ts tools/mcp-server/src/html-validator.ts
git commit -m "feat(mcp): add HTML validator with typo suggestions"
```

---

## Task 7: MCP Server — Wire Up All Tools

**Files:**

- Create: `tools/mcp-server/src/server.ts`
- Create: `tools/mcp-server/src/index.ts`
- Create: `tools/mcp-server/scripts/generate-cem.sh`

### Steps

- [ ] **Step 1: Create the MCP server factory**

Create `tools/mcp-server/src/server.ts` — registers all 6 tools with the MCP SDK:

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { ComponentRegistry } from './registry.js';
import type { MigrationInfo } from './types.js';
import { validateHTML } from './html-validator.js';

interface ServerDeps {
  registry: ComponentRegistry;
  migrationData: Map<string, MigrationInfo>;
}

export function createMCPServer(deps: ServerDeps): McpServer {
  const { registry, migrationData } = deps;

  const server = new McpServer({
    name: 'Spectrum Web Components',
    version: '0.1.0',
  });

  // Tool 1: list_components
  server.tool(
    'list_components',
    'Lists all available Spectrum Web Components with basic metadata. Filter by generation (gen-1, gen-2, all).',
    {
      generation: z
        .enum(['gen-1', 'gen-2', 'all'])
        .optional()
        .default('all')
        .describe('Filter by component generation'),
      category: z
        .string()
        .optional()
        .describe('Filter by category (e.g., "buttons", "inputs")'),
    },
    async ({ generation, category }) => {
      const filter =
        generation === 'all'
          ? { category }
          : { generation: generation as 'gen-1' | 'gen-2', category };
      const components = registry.list(filter);

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(components, null, 2),
          },
        ],
      };
    }
  );

  // Tool 2: get_component_api
  server.tool(
    'get_component_api',
    'Returns the full API surface for a single Spectrum Web Component: properties, attributes, events, slots, CSS custom properties, CSS parts, and methods.',
    {
      tagName: z.string().describe('Component tag name, e.g. "sp-button"'),
      sections: z
        .array(
          z.enum([
            'properties',
            'attributes',
            'events',
            'slots',
            'css-properties',
            'methods',
            'css-parts',
          ])
        )
        .optional()
        .describe('Filter to specific API sections'),
    },
    async ({ tagName, sections }) => {
      const component = registry.get(tagName);
      if (!component) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Component "${tagName}" not found. Use list_components to see available components.`,
            },
          ],
          isError: true,
        };
      }

      let result: Record<string, unknown> = { ...component };

      if (sections && sections.length > 0) {
        const sectionMap: Record<string, string> = {
          properties: 'properties',
          attributes: 'attributes',
          events: 'events',
          slots: 'slots',
          'css-properties': 'cssCustomProperties',
          'css-parts': 'cssParts',
          methods: 'methods',
        };
        const filtered: Record<string, unknown> = {
          tagName: component.tagName,
          className: component.className,
          package: component.package,
          generation: component.generation,
        };
        for (const s of sections) {
          const key = sectionMap[s];
          if (key && key in component) {
            filtered[key] = component[key as keyof typeof component];
          }
        }
        result = filtered;
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // Tool 3: get_component_examples
  server.tool(
    'get_component_examples',
    'Returns usage examples for a Spectrum Web Component extracted from README docs and Storybook stories.',
    {
      tagName: z.string().describe('Component tag name'),
      variant: z
        .string()
        .optional()
        .describe('Filter examples by variant or state'),
    },
    async ({ tagName, variant }) => {
      const component = registry.get(tagName);
      if (!component) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `Component "${tagName}" not found.`,
            },
          ],
          isError: true,
        };
      }

      const examples = registry.getExamples(tagName, variant);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(examples, null, 2),
          },
        ],
      };
    }
  );

  // Tool 4: search_components
  server.tool(
    'search_components',
    'Searches across all Spectrum Web Components by property name, event name, slot name, CSS property, or description text.',
    {
      query: z.string().describe('Free-text search query'),
      searchIn: z
        .array(
          z.enum([
            'properties',
            'events',
            'slots',
            'descriptions',
            'css-properties',
          ])
        )
        .optional()
        .describe('Limit search to specific API surfaces'),
    },
    async ({ query, searchIn }) => {
      const results = registry.search(query, searchIn);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }
  );

  // Tool 5: validate_usage
  server.tool(
    'validate_usage',
    'Validates an HTML snippet against known Spectrum Web Component APIs. Flags unknown attributes, invalid values, and deprecated APIs.',
    {
      html: z.string().describe('HTML snippet to validate'),
    },
    async ({ html }) => {
      const result = validateHTML(html, registry);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  // Tool 6: get_migration_info
  server.tool(
    'get_migration_info',
    'Returns migration guidance from gen-1 to gen-2 for a specific Spectrum Web Component, including API diffs and breaking changes.',
    {
      tagName: z.string().describe('Gen-1 tag name, e.g. "sp-badge"'),
    },
    async ({ tagName }) => {
      const info = migrationData.get(tagName);
      if (!info) {
        return {
          content: [
            {
              type: 'text' as const,
              text: `No migration info available for "${tagName}". The component may not have started the gen-2 migration process.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(info, null, 2),
          },
        ],
      };
    }
  );

  return server;
}
```

- [ ] **Step 2: Create the CLI entry point**

Create `tools/mcp-server/src/index.ts`:

```typescript
#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createMCPServer } from './server.js';
import { ComponentRegistry } from './registry.js';
import { parseCEM } from './cem-parser.js';
import { parseReadmeExamples } from './readme-parser.js';
import {
  parseMigrationStatus,
  componentNameToTagName,
  componentNameToGen2Package,
} from './migration-parser.js';
import type { MigrationInfo, MigrationStep } from './types.js';

function findMonorepoRoot(): string {
  // Check CLI arg
  const rootArg = process.argv.find((a) => a.startsWith('--root='));
  if (rootArg) return resolve(rootArg.split('=')[1]);

  // Walk up from CWD looking for the monorepo marker
  let dir = process.cwd();
  while (dir !== '/') {
    if (existsSync(join(dir, '1st-gen')) && existsSync(join(dir, '2nd-gen'))) {
      return dir;
    }
    dir = resolve(dir, '..');
  }

  // Fallback: assume CWD is the monorepo
  return process.cwd();
}

function loadGen1Components(
  registry: ComponentRegistry,
  monorepoRoot: string
): void {
  const packagesDir = join(monorepoRoot, '1st-gen', 'packages');
  if (!existsSync(packagesDir)) {
    console.error(
      `[swc-mcp] Warning: 1st-gen/packages not found at ${packagesDir}`
    );
    return;
  }

  const packages = readdirSync(packagesDir, { withFileTypes: true }).filter(
    (d) => d.isDirectory()
  );

  for (const pkg of packages) {
    const cemPath = join(packagesDir, pkg.name, 'custom-elements.json');
    if (!existsSync(cemPath)) continue;

    try {
      const cem = JSON.parse(readFileSync(cemPath, 'utf-8'));
      const packageName = `@spectrum-web-components/${pkg.name}`;
      const components = parseCEM(cem, packageName, 'gen-1');

      for (const comp of components) {
        registry.add(comp);
      }

      // Load README examples
      const readmePath = join(packagesDir, pkg.name, 'README.md');
      if (existsSync(readmePath)) {
        const readme = readFileSync(readmePath, 'utf-8');
        const examples = parseReadmeExamples(readme);
        for (const comp of components) {
          registry.addExamples(comp.tagName, examples);
        }
      }
    } catch (e) {
      console.error(
        `[swc-mcp] Warning: Failed to parse CEM for ${pkg.name}: ${e}`
      );
    }
  }
}

function loadMigrationData(monorepoRoot: string): Map<string, MigrationInfo> {
  const migrationMap = new Map<string, MigrationInfo>();

  const statusPath = join(
    monorepoRoot,
    'CONTRIBUTOR-DOCS',
    '03_project-planning',
    '02_workstreams',
    '02_2nd-gen-component-migration',
    '01_status.md'
  );

  if (!existsSync(statusPath)) {
    console.error('[swc-mcp] Warning: Migration status file not found.');
    return migrationMap;
  }

  const content = readFileSync(statusPath, 'utf-8');
  const entries = parseMigrationStatus(content);

  const ALL_STEPS: MigrationStep[] = [
    'analyze',
    'factor-component',
    'move-to-core',
    'add-data-model',
    'add-2nd-gen',
    'render-and-style',
    'add-stories',
  ];

  for (const entry of entries) {
    const gen1Tag = componentNameToTagName(entry.component);
    const gen2Pkg =
      entry.status === 'complete'
        ? componentNameToGen2Package(entry.component)
        : null;

    const info: MigrationInfo = {
      gen1TagName: gen1Tag,
      gen2Package: gen2Pkg,
      migrationStatus: entry.status,
      steps: ALL_STEPS,
      completedSteps: entry.completedSteps,
      breakingChanges: [],
      apiDiff: {
        addedProperties: [],
        removedProperties: [],
        changedTypes: [],
      },
    };

    migrationMap.set(gen1Tag, info);
  }

  return migrationMap;
}

async function main(): Promise<void> {
  const monorepoRoot = findMonorepoRoot();
  console.error(`[swc-mcp] Monorepo root: ${monorepoRoot}`);

  const registry = new ComponentRegistry();
  loadGen1Components(registry, monorepoRoot);

  const migrationData = loadMigrationData(monorepoRoot);

  // Mark gen-2 equivalents in the registry
  for (const [tagName, info] of migrationData) {
    if (info.gen2Package) {
      registry.markGen2Equivalent(tagName, info.gen2Package);
    }
  }

  const tagNames = registry.allTagNames();
  console.error(
    `[swc-mcp] Loaded ${tagNames.length} components. Starting MCP server...`
  );

  const server = createMCPServer({ registry, migrationData });
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error('[swc-mcp] Fatal error:', err);
  process.exit(1);
});
```

- [ ] **Step 3: Create CEM generation helper script**

Create `tools/mcp-server/scripts/generate-cem.sh`:

```bash
#!/usr/bin/env bash
# Generate Custom Elements Manifest JSON files for all 1st-gen packages.
# Run this before starting the MCP server if CEM files are not yet generated.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

echo "[swc-mcp] Generating CEM for 1st-gen packages..."
cd "$MONOREPO_ROOT/1st-gen"
yarn docs:analyze

echo "[swc-mcp] CEM generation complete."
echo "[swc-mcp] You can now start the MCP server:"
echo "  cd $MONOREPO_ROOT && node tools/mcp-server/dist/index.js"
```

Make it executable: `chmod +x tools/mcp-server/scripts/generate-cem.sh`

- [ ] **Step 4: Build and verify no TypeScript errors**

Run:

```bash
cd tools/mcp-server && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add tools/mcp-server/src/server.ts tools/mcp-server/src/index.ts tools/mcp-server/scripts/generate-cem.sh
git commit -m "feat(mcp): add MCP server with 6 tools and CLI entry point"
```

---

## Task 8: Integration Test

**Files:**

- Create: `tools/mcp-server/test/server.test.ts`

### Steps

- [ ] **Step 1: Write integration test**

Create `tools/mcp-server/test/server.test.ts` — tests the MCP server tools via direct function calls (not transport):

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ComponentRegistry } from '../src/registry.js';
import { parseCEM } from '../src/cem-parser.js';
import { parseReadmeExamples } from '../src/readme-parser.js';
import { validateHTML } from '../src/html-validator.js';
import type { MigrationInfo, MigrationStep } from '../src/types.js';

const fixturesDir = resolve(import.meta.dirname, 'fixtures');

function loadFixture(name: string) {
  return JSON.parse(readFileSync(resolve(fixturesDir, name), 'utf-8'));
}

describe('MCP Server Integration', () => {
  let registry: ComponentRegistry;
  let migrationData: Map<string, MigrationInfo>;

  beforeAll(() => {
    registry = new ComponentRegistry();

    // Load button
    const buttonComps = parseCEM(
      loadFixture('button-cem.json'),
      '@spectrum-web-components/button',
      'gen-1'
    );
    for (const c of buttonComps) registry.add(c);

    // Load badge
    const badgeComps = parseCEM(
      loadFixture('badge-cem.json'),
      '@spectrum-web-components/badge',
      'gen-1'
    );
    for (const c of badgeComps) registry.add(c);

    // Load README examples
    const readme = readFileSync(
      resolve(fixturesDir, 'sample-readme.md'),
      'utf-8'
    );
    const examples = parseReadmeExamples(readme);
    registry.addExamples('sp-button', examples);

    // Set up migration data
    const ALL_STEPS: MigrationStep[] = [
      'analyze',
      'factor-component',
      'move-to-core',
      'add-data-model',
      'add-2nd-gen',
      'render-and-style',
      'add-stories',
    ];
    migrationData = new Map();
    migrationData.set('sp-badge', {
      gen1TagName: 'sp-badge',
      gen2Package: '@adobe/spectrum-wc/badge',
      migrationStatus: 'complete',
      steps: ALL_STEPS,
      completedSteps: [...ALL_STEPS],
      breakingChanges: [
        {
          type: 'property-removed',
          name: 'quiet',
          description: "The 'quiet' property is removed in gen-2.",
        },
      ],
      apiDiff: {
        addedProperties: [],
        removedProperties: ['quiet'],
        changedTypes: [],
      },
    });
    registry.markGen2Equivalent('sp-badge', '@adobe/spectrum-wc/badge');
  });

  describe('list_components flow', () => {
    it('returns all components', () => {
      const all = registry.list();
      expect(all).toHaveLength(2);
    });

    it('badge shows hasGen2Equivalent=true', () => {
      const all = registry.list();
      const badge = all.find((c) => c.tagName === 'sp-badge');
      expect(badge?.hasGen2Equivalent).toBe(true);
    });
  });

  describe('get_component_api flow', () => {
    it('returns full API with all sections', () => {
      const api = registry.get('sp-button');
      expect(api).toBeDefined();
      expect(api?.properties.length).toBeGreaterThan(0);
      expect(api?.slots.length).toBeGreaterThan(0);
      expect(api?.events.length).toBeGreaterThan(0);
    });
  });

  describe('get_component_examples flow', () => {
    it('returns parsed README examples', () => {
      const examples = registry.getExamples('sp-button');
      expect(examples.length).toBeGreaterThan(0);
      expect(examples[0].source).toBe('readme');
    });
  });

  describe('search_components flow', () => {
    it('finds components with "variant" property', () => {
      const results = registry.search('variant');
      expect(results.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('validate_usage flow', () => {
    it('catches invalid attribute and suggests correct one', () => {
      const result = validateHTML(
        '<sp-button color="red" quiet>Click</sp-button>',
        registry
      );
      expect(result.valid).toBe(false);
      expect(result.diagnostics.length).toBeGreaterThanOrEqual(2);

      const errorDiag = result.diagnostics.find((d) => d.severity === 'error');
      expect(errorDiag?.message).toContain('color');
      expect(errorDiag?.message).toContain('variant');

      const warnDiag = result.diagnostics.find((d) => d.severity === 'warning');
      expect(warnDiag?.message).toContain('deprecated');
    });
  });

  describe('get_migration_info flow', () => {
    it('returns full migration info for sp-badge', () => {
      const info = migrationData.get('sp-badge');
      expect(info).toBeDefined();
      expect(info?.migrationStatus).toBe('complete');
      expect(info?.gen2Package).toBe('@adobe/spectrum-wc/badge');
      expect(info?.breakingChanges).toHaveLength(1);
    });

    it('returns undefined for non-migrated component', () => {
      expect(migrationData.get('sp-button')).toBeUndefined();
    });
  });
});
```

- [ ] **Step 2: Run all tests**

Run: `cd tools/mcp-server && npx vitest run`
Expected: All tests across all files PASS.

- [ ] **Step 3: Commit**

```bash
git add tools/mcp-server/test/server.test.ts
git commit -m "test(mcp): add integration test for all MCP tool flows"
```

---

## Task 9: Build, Generate CEM, and Manual Verification

**Files:**

- No new files — build and test the server end-to-end.

### Steps

- [ ] **Step 1: Build the TypeScript**

Run:

```bash
cd tools/mcp-server && npx tsc
```

Expected: `dist/` directory created with compiled JS files.

- [ ] **Step 2: Generate CEM for 1st-gen packages**

Run:

```bash
cd 1st-gen && yarn docs:analyze
```

This generates `custom-elements.json` in each package directory. If this command fails or isn't available, try:

```bash
cd 1st-gen && npx @custom-elements-manifest/analyzer analyze --config custom-elements-manifest.config.js
```

Verify at least one CEM file exists:

```bash
ls 1st-gen/packages/button/custom-elements.json
```

- [ ] **Step 3: Test the MCP server manually via stdio**

Start the server and send a JSON-RPC request to list tools:

```bash
cd /path/to/spectrum-web-components
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node tools/mcp-server/dist/index.js 2>/dev/null
```

Expected: JSON response listing all 6 tools (list_components, get_component_api, get_component_examples, search_components, validate_usage, get_migration_info).

- [ ] **Step 4: Test list_components via stdio**

```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"list_components","arguments":{"generation":"gen-1"}}}' | node tools/mcp-server/dist/index.js 2>/dev/null
```

Expected: JSON response with array of gen-1 component summaries.

- [ ] **Step 5: Test get_component_api via stdio**

```bash
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_component_api","arguments":{"tagName":"sp-button"}}}' | node tools/mcp-server/dist/index.js 2>/dev/null
```

Expected: JSON response with full sp-button API (properties, slots, events, etc.).

- [ ] **Step 6: Test validate_usage via stdio**

```bash
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"validate_usage","arguments":{"html":"<sp-button color=\"red\" quiet>Click</sp-button>"}}}' | node tools/mcp-server/dist/index.js 2>/dev/null
```

Expected: JSON response with `valid: false` and diagnostics for `color` (error) and `quiet` (deprecated warning).

- [ ] **Step 7: Add MCP config for Claude Code testing**

Add to the project's `.mcp.json` or Claude Code MCP settings:

```json
{
  "mcpServers": {
    "Spectrum Web Components": {
      "command": "node",
      "args": ["tools/mcp-server/dist/index.js"],
      "cwd": "/path/to/spectrum-web-components"
    }
  }
}
```

- [ ] **Step 8: Run all tests one final time**

```bash
cd tools/mcp-server && npx vitest run
```

Expected: All tests PASS.

- [ ] **Step 9: Final commit**

```bash
git add -A tools/mcp-server/dist/
git commit -m "feat(mcp): complete MCP server implementation — all 6 tools operational"
```

---

## Summary

| Task | What it builds                                        | Tests   |
| ---- | ----------------------------------------------------- | ------- |
| 1    | Package scaffold, types, workspace config             | —       |
| 2    | CEM parser (JSON → ComponentAPI)                      | 8 tests |
| 3    | Component Registry (store, query, search)             | 9 tests |
| 4    | README parser (code example extraction)               | 4 tests |
| 5    | Migration status parser                               | 4 tests |
| 6    | HTML validator (attribute checking, typo suggestions) | 7 tests |
| 7    | MCP server (6 tools wired to registry) + CLI entry    | —       |
| 8    | Integration test (all tool flows end-to-end)          | 6 tests |
| 9    | Build, CEM generation, manual stdio verification      | Manual  |

**Total: ~38 automated tests across 6 test files.**
