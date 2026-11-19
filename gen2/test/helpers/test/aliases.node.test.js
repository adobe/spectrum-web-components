/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { test } from 'node:test';
import { clearImmediate, setImmediate } from 'node:timers';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const supportDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const gen2Directory = resolve(supportDirectory, '../..');
const aliases = {
  '@swc-test-helpers/dom': resolve(supportDirectory, 'dom/index.ts'),
  '@swc-test-helpers/playwright': resolve(
    supportDirectory,
    'playwright/index.ts'
  ),
};

test('DOM helpers retain their exports through individual modules', () => {
  const helpers = {
    fixture: 'fixture',
    getComponent: 'get-component',
    getComponents: 'get-components',
    getSwcTestGlobals: 'get-swc-test-globals',
    setupSwcWarningSpy: 'setup-swc-warning-spy',
    waitForEvent: 'wait-for-event',
    withWarningSpy: 'with-warning-spy',
  };
  const directory = resolve(supportDirectory, 'dom');
  const source = ts.createSourceFile(
    'index.ts',
    readFileSync(resolve(directory, 'index.ts'), 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  const exports = {};
  for (const statement of source.statements) {
    assert.ok(ts.isExportDeclaration(statement));
    assert.ok(statement.moduleSpecifier);
    assert.ok(ts.isStringLiteral(statement.moduleSpecifier));
    assert.ok(statement.exportClause);
    assert.ok(ts.isNamedExports(statement.exportClause));
    for (const element of statement.exportClause.elements) {
      exports[element.name.text] = statement.moduleSpecifier.text;
    }
  }
  assert.deepEqual(
    exports,
    Object.fromEntries(
      Object.entries(helpers).map(([name, file]) => [name, `./${file}.js`])
    )
  );
  for (const [name, file] of Object.entries(helpers)) {
    const implementation = ts.createSourceFile(
      `${file}.ts`,
      readFileSync(resolve(directory, `${file}.ts`), 'utf8'),
      ts.ScriptTarget.Latest,
      true
    );
    const declarations = implementation.statements.flatMap((statement) =>
      ts.isFunctionDeclaration(statement)
        ? [statement.name?.text]
        : ts.isVariableStatement(statement)
          ? statement.declarationList.declarations.map((declaration) =>
              declaration.name.getText(implementation)
            )
          : []
    );
    assert.deepEqual(declarations, [name]);
  }
});

test('the editor discovers a no-emit project for excluded test consumers', () => {
  const service = new ts.server.ProjectService({
    host: {
      ...ts.sys,
      // This check reads a fixed worktree; it does not need file watching.
      watchFile: () => ({ close() {} }),
      watchDirectory: () => ({ close() {} }),
      setTimeout,
      clearTimeout,
      setImmediate,
      clearImmediate,
    },
    logger: {
      close() {},
      hasLevel: () => false,
      loggingEnabled: () => false,
      perftrc() {},
      info() {},
      startGroup() {},
      endGroup() {},
      msg() {},
      getLogFileName: () => undefined,
    },
    cancellationToken: { isCancellationRequested: () => false },
    useSingleInferredProject: false,
    useInferredProjectPerProjectRoot: true,
  });
  const consumers = [
    ...[
      'drag-and-drop',
      'focusgroup-navigation',
      'placement',
      'slot-attribute-propagation',
    ].map(
      (controller) =>
        `packages/core/controllers/${controller}-controller/test/${controller}-controller.test.ts`
    ),
    'packages/icons/test/workflow-icons.a11y.spec.ts',
  ];

  try {
    for (const consumer of consumers) {
      const filePath = resolve(gen2Directory, consumer);
      service.openClientFile(filePath);
      const project = service.getDefaultProjectForFile(
        ts.server.toNormalizedPath(filePath),
        true
      );
      assert.ok(project, `${consumer} has an editor project`);
      assert.equal(
        ts.server.isInferredProjectName(project.getProjectName()),
        false,
        `${consumer} must belong to a configured TypeScript project`
      );
      assert.equal(project.getCompilerOptions().noEmit, true);
      assert.equal(
        project.getProjectName(),
        resolve(gen2Directory, 'tsconfig.json')
      );
      const languageService = project.getLanguageService();
      const program = languageService.getProgram();
      assert.ok(program, `${consumer} has an editor program`);
      assert.deepEqual(
        program
          .getOptionsDiagnostics()
          .map((diagnostic) =>
            ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')
          ),
        [],
        `${consumer} has valid editor project references`
      );
      for (const [alias, target] of Object.entries(aliases)) {
        const result = ts.resolveModuleName(
          alias,
          filePath,
          project.getCompilerOptions(),
          ts.sys
        );
        assert.equal(
          result.resolvedModule?.resolvedFileName,
          ts.sys.resolvePath(target)
        );
      }
      assert.deepEqual(
        languageService
          .getSemanticDiagnostics(filePath)
          .filter((diagnostic) => diagnostic.code === 2307)
          .map(
            (diagnostic) =>
              `TS${diagnostic.code}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')}`
          ),
        [],
        `${consumer} has no unresolved editor imports`
      );
    }
  } finally {
    for (const project of service.configuredProjects.values()) {
      project.close();
    }
    for (const project of service.inferredProjects) {
      project.close();
    }
  }
});

test('shared helpers are not production roots', () => {
  for (const packageName of ['core', 'swc', 'icons']) {
    const packageDirectory = resolve(gen2Directory, 'packages', packageName);
    const config = ts.readConfigFile(
      resolve(packageDirectory, 'tsconfig.json'),
      ts.sys.readFile
    );
    assert.equal(config.error, undefined);
    const parsed = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      packageDirectory
    );
    assert.deepEqual(parsed.errors, []);
    assert.ok(parsed.fileNames.length > 0);
    for (const filePath of parsed.fileNames) {
      assert.ok(
        !filePath.startsWith(`${supportDirectory}/`),
        `${filePath} must not be a production root`
      );
    }
  }
});

for (const packageName of ['core', 'swc', 'icons']) {
  for (const [alias, target] of Object.entries(aliases)) {
    test(`${packageName} resolves ${alias} to neutral test support`, () => {
      const packageDirectory = resolve(gen2Directory, 'packages', packageName);
      const configPath = resolve(packageDirectory, 'tsconfig.json');
      const config = ts.readConfigFile(configPath, ts.sys.readFile);
      assert.equal(config.error, undefined);
      const parsed = ts.parseJsonConfigFileContent(
        config.config,
        ts.sys,
        packageDirectory
      );
      assert.deepEqual(parsed.errors, []);
      const result = ts.resolveModuleName(
        alias,
        resolve(packageDirectory, 'test/alias-consumer.ts'),
        parsed.options,
        ts.sys
      );
      assert.equal(
        result.resolvedModule?.resolvedFileName,
        ts.sys.resolvePath(target)
      );
    });
  }
}

test('shared helpers do not import production packages or mix runners', () => {
  for (const runner of ['dom', 'playwright']) {
    const directory = resolve(supportDirectory, runner);
    assert.ok(existsSync(directory), `${runner} support exists`);
    for (const entry of readdirSync(directory)) {
      if (!entry.endsWith('.ts')) {
        continue;
      }
      const filePath = resolve(directory, entry);
      const source = ts.createSourceFile(
        filePath,
        readFileSync(filePath, 'utf8'),
        ts.ScriptTarget.Latest,
        true
      );
      for (const statement of source.statements) {
        if (
          !(
            ts.isImportDeclaration(statement) ||
            ts.isExportDeclaration(statement)
          ) ||
          !statement.moduleSpecifier ||
          !ts.isStringLiteral(statement.moduleSpecifier)
        ) {
          continue;
        }
        const dependency = statement.moduleSpecifier.text;
        if (dependency.startsWith('.')) {
          const dependencyPath = relative(
            directory,
            resolve(directory, dependency)
          );
          assert.ok(
            !dependencyPath.startsWith('..') && !isAbsolute(dependencyPath),
            `${entry} must not import outside ${runner} support`
          );
        } else {
          assert.ok(
            runner === 'dom'
              ? dependency === 'lit'
              : dependency === '@playwright/test',
            `${entry} has an unexpected dependency: ${dependency}`
          );
        }
      }
    }
  }
});
