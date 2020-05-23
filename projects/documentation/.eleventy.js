// Turn on to pre-process code samples...
// this needs deeper integration with the <code-example> element
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const position = {
    false: 'push',
    true: 'unshift',
};

module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.addPassthroughCopy('content/404.html');
    eleventyConfig.addPassthroughCopy('content/serviceWorker.js');
    eleventyConfig.addPassthroughCopy('content/images/**/*');
    eleventyConfig.addPassthroughCopy('content/manifest.webmanifest');
    eleventyConfig.addPassthroughCopy('../src/**/*.css');
    let markdownIt = require('markdown-it');
    let markdownItAnchors = require('markdown-it-anchor');
    let options = {
        html: true,
    };

    eleventyConfig.setLibrary(
        'md',
        markdownIt(options).use(markdownItAnchors, {
            level: 2,
            permalink: true,
            permalinkSymbol: '#',
            permalinkAttrs: (slug, state) => ({ 'aria-label': '§' }),
            renderPermalink: (slug, opts, state, idx) => {
                const space = () =>
                    Object.assign(new state.Token('text', '', 0), {
                        content: ' ',
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

                // `push` or `unshift` according to position option.
                // Space is at the opposite side.
                if (opts.permalinkSpace) {
                    linkTokens[position[!opts.permalinkBefore]](space());
                }
                state.tokens[idx + 1].children[position[opts.permalinkBefore]](
                    ...linkTokens
                );
            },
        })
    );

    eleventyConfig.addCollection('guides', (collection) => {
        return [...collection.getFilteredByGlob('./content/guides/*.md')];
    });

    eleventyConfig.addCollection('component-examples', function (collection) {
        // Order the 'guide' collection by filename, which includes a number prefix.
        // We could also order by a frontmatter property
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

    eleventyConfig.addPlugin(syntaxHighlight, {
        init: function ({ Prism }) {
            Prism.languages['html-live'] = Prism.languages.html;
        },
    });

    return {
        dir: { input: 'content', output: '_site' },
        passthroughFileCopy: true,
        templateFormats: ['njk', 'md', 'css', 'yml'],
        htmlTemplateEngine: 'njk',
    };
};
