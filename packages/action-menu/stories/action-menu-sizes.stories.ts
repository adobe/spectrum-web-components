/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { ActionMenuMarkup } from './';

export default {
    title: 'Action menu/Sizes',
    component: 'sp-action-menu',
};

export const s = (): TemplateResult => ActionMenuMarkup({ size: 's' });
export const sOpen = (): TemplateResult =>
    ActionMenuMarkup({ size: 's', open: true });

export const m = (): TemplateResult => ActionMenuMarkup({ size: 'm' });
export const mOpen = (): TemplateResult =>
    ActionMenuMarkup({ size: 'm', open: true });

export const l = (): TemplateResult => ActionMenuMarkup({ size: 'l' });
export const lOpen = (): TemplateResult =>
    ActionMenuMarkup({ size: 'l', open: true });

export const XL = (): TemplateResult => ActionMenuMarkup({ size: 'xl' });
export const XLOpen = (): TemplateResult =>
    ActionMenuMarkup({ size: 'xl', open: true });
