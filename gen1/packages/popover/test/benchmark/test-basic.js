"use strict";
import { html } from "lit";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/dialog/sp-dialog.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
  <sp-popover direction="top" open>
    <sp-dialog>
      <h3 slot="heading">Popover title</h3>
      Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels. Icing
      soufflé chupa chups donut cheesecake. Jelly-o chocolate cake sweet roll
      cake danish candy biscuit halvah
    </sp-dialog>
  </sp-popover>
`);
//# sourceMappingURL=test-basic.js.map
