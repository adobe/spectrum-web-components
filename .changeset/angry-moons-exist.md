---
'@spectrum-web-components/slider': patch
---

[#​3611](https://github.com/adobe/spectrum-css/pull/3611) Thanks [@​aramos-adobe](https://github.com/aramos-adobe)!

The border radius styles were not being applied to the second instance of the slider track when the offset variant is activated. When the offset is selected, the template structure changes as fill gets added to the slider.

Adding a sibling combinator to track when offset is activated resolved the issue.
