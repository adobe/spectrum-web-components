import postcss from 'postcss';
const { createFilter } = require('rollup-pluginutils');
// const { processString } = require('uglifycss');
const { resolve } = require('path');
const {
    postCSSPlugins,
    wrapCSSResult,
} = require('../../scripts/css-processing.js');

export default function ({
    include = /\.css$/i,
    exclude,
    uglify = false,
} = {}) {
    const filter = createFilter(include, exclude);
    return {
        name: 'postcss-lit-css',

        load(id) {
            if (filter(id)) this.addWatchFile(resolve(id));
        },

        async transform(source, id) {
            if (id.slice(-4) !== '.css') return null;
            if (!filter(id)) return null;
            const code = await postcss(postCSSPlugins())
                .process(source, { from: id })
                .then((result) => {
                    return wrapCSSResult(result.css);
                });
            const map = { mappings: '' };
            return { code, map };
        },
    };
}
