import { Root } from 'postcss'

const cssVarRE = /\bvar\(--(global:)?([^)]+)\)/g

function stylePluginScopedVars(id: any) {
  const shortId = id.replace(/^data-v-/, '')
  return {
    postcssPlugin: 'vue-scoped',
    Once(root: Root) {
      root.walkDecls(decl => {
        // rewrite CSS variables
        if (cssVarRE.test(decl.value)) {
          decl.value = decl.value.replace(cssVarRE, (_, $1, $2) => {
            return $1 ? `var(--${$2})` : `var(--${shortId}-${$2})`
          })
        }
      })
    }
  }
}

stylePluginScopedVars.postcss = true

export default stylePluginScopedVars
