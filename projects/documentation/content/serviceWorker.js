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
import { precacheAndRoute } from 'workbox-precaching';
// import { getCacheKeyForURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
// import { skipWaiting, clientsClaim } from 'workbox-core';
// import { cacheNames } from 'workbox-core';
// import { strategy as composeStrategies } from 'workbox-streams';

// Is this the right call?
self.skipWaiting();
// clientsClaim();

// Cache the Typekit stylesheets with a stale while revalidate strategy.
registerRoute(
    /^https:\/\/use\.typekit\.net\/evk7lzt\.css$/,
    new CacheFirst({
        cacheName: 'typekit-stylesheets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
            }),
        ],
    })
);

registerRoute(
    /^https:\/\/p\.typekit\.net/,
    new CacheFirst({
        cacheName: 'typekit-stylesheets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
            }),
        ],
    })
);

registerRoute(
    /^https:\/\/img\.shields\.io/,
    new StaleWhileRevalidate({
        cacheName: 'badges',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
            }),
        ],
    })
);

// Cache the Typekit webfont files with a cache first strategy for 1 year.
registerRoute(
    /^https:\/\/use\.typekit\.net/,
    new CacheFirst({
        cacheName: 'typekit-webfonts',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
            }),
        ],
    })
);

// const shellStrategy = new CacheFirst({ cacheName: cacheNames.precache });
// const contentStrategy = new StaleWhileRevalidate({ cacheName: 'content' });

// const componentHandler = composeStrategies([
//     () =>
//         shellStrategy.handle({
//             request: new Request(getCacheKeyForURL('/shell-start.html')),
//         }),
//     ({ url }) =>
//         contentStrategy.handle({
//             request: new Request(
//                 url.pathname.replace('index.html', '') + 'content/index.html'
//             ),
//         }),
//     ({ url }) =>
//         contentStrategy.handle({
//             request: new Request(
//                 url.pathname.replace('index.html', '') +
//                     'api-content/index.html'
//             ),
//         }),
//     () =>
//         shellStrategy.handle({
//             request: new Request(getCacheKeyForURL('/shell-end.html')),
//         }),
// ]);

// const guidesHandler = composeStrategies([
//     () =>
//         shellStrategy.handle({
//             request: new Request(getCacheKeyForURL('/shell-start.html')),
//         }),
//     ({ url }) =>
//         contentStrategy.handle({
//             request: new Request(
//                 url.pathname.replace('index.html', '') + 'content/index.html'
//             ),
//         }),
//     () =>
//         shellStrategy.handle({
//             request: new Request(getCacheKeyForURL('/shell-end.html')),
//         }),
// ]);

// const homeHandler = guidesHandler;

// const navigationHandler = (...args) => {
//     if (args[0].url.pathname.search('components') !== -1) {
//         return componentHandler(...args);
//     } else if (args[0].url.pathname.search('guides') !== -1) {
//         return guideHandler(...args);
//     }
//     return homeHandler(...args);
// };

// registerRoute(({ request }) => request.mode === 'navigate', navigationHandler);

precacheAndRoute(self.__WB_MANIFEST);
