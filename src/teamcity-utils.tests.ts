import { escapeForTeamCity } from "./teamcity-utils";

describe("escapeForTeamCity", () => {
  test.each`
    input                                                              | expected
    ${"Cheese . . . milk's leap toward immortality."}                  | ${"Cheese . . . milk|'s leap toward immortality."}
    ${"\\u932 \\u951 \\u32 \\u947 \\u955 \\u974 \\u963 \\u963 \\u945"} | ${"\\|0x932 \\|0x951 \\|0x32 \\|0x947 \\|0x955 \\|0x974 \\|0x963 \\|0x963 \\|0x945"}
    ${"(a || b)\n(b || c)"}                                            | ${"(a |||| b)|n(b |||| c)"}
  `("escapes $string as expected", ({ input, expected }: { input: string; expected: string }) => {
    expect(escapeForTeamCity(input)).toEqual(expected);
  });
});
