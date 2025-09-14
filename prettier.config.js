/** @type {import('prettier').Config} */
const config = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  
  // Line formatting
  printWidth: 80,
  endOfLine: 'lf',
  insertPragma: false,
  requirePragma: false,
  
  // Bracket formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // HTML formatting
  htmlWhitespaceSensitivity: 'css',
  
  // Vue formatting
  vueIndentScriptAndStyle: false,
  
  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',
  
  // Range formatting
  rangeStart: 0,
  rangeEnd: Infinity,
  
  // Parser options
  parser: undefined,
  filepath: undefined,
  
  // Plugin options
  plugins: ['prettier-plugin-tailwindcss'],
  
  // Tailwind CSS plugin options
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  
  // Override for specific file types
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: '*.yaml',
      options: {
        tabWidth: 2,
      },
    },
    {
      files: '*.yml',
      options: {
        tabWidth: 2,
      },
    },
  ],
};

module.exports = config;