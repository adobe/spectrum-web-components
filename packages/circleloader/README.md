## Overview

An `<sp-circleloader>` shows the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. It can represent determinate or indeterminate progress.

### Installation

```
npm install @spectrum-web-components/circleloader

# or

yarn add @spectrum-web-components/circleloader
```

## Variants

### Default

An `<sp-circleloader>` is used to visually show the progression of a system operation such as downloading, uploading, processing, etc.

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
>
    <sp-circleloader progress="71" size="small"></sp-circleloader>
    <sp-circleloader progress="22"></sp-circleloader>
    <sp-circleloader progress="86" size="large"></sp-circleloader>
</div>
```

### Over Background

When a loader needs to be placed on top of a colored background, use the over background loader as signified by `[over-background]`. This loader uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;  background-color: rgba(0,0,0,0.4);"
>
    <sp-circleloader
        progress="42"
        over-background
        size="small"
    ></sp-circleloader>
    <sp-circleloader progress="7" over-background></sp-circleloader>
    <sp-circleloader
        progress="68"
        over-background
        size="large"
    ></sp-circleloader>
</div>
```

### Indeterminate

A circle loader can be either determinate or indeterminate as signified by `[indeterminate]`. By default, loaders are determinate. Use a determinate loader when progress can be calculated against a specific goal (e.g., downloading a file of a known size). Use an indeterminate loader when progress is happening but the time or effort to completion can’t be determined (e.g., attempting to reconnect to a server).

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
>
    <sp-circleloader indeterminate size="small"></sp-circleloader>
    <sp-circleloader indeterminate></sp-circleloader>
    <sp-circleloader indeterminate size="large"></sp-circleloader>
</div>
```

### Size

Circle loaders come in 3 sizes: small (`[size="small"]`), medium (default), or large (`[size="large"]`). These are available to fit various contexts. For example, the small loader can be used in place of an icon or in tight spaces, while the large one can be used for full-page loading.
