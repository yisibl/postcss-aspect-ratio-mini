[travis]:       https://travis-ci.org/yisibl/postcss-aspect-ratio-mini
[travis-img]:   https://img.shields.io/travis/yisibl/postcss-aspect-ratio-mini.svg
# PostCSS Aspect Ratio Mini [![Travis Build Status][travis-img]][travis]

A PostCSS plugin to fix an element's dimensions to an aspect ratio.

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

A simple example using the custom ratio value `'16:9'`.


### Input

```css
.aspect-box {
    position: relative;
}

.aspect-box {
    aspect-ratio: '16:9';
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
```

## Test

```shell
npm test
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
