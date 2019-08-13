/**
 * @description If param obj is expected that can be copied
 * */
import { Obj } from './types'

export enum ExpectedObjType {
  NormalObj = 'object',
  Array = 'Array',
}

export function expectedObjType(obj: Obj) {
  return typeof obj === 'object' &&
    !(
      obj === null ||
      obj instanceof Promise ||
      obj instanceof Date ||
      obj instanceof Error ||
      obj instanceof RegExp
    ) &&
    !(
      typeof window !== 'undefined' &&
      (obj instanceof FileList ||
        obj instanceof File ||
        obj instanceof Element ||
        obj instanceof Window ||
        obj instanceof Document)
    )
    ? obj instanceof Array
      ? ExpectedObjType.Array
      : ExpectedObjType.NormalObj
    : false
}

export function newObj(target: Obj) {
  return target instanceof Array ? [] : {}
}

/**
 * @description Returns the start dimension of the nested loop
 * @param {Object} obj
 * @param {Array} tParents - Target parents
 * */
export function circularStructureIndex(obj: Obj, tParents: Obj[]) {
  const index = Object.keys(tParents).find(i => {
    return tParents[+i] === obj
  })
  return index !== undefined ? { index: +index } : undefined
}

type ReferencedPath = string
type QuotePath = string
type CircularStructurePaths = [ReferencedPath, QuotePath]

/**
 * @description Returns the start dimension of the nested loop
 * */
export function isCircularStructure(obj: Obj): CircularStructurePaths | null {
  const paths: CircularStructurePaths = ['', '']

  const isCircular = (
    object: Obj,
    path: string[] = ['Object'],
    oParents?: Obj[],
  ): boolean => {
    const parents = oParents ? [...oParents, object] : [object]

    return Object.entries(object).some(([key, value]) => {
      const cPath = [...path, key]
      const circularIndex = circularStructureIndex(value, parents)
      if (circularIndex) {
        paths[0] = cPath
          .slice(0, circularIndex.index + 1)
          .reduce((pre, p) => `${pre}.${p}`, '')
          .replace(/^\./, '')
        paths[1] = cPath
          .reduce((pre, p) => `${pre}.${p}`, '')
          .replace(/^\./, '')
        return true
      }
      return typeof value === 'object' && value !== null
        ? isCircular(value, cPath, parents)
        : false
    })
  }

  return isCircular(obj) ? paths : null
}
