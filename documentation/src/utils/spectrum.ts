import * as Spectrum from '../../../src/index';
import * as MediumIcons from '../../../src/icons/icons-medium';

const { defineCustomElement, defineCustomElements, ...Elements } = Spectrum;
const customElements = Object.values(Elements).filter((element) => {
    return !!element.is;
});

defineCustomElements(...customElements, ...Object.values(MediumIcons));
