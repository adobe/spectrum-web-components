import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Tabs as Component } from "@iliad-ui/bundle";

export const Tabs = createComponent(
  React,
  "sp-tabs",
  Component,
  {
    change: "change",
    keydown: "keydown",
  },
  "Tabs"
);
