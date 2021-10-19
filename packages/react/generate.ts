import * as React from 'react';
import * as _ from 'lodash';
import { createComponent } from '@lit-labs/react';

export const generateReactCom = (SwcClass: any) => {
    console.log(SwcClass);
    const SwcClassName: string = SwcClass.name;
    const SwcTagName: string = _.kebabCase(SwcClassName);
    return createComponent(React, SwcTagName, SwcClass);
};

export const generatePackageReactComs = (PackageComs: any) => {
    let packageMap: any = {};
    for (const PackageComName in PackageComs) {
        const PackageComClass = PackageComs[PackageComName];
        packageMap[PackageComClass.name] = generateReactCom(PackageComClass);
    }
    return packageMap;
};
