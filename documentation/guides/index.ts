import { toHtmlTemplateString } from '../src/utils/templates';
import { TemplateResult } from 'lit-element';

const guideDocs = require.context('../guides', true, /\.md$/);

export const GuideDocs = new Map<string, TemplateResult>();

for (const key of guideDocs.keys()) {
    const componentName = /([a-zA-Z-]+)\.md$/.exec(key)![1];
    const templateString = toHtmlTemplateString(guideDocs(key));
    GuideDocs.set(componentName, templateString);
}
