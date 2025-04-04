# Spectrum Web Components Migration Log

This document tracks the migration of components and modules from SWC to Swan, in chronological order with the most recent migrations at the top. Each entry includes migration details, implementation notes, and any challenges that were encountered and resolved.

## Purpose

This log serves several purposes:

-   Tracking progress of the migration from SWC to Swan
-   Documenting design decisions and approaches taken during migration
-   Providing context for future migrations and maintenance
-   Helping team members understand the history and evolution of the codebase

## Migrations

### Phase 3 Complete: Reactive-Controllers Package Migration (April 2024)

We have successfully completed Phase 3 of our migration plan, moving the reactive-controllers package to Swan:

**Migration Details:**

-   Used the `git mv` approach to preserve complete git history
-   Migrated the following controllers to Swan:
    -   `ColorController`
    -   `DependencyManger`
    -   `ElementResolution`
    -   `FocusGroup`
    -   `LanguageResolution`
    -   `MatchMedia`
    -   `RovingTabindex`
    -   `SystemContextResolution`
-   Left `PendingState` in its original location due to progress-circle dependency as per migration plan
-   Created shims in the original locations that re-export from Swan

**Implementation Notes:**

-   Applied the git-move migration strategy documented in our [step-by-step guide](./MIGRATION-PRINCIPLES.md#git-move-migration-step-by-step-guide)
-   Fixed minor linting issues in migrated files, particularly adding braces to single-line if statements
-   Updated package.json with proper export entries for all controllers
-   Fixed build process issues related to index.ts detection that affected RovingTabindex

**Testing and Verification:**

-   Ran focused tests on the reactive-controllers package: `yarn test:focus reactive-controllers`
-   Verified all 39 tests passed across Firefox, Chromium, and Webkit
-   Confirmed proper generation of JavaScript files and declaration files

**Challenges Resolved:**

-   Fixed an issue in the build process where files containing "index" in their name (e.g., RovingTabindex) were incorrectly identified as index files
-   Improved build script to properly handle file identification with exact matching rather than substring checks
-   Addressed circular dependency risks by maintaining proper migration order (copy, move, restore, update, build, shim)
-   Verified that all files were being processed correctly through the build pipeline

**Next Steps:**

-   Proceed with the remaining migration phases as outlined in the migration plan
-   Apply the learned techniques and best practices to future migrations
-   Continue monitoring for any potential issues in components that depend on reactive-controllers

### Change in Migration Approach: Using Git Move for Phase 3 (April 2024)

For Phase 3 of our migration plan (Reactive-Controllers package), we've decided to update our approach to preserve git history:

**Change Details:**

-   Previous phases used manual copying or filesystem operations to move files
-   Phase 3 will use `git mv` to move files from SWC to Swan locations
-   This preserves the complete git history of each file

**Implementation Notes:**

-   The command `git mv original/path/file.ts new/path/file.ts` will be used for each file
-   After moving, import paths will be updated to reference Swan paths
-   Only import/export statements will be modified; all other code will remain unchanged
-   This approach makes it easier to trace the evolution of files over time

**Rationale:**

-   Preserving git history provides better visibility into code evolution
-   Makes it easier to understand original authorship and intent
-   Helps with debugging and analysis by maintaining a continuous history
-   Will be particularly valuable if we proceed with this migration approach for production

**Impact on Proof-of-Concept:**

-   Earlier phases (Base and Shared packages) will not be retroactively changed
-   This inconsistency is acceptable in the proof-of-concept phase
-   If we proceed with production implementation, we will use the git move approach consistently

### Dependency Cleanup: Removing Direct Dependencies on SWC Packages (April 2024)

After migrating modules from the SWC packages to Swan, we needed to fully decouple Swan from its original packages by removing direct dependencies on them:

**Migration Details:**

-   Removed direct dependencies on `@spectrum-web-components/base` and `@spectrum-web-components/shared` from Swan's package.json
-   Updated all import paths in Swan's source code to reference:
    -   Local Swan modules (using relative paths)
    -   Direct Lit imports instead of importing through SWC base's barrel file

**Implementation Notes:**

-   The SWC base package used a barrel file (index.ts) that re-exported everything from Lit
-   Swan does not use barrel files, so imports needed to be properly disaggregated
-   Imports were updated to:
    -   Import Lit types and utilities directly from 'lit'
    -   Import Swan's base modules from relative paths (e.g., '../../base/Base.js')
    -   Import Swan's shared modules from relative paths (e.g., '../../shared/focusable.js')

**Challenges Resolved:**

-   Addressed import resolution errors by properly identifying what was being re-exported from where
-   Fixed specific typing issues where modules were not exporting expected types
-   Added a type definition for NumberFormatOptions that was previously imported indirectly

**Lessons Learned:**

-   Barrel files can create hidden dependencies that must be untangled during migration
-   It's important to remove direct dependencies on original packages to avoid circular dependencies
-   Each migration should include a dependency cleanup phase to ensure Swan is properly decoupled

### DOM Manipulation Utilities (April 2024)

Several DOM manipulation utilities have been migrated from the shared package:

**Migration Details:**

-   Moved implementations from `tools/shared/src/` to `swan/src/shared/`:

    -   `like-anchor.ts`: Utility for making elements behave like anchor tags
    -   `reparent-children.ts`: Utility for moving child nodes between DOM elements

-   Created shim files in original locations that re-export from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution

**Implementation Notes:**

-   Used direct file system copy to preserve exact implementation code without modifications
-   Applied consistent pattern for shims with clear warning comments about the source of truth
-   These utility functions have key usage across the component library:
    -   `LikeAnchor` is used by the button component to support link-like behavior
    -   `reparentChildren` is used by the overlay component for DOM manipulation

**Testing and Verification:**

-   Ran the specific test files for the utility modules in the shared package
-   Identified and tested components that directly use these utilities:
    -   `button` component for `LikeAnchor` functionality
    -   `overlay` component for `reparentChildren` functionality
-   All tests passed successfully, confirming proper migration and module resolution

**Challenges Resolved:**

-   Used consistent shim pattern to ensure backward compatibility
-   Verified functionality through comprehensive testing of dependent components
-   Confirmed proper module resolution through the Swan package exports configuration

### Utility Functions (April 2024)

Two utility functions have been migrated from the shared package using file system operations:

**Migration Details:**

-   Copied implementation files directly from `tools/shared/src/` to `swan/src/shared/` using filesystem commands:

    -   `random-id.ts`: Utility for generating random IDs used by many components for accessibility
    -   `platform.ts`: Utilities for browser detection and platform-specific behaviors

-   Created shim files in original locations that re-export from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution

**Implementation Notes:**

-   Used direct file system copy to preserve exact implementation code without modifications
-   Applied consistent pattern for shims with clear warning comments about the source of truth
-   These utility functions have broad usage across the component library for:
    -   Generating unique IDs for ARIA attributes (randomID)
    -   Conditionally applying browser-specific behaviors and workarounds (platform)

**Testing and Verification:**

-   Ran the specific test files for the utility modules in the shared package
-   Identified components that directly use these utilities through codebase analysis:
    -   `overlay` component uses both randomID and platform utilities
    -   Various other components throughout the codebase
-   Ran tests for the overlay component to confirm proper functionality
-   All tests passed, confirming successful migration with proper module resolution

**Challenges Resolved:**

-   Encountered issue where the shim file for platform.ts had both the shim code and original implementation
-   Resolved by manually rebuilding the shim file to contain only the re-export code
-   Ensured proper export configuration in package.json for module resolution

### Slot Observation Utilities (April 2024)

Several slot-related utility functions have been migrated from the shared package:

**Migration Details:**

-   Moved implementations from `tools/shared/src/` to `swan/src/shared/`:

    -   `observe-slot-presence.ts`: Utility for detecting presence of slotted content through a mixin
    -   `observe-slot-text.ts`: Utility for observing text content in slots through a mixin

-   Created shim files in original locations that re-export from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution
-   Updated import path in `observe-slot-text.ts` to reference Swan's decorators module

**Implementation Notes:**

-   Used a consistent pattern for all shim files with clear warning comments about the source of truth
-   Made minor code improvements to address linting issues in the migrated files
-   Fixed single-line if statement formatting to use braces in the `observe-slot-text.ts` module
-   Both utilities are widely used across the component library for observing and responding to slot content changes

**Testing and Verification:**

-   Ran the specific test files for the slot observation utilities in the shared package
-   Identified components that directly use these utilities through codebase analysis:
    -   `badge` component uses both ObserveSlotPresence and ObserveSlotText
    -   `button` component uses ObserveSlotText
    -   Various other components like `tabs`, `action-menu`, `picker-button`, etc.
-   Ran tests for badge and button components to confirm proper functionality with the migrated utilities
-   All tests passed, confirming successful migration with proper module resolution

**Challenges Resolved:**

-   Fixed linting issues related to code style in migrated files:
    -   Added braces to single-line if statements
    -   Removed trailing whitespace for proper formatting
-   Updated import path for decorators to use the Swan version
-   Ensured proper export configuration in package.json for module resolution

### DOM Utility Functions (April 2024)

Several DOM-related utility functions have been migrated from the shared package:

**Migration Details:**

-   Moved implementations from `tools/shared/src/` to `swan/src/shared/`:

    -   `get-active-element.ts`: Utility for accessing the active element within a root node
    -   `get-deep-element-from-point.ts`: Utility for finding the deepest element at a specific point, including shadow DOM traversal
    -   `get-label-from-slot.ts`: Utility for extracting label text from slotted content

-   Created shim files in original locations that re-export from Swan to maintain backward compatibility
-   Added appropriate export entries to Swan's package.json to ensure proper module resolution
-   Updated migration documentation to emphasize the importance of small batch migrations

**Implementation Notes:**

-   Used a consistent pattern for all shim files with clear warning comments about the source of truth
-   Made minor code improvements to address linting issues in the migrated files
-   Applied the batch migration approach to minimize risk and simplify troubleshooting
-   Grouped related DOM utility functions that operate as standalone helpers without interdependencies

**Challenges Resolved:**

-   Fixed linting issues related to code style in `get-label-from-slot.ts`, specifically adding brackets to single-line if statements
-   Removed trailing whitespace from migrated files to address formatting errors
-   Ensured proper export configuration in package.json for module resolution
-   Verified that the Swan build process could handle the additional files without issues

**Testing and Verification:**

-   Ran the full shared package test suite to verify functionality of the migrated utilities
-   Identified components that directly use these utilities through codebase analysis:
    -   `progress-bar` component uses `getLabelFromSlot`
    -   `meter` component uses `getLabelFromSlot`
    -   `progress-circle` component uses `getLabelFromSlot`
-   Ran specific tests for these dependent components to confirm proper functionality
-   All tests passed, confirming successful migration with proper module resolution

### Shared Modules: Focusable and Focus-Visible (April 2024)

Several foundational shared modules have been migrated to Swan to support the component migration process:

**Migration Details:**

-   Moved implementations from `tools/shared/src/` to `swan/src/shared/`:

    -   `focusable.ts`: Core focus management functionality used by many components
    -   `focus-visible.ts`: Polyfill mixin for :focus-visible support
    -   `focusable-selectors.ts`: CSS selectors for focusable elements
    -   `first-focusable-in.ts`: Utilities for finding the first focusable element

-   Created shim files in original locations that re-export from Swan to maintain backward compatibility

**Implementation Notes:**

-   Used filesystem operations to copy the files rather than reading and rewriting source code to avoid unintentional changes
-   After copying, only updated import paths to reference Swan modules
-   Updated internal module references (e.g., focusable.ts imports focus-visible.ts)
-   Created proper shim files with warning comments about the migrated source of truth

**Challenges Resolved:**

-   **Dependency Version Issues:** Initially encountered TypeScript errors due to mismatched Lit dependency versions between Swan and SWC. Fixed by updating Swan's package.json to match the version range defined in the main project.
-   **Redundant Implementation Code:** Discovered that shim files should not contain both the re-export and the original implementation. Fixed by removing redundant implementation code from shim files.
-   **Verification Strategy:** Learned that it's important to test not just the shared modules themselves, but also components that depend on them (like button) to verify the migration was successful.
-   **ESLint Configuration Differences:** Found that Swan files were subject to stricter linting rules than in their original location. Made one necessary source-level change to `focusable.ts` to fix an async Promise executor pattern that triggered the `no-async-promise-executor` rule. This change is documented in the [Source-Level Changes Log](./SOURCE-CODE-CHANGES.md).

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

### Shared Utilities (April 2024)

Several shared utilities have been migrated to support the Swan architecture:

#### first-focusable-in and focusable-selectors

**Migration Details:**

-   Moved implementations from `tools/shared/src/first-focusable-in.ts` and `tools/shared/src/focusable-selectors.ts` to corresponding files in `swan/src/shared/`
-   Added exports entries in Swan's package.json for the migrated files
-   Temporarily kept the original implementation in SWC for build purposes
-   Added `format` script to Swan's package.json for easier handling of formatting errors

**Implementation Notes:**

-   `first-focusable-in.ts` provides utilities for finding the first focusable element in a DOM container
-   `focusable-selectors.ts` provides CSS selectors for identifying focusable elements
-   Both modules are commonly used by components that need to manage focus

**Challenges Resolved:**

-   Added formatter script to Swan to simplify fixing prettier-related linting issues
-   Updated documentation to provide guidance on handling formatting issues during migration
-   Successfully built Swan with the migrated modules

**Next Steps:**

-   Continue migrating the remaining shared modules following the established pattern
-   Update SWC shim files to reference the Swan implementations after all migrations are complete

### Dependency Version Compatibility (April 2024)

During the shared package migration, we encountered TypeScript errors related to incompatible Lit versions:

**Issue Details:**

-   TypeScript errors when building SWC after migrating shared modules to Swan
-   Error message: "Type 'Button' is not assignable to type 'HostWithPendingState'. Types have separate declarations of a private property '\_\_childPart'."
-   The issue was caused by Swan and SWC using different versions of Lit

**Resolution:**

-   Updated Swan's package.json to use the same version range for Lit as the main SWC project
-   Changed from `"lit": "^3.1.3"` to `"lit": "^2.5.0 || ^3.1.3"`
-   Added documentation about maintaining version consistency between Swan and SWC

**Lessons Learned:**

-   Always use identical version ranges for shared dependencies between Swan and SWC
-   Use `yarn why <package-name>` to check for multiple versions of dependencies
-   Document version requirements in the migration principles

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

6. **Batch Size Management**

    - Migrate in small, related batches of 1-3 modules at a time
    - Group modules with similar functionality or dependencies when possible
    - Complete the full migration cycle for each batch before starting the next
    - This approach minimizes risk and makes troubleshooting easier

7. **Documentation**
    - Add clear comments about source of truth locations
    - Provide migration context through inline documentation
    - Create comprehensive migration logs and principles

Each migration follows this iterative approach:

1. Identify component for migration
2. Extract core logic to abstract base classes (moved to Swan)
3. Leave rendering, styles, and component definition in SWC
4. Create shims in SWC that reference Swan abstract base classes
5. Test thoroughly to ensure functionality is preserved:
    - Run shared module tests
    - Identify and test representative components that use the migrated modules
    - Verify both direct functionality and integration with dependent components
6. Document the migration process and any challenges

This carefully planned migration strategy ensures a smooth transition from the legacy SWC architecture to the more modular and maintainable Swan architecture, while minimizing disruption to consumers of the library. The end result is a clean separation where Swan provides the behavior foundation and SWC provides the implementation and presentation layer.

## Migration Techniques

### Git Move Process

Starting with Phase 3 (reactive-controllers), we adopted a `git mv` approach to preserve the complete git history of files. For a detailed step-by-step guide on how to perform migrations using `git mv` while avoiding circular dependencies, refer to the [Git Move Migration: Step-by-Step Guide](./MIGRATION-PRINCIPLES.md#git-move-migration-step-by-step-guide) section in our Migration Principles document.

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
