import { Test } from "@jest/reporters";
import { TestResult } from "@jest/test-result";
import { TeamCityReporter } from "./teamcity-reporter";
import { Config } from "@jest/types";

const mockTest: Test = {
    context: {
        config: {
            rootDir: "/test-root-dir"
        }
    } as never,
    duration: 100,
    path: "C:\\Users\\amaechler\\Development\\Pandell\\jest-teamcity\\src\\sample-tests-math.tests.ts"
};

const mockTestResult: TestResult = {
    leaks: false,
    numFailingTests: 0,
    numPassingTests: 5,
    numPendingTests: 0,
    numTodoTests: 0,
    openHandles: [],
    perfStats: { end: 1611158133836, runtime: 687, slow: false, start: 1611158133149 },
    skipped: false,
    snapshot: { added: 0, fileDeleted: false, matched: 0, unchecked: 0, uncheckedKeys: [], unmatched: 0, updated: 0 },
    testFilePath: "C:\\Users\\amaechler\\Development\\Pandell\\jest-teamcity\\src\\sample-tests-math.tests.ts",
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

const testGlobalConfig: Config.GlobalConfig = {
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

describe("math-scope", () => {
    test("another test without a scope", () => {
        const reporter = new TeamCityReporter(testGlobalConfig);
        reporter.onTestResult(mockTest, mockTestResult);
    });
});
