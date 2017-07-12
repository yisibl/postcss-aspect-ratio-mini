var postcss = require('postcss')

// Default properties for aspect ratios.
var defaults = {}

defaults.pseudo = {
  'padding-top': '100%'
}

module.exports = postcss.plugin('postcss-layout', function(opts) {
  opts = opts || {}
  opts._grids = {}
  var grids = opts._grids

  return function(css, result) {
    css
      .walkDecls(/^(aspect-ratio|aspect|ratio)$/, function(decl) {
        var ratio = {}
        ratio.value = processRatioValue(css, decl.parent, decl)
        processRatioConf(css, decl.parent, decl, ratio)

        aspectRatio(css, decl.parent, decl, ratio)
      })
  }
})

function processRatioValue(css, rule, decl) {
  var ratio = null
  var re = /['']?(((?:\d*\.?\d*)?)(?:\:|\|)(\d+))['']?/g

  ratio = decl.value
  ratio = ratio.replace(re, function(match, r, x, y) {
    return y / x * 100 + '%'
  })

  return ratio
}

function processRatioConf(css, rule, decl, ratio) {
  var sels = []

  ratio.pseudo = clone(defaults.pseudo)
  ratio.pseudo.source = decl.source

  for (var i = 0; i < rule.selectors.length; i++) {
    sels.push(rule.selectors[i] + ':before')
  }

  ratio.pseudo.selector = sels.join(', ')
}

function aspectRatio(css, rule, decl, ratio) {
  var parent = rule.parent

  ratio.pseudo['padding-top'] = ratio.value
  parent.insertAfter(rule, objToRule(ratio.pseudo))

  // 删除 aspect-ratio 属性
  decl.remove()
  // 删除原选择器
  rule.remove()
}

// Convert a js obj to a postcss rule, extending clonedRule if it is passed in.
function objToRule(obj, clonedRule) {
  var rule = clonedRule || postcss.rule()
  var skipKeys = ['selector', 'selectors', 'source']

  if (obj.selector)
    rule.selector = obj.selector
  else if (obj.selectors)
    rule.selectors = obj.selectors

  if (obj.source)
    rule.source = obj.source

  for (var k in obj) {
    if (obj.hasOwnProperty(k) && !(skipKeys.indexOf(k) + 1)) {
      var v = obj[k]
      var found = false

      // If clonedRule was passed in, check for an existing property.
      if (clonedRule) {
        rule.each(function(decl) {
          if (decl.prop == k) {
            decl.value = v
            found = true
            return false
          }
        })
      }

      // If no clonedRule or there was no existing prop.
      if (!clonedRule || !found)
        rule.append({ prop: k, value: v })
    }
  }

  return rule
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
