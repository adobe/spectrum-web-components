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
import * as fs from 'fs';
import path from 'path';
import * as github from './github.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
    promises: { readFile, writeFile },
} = fs;
const { pr: prNumber } = yargs(hideBin(process.argv)).argv;
const TASK_STATUS = {
    success: 0,
    error: 1,
};

const COPY_HEAD_STR = `/*
Copyright 2020 Adobe. All rights reserved.
`;
const COPY_HEAD_CHANGED_STR = `/*
Copyright 2020 Adobe. All rights reserved.
Copyright 2021 Gaoding. All rights reserved.
`;

async function main() {
    console.log(__dirname);
    const fileList = await getPullRequestAllChangedFiles(1);
    await checkAllPrChangedFiles(fileList);
    addCopyrightToFile('scripts/process-spectrum-css.js');
}

main();

// 获取pr中所有更改过的文件
async function getPullRequestAllChangedFiles() {
    if (!prNumber) {
        console.log(`Warning: pr number is must with --pr=`);
        return [];
    }
    const detailRes = await github.getPullRequestDetail(prNumber);
    const changedFilesNum = detailRes.changed_files || 0;
    console.log(`Pull Request ${prNumber} has ${changedFilesNum} files.`);
    if (changedFilesNum <= 0) return [];
    let filesList = [];
    const perPage = 100;
    for (let i = 0; i < changedFilesNum; i += perPage) {
        const page = Math.floor(i / perPage) + 1;
        const query = {
            per_page: perPage,
            page,
        };
        const changedFiles = await github.getPullRequestFiles(prNumber, query);
        const fileNameList = changedFiles.map((cv) => {
            const { filename } = cv;
            return filename;
        });
        filesList = filesList.concat(fileNameList);
    }
    console.log(
        `Pull Request ${prNumber} finaly get ${filesList.length} files.`
    );
    return filesList;
}

// 对更改过的文件做检测
async function checkAllPrChangedFiles(list) {
    const promList = list.map((cv) => {
        return addCopyrightToFile(cv);
    });
    console.log(`----------- check start -------------`);
    await Promise.all(promList);
    console.log(`----------- check finished -----------`);
}

// 往单个文件中添加Gaoding的Copyright
async function addCopyrightToFile(filename) {
    const filepath = path.resolve(__dirname, '../', filename);
    const fileContentRaw = await readFile(filepath);
    const fileContent = fileContentRaw.toString();
    const isNeedAdd = isNeedAddCopyrightFile(fileContent);
    if (isNeedAdd) {
        const changedFileContent = getNewCopyrightFile(fileContent);
        await writeFile(filepath, changedFileContent);

        return TASK_STATUS.success;
    }
    return TASK_STATUS.success;
}

// 检测文件内容是否有声明但是没有增加Gaoding声明
function isNeedAddCopyrightFile(str) {
    return str.includes(COPY_HEAD_STR) && !str.includes(COPY_HEAD_CHANGED_STR);
}

// 获取更新后的声明
function getNewCopyrightFile(str) {
    return str.replace(COPY_HEAD_STR, COPY_HEAD_CHANGED_STR);
}
