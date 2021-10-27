import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Accordion as Component } from "@iliad-ui/bundle";

export const Accordion = createComponent(
  React,
  "sp-accordion",
  Component,
  {
    keydown: "keydown",
  },
  "Accordion"
);
