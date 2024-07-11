import path from "path";
import { Reporter, Test } from "@jest/reporters";
import { TestResult } from "@jest/test-result";
import { Config } from "@jest/types";
import { escapeForTeamCity } from "./teamcity-utils";

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
     * @see {@link https://www.jetbrains.com/help/teamcity/service-messages.html#Reporting+Tests} on reporting tests in TeamCity.
     */
    onTestResult(test: Test, testResult: TestResult): void {
        const testFile = escapeForTeamCity(path.relative(test.context.config.rootDir, test.path));
        console.log(`##teamcity[testSuiteStarted name='${testFile}']`);

        testResult.testResults.forEach((result) => {
            const escapedFullName = escapeForTeamCity(result.fullName);

            console.log(`##teamcity[testStarted name='${escapedFullName}']`);

            switch (result.status) {
                case "failed":
                    // jest currently doesn't report error messages in a way that fits nicely into TeamCity
                    // (short message, long description). Re-visit the options we have once jest switches to
                    // jest-circus as default test runner in v28 (away from jest-jasmine2).
                    const escapedFailureMessage = escapeForTeamCity(
                        result.failureMessages.join(";"),
                    );
                    console.log(
                        `##teamcity[testFailed name='${escapedFullName}' message='${escapedFailureMessage}']`,
                    );
                    break;
                case "skipped":
                    console.log(`##teamcity[testIgnored name='${escapedFullName}']`);
                    break;
            }

            console.log(
                `##teamcity[testFinished name='${escapedFullName}' duration='${result.duration}']`,
            );
        });

        console.log(`##teamcity[testSuiteFinished name='${testFile}']`);
    }
}
