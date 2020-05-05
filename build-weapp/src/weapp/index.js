const architect = require('@angular-devkit/architect')
const node = require('@angular-devkit/core/node')
const rxjs = require('rxjs')
const operators = require('rxjs/operators')
const buildWebpack = require('@angular-devkit/build-webpack')
const utils = require('../utils')

async function initialize(options, context, host, webpackConfigurationTransform) {
  const originalOutputPath = options.outputPath;
  const { config, projectRoot, projectSourceRoot, i18n, } = await buildBrowserWebpackConfigFromContext(options, context, host, true);
  let transformedConfig;
  if (webpackConfigurationTransform) {
      transformedConfig = await webpackConfigurationTransform(config);
  }
  if (options.deleteOutputPath) {
      utils.deleteOutputDir(context.workspaceRoot, originalOutputPath);
  }
  return { config: transformedConfig || config, projectRoot, projectSourceRoot, i18n };
}

function buildWebpackWeapp(options, context, transforms = {}) {
  const host = new node.NodeJsSyncHost()
  return rxjs.from(initialize(options, context, host, transforms.webpackConfiguration)).pipe(
    operators.switchMap(({ config, projectRoot, projectSourceRoot, i18n }) => {
      return buildWebpack.runWebpack()
    })
  )
}

exports.default = architect.createBuilder(buildWebpackWeapp)
