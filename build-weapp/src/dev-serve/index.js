const architect = require('@angular-devkit/architect')
const buildWebpack = require('@angular-devkit/build-webpack')
const rxjs = require('rxjs')
const operators = require('rxjs/operators')

exports.default = architect.createBuilder(commandBuilder)

function commandBuilder(
  options,
  context
) {
  const browserTarget = architect.targetFromTargetString(options.mpTarget);
  const root = context.workspaceRoot;
  console.log(root)
  async function setup() {

    const rawBrowserOptions = await context.getTargetOptions(browserTarget);
    console.log(rawBrowserOptions)

    return {
      a: 123,
      b: 456
    }
  }
  return rxjs.from(setup()).pipe(operators.switchMap(() => {
    return buildWebpack.runWebpack({}, context, {
      webpackFactory: require('webpack'),
    }).pipe(operators.map(buildEvent => {
      return {...buildEvent}
    }))
  }))
}
