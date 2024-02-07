/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
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
                assert: { type: 'json' },
            }
        ).then((packageDefault) => packageDefault.default);
    } catch (e) {
        try {
            packageJSON = await import(
                `../../tools/${packageName}/package.json`,
                {
                    assert: { type: 'json' },
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
        level: [2, 3, 4],
        permalink: true,
        permalinkSymbol: '#',
        permalinkAttrs: () => ({ 'aria-label': '§' }),
        renderPermalink: (slug, opts, state, idx) => {
            const space = () =>
                Object.assign(new state.Token('html_block', '', 0), {
                    content: '&nbsp;',
                });

            const linkTokens = [
                Object.assign(new state.Token('link_open', 'sp-link', 1), {
                    attrs: [
                        ['class', opts.permalinkClass],
                        ['href', opts.permalinkHref(slug, state)],
                        ...Object.entries(opts.permalinkAttrs(slug, state)),
                    ],
                }),
                Object.assign(new state.Token('html_block', '', 0), {
                    content: opts.permalinkSymbol,
                }),
                new state.Token('link_close', 'sp-link', -1),
            ];

            const position = {
                false: 'push',
                true: 'unshift',
            };
            // `push` or `unshift` according to position option.
            // Space is at the opposite side.
            if (opts.permalinkSpace) {
                linkTokens[position[!opts.permalinkBefore]](space());
            }
            // `push` or `unshift` according to position option.
            // Link tokens are at the opposite side.
            state.tokens[idx + 1].children[position[opts.permalinkBefore]](
                ...linkTokens
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
            .getFilteredByTags('component-examples', 'root')
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
            .getFilteredByTag('component-examples')
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
            .getFilteredByTags('tool-examples', 'root')
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
            .getFilteredByTag('tool-examples')
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
