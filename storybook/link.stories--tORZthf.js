import './sp-link-DPQsGiuM.js';
import { x } from './lit-html-GmIhAbMP.js';
import './like-anchor-SzCf8Fo9.js';
import './define-element-b58XwwBM.js';
import './lit-element-xBOPiTek.js';
import './if-defined-pV6JZKXB.js';
import './focusable-XJQHb8mq.js';
import './focus-visible-68QWcOy-.js';
import './query-JMOstM_r.js';
import './base-STdhtiz1.js';

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
