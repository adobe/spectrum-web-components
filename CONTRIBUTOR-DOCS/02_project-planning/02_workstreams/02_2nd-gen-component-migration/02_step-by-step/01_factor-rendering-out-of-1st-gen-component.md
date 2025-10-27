<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Workstream Info](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Factor rendering out of 1st-gen component

<!-- Document title (editable) -->

# Factor rendering out of 1st-gen component

<!-- Document content (editable) -->

- Use `git mv` to rename `[Component].ts` to `[Component].base.ts`
- Create a new `[Component].ts` file
- In `[Component].base.ts`, edit the component definition to make it an abstract class named `[Component]Base`
- In `[Component].ts`, import the `[Component]Base` class and define a new `[Component]` class extending from `[Component]Base`
- Move the stylesheet import from the `[Component].base.ts` file to the `[Component].ts` file
- Move the `render()` method and the static `styles` getter from the `[Component]Base` class to the `[Component]` class
- If the 1st-gen component has any rendering code that has been factored out of the `render()` method (e.g., into helper methods), move that code from `[Component]Base` to `[Component]` as well
- Confirm that the refactored component still renders and behaves the same, and that all tests continue to pass
