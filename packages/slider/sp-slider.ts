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
import './sp-slider-handle.js'; // codify sp-slider's implicit dependency on sp-slider-handle
import { Slider } from './src/Slider.js';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';

// Set the tag name to use when creating slider handle elements
Slider.sliderHandleTagname = 'sp-slider-handle';

defineElement('sp-slider', Slider);

declare global {
    interface HTMLElementTagNameMap {
        'sp-slider': Slider;
    }
}
