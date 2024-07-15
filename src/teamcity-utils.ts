/**
 * Escapes a text message to be compatible with TeamCity.
 *
 * @see https://www.jetbrains.com/help/teamcity/service-messages.html#Escaped+values
 */
export function escapeForTeamCity(stringToEscape: string): string {
  if (!stringToEscape) {
    return "";
  }
  const codepointRegex = new RegExp("\\u(?<codePoint>\\d+)", "g");
  return stringToEscape
    .replace(/\|/g, "||")
    .replace(/\n/g, "|n")
    .replace(/\r/g, "|r")
    .replace(/\[/g, "|[")
    .replace(/\]/g, "|]")
    .replace(codepointRegex, (_s, codePoint) => `|0x${codePoint}`)
    .replace(/'/g, "|'");
}
