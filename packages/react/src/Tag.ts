import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Tag as Component } from "@iliad-ui/bundle";

export const Tag = createComponent(
  React,
  "sp-tag",
  Component,
  {
    delete: "delete",
  },
  "Tag"
);
