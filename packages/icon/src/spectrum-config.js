/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = {
    spectrum: 'icon',
    components: [
        {
            name: 'icon',
            host: '.spectrum-Icon',
            attributes: [
                {
                    type: 'enum',
                    name: 'size',
                    values: [
                        {
                            name: 'xxs',
                            selector: '.spectrum-Icon--sizeXXS',
                        },
                        {
                            name: 'xs',
                            selector: '.spectrum-Icon--sizeXS',
                        },
                        {
                            name: 's',
                            selector: '.spectrum-Icon--sizeS',
                        },
                        {
                            name: 'm',
                            selector: '.spectrum-Icon--sizeM',
                        },
                        {
                            name: 'l',
                            selector: '.spectrum-Icon--sizeL',
                        },
                        {
                            name: 'xl',
                            selector: '.spectrum-Icon--sizeXL',
                        },
                        {
                            name: 'xxl',
                            selector: '.spectrum-Icon--sizeXXL',
                        },
                    ],
                },
            ],
        },
        {
            name: 'icon-alert-medium',
            host: {
                selector: '.spectrum-UIIcon-AlertMedium',
                shadowSelector: '.alert-medium',
            },
        },
        {
            name: 'icon-alert-small',
            host: {
                selector: '.spectrum-UIIcon-AlertSmall',
                shadowSelector: '.alert-small',
            },
        },
        {
            name: 'icon-arrow-down-small',
            host: {
                selector: '.spectrum-UIIcon-ArrowDownSmall',
                shadowSelector: '.arrow-down-small',
            },
        },
        {
            name: 'icon-arrow-left-medium',
            host: {
                selector: '.spectrum-UIIcon-ArrowLeftMedium',
                shadowSelector: '.arrow-left-medium',
            },
        },
        {
            name: 'icon-arrow-up-small',
            host: {
                selector: '.spectrum-UIIcon-ArrowUpSmall',
                shadowSelector: '.arrow-up-small',
            },
        },
        {
            name: 'icon-asterick',
            host: {
                selector: '.spectrum-UIIcon-Asterisk',
                shadowSelector: '.asterick',
            },
        },
        {
            name: 'icon-checkmark-medium',
            host: {
                selector: '.spectrum-UIIcon-CheckmarkMedium',
                shadowSelector: '.checkmark-medium',
            },
        },
        {
            name: 'icon-checkmark-small',
            host: {
                selector: '.spectrum-UIIcon-CheckmarkSmall',
                shadowSelector: '.checkmark-small',
            },
        },
        {
            name: 'icon-chevron-down-medium',
            host: {
                selector: '.spectrum-UIIcon-ChevronDownMedium',
                shadowSelector: '.chevron-down-medium',
            },
        },
        {
            name: 'icon-chevron-down-small',
            host: {
                selector: '.spectrum-UIIcon-ChevronDownSmall',
                shadowSelector: '.chevron-down-small',
            },
        },
        {
            name: 'icon-chevron-left-large',
            host: {
                selector: '.spectrum-UIIcon-ChevronLeftLarge',
                shadowSelector: '.chevron-left-large',
            },
        },
        {
            name: 'icon-chevron-left-medium',
            host: {
                selector: '.spectrum-UIIcon-ChevronLeftMedium',
                shadowSelector: '.chevron-left-medium',
            },
        },
        {
            name: 'icon-chevron-right-large',
            host: {
                selector: '.spectrum-UIIcon-ChevronRightLarge',
                shadowSelector: '.chevron-right-large',
            },
        },
        {
            name: 'icon-chevron-right-medium',
            host: {
                selector: '.spectrum-UIIcon-ChevronRightMedium',
                shadowSelector: '.chevron-right-medium',
            },
        },
        {
            name: 'icon-chevron-right-small',
            host: {
                selector: '.spectrum-UIIcon-ChevronRightSmall',
                shadowSelector: '.chevron-right-small',
            },
        },
        {
            name: 'icon-chevron-up-small',
            host: {
                selector: '.spectrum-UIIcon-ChevronUpSmall',
                shadowSelector: '.chevron-up-small',
            },
        },
        {
            name: 'icon-corner-triangle',
            host: {
                selector: '.spectrum-UIIcon-CornerTriangle',
                shadowSelector: '.corner-triangle',
            },
        },
        {
            name: 'icon-cross-large',
            host: {
                selector: '.spectrum-UIIcon-CrossLarge',
                shadowSelector: '.cross-large',
            },
        },
        {
            name: 'icon-cross-medium',
            host: {
                selector: '.spectrum-UIIcon-CrossMedium',
                shadowSelector: '.cross-medium',
            },
        },
        {
            name: 'icon-cross-small',
            host: {
                selector: '.spectrum-UIIcon-CrossSmall',
                shadowSelector: '.cross-small',
            },
        },
        {
            name: 'icon-dash-small',
            host: {
                selector: '.spectrum-UIIcon-DashSmall',
                shadowSelector: '.dash-small',
            },
        },
        {
            name: 'icon-double-gripper',
            host: {
                selector: '.spectrum-UIIcon-DoubleGripper',
                shadowSelector: '.double-gripper',
            },
        },
        {
            name: 'icon-folder-breadcrumb',
            host: {
                selector: '.spectrum-UIIcon-FolderBreadcrumb',
                shadowSelector: '.folder-breadcrumb',
            },
        },
        {
            name: 'icon-help-medium',
            host: {
                selector: '.spectrum-UIIcon-HelpMedium',
                shadowSelector: '.help-medium',
            },
        },
        {
            name: 'icon-help-small',
            host: {
                selector: '.spectrum-UIIcon-HelpSmall',
                shadowSelector: '.help-small',
            },
        },
        {
            name: 'icon-info-medium',
            host: {
                selector: '.spectrum-UIIcon-InfoMedium',
                shadowSelector: '.info-medium',
            },
        },
        {
            name: 'icon-info-small',
            host: {
                selector: '.spectrum-UIIcon-InfoSmall',
                shadowSelector: '.info-small',
            },
        },
        {
            name: 'icon-magnifier',
            host: {
                selector: '.spectrum-UIIcon-Magnifier',
                shadowSelector: '.magnifier',
            },
        },
        {
            name: 'icon-skip-left',
            host: {
                selector: '.spectrum-UIIcon-SkipLeft',
                shadowSelector: '.skip-left',
            },
        },
        {
            name: 'icon-skip-right',
            host: {
                selector: '.spectrum-UIIcon-SkipRight',
                shadowSelector: '.skip-right',
            },
        },
        {
            name: 'icon-star',
            host: {
                selector: '.spectrum-UIIcon-Star',
                shadowSelector: '.star',
            },
        },
        {
            name: 'icon-star-outline',
            host: {
                selector: '.spectrum-UIIcon-StarOutline',
                shadowSelector: '.star-outline',
            },
        },
        {
            name: 'icon-success-medium',
            host: {
                selector: '.spectrum-UIIcon-SuccessMedium',
                shadowSelector: '.success-medium',
            },
        },
        {
            name: 'icon-success-small',
            host: {
                selector: '.spectrum-UIIcon-SuccessSmall',
                shadowSelector: '.success-small',
            },
        },
        {
            name: 'icon-triple-gripper',
            host: {
                selector: '.spectrum-UIIcon-TripleGripper',
                shadowSelector: '.triple-gripper',
            },
        },
    ],
};
