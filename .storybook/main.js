const rollupJson = require('@rollup/plugin-json');

module.exports = {
    stories: [
        // We'd like to only need the following by the end of the conversion process...
        // '../packages/*/stories/*.stories.js'
        // From here we list each package individually so that we can turn each on when they are ready.
        '../packages/accordion/stories/*.stories.js',
        // Not addressed, yet.
        '../packages/action-button/stories/*.stories.js',
        '../packages/action-group/stories/*.stories.js',
        '../packages/action-menu/stories/*.stories.js',
        '../packages/action-bar/stories/*.stories.js',
        '../packages/asset/stories/*.stories.js',
        '../packages/avatar/stories/*.stories.js',
        '../packages/banner/stories/*.stories.js',
        '../packages/button/stories/*.stories.js',
        '../packages/button-group/stories/*.stories.js',
        '../packages/card/stories/*.stories.js',
        '../packages/color-area/stories/*.stories.js',
        '../packages/color-handle/stories/*.stories.js',
        '../packages/color-loupe/stories/*.stories.js',
        '../packages/color-slider/stories/*.stories.js',
        '../packages/color-wheel/stories/*.stories.js',
        '../packages/checkbox/stories/*.stories.js',
        '../packages/dialog/stories/*.stories.js',
        '../packages/divider/stories/*.stories.js',
        '../packages/dropzone/stories/*.stories.js',
        '../packages/field-label/stories/*.stories.js',
        '../packages/field-group/stories/*.stories.js',
        '../packages/icon/stories/*.stories.js',
        '../packages/icons/stories/*.stories.js',
        '../packages/icons-ui/stories/*.stories.js',
        '../packages/icons-workflow/stories/*.stories.js',
        '../packages/illustrated-message/stories/*.stories.js',
        '../packages/link/stories/*.stories.js',
        '../packages/menu/stories/*.stories.js',
        '../packages/meter/stories/*.stories.js',
        '../packages/overlay/stories/*.stories.js',
        '../packages/picker/stories/*.stories.js',
        '../packages/popover/stories/*.stories.js',
        '../packages/progress-bar/stories/*.stories.js',
        '../packages/progress-circle/stories/*.stories.js',
        '../packages/quick-actions/stories/*.stories.js',
        '../packages/radio/stories/*.stories.js',
        '../packages/rule/stories/*.stories.js',
        '../packages/search/stories/*.stories.js',
        '../packages/shared/stories/*.stories.js',
        '../packages/sidenav/stories/*.stories.js',
        '../packages/slider/stories/*.stories.js',
        '../packages/split-button/stories/*.stories.js',
        '../packages/status-light/stories/*.stories.js',
        '../packages/styles/stories/*.stories.js',
        '../packages/switch/stories/*.stories.js',
        '../packages/tabs/stories/*.stories.js',
        '../packages/tags/stories/*.stories.js',
        '../packages/textfield/stories/*.stories.js',
        '../packages/theme/stories/*.stories.js',
        '../packages/thumbnail/stories/*.stories.js',
        '../packages/toast/stories/*.stories.js',
        '../packages/tooltip/stories/*.stories.js',
        '../packages/top-nav/stories/*.stories.js',
        '../packages/underlay/stories/*.stories.js',
    ],

    rollupConfig(config) {
        // add a new plugin to the build
        config.plugins.push(rollupJson());

        return config;
    },
};
