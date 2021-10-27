import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Switch as Component } from "@iliad-ui/bundle";

export const Switch = createComponent(
  React,
  "sp-switch",
  Component,
  {
    keydown: "keydown",
  },
  "Switch"
);
