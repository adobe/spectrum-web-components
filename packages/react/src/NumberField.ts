import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { NumberField as Component } from "@iliad-ui/bundle";

export const NumberField = createComponent(
  React,
  "sp-number-field",
  Component,
  {
    change: "change",
    input: "input",
    keydown: "keydown",
  },
  "NumberField"
);
