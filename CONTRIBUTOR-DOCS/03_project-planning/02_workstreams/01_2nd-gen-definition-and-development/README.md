<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Workstreams](../README.md) / 2nd-gen Definition and Development

<!-- Document title (editable) -->

# 2nd-gen Definition and Development

<!-- Document content (editable) -->

Building the 2nd-gen project from the ground up as a clean foundation for future work. This workstream encompasses multiple parallel efforts:

- Developing the rendering layer and component architecture
- Implementing tooling, infrastructure, and build improvements
- Setting up tests, Storybook, and documentation
- Improving code quality and developer experience

Most work toward Unification, building a clean foundation for future work, and landing full-fidelity Spectrum 2 flows into this workstream.

## Folder structure vs docs presentation

Folder structure (e.g. `2nd-gen/packages/swc/components/asset`) is the source of truth for what exists. Docs presentation can differ: a component can live under `components/` but appear in Storybook under a different category (e.g. "Content" or "Media"), and llms.txt / static doc generators can order or group entries by Storybook order or categories rather than by filesystem. When adding tooling (e.g. llms.txt, MCP), prefer 2nd-gen-first ordering and allow presentation to be driven by Storybook or config when appropriate.
