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

import * as Haunted from 'haunted';

// wrap default haunted interface to make it correctly match react
export default {
    useState: Haunted.useState,
    useContext: Haunted.useContext,
    createContext: Haunted.createContext,
    // eslint-disable-next-line
    forwardRef: (_ref: any, ref: any) => {
        // @TODO: investigate if this is the 'right' thing here?
        return ref;
    },
};

export * from 'haunted';
