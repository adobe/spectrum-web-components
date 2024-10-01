import './sp-link-DslkogVS.js';
import { x } from './lit-html-COgVUehj.js';
import './like-anchor-B3Uz3TFY.js';
import './define-element-C_3bgzm7.js';
import './lit-element-BulMEkr1.js';
import './if-defined-DDJGFaN4.js';
import './focusable-w-VMKDtH.js';
import './focus-visible-D29Av9Xb.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';

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
const Disabled = () => {
  return x`
        This is a <sp-link disabled onclick="('hi')" href="#">disabled non focusable link</sp-link> in a sentence.
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
const __namedExportsOrder = ['Default', 'Quiet', 'Disabled', 'secondary', 'secondaryQuiet', 'staticWhite', 'staticBlack', 'staticWhiteQuiet', 'staticBlackQuiet', 'Download'];

export { Default, Disabled, Download, Quiet, __namedExportsOrder, link_stories as default, secondary, secondaryQuiet, staticBlack, staticBlackQuiet, staticWhite, staticWhiteQuiet };
