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

import { LitElement, html, CSSResultArray, property } from 'lit-element';
import logoStyles from './spectrum-logo.css';

class SpectrumLogo extends LitElement {
    @property({ type: String })
    public size: string = '32px';

    public static get styles(): CSSResultArray {
        return [logoStyles];
    }

    render() {
        return html`
            <svg
                version="1.1"
                id="logosvg"
                width="${this.size}"
                height="${this.size}"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="61.2 0 177.7 150"
                enableBackground="new 61.2 0 177.7 150"
                xmlSpace="preserve"
            >
                <path
                    className="tier3"
                    fill="#757575"
                    d="M238.8,94.9L150,150L61.2,94.9L88.3,78l61.7,38l61.7-38L238.8,94.9z"
                ></path>
                <path
                    className="tier2"
                    fill="#999999"
                    d="M188.3,43.5L150,67.2l-38.3-23.7L88.3,57.9l61.7,38l61.4-38L188.3,43.5z"
                ></path>
                <path
                    className="tier1"
                    fill="#C7C7C7"
                    d="M150,0l-38.5,23.7l38.3,23.7L188,23.7L150,0z"
                ></path>
            </svg>
        `;
    }
}
customElements.define('docs-spectrum-logo', SpectrumLogo);
