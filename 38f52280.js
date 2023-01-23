import{i as t}from"./d230bd74.js";import{l as e,a as r,i,L as a,O as o,b as s,S as l}from"./5f508a3c.js";import{e as n,x as c,b as u,y as m,S as p}from"./95f60e39.js";import"./0c0e9c7b.js";import"./188f1e8b.js";import{e as d,i as h,t as g,a as v,s as f}from"./c19623f0.js";function x(t){return n({...t,state:!0})}const b=d(class extends h{constructor(t){if(super(t),t.type!==g.PROPERTY&&t.type!==g.ATTRIBUTE&&t.type!==g.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!v(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===c||e===u)return e;const r=t.element,i=t.name;if(t.type===g.PROPERTY){if(e===r[i])return c}else if(t.type===g.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(i))return c}else if(t.type===g.ATTRIBUTE&&r.getAttribute(i)===e+"")return c;return f(t),e}});var y=t`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Checkmark50{height:var(--spectrum-alias-ui-icon-checkmark-size-50);width:var(
--spectrum-alias-ui-icon-checkmark-size-50
)}.spectrum-UIIcon-Checkmark75{height:var(--spectrum-alias-ui-icon-checkmark-size-75);width:var(
--spectrum-alias-ui-icon-checkmark-size-75
)}.spectrum-UIIcon-Checkmark100{height:var(--spectrum-alias-ui-icon-checkmark-size-100);width:var(
--spectrum-alias-ui-icon-checkmark-size-100
)}.spectrum-UIIcon-Checkmark200{height:var(--spectrum-alias-ui-icon-checkmark-size-200);width:var(
--spectrum-alias-ui-icon-checkmark-size-200
)}.spectrum-UIIcon-Checkmark300{height:var(--spectrum-alias-ui-icon-checkmark-size-300);width:var(
--spectrum-alias-ui-icon-checkmark-size-300
)}.spectrum-UIIcon-Checkmark400{height:var(--spectrum-alias-ui-icon-checkmark-size-400);width:var(
--spectrum-alias-ui-icon-checkmark-size-400
)}.spectrum-UIIcon-Checkmark500{height:var(--spectrum-alias-ui-icon-checkmark-size-500);width:var(
--spectrum-alias-ui-icon-checkmark-size-500
)}.spectrum-UIIcon-Checkmark600{height:var(--spectrum-alias-ui-icon-checkmark-size-600);width:var(
--spectrum-alias-ui-icon-checkmark-size-600
)}
`;var z=t`
.spectrum{color:var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color));font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);font-size:var(
--spectrum-alias-font-size-default,var(--spectrum-global-dimension-font-size-100)
)}
`;var k=t`
.spectrum:lang(ar){font-family:var(
--spectrum-alias-font-family-ar,var(--spectrum-global-font-font-family-ar)
)}.spectrum:lang(he){font-family:var(
--spectrum-alias-font-family-he,var(--spectrum-global-font-font-family-he)
)}.spectrum:lang(zh-Hans){font-family:var(
--spectrum-alias-font-family-zhhans,var(--spectrum-global-font-font-family-zhhans)
)}.spectrum:lang(zh-Hant){font-family:var(
--spectrum-alias-font-family-zh,var(--spectrum-global-font-font-family-zh)
)}.spectrum:lang(zh){font-family:var(
--spectrum-alias-font-family-zh,var(--spectrum-global-font-font-family-zh)
)}.spectrum:lang(ko){font-family:var(
--spectrum-alias-font-family-ko,var(--spectrum-global-font-font-family-ko)
)}.spectrum:lang(ja){font-family:var(
--spectrum-alias-font-family-ja,var(--spectrum-global-font-font-family-ja)
)}.spectrum:lang(ja) .spectrum-Heading--sizeXXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXXL{font-size:var(
--spectrum-heading-han-xxxl-text-size,var(--spectrum-alias-heading-han-xxxl-text-size)
);font-style:var(
--spectrum-heading-han-xxxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-xxxl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-xxxl-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-xxxl-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXL{font-size:var(
--spectrum-heading-han-xxl-text-size,var(--spectrum-alias-heading-han-xxl-text-size)
);font-style:var(
--spectrum-heading-han-xxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-xxl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-xxl-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-xxl-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeXL,.spectrum:lang(ko) .spectrum-Heading--sizeXL,.spectrum:lang(zh) .spectrum-Heading--sizeXL{font-size:var(
--spectrum-heading-han-xl-text-size,var(--spectrum-alias-heading-han-xl-text-size)
);font-style:var(
--spectrum-heading-han-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-xl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-xl-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-xl-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeL,.spectrum:lang(ko) .spectrum-Heading--sizeL,.spectrum:lang(zh) .spectrum-Heading--sizeL{font-size:var(
--spectrum-heading-han-l-text-size,var(--spectrum-alias-heading-han-l-text-size)
);font-style:var(
--spectrum-heading-han-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-l-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-l-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-l-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeM,.spectrum:lang(ko) .spectrum-Heading--sizeM,.spectrum:lang(zh) .spectrum-Heading--sizeM{font-size:var(
--spectrum-heading-han-m-text-size,var(--spectrum-alias-heading-han-m-text-size)
);font-style:var(
--spectrum-heading-han-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-m-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-m-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeS,.spectrum:lang(ko) .spectrum-Heading--sizeS,.spectrum:lang(zh) .spectrum-Heading--sizeS{font-size:var(
--spectrum-heading-han-s-text-size,var(--spectrum-alias-heading-han-s-text-size)
);font-style:var(
--spectrum-heading-han-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-s-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-s-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-s-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeXS,.spectrum:lang(ko) .spectrum-Heading--sizeXS,.spectrum:lang(zh) .spectrum-Heading--sizeXS{font-size:var(
--spectrum-heading-han-xs-text-size,var(--spectrum-alias-heading-han-xs-text-size)
);font-style:var(
--spectrum-heading-han-xs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-xs-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-xs-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-xs-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeXXS,.spectrum:lang(ko) .spectrum-Heading--sizeXXS,.spectrum:lang(zh) .spectrum-Heading--sizeXXS{font-size:var(
--spectrum-heading-han-xxs-text-size,var(--spectrum-alias-heading-han-xxs-text-size)
);font-style:var(
--spectrum-heading-han-xxs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-xxs-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-xxs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-xxs-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-xxs-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--heavy,.spectrum:lang(ko) .spectrum-Heading--heavy,.spectrum:lang(zh) .spectrum-Heading--heavy{font-weight:var(
--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
)}.spectrum:lang(ja) .spectrum-Heading--heavy .spectrum-Heading--emphasized,.spectrum:lang(ja) .spectrum-Heading--heavy em,.spectrum:lang(ko) .spectrum-Heading--heavy .spectrum-Heading--emphasized,.spectrum:lang(ko) .spectrum-Heading--heavy em,.spectrum:lang(zh) .spectrum-Heading--heavy .spectrum-Heading--emphasized,.spectrum:lang(zh) .spectrum-Heading--heavy em{font-style:var(
--spectrum-heading-han-heavy-m-emphasized-text-font-style
);font-weight:var(
--spectrum-heading-han-heavy-m-emphasized-text-font-weight
)}.spectrum:lang(ja) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(ja) .spectrum-Heading--heavy strong,.spectrum:lang(ko) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(ko) .spectrum-Heading--heavy strong,.spectrum:lang(zh) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(zh) .spectrum-Heading--heavy strong{font-style:var(
--spectrum-heading-m-heavy-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-m-heavy-strong-text-font-weight,var(--spectrum-alias-heading-text-font-weight-heavy-strong)
)}.spectrum:lang(ja) .spectrum-Heading--light,.spectrum:lang(ko) .spectrum-Heading--light,.spectrum:lang(zh) .spectrum-Heading--light{font-weight:var(
--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
)}.spectrum:lang(ja) .spectrum-Heading--light .spectrum-Heading--emphasized,.spectrum:lang(ja) .spectrum-Heading--light em,.spectrum:lang(ko) .spectrum-Heading--light .spectrum-Heading--emphasized,.spectrum:lang(ko) .spectrum-Heading--light em,.spectrum:lang(zh) .spectrum-Heading--light .spectrum-Heading--emphasized,.spectrum:lang(zh) .spectrum-Heading--light em{font-style:var(
--spectrum-heading-han-m-light-emphasized-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-m-light-emphasized-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-emphasis)
)}.spectrum:lang(ja) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(ja) .spectrum-Heading--light strong,.spectrum:lang(ko) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(ko) .spectrum-Heading--light strong,.spectrum:lang(zh) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(zh) .spectrum-Heading--light strong{font-style:var(
--spectrum-heading-han-m-light-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-m-light-strong-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-strong)
)}.spectrum:lang(ja) .spectrum-Body--sizeXXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXXL{font-size:var(
--spectrum-body-han-xxxl-text-size,var(--spectrum-global-dimension-font-size-600)
);font-style:var(
--spectrum-body-han-xxxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-xxxl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-xxxl-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-xxxl-text-transform,none)}.spectrum:lang(ja) .spectrum-Body--sizeXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXL{font-size:var(
--spectrum-body-han-xxl-text-size,var(--spectrum-global-dimension-font-size-500)
);font-style:var(
--spectrum-body-han-xxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-xxl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-xxl-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-xxl-text-transform,none)}.spectrum:lang(ja) .spectrum-Body--sizeXL,.spectrum:lang(ko) .spectrum-Body--sizeXL,.spectrum:lang(zh) .spectrum-Body--sizeXL{font-size:var(
--spectrum-body-han-xl-text-size,var(--spectrum-global-dimension-font-size-400)
);font-style:var(
--spectrum-body-han-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-xl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-xl-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-xl-text-transform,none)}.spectrum:lang(ja) .spectrum-Body--sizeL,.spectrum:lang(ko) .spectrum-Body--sizeL,.spectrum:lang(zh) .spectrum-Body--sizeL{font-size:var(
--spectrum-body-han-l-text-size,var(--spectrum-global-dimension-font-size-300)
);font-style:var(
--spectrum-body-han-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-l-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-l-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-l-text-transform,none)}.spectrum:lang(ja) .spectrum-Body--sizeM,.spectrum:lang(ko) .spectrum-Body--sizeM,.spectrum:lang(zh) .spectrum-Body--sizeM{font-size:var(
--spectrum-body-han-m-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-body-han-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-m-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-m-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-m-text-transform,none)}.spectrum:lang(ja) .spectrum-Body--sizeS,.spectrum:lang(ko) .spectrum-Body--sizeS,.spectrum:lang(zh) .spectrum-Body--sizeS{font-size:var(
--spectrum-body-han-s-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-body-han-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-s-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-s-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-s-text-transform,none)}.spectrum:lang(ja) .spectrum-Body--sizeXS,.spectrum:lang(ko) .spectrum-Body--sizeXS,.spectrum:lang(zh) .spectrum-Body--sizeXS{font-size:var(
--spectrum-body-han-xs-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-body-han-xs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-han-xs-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-body-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-body-han-xs-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-han-xs-text-transform,none)}.spectrum:lang(ja) .spectrum-Detail--sizeXL,.spectrum:lang(ko) .spectrum-Detail--sizeXL,.spectrum:lang(zh) .spectrum-Detail--sizeXL{font-size:var(
--spectrum-detail-han-xl-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-han-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-xl-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-xl-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-xl-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeXL em,.spectrum:lang(ko) .spectrum-Detail--sizeXL em,.spectrum:lang(zh) .spectrum-Detail--sizeXL em{font-size:var(
--spectrum-detail-han-xl-emphasized-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-han-xl-emphasized-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-xl-emphasized-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-xl-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-xl-emphasized-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-xl-emphasized-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeXL strong,.spectrum:lang(ko) .spectrum-Detail--sizeXL strong,.spectrum:lang(zh) .spectrum-Detail--sizeXL strong{font-size:var(
--spectrum-detail-han-xl-strong-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-han-xl-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-xl-strong-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-strong)
);letter-spacing:var(
--spectrum-detail-han-xl-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-xl-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-xl-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeL,.spectrum:lang(ko) .spectrum-Detail--sizeL,.spectrum:lang(zh) .spectrum-Detail--sizeL{font-size:var(
--spectrum-detail-han-l-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-han-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-l-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-l-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-l-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeL em,.spectrum:lang(ko) .spectrum-Detail--sizeL em,.spectrum:lang(zh) .spectrum-Detail--sizeL em{font-size:var(
--spectrum-detail-han-l-emphasized-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-han-l-emphasized-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-l-emphasized-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-l-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-l-emphasized-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-l-emphasized-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeL strong,.spectrum:lang(ko) .spectrum-Detail--sizeL strong,.spectrum:lang(zh) .spectrum-Detail--sizeL strong{font-size:var(
--spectrum-detail-han-l-strong-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-han-l-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-l-strong-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-strong)
);letter-spacing:var(
--spectrum-detail-han-l-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-l-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-l-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeM,.spectrum:lang(ko) .spectrum-Detail--sizeM,.spectrum:lang(zh) .spectrum-Detail--sizeM{font-size:var(
--spectrum-detail-han-m-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-han-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-m-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-m-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeM em,.spectrum:lang(ko) .spectrum-Detail--sizeM em,.spectrum:lang(zh) .spectrum-Detail--sizeM em{font-size:var(
--spectrum-detail-han-m-emphasized-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-han-m-emphasized-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-emphasized-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-m-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-m-emphasized-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-m-emphasized-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeM strong,.spectrum:lang(ko) .spectrum-Detail--sizeM strong,.spectrum:lang(zh) .spectrum-Detail--sizeM strong{font-size:var(
--spectrum-detail-han-m-strong-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-han-m-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-strong-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-strong)
);letter-spacing:var(
--spectrum-detail-han-m-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-m-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-m-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeS,.spectrum:lang(ko) .spectrum-Detail--sizeS,.spectrum:lang(zh) .spectrum-Detail--sizeS{font-size:var(
--spectrum-detail-han-s-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-han-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-s-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-detail-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-s-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-s-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeS em,.spectrum:lang(ko) .spectrum-Detail--sizeS em,.spectrum:lang(zh) .spectrum-Detail--sizeS em{font-size:var(
--spectrum-detail-han-s-emphasized-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-han-s-emphasized-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-s-emphasized-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-s-emphasized-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-s-emphasized-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-s-emphasized-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeS strong,.spectrum:lang(ko) .spectrum-Detail--sizeS strong,.spectrum:lang(zh) .spectrum-Detail--sizeS strong{font-size:var(
--spectrum-detail-han-s-strong-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-han-s-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-s-strong-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-strong)
);letter-spacing:var(
--spectrum-detail-han-s-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-detail-han-s-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-s-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--light,.spectrum:lang(ko) .spectrum-Detail--light,.spectrum:lang(zh) .spectrum-Detail--light{font-weight:var(
--spectrum-detail-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
)}.spectrum:lang(ja) .spectrum-Detail--light .spectrum-Detail--emphasized,.spectrum:lang(ja) .spectrum-Detail--light em,.spectrum:lang(ko) .spectrum-Detail--light .spectrum-Detail--emphasized,.spectrum:lang(ko) .spectrum-Detail--light em,.spectrum:lang(zh) .spectrum-Detail--light .spectrum-Detail--emphasized,.spectrum:lang(zh) .spectrum-Detail--light em{font-style:var(
--spectrum-detail-han-m-light-emphasized-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-light-emphasized-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-emphasis)
)}.spectrum:lang(ja) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(ja) .spectrum-Detail--light strong,.spectrum:lang(ko) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(ko) .spectrum-Detail--light strong,.spectrum:lang(zh) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(zh) .spectrum-Detail--light strong{font-style:var(
--spectrum-detail-han-m-light-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-light-strong-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-strong)
)}.spectrum:lang(ja) .spectrum-Code--sizeXL,.spectrum:lang(ko) .spectrum-Code--sizeXL,.spectrum:lang(zh) .spectrum-Code--sizeXL{font-family:var(
--spectrum-code-han-xl-text-font-family,var(--spectrum-alias-font-family-zh)
);font-size:var(
--spectrum-code-han-xl-text-size,var(--spectrum-global-dimension-font-size-400)
);font-style:var(
--spectrum-code-han-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-code-han-xl-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-code-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-code-han-xl-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0}.spectrum:lang(ja) .spectrum-Code--sizeL,.spectrum:lang(ko) .spectrum-Code--sizeL,.spectrum:lang(zh) .spectrum-Code--sizeL{font-family:var(
--spectrum-code-han-l-text-font-family,var(--spectrum-alias-font-family-zh)
);font-size:var(
--spectrum-code-han-l-text-size,var(--spectrum-global-dimension-font-size-300)
);font-style:var(
--spectrum-code-han-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-code-han-l-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-code-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-code-han-l-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0}.spectrum:lang(ja) .spectrum-Code--sizeM,.spectrum:lang(ko) .spectrum-Code--sizeM,.spectrum:lang(zh) .spectrum-Code--sizeM{font-family:var(
--spectrum-code-han-m-text-font-family,var(--spectrum-alias-font-family-zh)
);font-size:var(
--spectrum-code-han-m-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-code-han-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-code-han-m-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-code-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-code-han-m-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0}.spectrum:lang(ja) .spectrum-Code--sizeS,.spectrum:lang(ko) .spectrum-Code--sizeS,.spectrum:lang(zh) .spectrum-Code--sizeS{font-family:var(
--spectrum-code-han-s-text-font-family,var(--spectrum-alias-font-family-zh)
);font-size:var(
--spectrum-code-han-s-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-code-han-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-code-han-s-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-code-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-code-han-s-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0}.spectrum:lang(ja) .spectrum-Code--sizeXS,.spectrum:lang(ko) .spectrum-Code--sizeXS,.spectrum:lang(zh) .spectrum-Code--sizeXS{font-family:var(
--spectrum-code-han-xs-text-font-family,var(--spectrum-alias-font-family-zh)
);font-size:var(
--spectrum-code-han-xs-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-code-han-xs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-code-han-xs-text-font-weight,var(--spectrum-alias-han-body-text-font-weight-regular)
);letter-spacing:var(
--spectrum-code-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-code-han-xs-text-line-height,var(--spectrum-alias-han-body-text-line-height)
);margin-bottom:0;margin-top:0}.spectrum:lang(ja) .spectrum-Body--sizeXXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXXL{color:var(
--spectrum-body-han-xxxl-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Body--sizeXXL,.spectrum:lang(ko) .spectrum-Body--sizeXXL,.spectrum:lang(zh) .spectrum-Body--sizeXXL{color:var(
--spectrum-body-han-xxl-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Body--sizeXL,.spectrum:lang(ko) .spectrum-Body--sizeXL,.spectrum:lang(zh) .spectrum-Body--sizeXL{color:var(
--spectrum-body-han-xl-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Body--sizeL,.spectrum:lang(ko) .spectrum-Body--sizeL,.spectrum:lang(zh) .spectrum-Body--sizeL{color:var(
--spectrum-body-han-l-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Body--sizeM,.spectrum:lang(ko) .spectrum-Body--sizeM,.spectrum:lang(zh) .spectrum-Body--sizeM{color:var(
--spectrum-body-han-m-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Body--sizeS,.spectrum:lang(ko) .spectrum-Body--sizeS,.spectrum:lang(zh) .spectrum-Body--sizeS{color:var(
--spectrum-body-han-s-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Body--sizeXS,.spectrum:lang(ko) .spectrum-Body--sizeXS,.spectrum:lang(zh) .spectrum-Body--sizeXS{color:var(
--spectrum-body-han-xs-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeXXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXXL{color:var(
--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXL{color:var(
--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeXL,.spectrum:lang(ko) .spectrum-Heading--sizeXL,.spectrum:lang(zh) .spectrum-Heading--sizeXL{color:var(
--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeL,.spectrum:lang(ko) .spectrum-Heading--sizeL,.spectrum:lang(zh) .spectrum-Heading--sizeL{color:var(
--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeM,.spectrum:lang(ko) .spectrum-Heading--sizeM,.spectrum:lang(zh) .spectrum-Heading--sizeM{color:var(
--spectrum-heading-m-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeS,.spectrum:lang(ko) .spectrum-Heading--sizeS,.spectrum:lang(zh) .spectrum-Heading--sizeS{color:var(
--spectrum-heading-s-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeXS,.spectrum:lang(ko) .spectrum-Heading--sizeXS,.spectrum:lang(zh) .spectrum-Heading--sizeXS{color:var(
--spectrum-heading-xs-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading--sizeXXS,.spectrum:lang(ko) .spectrum-Heading--sizeXXS,.spectrum:lang(zh) .spectrum-Heading--sizeXXS{color:var(
--spectrum-heading-xxs-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--light{color:var(
--spectrum-heading-xxxl-light-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--light{color:var(
--spectrum-heading-xxl-light-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXL--light{color:var(
--spectrum-heading-xl-light-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeL--light,.spectrum:lang(ko) .spectrum-Heading-sizeL--light,.spectrum:lang(zh) .spectrum-Heading-sizeL--light{color:var(
--spectrum-heading-l-light-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--heavy{color:var(
--spectrum-heading-xxxl-heavy-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--heavy{color:var(
--spectrum-heading-xxl-heavy-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXL--heavy{color:var(
--spectrum-heading-xl-heavy-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeL--heavy{color:var(
--spectrum-heading-l-heavy-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--heading{color:var(
--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--heading{color:var(
--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeXL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeXL--heading{color:var(
--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeL--heading,.spectrum:lang(ko) .spectrum-Heading-sizeL--heading,.spectrum:lang(zh) .spectrum-Heading-sizeL--heading{color:var(
--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Detail--sizeXL,.spectrum:lang(ko) .spectrum-Detail--sizeXL,.spectrum:lang(zh) .spectrum-Detail--sizeXL{color:var(
--spectrum-detail-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Detail--sizeL,.spectrum:lang(ko) .spectrum-Detail--sizeL,.spectrum:lang(zh) .spectrum-Detail--sizeL{color:var(
--spectrum-detail-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Detail--sizeM,.spectrum:lang(ko) .spectrum-Detail--sizeM,.spectrum:lang(zh) .spectrum-Detail--sizeM{color:var(
--spectrum-detail-m-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Detail--sizeS,.spectrum:lang(ko) .spectrum-Detail--sizeS,.spectrum:lang(zh) .spectrum-Detail--sizeS{color:var(
--spectrum-detail-s-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Code--sizeXL,.spectrum:lang(ko) .spectrum-Code--sizeXL,.spectrum:lang(zh) .spectrum-Code--sizeXL{color:var(
--spectrum-code-xl-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Code--sizeL,.spectrum:lang(ko) .spectrum-Code--sizeL,.spectrum:lang(zh) .spectrum-Code--sizeL{color:var(
--spectrum-code-l-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Code--sizeM,.spectrum:lang(ko) .spectrum-Code--sizeM,.spectrum:lang(zh) .spectrum-Code--sizeM{color:var(
--spectrum-code-m-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Code--sizeS,.spectrum:lang(ko) .spectrum-Code--sizeS,.spectrum:lang(zh) .spectrum-Code--sizeS{color:var(
--spectrum-code-s-text-color,var(--spectrum-alias-text-color)
)}.spectrum:lang(ja) .spectrum-Code--sizeXS,.spectrum:lang(ko) .spectrum-Code--sizeXS,.spectrum:lang(zh) .spectrum-Code--sizeXS{color:var(
--spectrum-code-xs-text-color,var(--spectrum-alias-text-color)
)}
`;var w=[z,k,t`
.spectrum-Body--sizeXXXL{font-size:var(
--spectrum-body-xxxl-text-size,var(--spectrum-global-dimension-font-size-600)
);font-style:var(
--spectrum-body-xxxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-xxxl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-xxxl-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-xxxl-text-transform,none)}.spectrum-Body--sizeXXL{font-size:var(
--spectrum-body-xxl-text-size,var(--spectrum-global-dimension-font-size-500)
);font-style:var(
--spectrum-body-xxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-xxl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-xxl-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-xxl-text-transform,none)}.spectrum-Body--sizeXL{font-size:var(
--spectrum-body-xl-text-size,var(--spectrum-global-dimension-font-size-400)
);font-style:var(
--spectrum-body-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-xl-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-xl-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-xl-text-transform,none)}.spectrum-Body--sizeL{font-size:var(
--spectrum-body-l-text-size,var(--spectrum-global-dimension-font-size-300)
);font-style:var(
--spectrum-body-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-l-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-l-text-transform,none)}.spectrum-Body--sizeM{font-size:var(
--spectrum-body-m-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-body-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-m-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-m-text-transform,none)}.spectrum-Body--sizeS{font-size:var(
--spectrum-body-s-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-body-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-s-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-s-text-transform,none)}.spectrum-Body--sizeXS{font-size:var(
--spectrum-body-xs-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-body-xs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-xs-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-xs-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-body-xs-text-transform,none)}.spectrum-Body{font-family:var(
--spectrum-body-m-text-font-family,var(--spectrum-alias-body-text-font-family)
)}.spectrum-Body .spectrum-Body-strong,.spectrum-Body strong{font-weight:var(
--spectrum-body-m-strong-text-font-weight,var(--spectrum-global-font-weight-bold)
)}.spectrum-Body .spectrum-Body-emphasized,.spectrum-Body em{font-style:var(
--spectrum-body-m-emphasized-text-font-style,var(--spectrum-global-font-style-italic)
)}.spectrum-Body--serif{font-family:var(
--spectrum-body-m-serif-text-font-family,var(--spectrum-alias-serif-text-font-family)
)}.spectrum-Body--sizeXXXL{color:var(
--spectrum-body-xxxl-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body--sizeXXL{color:var(
--spectrum-body-xxl-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body--sizeXL{color:var(
--spectrum-body-xl-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body--sizeL{color:var(
--spectrum-body-l-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body--sizeM{color:var(
--spectrum-body-m-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body--sizeS{color:var(
--spectrum-body-s-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body--sizeXS{color:var(
--spectrum-body-xs-text-color,var(--spectrum-alias-text-color)
)}.spectrum-Body{color:var(
--spectrum-body-m-text-color,var(--spectrum-alias-text-color)
)}
`];function X(t,e,r){const i=t.getAttribute(e);let a=i?i.split(/\s+/):[];a=a.filter((t=>!r.find((e=>t===e)))),a.length?t.setAttribute(e,a.join(" ")):t.removeAttribute(e)}function L(t,e,r){const i=Array.isArray(r)?r:[r],a=t.getAttribute(e),o=a?a.split(/\s+/):[];return i.every((t=>o.indexOf(t)>-1))?()=>{}:(o.push(...i),t.setAttribute(e,o.join(" ")),()=>X(t,e,i))}const H=class{constructor(t,{mode:e}={mode:"internal"}){this.mode="internal",this.handleSlotchange=({target:t})=>{this.handleHelpText(t),this.handleNegativeHelpText(t)},this.host=t,this.instanceCount=H.instanceCount++,this.id=`sp-help-text-${this.instanceCount}`,this.mode=e}get isInternal(){return"internal"===this.mode}render(t){return m`
            <div id=${e(this.isInternal?this.id:void 0)}>
                <slot
                    name=${t?"negative-help-text":`pass-through-help-text-${this.instanceCount}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `}addId(){const t=this.helpTextElement?this.helpTextElement.id:this.id;this.conditionId=L(this.host,"aria-describedby",t),this.host.hasAttribute("tabindex")&&(this.previousTabindex=parseFloat(this.host.getAttribute("tabindex"))),this.host.tabIndex=0}removeId(){this.conditionId&&(this.conditionId(),delete this.conditionId),!this.helpTextElement&&(this.previousTabindex?this.host.tabIndex=this.previousTabindex:this.host.removeAttribute("tabindex"))}handleHelpText(t){if(this.isInternal)return;this.helpTextElement&&this.helpTextElement.id===this.id&&this.helpTextElement.removeAttribute("id"),this.removeId();const e=t.assignedElements()[0];this.helpTextElement=e,e&&(e.id||(e.id=this.id),this.addId())}handleNegativeHelpText(t){"negative-help-text"===t.name&&t.assignedElements().forEach((t=>t.variant="negative"))}};let j=H;function q(t,{mode:e}={mode:"internal"}){return class extends t{constructor(){super(...arguments),this.helpTextManager=new j(this,{mode:e})}get helpTextId(){return this.helpTextManager.id}renderHelpText(t){return this.helpTextManager.render(t)}}}j.instanceCount=0;var B=t`
:host{--spectrum-textfield-texticon-padding-left:var(
--spectrum-textfield-m-texticon-padding-left
);--spectrum-textfield-quiet-texticon-border-bottom-size:var(
--spectrum-textfield-m-quiet-texticon-border-bottom-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-quiet-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-quiet-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-texticon-border-radius:var(
--spectrum-textfield-m-quiet-texticon-border-radius,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-left:var(
--spectrum-textfield-m-quiet-texticon-padding-left,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-quiet-texticon-padding-right:var(
--spectrum-textfield-m-quiet-texticon-padding-right,var(--spectrum-global-dimension-size-0)
);--spectrum-textfield-texticon-border-size:var(
--spectrum-textfield-m-texticon-border-size,var(--spectrum-alias-input-border-size)
);--spectrum-textfield-texticon-text-line-height:var(
--spectrum-textfield-m-texticon-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-textfield-texticon-text-size:var(
--spectrum-textfield-m-texticon-text-size,var(--spectrum-global-dimension-font-size-100)
);--spectrum-textfield-texticon-placeholder-text-font-style:var(
--spectrum-textfield-m-texticon-placeholder-text-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-textfield-texticon-placeholder-text-font-weight:var(
--spectrum-textfield-m-texticon-placeholder-text-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-textfield-texticon-success-icon-height:var(
--spectrum-textfield-m-texticon-success-icon-height,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-width:var(
--spectrum-textfield-m-texticon-success-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-texticon-success-icon-margin-left:var(
--spectrum-textfield-m-texticon-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-invalid-icon-height:var(
--spectrum-textfield-m-texticon-invalid-icon-height,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-width:var(
--spectrum-textfield-m-texticon-invalid-icon-width,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-texticon-invalid-icon-margin-left:var(
--spectrum-textfield-m-texticon-invalid-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-min-width:var(
--spectrum-textfield-m-texticon-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-textfield-texticon-border-radius:var(
--spectrum-textfield-m-texticon-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-textfield-texticon-padding-right:var(
--spectrum-textfield-m-texticon-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-texticon-height:var(
--spectrum-textfield-m-texticon-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textarea-text-padding-top:var(
--spectrum-textarea-m-text-padding-top,var(--spectrum-global-dimension-size-75)
);--spectrum-textarea-text-padding-bottom:var(
--spectrum-textarea-m-text-padding-bottom,var(--spectrum-global-dimension-size-115)
);--spectrum-textarea-padding-left:var(
--spectrum-textarea-m-padding-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-padding-right:var(
--spectrum-textarea-m-padding-right,var(--spectrum-global-dimension-size-150)
);--spectrum-textarea-height:var(
--spectrum-textarea-m-height,var(--spectrum-global-dimension-size-400)
);--spectrum-textfield-texticon-padding-top:3px;--spectrum-textfield-texticon-padding-bottom:5px;--spectrum-textfield-texticon-text-font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);--spectrum-textfield-texticon-icon-gap:var(
--spectrum-global-dimension-size-65
);--spectrum-textfield-quiet-texticon-icon-gap:var(
--spectrum-global-dimension-size-75
);--spectrum-textarea-min-height:var(--spectrum-textarea-height);--spectrum-textarea-height-adjusted:auto;--spectrum-textarea-padding-top:var(--spectrum-textarea-text-padding-top);--spectrum-textarea-padding-bottom:var(
--spectrum-textarea-text-padding-bottom
)}#textfield{display:inline-flex;min-width:var(--spectrum-textfield-texticon-min-width);position:relative;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([quiet][multiline]) #textfield .input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:after{border-color:transparent;border-radius:calc(var(--spectrum-textfield-texticon-border-radius) + var(
--spectrum-textfield-m-texticon-focus-ring-gap,
var(--spectrum-alias-input-focusring-gap)
));bottom:0;content:"";left:0;margin:calc(var(
--spectrum-textfield-m-texticon-focus-ring-gap,
var(--spectrum-alias-input-focusring-gap)
)*-1);pointer-events:none;position:absolute;right:0;top:0;transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([quiet]) #textfield:after{border-radius:0}.input{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);height:var(--spectrum-textfield-texticon-height);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:none;overflow:visible;padding:var(--spectrum-textfield-texticon-padding-top) var(--spectrum-textfield-texticon-padding-right) var(--spectrum-textfield-texticon-padding-bottom) calc(var(--spectrum-textfield-texticon-padding-left) + 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}.input::placeholder{font-style:var(--spectrum-textfield-texticon-placeholder-text-font-style);font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
);opacity:1;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}.input:hover::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input:disabled{opacity:1;resize:none}.input:disabled::placeholder{font-weight:var(
--spectrum-textfield-texticon-placeholder-text-font-weight
)}.input::-ms-clear{height:0;width:0}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}:host([dir=ltr][valid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-success-icon-margin-left)
))}:host([dir=rtl][valid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-success-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-success-icon-margin-left)
))}:host([dir=ltr][invalid]) #textfield .input{padding-right:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-invalid-icon-margin-left)
))}:host([dir=rtl][invalid]) #textfield .input{padding-left:calc(var(--spectrum-textfield-texticon-padding-right) + var(--spectrum-textfield-texticon-invalid-icon-width) + var(
--spectrum-textfield-icon-inline-end-override,
var(--spectrum-textfield-texticon-invalid-icon-margin-left)
))}:host([multiline]) .input{height:var(
--spectrum-textarea-height-adjusted
);min-height:var(--spectrum-textarea-min-height);overflow:auto;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px)}:host([dir=ltr][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=rtl][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-left
)}:host([dir=ltr][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([dir=rtl][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-texticon-padding-right
)}:host([quiet]) .input{border-bottom-width:var(
--spectrum-textfield-quiet-texticon-border-bottom-size
);border-left-width:0;border-radius:var(
--spectrum-textfield-quiet-texticon-border-radius
);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}:host([dir=ltr][invalid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=rtl][invalid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-invalid-icon-width) + var(--spectrum-textfield-quiet-texticon-invalid-icon-margin-left))}:host([dir=ltr][valid][quiet]) .input{padding-right:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}:host([dir=rtl][valid][quiet]) .input{padding-left:calc(var(--spectrum-textfield-texticon-success-icon-width) + var(--spectrum-textfield-quiet-texticon-success-icon-margin-left))}.icon{pointer-events:all;position:absolute}:host([dir=ltr][quiet]) .icon{padding-right:0}:host([dir=rtl][quiet]) .icon{padding-left:0}:host([dir=ltr][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([dir=rtl][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-invalid-icon-margin-left)
)}:host([invalid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/2 - var(--spectrum-textfield-texticon-invalid-icon-height)/2);height:var(--spectrum-textfield-texticon-invalid-icon-height);width:var(
--spectrum-textfield-texticon-invalid-icon-width
)}:host([dir=ltr][quiet][invalid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][invalid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([dir=rtl][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,var(--spectrum-textfield-texticon-success-icon-margin-left)
)}:host([valid]) #textfield .icon{bottom:calc(var(--spectrum-textfield-texticon-height)/2 - var(--spectrum-textfield-texticon-success-icon-height)/2);height:var(--spectrum-textfield-texticon-success-icon-height);width:var(
--spectrum-textfield-texticon-success-icon-width
)}:host([dir=ltr][quiet][valid]) #textfield .icon{right:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=rtl][quiet][valid]) #textfield .icon{left:var(
--spectrum-textfield-icon-inline-end-override,0
)}:host([dir=ltr]) .icon-workflow{left:var(
--spectrum-textfield-texticon-padding-left
)}:host([dir=rtl]) .icon-workflow{right:var(
--spectrum-textfield-texticon-padding-left
)}.icon-workflow{display:block;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);position:absolute;top:calc(var(--spectrum-textfield-texticon-height)/2 - var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
)/2);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr][quiet]) .icon-workflow{left:0}:host([dir=rtl][quiet]) .icon-workflow{right:0}:host([dir=ltr][quiet]) .icon-workflow~.input{padding-left:calc(var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=rtl][quiet]) .icon-workflow~.input{padding-right:calc(var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-quiet-texticon-icon-gap))}:host([dir=ltr]) .icon-workflow+.input{padding-left:calc(var(--spectrum-textfield-texticon-padding-left) + var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-texticon-icon-gap))}:host([dir=rtl]) .icon-workflow+.input{padding-right:calc(var(--spectrum-textfield-texticon-padding-left) + var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(--spectrum-textfield-texticon-icon-gap))}:host([multiline]) .icon-workflow~.input{height:var(
--spectrum-textfield-texticon-height
);min-height:var(--spectrum-textfield-texticon-height)}#textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-hover,var(--spectrum-alias-input-border-color-hover)
);box-shadow:none}#textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}#textfield:hover .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}#textfield:active .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}#textfield:active .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}:host([valid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-valid,var(--spectrum-semantic-positive-icon-color)
)}:host([invalid]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid,var(--spectrum-semantic-negative-icon-color)
)}:host([invalid]) #textfield:hover .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-hover,var(--spectrum-alias-input-border-color-invalid-hover)
)}:host([disabled]) #textfield .icon{color:var(
--spectrum-textfield-m-texticon-validation-icon-color-invalid-disabled,var(--spectrum-alias-background-color-transparent)
)}:host([disabled]) #textfield .icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
)}.icon-workflow{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}:host([focused]) #textfield:after{box-shadow:0 0 0 var(
--spectrum-textfield-m-texticon-focus-ring-border-width,var(--spectrum-alias-component-focusring-size)
) var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)}:host([focused][quiet]) #textfield .input{box-shadow:none}:host([focused][quiet]) #textfield:after{border-bottom:2px solid var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
);bottom:calc(var(
--spectrum-alias-input-quiet-focusline-gap,
var(--spectrum-global-dimension-static-size-10)
)*-1);box-shadow:none;margin:0}.input{background-color:var(
--spectrum-textfield-m-texticon-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-textfield-m-texticon-border-color,var(--spectrum-alias-input-border-color-default)
);color:var(
--spectrum-textfield-m-texticon-text-color,var(--spectrum-alias-component-text-color-default)
)}.input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color,var(--spectrum-global-color-gray-600)
)}.input:focus,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-down,var(--spectrum-alias-input-border-color-down)
)}.input.focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}.input.focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}.input:focus-visible,:host([focused]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid]) #textfield .input{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid]) #textfield .input,:host([invalid]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}.input :disabled,:host([disabled]) #textfield .input,:host([disabled]) #textfield:hover .input{-webkit-text-fill-color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
);background-color:var(
--spectrum-textfield-m-texticon-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-textfield-m-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-disabled)
);color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}.input :disabled::placeholder,:host([disabled]) #textfield .input::placeholder,:host([disabled]) #textfield:hover .input::placeholder{color:var(
--spectrum-textfield-m-texticon-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.input:read-only,:host([readonly]) #textfield .input,:host([readonly]) #textfield:hover .input{-webkit-text-fill-color:var(--spectrum-global-color-gray-800);background-color:var(
--spectrum-alias-background-color-transparent,transparent
);border-color:var(
--spectrum-alias-background-color-transparent,transparent
);color:var(--spectrum-global-color-gray-800)}:host([quiet]) .input{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color,var(--spectrum-alias-input-border-color-default)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-mouse-focus,var(--spectrum-alias-input-border-color-mouse-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input.focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([focused][quiet]) #textfield .input,:host([quiet]) .input:focus-visible{border-color:var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-texticon-border-color-key-focus,var(--spectrum-alias-input-border-color-key-focus)
)}:host([invalid][quiet]) #textfield .input{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid,var(--spectrum-alias-input-border-color-invalid-default)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-mouse-focus,var(--spectrum-alias-input-border-color-invalid-mouse-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input.focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([focused][invalid][quiet]) #textfield .input,:host([invalid][quiet]) #textfield .input:focus-visible{border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus,var(--spectrum-alias-input-border-color-invalid-key-focus)
)}:host([disabled][quiet]) #textfield .input,:host([disabled][quiet]) #textfield:hover .input,:host([quiet]) .input :disabled{background-color:var(
--spectrum-textfield-m-quiet-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-m-quiet-texticon-border-color-disabled,var(--spectrum-alias-input-border-color-quiet-disabled)
)}@media (forced-colors:active){#textfield{--spectrum-textfield-m-quiet-texticon-border-color-disabled:GrayText;--spectrum-textfield-m-quiet-texticon-border-color-down:Highlight;--spectrum-textfield-m-quiet-texticon-border-color-hover:Highlight;--spectrum-textfield-m-quiet-texticon-border-color-invalid:Highlight;--spectrum-textfield-m-quiet-texticon-border-color-invalid-key-focus:Highlight;--spectrum-textfield-m-quiet-texticon-border-color-invalid-mouse-focus:Highlight;--spectrum-textfield-m-quiet-texticon-border-color-mouse-focus:Highlight;--spectrum-textfield-m-texticon-border-color-disabled:GrayText;--spectrum-textfield-m-texticon-border-color-down:Highlight;--spectrum-textfield-m-texticon-border-color-hover:Highlight;--spectrum-textfield-m-texticon-border-color-invalid:Highlight;--spectrum-textfield-m-texticon-border-color-invalid-hover:Highlight;--spectrum-textfield-m-texticon-border-color-invalid-key-focus:Highlight;--spectrum-textfield-m-texticon-border-color-invalid-mouse-focus:Highlight;--spectrum-textfield-m-texticon-border-color-key-focus:Highlight;--spectrum-textfield-m-texticon-placeholder-text-color:GrayText;--spectrum-textfield-m-texticon-placeholder-text-color-disabled:GrayText;--spectrum-textfield-m-texticon-placeholder-text-color-hover:GrayText;--spectrum-textfield-m-texticon-text-color-disabled:GrayText;--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus:Highlight;--spectrum-textfield-m-texticon-focus-ring-border-width:2px}:host([focused]) #textfield:after{forced-color-adjust:none}}:host{display:inline-flex;flex-direction:column;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([multiline]){resize:both}:host([multiline][readonly]){resize:none}#textfield{width:100%}#textfield,textarea{resize:inherit}.input{min-width:var(--spectrum-textfield-texticon-min-width)}:host([focused]) .input{caret-color:var(--swc-test-caret-color);forced-color-adjust:var(--swc-test-forced-color-adjust)}:host([grows]) .input{height:100%;left:0;overflow:hidden;position:absolute;resize:none;top:0}:host([grows]) #sizer{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-texticon-border-size) solid;border-radius:var(--spectrum-textfield-texticon-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-texticon-text-font-family);font-size:var(--spectrum-textfield-texticon-text-size);line-height:var(--spectrum-textfield-texticon-text-line-height);margin:0;outline:none;overflow:visible;overflow-wrap:break-word;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;white-space:pre-wrap;width:100%;word-break:break-word}:host([grows][quiet]) #sizer{border-radius:var(--spectrum-textfield-quiet-texticon-border-radius);border-width:0 0 var(--spectrum-textfield-quiet-texticon-border-size) 0;overflow-y:hidden;resize:none}.icon,.icon-workflow{pointer-events:none}:host([multiline]) #textfield{display:inline-grid}:host([multiline]) textarea{transition:box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}:host([multiline][focused]:not([quiet])) textarea,:host([multiline][focused]:not([quiet]):hover) textarea{box-shadow:0 0 0 calc(var(
--spectrum-textfield-m-texticon-focus-ring-border-width,
var(--spectrum-alias-component-focusring-size)
)) var(
--spectrum-textfield-m-textonly-focus-ring-border-color-key-focus,var(--spectrum-alias-focus-ring-color)
)!important}:host([multiline]:not([quiet])) #textfield:after{box-shadow:none}
`,E=Object.defineProperty,I=Object.getOwnPropertyDescriptor,S=(t,e,r,i)=>{for(var a,o=i>1?void 0:i?I(e,r):e,s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i?a(e,r,o):a(o))||o);return i&&o&&E(e,r,o),o};const C=["text","url","tel","email","password"];class D extends(q(r)){constructor(){super(...arguments),this.allowedKeys="",this.focused=!1,this.invalid=!1,this.label="",this.placeholder="",this._type="text",this.grows=!1,this.maxlength=-1,this.minlength=-1,this.multiline=!1,this.readonly=!1,this.valid=!1,this._value="",this.quiet=!1,this.required=!1}static get styles(){return[B,y]}get type(){var t;return null!=(t=C.find((t=>t===this._type)))?t:"text"}set type(t){const e=this._type;this._type=t,this.requestUpdate("type",e)}set value(t){if(t===this.value)return;const e=this._value;this._value=t,this.requestUpdate("value",e)}get value(){return this._value}get focusElement(){return this.inputElement}setSelectionRange(t,e,r="none"){this.inputElement.setSelectionRange(t,e,r)}select(){this.inputElement.select()}handleInput(){if(this.allowedKeys&&this.inputElement.value&&!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const t=this.inputElement.selectionStart-1;return this.inputElement.value=this.value.toString(),void this.inputElement.setSelectionRange(t,t)}this.value=this.inputElement.value}handleChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!this.readonly&&!0}onBlur(){this.focused=!this.readonly&&!1}renderStateIcons(){return this.invalid?m`
                <sp-icon-alert id="invalid" class="icon"></sp-icon-alert>
            `:this.valid?m`
                <sp-icon-checkmark100
                    id="valid"
                    class="icon spectrum-UIIcon-Checkmark100"
                ></sp-icon-checkmark100>
            `:u}get displayValue(){return this.value.toString()}get renderMultiline(){return m`
            ${this.grows&&!this.quiet?m`
                      <div id="sizer">${this.value}&#8203;</div>
                  `:u}
            <!-- @ts-ignore -->
            <textarea
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.placeholder}
                aria-invalid=${e(this.invalid||void 0)}
                class="input"
                maxlength=${e(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${e(this.minlength>-1?this.minlength:void 0)}
                pattern=${e(this.pattern)}
                placeholder=${this.placeholder}
                .value=${this.displayValue}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${e(this.autocomplete)}
            ></textarea>
        `}get renderInput(){return m`
            <!-- @ts-ignore -->
            <input
                type=${this.type}
                aria-describedby=${this.helpTextId}
                aria-label=${this.label||this.placeholder}
                aria-invalid=${e(this.invalid||void 0)}
                class="input"
                maxlength=${e(this.maxlength>-1?this.maxlength:void 0)}
                minlength=${e(this.minlength>-1?this.minlength:void 0)}
                pattern=${e(this.pattern)}
                placeholder=${this.placeholder}
                .value=${b(this.displayValue)}
                @change=${this.handleChange}
                @input=${this.handleInput}
                @focus=${this.onFocus}
                @blur=${this.onBlur}
                ?disabled=${this.disabled}
                ?required=${this.required}
                ?readonly=${this.readonly}
                autocomplete=${e(this.autocomplete)}
            />
        `}renderField(){return m`
            ${this.renderStateIcons()}
            ${this.multiline?this.renderMultiline:this.renderInput}
        `}render(){return m`
            <div id="textfield">${this.renderField()}</div>
            ${this.renderHelpText(this.invalid)}
        `}update(t){(t.has("value")||t.has("required")&&this.required)&&this.updateComplete.then((()=>{this.checkValidity()})),super.update(t)}checkValidity(){let t=this.inputElement.checkValidity();return(this.required||this.value&&this.pattern)&&((this.disabled||this.multiline)&&this.pattern&&(t=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())),void 0!==this.minlength&&(t=t&&this.value.toString().length>this.minlength),this.valid=t,this.invalid=!t),t}}S([n({attribute:"allowed-keys"})],D.prototype,"allowedKeys",2),S([n({type:Boolean,reflect:!0})],D.prototype,"focused",2),S([i(".input")],D.prototype,"inputElement",2),S([n({type:Boolean,reflect:!0})],D.prototype,"invalid",2),S([n()],D.prototype,"label",2),S([n()],D.prototype,"placeholder",2),S([n({attribute:"type",reflect:!0})],D.prototype,"_type",2),S([x()],D.prototype,"type",1),S([n()],D.prototype,"pattern",2),S([n({type:Boolean,reflect:!0})],D.prototype,"grows",2),S([n({type:Number})],D.prototype,"maxlength",2),S([n({type:Number})],D.prototype,"minlength",2),S([n({type:Boolean,reflect:!0})],D.prototype,"multiline",2),S([n({type:Boolean,reflect:!0})],D.prototype,"readonly",2),S([n({type:Boolean,reflect:!0})],D.prototype,"valid",2),S([n({type:String})],D.prototype,"value",1),S([n({type:Boolean,reflect:!0})],D.prototype,"quiet",2),S([n({type:Boolean,reflect:!0})],D.prototype,"required",2),S([n({type:String,reflect:!0})],D.prototype,"autocomplete",2);class $ extends D{constructor(){super(...arguments),this._value=""}set value(t){if(t===this.value)return;const e=this._value;this._value=t,this.requestUpdate("value",e)}get value(){return this._value}}S([n({type:String})],$.prototype,"value",1);var T=Object.defineProperty,A=Object.getOwnPropertyDescriptor,U=(t,e,r,i)=>{for(var a,o=i>1?void 0:i?A(e,r):e,s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i?a(e,r,o):a(o))||o);return i&&o&&T(e,r,o),o};class M extends(a(o(s(r,'[slot="icon"]')))){constructor(){super(),this.active=!1,this.type="button",this.proxyFocus=this.proxyFocus.bind(this),this.addEventListener("click",this.handleClickCapture,{capture:!0})}get hasIcon(){return this.slotContentIsPresent}get hasLabel(){return this.slotHasContent}get focusElement(){return this}get buttonContent(){const t=[m`
                <div id="label" ?hidden=${!this.hasLabel}>
                    <slot
                        id="slot"
                        @slotchange=${this.manageTextObservedSlot}
                    ></slot>
                </div>
            `];return this.hasIcon&&t.unshift(m`
                <slot name="icon" ?icon-only=${!this.hasLabel}></slot>
            `),t}click(){this.disabled||this.shouldProxyClick()||super.click()}handleClickCapture(t){if(this.disabled)return t.preventDefault(),t.stopImmediatePropagation(),t.stopPropagation(),!1}proxyFocus(){this.focus()}shouldProxyClick(){let t=!1;if(this.anchorElement)this.anchorElement.click(),t=!0;else if("button"!==this.type){const e=document.createElement("button");e.type=this.type,this.insertAdjacentElement("afterend",e),e.click(),e.remove(),t=!0}return t}renderAnchor(){return m`
            ${this.buttonContent}
            ${super.renderAnchor({id:"button",ariaHidden:!0,className:"button anchor hidden"})}
        `}renderButton(){return m`
            ${this.buttonContent}
        `}render(){return this.href&&this.href.length>0?this.renderAnchor():this.renderButton()}handleKeydown(t){const{code:e}=t;if("Space"===e)t.preventDefault(),void 0===this.href&&(this.addEventListener("keyup",this.handleKeyup),this.active=!0)}handleKeypress(t){const{code:e}=t;switch(e){case"Enter":case"NumpadEnter":this.click()}}handleKeyup(t){const{code:e}=t;if("Space"===e)this.removeEventListener("keyup",this.handleKeyup),this.active=!1,this.click()}handleRemoveActive(){this.active=!1}handlePointerdown(){this.active=!0}manageAnchor(){this.href&&this.href.length>0?("button"===this.getAttribute("role")&&this.setAttribute("role","link"),this.removeEventListener("click",this.shouldProxyClick)):((!this.hasAttribute("role")||"link"===this.getAttribute("role"))&&this.setAttribute("role","button"),this.addEventListener("click",this.shouldProxyClick))}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("tabindex")||(this.tabIndex=0),this.manageAnchor(),this.addEventListener("keydown",this.handleKeydown),this.addEventListener("keypress",this.handleKeypress),this.addEventListener("pointerdown",this.handlePointerdown)}updated(t){super.updated(t),t.has("href")&&this.manageAnchor(),t.has("label")&&this.setAttribute("aria-label",this.label||""),t.has("active")&&(this.active?(this.addEventListener("focusout",this.handleRemoveActive),this.addEventListener("pointerup",this.handleRemoveActive),this.addEventListener("pointercancel",this.handleRemoveActive),this.addEventListener("pointerleave",this.handleRemoveActive)):(this.removeEventListener("focusout",this.handleRemoveActive),this.removeEventListener("pointerup",this.handleRemoveActive),this.removeEventListener("pointercancel",this.handleRemoveActive),this.removeEventListener("pointerleave",this.handleRemoveActive))),this.anchorElement&&(this.anchorElement.addEventListener("focus",this.proxyFocus),this.anchorElement.tabIndex=-1)}}U([n({type:Boolean,reflect:!0})],M.prototype,"active",2),U([n({type:String})],M.prototype,"type",2),U([i(".anchor")],M.prototype,"anchorElement",2);var R=t`
:host{display:inline-flex;vertical-align:top}:host([dir]){-webkit-appearance:none}:host([disabled]){cursor:auto;pointer-events:none}#button{inset:0;position:absolute}:host:after{pointer-events:none}slot[name=icon]::slotted(img),slot[name=icon]::slotted(svg){fill:currentcolor;stroke:currentcolor;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}
`;class F extends M{static get styles(){return[R]}}var O=t`
:host{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;align-items:center;-webkit-appearance:button;border-style:solid;box-sizing:border-box;cursor:pointer;display:inline-flex;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);justify-content:center;line-height:var(
--spectrum-alias-component-text-line-height,var(--spectrum-global-font-line-height-small)
);overflow:visible;position:relative;text-decoration:none;text-transform:none;transition:background var(--spectrum-global-animation-duration-100,.13s) ease-out,border-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-out;user-select:none;-webkit-user-select:none;vertical-align:top}:host(:focus){outline:none}:host(::-moz-focus-inner){border:0;border-style:none;margin-bottom:-2px;margin-top:-2px;padding:0}:host([disabled]){cursor:default}:host{background-color:transparent;border:none;border-radius:100%;margin:0;padding:var(--spectrum-clearbutton-padding)}:host>.icon{margin:0 auto}:host([size=s]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-s-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-s-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-s-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-s-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-s-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-s-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-s-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-s-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-s-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-s-fill-size,var(--spectrum-alias-infieldbutton-full-height-s)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-s-padding,var(--spectrum-alias-infieldbutton-padding-s)
)}:host([size=m]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-m-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-m-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-m-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-m-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-m-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-m-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-m-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-m-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-m-fill-size,var(--spectrum-alias-infieldbutton-full-height-m)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-m-padding,var(--spectrum-alias-infieldbutton-padding-m)
)}:host([size=l]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-l-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-l-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-l-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-l-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-l-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-l-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-l-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-l-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-l-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-l-fill-size,var(--spectrum-alias-infieldbutton-full-height-l)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-l-padding,var(--spectrum-alias-infieldbutton-padding-l)
)}:host([size=xl]){--spectrum-clearbutton-fill-uiicon-color-disabled:var(
--spectrum-clearbutton-xl-fill-uiicon-color-disabled,var(--spectrum-alias-component-icon-color-disabled)
);--spectrum-clearbutton-fill-background-color-disabled:var(
--spectrum-clearbutton-xl-fill-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);--spectrum-clearbutton-fill-uiicon-color:var(
--spectrum-clearbutton-xl-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
);--spectrum-clearbutton-fill-background-color:var(
--spectrum-clearbutton-xl-fill-background-color,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-default
)
);--spectrum-clearbutton-fill-uiicon-color-down:var(
--spectrum-clearbutton-xl-fill-uiicon-color-down,var(--spectrum-alias-component-icon-color-down)
);--spectrum-clearbutton-fill-background-color-down:var(
--spectrum-clearbutton-xl-fill-background-color-down,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-down
)
);--spectrum-clearbutton-fill-background-color-hover:var(
--spectrum-clearbutton-xl-fill-background-color-hover,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-hover
)
);--spectrum-clearbutton-fill-uiicon-color-key-focus:var(
--spectrum-clearbutton-xl-fill-uiicon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
);--spectrum-clearbutton-fill-background-color-key-focus:var(
--spectrum-clearbutton-xl-fill-background-color-key-focus,var(
--spectrum-alias-infieldbutton-fill-loudnessLow-background-color-key-focus
)
);--spectrum-clearbutton-fill-size:var(
--spectrum-clearbutton-xl-fill-size,var(--spectrum-alias-infieldbutton-full-height-xl)
);--spectrum-clearbutton-padding:var(
--spectrum-clearbutton-xl-padding,var(--spectrum-alias-infieldbutton-padding-xl)
)}.fill{align-items:center;background-color:var(
--spectrum-clearbutton-fill-background-color
);border-radius:100%;display:flex;height:var(--spectrum-clearbutton-fill-size);justify-content:center;width:var(--spectrum-clearbutton-fill-size)}:host{color:var(
--spectrum-clearbutton-m-fill-uiicon-color,var(--spectrum-alias-component-icon-color-default)
)}:host(:hover){color:var(
--spectrum-clearbutton-fill-uiicon-color
)}:host([active]){color:var(
--spectrum-clearbutton-fill-uiicon-color-down
)}:host(.focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host(.focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host(:focus-visible){color:var(
--spectrum-clearbutton-fill-uiicon-color-key-focus
)}:host([disabled]){color:var(
--spectrum-clearbutton-fill-uiicon-color-disabled
)}:host(:hover) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-hover
)}:host([active]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-down
)}:host(.focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(.focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host(:focus-visible) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-key-focus
)}:host([disabled]) .fill{background-color:var(
--spectrum-clearbutton-fill-background-color-disabled
)}:host([variant=overBackground]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){color:var(
--spectrum-alias-icon-color-overbackground,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][disabled]),:host([variant=overBackground][disabled]) .fill{background-color:var(
--spectrum-alias-icon-color-overbackground-disabled,hsla(0,0%,100%,.2)
)}:host([variant=overBackground]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:hover){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-hover,var(--spectrum-global-color-static-transparent-white-300)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-hover,var(--spectrum-global-color-static-white)
);box-shadow:none;color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-hover,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground].focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground]:focus-visible):after{box-shadow:0 0 0 var(
--spectrum-alias-focus-ring-size,var(--spectrum-global-dimension-static-size-25)
) var(
--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][active]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-down,var(--spectrum-global-color-static-transparent-white-400)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-down,var(--spectrum-global-color-static-white)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-down,var(--spectrum-global-color-static-white)
)}:host([variant=overBackground][disabled]){background-color:var(
--spectrum-button-m-primary-outline-white-texticon-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-button-m-primary-outline-white-texticon-border-color-disabled,var(--spectrum-global-color-static-transparent-white-200)
);color:var(
--spectrum-button-m-primary-outline-white-texticon-text-color-disabled,var(--spectrum-global-color-static-transparent-white-500)
)}@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){:host>.icon{margin:0}}@media (forced-colors:active){:host{--spectrum-alias-icon-color-overbackground:ButtonText;--spectrum-alias-icon-color-overbackground-disabled:GrayText;--spectrum-button-m-primary-outline-white-texticon-background-color:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-background-color-disabled:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-background-color-down:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-background-color-hover:ButtonFace;--spectrum-button-m-primary-outline-white-texticon-border-color:ButtonText;--spectrum-button-m-primary-outline-white-texticon-border-color-disabled:GrayText;--spectrum-button-m-primary-outline-white-texticon-border-color-down:ButtonText;--spectrum-button-m-primary-outline-white-texticon-border-color-hover:ButtonText;--spectrum-button-m-primary-outline-white-texticon-border-color-key-focus:ButtonText;--spectrum-button-m-primary-outline-white-texticon-text-color:ButtonText;--spectrum-button-m-primary-outline-white-texticon-text-color-disabled:GrayText;--spectrum-button-m-primary-outline-white-texticon-text-color-down:Highlight;--spectrum-button-m-primary-outline-white-texticon-text-color-hover:Highlight;--spectrum-clearbutton-fill-background-color:ButtonFace;--spectrum-clearbutton-fill-background-color-disabled:ButtonFace;--spectrum-clearbutton-fill-background-color-down:ButtonFace;--spectrum-clearbutton-fill-background-color-hover:ButtonFace;--spectrum-clearbutton-fill-background-color-key-focus:ButtonFace;--spectrum-clearbutton-fill-uiicon-color:ButtonText;--spectrum-clearbutton-fill-uiicon-color-disabled:GrayText;--spectrum-clearbutton-fill-uiicon-color-down:Highlight;--spectrum-clearbutton-fill-uiicon-color-key-focus:Highlight;--spectrum-clearbutton-m-fill-uiicon-color:ButtonText}:host(:hover){color:var(--spectrum-clearbutton-fill-uiicon-color-key-focus)}:host([disabled]){color:var(--spectrum-clearbutton-fill-uiicon-color-disabled)}}
`;var P=t`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Cross75{height:var(--spectrum-alias-ui-icon-cross-size-75);width:var(
--spectrum-alias-ui-icon-cross-size-75
)}.spectrum-UIIcon-Cross100{height:var(--spectrum-alias-ui-icon-cross-size-100);width:var(
--spectrum-alias-ui-icon-cross-size-100
)}.spectrum-UIIcon-Cross200{height:var(--spectrum-alias-ui-icon-cross-size-200);width:var(
--spectrum-alias-ui-icon-cross-size-200
)}.spectrum-UIIcon-Cross300{height:var(--spectrum-alias-ui-icon-cross-size-300);width:var(
--spectrum-alias-ui-icon-cross-size-300
)}.spectrum-UIIcon-Cross400{height:var(--spectrum-alias-ui-icon-cross-size-400);width:var(
--spectrum-alias-ui-icon-cross-size-400
)}.spectrum-UIIcon-Cross500{height:var(--spectrum-alias-ui-icon-cross-size-500);width:var(
--spectrum-alias-ui-icon-cross-size-500
)}.spectrum-UIIcon-Cross600{height:var(--spectrum-alias-ui-icon-cross-size-600);width:var(
--spectrum-alias-ui-icon-cross-size-600
)}
`,N=Object.defineProperty,_=Object.getOwnPropertyDescriptor;const K={s:()=>m`
        <sp-icon-cross75
            slot="icon"
            class="icon spectrum-UIIcon-Cross75"
        ></sp-icon-cross75>
    `,m:()=>m`
        <sp-icon-cross100
            slot="icon"
            class="icon spectrum-UIIcon-Cross100"
        ></sp-icon-cross100>
    `,l:()=>m`
        <sp-icon-cross200
            slot="icon"
            class="icon spectrum-UIIcon-Cross200"
        ></sp-icon-cross200>
    `,xl:()=>m`
        <sp-icon-cross300
            slot="icon"
            class="icon spectrum-UIIcon-Cross300"
        ></sp-icon-cross300>
    `};class G extends(l(F)){constructor(){super(...arguments),this.variant=""}static get styles(){return[...super.styles,O,P]}get buttonContent(){return[K[this.size]()]}render(){return m`
            <div class="fill">${super.render()}</div>
        `}}((t,e,r,i)=>{for(var a,o=i>1?void 0:i?_(e,r):e,s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i?a(e,r,o):a(o))||o);i&&o&&N(e,r,o)})([n({reflect:!0})],G.prototype,"variant",2),customElements.define("sp-clear-button",G);var V=t`
:host{--spectrum-search-quiet-button-offset:calc(var(
--spectrum-actionbutton-m-texticon-min-width,
var(--spectrum-global-dimension-size-400)
)/2 - var(--spectrum-alias-ui-icon-cross-size-100)/2)}#textfield{display:inline-block;position:relative}:host([dir=ltr]) #button{right:0}:host([dir=rtl]) #button{left:0}#button{position:absolute;top:0}.input{-webkit-appearance:none;border-radius:var(
--spectrum-alias-search-border-radius,var(--spectrum-global-dimension-size-50)
);outline-offset:-2px}.input::-webkit-search-cancel-button,.input::-webkit-search-decoration{-webkit-appearance:none}#textfield:after{border-radius:var(
--spectrum-alias-search-border-radius,var(--spectrum-global-dimension-size-50)
)}:host([dir=ltr]:not([quiet])) #textfield .icon{left:var(
--spectrum-alias-search-padding-left-m
)}:host([dir=rtl]:not([quiet])) #textfield .icon{right:var(
--spectrum-alias-search-padding-left-m
)}:host([dir=ltr]:not([quiet])) #textfield .input{padding-left:calc(var(--spectrum-alias-search-padding-left-m) + var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(
--spectrum-textfield-m-texticon-icon-gap,
var(--spectrum-global-dimension-size-100)
) - var(
--spectrum-textfield-m-texticon-border-size,
var(--spectrum-alias-input-border-size)
))}:host([dir=rtl]:not([quiet])) #textfield .input{padding-right:calc(var(--spectrum-alias-search-padding-left-m) + var(
--spectrum-alias-workflow-icon-size-m,
var(--spectrum-global-dimension-size-225)
) + var(
--spectrum-textfield-m-texticon-icon-gap,
var(--spectrum-global-dimension-size-100)
) - var(
--spectrum-textfield-m-texticon-border-size,
var(--spectrum-alias-input-border-size)
))}:host([quiet]) #button{transform:translateX(var(--spectrum-search-quiet-button-offset))}:host([quiet]) .input{border-radius:var(
--spectrum-alias-search-border-radius-quiet,0
)}:host([quiet]) #textfield:after{border-radius:var(
--spectrum-alias-search-border-radius-quiet,0
)}.icon{color:var(
--spectrum-textfield-m-texticon-icon-color,var(--spectrum-alias-component-icon-color-default)
)}.input:hover~.icon{color:var(
--spectrum-search-m-icon-color-hover,var(--spectrum-alias-component-icon-color-hover)
)}.input:active~.icon{color:var(
--spectrum-search-m-icon-color-down,var(--spectrum-alias-component-icon-color-down)
)}.input.focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}.input.focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}.input:focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-alias-component-icon-color-key-focus)
)}.input:disabled~.icon{color:var(
--spectrum-textfield-m-texticon-text-color-disabled,var(--spectrum-alias-component-text-color-disabled)
)}:host([dir=ltr]){--spectrum-textfield-texticon-padding-right:var(
--spectrum-alias-infieldbutton-full-height-m
)}:host([dir=rtl]){--spectrum-textfield-texticon-padding-left:var(
--spectrum-alias-infieldbutton-full-height-m
)}input::-webkit-search-cancel-button{display:none}
`,Y=Object.defineProperty,J=Object.getOwnPropertyDescriptor,Q=(t,e,r,i)=>{for(var a,o=i>1?void 0:i?J(e,r):e,s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i?a(e,r,o):a(o))||o);return i&&o&&Y(e,r,o),o};const W=t=>t.stopPropagation();class Z extends ${constructor(){super(...arguments),this.action="",this.label="Search",this.placeholder="Search"}static get styles(){return[...super.styles,V]}handleSubmit(t){this.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))||t.preventDefault()}handleKeydown(t){const{code:e}=t;!this.value||"Escape"!==e||this.reset()}async reset(){this.value="",await this.updateComplete,this.focusElement.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.focusElement.dispatchEvent(new InputEvent("change",{bubbles:!0}))}renderField(){return m`
            <form
                action=${this.action}
                id="form"
                method=${e(this.method)}
                @submit=${this.handleSubmit}
                @reset=${this.reset}
                @keydown=${this.handleKeydown}
            >
                <sp-icon-magnify
                    class="icon magnifier icon-workflow"
                ></sp-icon-magnify>
                ${super.renderField()}
                ${this.value?m`
                          <sp-clear-button
                              id="button"
                              label="Reset"
                              tabindex="-1"
                              type="reset"
                              @keydown=${W}
                          ></sp-clear-button>
                      `:m``}
            </form>
        `}firstUpdated(t){super.firstUpdated(t),this.inputElement.setAttribute("type","search")}willUpdate(){this.multiline=!1}}Q([n()],Z.prototype,"action",2),Q([n()],Z.prototype,"label",2),Q([n()],Z.prototype,"method",2),Q([n()],Z.prototype,"placeholder",2),Q([i("#form")],Z.prototype,"form",2),customElements.define("sp-search",Z);var tt=t`
@media (forced-colors:active){.spectrum-Icon,.spectrum-UIIcon{forced-color-adjust:auto}}.spectrum-UIIcon-Asterisk75{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-75,var(--spectrum-global-dimension-static-size-100)
)}.spectrum-UIIcon-Asterisk100{height:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
);width:var(
--spectrum-alias-ui-icon-asterisk-size-100,var(--spectrum-global-dimension-size-100)
)}.spectrum-UIIcon-Asterisk200{height:var(--spectrum-alias-ui-icon-asterisk-size-200);width:var(
--spectrum-alias-ui-icon-asterisk-size-200
)}.spectrum-UIIcon-Asterisk300{height:var(--spectrum-alias-ui-icon-asterisk-size-300);width:var(
--spectrum-alias-ui-icon-asterisk-size-300
)}
`;const et=Symbol("element resolver updated");class rt{constructor(t,{selector:e}={selector:""}){this._element=null,this._selector="",this.mutationCallback=t=>{let e=!1;t.forEach((t=>{if(!e){if("childList"===t.type){const r=this.element&&[...t.removedNodes].includes(this.element),i=!!this.selector&&[...t.addedNodes].some((t=>{var e;return null==(e=null==t?void 0:t.matches)?void 0:e.call(t,this.selector)}));e=e||r||i}if("attributes"===t.type){const r=t.target===this.element,i=!!this.selector&&t.target.matches(this.selector);e=e||r||i}}})),e&&this.resolveElement()},this.host=t,this.selector=e,this.observer=new MutationObserver(this.mutationCallback),this.host.addController(this)}get element(){return this._element}set element(t){if(t===this.element)return;const e=this.element;this._element=t,this.host.requestUpdate(et,e)}get selector(){return this._selector}set selector(t){t!==this.selector&&(this.releaseElement(),this._selector=t,this.resolveElement())}hostConnected(){this.resolveElement(),this.observer.observe(this.host.getRootNode(),{subtree:!0,childList:!0,attributes:!0})}hostDisconnected(){this.releaseElement(),this.observer.disconnect()}resolveElement(){if(!this.selector)return void this.releaseElement();const t=this.host.getRootNode();this.element=t.querySelector(this.selector)}releaseElement(){this.element=null}}var it=t`
:host([size=s]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-field-label-top-to-asterisk-small
);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-100);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-small
)}:host([size=m]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-75
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-75);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-200);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-200);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-field-label-top-to-asterisk-medium
);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-75
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-medium
)}:host([size=l]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-100
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-100);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-100);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-100);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-field-label-top-to-asterisk-large
);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-100
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-large
)}:host([size=xl]){--spectrum-fieldlabel-top-to-text:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-bottom-to-text:var(
--spectrum-component-bottom-to-text-200
);--spectrum-fieldlabel-font-size:var(--spectrum-font-size-200);--spectrum-fieldlabel-line-height:var(--spectrum-line-height-200);--spectrum-fieldlabel-line-height-cjk:var(--spectrum-line-height-cjk-200);--spectrum-fieldlabel-asterisk-gap:var(
--spectrum-field-label-top-to-asterisk-extra-large
);--spectrum-fieldlabel-side-padding-top:var(
--spectrum-component-top-to-text-200
);--spectrum-fieldlabel-side-padding-right:var(--spectrum-spacing-200);--spectrum-field-label-text-to-asterisk:var(
--spectrum-field-label-text-to-asterisk-extra-large
)}:host{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;font-smoothing:subpixel-antialiased;box-sizing:border-box;display:block;font-size:var(
--mod-fieldlabel-font-size,var(--spectrum-fieldlabel-font-size)
);font-weight:var(
--mod-font-weight-regular,var(--spectrum-font-weight-regular)
);line-height:var(
--mod-fieldlabel-line-height,var(--spectrum-fieldlabel-line-height)
);padding-block:var(--spectrum-fieldlabel-top-to-text) var(--spectrum-fieldlabel-bottom-to-text);padding-inline:0;vertical-align:top}:host(:lang(ja)),:host(:lang(ko)),:host(:lang(zh)){line-height:var(
--mod-fieldlabel-line-height-cjk,var(--spectrum-fieldlabel-line-height-cjk)
)}.required-icon{margin-block:0;margin-inline:var(
--mod-fieldlabel-asterisk-gap,var(--spectrum-fieldlabel-asterisk-gap)
) 0}:host([side-aligned=start]){display:inline-block;padding-block:var(
--mod-fieldlabel-side-padding-top,var(--spectrum-fieldlabel-side-padding-top)
) 0;padding-inline:0 var(
--mod-fieldlabel-side-padding-right,var(--spectrum-fieldlabel-side-padding-right)
)}:host([side-aligned=start]) .required-icon{margin-block:var(
--mod-field-label-text-to-asterisk,var(--spectrum-field-label-text-to-asterisk)
) 0;margin-inline:var(
--mod-fieldlabel-asterisk-gap,var(--spectrum-fieldlabel-asterisk-gap)
) 0}:host([side-aligned=end]){display:inline-block;padding-block:var(
--mod-fieldlabel-side-padding-top,var(--spectrum-fieldlabel-side-padding-top)
) 0;padding-inline:0 var(
--mod-fieldlabel-side-padding-right,var(--spectrum-fieldlabel-side-padding-right)
);text-align:end}:host([disabled]){color:var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)}:host([disabled]) .required-icon{color:var(
--mod-disabled-content-color,var(--spectrum-disabled-content-color)
)}
`,at=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,st=(t,e,r,i)=>{for(var a,o=i>1?void 0:i?ot(e,r):e,s=t.length-1;s>=0;s--)(a=t[s])&&(o=(i?a(e,r,o):a(o))||o);return i&&o&&at(e,r,o),o};const lt=class extends(l(p)){constructor(){super(...arguments),this.disabled=!1,this.id="",this.for="",this.required=!1,this.resolvedElement=new rt(this)}static get styles(){return[it,tt]}handleClick(t){if(!this.target||this.disabled||t.defaultPrevented)return;this.target.focus();const e=this.getRootNode(),r=this.target,i=r.getRootNode(),a=i.host;i===e&&r.forceFocusVisible?r.forceFocusVisible():a&&a.forceFocusVisible&&a.forceFocusVisible()}addTarget(t){this.target=t.focusElement||t,this.target.getRootNode()===this.getRootNode()?L(this.target,"aria-labelledby",[this.id]):this.target.setAttribute("aria-label",this.labelText)}removeTarget(){this.target&&(this.target.getRootNode()===this.getRootNode()?X(this.target,"aria-labelledby",[this.id]):this.target.removeAttribute("aria-label"))}async manageTarget(){this.removeTarget();const t=this.resolvedElement.element;t?(t.localName.search("-")>0&&await customElements.whenDefined(t.localName),void 0!==t.updateComplete&&await t.updateComplete,this.addTarget(t)):this.target=t}get labelText(){const t=this.slotEl.assignedNodes({flatten:!0});return t.length?t.map((t=>(t.textContent||"").trim())).join(" "):""}render(){return m`
            <label>
                <slot></slot>
                ${this.required?m`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `:m``}
            </label>
        `}firstUpdated(t){super.firstUpdated(t),this.addEventListener("click",this.handleClick)}willUpdate(t){this.hasAttribute("id")||this.setAttribute("id",`${this.tagName.toLowerCase()}-${lt.instanceCount++}`),t.has("for")&&(this.resolvedElement.selector=this.for?`#${this.for}`:""),(t.has("id")||t.has(et))&&this.manageTarget()}};let nt=lt;nt.instanceCount=0,st([n({type:Boolean,reflect:!0})],nt.prototype,"disabled",2),st([n({type:String})],nt.prototype,"id",2),st([n({type:String})],nt.prototype,"for",2),st([n({type:Boolean,reflect:!0})],nt.prototype,"required",2),st([i("slot")],nt.prototype,"slotEl",2),st([n({type:String,reflect:!0,attribute:"side-aligned"})],nt.prototype,"sideAligned",2),customElements.define("sp-field-label",nt);export{M as B,P as I,q as M,F as S,D as T,z as a,w as b,L as c,$ as d,k as e,x as t,y as u};
//# sourceMappingURL=38f52280.js.map
