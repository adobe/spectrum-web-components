import * as React from 'react';
import * as _ from 'lodash';
import { createComponent } from '@lit-labs/react';

export const generateReactCom = (
    swcTagName: string,
    swcClass: any,
    swcDisplayName?: string
): any => {
    return createComponent(React, swcTagName, swcClass, {}, swcDisplayName);
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

// 判断是否是es6的构造类
function isClassFunction(obj: any): boolean {
    if (typeof obj !== 'function') return false;
    const str = obj.toString();
    if (str.slice(0, 5) !== 'class') return false;
    return true;
}
