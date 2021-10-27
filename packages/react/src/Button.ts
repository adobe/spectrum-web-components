import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Button as Component } from "@iliad-ui/bundle";

export const Button = createComponent(
  React,
  "sp-button",
  Component,
  {
    keydown: "keydown",
  },
  "Button"
);
