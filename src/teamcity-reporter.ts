import { Reporter, Test } from "@jest/reporters";
import { TestResult } from "@jest/test-result";
import { Config } from "@jest/types";
import path from "path";

/**
 * A Jest reporter class for TeamCity.
 *
 * @implements {Reporter}
 */
export class TeamCityReporter implements Reporter {
    constructor(public globalConfig: Config.GlobalConfig) {}

    /**
     * Can be used to force Jest to exit with non-0 code by returning an Error.
     */
    getLastError(): void {
        return;
    }

    /**
     * Called at the very beginning of a test run (before any tests have started).
     *
     * Not currently used as we report tests in `onTestResult`.
     */
    onRunStart(): void {
        return;
    }

    /**
     * Called after all tests have completed.
     *
     * Not currently used as we report tests in `onTestResult`.
     * Could be used in the future for coverage reporting.
     */
    onRunComplete(): void {
        return;
    }

    /**
     * Called at the beginning of every test file (also known as test suite).
     *
     * Not currently used as we report tests in `onTestResult` where we
     * have access to the full test name (and not just the file name).
     */
    onTestStart(): void {
        return;
    }

    /**
     * Called with the result of every test file (also known as test suite).
     *
     * @param {Test} test
     * @param {TestResult} testResult
     * @param {AggregatedResult} results
     * @memberof TeamCityReporter
     */
    onTestResult(test: Test, testResult: TestResult): void {
        const testFile = path.relative(test.context.config.rootDir, test.path);
        console.log(`##teamcity[testSuiteStarted name='${testFile}']`);

        testResult.testResults.forEach(result => {
            console.log(`##teamcity[testStarted name='${result.fullName}']`);

            switch (result.status) {
                case "skipped":
                    console.log(`##teamcity[testIgnored name='${result.fullName}']`);
                    break;
            }

            // <here go all the test service messages with the same name>

            console.log(`##teamcity[testFinished name='${result.fullName}' duration='${result.duration}']`);
        });

        console.log(`##teamcity[testSuiteFinished name='${testFile}']`);
    }
}
