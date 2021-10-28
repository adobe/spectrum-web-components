import{d as e,E as t,N as r,C as a,P as i,A as s,S as n,h as o,_ as l,p as c,M as m,f as p,e as u,u as d,n as g,i as h,q as v,D as x,t as f,I as b,s as y,v as z}from"./876e37af.js";import{c as w}from"./2cc2acb0.js";const k=e((e=>n=>{let o;if(n instanceof t||n instanceof r)throw new Error("The `live` directive is not allowed on text or event bindings");if(n instanceof a)L(n.strings),o=n.element.hasAttribute(n.name),n.value=o;else{const{element:t,name:r,strings:a}=n.committer;if(L(a),n instanceof i){if(o=t[r],o===e)return}else n instanceof s&&(o=t.getAttribute(r));if(o===String(e))return}n.setValue(e)})),L=e=>{if(2!==e.length||""!==e[0]||""!==e[1])throw new Error("`live` bindings can only contain a single expression")},X=e=>e.getRootNode().activeElement;var H=w`.spectrum{color:var(--spectrum-body-m-text-color,var(--spectrum-alias-text-color));font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);font-size:var(
--spectrum-alias-font-size-default,var(--spectrum-global-dimension-font-size-100)
)}`;var S=w`.spectrum:lang(ar){font-family:var(
--spectrum-alias-font-family-ar,myriad-arabic,adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif
)}.spectrum:lang(he){font-family:var(
--spectrum-alias-font-family-he,myriad-hebrew,adobe-clean,"Source Sans Pro",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Ubuntu,"Trebuchet MS","Lucida Grande",sans-serif
)}.spectrum:lang(zh-Hans){font-family:var(
--spectrum-alias-font-family-zhhans,adobe-clean-han-simplified-c,source-han-simplified-c,"SimSun","Heiti SC Light","sans-serif"
)}.spectrum:lang(zh),.spectrum:lang(zh-Hant){font-family:var(
--spectrum-alias-font-family-zh,adobe-clean-han-traditional,source-han-traditional,"MingLiu","Heiti TC Light","sans-serif"
)}.spectrum:lang(ko){font-family:var(
--spectrum-alias-font-family-ko,adobe-clean-han-korean,source-han-korean,"Malgun Gothic","Apple Gothic","sans-serif"
)}.spectrum:lang(ja){font-family:var(
--spectrum-alias-font-family-ja,adobe-clean-han-japanese,source-han-japanese,"Yu Gothic","\30E1 \30A4 \30EA \30AA","\30D2 \30E9 \30AE \30CE \89D2 \30B4  Pro W3","Hiragino Kaku Gothic Pro W3","Osaka","\FF2D \FF33 \FF30 \30B4 \30B7 \30C3 \30AF","MS PGothic","sans-serif"
)}.spectrum:lang(ja) .spectrum-Heading--sizeXXXL,.spectrum:lang(ko) .spectrum-Heading--sizeXXXL,.spectrum:lang(zh) .spectrum-Heading--sizeXXXL{font-size:var(
--spectrum-heading-han-xxxl-text-size,var(--spectrum-alias-heading-xxxl-text-size)
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
--spectrum-heading-han-s-text-size,var(--spectrum-alias-heading-s-text-size)
);font-style:var(
--spectrum-heading-han-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-s-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-s-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-s-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeXS,.spectrum:lang(ko) .spectrum-Heading--sizeXS,.spectrum:lang(zh) .spectrum-Heading--sizeXS{font-size:var(
--spectrum-heading-han-xs-text-size,var(--spectrum-alias-heading-xs-text-size)
);font-style:var(
--spectrum-heading-han-xs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-xs-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-han-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-heading-han-xs-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-han-xs-text-transform,none)}.spectrum:lang(ja) .spectrum-Heading--sizeXXS,.spectrum:lang(ko) .spectrum-Heading--sizeXXS,.spectrum:lang(zh) .spectrum-Heading--sizeXXS{font-size:var(
--spectrum-heading-han-xxs-text-size,var(--spectrum-alias-heading-xxs-text-size)
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
)}.spectrum:lang(ja) .spectrum-Heading--heavy .spectrum-Heading--emphasis,.spectrum:lang(ja) .spectrum-Heading--heavy em,.spectrum:lang(ko) .spectrum-Heading--heavy .spectrum-Heading--emphasis,.spectrum:lang(ko) .spectrum-Heading--heavy em,.spectrum:lang(zh) .spectrum-Heading--heavy .spectrum-Heading--emphasis,.spectrum:lang(zh) .spectrum-Heading--heavy em{font-style:var(
--spectrum-heading-han-heavy-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-heavy-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-heavy-emphasis)
)}.spectrum:lang(ja) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(ja) .spectrum-Heading--heavy strong,.spectrum:lang(ko) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(ko) .spectrum-Heading--heavy strong,.spectrum:lang(zh) .spectrum-Heading--heavy .spectrum-Heading--strong,.spectrum:lang(zh) .spectrum-Heading--heavy strong{font-style:var(
--spectrum-heading-heavy-m-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-heavy-m-strong-text-font-weight,var(--spectrum-global-font-weight-black)
)}.spectrum:lang(ja) .spectrum-Heading--light,.spectrum:lang(ko) .spectrum-Heading--light,.spectrum:lang(zh) .spectrum-Heading--light{font-weight:var(
--spectrum-heading-han-m-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular)
)}.spectrum:lang(ja) .spectrum-Heading--light .spectrum-Heading--emphasis,.spectrum:lang(ja) .spectrum-Heading--light em,.spectrum:lang(ko) .spectrum-Heading--light .spectrum-Heading--emphasis,.spectrum:lang(ko) .spectrum-Heading--light em,.spectrum:lang(zh) .spectrum-Heading--light .spectrum-Heading--emphasis,.spectrum:lang(zh) .spectrum-Heading--light em{font-style:var(
--spectrum-heading-han-light-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-light-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-emphasis)
)}.spectrum:lang(ja) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(ja) .spectrum-Heading--light strong,.spectrum:lang(ko) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(ko) .spectrum-Heading--light strong,.spectrum:lang(zh) .spectrum-Heading--light .spectrum-Heading--strong,.spectrum:lang(zh) .spectrum-Heading--light strong{font-style:var(
--spectrum-heading-han-light-m-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-han-light-m-strong-text-font-weight,var(--spectrum-global-font-weight-bold)
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
--spectrum-body-han-s-text-size,var(--spectrum-alias-font-size-default)
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
--spectrum-detail-han-xl-text-font-weight,var(--spectrum-alias-detail-text-font-weight)
);letter-spacing:var(
--spectrum-detail-han-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-xl-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-xl-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeXL em,.spectrum:lang(ko) .spectrum-Detail--sizeXL em,.spectrum:lang(zh) .spectrum-Detail--sizeXL em{font-size:var(
--spectrum-detail-han-xl-emphasis-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-han-xl-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-xl-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-xl-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-xl-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-xl-emphasis-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeXL strong,.spectrum:lang(ko) .spectrum-Detail--sizeXL strong,.spectrum:lang(zh) .spectrum-Detail--sizeXL strong{font-size:var(
--spectrum-detail-han-xl-strong-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-detail-han-xl-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-xl-strong-text-font-weight,var(--spectrum-global-font-weight-black)
);letter-spacing:var(
--spectrum-detail-han-xl-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-xl-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-xl-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeL,.spectrum:lang(ko) .spectrum-Detail--sizeL,.spectrum:lang(zh) .spectrum-Detail--sizeL{font-size:var(
--spectrum-detail-han-l-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-han-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-l-text-font-weight,var(--spectrum-alias-detail-text-font-weight)
);letter-spacing:var(
--spectrum-detail-han-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-l-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-l-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeL em,.spectrum:lang(ko) .spectrum-Detail--sizeL em,.spectrum:lang(zh) .spectrum-Detail--sizeL em{font-size:var(
--spectrum-detail-han-l-emphasis-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-han-l-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-l-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-l-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-l-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-l-emphasis-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeL strong,.spectrum:lang(ko) .spectrum-Detail--sizeL strong,.spectrum:lang(zh) .spectrum-Detail--sizeL strong{font-size:var(
--spectrum-detail-han-l-strong-text-size,var(--spectrum-global-dimension-font-size-100)
);font-style:var(
--spectrum-detail-han-l-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-l-strong-text-font-weight,var(--spectrum-global-font-weight-black)
);letter-spacing:var(
--spectrum-detail-han-l-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-l-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-l-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeM,.spectrum:lang(ko) .spectrum-Detail--sizeM,.spectrum:lang(zh) .spectrum-Detail--sizeM{font-size:var(
--spectrum-detail-han-m-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-han-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-text-font-weight,var(--spectrum-alias-detail-text-font-weight)
);letter-spacing:var(
--spectrum-detail-han-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-m-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-m-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeM em,.spectrum:lang(ko) .spectrum-Detail--sizeM em,.spectrum:lang(zh) .spectrum-Detail--sizeM em{font-size:var(
--spectrum-detail-han-m-emphasis-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-han-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-m-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-m-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-m-emphasis-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeM strong,.spectrum:lang(ko) .spectrum-Detail--sizeM strong,.spectrum:lang(zh) .spectrum-Detail--sizeM strong{font-size:var(
--spectrum-detail-han-m-strong-text-size,var(--spectrum-global-dimension-font-size-75)
);font-style:var(
--spectrum-detail-han-m-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-m-strong-text-font-weight,var(--spectrum-global-font-weight-black)
);letter-spacing:var(
--spectrum-detail-han-m-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-m-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-m-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeS,.spectrum:lang(ko) .spectrum-Detail--sizeS,.spectrum:lang(zh) .spectrum-Detail--sizeS{font-size:var(
--spectrum-detail-han-s-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-han-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-s-text-font-weight,var(--spectrum-alias-detail-text-font-weight)
);letter-spacing:var(
--spectrum-detail-han-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-s-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-detail-han-s-text-transform,uppercase)}.spectrum:lang(ja) .spectrum-Detail--sizeS em,.spectrum:lang(ko) .spectrum-Detail--sizeS em,.spectrum:lang(zh) .spectrum-Detail--sizeS em{font-size:var(
--spectrum-detail-han-s-emphasis-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-han-s-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-s-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-regular-emphasis)
);letter-spacing:var(
--spectrum-detail-han-s-emphasis-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-s-emphasis-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-s-emphasis-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--sizeS strong,.spectrum:lang(ko) .spectrum-Detail--sizeS strong,.spectrum:lang(zh) .spectrum-Detail--sizeS strong{font-size:var(
--spectrum-detail-han-s-strong-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:var(
--spectrum-detail-han-s-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-s-strong-text-font-weight,var(--spectrum-global-font-weight-black)
);letter-spacing:var(
--spectrum-detail-han-s-strong-text-letter-spacing,var(--spectrum-global-font-letter-spacing-han)
);line-height:var(
--spectrum-detail-han-s-strong-text-line-height,var(--spectrum-alias-han-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(
--spectrum-detail-han-s-strong-text-transform,uppercase
)}.spectrum:lang(ja) .spectrum-Detail--light,.spectrum:lang(ko) .spectrum-Detail--light,.spectrum:lang(zh) .spectrum-Detail--light{font-weight:var(
--spectrum-detail-han-m-text-font-weight,var(--spectrum-alias-detail-text-font-weight)
)}.spectrum:lang(ja) .spectrum-Detail--light .spectrum-Detail--emphasis,.spectrum:lang(ja) .spectrum-Detail--light em,.spectrum:lang(ko) .spectrum-Detail--light .spectrum-Detail--emphasis,.spectrum:lang(ko) .spectrum-Detail--light em,.spectrum:lang(zh) .spectrum-Detail--light .spectrum-Detail--emphasis,.spectrum:lang(zh) .spectrum-Detail--light em{font-style:var(
--spectrum-detail-han-light-m-emphasis-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-light-m-emphasis-text-font-weight,var(--spectrum-alias-han-heading-text-font-weight-light-emphasis)
)}.spectrum:lang(ja) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(ja) .spectrum-Detail--light strong,.spectrum:lang(ko) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(ko) .spectrum-Detail--light strong,.spectrum:lang(zh) .spectrum-Detail--light .spectrum-Detail--strong,.spectrum:lang(zh) .spectrum-Detail--light strong{font-style:var(
--spectrum-detail-han-light-m-strong-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-detail-han-light-m-strong-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
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
--spectrum-code-han-s-text-size,var(--spectrum-alias-font-size-default)
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
--spectrum-heading-light-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--light{color:var(
--spectrum-heading-light-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXL--light,.spectrum:lang(ko) .spectrum-Heading-sizeXL--light,.spectrum:lang(zh) .spectrum-Heading-sizeXL--light{color:var(
--spectrum-heading-light-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeL--light,.spectrum:lang(ko) .spectrum-Heading-sizeL--light,.spectrum:lang(zh) .spectrum-Heading-sizeL--light{color:var(
--spectrum-heading-light-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXXXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXXXL--heavy{color:var(
--spectrum-heading-heavy-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXXL--heavy{color:var(
--spectrum-heading-heavy-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeXL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeXL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeXL--heavy{color:var(
--spectrum-heading-heavy-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum:lang(ja) .spectrum-Heading-sizeL--heavy,.spectrum:lang(ko) .spectrum-Heading-sizeL--heavy,.spectrum:lang(zh) .spectrum-Heading-sizeL--heavy{color:var(
--spectrum-heading-heavy-l-text-color,var(--spectrum-alias-heading-text-color)
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
)}`;var q=[H,S,w`.spectrum-Heading--sizeXXXL{font-size:var(
--spectrum-heading-xxxl-text-size,var(--spectrum-alias-heading-xxxl-text-size)
);font-style:var(
--spectrum-heading-xxxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-xxxl-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-xxxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-xxxl-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-xxxl-text-transform,none)}.spectrum-Heading--sizeXXL{font-size:var(
--spectrum-heading-xxl-text-size,var(--spectrum-alias-heading-xxl-text-size)
);font-style:var(
--spectrum-heading-xxl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-xxl-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-xxl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-xxl-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-xxl-text-transform,none)}.spectrum-Heading--sizeXL{font-size:var(
--spectrum-heading-xl-text-size,var(--spectrum-alias-heading-xl-text-size)
);font-style:var(
--spectrum-heading-xl-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-xl-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-xl-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-xl-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-xl-text-transform,none)}.spectrum-Heading--sizeL{font-size:var(
--spectrum-heading-l-text-size,var(--spectrum-alias-heading-l-text-size)
);font-style:var(
--spectrum-heading-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-l-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-l-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-l-text-transform,none)}.spectrum-Heading--sizeM{font-size:var(
--spectrum-heading-m-text-size,var(--spectrum-alias-heading-m-text-size)
);font-style:var(
--spectrum-heading-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-m-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-m-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-m-text-transform,none)}.spectrum-Heading--sizeS{font-size:var(
--spectrum-heading-s-text-size,var(--spectrum-alias-heading-s-text-size)
);font-style:var(
--spectrum-heading-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-s-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-s-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-s-text-transform,none)}.spectrum-Heading--sizeXS{font-size:var(
--spectrum-heading-xs-text-size,var(--spectrum-alias-heading-xs-text-size)
);font-style:var(
--spectrum-heading-xs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-xs-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-xs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-xs-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-xs-text-transform,none)}.spectrum-Heading--sizeXXS{font-size:var(
--spectrum-heading-xxs-text-size,var(--spectrum-alias-heading-xxs-text-size)
);font-style:var(
--spectrum-heading-xxs-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-heading-xxs-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
);letter-spacing:var(
--spectrum-heading-xxs-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-heading-xxs-text-line-height,var(--spectrum-alias-heading-text-line-height)
);margin-bottom:0;margin-top:0;text-transform:var(--spectrum-heading-xxs-text-transform,none)}.spectrum-Heading{font-family:var(
--spectrum-heading-m-text-font-family,var(--spectrum-alias-body-text-font-family)
);font-weight:var(
--spectrum-heading-m-text-font-weight,var(--spectrum-alias-heading-text-font-weight-regular)
)}.spectrum-Heading .spectrum-Heading-emphasis,.spectrum-Heading em{font-style:var(
--spectrum-heading-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic)
)}.spectrum-Heading .spectrum-Heading-strong,.spectrum-Heading strong{font-weight:var(
--spectrum-heading-m-strong-text-font-weight,var(--spectrum-global-font-weight-black)
)}.spectrum-Heading--serif{font-family:var(
--spectrum-body-serif-m-text-font-family,var(--spectrum-alias-serif-text-font-family)
)}.spectrum-Heading--heavy{font-weight:var(
--spectrum-heading-heavy-m-text-font-weight,var(--spectrum-global-font-weight-black)
)}.spectrum-Heading--heavy .spectrum-Heading-emphasis,.spectrum-Heading--heavy em{font-style:var(
--spectrum-heading-heavy-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic)
)}.spectrum-Heading--heavy .spectrum-Heading-strong,.spectrum-Heading--heavy strong{font-weight:var(
--spectrum-heading-heavy-m-strong-text-font-weight,var(--spectrum-global-font-weight-black)
)}.spectrum-Heading--light{font-weight:var(
--spectrum-heading-light-m-emphasis-text-font-weight,var(--spectrum-global-font-weight-light)
)}.spectrum-Heading--light .spectrum-Heading-emphasis,.spectrum-Heading--light em{font-style:var(
--spectrum-heading-light-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic)
)}.spectrum-Heading--light .spectrum-Heading-strong,.spectrum-Heading--light strong{font-weight:var(
--spectrum-heading-light-m-strong-text-font-weight,var(--spectrum-global-font-weight-bold)
)}.spectrum-Heading--sizeXXXL{color:var(
--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeXXL{color:var(
--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeXL{color:var(
--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeL{color:var(
--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeM{color:var(
--spectrum-heading-m-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeS{color:var(
--spectrum-heading-s-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeXS{color:var(
--spectrum-heading-xs-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading--sizeXXS{color:var(
--spectrum-heading-xxs-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXXXL--light{color:var(
--spectrum-heading-light-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXXL--light{color:var(
--spectrum-heading-light-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXL--light{color:var(
--spectrum-heading-light-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeL--light{color:var(
--spectrum-heading-light-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXXXL--heavy{color:var(
--spectrum-heading-heavy-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXXL--heavy{color:var(
--spectrum-heading-heavy-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXL--heavy{color:var(
--spectrum-heading-heavy-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeL--heavy{color:var(
--spectrum-heading-heavy-l-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXXXL--heading{color:var(
--spectrum-heading-xxxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXXL--heading{color:var(
--spectrum-heading-xxl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeXL--heading{color:var(
--spectrum-heading-xl-text-color,var(--spectrum-alias-heading-text-color)
)}.spectrum-Heading-sizeL--heading{color:var(
--spectrum-heading-l-text-color,var(--spectrum-alias-heading-text-color)
)}`];var B=w`:host{opacity:0;pointer-events:none;transition:transform var(--spectrum-global-animation-duration-100,.13s) ease-in-out,opacity var(--spectrum-global-animation-duration-100,.13s) ease-in-out,visibility 0s linear var(--spectrum-global-animation-duration-100,.13s);visibility:hidden}:host([open]){opacity:1;pointer-events:auto;transition-delay:0s;visibility:visible}:host{--spectrum-dialog-confirm-background-entry-animation-delay:0ms;--spectrum-dialog-confirm-background-exit-animation-ease:cubic-bezier(0.5,0,1,1);--spectrum-dialog-confirm-background-entry-animation-ease:cubic-bezier(0,0,0.4,1)}:host{bottom:0;left:0;overflow:hidden;position:fixed;right:0;top:0;transition:opacity var(
--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)
) var(
--spectrum-dialog-confirm-background-exit-animation-ease,var(--spectrum-global-animation-linear)
) var(
--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)
),visibility 0s linear calc(var(--spectrum-dialog-confirm-background-exit-animation-delay,var(--spectrum-global-animation-duration-200)) + var(--spectrum-dialog-confirm-background-exit-animation-duration,var(--spectrum-global-animation-duration-300)));z-index:1}:host([open]){transition:opacity var(
--spectrum-dialog-confirm-background-entry-animation-duration,var(--spectrum-global-animation-duration-600)
) var(
--spectrum-dialog-confirm-background-entry-animation-ease,var(--spectrum-global-animation-linear)
) var(--spectrum-dialog-confirm-background-entry-animation-delay,0ms)}:host{background:var(
--spectrum-dialog-confirm-overlay-background-color,var(--spectrum-alias-background-color-modal-overlay)
)}`;class j extends n{constructor(){super(...arguments),this.open=!1}static get styles(){return[B]}render(){return o``}}l([c({type:Boolean,reflect:!0})],j.prototype,"open",void 0),customElements.define("sp-underlay",j);var D=w`:host{--spectrum-illustrated-message-description-max-width:500px;--spectrum-illustrated-message-heading-max-width:500px;--spectrum-illustrated-message-illustration-margin-bottom:24px;--spectrum-illustrated-message-heading-margin:0;--spectrum-illustrated-message-description-margin:4px 0 0 0}:host{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;text-align:center}#illustration{margin-bottom:var(
--spectrum-illustrated-message-illustration-margin-bottom
)}#heading{margin:var(--spectrum-illustrated-message-heading-margin);max-width:var(
--spectrum-illustrated-message-heading-max-width
)}#description{font-style:italic;margin:var(--spectrum-illustrated-message-description-margin);max-width:var(
--spectrum-illustrated-message-description-max-width
)}:host([cta]) #description{font-style:normal}#illustration{fill:currentColor;stroke:currentColor;color:var(
--spectrum-global-color-gray-500
)}::slotted(svg[viewBox]){width:100%}`;var E=[H,S,w`.spectrum-Body--sizeXXXL{font-size:var(
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
);text-transform:var(--spectrum-body-xl-text-transform,none)}.spectrum-Body--sizeL,.spectrum-Body--sizeXL{margin-bottom:0;margin-top:0}.spectrum-Body--sizeL{font-size:var(
--spectrum-body-l-text-size,var(--spectrum-global-dimension-font-size-300)
);font-style:var(
--spectrum-body-l-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-l-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-l-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-l-text-line-height,var(--spectrum-alias-body-text-line-height)
);text-transform:var(--spectrum-body-l-text-transform,none)}.spectrum-Body--sizeM{font-size:var(
--spectrum-body-m-text-size,var(--spectrum-global-dimension-font-size-200)
);font-style:var(
--spectrum-body-m-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-m-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-m-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-m-text-line-height,var(--spectrum-alias-body-text-line-height)
);text-transform:var(--spectrum-body-m-text-transform,none)}.spectrum-Body--sizeM,.spectrum-Body--sizeS{margin-bottom:0;margin-top:0}.spectrum-Body--sizeS{font-size:var(
--spectrum-body-s-text-size,var(--spectrum-alias-font-size-default)
);font-style:var(
--spectrum-body-s-text-font-style,var(--spectrum-global-font-style-regular)
);font-weight:var(
--spectrum-body-s-text-font-weight,var(--spectrum-alias-body-text-font-weight)
);letter-spacing:var(
--spectrum-body-s-text-letter-spacing,var(--spectrum-global-font-letter-spacing-none)
);line-height:var(
--spectrum-body-s-text-line-height,var(--spectrum-alias-body-text-line-height)
);text-transform:var(--spectrum-body-s-text-transform,none)}.spectrum-Body--sizeXS{font-size:var(
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
)}.spectrum-Body .spectrum-Body-emphasis,.spectrum-Body em{font-style:var(
--spectrum-body-m-emphasis-text-font-style,var(--spectrum-global-font-style-italic)
)}.spectrum-Body--serif{font-family:var(
--spectrum-body-serif-m-text-font-family,var(--spectrum-alias-serif-text-font-family)
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
)}`];class $ extends n{constructor(){super(...arguments),this.heading="",this.description=""}static get styles(){return[q,E,D]}render(){return o`<div id="illustration"><slot></slot></div><h2 id="heading" class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"><slot name="heading">${this.heading}</slot></h2><div id="description" class="spectrum-Body spectrum-Body--sizeS"><slot name="description">${this.description}</slot></div>`}}$.is="sp-illustrated-message",l([c()],$.prototype,"heading",void 0),l([c()],$.prototype,"description",void 0),customElements.define("sp-illustrated-message",$);var C=w`.header{color:var(--spectrum-listheading-text-color);display:block;font-size:var(--spectrum-listitem-heading-text-size);font-weight:var(--spectrum-listitem-heading-text-font-weight);letter-spacing:var(
--spectrum-listitem-heading-letter-spacing
);line-height:var(--spectrum-listitem-heading-line-height);margin:var(--spectrum-listitem-heading-margin);padding:var(--spectrum-listitem-heading-padding);text-transform:var(--spectrum-listitem-heading-text-transform)}:host{display:inline;margin:0;overflow:visible}:host([dir=ltr]) .header{padding:0 var(--spectrum-global-dimension-size-450) 0 var(--spectrum-global-dimension-size-150)}:host([dir=rtl]) .header{padding:0 var(--spectrum-global-dimension-size-150) 0 var(--spectrum-global-dimension-size-450)}sp-menu{display:block}`;class M extends m{constructor(){super(),M.instances+=1,this.headerId=`sp-menu-group-label-${M.instances}`}static get styles(){return[...super.styles,C]}get ownRole(){switch(this.selects){case"multiple":case"single":case"inherit":return"group";default:return"menu"}}updateLabel(){const e=this.headerElements.length?this.headerElements[0]:void 0;if(e!==this.headerElement)if(this.headerElement&&this.headerElement.id===this.headerId&&this.headerElement.removeAttribute("id"),e){const t=e.id||this.headerId;e.id||(e.id=t),this.setAttribute("aria-labelledby",t)}else this.removeAttribute("aria-labelledby");this.headerElement=e}render(){return o`<span class="header" aria-hidden="true"><slot name="header" @slotchange="${this.updateLabel}"></slot></span><sp-menu role="none"><slot></slot></sp-menu>`}}M.instances=0,l([p("header",!0)],M.prototype,"headerElements",void 0),customElements.define("sp-menu-group",M);var I=w`:host{--spectrum-textfield-border-size:var(
--spectrum-textfield-m-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-textfield-text-line-height:var(
--spectrum-textfield-m-text-line-height,var(--spectrum-alias-component-text-line-height)
);--spectrum-textfield-text-size:var(
--spectrum-textfield-m-text-size,var(--spectrum-alias-item-text-size-m)
);--spectrum-textfield-height:var(
--spectrum-textfield-m-height,var(--spectrum-alias-item-height-m)
);--spectrum-textfield-padding-left:var(
--spectrum-textfield-m-padding-left,var(--spectrum-alias-item-padding-m)
);--spectrum-textfield-padding-right:var(
--spectrum-textfield-m-padding-right,var(--spectrum-alias-item-padding-m)
);--spectrum-textfield-min-width:var(
--spectrum-textfield-m-min-width,var(--spectrum-global-dimension-size-600)
);--spectrum-textfield-success-icon-height:var(
--spectrum-textfield-m-success-icon-height,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-success-icon-width:var(
--spectrum-textfield-m-success-icon-width,var(--spectrum-alias-ui-icon-checkmark-size-100)
);--spectrum-textfield-success-icon-margin-left:var(
--spectrum-textfield-m-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-error-icon-height:var(
--spectrum-textfield-m-error-icon-height,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-error-icon-width:var(
--spectrum-textfield-m-error-icon-width,var(--spectrum-alias-ui-icon-alert-size-100)
);--spectrum-textfield-error-icon-margin-left:var(
--spectrum-textfield-m-error-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-placeholder-text-font-style:var(
--spectrum-textfield-m-placeholder-text-font-style,var(--spectrum-global-font-style-italic)
);--spectrum-textfield-placeholder-text-font-weight:var(
--spectrum-textfield-m-placeholder-text-font-weight,var(--spectrum-global-font-weight-regular)
);--spectrum-textfield-border-radius:var(
--spectrum-textfield-m-border-radius,var(--spectrum-alias-border-radius-regular)
);--spectrum-textfield-quiet-border-size:var(
--spectrum-textfield-quiet-m-border-size,var(--spectrum-alias-border-size-thin)
);--spectrum-textfield-quiet-padding-left:var(
--spectrum-textfield-quiet-m-padding-left,0
);--spectrum-textfield-quiet-padding-right:var(
--spectrum-textfield-quiet-m-padding-right,0
);--spectrum-textfield-quiet-success-icon-margin-left:var(
--spectrum-textfield-quiet-m-success-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-error-icon-margin-left:var(
--spectrum-textfield-quiet-m-error-icon-margin-left,var(--spectrum-global-dimension-size-150)
);--spectrum-textfield-quiet-border-radius:var(
--spectrum-textfield-quiet-m-border-radius,0px
);--spectrum-textarea-text-padding-top:var(
--spectrum-textarea-m-text-padding-top,var(--spectrum-alias-item-text-padding-top-m)
);--spectrum-textarea-text-padding-bottom:var(
--spectrum-textarea-m-text-padding-bottom,var(--spectrum-alias-item-text-padding-bottom-m)
);--spectrum-textarea-height:var(
--spectrum-textarea-m-height,var(--spectrum-alias-item-height-m)
);--spectrum-textarea-padding-left:var(
--spectrum-textarea-m-padding-left,var(--spectrum-alias-item-padding-m)
);--spectrum-textarea-padding-right:var(
--spectrum-textarea-m-padding-right,var(--spectrum-alias-item-padding-m)
);--spectrum-textfield-padding-top:3px;--spectrum-textfield-padding-bottom:5px;--spectrum-textfield-text-font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);--spectrum-textfield-icon-gap:var(--spectrum-global-dimension-size-65);--spectrum-textfield-quiet-icon-gap:var(
--spectrum-global-dimension-size-75
);--spectrum-textarea-min-height:var(--spectrum-textarea-height);--spectrum-textarea-height-adjusted:auto;--spectrum-textarea-padding-top:var(--spectrum-textarea-text-padding-top);--spectrum-textarea-padding-bottom:var(
--spectrum-textarea-text-padding-bottom
)}:host{display:inline-flex;min-width:var(--spectrum-textfield-min-width);position:relative;width:var(
--spectrum-alias-single-line-width,var(--spectrum-global-dimension-size-2400)
)}:host([quiet][multiline]) .input{height:var(
--spectrum-textfield-height
);min-height:var(--spectrum-textfield-height)}.input{-webkit-appearance:none;-moz-appearance:textfield;border:var(--spectrum-textfield-border-size) solid;border-radius:var(--spectrum-textfield-border-radius);box-sizing:border-box;font-family:var(--spectrum-textfield-text-font-family);font-size:var(--spectrum-textfield-text-size);height:var(--spectrum-textfield-height);line-height:var(--spectrum-textfield-text-line-height);margin:0;outline:0;overflow:visible;padding:var(--spectrum-textfield-padding-top) var(--spectrum-textfield-padding-right) var(--spectrum-textfield-padding-bottom) calc(var(--spectrum-textfield-padding-left) - 1px);text-indent:0;text-overflow:ellipsis;transition:border-color var(--spectrum-global-animation-duration-100,.13s) ease-in-out,box-shadow var(--spectrum-global-animation-duration-100,.13s) ease-in-out;vertical-align:top;width:100%}.input::placeholder{font-style:var(--spectrum-textfield-placeholder-text-font-style);font-weight:var(
--spectrum-textfield-placeholder-text-font-weight
);opacity:1;transition:color var(--spectrum-global-animation-duration-100,.13s) ease-in-out}.input:lang(ja)::placeholder,.input:lang(ko)::placeholder,.input:lang(zh)::placeholder{font-style:normal}.input:hover::placeholder{font-weight:var(
--spectrum-textfield-placeholder-text-font-weight
)}.input:disabled{opacity:1;resize:none}.input:disabled::placeholder{font-weight:var(
--spectrum-textfield-placeholder-text-font-weight
)}.input::-ms-clear{height:0;width:0}.input::-webkit-inner-spin-button,.input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.input:-moz-ui-invalid{box-shadow:none}:host([dir=ltr][valid]) .input{padding-right:calc(var(--spectrum-textfield-padding-right) + var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-textfield-success-icon-margin-left))}:host([dir=rtl][valid]) .input{padding-left:calc(var(--spectrum-textfield-padding-right) + var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-textfield-success-icon-margin-left))}:host([dir=ltr][invalid]) .input{padding-right:calc(var(--spectrum-textfield-padding-right) + var(--spectrum-icon-alert-medium-width,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-error-icon-margin-left))}:host([dir=rtl][invalid]) .input{padding-left:calc(var(--spectrum-textfield-padding-right) + var(--spectrum-icon-alert-medium-width,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-error-icon-margin-left))}:host([multiline]) .input{height:var(
--spectrum-textarea-height-adjusted
);min-height:var(--spectrum-textarea-min-height);overflow:auto;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px)}:host([dir=ltr][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-padding-left
)}:host([dir=rtl][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-padding-left
)}:host([dir=ltr][quiet]) .input{padding-right:var(
--spectrum-textfield-quiet-padding-right
)}:host([dir=rtl][quiet]) .input{padding-left:var(
--spectrum-textfield-quiet-padding-right
)}:host([quiet]) .input{border-bottom-width:var(--spectrum-textfield-quiet-border-size);border-left-width:0;border-radius:var(
--spectrum-textfield-quiet-border-radius
);border-right-width:0;border-top-width:0;overflow-y:hidden;resize:none}:host([dir=ltr][invalid][quiet]) .input{padding-right:calc(var(--spectrum-icon-alert-medium-width,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-error-icon-margin-left))}:host([dir=rtl][invalid][quiet]) .input{padding-left:calc(var(--spectrum-icon-alert-medium-width,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-error-icon-margin-left))}:host([dir=ltr][valid][quiet]) .input{padding-right:calc(var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-textfield-quiet-success-icon-margin-left))}:host([dir=rtl][valid][quiet]) .input{padding-left:calc(var(--spectrum-icon-checkmark-medium-width) + var(--spectrum-textfield-quiet-success-icon-margin-left))}.icon{pointer-events:all;position:absolute}:host([dir=ltr][quiet]) .icon{padding-right:0}:host([dir=rtl][quiet]) .icon{padding-left:0}:host([dir=ltr][invalid]) .icon{right:var(
--spectrum-textfield-error-icon-margin-left
)}:host([dir=rtl][invalid]) .icon{left:var(
--spectrum-textfield-error-icon-margin-left
)}:host([invalid]) .icon{bottom:calc(var(--spectrum-textfield-height)/ 2 - var(--spectrum-textfield-error-icon-height)/ 2);height:var(--spectrum-textfield-error-icon-height);width:var(
--spectrum-textfield-error-icon-width
)}:host([dir=ltr][quiet][invalid]) .icon{right:0}:host([dir=rtl][quiet][invalid]) .icon{left:0}:host([dir=ltr][valid]) .icon{right:var(
--spectrum-textfield-success-icon-margin-left
)}:host([dir=rtl][valid]) .icon{left:var(
--spectrum-textfield-success-icon-margin-left
)}:host([valid]) .icon{bottom:calc(var(--spectrum-textfield-height)/ 2 - var(--spectrum-textfield-success-icon-height)/ 2);height:var(--spectrum-textfield-success-icon-height);width:var(
--spectrum-textfield-success-icon-width
)}:host([dir=ltr][quiet][valid]) .icon{right:0}:host([dir=rtl][quiet][valid]) .icon{left:0}:host([dir=ltr]) .icon-workflow{left:var(
--spectrum-textfield-error-icon-margin-left
)}:host([dir=rtl]) .icon-workflow{right:var(
--spectrum-textfield-error-icon-margin-left
)}.icon-workflow{display:block;height:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
);position:absolute;top:calc(var(--spectrum-textfield-height)/ 2 - var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225))/ 2);width:var(
--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)
)}:host([dir=ltr][quiet]) .icon-workflow{left:0}:host([dir=rtl][quiet]) .icon-workflow{right:0}:host([dir=ltr][quiet]) .icon-workflow~.input{padding-left:calc(var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-icon-gap))}:host([dir=rtl][quiet]) .icon-workflow~.input{padding-right:calc(var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-quiet-icon-gap))}:host([dir=ltr]) .icon-workflow+.input{padding-left:calc(var(--spectrum-textfield-error-icon-margin-left) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-icon-gap))}:host([dir=rtl]) .icon-workflow+.input{padding-right:calc(var(--spectrum-textfield-error-icon-margin-left) + var(--spectrum-alias-workflow-icon-size-m,var(--spectrum-global-dimension-size-225)) + var(--spectrum-textfield-icon-gap))}:host([multiline]) .icon-workflow~.input{height:var(
--spectrum-textfield-height
);min-height:var(--spectrum-textfield-height)}:host{--spectrum-textfield-m-validation-icon-color-valid:var(
--spectrum-semantic-positive-color-icon,var(--spectrum-global-color-green-600)
)}:host(:hover) .input{border-color:var(
--spectrum-textfield-m-border-color-hover,var(--spectrum-alias-border-color-hover)
);box-shadow:none}:host(:hover) .input::placeholder{color:var(
--spectrum-textfield-m-placeholder-text-color-hover,var(--spectrum-alias-placeholder-text-color-hover)
)}:host(:hover) .icon-workflow{color:var(
--spectrum-textfield-m-icon-color-hover,var(--spectrum-global-color-gray-900)
)}:host(:active) .input{border-color:var(
--spectrum-textfield-m-border-color-down,var(--spectrum-alias-border-color-mouse-focus)
)}:host(:active) .icon-workflow{color:var(
--spectrum-textfield-m-icon-color-down,var(--spectrum-alias-icon-color-down)
)}:host([valid]) .icon{color:var(
--spectrum-textfield-m-validation-icon-color-valid,var(--spectrum-global-color-green-400)
)}:host([invalid]) .icon{color:var(
--spectrum-textfield-m-validation-icon-color-error,var(--spectrum-semantic-negative-color-icon)
)}:host([invalid]:hover) .input{border-color:var(
--spectrum-textfield-m-border-color-error-hover,var(--spectrum-semantic-negative-color-state-hover)
)}:host([disabled]) .icon{color:var(
--spectrum-textfield-m-validation-icon-color-disabled,var(--spectrum-global-color-gray-500)
)}:host([disabled]) .icon-workflow{color:var(
--spectrum-textfield-m-icon-color-disabled,var(--spectrum-global-color-gray-500)
)}.icon-workflow{color:var(
--spectrum-textfield-m-icon-color,var(--spectrum-alias-icon-color)
)}.input{background-color:var(
--spectrum-textfield-m-background-color,var(--spectrum-global-color-gray-50)
);border-color:var(
--spectrum-textfield-m-border-color,var(--spectrum-alias-border-color)
);color:var(
--spectrum-textfield-m-text-color,var(--spectrum-alias-text-color)
)}.input::placeholder{color:var(
--spectrum-textfield-m-placeholder-text-color,var(--spectrum-global-color-gray-600)
)}.input:focus,:host([focused]) .input{border-color:var(
--spectrum-textfield-m-border-color-down,var(--spectrum-alias-border-color-mouse-focus)
)}.input.focus-visible,:host([focused]) .input{border-color:var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 0 0 1px var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
)}.input:focus-visible,:host([focused]) .input{border-color:var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 0 0 1px var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
)}:host([invalid]) .input{border-color:var(
--spectrum-textfield-m-border-color-error,var(--spectrum-semantic-negative-color-default)
)}:host([focused][invalid]) .input,:host([invalid]) .input.focus-visible{border-color:var(
--spectrum-textfield-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 0 0 1px var(
--spectrum-textfield-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
)}:host([focused][invalid]) .input,:host([invalid]) .input:focus-visible{border-color:var(
--spectrum-textfield-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 0 0 1px var(
--spectrum-textfield-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
)}.input :disabled,:host([disabled]) .input,:host([disabled]:hover) .input{-webkit-text-fill-color:var(
--spectrum-textfield-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);background-color:var(
--spectrum-textfield-m-background-color-disabled,var(--spectrum-global-color-gray-200)
);border-color:var(
--spectrum-textfield-m-border-color-disabled,var(--spectrum-alias-border-color-transparent)
);color:var(
--spectrum-textfield-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}.input :disabled::placeholder,:host([disabled]) .input::placeholder,:host([disabled]:hover) .input::placeholder{color:var(
--spectrum-textfield-m-placeholder-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}:host([quiet]) .input{background-color:var(
--spectrum-textfield-quiet-m-background-color,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-quiet-m-border-color,var(--spectrum-alias-border-color)
)}:host([focused][quiet]) .input,:host([quiet]) .input:focus{border-color:var(
--spectrum-textfield-quiet-m-border-color-mouse-focus,var(--spectrum-alias-border-color-mouse-focus)
)}:host([focused][quiet]) .input,:host([quiet]) .input.focus-visible{border-color:var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
)}:host([focused][quiet]) .input,:host([quiet]) .input:focus-visible{border-color:var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-m-border-color-key-focus,var(--spectrum-alias-border-color-focus)
)}:host([invalid][quiet]) .input{border-color:var(
--spectrum-textfield-quiet-m-border-color-error,var(--spectrum-semantic-negative-color-default)
)}:host([focused][invalid][quiet]) .input,:host([invalid][quiet]) .input:focus{border-color:var(
--spectrum-textfield-quiet-m-border-color-error-mouse-focus,var(--spectrum-semantic-negative-color-state-hover)
)}:host([focused][invalid][quiet]) .input,:host([invalid][quiet]) .input.focus-visible{border-color:var(
--spectrum-textfield-quiet-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-quiet-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
)}:host([focused][invalid][quiet]) .input,:host([invalid][quiet]) .input:focus-visible{border-color:var(
--spectrum-textfield-quiet-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
);box-shadow:0 1px 0 var(
--spectrum-textfield-quiet-m-border-color-error-key-focus,var(--spectrum-alias-border-color-focus)
)}:host([disabled][quiet]) .input,:host([disabled][quiet]:hover) .input,:host([quiet]) .input :disabled{background-color:var(
--spectrum-textfield-quiet-m-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);border-color:var(
--spectrum-textfield-quiet-m-border-color-disabled,var(--spectrum-alias-border-color-mid)
)}:host([multiline]){resize:both}textarea{resize:inherit}:host([grows]) .input{height:100%;left:0;position:absolute;resize:none;top:0}:host([grows]) #sizer{border:var(
--spectrum-textfield-border-size,var(--spectrum-alias-border-size-thin)
) solid;border-radius:var(
--spectrum-textfield-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;font-family:var(
--spectrum-alias-body-text-font-family,var(--spectrum-global-font-family-base)
);font-size:var(
--spectrum-textfield-text-size,var(--spectrum-alias-font-size-default)
);line-height:var(
--spectrum-textfield-text-line-height,var(--spectrum-alias-body-text-line-height)
);margin:0;overflow-wrap:break-word;padding:var(--spectrum-textarea-padding-top) var(--spectrum-textarea-padding-right) var(--spectrum-textarea-padding-bottom) calc(var(--spectrum-textarea-padding-left) - 1px);text-indent:0;vertical-align:top;width:100%}:host([grows][quiet]) #sizer{border-left-width:0;border-right-width:0;padding-left:var(--spectrum-textfield-quiet-padding-x,0);padding-right:var(--spectrum-textfield-quiet-padding-x,0)}.icon,.icon-workflow{pointer-events:none}`;const N=["text","url","tel","email","password"];class T extends u{constructor(){super(...arguments),this.allowedKeys="",this.focused=!1,this.invalid=!1,this.label="",this.placeholder="",this._type="text",this.grows=!1,this.maxlength=-1,this.minlength=-1,this.multiline=!1,this.readonly=!1,this.valid=!1,this._value="",this.quiet=!1,this.required=!1}static get styles(){return[I,d]}get type(){var e;return null!==(e=N.find((e=>e===this._type)))&&void 0!==e?e:"text"}set type(e){const t=this._type;this._type=e,this.requestUpdate("type",t)}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}get focusElement(){return this.inputElement}onInput(){if(this.allowedKeys&&this.inputElement.value){if(!new RegExp(`^[${this.allowedKeys}]*$`,"u").test(this.inputElement.value)){const e=this.inputElement.selectionStart-1;return this.inputElement.value=this.value.toString(),void this.inputElement.setSelectionRange(e,e)}}this.value=this.inputElement.value;const e=this.inputElement.selectionStart;this.updateComplete.then((()=>{this.inputElement.setSelectionRange(e,e)}))}onChange(){this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}onFocus(){this.focused=!0}onBlur(){this.focused=!1}renderStateIcons(){return this.invalid?o`<sp-icon-alert id="invalid" class="icon"></sp-icon-alert>`:this.valid?o`<sp-icon-checkmark100 id="valid" class="icon spectrum-UIIcon-Checkmark100"></sp-icon-checkmark100>`:g}get displayValue(){return this.value.toString()}select(){this.inputElement.select()}get renderMultiline(){return o`${this.grows&&!this.quiet?o`<div id="sizer">${this.value}</div>`:g} <textarea aria-label="${this.label||this.placeholder}" aria-invalid="${h(this.invalid||void 0)}" class="input" maxlength="${h(this.maxlength>-1?this.maxlength:void 0)}" minlength="${h(this.minlength>-1?this.minlength:void 0)}" pattern="${h(this.pattern)}" placeholder="${this.placeholder}" .value="${this.displayValue}" @change="${this.onChange}" @input="${this.onInput}" @focus="${this.onFocus}" @blur="${this.onBlur}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" autocomplete="${h(this.autocomplete)}"></textarea>`}get renderInput(){return o`<input type="${this.type}" aria-label="${this.label||this.placeholder}" aria-invalid="${h(this.invalid||void 0)}" class="input" maxlength="${h(this.maxlength>-1?this.maxlength:void 0)}" minlength="${h(this.minlength>-1?this.minlength:void 0)}" pattern="${h(this.pattern)}" placeholder="${this.placeholder}" .value="${k(this.displayValue)}" @change="${this.onChange}" @input="${this.onInput}" @focus="${this.onFocus}" @blur="${this.onBlur}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" autocomplete="${h(this.autocomplete)}">`}render(){return o`${this.renderStateIcons()} ${this.multiline?this.renderMultiline:this.renderInput}`}updated(e){(e.has("value")||e.has("required")&&this.required)&&this.checkValidity()}checkValidity(){let e=this.inputElement.checkValidity();if(this.required||this.value&&this.pattern){if((this.disabled||this.multiline)&&this.pattern){e=new RegExp(`^${this.pattern}$`,"u").test(this.value.toString())}void 0!==this.minlength&&(e=e&&this.value.toString().length>this.minlength),this.valid=e,this.invalid=!e}return e}}l([c({attribute:"allowed-keys"})],T.prototype,"allowedKeys",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"focused",void 0),l([v(".input")],T.prototype,"inputElement",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"invalid",void 0),l([c()],T.prototype,"label",void 0),l([c()],T.prototype,"placeholder",void 0),l([c({attribute:"type",reflect:!0})],T.prototype,"_type",void 0),l([x()],T.prototype,"type",null),l([c()],T.prototype,"pattern",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"grows",void 0),l([c({type:Number})],T.prototype,"maxlength",void 0),l([c({type:Number})],T.prototype,"minlength",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"multiline",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"readonly",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"valid",void 0),l([c({type:String})],T.prototype,"value",null),l([c({type:Boolean,reflect:!0})],T.prototype,"quiet",void 0),l([c({type:Boolean,reflect:!0})],T.prototype,"required",void 0),l([c({type:String,reflect:!0})],T.prototype,"autocomplete",void 0);class A extends T{constructor(){super(...arguments),this._value=""}set value(e){if(e===this.value)return;const t=this._value;this._value=e,this.requestUpdate("value",t)}get value(){return this._value}}l([c({type:String})],A.prototype,"value",null);customElements.define("sp-icon-magnify",class extends b{render(){return y(o),(({width:e=24,height:t=24,hidden:r=!1,title:a="Magnify"}={})=>f`<svg xmlns="http://www.w3.org/2000/svg" height="${t}" viewBox="0 0 36 36" width="${e}" aria-hidden="${r?"true":"false"}" role="img" fill="currentColor" aria-label="${a}"><path d="M33.173 30.215L25.4 22.443a12.826 12.826 0 10-2.957 2.957l7.772 7.772a2.1 2.1 0 002.958-2.958zM6 15a9 9 0 119 9 9 9 0 01-9-9z"/></svg>`)({hidden:!this.label,title:this.label})}});var _=w`:host{--spectrum-search-quiet-button-offset:calc(var(
--spectrum-actionbutton-m-min-width,
var(--spectrum-global-dimension-size-400)
)/2 - var(
--spectrum-icon-cross-small-width,
var(--spectrum-global-dimension-size-100)
)/2)}:host{display:inline-block;position:relative}:host([dir=ltr]) #button{right:0}:host([dir=rtl]) #button{left:0}#button{position:absolute;top:0}#input{-webkit-appearance:none;outline-offset:-2px}#input::-webkit-search-cancel-button,#input::-webkit-search-decoration{-webkit-appearance:none}.spectrum-Search--quiet #button{transform:translateX(var(--spectrum-search-quiet-button-offset))}.icon{color:var(
--spectrum-textfield-m-icon-color,var(--spectrum-alias-icon-color)
)}#input:hover~.icon{color:var(
--spectrum-search-m-icon-color-hover,var(--spectrum-global-color-gray-900)
)}#input:active~.icon{color:var(
--spectrum-search-m-icon-color-down,var(--spectrum-alias-icon-color-down)
)}#input.focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}#input:focus-visible~.icon{color:var(
--spectrum-search-m-icon-color-key-focus,var(--spectrum-global-color-gray-900)
)}#input:disabled~.icon{color:var(
--spectrum-textfield-m-text-color-disabled,var(--spectrum-alias-text-color-disabled)
)}input::-webkit-search-cancel-button{display:none}`;const F=e=>e.stopPropagation();class K extends A{constructor(){super(...arguments),this.action="",this.label="Search",this.placeholder="Search"}static get styles(){return[...super.styles,_]}handleSubmit(e){this.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))||e.preventDefault()}handleKeydown(e){const{code:t}=e;this.value&&"Escape"===t&&this.reset()}async reset(){this.value="",await this.updateComplete,this.focusElement.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.focusElement.dispatchEvent(new InputEvent("change",{bubbles:!0}))}render(){return o`<form action="${this.action}" id="form" method="${h(this.method)}" @submit="${this.handleSubmit}" @reset="${this.reset}" @keydown="${this.handleKeydown}"><sp-icon-magnify class="icon magnifier icon-workflow"></sp-icon-magnify>${super.render()} ${this.value?o`<sp-clear-button id="button" label="Reset" tabindex="-1" type="reset" @keydown="${F}"></sp-clear-button>`:o``}</form>`}firstUpdated(e){super.firstUpdated(e),this.inputElement.setAttribute("type","search")}updated(e){super.updated(e),this.multiline=!1}}l([c()],K.prototype,"action",void 0),l([c()],K.prototype,"label",void 0),l([c()],K.prototype,"method",void 0),l([c()],K.prototype,"placeholder",void 0),l([v("#form")],K.prototype,"form",void 0),customElements.define("sp-search",K);var U=w`:host{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
)}:host{list-style-type:none;margin:0;padding:0}:host{--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,var(--spectrum-global-font-weight-regular)
);display:block;width:240px}:host([variant=multilevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-multilevel-main-item-font-weight,var(--spectrum-global-font-weight-bold)
)}`;var R=w`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host{list-style-type:none;margin-bottom:var(
--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)
);margin-left:0;margin-right:0;margin-top:var(
--spectrum-sidenav-item-gap,var(--spectrum-global-dimension-size-50)
)}#itemLink{align-items:center;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);box-sizing:border-box;cursor:pointer;display:inline-flex;font-size:var(
--spectrum-sidenav-item-text-size,var(--spectrum-alias-font-size-default)
);font-style:normal;font-weight:var(
--spectrum-sidenav-item-text-font-weight,var(--spectrum-global-font-weight-regular)
);-webkit-hyphens:auto;hyphens:auto;justify-content:left;min-height:var(
--spectrum-sidenav-item-height,var(--spectrum-alias-single-line-height)
);padding:var(--spectrum-sidenav-item-padding-y) var(
--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)
);position:relative;text-decoration:none;transition:background-color var(--spectrum-global-animation-duration-100,.13s) ease-out,color var(--spectrum-global-animation-duration-100,.13s) ease-out;width:100%;word-break:break-word}#itemLink:focus{outline:0}:host([dir=ltr]) #itemLink.focus-visible:before{left:0}:host([dir=ltr]) #itemLink:focus-visible:before{left:0}:host([dir=rtl]) #itemLink.focus-visible:before{right:0}:host([dir=rtl]) #itemLink:focus-visible:before{right:0}:host([dir=ltr]) #itemLink.focus-visible:before{right:0}:host([dir=ltr]) #itemLink:focus-visible:before{right:0}:host([dir=rtl]) #itemLink.focus-visible:before{left:0}:host([dir=rtl]) #itemLink:focus-visible:before{left:0}#itemLink.focus-visible:before{border-bottom:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);border-top:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;bottom:0;content:"";position:absolute;top:0}#itemLink:focus-visible:before{border-bottom:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;border-radius:var(
--spectrum-sidenav-item-border-radius,var(--spectrum-alias-border-radius-regular)
);border-top:var(
--spectrum-tabs-m-focus-ring-size,var(--spectrum-alias-border-size-thick)
) solid transparent;bottom:0;content:"";position:absolute;top:0}:host([dir=ltr]) #itemLink ::slotted([slot=icon]){margin-right:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) #itemLink ::slotted([slot=icon]){margin-left:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}#itemLink ::slotted([slot=icon]){flex-shrink:0}:host([dir=ltr]) .spectrum-SideNav-heading{margin-right:0}:host([dir=rtl]) .spectrum-SideNav-heading{margin-left:0}:host([dir=ltr]) .spectrum-SideNav-heading{margin-left:0}:host([dir=rtl]) .spectrum-SideNav-heading{margin-right:0}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #list #itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #list #itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([selected])>#itemLink{background-color:var(
--spectrum-sidenav-item-background-color-selected,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-selected,var(--spectrum-alias-text-color-hover)
)}.is-active>#itemLink{background-color:var(
--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover)
)}:host([disabled]) #itemLink{background-color:var(
--spectrum-sidenav-item-background-color-disabled,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-sidenav-item-text-color-disabled,var(--spectrum-alias-text-color-disabled)
);cursor:default;pointer-events:none}#itemLink{background-color:var(
--spectrum-sidenav-item-background-color,var(--spectrum-alias-background-color-transparent)
);color:var(
--spectrum-sidenav-item-text-color,var(--spectrum-alias-text-color)
)}#itemLink:hover{background-color:var(
--spectrum-sidenav-item-background-color-hover,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-hover,var(--spectrum-alias-text-color-hover)
)}#itemLink:active{background-color:var(
--spectrum-sidenav-item-background-color-down,var(--spectrum-alias-highlight-hover)
)}#itemLink.focus-visible{background-color:var(
--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}#itemLink:focus-visible{background-color:var(
--spectrum-sidenav-item-background-color-key-focus,var(--spectrum-alias-highlight-hover)
);color:var(
--spectrum-sidenav-item-text-color-key-focus,var(--spectrum-alias-text-color-hover)
)}#itemLink.focus-visible:before{border-color:var(
--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-focus)
)}#itemLink:focus-visible:before{border-color:var(
--spectrum-sidenav-item-border-color-key-focus,var(--spectrum-alias-border-color-focus)
)}:host{display:block}:host([disabled]){pointer-events:none}:host([multiLevel]){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,700
)}::slotted(sp-sidenav-item:not([multiLevel])){--spectrum-web-component-sidenav-font-weight:var(
--spectrum-sidenav-item-font-weight,400
)}#itemLink{font-weight:var(--spectrum-web-component-sidenav-font-weight);justify-content:start}:host([dir=ltr]) #itemLink[data-level="1"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) #itemLink[data-level="2"]{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #itemLink[data-level="1"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level1,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) #itemLink[data-level="2"]{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation-level2,var(--spectrum-global-dimension-size-300)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}a ::slotted(sp-sidenav-item){display:none}`;class P extends(z(u)){constructor(){super(...arguments),this.value=void 0,this.manageTabIndex=!1,this.selected=!1,this.expanded=!1}static get styles(){return[R]}get parentSideNav(){return this._parentSidenav||(this._parentSidenav=this.closest("sp-sidenav")),this._parentSidenav}get hasChildren(){return!!this.querySelector("sp-sidenav-item")}get depth(){let e=0,t=this.parentElement;for(;t instanceof P;)e++,t=t.parentElement;return e}handleSideNavSelect(e){this.selected=e.target===this}handleClick(e){!this.href&&e&&e.preventDefault(),this.disabled||(this.hasChildren?this.expanded=!this.expanded:this.value&&this.announceSelected(this.value))}announceSelected(e){const t=new CustomEvent("sidenav-select",{bubbles:!0,composed:!0,detail:{value:e}});this.dispatchEvent(t)}click(){this.handleClick()}get focusElement(){return this.shadowRoot.querySelector("#itemLink")}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return o`<a href="${this.href||"#"}" target="${h(this.target)}" download="${h(this.download)}" rel="${h(this.rel)}" data-level="${this.depth}" @click="${this.handleClick}" id="itemLink" aria-current="${h(this.selected&&this.href?"page":void 0)}"><slot name="icon"></slot>${this.label}<slot></slot></a>${this.expanded?o`<slot name="descendant"></slot>`:o``}`}updated(e){if(e.has("selected")||e.has("manageTabIndex")){const e=this.selected?0:-1;this.tabIndex=this.manageTabIndex?e:0}super.updated(e)}connectedCallback(){super.connectedCallback(),this.startTrackingSelection()}disconnectedCallback(){this.stopTrackingSelection(),super.disconnectedCallback()}async startTrackingSelection(){const e=this.parentSideNav;e&&(await e.updateComplete,this.manageTabIndex=e.manageTabIndex,e.startTrackingSelectionForItem(this),this.selected=null!=this.value&&this.value===e.value)}stopTrackingSelection(){const e=this.parentSideNav;e&&e.stopTrackingSelectionForItem(this),this._parentSidenav=void 0}}l([c()],P.prototype,"value",void 0),l([c({type:Boolean,attribute:!1})],P.prototype,"manageTabIndex",void 0),l([c({type:Boolean,reflect:!0})],P.prototype,"selected",void 0),l([c({type:Boolean,reflect:!0})],P.prototype,"expanded",void 0);var G=w`#list{--spectrum-sidenav-item-padding-y:var(
--spectrum-global-dimension-size-65
);list-style-type:none;margin:0;padding:0}:host([dir=ltr]) .spectrum-SideNav-itemLink.focus-visible:before{left:0}:host([dir=ltr]) .spectrum-SideNav-itemLink:focus-visible:before{left:0}:host([dir=rtl]) .spectrum-SideNav-itemLink.focus-visible:before{right:0}:host([dir=rtl]) .spectrum-SideNav-itemLink:focus-visible:before{right:0}:host([dir=ltr]) .spectrum-SideNav-itemLink.focus-visible:before{right:0}:host([dir=ltr]) .spectrum-SideNav-itemLink:focus-visible:before{right:0}:host([dir=rtl]) .spectrum-SideNav-itemLink.focus-visible:before{left:0}:host([dir=rtl]) .spectrum-SideNav-itemLink:focus-visible:before{left:0}:host([dir=ltr]) .spectrum-SideNav-itemLink .spectrum-SideNav-itemIcon{margin-right:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=rtl]) .spectrum-SideNav-itemLink .spectrum-SideNav-itemIcon{margin-left:var(
--spectrum-sidenav-icon-gap,var(--spectrum-global-dimension-size-100)
)}:host([dir=ltr]) #heading{margin-right:0}:host([dir=rtl]) #heading{margin-left:0}:host([dir=ltr]) #heading{margin-left:0}:host([dir=rtl]) #heading{margin-right:0}#heading{border-radius:var(
--spectrum-sidenav-heading-border-radius,var(--spectrum-alias-border-radius-regular)
);font-size:var(
--spectrum-sidenav-heading-text-size,var(--spectrum-global-dimension-font-size-50)
);font-style:normal;font-weight:var(
--spectrum-sidenav-heading-text-font-weight,var(--spectrum-global-font-weight-medium)
);height:var(
--spectrum-sidenav-heading-height,var(--spectrum-alias-single-line-height)
);letter-spacing:var(
--spectrum-sidenav-heading-text-letter-spacing,var(--spectrum-global-font-letter-spacing-medium)
);line-height:var(
--spectrum-sidenav-heading-height,var(--spectrum-alias-single-line-height)
);margin-bottom:var(
--spectrum-sidenav-heading-gap-bottom,var(--spectrum-global-dimension-size-50)
);margin-top:var(
--spectrum-sidenav-heading-gap-top,var(--spectrum-global-dimension-size-200)
);padding-bottom:0;padding-left:var(
--spectrum-sidenav-heading-padding-x,var(--spectrum-global-dimension-size-150)
);padding-right:var(
--spectrum-sidenav-heading-padding-x,var(--spectrum-global-dimension-size-150)
);padding-top:0;text-transform:uppercase}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list .spectrum-SideNav-itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list .spectrum-SideNav-itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=ltr]) .spectrum-SideNav--multiLevel #list #list .spectrum-SideNav-itemLink{padding-left:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}:host([dir=rtl]) .spectrum-SideNav--multiLevel #list #list .spectrum-SideNav-itemLink{padding-right:calc(var(--spectrum-sidenav-multilevel-item-indentation,var(--spectrum-global-dimension-size-150)) + var(--spectrum-sidenav-item-padding-x,var(--spectrum-global-dimension-size-150)))}#heading{color:var(
--spectrum-sidenav-heading-text-color,var(--spectrum-global-color-gray-700)
)}:host{display:block}`;class V extends n{constructor(){super(...arguments),this.label=""}static get styles(){return[R,G]}update(e){this.hasAttribute("slot")||(this.slot="descendant"),super.update(e)}render(){return o`<h2 id="heading">${this.label}</h2><div id="list" aria-labelledby="heading"><slot name="descendant"></slot></div>`}}l([c({reflect:!0})],V.prototype,"label",void 0);class O extends u{constructor(){super(),this.items=new Set,this.manageTabIndex=!1,this.value=void 0,this.addEventListener("focusin",this.startListeningToKeyboard)}static get styles(){return[U]}startTrackingSelectionForItem(e){this.items.add(e)}stopTrackingSelectionForItem(e){this.items.delete(e)}handleSelect(e){if(e.stopPropagation(),this.value===e.detail.value)return;const t=this.value;this.value=e.detail.value;this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0,cancelable:!0}))?this.items.forEach((t=>t.handleSideNavSelect(e))):(this.value=t,e.target.selected=!1,e.preventDefault())}focus(){this.focusElement!==this&&super.focus()}blur(){this.focusElement!==this&&super.blur()}click(){this.focusElement!==this&&super.click()}get focusElement(){const e=this.querySelector("[selected]");if(e&&!this.isDisabledChild(e))return e;const t=[...this.querySelectorAll("sp-sidenav-item")];let r=0;for(;r<t.length&&t[r]&&this.isDisabledChild(t[r]);)r+=1;return t[r]?t[r]:this}startListeningToKeyboard(){if(this.addEventListener("keydown",this.handleKeydown),this.addEventListener("focusout",this.stopListeningToKeyboard),this.value&&this.manageTabIndex){const e=this.querySelector(`[value="${this.value}"]`);e&&(e.tabIndex=-1)}}stopListeningToKeyboard(){if(this.removeEventListener("keydown",this.handleKeydown),this.removeEventListener("focusout",this.stopListeningToKeyboard),this.value&&this.manageTabIndex){const e=this.querySelector(`[value="${this.value}"]`);e&&(e.tabIndex=0)}}handleKeydown(e){const{code:t}=e;if("ArrowDown"!==t&&"ArrowUp"!==t)return;e.preventDefault();const r="ArrowDown"===t?1:-1;this.focusItemByOffset(r)}focusItemByOffset(e){const t=[...this.querySelectorAll("sp-sidenav-item")];let r=t.indexOf(X(this));r=(t.length+r+e)%t.length;let a=t[r];for(;a&&this.isDisabledChild(a);)r=(t.length+r+e)%t.length,a=t[r];a&&!this.isDisabledChild(a)&&a.focus()}isDisabledChild(e){if(e.disabled)return!0;let t=e.parentElement;for(;t instanceof V||!t.disabled&&t instanceof P&&t.expanded;)t=t.parentElement;return t!==this}handleSlotchange(){this.manageTabIndexes()}async manageTabIndexes(){if(!this.value&&this.manageTabIndex){const e=this.querySelector("sp-sidenav-item:not([tabindex])");e&&(e.tabIndex=-1);const t=this.querySelector("sp-sidenav-item");t&&(await t.updateComplete,t.tabIndex=0)}}render(){return o`<nav @sidenav-select="${this.handleSelect}"><slot name="descendant" @slotchange="${this.handleSlotchange}"></slot></nav>`}firstUpdated(e){super.firstUpdated(e);const t=this.querySelector("[selected]");t?this.value=t.value:this.manageTabIndexes()}updated(e){if(super.updated(e),e.has("manageTabIndex")){[...this.querySelectorAll("sp-sidenav-item")].map((e=>e.manageTabIndex=this.manageTabIndex))}}}l([c({type:Boolean,reflect:!0,attribute:"manage-tab-index"})],O.prototype,"manageTabIndex",void 0),l([c({reflect:!0})],O.prototype,"value",void 0),customElements.define("sp-sidenav",O),customElements.define("sp-sidenav-item",P);export{V as S,T,A as a,H as b,X as g,q as h,S as l};
//# sourceMappingURL=f837faad.js.map
