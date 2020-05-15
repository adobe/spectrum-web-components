## Description

**sp-slider** allows users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/slider?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/slider)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/slider?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/slider)

```
npm install @spectrum-web-components/slider

# or

yarn add @spectrum-web-components/slider
```

### Variants

#### Standard

```html
<sp-slider></sp-slider>
<sp-slider disabled></sp-slider>
```

#### With Label

```html
<sp-slider label="Slider Label"></sp-slider>
<sp-slider label="Slider Label - Disabled" disabled></sp-slider>
```

#### Filled

```html
<sp-slider label="Slider Label" variant="filled"></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    variant="filled"
    disabled
></sp-slider>
```

#### Tick

```html
<sp-slider label="Slider Label" variant="tick" tick-step="5"></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    variant="tick"
    tick-step="5"
    disabled
></sp-slider>
```

#### Tick with Labels

```html
<sp-slider
    label="Slider Label"
    variant="tick"
    tick-step="5"
    tick-labels
></sp-slider>
<sp-slider
    label="Slider Label - Disabled"
    variant="tick"
    tick-step="5"
    tick-labels
    disabled
></sp-slider>
```

#### Ramp

```html
<sp-slider label="Slider Label" variant="ramp"></sp-slider>
<sp-slider label="Slider Label - Disabled" variant="ramp" disabled></sp-slider>
```
