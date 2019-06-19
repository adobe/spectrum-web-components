import { toHtmlTemplateString } from '../src/utils/templates';
import { TemplateResult } from 'lit-element';

const componentApiDocs = require.context('../api-docs', true, /\.html$/);

export const ComponentApiDocs = new Map<string, TemplateResult>();

for (const key of componentApiDocs.keys()) {
    const componentName = /([a-zA-Z-]+)\.html$/.exec(key)![1];
    const templateString = toHtmlTemplateString(componentApiDocs(key));

    ComponentApiDocs.set(componentName, templateString);
}
