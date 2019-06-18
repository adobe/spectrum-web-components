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
import '../';
import { Banner } from '../banner';

describe('banner', () => {
    it('loads info', () => {
        const el = document.querySelector('sp-banner[type=info]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('info');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Info Text');
        expect(el.textContent).to.include('Info Content');
    });
    it('loads warning', () => {
        const el = document.querySelector('sp-banner[type=warning]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('warning');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Warning Text');
        expect(el.textContent).to.include('Warning Content');
    });
    it('loads error', () => {
        const el = document.querySelector('sp-banner[type=error]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('error');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Error Text');
        expect(el.textContent).to.include('Error Content');
    });
    it('loads corner', () => {
        const el = document.querySelector('sp-banner[corner]') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.corner).to.be.true;
        expect(el.textContent).to.include('Corner Text');
        expect(el.textContent).to.include('Corner Content');
    });
    it('defaults type to info when none provided', () => {
        const el = document.querySelector('sp-banner#default-info') as Banner;

        expect(el).to.not.equal(undefined);
        expect(el.type).to.equal('info');
        expect(el.corner).to.be.false;
        expect(el.textContent).to.include('Header Text');
        expect(el.textContent).to.include('Content');
    });
});
