const fs = require('fs')
const postcss = require('postcss')
const easyImport = require('postcss-easy-import')
const loader = require('postcss-import')
const nesting = require('postcss-nesting')
const variables = require('postcss-css-variables')
const mqpacker = require('css-mqpacker')
const customMedia = require('postcss-custom-media')
const sugarss = require('sugarss')
const cssmqpacker = require('css-mqpacker')

const filename = 'main'
const src = `app/styles/${filename}.sss`
const dest = `dist/${filename}.css`

const postcssPlugin = [
  easyImport({ extensions: ['.sss'] }),
  nesting(),
  variables(),
  customMedia(),
  cssmqpacker()
]


fs.readFile(src, (err, css) => {
  postcss(postcssPlugin)
    .process(css, {
      from: src,
      to: dest,
      parser: sugarss
    })
    .then(result => {
      fs.writeFile(dest, result.css)
      if ( result.map ) fs.writeFile(`${dest}.map`, result.map)
    })
})
