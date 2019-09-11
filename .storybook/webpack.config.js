const webpackBaseConfig = require('../utils/webpack-base.config');
const merge = require('webpack-merge');
const path = require('path');
const srcPath = path.resolve(__dirname, '../packages');
const storiesPath = path.resolve(__dirname, '../stories');

module.exports = ({ config }) => {
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
