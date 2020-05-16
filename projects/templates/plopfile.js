module.exports = function (plop) {
    // name of custom element tag
    plop.setPartial('tagnamePartial', 'sp-{{name}}');
    // name of LitElement class
    plop.setHelper('className', function (name) {
        const camel = name.replace(/-([a-z])/g, (g) => {
            return g[1].toUpperCase();
        });
        camel[0] = camel[0].toUpperCase();
        const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
        return capitalized;
    });
    // name used as title in storybook and documentation
    plop.setHelper('displayName', function (name) {
        const camel = name.replace(/-([a-z])/g, (g) => {
            return ` ${g[1].toUpperCase()}`;
        });
        camel[0] = camel[0].toUpperCase();
        const capitalized = camel.charAt(0).toUpperCase() + camel.substring(1);
        return capitalized;
    });
    plop.setGenerator('component', {
        description: 'application controller logic',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name please',
            },
        ],
        actions: [
            {
                type: 'add',
                path: '../../packages/{{name}}/src/index.ts',
                templateFile: 'plop-templates/index.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/src/{{className name}}.ts',
                templateFile: 'plop-templates/component.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/{{> tagnamePartial }}.ts',
                templateFile: 'plop-templates/component-registration.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/src/{{name}}.css',
                templateFile: 'plop-templates/component.css.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/src/spectrum-config.js',
                templateFile: 'plop-templates/spectrum-config.js.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/test/{{name}}.test.ts',
                templateFile: 'plop-templates/test.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/test/benchmark/basic-test.ts',
                templateFile: 'plop-templates/benchmark.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/stories/{{name}}.stories.ts',
                templateFile: 'plop-templates/stories.ts.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/README.md',
                templateFile: 'plop-templates/README.md.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/tsconfig.json',
                templateFile: 'plop-templates/tsconfig.json.hbs',
            },
            {
                type: 'add',
                path: '../../packages/{{name}}/package.json',
                templateFile: 'plop-templates/package.json.hbs',
            },
        ],
    });
};
