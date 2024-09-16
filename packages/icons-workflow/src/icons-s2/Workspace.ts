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

import { tag as html, TemplateResult } from '../custom-tag.js';

export { setCustomTemplateLiteralTag } from '../custom-tag.js';
export const WorkspaceIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'Workspace',
} = {}): string | TemplateResult => {
    return html`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width=${width}
            height=${height}
            viewBox="0 0 20 20"
            aria-hidden=${hidden ? 'true' : 'false'}
            role="img"
            fill="currentColor"
            aria-label=${title}
        >
            <circle
                cx="17.14381"
                cy="2.19083"
                r="1.59039"
                fill="currentColor"
            />
            <circle cx="2.09082" cy="7" r="1.59039" fill="currentColor" />
            <circle
                cx="13.8077"
                cy="17.90917"
                r="1.59039"
                fill="currentColor"
            />
            <path
                d="m11.28711,15.75977c-.41162,0-.8291-.04492-1.24707-.13965-.69238-.15625-1.33887-.4375-1.9209-.83594-.3418-.23438-.4292-.70117-.19482-1.04297.2334-.3418.70068-.42871,1.04248-.19531.4248.29102.89697.49707,1.4043.61133,1.95947.44531,3.92578-.58691,4.67383-2.44922.15381-.38574.59131-.57031.9751-.41699.38428.1543.5708.59082.4165.97559-.86377,2.15332-2.9165,3.49316-5.14941,3.49316Z"
                fill="currentColor"
            />
            <path
                d="m5.98291,12.53711c-.2207,0-.43945-.09668-.5874-.2832-1.71338-2.1543-1.60645-5.19336.25488-7.22656.48438-.52832,1.05518-.95215,1.69629-1.25977.37354-.18164.8208-.02246,1.00098.35156.1792.37305.02148.82129-.35156,1-.46826.22461-.88525.53516-1.23975.92188-1.35986,1.48535-1.43848,3.70605-.18701,5.2793.25781.32422.2041.7959-.12012,1.05371-.1377.10938-.30273.16309-.46631.16309Z"
                fill="currentColor"
            />
            <path
                d="m16.52783,9.33398c-.021,0-.04199-.00098-.06348-.00293-.4126-.03418-.71924-.39648-.68506-.80957.04395-.52539-.01416-1.04785-.17236-1.55371-.59473-1.90234-2.52734-3.11523-4.49219-2.8125-.40625.0625-.79199-.21875-.85449-.62891-.06201-.40918.21973-.79199.62891-.85352,2.68799-.41211,5.33594,1.24414,6.14941,3.84766.21631.69141.29541,1.40625.23584,2.12598-.03271.3916-.36084.6875-.74658.6875Z"
                fill="currentColor"
            />
        </svg>
    `;
};
