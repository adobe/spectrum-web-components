# Migration Plan: Moving Base, Reactive-Controllers, and Shared to Swan

## 1. Overall Migration Strategy

1. **Phased Migration Approach**:

    - Migrate packages in dependency order: base → shared → reactive-controllers (partial)
    - Leave PendingStateController in its original location to avoid progress-circle dependency
    - Create shim files for backward compatibility

2. **Repository Structure**:
    - Move implementation files to corresponding locations in Swan
    - Keep original packages with shim files that re-export from Swan

## 2. Package-Specific Migration Plans

### Phase 1: Migrate Base Package

1. **Files to Move**:

    - All implementation files from `tools/base/src/` to `swan/base/`
    - Maintain exact file structure and code

2. **Shim Creation**:

    - Create re-export files in original `tools/base/src/` that import from Swan
    - Preserve exact same export structure for backward compatibility

3. **Dependencies**:
    - Transfer external dependency on `lit` to Swan package.json

### Phase 2: Migrate Shared Package

1. **Files to Move**:

    - All implementation files from `tools/shared/src/` to `swan/shared/`
    - Preserve all code exactly as-is

2. **Shim Creation**:

    - Create re-export files in original `tools/shared/src/` locations
    - Update imports in shim files to reference Swan implementations

3. **Dependencies**:
    - Update internal imports to reference Swan base package
    - Transfer external dependencies (`@lit-labs/observers`, `focus-visible`)

### Phase 3: Migrate Reactive-Controllers Package (Partial)

1. **Files to Move**:

    - Most controllers from `tools/reactive-controllers/src/` to `swan/reactive-controllers/`
    - Maintain exact code with only import path updates

2. **Files to Leave in Place**:

    - `PendingState.ts` - Leave in original location due to progress-circle dependency
    - Keep original test files for PendingStateController

3. **Shim Creation**:

    - Create re-export files for moved controllers
    - Leave PendingStateController as direct implementation in original package

4. **Dependencies**:
    - Update internal imports to reference Swan base and shared packages
    - Transfer external dependency on `colorjs.io`

## 3. Implementation Considerations

1. **Import Path Updates**:

    - Within moved files, update all internal imports to reference new Swan paths
    - Only modify import/export statements; preserve all other code exactly as-is
    - Example: Change `@spectrum-web-components/base` to relative imports within Swan

2. **Package.json Updates**:

    - Update Swan's package.json to include necessary dependencies
    - Maintain version compatibility with existing packages

3. **Build Configuration**:
    - Ensure Swan's build process correctly handles all moved files
    - Configure TypeScript paths and export maps to match original structure

## 4. Testing Strategy

1. **Validation Testing**:
    - Initially rely exclusively on existing SWC component tests
    - Consider migration successful if all existing tests continue to pass
    - No new tests will be created during the migration phase

## 5. Minimizing Changes

1. **Code Preservation**:

    - Make absolute minimum necessary changes to the code
    - Only modify import paths and package references
    - No code refactoring, formatting changes, or optimizations during migration

2. **Documentation**:

    - No changes to public documentation required at this stage
    - Internal documentation of migration process only for development team

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
