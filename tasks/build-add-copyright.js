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
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileURLToPath } from 'url';
import child_process from 'child_process';

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
const COPY_HEAD_FULL_STR = `/*
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
`;
async function main() {
    console.log(__dirname);
    const fileList = await getCommitChangedFiles(1);
    console.log(fileList);
    await checkAllPrChangedFiles(fileList);
}

main();

// 获取pr中所有更改过的文件
async function getCommitChangedFiles() {
    const detailRes = child_process.execSync(`git status -s`, 'utf-8');
    const detailList = detailRes.toString().split('\n');
    const fullFileList = detailList
        .filter((cv) => cv)
        .map((cv) => {
            const fileName = cv.slice(3);
            const fileType = getChangeType(cv.slice(0, 2));
            const fileExt = path.extname(fileName);
            return {
                name: fileName,
                type: fileType,
                ext: fileExt,
            };
        });
    return fullFileList;

    function getChangeType(gitType) {
        if (gitType.includes(' M')) {
            return 'modified';
        } else if (gitType.includes(' D')) {
            return 'deleted';
        } else {
            return 'added';
        }
    }
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
async function addCopyrightToFile({ name: filename, type, ext }) {
    // 删除的文件直接跳过
    if (type === 'deleted') return TASK_STATUS.success;
    const filepath = path.resolve(__dirname, '../', filename);
    const fileContentRaw = await readFile(filepath);
    const fileContent = fileContentRaw.toString();
    // 新增文件中没有声明则手动增加
    if (type === 'added') {
        const isAdded = fileContent.includes(COPY_HEAD_STR);
        const needCopyRightExts = ['.ts', '.js', '.css', '.cjs', '.hbs'];
        if (!isAdded && needCopyRightExts.includes(ext)) {
            const changedFileContent = getNewFullCopyrightFile(fileContent);
            await writeFile(filepath, changedFileContent);
            return TASK_STATUS.success;
        }
    }
    const isNeedAdd = isNeedAddCopyrightFile(fileContent);
    // 正常文件中 替换不合格的版权声明
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

// 获取全量增加copyright的文件内容
function getNewFullCopyrightFile(str) {
    return `${COPY_HEAD_FULL_STR}${str}`;
}
