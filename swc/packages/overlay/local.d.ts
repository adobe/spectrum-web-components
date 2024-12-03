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

declare module '@popperjs/core/dist/esm/popper-lite.js' {
    import {
        popperGenerator,
        defaultModifiers,
    } from '@popperjs/core/lib/popper-lite';

    export { popperGenerator, defaultModifiers };
}

declare module '@popperjs/core/dist/esm/types.js' {
    import { Instance, VirtualElement } from '@popperjs/core/lib/types.js';

    export { Instance, VirtualElement };
}

declare module '@popperjs/core/dist/esm/enums.js' {
    import { Placement } from '@popperjs/core/lib/enums.js';

    export { Placement };
}

declare module '@popperjs/core/dist/esm/modifiers/flip.js' {
    import flip from '@popperjs/core/lib/modifiers/flip.js';

    export default flip;
}

declare module '@popperjs/core/dist/esm/modifiers/preventOverflow.js' {
    import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';

    export default preventOverflow;
}

declare module '@popperjs/core/dist/esm/modifiers/arrow.js' {
    import arrow from '@popperjs/core/lib/modifiers/arrow.js';

    export default arrow;
}

declare module '@popperjs/core/dist/esm/modifiers/offset.js' {
    import offset from '@popperjs/core/lib/modifiers/offset.js';

    export default offset;
}
