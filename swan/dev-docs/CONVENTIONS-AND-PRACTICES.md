# Development Conventions and Practices

This document outlines the standard development practices, conventions, and workflows used in the Spectrum Web Components projects. Following these practices ensures consistency across the codebase and helps prevent common issues.

## Package Management

-   **Always use yarn, not npm**
    -   All package management operations should be performed using yarn
    -   Do not use npm commands for installing dependencies, building, or testing

## Build Processes

-   **Building SWC packages**
    -   SWC packages are not built individually; they're always built together by running `yarn build` from the project root
    -   Individual package builds are not supported and may lead to inconsistent behavior

## Testing

-   **Running focused tests**
    -   To run tests for a single SWC component, run `yarn test:focus <package-name>` from the project root
    -   This allows for faster iteration when making changes to specific components

## Code Formatting

-   **Fixing formatting issues**
    -   When you make changes to Swan files and encounter formatting errors, use the format script:
    -   Run `yarn format` from the Swan directory to format all TypeScript files
    -   This is the recommended approach instead of manually fixing formatting issues
    -   The format script uses prettier with the project's configuration

## Migration Procedures

-   **Verifying migrations**
    -   After migrating code to Swan, always build Swan first using `yarn build` in the Swan directory
    -   Then build SWC from the project root using `yarn build`
    -   Finally, run focused tests on affected components to verify the migration was successful

## Troubleshooting and Debugging

-   **Analyzing Build/Test Failures**

    -   Always thoroughly analyze errors before making changes
    -   Look for patterns in error messages and identify the root cause
    -   Present interpretations and propose solutions before implementing fixes
    -   Document the issue and resolution for future reference

-   **Common Build Failures and Solutions**

    -   **TypeScript Path Resolution Errors:**
        -   Check if the module category is properly mapped in the root tsconfig.json
        -   Ensure specific paths (e.g., `/base/`, `/shared/`) come before generic paths
        -   Verify that the export entries in Swan's package.json match the import paths
    -   **Module Not Found Errors:**

        -   Check if the file is properly exported in package.json
        -   Ensure the file path in the import statement is correct
        -   Rebuild both Swan and SWC to ensure all generated files are up-to-date

    -   **Type Incompatibility Errors:**
        -   If you see errors about incompatible types or private properties (e.g., `__childPart`), check for version inconsistencies
        -   Run `yarn why <package-name>` to check if multiple versions of a dependency exist
        -   Ensure Swan uses the same version ranges for shared dependencies as the main SWC project
        -   This is especially critical for core libraries like Lit

-   **Documentation Approach**
    -   When encountering a new type of error, add it to the MIGRATION-LOG.md's "Challenges Resolved" section
    -   Include both the symptom (error message) and the solution for future reference

## Development Workflow

-   **Order of operations**
    1. Make changes to code
    2. Run the formatter (`yarn format`) to ensure consistent code style
    3. Build Swan (if Swan changes were made)
    4. Build SWC
    5. Run tests to verify changes
    6. Document changes where appropriate

## Common Issues and Solutions

-   **Import path issues**

    -   Always use the `.js` extension in import paths, even when importing TypeScript files
    -   For Swan imports in SWC, use the package path format: `@spectrum-web-components/swan/path/to/module.js`,
        consulting the Swan's package.json `exports` for the path to the desired module

-   **Build failures after migration**
    -   Ensure Swan's package.json exports map is correctly configured for the migrated files
    -   Check that TypeScript references are properly set up between projects. In particular, check the
        `paths` configuration in the project's root tsconfig.json file if you see errors resolving Swan module paths.
