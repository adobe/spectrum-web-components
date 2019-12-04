import { toHtmlTemplateString } from '../src/utils/templates';
import { TemplateResult } from 'lit-element';

const componentDocs = require.context(
    '../../packages',
    true,
    /(?<!CHANGELOG)\.md$/
);

export const ComponentDocs = new Map<string, TemplateResult>();

for (const key of componentDocs.keys()) {
    if (!/node_modules/.test(key)) {
        let componentName = key.split('/')[1];
        const fileName = /([a-zA-Z-]+)\.md$/.exec(key)![0];
        if (fileName === 'CHANGELOG.md') {
            continue;
        }
        if (fileName !== 'README.md') {
            componentName = fileName.replace('.md', '');
        }
        const templateString = toHtmlTemplateString(componentDocs(key));
        ComponentDocs.set(componentName, templateString);
    }
}
