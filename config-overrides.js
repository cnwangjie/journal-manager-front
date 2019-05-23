const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  fixBabelImports
} = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
)
