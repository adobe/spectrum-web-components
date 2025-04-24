/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/// <reference types="@fastly/js-compute" />
import { env } from 'fastly:env';
import { PublisherServer } from '@fastly/compute-js-static-publish';
import rc from '../static-publish.rc.js';
const publisherServer = PublisherServer.fromStaticPublishRc(rc);

// eslint-disable-next-line no-restricted-globals
addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));
async function handleRequest(event) {
    console.log('FASTLY_SERVICE_VERSION', env('FASTLY_SERVICE_VERSION'));

    const request = event.request;

    const response = await publisherServer.serveRequest(request);
    if (response != null) {
        return response;
    }

    // Do custom things here!
    // Handle API requests, serve non-static responses, etc.

    return new Response('Not found', { status: 404 });
}
