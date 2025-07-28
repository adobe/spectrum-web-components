"use strict";
import { html } from "@spectrum-web-components/base";
import { AlertBannerMarkup } from "./";
import { argTypes } from "./args.js";
export default {
  title: "Alert Banner",
  component: "sp-alert-banner",
  args: {
    text: "Your trial has expired",
    dismissible: true,
    open: true,
    variant: "neutral"
  },
  argTypes
};
export const Default = (args) => AlertBannerMarkup(args);
export const Info = (args) => AlertBannerMarkup({
  ...args,
  variant: "info",
  text: "Your trial will expire in 3 days"
});
export const Negative = (args) => AlertBannerMarkup({
  ...args,
  variant: "negative",
  text: "Connection interrupted. Check your network to continue"
});
export const TextWrapping = (args) => html`
    <div style="max-width:800px;">
        ${AlertBannerMarkup({
  ...args,
  variant: "negative",
  text: ` Your trial has expired. Please purchase to continue.
Your work has been saved and is ready for you to open again once
you have purchased the software.`,
  actionLabel: "Purchase"
})}
    </div>
`;
export const Multilanguage = (args) => html`
    ${AlertBannerMarkup({
  ...args,
  variant: "info",
  text: `\u0633\u062A\u0646\u062A\u0647\u064A \u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0643 \u0641\u064A \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0627\u0644\u0645\u0642\u0628\u0644`,
  actionLabel: `\u0627\u0634\u062A\u0631\u064A \u0627\u0644\u0622\u0646`
})}
`;
//# sourceMappingURL=alert-banner.stories.js.map
