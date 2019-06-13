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
import { Card } from '../';

function previewNode(card: Card): Node {
    if (!card.shadowRoot) throw new Error('No shadowRoot');
    const slotEl = card.shadowRoot.querySelector('slot') as HTMLSlotElement;
    return slotEl;
}

describe('card', () => {
    it('loads', () => {
        const el = document.querySelector('sp-card') as Card;
        expect(el).to.not.equal(undefined);
        const preview = previewNode(el);
        expect(preview).to.not.equal(undefined);
        expect(el.textContent).to.include('10/15/18');
        expect(el.textContent).to.include('Footer');
    });
});
