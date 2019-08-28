const webpackBaseConfig = require('../utils/webpack-base.config');
const merge = require('webpack-merge');
const path = require('path');
const srcPath = path.resolve(__dirname, '../packages');
const storiesPath = path.resolve(__dirname, '../stories');

module.exports = ({ config }) => {
    // Exclude main source directory from normal CSS compilation
    const cssRule = config.module.rules.find((rule) =>
        /css/.test(rule.test.toString())
    );
    cssRule.exclude = srcPath;

    const result = merge(
        config,
        webpackBaseConfig(
            [srcPath, storiesPath],
            /test\/.*/,
            '.storybook/tsconfig.json'
        )
    );
    return result;
};
