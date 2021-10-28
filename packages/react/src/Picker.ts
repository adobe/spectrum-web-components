import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Picker as Component } from "@iliad-ui/bundle";

export const Picker = createComponent(
  React,
  "sp-picker",
  Component,
  {
    change: "change",
    "sp-opened": "sp-opened",
    "sp-closed": "sp-closed",
    keydown: "keydown",
  },
  "Picker"
);
