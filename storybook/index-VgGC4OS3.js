import './sp-accordion-item-CAZhfIii.js';
import './sp-link-DslkogVS.js';
import { x } from './lit-html-COgVUehj.js';

const AccordionMarkup = ({
  allowMultiple = false,
  disabled = false,
  open = false,
  size = "m",
  density = void 0
} = {}) => {
  return x`
        <sp-accordion
            ?allow-multiple=${allowMultiple}
            density=${density}
            size=${size}
        >
            <sp-accordion-item label="Heading 1" ?disabled=${disabled}>
                <div>Item 1</div>
            </sp-accordion-item>
            <sp-accordion-item label="Heading 2" ?open=${open}>
                Item 2
            </sp-accordion-item>
            <sp-accordion-item label="Heading 3">
                <p>
                    This is content that has a
                    <sp-link
                        href="http://opensource.adobe.com/spectrum-web-components"
                        target="_blank"
                    >
                        link back to Spectrum Web Components
                    </sp-link>
                    so that it is easy to test that "Space" and "Enter"
                    interactions on focusable content does NOT toggle the
                    Accordion Item.
                </p>
            </sp-accordion-item>
        </sp-accordion>
    `;
};

export { AccordionMarkup as A };
