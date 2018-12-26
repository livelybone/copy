import objectDeepCopy from './objectDeepCopy'
import { expectedObjType } from './utils'

function objectDeepMerge(target) {
  var rest = Array.prototype.slice.call(arguments, 1)
  rest.forEach(function (obj) {
    if (expectedObjType(obj)) {
      Object.keys(obj).forEach(function (key) {
        mixin(target, obj[key], key)
      })
    }
  })
  return target
}

function mixin(target, val, key) {
  var obj = target[key]
  if (expectedObjType(val) && expectedObjType(obj)) {
    objectDeepMerge(obj, val)
  } else {
    target[key] = typeof val === 'object' ? objectDeepCopy(val) : val
  }
}

export default objectDeepMerge
