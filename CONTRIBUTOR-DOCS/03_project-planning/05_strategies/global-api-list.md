<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../README.md) / [Project planning](../README.md) / Strategies / Global API list

<!-- Document title (editable) -->

# Global API list

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Properties](#properties)
    - [`accessibleLabel`](#accessiblelabel)
    - [`align`](#align)
    - [`allowMultiple`](#allowmultiple)
    - [`alt`](#alt)
    - [`attachmentScrollNextLabel`](#attachmentscrollnextlabel)
    - [`attachmentScrollPrevLabel`](#attachmentscrollprevlabel)
    - [`attachmentStripLabel`](#attachmentstriplabel)
    - [`color`](#color)
    - [`compact`](#compact)
    - [`containerPadding`](#containerpadding)
    - [`crossOffset`](#crossoffset)
    - [`decorative`](#decorative)
    - [`delay`](#delay)
    - [`density`](#density)
    - [`direction`](#direction)
    - [`disabled`](#disabled)
    - [`dismissible`](#dismissible)
    - [`dismissLabel`](#dismisslabel)
    - [`dragged`](#dragged)
    - [`draggedMessage`](#draggedmessage)
    - [`dropEffect`](#dropeffect)
    - [`fill`](#fill)
    - [`filled`](#filled)
    - [`filledMessage`](#filledmessage)
    - [`fillStyle`](#fillstyle)
    - [`fixed`](#fixed)
    - [`focused`](#focused)
    - [`for`](#for)
    - [`formatOptions`](#formatoptions)
    - [`generating`](#generating)
    - [`groupLabel`](#grouplabel)
    - [`hideArrow`](#hidearrow)
    - [`icon`](#icon)
    - [`indeterminate`](#indeterminate)
    - [`justified`](#justified)
    - [`keyboardActivation`](#keyboardactivation)
    - [`label`](#label)
    - [`labeling`](#labeling)
    - [`labelPosition`](#labelposition)
    - [`level`](#level)
    - [`loader`](#loader)
    - [`manual`](#manual)
    - [`maxRows`](#maxrows)
    - [`maxValue`](#maxvalue)
    - [`minRows`](#minrows)
    - [`minValue`](#minvalue)
    - [`modal`](#modal)
    - [`negativeLabel`](#negativelabel)
    - [`offset`](#offset)
    - [`open`](#open)
    - [`orientation`](#orientation)
    - [`outline`](#outline)
    - [`paused`](#paused)
    - [`pending`](#pending)
    - [`pendingActive`](#pendingactive)
    - [`pendingLabel`](#pendinglabel)
    - [`placeholder`](#placeholder)
    - [`placement`](#placement)
    - [`positiveLabel`](#positivelabel)
    - [`preset`](#preset)
    - [`progress`](#progress)
    - [`quiet`](#quiet)
    - [`replaceMessage`](#replacemessage)
    - [`selectable`](#selectable)
    - [`selected`](#selected)
    - [`sendLabel`](#sendlabel)
    - [`shadowRootOptions`](#shadowrootoptions)
    - [`shouldFlip`](#shouldflip)
    - [`size`](#size)
    - [`src`](#src)
    - [`staticColor`](#staticcolor)
    - [`status`](#status)
    - [`stopLabel`](#stoplabel)
    - [`subtle`](#subtle)
    - [`tabId`](#tabid)
    - [`titleAsLink`](#titleaslink)
    - [`triggerElement`](#triggerelement)
    - [`truncate`](#truncate)
    - [`type`](#type)
    - [`uploadLabel`](#uploadlabel)
    - [`value`](#value)
    - [`valueLabel`](#valuelabel)
    - [`variant`](#variant)
    - [`vertical`](#vertical)
- [Slots](#slots)
    - [`(default)`](#default)
    - [`actions`](#actions)
    - [`attachment`](#attachment)
    - [`badge`](#badge)
    - [`collection`](#collection)
    - [`description`](#description)
    - [`feedback`](#feedback)
    - [`filled-content`](#filled-content)
    - [`footer`](#footer)
    - [`heading`](#heading)
    - [`icon`](#icon)
    - [`label`](#label)
    - [`legal`](#legal)
    - [`media`](#media)
    - [`preview`](#preview)
    - [`sources`](#sources)
    - [`status`](#status)
    - [`subtitle`](#subtitle)
    - [`suggestions`](#suggestions)
    - [`tab-panel`](#tab-panel)
    - [`thumbnail`](#thumbnail)
    - [`title`](#title)
- [Events](#events)
    - [`change`](#change)
    - [`swc-accordion-item-toggle`](#swc-accordion-item-toggle)
    - [`swc-after-close`](#swc-after-close)
    - [`swc-after-open`](#swc-after-open)
    - [`swc-card-click`](#swc-card-click)
    - [`swc-close`](#swc-close)
    - [`swc-dropzone-dragleave`](#swc-dropzone-dragleave)
    - [`swc-dropzone-dragover`](#swc-dropzone-dragover)
    - [`swc-dropzone-drop`](#swc-dropzone-drop)
    - [`swc-dropzone-should-accept`](#swc-dropzone-should-accept)
    - [`swc-message-feedback-change`](#swc-message-feedback-change)
    - [`swc-message-sources-toggle`](#swc-message-sources-toggle)
    - [`swc-open`](#swc-open)
    - [`swc-prompt-field-input`](#swc-prompt-field-input)
    - [`swc-prompt-field-stop`](#swc-prompt-field-stop)
    - [`swc-prompt-field-submit`](#swc-prompt-field-submit)
    - [`swc-prompt-field-upload-click`](#swc-prompt-field-upload-click)
    - [`swc-response-status-toggle`](#swc-response-status-toggle)
    - [`swc-suggestion`](#swc-suggestion)
    - [`swc-upload-attachment-dismiss`](#swc-upload-attachment-dismiss)
- [Methods](#methods)
    - [`click`](#click)
    - [`focus`](#focus)
    - [`getPendingAccessibleName`](#getpendingaccessiblename)
    - [`getUpdateComplete`](#getupdatecomplete)
    - [`renderPendingState`](#renderpendingstate)
    - [`requestClose`](#requestclose)
    - [`requestOpen`](#requestopen)

</details>

<!-- Document content (editable) -->

_(updated from v.0.0.8 on 9/1/2026)_

Consolidated API surface across all Spectrum Web Components and patterns. Each entry lists every component or pattern that exposes that property, slot, event, or method.

## Properties

### `accessibleLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionButton | Component | accessible-label | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text. | string \| undefined | — | — |
| ActionGroup | Component | accessible-label | Accessible label for the group. Reflected to `aria-label` on the host. Providing a label is recommended whenever the strip has a distinct purpose (e.g., "Image adjustments" or "Edit"). An empty value removes the `aria-label` attribute. | string | — | '' |
| Button | Component | accessible-label | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text. | string \| undefined | — | — |
| CloseButton | Component | accessible-label | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text. | string \| undefined | — | — |
| ConversationTurn | Pattern | accessible-label | Optional accessible label override for the turn group. When omitted, the label falls back to `type` ("User message" / "System message"). | string | — | '' |
| Icon | Component | accessible-label | Accessible label for the icon. When empty the icon is decorative. | string | — | '' |
| InfieldButton | Component | accessible-label | Accessible label forwarded to the internal `<button>` element as `aria-label`. Required for icon-only buttons, which have no visible text. | string \| undefined | — | — |
| MessageSources | Pattern | accessible-label | Optional accessible label override for assistive technologies. | string | — | '' |
| Meter | Component | accessible-label | Rare-case accessible-name fallback used when there is no visible `label` slot content (for example, a data grid of meters). Renders into `aria-label` on the role element when set. | string | — | '' |
| Popover | Component | accessible-label | Accessible name for the popover's dialog surface, forwarded as `aria-label` to the internal element. Required in both modes (the surface is a dialog); the component dev-warns when opened without one. | string | — | '' |
| ProgressBar | Component | accessible-label | Rare-case accessible-name fallback used when there is no visible `label` slot content (for example, a data grid of meters). Renders into `aria-label` on the role element when set. | string | — | '' |
| PromptField | Pattern | accessible-label | Optional accessible label override for the textarea. | string | — | '' |
| ResponseStatus | Pattern | accessible-label | Accessible name for the step list panel. | string | — | '' |
| SuggestionGroup | Pattern | accessible-label | Accessible name override for the host `role="group"`. When set, it takes precedence over `aria-labelledby` from the heading slot. | string | — | '' |
| Tabs | Component | accessible-label | Accessible label for the tablist. Rendered as `aria-label` on the element with `role="tablist"` in the concrete template. | string | — | '' |
| UiIcon | Component | accessible-label | Accessible label for the icon. When empty the icon is decorative. | string | — | '' |
| UploadAttachment | Pattern | accessible-label | Accessible name for the tile itself. When unset, derives from the `title` slot's text content (typically the file name and type). | string | — | '' |

### `align`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ButtonGroup | Component | align | The alignment of buttons within the group along the main axis. | ButtonGroupAlignment | start \| center \| end | 'start' |

### `allowMultiple`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Accordion | Component | allow-multiple | When set, multiple items may be open at the same time. By default only one item can be open. | boolean | — | false |

### `alt`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Avatar | Component | alt | Text description of the avatar image. | string \| undefined | — | — |

### `attachmentScrollNextLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | attachment-scroll-next-label | Accessible label for the next-attachment scroll button. | string | — | 'Show more attachments' |

### `attachmentScrollPrevLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | attachment-scroll-prev-label | Accessible label for the previous-attachment scroll button. | string | — | 'Show previous attachments' |

### `attachmentStripLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | attachment-strip-label | Accessible name for the uploaded-attachments strip landmark. | string | — | 'Uploaded assets strip' |

### `color`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ColorHandle | Component | color | The CSS color value shown inside the handle. Supports any valid CSS color string, including alpha transparency (which reveals the checkerboard). Default is semi-transparent red so the opacity checkerboard is visible when the component is rendered without a `color` attribute. | string | — | 'rgba(255, 0, 0, 0.5)' |
| ColorLoupe | Component | color | The CSS color value to display inside the loupe. Supports any valid CSS color string, including those with alpha transparency (which reveals the checkerboard behind). Default is semi-transparent red so the opacity checkerboard is visible when the component is rendered without a `color` attribute. | string | — | 'rgba(255, 0, 0, 0.5)' |

### `compact`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionGroup | Component | compact | Whether the group uses compact density. Buttons visually join by collapsing shared borders and resetting interior border-radius values. Has no visual effect when `quiet` is also set. | boolean | — | false |

### `containerPadding`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tooltip | Component | container-padding | Minimum inset from the viewport edge, in pixels, for collision detection. | number | — | 12 |

### `crossOffset`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | cross-offset | Cross-axis offset in pixels from the trigger. | number | — | 0 |
| Tooltip | Component | cross-offset | Slide along the trigger edge perpendicular to the placement direction, in pixels. | number | — | 0 |

### `decorative`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Avatar | Component | decorative | Marks the avatar as decorative, hiding it from assistive technology. | boolean | — | false |

### `delay`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tooltip | Component | delay | Warm-up delay in milliseconds before the tooltip opens on pointer hover. Set to `0` to open immediately. Keyboard focus always opens immediately. | number | — | 1500 |

### `density`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Accordion | Component | density | Controls vertical spacing between items. | AccordionDensity | compact \| regular \| spacious | 'regular' |
| Card | Component | density | The density of the card, controlling internal spacing and gaps. | CardDensity | compact \| regular \| spacious | 'regular' |
| Tabs | Component | density | Layout density: `regular` (default) or `compact` (reduced tab spacing). | TabDensity | regular \| compact | — |

### `direction`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tabs | Component | direction | The layout direction of the tab list: `horizontal` (default) or `vertical`. | TabsDirection | horizontal \| vertical | 'horizontal' |

### `disabled`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Accordion | Component | disabled | Disables all items in the accordion. Individual items may also be disabled independently. | boolean | — | false |
| AccordionItem | Component | disabled | Whether the accordion item is disabled. A disabled item keeps its header in the tab order but blocks toggling. | boolean | — | false |
| ActionButton | Component | disabled | Whether the button is disabled. Removes focusability and prevents interaction. | boolean | — | false |
| ActionGroup | Component | disabled | Whether the group and all of its children are disabled. Sets `aria-disabled="true"` on the host and propagates `aria-disabled` to each managed child. Children remain keyboard-reachable so that screen reader users can still discover the group. Native `disabled` is not applied to children. | boolean | — | false |
| Avatar | Component | disabled | Renders the avatar at reduced opacity, indicating the entity is inactive or unavailable. | boolean | — | false |
| Button | Component | disabled | Whether the button is disabled. Removes focusability and prevents interaction. | boolean | — | false |
| ButtonGroup | Component | disabled | Whether all buttons in the group are disabled. When `true`, forces every slotted button child to `disabled`. When `false`, children retain their individual disabled state — a button slotted with `disabled` remains disabled even when the group is enabled. | boolean | — | false |
| CloseButton | Component | disabled | Whether the button is disabled. Removes focusability and prevents interaction. | boolean | — | false |
| ColorHandle | Component | disabled | Reflected. Suppresses the loupe (`open && !disabled`). | boolean | — | false |
| InfieldButton | Component | disabled | Whether the button is disabled. Removes focusability and prevents interaction. | boolean | — | false |
| PromptField | Pattern | disabled | Disables the textarea and all actions. | boolean | — | false |
| Tab | Component | disabled | Whether this tab is disabled. Disabled tabs are announced as unavailable by assistive technology and cannot be activated, but remain focusable via arrow keys within the tablist. | boolean | — | false |
| Tabs | Component | disabled | Whether the entire tab list is disabled. When `true`, `aria-disabled="true"` is applied to the tablist element and all interaction is suppressed. | boolean | — | false |
| Tooltip | Component | disabled | When set, the tooltip does not respond to hover or focus events and cannot be opened. `disabled` takes priority over `open`: setting `open` to `true` while disabled is a no-op, and disabling an open tooltip closes it. Applies in `manual` mode as well. | boolean | — | false |

### `dismissible`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| UploadAttachment | Pattern | dismissible | When `true`, show a dismiss affordance and emit `swc-upload-attachment-dismiss` on click. | boolean | — | false |

### `dismissLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| UploadAttachment | Pattern | dismiss-label | Accessible label for the dismiss/remove attachment button. When unset, derives "Remove [file name].[file type]" from the `title` slot's text content, falling back to "Remove attachment" when no title text is available. | string | — | '' |

### `dragged`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | Component | dragged | Whether files are currently being dragged over the drop zone. Set automatically by the component; also settable to reflect programmatic state. | boolean | — | false |

### `draggedMessage`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | Component | dragged-message | Message announced via the built-in status region when a file is dragged over an empty drop zone. Override to localize. | string | — | 'File ready to drop' |

### `dropEffect`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | Component | drop-effect | The OS drag-cursor feedback shown while a file is held over the zone. Maps directly to `DataTransfer.dropEffect`. Settable via the `drop-effect` attribute, but property changes do not reflect back to the attribute because it controls browser chrome, not component state. | 'copy' \| 'move' \| 'link' \| 'none' | — | 'copy' |

### `fill`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ColorHandle | Component | fill | Reflected. `true` shows the inner color swatch (1st-gen behavior); `false` renders an outline-only handle. | boolean | — | true |

### `filled`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | Component | filled | Whether the drop zone has received a file and is in the filled state. Set by consuming code after a successful drop or browse-file selection to switch the zone to its filled visual. | boolean | — | false |

### `filledMessage`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | Component | filled-message | Message announced via the built-in status region when a file is accepted. Override to localize. | string | — | 'File accepted' |

### `fillStyle`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Button | Component | fill-style | The fill style of the button. `outline` is only supported with `primary` and `secondary` variants. | ButtonFillStyle | fill \| outline | 'fill' |

### `fixed`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Badge | Component | fixed | The fixed position of the badge. | FixedValues \| undefined | block-start \| block-end \| inline-start \| inline-end | — |

### `focused`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ColorHandle | Component | focused | Reflected. Set by the parent color component when the parent picker is focused (keyboard or programmatic); enlarges the handle as the focus indicator. | boolean | — | false |

### `for`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | for | ID of the trigger element in the same document tree root. | string \| undefined | — | — |
| Tooltip | Component | for | The `id` of the trigger element in the same document tree root. | string \| undefined | — | — |

### `formatOptions`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Meter | Component | — | `Intl.NumberFormatOptions` used to format the visible value and `aria-valuetext` when `valueLabel` is unset. JS property only — no attribute (full `Intl.NumberFormat` pass-through). | Intl.NumberFormatOptions \| undefined | — | — |
| ProgressBar | Component | — | `Intl.NumberFormatOptions` used to format the visible value and `aria-valuetext` when `valueLabel` is unset. JS property only — no attribute (full `Intl.NumberFormat` pass-through). | Intl.NumberFormatOptions \| undefined | — | — |

### `generating`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | generating | Shows the stop button in place of send while a response is generating. | boolean | — | false |

### `groupLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| MessageFeedback | Pattern | group-label | Accessible label for the feedback button group. | string | — | 'Response feedback' |

### `hideArrow`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | hide-arrow | Hide the popover's arrow (tip). The arrow is shown by default. | boolean | — | false |

### `icon`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PixelLoader | Pattern | icon | Icon to display. Ignored while `preset` is set. | PixelLoaderIconName | aiLogo \| brush \| eye \| hourglass \| mag \| crop \| flower \| image \| lasso \| page \| wand \| bargraph \| trefoil \| dial \| folder \| arrow \| cloud \| comment \| filter \| microphone \| pencil \| potion \| slider \| timeline \| eyedrop \| adobeA \| adobeD \| adobeO \| adobeB \| adobeE | 'aiLogo' |
| UiIcon | Component | icon | The logical UI icon to render, matching a key in the icon-set registry (for example `chevron` or `corner-triangle`). | UiIconName | arrow \| asterisk \| checkmark \| chevron \| corner-triangle \| cross \| dash \| drag-handle \| link-out | — |

### `indeterminate`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ProgressBar | Component | indeterminate | When true, the bar runs a looping fill animation and all four `aria-value*` attributes are omitted from the DOM. The visible value text is also omitted. | boolean | — | false |

### `justified`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionGroup | Component | justified | Whether slotted children should expand equally to fill the available inline width of the group. | boolean | — | false |
| Button | Component | justified | Enables the button to become full-width, if the container allows it. | boolean | — | false |

### `keyboardActivation`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tabs | Component | keyboard-activation | Whether selection follows keyboard focus (`automatic`, default) or the user must press Enter or Space to activate (`manual`). Prefer `manual` when tab panels are expensive to render or not fully present in the DOM. | KeyboardActivation | manual \| automatic | — |

### `label`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Asset | Component | label | Accessible label for the asset’s file or folder variant. | string | — | '' |
| MessageSources | Pattern | label | Label shown in the disclosure button and applied to list ARIA labelling. | string | — | 'Sources' |
| PixelLoader | Pattern | label | Accessible label for the loading indicator. | string | — | 'Loading' |
| ProgressCircle | Component | label | Accessible label for the progress circle. Used to provide context about what is loading or progressing. When no accessible name is provided (no label, aria-label, or aria-labelledby), a default "Loading" label is applied. | string | — | '' |
| PromptField | Pattern | label | Accessible name for the textarea; visually hidden. | string | — | 'Prompt' |

### `labeling`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tooltip | Component | labeling | When set, the tooltip acts as the trigger's accessible name rather than its description. Use for icon-only triggers where the tooltip text is the sole accessible name. | boolean | — | false |

### `labelPosition`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Meter | Component | label-position | Position of the label relative to the bar. | LinearProgressLabelPosition | top \| side | 'top' |
| ProgressBar | Component | label-position | Position of the label relative to the bar. | LinearProgressLabelPosition | top \| side | 'top' |

### `level`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Accordion | Component | level | Heading level applied to every item header (2–6). Defaults to 3. Values outside that range are clamped. | AccordionHeadingLevel | 2 \| 3 \| 4 \| 5 \| 6 | 3 |

### `loader`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | loader | Status loader artwork: a single icon name (static), or a preset name (`cc`, `dc`, `exp`, `analyze`, `mega`) that cycles a themed sequence. Routed to the loader's icon/preset in `_renderStatusIcon`. | PixelLoaderIconName \| PixelLoaderPresetName | — | 'aiLogo' |

### `manual`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | manual | Suppress the automatic click-to-toggle wiring on the resolved trigger. When set, control visibility through the `open` property instead. ARIA relationship wiring still applies. | boolean | — | false |
| Tooltip | Component | manual | Suppresses automatic hover and focus wiring. The consumer manages visibility via the `open` property or the popover API. | boolean | — | false |

### `maxRows`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | max-rows | Maximum visible textarea rows before internal scrolling; unset relies on max-block-size alone. | number \| undefined | — | — |

### `maxValue`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Meter | Component | max-value | Top of the value range. | number | — | 100 |
| ProgressBar | Component | max-value | Top of the value range. | number | — | 100 |

### `minRows`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | min-rows | Minimum visible textarea rows before growth; unset relies on the natural single-line height. | number \| undefined | — | — |

### `minValue`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Meter | Component | min-value | Bottom of the value range. | number | — | 0 |
| ProgressBar | Component | min-value | Bottom of the value range. | number | — | 0 |

### `modal`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | modal | Opt in to blocking modal behavior (`<dialog>.showModal()`): focus trap, background inert, native `role="dialog"`. When unset, the popover uses `popover="auto"` light-dismiss behavior. | boolean | — | false |

### `negativeLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| MessageFeedback | Pattern | negative-label | Accessible label for the negative feedback button. | string | — | 'Negative response' |

### `offset`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | offset | Main-axis offset in pixels from the trigger. | number | — | 8 |
| Tooltip | Component | offset | Pixel gap along the placement axis between the trigger and the tooltip bubble. | number | — | 4 |

### `open`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| AccordionItem | Component | open | Whether the accordion item panel is expanded. | boolean | — | — |
| ColorHandle | Component | open | Reflected. Shows the built-in loupe; auto-toggled by touch pointers. | boolean | — | false |
| ColorLoupe | Component | open | Whether the loupe is visible. When `false` the loupe is hidden via CSS opacity and transform transitions. | boolean | — | false |
| MessageSources | Pattern | open | Whether the sources list is open. | boolean | — | false |
| Popover | Component | open | Whether the popover is open. | boolean | — | false |
| ResponseStatus | Pattern | open | `true`: step timeline open. | boolean | — | false |
| Tooltip | Component | open | Whether the tooltip is visible. | boolean | — | false |

### `orientation`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionGroup | Component | orientation | The layout direction of the action group. When set to `"vertical"`, the group stacks children vertically and `FocusgroupNavigationController` moves focus with the Up/Down arrow keys instead of Left/Right. Note: this property does NOT set `aria-orientation` on the host. The host's role is fixed to `role="group"`, and `aria-orientation` is only a supported ARIA attribute on roles that expose it (`toolbar`, `listbox`, `menu`, etc.), not `group`, regardless of this component's roving-tabindex keyboard model. Setting it anyway fails axe's `aria-allowed-attr` rule. | ActionGroupOrientation | horizontal \| vertical | 'horizontal' |
| ButtonGroup | Component | orientation | The layout direction of the button group. Note: this property does NOT set `aria-orientation` on the host because `aria-orientation` is only meaningful for roles that manage arrow-key navigation (e.g. `toolbar`, `listbox`). Since button-group uses sequential Tab navigation (not roving tabindex), the attribute would be invalid. | ButtonGroupOrientation | horizontal \| vertical | 'horizontal' |
| IllustratedMessage | Component | orientation | The layout orientation | IllustratedMessageOrientation | vertical \| horizontal | 'vertical' |

### `outline`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Avatar | Component | outline | Renders a visual outline around the avatar image. | boolean | — | false |
| Badge | Component | outline | Whether the badge is outlined. Can only be used with semantic variants. | boolean | — | false |

### `paused`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PixelLoader | Pattern | paused | Renders the fully-settled, non-animating appearance. | boolean | — | false |

### `pending`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionButton | Component | pending | Whether the element is in a pending (busy) state. The element remains focusable but activation is suppressed. | boolean | — | false |
| Button | Component | pending | Whether the element is in a pending (busy) state. The element remains focusable but activation is suppressed. | boolean | — | false |

### `pendingActive`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionButton | Component | — | Whether the delayed busy visual is active. Read this in `render()` to apply the busy styling. | boolean | — | — |
| Button | Component | — | Whether the delayed busy visual is active. Read this in `render()` to apply the busy styling. | boolean | — | — |

### `pendingLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionButton | Component | pending-label | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). | string \| undefined | — | — |
| Button | Component | pending-label | Custom accessible label used during the pending state. When omitted, the pending label is derived from the resolved non-busy accessible name plus a busy suffix (e.g. "Save, busy"). | string \| undefined | — | — |

### `placeholder`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | placeholder | Placeholder text shown inside the textarea. | string | — | 'Ready to get started? Ask a question, share an idea, or add a task.' |

### `placement`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | placement | The placement of the popover relative to its trigger. | Placement | bottom \| bottom-left \| bottom-right \| bottom-start \| bottom-end \| top \| top-left \| top-right \| top-start \| top-end \| left \| left-top \| left-bottom \| start \| start-top \| start-bottom \| right \| right-top \| right-bottom \| end \| end-top \| end-bottom | 'bottom' |
| Tooltip | Component | placement | Preferred placement of the tooltip relative to its trigger. This is always the consumer's requested side; the resolved physical side (after any viewport-driven flip) is reflected as `actual-placement`. | TooltipPlacement | top \| bottom \| left \| right \| start \| end | 'top' |

### `positiveLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| MessageFeedback | Pattern | positive-label | Accessible label for the positive feedback button. | string | — | 'Positive response' |

### `preset`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PixelLoader | Pattern | preset | Cycles through a themed sequence of icons, one per loop, instead of a single `icon`. | PixelLoaderPresetName \| undefined | cc \| dc \| exp \| analyze \| mega | — |

### `progress`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ProgressCircle | Component | progress | Progress value from 0 to 100. When `null` (indeterminate), the component shows a loading animation. Setting a number switches to determinate mode. Removing the `progress` attribute or setting this property to `null` returns to indeterminate. Values outside 0–100 or non-finite numbers are clamped (non-finite becomes 0). Reflected to the `progress` attribute when set; the attribute is omitted when indeterminate. | number \| null | — | null |

### `quiet`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Accordion | Component | quiet | Renders the accordion in its quiet (no-border) visual variant. | boolean | — | false |
| ActionButton | Component | quiet | Applies the quiet (low-emphasis) visual treatment. | boolean | — | false |
| ActionGroup | Component | quiet | Whether the group and its children use the quiet visual style. Propagated to all slotted `swc-action-button` and `swc-action-menu` children. Also disables the compact border-join styling when both `compact` and `quiet` are set. | boolean | — | false |
| InfieldButton | Component | quiet | Applies the quiet (no-background) visual treatment. Used when the infield button is part of a quiet field variant. | boolean | — | false |

### `replaceMessage`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Dropzone | Component | replace-message | Message announced via the built-in status region when a file is dragged over an already-filled drop zone. Override to localize. | string | — | 'Drop to replace existing file' |

### `selectable`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Card | Component | selectable | Makes the card focusable and captures surface clicks (excluding nested interactive targets) to dispatch a `swc-card-click` event, independent of `titleAsLink`. | boolean | — | false |

### `selected`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tab | Component | selected | Whether this tab is currently selected. Managed by the parent `swc-tabs` container — consumers should not set this directly. Use `swc-tabs[selected]` instead. | boolean | — | false |
| TabPanel | Component | selected | Whether this panel is currently visible (its associated tab is selected). Managed by the parent `swc-tabs` — consumers should not set this directly. | boolean | — | false |
| Tabs | Component | selected | The `tab-id` of the currently selected tab. Setting this property updates which tab appears selected and which panel is visible. | string | — | '' |

### `sendLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | send-label | Accessible label for the send action button. | string | — | 'Send' |

### `shadowRootOptions`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionButton | Component | — | — | ShadowRootInit | — | { ...SpectrumElement.shadowRootOptions, delegatesFocus: true, } |
| ActionGroup | Component | — | — | object | — | { ...SpectrumElement.shadowRootOptions, delegatesFocus: true, } |
| Button | Component | — | — | ShadowRootInit | — | { ...SpectrumElement.shadowRootOptions, delegatesFocus: true, } |
| CloseButton | Component | — | — | ShadowRootInit | — | { ...SpectrumElement.shadowRootOptions, delegatesFocus: true, } |
| InfieldButton | Component | — | — | ShadowRootInit | — | { ...SpectrumElement.shadowRootOptions, delegatesFocus: false, } |

### `shouldFlip`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | should-flip | Allow the popover to flip to the opposite side when constrained. When `false`, the popover stays in the requested placement. | boolean | — | true |
| Tooltip | Component | should-flip | Whether the tooltip may reposition to the opposite side when the requested placement does not fit within the viewport. | boolean | — | true |

### `size`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Accordion | Component | size | Size applied to all items. Defaults to `m`. | ElementSize | s \| m \| l \| xl | — |
| AccordionItem | Component | size | The size of the item. Inherited from the parent accordion; controls which chevron icon is displayed. Has no effect when the item is used standalone. | AccordionSize \| undefined | s \| m \| l \| xl | — |
| ActionButton | Component | size | The size of the button. | ElementSize | xs \| s \| m \| l \| xl | m |
| ActionGroup | Component | size | The size of the action group. Propagated to all slotted children. | ElementSize | xs \| s \| m \| l \| xl | — |
| Avatar | Component | size | The size of the avatar. Invalid values fall back to the default (500). | AvatarSize | 50 \| 75 \| 100 \| 200 \| 300 \| 400 \| 500 \| 600 \| 700 \| 800 \| 900 \| 1000 \| 1100 \| 1200 \| 1300 \| 1400 \| 1500 | 500 |
| Badge | Component | size | The size of the badge. | ElementSize | s \| m \| l \| xl | s |
| Button | Component | size | The size of the button. | ElementSize | s \| m \| l \| xl | m |
| ButtonGroup | Component | size | The size of the button group. Propagated to all slotted button children. | ElementSize | s \| m \| l \| xl | m |
| Card | Component | size | — | ElementSize | xs \| s \| m \| l \| xl | — |
| CloseButton | Component | size | The size of the button. | ElementSize | s \| m \| l \| xl | m |
| Divider | Component | size | The size of the divider. | ElementSize | s \| m \| l | m |
| Dropzone | Component | size | The size of the drop zone. | ElementSize | s \| m \| l | m |
| Icon | Component | size | T-shirt icon size. | ElementSize | xs \| s \| m \| l \| xl | m |
| IllustratedMessage | Component | size | The size of the message | IllustratedMessageSize | s \| m \| l | 'm' |
| InfieldButton | Component | size | The size of the button. | ElementSize | s \| m \| l \| xl | m |
| Meter | Component | size | The size of the meter. | ElementSize | s \| m \| l \| xl | m |
| Popover | Component | size | Optional fixed size. When set, the popover uses a fixed inline size (`s` → 336px, `m` → 416px, `l` → 576px); when unset, it fits its contents. | PopoverSize \| undefined | s \| m \| l | — |
| ProgressBar | Component | size | The size of the progress bar. | ElementSize | s \| m \| l \| xl | m |
| ProgressCircle | Component | size | The size of the progress circle. | ElementSize | s \| m \| l | m |
| StatusLight | Component | size | The size of the status light. | ElementSize | s \| m \| l \| xl | — |
| UiIcon | Component | size | T-shirt icon size. | ElementSize | xs \| s \| m \| l \| xl | m |

### `src`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Avatar | Component | src | URL of the profile image to display. | string | — | '' |

### `staticColor`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ActionButton | Component | static-color | Static color treatment for display over colored or image backgrounds. | ActionButtonStaticColor \| undefined | white \| black | — |
| ActionGroup | Component | static-color | The static color variant to apply when the group is placed over an image or colored background. Propagated to all slotted children. - `"white"`: use on dark or colored backgrounds. - `"black"`: use on light backgrounds. | ActionGroupStaticColor \| undefined | white \| black | — |
| Button | Component | static-color | Static color treatment for display over colored or image backgrounds. Only supported with `primary` and `secondary` variants. | ButtonStaticColor \| undefined | white \| black | — |
| CloseButton | Component | static-color | Static color treatment for display over colored or image backgrounds. | ButtonStaticColor \| undefined | white \| black | — |
| Divider | Component | static-color | The static color variant to use for the divider. | DividerStaticColor \| undefined | white \| black | — |
| Meter | Component | static-color | Static color override for use on images or colored backgrounds. | LinearProgressStaticColor \| undefined | white \| black | — |
| ProgressBar | Component | static-color | Static color override for use on images or colored backgrounds. | LinearProgressStaticColor \| undefined | white \| black | — |
| ProgressCircle | Component | static-color | Static color variant for use on different backgrounds. When set to 'white', the component uses white styling for images with a dark tinted background. When set to 'black', the component uses black styling for images with a light tinted background. | ProgressCircleStaticColor \| undefined | white \| black | — |

### `status`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| MessageFeedback | Pattern | status | The currently selected feedback status. - `positive`: positive feedback selected - `negative`: negative feedback selected - `undefined`: no feedback selected This is controlled by the consumer. The component dispatches `swc-message-feedback-change` on click and expects the parent to update `status`. | 'positive' \| 'negative' \| undefined | — | — |
| ResponseStatus | Pattern | status | Whole response lifecycle status. | ResponseStatusStatus | active \| complete \| stopped | 'active' |
| ResponseStatusStep | Pattern | status | Timeline state for connector icons. | 'active' \| 'complete' \| 'stopped' | — | 'active' |

### `stopLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | stop-label | Accessible label for the stop action button while generating. | string | — | 'Stop generating' |

### `subtle`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Badge | Component | subtle | Whether the badge is subtle. | boolean | — | false |

### `tabId`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Tab | Component | tab-id | Unique identifier for this tab. Used by the parent `swc-tabs` to match this tab to its corresponding `swc-tab-panel`. | string | — | '' |
| TabPanel | Component | tab-id | Unique identifier linking this panel to its corresponding tab. Must match the `tab-id` attribute on the associated `swc-tab`. | string | — | '' |

### `titleAsLink`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Card | Component | title-as-link | Indicates the consumer has wrapped their `title` slot content in a real link. Extends that link's hit area to cover the card surface while leaving navigation entirely consumer-owned; Card accepts no `href`. | boolean | — | false |

### `triggerElement`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Popover | Component | — | Direct trigger reference. Overrides `for` when both are set. Use for cross-shadow-root triggers or programmatic wiring. | HTMLElement \| VirtualTrigger \| null | — | null |
| Tooltip | Component | — | Explicit trigger element reference; overrides `for` when set. Use when `getElementById` cannot reach the trigger, such as across a shadow boundary. | HTMLElement \| null | — | null |

### `truncate`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Button | Component | truncate | Whether overflowing text is truncated with an ellipsis rather than wrapping. Replaces the legacy `no-wrap` attribute from 1st-gen. | boolean | — | false |

### `type`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| ConversationTurn | Pattern | type | `user` — end-aligned; `system` — start-aligned, full width of the column. Drives the accessible name of the turn (`User message` vs `System message`). | 'system' \| 'user' | — | 'user' |
| UploadAttachment | Pattern | type | Visual treatment type for this attachment. | 'card' \| 'media' | — | 'card' |
| UserMessage | Pattern | type | Visual content type for the user message bubble. | UserMessageType | copy \| card \| media | 'copy' |

### `uploadLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| PromptField | Pattern | upload-label | Accessible label for the upload button. | string | — | 'Add attachment' |

### `value`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Meter | Component | value | Current value. Sanitized via `clampedValue` for rendering and `aria-valuenow`. | number | — | 0 |
| ProgressBar | Component | value | Current value. Sanitized via `clampedValue` for rendering and `aria-valuenow`. | number | — | 0 |
| PromptField | Pattern | value | The current textarea value; internally updated and externally mirrorable. | string | — | '' |

### `valueLabel`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Meter | Component | value-label | Custom value text (e.g. `"1 of 4"`). Overrides the auto-formatted value in both rendered text and `aria-valuetext`. | string \| undefined | — | — |
| ProgressBar | Component | value-label | Custom value text (e.g. `"1 of 4"`). Overrides the auto-formatted value in both rendered text and `aria-valuetext`. | string \| undefined | — | — |

### `variant`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Asset | Component | variant | The variant of the asset. When not provided, slot content is rendered (e.g., an image). | AssetVariant \| undefined | file \| folder | — |
| Badge | Component | variant | The semantic or non-semantic color variant of the badge. | BadgeVariant | accent \| informative \| neutral \| positive \| notice \| negative \| fuchsia \| indigo \| magenta \| purple \| seafoam \| yellow \| gray \| red \| orange \| chartreuse \| celery \| green \| cyan \| blue \| pink \| turquoise \| brown \| cinnamon \| silver | 'neutral' |
| Button | Component | variant | The visual variant of the button. `outline` fill-style is only supported with `primary` and `secondary`. `static-color` is only supported with `primary` and `secondary`. | ButtonVariant | primary \| secondary \| accent \| negative | 'primary' |
| Card | Component | variant | The visual variant of the card. | CardVariant | primary \| secondary \| tertiary \| quiet | 'primary' |
| Meter | Component | variant | The variant of the meter. Drives the bar fill color. | MeterVariant | informative \| positive \| notice \| negative | 'informative' |
| PromptField | Pattern | variant | Visual intensity of the AI brand treatment. | 'subtle' \| 'balanced' \| 'prominent' | — | 'balanced' |
| StatusLight | Component | variant | Semantic or non-semantic color variant for the status dot. | string | — | 'neutral' |
| Tooltip | Component | variant | The semantic variant of the tooltip. | TooltipVariant | neutral \| informative \| negative | 'neutral' |

### `vertical`

| Component | Category | Attribute | Description | Data type | Allowed values | Default value |
| --- | --- | --- | --- | --- | --- | --- |
| Divider | Component | vertical | Whether the divider is vertical. If false, the divider is horizontal. The default is false. | boolean | — | false |
| Tab | Component | vertical | Whether the tab is displayed in vertical orientation. Orientation is primarily driven by the parent `swc-tabs` `direction` attribute; this property remains for styling and any consumers that read it explicitly. We can remove it in a future major once vertical layout is fully parent-driven only—track that cleanup in the component backlog if it becomes redundant in practice. | boolean | — | false |

## Slots

### `(default)`

| Component | Category | Description |
| --- | --- | --- |
| Accordion | Component | One or more `swc-accordion-item` elements. |
| AccordionItem | Component | The panel content revealed when the item is open. |
| ActionButton | Component | Visible button label. |
| ActionGroup | Component | One or more `swc-action-button` or `swc-action-menu` elements. |
| Asset | Component | content to be displayed when no `variant` is set (typically an `<img>` element) |
| Badge | Component | Text label of the badge. |
| Button | Component | Visible button label. |
| ButtonGroup | Component | One or more `swc-button` elements. |
| Card | Component | Additional body content |
| ConversationThread | Pattern | Conversation turns, typically `<swc-conversation-turn>` elements. |
| ConversationTurn | Pattern | Turn body (message stack or bubble) |
| Dropzone | Component | Slot for the illustrated message and browse control. Hidden automatically when `filled` is `true`. A browse button or link **must** always be provided so keyboard users can upload files. |
| IllustratedMessage | Component | Decorative or informative SVG illustration |
| MessageSources | Pattern | Anchor (`<a>`) elements projected into a numbered list when expanded |
| Popover | Component | Popover content. |
| ResponseStatus | Pattern | `<swc-response-status-step>` elements. |
| StatusLight | Component | The text label of the status light. |
| SuggestionGroup | Pattern | Suggestion items (recommended: `<swc-suggestion-item>`) |
| SuggestionItem | Pattern | Suggestion label text/content. |
| SystemMessage | Pattern | System message body (semantic HTML; styled with Spectrum token variables) |
| Tab | Component | Text label of the tab |
| TabPanel | Component | Content displayed when the associated tab is selected |
| Tabs | Component | Tab items (`swc-tab` elements) |
| Tooltip | Component | Text label displayed in the tooltip. |
| UserMessage | Pattern | Message copy content when `type="copy"`. |

### `actions`

| Component | Category | Description |
| --- | --- | --- |
| AccordionItem | Component | Optional actions rendered adjacent to the heading, outside the toggle button so they remain independently interactive. |
| Card | Component | Optional action controls |
| IllustratedMessage | Component | Optional action controls displayed below the description, typically a button or button group. Receives `size` automatically from the illustrated message. |
| UploadAttachment | Pattern | Optional trailing actions. |

### `attachment`

| Component | Category | Description |
| --- | --- | --- |
| PromptField | Pattern | Optional attachment preview(s). Use one `swc-upload-attachment` type per session (cards only, or media only). |

### `badge`

| Component | Category | Description |
| --- | --- | --- |
| UploadAttachment | Pattern | Optional file-type badge rendered over `type="media"` previews (for example, "PDF"). |

### `collection`

| Component | Category | Description |
| --- | --- | --- |
| Card | Component | Optional collection images. Assign each image to the slot. |

### `description`

| Component | Category | Description |
| --- | --- | --- |
| Card | Component | Supporting description text |
| IllustratedMessage | Component | Supporting description text |
| Meter | Component | Additional description text below the meter. Referenced via `aria-describedby` on the shadow `meter` role element when assigned nodes are present. |
| ProgressBar | Component | Additional description text below the progress bar. Referenced via `aria-describedby` on the shadow `progressbar` role element when assigned nodes are present. |
| ResponseStatusStep | Pattern | Step detail shown in the expanded timeline |

### `feedback`

| Component | Category | Description |
| --- | --- | --- |
| SystemMessage | Pattern | Positive / negative feedback controls |

### `filled-content`

| Component | Category | Description |
| --- | --- | --- |
| Dropzone | Component | Slot for the uploaded-state content (e.g. an image preview). Shown automatically when `filled` is `true`; hidden otherwise. |

### `footer`

| Component | Category | Description |
| --- | --- | --- |
| Card | Component | Optional footer content |

### `heading`

| Component | Category | Description |
| --- | --- | --- |
| IllustratedMessage | Component | Optional heading; when present, must be a single h2–h6 element. Both constraints (allowed h2–h6 children and a single heading) are validated in dev mode. |
| SuggestionGroup | Pattern | Required heading content; consumer controls semantic element. |

### `icon`

| Component | Category | Description |
| --- | --- | --- |
| ActionButton | Component | Optional leading icon displayed before the label. |
| Badge | Component | Optional icon that appears to the left of the label |
| Button | Component | Leading icon displayed before the label. |
| InfieldButton | Component | Icon to display inside the button. |
| Tab | Component | Optional icon displayed before the label |

### `label`

| Component | Category | Description |
| --- | --- | --- |
| AccordionItem | Component | The heading text for this accordion item. |
| Meter | Component | Visible label for the meter. Referenced via `aria-labelledby` on the shadow `meter` role element. |
| ProgressBar | Component | Visible label for the progress bar. Referenced via `aria-labelledby` on the shadow `progressbar` role element. |
| ResponseStatus | Pattern | Header row label. Falls back to the active step label. |
| ResponseStatusStep | Pattern | Step title (shown in the header when `status="active"`) |

### `legal`

| Component | Category | Description |
| --- | --- | --- |
| PromptField | Pattern | Legal disclaimer content. Required in product implementations; provide Legal-approved copy. |

### `media`

| Component | Category | Description |
| --- | --- | --- |
| Card | Component | Optional overlay content (e.g. a badge or avatar) layered over the preview/collection media region. |

### `preview`

| Component | Category | Description |
| --- | --- | --- |
| Card | Component | Primary preview content |

### `sources`

| Component | Category | Description |
| --- | --- | --- |
| SystemMessage | Pattern | Collapsible list of sources |

### `status`

| Component | Category | Description |
| --- | --- | --- |
| SystemMessage | Pattern | Response status indicator (thinking / complete) |

### `subtitle`

| Component | Category | Description |
| --- | --- | --- |
| UploadAttachment | Pattern | Secondary text label. |
| UserMessage | Pattern | Attachment subtitle when `type="card"` or `type="media"`. |

### `suggestions`

| Component | Category | Description |
| --- | --- | --- |
| SystemMessage | Pattern | Follow-up suggestion chips (rendered outside the main body) |

### `tab-panel`

| Component | Category | Description |
| --- | --- | --- |
| Tabs | Component | Tab panel content (`swc-tab-panel` elements) |

### `thumbnail`

| Component | Category | Description |
| --- | --- | --- |
| UploadAttachment | Pattern | Shared visual slot for icon/thumbnail/preview image. |
| UserMessage | Pattern | Attachment preview when `type="card"` or `type="media"`. |

### `title`

| Component | Category | Description |
| --- | --- | --- |
| Card | Component | Card title |
| UploadAttachment | Pattern | Primary text label. |
| UserMessage | Pattern | Attachment title when `type="card"` or `type="media"`. |

## Events

### `change`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| Tabs | Component | The selected tab has changed. Cancelable — calling `preventDefault()` reverts the selection. | Event |

### `swc-accordion-item-toggle`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| AccordionItem | Component | Dispatched when the item open state is toggled. Cancelable; `preventDefault()` reverts the change. | — |

### `swc-after-close`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| AccordionItem | Component | Dispatched after the item has fully closed. | — |
| Popover | Component | Dispatched after the close transition completes. | CustomEvent |
| Tooltip | Component | Dispatched after the tooltip finishes closing, once the transition completes. | — |

### `swc-after-open`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| AccordionItem | Component | Dispatched after the item has fully opened. | — |
| Popover | Component | Dispatched after the open transition completes. | CustomEvent |
| Tooltip | Component | Dispatched after the tooltip finishes opening, once the transition completes. | — |

### `swc-card-click`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| Card | Component | Dispatched when a `selectable` card is activated (click, Enter, or Space). | — |

### `swc-close`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| AccordionItem | Component | Dispatched when the item begins closing. | — |
| Popover | Component | Dispatched when the popover begins closing. `detail.source` reports `'escape'`, `'outside'`, or `'programmatic'`. | CustomEvent |
| Tooltip | Component | Dispatched when the tooltip begins to close, before the transition plays. | — |

### `swc-dropzone-dragleave`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| Dropzone | Component | Fired when dragged files leave the zone. | — |

### `swc-dropzone-dragover`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| Dropzone | Component | Fired once when dragged files enter the zone and are accepted; does not repeat on subsequent `dragover` ticks while still hovering. | — |

### `swc-dropzone-drop`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| Dropzone | Component | Fired when files are dropped on the zone. Set `filled` in your handler to transition the zone to its filled state. | — |

### `swc-dropzone-should-accept`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| Dropzone | Component | Cancelable event fired on every native `dragover` tick while a drag is over the zone, not just on entry. Cancel to reject the dragged payload and set the cursor to `none`. | — |

### `swc-message-feedback-change`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| MessageFeedback | Pattern | Dispatched when the user toggles feedback selection. Detail: `{ status: 'positive' \| 'negative' \| undefined }` | CustomEvent |

### `swc-message-sources-toggle`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| MessageSources | Pattern | Dispatched when the panel is toggled. Detail: `{ open: boolean }` | CustomEvent |

### `swc-open`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| AccordionItem | Component | Dispatched when the item begins opening. | — |
| Popover | Component | Dispatched when the popover begins opening. | CustomEvent |
| Tooltip | Component | Dispatched when the tooltip begins to open, before the transition plays. | — |

### `swc-prompt-field-input`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| PromptField | Pattern | Dispatched after the textarea value is internally updated. Detail: `{ value: string }` | CustomEvent |

### `swc-prompt-field-stop`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| PromptField | Pattern | Dispatched when stop generation is requested while generating. | CustomEvent |

### `swc-prompt-field-submit`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| PromptField | Pattern | Dispatched when send is triggered. Detail: `{ value: string }` | CustomEvent |

### `swc-prompt-field-upload-click`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| PromptField | Pattern | Dispatched when upload affordance is activated. Consumers should handle file picker flow externally. | CustomEvent |

### `swc-response-status-toggle`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| ResponseStatus | Pattern | Dispatched when the user opens or closes the panel. Detail: `{ open: boolean }` | CustomEvent |

### `swc-suggestion`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| SuggestionItem | Pattern | Dispatched when the suggestion chip is activated. Detail: `{ label: string }` | CustomEvent |

### `swc-upload-attachment-dismiss`

| Component | Category | Description | Returns |
| --- | --- | --- | --- |
| UploadAttachment | Pattern | Dispatched when the dismiss button is pressed. Detail: `{ attachment: this }` | CustomEvent |

## Methods

### `click`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| AccordionItem | Component | — | — | () => void | void |

### `focus`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| AccordionItem | Component | — | — | (options?) => void | void |
| ActionGroup | Component | — | Focuses the roving tab stop within the group. When the `FocusgroupNavigationController` has memory, restores focus to the last active item; otherwise falls back to the first managed child. | (options?) => void | void |
| ConversationThread | Pattern | — | Focuses the current active turn. Before focusing, we refresh the slotted turn list and roving-tabindex state so we never target a stale turn when messages were added/removed just before focus. | (options?) => void | void |
| Tabs | Component | — | Focuses the selected tab, or the first tab when none is selected yet. Slotted tabs live in the light DOM; this is more reliable than relying only on shadow `delegatesFocus` across browsers and test harnesses. | (options?) => void | void |

### `getPendingAccessibleName`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| ActionButton | Component | — | Derives the pending-state accessible label. | () => string | string |
| Button | Component | — | Derives the pending-state accessible label. | () => string | string |

### `getUpdateComplete`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| Tabs | Component | — | Waits for all child tab elements to finish their update cycle before resolving so layout-dependent callers see stable geometry. | () => Promise<boolean> | Promise<boolean> |

### `renderPendingState`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| ActionButton | Component | — | Renders the pending spinner for the current state, via the controller. Lets hosts render the indicator with `${this.renderPendingState()}` and no separate directive import. | () => PendingSpinnerResult | PendingSpinnerResult |
| Button | Component | — | Renders the pending spinner for the current state, via the controller. Lets hosts render the indicator with `${this.renderPendingState()}` and no separate directive import. | () => PendingSpinnerResult | PendingSpinnerResult |

### `requestClose`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| Tooltip | Component | — | HoverControllerHost contract. Asks the tooltip to close by setting `open`; `updated()` reconciles the popover. | () => void | void |

### `requestOpen`

| Component | Category | Attribute | Description | Data type | Returns |
| --- | --- | --- | --- | --- | --- |
| Tooltip | Component | — | HoverControllerHost contract. `open` is the single source of truth for visibility; the controller asks to open via this method rather than driving the Popover API directly. `updated()` then reconciles the popover. | () => void | void |
