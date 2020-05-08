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

const appliedSizeDefaults = new WeakMap();

export const applyMaxSize = {
    name: 'applyMaxSize',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['maxSize'],
    fn({
        state,
    }: {
        state: {
            modifiersData: {
                maxSize: {
                    height: number;
                };
            };
            elements: {
                popper: HTMLElement;
            };
            rects: {
                popper: {
                    height: number;
                };
            };
            styles: {
                popper: {
                    maxHeight: string;
                    height: string;
                    overflow: string;
                };
            };
        };
    }) {
        const { height: maxHeight } = state.modifiersData.maxSize;
        if (!appliedSizeDefaults.has(state.elements.popper)) {
            appliedSizeDefaults.set(
                state.elements.popper,
                state.rects.popper.height
            );
        }
        const actualHeight = appliedSizeDefaults.get(state.elements.popper);
        const constrainHeight = maxHeight < actualHeight;
        const appliedHeight = constrainHeight ? `${maxHeight}px` : '';
        state.styles.popper.maxHeight = appliedHeight;
        state.styles.popper.height = appliedHeight;
    },
};
