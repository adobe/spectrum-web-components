"use strict";
import "@spectrum-web-components/coachmark/sp-coachmark.js";
import "@spectrum-web-components/coachmark/sp-coach-indicator.js";
import "@spectrum-web-components/overlay/sp-overlay.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-coach-indicator id="trigger"></sp-coach-indicator>
    <sp-overlay
        trigger="trigger@hover"
        placement="right"
        .receivesFocus=${"false"}
        open
    >
        <sp-coachmark open primary-cta="Ok">
            <div slot="title">A single coachmark</div>
            <div slot="content">
                This is a Coachmark with nothing but text in it. Kind of lonely
                in here.
            </div>
        </sp-coachmark>
    </sp-overlay>
`);
//# sourceMappingURL=basic-test.js.map
