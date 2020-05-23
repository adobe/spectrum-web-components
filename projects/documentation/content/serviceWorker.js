import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { skipWaiting } from 'workbox-core';

skipWaiting();

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

precacheAndRoute(self.__WB_MANIFEST);
