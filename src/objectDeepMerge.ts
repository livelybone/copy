import objectSimpleCopy from './objectSimpleCopy'
import { Obj, UnexpectType } from './types'
import { expectedObjType, ExpectedObjType, isCircularStructure } from './utils'

function objectShallowMerge(type: ExpectedObjType, ...objs: Obj[]) {
  const obj = objs.reduce((pre, obj1) => ({ ...pre, ...obj1 }), {})

  if (type === ExpectedObjType.NormalObj) return obj

  return Object.entries(obj).reduce((pre: any[], [key, value]) => {
    pre[+key] = value
    return pre
  }, [])
}

function filterObjToMergeByKey(key, objs: any[]): Obj[] | UnexpectType {
  const $objs: Obj[] = []
  let lastObjType

  for (let i = objs.length - 1; i >= 0; i -= 1) {
    const obj = objs[i]
    const value = obj[key]
    const type = expectedObjType(value)

    // 如果元素为期望的对象，则加入到 $objs 的头部
    // If the element is the desired object, add it to the $objs header
    if (type && (!lastObjType || type === lastObjType)) {
      $objs.unshift(value)
      lastObjType = type
    }
    // 如果元素存在并且不为期望的对象，则终止循环并且返回 $objs
    // If the element exists and is not an expected object, terminate the loop and return
    else if (key in obj) return $objs.length > 0 ? $objs : value
    // 如果元素不存在，则继续循环
    // If the element does not exist, the loop continues
  }
  return $objs
}

function merge(type: ExpectedObjType, target: any, ...rest: any[]) {
  const objs = [target, ...rest]
  const shallowObj = objectShallowMerge(type, ...objs)

  Object.keys(shallowObj).forEach(key => {
    const res = filterObjToMergeByKey(key, objs)

    console.log(key, res, res && res[0], res instanceof Array, target)
    if (res instanceof Array) {
      if (res.length === 1) target[key] = objectSimpleCopy(res[0])
      else {
        target[key] = merge(
          res[0] instanceof Array
            ? ExpectedObjType.Array
            : ExpectedObjType.NormalObj,
          ...res,
        )
      }
    } else target[key] = res
  })
  // rest.forEach(obj => {
  //   if (expectedObjType(obj)) {
  //     Object.entries(obj).forEach(([key, val]) => {
  //       const obj1 = target[key]
  //       if (expectedObjType(val) && expectedObjType(obj1)) {
  //         objectDeepMerge(obj1, val)
  //       } else {
  //         target[key] = typeof val === 'object' ? objectDeepCopy(val) : val
  //       }
  //     })
  //   }
  // })
  return target
}

/**
 * @description Deep merge, cannot deal nested loop
 * @return The first parameter object which has been merged
 * */
export default function objectDeepMerge<T extends Obj = Obj>(
  target: T,
  ...rest: T[]
) {
  let allSameTypeIs: ExpectedObjType | 'same' | 'no-same' = 'same'
  const args = [target, ...rest]
  args.forEach((obj, i) => {
    if (isCircularStructure(obj)) {
      throw new Error(
        `objectDeepMerge: The ${i}th parameter is a circular structure`,
      )
    }
    const type = expectedObjType(obj)

    if (!type || (allSameTypeIs !== 'same' && allSameTypeIs !== type)) {
      throw new Error(
        'objectDeepMerge: Please ensure that parameters are all Array or normal Object',
      )
    } else allSameTypeIs = type
  })

  return merge(allSameTypeIs, target, ...rest)
}
