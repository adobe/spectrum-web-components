import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import prettier from 'prettier';

const { publish } = commandLineArgs([
  { name: 'publish', type: Boolean },
]);

if (publish) {
  console.log(chalk.yellow('The --publish flag was used so the package will be published to npm after building!\n'));
}

// Clear build directory
process.chdir('./packages/react/');

// Fetch component metadata
const metadata = JSON.parse(
  fs.readFileSync('./custom-elements.json', 'utf8')
);

// Wrap components
console.log('Wrapping components...');

function getAllComponents() {
  const allComponents = [];

  metadata.modules.map(module => {
    if (module.path.startsWith('packages')) {
        module.declarations?.map(declaration => {
          if (declaration.customElement && declaration.tagName) {
            const component = declaration;
            const modulePath = module.path;
    
            if (component) {
              allComponents.push(Object.assign(component, { modulePath }));
            }
          }
        });
    }
  });

  return allComponents;
}

const components = getAllComponents();

components.map(component => {
  const { name, tagName } = component;
  console.log(component);
  const componentFile = path.join('./src', `${name}.ts`)

  const events = (component.events || [])
    .map(event => {
      return `'${event.name}': '${event.name}'`;
    })
    .join(',\n');

  const source = prettier.format(
    `
      import * as React from 'react';
      import { createComponent } from '@lit-labs/react';
      import { ${name} as Component } from '@iliad-ui/bundle';

      export const ${name} = createComponent(
        React,
        '${component.tagName}',
        Component,
        {
          ${events}
        }
      );
    `,
    Object.assign({
      parser: 'babel-ts'
    })
  );

  fs.writeFileSync(componentFile, source, 'utf8');
  console.log(`✓ <${component.tagName}>`);
});

// Run TypeScript on the generated src directory
console.log('Source files have been generated. Running the TypeScript compiler...');
execSync('npx tsc', { stdio: 'inherit' });

// Publish to npm
if (publish) {
  console.log('Publishing to npm...');
  execSync('npm publish', { stdio: 'inherit' });
}

console.log(chalk.cyan(`\nAll components have been wrapped for React! 📦\n`));
