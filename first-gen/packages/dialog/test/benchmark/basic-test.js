"use strict";
import "@spectrum-web-components/dialog/sp-dialog.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-dialog size="s">
        <h2 slot="heading">Disclaimer</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Auctor augue mauris
        augue neque gravida. Libero volutpat sed ornare arcu. Quisque egestas
        diam in arcu cursus euismod quis viverra. Posuere ac ut consequat semper
        viverra nam libero justo laoreet. Enim ut tellus elementum sagittis
        vitae et leo duis ut. Neque laoreet suspendisse interdum consectetur
        libero id faucibus nisl. Diam volutpat commodo sed egestas egestas.
        Dolor magna eget est lorem ipsum dolor. Vitae suscipit tellus mauris a
        diam maecenas sed. Turpis in eu mi bibendum neque egestas congue.
        Rhoncus est pellentesque elit ullamcorper dignissim cras lobortis.
    </sp-dialog>
`);
//# sourceMappingURL=basic-test.js.map
