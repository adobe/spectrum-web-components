# @spectrum-web-components/stylelint-header-plugin

Stylelint plugin for validating and fixing copyright header comments in CSS files. Used by the Spectrum Web Components monorepo to enforce the Apache 2.0 license header.

## Installation

This package is a workspace dependency within the repo. It is not published to npm. Depend on it via the workspace protocol:

```json
{
  "devDependencies": {
    "@spectrum-web-components/stylelint-header-plugin": "workspace:*"
  }
}
```

## Usage

Add the plugin and rule to your Stylelint config (e.g. `.stylelintrc.json`):

```json
{
  "plugins": ["@spectrum-web-components/stylelint-header-plugin"],
  "overrides": [
    {
      "files": ["**/*.css"],
      "rules": {
        "swc/header": "/**\n * Copyright 2026 Adobe. All rights reserved.\n * ...\n */"
      }
    }
  ]
}
```

The rule value can be:

- **Inline string** — A full JSDoc-style comment (without the opening `/**` and closing `*/`). The plugin normalizes whitespace and asterisks when comparing.
- **File path** — Path to a file containing the header (relative to the project root or `cwd`). The file content is read and stripped of comment delimiters.

## Rule: `swc/header`

- **Fixable**: Yes. `stylelint --fix` will add or update the header.
- **Options**:
  - `headerDetectionThreshold` (number, 0–1, default: `0.8`) — Similarity threshold (Sørensen–Dice) for treating an existing comment as a header that only needs updating (e.g. year). Comments below this are treated as missing.

The plugin resolves the header template from:

1. Absolute path (if the value is an existing file path).
2. Path relative to the workspace root (found by walking up for `.git`, `.stylelintrc.json`, or `stylelint.config.js`).
3. Path relative to the CSS file’s directory.
4. Path relative to `result.opts.cwd` (Stylelint’s `cwd`).
5. Path relative to `process.cwd()`.

If no file is found, the rule value is used as the literal header text (for inline config).

## Implementation

The plugin is plain ESM JavaScript (`index.js`) and can be loaded directly by Node and Stylelint with no build step.

## License

Apache-2.0
