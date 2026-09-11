"use strict";
import { css } from "@spectrum-web-components/base";
const styles = css`
    .spectrum-FieldGroup--toplabel{flex-direction:column}.spectrum-FieldGroup--sidelabel{flex-direction:row}.group{flex-flow:column wrap;display:flex}:host([vertical]) .group{flex-direction:column}:host([horizontal]) .group{flex-direction:row}:host([horizontal]) .group slot:not([name])::slotted(:not(:last-child)){margin-inline-end:var(--spectrum-fieldgroup-margin)}:host([horizontal]) .group .spectrum-HelpText{flex-basis:100%}
`;
export default styles;
//# sourceMappingURL=spectrum-field-group.css.dev.js.map
