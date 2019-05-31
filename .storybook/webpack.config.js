const merge = require('webpack-merge');
const path = require('path');
const { postCSSPlugins } = require('../scripts/css-processing');
const transpilePackages = ['lit-html', 'lit-element'];

const srcPath = path.resolve(__dirname, '../src');

module.exports = ({ config }) => {
    // Exclude main source directory from normal CSS compilation
    const cssRule = config.module.rules.find((rule) =>
        /css/.test(rule.test.toString())
    );
    cssRule.exclude = srcPath;

    const result = merge(config, {
        resolve: {
            extensions: ['.js', '.ts', '.css'],
        },
        module: {
            rules: [
                {
                    // tweak babel-loader to transpile dependencies
                    test: new RegExp(
                        `node_modules(\\/|\\\\)(${transpilePackages.join(
                            '|'
                        )})(.*)\\.js$`
                    ),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                            ],
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'entry',
                                        corejs: 2,
                                    },
                                ],
                            ],
                            babelrc: false,
                        },
                    },
                },
                {
                    test: /\.ts$/,
                    include: srcPath,
                    loader: 'ts-loader',
                },
                {
                    // Package CSS up so that it can be consumed directly by lit-element
                    test: /\.css$/,
                    include: srcPath,
                    use: [
                        {
                            loader: path.resolve(
                                __dirname,
                                'lit-css-typed-loader'
                            ),
                        },
                        'extract-loader',
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: (loader) =>
                                    postCSSPlugins(loader.resourcePath),
                            },
                        },
                    ],
                },
            ],
        },
    });
    return result;
};
