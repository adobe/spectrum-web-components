/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, LitElement } from '@polymer/lit-element';
// @ts-ignore - css generated at build time
import demoMixedStyles from './demo-mixed.css.js';
export class DemoMixed extends LitElement {
    render() {
        return html`
            <style>
                ${demoMixedStyles}
            </style>
            <div class="grid">
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=1" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=2" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=3" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=4" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=5" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=6" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=7" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=8" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
                <div class="tile">
                    <img src="https://picsum.photos/200?clearcache=9" />
                    <div class="header">Header</div>
                    <div class="body">
                        The quick brown fox jumps over the lazy dog
                    </div>
                </div>
            </div>
        `;
    }
}
if (!customElements.get('demo-mixed')) {
    customElements.define('demo-mixed', DemoMixed);
}

//# sourceMappingURL=demo-mixed.js.map
