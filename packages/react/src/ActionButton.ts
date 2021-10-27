import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { ActionButton as Component } from "@iliad-ui/bundle";

export const ActionButton = createComponent(
  React,
  "sp-action-button",
  Component,
  {
    longpress: "longpress",
    change: "change",
    keydown: "keydown",
  },
  "ActionButton"
);
