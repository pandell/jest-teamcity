// @ts-check

import { createPandellEsLintConfig } from "@pandell/eslint-config";

export default createPandellEsLintConfig({
    extraConfigs: [
        {
            name: "jest-teamcity/app-local",
            rules: {
                "import-x/no-extraneous-dependencies": "off",
                "no-console": "off",
            },
        },
    ],
});
