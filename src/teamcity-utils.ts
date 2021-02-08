/**
 * Escapes a text message to be compatible with TeamCity.
 *
 * @see https://www.jetbrains.com/help/teamcity/service-messages.html#Escaped+values
 */
export function escapeForTeamCity(stringToEscape: string): string {
    if (!stringToEscape) {
        return "";
    }

    return stringToEscape
        .replace(/'/g, "|'")
        .replace(/\n/g, "|n")
        .replace(/\r/g, "|r")
        .replace(/\u(?<codePoint>\d+)/g, (_s, codePoint) => `|0x${codePoint}`)
        .replace(/\|/g, "||")
        .replace(/\[/g, "|[")
        .replace(/\]/g, "|]");
}
