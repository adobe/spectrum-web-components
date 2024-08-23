/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import flatten from 'lodash/flatten';

export type ComponentPermutations<Props> = {
    [prop in keyof Props]: ReadonlyArray<Props[prop]>;
};

export default function createPermutations<Props>(
    permutations: Array<ComponentPermutations<Props>>
) {
    return flatten(permutations.map((set) => doCreatePermutations(set)));
}

function doCreatePermutations<Props>(
    permutations: ComponentPermutations<Props>
) {
    const result: Props[] = [];
    const propertyNames = Object.keys(permutations) as Array<keyof Props>;

    function addPermutations(
        remainingPropertyNames: Array<keyof Props>,
        currentPropertyValues: Partial<Props>
    ) {
        if (remainingPropertyNames.length === 0) {
            result.push({ ...currentPropertyValues } as Props);
            return;
        }

        const propertyName = remainingPropertyNames[0];

        permutations[propertyName].forEach((propertyValue) => {
            currentPropertyValues[propertyName] = propertyValue;
            addPermutations(
                remainingPropertyNames.slice(1),
                currentPropertyValues
            );
        });
    }

    addPermutations(propertyNames, {});

    return result;
}
