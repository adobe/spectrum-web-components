// 自带副作用 默认注册风格为 sp-*
import '@lliad-ui/bundle/elements';
import * as SpComponents from './src';
import {
    lliadCustomElementsDefine,
    lliadCustomElementsHas,
} from '@lliad-ui/base';

// 引入所有Sp组件 并重新定义成React组件
import { generatePackageReactComs } from './generate.js';
const ReactComponents = generatePackageReactComs(SpComponents);

export { SpComponents, ReactComponents };
export { lliadCustomElementsDefine, lliadCustomElementsHas };
