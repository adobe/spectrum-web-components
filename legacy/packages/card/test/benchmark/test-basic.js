"use strict";
import "@spectrum-web-components/card/sp-card.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-card variant="gallery" heading="Card Heading" subheading="JPG">
        <img
            slot="preview"
            src="https://picsum.photos/532/192"
            alt="Demo Graphic"
        />
        <div slot="description">10/15/18</div>
        <div slot="footer">Footer</div>
    </sp-card>
`);
//# sourceMappingURL=test-basic.js.map
