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
/*
Copyright 2024 Your Company. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { ReactiveController, ReactiveElement } from 'lit';

type PendingStateConfig = {
    pending: () => boolean;
    onPendingChange: (pending: boolean) => void;
};

export class PendingStateController<T extends ReactiveElement>
    implements ReactiveController
{
    private host: T;
    private pending: () => boolean;
    private onPendingChange: (pending: boolean) => void;

    constructor(host: T, { pending, onPendingChange }: PendingStateConfig) {
        this.host = host;
        this.pending = pending;
        this.onPendingChange = onPendingChange;

        this.host.addController(this);
    }

    public getPending(): boolean {
        return this.pending();
    }

    hostConnected(): void {
        this.checkPendingState();
    }

    hostUpdated(): void {
        this.checkPendingState();
    }

    private checkPendingState(): void {
        const isPending = this.pending();
        this.onPendingChange(isPending);
    }
}
