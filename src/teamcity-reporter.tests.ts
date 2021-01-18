test("a test without a scope", () => {
    expect(2 * 3).toBe(6);
});

describe("math-scope", () => {
    test("1 + 2 equals 3", () => {
        expect(1 + 2).toBe(3);
    });

    test.each`
        a    | b    | expected
        ${1} | ${1} | ${2}
        ${1} | ${2} | ${3}
        ${2} | ${1} | ${3}
    `("returns $expected when $a is added $b", ({ a, b, expected }) => {
        expect(a + b).toBe(expected);
    });
});
