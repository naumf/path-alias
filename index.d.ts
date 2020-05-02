/**
 * Setup path alias.
 *
 * @param {string} jsconfigPath The absolute path to the jsconfig file.
 * @param {string} [startChar='@'] The first "special" character of the alias, defaults to "&#64;".
 */
export default function setup(
  jsconfigPath: string,
  startChar: string = '@'
): void
