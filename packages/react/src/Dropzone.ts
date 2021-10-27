import * as React from "react";
import { createComponent } from "@lit-labs/react";
import { Dropzone as Component } from "@iliad-ui/bundle";

export const Dropzone = createComponent(
  React,
  "sp-dropzone",
  Component,
  {
    "sp-dropzone-should-accept": "sp-dropzone-should-accept",
    "sp-dropzone-dragover": "sp-dropzone-dragover",
    "sp-dropzone-dragleave": "sp-dropzone-dragleave",
    "sp-dropzone-drop": "sp-dropzone-drop",
  },
  "Dropzone"
);
