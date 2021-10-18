import * as React from 'react';
import _ from 'lodash';
import { createComponent } from '@lit-labs/react';

export const generateReactCom = (
    SwcClass: ConstructorParameters
): ConstructorParameters => {
    const SwcClassName = SwcClass.name;
    const SwcTagName = _.kebabCase(SwcClassName);
    return createComponent(React, SwcTagName, SwcClass);
};

export const generatePackageReactComs = (PackageComs: any) => {
    let packageMap = {};
    for (const PackageCom in PackageComs) {
        packageMap[PackageCom.name] = generateReactCom(PackageCom);
    }
    return packageMap;
};
