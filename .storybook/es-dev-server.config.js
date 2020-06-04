const cjsTransformer = require('es-dev-commonjs-transformer');

module.exports = {
    responseTransformers: [
        cjsTransformer(
            /* Exclude Paths Array */ [
                '**/node_modules/@open-wc/**/*',
                '**/node_modules/lit-element/**/*',
            ]
        ),
    ],

    middlewares: [
        function rewriteIndex(context, next) {
            if (context.url === '/node_modules/react/lib/haunted.js') {
                context.url = '/packages/switch/lib/haunted-wrapper.js';
            }
            return next();
        },
    ],
};
