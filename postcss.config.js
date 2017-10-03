const sourceMaps = process.env.NODE_ENV !== 'production'

module.exports = ctx => ({
  map: ctx.options.map,
  parser: ctx.file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-easy-import': {
      extensions: ['.sss']
    },
    'postcss-nesting': {},
    'postcss-css-variables': {},
    'css-mqpacker': {},
    'postcss-custom-media': {},
    'postcss-responsive-type': {},
    autoprefixer: {}
  }
})
