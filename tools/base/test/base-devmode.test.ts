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
import { expect } from '@open-wc/testing';
import { stub } from 'sinon';

describe('Base', () => {
    it('warns in Dev Mode when no attributes', async () => {
        const consoleWarnStub = stub(console, 'warn');
        const { SpectrumElement } = await import(
            '@spectrum-web-components/base'
        );
        expect(SpectrumElement).to.not.be.undefined;

        expect(consoleWarnStub.called).to.be.true;
        const spyCall = consoleWarnStub.getCall(0);
        expect(
            spyCall.args.at(0).includes('dev mode'),
            'confirm "dev mode"-centric message'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'base',
                type: 'default',
                level: 'default',
            },
        });
        consoleWarnStub.restore();
    });
});
