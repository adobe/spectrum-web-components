/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import * as fs from 'fs';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'File should contain header';
    private templateString: string;

    constructor(options: Lint.IOptions) {
        super(options);
        if (options.ruleArguments.length === 0) {
            throw new Error(
                '[file-should-container-header] Must specify template path as rule option!, e.g. "file-should-container-header: [true, pathToFile]"'
            );
        }
        const templatePath = options.ruleArguments[0] as string;
        if (!fs.existsSync(templatePath)) {
            throw new Error(
                `[file-should-container-header] Template path ${templatePath} does not exist!`
            );
        }
        this.templateString = fs
            .readFileSync(templatePath, { encoding: 'utf8' })
            .toString()
            .trim();
    }
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(
            new NoFileWithoutCopyrightHeader(
                sourceFile,
                this.getOptions(),
                this.templateString
            )
        );
    }
}

class NoFileWithoutCopyrightHeader extends Lint.RuleWalker {
    private templateString: string;
    constructor(
        sourceFile: ts.SourceFile,
        options: Lint.IOptions,
        templateString: string
    ) {
        super(sourceFile, options);
        this.templateString = templateString;
    }
    public visitSourceFile(sourceFile: ts.SourceFile) {
        if (sourceFile && sourceFile.fileName) {
            const fullText = sourceFile.getFullText();
            if (fullText) {
                // is the file starting with templateString?
                if (fullText.startsWith(this.templateString)) {
                    return super.visitSourceFile(sourceFile);
                }

                // create a fix replacement with the template text
                const fixer = new Lint.Replacement(
                    0,
                    0,
                    this.templateString + '\n'
                );

                this.addFailure(
                    this.createFailure(0, 1, Rule.FAILURE_STRING, fixer)
                );
                return super.visitSourceFile(sourceFile);
            }
        }

        super.visitSourceFile(sourceFile);
    }
}
