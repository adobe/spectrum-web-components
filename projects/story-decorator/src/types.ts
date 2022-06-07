/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { Color, Scale, ThemeVariant } from '@spectrum-web-components/theme';

declare global {
    interface Window {
        __swc_hack_knobs__: {
            defaultThemeVariant: ThemeVariant;
            defaultColor: Color;
            defaultScale: Scale;
            defaultDirection: 'ltr' | 'rtl';
            defaultReduceMotion: boolean;
            hcm: boolean;
        };
    }
}
