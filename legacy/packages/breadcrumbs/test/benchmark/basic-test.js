"use strict";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-breadcrumbs>
        <sp-breadcrumb-item href=${window.location.href}>
            Breadcrumb 1
        </sp-breadcrumb-item>
        <sp-breadcrumb-item href=${window.location.href}>
            Breadcrumb 2
        </sp-breadcrumb-item>
        <sp-breadcrumb-item href=${window.location.href}>
            Breadcrumb 3
        </sp-breadcrumb-item>
        <sp-breadcrumb-item href=${window.location.href}>
            Breadcrumb 4
        </sp-breadcrumb-item>
        <sp-breadcrumb-item href=${window.location.href}>
            Breadcrumb 5
        </sp-breadcrumb-item>
        <sp-breadcrumb-item href=${window.location.href}>
            Breadcrumb 6
        </sp-breadcrumb-item>
    </sp-breadcrumbs>
`);
//# sourceMappingURL=basic-test.js.map
