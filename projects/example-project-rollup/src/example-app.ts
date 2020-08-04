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

// import our stylesheets
import './styles.css';

// import the components we'll use in this page
import '@spectrum-web-components/button/sp-button';
import '@spectrum-web-components/dropdown/sp-dropdown';
import '@spectrum-web-components/menu/sp-menu';
import '@spectrum-web-components/menu/sp-menu-item';

// While https://github.com/open-wc/open-wc/issues/1210 and
// go https://github.com/popperjs/popper-core/issues/933 persist
// without an acceptable outcome, this allows the built storybook
// to function with `process.env.NODE_ENV`... :/
window.process = window.process || {};
window.process.env = window.process.env || {};
window.process.env.NODE_ENV = window.process.env.NODE_ENV || 'production';

/**
 * Uncomment this following line to allow rollup to include dynamically
 * imported code whereever it thinks it should best be bundled. In particular,
 * @open-wc/building-rollup currently uses a babel feature that will still split
 * this into more than a single bundle.
 * https://github.com/open-wc/open-wc/issues/1625#issuecomment-632158102
 **/
// export { Overlay } from '@spectrum-web-components/overlay';
