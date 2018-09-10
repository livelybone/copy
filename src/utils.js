/**
 * @description If param obj is expected that can be copied
 * */
export var expectedObjType = (function (obj) {
  var keys = ['Date', 'Error', 'RegExp', 'FileList', 'File', 'Element']
  return typeof obj === 'object'
    && !(obj === null
      || keys.some(function (k) {
        return typeof this[k] === 'function' && (obj instanceof this[k])
      }))
}).bind(this)
