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

// @lit-labs/virtualizer combines defining the LitVirtualizer class with defining `lit-virtualizer` in the global registry.
// Grid extends LitVirtualizer and doesn't need the tag, which can conflict with other uses of lit-virtualizer in the same document.
// This is a hack to keep lit-virtualizer from registering globally.

const oldDefine = customElements.define;
customElements.define = (name, constructor) => {
    if (name === 'lit-virtualizer') return;
    oldDefine.call(customElements, name, constructor);
};

const { LitVirtualizer } = await import('@lit-labs/virtualizer');

customElements.define = oldDefine;

export { LitVirtualizer };
