import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { RadioGroup as Component } from "@iliad-ui/bundle";

export const RadioGroup = createComponent(
  React,
  "sp-radio-group",
  Component,
  {
    change: "change",
  },
  "RadioGroup"
);
