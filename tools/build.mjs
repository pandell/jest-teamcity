#!/usr/bin/env node

// Bundle "jest-teamcity" using esbuild.

import esbuild from "esbuild";
import { argv } from "process";

const production = argv.length > 1 && argv[2] === "--production";

console.log(`📦 Bundle package (${production ? "Production" : "Development"})`); // eslint-disable-line no-undef
esbuild.build({
    bundle: true,
    entryPoints: ["./src/index.ts"],
    format: "esm",
    minify: production,
    outdir: "dist",
    platform: "node",
    sourcemap: true,
    target: "node20",
});
