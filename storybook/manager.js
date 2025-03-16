/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
    theme: create({
        brandTitle: 'Spectrum Web Components',
        brandUrl: 'https://opensource.adobe.com/spectrum-web-components',
        brandImage:
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI0LjEuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnCiAgICBjbGFzcz0ic3BlY3RydW0tU2l0ZS1sb2dvIHNwZWN0cnVtLUljb24gc3BlY3RydW0tSWNvbi0tc2l6ZVhMIgogICAgdmVyc2lvbj0iMS4xIgogICAgaWQ9IkxheWVyXzEiCiAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgIHg9IjAiIHk9IjAiCiAgICB2aWV3Qm94PSIwIDAgMTQ2IDI2IgogICAgZm9jdXNhYmxlPSJmYWxzZSIKICAgIGFyaWEtaGlkZGVuPSJ0cnVlIgogICAgYXJpYS1sYWJlbD0iQWRvYmUgbG9nbyIKICAgIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZyBzdHlsZT0iZmlsbDojRkEwRjAwIj4KCTxwb2x5Z29uIHBvaW50cz0iMTksMCAzMCwwIDMwLDI2Ii8+Cgk8cG9seWdvbiBwb2ludHM9IjExLjEsMCAwLDAgMCwyNiIvPgoJPHBvbHlnb24gcG9pbnRzPSIxNSw5LjYgMjIuMSwyNiAxNy41LDI2IDE1LjQsMjAuOCAxMC4yLDIwLjgiLz4KPC9nPgo8dGV4dAogICAgeD0iMzQiCiAgICB5PSIxMCIKICAgIHN0eWxlPSJjb2xvcjogcmdiKDAsMCwwKTtmb250LXNpemU6IC44cmVtO2ZvbnQtZmFtaWx5OiBhZG9iZS1jbGVhbiwnU291cmNlIFNhbnMgUHJvJywtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCwnU2Vnb2UgVUknLFJvYm90byxVYnVudHUsJ1RyZWJ1Y2hldCBNUycsJ0x1Y2lkYSBHcmFuZGUnLHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiA3MDA7Ij5TcGVjdHJ1bTwvdGV4dD4KPHRleHQKICAgIHg9IjM0IgogICAgeT0iMjUiCiAgICBzdHlsZT0iY29sb3I6IHJnYigwLDAsMCk7Zm9udC1zaXplOiAuOHJlbTtmb250LWZhbWlseTogYWRvYmUtY2xlYW4sJ1NvdXJjZSBTYW5zIFBybycsLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsJ1NlZ29lIFVJJyxSb2JvdG8sVWJ1bnR1LCdUcmVidWNoZXQgTVMnLCdMdWNpZGEgR3JhbmRlJyxzYW5zLXNlcmlmOyBmb250LXdlaWdodDogNzAwOyI+V2ViIENvbXBvbmVudHM8L3RleHQ+Cjwvc3ZnPgo=',
    }),
});
