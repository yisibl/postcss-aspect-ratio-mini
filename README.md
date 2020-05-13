[travis]:       https://travis-ci.org/yisibl/postcss-aspect-ratio-mini
[travis-img]:   https://img.shields.io/travis/yisibl/postcss-aspect-ratio-mini.svg
# PostCSS Aspect Ratio Mini [![Travis Build Status][travis-img]][travis]

A PostCSS plugin to fix an element's dimensions to an aspect ratio.

There is already a standard [aspect-ratio](https://drafts.csswg.org/css-sizing-4/#aspect-ratio) in the CSS specification, and Chrome has [experimental support](https://bugs.chromium.org/p/chromium/issues/detail?id=1045668#c16). **So it is recommended to use `/` to separate values, the next version may deprecate `:` separator.**

## Install

```shell
npm i postcss-aspect-ratio-mini --save
```

## Usage

```js
var postcss = require('postcss')

var output = postcss()
  .use(require('postcss-aspect-ratio-mini'))
  .process(require('fs').readFileSync('input.css', 'utf8'))
  .css
```

## Example

A simple example using the custom ratio value `16 / 9`.


### Input

```css
.aspect-box {
    position: relative;
}

.aspect-box {
    aspect-ratio: 16 / 9;
}

.aspect-box2 {
    aspect-ratio: 0.1 / 0.3;
}
```

### Output

```css
.aspect-box {
    position: relative;
}

.aspect-box:before {
    padding-top: 56.25%;
}

.aspect-box2:before {
    padding-top: 300%;
}
```

## Test

```shell
npm test
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
