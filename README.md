# path-alias

Uses path aliases defined in `jsconfig` under `compilerOptions.paths`.
Modifies `Module.prototype.require` to intercept a predefined path alias and replace it with the corresponding absolute path.

## Docs

```js
require('path-alias')(jsconfigPath, startChar)
```

`require('path-alias')` returns a setup function which has 2 params

- `jsconfigPath` string (it's the absolute path to the jsconfig file)
- `startChar` string (it's the first "special" character of the alias, defaults to `@`)

## Usage

This code should be added to the top of the main file (so it should run first when the app is started)

```js
// ./src/server.js
require('path-alias')(require('path').join(__dirname, '../jsconfig.json'))
```

Path aliases should be defined here.

```js
// ./jsconfig.json
{
  ...
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@src/*": ["src/*"],
      "@models/*": ["src/models/*"]
      "@root/*": ["./*"],
      "@test/*": ["test/*"]
    }
    ...
  },
  ...
}

```
