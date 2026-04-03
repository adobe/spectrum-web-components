# 2nd-gen

**This is the future.** 2nd-gen is the desired end state of Spectrum Web Components — cleaner conventions, stricter tooling, and a clear core/rendering split. When 1st-gen and 2nd-gen differ, follow 2nd-gen conventions.

## Structure

```text
2nd-gen/
└── packages/
    ├── core/    # Abstract base classes, mixins, types — no rendering
    └── swc/     # Concrete components — render(), CSS, stories, tests
```

**Dependency direction: core builds first, swc builds second.** This is enforced by TypeScript project references and the root `yarn build` script.

## Where to look next

- [`packages/core/AGENTS.md`](./packages/core/AGENTS.md) — base classes, mixins, types
- [`packages/swc/AGENTS.md`](./packages/swc/AGENTS.md) — rendering, CSS, stories, tests
- [`1st-gen/AGENTS.md`](../1st-gen/AGENTS.md) — the generation being replaced
- [Migration workstream docs](../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md)
