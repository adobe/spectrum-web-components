import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { PickerBase as Component } from "@iliad-ui/bundle";

export const PickerBase = createComponent(
  React,
  "sp-picker",
  Component,
  {
    change: "change",
    "sp-opened": "sp-opened",
    "sp-closed": "sp-closed",
    keydown: "keydown",
  },
  "PickerBase"
);
