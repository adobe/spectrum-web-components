---
'@spectrum-web-components/number-field': patch
---

**fix(number-field):** Fixed `step` validation moving values off the step grid, below `min`, or above `max`.

`sp-number-field` mirrored every negative value before snapping it to `step`, even when a `min` was set, so the step grid was measured from the wrong side of zero. With `min="-8"` and `step="5"`, a value of `-8` became `-7` and `-3` became `-2`. The `max` check also ran on the mirrored value, so with `max="-5"` and `step="5"` a value of `-12` became `5`. Values were also rounded to the number of decimals in `step` only, so a fractional `min` or `max` could be crossed: with `min="-8.5"` and `step="5"`, a value of `-8.5` became `-9`.

Values now snap to the nearest step counted from `min` (or from `0` when there is no `min`), stay at or below `max`, and keep the decimals of both `step` and `min`.
