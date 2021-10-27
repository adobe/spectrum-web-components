import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Toast as Component } from "@iliad-ui/bundle";

export const Toast = createComponent(
  React,
  "sp-toast",
  Component,
  {
    close: "close",
  },
  "Toast"
);
