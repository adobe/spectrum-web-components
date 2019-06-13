import { toHtmlTemplateString } from '../src/utils/templates';
import { TemplateResult } from 'lit-element';

const componentDocs = require.context('../components', true, /\.md$/);

const components = new Map<string, TemplateResult>();

for (const key of componentDocs.keys()) {
    const componentName = /([a-zA-Z-]+)\.md$/.exec(key)![1];
    const templateString = toHtmlTemplateString(componentDocs(key));
    components.set(componentName, templateString);
}

export default components;
