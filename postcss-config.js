module.exports = {
  use: [
    "postcss-easy-import",
    "postcss-nesting",
    "postcss-css-variables",
    "css-mqpacker",
    "postcss-custom-media",
    "postcss-responsive-type",
    "autoprefixer"
  ],
  parser: "sugarss",
  "postcss-easy-import": {
    extensions: ['.sss'],
    onImport: function(sources) {
      global.watchCSS(sources)
    }
  },
  "input": "app/styles/main.sss",
  "output": "dist/main.css"
};
