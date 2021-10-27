import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Dialog as Component } from "@iliad-ui/bundle";

export const Dialog = createComponent(
  React,
  "sp-dialog",
  Component,
  {
    close: "close",
  },
  "Dialog"
);
