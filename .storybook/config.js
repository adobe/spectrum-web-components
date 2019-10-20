import { configure, addDecorator } from '@storybook/polymer';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

import '../packages/styles/all-medium-light.css';

// NOTE: Because we use CustomElement registry, we will need to refresh the whole iframe on
// HMR of our web components to allow us to register the new versions
if (module.hot) {
    module.hot.dispose(() => {
        location.reload();
        throw 'reloading...';
    });
}

addDecorator(withA11y);
addDecorator(withKnobs);
configure(require.context('../packages', true, /\.stories\.ts$/), module);
