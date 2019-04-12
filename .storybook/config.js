import { configure } from '@storybook/polymer';

// NOTE: Because we use CustomElement registry, we will need to refresh the whole iframe on
// HMR of our web components to allow us to register the new versions
if (module.hot) {
    module.hot.dispose(() => {
        location.reload();
        throw 'reloading...';
    });
}

function loadStories() {
    const req = require.context('../stories', true, /\.stories\.js$/);
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
