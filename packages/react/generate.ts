import * as React from 'react';
import * as _ from 'lodash';
import { createComponent } from '@lit-labs/react';
import SpModuleInfo from './custom-elements.json';
const { modules: SpModules } = SpModuleInfo;

export const generateReactCom = (
    swcTagName: string,
    swcClass: any,
    swcDisplayName?: string
): any => {
    // 生成事件代理
    let events: any = {};
    const swModule: any = findPackageModule(swcTagName);
    const moduleEvents: any[] = swModule?.events || [];
    moduleEvents.forEach((moduleEvent: any) => {
        const { name: eventName }: { name: string } = moduleEvent;
        events[eventName] = eventName;
    });
    return createComponent(React, swcTagName, swcClass, events, swcDisplayName);
};

export const generatePackageReactComs = (packageComs: any): any => {
    let packageMap: any = {};
    for (const packageComName in packageComs) {
        const packageComClass = packageComs[packageComName];
        const isPackageClass = isClassFunction(packageComClass);
        if (!isPackageClass) continue;
        const packageDisplayName = `Sp${packageComName}`;
        const packageTagName = _.kebabCase(packageDisplayName);
        packageMap[packageDisplayName] = generateReactCom(
            packageTagName,
            packageComClass,
            packageDisplayName
        );
    }
    return packageMap;
};

function findPackageModule(tagName: string): any {
    let prefixedEl: any;
    SpModules.find((jsModule: any) => {
        prefixedEl = jsModule.declarations.find((jsDeclarations: any) => {
            return jsDeclarations.tagName === tagName;
        });
        return prefixedEl || false;
    });
    return prefixedEl || undefined;
}
// 判断是否是es6的构造类
function isClassFunction(obj: any): boolean {
    if (typeof obj !== 'function') return false;
    const str = obj.toString();
    if (str.slice(0, 5) !== 'class') return false;
    return true;
}
