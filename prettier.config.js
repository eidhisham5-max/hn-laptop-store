/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: true,
  quoteProps: 'as-needed',
  useTabs: false,
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
}

module.exports = config