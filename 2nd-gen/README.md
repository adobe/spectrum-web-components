# Spectrum Web Components - Second Generation

This folder contains the second generation of Spectrum Web Components.

## Architecture Overview

The 2nd generation follows a dual-package architecture:

- **`packages/core/`** - Abstract base classes providing common functionality
- **`packages/swc/`** - Concrete component implementations with styling and stories

## Components

The following components are available in the barebones milestone:

- ...

## Tooling Stack

### Build System

- **Vite**
- **TypeScript**

### Development & Testing

- **Storybook v9** - Component development with Web Components + Vite framework
- **Vitest** - Fast testing with browser mode and Playwright integration
- **Playwright** - End-to-end testing and accessibility validation

### Code Quality

- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Accessibility** - Built-in a11y testing with axe-core

## Getting Started

### Installation

```bash
# Install dependencies
yarn install

# Build packages
yarn build
```

### Development

```bash
# Start Storybook for component development
yarn storybook

# Run tests
yarn test

# Build all packages
yarn build
```

### Project Structure

```
2nd-gen/
├── packages/
│   ├── base/                    # Abstract base classes
│   │   └── components/
│   │       ├── alert/
│   │       ├── badge/
│   │       ├── button/
│   │       ├── divider/
│   │       ├── progress-bar/
│   │       └── slider/
│   └── swc/                     # Concrete implementations
│       ├── .storybook/          # Storybook configuration
│       └── components/
│           ├── alert/
│           │   ├── Alert.ts
│           │   ├── styles.css.js
│           │   ├── stories/
│           │   ├── test/
│           │   └── README.md
│           └── ... (other components)
├── vitest.config.js             # Test configuration
├── playwright.config.js         # E2E test configuration
└── tsconfig.json               # TypeScript configuration
```

## Component Development

### Creating a New Component

1. **Base Class**: Create base class in `packages/core/components/`
2. **Implementation**: Create concrete rendering implementation in `packages/swc/components/`
3. **Styles**: TBD (WIP)
4. **Stories**: Create Storybook stories (CSF) for development and documentation
5. **Tests**: Add Vitest tests for functionality and accessibility

### Component Structure

Each component follows this structure:

```
component-name/
├── index.ts              # Main export
├── ComponentName.ts      # Implementation
├── styles.css.js         # Styling
├── stories/
│   └── ComponentName.stories.ts
├── test/
│   └── ComponentName.test.ts
└── README.md            # Component documentation
```

## Testing Strategy

WIP

## Build Outputs

WIP

Each package produces:

- **ESM modules** targeting ES2022
- **TypeScript declarations** (.d.ts files)
- **Source maps** for debugging
- **Tree-shakable exports** for optimal bundle sizes

## Design Principles

## Migration from 1st Generation

The 2nd generation is designed to coexist with the 1st generation during the transition period. Components can be migrated incrementally as needed.

## Contributing

WIP

### Code Standards

WIP, example ideas below:

- Follow existing component patterns
- Include comprehensive tests
- Document public APIs
- Use semantic commit messages

## Future Roadmap

The barebones milestone establishes the foundation. Future iterations will add:

- Additional components
- Advanced accessibility features
- Enhanced developer tooling
- Visual regression testing
- React wrapper generation
- ...
