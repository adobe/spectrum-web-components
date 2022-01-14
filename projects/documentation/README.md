# Building

You can build the entirety of the documentation site from the root of the project with the `yarn docs:build` command or from within this package via the `yarn build` command. The following conciderations will be addressed via this command.

## Search Index

`scripts/build-search-index.js` builds a Lunr.js search index for the documentation site via the `yarn build-search-index` command. To ensure that the exported JSON file is not placed into the `tsc` build, which add a large overhead to the processing that happens there, the `src` directory have a dummy copy of the file that includes only an empty object and this command places the final search index directly into the `_site` directory. From this location the Rollup build manages the inclusion of the JSON data in the JS bundles in a much more performant manner.

## Copy Docs

Working from the `README.md` files (as well as any other `*.md` file that is not `CHANGELOG.md`) in the individual packages as well as the content in `custom-elements.json`, the `yarn copy-docs` command will prepare the content for the "examples" and "api" sections relative to each package as available. The `READEME.md` files will have 11ty specific front matter prepended to their content, but with otherwise we copied directly into the documentation project. The data in `custom-elements.json` will be parsed as appropriate to create API tables outlining the interface (attributes, properties, events, slots, and CSS Custom Properties) that is available for each element.

## Typescript

The documentation site, much like our packages, is built using TypeScript. Here, as in the packages, we leverage `tsc` directly to compile these components to JS.

## CSS

CSS for components are handled directly in their components via the combination of the `rollup-plugin-styles` (postCSS) and `rollup-plugin-lit-css` to convert raw CSS files into JS files wrapped with LitElement's `css` template literal tag. Page level styles to handle the documentation content and layout, as well as page delivery during the course of loading and executing JS is process with postCSS and the PurgeCSS plugin so that "tree shaken" styles for page delivery can be writted inline of the individual HTML files.

## 11ty

The 11ty static site generator is being used to take the copied package docs and build complete HTML files from them.

### Templates

The final build relies of the full HTML pages as built by 11ty to populate the visitable pages of the site. These are build from a series of templates for the home page, a component example page, a component API page, and for the guide pages. These each share a number of partials to deliver shared content like the SWC logo, meta content for the `<head>`, and the sitewide side navigation.

## Rollup

The site it finally bundled with Rollup to ensure that the JS is tree-shaken and chunked in the most performant way possible. With only the smallest variation from tooling provided by the Open Web Components team, each page of the site is used as an entry point to structure the bundles that make up final delivery to both the development and production environments.

### PostCSS

The standard Spectrum Web Components postCSS plugins are played against the site wide styles of the documentation site and then later PurgeCSS is used to remove unused styles from the final sting that in placed in line of each HTML files to ensure the smalled amout of CSS is shipped with each page.

### PostHTML

The PostHTML plugins outlined in `projects/documentation/src/utils` are used to upgrade the raw HTML into Spectrum Web Component specific markup. In particular this ensure that Spectrum Web Components are used as opposed to their native HTML counsins and that various Spectrum CSS classes are included as desired in the markup to ensure style consistancy with the rest of the Spectrum ecosustem.

# Watching

`yarn docs:watch` in the root director will watch ALL of the things. Your component CSS/TS will be watched and rebuilt on the fly. This currently cascades a number of serial build commands that are being watched, so it can sometimes take a little while for the full update to propagate to the browser.

# To-do:

-   [ ] "routing" in SW
    -   .../api pages
-   [ ] use the service worker to cache the smallest amout of HTML required to build the pages of the site
-   [ ] meta in the header - can we capture the Spectrum images for card generation?
-   [ ] build `shell-end.html` and `shell-start.html` without superfluous open/closing tags
-   [ ] apply the "full" CSS to `shell-start.html` to ensure pages build from cache have any styles they might need
