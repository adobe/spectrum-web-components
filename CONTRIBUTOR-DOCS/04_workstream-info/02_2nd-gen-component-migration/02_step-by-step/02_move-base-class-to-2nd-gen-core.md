<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Workstream Info](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Move base class to 2nd-gen core

<!-- Document title (editable) -->

# Move base class to 2nd-gen core

<!-- Document content (editable) -->

- Create a directory for the component under `core/components`
- Move `[Component].base.ts` file from 1st-gen
- Add `index.ts` file
- Add the 2nd-gen `core` library to `dependencies` in the 1st-gen component's `package.json` file
- Update import statements in `[Component].ts` to import `[Component]Base.ts` from 2nd-gen `core`
- Confirm that the 1st-gen component still renders and behaves the same, and that all tests continue to pass
