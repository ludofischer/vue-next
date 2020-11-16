import { Root, Rule, AtRule } from 'postcss'

function stylePluginTrim() {
  return {
    postcssPlugin: 'trim',
    Once(css: Root) {
      css.walk(node => {
        if (node instanceof Rule || node instanceof AtRule) {
          if (node.raws.before) node.raws.before = '\n'
          if (node.raws.after) node.raws.after = '\n'
        }
      })
    }
  }
}

stylePluginTrim.postcss = true

export default stylePluginTrim
