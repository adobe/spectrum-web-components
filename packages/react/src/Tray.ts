import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Tray as Component } from "@iliad-ui/bundle";

export const Tray = createComponent(
  React,
  "sp-tray",
  Component,
  {
    close: "close",
  },
  "Tray"
);
