/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { setCustomElementsManifest } from '@storybook/web-components';
import { swcThemeDecorator } from '@spectrum-web-components/story-decorator/decorator.js';
import cem from './custom-elements.json';

setCustomElementsManifest(cem);

export const parameters = {
    docs: { hidden: true },
    controls: { expanded: true },
    layout: 'fullscreen',
};

export const decorators = [swcThemeDecorator];
