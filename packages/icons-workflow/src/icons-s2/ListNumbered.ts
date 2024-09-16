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
export const ListNumberedIcon = ({
    width = 24,
    height = 24,
    hidden = false,
    title = 'List Numbered',
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
            <path
                d="m17.25,16.52148H7.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m17.25,10.52148H7.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <path
                d="m17.25,4.52148H7.25c-.41406,0-.75-.33594-.75-.75s.33594-.75.75-.75h10c.41406,0,.75.33594.75.75s-.33594.75-.75.75Z"
                fill="currentColor"
                stroke-width="0"
            />
            <g>
                <path
                    d="m3.10986,5.51953v-2.625h-.02344l-.44824.31055c-.10547.07324-.17285.09668-.29004.09668-.23145,0-.41016-.17285-.41016-.41895,0-.17285.07031-.31348.23438-.4248l.76758-.5127c.24609-.16406.45996-.1875.7002-.1875.44824,0,.71191.26953.71191.69434v3.06738c0,.37207-.24902.6123-.62109.6123s-.62109-.24023-.62109-.6123Z"
                    fill="currentColor"
                    stroke-width="0"
                />
                <path
                    d="m1.70508,11.52246c0-.22852.10547-.4043.33984-.60059l1.16309-.99609c.47461-.40723.60938-.5918.60938-.84375,0-.2666-.20508-.45117-.50684-.45117-.22266,0-.375.10254-.5332.33105-.16406.24023-.31348.32812-.55078.32812-.31641,0-.50977-.18457-.50977-.4834,0-.09668.01758-.1875.05566-.27539.22266-.50391.81738-.81738,1.55566-.81738,1.02832,0,1.68457.51855,1.68457,1.28613,0,.56836-.29297.86426-.94922,1.43262l-.77051.66504v.02344h1.3418c.31055,0,.48633.18457.48633.46875,0,.27832-.17578.46875-.48633.46875h-2.34961c-.4043,0-.58008-.22559-.58008-.53613Z"
                    fill="currentColor"
                    stroke-width="0"
                />
                <path
                    d="m1.67871,17.30566c-.02637-.07324-.03809-.15527-.03809-.21973,0-.30762.20508-.49805.53906-.49805.23145,0,.38379.07617.50684.25488.1582.23145.31348.36914.68262.36914.31055,0,.5332-.1875.5332-.44824,0-.30176-.23145-.46289-.66211-.46289h-.0293c-.29004,0-.43652-.16113-.43652-.41016,0-.2373.14648-.40723.43652-.40723h.0293c.38379,0,.60645-.16699.60645-.43945,0-.26074-.19336-.4248-.50684-.4248-.25195,0-.43066.10254-.55078.31348-.14062.24902-.29297.33984-.5625.33984-.33984,0-.50684-.19922-.50684-.47461,0-.08203.01172-.14648.04102-.22852.14941-.40723.66504-.85547,1.57324-.85547.94043,0,1.65527.39844,1.65527,1.15137,0,.54785-.40137.8877-.86719.98145v.02344c.64453.06738,1.04297.42188,1.04297.98438,0,.80859-.69434,1.32129-1.8252,1.32129-.98438,0-1.51758-.46875-1.66113-.87012Z"
                    fill="currentColor"
                    stroke-width="0"
                />
            </g>
        </svg>
    `;
};
