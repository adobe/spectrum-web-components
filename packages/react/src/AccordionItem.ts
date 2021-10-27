import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { AccordionItem as Component } from "@iliad-ui/bundle";

export const AccordionItem = createComponent(
  React,
  "sp-accordion-item",
  Component,
  {
    "sp-accordion-item-toggle": "sp-accordion-item-toggle",
    keydown: "keydown",
  },
  "AccordionItem"
);
