/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { FocusGroupConfig, FocusGroupController } from './FocusGroup.js';

export type RovingTabindexConfig<T> = FocusGroupConfig<T>;
interface UpdateTabIndexes {
    tabIndex: number;
    removeTabIndex?: boolean;
}

export class RovingTabindexController<
    T extends HTMLElement,
> extends FocusGroupController<T> {
    protected override set focused(focused: boolean) {
        if (focused === this.focused) return;
        super.focused = focused;
        this.manageTabindexes();
    }

    protected override get focused(): boolean {
        return super.focused;
    }

    private managed = true;

    private manageIndexesAnimationFrame = 0;

    override clearElementCache(offset = 0): void {
        cancelAnimationFrame(this.manageIndexesAnimationFrame);
        super.clearElementCache(offset);
        if (!this.managed) return;

        this.manageIndexesAnimationFrame = requestAnimationFrame(() =>
            this.manageTabindexes()
        );
    }

    manageTabindexes(): void {
        if (this.focused && !this.hostDelegatesFocus) {
            this.updateTabindexes(() => ({ tabIndex: -1 }));
        } else {
            this.updateTabindexes((el: HTMLElement): UpdateTabIndexes => {
                return {
                    removeTabIndex:
                        el.contains(this.focusInElement) &&
                        el !== this.focusInElement,
                    tabIndex: el === this.focusInElement ? 0 : -1,
                };
            });
        }
    }

    updateTabindexes(getTabIndex: (el: HTMLElement) => UpdateTabIndexes): void {
        this.elements.forEach((el) => {
            const { tabIndex, removeTabIndex } = getTabIndex(el);
            if (!removeTabIndex) {
                if (this.focused) {
                    if (el !== this.elements[this.currentIndex]) {
                        el.tabIndex = tabIndex;
                    }
                } else {
                    el.tabIndex = tabIndex;
                }
                return;
            }
            const updatable = el as unknown as {
                requestUpdate?: () => void;
            };
            if (updatable.requestUpdate) updatable.requestUpdate();
        });
    }

    override manage(): void {
        this.managed = true;
        this.manageTabindexes();
        super.manage();
    }

    override unmanage(): void {
        this.managed = false;
        this.updateTabindexes(() => ({ tabIndex: 0 }));
        super.unmanage();
    }

    override hostUpdated(): void {
        super.hostUpdated();
        if (!this.host.hasUpdated) {
            this.manageTabindexes();
        }
    }
}
