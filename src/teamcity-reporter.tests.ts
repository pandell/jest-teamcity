import { TeamCityReporter } from "./teamcity-reporter";
import {
    testGlobalConfig,
    mockTest,
    successTestResultWithoutScope,
    mixedTestResult
} from "./teamcity-reporter.tests.mockdata";

describe("TeamCityReporter", () => {
    test("onTestResult logs successful runs as expected", () => {
        // setup console.log interception
        const log: string[] = [];
        const spyLog = jest.spyOn(console, "log");
        spyLog.mockImplementation(function (...args: unknown[]): void {
            log.push(`${args.join(" ")}`);
        });

        const reporter = new TeamCityReporter(testGlobalConfig);
        reporter.onTestResult(mockTest, successTestResultWithoutScope);

        expect(log).toEqual([
            "##teamcity[testSuiteStarted name='\\\\test-root-dir\\src\\sample-test-file.tests.ts']",
            "##teamcity[testStarted name='a test without a scope']",
            "##teamcity[testFinished name='a test without a scope' duration='2']",
            "##teamcity[testSuiteFinished name='\\\\test-root-dir\\src\\sample-test-file.tests.ts']"
        ]);

        spyLog.mockRestore();
    });

    test("onTestResult logs runs with failures as expected", () => {
        // setup console.log interception
        const log: string[] = [];
        const spyLog = jest.spyOn(console, "log");
        spyLog.mockImplementation(function (...args: unknown[]): void {
            log.push(`${args.join(" ")}`);
        });

        const reporter = new TeamCityReporter(testGlobalConfig);
        reporter.onTestResult(mockTest, mixedTestResult);

        expect(log).toEqual([
            "##teamcity[testSuiteStarted name='\\\\test-root-dir\\src\\sample-test-file.tests.ts']",
            "##teamcity[testStarted name='scope-1 1 + 2 equals 3']",
            "##teamcity[testFinished name='scope-1 1 + 2 equals 3' duration='2']",
            "##teamcity[testStarted name='scope-2 1 + 2 equals 3']",
            "##teamcity[testFinished name='scope-2 1 + 2 equals 3' duration='3']",
            "##teamcity[testStarted name='scope-2 1 + 1 equals 1']",
            "##teamcity[testFailed name='scope-2 1 + 1 equals 1' message='Error: expect(received).toBe(expected) // Object.is equality||n||nExpected: 1||nReceived: 2||n    at Object.<anonymous> (\\\\test-root-dir\\src\\sample-tests-math.tests.ts:22:23)||n    at Object.asyncJestTest (\\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\jasmineAsyncInstall.js:106:37)||n    at \\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\queueRunner.js:45:12||n    at new Promise (<anonymous>)||n    at mapper (\\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\queueRunner.js:28:19)||n    at \\\\test-root-dir\\node_modules\\jest-jasmine2\\build\\queueRunner.js:75:41']",
            "##teamcity[testFinished name='scope-2 1 + 1 equals 1' duration='3']",
            "##teamcity[testSuiteFinished name='\\\\test-root-dir\\src\\sample-test-file.tests.ts']"
        ]);

        spyLog.mockRestore();
    });
});
