const transpilePackages = ['lit-html', 'lit-element'];

module.exports = ({ config }) => {
    config.watch = true;
    // tweak babel-loader to transpile dependencies
    config.module.rules.push({
        test: new RegExp(
            `node_modules(\\/|\\\\)(${transpilePackages.join('|')})(.*)\\.js$`
        ),
        use: {
            loader: 'babel-loader',
            options: {
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
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
    });
    return config;
};
