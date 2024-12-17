/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import {
  getBreadcrumbs,
  getBreadcrumbsWithLinks,
  getResizableStyles,
  StoryArgs,
  Template,
} from './template.js';
import { argTypes } from './args.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { spreadProps } from '../../../test/lit-helpers.js';

export default {
  title: 'Breadcrumbs',
  component: 'sp-breadcrumbs',
  args: {
    'max-visible-items': 4,
  },
  argTypes,
};

export const Default = (args: StoryArgs): TemplateResult => Template(args);

export const Disabled = (args: StoryArgs): TemplateResult => Template(args);
Disabled.args = {
  disabled: true,
};

export const Compact = (args: StoryArgs): TemplateResult => Template(args);
Compact.args = {
  compact: true,
};

export const Links = (args: StoryArgs): TemplateResult => {
  return html`
    <sp-breadcrumbs
      ${spreadProps(args)}
      max-visible-items="${ifDefined(args['max-visible-items'])}"
      @change="${args.onChange}"
    >
      ${getBreadcrumbsWithLinks(4)}
    </sp-breadcrumbs>
  `;
};

export const ShowRoot = (args: StoryArgs): TemplateResult => {
  return html`
    <sp-breadcrumbs
      ${spreadProps(args)}
      max-visible-items="${ifDefined(args['max-visible-items'])}"
      @change="${args.onChange}"
    >
      <sp-breadcrumb-item value="Home" slot="root">Home</sp-breadcrumb-item>
      ${getBreadcrumbs(6)}
    </sp-breadcrumbs>
  `;
};

export const resizableBehavior = (args: StoryArgs): TemplateResult => {
  return html`
    <div class="resizable-container">
      ${getResizableStyles()}

      <sp-breadcrumbs
        ${spreadProps(args)}
        max-visible-items="${ifDefined(args['max-visible-items'])}"
        @change="${args.onChange}"
      >
        ${getBreadcrumbs(4)}
      </sp-breadcrumbs>
    </div>
  `;
};
