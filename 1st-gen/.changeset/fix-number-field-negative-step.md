---
'@spectrum-web-components/number-field': patch
---

**fix(number-field):** Fixed `step` validation moving negative values off the step grid, below `min`, or above `max`.

`sp-number-field` mirrored every negative value before snapping it to `step`, even when a `min` was set, so the step grid was measured from the wrong side of zero. With `min="-8"` and `step="5"`, a value of `-8` became `-7` and `-3` became `-2`. The `max` check also ran on the mirrored value, so with `max="-5"` and `step="5"` a value of `-12` became `5`.

Negative values are now mirrored only when there is no `min`, and the `max` check always compares the real value.
