<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../../README.md) / [Project Planning](../../../README.md) / [Workstreams](../../README.md) / [2nd-gen Component Migration](../README.md) / Step By Step / Add stories for 2nd-gen component

<!-- Document title (editable) -->

# Add stories for 2nd-gen component

<!-- Document content (editable) -->

- Create `stories/[component].stories.ts` file
- Add section headers: METADATA, STORIES, HELPER FUNCTIONS (if needed)
- In METADATA section:
    - Import `StoryObj as Story` for consistency
    - Set up Storybook helpers with `getStorybookHelpers()`
    - Configure argTypes for component-specific controls
    - Define and export the meta object
- In STORIES section:
    - Create Default story (without `tags: ['!dev']`)
    - Create additional stories showcasing variants, sizes, states
    - Add `tags: ['!dev']` to all non-default stories
- In HELPER FUNCTIONS section (if needed):
    - Add any utility functions or template helpers
    - Convert arrow functions to standard function declarations where appropriate
