/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const fetch = require('node-fetch');
const fs = require('fs');

const token = process.argv.slice(2)[0];
const build = process.argv.slice(2)[1] || 'latest';

(function() {
    fetch(
        `https://circleci.com/api/v1.1/project/github/adobe/spectrum-web-components/${build}/artifacts?circle-token=${token}`
    )
        .then((resp) => resp.json())
        .then((data) => {
            data.map((asset) => {
                if (asset.url.search('diff') === -1) {
                    fetch(`${asset.url}?circle-token=${token}`)
                        .then((resp) => {
                            const path =
                                './' +
                                asset.path.replace(
                                    'home/circleci/project/test/visual/screenshots-current/ci',
                                    'test/visual/screenshots-baseline/ci'
                                );
                            const dest = fs.createWriteStream(path);
                            resp.body.pipe(dest);
                        })
                        .catch((err) => console.log(err));
                }
            });
        });
})();
