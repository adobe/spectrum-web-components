import './sp-link-2bb974c1.js';
import { x } from './lit-html-126adc72.js';
import './like-anchor-79c92c76.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './if-defined-ae83b405.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';

var link_stories = {
  component: "sp-link",
  title: "Link"
};
const Default = () => {
  return x`
        This is a <sp-link href="#">link</sp-link> in a sentence.
    `;
};
const Quiet = () => {
  return x`
        This is a <sp-link quiet href="#">quiet link</sp-link> in a sentence.
    `;
};
const secondary = () => {
  return x`
        This is a <sp-link variant="secondary" href="#">link</sp-link> in a sentence.
    `;
};
const secondaryQuiet = () => {
  return x`
        This is a <sp-link variant="secondary" quiet href="#">quiet link</sp-link> in a sentence.
    `;
};
const staticWhite = () => {
  return x`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link static="white" href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
const staticBlack = () => {
  return x`
        <div
            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(15, 15, 15);">
                This
                <sp-link static="black" href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
const staticWhiteQuiet = () => {
  return x`
        <div
            style="background-color: rgb(15, 121, 125); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(240, 240, 240);">
                This
                <sp-link static="white" quiet href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
const staticBlackQuiet = () => {
  return x`
        <div
            style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
        >
            <p style="color: rgb(15, 15, 15);">
                This
                <sp-link static="black" quiet href="#">link</sp-link>
                has a background.
            </p>
        </div>
    `;
};
const Download = () => {
  const blob = new Blob(["some text for the file"], {
    type: "text/plain;charset=utf-8"
  });
  return x`
        This is a
        <sp-link download="somefile.txt" href="${URL.createObjectURL(blob)}">
            downloadable file
        </sp-link>
        for you to click on.
    `;
};
const __namedExportsOrder = ['Default', 'Quiet', 'secondary', 'secondaryQuiet', 'staticWhite', 'staticBlack', 'staticWhiteQuiet', 'staticBlackQuiet', 'Download'];

export { Default, Download, Quiet, __namedExportsOrder, link_stories as default, secondary, secondaryQuiet, staticBlack, staticBlackQuiet, staticWhite, staticWhiteQuiet };
