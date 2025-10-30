/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import markdownIt from 'markdown-it';
import markdownItAnchors from 'markdown-it-anchor';

const packageVersion = async function (packageName) {
    let packageJSON = {};
    try {
        packageJSON = await import(
            `../../packages/${packageName}/package.json`,
            {
                with: { type: 'json' },
            }
        ).then((packageDefault) => packageDefault.default);
    } catch (e) {
        try {
            packageJSON = await import(
                `../../tools/${packageName}/package.json`,
                {
                    with: { type: 'json' },
                }
            ).then((packageDefault) => packageDefault.default);
        } catch (e) {}
    }
    return packageJSON.version;
};

export default function (eleventyConfig) {
    eleventyConfig.addShortcode('packageVersion', packageVersion);
    eleventyConfig.addNunjucksGlobal('WATCH_MODE', process.env.WATCH_MODE);
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addPassthroughCopy('./content/favicon.ico');
    eleventyConfig.addPassthroughCopy('./content/typekit/*.woff2');
    eleventyConfig.addPassthroughCopy('./content/favicon.svg');
    eleventyConfig.addPassthroughCopy('./content/404.html');
    eleventyConfig.addPassthroughCopy('./content/serviceWorker.js');
    eleventyConfig.addPassthroughCopy('./content/images/**/*');
    eleventyConfig.addPassthroughCopy('./content/manifest.webmanifest');
    eleventyConfig.addPassthroughCopy('../src/**/*.css');
    eleventyConfig.addPlugin(syntaxHighlight, {
        init: function ({ Prism }) {
            Prism.languages['html-live'] = Prism.languages.html;
            Prism.languages['html-no-demo'] = Prism.languages.html;
        },
        preTag: 'code-example',
        codeTag: 'pre',
    });

    let options = {
        html: true,
    };
    const markdown = markdownIt(options).use(markdownItAnchors, {
        permalink: true,
        permalinkSymbol: '#',
        level: [2, 3, 4, 5, 6],
        renderPermalink: (slug, opts, state, idx) => {
            // based on fifth version in
            // https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
            const linkContent = state.tokens[idx + 1].children[0]?.content;
            const heading = state.tokens[idx];
            const tag = heading.tag;

            if (linkContent?.length < 1) {
                console.warn();
            }

            // Create the opening <div> for the wrapper
            const headingWrapperTokenOpen = Object.assign(
                new state.Token('div_open', 'div', 1),
                {
                    attrs: [['class', `headerContainer spectrum-Typography`]],
                }
            );
            // Create the closing </div> for the wrapper
            const headingWrapperTokenClose = Object.assign(
                new state.Token('div_close', 'div', -1),
                {
                    attrs: [['class', `headerContainer`]],
                }
            );
            const headingClasses = `spectrum-Heading spectrum-Heading--size`;
            const headingClass =
                tag === 'h2'
                    ? `${headingClasses}L`
                    : tag === 'h3'
                      ? `${headingClasses}M`
                      : tag === 'h4'
                        ? `${headingClasses}S`
                        : tag === 'h5'
                          ? 'spectrum-Detail spectrum-Detail--sizeL'
                          : tag === 'h6'
                            ? 'spectrum-Detail spectrum-Detail--sizeM'
                            : '';
            const size =
                tag === 'h2'
                    ? 'L'
                    : tag === 'h3'
                      ? 'M'
                      : tag === 'h4'
                        ? 'S'
                        : tag === 'h5'
                          ? 'XS'
                          : tag === 'h6'
                            ? ''
                            : '';
            const classes = headingClass === '' ? '' : headingClass;
            const comment = `\n<!-- ${tag} / ${headingClass} / ${heading.attrs.join(' ')} -->\n`;
            heading.attrs = [
                ...heading.attrs,
                ['class', `header-heading ${classes}`],
            ];

            const divider =
                size == ''
                    ? ''
                    : `<sp-divider size="${size.toLowerCase().replace(/x/, '')}"></sp-divider>`;

            // Create the tokens for the full accessible anchor link
            // <a class="deeplink" href="#your-own-platform-is-the-nearest-you-can-get-help-to-setup">
            //   <span aria-hidden="true">
            //     ${opts.permalinkSymbol}
            //   </span>
            //   <span class="visually-hidden">
            //     Section titled Your "own" platform is the nearest you can(get help to) setup
            //   </span>
            // </a >
            const anchorTokens = [
                Object.assign(new state.Token('html_block', '', 0), {
                    content: comment,
                }),
                Object.assign(new state.Token('link_open', 'a', 1), {
                    attrs: [
                        ['class', `header-anchor ${classes}`],
                        ['href', opts.permalinkHref(slug, state)],
                        ...Object.entries(opts.permalinkAttrs(slug, state)),
                    ],
                }),
                Object.assign(new state.Token('span_open', 'span', 1), {
                    attrs: [['aria-hidden', 'true']],
                }),
                Object.assign(new state.Token('html_block', '', 0), {
                    content: opts.permalinkSymbol,
                }),
                Object.assign(new state.Token('span_close', 'span', -1), {}),
                Object.assign(new state.Token('span_open', 'span', 1), {
                    attrs: [['class', 'visually-hidden']],
                }),
                Object.assign(new state.Token('html_block', '', 0), {
                    content: `Section titled ${linkContent}`,
                }),
                Object.assign(new state.Token('span_close', 'span', -1), {}),
                Object.assign(new state.Token('link_close', 'a', -1), {}),
                Object.assign(new state.Token('html_block', '', 0), {
                    content: divider,
                }),
            ];

            // idx is the index of the heading's first token
            // insert the wrapper opening before the heading
            state.tokens.splice(idx, 0, headingWrapperTokenOpen);
            // insert the anchor link tokens after the wrapper opening and the 3 tokens of the heading
            state.tokens.splice(idx + 3 + 1, 0, ...anchorTokens);
            // insert the wrapper closing after all these
            state.tokens.splice(
                idx + 3 + 1 + anchorTokens.length,
                0,
                headingWrapperTokenClose
            );
        },
    });

    eleventyConfig.addTransform(
        'transform-postHTML',
        async function (content, outputPath) {
            const posthtml = await import('posthtml').then(
                (module) => module.default
            );
            const spectrumMarkdown = await import(
                './src/utils/posthtml-spectrum-docs-markdown.js'
            ).then((module) => module.default);
            if (outputPath && outputPath.endsWith('.html')) {
                return posthtml()
                    .use(spectrumMarkdown())
                    .process(content, { sync: true }).html;
            }
            return content; // no change done.
        }
    );

    eleventyConfig.setLibrary('md', markdown);

    eleventyConfig.addCollection('guides', (collection) => {
        return [...collection.getFilteredByGlob('./content/guides/*.md')];
    });

    eleventyConfig.addCollection('migrations', (collection) => {
        return [...collection.getFilteredByGlob('./content/migrations/*.md')];
    });

    eleventyConfig.addCollection('component-root', function (collection) {
        return collection
            .getFilteredByTags('component-overview', 'root')
            .sort(function (a, b) {
                if (a.data.displayName < b.data.displayName) {
                    return -1;
                }
                if (b.data.displayName < a.data.displayName) {
                    return 1;
                }
                return 0;
            });
    });

    eleventyConfig.addCollection('component-all', function (collection) {
        return collection
            .getFilteredByTag('component-overview')
            .sort(function (a, b) {
                if (a.data.displayName < b.data.displayName) {
                    return -1;
                }
                if (b.data.displayName < a.data.displayName) {
                    return 1;
                }
                return 0;
            });
    });

    eleventyConfig.addCollection('tool-root', function (collection) {
        return collection
            .getFilteredByTags('tool-overview', 'root')
            .sort(function (a, b) {
                if (a.data.displayName < b.data.displayName) {
                    return -1;
                }
                if (b.data.displayName < a.data.displayName) {
                    return 1;
                }
                return 0;
            });
    });

    eleventyConfig.addCollection('tool-all', function (collection) {
        return collection
            .getFilteredByTag('tool-overview')
            .sort(function (a, b) {
                if (a.data.displayName < b.data.displayName) {
                    return -1;
                }
                if (b.data.displayName < a.data.displayName) {
                    return 1;
                }
                return 0;
            });
    });

    return {
        dir: { input: 'content', output: '_site' },
        passthroughFileCopy: true,
        templateFormats: ['njk', 'md', 'css', 'yml'],
        htmlTemplateEngine: 'njk',
    };
}
