# Labs

A sandbox for prototyping Spectrum components with AI assistance.

## Getting started

1. Install [Claude Code](https://claude.ai/download) if you haven't already
2. From the repo root, run `yarn start:labs` to launch Storybook in labs mode
3. Open Claude Code in the `labs/` directory and start prompting

## Connecting Figma

First time only — run inside Claude Code:

1. Type `/mcp`
2. Select **figma** → **Authenticate**
3. Click **Allow Access** in the browser

Then paste any Figma link into your prompt and Claude will translate the design into a component.

## Visual comparison

With Storybook running, Claude can screenshot your component in the browser and compare it against the Figma design. Just ask:

> "Open my component in Storybook and compare it to this Figma frame: [link]"
