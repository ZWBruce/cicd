module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-add-css-prefix',
    prepare(result) {
      if (!opts.prefix) return;
      return {
        WalkRules(rule) {
          const {
            selector
          } = rule;
          console.log('selector', selector)
          if (rule.parent.type === 'root' && !(selector.includes(':root') || selector.includes('body') || selector.includes('html') || selector.includes(prefix)) && !rule.flag) {
            rule.flag = true
            const clone = rule.clone()
            clone.selector = `${prefix} ${selector}`
            rule.replaceWith(clone)
          }
        }
      };
    },
  }
}