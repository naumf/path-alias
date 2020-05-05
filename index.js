'use strict'

const Module = require('module')
const path = require('path')

const originalRequire = Module.prototype.require
var originalPathResolve = path.resolve

function setup(jsconfigPath, startChar = '@') {
  const jsConfig = require(jsconfigPath)
  const rootDir = path.dirname(jsconfigPath)
  const aliases = {}
  for (const p in jsConfig.compilerOptions.paths) {
    const alias = p.slice(0, -1)
    aliases[alias] = {
      path: path.join(
        rootDir,
        jsConfig.compilerOptions.paths[p][0].slice(0, -1)
      ),
      length: alias.length
    }
  }

  path.resolve = function () {
    let alias
    if (
      !arguments ||
      !arguments[0] ||
      arguments[0].slice(0, 1) !== startChar ||
      !(alias = aliases[arguments[0].slice(0, arguments[0].indexOf('/') + 1)])
    ) {
      return originalPathResolve.apply(this, arguments)
    }

    arguments[0] = path.join(alias.path, arguments[0].slice(alias.length))
    return originalPathResolve.apply(this, arguments)
  }

  Module.prototype.require = function () {
    let alias
    if (
      !arguments ||
      !arguments[0] ||
      arguments[0].slice(0, 1) !== startChar ||
      !(alias = aliases[arguments[0].slice(0, arguments[0].indexOf('/') + 1)])
    ) {
      return originalRequire.apply(this, arguments)
    }

    arguments[0] = path.join(alias.path, arguments[0].slice(alias.length))
    return originalRequire.apply(this, arguments)
  }
}

module.exports = setup
