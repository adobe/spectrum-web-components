# Spectrum Web Components Migration Log

This document tracks the migration of components and modules from SWC to Swan, in chronological order with the most recent migrations at the top. Each entry includes migration details, implementation notes, and any challenges that were encountered and resolved.

## Purpose

This log serves several purposes:

-   Tracking progress of the migration from SWC to Swan
-   Documenting design decisions and approaches taken during migration
-   Providing context for future migrations and maintenance
-   Helping team members understand the history and evolution of the codebase

## Migrations

### Base Foundation Modules (April 2024)

Several fundamental modules from the base package have been migrated to support the Swan architecture:

#### define-element

**Migration Details:**

-   Moved implementation from `tools/base/src/define-element.ts` to `swan/src/base/define-element.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility

**Implementation Notes:**

-   Provides the `defineElement` utility function for safely registering custom elements
-   Includes debugging support to detect and warn about element redefinition
-   Used by virtually all components in the library

#### decorators

**Migration Details:**

-   Moved implementation from `tools/base/src/decorators.ts` to `swan/src/base/decorators.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility

**Implementation Notes:**

-   Re-exports decorators from lit that are used throughout the component library
-   Includes decorators like `@property`, `@state`, `@query`, etc.

#### directive, async-directive, and html

**Migration Details:**

-   Moved implementations from the base package to corresponding files in swan/src/base/
-   Created shims in original locations that re-export from Swan

**Implementation Notes:**

-   These modules provide core functionality from lit that is used throughout the component library
-   The `directive` and `async-directive` modules support custom directives
-   The `html` module exports `nothing` and `render` from lit for template rendering

**Challenges Resolved:**

-   Ensured proper exports configuration in package.json for all modules
-   Maintained backward compatibility with existing imports in the codebase
-   Verified through comprehensive testing that the migrations did not introduce regressions

### condition-attribute-with-id (April 2024)

The `condition-attribute-with-id` module provides utility functions for managing attribute values with IDs, commonly used for accessibility attributes like `aria-describedby`.

**Migration Details:**

-   Moved implementation from `tools/base/src/condition-attribute-with-id.ts` to `swan/src/base/condition-attribute-with-id.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution

**Implementation Notes:**

-   Contains two primary utility functions:
    -   `conditionAttributeWithId`: Adds IDs to an attribute and returns a cleanup function
    -   `conditionAttributeWithoutId`: Removes IDs from an attribute
-   These utilities are used by components that need to manage ARIA attribute values, particularly for transient UI elements

**Challenges Resolved:**

-   Ensured proper package.json exports configuration for TypeScript resolution
-   Maintained the same API surface to preserve backward compatibility

### sizedMixin (April 2024)

The `sizedMixin` module provides a mixin function that adds size management functionality to components.

**Migration Details:**

-   Moved implementation from `tools/base/src/sizedMixin.ts` to `swan/src/base/sizedMixin.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution

**Implementation Notes:**

-   The mixin is used by various components to implement different size variants (s, m, l, xl, etc.)
-   Provides consistent size attribute management across the component library
-   Includes utility types and constants for size handling

**Challenges Resolved:**

-   Ensured proper package.json exports configuration for TypeScript resolution
-   Maintained the same API surface to preserve backward compatibility

### directives (April 2024)

The `directives` module provides a centralized place for re-exporting commonly used lit directives.

**Migration Details:**

-   Moved implementation from `tools/base/src/directives.ts` to `swan/src/base/directives.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution

**Implementation Notes:**

-   The module re-exports common lit directives used throughout the SWC ecosystem
-   Used by various components for features like conditional rendering and template repeating
-   Ensured both production and development builds correctly referenced the Swan implementation

**Challenges Resolved:**

-   Added proper package.json exports configuration to ensure the module could be resolved
-   Verified package exports were working properly through tests on components that depend on directives

### Build Infrastructure: Extension Rewrite Plugin (April 2024)

The extension rewrite plugin is a critical piece of the build infrastructure that handles path transformations to ensure proper module resolution.

**Enhancement Details:**

-   Extended functionality to support three types of module references:
    -   Static imports (`import ... from '...'`)
    -   Dynamic imports (`import('...')`)
    -   Re-exports (`export ... from '...'`)
-   Added a reusable helper function `rewritePathIfSamePackage` to reduce code duplication
-   Improved detection of intra-package imports

**Implementation Notes:**

-   The plugin ensures that modules referenced within the same package use the correct file extension (`.js` or `.dev.js`)
-   Critical for maintaining consistent behavior between production and development builds
-   Allows for proper implementation of the shim pattern used for migrated components

**Challenges Resolved:**

-   Fixed inconsistency where some module types weren't being properly transformed
-   Enhanced documentation to clarify the plugin's role in the build process
-   Verified functionality through tests with temporary files containing various import/export patterns

### streaming-listener (April 2024)

The `streaming-listener` directive provides a way to manage event sequences efficiently, such as handling a series of pointer events or input events.

**Migration Details:**

-   Moved implementation from `tools/base/src/streaming-listener.ts` to `swan/src/base/streaming-listener.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility
-   Temporarily preserved the original implementation as `streaming-listener.ts.orig` during migration for reference

**Implementation Notes:**

-   The directive is used by various components, including the slider component
-   Needed to ensure both production and development builds referenced the Swan implementation correctly
-   Extended the extension rewrite plugin to handle export statements in addition to imports

**Challenges Resolved:**

-   Initially encountered issues with the build process not correctly handling the re-exports
-   Enhanced the extension rewrite plugin with a `rewritePathIfSamePackage` helper function to ensure consistent handling of all module reference types

### Base (April 2024)

The `Base` module provides fundamental functionality that many components depend on.

**Migration Details:**

-   Moved implementation from `tools/base/src/Base.ts` to `swan/src/base/Base.ts`
-   Created a shim in SWC that re-exports from Swan to maintain backward compatibility
-   Temporarily preserved the original implementation as `Base.ts.orig` during the migration process

**Implementation Notes:**

-   Contains core functionality like the `SpectrumElement` class that most components extend
-   Needed to be carefully migrated due to its widespread use across the component library
-   Ensured that both production and development builds correctly reference the Swan implementation

### Slider Components (March-April 2024)

The slider components provide user interface elements for selecting values within a range.

**Migration Details:**

-   Factored out the core logic into base classes and controllers:
    -   `SliderBase`: Abstract base class with core properties and functionality
    -   `HandleController`: Advanced controller for managing handles and their states
    -   `SliderHandle`: Base implementation for slider handles
-   Moved implementation to `swan/src/components/slider/`

**Inheritance Model Redesign:**

-   **Before Migration:** `Slider` extended `SliderHandle` (inheriting handle functionality)
    -   This created a confusing dual relationship where Slider was both a handle and contained handles
    -   Slider acted as its own handle when no explicit handles were provided ("is-a" relationship)
    -   Slider managed other handles when explicitly provided ("has-a" relationship)
-   **After Migration:** `SliderBase` no longer extends `SliderHandle`
    -   Conceptually cleaner design with SliderBase always having a "has-a" relationship with handles
    -   Default handle is created and managed internally rather than through inheritance
    -   Clear separation between slider component responsibility and handle component responsibility

**Rendering Responsibility Shift:**

-   **Before Migration:** Rendering responsibility was split between Slider and HandleController
    -   HandleController generated HTML for certain UI elements
    -   Slider had its own rendering logic mixed with controller calls
-   **After Migration:** All rendering is performed by concrete Slider implementation
    -   HandleController exclusively manages state and behavior
    -   All HTML generation is centralized in the Slider component
    -   No template generation in HandleController, making it purely a controller

**Architecture Changes:**

-   **Separation of Logic and Rendering:** Completely separated behavioral logic from rendering code, placing the former in Swan and leaving the latter in SWC
-   **Controller-Based Design:** Enhanced the `HandleController` to manage complex state interactions between handles, making it the central coordinator for slider functionality
-   **Abstract Base Class Pattern:** Created an abstract `SliderBase` class that enforces implementation of required methods while providing shared functionality
-   **Model-Based Data Flow:** Established a clear model-based approach for managing handle state with proper formatted values and state updates

**Technical Challenges:**

-   **Value Formatting Complexity:** Refactored value formatting to handle internationalization properly, creating a caching system for number formatters
-   **Handle Management:** Improved handling of dynamically added/removed slider handles with a more robust mutation controller approach
-   **State Synchronization:** Implemented proper bidirectional state synchronization between the slider and its handles
-   **Accessibility Enhancements:** Maintained and improved ARIA support through the refactoring process

**Code Quality Improvements:**

-   Added comprehensive JSDoc comments to clarify component functionality
-   Reorganized methods into logical groupings (lifecycle, event handling, state management)
-   Improved naming for better code readability and maintainability
-   Enhanced type safety throughout the implementation

### Accordion Components (March 2024)

The accordion components provide collapsible content sections.

**Migration Details:**

-   Factored out the core logic into base classes:
    -   `AccordionBase` for the container component
    -   `AccordionItemBase` for individual accordion sections
-   Moved implementation to `swan/src/components/accordion/`

**Architecture Changes:**

-   Extracted core accordion behavior into abstract base classes, preserving all original functionality
-   Maintained the focus management logic using the `FocusGroupController` in the base implementation
-   Applied the same pattern of separating rendering from logic that was later used in the slider components
-   Defined clear abstract interfaces that subclasses must implement

**Implementation Notes:**

-   Used abstract base classes to enforce implementation of render methods in derived classes
-   Leveraged TypeScript features to ensure proper type safety across the implementation
-   Updated package.json to properly expose the new base component files
-   Maintained backward compatibility through careful property and method preservation

### Progress Bar (March 2024)

The progress bar component visualizes the completion status of an operation.

**Migration Details:**

-   Migrated implementation to `swan/src/components/progress-bar/`

**Implementation Notes:**

-   Maintains all original functionality while following Swan's architecture patterns

## General Migration Approach

Throughout these migrations, we've followed these principles:

1. **Separation of Concerns**

    - Move **only core logic** to Swan in the form of abstract base classes
    - Keep all concrete implementations, rendering logic, and assets in SWC
    - Ensure that Swan contains no rendering code, CSS, or component registration

2. **Clear Responsibility Division**

    - **Swan Components**: Abstract base classes with properties, methods, and lifecycle hooks
    - **SWC Components**: Concrete implementations that extend Swan base classes and add rendering
    - **SWC Assets**: All CSS, tests, stories, package metadata, changelogs remain in original locations

3. **Backward Compatibility**

    - Maintain shims and re-exports to prevent breaking changes
    - Preserve API signatures and behavior
    - Ensure tests continue to pass throughout the migration process

4. **Enhanced Architecture**

    - Employ abstract base classes with enforced render methods
    - Improve component organization with logical groupings
    - Strengthen typing and documentation

5. **Build System Support**

    - Extend tooling to support the migration pattern
    - Ensure consistent handling of imports and exports
    - Maintain development and production build variants

6. **Documentation**
    - Add clear comments about source of truth locations
    - Provide migration context through inline documentation
    - Create comprehensive migration logs and principles

Each migration follows this iterative approach:

1. Identify component for migration
2. Extract core logic to abstract base classes (moved to Swan)
3. Leave rendering, styles, and component definition in SWC
4. Create shims in SWC that reference Swan abstract base classes
5. Test thoroughly to ensure functionality is preserved
6. Document the migration process and any challenges

This carefully planned migration strategy ensures a smooth transition from the legacy SWC architecture to the more modular and maintainable Swan architecture, while minimizing disruption to consumers of the library. The end result is a clean separation where Swan provides the behavior foundation and SWC provides the implementation and presentation layer.

## Migration Techniques

### Temporary Files During Migration

During the migration process, we sometimes create temporary files to preserve original implementations or prepare for the transition:

-   **`.orig` files**: Created to preserve the original implementation before replacing it with a shim. These files are useful for reference during the migration process.
-   **`.shim` files**: Created as drafts for the shim implementation that will redirect to Swan components.

Both of these file types are temporary and are removed once the migration of a component is complete and tested. They should not be committed to the repository or left as artifacts in the codebase.

### Shim Implementation Pattern

The final implementation of a migrated component in SWC follows this pattern:

```typescript
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

/**
 * ⚠️ IMPORTANT: SOURCE OF TRUTH MOVED ⚠️
 *
 * The authoritative implementation is now in:
 * swan/src/path/to/component.ts
 *
 * This file is maintained for backward compatibility ONLY.
 * DO NOT modify this file directly; instead make changes in Swan.
 */

export * from '@spectrum-web-components/swan/src/path/to/component.js';
```

This pattern ensures clarity about where the source of truth resides while maintaining backward compatibility.
