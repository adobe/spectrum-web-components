const merge = require('webpack-merge');
const path = require('path');
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
                                plugins: (loader) => [
                                    require('postcss-import')({
                                        root: loader.resourcePath,
                                    }),
                                    require('postcss-inherit')(),
                                    require('postcss-preset-env')({
                                        stage: 0,
                                        browsers: [
                                            'last 2 Chrome versions',
                                            'Firefox >= 63',
                                            'Safari >= 10.1',
                                        ],
                                    }),
                                    // minify the css with cssnano presets
                                    require('cssnano')({ preset: 'default' }),
                                ],
                            },
                        },
                    ],
                },
            ],
        },
    });
    return result;
};
