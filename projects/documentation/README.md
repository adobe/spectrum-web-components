# To-do:

1 "routing" in SW - page to page => sub-page to sub-page - ensure parts are being created appropriately - define reliable landing zone
2 split markdown.css into a file for home and a file for component pages?
3 meta in the header - can we capture the Spectrum images for card generation?
4 make rel=stylesheet processing nicer
4 support IE11?

# Building

## Search Index

`scripts/build-search-index.js` builds a Lunr.js search index for the documentation site via the `yarn build-search-index` command. To ensure that the exported JSON file is not placed into the `tsc` build, which add a large overhead to the processing that happens there, the `src` directory have a dummy copy of the file that includes only an empty object and this command places the final search index directly into the `_site` directory. From this location the Rollup build manages the inclusion of the JSON data in the JS bundles in a much more performant manner.

## Copy Docs

Working from the `README.md` files (as well as any other `*.md` file that is not `CHANGELOG.md`) in the individual packages as well as the content in `custom-elements.json`, the `yarn copy-docs` command will prepare the content for the "examples" and "api" sections relative to each package as available. The `READEME.md` files will have 11ty specific front matter prepended to their content, but with otherwise we copied directly into the documentation project. The data in `custom-elements.json` will be parsed as appropriate to create API tables outlining the interface (attributes, properties, events, slots, and CSS Custom Properties) that is available for each element.

## Typescript

## CSS

`cp src/components/*.css _site/src/components/`

## 11ty

### Templates

### Rollup Files

## Rollup

### PostCSS

### PostHTML

# Watching

`yarn docs:watch` in the root director will watch ALL of the things. Your component CSS/TS will be watched and rebuilt on the fly.

...
