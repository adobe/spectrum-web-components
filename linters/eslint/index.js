module.exports = {
    rules: {
        'prevent-argument-names': {
            create: function(context) {
                const argumentNames = context.options[0];
                function preventArgumentNames(node) {
                    if (!argumentNames) {
                        return;
                    }
                    argumentNames.forEach((name) => {
                        if (node.name === name) {
                            context.report({
                                node,
                                message: `"${name}" shouldn't be used as an argument name`,
                                data: {
                                    identifier: node.name,
                                },
                            });
                        }
                    });
                }

                return {
                    Identifier: preventArgumentNames,
                };
            },
        },
    },
};
