const prefixer = require('postcss-prefix-selector');

module.exports = {
  plugins: [
    prefixer({
      prefix: '#root',
      transform(prefix, selector, prefixedSelector, filepath) {
        if (selector.match(/^(html|body)/)) {
          return selector.replace(/^([^\s]*)/, `$1 ${prefix}`);
        }

        if (filepath.match(/node_modules/)) {
          return selector; // Do not prefix styles imported from node_modules
        }

        return prefixedSelector;
      },
    }),
  ],
};
