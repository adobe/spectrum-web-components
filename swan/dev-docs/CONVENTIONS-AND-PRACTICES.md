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

## Migration Procedures

-   **Verifying migrations**
    -   After migrating code to Swan, always build Swan first using `yarn build` in the Swan directory
    -   Then build SWC from the project root using `yarn build`
    -   Finally, run focused tests on affected components to verify the migration was successful

## Development Workflow

-   **Order of operations**
    1. Make changes to code
    2. Build Swan (if Swan changes were made)
    3. Build SWC
    4. Run tests to verify changes
    5. Document changes where appropriate

## Common Issues and Solutions

-   **Import path issues**

    -   Always use the `.js` extension in import paths, even when importing TypeScript files
    -   For Swan imports in SWC, use the package path format: `@spectrum-web-components/swan/path/to/module.js`,
        consulting the Swan's package.json `exports` for the path to the desired module

-   **Build failures after migration**
    -   Ensure Swan's package.json exports map is correctly configured for the migrated files
    -   Check that TypeScript references are properly set up between projects. In particular, check the
        `paths` configuration in the project's root tsconfig.json file if you see errors resolving Swan module paths.
