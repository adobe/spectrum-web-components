# MCP Server Architecture for Spectrum Web Components (Gen-1)

## Table of Contents

- [Overview](#overview)
- [Goals and Non-Goals](#goals-and-non-goals)
- [Repository Context](#repository-context)
- [Data Sources and API Extraction](#data-sources-and-api-extraction)
- [MCP Server Design](#mcp-server-design)
- [Tools (MCP Endpoints)](#tools-mcp-endpoints)
- [Resource URIs](#resource-uris)
- [Data Schema Definitions](#data-schema-definitions)
- [Example Tool Interactions](#example-tool-interactions)
- [Gen-2 Migration Path](#gen-2-migration-path)
- [Implementation Plan](#implementation-plan)

---

## Overview

This document describes the architecture for an **MCP (Model Context Protocol) server** that exposes the full API surface of **gen-1 Spectrum Web Components** to AI agents and tooling consumers. The server reads component metadata from the monorepo and serves it via the MCP protocol, enabling LLM-powered workflows for code generation, documentation lookup, migration assistance, and more.

### What is MCP?

MCP (Model Context Protocol) is an open standard that allows AI models to interact with external tools and data sources via a structured JSON-RPC interface. An MCP server exposes **Tools** (callable functions) and **Resources** (readable data) that clients (e.g., Claude, VS Code extensions) can consume.

---

## Goals and Non-Goals

### Goals

1. **Expose gen-1 component APIs** (properties, attributes, events, slots, CSS custom properties, methods) as structured, queryable data.
2. **Serve component usage examples** from Storybook stories and README docs.
3. **Provide migration hints** where gen-2 equivalents exist (Badge, Divider, Progress Circle, Status Light are fully migrated today).
4. **Design for gen-2 from day one** so the server can serve both generations without a rewrite.
5. **Enable consumer workflows**: code generation, linting/validation, accessibility checks, migration tooling.

### Non-Goals

- This MCP does **not** render or run components at runtime.
- This MCP does **not** replace Storybook or the documentation site.
- This MCP does **not** generate or modify source code inside the monorepo itself.

---

## Repository Context

The monorepo is split into two generation directories:

```
spectrum-web-components/
├── 1st-gen/
│   ├── packages/          # ~70+ component packages (sp-button, sp-dialog, etc.)
│   │   └── <component>/
│   │       ├── src/       # TypeScript source (LitElement classes)
│   │       ├── stories/   # Storybook stories (argTypes, args, templates)
│   │       ├── test/      # Web Test Runner tests
│   │       └── README.md  # Usage docs with live demo blocks
│   ├── tools/shared/src/  # Shared mixins (Focusable, LikeAnchor, ObserveSlotText, etc.)
│   ├── custom-elements-manifest.config.js  # CEM Analyzer config
│   └── scripts/
│       ├── custom-element-json.js          # CEM generation script
│       └── define-element-plugin.js        # Plugin for defineElement() calls
│
├── 2nd-gen/
│   └── packages/
│       ├── core/          # Shared base classes, mixins, types
│       │   └── components/
│       │       └── <component>/
│       │           ├── <Component>.base.ts   # Base rendering class
│       │           └── <Component>.types.ts  # Data model / type definitions
│       └── swc/           # Web component wrappers for core
│           └── cem.config.js
│
└── CONTRIBUTOR-DOCS/
    └── 03_project-planning/
        └── 02_workstreams/
            └── 02_2nd-gen-component-migration/
                └── 01_status.md  # Migration tracker
```

### Key Architectural Facts

| Aspect                   | Gen-1                                                               | Gen-2                                                |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------- |
| **Base class**           | `LitElement` via `@spectrum-web-components/base`                    | `LitElement` via `@spectrum-web-components/core`     |
| **Tag prefix**           | `sp-*`                                                              | `sp2-*` (planned)                                    |
| **CSS approach**         | `--spectrum-*` / `--system-*` custom properties, `.css.js` modules  | Spectrum 2 tokens, shared base styles                |
| **Metadata generation**  | Custom Elements Manifest (CEM) Analyzer                             | CEM Analyzer (shared config)                         |
| **API documentation**    | JSDoc tags (`@slot`, `@fires`, `@element`) + `@property` decorators | TypeScript type files (`.types.ts`) + JSDoc          |
| **Deprecation handling** | `window.__swc.warn()` in property setters                           | Clean break; S1 compat types exist during transition |

---

## Data Sources and API Extraction

The MCP server derives component API data from three complementary sources:

### Source 1: Custom Elements Manifest (CEM) - Primary

The CEM Analyzer (`custom-elements-manifest.config.js`) parses the TypeScript source and produces a `custom-elements.json` manifest per package. This is the **canonical machine-readable API**.

**What CEM captures:**

| API Surface           | CEM Field              | Example                                                                        |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| Properties            | `members[kind=field]`  | `{ name: "variant", type: { text: "ButtonVariants" }, default: "'accent'" }`   |
| Attributes            | `attributes[]`         | `{ name: "static-color", fieldName: "staticColor" }`                           |
| Methods               | `members[kind=method]` | `{ name: "setSelectionRange", parameters: [...] }`                             |
| Events                | `events[]`             | `{ name: "close", description: "Announces that the dialog has been closed." }` |
| Slots                 | `slots[]`              | `{ name: "icon", description: "The icon to use for Button" }`                  |
| CSS Custom Properties | `cssProperties[]`      | `{ name: "--spectrum-button-background-color-default" }`                       |
| CSS Parts             | `cssParts[]`           | `{ name: "button" }`                                                           |
| Superclass chain      | `superclass`           | `{ name: "ButtonBase", module: "./ButtonBase.js" }`                            |

**Generation command:**

```bash
cd 1st-gen && yarn docs:analyze
# runs: cem analyze --config custom-elements-manifest.config.js
```

### Source 2: JSDoc Tags in Source - Supplementary

JSDoc annotations on component classes provide human-readable descriptions that CEM ingests:

```typescript
/**
 * @element sp-dialog
 *
 * @slot hero - Accepts a hero image to display at the top of the dialog
 * @slot heading - Acts as the heading of the dialog
 * @slot - Content not addressed to a specific slot = main content
 * @slot footer - Content placed below the main content
 * @slot button - Button elements placed below content
 * @fires close - Announces that the dialog has been closed.
 */
export class Dialog extends ObserveSlotPresence(AlertDialog, [...]) { ... }
```

### Source 3: Storybook argTypes - Examples and Defaults

Story files (`packages/*/stories/index.ts`) define `argTypes` and `args` which encode property constraints, default values, and control types:

```typescript
export const argTypes = {
  variant: {
    name: 'variant',
    type: { name: 'string', required: false },
    description: 'The visual variant to apply to the button.',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'cta' },
    },
    control: {
      type: 'inline-radio',
      options: ['cta', 'accent', 'primary', 'secondary', 'negative'],
    },
  },
};
```

### Extraction Pipeline

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐
│  TypeScript  │────▶│ CEM Analyzer │────▶│ custom-elements.json │
│  Source +    │     │  + plugins   │     │  (per package)       │
│  JSDoc tags  │     └──────────────┘     └──────────┬───────────┘
└──────────────┘                                     │
                                                     ▼
┌──────────────┐                          ┌──────────────────────┐
│  Storybook   │─────────────────────────▶│   MCP Server         │
│  argTypes    │  (merged at server       │   (unified index)    │
└──────────────┘   startup)               └──────────────────────┘
                                                     │
┌──────────────┐                                     │
│  README.md   │─────────────────────────────────────┘
│  (per pkg)   │  (code examples extracted)
└──────────────┘
```

---

## MCP Server Design

### Transport

The server supports two transports:

| Transport      | Use Case                                               |
| -------------- | ------------------------------------------------------ |
| **stdio**      | Local usage with Claude Code, VS Code, CLI tools       |
| **SSE (HTTP)** | Remote/shared usage, CI pipelines, web-based consumers |

### Runtime

- **Language:** TypeScript (Node.js)
- **MCP SDK:** `@modelcontextprotocol/sdk` (official TypeScript SDK)
- **Location:** `tools/mcp-server/` in the monorepo

### Startup Sequence

```
1. Read all custom-elements.json files from 1st-gen/packages/*/
2. Read all custom-elements.json files from 2nd-gen/packages/*/ (if present)
3. Parse Storybook argTypes from 1st-gen/packages/*/stories/index.ts
4. Build unified ComponentRegistry (Map<tagName, ComponentAPI>)
5. Build gen-1 ↔ gen-2 migration map from registry overlap
6. Register MCP tools and resources
7. Begin accepting requests
```

---

## Tools (MCP Endpoints)

### Tool 1: `list_components`

Lists all available components with basic metadata.

**Parameters:**

| Param        | Type                          | Required              | Description                                                      |
| ------------ | ----------------------------- | --------------------- | ---------------------------------------------------------------- |
| `generation` | `"gen-1" \| "gen-2" \| "all"` | No (default: `"all"`) | Filter by generation                                             |
| `category`   | `string`                      | No                    | Filter by category (e.g., `"buttons"`, `"inputs"`, `"overlays"`) |

**Returns:** `ComponentSummary[]`

```json
[
  {
    "tagName": "sp-button",
    "className": "Button",
    "package": "@spectrum-web-components/button",
    "generation": "gen-1",
    "description": "A button component with multiple variants and treatments.",
    "hasGen2Equivalent": false,
    "migrationStatus": "analyzed"
  }
]
```

---

### Tool 2: `get_component_api`

Returns the full API surface for a single component.

**Parameters:**

| Param      | Type       | Required          | Description                                                                                         |
| ---------- | ---------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| `tagName`  | `string`   | Yes               | e.g., `"sp-button"`, `"sp-dialog"`                                                                  |
| `sections` | `string[]` | No (default: all) | Filter: `["properties", "attributes", "events", "slots", "css-properties", "methods", "css-parts"]` |

**Returns:** `ComponentAPI`

```json
{
  "tagName": "sp-button",
  "className": "Button",
  "package": "@spectrum-web-components/button",
  "generation": "gen-1",
  "description": "A button component with multiple variants and treatments.",
  "superclass": "SizedMixin(ButtonBase)",
  "mixins": ["SizedMixin", "ObserveSlotText", "LikeAnchor", "Focusable"],
  "properties": [
    {
      "name": "variant",
      "type": "ButtonVariants ('accent' | 'primary' | 'secondary' | 'negative' | 'white' | 'black')",
      "default": "'accent'",
      "attribute": "variant",
      "reflects": true,
      "description": "The visual variant to apply to this button.",
      "deprecated": false
    },
    {
      "name": "treatment",
      "type": "ButtonTreatments ('fill' | 'outline')",
      "default": "'fill'",
      "attribute": "treatment",
      "reflects": true,
      "description": "The treatment (fill or outline) to apply.",
      "deprecated": false
    },
    {
      "name": "pending",
      "type": "boolean",
      "default": "false",
      "attribute": "pending",
      "reflects": true,
      "description": "Sets the button into a pending/loading state.",
      "deprecated": false
    },
    {
      "name": "pendingLabel",
      "type": "string",
      "default": "'Pending'",
      "attribute": "pending-label",
      "reflects": false,
      "description": "Accessible label announced while in the pending state.",
      "deprecated": false
    },
    {
      "name": "disabled",
      "type": "boolean",
      "default": "false",
      "attribute": "disabled",
      "reflects": true,
      "description": "Disable this control. It will not receive focus or events.",
      "inherited": true,
      "inheritedFrom": "Focusable"
    },
    {
      "name": "quiet",
      "type": "boolean",
      "default": "false",
      "attribute": "quiet",
      "reflects": true,
      "description": "Applies a quiet/minimal visual treatment.",
      "deprecated": {
        "reason": "Use treatment='outline' or variant='secondary' instead.",
        "since": "1.0.0"
      }
    }
  ],
  "attributes": [
    { "name": "variant", "fieldName": "variant" },
    { "name": "treatment", "fieldName": "treatment" },
    { "name": "pending", "fieldName": "pending" },
    { "name": "pending-label", "fieldName": "pendingLabel" },
    { "name": "static-color", "fieldName": "staticColor" },
    { "name": "disabled", "fieldName": "disabled" },
    { "name": "href", "fieldName": "href" },
    { "name": "target", "fieldName": "target" }
  ],
  "events": [
    {
      "name": "click",
      "description": "Standard click event.",
      "inherited": true
    }
  ],
  "slots": [
    { "name": "", "description": "Text label of the Button (default slot)." },
    { "name": "icon", "description": "The icon to use for Button." }
  ],
  "cssCustomProperties": [
    { "name": "--spectrum-button-background-color-default" },
    { "name": "--spectrum-button-border-color-default" },
    { "name": "--spectrum-button-content-color-default" },
    { "name": "--spectrum-icon-size" }
  ],
  "cssParts": [],
  "methods": []
}
```

---

### Tool 3: `get_component_examples`

Returns usage examples extracted from README and Storybook stories.

**Parameters:**

| Param     | Type     | Required | Description                      |
| --------- | -------- | -------- | -------------------------------- |
| `tagName` | `string` | Yes      | Component tag name               |
| `variant` | `string` | No       | Filter examples by variant/state |

**Returns:** `ComponentExample[]`

```json
[
  {
    "title": "Default accent button",
    "html": "<sp-button variant=\"accent\">Save</sp-button>",
    "source": "readme"
  },
  {
    "title": "Button with icon",
    "html": "<sp-button variant=\"primary\">\n  <sp-icon-edit slot=\"icon\"></sp-icon-edit>\n  Edit\n</sp-button>",
    "source": "storybook"
  },
  {
    "title": "Pending state",
    "html": "<sp-button pending pending-label=\"Saving...\">Save</sp-button>",
    "source": "storybook"
  }
]
```

---

### Tool 4: `get_migration_info`

Returns migration guidance from gen-1 to gen-2 for a specific component.

**Parameters:**

| Param     | Type     | Required | Description                         |
| --------- | -------- | -------- | ----------------------------------- |
| `tagName` | `string` | Yes      | Gen-1 tag name (e.g., `"sp-badge"`) |

**Returns:** `MigrationInfo`

```json
{
  "gen1TagName": "sp-badge",
  "gen2TagName": "sp2-badge",
  "migrationStatus": "complete",
  "steps": [
    "analyze",
    "factor-component",
    "move-to-core",
    "add-data-model",
    "add-2nd-gen",
    "render-and-style",
    "add-stories"
  ],
  "completedSteps": [
    "analyze",
    "factor-component",
    "move-to-core",
    "add-data-model",
    "add-2nd-gen",
    "render-and-style",
    "add-stories"
  ],
  "breakingChanges": [
    {
      "type": "property-removed",
      "name": "quiet",
      "description": "The 'quiet' property is removed in gen-2."
    },
    {
      "type": "variant-changed",
      "name": "variant",
      "description": "Gen-2 adds new color variants: 'pink', 'turquoise', 'brown', 'cinnamon', 'silver'."
    }
  ],
  "apiDiff": {
    "addedProperties": [],
    "removedProperties": ["quiet"],
    "changedTypes": [
      {
        "property": "variant",
        "gen1Type": "BadgeVariantS1",
        "gen2Type": "BadgeVariantS2 (adds: pink, turquoise, brown, cinnamon, silver)"
      }
    ]
  }
}
```

---

### Tool 5: `search_components`

Searches across all components by property name, event name, slot name, or description text.

**Parameters:**

| Param      | Type       | Required          | Description                                                           |
| ---------- | ---------- | ----------------- | --------------------------------------------------------------------- |
| `query`    | `string`   | Yes               | Free-text search query                                                |
| `searchIn` | `string[]` | No (default: all) | `["properties", "events", "slots", "descriptions", "css-properties"]` |

**Returns:** `SearchResult[]`

```json
[
  {
    "tagName": "sp-textfield",
    "matchType": "property",
    "matchField": "placeholder",
    "description": "Text that appears in the form control when it has no value set",
    "relevanceScore": 0.95
  }
]
```

---

### Tool 6: `validate_usage`

Validates a snippet of HTML against the component's known API. Flags unknown attributes, invalid property values, and missing required slots.

**Parameters:**

| Param  | Type     | Required | Description              |
| ------ | -------- | -------- | ------------------------ |
| `html` | `string` | Yes      | HTML snippet to validate |

**Returns:** `ValidationResult`

```json
{
  "valid": false,
  "diagnostics": [
    {
      "severity": "error",
      "message": "Unknown attribute 'color' on <sp-button>. Did you mean 'variant'?",
      "line": 1,
      "column": 12
    },
    {
      "severity": "warning",
      "message": "Attribute 'quiet' on <sp-button> is deprecated. Use treatment='outline' instead.",
      "line": 1,
      "column": 24
    }
  ]
}
```

---

## Resource URIs

MCP Resources provide read-only data accessible via URI patterns.

| URI Pattern                          | Description                                         |
| ------------------------------------ | --------------------------------------------------- |
| `swc://components`                   | Full list of all component tag names and packages   |
| `swc://component/{tagName}`          | Complete API for a single component                 |
| `swc://component/{tagName}/readme`   | Raw README.md content for a component               |
| `swc://component/{tagName}/examples` | All usage examples for a component                  |
| `swc://migration/{tagName}`          | Migration info for a gen-1 component                |
| `swc://migration/status`             | Full migration status table (all components)        |
| `swc://types/{typeName}`             | TypeScript type definition (e.g., `ButtonVariants`) |

---

## Data Schema Definitions

### ComponentSummary

```typescript
interface ComponentSummary {
  tagName: string; // "sp-button"
  className: string; // "Button"
  package: string; // "@spectrum-web-components/button"
  generation: 'gen-1' | 'gen-2';
  description: string;
  hasGen2Equivalent: boolean;
  migrationStatus: 'not-started' | 'analyzed' | 'in-progress' | 'complete';
}
```

### ComponentAPI

```typescript
interface ComponentAPI extends ComponentSummary {
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
```

### PropertyInfo

```typescript
interface PropertyInfo {
  name: string;
  type: string;
  default?: string;
  attribute?: string; // HTML attribute name (may differ: pendingLabel -> "pending-label")
  reflects: boolean;
  description: string;
  inherited?: boolean;
  inheritedFrom?: string; // Mixin or superclass name
  deprecated?:
    | false
    | {
        reason: string;
        since?: string;
      };
}
```

### EventInfo

```typescript
interface EventInfo {
  name: string; // "close", "input", "change"
  description: string;
  bubbles?: boolean;
  composed?: boolean;
  cancelable?: boolean;
  detail?: string; // Type of CustomEvent detail, if applicable
  inherited?: boolean;
}
```

### SlotInfo

```typescript
interface SlotInfo {
  name: string; // "" for default slot
  description: string;
}
```

### MigrationInfo

```typescript
interface MigrationInfo {
  gen1TagName: string;
  gen2TagName: string | null; // null if gen-2 doesn't exist yet
  migrationStatus: 'not-started' | 'analyzed' | 'in-progress' | 'complete';
  steps: MigrationStep[];
  completedSteps: MigrationStep[];
  breakingChanges: BreakingChange[];
  apiDiff: {
    addedProperties: string[];
    removedProperties: string[];
    changedTypes: TypeChange[];
  };
}

type MigrationStep =
  | 'analyze'
  | 'factor-component'
  | 'move-to-core'
  | 'add-data-model'
  | 'add-2nd-gen'
  | 'render-and-style'
  | 'add-stories';
```

---

## Example Tool Interactions

### Scenario 1: AI generates a button component

```
User prompt: "Create a primary outline button with an edit icon"

Agent calls: get_component_api({ tagName: "sp-button", sections: ["properties", "slots"] })

Agent receives property and slot info, then generates:

  <sp-button variant="primary" treatment="outline">
    <sp-icon-edit slot="icon"></sp-icon-edit>
    Edit
  </sp-button>
```

### Scenario 2: Consumer checks migration readiness

```
Agent calls: get_migration_info({ tagName: "sp-badge" })

Agent receives: migrationStatus: "complete", gen2TagName: "sp2-badge",
  breakingChanges: [{ type: "variant-changed", ... }]

Agent advises: "sp-badge is fully migrated to sp2-badge. Note that gen-2
  adds 5 new color variants. The 'quiet' property is removed."
```

### Scenario 3: Validate consumer markup

```
Agent calls: validate_usage({ html: '<sp-button color="red" quiet>Click</sp-button>' })

Agent receives diagnostics:
  - error: Unknown attribute 'color'. Did you mean 'variant'?
  - warning: 'quiet' is deprecated. Use treatment='outline'.
```

---

## Gen-2 Migration Path

### Design Decisions for Forward Compatibility

The MCP server is designed so that gen-2 support is **additive, not a rewrite**.

#### 1. Unified Registry with Generation Tags

Every component entry carries a `generation` field. When gen-2 components are added, they appear as separate entries:

```
sp-badge   -> generation: "gen-1"
sp2-badge  -> generation: "gen-2"
```

The `list_components` tool accepts a `generation` filter, so consumers can query either or both.

#### 2. Shared CEM Config

The CEM config at `1st-gen/custom-elements-manifest.config.js` already includes gen-2 globs:

```javascript
globs: [
  '**/sp-*.ts', // gen-1
  '../2nd-gen/packages/core/components/**/*.ts', // gen-2
];
```

This means gen-2 components are analyzed by the same pipeline once they exist.

#### 3. Type Files as Data Model Source (Gen-2)

Gen-2 components define their data model in explicit `.types.ts` files (e.g., `Badge.types.ts`). These files export:

- Valid property value arrays (e.g., `BADGE_VARIANTS_S2`)
- TypeScript union types (e.g., `BadgeVariantS2`)
- Size constraints (e.g., `BADGE_VALID_SIZES`)

The MCP server can parse these files to provide richer type information for gen-2 than CEM alone provides.

#### 4. Migration Tool Grows Over Time

As more components complete the 7-step migration process (Analyze -> Factor -> Move to Core -> Add Data Model -> Add 2nd-Gen -> Render & Style -> Add Stories), the `get_migration_info` tool automatically picks up new data.

**Current fully-migrated components (all 7 steps complete):**

- Badge (`sp-badge` -> `sp2-badge`)
- Divider (`sp-divider` -> `sp2-divider`)
- Progress Circle (`sp-progress-circle` -> `sp2-progress-circle`)
- Status Light (`sp-status-light` -> `sp2-status-light`)

#### 5. Consumer Migration Workflow

The intended consumer experience for migrating from gen-1 to gen-2:

```
1. query: list_components({ generation: "gen-1" })
   -> get full list of gen-1 components in use

2. query: get_migration_info({ tagName: "sp-badge" })
   -> learn that gen-2 exists, see breaking changes

3. query: get_component_api({ tagName: "sp2-badge" })
   -> get the gen-2 API to rewrite against

4. query: validate_usage({ html: "<sp2-badge ...>" })
   -> validate the rewritten markup
```

Gen-1 and gen-2 components can coexist in the same project during migration (per the project strategy doc), so this incremental approach is fully supported.

---

## Implementation Plan

### Phase 1: Core Server + CEM Integration

- [ ] Scaffold MCP server in `tools/mcp-server/` using `@modelcontextprotocol/sdk`
- [ ] Implement CEM JSON parser to build `ComponentRegistry`
- [ ] Implement `list_components` tool
- [ ] Implement `get_component_api` tool
- [ ] Wire up stdio transport
- [ ] Add to `package.json` scripts: `"mcp": "node tools/mcp-server/index.js"`

### Phase 2: Examples + Search

- [ ] Parse README.md files for code examples
- [ ] Parse Storybook `argTypes`/`args` for defaults and constraints
- [ ] Implement `get_component_examples` tool
- [ ] Implement `search_components` tool

### Phase 3: Validation + Migration

- [ ] Implement `validate_usage` tool (HTML parser + schema check)
- [ ] Parse migration status from `CONTRIBUTOR-DOCS` or from gen-2 presence
- [ ] Implement `get_migration_info` tool
- [ ] Parse `.types.ts` files for gen-2 type data

### Phase 4: SSE Transport + CI

- [ ] Add HTTP/SSE transport for remote consumers
- [ ] Integrate CEM regeneration into the build pipeline (`yarn docs:analyze`)
- [ ] Add tests for all MCP tools
- [ ] Publish as `@spectrum-web-components/mcp-server`

---

## Appendix: Component Mixin Hierarchy (Gen-1)

Understanding the mixin chain is critical for the MCP server to correctly report inherited properties:

```
LitElement
└── SpectrumElement
    ├── Focusable              (disabled, tabIndex, autofocus)
    │   ├── LikeAnchor         (href, target, rel, download)
    │   │   └── ButtonBase     (type, label, active, noWrap)
    │   │       └── Button     (variant, treatment, pending, pendingLabel, quiet, staticColor)
    │   └── Textfield          (value, placeholder, pattern, required, valid, invalid, ...)
    ├── ObserveSlotText        (slotHasContent tracking)
    ├── ObserveSlotPresence    (slotContentIsPresent tracking)
    └── SizedMixin             (size: 's' | 'm' | 'l' | 'xl')
```

The MCP server resolves this chain so that `get_component_api({ tagName: "sp-button" })` includes `disabled` (from `Focusable`) and `href` (from `LikeAnchor`) with correct `inheritedFrom` annotations.
