'use strict';
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

var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype =
                b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __());
        };
    })();
Object.defineProperty(exports, '__esModule', { value: true });
var fs = require('fs');
var Lint = require('tslint');
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule(options) {
        var _this = _super.call(this, options) || this;
        if (options.ruleArguments.length === 0) {
            throw new Error(
                '[file-should-container-header] Must specify template path as rule option!, e.g. "file-should-container-header: [true, pathToFile]"'
            );
        }
        var templatePath = options.ruleArguments[0];
        if (!fs.existsSync(templatePath)) {
            throw new Error(
                '[file-should-container-header] Template path ' +
                    templatePath +
                    ' does not exist!'
            );
        }
        _this.templateString = fs
            .readFileSync(templatePath, { encoding: 'utf8' })
            .toString()
            .trim();
        return _this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(
            new NoFileWithoutCopyrightHeader(
                sourceFile,
                this.getOptions(),
                this.templateString
            )
        );
    };
    Rule.FAILURE_STRING = 'File should contain header';
    return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
var NoFileWithoutCopyrightHeader = /** @class */ (function (_super) {
    __extends(NoFileWithoutCopyrightHeader, _super);
    function NoFileWithoutCopyrightHeader(sourceFile, options, templateString) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.templateString = templateString;
        return _this;
    }
    NoFileWithoutCopyrightHeader.prototype.visitSourceFile = function (
        sourceFile
    ) {
        if (sourceFile && sourceFile.fileName) {
            var fullText = sourceFile.getFullText();
            if (fullText) {
                // is the file starting with templateString?
                if (fullText.startsWith(this.templateString)) {
                    return _super.prototype.visitSourceFile.call(
                        this,
                        sourceFile
                    );
                }
                // create a fix replacement with the template text
                var fixer = new Lint.Replacement(
                    0,
                    0,
                    this.templateString + '\n'
                );
                this.addFailure(
                    this.createFailure(0, 1, Rule.FAILURE_STRING, fixer)
                );
                return _super.prototype.visitSourceFile.call(this, sourceFile);
            }
        }
        _super.prototype.visitSourceFile.call(this, sourceFile);
    };
    return NoFileWithoutCopyrightHeader;
})(Lint.RuleWalker);
