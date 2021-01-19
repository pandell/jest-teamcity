module.exports = {
    tabWidth: 4,
    arrowParens: "avoid",
    endOfLine: "auto",
    printWidth: 120,
    quoteProps: "preserve",
    trailingComma: "none",
    overrides: [
        {
            files: ["*.json", ".*.json", "*.yml"],
            options: {
                tabWidth: 2
            }
        }
    ]
};
