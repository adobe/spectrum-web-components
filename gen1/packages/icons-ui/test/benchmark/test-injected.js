"use strict";
import { html } from "@spectrum-web-components/base";
import { setCustomTemplateLiteralTag } from "@spectrum-web-components/icons-ui/src/custom-tag.js";
import { Arrow75Icon } from "@spectrum-web-components/icons-ui/src/icons/Arrow75.js";
import "@spectrum-web-components/icon/sp-icon.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
setCustomTemplateLiteralTag(html);
measureFixtureCreation(html`
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
  <sp-icon>${Arrow75Icon()}</sp-icon>
`);
//# sourceMappingURL=test-injected.js.map
