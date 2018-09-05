/**
 * @description If param obj is expected that can be copied
 * */
function unExpectedObjType(obj) {
  return obj === null
    || obj instanceof FileList
    || obj instanceof File
    || obj instanceof Date
    || obj instanceof Error
    || obj instanceof RegExp
}

/**
 * @description Returns the start dimension of the nested loop
 * @param {Object} obj
 * @param {Array} tParents - Target parents
 * */
function isCircularStructure(obj, tParents) {
  var p = tParents || []
  var index = Object.keys(p)
    .find(function (i) {
      return tParents[i] === obj
    })
  return index !== undefined ? { index: index } : undefined
}

/**
 * @description Deep copy, deal nested loop
 * @param result
 * @param target
 * @param {Array} tParents - Target parents
 * @param {Array} curParents - Current result parents
 * */
function copyFn(result, target, tParents, curParents) {
  var a = [target]
  var curA = [result]
  var p = tParents ? [].concat(tParents).concat(a) : a
  var curP = tParents ? [].concat(curParents).concat(curA) : curA
  Object.keys(target).forEach(function (key) {
    var isCircular = isCircularStructure(target[key], p)
    if (isCircular) {
      result[key] = curP[isCircular.index]
    } else {
      result[key] = target[key]
      if (typeof target[key] === 'object' && !unExpectedObjType(target[key])) {
        var Constructor = target[key].constructor
        result[key] = new Constructor()
        copyFn(result[key], target[key], p)
      }
    }
  })
}

export default function (obj) {
  if (typeof obj !== 'object' || unExpectedObjType(obj)) return obj

  if (typeof obj === 'object') {
    var copy = new obj.constructor()
    copyFn(copy, obj)
    return copy
  }
  throw new Error('Unable to copy obj! Its type isn\'t supported.')
}
