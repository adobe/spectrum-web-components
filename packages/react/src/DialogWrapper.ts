import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { DialogWrapper as Component } from "@iliad-ui/bundle";

export const DialogWrapper = createComponent(
  React,
  "sp-dialog-wrapper",
  Component,
  {
    secondary: "secondary",
    cancel: "cancel",
    confirm: "confirm",
    close: "close",
  },
  "DialogWrapper"
);
