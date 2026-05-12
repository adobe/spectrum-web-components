# 1st-gen

**This is the past.** 1st-gen is being actively migrated to 2nd-gen and will be deprecated once that migration is complete. Do not add new features. Bug fixes and migration work only.

If a change belongs in both generations, make it in `2nd-gen/packages/core/` so both benefit.

## Structure

```text
1st-gen/
├── packages/   # 69 component packages + 9 shared tool packages
├── tools/      # Shared base classes, mixins, reactive controllers
├── projects/   # Non-component workspaces (docs, VRT, templates, types)
├── storybook/  # Storybook configuration
├── test/       # Global test infrastructure
└── scripts/    # Build and utility scripts
```

## Where to look next

- [`packages/AGENTS.md`](./packages/AGENTS.md) — component and tool packages
- [`tools/AGENTS.md`](./tools/AGENTS.md) — shared tooling
- [`projects/AGENTS.md`](./projects/AGENTS.md) — non-component workspaces
- [`2nd-gen/AGENTS.md`](../2nd-gen/AGENTS.md) — the future direction
- [Migration workstream docs](../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md)
