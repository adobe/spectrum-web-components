/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import rollupJson from '@rollup/plugin-json';
import { mergeConfig } from 'vite';

export default {
    async viteFinal(config, { configType }) {
        // return the customized config

        const newConfig = mergeConfig(config, {
            build: {
                // customize the Vite config here
                base: './',
            },
            base: './',
        });
        return newConfig;
    },
    stories: [
        '../packages/*/stories/*.stories.js',
        '../tools/*/stories/*.stories.js',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-a11y',
        // "@storybook/addon-storysource"
    ],
    nodeResolve: {
        exportConditions: ['browser', 'development'],
    },

    rollupConfig(config) {
        // add a new plugin to the build
        config.plugins.push(rollupJson());
        return config;
    },
    framework: {
        name: '@storybook/web-components-vite',
    },
    features: {
        storyStoreV7: true,
    },
    core: {
        builder: '@storybook/builder-vite', // 👈 The builder enabled here.
    },
};
