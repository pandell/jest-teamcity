import { Test } from "@jest/reporters";
import { TestResult } from "@jest/test-result";
import { Config } from "@jest/types";

const testFailureStackTrace = `Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
    at Object.<anonymous> (\\\\test-root-dir\\src\\sample-tests-math.tests.ts:22:23)
    at Object.asyncJestTest (\\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\jasmineAsyncInstall.js:106:37)
    at \\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\queueRunner.js:45:12
    at new Promise (<anonymous>)
    at mapper (\\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\queueRunner.js:28:19)
    at \\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\queueRunner.js:75:41`;

const testFailureMessage = `Error: expect(received).toBe(expected) // Object.is equality
Expected: 1
Received: 2`;

/**
 * Dummy {@link Config.GlobalConfig} object for testing.
 */
export const testGlobalConfig: Config.GlobalConfig = {
    bail: 0,
    changedFilesWithAncestor: false,
    collectCoverage: false,
    collectCoverageFrom: [],
    coverageDirectory: "/jest-teamcity/coverage",
    coverageProvider: "babel",
    coverageReporters: ["json", "text", "lcov", "clover"],
    detectLeaks: false,
    detectOpenHandles: false,
    errorOnDeprecated: false,
    expand: false,
    findRelatedTests: false,
    forceExit: false,
    json: false,
    lastCommit: false,
    listTests: false,
    logHeapUsage: false,
    maxConcurrency: 5,
    maxWorkers: 11,
    noStackTrace: false,
    nonFlagArgs: [],
    notify: false,
    notifyMode: "failure-change",
    onlyChanged: false,
    onlyFailures: false,
    passWithNoTests: false,
    projects: [],
    reporters: [
        ["default", {}],
        ["index.js", { "my-custom-options": "ABCD" }]
    ],
    rootDir: "/jest-teamcity",
    runTestsByPath: false,
    skipFilter: false,
    testFailureExitCode: 1,
    testPathPattern: "",
    testSequencer: "/test-sequencer/index.js",
    updateSnapshot: "new",
    useStderr: false,
    watch: false,
    watchAll: false,
    watchman: true
};

/**
 * Dummy {@link Test} object for testing.
 */
export const mockTest: Test = {
    context: {
        config: {
            rootDir: "/test-root-dir"
        }
    } as never,
    duration: 100,
    path: "/test-root-dir/src/sample-test-file.tests.ts"
};

/**
 * Test result with one successful test.
 */
export const successTestResultWithoutScope: TestResult = {
    leaks: false,
    numFailingTests: 0,
    numPassingTests: 1,
    numPendingTests: 0,
    numTodoTests: 0,
    openHandles: [],
    perfStats: { end: 1611158133836, runtime: 687, slow: false, start: 1611158133149 },
    skipped: false,
    snapshot: { added: 0, fileDeleted: false, matched: 0, unchecked: 0, uncheckedKeys: [], unmatched: 0, updated: 0 },
    testFilePath: "/test-root-dir/src/sample-test-file.tests.ts",
    testResults: [
        {
            ancestorTitles: [],
            duration: 2,
            failureDetails: [],
            failureMessages: [],
            fullName: "a test without a scope",
            location: null,
            numPassingAsserts: 0,
            status: "passed",
            title: "a test without a scope"
        }
    ]
};

/**
 * Test result with two successful tests and one failed test.
 */
export const mixedTestResult: TestResult = {
    leaks: false,
    numFailingTests: 1,
    numPassingTests: 2,
    numPendingTests: 0,
    numTodoTests: 0,
    openHandles: [],
    perfStats: { end: 1611158133836, runtime: 687, slow: false, start: 1611158133149 },
    skipped: false,
    snapshot: { added: 0, fileDeleted: false, matched: 0, unchecked: 0, uncheckedKeys: [], unmatched: 0, updated: 0 },
    testFilePath: "/test-root-dir/src/sample-test-file.tests.ts",
    testResults: [
        {
            ancestorTitles: ["scope-1"],
            duration: 2,
            failureDetails: [],
            failureMessages: [],
            fullName: "scope-1 1 + 2 equals 3",
            location: null,
            numPassingAsserts: 5,
            status: "passed",
            title: "1 + 2 equals 3"
        },
        {
            ancestorTitles: ["scope-2"],
            duration: 3,
            failureDetails: [],
            failureMessages: [],
            fullName: "scope-2 1 + 2 equals 3",
            location: null,
            numPassingAsserts: 5,
            status: "passed",
            title: "1 + 2 equals 3"
        },
        {
            ancestorTitles: ["scope-2"],
            duration: 3,
            failureDetails: [
                {
                    actual: "",
                    error: { matcherResult: { actual: 2, expected: 1, name: "toBe", pass: false } },
                    expected: "",
                    matcherName: "",
                    message: testFailureMessage,
                    passed: false,
                    stack: testFailureStackTrace
                }
            ],
            failureMessages: [testFailureStackTrace],
            fullName: "scope-2 1 + 1 equals 1",
            location: null,
            numPassingAsserts: 0,
            status: "failed",
            title: "1 + 1 equals 1"
        }
    ]
};
