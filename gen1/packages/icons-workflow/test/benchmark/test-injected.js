"use strict";
import { html } from "@spectrum-web-components/base";
import { setCustomTemplateLiteralTag } from "@spectrum-web-components/icons-workflow/src/custom-tag.js";
import { CheckmarkIcon } from "@spectrum-web-components/icons-workflow/src/icons/Checkmark.js";
import "@spectrum-web-components/icon/sp-icon.js";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
setCustomTemplateLiteralTag(html);
measureFixtureCreation(html`
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
  <sp-icon>${CheckmarkIcon({ hidden: true })}</sp-icon>
`);
//# sourceMappingURL=test-injected.js.map
