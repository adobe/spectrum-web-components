import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Textfield as Component } from "@iliad-ui/bundle";

export const Textfield = createComponent(
  React,
  "sp-textfield",
  Component,
  {
    change: "change",
    keydown: "keydown",
  },
  "Textfield"
);
