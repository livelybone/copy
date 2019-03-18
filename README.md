# @livelybone/copy
[![NPM Version](http://img.shields.io/npm/v/@livelybone/copy.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/copy)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/copy.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/copy)
![gzip with dependencies: 1kb](https://img.shields.io/badge/gzip--with--dependencies-1kb-brightgreen.svg "gzip with dependencies: 1kb")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

A module about clipboard copy, Object simple & deep copy

The function `copyDom` can be use to copy image to clipboard

## repository
https://github.com/livelybone/copy.git

## Demo
https://livelybone.github.io/tool/copy/

## Installation
```bash
npm i -S @livelybone/copy
```

## Import
```js
// import all
import {copyDom,copyText,objectSimpleCopy,objectDeepCopy,objectDeepMerge} from '@livelybone/copy';

// import what you need
import copyDom from '@livelybone/copy/lib/umd/copyDom';
import copyText from '@livelybone/copy/lib/umd/copyText';
import objectDeepCopy from '@livelybone/copy/lib/umd/objectDeepCopy';
import objectSimpleCopy from '@livelybone/copy/lib/umd/objectSimpleCopy';
import objectDeepMerge from '@livelybone/copy/lib/umd/objectDeepMerge';
```

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/copy/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/copy/lib/umd/<--module-->.js"></script>
```
