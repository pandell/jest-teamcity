import { escapeForTeamCity } from "./teamcity-utils";

describe("escapeForTeamCity", () => {
    test.each`
        input                                                              | expected
        ${"hello world"}                                                   | ${"hello world"}
        ${"Cheese . . . milk's leap toward immortality."}                  | ${"Cheese . . . milk||'s leap toward immortality."}
        ${"\\u932 \\u951 \\u32 \\u947 \\u955 \\u974 \\u963 \\u963 \\u945"} | ${"\\||Τ \\||η \\||  \\||γ \\||λ \\||ώ \\||σ \\||σ \\||α"}
        ${"(a || b)\n(b || c)"}                                            | ${"(a |||| b)||n(b |||| c)"}
    `("escapes $string as expected", ({ input, expected }) => {
        expect(escapeForTeamCity(input)).toEqual(expected);
    });
});
