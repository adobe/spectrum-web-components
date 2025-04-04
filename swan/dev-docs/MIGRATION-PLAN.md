# Migration Plan: Moving Base, Reactive-Controllers, and Shared to Swan

## Important: Proof-of-Concept Status

This migration work is currently being conducted as a proof-of-concept exercise. The learnings and approaches from this effort will inform the eventual "real" migration process. As such, some aspects of this plan may change based on what we discover during this exploratory phase.

If we decide to proceed with this architecture, the final migration will incorporate all lessons learned from this proof-of-concept work. This documentation serves as a record of our approach and findings for future reference.

## 1. Overall Migration Strategy

1. **Phased Migration Approach**:

    - Migrate packages in dependency order: base → shared → reactive-controllers (partial)
    - Leave PendingStateController in its original location to avoid progress-circle dependency
    - Create shim files for backward compatibility

2. **Repository Structure**:

    - Move implementation files to corresponding locations in Swan
    - Keep original packages with shim files that re-export from Swan
    - Do not create barrel files (index.ts) in Swan; each utility should be directly importable

3. **Dependency Cleanup**:
    - After migrating modules, update Swan's package.json to remove dependencies on original SWC packages
    - Update all imports in Swan source files to reference local Swan modules or direct dependencies
    - For Lit-derived types and utilities, import directly from 'lit' instead of through SWC's barrel files
    - Verify build succeeds after dependency removal to ensure complete decoupling

## 2. Package-Specific Migration Plans

### Phase 1: Migrate Base Package (COMPLETED)

1. **Files to Move**:

    - All implementation files from `tools/base/src/` to `swan/src/base/`
    - Maintain exact file structure and code

2. **Shim Creation**:

    - Create re-export files in original `tools/base/src/` that import from Swan
    - Preserve exact same export structure for backward compatibility
    - Use package import paths without `/src/` segment: `@spectrum-web-components/swan/base/file.js`

3. **Dependencies**:
    - Transfer external dependency on `lit` to Swan package.json

### Phase 2: Migrate Shared Package

1. **Files to Move**:

    - All implementation files from `tools/shared/src/` to `swan/src/shared/`
    - Preserve all code exactly as-is
    - Do not migrate the index.ts barrel file; each utility should be directly importable

2. **Shim Creation**:

    - Create re-export files in original `tools/shared/src/` locations
    - Update imports in shim files to reference Swan implementations
    - Use short import paths: `@spectrum-web-components/swan/shared/file.js`
    - Maintain the original index.ts barrel file in the tools/shared package for backward compatibility

3. **Dependencies**:

    - Update internal imports to reference Swan base package
    - Transfer external dependencies (`@lit-labs/observers`, `focus-visible`)

4. **Package.json Updates**:
    - Add export entries for each migrated file using the shorter path format:
    ```json
    "./shared/file-name.js": {
        "types": "./dist/shared/file-name.d.ts",
        "development": "./dist/shared/file-name.dev.js",
        "default": "./dist/shared/file-name.js"
    }
    ```

### Phase 3: Migrate Reactive-Controllers Package (Partial)

1. **Files to Move**:

    - Most controllers from `tools/reactive-controllers/src/` to `swan/src/reactive-controllers/`
    - Use `git mv` to preserve git history when moving files:
        ```bash
        git mv tools/reactive-controllers/src/file-name.ts swan/src/reactive-controllers/file-name.ts
        ```
    - After moving, update import paths in the moved files to reference Swan paths
    - Using git move preserves the full history of each file, making later analysis and debugging easier

2. **Files to Leave in Place**:

    - `PendingState.ts` - Leave in original location due to progress-circle dependency
    - Keep original test files for PendingStateController

3. **Shim Creation**:

    - Create re-export files for moved controllers
    - Leave PendingStateController as direct implementation in original package
    - Use short import paths: `@spectrum-web-components/swan/reactive-controllers/file.js`

4. **Dependencies**:

    - Update internal imports to reference Swan base and shared packages
    - Transfer external dependency on `colorjs.io`

5. **Package.json Updates**:
    - Add export entries for each migrated file using the shorter path format:
    ```json
    "./reactive-controllers/file-name.js": {
        "types": "./dist/reactive-controllers/file-name.d.ts",
        "development": "./dist/reactive-controllers/file-name.dev.js",
        "default": "./dist/reactive-controllers/file-name.js"
    }
    ```

## 3. Implementation Considerations

1. **File Migration Method**:

    - For Phase 3 and beyond, use `git mv` to move files:
        ```bash
        git mv original/path/file.ts new/path/file.ts
        ```
    - This preserves the complete git history of the file and ensures traceability
    - After moving, only make changes to import/export statements; preserve all other code exactly as-is

2. **Import Path Updates**:

    - Within moved files, update all internal imports to reference new Swan paths
    - Only modify import/export statements; preserve all other code exactly as-is
    - Use shorter import paths without `/src/`:
        - Example: Change `@spectrum-web-components/base` to `@spectrum-web-components/swan/base/file.js`

3. **Package.json Updates**:

    - Update Swan's package.json to include necessary dependencies
    - Maintain version compatibility with existing packages
    - For each migrated file, add an exports entry using the shorter path format (without `/src/`)
    - Keep path structures simple and logical:
        - Don't include 'src' in the path
        - Don't include 'components' in the path unless necessary for organization

4. **Build Configuration**:

    - Ensure Swan's build process correctly handles all moved files
    - Configure TypeScript paths and export maps to match original structure
    - Verify that TypeScript declaration files (.d.ts) are properly generated

5. **Batch Size Management**:
    - Migrate in small, related batches of 1-3 modules at a time
    - Prefer to group modules with similar functionality or dependencies
    - Complete the full migration cycle (implementation, shim creation, testing) for each batch before starting the next
    - This approach makes it easier to:
        - Identify and troubleshoot issues
        - Verify that each module works correctly before adding complexity
        - Roll back changes if necessary without affecting too many files

## 4. Testing and Verification Strategy

1. **Build Verification**:

    - After migrating files, always build Swan first using `yarn build` in the Swan directory
    - Then build SWC from the project root using `yarn build`
    - Verify that no build errors occur in either project

2. **Validation Testing**:

    - Run focused tests on affected components using `yarn test:focus <package-name>`
    - Consider migration successful if all existing tests continue to pass
    - No new tests will be created during the migration phase

3. **Component Coverage**:

    - Identify and test components that directly import the migrated modules
    - Use grep search to find components that depend on the migrated utilities
    - Test a representative subset of dependent components to ensure functionality
    - Not all dependent components need to be tested, but aim for sufficient coverage of different usage patterns

4. **Common Issue Resolution**:
    - If TypeScript resolution errors occur:
        - Verify exports entries in package.json match import paths exactly
        - Check that declaration files are generated in the correct location
        - Rebuild both Swan and SWC to ensure all generated files are up-to-date
    - For runtime import errors:
        - Verify that import paths in shim files match the exports configuration
        - Check that all files use the correct `.js` extension in imports

## 5. Minimizing Changes

1. **Code Preservation**:

    - Make absolute minimum necessary changes to the code
    - Only modify import paths and package references
    - No code refactoring, formatting changes, or optimizations during migration
    - Non-mechanical source-level changes should be avoided whenever possible
    - If source-level changes are necessary, they must be documented in [SOURCE-CODE-CHANGES.md](./SOURCE-CODE-CHANGES.md)

2. **Documentation**:

    - No changes to public documentation required at this stage
    - Update internal documentation (MIGRATION-LOG.md) with details of each migration phase
    - Document any challenges encountered and their solutions

3. **Versioning**:
    - No special versioning changes needed initially
    - Swan will be delivered as a single package
    - SWC packages will maintain their existing versioning strategy

## 6. Future Considerations

1. **PendingStateController**:

    - Leave as-is in original location for now
    - Consider migration options in future phases

2. **Testing Enhancement**:

    - Add Swan-specific tests after the migration is complete and validated

3. **Import Path Standard**:
    - All Swan imports use the shorter path format without `/src/`:
        - Standard format: `@spectrum-web-components/swan/path/to/file.js`
    - Package.json exports are configured to match this format
