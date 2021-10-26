/*
Copyright 2020 Adobe. All rights reserved.
Copyright 2021 Gaoding. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// 自带副作用 默认注册风格为 sp-*
import '@iliad-ui/bundle/elements';
import * as SpComponents from './src';
import {
    iliadCustomElementsDefine,
    lliadCustomElementsHas,
} from '@iliad-ui/base';

// 引入所有Sp组件 并重新定义成React组件
import { generatePackageReactComs } from './generate.js';
const ReactComponents = generatePackageReactComs(SpComponents);

export { SpComponents, ReactComponents };
export { iliadCustomElementsDefine, lliadCustomElementsHas };
