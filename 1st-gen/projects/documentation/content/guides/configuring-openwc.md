---
layout: guide.njk
title: 'Configuring your @open-wc project'
displayName: Configuring your project
slug: configuring-openwc
---

This guide expounds upon configuration specifics you may want to adopt in your `@open-wc` project for a smoother development experience that matches the specifications in Spectrum Web Components.

## Building your project

In your terminal, run the following command:

```bash
npm init @open-wc
```

Once you do that, `@open-wc` will give you a few configuration options. You'll want to set up your project as a Web Component and allow it to use typescript. When it asks you what features to add, say "yes" (by pressing the Space Bar, not the Enter key) to all of them--we'll explain how to set them up to be more compatible with SWC in this guide. SWC uses `yarn` to manage its package dependencies, so you can go ahead and choose that one, as well.

## Setting up your .gitignore

The first thing to check is that your `.gitignore` file isn't set up to ignore changes to your root directory. By default, the `.gitignore` in `@open-wc` starts each of its ignored directories with a `/`. You can go ahead and replace the contents of the file with what's below, which is the same file list which omits the forward slashes.

```bash
## editors
.idea
.vscode

## system files
.DS_Store

## npm
node_modules/
npm-debug.log

## testing
coverage/

## temp folders
.tmp/

# build
_site/
dist/
out-tsc/

storybook-static
custom-elements.json
```

## Setting up your linter

While both SWC and `@open-wc` use `es-lint` and `prettier`, there are some differences in their configurations that you may want to adjust if you plan on contributing your code to Spectrum Web Components later down the line.

The biggest one is the indentation. In your `.editorconfig` file, clear the file contents and replace it with:

```yaml
root = true

[*]
end_of_line = lf
indent_style = space
indent_size = 4
charset = utf-8
```

Now, in your root directory, create a new file called `.prettierrc.yaml`. In it, add the following:

```yaml
printWidth: 80
tabWidth: 4
semi: true
singleQuote: true
trailingComma: es5
bracketSpacing: true
arrowParens: always
htmlWhitespaceSensitivity: ignore
```

## Setting up Storybook

Storybook is a great tool for demoing web components. To set it up similar to Spectrum Web Components so that you have the theme and style specifications in your stories, follow these steps.

Add the Spectrum Web Components Story Theme Decorator to your project:

```
yarn add @spectrum-web-components/story-decorator/
```

Then, in your `.storybook` directory, create a new file called `preview.js` and add:

```js
import { swcThemeDecorator } from '@spectrum-web-components/story-decorator/decorator.js';

export const decorators = [swcThemeDecorator];
```

That takes care of all of the changes we've noted so far when starting a new project with `@open-wc`. If we've missed anything here that you run into during this process, feel free to create an issue on Github.

You can now head back to our [getting started page](../getting-started.md), which will get you started using this library. Happy coding!
