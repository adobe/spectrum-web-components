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
import '@spectrum-web-components/banner/sp-banner.js';
import { Banner } from '@spectrum-web-components/banner';
import { expect, fixture, html } from '@open-wc/testing';

describe('banner', () => {
    let testDiv!: HTMLDivElement;

    beforeEach(async () => {
        testDiv = await fixture<HTMLDivElement>(
            html`
                <div>
                    <sp-banner type="info">
                        <div slot="header">Info Text</div>
                        <div slot="content">Info Content</div>
                    </sp-banner>
                    <sp-banner type="warning">
                        <div slot="header">Warning Text</div>
                        <div slot="content">Warning Content</div>
                    </sp-banner>
                    <sp-banner type="error">
                        <div slot="header">Error Text</div>
                        <div slot="content">Error Content</div>
                    </sp-banner>
                    <sp-banner id="default-info">
                        <div slot="header">Header Text</div>
                        <div slot="content">Content</div>
                    </sp-banner>
                    <sp-banner corner>
                        <div slot="header">Corner Text</div>
                        <div slot="content">Corner Content</div>
                    </sp-banner>
                </div>
            `
        );
    });

    it('loads accessibly', async () => {
        await expect(testDiv).to.be.accessible();
    });

    it('loads info', () => {
        const el = testDiv.querySelector('sp-banner[type=info]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('info');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Info Text');
        expect(el.textContent).to.include('Info Content');
    });
    it('loads warning', () => {
        const el = testDiv.querySelector('sp-banner[type=warning]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('warning');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Warning Text');
        expect(el.textContent).to.include('Warning Content');
    });
    it('loads error', () => {
        const el = testDiv.querySelector('sp-banner[type=error]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('error');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Error Text');
        expect(el.textContent).to.include('Error Content');
    });
    it('loads corner', () => {
        const el = testDiv.querySelector('sp-banner[corner]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.corner).to.be.true;
        expect(el.textContent).to.include('Corner Text');
        expect(el.textContent).to.include('Corner Content');
    });
    it('defaults type to info when none provided', () => {
        const el = testDiv.querySelector('sp-banner#default-info') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('info');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Header Text');
        expect(el.textContent).to.include('Content');
    });
});
