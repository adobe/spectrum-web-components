### Keyboard interactions

Each accordion is a tab stop. Space or Enter keys expand or collapse accordions, which are collapsed by default. Interactive elements within expanded accordions integrate into the tab order automatically.

### Development considerations

Keep these considerations in mind if you are modifying Spectrum Web Components or creating a custom component:

-   The accordion header has a role of `<sp-button>`, with an aria-expanded attribute set to "true" or "false".
-   The button has an aria-controls property set to the unique id of the panel it controls.
-   Since accordions are typically grouped together, Spectrum Web Components puts each button inside a list item in an unordered list, which provides additional context to screen reader users; where only one accordion is used, it should not be put in a list.
-   When accordion titles are used as headings, the buttons are also wrapped in an element with an appropriate heading level; ARIA can be used to set both the heading role and the level (via aria-level).

See the [ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion) for more guidance.
