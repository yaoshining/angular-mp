const path = require('path')
const rimraf = require('rimraf')

function deleteOutputDir(root, outputPath) {
  const resolvedOutputPath = path.resolve(root, outputPath);
  if (resolvedOutputPath === root) {
      throw new Error('Output path MUST not be project root directory!');
  }
  rimraf.sync(resolvedOutputPath);
}

exports.deleteOutputDir = deleteOutputDir
