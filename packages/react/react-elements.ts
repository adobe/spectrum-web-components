import * as SpComponents from './src';
import { generatePackageReactComs } from './generate.js';
const ReactComponents = generatePackageReactComs(SpComponents);

export { SpComponents, ReactComponents };
