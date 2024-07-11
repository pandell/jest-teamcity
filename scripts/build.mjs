#!/usr/bin/env node

/**
 * @file Bundles `jest-teamcity` using esbuild.
 */

import { program } from "commander";
import esbuild from "esbuild";

program
    .name("bundle")
    .description("CLI to bundle jest-teamcity package")
    .option("-p, --production", "Whether to run in production mode", false);

program.parse();

const options = program.opts();

// bundle function
console.log(`📦 Bundle package (${options.production ? "Production" : "Development"})`);
await esbuild.build({
    bundle: true,
    entryPoints: ["./src/index.ts"],
    format: "esm",
    legalComments: "external",
    minify: options.production,
    outdir: "dist",
    platform: "node",
    sourcemap: true,
    target: "node16",
});
