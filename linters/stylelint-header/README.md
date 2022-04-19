# stylelint-header

A [stylelint](https://github.com/stylelint/stylelint) custom rule to check for a header comment (i.e., copyright notice).

This rule will cause stylelint to throw an error if no header exists in the file or if autofix is enabled, it will prepend the header to the document.

## Installation

```
yarn add stylelint-header
```

### Options

#### nonMatchingTolerance

Type `numeric`; Default 0.98

This is a number between 0 and 1 representing the percentage of allowed difference between a found comment in the file and the provided header. Uses `` to determine value.

## Usage

Add it to your stylelint config `plugins` array, then add '`header/header` to your rules, specifying a string or file location for the header template.

Like so:

```js
{
  "plugins": [
    "stylelint-header"
  ],
  "rules": {
    "header/header": ["Copyright <%= YEAR %>.", { nonMatchingTolerance: 0.8 }],
  },
};
```
