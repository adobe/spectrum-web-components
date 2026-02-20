# @adobe/swc-docs-llms

Docs and llms.txt tooling for Spectrum Web Components. This package lives in 2nd-gen and can be built independently; the 1st-gen docs build also invokes some of these scripts.

**Two distinct llms.txt files (no combined index)**

- **1st-gen llms.txt** — Getting started, guides, and 1st-gen components only. Produced by `build-llms-txt.js` when the 1st-gen docs build runs. Output: `1st-gen/projects/documentation/content/llms.txt` → `dist/llms.txt` in the 1st-gen docs deploy.
- **2nd-gen llms.txt** — 2nd-gen components only. Produced by `build-llms-txt-2nd-gen.js` when you run the 2nd-gen docs build. Output: `2nd-gen/packages/tools/docs-llms/dist/llms.txt`.

**Independent builds**

- **2nd-gen** — From `2nd-gen/`: `yarn build:docs`. Output: `dist/2nd-gen/components/*.md` and `dist/llms.txt`. No 1st-gen content or Eleventy required.
- **1st-gen docs** — The 1st-gen documentation project has its own build (wireit). It runs `build-llms-txt.js` (1st-gen llms.txt), `build-2nd-gen-markdown.js` (2nd-gen component .md), and copy scripts. Deploy has 1st-gen `llms.txt`, `components/*.md`, and `2nd-gen/components/*.md` in `dist/`.

## Scripts

- **build-llms-txt.js** — Generates the **1st-gen** llms.txt: getting started, guides, and 1st-gen components only. Requires 1st-gen docs content path.

  ```bash
  node build-llms-txt.js --content-dir=<path-to-1st-gen-docs-content> --output=<path-to-llms.txt>
  ```

- **copy-component-markdown.js** — Copies 1st-gen component `content.md` files into a site output dir as `<name>.md` for stable URLs.

  ```bash
  node copy-component-markdown.js --content-dir=<path-to-content/components> --out-dir=<path-to-_site/components>
  ```

- **build-2nd-gen-markdown.js** — Generates one static `.md` per 2nd-gen component from story JSDoc (overview, anatomy, options, states, behaviors, accessibility). Output is analogous to 1st-gen component READMEs.

  ```bash
  node build-2nd-gen-markdown.js --components-dir=<path-to-2nd-gen-swc/components> --out-dir=<path-to-_site/2nd-gen/components>
  ```

- **build-llms-txt-2nd-gen.js** — Generates the **2nd-gen** llms.txt: component index with links to `2nd-gen/components/<name>.md`. Distinct from the 1st-gen llms.txt (build-llms-txt.js).

  ```bash
  node build-llms-txt-2nd-gen.js [--components-dir=<path>] [--output=<path>]
  ```

  Default output: `dist/llms.txt` (relative to this package).

## Usage from 1st-gen docs

The 1st-gen documentation project wires these via wireit: `build:llms-txt` (1st-gen llms.txt), `build:copy-md`, and `build:copy-2nd-gen-md`. Rollup copies `_site/llms.txt`, `_site/components/*.md`, and `_site/2nd-gen/components/*.md` into `dist/` for preview deploy.

## Run and test

### Build 2nd-gen docs only (independent)

From the `2nd-gen/` directory:

```bash
cd 2nd-gen
yarn build:docs
```

From repo root (if the 2nd-gen workspace is in use):

```bash
yarn workspace @spectrum-web-components/2nd-gen build:docs
```

Output: `2nd-gen/packages/tools/docs-llms/dist/2nd-gen/components/*.md` and `dist/llms.txt` (2nd-gen index). No 1st-gen involvement.

### Test 2nd-gen scripts directly

From repo root. Ensure 1st-gen docs content exists (run `yarn workspace documentation copy-docs` once if needed).

```bash
# Generate 1st-gen llms.txt (requires content from 1st-gen copy-docs)
cd 1st-gen/projects/documentation
node ../../../2nd-gen/packages/tools/docs-llms/build-llms-txt.js --content-dir=./content --output=./content/llms.txt
head -40 content/llms.txt

# Copy 1st-gen component markdown to _site (requires _site from build:eleventy)
node ../../../2nd-gen/packages/tools/docs-llms/copy-component-markdown.js --content-dir=./content/components --out-dir=./_site/components
ls _site/components/*.md | head -5

# Generate 2nd-gen component markdown from story JSDoc (no _site required; creates out-dir)
node ../../../2nd-gen/packages/tools/docs-llms/build-2nd-gen-markdown.js --components-dir=../../../2nd-gen/packages/swc/components --out-dir=./_site/2nd-gen/components
ls _site/2nd-gen/components/*.md | head -5
```

### Run full 1st-gen docs build (uses 2nd-gen tooling)

From repo root:

```bash
yarn workspace @spectrum-web-components/documentation build
```

Or from the documentation project:

```bash
cd 1st-gen/projects/documentation
yarn build
```

That runs wireit: `copy-docs` → `build:llms-txt` (1st-gen llms.txt) → `build:eleventy` → `build:copy-md` and `build:copy-2nd-gen-md`, then rollup. Output: `_site/` and `dist/` (deployable). `dist/` includes 1st-gen `llms.txt`, `components/*.md`, and `2nd-gen/components/*.md`.

### Test only llms.txt + markdown (no full build)

```bash
cd 1st-gen/projects/documentation
yarn build:llms-txt           # generates content/llms.txt (1st-gen only: getting started, guides, components)
yarn build:eleventy           # builds _site (needed before copy-md / copy-2nd-gen-md)
yarn build:copy-md            # 1st-gen: content/components/*/content.md → _site/components/*.md
yarn build:copy-2nd-gen-md    # 2nd-gen: story JSDoc → _site/2nd-gen/components/*.md
```
