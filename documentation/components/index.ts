import { toHtmlTemplateString } from '../src/utils/templates';
import { TemplateResult } from 'lit-element';

const componentDocs = require.context('../../packages', true, /\README.md$/);

export const ComponentDocs = new Map<string, TemplateResult>();

for (const key of componentDocs.keys()) {
    if (!/node_modules/.test(key)) {
        const componentName = key.split('/')[1]; ///([a-zA-Z-]+)\.md$/.exec(key)![0];
        const templateString = toHtmlTemplateString(componentDocs(key));
        ComponentDocs.set(componentName, templateString);
    }
}
