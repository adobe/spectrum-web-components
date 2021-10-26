/*
Copyright 2020 Adobe. All rights reserved.
Copyright 2021 Gaoding. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
// const axios = require('axios');
const axios = require('axios');
// personal.config.json 存放个人数据,用来对接github api example {name:'saiye',token:''}
const personConfig = require('../person.config.json');
const client = axios.create({
    baseURL: `https://api.github.com/repos/gaoding-inc/iliad-ui`,
    headers: {
        Authorization: `token ${personConfig.token}`,
        Accept: 'application/vnd.github.sailor-v-preview+json',
    },
});

async function getPullRequestDetail(number) {
    const resp = await client.get(`/pulls/${number}`);
    return resp.data;
}
async function getPullRequestFiles(number, query = {}) {
    const { per_page = 100, page = 1 } = query;
    const resp = await client.get(
        `/pulls/${number}/files?per_page=${per_page}&page=${page}`
    );
    return resp.data;
}
module.exports = { getPullRequestDetail, getPullRequestFiles };
