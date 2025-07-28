# Spectrum Web Components Monorepo

This monorepo supports side-by-side development of both current-generation (SWC 1.x) and next-generation Spectrum Web Components using a shared base package strategy.

## Architecture Overview

The monorepo enables decoupling of rendering layers (DOM structure and CSS styles) while preserving and sharing core component functionality and accessibility between both current and next-gen products. This approach provides an incremental migration path to full-fidelity Spectrum 2 styles while improving developer experience for the next-gen product.

## Directory Structure

```
/
├── first-gen/          # Current SWC 1.x implementation
│   ├── .storybook/     # Storybook configuration
│   ├── config/         # Build configuration
│   ├── linters/        # ESLint and other linters
│   ├── packages/       # Component packages
│   ├── projects/       # Documentation and examples
│   ├── scripts/        # Build and utility scripts
│   ├── test/           # Testing infrastructure
│   ├── tools/          # Shared tools and utilities
│   └── package.json    # First-gen workspace configuration
├── second-gen/         # Next-gen implementation (future)
│   ├── packages/
│   │   ├── base/       # Shared base components (future)
│   │   └── swc/        # Next-gen rendering layer (future)
│   └── package.json    # Second-gen workspace configuration (future)
├── package.json        # Root monorepo configuration
└── README.md          # This file
```

## Development Approach

### Shared Base Package Strategy

- **Core Logic**: Component behavior, accessibility, methods, event listeners, properties, and attributes are centralized in shared packages
- **Rendering Layers**: Both first-gen and next-gen consume shared functionality independently
- **Quality Standards**: Shared logic adheres to accessibility and testing standards
- **Migration Gates**: Components must meet quality standards before next-gen release

### Benefits

1. **Incremental Migration**: Low-risk path to full-fidelity Spectrum 2
2. **Simultaneous Improvements**: Bug fixes and accessibility updates benefit both versions
3. **Focused Development**: Next-gen single-theme context enables efficient styling
4. **Quality Assurance**: Shared logic ensures consistent quality across versions

## Getting Started

### First-Gen Development

```bash
# Install dependencies
yarn install

# Build first-gen components
yarn build:first-gen

# Run first-gen tests
yarn test:first-gen

# Start first-gen Storybook
yarn storybook:first-gen
```

### Working with the Monorepo

```bash
# Install dependencies for all workspaces
yarn install

# Build all components
yarn build

# Run all tests
yarn test

# Start Storybook (defaults to first-gen)
yarn storybook
```

## Migration Philosophy

### Breaking Changes Policy

We are committed to minimizing breaking changes. The "breakage budget" is kept as small as possible, meaning refactors and architectural decisions should strive for no disruption to current-gen (SWC 1.x) consumers.

Breaking changes are only introduced as a last resort for:

- Critical issue fixes
- Accessibility requirement compliance
- Significant long-term improvements

### Decision-Making Process

Migration decisions consider:

- Smoothness of migration path
- Urgency of needed improvements
- Team effort requirements
- Quality and accessibility impact
- Customer disruption minimization

## Contributing

### Contribution Guidelines

1. **Shared Improvements**: Focus on changes that benefit both current and next-gen systems
2. **Quality Standards**: Ensure all shared logic meets accessibility and testing requirements
3. **API Stability**: Avoid behavioral and API changes that disrupt customer adoption
4. **Documentation**: Update relevant documentation for both systems when applicable

### Branch Naming

Follow the pattern: `<username>/<type>-<description>[-swc-<issue>]`

Examples:

- `johndoe/feat-add-new-button-swc-123`
- `janedoe/fix-dropdown-alignment`
- `alice/refactor-component-structure`

## Testing

- **Unit Tests**: Run `yarn test` for comprehensive testing
- **Visual Regression**: Automated VRT ensures visual consistency
- **Accessibility**: Built-in a11y testing for shared components
- **Integration**: Cross-workspace testing validates shared functionality

## Documentation

- **API Documentation**: Auto-generated from TypeScript definitions
- **Storybook**: Interactive component documentation and examples
- **Migration Guides**: Step-by-step guides for adopting next-gen components (future)

## Long-Term Vision

The shared base package may evolve into a foundational library for the broader web components ecosystem—similar to projects like react-aria. By consolidating accessibility patterns, reusable behaviors, and well-tested infrastructure, it could serve as a reference implementation for accessible, standardized web components beyond our immediate product stack.

## License

Apache-2.0 © Adobe

## Support

For questions, issues, or contributions, please refer to:

- [Contributing Guidelines](./first-gen/CONTRIBUTING.md)
- [Issue Tracker](https://github.com/adobe/spectrum-web-components/issues)
- [Discussions](https://github.com/adobe/spectrum-web-components/discussions)
