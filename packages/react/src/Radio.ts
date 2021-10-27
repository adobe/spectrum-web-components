import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Radio as Component } from "@iliad-ui/bundle";

export const Radio = createComponent(
  React,
  "sp-radio",
  Component,
  {
    keydown: "keydown",
    change: "change",
    "sp-radio:change": "sp-radio:change",
  },
  "Radio"
);
