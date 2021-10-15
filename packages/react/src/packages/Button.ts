import * as React from 'react';
import { createComponent } from '@lit-labs/react';

import * as ButtonPackage from '@future-ui/button';
const { Button, ButtonBase, StyledButton, ClearButton } = ButtonPackage;

export const SpButton = generateReactComponent(Button);
export const SpButtonBase = generateReactComponent(ButtonBase);
export const SpStyledButton = generateReactComponent(StyledButton);
export const SpClearButton = generateReactComponent(ClearButton);

function generateReactComponent(SpClass: Constructor<I>) {
    return createComponent(React, 'sp-button', SpClass);
}
