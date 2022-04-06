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

import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

import { spy } from 'sinon';
import { matchFocusVisible } from '@spectrum-web-components/shared';

function getMiddleOfElement(element: HTMLElement): { x: number; y: number } {
    const { x, y, width, height } = element.getBoundingClientRect();

    return {
        x: Math.floor(x + window.pageXOffset + width / 2),
        y: Math.floor(y + window.pageYOffset + height / 2),
    };
}

describe('Button Key Activation', () => {
    it('supports keyboard-activation event', async () => {
        const clickSpy = spy();
        const keyboardActivationSpy = spy((event: Event) => {
            event.preventDefault();
        });
        const el = await fixture<Button>(
            html`
                <sp-button
                    @click=${() => clickSpy()}
                    @keyboard-activation=${(event: Event) =>
                        keyboardActivationSpy(event)}
                >
                    Button
                </sp-button>
            `
        );
        await elementUpdated(el);

        // do a mouse click to focus the element, but not give it focus-visible
        const buttonPosition = getMiddleOfElement(el);
        await sendMouse({
            type: 'click',
            position: [buttonPosition.x, buttonPosition.y],
        });

        expect(matchFocusVisible(el)).to.be.false;
        expect(el.matches(':focus')).to.be.true;
        expect(clickSpy.callCount).to.equal(1);
        expect(keyboardActivationSpy.callCount).to.equal(0);

        // press space key press to activate the button
        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);
        // activation event should have fired
        expect(keyboardActivationSpy.callCount).to.equal(1);
        // click should not have fired again
        expect(clickSpy.callCount).to.equal(1);
        // but element should now have focus-visible state
        expect(matchFocusVisible(el)).to.be.true;

        // press another space key
        await sendKeys({
            press: 'Space',
        });

        await elementUpdated(el);
        // click should have fired second time
        expect(clickSpy.callCount).to.equal(2);
        // keyboard activation is only checked on first activation with focus-visible false
        expect(keyboardActivationSpy.callCount).to.equal(1);
    });
});
