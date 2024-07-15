#!/usr/bin/env node

// Script that runs during packaging (see "package.json/scripts/prepack").
// It removes "package.json" properties that we do not want to include in the published package.

import { readFileSync, writeFileSync } from "node:fs";

const packageJsonPath = "./package.json";
const packageJsonString = readFileSync(packageJsonPath, "utf8");
const packageJson = JSON.parse(packageJsonString);

delete packageJson.devDependencies;
delete packageJson.packageManager;
delete packageJson.prettier;
delete packageJson.resolutions;
delete packageJson.scripts;

const newPackageJsonString = `${JSON.stringify(packageJson, null, 2)}\n`;
if (packageJsonString !== newPackageJsonString) {
  writeFileSync(packageJsonPath, newPackageJsonString, "utf8");
  console.log("Cleaned package.json"); // eslint-disable-line no-undef, no-console
}
