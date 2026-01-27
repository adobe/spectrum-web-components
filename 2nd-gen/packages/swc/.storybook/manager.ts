import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';
import '../stylesheets/swc.css';
import './assets/manager.css';

import logo from './assets/logo.svg';

const root = document.body ?? document.documentElement;
if (root) root.classList.add('spectrum', 'spectrum--light', 'spectrum--medium');

addons.setConfig({
    theme: create({
        base: 'light',

        brandTitle: 'Adobe | Spectrum Web Components',
        brandUrl: '?path=/docs/about-swc-overview--readme', // TODO: Add the correct URL once we are publishing 2nd-gen
        brandImage: logo,
        brandTarget: '_self',
    }),
});
